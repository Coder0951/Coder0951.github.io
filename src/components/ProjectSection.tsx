import React from 'react';
import { ProjectCard } from './ProjectCard';
import projectsData from '../data/projects.json';
import type { Project } from '../types/project';

export const ProjectSection: React.FC = () => {
  const projects = projectsData as Project[];

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
          Featured Projects & Research
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl">
          A showcase of my technical work spanning AI research, computer vision, and knowledge engineering.
          Each project includes comprehensive forensic documentation and production implementations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </section>
  );
};
