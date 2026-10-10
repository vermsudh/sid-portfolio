import type { Project } from './types'
import thumbnail from '@/assets/project_screenshots/sri-sanatam-dharam-admin/dashboard.png'
import templeList from '@/assets/project_screenshots/sri-sanatam-dharam-admin/temple_edits.png'
import templeForm from '@/assets/project_screenshots/sri-sanatam-dharam-admin/tem_edit_2.png'
import signIn from '@/assets/project_screenshots/sri-sanatam-dharam-admin/sign_in.png'

export const shriSanatanDharamAdmin: Project = {
  id: 15,
  slug: 'shri-sanatan-dharam-admin',
  title: 'Sabha Admin Portal',
  category: 'Full-stack',
  description:
    'Staff-only content management portal where Sabha staff edit the public website — temples, live darshan, speakers, sacred texts, services and navigation — in English and Hindi, without touching code.',
  features: [
    'Admin allowlist table with Row Level Security as the real access control; requireAdmin() re-checks at the top of every Server Action, and the service-role key is deliberately never used',
    'One reusable section pattern: optimistic Hide, Show and Move up/down via useOptimistic, shared add/edit forms with typed field errors, and two-step delete',
    'Photos shrunk in the browser then re-encoded with sharp; 70MB+ granth PDFs bypass Server Actions and upload directly to R2 through presigned URLs, verified before saving',
    'Non-blocking website refresh after each save using Next.js after(), so a slow website can never slow or break a save',
  ],
  tags: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Cloudflare R2', 'Tailwind CSS v4'],
  link: 'https://www.admin-shrisanatandharam.com/',
  behanceLink: null,
  thumbnail,
  gallery: [templeList, templeForm, signIn],
  galleryCaptions: [
    'Live Darshan manager — show or hide, edit and reorder temple cards, with bilingual names and category tags',
    'Temple editor — tabs for Details, Services, Gallery, Extra sections, Green and Committee, with English and Hindi fields side by side',
    'Admin sign-in — Supabase Auth with public sign-ups disabled and an admin allowlist',
  ],
  featured: false,
  fullCaseStudy: {
    problem: [
      'The Sabha’s public website holds a lot of changing content — 41 temples with galleries and committees, 28 live darshan streams, 23 speakers, 111 sacred texts — and staff needed to update it without a developer.',
      'The editors are less web-fluent, so the tool had to be forgiving: large type, plain-language messages, and no way to accidentally break what visitors see.',
    ],
    solution: [
      'Built a separate admin app on Next.js 16 and Supabase that is the only writer of content. Access is enforced by an admin allowlist and Row Level Security, and each Server Action re-verifies the caller because every action is a public HTTP endpoint.',
      'Designed a single section pattern — optimistic list actions, shared add/edit forms and two-step delete — and extended it across every content type instead of forking it. Reordering calls a database function so a swap is atomic.',
      'Handled images and large files carefully: photos are compressed in the browser and re-encoded on the server; 70MB+ PDFs upload straight to Cloudflare R2 via a short-lived presigned URL, then the server verifies the object (exists, size, %PDF- header) before saving. If a database write fails, the new upload is deleted.',
      'Limited deletion to files the admin itself created, so original assets the website links to directly can never be removed from the bucket.',
      'Tied the portal to the site with a post-response revalidation call (5-second timeout, no redirects, never throws), so a failed refresh is only logged and the website’s hourly refresh covers it.',
    ],
    impact: [
      'Staff manage every content area through one portal and see changes on the website within seconds.',
      'Content stays bilingual by design: Hindi and English fields sit side by side, and the schema enforces the {en, hi} shape.',
      'Security rests on database policy rather than UI checks, with anon write privileges revoked and no service-role key in either project.',
    ],
  },
}
