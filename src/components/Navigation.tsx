import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          &lt;coder0951 /&gt;
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('hero')} className="text-slate-300 hover:text-blue-400 transition-colors">
            Home
          </button>
          <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-blue-400 transition-colors">
            About
          </button>
          <button onClick={() => scrollToSection('experience')} className="text-slate-300 hover:text-blue-400 transition-colors">
            Experience
          </button>
          <button onClick={() => scrollToSection('skills')} className="text-slate-300 hover:text-blue-400 transition-colors">
            Skills
          </button>
          <button onClick={() => scrollToSection('projects')} className="text-slate-300 hover:text-blue-400 transition-colors">
            Projects
          </button>
          <Link to="/posts" className="text-slate-300 hover:text-blue-400 transition-colors">
            Posts
          </Link>
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
