import type { Project } from './types'

// Migrated unchanged from data/projects.js (id 10). No screenshot in repo (image
// was null) — thumbnail omitted, so ProjectRow shows the "Image pending" slot.
export const taxtechIntelligencePipeline: Project = {
  id: 10,
  slug: 'taxtech-intelligence-pipeline',
  title: 'TaxTech Intelligence Pipeline',
  category: 'Automation',
  description:
    'Modular Python pipeline that collects and processes tax technology insights from unstructured sources and distributes them as structured intelligence reports.',
  features: [
    'Multi-stage scraping pipeline across multiple data sources',
    'Data extraction, normalization, and deduplication',
    'Automated email distribution of structured intelligence reports',
    'Modular architecture for easy source and output extension',
  ],
  tags: ['Python', 'Automation', 'Data Processing', 'Web Scraping'],
  link: null, // no live link in repo
  thumbnail: null,
  featured: false,
}
