import React from 'react';
import aboutData from '../data/about.json';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 max-w-5xl mx-auto">
      {/* Top Skills */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-slate-100 mb-4">Top Skills</h3>
        <div className="flex flex-wrap gap-3">
          {aboutData.topSkills.map((skill, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded-lg text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Professional Arc */}
      <div className="mb-12 bg-slate-900/40 border border-slate-800 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-slate-100 mb-4">
          The Professional Arc: 20 Years of Telemetry
        </h3>
        <p className="text-slate-300 mb-4">
          {aboutData.professionalArcIntro}
        </p>
        <ul className="space-y-3 mb-4">
          {aboutData.professionalArcPoints.map((point, idx) => (
            <li key={idx} className="text-slate-300">
              <span className="font-semibold text-blue-300">{point.title}:</span>{' '}
              {point.description}
            </li>
          ))}
        </ul>
        <p className="text-slate-300">
          {aboutData.professionalArcClosing}
        </p>
      </div>

      {/* USAA Overview */}
      <div className="mb-12 bg-slate-900/40 border border-slate-800 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-slate-100 mb-4">
          Core Engineering at USAA
        </h3>
        <p className="text-slate-300 mb-4">
          {aboutData.usaaOverview}
        </p>
        <ul className="space-y-3">
          {aboutData.usaaPoints.map((point, idx) => (
            <li key={idx} className="text-slate-300">
              <span className="font-semibold text-blue-300">{point.title}:</span>{' '}
              {point.description}
            </li>
          ))}
        </ul>
      </div>

      {/* AI Research & Adversarial Forensics */}
      <div className="mb-12 bg-slate-900/40 border border-slate-800 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-slate-100 mb-4">
          AI Research & Adversarial Forensics
        </h3>
        <p className="text-slate-300 mb-4">
          {aboutData.aiResearchIntro}
        </p>
        <ul className="space-y-3">
          {aboutData.aiResearchPoints.map((point, idx) => (
            <li key={idx} className="text-slate-300">
              <span className="font-semibold text-purple-300">{point.title}:</span>{' '}
              {point.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Technical Toolkit */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-slate-100 mb-6">Technical Toolkit</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-blue-300 mb-3">Languages</h4>
            <ul className="text-slate-300 space-y-1">
              {aboutData.technicalToolkit.languages.map((lang, idx) => (
                <li key={idx}>• {lang}</li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-purple-300 mb-3">Data Architecture</h4>
            <ul className="text-slate-300 space-y-1">
              {aboutData.technicalToolkit.dataArchitecture.map((tool, idx) => (
                <li key={idx}>• {tool}</li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-pink-300 mb-3">Cloud & Infrastructure</h4>
            <ul className="text-slate-300 space-y-1">
              {aboutData.technicalToolkit.cloudInfrastructure.map((tool, idx) => (
                <li key={idx}>• {tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-slate-700 rounded-lg p-6">
        <p className="text-slate-300 leading-relaxed italic">
          {aboutData.philosophy}
        </p>
      </div>
    </section>
  );
};
