// Plain-text renditions of Adithya's own project READMEs, shown in the
// File Manager "projects" folder → Notepad. Markdown/badge markup stripped
// for readability in the monospace viewer.

export const PROJECT_READMES = [
  {
    name: 'docgen-README.md',
    title: 'docgen-README.md - Notepad',
    body: `# DocGen - AI Project Documentation

Turn every coding session into a professional PDF report - analyzed,
documented, and archived to Google Drive automatically.

DocGen is a Visual Studio Code extension that scans your active project,
extracts what actually changed and what the code does, and produces an
accurate, human-readable session report as a PDF. When GitHub Copilot is
available it writes the narrative; otherwise a fully deterministic analysis
still produces the report. Finished PDFs can be pushed straight to a Google
Drive folder for a durable, searchable log of your work.

Built for ML engineers, students, and teams who need a paper trail of daily
progress without writing it by hand.

## Features
- AI-enhanced reports via the VS Code Language Model API (Copilot, gpt-4o),
  with a deterministic offline fallback so you always get a report.
- Verified statistics - exact counts of files, functions, classes,
  dependencies, and git activity, from static analysis (never the model).
- Session-aware - reads today's git changes and commits.
- ML training logs - auto-discovers logs and extracts epochs, accuracy, loss.
- Tech-stack detection mapped to a curated catalog with plain-English notes.
- Self-contained PDF rendered locally via a bundled headless Chromium.
- One-command Google Drive upload (scoped to drive.file only).

## How it works
Analyze (files, git, logs, deps) -> Generate (Copilot narrative or
deterministic) -> Render PDF (Puppeteer) -> Upload to Google Drive.

## Tech stack
TypeScript, VS Code Extension API, esbuild, Puppeteer, Python (Google Drive
API), GitHub Copilot / gpt-4o.

MIT (c) Adithya-1987`,
  },
  {
    name: 'sales-agent-README.md',
    title: 'sales-agent-README.md - Notepad',
    body: `# Sales Follow-up Agent

An AI agent that reads sales-call transcripts, remembers what each customer
cares about across calls, identifies the real current blocker, and drafts a
personalized follow-up email that gets sharper every call.

It combines persistent cross-call memory (Hindsight) with runtime model
routing (cascadeflow) so call 5 is meaningfully smarter - and cheaper to
run - than call 1.

## What it does, every call
1. Recalls everything known about the customer so far.
2. Analyzes the new transcript to find the CURRENT blocker (blockers move -
   the one from call 1 is rarely the one from call 4).
3. Writes a short, personal follow-up email addressing that blocker and the
   specific people on the call.
4. Saves the new durable facts back to memory, so the next call starts smarter.

Every reasoning step runs through a real model call - no hardcoded or
simulated fallback path.

## How it works
- Memory is tagged per customer, with strict tag-matched recall so memories
  never bleed across customers.
- Model routing is adaptive: a cheap drafter model (qwen3-32b) runs first and
  escalates to a stronger verifier (gpt-oss-120b) only when a quality gate
  isn't met. Every decision - model, latency, whether it escalated, why - is
  logged.

## Tech stack
Python, CrewAI (agent orchestration), Hindsight (persistent memory),
cascadeflow (runtime routing), Groq (inference), Streamlit (UI).`,
  },
  {
    name: 'neuroscan-README.md',
    title: 'neuroscan-README.md - Notepad',
    body: `# NeuroScan AI - Alzheimer's Detection from Brain MRI

Upload a brain MRI, get an instant four-stage Alzheimer's classification
backed by a deep-learning ensemble - with confidence scores, per-class
probabilities, and explainable heatmaps.

NOTE: A research and educational screening tool - not a medical device. Its
output is not a clinical diagnosis and must be confirmed by a clinician.

## Overview
A full-stack web platform that screens brain MRI scans and classifies them
into four clinical stages: Non Demented, Very Mild, Mild, and Moderate
Demented. The browser sends a scan to a FastAPI inference service running a
ResNet-50 + EfficientNet-B3 ensemble; results return in seconds - a predicted
stage, a confidence score, and a full probability breakdown.

## The machine learning model
- 4-class supervised image classification on 2D axial MRI slices.
- Ensemble of ResNet-50 + EfficientNet-B3, both ImageNet-pretrained and
  fine-tuned; softmax outputs are averaged.
- Pipeline: CLAHE contrast enhancement -> resize -> normalize -> ensemble
  forward pass -> argmax stage + confidence.
- Trained on a ~34,000-image balanced 4-class dataset (augmented).
- ~75% overall accuracy; 100% precision on Moderate cases.
- Grad-CAM heatmaps highlight the regions that drove each prediction.

## Tech stack
React 18, TypeScript, Vite, Tailwind + shadcn/ui, Framer Motion, Recharts,
Supabase (auth / DB / storage), FastAPI inference on Hugging Face Spaces,
deployed on Vercel.

Live demo: https://clarity-scan-blond.vercel.app
MIT License.`,
  },
];
