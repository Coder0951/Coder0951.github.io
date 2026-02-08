import React, { useState } from 'react';

interface SkillsTagCloudProps {
  skills: Record<string, string[]>;
}

export const SkillsTagCloud: React.FC<SkillsTagCloudProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Flatten all skills with their categories
  const allSkills = Object.entries(skills).flatMap(([category, skillList]) =>
    skillList.map((skill) => ({ skill, category }))
  );

  // Filter based on selected category
  const displayedSkills = selectedCategory
    ? allSkills.filter((item) => item.category === selectedCategory)
    : allSkills;

  // Color mapping for categories
  const categoryColors: Record<string, string> = {
    'AI & Machine Learning': 'bg-blue-500/20 border-blue-500/50 text-blue-300 hover:bg-blue-500/30 hover:border-blue-400',
    'Computer Vision & Image Processing': 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30 hover:border-emerald-400',
    'Data Science & Analytics': 'bg-violet-500/20 border-violet-500/50 text-violet-300 hover:bg-violet-500/30 hover:border-violet-400',
    'Programming Languages': 'bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30 hover:border-amber-400',
    'Data Architecture & ETL': 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30 hover:border-cyan-400',
    'Databases & Data Platforms': 'bg-pink-500/20 border-pink-500/50 text-pink-300 hover:bg-pink-500/30 hover:border-pink-400',
    'Business Intelligence & Visualization': 'bg-purple-500/20 border-purple-500/50 text-purple-300 hover:bg-purple-500/30 hover:border-purple-400',
    'Cloud & Infrastructure': 'bg-sky-500/20 border-sky-500/50 text-sky-300 hover:bg-sky-500/30 hover:border-sky-400',
    'Cybersecurity & Compliance': 'bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30 hover:border-red-400',
    'Workforce Management & Operations': 'bg-teal-500/20 border-teal-500/50 text-teal-300 hover:bg-teal-500/30 hover:border-teal-400',
    'Call Center & Communication Systems': 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/30 hover:border-indigo-400',
    'Business & Operations': 'bg-orange-500/20 border-orange-500/50 text-orange-300 hover:bg-orange-500/30 hover:border-orange-400',
    'Technical Support & Troubleshooting': 'bg-lime-500/20 border-lime-500/50 text-lime-300 hover:bg-lime-500/30 hover:border-lime-400',
    'Hardware & Systems': 'bg-rose-500/20 border-rose-500/50 text-rose-300 hover:bg-rose-500/30 hover:border-rose-400',
    'CRM & Business Tools': 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-300 hover:bg-fuchsia-500/30 hover:border-fuchsia-400',
    'Leadership & Soft Skills': 'bg-green-500/20 border-green-500/50 text-green-300 hover:bg-green-500/30 hover:border-green-400',
    'Information Architecture & Knowledge Management': 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/30 hover:border-yellow-400',
  };

  const getColorClass = (category: string) => {
    return categoryColors[category] || 'bg-slate-500/20 border-slate-500/50 text-slate-300 hover:bg-slate-500/30';
  };

  const categories = Object.keys(skills);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            selectedCategory === null
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-700'
          }`}
        >
          All ({allSkills.length})
        </button>
        {categories.map((category) => {
          const count = skills[category].length;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-700'
              }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Tag Cloud */}
      <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-lg p-8 min-h-[400px]">
        <div className="flex flex-wrap gap-3 justify-center">
          {displayedSkills.map(({ skill, category }, index) => (
            <button
              key={`${category}-${skill}-${index}`}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`
                px-4 py-2 rounded-full border text-sm font-semibold
                transition-all duration-300 transform
                ${getColorClass(category)}
                ${hoveredSkill === skill ? 'scale-110 shadow-lg' : 'scale-100'}
                hover:scale-110 active:scale-95
              `}
              style={{
                animationDelay: `${index * 20}ms`,
                animation: 'fadeInUp 0.5s ease-out forwards',
              }}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Hover Info */}
        {hoveredSkill && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900/95 border border-blue-500/50 rounded-lg px-4 py-2 shadow-xl pointer-events-none">
            <p className="text-blue-400 font-semibold text-sm whitespace-nowrap">
              {hoveredSkill}
            </p>
          </div>
        )}

        {selectedCategory && (
          <div className="absolute top-4 right-4 bg-blue-500/20 border border-blue-500/50 rounded-lg px-4 py-2">
            <p className="text-blue-400 font-semibold text-sm">
              {selectedCategory}
            </p>
            <p className="text-slate-400 text-xs mt-1">
              {displayedSkills.length} skill{displayedSkills.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-slate-400 text-sm space-y-1">
        <p>💡 Click any skill tag to filter by category</p>
        <p>🎯 Use category buttons above for quick filtering</p>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
