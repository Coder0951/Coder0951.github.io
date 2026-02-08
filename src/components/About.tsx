import React, { useState } from 'react';
import aboutData from '../data/about.json';

export const About: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id="about" className="py-16 px-4 max-w-5xl mx-auto">
      {/* Top Skills - Compact */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-100 mb-3">Top Skills</h3>
        <div className="flex flex-wrap gap-2">
          {aboutData.topSkills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded-lg text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Three Card Accordion Row - All expand/collapse together */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-100 mb-3">Professional Background</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Professional Arc */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-lg overflow-hidden">
            <button
              onClick={toggleAccordion}
              className="w-full p-3 bg-slate-800/30 text-left hover:bg-slate-800/50 transition-colors flex items-center justify-between"
            >
              <h4 className="text-base font-bold text-slate-100">
                The Professional Arc
              </h4>
              <svg
                className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-2 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isExpanded && (
              <div className="p-3 border-t border-slate-800">
                <p className="text-slate-300 mb-3 text-xs leading-relaxed">
                  {aboutData.professionalArcIntro}
                </p>
                <ul className="space-y-2 mb-3">
                  {aboutData.professionalArcPoints.map((point, idx) => (
                    <li key={idx} className="text-slate-300 text-xs leading-relaxed">
                      <span className="font-semibold text-blue-300">{point.title}:</span>{' '}
                      {point.description}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {aboutData.professionalArcClosing}
                </p>
              </div>
            )}
          </div>

          {/* Core Engineering at USAA */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-lg overflow-hidden">
            <button
              onClick={toggleAccordion}
              className="w-full p-3 bg-slate-800/30 text-left hover:bg-slate-800/50 transition-colors flex items-center justify-between"
            >
              <h4 className="text-base font-bold text-slate-100">
                Core Engineering at USAA
              </h4>
              <svg
                className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-2 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isExpanded && (
              <div className="p-3 border-t border-slate-800">
                <p className="text-slate-300 mb-3 text-xs leading-relaxed">
                  {aboutData.usaaOverview}
                </p>
                <ul className="space-y-2">
                  {aboutData.usaaPoints.map((point, idx) => (
                    <li key={idx} className="text-slate-300 text-xs leading-relaxed">
                      <span className="font-semibold text-blue-300">{point.title}:</span>{' '}
                      {point.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* AI Research & Adversarial Forensics */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-lg overflow-hidden">
            <button
              onClick={toggleAccordion}
              className="w-full p-3 bg-slate-800/30 text-left hover:bg-slate-800/50 transition-colors flex items-center justify-between"
            >
              <h4 className="text-base font-bold text-slate-100">
                AI Research & Adversarial Forensics
              </h4>
              <svg
                className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-2 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isExpanded && (
              <div className="p-3 border-t border-slate-800">
                <p className="text-slate-300 mb-3 text-xs leading-relaxed">
                  {aboutData.aiResearchIntro}
                </p>
                <ul className="space-y-2">
                  {aboutData.aiResearchPoints.map((point, idx) => (
                    <li key={idx} className="text-slate-300 text-xs leading-relaxed">
                      <span className="font-semibold text-purple-300">{point.title}:</span>{' '}
                      {point.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Technical Toolkit - Modern Tag Design */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-100 mb-4">Technical Toolkit</h3>
        <div className="space-y-4">
          {/* Languages */}
          <div>
            <h4 className="text-sm font-semibold text-blue-300 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              Languages
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {aboutData.technicalToolkit.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-200 rounded text-xs hover:bg-blue-500/20 transition-colors"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Data Architecture */}
          <div>
            <h4 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
              Data Architecture
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {aboutData.technicalToolkit.dataArchitecture.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-200 rounded text-xs hover:bg-purple-500/20 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Cloud & Infrastructure */}
          <div>
            <h4 className="text-sm font-semibold text-pink-300 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
              Cloud & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {aboutData.technicalToolkit.cloudInfrastructure.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-pink-500/10 border border-pink-500/30 text-pink-200 rounded text-xs hover:bg-pink-500/20 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy - Featured Callout */}
      <div className="relative bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border-2 border-blue-400/40 rounded-xl p-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl"></div>
        
        {/* Quote icon */}
        <div className="relative">
          <svg 
            className="w-8 h-8 text-blue-400/40 mb-3" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          
          <p className="text-slate-100 text-base md:text-lg leading-relaxed font-medium relative z-10">
            {aboutData.philosophy}
          </p>
          
          {/* Accent line */}
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
