'use client'

import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { useTheme } from 'next-themes'
import { FiMoon, FiSun } from 'react-icons/fi'

// Minimal shape of the View Transitions API — not yet in every lib.dom.d.ts,
// so it's declared locally rather than assumed/global-augmented (which could
// collide with a future TS lib version that does ship it).
type ViewTransition = {
  ready: Promise<void>
}
type DocumentWithViewTransitions = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition
}

// Pill switch (52×28) per spec §7.1. A lime dot slides 24px on toggle with the
// reserved easing token. Reusable/testable independently of the Navbar.
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // next-themes only knows the real theme on the client — render a stable
  // placeholder on the server to avoid a hydration mismatch / flash.
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? 'light' : 'dark'
    const doc = document as DocumentWithViewTransitions
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(next)
      return
    }

    // The dot-matrix reveal (globals.css, ::view-transition-new(root)) reads
    // these off the root element: the click point anchors the traveling
    // circle, and the end radius is the farthest corner so the wipe always
    // clears the viewport. The animation itself is pure CSS and starts as
    // soon as the pseudo-element exists — no WAAPI call needed here.
    const { clientX: x, clientY: y } = event
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )
    const root = document.documentElement
    root.style.setProperty('--dot-wipe-x', `${x}px`)
    root.style.setProperty('--dot-wipe-y', `${y}px`)
    root.style.setProperty('--dot-wipe-end-r', `${endRadius}px`)

    // flushSync forces the setTheme commit (and next-themes' data-theme
    // mutation) to land synchronously inside the transition callback, so the
    // "after" DOM snapshot is captured with the new theme already applied.
    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })

    // The spec allows `ready` to reject (e.g. tab backgrounded mid-click);
    // the theme itself already switched via flushSync above, so there's
    // nothing to recover — just skip the reveal animation silently.
    transition.ready.catch(() => {})
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? isDark : undefined}
      aria-label="Toggle dark and light theme"
      onClick={handleToggle}
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
