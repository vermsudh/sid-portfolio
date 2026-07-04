# Portfolio — Next.js + Tailwind CSS Migration Guide

## Current Stack (Vite + React Router)

```
React 19 + Vite 7
react-router-dom v7        → client-side routing
Framer Motion 12           → all animations
@emailjs/browser           → contact form
react-icons                → all icons
@vercel/analytics + @vercel/speed-insights
Plain CSS (one .css per component, no modules)
```

---

## Current Folder Structure

```
Portfolio/
├── public/
├── src/
│   ├── App.jsx                  # BrowserRouter root; defines two routes
│   ├── App.css                  # global resets (box-sizing, scroll-behavior, body overrides)
│   ├── main.jsx                 # React DOM entry; wraps App in <BrowserRouter>
│   ├── index.css                # Google Fonts import (Inter), base resets
│   │
│   ├── assets/
│   │   ├── profile.png          # hero profile image
│   │   ├── navbar-logo.png      # logo in navbar
│   │   ├── about-me-background.png  # blurred background for About section
│   │   ├── astraea-logo.png     # Experience company logo
│   │   ├── leons-logo.png       # Experience company logo
│   │   └── project_screenshots/ # 8 PNG screenshots used as ProjectCard thumbnails
│   │
│   ├── data/
│   │   └── projects.js          # SINGLE SOURCE OF TRUTH for all 10 projects
│   │                            # Exports: projects[], getFeaturedProjects(),
│   │                            #          getProjectsByCategory(), getCategoryCount()
│   │
│   └── components/
│       ├── Navbar/
│       │   ├── Navbar.jsx       # Sticky nav; logo + 5 links
│       │   └── Navbar.css
│       ├── Hero/
│       │   ├── Hero.jsx         # Framer Motion stagger entrance; profile image
│       │   └── Hero.css
│       ├── About/
│       │   ├── About.jsx        # RevealText component; word-by-word blur-up animation
│       │   └── About.css        # CSS var --about-bg-image for blurred bg
│       ├── Experience/
│       │   ├── Experience.jsx   # Dual animation: IntersectionObserver + scroll listener
│       │   └── Experience.css   # --delay CSS var per item; .is-visible class toggle
│       ├── Projects/
│       │   ├── Projects.jsx     # Homepage preview; 3 featured cards
│       │   ├── ProjectCard.jsx  # Shared card component (used on both pages)
│       │   ├── Projects.css     # Card styles + projects-section styles
│       │   ├── ProjectsPage.jsx # /projects route; filter tabs + AnimatePresence grid
│       │   └── ProjectsPage.css # Filter tab styles
│       ├── Skills/
│       │   ├── Skills.jsx       # Infinite marquee via Framer Motion x animation
│       │   └── Skills.css       # --brand-color CSS var per skill card (for hover)
│       ├── Contact/
│       │   ├── Contact.jsx      # 4-step wizard; EmailJS send on step 3 submit
│       │   └── Contact.css
│       └── Footer/
│           ├── Footer.jsx       # Social links; Framer whileInView fade-up
│           └── Footer.css       # --brand-color CSS var per icon (for hover)
```

---

## Routing (Current)

```
/           → <HomePage />   (Hero → About → Experience → Projects → Skills → Contact)
/projects   → <ProjectsPage />

Navbar and Footer render OUTSIDE <Routes>, so they appear on both pages.

Navbar links:
  - Logo          → href="/#hero"           (hash scroll)
  - About         → href="/#about"          (hash scroll)
  - Experience    → href="/#experience"     (hash scroll)
  - Skills        → href="/#skills"         (hash scroll)
  - Projects      → <Link to="/projects">   (React Router)
  - Contact       → href="/#contact"        (hash scroll)
```

---

## Design Tokens (Color Palette)

All sections use these consistent values — replicate as Tailwind CSS variables or a custom `tailwind.config.js` theme extension:

| Token | Value | Used for |
|-------|-------|----------|
| Background | `#f5f5dc` (beige) | All sections except Contact card |
| Contact card bg | `#ffffff` | Contact card |
| Contact section bg | `#f5f2ec` | Contact section background |
| Primary text | `#1a1a1a` | Headings, nav links |
| Secondary text | `#555` / `#6c665d` | Body copy, subtitles |
| Card bg | `rgba(255,255,255,0.72)` | Project cards, experience cards |
| Card border | `rgba(26,26,26,0.08)` | All cards |
| Tag bg | `#f4f1ea` | Tech stack pills |
| Active/hover fill | `#1a1a1a` | Button hover, active filter tab |
| Active/hover text | `#f5f5dc` | Text on dark button |

---

## Animation Inventory (Framer Motion — keep as-is)

| Component | Animation type | Key detail |
|-----------|---------------|------------|
| Hero | `staggerChildren` on mount | `staggerChildren: 0.15`, `delayChildren: 0.1` |
| Hero image | scale + opacity on mount | `delay: 0.9` |
| About RevealText | word-by-word blur-up | `whileInView once:true`; each word is a `motion.span` |
| Experience items | CSS class toggle + `--delay` var | `IntersectionObserver` sets `isVisible` → `.is-visible` class |
| Experience timeline | scroll-driven bar height | `scroll` event → `progressRef.current.style.height` |
| ProjectCard | stagger by `index * 0.1` | `layout` prop for filter reflow |
| ProjectsPage grid | `AnimatePresence mode="popLayout"` | Re-keys on filter change |
| Skills marquee | `x: ['0%', '-50%']` linear loop | `duration: 22, repeat: Infinity` |
| Contact steps | `AnimatePresence mode="wait"` | `stepVariants` fade + slide |
| Footer | `whileInView` fade-up `once:true` | |

---

## CSS Patterns That Need Special Handling in Tailwind

### 1. CSS custom properties set via `style` prop
Three components pass CSS vars inline that are consumed in `.css`:

```jsx
// About.jsx
style={{ '--about-bg-image': `url(${aboutBackground})` }}
// → consumed in About.css as: background-image: var(--about-bg-image)

// Skills.jsx (per skill card)
style={{ '--brand-color': skill.color }}
// → consumed as: color: var(--brand-color) on hover

// Footer.jsx (per icon)
style={{ '--brand-color': '#0A66C2' }}
// → consumed as: color: var(--brand-color) on hover
```
**Migration note:** In Tailwind, you can keep these inline style vars and use `[color:var(--brand-color)]` arbitrary values, OR replace with group-hover + explicit color classes.

### 2. `clamp()` font sizes
Many headings use `font-size: clamp(2.25rem, 5vw, 3.5rem)`.
**Migration note:** Tailwind doesn't have `clamp()` by default. Use `text-[clamp(2.25rem,5vw,3.5rem)]` arbitrary values, or add a custom `fontSize` entry in `tailwind.config.js`.

### 3. `::before` / `::after` pseudo-elements with blurred backgrounds
About section uses `::before` for the blurred background image + `::after` for the overlay.
**Migration note:** Tailwind supports `before:` and `after:` variants but dynamic `background-image` from a JS import can't be a Tailwind class. Keep `style={{ backgroundImage: url(...) }}` inline on the pseudo-element container, or use a wrapper `<div>` with `absolute inset-0 -z-10` + inline style.

### 4. `.is-visible` class toggling (Experience)
Experience uses `isVisible` state to toggle the `.is-visible` CSS class, which drives `opacity` and `transform` transitions with `transition-delay: var(--delay)`.
**Migration note:** Replace with Tailwind conditional classes:
```jsx
className={`opacity-0 translate-y-5 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : ''}`}
style={{ transitionDelay: `${index * 140}ms` }}
```

### 5. `backdrop-filter: blur()`
Used on Navbar (blur backdrop), ProjectCards, and SkillCards.
**Migration note:** Use `backdrop-blur-sm` / `backdrop-blur-md` Tailwind classes. Requires `@supports` in older browsers — Tailwind handles this automatically.

---

## Next.js App Router Migration Map

### Route mapping

| Current (Vite) | Next.js App Router |
|----------------|--------------------|
| `src/App.jsx` (router root) | `app/layout.tsx` (root layout) |
| `/` → `<HomePage />` | `app/page.tsx` |
| `/projects` → `<ProjectsPage />` | `app/projects/page.tsx` |
| `<BrowserRouter>` in `main.jsx` | Not needed (App Router handles routing) |
| `react-router-dom` `<Link>` | `next/link` `<Link>` |
| `import.meta.env.VITE_*` | `process.env.NEXT_PUBLIC_*` |

### Layout structure

```tsx
// app/layout.tsx
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Pages

```tsx
// app/page.tsx  ← replaces HomePage component
import Hero from '@/components/Hero/Hero'
import About from '@/components/About/About'
import Experience from '@/components/Experience/Experience'
import Projects from '@/components/Projects/Projects'
import Skills from '@/components/Skills/Skills'
import Contact from '@/components/Contact/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}
```

```tsx
// app/projects/page.tsx  ← replaces /projects route
import ProjectsPage from '@/components/Projects/ProjectsPage'
export default function ProjectsRoute() {
  return <ProjectsPage />
}
```

---

## Components That Need `'use client'`

Next.js App Router is server-first. Any component using hooks, browser APIs, or Framer Motion needs `'use client'` at the top.

| Component | Reason |
|-----------|--------|
| `Navbar.jsx` | Uses `<Link>` from `next/link` (fine server-side actually, but has no hooks) — OK as server component if you remove any `useState` |
| `Hero.jsx` | Framer Motion (`motion.*`) |
| `About.jsx` | Framer Motion (`motion.*`, `whileInView`) |
| `Experience.jsx` | `useEffect`, `useRef`, `useState`, `IntersectionObserver`, scroll listener |
| `Projects.jsx` | Framer Motion |
| `ProjectCard.jsx` | Framer Motion (`motion.article`, `whileHover`) |
| `ProjectsPage.jsx` | `useState` (filter), `AnimatePresence` |
| `Skills.jsx` | Framer Motion |
| `Contact.jsx` | `useState`, `useRef`, `useEffect`, `emailjs` |
| `Footer.jsx` | Framer Motion |

**Recommendation:** Add `'use client'` to all components listed above. Alternatively, create a thin server page wrapper and mark only the interactive leaf components as client.

---

## Environment Variables

| Vite (current) | Next.js |
|----------------|---------|
| `VITE_EMAIL_SERVICE_ID` | `NEXT_PUBLIC_EMAIL_SERVICE_ID` |
| `VITE_EMAIL_TEMPLATE_ID` | `NEXT_PUBLIC_EMAIL_TEMPLATE_ID` |
| `VITE_EMAIL_PUBLIC_KEY` | `NEXT_PUBLIC_EMAIL_PUBLIC_KEY` |

Update `.env`:
```
NEXT_PUBLIC_EMAIL_SERVICE_ID=...
NEXT_PUBLIC_EMAIL_TEMPLATE_ID=...
NEXT_PUBLIC_EMAIL_PUBLIC_KEY=...
```

Update `Contact.jsx`:
```jsx
// Before (Vite)
import.meta.env.VITE_EMAIL_SERVICE_ID

// After (Next.js)
process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID
```

---

## Static Assets

| Current (Vite) | Next.js |
|----------------|---------|
| `import profileImage from '../../assets/profile.png'` | Keep ES module imports OR move to `/public/` and use `"/profile.png"` string paths |
| `src/assets/project_screenshots/*.png` | Keep as imports in `projects.js` OR move to `/public/screenshots/` |

**Recommendation:** Keep all asset imports as-is (Next.js supports `import` of images natively and optimizes them via `next/image`). Optionally replace `<img>` tags with `<Image>` from `next/image` for automatic optimization (requires `width` and `height` props or `fill` layout).

---

## Tailwind CSS Setup

### Install

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### `tailwind.config.js` — custom theme extensions needed

```js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
        // clamp sizes used across headings
        'hero': 'clamp(3.5rem, 7vw, 6rem)',
        'section': 'clamp(2.25rem, 5vw, 3.5rem)',
        'contact-title': 'clamp(2rem, 5vw, 3.5rem)',
      },
      borderRadius: {
        '2xl': '1rem',    // 16px — project cards
        '3xl': '1.375rem', // 22px — experience cards
      },
      maxWidth: {
        'layout': '1200px',
      },
    },
  },
  plugins: [],
}
```

---

## Step-by-Step Migration Order (Recommended)

1. **Scaffold Next.js project** — `npx create-next-app@latest portfolio-next --typescript --tailwind --app --src-dir`
2. **Copy `src/data/projects.js`** → new project as-is (zero changes needed)
3. **Copy `src/assets/`** → new project as-is
4. **Set up `tailwind.config.js`** with the custom tokens above
5. **Set up `app/layout.tsx`** with Navbar + Footer + Analytics
6. **Set up `app/page.tsx`** and `app/projects/page.tsx`
7. **Migrate components one at a time**, starting with stateless ones (Footer → Navbar → ProjectCard → Projects → Skills → Hero → About → Experience → Contact → ProjectsPage)
8. **Replace each `.css` file** with Tailwind classes inline in the JSX
9. **Update env variable names** in `.env` and `Contact.jsx`
10. **Test hash-scroll links** — Next.js handles `href="/#about"` correctly from `/projects`

---

## What Does NOT Change

- All Framer Motion animation logic (variants, `whileInView`, `AnimatePresence`, etc.)
- `src/data/projects.js` — no changes needed
- EmailJS integration logic in Contact.jsx — only env var prefix changes
- Component structure and JSX markup — only CSS class names change
- `@vercel/analytics` and `@vercel/speed-insights` — just swap the import path (`/next` instead of `/react` for SpeedInsights)
- All icon imports from `react-icons`
