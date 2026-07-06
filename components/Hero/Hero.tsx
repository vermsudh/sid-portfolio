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

const photoVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.9,
      delay: 0.2,
      ease: 'easeOut',
    },
  },
}

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen bg-bg text-text">
      {/* Photo — bleeds off the top (behind the sticky 70px navbar, see
          components/Navbar/Navbar.tsx) and right edges of the viewport on
          desktop; pinned to the bottom ~46% on mobile. All positioning is
          done via Tailwind classes (not inline style) so the max-[820px]:
          overrides — which must win via the cascade, not lose to inline
          style specificity — actually take effect. Edge fade is a CSS mask
          on the img itself (see .hero-photo-img in globals.css) so the
          section's own --bg shows through in both themes; never a color
          overlay. */}
      <motion.div
        className="hero-photo pointer-events-none absolute right-0 top-[-70px] h-[calc(100%+70px)] w-[51%] max-[820px]:left-0 max-[820px]:right-0 max-[820px]:top-auto max-[820px]:bottom-0 max-[820px]:h-[46%] max-[820px]:w-full"
        variants={photoVariants}
        initial="hidden"
        animate="visible"
      >
        <Image
          src={heroImage}
          alt="Sudhanshu Verma"
          fill
          priority
          sizes="(max-width: 820px) 100vw, 51vw"
          className="hero-photo-img"
        />
      </motion.div>

      {/* Text column reserves its own grid track so it can never run under
          the photo, at any viewport width down to the mobile breakpoint. */}
      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1600px] grid-cols-[1fr_51%] items-center gap-8 px-8 max-[820px]:grid-cols-1 max-[820px]:px-5">
        <motion.div
          className="flex flex-col items-start justify-center py-20 max-[820px]:items-center max-[820px]:pb-[50vh] max-[820px]:pt-24 max-[820px]:text-center"
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

          <motion.h1 className="font-display mb-5 leading-[0.9]" variants={fadeUpVariants}>
            <span className="block text-[clamp(1.1rem,1.6vw,1.4rem)] font-medium normal-case text-muted mb-2">
              {hero.eyebrow}
            </span>
            <span className="block text-[clamp(3.25rem,8vw,8.25rem)] font-black uppercase tracking-tight text-accent-text">
              {hero.fullName}
            </span>
          </motion.h1>

          <motion.p
            className="max-w-[38ch] font-body text-[clamp(1rem,1.6vw,1.2rem)] font-medium text-muted mb-8"
            variants={fadeUpVariants}
          >
            {hero.subline}
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-4 mb-8 max-[820px]:justify-center" variants={fadeUpVariants}>
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

        {/* Empty grid cell — reserves the right-hand width so the photo's
            visual space is never claimed by text, even though the photo
            itself is absolutely positioned and rendered outside this grid. */}
        <div className="max-[820px]:hidden" aria-hidden />
      </div>
    </section>
  )
}

export default Hero
