import type { Project } from './types'
import thumbnail from '@/assets/project_screenshots/Pinterest_dashboard.png'

// Migrated unchanged from data/projects.js (id 7).
export const pinterestPublishingPipeline: Project = {
  id: 7,
  slug: 'pinterest-publishing-pipeline',
  title: 'Pinterest Publishing Pipeline',
  category: 'Automation',
  description:
    'Python pipeline that automates the full Pinterest content lifecycle — queue ingestion, AI caption generation, OAuth token management, and media publishing via the Pinterest API v5.',
  features: [
    'Full OAuth 2.0 token lifecycle management with proactive refresh and paired token persistence',
    'Sheet-backed state machine (Pending → Posted/Failed/Skipped) with batched cell updates',
    'AI caption generation via Gemini with multimodal image input and structured JSON output',
    'Custom exponential-backoff retry layer distinguishing transient (429/500/503) vs permanent failures',
    'Client-side rate-limit handling via X-RateLimit-Remaining/X-RateLimit-Reset headers',
    'Separate 4-step async state machine for video Pins (register → S3 upload → poll → create)',
  ],
  tags: ['Python', 'OAuth 2.0', 'REST APIs', 'Gemini API', 'Google Sheets API', 'Automation'],
  link: null, // no live link in repo
  thumbnail,
  featured: false,
}
