import type { Project } from './types'
import thumbnail from '@/assets/project_screenshots/case_law_agent.png'

// Migrated unchanged from data/projects.js (id 8). Confirmed by Sid as the 4th Home
// featured project alongside `captcha-solving-agent` (§ Featured-Projects horizontal
// scroll fix) — the two entries describe the same underlying ITAT pipeline from
// different angles but are kept separate and both featured.
export const caseLawExtractionAgent: Project = {
  id: 8,
  slug: 'case-law-extraction-agent',
  title: 'Case Law Extraction Agent',
  category: 'Automation',
  description:
    'AI-powered system that extracts and structures ITAT case law data using intelligent agents and automated pipelines, transforming unstructured legal documents into structured datasets.',
  features: [
    'Automated extraction of legal case data from ITAT tribunal orders',
    'LLM-powered structuring of unstructured legal documents via Gemini API',
    'Integrated CAPTCHA solving to unblock document access in automated workflows',
    'Backend system for managing, querying, and exporting structured case data',
  ],
  tags: ['Python', 'Gemini API', 'Automation', 'Backend Systems'],
  link: null, // no live link in repo
  thumbnail,
  fullCaseStudy: {
    problem: [
      'ITAT tribunal orders are dense, inconsistently formatted PDF judgments — reading them manually to pull case facts, dates, and outcomes doesn’t scale for large-volume legal research.',
      'Naive text parsing and regex break down across documents with different layouts and legal phrasing, so extraction needs to understand the content, not just the text.',
      'Legal teams needed the same categories — bench, judges, parties, appeals, dates, outcome — extracted consistently across thousands of orders to make the data searchable and analyzable.',
    ],
    solution: [
      'A Python pipeline (PyMuPDF, pymupdf4llm, pypdfium2) extracts and normalizes text from ITAT order PDFs while preserving legal formatting.',
      'A strict extraction schema — bench, judges, assessee/revenue parties, appeal numbers, dates, transfer-pricing and comparables data, outcome classification — is enforced through prompt engineering against Gemini 2.5 Pro and Flash.',
      'Hallucination-prevention rules keep the output trustworthy for legal use: extract only explicit facts, return null when unavailable, never infer legal conclusions.',
      'Batch execution via `run_batch_itat.py` processes large collections of orders unattended, each producing validated, schema-compliant JSON.',
    ],
    impact: [
      'Converts a stack of unread PDF judgments into structured, queryable JSON — ready for legal analytics, tribunal trend analysis, and case-search tooling.',
      'Removes the manual reading/extraction bottleneck, letting large volumes of historical case law be processed automatically and consistently.',
      'Forms the extraction half of the same underlying ITAT research system as the Captcha Solving Agent, which supplies its input documents.',
    ],
  },
  featured: true,
}
