# ITAT Website Scraper & Structured Case Law Extraction System

## Author
**SUDHANSHU**

## Project Overview

This project was developed to automate the extraction of structured information from Income Tax Appellate Tribunal (ITAT) orders and judgments. The system combines PDF processing, prompt engineering, schema-driven extraction, and Google Gemini to convert unstructured legal documents into structured JSON datasets suitable for analytics, search, and legal research.

## Core Objectives

- Extract information from ITAT PDF orders
- Convert unstructured legal documents into structured data
- Leverage Google Gemini for legal document understanding
- Generate schema-compliant JSON output
- Enable large-scale legal analytics and case-law research

## Technology Stack

### Programming Language
- Python 3.11

### AI Models
- Gemini 2.5 Pro
- Gemini 2.5 Flash

### PDF Processing Libraries
- PyMuPDF (fitz)
- pymupdf4llm
- pypdfium2

### Supporting Technologies
- JSON
- Git
- GitHub
- VS Code
- Prompt Engineering
- Schema Validation

## Architecture

PDF → Text Extraction → Cleaning → Prompt Engineering → Gemini → Schema Validation → Structured JSON

## Workflow

### 1. PDF Ingestion
The pipeline begins by loading ITAT order PDFs for processing.

### 2. Text Extraction
PyMuPDF extracts text while preserving document structure and legal formatting.

### 3. Document Normalization
The extracted text is cleaned and normalized before being sent to Gemini.

### 4. Schema-Driven Extraction
A predefined schema ensures consistent, structured outputs.

### 5. Google Gemini Processing
Gemini receives:
- Legal document content
- System prompt
- Extraction schema

The model returns structured JSON output.

## Major Extraction Categories

### Bench Information
- Bench Name
- Location

### Judges Information
- Judicial Member
- Accountant Member

### Assessee Information
- Assessee Name
- PAN

### Revenue Information
- Income Tax Department References
- Assessing Officer Information

### Appeals Information
- Appeal Numbers
- Assessment Years
- Connected Appeals

### Date Information
- Hearing Date
- Pronouncement Date
- Order Date

### Transfer Pricing Information
- Disputed Amount
- Sector Classification
- Comparables Analysis
- Outcome Classification

## Comparables Extraction

The system extracts:
- Comparable Company Name
- Inclusion/Exclusion Status
- Tribunal Reasoning

Example:
- Company Name
- Status
- Reason for Inclusion/Exclusion

## Outcome Classification

Possible outcomes:
- Allowed
- Partly Allowed
- Dismissed
- Remanded

## Prompt Engineering Strategy

The project relies heavily on prompt engineering.

Key objectives:
- Extract only supported facts
- Avoid hallucinations
- Follow schema strictly
- Return valid JSON
- Normalize dates
- Capture legal relationships

## Hallucination Prevention

Rules:
1. Extract only explicit facts
2. Do not infer legal conclusions
3. Return null when unavailable
4. Follow schema constraints

## Batch Processing

The project supports batch execution through scripts such as:

run_batch_itat.py

Capabilities:
- Multiple PDF processing
- Automated extraction
- Structured output generation

## Output Format

The final output is a structured JSON object containing:

- Bench Information
- Judges Information
- Assessee Details
- Revenue Details
- Appeals
- Dates
- Comparables
- Outcome

## Development Highlights

Throughout the project, the following concepts were implemented:

- Prompt Engineering
- Schema-First Extraction Design
- Google Gemini Integration
- Legal Document Processing
- Structured Data Generation
- JSON Validation
- Modular Python Architecture
- Batch Processing Workflows

## Impact

The solution transforms lengthy tribunal orders into machine-readable datasets that can be used for:

- Legal Analytics
- Tribunal Trend Analysis
- Transfer Pricing Research
- Case Search Systems
- Knowledge Management Platforms
- AI-Powered Legal Applications

## Author

SUDHANSHU

Designed and developed the ITAT Website Scraper and Structured Legal Information Extraction System using Python, Google Gemini, prompt engineering, and schema-based extraction techniques.
