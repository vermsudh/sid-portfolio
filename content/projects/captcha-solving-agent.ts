import type { Project } from './types'
import thumbnail from '@/assets/project_screenshots/captcha_solving agent.png'

// Updated to spec §5.4 exactly (per the Featured-Projects fix, Step 1). The spec's
// "Captcha Solving Agent" is the unified version of the Astraea ITAT pipeline —
// it merges captcha-solving with judicial case-law collection. NOTE: this overlaps
// with the separate `case-law-extraction-agent` entry, which describes the same
// underlying work; Sid confirmed both stay separate and both are featured.
export const captchaSolvingAgent: Project = {
  id: 9,
  slug: 'captcha-solving-agent',
  title: 'Captcha Solving Agent',
  category: 'Automation',
  description:
    'An AI-powered automation system that solves CAPTCHAs and collects judicial case law orders from government websites, converting unstructured legal PDFs into structured, searchable data.',
  tags: ['Python', 'Selenium', 'Playwright', 'Google Gemini API', 'PyMuPDF'],
  link: null, // TODO: repo or demo link not yet provided (spec §5.4)
  behanceLink: null, // confirmed — automation project, not published on Behance
  thumbnail,
  featured: true,
}
