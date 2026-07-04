'use client'

import { motion, type Variants } from 'framer-motion'
import aboutBackground from '@/assets/about-me-background.png'

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
}

const RevealText = ({ text }: { text: string }) => {
  return (
    <motion.p
      className="m-0 text-base leading-[1.85] text-[#3f3b36] max-[900px]:text-[0.98rem] max-[900px]:leading-[1.8] max-[520px]:text-[0.95rem] max-[520px]:leading-[1.75]"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          style={{ display: 'inline-block', marginRight: '6px' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}

const About = () => {
  return (
    <section
      className="relative overflow-hidden bg-beige text-brand-dark py-[110px] px-8 font-sans box-border isolate max-[900px]:py-[90px] max-[900px]:px-5 max-[520px]:py-[72px] max-[520px]:px-5"
      id="about"
    >
      {/* Blurred background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat scale-[1.03] blur-[4px] max-[900px]:blur-[3px] max-[900px]:scale-[1.02]"
        style={{ backgroundImage: `url(${aboutBackground.src})` }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-[rgba(245,245,220,0.62)]" aria-hidden="true" />

      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex flex-col items-start text-left gap-5 max-w-[540px] max-[900px]:max-w-full max-[520px]:gap-4">
          <motion.h2
            className="m-0 mb-2 text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.05] text-brand-dark max-[900px]:text-[clamp(2rem,7vw,3rem)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          <RevealText text="I'm a Software Developer focused on building automation tools, data extraction systems, and developer-friendly workflows. My work primarily involves using Python and JavaScript to automate repetitive processes, collect structured data from complex sources, and build reliable backend pipelines." />

          <RevealText text="Currently, I'm working as an SDE Intern where I'm developing an intelligent system that extracts and organizes ITAT case law data, transforming unstructured legal documents into structured datasets." />

          <RevealText text="I enjoy designing systems that combine automation, scraping, and backend services to solve real-world problems and improve developer workflows." />

          <RevealText text="My background in infrastructure and system operations also gives me a strong understanding of networking, security fundamentals, and debugging complex production systems." />
        </div>
      </div>
    </section>
  )
}

export default About
