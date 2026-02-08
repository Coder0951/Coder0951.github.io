import React from 'react';

export const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          &lt;coder0951 /&gt;
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-slate-300 hover:text-blue-400 transition-colors">
            Home
          </a>
          <a href="#about" className="text-slate-300 hover:text-blue-400 transition-colors">
            About
          </a>
          <a href="#experience" className="text-slate-300 hover:text-blue-400 transition-colors">
            Experience
          </a>
          <a href="#skills" className="text-slate-300 hover:text-blue-400 transition-colors">
            Skills
          </a>
          <a href="#projects" className="text-slate-300 hover:text-blue-400 transition-colors">
            Projects
          </a>
          <a href="/posts" className="text-slate-300 hover:text-blue-400 transition-colors">
            Posts
          </a>
          <a
            href="https://github.com/coder0951"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            GitHub
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-slate-300" />
            <div className="w-6 h-0.5 bg-slate-300" />
            <div className="w-6 h-0.5 bg-slate-300" />
          </div>
        </button>
      </div>
    </nav>
  );
};
