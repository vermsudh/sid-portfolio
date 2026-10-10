import type { Project } from './types'
import thumbnail from '@/assets/project_screenshots/global_lutyens_admin/dashboard.png'
import editScreen from '@/assets/project_screenshots/global_lutyens_admin/edit_screen.png'
import signIn from '@/assets/project_screenshots/global_lutyens_admin/sign_in.png'

export const globalLutyensAdmin: Project = {
  id: 13,
  slug: 'global-lutyens-admin',
  title: 'Global Lutyens Admin',
  category: 'Full-stack',
  description:
    'Single-user content admin panel for the Global Lutyens marketing site — the founder edits copy, structured lists and reference documents through a form UI, and every save goes live on the public site within seconds.',
  features: [
    'Supabase Auth with a positive route allow-list, plus an auth re-check inside every Server Action — actions can be POSTed to directly, so middleware alone is not trusted',
    'Data layer re-selects after every write and throws if no rows changed, catching Row Level Security blocks that otherwise report false success',
    'Tag-based ISR revalidation pushes saves to the live site; the marketing site keeps hardcoded static fallbacks so a database outage degrades to stale content, not a broken page',
    'Cloudflare R2 uploads for maps and PDFs, signed with aws4fetch, with a Maps drill-down across 6 cities, ~285 localities and ~359 assets',
  ],
  tags: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Cloudflare R2', 'Tailwind CSS v4'],
  link: 'https://admin.globallutyens.com',
  behanceLink: null,
  thumbnail,
  gallery: [editScreen, signIn],
  galleryCaptions: [
    'Home page editor — each section saves independently and updates the live site within seconds',
    'Supabase-authenticated sign-in; every route outside the allow-list redirects here',
  ],
  featured: false,
  fullCaseStudy: {
    problem: [
      'The Global Lutyens marketing site had its copy, lists and reference documents hardcoded in the codebase, so every wording change, new glossary term or updated PDF needed a developer and a redeploy.',
      'The founder needed to maintain a large body of content himself — about 285 localities with map assets, 60+ glossary entries, 41 government links — without being able to break the site or reintroduce retired copy.',
    ],
    solution: [
      'Built a single-user admin on Next.js 16 and Supabase: singleton tables for page-level content, list tables with a sort_order for repeating items, and jsonb columns for grouped fields — with RLS allowing public reads and authenticated writes.',
      'Wired every Save, Add and Delete through Server Actions that re-verify the session, write through a data-access layer, then call the marketing site’s /api/revalidate with a shared secret so the affected cache tag refreshes immediately. Revalidation never throws, so a failed refresh cannot fail a save.',
      'Standardised all list editing into one row-editor pattern and refresh the screen from the database after each save — fixing a bug where saving twice after adding an item created a duplicate instead of updating it.',
      'Uploaded files straight to Cloudflare R2 using aws4fetch (no AWS SDK) and stored only the public URL in Supabase, with a “paste a URL instead” fallback on every upload field.',
      'Added a GitHub Actions keepalive that pings the database every 3 days so the free-tier Supabase project is never paused, which would silently degrade the whole public site.',
    ],
    impact: [
      'Moved ongoing content maintenance from developer-only changes to a self-serve panel the founder uses directly; saves reach globallutyens.com within seconds.',
      'Content rules from the marketing site (no retired claims, locked tagline, an unapproved founder excluded) are carried into the editing flow so the panel can’t quietly reintroduce them.',
      'Kept the stack and brand tokens aligned with the sibling marketing and CRM projects, so the three codebases share conventions and the panel looks like part of the same brand.',
    ],
  },
}
