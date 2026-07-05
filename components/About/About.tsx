'use client'

import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { about } from '@/content/site/about'

// Lazy-lerp scroll reveal, ported from the approved reference demo:
// - targetProgress derives from how far we've scrolled through the OUTER wrapper
//   (not the sticky inner content, whose rect stops changing once pinned).
// - currentProgress chases targetProgress every animation frame via a lerp, which
//   is what produces the "lazy," gently-catching-up feel — no lerp = instant jump,
//   which defeats the point.
// - activeCount = floor(currentProgress * totalWords); word i is active iff
//   i < activeCount. This walks words in strict reading order (index-based), not
//   by vertical position — position-based checks activate whole lines at once,
//   which is the bug this implementation avoids.
const LAZY_FACTOR = 0.06
const NAVBAR_HEIGHT = 70 // px — components/Navbar/Navbar.tsx `h-[70px]`
const FAINT_COLOR = 'color-mix(in srgb, var(--muted) 35%, transparent)'

const About = () => {
  const outerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const currentProgressRef = useRef(0)
  const rafRef = useRef<number>(0)

  const words = useMemo(() => about.paragraph.split(' '), [])

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    const tick = () => {
      const rect = outer.getBoundingClientRect()
      const scrolled = -rect.top
      const maxScroll = rect.height - window.innerHeight
      const target = maxScroll > 0 ? Math.min(1, Math.max(0, scrolled / maxScroll)) : 1

      currentProgressRef.current += (target - currentProgressRef.current) * LAZY_FACTOR

      const activeCount = Math.floor(currentProgressRef.current * words.length)
      wordRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.color = i < activeCount ? 'var(--text)' : FAINT_COLOR
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [words.length])

  return (
    // Outer wrapper — its extra height (beyond 100vh) IS the scroll distance the
    // pin consumes. Tune this value to feel; ~250vh is the starting point.
    <section
      id="about"
      ref={outerRef}
      className="relative bg-bg min-h-[250vh] max-[640px]:min-h-[170vh]"
    >
      {/* Inner sticky content — stays pinned below the navbar until the outer
          wrapper's extra height runs out, then releases to Experience below. */}
      <div
        className="sticky flex flex-col items-center justify-center px-8 text-center"
        style={{ top: NAVBAR_HEIGHT, height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
      >
        <motion.p
          className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-text"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {about.eyebrow}
        </motion.p>

        <motion.h2
          className="mt-4 font-display text-[clamp(2.2rem,5vw,3.75rem)] font-black uppercase leading-[1.02] text-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {about.heading}
        </motion.h2>

        <p className="mt-8 max-w-[46rem] text-[clamp(1.2rem,2.6vw,1.8rem)] font-body leading-[1.6]">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordRefs.current[i] = el
              }}
              style={{ color: FAINT_COLOR, transition: 'color 0.5s ease' }}
              className="mr-[0.3em] inline-block"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default About
