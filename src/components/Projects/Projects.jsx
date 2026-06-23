import './Projects.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { getFeaturedProjects } from '../../data/projects';

const featuredProjects = getFeaturedProjects();

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">Selected Projects</h2>
          <p className="projects-subtitle">
            A preview of my work across front-end, full-stack, and automation
          </p>
        </div>

        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className="projects-see-all"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/projects" className="projects-see-all-link">
            See all projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
