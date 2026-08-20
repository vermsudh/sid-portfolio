# CAPTCHA Solving Agent
**Author:** Sudhanshu  
**Project Type:** AI-Powered CAPTCHA Solving & Automated Case Law Collection System

---

# Overview

CAPTCHA Solving Agent is an end-to-end automation system designed to collect judicial and tax case law orders directly from government websites without human intervention.

The project combines browser automation, AI-powered CAPTCHA recognition, intelligent document collection, PDF processing, and structured data extraction into a single automated pipeline.

The primary objective of this project is to:

- Automatically access government judicial portals
- Solve CAPTCHA challenges using Generative AI
- Search and retrieve case law orders
- Download large volumes of judgments and tribunal orders
- Process documents automatically
- Extract structured legal information
- Build a searchable legal knowledge base

This system eliminates the need for manual CAPTCHA solving and manual document collection, allowing large-scale legal research and analytics.

---

# Business Problem

Government judicial websites often:

- Require CAPTCHA verification
- Limit automated access
- Store thousands of historical orders
- Provide unstructured PDF documents
- Make large-scale legal research time-consuming

Researchers typically spend:

1. Searching for cases manually
2. Solving CAPTCHA repeatedly
3. Downloading PDFs one by one
4. Reading orders manually
5. Extracting information manually

This project automates the entire workflow.

---

# Solution Architecture

The solution consists of multiple independent modules:

## Module 1: Website Automation

Responsible for:

- Opening judicial websites
- Navigating search forms
- Selecting year ranges
- Applying filters
- Triggering searches
- Downloading results

### Technologies

- Python
- Selenium
- Playwright
- Chrome Browser
- Chromium

---

## Module 2: CAPTCHA Detection

The automation script:

1. Detects CAPTCHA image
2. Captures screenshot
3. Extracts image region
4. Sends CAPTCHA image to AI model

### Workflow

Website
↓
CAPTCHA Image
↓
Screenshot Extraction
↓
Gemini API
↓
Predicted CAPTCHA Text
↓
Form Submission

---

## Module 3: AI CAPTCHA Solving

### AI Engine

Google Gemini

### Purpose

Interpret CAPTCHA images automatically.

### Process

1. Capture CAPTCHA image
2. Convert image into Gemini-compatible format
3. Create prompt
4. Send image + prompt to Gemini
5. Receive predicted text
6. Fill CAPTCHA field
7. Submit form

### Example Prompt Strategy

The model is instructed to:

- Read only visible characters
- Ignore background noise
- Ignore lines crossing characters
- Return only CAPTCHA text
- Avoid explanations

### Benefits

- Removes manual intervention
- Scales document collection
- Handles distorted CAPTCHA images
- Improves automation success rate

---

# Browser Automation Layer

## Selenium

Used for:

- Element interaction
- Form filling
- Button clicking
- Download workflows
- Browser control

### Features

- Explicit waits
- Dynamic element handling
- Automated retries
- Exception management

---

## Playwright

Used where modern browser rendering is required.

### Benefits

- Faster execution
- Better handling of dynamic websites
- Improved reliability
- Modern browser automation APIs

---

# Search Automation

The system automatically:

- Selects assessment years
- Selects date ranges
- Applies filters
- Executes searches
- Traverses result pages

The objective is to retrieve every available order for a selected period.

---

# Bulk Order Collection

The scraper is designed to collect:

- Tribunal orders
- Judicial orders
- Historical case law
- Multi-year archives

### Example Workflow

Year Selection
↓
Search Execution
↓
Result Pages
↓
Order Links
↓
PDF Downloads
↓
Local Storage

This allows collection of thousands of orders automatically.

---

# PDF Collection Pipeline

After locating orders:

1. Download PDF
2. Validate file
3. Store locally
4. Create processing queue

### File Management

- Duplicate detection
- Naming normalization
- Download verification
- Error recovery

---

# Document Processing Pipeline

Once PDFs are downloaded:

### Libraries

- PyMuPDF (fitz)
- pymupdf4llm
- pypdfium2

### Tasks

- PDF parsing
- Text extraction
- OCR support when needed
- Page processing
- Content cleanup

---

# Structured Information Extraction

The extracted document text is sent to AI for legal analysis.

### AI Engine

Google Gemini

### Purpose

Convert unstructured legal orders into structured JSON.

---

# Legal Data Extraction

The extraction pipeline identifies:

## Bench Information

- Bench name
- Bench city

## Judges

- Judicial Member
- Accountant Member
- Other members

## Parties

### Assessee

- Name
- PAN
- Representatives

### Revenue

- Department name
- Representatives

---

## Appeals

Extraction includes:

- Appeal number
- Assessment year
- Appellant type
- Disputed amount

---

## Important Dates

- Date of hearing
- Date of order
- Date of pronouncement

---

## Issues Raised

The system identifies:

- Assessee arguments
- Revenue arguments
- Tribunal findings
- Final outcome

---

## Transfer Pricing Analysis

The solution can identify:

- Transfer Pricing matters
- DRP references
- TPO references
- ALP disputes

---

## Comparable Companies

For TP matters:

- Comparable name
- Assessee position
- Revenue position
- Tribunal decision
- Final inclusion/exclusion

---

# JSON Output Architecture

The final output is converted into structured JSON.

Benefits:

- Database ready
- Search ready
- Analytics ready
- AI ready

Example categories include:

- Bench
- Judges
- Appeals
- Issues
- Comparables
- Orders
- Dates

---

# Error Handling

The system contains safeguards for:

### CAPTCHA Failure

- Retry mechanism
- Re-submit workflow

### Download Failure

- Automatic retry
- Timeout recovery

### Parsing Failure

- Logging
- Reprocessing queue

### AI Failure

- Retry requests
- Exception handling

---

# Scalability Features

The architecture supports:

- Batch processing
- Large PDF collections
- Multi-year extraction
- Automated execution

Potential enhancements:

- Parallel downloads
- Queue-based processing
- Distributed workers
- Cloud deployment

---

# Tech Stack

## Programming

- Python

## Browser Automation

- Selenium
- Playwright

## AI

- Google Gemini API
- Gemini Vision Capabilities

## PDF Processing

- PyMuPDF
- pymupdf4llm
- pypdfium2

## Parsing

- JSON
- Regular Expressions

## Development Tools

- VS Code
- Git
- GitHub
- GitHub Copilot

---

# AI Engineering Components

The project heavily relies on prompt engineering.

Key areas:

### CAPTCHA Recognition Prompts

Designed to:

- Improve recognition accuracy
- Reduce hallucinations
- Return only required text

### Legal Extraction Prompts

Designed to:

- Extract structured entities
- Classify legal issues
- Normalize data
- Generate valid JSON

---

# Workflow Summary

Government Website
↓
Browser Automation
↓
CAPTCHA Detection
↓
Gemini CAPTCHA Solver
↓
Search Execution
↓
Order Discovery
↓
PDF Download
↓
PDF Processing
↓
Text Extraction
↓
Gemini Legal Extraction
↓
Structured JSON Output

---

# Project Outcomes

The project successfully demonstrates:

- AI-assisted CAPTCHA solving
- Browser automation at scale
- Automated case law collection
- Legal document intelligence
- Structured legal data extraction
- End-to-end workflow automation

---

# Portfolio Highlights

### Key Achievements

- Automated CAPTCHA solving using Generative AI
- Eliminated manual order collection workflow
- Built large-scale judicial document acquisition pipeline
- Extracted structured legal intelligence from unstructured PDFs
- Combined Selenium, Playwright, Gemini, and PDF processing into one platform
- Reduced manual research effort dramatically
- Created a reusable legal research automation framework

---

# Author

Sudhanshu

CAPTCHA Solving Agent – AI Powered Legal Research Automation Platform
