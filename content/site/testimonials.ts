import type { StaticImageData } from 'next/image'

import rakeshImg from '@/assets/testimonial-images/rakhesh_khanna.png'
import abhishekImg from '@/assets/testimonial-images/Abhishek-khanna.png'
import vanshikaImg from '@/assets/testimonial-images/vanshika_verma.png'

export interface Testimonial {
  quote: string
  author: string
  role: string // company / context, e.g. "Global Lutyens"
  avatar: StaticImageData
  avatarPosition?: string // object-position tuning per screenshot
  avatarZoom?: number // optional scale for small faces (e.g. Vanshika)
  liveLink?: string
  linkedin?: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'From the very first conversation, Sudhanshu got the brief right — he worked closely with us to shape a site that genuinely felt premium.',
    author: 'Rakesh Khanna',
    role: 'Global Lutyens',
    avatar: rakeshImg,
    avatarPosition: 'center 28%',
    liveLink: 'https://www.globallutyens.com/',
    linkedin: 'https://www.linkedin.com/in/rakesh-khanna-495a7987/',
  },
  {
    quote:
      'Sudhanshu had the live site ready for our client in just a week. Communication stayed clear throughout, and the final result matched our vision exactly.',
    author: 'Abhishek Khanna',
    role: 'A.WON Architects',
    avatar: abhishekImg,
    avatarPosition: 'center 18%',
    liveLink: 'https://awon.world/',
    linkedin: 'https://www.linkedin.com/in/abhishekkhanna-dpod/',
  },
  {
    quote:
      'Sudhanshu built my portfolio exactly how I pictured it — clean, fast, and simple to update. He stayed patient through every round of feedback and still delivered early.',
    author: 'Vanshika Verma',
    role: 'wee Portfolio',
    avatar: vanshikaImg,
    avatarPosition: 'center 48%',
    avatarZoom: 2,
    liveLink: 'https://wee-portfolio.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/vanshika-verma-45b770267/',
  },
]
