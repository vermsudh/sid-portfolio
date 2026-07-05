import type { Metadata } from 'next'
import ProjectRow from '@/components/Projects/ProjectRow'
import { orderedProjects } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Projects — Sudhanshu Verma',
  description: 'Selected front-end, full-stack, and automation work.',
}

export default function ProjectsRoute() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto max-w-layout px-8 pt-24 pb-16 max-[768px]:px-5 max-[768px]:pt-20">
        {/* Header */}
        <header className="max-w-[46ch]">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-text">
            // selected work
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5rem)] font-black uppercase leading-[0.98] text-text">
            Projects
          </h1>
          <p className="mt-5 font-body text-[1.05rem] leading-[1.7] text-muted">
            A ranked selection of front-end, full-stack, and automation work — each
            built end to end.
          </p>
        </header>

        {/* Ranked rows */}
        <div className="mt-4">
          {orderedProjects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  )
}
