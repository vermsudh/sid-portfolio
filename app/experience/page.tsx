import type { Metadata } from 'next'
import Experience from '@/components/Experience/Experience'

export const metadata: Metadata = {
  title: 'Experience — Sudhanshu Verma',
  description: 'Work history and roles.',
}

export default function ExperienceRoute() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <Experience />
    </main>
  )
}
