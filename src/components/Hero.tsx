import React from 'react';
import resumeData from '../data/resume.json';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen flex items-center">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-purple-900/20" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="mb-6">
          <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-mono">
            AI Research & Engineering
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-slate-100 mb-2 leading-tight">
          Tyger Guzman
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-blue-400 font-semibold mb-8">
          Full-Stack Engineer | Data Intelligence | Security
        </h2>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 mb-8">
          <a
            href="tel:361-726-3399"
            className="text-slate-300 hover:text-blue-400 transition"
          >
            📞 361-726-3399
          </a>
          <a
            href="mailto:tyger0951@gmail.com"
            className="text-slate-300 hover:text-blue-400 transition"
          >
            ✉️ tyger0951@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/tyger-guzman-a7166490"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-blue-400 transition"
          >
            💼 LinkedIn
          </a>
          <a
            href="https://coder0951.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-blue-400 transition"
          >
            🌐 Portfolio
          </a>
        </div>
        
        <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-3xl leading-relaxed">
          {resumeData.summary}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a
            href="#projects"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-lg shadow-lg shadow-blue-500/30"
          >
            View My Work
          </a>
          <a
            href="#experience"
            className="px-8 py-3 border-2 border-slate-700 hover:border-blue-500 text-slate-300 hover:text-blue-400 rounded-lg transition-colors font-medium text-lg"
          >
            Experience →
          </a>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-6 pt-8 pb-4 border-t border-slate-800/50">
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">
              6+
            </div>
            <div className="text-slate-500 text-sm md:text-base">Companies</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform">
              20+
            </div>
            <div className="text-slate-500 text-sm md:text-base">Years Experience</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2 group-hover:scale-110 transition-transform">
              20+
            </div>
            <div className="text-slate-500 text-sm md:text-base">Technologies</div>
          </div>
        </div>
      </div>
    </section>
  );
};
