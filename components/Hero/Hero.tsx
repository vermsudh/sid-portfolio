'use client'

import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import profileImage from '@/assets/profile.png'

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.9,
      ease: 'easeOut',
    },
  },
}

const Hero = () => {
  return (
    <section className="min-h-screen bg-beige text-brand-dark pt-6 px-8 pb-12 box-border max-[900px]:pt-5 max-[900px]:px-5 max-[900px]:pb-10" id="hero">
      <div className="w-full flex items-center justify-between max-w-[1200px] mx-auto mb-10">
        <span className="text-base font-bold tracking-[0.08em] uppercase">Sudhanshu Verma</span>
      </div>

      <div className="w-full max-w-[1200px] min-h-[calc(100vh-120px)] mx-auto grid grid-cols-[1.2fr_1fr] items-center gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">
        <motion.div
          className="max-[900px]:flex max-[900px]:flex-col max-[900px]:gap-2"
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="text-[1.1rem] font-semibold text-[#333] mb-3" variants={fadeUpVariants}>
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            className="text-[clamp(3.5rem,7vw,6rem)] font-extrabold leading-[1.05] mb-4 text-[#444]"
            variants={fadeUpVariants}
          >
            Sudhanshu
          </motion.h1>

          <motion.p className="text-base font-medium mb-5 text-[#333]" variants={fadeUpVariants}>
            SDE Intern @ Astraea | Python • SQL • Web Scraping • Data Analysis
          </motion.p>

          <motion.p
            className="max-w-[540px] text-base leading-[1.8] text-[#555] mb-8 max-[900px]:max-w-full"
            variants={fadeUpVariants}
          >
            I build Python tools that automate data collection and processing
            workflows. My work focuses on web scraping, data extraction, and
            building pipelines that transform unstructured information into
            structured datasets for analysis and insights.
          </motion.p>

          <motion.div className="flex items-center gap-[18px] mb-8 max-[520px]:gap-[14px]" variants={fadeUpVariants}>
            <motion.a
              href="https://www.linkedin.com/in/vermsudh/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-[52px] h-[52px] border border-brand-dark rounded-full text-brand-dark bg-transparent text-[1.25rem] transition-all duration-[250ms] ease-out cursor-pointer hover:bg-brand-dark hover:text-beige hover:-translate-y-[2px] max-[520px]:w-12 max-[520px]:h-12"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <FaLinkedinIn />
            </motion.a>

            <motion.a
              href="https://github.com/vermsudh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-[52px] h-[52px] border border-brand-dark rounded-full text-brand-dark bg-transparent text-[1.25rem] transition-all duration-[250ms] ease-out cursor-pointer hover:bg-brand-dark hover:text-beige hover:-translate-y-[2px] max-[520px]:w-12 max-[520px]:h-12"
              aria-label="GitHub"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <FaGithub />
            </motion.a>

            <motion.a
              href="mailto:vermsudh@gmail.com"
              className="inline-flex items-center justify-center w-[52px] h-[52px] border border-brand-dark rounded-full text-brand-dark bg-transparent text-[1.25rem] transition-all duration-[250ms] ease-out cursor-pointer hover:bg-brand-dark hover:text-beige hover:-translate-y-[2px] max-[520px]:w-12 max-[520px]:h-12"
              aria-label="Email"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <FiMail />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center items-center max-[900px]:order-2"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-[min(460px,88vw)] aspect-square flex items-center justify-center bg-[#ece7d4] rounded-full overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] max-[900px]:w-[min(360px,92vw)]">
            <Image
              src={profileImage}
              alt="Sudhanshu profile"
              fill
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
