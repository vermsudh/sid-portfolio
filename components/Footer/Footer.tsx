'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { footerSocials } from '@/content/site/social-links'

const Footer = () => {
  return (
    <motion.footer
      className="border-t border-border bg-bg py-[42px] px-5 pb-[34px] text-center box-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="max-w-[1100px] mx-auto">
        <p className="mb-[6px] font-display text-[1.15rem] font-bold text-text">Thanks for visiting.</p>
        <Link
          href="/contact"
          className="mb-4 inline-block font-body text-[0.95rem] text-muted transition-colors duration-200 hover:text-accent-text"
        >
          Get in touch
        </Link>

        <div className="mt-2 mb-[18px] flex flex-wrap justify-center gap-[14px]">
          {footerSocials
            .filter((social) => social.href)
            .map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href!}
                {...(href!.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}
                aria-label={label}
                className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-border text-muted text-[1.1rem] transition-colors duration-200 hover:border-accent-text hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <Icon />
              </a>
            ))}
        </div>

        <div className="flex flex-col gap-1">
          <p className="m-0 font-mono text-[0.78rem] text-muted">© 2026 Sid</p>
          <p className="m-0 font-mono text-[0.78rem] text-muted">Built with Next.js + Tailwind CSS</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
