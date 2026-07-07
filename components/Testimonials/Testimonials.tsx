'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, Globe } from 'lucide-react'
import { FaLinkedinIn } from 'react-icons/fa6'
import { testimonials, type Testimonial } from '@/content/site/testimonials'

const LAZY_FACTOR = 0.06
const NAVBAR_HEIGHT = 70
const FAINT_COLOR = 'color-mix(in srgb, var(--muted) 35%, transparent)'
const ENTRANCE_END = 0.2
const REVEAL_END = 0.8

const linkClass =
  'inline-flex items-center gap-2 font-body text-[0.9rem] font-medium text-muted transition-colors duration-200 hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t
}

type ChapterRefs = {
  container: HTMLDivElement | null
  attribution: HTMLDivElement | null
  quote: HTMLDivElement | null
  avatar: HTMLDivElement | null
  quoteIcon: SVGSVGElement | null
  words: (HTMLSpanElement | null)[]
}

function TestimonialAttribution({
  item,
  avatarRef,
}: {
  item: Testimonial
  avatarRef?: (el: HTMLDivElement | null) => void
}) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div
          ref={avatarRef}
          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-surface-2 will-change-transform"
        >
          <Image
            src={item.avatar}
            alt={item.author}
            fill
            sizes="64px"
            className="object-cover"
            style={{
              objectPosition: item.avatarPosition ?? 'center',
              ...(item.avatarZoom && { transform: `scale(${item.avatarZoom})` }),
            }}
          />
        </div>
        <div>
          <p className="font-body text-[1.05rem] font-semibold text-text">{item.author}</p>
          <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
            {item.role}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        {item.liveLink && (
          <a href={item.liveLink} target="_blank" rel="noreferrer" className={linkClass}>
            <Globe size={16} strokeWidth={1.75} />
            Live site
          </a>
        )}
        {item.linkedin && (
          <a href={item.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
            <FaLinkedinIn size={15} />
            LinkedIn
          </a>
        )}
      </div>
    </>
  )
}

function StaticTestimonialRow({ item }: { item: Testimonial }) {
  const words = item.quote.split(' ')

  return (
    <article className="grid grid-cols-1 items-center gap-8 border-b border-border py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-14 lg:py-20">
      <div>
        <TestimonialAttribution item={item} />
      </div>
      <div>
        <Quote
          aria-hidden
          size={36}
          strokeWidth={1.5}
          className="mb-4 text-accent-text"
          style={{ transform: 'scaleX(-1)' }}
        />
        <p className="font-display text-[clamp(1.3rem,2.6vw,2rem)] font-medium leading-[1.35]">
          {words.map((word, i) => (
            <span key={i} className="mr-[0.25em] inline text-text">
              {word}
            </span>
          ))}
        </p>
      </div>
    </article>
  )
}

export default function Testimonials() {
  const [reduceMotion, setReduceMotion] = useState(false)
  const outerRef = useRef<HTMLElement>(null)
  const currentProgressRef = useRef(0)
  const rafRef = useRef(0)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const chapterRefs = useRef<ChapterRefs[]>([])

  const wordLists = useMemo(() => testimonials.map((t) => t.quote.split(' ')), [])
  const total = testimonials.length

  const ensureChapterRef = (index: number): ChapterRefs => {
    if (!chapterRefs.current[index]) {
      chapterRefs.current[index] = {
        container: null,
        attribution: null,
        quote: null,
        avatar: null,
        quoteIcon: null,
        words: [],
      }
    }
    return chapterRefs.current[index]
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reduceMotion) return

    const outer = outerRef.current
    if (!outer) return

    const tick = () => {
      const rect = outer.getBoundingClientRect()
      const scrolled = -rect.top
      const maxScroll = rect.height - window.innerHeight
      const target = maxScroll > 0 ? Math.min(1, Math.max(0, scrolled / maxScroll)) : 1

      currentProgressRef.current += (target - currentProgressRef.current) * LAZY_FACTOR
      const p = currentProgressRef.current

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${p * 100}%`
      }

      const activeIndex = Math.min(total - 1, Math.floor(p * total))
      if (counterRef.current) {
        counterRef.current.textContent = `${String(activeIndex + 1).padStart(2, '0')} — ${String(total).padStart(2, '0')}`
      }

      chapterRefs.current.forEach((chapter, i) => {
        if (!chapter.container) return

        const local = clamp(p * total - i, 0, 1)
        const isLast = i === total - 1
        const wordCount = wordLists[i]?.length ?? 0

        let opacity = 0
        let translateY = 0
        let attrX = -60
        let quoteX = 60
        let avatarScale = 0.8
        let iconOpacity = 0
        let pointerEvents: 'none' | 'auto' = 'none'

        if (local <= 0) {
          chapter.words.forEach((el) => {
            if (el) el.style.color = FAINT_COLOR
          })
        } else if (local < ENTRANCE_END) {
          const t = local / ENTRANCE_END
          opacity = t
          attrX = lerp(-60, 0, t)
          quoteX = lerp(60, 0, t)
          avatarScale = lerp(0.8, 1, t)
          iconOpacity = Math.min(1, t * 1.25)
          chapter.words.forEach((el) => {
            if (el) el.style.color = FAINT_COLOR
          })
        } else if (local < REVEAL_END) {
          opacity = 1
          attrX = 0
          quoteX = 0
          avatarScale = 1
          iconOpacity = 1
          pointerEvents = 'auto'

          const revealT = (local - ENTRANCE_END) / (REVEAL_END - ENTRANCE_END)
          const activeCount = Math.round(revealT * wordCount)
          chapter.words.forEach((el, wi) => {
            if (el) el.style.color = wi < activeCount ? 'var(--text)' : FAINT_COLOR
          })
        } else if (isLast) {
          opacity = 1
          attrX = 0
          quoteX = 0
          avatarScale = 1
          iconOpacity = 1
          pointerEvents = 'auto'
          chapter.words.forEach((el) => {
            if (el) el.style.color = 'var(--text)'
          })
        } else {
          const exitT = (local - REVEAL_END) / (1 - REVEAL_END)
          opacity = lerp(1, 0, exitT)
          translateY = lerp(0, -40, exitT)
          attrX = 0
          quoteX = 0
          avatarScale = 1
          iconOpacity = 1
          chapter.words.forEach((el) => {
            if (el) el.style.color = 'var(--text)'
          })
        }

        chapter.container.style.opacity = String(opacity)
        chapter.container.style.transform = `translateY(${translateY}px)`
        chapter.container.style.pointerEvents = pointerEvents
        chapter.container.style.zIndex = local > 0 ? String(i + 1) : '0'

        if (chapter.attribution) {
          chapter.attribution.style.transform = `translateX(${attrX}px)`
          chapter.attribution.style.opacity = String(Math.min(1, opacity + 0.05))
        }
        if (chapter.quote) {
          chapter.quote.style.transform = `translateX(${quoteX}px)`
          chapter.quote.style.opacity = String(Math.min(1, opacity + 0.05))
        }
        if (chapter.avatar) {
          chapter.avatar.style.transform = `scale(${avatarScale})`
        }
        if (chapter.quoteIcon) {
          chapter.quoteIcon.style.opacity = String(iconOpacity)
        }
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reduceMotion, total, wordLists])

  if (reduceMotion) {
    return (
      <section id="testimonials" className="bg-bg px-8 py-20 max-[768px]:px-5">
        <div className="mx-auto max-w-layout">
          <header className="max-w-[46ch]">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-text">
              // kind words
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.75rem)] font-black uppercase leading-[1.02] text-text">
              What clients say
            </h2>
          </header>
          <div className="mt-8">
            {testimonials.map((item) => (
              <StaticTestimonialRow key={item.author} item={item} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="testimonials"
      ref={outerRef}
      className="relative bg-bg min-h-[390vh] max-[640px]:min-h-[280vh]"
    >
      <div
        className="sticky flex flex-col px-8 max-[768px]:px-5"
        style={{ top: NAVBAR_HEIGHT, height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
      >
        <div className="mx-auto flex h-full w-full max-w-layout flex-col pt-6 pb-10">
          <motion.header
            className="max-w-[46ch]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-text">
              // kind words
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[1.02] text-text max-[640px]:text-[clamp(1.8rem,8vw,2.6rem)]">
              What clients say
            </h2>
          </motion.header>

          <div className="mt-6 flex items-center gap-4">
            <span
              ref={counterRef}
              className="shrink-0 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted"
            >
              01 — {String(total).padStart(2, '0')}
            </span>
            <div className="h-px flex-1 overflow-hidden rounded-full bg-border">
              <div
                ref={progressBarRef}
                className="h-full w-0 rounded-full bg-accent-text transition-[width] duration-100 ease-out"
              />
            </div>
          </div>

          <div className="relative mt-8 min-h-0 flex-1">
            {testimonials.map((item, index) => (
              <div
                key={item.author}
                ref={(el) => {
                  ensureChapterRef(index).container = el
                }}
                className="absolute inset-0 grid grid-cols-1 items-center gap-8 opacity-0 will-change-transform md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-14"
                style={{ pointerEvents: 'none' }}
              >
                <div
                  ref={(el) => {
                    ensureChapterRef(index).attribution = el
                  }}
                  className="will-change-transform"
                >
                  <TestimonialAttribution
                    item={item}
                    avatarRef={(el) => {
                      ensureChapterRef(index).avatar = el
                    }}
                  />
                </div>

                <div
                  ref={(el) => {
                    ensureChapterRef(index).quote = el
                  }}
                  className="will-change-transform"
                >
                  <Quote
                    ref={(el) => {
                      ensureChapterRef(index).quoteIcon = el
                    }}
                    aria-hidden
                    size={36}
                    strokeWidth={1.5}
                    className="mb-4 text-accent-text will-change-transform"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  <p className="font-display text-[clamp(1.2rem,2.4vw,1.85rem)] font-medium leading-[1.35] max-[640px]:text-[1.15rem]">
                    {wordLists[index].map((word, wi) => (
                      <span
                        key={wi}
                        ref={(el) => {
                          ensureChapterRef(index).words[wi] = el
                        }}
                        style={{ color: FAINT_COLOR, transition: 'color 0.45s ease' }}
                        className="mr-[0.25em] inline-block"
                      >
                        {word}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
