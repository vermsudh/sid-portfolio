import type { StaticImageData } from 'next/image'

export type Category = 'Front-end' | 'Full-stack' | 'Automation'

export interface CaseStudy {
  problem: string[]
  solution: string[]
  impact: string[]
}

// Normalized project shape. Structurally compatible with ProjectRowData
// (components/Projects/ProjectRow.tsx) — the required fields match, extra fields
// (features, builtWith, imageFit/Bg, fullCaseStudy) are preserved for later use.
export interface Project {
  id: number
  slug: string
  title: string
  category: Category
  description: string
  tags: string[]
  featured: boolean
  status?: string | null
  link?: string | null
  behanceLink?: string | null
  thumbnail?: StaticImageData | string | null
  features?: string[]
  builtWith?: string
  imageFit?: 'cover' | 'contain'
  imageBg?: string
  fullCaseStudy?: CaseStudy
  gallery?: (StaticImageData | string)[]
  galleryCaptions?: string[]
}
