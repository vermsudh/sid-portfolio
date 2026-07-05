'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiMenu, HiX } from 'react-icons/hi'
import ThemeToggle from '@/components/ThemeToggle'

const navLinkClass =
  "relative font-body text-[15px] font-medium text-muted no-underline py-1 transition-colors duration-200 hover:text-text after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1.5px] after:bg-accent-text after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:outline-none focus-visible:text-text max-[768px]:text-[14px]"

const mobileNavLinkClass =
  'block font-body text-[1.1rem] font-medium text-text no-underline py-3 border-b border-border last:border-b-0 transition-colors duration-200 hover:text-accent-text focus-visible:outline-none focus-visible:text-accent-text'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Close on any route change, including links inside the bar (e.g. "Hire me")
  // that aren't part of the dropdown panel itself.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  return (
    <nav
      ref={menuRef}
      className="sticky top-0 z-[1000] w-full h-[70px] bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] backdrop-blur-[6px] border-b border-border flex items-center"
    >
      <div className="w-full max-w-[1264px] mx-auto px-8 flex items-center justify-between box-border max-[768px]:px-5">
        <Link
          href="/"
          aria-label="Home"
          className="relative shrink-0 no-underline leading-none group font-display text-[1.35rem] font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <span className="text-text transition-colors duration-200 group-hover:text-accent-text">SID</span>
          <span className="text-accent-text">.</span>
        </Link>

        <div className="flex items-center gap-[30px] max-[768px]:gap-[18px]">
          {/* Plain text links collapse on mobile behind the hamburger; Hire me + toggle stay visible */}
          <Link href="/projects" className={`${navLinkClass} max-[560px]:hidden`}>
            Projects
          </Link>
          <Link href="/experience" className={`${navLinkClass} max-[560px]:hidden`}>
            Experience
          </Link>

          <Link
            href="/contact"
            className="font-body text-[15px] font-semibold rounded-full bg-accent text-accent-ink px-5 py-2 transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg max-[768px]:text-[14px] max-[768px]:px-4"
          >
            Hire me
          </Link>

          <ThemeToggle />

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="hidden max-[560px]:inline-flex items-center justify-center h-9 w-9 -mr-1 rounded-full text-text transition-colors duration-200 hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {isMenuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — links hidden from the bar above reappear here below 560px */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 hidden max-[560px]:block w-full bg-[color-mix(in_srgb,var(--surface)_97%,transparent)] backdrop-blur-[6px] border-b border-border px-5 py-2 shadow-lg">
          <Link href="/projects" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
            Projects
          </Link>
          <Link href="/experience" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
            Experience
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
