import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
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
        
        {/* Desktop menu */}
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
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <div className="space-y-1">
            <div className={`w-6 h-0.5 bg-slate-300 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-6 h-0.5 bg-slate-300 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-slate-300 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-4 py-4 bg-slate-950/95 border-t border-slate-800 space-y-3">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="block w-full text-left px-4 py-2 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="block w-full text-left px-4 py-2 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('experience')} 
            className="block w-full text-left px-4 py-2 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            Experience
          </button>
          <button 
            onClick={() => scrollToSection('skills')} 
            className="block w-full text-left px-4 py-2 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            Skills
          </button>
          <button 
            onClick={() => scrollToSection('projects')} 
            className="block w-full text-left px-4 py-2 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            Projects
          </button>
          <Link 
            to="/posts" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-2 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            Posts
          </Link>
          <a
            href="https://github.com/coder0951"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};
