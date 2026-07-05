'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import heroImage from '@/assets/hero-image.webp'
import { hero } from '@/content/site/hero'
import { heroSocials } from '@/content/site/social-links'

const textContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.5,
      ease: 'easeOut',
    },
  },
}

// Photo's real aspect ratio (1200x1600, 3:4 portrait) — keeps the fluid clamp()
// width from distorting the image at any viewport size.
const IMAGE_ASPECT = '3 / 4'

const Hero = () => {
  return (
    <section className="min-h-screen bg-bg text-text pt-10 px-8 pb-0 box-border max-[900px]:pt-6 max-[900px]:px-5" id="hero">
      <div className="mx-auto grid h-[calc(100vh-90px)] w-full max-w-[1400px] grid-cols-[0.85fr_1.3fr_0.85fr] items-stretch gap-8 max-[900px]:grid-cols-1 max-[900px]:h-auto max-[900px]:gap-10 max-[900px]:py-8">
        {/* Left column — name + short positioning line */}
        <motion.div
          className="flex flex-col justify-center max-[900px]:order-1"
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-display text-[clamp(2.5rem,4.5vw,4rem)] font-black uppercase leading-[1] mb-4 text-text"
            variants={fadeUpVariants}
          >
            {hero.name}
          </motion.h1>

          <motion.p
            className="max-w-[24ch] text-[clamp(1rem,1.6vw,1.2rem)] font-semibold text-text"
            variants={fadeUpVariants}
          >
            {hero.subline}
          </motion.p>
        </motion.div>

        {/* Center column — original photo (full background kept), rounded-square, fluid-sized */}
        <motion.div
          className="flex items-center justify-center max-[900px]:order-2"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            className="relative w-[clamp(280px,36vw,560px)] overflow-hidden rounded-2xl border border-border max-[900px]:w-[clamp(240px,72vw,420px)]"
            style={{ aspectRatio: IMAGE_ASPECT }}
          >
            <Image
              src={heroImage}
              alt="Sudhanshu Verma"
              fill
              priority
              sizes="(max-width: 900px) 72vw, 560px"
              className="object-cover object-center"
            />
          </div>
        </motion.div>

        {/* Right column — badge, CTAs, socials */}
        <motion.div
          className="flex flex-col justify-center items-start max-[900px]:order-3 max-[900px]:items-center max-[900px]:text-center"
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUpVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
              {hero.availabilityBadge}
            </span>
          </motion.div>

          <motion.div className="flex flex-wrap items-center gap-4 mb-8 max-[900px]:justify-center" variants={fadeUpVariants}>
            <Link
              href={hero.ctas.primary.href}
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 font-body text-[0.95rem] font-semibold text-accent-ink transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {hero.ctas.primary.label}
            </Link>
            <Link
              href={hero.ctas.secondary.href}
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-body text-[0.95rem] font-semibold text-text transition-colors duration-200 hover:border-accent-text hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {hero.ctas.secondary.label}
            </Link>
          </motion.div>

          {/* Social icons — LinkedIn → Behance → Email */}
          <motion.div className="flex items-center gap-3" variants={fadeUpVariants}>
            {heroSocials.map(({ label, href, Icon }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted text-[1.15rem] transition-colors duration-200 hover:border-accent-text hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <Icon />
                </a>
              ) : null
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
