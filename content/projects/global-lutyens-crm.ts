import type { Project } from './types'
import thumbnail from '@/assets/project_screenshots/portal_global_lutyens/sign_page_cover.png'
import dashboardView from '@/assets/project_screenshots/portal_global_lutyens/dashboard_view.png'
import formFilling from '@/assets/project_screenshots/portal_global_lutyens/form_fillling.png'

export const globalLutyensCrm: Project = {
  id: 11,
  slug: 'global-lutyens-crm',
  title: 'Global Lutyens CRM Portal',
  category: 'Full-stack',
  description:
    'Full-stack, role-based internal CRM built for a South Delhi real estate advisory — replacing a paper-diary-and-spreadsheet workflow with a mobile-first portal for photo-enabled listings, client leads, and property showings.',
  features: [
    'Role-based access enforced via Postgres Row Level Security — authorization holds at the database layer, not just in the UI',
    'Location-first dashboard drilling into ~23 South Delhi micro-markets, with live text and voice search',
    'Direct-to-storage photo uploads via presigned Cloudflare R2 URLs, bypassing serverless payload/timeout limits',
    'Founder-only natural-language query interface — Gemini translates plain-English questions into validated, blocklist-checked SQL',
    'Public, no-login share pages with random unguessable tokens and WhatsApp-ready Open Graph previews',
  ],
  tags: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Cloudflare R2', 'Google Gemini API'],
  link: null, // internal, invite-only tool — deliberately not publicly linked
  behanceLink: null,
  thumbnail,
  gallery: [dashboardView, formFilling],
  galleryCaptions: [
    'Location-first dashboard — live text and voice search across 73+ listings, filterable by locality, category, and BHK',
    'Add Property form — one config-driven form component reused across Inventory, Leads, and Showings',
  ],
  featured: true,
}
