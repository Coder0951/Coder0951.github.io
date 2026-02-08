import React, { useState } from 'react';
import resumeData from '../data/resume.json';
import { SkillsTagCloud } from './SkillsTagCloud';

export const Skills: React.FC = () => {
  const [viewMode, setViewMode] = useState<'tag' | 'grid'>('tag');

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100">
            Technical Skills & Expertise
          </h2>
          
          {/* View Toggle */}
          <div className="flex gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-700 flex-wrap">
            <button
              onClick={() => setViewMode('tag')}
              className={`px-4 py-2 rounded text-sm font-semibold transition-all duration-300 ${
                viewMode === 'tag'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🏷️ Tags
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded text-sm font-semibold transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📋 Grid
            </button>
          </div>
        </div>
        <p className="text-xl text-slate-400">
          Full-stack capabilities spanning AI/ML, computer vision, and cloud infrastructure.
        </p>
      </div>

      {/* Tag Cloud View (Default) */}
      {viewMode === 'tag' && (
        <SkillsTagCloud skills={resumeData.skills} />
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(resumeData.skills).map(([category, skills]) => (
            <div
              key={category}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                {category}
              </h3>

              <ul className="space-y-3">
                {Array.isArray(skills) && skills.map((skill, index) => (
                  <li
                    key={index}
                    className="text-slate-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400/50 rounded-full mr-3 group-hover:bg-blue-400 transition-colors" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Additional Skills Summary */}
      <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-slate-300 leading-relaxed">
          <span className="text-blue-400 font-semibold">Specializations: </span>
          Adversarial ML testing, production model deployment, distributed systems, real-time inference optimization, and building secure AI systems at scale.
        </p>
      </div>
    </section>
  );
};
