import type { Project } from './types'
import thumbnail from '@/assets/project_screenshots/case_law_agent.png'

// Migrated unchanged from data/projects.js (id 8). Confirmed by Sid as the 4th Home
// featured project alongside `captcha-solving-agent` (§ Featured-Projects horizontal
// scroll fix) — the two entries describe the same underlying ITAT pipeline from
// different angles but are kept separate and both featured.
export const caseLawExtractionAgent: Project = {
  id: 8,
  slug: 'case-law-extraction-agent',
  title: 'Case Law Extraction Agent',
  category: 'Automation',
  description:
    'AI-powered system that extracts and structures ITAT case law data using intelligent agents and automated pipelines, transforming unstructured legal documents into structured datasets.',
  features: [
    'Automated extraction of legal case data from ITAT tribunal orders',
    'LLM-powered structuring of unstructured legal documents via Gemini API',
    'Integrated CAPTCHA solving to unblock document access in automated workflows',
    'Backend system for managing, querying, and exporting structured case data',
  ],
  tags: ['Python', 'Gemini API', 'Automation', 'Backend Systems'],
  link: null, // no live link in repo
  thumbnail,
  featured: true,
}
