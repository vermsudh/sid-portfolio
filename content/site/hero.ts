// Hero copy migrated unchanged from components/Hero/Hero.tsx.
// NOTE (spec §1 content boundary): the one-line positioning statement (`subline`)
// is the ADJUSTABLE field — it may be sharpened to lead with front-end +
// automation in Stage 5. Kept verbatim here; not rewritten during migration.
export const hero = {
  eyebrow: "Hi, I'm",
  name: 'Sudhanshu',
  fullName: 'Sudhanshu Verma',
  // Adjustable positioning line (see note above) — reframed for freelance clients,
  // leading with front-end + automation. Facts drawn from real project/skill
  // content (Next.js/React/Tailwind front-end; Python/Selenium/Gemini automation).
  subline: 'Front-end developer & automation engineer',
  description:
    'I build fast, refined websites with Next.js, React and Tailwind — and Python automation that turns manual, repetitive work into reliable pipelines. Currently available for freelance projects.',
  // New UI microcopy introduced by the redesign (§5.1①) — not existing bio content.
  availabilityBadge: 'Available for freelance work',
  ctas: {
    primary: { label: 'View my projects', href: '/projects' },
    secondary: { label: 'Get in touch', href: '/contact' },
  },
}
