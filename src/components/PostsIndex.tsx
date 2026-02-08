import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import posts from '../data/posts.json';

interface PostItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  file: string;
}

interface PostWithMeta extends PostItem {
  summary?: string;
  tags?: string[];
  displayTitle?: string;
}

const postList = posts as PostItem[];
const contentModules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });

const parseFrontMatter = (markdown: string): { title?: string; summary?: string; tags?: string[] } => {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = markdown.match(frontMatterRegex);
  
  if (!match) return {};
  
  const yamlContent = match[1];
  const result: { title?: string; summary?: string; tags?: string[] } = {};
  
  const lines = yamlContent.split('\n');
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (!key) continue;
    
    const trimmedKey = key.trim();
    const value = valueParts.join(':').trim();
    
    if (trimmedKey === 'tags') {
      const tagsMatch = value.match(/\[(.*?)\]/);
      if (tagsMatch) {
        result.tags = tagsMatch[1].split(',').map(t => t.trim());
      }
    } else if (trimmedKey === 'summary' || trimmedKey === 'title') {
      result[trimmedKey] = value.replace(/^["']|["']$/g, '');
    }
  }
  
  return result;
};

export const PostsIndex: React.FC = () => {
  const postsWithMeta = useMemo(() => {
    return postList.map((post) => {
      const moduleKey = post.file.replace('/src/', '../');
      const markdown = (contentModules as Record<string, string>)[moduleKey];
      if (markdown) {
        const { title, summary, tags } = parseFrontMatter(markdown);
        return {
          ...post,
          displayTitle: title || post.title,
          summary,
          tags,
        } as PostWithMeta;
      }
      return post as PostWithMeta;
    });
  }, []);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">Posts</h2>
        <p className="text-lg text-slate-400">
          Code snippets, tutorials, and solutions across Python, Spotfire, Excel, R, and SharePoint.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {postsWithMeta.map((post) => (
          <Link
            key={post.slug}
            to={`/posts/${post.slug}`}
            className="block border border-slate-800 rounded-lg p-6 bg-slate-900/40 hover:border-blue-500/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-500">{post.date}</span>
              <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-300 rounded">
                {post.category}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">{post.displayTitle}</h3>
            {post.summary && (
              <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                {post.summary}
              </p>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 bg-slate-800/60 text-slate-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};
