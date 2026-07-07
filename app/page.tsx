import Hero from '@/components/Hero/Hero'
import Projects from '@/components/Projects/Projects'
import Skills from '@/components/Skills/Skills'
import About from '@/components/About/About'
import Testimonials from '@/components/Testimonials/Testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <Skills />
    </>
  )
}
