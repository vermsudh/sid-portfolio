import type { Metadata } from 'next'
import About from '@/components/About/About'
import Experience from '@/components/Experience/Experience'

export const metadata: Metadata = {
  title: 'Experience — Sudhanshu Verma',
  description: 'Work history and roles.',
}

export default function ExperienceRoute() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <About />
      <Experience />
    </main>
  )
}
