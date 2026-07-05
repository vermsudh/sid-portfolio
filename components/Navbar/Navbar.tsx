import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

const navLinkClass =
  "relative font-body text-[15px] font-medium text-muted no-underline py-1 transition-colors duration-200 hover:text-text after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1.5px] after:bg-accent-text after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:outline-none focus-visible:text-text max-[768px]:text-[14px]"

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[1000] w-full h-[70px] bg-surface/80 backdrop-blur-[6px] border-b border-border flex items-center">
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
          {/* Plain text links collapse on mobile; Hire me + toggle stay visible (§8) */}
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar
