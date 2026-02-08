import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { ProjectSection } from './components/ProjectSection';
import { PostsIndex } from './components/PostsIndex';
import { PostPage } from './components/PostPage';
import ProjectOpenTheEyes from './components/ProjectOpenTheEyes';
import ProjectKnowledgeEngineering from './components/ProjectKnowledgeEngineering';
import ProjectSyntheticData from './components/ProjectSyntheticData';
import { Footer } from './components/Footer';
import './App.css';

function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <ProjectSection />
      </div>
      <Footer />
    </>
  );
}

function ForensicDocPage() {
  return (
    <div className="min-h-screen py-20 px-4 max-w-4xl mx-auto">
      <Navigation />
      <div className="text-slate-400 mt-20">
        <p>Forensic documentation pages coming soon...</p>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<><Navigation /><PostsIndex /><Footer /></>} />
        <Route path="/posts/:slug" element={<><Navigation /><PostPage /><Footer /></>} />
        <Route path="/projects/open-the-eyes" element={<ProjectOpenTheEyes />} />
        <Route path="/projects/knowledge-engineering" element={<ProjectKnowledgeEngineering />} />
        <Route path="/projects/synthetic-data" element={<ProjectSyntheticData />} />
        <Route path="/forensics/*" element={<ForensicDocPage />} />
      </Routes>
    </Router>
  );
}

export default App;
