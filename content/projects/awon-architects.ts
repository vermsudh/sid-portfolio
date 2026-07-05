import type { Project } from './types'
import thumbnail from '@/assets/project_screenshots/awon_website.png'

// Migrated unchanged from data/projects.js (id 4).
export const awonArchitects: Project = {
  id: 4,
  slug: 'awon-architects',
  title: 'A.WON Architects',
  category: 'Front-end',
  description:
    'Fully responsive website for an architecture studio, covering layout, brand system implementation, and analytics/SEO infrastructure.',
  features: [
    'Responsive multi-page site using native Framer Stacks for stable breakpoints',
    'Consistent typographic system (Cormorant Garamond headings, Inter body)',
    'Resolved server-side rendering issue blocking Open Graph metadata via custom code injection',
    'DNS setup (A records, CNAME on GoDaddy) and Google Analytics tagging',
  ],
  tags: ['Framer', 'Responsive Design', 'SEO', 'DNS', 'Google Analytics'],
  link: 'https://awon.world',
  thumbnail,
  featured: false,
}
