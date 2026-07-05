import type { Metadata } from 'next'
import ContactFlow from '@/components/Contact/ContactFlow'

export const metadata: Metadata = {
  title: 'Contact — Sudhanshu Verma',
  description: 'Tell me about your project and I’ll get back to you.',
}

export default function ContactRoute() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto max-w-layout px-8 pt-24 pb-24 max-[768px]:px-5 max-[768px]:pt-20">
        {/* Framing — makes the page feel complete on its own */}
        <header className="mx-auto mb-12 max-w-[620px]">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-text">
            // let&apos;s talk
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5rem)] font-black uppercase leading-[0.98] text-text">
            Let&apos;s work together
          </h1>
          <p className="mt-5 font-body text-[1.05rem] leading-[1.7] text-muted">
            I build front-end websites and automation tools for teams that care about
            craft. Tell me what you need — I usually reply within a day.
          </p>
        </header>

        <ContactFlow />
      </div>
    </main>
  )
}
