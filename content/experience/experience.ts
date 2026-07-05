import type { StaticImageData } from 'next/image'
import astraeaLogo from '@/assets/astraea-logo.png'
import leonsLogo from '@/assets/leons-logo.png'

export interface ExperienceEntry {
  company: string
  role: string
  date: string
  location: string
  logo: StaticImageData
  fallback: string
  points: string[]
}

// Migrated unchanged from components/Experience/Experience.tsx (protected content).
export const experiences: ExperienceEntry[] = [
  {
    company: 'Astraea',
    role: 'SDE Intern',
    date: 'Dec 2025 — Present',
    location: 'New Delhi, India',
    logo: astraeaLogo,
    fallback: 'A',
    points: [
      'Developed browser automation scripts using Python and JavaScript, reducing manual effort and improving workflow efficiency',
      'Built an automation pipeline for ITAT case law extraction using LLM APIs (Gemini) with secure API key handling and captcha solving',
      'Designing an intelligent agent to extract, structure, and manage legal data with a focus on scalability and accuracy',
      'Contributing to end-to-end system development including backend services, database design, and frontend interfaces',
      'Collaborating using Git and GitHub for version control, issue tracking, and team-based development',
    ],
  },
  {
    company: "Leon's Furniture",
    role: 'Desktop Administrator',
    date: 'Aug 2022 — Nov 2025',
    location: 'Toronto, Canada',
    logo: leonsLogo,
    fallback: 'L',
    points: [
      'Reduced major IT infrastructure incidents by 80% through proactive monitoring and efficient incident response, including data breach triage and documentation',
      'Led hardware upgrades across 1000+ systems and ensured seamless pin pad functionality across 500+ retail stores via MCM server management',
      'Resolved 90% of desktop and remote support issues across Windows and macOS environments, maintaining high system uptime and security compliance',
    ],
  },
]
