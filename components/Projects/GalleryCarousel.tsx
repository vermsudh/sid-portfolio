'use client'

import { useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const EASE_INK = [0.65, 0.05, 0, 1] as const

export interface GallerySlide {
  src: StaticImageData | string
  alt: string
  caption?: string
}

function PendingSlot() {
  return (
    <div
      className="flex aspect-[16/9] w-full items-center justify-center rounded-2xl border border-border bg-surface-2"
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, var(--border) 0, var(--border) 1px, transparent 1px, transparent 11px)',
      }}
    >
      <span className="rounded-md border border-dashed border-muted/60 bg-surface/70 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
        Image pending
      </span>
    </div>
  )
}

const SWIPE_THRESHOLD = 60

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -32 : 32, opacity: 0 }),
}

export default function GalleryCarousel({ slides }: { slides: GallerySlide[] }) {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0])
  const total = slides.length

  if (total === 0) return <PendingSlot />

  if (total === 1) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-surface-2">
        <Image
          src={slides[0].src}
          alt={slides[0].alt}
          fill
          sizes="(max-width: 900px) 100vw, 900px"
          className="object-cover object-top"
        />
      </div>
    )
  }

  const go = (dir: number) => setSlide(([current]) => [(current + dir + total) % total, dir])
  const goTo = (i: number) => setSlide(([current]) => [i, i > current ? 1 : -1])

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-surface-2">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: EASE_INK }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) go(1)
              else if (info.offset.x > SWIPE_THRESHOLD) go(-1)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') go(1)
              if (e.key === 'ArrowLeft') go(-1)
            }}
            tabIndex={0}
            className="absolute inset-0 cursor-grab touch-pan-y outline-none active:cursor-grabbing"
          >
            <Image
              src={slides[index].src}
              alt={slides[index].alt}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className="pointer-events-none object-contain"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Previous screenshot"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-surface/80 p-2 text-text backdrop-blur-sm transition-colors duration-200 hover:bg-accent hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="Next screenshot"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-surface/80 p-2 text-text backdrop-blur-sm transition-colors duration-200 hover:bg-accent hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to screenshot ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'scale-125 bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </div>
        <span className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {slides[index].caption && (
        <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted">
          {slides[index].caption}
        </p>
      )}
    </div>
  )
}
