'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import astraeaLogo from '@/assets/astraea-logo.png'
import leonsLogo from '@/assets/leons-logo.png'

const experiences = [
  {
    company: 'Astraea',
    role: 'SDE Intern',
    date: 'Dec 2025 — Present',
    location: 'New Delhi, India',
    logo: astraeaLogo,
    fallback: 'A',
    points: [
      'Developed browser automation scripts using Python and JavaScript, reducing manual effort and improving workflow efficiency',
      'Built an automation pipeline for ITAT case law extraction using LLM APIs (Gemini) with secure API key handling and captcha solving',
      'Designing an intelligent agent to extract, structure, and manage legal data with a focus on scalability and accuracy',
      'Contributing to end-to-end system development including backend services, database design, and frontend interfaces',
      'Collaborating using Git and GitHub for version control, issue tracking, and team-based development',
    ],
  },
  {
    company: "Leon's Furniture",
    role: 'Desktop Administrator',
    date: 'Aug 2022 — Nov 2025',
    location: 'Toronto, Canada',
    logo: leonsLogo,
    fallback: 'L',
    points: [
      'Reduced major IT infrastructure incidents by 80% through proactive monitoring and efficient incident response, including data breach triage and documentation',
      'Led hardware upgrades across 1000+ systems and ensured seamless pin pad functionality across 500+ retail stores via MCM server management',
      'Resolved 90% of desktop and remote support issues across Windows and macOS environments, maintaining high system uptime and security compliance',
    ],
  },
]

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
      className="bg-gradient-to-b from-beige to-[#f7f4eb] text-brand-dark py-[100px] px-8 font-sans box-border max-[768px]:py-[84px] max-[768px]:px-5 max-[520px]:py-[72px] max-[520px]:px-4"
      id="experience"
      ref={sectionRef}
    >
      <div className="w-full max-w-layout mx-auto">
        <div className="grid grid-cols-[96px_minmax(0,1fr)] mb-14 max-[768px]:mb-11 max-[520px]:mb-9">
          <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.05] text-brand-dark mb-3 text-left max-[520px]:text-[clamp(2rem,10vw,2.8rem)]">
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Static track line */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: '47px',
              background:
                'linear-gradient(180deg,rgba(120,114,102,0.12) 0%,rgba(120,114,102,0.45) 15%,rgba(120,114,102,0.45) 85%,rgba(120,114,102,0.12) 100%)',
            }}
          />

          {/* Scroll-driven glow progress */}
          <div
            ref={progressRef}
            className="absolute top-0 w-[2px] rounded-sm transition-[height] duration-[150ms] linear"
            style={{
              left: '47px',
              height: '0%',
              background:
                'linear-gradient(to bottom,rgba(120,114,102,0.2),rgba(120,114,102,0.9),rgba(120,114,102,0.2))',
              boxShadow:
                '0 0 8px rgba(120,114,102,0.4),0 0 18px rgba(120,114,102,0.25)',
            }}
          />

          {experiences.map((item, index) => (
            <article
              key={`${item.company}-${item.role}`}
              className={`grid gap-7 items-start mb-9 last:mb-0 transition-[opacity,transform] duration-700 ease-out max-[768px]:gap-[18px] max-[768px]:mb-7 max-[520px]:mb-0 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{
                gridTemplateColumns: '96px minmax(0,1fr)',
                transitionDelay: `${index * 140}ms`,
              }}
            >
              {/* Company logo dot */}
              <div className="relative flex justify-center items-start pt-1">
                <div className="relative w-[46px] h-[46px] rounded-full bg-[#fcfbf6] border border-[rgba(66,62,55,0.12)] shadow-[0_10px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] flex items-center justify-center overflow-hidden transition-[transform,box-shadow] duration-[250ms] ease-out hover:scale-[1.12] hover:shadow-[0_14px_28px_rgba(0,0,0,0.09),inset_0_1px_0_rgba(255,255,255,0.8)] z-10 group max-[768px]:w-[38px] max-[768px]:h-[38px] max-[520px]:w-[34px] max-[520px]:h-[34px]">
                  <Image
                    src={item.logo}
                    alt={`${item.company} logo`}
                    fill
                    className="object-cover rounded-full grayscale sepia-[20%] brightness-110 saturate-[0.2] opacity-[0.85] transition-[filter,transform,opacity] duration-[350ms] ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.05] group-hover:brightness-100 group-hover:saturate-100 group-hover:sepia-0"
                    onError={(e) => {
                      const img = e.currentTarget
                      img.style.display = 'none'
                      const fallback = img.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = 'flex'
                    }}
                  />
                  <span className="hidden w-full h-full items-center justify-center text-[0.95rem] font-bold text-[#4d483f]">
                    {item.fallback}
                  </span>
                </div>
              </div>

              {/* Card */}
              <div className="bg-[rgba(255,255,255,0.62)] border border-[rgba(66,62,55,0.08)] rounded-[22px] p-[28px_30px] shadow-[0_14px_32px_rgba(0,0,0,0.05)] transition-[transform,box-shadow,background-color] duration-[250ms] ease-out hover:-translate-y-[5px] hover:bg-[rgba(255,255,255,0.74)] hover:shadow-[0_18px_36px_rgba(0,0,0,0.08)] max-[768px]:p-[22px_20px] max-[768px]:rounded-[18px] max-[520px]:p-[18px_16px]">
                <div className="mb-[18px]">
                  <h3 className="m-0 mb-[6px] text-[1.35rem] font-bold leading-[1.2] text-[#1f1d1a] max-[768px]:text-[1.18rem]">
                    {item.role}
                  </h3>
                  <p className="m-0 mb-2 text-base font-semibold text-[#37332d]">{item.company}</p>
                  <p className="m-0 text-[0.94rem] font-medium text-[#6e685e] flex flex-wrap gap-2 items-center max-[520px]:text-[0.88rem]">
                    {item.date} <span>•</span> {item.location}
                  </p>
                </div>

                <ul className="m-0 pl-[18px] grid gap-[10px] max-[520px]:gap-2">
                  {item.points.map((point) => (
                    <li key={point} className="text-[#454038] leading-[1.7] text-[0.98rem] max-[768px]:text-[0.95rem] max-[520px]:leading-[1.6] max-[520px]:text-[0.92rem]">
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
