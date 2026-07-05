import type { Project } from './types'
import thumbnail from '@/assets/project_screenshots/job-copilot.png'

// Migrated unchanged from data/projects.js (id 6).
export const jobCopilot: Project = {
  id: 6,
  slug: 'job-copilot',
  title: 'Job Copilot',
  category: 'Full-stack',
  description:
    'Personal job-application tracker with a Kanban pipeline. Opening a card runs an AI action producing a tailored cover letter, resume bullets, interview questions, and a company brief.',
  features: [
    'Drag-and-drop Kanban board (Wishlist → Applied → Interviewing → Offer → Rejected)',
    'AI Kit generation via Gemini — cover letter, resume bullets, interview questions, company brief',
    'Supabase Auth with RLS-protected Postgres — every row scoped to the authenticated user',
    'Resume stored in profile; used to personalise every generated kit',
  ],
  tags: ['Next.js', 'TypeScript', 'Supabase', 'Gemini AI', 'Tailwind CSS', 'dnd-kit'],
  link: null, // no live link in repo
  thumbnail,
  imageFit: 'contain',
  imageBg: '#111111',
  builtWith: 'Claude Code',
  featured: false,
}
