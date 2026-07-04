import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: '#f5f5dc',
        'beige-dark': '#f5f2ec',
        'beige-light': '#ece7d4',
        'brand-dark': '#1a1a1a',
        'brand-muted': '#6c665d',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // clamp sizes used across headings — use as text-[clamp(...)] arbitrary values inline
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
    },
  },
  plugins: [],
}

export default config
