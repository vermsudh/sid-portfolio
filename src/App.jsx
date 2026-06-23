import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import ProjectsPage from './components/Projects/ProjectsPage';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Experience />
    <Projects />
    <Skills />
    <Contact />
  </>
);

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
