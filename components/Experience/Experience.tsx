'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { experiences } from '@/content/experience/experience'

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Scroll reveal
  useEffect(() => {
    const node = sectionRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(node!)
        }
      },
      { threshold: 0.2 }
    )
    if (node) observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Timeline glow progress
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      const progress = progressRef.current
      if (!section || !progress) return
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const total = rect.height
      const visible = windowHeight - rect.top
      const percent = Math.max(0, Math.min(visible / total, 1))
      progress.style.height = `${percent * 100}%`
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className="bg-bg text-text py-24 px-8 box-border max-[768px]:py-20 max-[768px]:px-5 max-[520px]:py-16 max-[520px]:px-4"
      id="experience"
      ref={sectionRef}
    >
      <div className="w-full max-w-layout mx-auto">
        <div className="mb-14 max-[768px]:mb-11 max-[520px]:mb-9">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-text">
            // experience
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,6vw,4rem)] font-black uppercase leading-[1.02] text-text max-[520px]:text-[clamp(2rem,10vw,2.8rem)]">
            Experience
          </h2>
        </div>

        {/* Timeline — the one place on this page that carries the lime accent */}
        <div className="relative">
          {/* Static track line — quiet, structural */}
          <div
            className="absolute top-0 bottom-0 w-px bg-border"
            style={{ left: '47px' }}
          />

          {/* Scroll-driven glow progress — lime, the organizing thread */}
          <div
            ref={progressRef}
            className="absolute top-0 w-[2px] rounded-sm bg-accent transition-[height] duration-[150ms] linear"
            style={{
              left: '47px',
              height: '0%',
              boxShadow: '0 0 8px rgba(211,253,80,0.5), 0 0 18px rgba(211,253,80,0.3)',
            }}
          />

          {experiences.map((item, index) => (
            <article
              key={`${item.company}-${item.role}`}
              className={`grid grid-cols-[96px_minmax(0,1fr)] gap-7 items-start mb-9 last:mb-0 transition-[opacity,transform] duration-700 ease-out max-[768px]:grid-cols-[64px_minmax(0,1fr)] max-[768px]:gap-[18px] max-[768px]:mb-7 max-[520px]:grid-cols-[52px_minmax(0,1fr)] max-[520px]:mb-0 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{
                transitionDelay: `${index * 140}ms`,
              }}
            >
              {/* Company logo dot */}
              <div className="relative flex justify-center items-start pt-1">
                <div className="relative w-[46px] h-[46px] rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden transition-transform duration-[250ms] ease-out hover:scale-[1.12] z-10 group max-[768px]:w-[38px] max-[768px]:h-[38px] max-[520px]:w-[34px] max-[520px]:h-[34px]">
                  <Image
                    src={item.logo}
                    alt={`${item.company} logo`}
                    fill
                    sizes="46px"
                    className="object-cover rounded-full grayscale opacity-[0.85] transition-[filter,transform,opacity] duration-[350ms] ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.05]"
                    onError={(e) => {
                      const img = e.currentTarget
                      img.style.display = 'none'
                      const fallback = img.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = 'flex'
                    }}
                  />
                  <span className="hidden w-full h-full items-center justify-center font-display text-[0.95rem] font-bold text-text">
                    {item.fallback}
                  </span>
                </div>
              </div>

              {/* Card */}
              <div className="bg-surface border border-border rounded-[22px] p-[28px_30px] transition-[transform,box-shadow,border-color] duration-[250ms] ease-out hover:-translate-y-[5px] hover:border-accent-text max-[768px]:p-[22px_20px] max-[768px]:rounded-[18px] max-[520px]:p-[18px_16px]">
                <div className="mb-[18px]">
                  <h3 className="m-0 mb-[6px] font-display text-[1.35rem] font-bold leading-[1.2] text-text max-[768px]:text-[1.18rem]">
                    {item.role}
                  </h3>
                  <p className="m-0 mb-2 font-body text-base font-medium text-muted">{item.company}</p>
                  <p className="m-0 font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted flex flex-wrap gap-2 items-center max-[520px]:text-[0.72rem]">
                    {item.date} <span aria-hidden>•</span> {item.location}
                  </p>
                </div>

                <ul className="m-0 pl-[18px] grid gap-[10px] max-[520px]:gap-2">
                  {item.points.map((point) => (
                    <li key={point} className="font-body text-muted leading-[1.7] text-[0.98rem] max-[768px]:text-[0.95rem] max-[520px]:leading-[1.6] max-[520px]:text-[0.92rem]">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
