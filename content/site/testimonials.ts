// PLACEHOLDER content only (spec §5.1④). The Testimonials component is built but
// NOT mounted this phase — flip on later with real quotes. These are clearly-fake
// placeholders, never presented as real endorsements.
export interface Testimonial {
  quote: string
  author: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Placeholder testimonial — replace with a real client quote before mounting this section.',
    author: 'Client Name',
    role: 'Founder, Company',
  },
]
