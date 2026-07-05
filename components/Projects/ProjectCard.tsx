'use client'

import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'

interface Project {
  id: number
  category: string
  title: string
  description: string
  status?: string
  features?: string[]
  techStack: string[]
  liveLink?: string
  image: StaticImageData | null
  imagePosition?: string
  imageFit?: string
  imageBg?: string
  builtWith?: string
  featured?: boolean
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.article
      className="flex flex-col h-full rounded-2xl bg-[rgba(255,255,255,0.72)] border border-[rgba(26,26,26,0.08)] shadow-[0_10px_28px_rgba(0,0,0,0.05)] backdrop-blur-[4px] overflow-hidden transition-[box-shadow,border-color,background-color] duration-300 ease-out hover:shadow-[0_18px_36px_rgba(0,0,0,0.08)] hover:border-[rgba(26,26,26,0.12)] hover:bg-[rgba(255,255,255,0.84)]"
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
      {project.image && (
        <div className="relative w-full h-[200px] border-b border-[rgba(26,26,26,0.06)]">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
            className="object-cover object-top"
            style={{
              ...(project.imagePosition && { objectPosition: project.imagePosition }),
              ...(project.imageFit && { objectFit: project.imageFit as 'cover' | 'contain' }),
              ...(project.imageBg && { backgroundColor: project.imageBg }),
            }}
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6 max-[640px]:p-5 max-[480px]:p-4">
        {project.builtWith && (
          <span className="inline-flex items-center px-[10px] py-1 rounded-full bg-[#e8f0ea] text-[#2d5a3d] text-[0.75rem] font-semibold mb-[10px]">
            Built with {project.builtWith}
          </span>
        )}

        <div className="mb-[14px]">
          <h3 className="m-0 mb-2 text-[1.28rem] font-bold leading-[1.25] text-[#1f1d1a]">{project.title}</h3>
          {project.status && (
            <span className="inline-flex items-center px-[10px] py-[5px] rounded-full bg-[#ece7d8] text-[#5f584d] text-[0.78rem] font-semibold">
              {project.status}
            </span>
          )}
        </div>

        <p className="m-0 mb-[18px] text-[0.97rem] leading-[1.7] text-[#4a453d]">{project.description}</p>

        {project.features && (
          <ul className="m-0 mb-[22px] pl-[22px] list-disc grid gap-[10px]">
            {project.features.map((feature) => (
              <li key={feature} className="text-[0.95rem] leading-[1.65] text-[#3f3a33] marker:text-black marker:text-[0.95rem]">
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4 max-[480px]:flex max-[480px]:flex-col max-[480px]:gap-3">
          <div className="flex flex-wrap gap-[10px] mb-[14px] max-[480px]:mb-0">
            {project.techStack.map((tech) => (
              <span key={tech} className="inline-flex items-center px-[11px] py-[5px] rounded-full bg-tag-bg border border-[rgba(26,26,26,0.06)] text-[#5d574d] text-[0.78rem] font-semibold">
                {tech}
              </span>
            ))}
          </div>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg border-[1.5px] border-brand-dark text-brand-dark text-[0.85rem] font-semibold no-underline transition-[background,color] duration-200 ease-out hover:bg-brand-dark hover:text-beige max-[480px]:self-start"
            >
              View Live ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
