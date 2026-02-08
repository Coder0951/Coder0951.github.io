# Synthetic Data: Seed-Stability & Character Consistency Pipeline

**Sep 2025**

## Objective

Engineered an end-to-end data engineering pipeline to generate, validate, and curate high-fidelity synthetic character datasets. This methodology eliminates "Character Drift" by establishing a deterministic framework for consistent training-ready assets.

## Technical Architecture & Methodology

### Deterministic Seed-Consistent Generation

- Developed a guided diffusion strategy using "Seed Groups" to maintain 100% visual coherence across 60+ scenarios.
- Orchestrated a 10-seed distribution framework ensuring identity persistence while varying environmental context.
- Utilized Dolphin 2.7 (Mixtral 8x7B) for scenario generation via 8,192-token context windows.

### Multi-Stage Automated Curation Pipeline

- **Face Validation**: Integrated InsightFace (Buffalo_L) to filter 1,500+ raw images with 99.8% detection accuracy.
- **Quality Scoring**: Engineered a weighted algorithm using Laplacian Variance (Sharpness), Standard Deviation (Contrast), and Detection Confidence.
- **Semantic Grouping**: Implemented CLIP (ViT-B/32) embeddings and K-Means clustering to discover patterns and ensure dataset diversity.

### Intelligent Dataset Preparation

- Established a "Tier-Based Curation" system, distilling 1,500 candidate images to a "Tier 70" training set (4.7% selection rate).
- Synchronized seed distribution with semantic clusters for a balanced spread of lighting, poses, and environments.
- Engineered a "Hardened Source of Truth" by embedding full technical provenance (Run IDs, master seeds) into final assets.

## Technical Results

- **High-Efficiency Curation**: Automated the reduction of image batches into high-density, low-noise datasets optimized for fine-tuning.
- **Biometric Persistence**: Maintained subject-specific "DNA" across diverse synthetically generated lighting and camera angles.
- **Forensic Auditability**: Achieved 100% reproducibility via rigorous metadata tracking.

## Skills

Data Engineering · Computer Vision · Python · MLOps · Synthetic Data Generation