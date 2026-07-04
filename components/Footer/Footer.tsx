'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

const Footer = () => {
  return (
    <motion.footer
      className="bg-beige border-t border-[#e8e6e3] py-[42px] px-5 pb-[34px] text-center font-sans box-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="max-w-[1100px] mx-auto">
        <p className="mb-[6px] text-[1.15rem] font-bold text-brand-dark">Thanks for visiting.</p>
        <p className="mb-4 text-[0.95rem] text-brand-muted">Get in touch</p>

        <div className="flex justify-center gap-[14px] flex-wrap mb-[18px]">
          <a
            href="https://www.linkedin.com/in/vermsudh/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-[42px] h-[42px] inline-flex items-center justify-center rounded-full no-underline bg-[rgba(255,255,255,0.55)] border border-[rgba(26,26,26,0.08)] text-[#9b927c] text-[1.1rem] shadow-[0_6px_16px_rgba(0,0,0,0.04)] transition-all duration-[250ms] ease-out hover:-translate-y-[3px] hover:bg-[rgba(255,255,255,0.9)] hover:border-[rgba(26,26,26,0.12)] hover:shadow-[0_10px_22px_rgba(0,0,0,0.08)] hover:text-[#0A66C2]"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="mailto:vermsudh@gmail.com"
            aria-label="Email"
            className="w-[42px] h-[42px] inline-flex items-center justify-center rounded-full no-underline bg-[rgba(255,255,255,0.55)] border border-[rgba(26,26,26,0.08)] text-[#9b927c] text-[1.1rem] shadow-[0_6px_16px_rgba(0,0,0,0.04)] transition-all duration-[250ms] ease-out hover:-translate-y-[3px] hover:bg-[rgba(255,255,255,0.9)] hover:border-[rgba(26,26,26,0.12)] hover:shadow-[0_10px_22px_rgba(0,0,0,0.08)] hover:text-[#EA4335]"
          >
            <HiOutlineMail />
          </a>

          <a
            href="https://www.instagram.com/sudhanshu.verma/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-[42px] h-[42px] inline-flex items-center justify-center rounded-full no-underline bg-[rgba(255,255,255,0.55)] border border-[rgba(26,26,26,0.08)] text-[#9b927c] text-[1.1rem] shadow-[0_6px_16px_rgba(0,0,0,0.04)] transition-all duration-[250ms] ease-out hover:-translate-y-[3px] hover:bg-[rgba(255,255,255,0.9)] hover:border-[rgba(26,26,26,0.12)] hover:shadow-[0_10px_22px_rgba(0,0,0,0.08)] hover:text-[#E4405F]"
          >
            <FaInstagram />
          </a>
        </div>

        <div className="flex flex-col gap-1">
          <p className="m-0 text-[0.82rem] text-[#6b6b6b]">© 2026 Sid</p>
          <p className="m-0 text-[0.82rem] text-[#6b6b6b]">Built with Next.js + Tailwind CSS</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
