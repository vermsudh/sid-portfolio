# Portfolio — CLAUDE.md

## Project Overview

Personal portfolio website for Sudhanshu Verma (SDE Intern @ Astraea). React SPA with a dedicated `/projects` page, scroll-based navigation on the homepage, Framer Motion animations, and an EmailJS-powered multi-step contact form. Deployed on Vercel.

## Tech Stack

- **React 19** + **Vite 7** — two routes (`/` and `/projects`) via React Router v7
- **react-router-dom v7** — `BrowserRouter` in `main.jsx`; `<Routes>` in `App.jsx`
- **Framer Motion 12** — all animations (entrance, scroll-reveal, hover, marquee, filter transitions)
- **EmailJS** (`@emailjs/browser`) — contact form email delivery
- **react-icons** — all icons (FaGithub, FaLinkedinIn, SiMysql, etc.)
- **@vercel/analytics** + **@vercel/speed-insights** — injected in `App.jsx`
- **Plain CSS** — one scoped `.css` file per component, no CSS modules or Tailwind

## Commands

```bash
npm run dev       # start dev server (Vite)
npm run build     # production build → dist/
npm run preview   # preview production build locally
npm run lint      # ESLint (react-hooks + react-refresh plugins)
npm run deploy    # build + push to gh-pages branch (secondary deploy)
```

## Project Structure

```
src/
  App.jsx                          # root — BrowserRouter routes: / and /projects
  main.jsx                         # React DOM entry, wraps App in <BrowserRouter>
  index.css                        # global resets / CSS variables
  App.css                          # app-level styles
  assets/
    project_screenshots/           # screenshots used in ProjectCard thumbnails
  data/
    projects.js                    # ALL project data — single source of truth
    portfolioData.js               # unused placeholder — ignore
  components/
    Navbar/     Navbar.jsx + .css  # sticky nav; Projects uses <Link>, others use /#anchor
    Hero/       Hero.jsx + .css    # intro section with profile image & socials
    About/      About.jsx + .css   # word-by-word reveal animation (RevealText)
    Experience/ Experience.jsx + .css  # scroll-linked timeline with glow progress
    Projects/
      Projects.jsx + .css          # homepage preview — 3 featured cards + "See all" link
      ProjectCard.jsx              # shared card: thumbnail, badges, live link, tech tags
      ProjectsPage.jsx + .css      # /projects page — filter tabs + full grid
    Skills/     Skills.jsx + .css  # infinite marquee of skill icons
    Contact/    Contact.jsx + .css # 4-step form via EmailJS
    Footer/     Footer.jsx + .css  # social links + credit
```

## Routing

- `/` → `<HomePage />` (Hero, About, Experience, Projects preview, Skills, Contact)
- `/projects` → `<ProjectsPage />` (full grid with filter tabs)
- `Navbar` + `Footer` render outside `<Routes>` so they appear on both pages
- Navbar "Projects" link uses React Router `<Link to="/projects">`
- All other Navbar links use `href="/#section-id"` — works as same-page hash scroll from `/`, and navigates home then scrolls from `/projects`

## Where Content Lives

| Section | File |
|---------|------|
| All projects (10) | `src/data/projects.js` — **edit here, nowhere else** |
| Hero text | `src/components/Hero/Hero.jsx` (lines 56–73) |
| About text | `src/components/About/About.jsx` (RevealText calls) |
| Experience | `src/components/Experience/Experience.jsx` — `experiences` array |
| Skills | `src/components/Skills/Skills.jsx` — `skills` array |
| Footer | `src/components/Footer/Footer.jsx` — social links hardcoded |

## Projects Data (`src/data/projects.js`)

Each project object shape:
```js
{
  id,           // number
  category,     // 'frontend' | 'fullstack' | 'automation'
  title,        // string
  description,  // string
  status,       // optional — only 'In Progress' for Global Lutyens currently
  features,     // optional string[] — shown as bullet list (automation + fullstack cards)
  techStack,    // string[]
  liveLink,     // optional string — renders "View Live ↗" button on card
  image,        // imported screenshot or null (null → gradient placeholder)
  builtWith,    // optional string — e.g. 'Claude Code' renders a badge
  featured,     // boolean — featured:true cards appear on homepage preview (keep to 3)
}
```

**Current 10 projects:**

| # | Category | Title | Featured | Screenshot |
|---|----------|-------|----------|------------|
| 1 | frontend | Personal Portfolio | | placeholder |
| 2 | frontend | Sri Balaji Electronics | | `sri_balaji_electronics.png` |
| 3 | frontend | Influencer Portfolio | | `wee_portfolio.png` |
| 4 | frontend | A.WON Architects | | placeholder |
| 5 | frontend | Global Lutyens *(In Progress)* | ✓ | `global_lutyens_website.png` |
| 6 | fullstack | Job Copilot *(Built with Claude Code)* | | `job-copilot.png` |
| 7 | automation | Pinterest Publishing Pipeline | ✓ | `Pinterest_dashboard.png` |
| 8 | automation | Case Law Extraction Agent | ✓ | `case_law_agent.png` |
| 9 | automation | CAPTCHA Solver | | `captcha_solving agent.png` |
| 10 | automation | TaxTech Intelligence Pipeline | | placeholder |

**To add a new project:** add an object to the `projects` array in `projects.js`. To add a screenshot: drop it in `src/assets/project_screenshots/`, import it at the top of `projects.js`, and set `image: theImport`.

**Exported helpers:**
- `getFeaturedProjects()` — used by homepage `Projects.jsx`
- `getProjectsByCategory(cat)` — used by `ProjectsPage.jsx` filter
- `getCategoryCount(cat)` — used by filter tab badges

## ProjectCard Layout

`ProjectCard.jsx` is shared between the homepage preview and the `/projects` page.

- **Top:** real screenshot `<img>` if `project.image` exists, else a warm beige gradient placeholder showing the title's first letter
- **Body:** optional `builtWith` badge → title → optional `status` badge → description → optional `features` bullets (automation/fullstack only)
- **Footer:** tech stack pill tags + optional "View Live ↗" button (only if `liveLink` set)
- Framer Motion: `layout` prop for filter reflow, `whileHover` lifts card `y: -8, scale: 1.02`

## ProjectsPage Filter Tabs

`/projects` page has four tabs: **All | Front-end | Full-stack | Automation**, each showing a live count badge. State: `useState('all')`. Grid re-renders with `AnimatePresence mode="popLayout"` on filter change.

## Animation Patterns

- **Hero**: `staggerChildren` + `fadeUpVariants` on page load; image scales in with delay
- **About (`RevealText`)**: each `<motion.p>` uses `whileInView once: true`; words animate via `wordVariants` (opacity + y + blur)
- **Experience**: dual system — `IntersectionObserver` triggers `.is-visible` CSS class for card entrance; `scroll` listener drives `.timeline-progress` bar height
- **ProjectCard**: `layout` + `whileInView` staggered by `index * 0.1`; `whileHover` lifts card
- **Skills**: infinite marquee — duplicated array animated `x: ['0%', '-50%']` linear loop
- **Footer**: `whileInView` fade-up, `once: true`

## Contact Form (EmailJS)

Four-step wizard: name → email → message → success. `AnimatePresence mode="wait"` between steps.

```
VITE_EMAIL_SERVICE_ID=
VITE_EMAIL_TEMPLATE_ID=
VITE_EMAIL_PUBLIC_KEY=
```

## Experience Component — Two Animation Systems

1. **Scroll reveal** (`IntersectionObserver` at 20% threshold): sets `isVisible` state → CSS class `.is-visible` drives entrance; each item has `--delay` CSS variable for stagger.
2. **Timeline glow** (`scroll` event listener): computes scroll progress through section, sets `progressRef.current.style.height` to drive the `.timeline-progress` glow bar.

## CSS Conventions

- CSS custom properties (`--brand-color`, `--about-bg-image`, `--delay`) set inline as `style` props, consumed in scoped CSS
- No CSS preprocessor — plain CSS only
- Component CSS files imported directly in the JSX file

## Known ESLint Issue (pre-existing)

`npm run lint` reports `'motion' is defined but never used` across most components. This is a false positive — `motion` IS used via JSX member expressions like `<motion.div>`. The config is missing `eslint-plugin-react/jsx-uses-vars` which would mark these as used. All errors pre-date the projects page work.

## Environment & Deployment

- **Vercel** (primary): auto-deploys from `main` branch; `base: "/"` in `vite.config.js`
- **gh-pages** (secondary): `npm run deploy` builds and pushes `dist/` to the `gh-pages` branch
- `.env` holds EmailJS keys — never commit

## Socials / Contact Info

- LinkedIn: `https://www.linkedin.com/in/vermsudh/`
- GitHub: `https://github.com/vermsudh`
- Email: `vermsudh@gmail.com`
- Instagram: `https://www.instagram.com/sudhanshu.verma/`
