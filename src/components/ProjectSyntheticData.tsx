import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type TabId = 'overview' | 'architecture' | 'generation' | 'curation' | 'algorithms' | 'performance' | 'examples';

interface Tab {
  id: TabId;
  label: string;
  file: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', file: 'synthetic-data-overview.md', icon: '🎯' },
  { id: 'architecture', label: 'Architecture', file: 'synthetic-data-architecture.md', icon: '🏗️' },
  { id: 'generation', label: 'Generation', file: 'synthetic-data-generation.md', icon: '🖼️' },
  { id: 'curation', label: 'Curation', file: 'synthetic-data-curation.md', icon: '✨' },
  { id: 'algorithms', label: 'Algorithms', file: 'synthetic-data-algorithms.md', icon: '⚙️' },
  { id: 'performance', label: 'Performance', file: 'synthetic-data-performance.md', icon: '⚡' },
  { id: 'examples', label: 'Examples', file: 'synthetic-data-examples.md', icon: '💻' },
];

interface ImageModalState {
  isOpen: boolean;
  src: string;
  alt: string;
}

export default function ProjectSyntheticData() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [imageModal, setImageModal] = useState<ImageModalState>({ isOpen: false, src: '', alt: '' });

  useEffect(() => {
    const currentTab = tabs.find((t) => t.id === activeTab);
    if (currentTab) {
      fetch(`/docs/${currentTab.file}`)
        .then((res) => res.text())
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load documentation:', err);
          setContent('# Error loading documentation\n\nFailed to fetch documentation file.');
          setLoading(false);
        });
    }
  }, [activeTab]);

  const handleImageClick = (src: string, alt: string) => {
    setImageModal({ isOpen: true, src, alt });
  };

  const closeImageModal = () => {
    setImageModal({ isOpen: false, src: '', alt: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <a
                href="/#/projects"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-4"
              >
                <span>←</span>
                <span>Back to Projects</span>
              </a>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Synthetic Data
              </h1>
              <p className="text-lg text-slate-300">
                Seed-Stability & Character Consistency Pipeline
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="text-sm text-slate-400">Curation Efficiency</div>
              <div className="text-xl font-semibold text-emerald-400 mt-1">4.7%</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="text-sm text-slate-400">Reproducibility</div>
              <div className="text-xl font-semibold text-emerald-400 mt-1">100%</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="text-sm text-slate-400">Avg Quality Score</div>
              <div className="text-xl font-semibold text-blue-400 mt-1">0.86/1.0</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="text-sm text-slate-400">Training Success</div>
              <div className="text-xl font-semibold text-emerald-400 mt-1">92%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-700 bg-slate-900/30 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-slate-400 hover:text-slate-300 border-b-2 border-transparent'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading documentation...</p>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Headings
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-100" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-semibold mt-6 mb-3 text-slate-200" {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 className="text-lg font-semibold mt-4 mb-2 text-slate-300" {...props} />
                ),
                // Paragraphs
                p: ({ node, ...props }) => (
                  <p className="text-slate-300 leading-relaxed mb-4" {...props} />
                ),
                // Lists
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-300" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="ml-2" {...props} />
                ),
                // Code
                code: ({ node, inline, ...props }: any) => (
                  inline ? (
                    <code className="bg-slate-800 text-emerald-300 px-2 py-1 rounded text-sm font-mono" {...props} />
                  ) : (
                    <code className="block bg-slate-800 text-emerald-300 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4" {...props} />
                  )
                ),
                pre: ({ node, ...props }) => (
                  <pre className="bg-slate-800 rounded-lg p-4 overflow-x-auto mb-4" {...props} />
                ),
                // Tables
                table: ({ node, ...props }) => (
                  <table className="w-full border-collapse mb-4 border border-slate-700" {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th className="border border-slate-700 bg-slate-800 px-4 py-2 text-left font-semibold text-slate-100" {...props} />
                ),
                td: ({ node, ...props }) => (
                  <td className="border border-slate-700 px-4 py-2 text-slate-300" {...props} />
                ),
                // Blockquotes
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-emerald-500 pl-4 py-2 my-4 text-slate-400 italic" {...props} />
                ),
                // Links
                a: ({ node, ...props }: any) => (
                  <a className="text-emerald-400 hover:text-emerald-300 underline transition-colors" {...props} />
                ),
                // Images - Custom clickable thumbnails
                img: ({ node, src, alt, ...props }: any) => (
                  <img
                    src={src}
                    alt={alt}
                    onClick={() => handleImageClick(src, alt)}
                    className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-80 transition-opacity my-4 shadow-lg"
                    style={{ maxHeight: '400px' }}
                    {...props}
                  />
                ),
                // Horizontal rule
                hr: ({ node, ...props }) => (
                  <hr className="border-slate-700 my-6" {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="mt-12 pt-8 border-t border-slate-700 flex gap-4">
          <a
            href="/#/projects"
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition-colors font-medium"
          >
            ← Back to Projects
          </a>
          {tabs.findIndex((t) => t.id === activeTab) > 0 && (
            <button
              onClick={() => {
                const index = tabs.findIndex((t) => t.id === activeTab);
                if (index > 0) setActiveTab(tabs[index - 1].id);
              }}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition-colors font-medium"
            >
              ← Previous Section
            </button>
          )}
          {tabs.findIndex((t) => t.id === activeTab) < tabs.length - 1 && (
            <button
              onClick={() => {
                const index = tabs.findIndex((t) => t.id === activeTab);
                if (index < tabs.length - 1) setActiveTab(tabs[index + 1].id);
              }}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-medium ml-auto"
            >
              Next Section →
            </button>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {imageModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={imageModal.src}
              alt={imageModal.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Alt text below image */}
            {imageModal.alt && (
              <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-slate-300 text-sm bg-slate-800/80 px-4 py-2 rounded">
                {imageModal.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
