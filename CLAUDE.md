# Portfolio — CLAUDE.md

## Project Overview

Personal portfolio website for Sudhanshu Verma (SDE Intern @ Astraea). Next.js App Router site with a dedicated `/projects` page, scroll-based navigation on the homepage, Framer Motion animations, and an EmailJS-powered multi-step contact form. Deployed on Vercel.

## Tech Stack

- **Next.js (App Router)** + **React 19** — two routes (`/` and `/projects`)
- **TypeScript** — components are `.tsx`; project data (`data/projects.js`) stays plain JS
- **Tailwind CSS** — utility classes (many arbitrary values) applied directly in JSX; no per-component `.css` files
- **Framer Motion 12** — all animations (entrance, scroll-reveal, hover, marquee, filter transitions)
- **EmailJS** (`@emailjs/browser`) — contact form email delivery
- **react-icons** — all icons (FaGithub, FaLinkedinIn, FaInstagram, HiOutlineMail, etc.)
- **@vercel/analytics** + **@vercel/speed-insights** — injected in `app/layout.tsx`
- **next/image** + **next/link** — used for images and internal navigation (Navbar logo, Projects link, project screenshots)

## Commands

```bash
npm run dev     # start dev server (Next.js)
npm run build   # production build → .next/
npm run start   # run the production build locally
npm run lint    # next lint
```

## Project Structure

```
app/
  layout.tsx                    # root layout — renders Navbar + Footer + Analytics/SpeedInsights around {children}
  page.tsx                      # "/" — Hero, About, Experience, Projects preview, Skills, Contact
  globals.css                   # Tailwind directives + base layer resets, Inter font import
  projects/
    page.tsx                    # "/projects" — renders <ProjectsPage />
components/
  Navbar/     Navbar.tsx        # sticky nav; Projects uses next/link <Link>, others use href="/#anchor"
  Hero/       Hero.tsx          # intro section with profile image & socials
  About/      About.tsx         # word-by-word reveal animation (RevealText)
  Experience/ Experience.tsx    # scroll-linked timeline with glow progress
  Projects/
    Projects.jsx                # homepage preview — 3 featured cards + "See all" link
    ProjectCard.tsx             # shared card: thumbnail, badges, live link, tech tags
    ProjectsPage.tsx            # /projects page — filter tabs + full grid
  Skills/     Skills.tsx        # infinite marquee of skill icons
  Contact/    Contact.tsx       # 4-step form via EmailJS
  Footer/     Footer.tsx        # social links + credit
data/
  projects.js                   # ALL project data — single source of truth
assets/
  project_screenshots/          # screenshots used in ProjectCard thumbnails
docs/                           # planning/reference docs (some pre-date the current stack)
```

## Routing

- `/` → `app/page.tsx` (Hero, About, Experience, Projects preview, Skills, Contact)
- `/projects` → `app/projects/page.tsx` → `<ProjectsPage />` (full grid with filter tabs)
- `Navbar` + `Footer` render in `app/layout.tsx`, outside the routed `{children}`, so they appear on both pages
- Navbar "Projects" link uses Next.js `<Link href="/projects">`
- All other Navbar links use `href="/#section-id"` — works as same-page hash scroll from `/`, and navigates home then scrolls from `/projects`

## Where Content Lives

| Section | File |
|---------|------|
| All projects (9) | `data/projects.js` — **edit here, nowhere else** |
| Hero text | `components/Hero/Hero.tsx` |
| About text | `components/About/About.tsx` (RevealText calls) |
| Experience | `components/Experience/Experience.tsx` — `experiences` array |
| Skills | `components/Skills/Skills.tsx` — `skills` array |
| Footer | `components/Footer/Footer.tsx` — social links hardcoded |

## Projects Data (`data/projects.js`)

Each project object shape:
```js
{
  id,            // number
  category,      // 'frontend' | 'fullstack' | 'automation'
  title,         // string
  description,   // string
  status,        // optional — only 'In Progress' for Global Lutyens currently
  features,      // optional string[] — shown as bullet list (automation + fullstack cards)
  techStack,     // string[]
  liveLink,      // optional string — renders "View Live ↗" button on card
  image,         // imported screenshot or null (null → gradient placeholder)
  imagePosition, // optional CSS object-position override
  imageFit,      // optional 'cover' | 'contain' — for screenshots that need letterboxing
  imageBg,       // optional background color behind a 'contain'-fit screenshot
  builtWith,     // optional string — e.g. 'Claude Code' renders a badge
  featured,      // boolean — featured:true cards appear on homepage preview (keep to 3)
}
```

**Current 9 projects:**

| # | Category | Title | Featured | Screenshot |
|---|----------|-------|----------|------------|
| 2 | frontend | Sri Balaji Electronics | | `sri_balaji_electronics.png` |
| 3 | frontend | Influencer Portfolio | ✓ | `wee_portfolio.png` |
| 4 | frontend | A.WON Architects | | `awon_website.png` |
| 5 | frontend | Global Lutyens  | ✓ | `global_lutyens_website.png` |
| 6 | fullstack | Job Copilot *(Built with Claude Code)* | | `job-copilot.png` (contain-fit, dark bg) |
| 7 | automation | Pinterest Publishing Pipeline |  | `Pinterest_dashboard.png` |
| 8 | automation | Case Law Extraction Agent |  | `case_law_agent.png` |
| 9 | automation | CAPTCHA Solver |✓ | `captcha_solving agent.png` (contain-fit, light bg) |
| 10 | automation | TaxTech Intelligence Pipeline | | placeholder |

Note: the standalone "Personal Portfolio" entry (previously id 1) has been removed from the data.

**To add a new project:** add an object to the `projects` array in `data/projects.js`. To add a screenshot: drop it in `assets/project_screenshots/`, import it at the top of `projects.js`, and set `image: theImport`.

**Exported helpers:**
- `getFeaturedProjects()` — used by homepage `Projects.jsx`
- `getProjectsByCategory(cat)` — used by `ProjectsPage.tsx` filter
- `getCategoryCount(cat)` — used by filter tab badges

## ProjectCard Layout

`ProjectCard.tsx` is shared between the homepage preview and the `/projects` page, and uses `next/image` for screenshots.

- **Top:** real screenshot via `next/image` (`fill`, `object-cover object-top` by default) if `project.image` exists, else a warm beige gradient placeholder showing the title's first letter; `imageFit`/`imageBg`/`imagePosition` override the default object-fit/position/background for cards that need letterboxing (Job Copilot, CAPTCHA Solver)
- **Body:** optional `builtWith` badge → title → optional `status` badge → description → optional `features` bullets (automation/fullstack only)
- **Footer:** tech stack pill tags + optional "View Live ↗" button (only if `liveLink` set)
- Framer Motion: `layout` prop for filter reflow, `whileHover` lifts card `y: -8, scale: 1.02`

## ProjectsPage Filter Tabs

`/projects` page has four tabs: **All | Front-end | Full-stack | Automation**, each showing a live count badge. State: `useState('all')`. Grid re-renders with `AnimatePresence mode="popLayout"` on filter change.

## Animation Patterns

- **Hero**: `staggerChildren` + `fadeUpVariants` on page load; image scales in with delay
- **About (`RevealText`)**: each `<motion.p>` uses `whileInView once: true`; words animate via `wordVariants` (opacity + y + blur)
- **Experience**: dual system — `IntersectionObserver` triggers `.is-visible`-style state for card entrance; `scroll` listener drives the timeline glow progress bar height
- **ProjectCard**: `layout` + `whileInView` staggered by `index * 0.1`; `whileHover` lifts card
- **Skills**: infinite marquee — duplicated array animated `x: ['0%', '-50%']` linear loop
- **Footer**: `whileInView` fade-up, `once: true`

## Contact Form (EmailJS)

Four-step wizard: name → email → message → success. `AnimatePresence mode="wait"` between steps.

Environment variables (Next.js naming — must be prefixed `NEXT_PUBLIC_` to be readable client-side):
```
NEXT_PUBLIC_EMAIL_SERVICE_ID=
NEXT_PUBLIC_EMAIL_TEMPLATE_ID=
NEXT_PUBLIC_EMAIL_PUBLIC_KEY=
```

## Styling Conventions

- Tailwind CSS utility classes, largely inline in JSX/TSX, including extensive arbitrary values (e.g. `top-[70px]`, `bg-[rgba(245,245,220,0.8)]`) for pixel-accurate parity with the original design
- Custom theme tokens live in `tailwind.config.ts`: `beige`/`beige-dark`/`beige-light`, `brand-dark`, `brand-muted`, `layout` max-width (1200px), custom `backdropBlur` sizes, extended `borderRadius`
- `app/globals.css` holds only the Tailwind directives, the Inter font import, and a small `@layer base` reset (box-sizing, smooth scroll, margin resets, link/list/image/button defaults)
- No per-component `.css` files and no CSS modules

## Environment & Deployment

- **Vercel** (primary and only deploy target now): auto-deploys from `main` branch
- Project must be configured in Vercel as a **Next.js** project — no custom Output Directory override (Next.js builds to `.next`, not `dist`)
- `.env` / `.env.local` hold EmailJS keys — never commit (see `.gitignore`)

## Socials / Contact Info

- LinkedIn: `https://www.linkedin.com/in/vermsudh/`
- Email: `vermsudh@gmail.com` (`mailto:` link in Footer)
- Instagram: `https://www.instagram.com/sudhanshu.verma/`
- GitHub icon import (`FaGithub`) is present in `Footer.tsx` but not currently rendered as a link
- Behance : https://www.behance.net/vermsudh