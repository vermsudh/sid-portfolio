'use client'

import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Image from 'next/image'
import heroImage from '@/assets/hero-image.webp'
import { hero } from '@/content/site/hero'
import { heroSocials } from '@/content/site/social-links'

const inkEase = [0.65, 0.05, 0, 1] as const

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: inkEase },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: inkEase },
  },
}

const nameWordVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: inkEase },
  },
}

const socialPopVariants: Variants = {
  hidden: { opacity: 0, scale: 0.55 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: inkEase },
  },
}

const nameWords = hero.fullName.split(' ')

const Hero = () => {
  const reduceMotion = useReducedMotion()

  const photoMotion = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : photoVariants

  const wordMotion = reduceMotion ? fadeUpVariants : nameWordVariants
  const socialMotion = reduceMotion ? fadeUpVariants : socialPopVariants

  return (
    <section id="hero" className="relative min-h-screen bg-bg text-text">
      <motion.div
        className="hero-photo pointer-events-none absolute right-0 top-[-70px] h-[calc(100%+70px)] w-[51%] max-[820px]:left-0 max-[820px]:right-0 max-[820px]:top-auto max-[820px]:bottom-0 max-[820px]:h-[46%] max-[820px]:w-full"
        variants={photoMotion}
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

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1600px] grid-cols-[1fr_51%] items-center gap-8 px-8 max-[820px]:grid-cols-1 max-[820px]:px-5">
        <div className="flex flex-col items-start justify-center py-20 max-[820px]:items-center max-[820px]:pb-[50vh] max-[820px]:pt-24 max-[820px]:text-center">
          {/* Badge — fade up + pulsing availability dot */}
          <motion.div
            className="mb-6"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.12 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              <motion.span
                className="h-2 w-2 rounded-full bg-accent"
                aria-hidden
                animate={
                  reduceMotion
                    ? undefined
                    : { scale: [1, 1.3, 1], opacity: [1, 0.65, 1] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                }
              />
              {hero.availabilityBadge}
            </span>
          </motion.div>

          {/* Name — eyebrow fade, then split-word blur reveal */}
          <h1 className="font-display mb-4 leading-[0.9]">
            <motion.span
              className="mb-2 block text-[clamp(1.1rem,1.6vw,1.4rem)] font-medium normal-case text-muted"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.22 }}
            >
              {hero.eyebrow}
            </motion.span>
            <motion.span
              className="block text-[clamp(3.25rem,8vw,8.25rem)] font-black uppercase tracking-tight text-accent-text"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
            >
              {nameWords.map((word) => (
                <motion.span
                  key={word}
                  variants={wordMotion}
                  className="mr-[0.12em] inline-block last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          {/* Role title — accent bar + tracked display type, one step below the name */}
          <motion.div
            className="mb-7 flex items-center gap-4 max-[820px]:justify-center max-[820px]:gap-3"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.44 }}
          >
            <span
              className="h-[3px] w-12 shrink-0 rounded-full bg-accent max-[820px]:w-8"
              aria-hidden
            />
            <p className="font-display m-0 text-[clamp(1.25rem,2.6vw,2.15rem)] font-semibold uppercase leading-none tracking-[0.08em] text-text">
              {hero.title}
            </p>
          </motion.div>

          <motion.p
            className="mb-8 max-w-[38ch] font-body text-[clamp(1rem,1.6vw,1.2rem)] font-medium text-muted"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.52 }}
          >
            {hero.subline}
          </motion.p>

          <motion.div
            className="mb-8 flex flex-wrap items-center gap-4 max-[820px]:justify-center"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.62 }}
          >
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

          {/* Social icons — scale pop stagger */}
          <motion.div
            className="flex items-center gap-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.08,
                  delayChildren: reduceMotion ? 0.2 : 0.92,
                },
              },
            }}
          >
            {heroSocials.map(({ label, href, Icon }) =>
              href ? (
                <motion.a
                  key={label}
                  href={href}
                  {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}
                  aria-label={label}
                  variants={socialMotion}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted text-[1.15rem] transition-colors duration-200 hover:border-accent-text hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <Icon />
                </motion.a>
              ) : null
            )}
          </motion.div>
        </div>

        <div className="max-[820px]:hidden" aria-hidden />
      </div>
    </section>
  )
}

export default Hero
