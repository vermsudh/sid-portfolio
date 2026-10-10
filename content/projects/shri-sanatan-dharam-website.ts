import type { Project } from './types'
import thumbnail from '@/assets/project_screenshots/sri-sanatam-dharam-website/home_page.png'
import liveDarshan from '@/assets/project_screenshots/sri-sanatam-dharam-website/live-darshan.png'
import about from '@/assets/project_screenshots/sri-sanatam-dharam-website/about.png'

export const shriSanatanDharamWebsite: Project = {
  id: 14,
  slug: 'shri-sanatan-dharam-website',
  title: 'Shri Sanatan Dharam Pratinidhi Sabha',
  category: 'Front-end',
  description:
    'Bilingual (English / Hindi) public website for a Hindu religious services organisation — live temple darshan, a Delhi temple directory, Green Temples, katha & kirtan speakers and a sacred texts library, all editable by staff without touching code.',
  features: [
    'URL-based English and Hindi locales with next-intl; bilingual content stored as {en, hi} fields, with database wording laid over the JSON defaults so no label is ever blank',
    'Content read from Supabase over plain REST with the public anon key, cached with tags and refreshed on demand by the admin portal',
    'Live Darshan streams (embed-first, never re-hosted), a Delhi temple directory with galleries and committees, and verse-by-verse sacred texts with an in-page PDF viewer',
    'Designed for an older, less web-fluent audience: large type, 48px touch targets, one obvious action per card',
  ],
  tags: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'next-intl', 'Supabase', 'Cloudflare R2'],
  link: 'https://www.shrisanatandharam.com/',
  behanceLink: null,
  thumbnail,
  gallery: [liveDarshan, about],
  galleryCaptions: [
    'Home page rails — Live Darshan temple cards and Katha & Kirtan speakers, scrolled with simple arrow buttons',
    'About Us — editable content blocks with in-page section navigation, in English and Hindi',
  ],
  featured: false,
  fullCaseStudy: {
    problem: [
      'Delhi’s temple community had no single place to find live darshan, temple details, katha and kirtan, and sacred texts — and the Sabha’s staff needed to keep it all current themselves.',
      'The audience skews older and less web-fluent, and a large share read Hindi, so the site had to be bilingual, very legible and simple to use at every screen size.',
    ],
    solution: [
      'Built the site on Next.js 16 with next-intl, with every public route under a locale segment and a proxy handling detection and redirects. Hindi copy still awaiting a native-speaker pass is flagged rather than machine-translated.',
      'Followed a “structure is code, content is data” rule: layouts, routes and fixed vocabularies live in code, while names, text, photos, ordering and visibility live in Supabase and are read with tagged caches.',
      'Added an on-demand revalidation endpoint, protected by a shared secret compared in constant time, so a staff edit expires the right cache tags and reaches visitors within seconds, with an hourly expiry as a safety net.',
      'Made failure modes graceful: if the database can’t be read, the site serves its last cached copy, and Live Darshan and sacred texts show a “temporarily unavailable” message instead of crashing. Sitemaps are generated from live data so a database problem only drops that group.',
      'Defined a token-based design system (maroon, saffron, gold and cream, with Cormorant Garamond, Tiro Devanagari and Mukta) and a plain card-rail pattern where each card has exactly one primary action.',
    ],
    impact: [
      'Gave devotees one bilingual home for live darshan from 28 temples, a 41-temple Delhi and Green Temples directory, 23 katha speakers and a library of 111 sacred texts.',
      'Staff update content through the separate admin portal and see it live in seconds, with no developer in the loop.',
      'A scheduled keep-alive request stops the free-tier Supabase project from pausing, protecting the whole site from a silent outage.',
    ],
  },
}
