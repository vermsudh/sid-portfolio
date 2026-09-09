import type { Metadata } from 'next'
import Link from 'next/link'
import { type StaticImageData } from 'next/image'
import { notFound } from 'next/navigation'
import { projects, getProjectBySlug, getNextProject } from '@/content/projects'
import GalleryCarousel from '@/components/Projects/GalleryCarousel'

// One static page per project slug.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Project — Sudhanshu Verma' }
  return {
    title: `${project.title} — Sudhanshu Verma`,
    description: project.description,
  }
}

// Only imported assets / absolute paths are renderable images; string TODOs render
// the "Image pending" placeholder instead.
function renderableImage(
  thumbnail: StaticImageData | string | null | undefined
): StaticImageData | string | null {
  if (!thumbnail) return null
  if (typeof thumbnail === 'string') return thumbnail.startsWith('/') ? thumbnail : null
  return thumbnail
}

function BulletSection({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section className="mt-12">
      <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent-text">
        // {heading}
      </h2>
      <ul className="mt-4 max-w-[60ch] space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 font-body text-[1.05rem] leading-[1.6] text-muted max-[520px]:text-[0.95rem]"
          >
            <span aria-hidden className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-text" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const next = getNextProject(slug)
  const img = renderableImage(project.thumbnail)

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto max-w-[900px] px-8 pt-24 pb-16 max-[768px]:px-5 max-[768px]:pt-20">
        {/* Back to list */}
        <Link
          href="/projects"
          className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted transition-colors duration-200 hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          ← All projects
        </Link>

        {/* 1. Header */}
        <header className="mt-6">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">
            {project.category}
          </span>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <h1 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-black uppercase leading-[1] text-text">
              {project.title}
            </h1>
            {project.status && (
              <span className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                {project.status}
              </span>
            )}
          </div>

          {/* Links — render only what's present */}
          {(project.link || project.behanceLink) && (
            <div className="mt-6 flex flex-wrap items-center gap-5">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-body text-[0.95rem] font-semibold text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  View live ↗
                </a>
              )}
              {project.behanceLink && (
                <a
                  href={project.behanceLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-body text-[0.95rem] font-medium text-muted transition-colors duration-200 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Behance ↗
                </a>
              )}
            </div>
          )}
        </header>

        {/* 2. What it is */}
        <section className="mt-12">
          <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent-text">
            // what it is
          </h2>
          <p className="mt-4 max-w-[60ch] font-body text-[1.2rem] leading-[1.6] text-text max-[520px]:text-[1.05rem]">
            {project.description}
          </p>
        </section>

        {/* 2b. Problem / solution — only for projects with a full case study */}
        {project.fullCaseStudy && (
          <>
            <BulletSection heading="the problem" items={project.fullCaseStudy.problem} />
            <BulletSection heading="how it works" items={project.fullCaseStudy.solution} />
          </>
        )}

        {/* 3. Tech stack */}
        <section className="mt-12">
          <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent-text">
            // tech stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 3b. Impact — only for projects with a full case study */}
        {project.fullCaseStudy && (
          <BulletSection heading="the impact" items={project.fullCaseStudy.impact} />
        )}

        {/* 4. Media gallery — a single cropped cover when there's only one shot;
            a swipeable carousel (buttons + drag + dots) once `gallery` adds more. */}
        <section className="mt-12">
          <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent-text">
            // gallery
          </h2>
          <div className="mt-4">
            <GalleryCarousel
              slides={[
                ...(img ? [{ src: img, alt: `${project.title} screenshot` }] : []),
                ...(project.gallery?.map((shot, i) => ({
                  src: shot,
                  alt: `${project.title} screenshot ${i + 2}`,
                  caption: project.galleryCaptions?.[i],
                })) ?? []),
              ]}
            />
          </div>
        </section>

        {/* 5. Next project */}
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-20 flex items-center justify-between gap-6 border-t border-border pt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <div>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                Next project
              </span>
              <p className="mt-2 font-display text-[clamp(1.4rem,3vw,2.2rem)] font-bold uppercase leading-tight text-text transition-colors duration-200 group-hover:text-accent-text">
                {next.title}
              </p>
            </div>
            <span className="font-display text-[clamp(1.6rem,4vw,2.6rem)] text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent-text">
              →
            </span>
          </Link>
        )}
      </div>
    </main>
  )
}
