import type { Project } from './types'

import thumbnail from '@/assets/project_screenshots/global_lutyens_website.png'

// NEW entry per spec §5.4 (rule #6: use the exact §5.4 object). NOTE: the live
// repo already contained a "Global Lutyens" entry (old id 5) with a different
// description/tags — that is intentionally SUPERSEDED by this confirmed §5.4
// object. The spec sets thumbnail to TODO (the site is a relaunch, so the legacy
// screenshot at @/assets/project_screenshots/global_lutyens_website.png is likely
// stale) — left null so ProjectRow shows the "Image pending" placeholder until a
// fresh screenshot is supplied.
export const globalLutyens: Project = {
  id: 5,
  slug: 'global-lutyens',
  title: 'Global Lutyens',
  category: 'Front-end',
  status: 'In development',
  description:
    'Led front-end development and technical strategy for a full brand relaunch of a premium South Delhi real estate advisory — replacing a rented lead-generation channel with an owned digital asset.',
  tags: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'TypeScript'],
  link: 'https://www.globallutyens.com',
  behanceLink: 'https://www.behance.net/gallery/252105403/Global-Lutyens-Website',
  thumbnail: thumbnail, // TODO: fresh relaunch screenshot pending (legacy asset exists but may be stale)
  featured: false,
  fullCaseStudy: {
    problem: [
      'The firm was spending ₹12–15 lakh/year renting leads on 99Acres — unbranded, unowned traffic that didn’t build any lasting digital asset for the business.',
      'As a private, HNI-focused advisory, the firm had no digital presence that matched its actual positioning; it needed to look like a private office in the mold of Savills or Knight Frank Private Office, not a mass-market listings portal.',
    ],
    solution: [
      'Analyzed 44 historical portal leads from the firm’s own CRM data to confirm the real audience — ~100% South Delhi, ~84% residential intent, ₹3–20 Cr ticket sizes — and used that to drive the site’s navigation, positioning, and tone instead of guesswork.',
      'Built on Next.js 16, React 19, TypeScript, and Tailwind CSS v4 against a locked "Estate Green / Antique Gold" design system, documented token-by-token with an explicit application ratio and do/don’t rules.',
      'Ran a structured three-tool AI workflow — plan and lock copy and structure in Claude chat, scaffold each page in Claude Code against a fully-specified brief, then polish spacing and responsiveness in Cursor — repeated consistently across every page.',
      'Shipped a self-contained Knowledge Center — a 60-entry searchable glossary, a 3-level dynamic locality map browser, and regulatory reference pages — as a standalone public resource, not just another page.',
      'Delivered assets via Cloudflare R2 rather than bundling them into the repo, to keep Vercel bandwidth costs down.',
    ],
    impact: [
      'Replaced a recurring, rented lead-generation expense with an owned, brand-controlled digital channel, positioned to support a planned Google Ads push (₹25,000/month, hyper-local South Delhi keywords).',
      'Delivered a fully brand-consistent multi-page site — home, about, services, contact, and a full regulatory knowledge center — built solo while learning Next.js and React during the engagement.',
      'Left the infrastructure — Cloudflare R2, a typed content layer, CMS-ready architecture — in place to support the firm’s next phases (Sanity CMS, neighbourhood landing pages, lead pipeline) without a rebuild.',
    ],
  },
}
