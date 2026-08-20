# Global Lutyens — Full Project Brief for Career Research / Portfolio

*This file is a comprehensive reference document for the "Career Research" project, to be used for building a Behance case study and resume entry. It captures every significant decision, technology, component, workflow, and strategic context from the entire project. Written by Claude from session memory and project files.*

---

## 1. Project Identity

- **Live URL:** [globallutyens.com](https://globallutyens.com)
- **Role:** Sole front-end developer, digital consultant, and project manager — planned, designed, and built the website end-to-end
- **Client:** Global Lutyens — premium real estate advisory firm, South Delhi
- **Client background:** Sister concern of Arzu Estates (est. 1985, 40+ years in business). Positioned as a discreet private advisory for HNI (High Net-Worth Individual) clients — explicitly not a listings portal. Modelled on global private office benchmarks (Savills Private Office, Knight Frank Private Office) rather than Indian real estate portals.
- **Stakeholders:** Rakesh Khanna (Founder, primary sign-off), Abhishek Khanna (Co-Founder & Architect), Manoj Kumar (Founder & Mentor), plus four Strategic Advisors (Legal, Financial, Planning, Senior Consultant)
- **The developer's situation:** Learning Next.js and React during the build, while acting as both the strategic digital consultant and the hands-on developer for the founders — a solo, full-project-ownership role.

---

## 2. Strategic Context

**Why this project existed.** The firm was spending approximately ₹12–15 lakh/year on rented 99Acres leads. Directory leads are unbranded, unowned, and don't compound equity. The strategic decision: discontinue that spend and redirect the budget into an owned digital presence — premium website + Google Ads + SEO + social — giving the firm an exclusive, branded channel for the first time.

**Data-backed targeting.** An analysis of 44 historical portal leads (from a CRM CSV) confirmed the real audience: 100% South Delhi geography, ~84% residential intent, ticket sizes ₹3–20 Cr on sale transactions. This data-grounded approach shaped the site's positioning, navigation, and tone. It's a strong portfolio detail — the site wasn't built on guesswork; it was built on actual lead data.

**Planned next-phase marketing:** Google Ads starting at ₹25,000/month, long-tail hyper-local keywords, Click-to-WhatsApp as the primary conversion action. A 301 redirect from the old domain (arzuestates.in) to globallutyens.com is also planned.

---

## 3. Tech Stack (Confirmed, As-Built)

| Layer | Technology |
|---|---|
| Framework | **Next.js 16.2.9** (App Router) |
| Runtime | **React 19.2.4** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** (utility classes inline throughout) |
| Dev bundler | **Turbopack** |
| Deployment | **Vercel** |
| Domain | GoDaddy DNS → globallutyens.com |
| Email | Google Workspace (rkhanna@globallutyens.com) |
| Asset storage | **Cloudflare R2** (bucket: `global-lutyens-assets`, Asia Pacific region, public) |
| Asset helper | `lib/r2.ts` → `r2Url()` helper, `NEXT_PUBLIC_R2_URL` env var in `.env.local` + Vercel |
| Carousel | `embla-carousel-react@8.6.0` (Testimonials) |
| PDF viewing | `react-pdf` with PDF.js worker in `public/` |

**Key version discipline:** This is a post-training-cutoff stack (Next 16, React 19, Tailwind v4 — all have breaking changes vs older releases). A dependency discipline rule was enforced: no package added silently, every addition must explicitly support React 19 + App Router, pinned exact versions.

---

## 4. AI Tooling & Workflow (The Most Portfolio-Worthy Part)

This was a deliberate, structured AI-assisted workflow — not improvised "vibe coding." Three tools were used in distinct phases:

### Claude (chat — this project)
Used for **planning only**. All copy, brand voice, page structure, section hierarchy, design decisions, and architectural choices were locked in conversation before any code was written. Claude was the strategic and creative partner — not a code generator at this stage.

### Claude Code
Used for **multi-file scaffolding execution**. Once a page's plan was fully locked (copy agreed, structure signed off, sometimes an HTML mockup reviewed), a comprehensive, self-contained prompt was written and handed to Claude Code. It scaffolded the actual Next.js multi-file components against that spec. Claude Code did not improvise on brand voice or structure — it executed a locked brief.

### Cursor
Used for **component-level visual polish** after Claude Code's initial scaffold. Fine-tuning spacing, responsiveness, hover states, and visual details in-editor.

### The CLAUDE.md system
A `CLAUDE.md` context file was authored and maintained in the repo. It gave Claude Code a full brand and architectural brief at the start of every session — design system, copy rules, component conventions, and build progress — so every new session started from the same locked context instead of re-deriving decisions.

### The pipeline (repeated for every page):
```
Plan in Claude chat
    ↓
Lock all copy + structure decisions
    ↓
(optional) Build HTML mockup for visual sign-off
    ↓
Write comprehensive Claude Code prompt
    ↓
Claude Code scaffolds multi-file implementation
    ↓
Cursor for visual/component-level polish
    ↓
Deploy to Vercel → verify on live URL
```

**Why this matters as a portfolio point:** the discipline of keeping planning, execution, and polishing in separate tools — and keeping AI code generation operating against a fully-specified brief rather than improvising — produced consistent output across many independently-generated pages with the same brand voice and architecture.

---

## 5. Design System (Locked v2 — "Green")

### Colour Palette

| Token | Hex | Role |
|---|---|---|
| Estate Green | `#0F3D2E` | Primary structural — header, footer, dark feature bands, headings on light |
| Deep Pine | `#0A2A20` | Footer, overlays, hero depth |
| Antique Gold | `#B8965A` | Accent only — hairlines, icons, active nav — **never** body text |
| Pure White | `#FFFFFF` | Primary background |
| Warm Parchment | `#F7F2E9` | Alternate sections + text on green (never pure white on green) |
| Forest Ink | `#1E2A23` | Body text on light — never pure black |
| Stone Grey | `#837F74` | Secondary/supporting text |
| Hairline | `#E6E1D6` | Borders and dividers |

**Application ratio — 68 · 22 · 8 · 2:** white/parchment carry the page, green frames it, ink for body text, gold at the edges only.

### Typography
- **Headings:** Cormorant Garamond (serif, ~500 weight) loaded via `next/font`
- **Body / UI:** Jost (light/regular), generous letter-spacing on eyebrows and labels

### Design rules (enforced throughout)
- On green sections: text is always Warm Parchment — never Pure White
- Gold: hairlines and icons only — never small body text (too low contrast)
- No border-radius anywhere on the site
- No animations in Phase 1 — deliberately deferred to a single cross-site animation pass
- No stock photography, no property images in Phase 1
- Hairline borders throughout, not shadows
- The "1000+ properties" stat was permanently removed from all site copy (wrong register for private advisory positioning)
- The word "brokerage" is banned from the site — the firm is "A Private Advisory"

---

## 6. Repo Structure (As-Built)

No `src/` wrapper — `app/`, `components/`, `lib/`, `data/` sit at the repo root:

```
app/
  layout.tsx                        # root layout: fonts, Header, Footer
  globals.css                       # design tokens + base styles
  page.tsx                          # Home
  about/page.tsx
  services/page.tsx
  contact/page.tsx
  knowledge-center/
    layout.tsx                      # KC shell: sidebar + breadcrumb
    page.tsx                        # KC landing
    glossary/page.tsx
    maps/
      page.tsx                      # Level 1 — city selector
      [city]/page.tsx               # Level 2 — locality grid
      [city]/[locality]/page.tsx    # Level 3 — map viewer
    circle-rate/page.tsx            # ComingSoonPanel
    convertor/page.tsx              # ComingSoonPanel
    far-setbacks/page.tsx           # ComingSoonPanel
    asi-heritage/page.tsx           # ComingSoonPanel
    house-tax/page.tsx              # ComingSoonPanel
    important-links/page.tsx        # full page (built)

components/
  layout/
    Header.tsx
    Footer.tsx
    WhatsAppButton.tsx              # persistent Click-to-WhatsApp
    MobileNav.tsx
  home/
    Hero.tsx
    Positioning.tsx
    AdvisoryPillars.tsx
    Differentiators.tsx
    LegacyTeaser.tsx
    Testimonials.tsx                # Embla Carousel
  about/
    Founders.tsx
    FounderCard.tsx
  knowledge-center/
    KCSidebar.tsx
    KCBreadcrumb.tsx
    GlossaryClient.tsx
    GlossarySearch.tsx
    GlossaryFilters.tsx
    GlossaryAccordion.tsx
    HindiGlossaryTable.tsx
    CityCard.tsx
    LocalityCard.tsx
    LocalityBrowser.tsx
    SearchInput.tsx
    MapGallery.tsx
    MapLightbox.tsx
    ComingSoonPanel.tsx
  ui/
    Eyebrow.tsx                     # gold wide-tracked uppercase labels
    GoldRule.tsx                    # 54×1px gold hairline
    DomeMark.tsx                    # line-art dome watermark SVG

lib/
  content/
    about.ts
    home.ts
    services.ts
    site.ts                         # siteInfo: contacts, RERA, social
    nav.ts                          # single source for Header + Footer nav
  knowledge-center/
    types.ts
    maps-index.ts
    sections.ts

data/
  knowledge-center/
    glossary.ts                     # 60 entries, 6 categories, 15 Hindi terms
    maps/
      delhi.json

assets/
  images/
    hero/hero_cover.png
    about/founders/                 # rakesh-khanna.jpg, manoj-kumar.png, abhishek-khanna.png

public/
  sample-maps/                      # placeholder map images
```

---

## 7. Pages Built (In Detail)

### Header / Footer (shared layout)
- Header: solid Estate Green always — no transparency, no scroll effect
- Nav: Home / About / Services / Knowledge Center / Contact
- WhatsApp CTA button in header, links to `wa.me/918010300300`
- RERA number shown in footer and mobile nav only
- Footer: Deep Pine, four columns, copyright line
- Mobile nav: full-screen overlay, Estate Green background

### Home (`app/page.tsx`) — complete
Six sections in sequence:

1. **Hero** — full-bleed `next/image` with Tailwind gradient scrim (green tint not baked into image asset). Gold headline. Sub-line in parchment.
2. **Positioning** — white section, brand statement copy
3. **AdvisoryPillars** — parchment, five disciplines as numbered white cards (5-up → 2-up → 1-up)
4. **Differentiators** — white, four of nine brochure differentiators with `border-l-2 border-gold` left accent treatment
5. **LegacyTeaser** — Estate Green pause, parchment text, gold-outline CTA → `/about`
6. **Testimonials** — Embla Carousel on parchment. 1-up mobile → 2-up tablet → 3-up desktop. Gold dot indicators. Looping, no auto-play. `prefers-reduced-motion` support. Two real client testimonials + one placeholder.

Neighbourhoods section was deliberately dropped at the founder's request.

### About (`app/about/page.tsx`) — complete
Section flow: Legacy → Founders → Credibility band → Approach → Why Global Lutyens

- Founders: three-card responsive grid (Rakesh Khanna → Manoj Kumar → Abhishek Khanna)
- Strategic Advisors subsection below founders: four names in a portrait-free grid
- Credibility band: Estate Green, gold numerals — "40+ years · 40+ properties transacted · RERA Registered · 8 Prestigious Micro-Markets"

### Services (`app/services/page.tsx`) — complete
- Five advisory pillars: cards 01–04 in a 2×2 grid, card 05 (Property Management) as full-width Estate Green closing card
- "How We Work" closing band
- Gold numerals, gold em-dash bullet markers
- No WhatsApp CTA on page (header CTA carries conversion)

### Contact (`app/contact/page.tsx`) — complete (v4, simplified single-screen form)
- Single-screen layout, no heavy hero
- Contact form (name, phone, message) + office details + WhatsApp option
- No backend wiring yet — form is front-end only in Phase 1

### Knowledge Center (`app/knowledge-center/`) — shell + multiple sections complete

Self-contained section with its own `layout.tsx` — persistent sidebar (desktop) + horizontal tab strip (mobile) + breadcrumb on every route.

**Sidebar order (locked):**
Glossary → Maps → Category List → FAR/Setbacks → ASI & Heritage Norms → House Tax → Circle Rate *(Coming Soon)* → Convertor *(Coming Soon)* → Important Links

**Built in full:**
- **Glossary:** 60 entries across 6 categories + 15 Hindi terms. Searchable (client-side, useMemo). Category filter pills. Accordion UI, one item open at a time. Hindi Glossary table (hidden when search/filter active).
- **Maps:** 3-level dynamic routing — City selector → Locality grid with live search → Map viewer with zoom/pan lightbox, thumbnail strip, download action, and always-on graphical disclaimer. Map images served from URLs (Cloudflare R2 / placeholder local paths) — never bundled into repo. `generateStaticParams` + Next 16 async params API.
- **Important Links:** full page, built.
- **Category List, FAR/Setbacks, ASI & Heritage Norms, House Tax:** real routes (no 404) rendering `ComingSoonPanel`.
- **Circle Rate, Convertor:** Coming Soon.

---

## 8. Infrastructure & Asset Delivery

### Cloudflare R2
- Bucket: `global-lutyens-assets`, Asia Pacific region, public access
- Used for PDF delivery and map image assets (avoiding Vercel bandwidth costs)
- `NEXT_PUBLIC_R2_URL` set in `.env.local` and Vercel environment variables
- `lib/r2.ts` exposes a typed `r2Url()` helper — components call this instead of hardcoding URLs
- `next.config.ts` updated with R2 remote pattern so `next/image` can render from R2

### Vercel
- Automatic deploys from `main` branch
- Environment variables for R2 and any future API keys
- `next.config.ts` `images.remotePatterns` pre-configured for both R2 and Vercel Blob (ready for future blob-stored maps)

### GoDaddy DNS → Vercel
- Domain `globallutyens.com` purchased via GoDaddy
- DNS configured to point to Vercel
- Google Workspace MX records preserved alongside Vercel — both email and site coexist on the same domain

### Google Workspace
- Professional email under `rkhanna@globallutyens.com`
- Kept active as company email alongside Vercel deployment
- ChatGPT Plus (under enquiries@globallutyens.com) is planned for Rakesh's internal data querying workflow (native Google Sheets read/write)

---

## 9. Content Architecture

All content in typed modules under `lib/content/` — separating copy from component structure so it can be moved to a CMS without refactoring components.

- `home.ts` — `hero`, `positioning`, `pillars`, `differentiators`, `legacyTeaser`, `testimonials`
- `about.ts` — `legacy`, `stats`, `founders`, `advisors`, `approach`, `why`, WhatsApp constants
- `services.ts` — `servicePillars`, `servicesPageContent`
- `site.ts` — `siteInfo`: contacts, RERA number, social links (single source for Header + Footer)
- `nav.ts` — `navItems`: single source for Header, MobileNav, and Footer's nav column

Static datasets for the Knowledge Center live in `data/knowledge-center/` — `glossary.ts` (entries array) and `maps/*.json` — entirely decoupled from components.

---

## 10. Key Design & Process Principles

**Content before design, design before build.** Every page's copy and structure was locked in Claude chat before any HTML mockup was created. Mockups were reviewed before any Claude Code prompt was written. Claude Code executed against fully-specified briefs.

**Planning-first correction.** Early in the project, the developer explicitly corrected Claude for jumping to code generation before planning was complete. This shaped every subsequent session — no code was generated without a locked plan.

**HTML mockups as an intermediate step.** Between planning and Claude Code execution, HTML mockups (inline styles or Tailwind) were used to visually sign off on a layout. This review gate meant the Claude Code prompt could be written with visual certainty.

**Prompt discipline.** Claude Code prompts were comprehensive and self-contained — written to specify what prior versions must remove, not just what to add, to prevent layering new requirements on old structure.

**Animation deliberately deferred.** Static layout consistency was prioritized over per-page polish. All animation — planned as scroll-triggered fade-up with stagger and gold rule draw-in using Framer Motion or Intersection Observer — is deferred to a dedicated cross-site animation pass after every page's static layout is confirmed. This avoids inconsistent motion design across independently-generated pages.

**Single source of truth architecture.** Typed content layer, interface-driven mock data, shared nav and site-info modules, no duplicated layout logic. Components consume typed interfaces, not raw strings scattered across pages.

**Restraint as a deliberate design decision:**
- No property photography in Phase 1
- No border-radius
- No animation (Phase 1)
- No functional property search
- No floating WhatsApp bubble (CTA lives in the header only)
- The "1000+ properties" stat permanently removed
- The word "brokerage" permanently removed
- "40+ years expertise" kept in prose only, never in a stat block

---

## 11. Planned Later Phases (Forward-Compatible, Not Yet Built)

- **Sanity CMS** — planned for property listings and content management
- **Eight neighbourhood landing pages** — template-driven, one per micro-market
- **Stamp Duty Calculator** — fully scoped (formula from PDFs, 5 property type cases, stamp duty rates), circle rate data per category and age factor table still need sourcing
- **Animations pass** — Framer Motion or Intersection Observer with `prefers-reduced-motion` fallback; scroll-triggered fade-up with stagger; gold rule draw-in
- **Lead pipeline** — Supabase / Notion / Resend / Twilio-WhatsApp
- **Google Ads** — ₹25,000/month starting budget, long-tail South Delhi keywords, Click-to-WhatsApp conversion
- **301 redirects** from arzuestates.in → globallutyens.com
- **SEO neighbourhood landing pages** — one per micro-market
- **Internal CRM / data pipeline** — Google Forms → Google Sheets, ChatGPT Plus for natural-language querying

---

## 12. Suggested Portfolio / Behance Case Study Angles

1. **"Planning-first AI-assisted build"** — the Claude chat → Claude Code → Cursor pipeline as a repeatable, disciplined process. Worth diagramming as a workflow graphic.

2. **Before/after** — old Arzu Estates site (portal-style, red/navy, listing-heavy, mass-market register) vs. new Global Lutyens site (green/gold, private-advisory tone, no listings). Strong visual contrast.

3. **The colour-system spec sheet as a deliverable** — showing systematic design rationale (token names, hex codes, roles, ratio rule, do/don't list) as a standalone artifact, not just a Figma file.

4. **Data-backed positioning** — the 44-lead CSV analysis → confirmed South Delhi / HNI / residential audience → repositioning rationale → site architecture. Demonstrates strategic contribution, not just visual execution.

5. **Restraint as a design decision** — deliberately deferring animation, search, and photography rather than over-building v1. Shows judgment and discipline.

6. **The Knowledge Center as a standalone artifact** — a regulatory reference library (Glossary, Maps, FAR tables, Circle Rates, ASI heritage norms) built as a public-access resource, not just another page. Demonstrates domain knowledge integration and multi-level dynamic routing in Next.js.

7. **Infrastructure decisions** — Cloudflare R2 for asset delivery (cost and performance rationale), Google Workspace alongside Vercel (email + site coexistence), environment variable discipline.

---

## 13. Developer Profile (Sudhanshu Verma, as referenced in this project)

- New Delhi, India
- Background in IT infrastructure (Desktop Administrator, Leons Furniture, Toronto — 3 years)
- Current role: SDE Intern at Astraea — browser automation, Python/Playwright, LLM API integration (Gemini), legal data extraction pipelines
- Skills: Python, JavaScript, HTML/CSS, React, REST API integration, Git/GitHub, Playwright, Agile/Scrum, prompt engineering
- Global Lutyens is a project demonstrating: Next.js App Router, TypeScript, Tailwind CSS v4, React 19, Vercel deployment, Cloudflare R2 integration, AI-assisted development workflow, front-end-only build with CMS-ready architecture

---

*This document was compiled from session history, the CLAUDE.md as-built file, the brochure content reference, and the colour system spec. It is intended as a handoff to the "Career Research" Claude project for Behance and resume preparation. Verify any version numbers or feature status against the live globallutyens.com before publishing.*
