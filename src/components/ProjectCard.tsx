import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-100 mb-2">
            {project.title}
          </h3>
          <div className="flex gap-2 items-center text-sm">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              project.status === 'Active' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {project.status}
            </span>
            <span className="text-slate-500">{project.year}</span>
          </div>
        </div>
      </div>

      <p className="text-slate-300 mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-slate-800/50 text-slate-300 rounded-full text-xs font-mono border border-slate-700"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Highlights */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-400 mb-2">Key Highlights:</h4>
        <ul className="space-y-1">
          {project.highlights.slice(0, 3).map((highlight, index) => (
            <li key={index} className="text-sm text-slate-400 flex items-start">
              <span className="text-blue-400 mr-2">▹</span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Links */}
      <div className="flex gap-3 pt-4 border-t border-slate-800">
        {(project.id === 'open-the-eyes' || project.id === 'knowledge-engineering') ? (
          <Link
            to={`/projects/${project.id}`}
            className="flex-1 text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium text-sm"
          >
            View Full Documentation →
          </Link>
        ) : (
          <Link
            to={project.documentationUrl}
            className="flex-1 text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium text-sm"
          >
            Forensic Documentation →
          </Link>
        )}
      </div>
    </div>
  );
};
