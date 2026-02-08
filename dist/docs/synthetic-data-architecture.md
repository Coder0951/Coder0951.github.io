# Synthetic Data: System Architecture

## Pipeline Overview

The synthetic data system consists of 5 interconnected components orchestrating a complete image generation and curation workflow:

```
Input: Character Description (text)
    ↓
┌──────────────────────────────────────────┐
│ 1. PROMPT GENERATION                     │
│    • LLM generates scenarios              │
│    • Validates consistency                │
└────────────────┬─────────────────────────┘
                 ↓
┌──────────────────────────────────────────┐
│ 2. IMAGE GENERATION (Diffusion)          │
│    • Stable Diffusion v6.0 B1            │
│    • Seed-consistent generation          │
│    • 1,500 images, 10 seed groups        │
└────────────────┬─────────────────────────┘
                 ↓
┌──────────────────────────────────────────┐
│ 3. QUALITY FILTERING                     │
│    • Face validation (InsightFace)       │
│    • Quality scoring (3 metrics)         │
│    • Rejection: 30-40%                   │
└────────────────┬─────────────────────────┘
                 ↓
┌──────────────────────────────────────────┐
│ 4. SEMANTIC GROUPING                     │
│    • CLIP embeddings                     │
│    • K-Means clustering (K=8)            │
│    • Discover natural groups             │
└────────────────┬─────────────────────────┘
                 ↓
┌──────────────────────────────────────────┐
│ 5. INTELLIGENT SELECTION                 │
│    • Multi-criteria ranking              │
│    • Tier classification                 │
│    • Diversity constraints               │
└────────────────┬─────────────────────────┘
                 ↓
Output: Tier 70 Portfolio (70 curated images)
```

---

## Component 1: Prompt Generation

### Language Model

**Model**: Dolphin 2.7 (Mixtral 8x7B)
- Context window: 8,192 tokens (enable complex prompts)
- Quantization: Q5_K_S (reduced from FP16 for speed)
- Framework: llama-cpp-python
- VRAM: ~15-20 GB

### Prompt Structure

**Base Character Prompt** (defines identity):
```
"male soft features, light freckled skin, sandy hair, 
gentle eyes, sincere smile, natural look, 8k"
```

Elements:
- Physical traits (facial features, hair color, skin tone)
- Emotional expression (gentle, sincere)
- Overall aesthetic (natural, photorealistic)
- Quality target (8k detail)

**Scenario Modifiers** (60-150 diverse contexts):
```
Category Distribution:
├─ Professional (20%): "in business suit, boardroom, corporate lighting"
├─ Casual (20%): "beach outfit, relaxed pose, golden hour"
├─ Action (15%): "surfing, dynamic pose, action shot"
├─ Artistic (15%): "painting style, creative lighting, studio"
├─ Athletic (15%): "gym setting, fitness wear, energetic"
└─ Other (15%): "varied contexts, diverse environments"
```

Each scenario modifies the character while maintaining core identity.

---

## Component 2: Image Generation

### Generation Strategy: Seed-Consistent Framework

**Core Concept**: Use deterministic seeds to guarantee visual coherence

```
Seed Distribution:

Seed Group 0 (base_seed = 966983):
├─ Original Images (5)
│  ├─ seed_966983_original_01.png
│  ├─ seed_966983_original_02.png
│  └─ ... (5 total)
├─ Scenario Images (120)
│  ├─ seed_966983_scenario_00_01.png (professional setting)
│  ├─ seed_966983_scenario_00_02.png
│  └─ ... (60 scenarios × 2 variations)
└─ Total: 125 images from this seed

Seed Group 1-9: (Repeat pattern)
Base Seed = 966984, 966985, ..., 966992

Total: 10 seed groups × 125 = 1,250 images
Plus multi-batch variations: +250 additional
Grand Total: ~1,500 images
```

### Why Seed Groups Work

**Reproducibility**: Same seed → identical diffusion internal state → consistent character
**Variation**: Different noise schedule → different lighting/details → rich dataset
**Coherence**: All variations recognizably the same character

### Generation Parameters

```json
{
  "model": "Realistic Vision v6.0 B1",
  "resolution": 768,                    // Balanced for VRAM
  "num_inference_steps": 50,            // Quality floor
  "guidance_scale": 7.5,                // Balance creativity vs control
  "scheduler": "DPMSolverMultistepScheduler",
  "vae": "HyperVAE",                    // High-quality decoding
  "negative_prompt": "(deformed iris, deformed pupils, ..., low quality, jpeg artifacts)"
}
```

**Parameter Justification**:
- **768×768**: Optimal for 24GB VRAM without sacrificing quality
- **50 steps**: Quality reaches plateau; diminishing returns after
- **7.5 guidance**: Strong prompt adherence without sacrificing creativity
- **DPM++**: Faster convergence than Euler with equivalent quality
- **HyperVAE**: Produces sharper, more detailed final images

### Three Generation Modes

#### Mode 1: Original Images
```
Purpose: Character without scenario modification
Count: 5 images per seed
Role: Reference set, shows base character
```

#### Mode 2: Scenario Images
```
Purpose: Character in diverse contexts
Count: 60 scenarios × 2 variations = 120 images per seed
Role: Dataset diversity, different poses/lighting/environments
```

#### Mode 3: Multi-Batch Images
```
Purpose: Seed-controlled variation within scenario
Count: +250 additional across all seeds
Role: Further richness, multi-angle coverage
```

### Metadata Tracking

Each image records complete provenance:

```json
{
  "filename": "char_gentle_freckled_seed_966983_scenario_05_02.png",
  "seed": 966983,
  "image_type": "scenario",
  "scenario_index": 5,
  "scenario_description": "in business suit, boardroom, corporate lighting",
  "base_character": "gentle_freckled",
  "model": "Realistic Vision v6.0 B1",
  "parameters": {
    "guidance_scale": 7.5,
    "num_steps": 50,
    "resolution": 768
  },
  "generation_time": 150,                // seconds
  "timestamp": "2025-09-19T20:42:18.232998"
}
```

---

## Component 3: Quality Filtering

### Stage 1: Face Validation

**Tool**: InsightFace (Buffalo_L models)
- Accuracy: 99.8% on CelebA dataset
- Speed: 5-10 ms per image

**Validation Rules**:
```
✓ Exactly 1 face → PASS
✗ 0 faces → REJECT (5% of images)
✗ 2+ faces → REJECT (5%)
✗ Partial face (cut off frame) → REJECT (2%)
✗ Face too small → REJECT (1%)

Expected pass rate: 85-90%
```

**Result**: 1,500 → 1,275 images (85% pass rate)

### Stage 2: Quality Scoring

Three-metric weighted algorithm:

```
Final Score = 0.5 × Sharpness + 0.3 × Contrast + 0.2 × FaceConfidence

Where each component is normalized to [0, 1]
```

**Metric 1: Sharpness (Laplacian Variance)**
```
Detects: Blur, focus issues, image softness

Calculation: Apply Laplacian kernel, measure variance
High variance → sharp focus → high score
Low variance → blurry/soft → low score

Threshold Guidelines:
├─ <150: Unacceptably blurry (reject)
├─ 150-280: Poor-to-acceptable (conditional)
├─ 280-500: Good-to-excellent (ideal)
└─ 500+: Very sharp (sometimes too contrasty)

Typical Distribution:
├─ Mean: 325
├─ Median: 310
├─ Std Dev: 157
└─ Bimodal peaks at ~150 and ~400 (side-lit vs frontal)
```

**Metric 2: Contrast (Standard Deviation)**
```
Detects: Lighting quality, avoiding flat/washed images

Calculation: Std Dev of pixel values (grayscale)
High variance → good lighting → high score
Low variance → flat lighting → low score

Threshold Guidelines:
├─ <40: Extremely flat (reject)
├─ 40-60: Below average (conditional)
├─ 60-80: Good lighting (ideal)
├─ 80-100: Excellent lighting (preferred)
└─ 100+: Very high contrast (sometimes overexposed)

Typical Distribution:
├─ Mean: 72
├─ Peak: 80-100 (30% of images)
└─ Tail: 100+ (outliers, 5%)
```

**Metric 3: Face Quality (InsightFace Confidence)**
```
Detects: Detection reliability, face alignment quality

Confidence Score: 0.85-1.0 (provided by InsightFace)
Interpretation:
├─ 0.85-0.90: Marginal (use if necessary)
├─ 0.90-0.95: Good (standard training)
├─ 0.95-0.98: Excellent (recommended)
└─ 0.98+: Premium (priority selection)

Correlation:
├─ High confidence ← frontal face, even lighting
├─ Low confidence ← side angle, shadows, partial occlusion
└─ Strong predictor of usability
```

**Combined Distribution** (1,500 images):
```
Score 90-100 (Premium):   45 images (3%)   ← Selective
Score 85-90 (Excellent): 180 images (12%)  ← Good variety
Score 78-85 (Good):      270 images (18%)  ← Broader
Score 70-78 (Acceptable):380 images (25%)  ← Include weak
Rejected (<70):          645 images (43%)  ← More than half
```

**Result**: 1,275 → 250 images (20% pass threshold)

---

## Component 4: Semantic Grouping

### CLIP Embeddings

**Model**: ViT-B/32 (OpenAI CLIP)
- Embedding dimension: 512
- Type: Vision-language embeddings
- Captures: Semantic meaning (pose, lighting, context)

**Process**:
```
Image 1 → CLIP encoder → 512-dim vector
Image 2 → CLIP encoder → 512-dim vector
...
Image 250 → CLIP encoder → 512-dim vector

Result: 250 × 512 embedding matrix
```

### K-Means Clustering

**Algorithm**: K-Means with K=8 clusters

```
Input: 250 embeddings (250 × 512)
Process:
1. Initialize 8 random centroids
2. Assign each embedding to nearest centroid
3. Recompute centroids
4. Repeat until convergence (typically 20-30 iterations)

Output: 8 clusters, 30-35 images per cluster
```

### Natural Cluster Discovery

The algorithm discovers meaningful groupings without supervision:

```
Cluster 0: Original pose (close-up)
├─ Characteristics: Front-facing, minimal context
├─ Count: 25 images
└─ Use: Reference, identity capture

Cluster 1: Frontal angle 1 (medium shot)
├─ Characteristics: Head and shoulders, standard lighting
├─ Count: 32 images
└─ Use: Professional headshots

Cluster 2: Frontal angle 2 (different lighting)
├─ Characteristics: Similar pose, dramatic lighting
├─ Count: 28 images
└─ Use: Variety in lighting conditions

Cluster 3: Side angle (profile)
├─ Characteristics: 45° turn, side profile
├─ Count: 30 images
└─ Use: Pose diversity

Cluster 4: Dynamic pose (action)
├─ Characteristics: Movement, energy, active positioning
├─ Count: 24 images
└─ Use: Animated contexts

Cluster 5: Close-up detail
├─ Characteristics: Extreme close-up, face fills frame
├─ Count: 26 images
└─ Use: Fine detail, texture

Cluster 6: Full body
├─ Characteristics: Entire body visible, context visible
├─ Count: 31 images
└─ Use: Context preservation

Cluster 7: Mixed angles (diverse)
├─ Characteristics: Various angles not fitting above
├─ Count: 24 images
└─ Use: Additional diversity

Total: 220 images across 8 clusters (30 rejected as outliers)
```

### Why K=8?

```
K=4:   Under-fragments diversity, misses nuance
K=8:   Goldilocks optimal balance ✓
K=16:  Over-fragments, creates noise
K=32:  Excessive clusters, diminishing returns
```

---

## Component 5: Intelligent Selection

### Multi-Criteria Ranking

For each cluster, rank images by:

```
1. Quality Score (primary): 0-1.0
2. Seed Distribution: Favor underrepresented seeds
3. Image Type: Balance (original vs scenario)
4. Tier Target: Hit tier thresholds
```

### Selection Algorithm

```python
Pseudocode:

selected = []
for each_cluster:
  # Get high-quality images from cluster
  cluster_images = sorted_by_quality(cluster, min_quality=0.85)
  
  # Select top N
  for i in range(target_per_cluster):
    image = cluster_images[i]
    
    # Check constraints
    if seed_distribution_allows(image):
      if tier_balance_allows(image):
        selected.append(image)

# Tier 70: Select until 70 images with quality > 0.85
# Tier 100: Expand to 100 images with quality > 0.78
# Tier 200: Expand to 200 images with quality > 0.70
# Tier 300: Include all 250 (no threshold)
```

### Result: Tier Classification

```
Tier 20 (Top 20):
├─ Minimum quality: 0.92
├─ Use case: Premium, showcase only
└─ Average quality: 0.94/1.0

Tier 70 (Top 70) ✓ RECOMMENDED:
├─ Minimum quality: 0.85
├─ Use case: Standard training
├─ Seed distribution: 7 images per seed
└─ Average quality: 0.87/1.0

Tier 100 (Top 100):
├─ Minimum quality: 0.78
├─ Use case: Larger datasets
└─ Average quality: 0.81/1.0

Tier 200 (Top 200):
├─ Minimum quality: 0.70
├─ Use case: Transfer learning
└─ Average quality: 0.75/1.0

Tier 300 (All curated):
├─ Minimum quality: None
├─ Use case: Exhaustive training
└─ Average quality: 0.68/1.0
```

---

## Data Completeness

```
Starting Point: 1,500 raw images
├─ 100% generated
├─ ~2.5 min per image
└─ 60 hours total generation

Stage 1 Output: 1,275 face-validated
├─ 85% pass rate
├─ 225 rejected (0/2+/partial faces)
└─ Quality unknown (filter only)

Stage 2 Output: 250 quality-vetted
├─ 20% pass rate
├─ 1,025 rejected (low quality)
└─ Average score: 0.75/1.0

Stage 3 Output: 8 semantic clusters
├─ 220 clustered (some outliers removed)
├─ Natural discovery of pose/lighting/context patterns
└─ 8 homogeneous groupings

Final Output: 70 curated (Tier 70)
├─ 4.7% final selection rate
├─ Balanced: 7 images per seed, all 8 clusters
└─ Average score: 0.87/1.0
```

---

## Efficiency Summary

| Stage | Input | Output | Pass Rate | Time |
|-------|-------|--------|-----------|------|
| Face Validation | 1,500 | 1,275 | 85% | 30 min |
| Quality Scoring | 1,275 | 250 | 20% | 2 hours |
| Semantic Grouping | 250 | 220 | 88% | 3 hours |
| Intelligent Selection | 220 | 70 | 32% | 10 min |
| **Total Pipeline** | 1,500 | 70 | 4.7% | 5.5 hours |

Combined with generation time (12-60 hours), full pipeline: 17-65 hours depending on parallelization.
