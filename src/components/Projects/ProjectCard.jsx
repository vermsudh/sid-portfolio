import { motion } from 'framer-motion';
import './Projects.css';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.article
      className="project-card"
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        delay: index * 0.1,
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Thumbnail — real screenshot or gradient placeholder */}
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="project-image"
        />
      ) : (
        <div className="project-image-placeholder" aria-hidden="true">
          <span className="project-image-initial">
            {project.title.charAt(0)}
          </span>
        </div>
      )}

      <div className="project-card-body">
        {/* builtWith badge */}
        {project.builtWith && (
          <span className="project-built-with">Built with {project.builtWith}</span>
        )}

        <div className="project-card-top">
          <div>
            <h3 className="project-title">{project.title}</h3>
            {project.status && (
              <span className="project-status">{project.status}</span>
            )}
          </div>
        </div>

        <p className="project-description">{project.description}</p>

        {project.features && (
          <ul className="project-features">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}

        <div className="project-card-footer">
          <div className="project-tech">
            {project.techStack.map((tech) => (
              <span key={tech} className="project-tag">
                {tech}
              </span>
            ))}
          </div>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="project-live-link"
            >
              View Live ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
