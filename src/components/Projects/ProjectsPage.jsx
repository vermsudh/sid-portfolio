import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Projects.css';
import './ProjectsPage.css';
import ProjectCard from './ProjectCard';
import { projects, getCategoryCount } from '../../data/projects';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Front-end' },
  { key: 'fullstack', label: 'Full-stack' },
  { key: 'automation', label: 'Automation' },
];

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="projects-page">
      <div className="projects-page-container">
        <motion.div
          className="projects-page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="projects-page-title">Projects</h1>
          <p className="projects-page-subtitle">
            Front-end builds, full-stack applications, and automation systems
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="filter-tabs"
          role="tablist"
          aria-label="Filter projects by category"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
        >
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              role="tab"
              aria-selected={activeFilter === filter.key}
              className={`filter-tab ${activeFilter === filter.key ? 'is-active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
              <span className="filter-tab-count">
                {getCategoryCount(filter.key)}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Animated project grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsPage;
