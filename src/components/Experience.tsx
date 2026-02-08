import React from 'react';
import resumeData from '../data/resume.json';

// Function to parse bold markdown (**text**) and render as JSX
const parseBoldText = (text: string): React.ReactNode => {
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the bold
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Add the bold text
    parts.push(
      <strong key={match.index} className="text-slate-100">
        {match[1]}
      </strong>
    );
    lastIndex = boldRegex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

export const Experience: React.FC = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto bg-slate-900/30">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
          Professional Experience
        </h2>
        <p className="text-xl text-slate-400">
          Building innovative solutions with focus on security, scalability, and impact.
        </p>
      </div>

      <div className="space-y-8">
        {resumeData.experience.map((job) => (
          <div
            key={job.id}
            className="relative pl-8 pb-8 border-l-2 border-blue-500/30 hover:border-blue-500/60 transition-colors"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-1 -translate-x-[9px] w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-950" />

            <div className="space-y-2 mb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h3 className="text-2xl font-bold text-slate-100">
                  {job.position}
                </h3>
                <span className="text-sm font-mono text-slate-500 bg-slate-800/50 px-3 py-1 rounded w-fit">
                  {job.duration}
                </span>
              </div>
              <p className="text-lg text-blue-400 font-medium">{job.company}</p>
            </div>

            {/* Check if job has sub-roles */}
            {job.subRoles ? (
              <div className="space-y-4">
                {job.subRoles.map((subRole, subIdx) => (
                  <div key={subIdx}>
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">
                      {subRole.title}
                    </h4>
                    <ul className="space-y-2">
                      {subRole.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="text-slate-300 flex items-start leading-relaxed break-words"
                        >
                          <span className="text-blue-400 mr-3 mt-1 flex-shrink-0">▸</span>
                          <span>{parseBoldText(highlight)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-2">
                {job.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="text-slate-300 flex items-start leading-relaxed break-words"
                  >
                    <span className="text-blue-400 mr-3 mt-1 flex-shrink-0">▸</span>
                    <span>{parseBoldText(highlight)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
