# Wee. — Vanshika Verma Portfolio Website
### Project Specification & Context Document

> This document is a complete reference for the "Wee." project — a personal portfolio website built for Vanshika Verma (content creator, social media manager, and freelance model). It's intended to give any AI coding assistant (Claude Code, Cursor, Copilot, etc.) full context on the project's purpose, architecture, design system, build history, and key decisions, and also to serve as a case study reference for Sudhanshu Verma's own developer portfolio.

---

## 1. Project Overview

| | |
|---|---|
| **Project Name** | Wee. |
| **Type** | Personal portfolio website (freelance/creator portfolio) |
| **Client** | Vanshika Verma — content creator, social media manager, freelance model (Delhi, India) |
| **Built by** | Sudhanshu Verma (frontend developer, Vanshika's brother) |
| **Purpose** | Help Vanshika land freelance brand collaborations and full-time opportunities by showcasing her work, experience, and brand testimonials |
| **Live URL** | [wee-portfolio.vercel.app](https://wee-portfolio.vercel.app) |
| **GitHub Repo** | [github.com/vermsudh/wee_portfolio](https://github.com/vermsudh/wee_portfolio) |
| **Developer's Behance** | [behance.net/vermsudh](https://behance.net/vermsudh) |
| **Status** | Live, deployed, and iterating |

---

## 2. Tech Stack

- **Frontend Framework:** React (Vite build tooling)
- **Styling:** Tailwind CSS
- **Icons:** `lucide-react`
- **Hosting/Deployment:** Vercel (auto-deploys from GitHub on push)
- **Version Control:** GitHub
- **Image Processing:** Python + PIL (for thumbnail cropping, compression, square-canvas logo prep)
- **Fonts:** Google Fonts, loaded via `index.html`
  - Playfair Display — headings
  - Dancing Script — script accents
  - DM Sans — body text

### AI Tools Used in the Build Process
This project was built with heavy AI assistance across different stages:

- **Claude / Claude Code** — architecture decisions, section-by-section planning, prompt authoring, structured implementation prompts
- **GitHub Copilot** — in-editor React component implementation
- **Cursor** — contact form implementation
- **Google Gemini** — image and favicon asset generation

---

## 3. Design System

The site originally used a warm editorial palette (cream/charcoal/terracotta/blush) with CSS Modules, but was later fully replaced with a five-color earthy palette personally selected by Vanshika, alongside a switch to Tailwind CSS.

**Color Palette:**
| Name | Hex |
|---|---|
| Dark Green | `#0A3323` |
| Moss Green | `#839958` |
| Beige | `#F7F4D5` |
| Rosy Brown | `#D3968C` |
| Midnight Green | `#105666` |
| Footer (near-black green) | `#051a11` |

**Typography:**
- Headings: Playfair Display (serif, editorial)
- Script accents: Dancing Script (used for emphasis words like "the table", "Creations")
- Body: DM Sans (clean sans-serif)

**Visual language:** Editorial-meets-earthy, lowercase conversational copy, warm section-to-section color blocking (each section uses a distinct background from the palette rather than a single repeated theme), soft rounded cards, generous whitespace.

---

## 4. Site Architecture — Sections

The site is a single-page scrolling portfolio with 10 sections, each with its own color treatment:

1. **Navbar** — Sticky nav with smooth-scroll links (About, Work, Brands, Services, Experience, Testimonials, Contact) and a "Hire Me" CTA
2. **Hero** — Full-bleed photo background, name treatment ("hi, i'm Vanshika Verma"), tagline, skill/role pills, dual CTAs (Hire Me / View My Work), social links (Instagram, YouTube, Email)
3. **About** — "The mind behind the content" — bio, stats (20+ brands worked with, 8.0 CGPA, 3 years experience), "what drives me" niche tags, "available for collabs" badge
4. **Services ("What I Bring to the Table")** — Four cards: Content Creation, Social Media Management, Creative Direction, Modelling — each with tag pills and a distinct background color from the palette
5. **Experience ("Where I've Worked")** — Vertical timeline with date ranges, niche labels, brand names, and role titles; hover-to-expand story detail
6. **Work ("My Creations")** — Video-based portfolio grid; originally Instagram embeds, now local `.mp4` files with real photo thumbnails and tap/autoplay-to-play interaction
7. **Brands ("Brands I've Worked With")** — Horizontally scrolling marquee of circular brand logos on dark green background
8. **Testimonials ("Client Love")** — Featured quote card + paginated secondary testimonial cards, 5-star ratings, reviewer name/title/brand
9. **Contact ("Let's Collab Instead of Work Together")** — Multi-step branching form (Intent → path-specific questions → Name/Email) with WhatsApp pre-filled link and static contact icons
10. **Footer** — Minimal, dark background, credit line ("Made with ♥ by Sudhanshu Verma"), navigation links, social connect links

---

## 5. Key Feature Implementation Details

### Work Section
- Replaced Instagram embeds with local `.mp4` video files
- `IntersectionObserver`-based autoplay when scrolled into view
- Real photo posters used as video thumbnails (not generic placeholders)
- Mobile layout uses scroll-snap for a native swipe feel
- Simplified to a fixed list of 5 videos in order: **Silvish → Paparizza → Silvish_2 → Savorworks → Kundali Talks**
- Filter buttons (All/Reels/Brand Shoots/Modeling) were part of early iterations but later dropped from scope
- Architecture follows a data/hook/UI split: `workData.js` + `useWork.js` + `Work.jsx` to keep files manageable

### Brands Section
- Circular logos, 130px diameter via CSS `border-radius: 50%`
- Source logos pre-processed onto square canvases in Python/PIL first, then displayed with `object-fit: contain` — solved the problem of wide wordmark logos fighting circular cropping
- Single scrolling strip layout (dropped a standalone carousel section idea in favor of this)
- Raw logos displayed directly on dark green background

### Contact Section
- Multi-step branching form: Intent selection → path-specific follow-up questions → Name/Email capture
- Frosted glass card styling with a Rosy Brown tint
- No emojis, Lucide icons used throughout
- No external form libraries — built natively
- WhatsApp deep link with a pre-filled message
- Static contact icons (email, phone) displayed below the form
- Implementation was moved from Claude Code to Cursor for this section

### Content & Copy
- All section copy (Hero, About, Services, Experience, Work, Testimonials, Contact) was refreshed to match Vanshika's natural, conversational, deliberately lowercase voice
- No emojis anywhere in copy
- Stats (e.g., "20+ brands") verified against her actual resume before publishing

---

## 6. Notable Engineering Challenges & Learnings

1. **macOS/Linux git case-sensitivity bug**
   A Vercel build failure was traced to a file renamed only in case (`workData.js` vs `WorkData.js`). macOS silently resolves both spellings locally, but Vercel's Linux-based build environment treats them as distinct files, causing a broken import. Fixed using `git mv` through an intermediate filename to force git to register the case change.

2. **Logo shape vs. content tradeoff**
   Wide wordmark-style logos don't crop well into circles regardless of the circle's diameter. Solution: pre-process all logos onto square canvases first (Python/PIL), then apply `object-fit: contain` inside the circular container — rather than trying to crop the original logo image directly.

3. **CSS specificity conflicts on mobile**
   Tailwind utility classes were overriding custom component styles inconsistently on mobile, particularly for the navbar. Resolved using `!important` guards, hardcoded hex values, and explicit `z-index` values where Tailwind's cascade order caused unpredictable behavior.

4. **EXIF orientation bugs**
   JPEGs from mobile devices sometimes report incorrect width/height due to EXIF orientation metadata, which threw off automated thumbnail cropping. PIL processing scripts had to account for and correct EXIF orientation before cropping.

5. **Accuracy in copy claims**
   Any quantified claims in copy (e.g., "20+ brands worked with") were cross-checked against Vanshika's actual resume/experience history before being published, to avoid overstating her experience.

---

## 7. Build Process & Workflow

The project followed a consistent **three-step build loop** for every section:

1. **Plain-text discussion** — scope, content, and intent are talked through first
2. **HTML preview file** — a static HTML file is generated for visual review before any React code is touched, allowing cheap, fast visual iteration
3. **Structured implementation prompt** — once the direction is confirmed, a detailed prompt is written for whichever tool is doing the implementation (originally GitHub Copilot, later also Cursor and Claude Code depending on the task)

**Other working principles:**
- Sudhanshu explicitly controls when prompts/code get generated — planning is always completed and confirmed first, often via structured multiple-choice decisions
- Complex sections follow a data/hook/UI file split to avoid bloated components
- Scope is frequently and deliberately narrowed mid-task (e.g., dropped a styled PDF export in favor of image-only assets; dropped Brands as a standalone carousel section; removed filter buttons from Work) to keep the site simple and shippable

---

## 8. Supplementary Assets Produced

- A LinkedIn/Behance case-study PDF carousel and accompanying case-study copy were generated for the "Wee." project, framing Vanshika generically as "a social media influencer" for platforms where her specific brand roster wasn't relevant context
- A shorter, portfolio-optimized version of the full case-study markdown was proposed as an option for Behance/LinkedIn use

---

## 9. Open Items / In Progress at Last Checkpoint

- Final prompt generation for the Contact form (post-move from Claude Code to Cursor)
- "Services Offered" section heading — alternate heading options were pending a final decision
- Remaining Brands logo files (Remy's, Silvish, Gharana Karigari, Jujube, The Social Journey) may still need batch square-canvas processing
- A psychology-as-differentiator angle for the About section copy was drafted but not fully confirmed for adoption

---

## 10. Reference Links

- **Live site:** https://wee-portfolio.vercel.app
- **GitHub repo:** https://github.com/vermsudh/wee_portfolio
- **Developer Behance:** https://behance.net/vermsudh
- **Vanshika's Instagram:** bas.kar.vanshikaa

---

*Document prepared as project context for AI coding assistants (Claude Code and others) and as a case-study reference for developer portfolio use.*
