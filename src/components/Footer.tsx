import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-4">About</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI Research Engineer focused on building secure, scalable, and intelligent systems.
              Passionate about red-teaming, computer vision, and knowledge engineering.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#projects" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/forensics" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/coder0951" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'PyTorch', 'React', 'TypeScript', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-slate-800/50 text-slate-400 rounded text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {currentYear} coder0951. Built with React, Vite, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};
