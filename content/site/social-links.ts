import type { IconType } from 'react-icons'
import { FaGithub, FaLinkedin, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { SiBehance } from 'react-icons/si'
import { HiOutlineMail } from 'react-icons/hi'

export interface SocialLink {
  label: string
  href: string | null // null → URL not yet provided; render-what's-present (skip nulls)
  Icon: IconType
}

// Single source of truth for the WhatsApp contact number (digits only, incl.
// country code) — used by the /contact page's wa.me deep link (spec §5.4).
export const WHATSAPP_NUMBER = '919217194909'

// Full Footer set (spec §6 checklist row 1). All URLs are real values pulled from
// the repo/CLAUDE.md except Twitter/X, whose handle isn't provided anywhere — left
// null and flagged so Stage 10 can drop it or fill it in.
export const footerSocials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vermsudh/', Icon: FaLinkedinIn },
  { label: 'Behance', href: 'https://www.behance.net/vermsudh', Icon: SiBehance },
  { label: 'GitHub', href: 'https://github.com/vermsudh', Icon: FaGithub },
  { label: 'Email', href: 'mailto:vermsudh@gmail.com', Icon: HiOutlineMail },
  { label: 'Instagram', href: 'https://www.instagram.com/sudhanshu.verma/', Icon: FaInstagram },
  { label: 'Twitter', href: null, Icon: FaXTwitter }, // TODO: real X/Twitter handle not provided
]

// Lighter Hero set — first-impression icons, exact order LinkedIn → Behance →
// Email (spec §5.1①). Spec asked for SiLinkedin, but Simple Icons dropped its
// LinkedIn mark (branding) — using FaLinkedin, the closest square brand mark.
export const heroSocials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vermsudh/', Icon: FaLinkedin },
  { label: 'Behance', href: 'https://www.behance.net/vermsudh', Icon: SiBehance },
  { label: 'Email', href: 'mailto:vermsudh@gmail.com', Icon: HiOutlineMail },
]
