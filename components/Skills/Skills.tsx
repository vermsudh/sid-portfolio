'use client'

import { motion } from 'framer-motion'
import {
  FaPython,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaSpider,
} from 'react-icons/fa'
import { SiMysql, SiGit } from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import type { IconType } from 'react-icons'

interface Skill {
  name: string
  icon: IconType
  color: string
}

const skills: Skill[] = [
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: FaGithub, color: '#181717' },
  { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'REST APIs', icon: TbApi, color: '#6366f1' },
  { name: 'Web Scraping', icon: FaSpider, color: '#6b7280' },
]

const duplicatedSkills = [...skills, ...skills]

const Skills = () => {
  return (
    <section className="bg-beige py-[90px] px-8 text-brand-dark font-sans box-border max-[768px]:py-[72px] max-[768px]:px-5 max-[520px]:py-[60px] max-[520px]:px-5" id="skills">
      <div className="w-full max-w-layout mx-auto">
        <h2 className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.05] text-brand-dark text-center mb-3">Skills</h2>

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
            {duplicatedSkills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex-none min-w-[150px] inline-flex items-center gap-3 px-[18px] py-[14px] rounded-2xl border border-[rgba(26,26,26,0.08)] bg-[rgba(255,255,255,0.34)] text-[#4f4b43] shadow-[0_8px_20px_rgba(0,0,0,0.04)] backdrop-blur-[4px] transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-[6px] hover:bg-[rgba(255,255,255,0.55)] hover:border-[rgba(26,26,26,0.12)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.08)] group max-[768px]:min-w-[132px] max-[768px]:px-4 max-[768px]:py-3 max-[768px]:rounded-[14px] max-[520px]:min-w-[118px] max-[520px]:px-[14px] max-[520px]:py-[11px] max-[520px]:gap-[10px]"
                  style={{ '--brand-color': skill.color } as React.CSSProperties}
                >
                  <Icon
                    className="text-[1.6rem] text-[#6c685f] transition-colors duration-300 group-hover:[color:var(--brand-color)] max-[768px]:text-[1.45rem] max-[520px]:text-[1.3rem]"
                  />
                  <span className="text-[0.98rem] font-medium leading-none text-[#2f2c28] whitespace-nowrap max-[768px]:text-[0.92rem] max-[520px]:text-[0.88rem]">
                    {skill.name}
                  </span>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills
