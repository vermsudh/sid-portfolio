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
  tags: ['React', 'Vite', 'Tailwind CSS'],
  link: 'https://wee-portfolio.vercel.app',
  behanceLink:
    'https://www.behance.net/gallery/251844287/Wee-Portfolio-Website-for-a-Social-Media-Influencer',
  thumbnail,
  fullCaseStudy: {
    problem: [
      'Vanshika (content creator, social media manager, and freelance model) had no owned web presence to show brands and hiring managers her work, experience, and testimonials in one place — everything lived scattered across Instagram posts and DMs.',
      'A creator portfolio has to do double duty: read as a polished case-study site for brand pitches, while still carrying her actual personal voice — generic templates don’t capture that.',
    ],
    solution: [
      'Built a 10-section single-page React (Vite) + Tailwind CSS site — Hero, About, Services, Experience timeline, video-based Work grid, scrolling Brands marquee, Testimonials, and a branching multi-step Contact form.',
      'Designed a five-color earthy palette and editorial typography (Playfair Display, Dancing Script, DM Sans) selected directly with Vanshika, with each section carrying its own distinct background rather than one repeated theme.',
      'Replaced Instagram embeds with locally hosted video clips using IntersectionObserver-based autoplay-on-scroll and real photo thumbnails, so the Work section performs and looks intentional instead of relying on a third-party embed.',
      'Pre-processed brand logos onto square canvases with Python and PIL before rendering them in circular frames, solving the wide-wordmark-logo-vs-circle-crop problem.',
      'Cross-checked every quantified claim in the copy — like "20+ brands worked with" — against her actual resume before publishing, to keep the site honest.',
    ],
    impact: [
      'Gave Vanshika a single, ownable link to send to brands and hiring managers instead of scattering her work across social posts.',
      'Live and iterating at wee-portfolio.vercel.app, built and shipped end-to-end — planning, HTML mockup, implementation, deploy — as a real client project.',
    ],
  },
  featured: true,
}
