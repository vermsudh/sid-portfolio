import type { Project } from './types'
import thumbnail from '@/assets/project_screenshots/ar_waseem_portfolio/hero-image.png'
import featuredProjects from '@/assets/project_screenshots/ar_waseem_portfolio/featured_project.png'
import projectBook from '@/assets/project_screenshots/ar_waseem_portfolio/project_book.png'
import projectPage from '@/assets/project_screenshots/ar_waseem_portfolio/project_page.png'
import experienceSection from '@/assets/project_screenshots/ar_waseem_portfolio/experience_page.png'
import contactPage from '@/assets/project_screenshots/ar_waseem_portfolio/contact_page.png'

export const arWaseemPortfolio: Project = {
  id: 12,
  slug: 'ar-waseem-portfolio',
  title: 'Ar. Waseem Ahmad Portfolio',
  category: 'Front-end',
  status: 'In development',
  description:
    'Portfolio site for a Delhi-based architect, built to make a dense archive of working drawings — mostly employer-credited CAD sheets, not photography — read as the product in under ninety seconds.',
  tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Cloudflare R2'],
  link: 'https://ar-waseem-portfolio.vercel.app/',
  behanceLink: null,
  thumbnail,
  gallery: [featuredProjects, projectBook, projectPage, experienceSection, contactPage],
  galleryCaptions: [
    'Alternating 80vh featured panels — five projects, image/text sides swapping down the page, each a single link to its detail page.',
    "The /work register's sticky book preview — a page-turn animation through a project's indexed sheets, traced from the real drawing archive.",
    'The /work index — a ten-row register with a discipline filter, the site’s first light/dark theme system.',
    'The dark about-band — portrait, practice stats, and a falling tool-logo lane over a drifting floor-plan trace.',
    'Contact rebuilt as a title-block — drawing-sheet primitives (hairlines, Archivo labels) filled in with contact details instead of drawing details.',
  ],
  fullCaseStudy: {
    problem: [
      "Waseem's real project archive is mostly employer work — eight of ten known projects are stamped with another practice's title block (M/S Keshav Constructions, Architect: Abhishek Khanna) from his time at A.won — so the site could never read as a résumé of solo work without misrepresenting who actually holds authorship.",
      'The archive itself is dense CAD title blocks and working-drawing PDFs, not photography — there was no polished imagery to lean on, so the drawings needed to become the actual visual product rather than a placeholder for one.',
      "A recruiter or client gives a portfolio about ninety seconds; the real catalog runs to ten projects, which needed to compare fast on one screen while still giving a smaller, featured set room to stand out.",
    ],
    solution: [
      "Built a hand-rolled, self-drawing SVG hero instead of reaching for an animation library: the real A 23 Nirman Vihar elevation was traced from its source PDF and reduced from 398,775 raw paths (108MB) to 340 merged, ordered paths (337KB), then animated in with a stroke-dashoffset draw-in that crossfades into a 2400px WebP render of the same crop — timed against real browser paint-flush and requestAnimationFrame bugs (a forced style flush, a double rAF) rather than shipped with GSAP or Lottie.",
      "Centralized authorship in one function, `components/work/credit.ts`, so the mandatory employer-vs-own-practice credit line (practice, architect of record, Waseem's role) renders identically everywhere a project appears — the nav row, the book's cover leaf, the page foot — instead of being retyped, and risking drift, in every component that shows a project.",
      "Replaced a naive full-height project scroll with a register: a compact ten-row list plus a sticky, keyboard-navigable preview plate that 'leafs' through each project's traced sheets on hover/focus (rotateY page turns, with the opacity fade deliberately delayed into the transform so it reads as a page turning, not a cross-dissolve) — so all ten projects compare on one screen instead of an eleven-screen scroll.",
      "Shipped the site's first light/dark theme system, deliberately scoped to only the /work index and nav — a three-state token setup (explicit choice, then OS preference, then a light default) read from localStorage before first paint to avoid a flash — because the home page's renders haven't been colour-graded for a dark background yet, and a bright exterior render on near-black just glares.",
      'Delivered every image through Cloudflare R2 behind one `img()` helper, with hard format/size budgets per asset type (renders ≤500KB WebP, traced sheets ≤90KB, thumbnails generated separately rather than scaled in CSS) — catching and fixing a real bug where a raw 20.89MB PNG render had to become the ~500KB WebP the budget required.',
    ],
    impact: [
      'Live at ar-waseem-portfolio.vercel.app and shipping incrementally, with a single reusable attribution system that keeps every one of Waseem’s eight employer-credited projects correctly and consistently sourced instead of relying on catching it project-by-project.',
      'Turned an archive of unreviewed CAD exports and PDF title blocks into the site’s actual visual product — no stock photography, no placeholder renders anywhere on the site.',
      'Established a file-organization and content-model convention — one folder per section, content data kept separate from components, no barrel files — that’s since carried into every later page spec (About, Contact, the Work register) without renegotiation.',
    ],
  },
  featured: true,
}
