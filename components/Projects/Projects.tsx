'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { getFeaturedProjects } from '@/data/projects'

const featuredProjects = getFeaturedProjects()

const Projects = () => {
  return (
    <section className="bg-beige text-brand-dark py-[100px] px-8 font-sans box-border max-[980px]:py-[84px] max-[980px]:px-5 max-[640px]:py-[72px] max-[640px]:px-5 max-[480px]:py-16 max-[480px]:px-4" id="projects">
      <div className="w-full max-w-layout mx-auto">
        <div className="mb-11 max-[640px]:mb-8">
          <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.05] text-brand-dark text-center mb-3">Selected Projects</h2>
          <p className="m-auto text-center text-base font-medium text-brand-muted">
            A preview of my work across front-end, full-stack, and automation
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:gap-[18px]">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-11 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center px-7 py-3 rounded-lg border-[1.5px] border-brand-dark text-brand-dark text-[0.95rem] font-semibold no-underline transition-[background,color] duration-200 ease-out hover:bg-brand-dark hover:text-beige max-[480px]:w-full max-[480px]:justify-center"
          >
            See all projects →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
