'use client'

import { motion } from 'framer-motion'

const skills = [
  'Python',
  'MySQL',
  'Git',
  'GitHub',
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'REST APIs',
  'Web Scraping',
]

const duplicatedSkills = [...skills, ...skills]

const Skills = () => {
  return (
    <section className="bg-bg py-[90px] px-8 box-border max-[768px]:py-[72px] max-[768px]:px-5 max-[520px]:py-[60px] max-[520px]:px-5" id="skills">
      <div className="w-full max-w-layout mx-auto">
        <h2 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-black uppercase leading-[1.05] text-text text-center mb-3">
          Skills
        </h2>

        <div className="relative overflow-hidden w-full py-2">
          <motion.div
            className="flex items-center gap-[18px] w-max will-change-transform max-[768px]:gap-[14px]"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicatedSkills.map((skill, index) => (
              <div key={`${skill}-${index}`} className="flex items-center gap-[18px] max-[768px]:gap-[14px]">
                <span
                  className="font-display text-[1.6rem] font-bold uppercase tracking-wide whitespace-nowrap text-transparent transition-colors duration-300 [-webkit-text-stroke:1px_var(--muted)] hover:text-accent-text hover:[-webkit-text-stroke:0px] max-[768px]:text-[1.35rem] max-[520px]:text-[1.15rem]"
                >
                  {skill}
                </span>
                <span className="text-accent-text text-[1rem]" aria-hidden>
                  ✦
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills
