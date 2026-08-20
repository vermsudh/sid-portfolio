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
  fullCaseStudy: {
    problem: [
      'Government judicial and tax tribunal websites gate every search behind a CAPTCHA that had to be solved by hand, repeatedly, just to view one order at a time.',
      'Doing that for thousands of historical orders made large-scale legal research impractical — most of the effort went into repetitive CAPTCHA-solving and clicking through downloads, not actual research.',
      'Every downloaded order was still an unstructured PDF that nobody had read yet, so collection alone didn’t solve the underlying research bottleneck.',
    ],
    solution: [
      'Selenium and Playwright drive the judicial portal itself — opening the site, selecting year ranges and filters, running the search, and paging through results.',
      'A CAPTCHA-solving script screenshots the CAPTCHA image, sends it to Gemini’s vision model with a prompt tuned to read only the visible characters and ignore background noise, then feeds the predicted text back into the form automatically.',
      'Solved searches chain straight into bulk PDF download, with retry logic for CAPTCHA failures, download failures, and parsing errors.',
      'Collected PDFs feed the same Gemini-powered structured-extraction pipeline as the Case Law Extraction Agent, with results archived to Google Drive.',
    ],
    impact: [
      'Eliminated the manual, repetitive CAPTCHA-solving step entirely — what used to be solve-CAPTCHA-then-download-one-order-at-a-time now runs unattended in bulk, saving significant hours previously spent on that repetition.',
      'All collected orders land in one organized Google Drive archive instead of scattered local downloads, ready as input for structured extraction.',
      'Combined browser automation, AI CAPTCHA solving, and document intelligence into a single reusable legal-research automation framework.',
    ],
  },
  featured: true,
}
