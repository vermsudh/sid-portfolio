'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote, Globe } from 'lucide-react'
import { FaLinkedinIn } from 'react-icons/fa6'
import { testimonials, type Testimonial } from '@/content/site/testimonials'

const linkClass =
  'inline-flex items-center gap-2 font-body text-[0.9rem] font-medium text-muted transition-colors duration-200 hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

function TestimonialRow({ item, index }: { item: Testimonial; index: number }) {
  // Alternate media side for rhythm; attribution leads on odd rows.
  const attributionFirst = index % 2 === 1

  return (
    <motion.article
      className="grid grid-cols-1 items-center gap-8 border-b border-border py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-14 lg:py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.65, 0.05, 0, 1] }}
    >
      {/* Attribution */}
      <div className={attributionFirst ? 'md:order-2' : 'md:order-1'}>
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-surface-2">
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
      </div>

      {/* Quote */}
      <div className={attributionFirst ? 'md:order-1' : 'md:order-2'}>
        <Quote
          aria-hidden
          size={36}
          strokeWidth={1.5}
          className="mb-4 text-accent-text"
          style={{ transform: 'scaleX(-1)' }}
        />
        <p className="font-display text-[clamp(1.3rem,2.6vw,2rem)] font-medium leading-[1.35] text-text">
          {item.quote}
        </p>
      </div>
    </motion.article>
  )
}

export default function Testimonials() {
  return (
    <div className="mt-4">
      {testimonials.map((item, index) => (
        <TestimonialRow key={item.author} item={item} index={index} />
      ))}
    </div>
  )
}
