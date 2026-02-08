import React, { useMemo, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import posts from '../data/posts.json';

interface PostItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  file: string;
}

interface FrontMatter {
  title?: string;
  date?: string;
  category?: string;
  tags?: string[];
  summary?: string;
}

const postList = posts as PostItem[];
const contentModules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });

const parseFrontMatter = (markdown: string): { frontMatter: FrontMatter; content: string } => {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdown.match(frontMatterRegex);
  
  if (!match) {
    return { frontMatter: {}, content: markdown };
  }
  
  const [, yamlContent, markdownContent] = match;
  const frontMatter: FrontMatter = {};
  
  // Parse YAML front-matter
  const lines = yamlContent.split('\n');
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (!key) continue;
    
    const trimmedKey = key.trim();
    const value = valueParts.join(':').trim();
    
    if (trimmedKey === 'tags') {
      // Parse tags array: [tag1, tag2, tag3]
      const tagsMatch = value.match(/\[(.*?)\]/);
      if (tagsMatch) {
        frontMatter.tags = tagsMatch[1].split(',').map(t => t.trim());
      }
    } else if (value) {
      // Remove quotes from strings
      frontMatter[trimmedKey as keyof FrontMatter] = value.replace(/^["']|["']$/g, '') as any;
    }
  }
  
  return { frontMatter, content: markdownContent };
};

export const PostPage: React.FC = () => {
  const { slug } = useParams();
  const post = useMemo(() => postList.find((p) => p.slug === slug), [slug]);
  const [content, setContent] = useState<string>('');
  const [frontMatter, setFrontMatter] = useState<FrontMatter>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!post) {
      setLoading(false);
      setError('Post not found.');
      return;
    }

    setLoading(true);
    const moduleKey = post.file.replace('/src/', '../');
    const markdown = (contentModules as Record<string, string>)[moduleKey];
    if (markdown) {
      const { frontMatter: fm, content: md } = parseFrontMatter(markdown);
      setFrontMatter(fm);
      setContent(md);
      setLoading(false);
      return;
    }
    setError('Failed to load content.');
    setLoading(false);
  }, [post]);

  if (!post) {
    return (
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <p className="text-slate-400">Post not found.</p>
        <Link to="/posts" className="text-blue-400 hover:text-blue-300">
          ← Back to Posts
        </Link>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link to="/posts" className="text-blue-400 hover:text-blue-300">
          ← Back to Posts
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mt-4">
          {frontMatter.title || post.title}
        </h1>
        <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
          <span>{frontMatter.date || post.date}</span>
          <span>•</span>
          <span>{frontMatter.category || post.category}</span>
        </div>
        {frontMatter.summary && (
          <p className="mt-3 text-slate-400 italic">{frontMatter.summary}</p>
        )}
        {frontMatter.tags && frontMatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {frontMatter.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {loading && <p className="text-slate-400">Loading content...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="post-content bg-slate-900/40 border border-slate-800 rounded-lg p-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      )}
    </section>
  );
};
