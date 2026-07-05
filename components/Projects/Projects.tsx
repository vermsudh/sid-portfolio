import Link from 'next/link'
import FeaturedProjectsPinned from './FeaturedProjectsPinned'
import { getFeaturedProjects, projects } from '@/content/projects'

const featuredProjects = getFeaturedProjects()

const Projects = () => {
  return (
    <section className="bg-bg text-text box-border" id="projects">
      <FeaturedProjectsPinned projects={featuredProjects} />

      <div className="px-8 pb-24 pt-4 max-[768px]:px-5 max-[768px]:pb-16">
        <div className="mx-auto flex max-w-layout justify-center">
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
