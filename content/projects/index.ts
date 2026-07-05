import type { Project } from './types'
import { sriBalajiElectronics } from './sri-balaji-electronics'
import { weePortfolio } from './wee-portfolio'
import { awonArchitects } from './awon-architects'
import { globalLutyens } from './global-lutyens'
import { jobCopilot } from './job-copilot'
import { pinterestPublishingPipeline } from './pinterest-publishing-pipeline'
import { caseLawExtractionAgent } from './case-law-extraction-agent'
import { captchaSolvingAgent } from './captcha-solving-agent'
import { taxtechIntelligencePipeline } from './taxtech-intelligence-pipeline'

export type { Project, Category } from './types'

// Order preserved from the original data/projects.js.
export const projects: Project[] = [
  sriBalajiElectronics,
  weePortfolio,
  awonArchitects,
  globalLutyens,
  jobCopilot,
  pinterestPublishingPipeline,
  caseLawExtractionAgent,
  captchaSolvingAgent,
  taxtechIntelligencePipeline,
]

// The confirmed Home featured set (spec §5.1②), in exact order. Hard-set by slug
// so it's authoritative regardless of any `featured` flags. Single source of truth
// for the Home featured section, the /projects ranked order, and the "next" wrap.
const FEATURED_SLUGS = ['global-lutyens', 'wee-portfolio', 'captcha-solving-agent']

const bySlug = (slug: string) => projects.find((p) => p.slug === slug)

export const orderedProjects: Project[] = [
  ...FEATURED_SLUGS.map(bySlug).filter((p): p is Project => Boolean(p)),
  ...projects.filter((p) => !FEATURED_SLUGS.includes(p.slug)),
]

// Next project in ranked order, wrapping from last back to first.
export const getNextProject = (slug: string): Project | undefined => {
  const i = orderedProjects.findIndex((p) => p.slug === slug)
  if (i === -1) return undefined
  return orderedProjects[(i + 1) % orderedProjects.length]
}

// Normalize so category matching works regardless of casing/hyphens
// ('frontend', 'front-end', 'Front-end' all compare equal).
const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '')

// Hard-set to the confirmed featured set, in exact order (not flag-driven).
export const getFeaturedProjects = (): Project[] =>
  FEATURED_SLUGS.map(bySlug).filter((p): p is Project => Boolean(p))

export const getProjectsByCategory = (category: string): Project[] =>
  category === 'all' ? projects : projects.filter((p) => norm(p.category) === norm(category))

export const getCategoryCount = (category: string): number =>
  category === 'all' ? projects.length : getProjectsByCategory(category).length

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)
