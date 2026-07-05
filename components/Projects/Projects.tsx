import Link from 'next/link'
import ProjectRow from './ProjectRow'
import { getFeaturedProjects, projects } from '@/content/projects'

const featuredProjects = getFeaturedProjects()

const Projects = () => {
  return (
    <section className="bg-bg text-text py-24 px-8 box-border max-[768px]:py-20 max-[768px]:px-5" id="projects">
      <div className="w-full max-w-layout mx-auto">
        {/* Section head — mono eyebrow + display heading + mono counter */}
        <div className="flex items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-text">
              // featured work
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[1.02] text-text">
              Selected Projects
            </h2>
          </div>
          <span className="shrink-0 pb-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">
            {featuredProjects.length} of {projects.length}
          </span>
        </div>

        {/* Ranked rows */}
        <div>
          {featuredProjects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 font-body text-[0.95rem] font-semibold text-accent-ink transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            View all {projects.length} projects
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Projects
