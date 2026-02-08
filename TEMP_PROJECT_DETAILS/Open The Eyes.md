# Open The Eyes: High-Fidelity Generative Restoration Pipeline

**Jul 2025 - Aug 2025**

## Overview

Engineered a modular, multi-stage Computer Vision pipeline to resolve deterministic failure states in generative image models—specifically the closed eyes hallucination problem in high-resolution portraiture.

## Technical Architecture & Methodology

### Explicit Orchestration Pattern

- Developed a Python-based orchestrator to coordinate discrete microservices.
- Isolated modules: Prompt Enhancement → Face Detection → Intelligent Cropping → SDXL Generation → CodeFormer Restoration.
- Architecture ensures failure isolation and hardware-accelerated scalability on bare-metal Linux.

### Shoelace Formula Detection

- Replaced fragile EAR (Eye Aspect Ratio) metrics with a robust Shoelace Formula area calculation.
- Utilized 106-point facial landmarks to programmatically validate eye-closure states before processing.

### Two-Stage SDXL Generation

- Implemented a base-plus-refiner workflow using Stable Diffusion XL.
- Base model establishes spatial grounding; Refiner optimizes textures and removes artifacts in a single GPU batch session.

### Precision Mask Blending

- Utilized a 25-pixel Gaussian feathering technique to eliminate visible seams at integration boundaries.
- Result: Newly generated features blend seamlessly with original skin textures and lighting.

## Data Integrity & Reproducibility

### Run ID System

- Custom tracking system where every execution is assigned a unique batch timestamp (Run ID).
- Ensures 100% reproducibility of any specific run by linking configurations to assets.

### Metadata Persistence

- All processing parameters are embedded directly into final PNG metadata.
- Preserves the Technical DNA for future audit, maintaining a hardened source of truth.

## Skills

Computer Vision · Python · Microservices · Stable Diffusion (SDXL) · Image Processing
