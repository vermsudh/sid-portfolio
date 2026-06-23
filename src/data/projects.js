import globalLutyensImg from '../assets/project_screenshots/global_lutyens_website.png';
import sriBalajiImg from '../assets/project_screenshots/sri_balaji_electronics.png';
import weePortfolioImg from '../assets/project_screenshots/wee_portfolio.png';
import jobCopilotImg from '../assets/project_screenshots/job-copilot.png';
import pinterestImg from '../assets/project_screenshots/Pinterest_dashboard.png';
import caseLawImg from '../assets/project_screenshots/case_law_agent.png';
import captchaImg from '../assets/project_screenshots/captcha_solving agent.png';

export const projects = [
  // --- FRONT-END ---
  {
    id: 1,
    category: 'frontend',
    title: 'Personal Portfolio',
    description: 'A developer portfolio showcasing projects, skills, and experience. Built with a clean, minimal design and deployed on Vercel.',
    techStack: ['React', 'Next.js', 'Tailwind CSS'],
    liveLink: 'https://devsid-portfolio.vercel.app',
    image: null,
    featured: false,
  },
  {
    id: 2,
    category: 'frontend',
    title: 'Sri Balaji Electronics',
    description: 'Business website for an electronics retailer, featuring product showcasing, contact information, and a clean storefront design.',
    techStack: ['React', 'Next.js', 'Tailwind CSS'],
    liveLink: 'https://sri-balaji-electronics.vercel.app',
    image: sriBalajiImg,
    featured: false,
  },
  {
    id: 3,
    category: 'frontend',
    title: 'Influencer Portfolio',
    description: 'Portfolio site for a social media influencer, designed to showcase brand collaborations, content, and social presence.',
    techStack: ['React', 'Next.js', 'Tailwind CSS'],
    liveLink: 'https://wee-portfolio.vercel.app',
    image: weePortfolioImg,
    featured: false,
  },
  {
    id: 4,
    category: 'frontend',
    title: 'A.WON Architects',
    description: 'Fully responsive website for an architecture studio, covering layout, brand system implementation, and analytics/SEO infrastructure.',
    features: [
      'Responsive multi-page site using native Framer Stacks for stable breakpoints',
      'Consistent typographic system (Cormorant Garamond headings, Inter body)',
      'Resolved server-side rendering issue blocking Open Graph metadata via custom code injection',
      'DNS setup (A records, CNAME on GoDaddy) and Google Analytics tagging',
    ],
    techStack: ['Framer', 'Responsive Design', 'SEO', 'DNS', 'Google Analytics'],
    image: null,
    featured: false,
  },
  {
    id: 5,
    category: 'frontend',
    status: 'In Progress',
    title: 'Global Lutyens',
    description: 'Front-end for a premium real estate advisory firm operating in South Delhi\'s premium micro-markets. Discreet, design-led informational site.',
    features: [
      'Phase-gated build: plan → mockup checkpoint → component scaffold → polish',
      'Design tokens as CSS variables mapped to Tailwind utilities',
      'Typed local mock data behind clean interfaces for future CMS wiring',
      'Fully responsive across phone, tablet, laptop, and large desktop',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveLink: 'https://globallutyens.com',
    image: globalLutyensImg,
    featured: true,
  },
  // --- FULL-STACK ---
  {
    id: 6,
    category: 'fullstack',
    title: 'Job Copilot',
    description: 'Personal job-application tracker with a Kanban pipeline. Opening a card runs an AI action producing a tailored cover letter, resume bullets, interview questions, and a company brief.',
    features: [
      'Drag-and-drop Kanban board (Wishlist → Applied → Interviewing → Offer → Rejected)',
      'AI Kit generation via Gemini — cover letter, resume bullets, interview questions, company brief',
      'Supabase Auth with RLS-protected Postgres — every row scoped to the authenticated user',
      'Resume stored in profile; used to personalise every generated kit',
    ],
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Gemini AI', 'Tailwind CSS', 'dnd-kit'],
    image: jobCopilotImg,
    builtWith: 'Claude Code',
    featured: false,
  },
  // --- AUTOMATION ---
  {
    id: 7,
    category: 'automation',
    title: 'Pinterest Publishing Pipeline',
    description: 'Python pipeline that automates the full Pinterest content lifecycle — queue ingestion, AI caption generation, OAuth token management, and media publishing via the Pinterest API v5.',
    features: [
      'Full OAuth 2.0 token lifecycle management with proactive refresh and paired token persistence',
      'Sheet-backed state machine (Pending → Posted/Failed/Skipped) with batched cell updates',
      'AI caption generation via Gemini with multimodal image input and structured JSON output',
      'Custom exponential-backoff retry layer distinguishing transient (429/500/503) vs permanent failures',
      'Client-side rate-limit handling via X-RateLimit-Remaining/X-RateLimit-Reset headers',
      'Separate 4-step async state machine for video Pins (register → S3 upload → poll → create)',
    ],
    techStack: ['Python', 'OAuth 2.0', 'REST APIs', 'Gemini API', 'Google Sheets API', 'Automation'],
    image: pinterestImg,
    featured: true,
  },
  {
    id: 8,
    category: 'automation',
    title: 'Case Law Extraction Agent',
    description: 'AI-powered system that extracts and structures ITAT case law data using intelligent agents and automated pipelines, transforming unstructured legal documents into structured datasets.',
    features: [
      'Automated extraction of legal case data from ITAT tribunal orders',
      'LLM-powered structuring of unstructured legal documents via Gemini API',
      'Integrated CAPTCHA solving to unblock document access in automated workflows',
      'Backend system for managing, querying, and exporting structured case data',
    ],
    techStack: ['Python', 'Gemini API', 'Automation', 'Backend Systems'],
    image: caseLawImg,
    featured: true,
  },
  {
    id: 9,
    category: 'automation',
    title: 'CAPTCHA Solver',
    description: 'Automated CAPTCHA detection and resolution system that intercepts document requests, solves image-based CAPTCHAs using OCR and rule-based logic, and seamlessly submits solutions within the request pipeline.',
    features: [
      'Detects CAPTCHA images embedded in document request workflows',
      'Solves image-based CAPTCHAs using OCR and rule-based logic',
      'Automatically submits solutions to resume interrupted downloads',
      'Intelligent retry logic and error handling for failed attempts',
    ],
    techStack: ['Python', 'OCR', 'Automation', 'Web Scraping'],
    image: captchaImg,
    featured: false,
  },
  {
    id: 10,
    category: 'automation',
    title: 'TaxTech Intelligence Pipeline',
    description: 'Modular Python pipeline that collects and processes tax technology insights from unstructured sources and distributes them as structured intelligence reports.',
    features: [
      'Multi-stage scraping pipeline across multiple data sources',
      'Data extraction, normalization, and deduplication',
      'Automated email distribution of structured intelligence reports',
      'Modular architecture for easy source and output extension',
    ],
    techStack: ['Python', 'Automation', 'Data Processing', 'Web Scraping'],
    image: null,
    featured: false,
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectsByCategory = (category) =>
  category === 'all' ? projects : projects.filter((p) => p.category === category);

export const getCategoryCount = (category) =>
  category === 'all' ? projects.length : projects.filter((p) => p.category === category).length;
