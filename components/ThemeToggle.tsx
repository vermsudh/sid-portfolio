'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FiMoon, FiSun } from 'react-icons/fi'

// Pill switch (52×28) per spec §7.1. A lime dot slides 24px on toggle with the
// reserved easing token. Reusable/testable independently of the Navbar.
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // next-themes only knows the real theme on the client — render a stable
  // placeholder on the server to avoid a hydration mismatch / flash.
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? isDark : undefined}
      aria-label="Toggle dark and light theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative inline-flex h-[28px] w-[52px] shrink-0 items-center rounded-full border border-border bg-surface-2 px-[3px] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <span
        className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-accent text-accent-ink shadow-sm transition-transform duration-[350ms] ease-ink"
        style={{ transform: mounted && !isDark ? 'translateX(24px)' : 'translateX(0)' }}
      >
        {mounted && !isDark ? (
          <FiSun className="h-[13px] w-[13px]" aria-hidden />
        ) : (
          <FiMoon className="h-[12px] w-[12px]" aria-hidden />
        )}
      </span>
    </button>
  )
}
