'use client'

import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

// Normalized project shape (spec §5.4 content architecture). Stage 4's content
// files conform to this. `thumbnail` is optional: a real imported image swaps in
// with zero layout change; a string TODO / null renders the pending placeholder.
export interface ProjectRowData {
  slug: string
  title: string
  category: string
  description: string
  tags: string[]
  status?: string | null
  link?: string | null
  behanceLink?: string | null
  thumbnail?: StaticImageData | string | null
}

// A thumbnail is renderable only when it's an imported asset (StaticImageData)
// or an absolute public path. String TODO placeholders never render as an image.
function renderableImage(
  thumbnail: ProjectRowData['thumbnail']
): StaticImageData | string | null {
  if (!thumbnail) return null
  if (typeof thumbnail === 'string') return thumbnail.startsWith('/') ? thumbnail : null
  return thumbnail
}

function MediaSlot({ project }: { project: ProjectRowData }) {
  const img = renderableImage(project.thumbnail)

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-surface-2">
      {img ? (
        <Image
          src={img}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className="object-cover object-top"
        />
      ) : (
        // Diagonal-hatch "Image pending" placeholder — built so an <Image> above
        // drops in with no restructuring (§7.4).
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, var(--border) 0, var(--border) 1px, transparent 1px, transparent 11px)',
          }}
        >
          <span className="rounded-md border border-dashed border-muted/60 bg-surface/70 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
            Image pending
          </span>
        </div>
      )}
    </div>
  )
}

const ProjectRow = ({ project, index }: { project: ProjectRowData; index: number }) => {
  const rank = String(index + 1).padStart(2, '0')
  // Alternate media side for rhythm; media leads on odd rows.
  const mediaFirst = index % 2 === 1

  return (
    <motion.article
      className="group grid grid-cols-1 items-center gap-8 border-b border-border py-16 md:grid-cols-2 md:gap-14 lg:py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.65, 0.05, 0, 1] }}
    >
      {/* Media */}
      <div className={mediaFirst ? 'md:order-1' : 'md:order-2'}>
        <MediaSlot project={project} />
      </div>

      {/* Text */}
      <div className={mediaFirst ? 'md:order-2' : 'md:order-1'}>
        <div className="flex items-start gap-5">
          <span
            aria-hidden
            className="select-none font-display text-[clamp(3rem,8vw,6rem)] font-black leading-none"
            style={{ WebkitTextStroke: '1px var(--border)', color: 'transparent' }}
          >
            {rank}
          </span>

          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-3 pt-1">
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                {rank} — {project.category}
              </span>
              {project.status && (
                <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                  {project.status}
                </span>
              )}
            </div>

            <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold uppercase leading-[1.05] text-text">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="mt-5 max-w-[46ch] font-body text-[1rem] leading-[1.7] text-muted">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-2 font-body text-[0.95rem] font-semibold text-accent-text transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            View case study
            <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
          </Link>

          {project.behanceLink && (
            <a
              href={project.behanceLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-body text-[0.95rem] font-medium text-muted transition-colors duration-200 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Behance ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectRow
