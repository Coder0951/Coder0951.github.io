# Open The Eyes: Architecture

## Microservice Pattern

**Open The Eyes** follows an **explicit orchestration pattern** rather than event-driven or message-queue systems.

### Why Microservices?

- **Isolation**: Failures in one service don't crash the pipeline
- **Reusability**: Each service can be called independently via CLI or Docker
- **Scalability**: Services can run on different machines or containers
- **Testability**: Each service has explicit input/output contracts
- **Language flexibility**: Services could be rewritten in different languages independently

### System Data Flow

```
Original Image
    ↓
[Face Detection Service] → face_{run_id}.json + debug visualization
    ↓
[Crop Service] → crop_{run_id}.json + face_crop_*.png + face_mask_*.png
    ↓
[BATCH Processing Begins]
    ├─ Original config
    ├─ Variation config 1
    ├─ Variation config 2
    └─ Variation config N
    ↓
[Generation Service] (single GPU session for all variations)
    → 3_final_result_*_original.png
    → 3_final_result_*_variation_01.png
    → 3_final_result_*_variation_02.png
    ↓
[Blend Service] (for each variation)
    → final_result_*_{run_id}.png
    ↓
[Restoration Service] (for each variation)
    → final_restore_*_{run_id}.png
    ↓
[Metadata Embedding + Cleanup]
    ↓
Final Output: final_restore_{timestamp}_{variation_id}.png
```

## Explicit Path Management

The system **never guesses filenames**. Instead:

1. Every path is explicitly passed via JSON configuration
2. A `RunPathManager` class generates consistent paths based on timestamps and run IDs
3. All services receive explicit paths to every input and output file

**Benefits**:
- Prevents file discovery errors
- Makes debugging straightforward
- Enables parallel execution without conflicts
- Simplifies logging and error tracking

## Run ID System

Every execution gets a unique identifier:

```
batch_timestamp = "20250207_143022"
run_id_original = "20250207_143022_original"
run_id_variation_01 = "20250207_143022_variation_01"
run_id_variation_02 = "20250207_143022_variation_02"
```

**Benefits**:
- Parallel runs don't conflict
- Easy tracking of which variation produced which output
- Metadata matches generated files
- Reproducible with same timestamp

## Microservice Orchestration Flow

### Pre-Execution Phase
1. Parse command-line arguments (config, input image, num_variations)
2. Load configuration JSON
3. Validate paths and settings
4. Generate unique batch_timestamp

### Shared Stage Execution
1. **Face Detection** (run once)
   - Detect all faces in image
   - Calculate eye open/closed states
   - Output: face_data.json

2. **Crop & Mask** (run once)
   - Extract eye regions for closed-eye faces
   - Generate binary masks for inpainting
   - Output: crop_data.json + face_crops

### Batch Generation Phase
1. **Collect requests** (for original + all variations)
2. **Load generation pipeline** (once)
3. **Process all variations** (in single GPU session)
   - Reuse loaded models
   - Batch inference for efficiency
4. **Unload pipeline** (cleanup)

### Per-Variation Finalization
For each variation (original + variations 1..N):
1. **Blend** - Integrate generated eyes into original image
2. **Restore** - Apply CodeFormer restoration
3. **Embed metadata** - Add processing info to PNG
4. **Validate** - Verify output integrity

### Error Handling Strategy

**Per-face error handling**:
```
For each face in image:
    Try:
        Process face (all stages)
    Except Exception:
        Log error (error code, details)
        Mark face as failed
        Continue with next face

Report: "4/5 faces successful, 1 failed"
```

**Why per-face?** If one face generation fails, don't abort the entire image.

## Verbose vs Non-Verbose Mode

### Non-Verbose (Production)
```
Output_Images/
└── final_restore_20250207_143022_original.png
└── final_restore_20250207_143022_variation_01.png
```
- Only final outputs kept
- ~5 MB disk usage per image
- Suitable for production deployments

### Verbose (Development)
```
Output_Images/
├── face/
│   ├── face_20250207_143022_shared.json
│   └── face_20250207_143022_shared.png
├── crop/
│   ├── crop_20250207_143022_shared.json
│   ├── face_crop_0_20250207_143022_shared.png
│   └── face_mask_0_20250207_143022_shared.png
├── gen/
│   ├── 3_final_result_0_20250207_143022_original.png
│   └── 3_final_result_0_20250207_143022_variation_01.png
├── blend/
│   ├── final_result_20250207_143022_original.png
│   └── final_result_20250207_143022_variation_01.png
└── res/
    ├── final_restore_20250207_143022_original.png
    └── final_restore_20250207_143022_variation_01.png
```
- All intermediate files preserved
- ~100+ MB disk usage
- Enables debugging of individual stages
- Shows complete transformation pipeline

## Subprocess-Based Service Communication

```python
# Orchestrator calls service via subprocess
result = subprocess.run([
    sys.executable, "-m", "service.app.src.main",
    "--config", config_path,
    "--input", input_path,
    "--output", output_path
])

if result.returncode != 0:
    raise StageError("Service failed")
```

**Why subprocess over direct imports?**
- Services can be in separate containers
- Failure isolation (one crash doesn't affect orchestrator)
- Easy to distribute across machines
- Explicit IPC via JSON files
- Language flexibility

## JSON-Based State Exchange

Each stage passes data to the next via JSON:

```python
# Stage 1 outputs
face_data = {
    "timestamp": "2025-02-07T14:30:22Z",
    "faces": [
        {
            "bbox": [x1, y1, x2, y2],
            "landmarks": [[x, y], ...],  # 106 points
            "left_eye_closed": True,
            "right_eye_closed": False
        }
    ]
}

# Stage 2 reads and extends
crop_data = {
    "input_face_data": face_data,  # Reference to previous
    "crops": [
        {
            "face_idx": 0,
            "crop_image_path": "...",
            "mask_path": "...",
            "rotation_angle": 5.2
        }
    ]
}

# Stage 3+ use accumulated data
```

This ensures:
- Complete traceability
- Easy debugging
- Automatic logging
- Reproducibility
