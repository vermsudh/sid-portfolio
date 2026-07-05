'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

// Wraps the app with next-themes, driving the `data-theme` attribute the
// token stylesheet (globals.css §2.1) keys off. Dark is the default hero
// experience; system preference is intentionally disabled (spec §3.1).
//
// MotionConfig reducedMotion="user" makes every Framer Motion animation on the
// site (transforms, scroll reveals, marquee, stagger) honor the visitor's
// prefers-reduced-motion setting in one place (spec §8). A CSS safety net in
// globals.css covers any non-Framer animations/transitions.
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  )
}
