import type { Metadata } from 'next'
import Testimonials from '@/components/Testimonials/Testimonials'

export const metadata: Metadata = {
  title: 'Testimonials — Sudhanshu Verma',
  description: 'What clients say about working with me.',
}

export default function TestimonialsRoute() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto max-w-layout px-8 pt-24 pb-16 max-[768px]:px-5 max-[768px]:pt-20">
        {/* Header */}
        <header className="max-w-[46ch]">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-text">
            // kind words
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5rem)] font-black uppercase leading-[0.98] text-text">
            Testimonials
          </h1>
          <p className="mt-5 font-body text-[1.05rem] leading-[1.7] text-muted">
            A few words from the people I&apos;ve built for — each links to the live site and
            their LinkedIn so you can verify it&apos;s the real deal.
          </p>
        </header>

        <Testimonials />
      </div>
    </main>
  )
}
