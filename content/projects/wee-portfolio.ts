import type { Project } from './types'
import thumbnail from '@/assets/project_screenshots/wee_portfolio.png'

// Migrated from data/projects.js (id 3, "Influencer Portfolio").
// Per Stage 4 rule #5: the live repo's title/description/tags differ from the
// spec §5.4 summary ("Wee-Portfolio" / "A portfolio website built for a social
// media content creator..." / React·Vite·Tailwind) — so the REPO's real values
// are kept, and only the confirmed behanceLink is merged in. Repo already has a
// working thumbnail, so it's kept over the spec's TODO placeholder.
export const weePortfolio: Project = {
  id: 3,
  slug: 'wee-portfolio',
  title: 'Influencer Portfolio',
  category: 'Front-end',
  description:
    'Portfolio site for a social media influencer, designed to showcase brand collaborations, content, and social presence.',
  tags: ['React', 'Next.js', 'Tailwind CSS'],
  link: 'https://wee-portfolio.vercel.app',
  behanceLink:
    'https://www.behance.net/gallery/251844287/Wee-Portfolio-Website-for-a-Social-Media-Influencer',
  thumbnail,
  featured: true,
}
