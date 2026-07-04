'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects, getCategoryCount } from '@/data/projects'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Front-end' },
  { key: 'fullstack', label: 'Full-stack' },
  { key: 'automation', label: 'Automation' },
]

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section className="min-h-screen bg-beige py-[100px] px-8 pb-20 font-sans box-border max-[980px]:py-[84px] max-[980px]:px-5 max-[980px]:pb-16 max-[640px]:py-[72px] max-[640px]:px-5 max-[640px]:pb-14 max-[480px]:py-16 max-[480px]:px-4 max-[480px]:pb-12">
      <div className="w-full max-w-layout mx-auto">
        <motion.div
          className="mb-10 max-[640px]:mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.05] text-brand-dark m-0 mb-3 max-[480px]:text-[2rem]">Projects</h1>
          <p className="text-base font-medium text-brand-muted m-0">
            Front-end builds, full-stack applications, and automation systems
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-[10px] mb-11 max-[640px]:gap-2 max-[640px]:mb-8 max-[480px]:mb-7"
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
              onClick={() => setActiveFilter(filter.key)}
              className={`inline-flex items-center gap-2 px-[18px] py-[9px] rounded-full border-[1.5px] text-[0.88rem] font-semibold cursor-pointer transition-[background,color,border-color] duration-200 ease-out font-sans max-[640px]:px-[14px] max-[640px]:py-2 max-[640px]:text-[0.83rem] max-[480px]:px-3 max-[480px]:py-[7px] max-[480px]:text-[0.8rem] ${
                activeFilter === filter.key
                  ? 'bg-brand-dark text-beige border-brand-dark'
                  : 'bg-tag-bg text-[#5d574d] border-[rgba(26,26,26,0.12)] hover:bg-beige-light hover:border-[rgba(26,26,26,0.2)]'
              }`}
            >
              {filter.label}
              <span className={`inline-flex items-center justify-center min-w-[22px] h-[22px] px-[6px] rounded-full text-[0.75rem] font-bold transition-colors duration-200 ${
                activeFilter === filter.key
                  ? 'bg-[rgba(245,245,220,0.2)] text-beige'
                  : 'bg-[rgba(26,26,26,0.08)] text-[#5d574d]'
              }`}>
                {getCategoryCount(filter.key)}
              </span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-3 gap-6 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:gap-[18px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ProjectsPage
