import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ink + Lime tokens — backed by CSS variables so they flip per theme (§3.3)
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        'accent-text': 'var(--accent-text)',
      },
      fontFamily: {
        // three-role type system (§2.3)
        display: ['var(--font-display)', 'Archivo', 'sans-serif'],
        body: ['var(--font-body)', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-body)', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // clamp sizes used across headings (§3.3)
        hero: 'clamp(2.5rem, 6vw, 5rem)',
        section: 'clamp(1.75rem, 4vw, 3rem)',
        'contact-title': 'clamp(2rem, 5vw, 3.5rem)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.375rem',
      },
      maxWidth: {
        layout: '1200px',
      },
      backdropBlur: {
        xs: '4px',
        sm: '6px',
      },
      transitionTimingFunction: {
        // reserved easing token for the later motion phase (§2.4)
        ink: 'cubic-bezier(0.65, 0.05, 0, 1)',
      },
    },
  },
  plugins: [],
}

export default config
