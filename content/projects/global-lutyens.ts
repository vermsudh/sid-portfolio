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
    // TODO: populate from docs/project-references/Global_Lutyens_Case_Study.md
    // (source doc arrives in Stage 12). Stored here for a future /projects/[slug]
    // detail page; not rendered this phase.
    status: 'pending-source-doc',
  },
}
