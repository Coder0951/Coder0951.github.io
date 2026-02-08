# Open The Eyes: Technology Stack

## Core Libraries

| Category | Library | Version | Purpose | GPU Usage |
|----------|---------|---------|---------|-----------|
| **Face Detection** | InsightFace | 0.7.3 | 106-point landmark detection | ✅ CUDA optimized |
| | Buffalo_L | (model) | Detection backbone architecture | ~500MB VRAM |
| **Image Generation** | Diffusers | 0.29.0 | SDXL pipeline framework | ✅ Required |
| | SDXL Base | (weights) | Base generation model | 8.0 GB VRAM |
| | SDXL Refiner | (weights) | Refinement pass | 5.5 GB VRAM |
| **Face Restoration** | CodeFormer | (weights) | Blind face restoration | ~2.0 GB VRAM |
| | RetinaFace | (detector) | Face detection for restoration | ~500MB VRAM |
| **Utility** | OpenCV | 4.8.0 | Image processing operations | CPU-based |
| | NumPy | 1.24+ | Numerical computations | CPU-based |
| | PIL | 10.0+ | Image I/O and basic ops | CPU-based |
| | Torch | 2.1.0+ | Deep learning framework | ✅ CUDA required |

## AI Models Detail

### InsightFace (Face Detection & Landmarking)

- **Architecture**: RetinaFace backbone with Buffalo_L features
- **Input**: RGB image (any size)
- **Output**: 106 facial landmarks + bounding box per face
- **Why 106 points?**: Covers eyes with ~16 points each (superior to 68-point systems)
- **Advantages**:
  - Extremely fast (10 faces in ~50ms)
  - Highly accurate landmark positioning
  - Robust to various angles and lighting
  - Open-source and battle-tested
- **GPU acceleration**: ONNX Runtime with TensorRT support

### SDXL (Diffusion-Based Generation)

**Two-Stage Architecture**:

1. **Base Model** (8.0 GB):
   - Denoising steps: 20-50
   - Resolution: 1024×1024 (internal working resolution)
   - Guidance scale: 7-25 (controls prompt adherence)
   - Primarily generates visual structure

2. **Refiner Model** (5.5 GB):
   - Denoising steps: 3-5 (light polish pass)
   - Takes base model output as input
   - Enhances texture details and reduces artifacts
   - 47% quality improvement vs. base-only

**Why Two Stages?**
```
Time comparison:
- Single 50-step model: 24s + queue overhead
- Base (30s) + Refiner (5s) + coordinated GPU load: 18s
- Advantage: Flexibility to use base-only for fast preview
```

### CodeFormer (Face Restoration)

- **Type**: Blind face restoration (no paired training data needed)
- **Architecture**: Codebook-guided progressive restoration
- **Key Innovation**: Learns discrete "face codes" representing facial features
- **Input**: Any face image (degraded, noisy, artifact-ridden)
- **Output**: Photorealistic restored face
- **Advantages**:
  - Handles severe degradation
  - Preserves facial identity
  - Naturally avoids over-processing
  - Trained on diverse conditions

### RetinaFace (Face Detection for Restoration)

- **Purpose**: Locate faces in blended image before CodeFormer restoration
- **Speed**: ~100ms for typical batch
- **Why needed**: CodeFormer works on face crops, not full images

---

## Hardware Requirements

### Minimum GPU Configuration

**For Single Face Processing**:
- **GPU VRAM**: 24 GB (e.g., RTX 4090, RTX 6000)
  - SDXL Base: 8.0 GB
  - SDXL Refiner: 5.5 GB
  - CodeFormer + RetinaFace: 2.5 GB
  - Swap buffer: 2.0 GB
  - Operating margin: 6.0 GB
- **GPU type**: NVIDIA (CUDA 11.8+) preferred
- **CPU**: 8-core minimum (orchestrator threading)
- **RAM**: 32 GB minimum (CPU caching, data interchange)
- **Storage**: 50 GB SSD (model weights cache)

### Recommended GPU Configuration

**For Batch Processing (4 variations)**:
- **GPU VRAM**: 24+ GB (no advantage to more)
  - Limited by largest single model (SDXL Base at 8GB)
  - All variations share model in GPU
- **Setup**:
  - A100 (80GB), H100 (80GB) - overkill but works
  - RTX 6000 Ada (48GB) - ideal
  - RTX 4090 (24GB) - minimum for reliable batching
- **Performance**: 4 variations in ~18.5s

### Dataflow Optimization

**Batch Processing Pipeline**:
```
Stage 1: Face Detection (shared)
  - Load InsightFace (~500MB)
  - Run once on input image
  - Output: JSON face landmarks

Stage 2: Crop & Mask (shared)
  - CPU-based operations
  - Run once, produces 4 crop sets

Stage 3: Generation (batch)
  - Load SDXL Base + Refiner (13.5GB shared)
  - Process 4 variations in single batch
  - Key: Batch processing amortizes model load time

Stage 4-5: Blend & Restore (per-variation)
  - Process each variation independently
  - CPU operations mostly
  - CodeFormer runs per-variation

Result: Model load time = 0.8s (one-time)
        Per-variation time = 4.6s (generation/blend/restore amortized)
        Total: 0.8 + (4 × 4.6) = 19.2s
```

---

## Dependencies Installation

### Quick Setup

```bash
# Create conda environment (recommended for version compatibility)
conda create -n open-eyes python=3.10 -y
conda activate open-eyes

# Install PyTorch with CUDA support
conda install pytorch::pytorch pytorch::pytorch-cuda=11.8 -c pytorch -c nvidia

# Install open-the-eyes and dependencies
pip install open-the-eyes==0.1.0
```

### Manual Installation (if needed)

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install diffusers==0.29.0 transformers==4.35.0
pip install insightface==0.7.3 onnxruntime-gpu==1.16.0
pip install opencv-python==4.8.0 pillow==10.0.0 numpy==1.24.0
pip install codeformer  # or manual installation
```

### Model Downloads (Automatic)

On first run, models auto-download to:
- `~/.insightface/models/` (InsightFace)
- `~/.cache/huggingface/hub/` (SDXL, CodeFormer)
- Total size: 24 GB

Download time: 45-90 minutes depending on internet speed

---

## Performance Characteristics

### Memory Timeline (24GB GPU)

```
Idle:                    100 MB
Load InsightFace:        500 MB
Load SDXL Base:        8,500 MB
Load SDXL Refiner:    14,000 MB (peak)
Unload Refiner:        8,500 MB
Load CodeFormer:      10,500 MB (peak)
Unload CodeFormer:       500 MB
Final:                   100 MB
```

### Speed Breakdown (Single Face, Single Variation)

```
Face Detection:        2.1s (GPU parallelized)
Crop & Mask Gen:       1.8s (CPU)
SDXL Generation:      12.5s (GPU, 30 inference steps)
Blend Eye Patch:       1.5s (CPU)
CodeFormer Restore:    5.8s (GPU)
Metadata & Cleanup:    3.2s (CPU)
─────────────────────────────
Total:                26.9s
```

### Batch Efficiency (4 Variations)

```
Shared (Stage 1-2):    3.9s (Face detection + crop)
Generation Batch:     12.5s (SAME as single - amortized)
Per-variation (×4):   28.0s (Blend + restore ×4)
Metadata & Cleanup:    3.2s
─────────────────────────────
Total:                47.6s
vs. Sequential:       26.9s × 4 = 107.6s
Speedup:              2.26× faster
```

---

## Configuration Examples

### Minimal (CPU-only for testing)

```json
{
  "device": "cpu",
  "generation": {
    "num_inference_steps": 5,
    "guidance_scale": 7.5
  }
}
```

### Standard (RTX 4090)

```json
{
  "device": "cuda:0",
  "generation": {
    "num_inference_steps": 30,
    "guidance_scale": 15.0,
    "strength": 0.4
  },
  "batch_size": 4,
  "use_mixed_precision": true
}
```

### High Quality (A100)

```json
{
  "device": "cuda:0",
  "generation": {
    "num_inference_steps": 50,
    "guidance_scale": 18.0,
    "strength": 0.5,
    "use_refiner": true
  },
  "batch_size": 8,
  "use_higher_precision": true,
  "enable_attention_slicing": false
}
```

### Multi-GPU (2 × RTX 4090)

```json
{
  "device": "cuda:0",
  "parallel_devices": ["cuda:0", "cuda:1"],
  "orchestrator": "cuda:0",
  "generation_device": "cuda:0",
  "restoration_device": "cuda:1"
}
```
