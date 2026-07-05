'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { MediaSlot, type ProjectRowData } from './ProjectRow'

// Ported from the approved reference demo (featured-projects-horizontal-preview.html):
// - Outer wrapper height = projects.length * 100vh — that extra height IS the
//   scroll distance the pin consumes.
// - Inner content is `sticky`, pinned below the navbar (same NAVBAR_HEIGHT offset
//   pattern as components/About/About.tsx) for the duration of that scroll.
// - Progress is a plain scroll-listener + getBoundingClientRect() read (matches the
//   demo exactly — no rAF/lerp smoothing here; the per-slide CSS transition is what
//   supplies the motion, since this is a discrete stepped reveal, not a continuous drag).
// Runs on every breakpoint, including mobile — the layout below is deliberately
// compacted (smaller type/media/gaps) so a full slide fits inside one mobile
// viewport without internal scrolling.
const NAVBAR_HEIGHT = 70 // px — components/Navbar/Navbar.tsx `h-[70px]`

type SlideState = 'current' | 'prev' | 'next'

const slideClasses: Record<SlideState, string> = {
  current: 'translate-x-0 opacity-100',
  prev: '-translate-x-[6%] opacity-0 pointer-events-none',
  next: 'translate-x-[6%] opacity-0 pointer-events-none',
}

const FeaturedProjectsPinned = ({ projects }: { projects: ProjectRowData[] }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const total = projects.length

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let lastIndex = -1

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect()
      const scrolled = -rect.top
      const maxScroll = rect.height - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrolled / maxScroll)) : 0

      let next = Math.floor(progress * total)
      if (next >= total) next = total - 1
      if (next < 0) next = 0

      if (next !== lastIndex) {
        lastIndex = next
        setIndex(next)
      }
    }

    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [total])

  return (
    <div ref={wrapperRef} className="relative" style={{ height: `${total * 100}vh` }}>
      <div
        className="sticky flex flex-col overflow-hidden px-5 lg:justify-center lg:px-8"
        style={{ top: NAVBAR_HEIGHT, height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
      >
        <div className="mx-auto flex h-full w-full max-w-layout flex-col lg:block">
          {/* Section head — mono eyebrow + display heading + live counter */}
          <div className="flex items-end justify-between gap-4 border-b border-border pb-3 pt-4 lg:gap-6 lg:pb-6 lg:pt-0">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent-text lg:text-[0.72rem]">
                // featured work
              </p>
              <h2 className="mt-1.5 font-display text-[clamp(1.5rem,5vw,3.5rem)] font-black uppercase leading-[1.02] text-text lg:mt-3">
                Selected Projects
              </h2>
            </div>
            <span className="shrink-0 pb-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted lg:pb-2 lg:text-[0.72rem]">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Slide stage — flex-1 so it fills whatever vertical space remains
              between the head and the dots/hint, on any viewport height. */}
          <div className="relative min-h-0 flex-1 lg:mt-10 lg:flex-none">
            <div className="relative h-full lg:h-[min(52vh,520px)]">
              {projects.map((project, i) => {
                const state: SlideState = i === index ? 'current' : i < index ? 'prev' : 'next'
                const rank = String(i + 1).padStart(2, '0')

                return (
                  <div
                    key={project.slug}
                    className={`absolute inset-0 grid grid-cols-1 content-center gap-3 overflow-hidden transition-[transform,opacity] duration-[650ms] ease-ink lg:grid-cols-2 lg:content-normal lg:items-center lg:gap-14 ${slideClasses[state]}`}
                    aria-hidden={state !== 'current'}
                  >
                    <div className="shrink-0">
                      <MediaSlot project={project} />
                    </div>

                    <div>
                      <div className="flex items-start gap-3 lg:gap-5">
                        <span
                          aria-hidden
                          className="select-none font-display text-[clamp(1.75rem,7vw,5rem)] font-black leading-none lg:text-[clamp(3rem,6vw,5rem)]"
                          style={{ WebkitTextStroke: '1.5px var(--border)', color: 'transparent' }}
                        >
                          {rank}
                        </span>

                        <div className="flex-1">
                          <div className="mb-1 flex flex-wrap items-center gap-2 pt-1 lg:mb-3 lg:gap-3">
                            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted lg:text-[0.72rem]">
                              {project.category}
                            </span>
                            {project.status && (
                              <span className="rounded-full border border-border bg-surface-2 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted lg:px-2.5 lg:py-1 lg:text-[0.65rem]">
                                {project.status}
                              </span>
                            )}
                          </div>

                          <h3 className="font-display text-[clamp(1.1rem,3.6vw,2.2rem)] font-bold uppercase leading-[1.05] text-text lg:text-[clamp(1.5rem,2.6vw,2.2rem)]">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-2 line-clamp-2 max-w-[40ch] font-body text-[0.85rem] leading-[1.5] text-muted lg:mt-5 lg:line-clamp-none lg:text-[1rem] lg:leading-[1.7]">
                        {project.description}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-1.5 lg:mt-6 lg:gap-2.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-surface px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted lg:px-3 lg:py-1.5 lg:text-[0.7rem]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-4 lg:mt-8 lg:gap-6">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="group/link inline-flex items-center gap-2 font-body text-[0.85rem] font-semibold text-accent-text transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg lg:text-[0.95rem]"
                        >
                          View case study
                          <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
                        </Link>

                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 font-body text-[0.85rem] font-medium text-muted transition-colors duration-200 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg lg:text-[0.95rem]"
                          >
                            Live Site ↗
                          </a>
                        )}

                        {project.behanceLink && (
                          <a
                            href={project.behanceLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 font-body text-[0.85rem] font-medium text-muted transition-colors duration-200 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg lg:text-[0.95rem]"
                          >
                            Behance ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-2 flex shrink-0 items-center justify-center gap-2 lg:mt-8 lg:gap-2.5">
            {projects.map((project, i) => (
              <span
                key={project.slug}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 lg:h-2 lg:w-2 ${
                  i === index ? 'scale-125 bg-accent' : 'bg-border'
                }`}
              />
            ))}
          </div>

          <p className="mb-3 mt-1 shrink-0 text-center font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted lg:mb-0 lg:mt-4 lg:text-[0.68rem]">
            Keep scrolling to see the next project
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProjectsPinned
