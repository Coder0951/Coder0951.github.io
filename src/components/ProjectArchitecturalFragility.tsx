import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProjectArchitecturalFragility = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🎯', file: 'architectural-fragility-overview.md' },
    { id: 'methodology', label: 'Methodology', icon: '🧭', file: 'architectural-fragility-methodology.md' },
    { id: 'financial', label: 'Financial Breach', icon: '💸', file: 'architectural-fragility-financial-breach.md' },
    { id: 'medical-legal', label: 'Medical & Legal', icon: '⚖️', file: 'architectural-fragility-medical-legal.md' },
    { id: 'political', label: 'Political Neutrality', icon: '🗳️', file: 'architectural-fragility-political-neutrality.md' },
    { id: 'nist', label: 'NIST Regulatory', icon: '🛡️', file: 'architectural-fragility-nist-regulatory.md' },
    { id: 'case-studies', label: 'Case Studies', icon: '🧪', file: 'architectural-fragility-case-studies.md' },
  ];

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true);
      const currentTab = tabs.find(tab => tab.id === activeTab);
      if (currentTab) {
        try {
          const response = await fetch(`/docs/${currentTab.file}`);
          const text = await response.text();
          setMarkdownContent(text);
        } catch (error) {
          console.error('Error loading markdown:', error);
          setMarkdownContent('# Error Loading Content\n\nPlease try again later.');
        }
      }
      setLoading(false);
    };

    loadMarkdown();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const stats = [
    { label: 'Entries', value: '640', sublabel: 'Log.json Verified' },
    { label: 'Domains Breached', value: '5', sublabel: '(Financial, Legal, Medical, Political, Cyber)' },
    { label: 'ROI Projection', value: '20.1%', sublabel: '' },
    { label: 'Success Rate', value: '100%', sublabel: '' },
    { label: 'Research Period', value: 'Feb 2026', sublabel: '' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
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
                Architectural Fragility
              </h1>
              <p className="text-lg text-slate-300">
                Instruction Hierarchy Inversion & Multi-Domain Guardrail Collapse
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="text-sm text-slate-400">{stat.label}</div>
                <div className="text-xl font-semibold text-emerald-400 mt-1">{stat.value}</div>
                {stat.sublabel && (
                  <div className="text-xs text-slate-400 mt-1">{stat.sublabel}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="border-b border-slate-700 bg-slate-900/30 backdrop-blur sticky top-0 z-10 mb-8">
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

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/40 rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-700"
        >
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-crimson-600"></div>
            </div>
          ) : (
            <div className="max-w-none space-y-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }: any) => (
                    <h1 className="text-4xl font-bold text-crimson-700 dark:text-crimson-400 mt-8 mb-4 border-b-2 border-crimson-300 dark:border-crimson-700 pb-3" {...props} />
                  ),
                  h2: ({ node, ...props }: any) => (
                    <h2 className="text-3xl font-bold text-crimson-600 dark:text-crimson-400 mt-8 mb-4 border-b border-crimson-200 dark:border-crimson-700 pb-2" {...props} />
                  ),
                  h3: ({ node, ...props }: any) => (
                    <h3 className="text-2xl font-semibold text-crimson-600 dark:text-crimson-400 mt-6 mb-3" {...props} />
                  ),
                  h4: ({ node, ...props }: any) => (
                    <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }: any) => (
                    <p className="text-base leading-7 text-gray-700 dark:text-gray-300 my-4" {...props} />
                  ),
                  ul: ({ node, ...props }: any) => (
                    <ul className="list-disc list-inside space-y-2 my-4 ml-4 text-gray-700 dark:text-gray-300" {...props} />
                  ),
                  ol: ({ node, ...props }: any) => (
                    <ol className="list-decimal list-inside space-y-2 my-4 ml-4 text-gray-700 dark:text-gray-300" {...props} />
                  ),
                  li: ({ node, ...props }: any) => (
                    <li className="text-base leading-6" {...props} />
                  ),
                  blockquote: ({ node, ...props }: any) => (
                    <blockquote className="border-l-4 border-crimson-600 bg-crimson-50 dark:bg-gray-900 pl-6 py-3 my-6 italic text-gray-700 dark:text-gray-300" {...props} />
                  ),
                  table: ({ node, ...props }: any) => (
                    <div className="overflow-x-auto my-6 rounded-lg border border-crimson-200 dark:border-crimson-700">
                      <table className="w-full border-collapse" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }: any) => (
                    <thead className="bg-crimson-100 dark:bg-crimson-900" {...props} />
                  ),
                  th: ({ node, ...props }: any) => (
                    <th className="border border-crimson-300 dark:border-crimson-700 px-4 py-3 text-left font-bold text-crimson-900 dark:text-crimson-100" {...props} />
                  ),
                  td: ({ node, ...props }: any) => (
                    <td className="border border-crimson-200 dark:border-crimson-700 px-4 py-3 text-gray-700 dark:text-gray-300" {...props} />
                  ),
                  code: ({ node, inline, className, children, ...props }: any) => {
                    if (inline) {
                      return (
                        <code className="bg-crimson-100 dark:bg-gray-900 text-crimson-700 dark:text-crimson-400 px-2 py-1 rounded text-sm font-mono" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return (
                      <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 border border-gray-700">
                        <code className="font-mono text-sm" {...props}>
                          {children}
                        </code>
                      </pre>
                    );
                  },
                  a: ({ node, ...props }: any) => (
                    <span className="text-gray-700 dark:text-gray-300 cursor-default" {...props} />
                  ),
                  hr: ({ node, ...props }: any) => (
                    <hr className="my-8 border-t-2 border-crimson-200 dark:border-crimson-700" {...props} />
                  ),
                  strong: ({ node, ...props }: any) => (
                    <strong className="font-bold text-crimson-700 dark:text-crimson-400" {...props} />
                  ),
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
          )}
        </motion.div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-crimson-50 to-crimson-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-crimson-200 dark:border-crimson-800">
            <h3 className="text-xl font-bold text-crimson-700 dark:text-crimson-400 mb-3">Key Discovery</h3>
            <p className="text-gray-700 dark:text-gray-300">
              640-entry threshold where attention mechanisms amplify user context over distant
              safety instructions, creating deterministic guardrail collapse.
            </p>
          </div>
          <div className="bg-gradient-to-br from-crimson-50 to-crimson-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-crimson-200 dark:border-crimson-800">
            <h3 className="text-xl font-bold text-crimson-700 dark:text-crimson-400 mb-3">Vulnerability Impact</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Multi-domain regulatory exposure across financial (SEC), medical (FDA), legal (UPL), and
              cybersecurity (CVE exploit generation) domains with 100% breach success rate.
            </p>
          </div>
          <div className="bg-gradient-to-br from-crimson-50 to-crimson-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-crimson-200 dark:border-crimson-800">
            <h3 className="text-xl font-bold text-crimson-700 dark:text-crimson-400 mb-3">Proposed Solution</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Instruction Weight Reinforcement (IWR) with dynamic λ_Safety scaling, multi-domain tripwires,
              and graceful degradation protocols for sustained conversations.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectArchitecturalFragility;
