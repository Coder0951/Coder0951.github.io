export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  highlights: string[];
  documentationUrl: string;
  githubUrl: string;
  tags: string[];
  status: 'Active' | 'Completed' | 'In Progress';
  year: string;
}
