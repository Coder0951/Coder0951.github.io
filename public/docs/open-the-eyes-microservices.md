# Open The Eyes: Microservices Breakdown

## Stage 0: Pre-Enhancement Service (Optional)

**Purpose**: Generate creative variations of generation prompts using local LLM

**Input**:
- Base configuration file with prompts
- Number of variations requested (default: 4)

**Process**:
1. Load Dolphin-2.7 (Mixtral 8x7B quantized) LLM
2. For each prompt field (prompt, negative_prompt, refiner.prompt, refiner.negative_prompt):
   - Feed to LLM with enhancement instruction
   - Generate N creative variations
   - Preserve original meaning while elaborating context

**Output**:
- `config/prompt_variations_{timestamp}/variation_01.json`
- `config/prompt_variations_{timestamp}/variation_02.json`
- etc.

**Key Decision**: Runs on CPU to preserve GPU for later stages

---

## Stage 1: Face Detection Service

**Module**: `detect_face_micro.py`

**Purpose**: Detect all faces and analyze eye open/closed states using polygon area metrics

**Input**:
- Image path: `Input_Images/sample.jpg`
- Configuration:
  - `threshold`: Eye polygon area threshold (default: 260 px²)
  - `debug`: Boolean to save debug visualization

**Process**:

1. **Load model**: InsightFace with Buffalo_L detector
2. **Detect faces**: Get bounding boxes and 106-point landmarks
3. **Calculate eye polygon areas**: Use Shoelace formula on left/right eye landmarks
4. **Determine open/closed**: Compare area against threshold
5. **Output structured JSON**: Complete face and eye state data

**Why Polygon Area Instead of EAR?**

Eye Aspect Ratio (EAR) is fragile because it depends on precise landmark ordering and is sensitive to pose variations. Polygon area is more robust:
- Accounts for overall eye closure regardless of point ordering
- Less sensitive to individual point jitter
- Naturally handles extreme angles
- Physically meaningful (actual closure area)

**Output**:
```json
{
  "timestamp": "2025-02-07T14:30:22Z",
  "image_path": "Input_Images/sample.jpg",
  "faces": [
    {
      "face_idx": 0,
      "bbox": [100, 50, 400, 350],
      "landmarks": [[x1, y1], [x2, y2], ...],  // 106 points
      "left_eye_polygon_area": 245,
      "right_eye_polygon_area": 350,
      "left_eye_closed": true,
      "right_eye_closed": false,
      "requires_processing": true
    }
  ]
}
```

---

## Stage 2: Crop Service

**Module**: `crop_eye_region.py`

**Purpose**: Extract eye regions from closed-eye faces and create masks for inpainting

**Input**:
- Original image
- Face detection JSON from Stage 1
- Configuration:
  - `use_larger_eye`: Boolean (use larger eye as reference)
  - `crop_output_size`: Override default crop size

**Process**:

1. **Filter faces**: Only process faces with at least one closed eye
2. **Align face**: Rotate based on eye positions for consistent processing
3. **Calculate crop size**: Based on inter-eye distance (~512x512)
4. **Extract eye region crop**: Precise rectangular extraction centered on both eyes
5. **Generate eye masks**: Binary masks indicating inpaint regions
   - Left eye mask: 255 where eye is closed, 0 elsewhere
   - Right eye mask: 255 where eye is closed, 0 elsewhere
   - Combined mask for inpainting
6. **Save outputs**: Crops and masks for generation stage

**Output**:
```json
[
  {
    "face_idx": 0,
    "crop_image_path": "Output_Images/crop/face_crop_0_20250207_143022_shared.png",
    "left_eye_mask_path": "Output_Images/crop/face_mask_L_0_20250207_143022_shared.png",
    "right_eye_mask_path": "Output_Images/crop/face_mask_R_0_20250207_143022_shared.png",
    "combined_mask_path": "Output_Images/crop/face_mask_0_20250207_143022_shared.png",
    "crop_size": [512, 512],
    "rotation_angle": 5.2,
    "crop_position": [100, 50]
  }
]
```

---

## Stage 3: Generation Service

**Module**: `eyegen_micro.py`

**Purpose**: Generate realistic open eyes using SDXL inpainting with two-stage refinement

**Input**:
- Eye region crops (512×512)
- Binary inpaint masks
- Generation config with prompts and parameters

**Process**:

1. **Load SDXL pipelines** (once per batch for efficiency):
   - Base model pipeline
   - Refiner pipeline
   - Move to GPU

2. **Prepare inpainting inputs**:
   - Convert RGB crop to latent space
   - Convert mask to latent mask
   - Encode text prompts to embeddings

3. **Generate with SDXL base model**:
   - Input: latents + inpaint mask + text embeddings + guidance scale
   - Steps: 20-50 (configurable)
   - Output: Generated latent features

4. **Refine with SDXL Refiner**:
   - Input: Base model output + refiner text embeddings
   - Steps: 3-5 (light refinement)
   - Output: Polished latents

5. **Decode to image**: Convert final latents to RGB image space

**Configuration Parameters**:
```json
{
  "generation": {
    "guidance_scale": 15.0,        // Prompt adherence (7-25)
    "num_inference_steps": 30,     // Generation steps (20-50)
    "strength": 0.4,               // Refiner influence (0-1)
    "seed": 42,                    // Reproducibility
    "prompt": "photorealistic open brown eyes, detailed iris...",
    "negative_prompt": "closed eyes, squinting, artifacts..."
  }
}
```

**Batch Processing Advantage**:

```
Standard approach:
  Load SDXL Base (8GB) → Generate variation 1 → Unload
  Load SDXL Base (8GB) → Generate variation 2 → Unload
  Load SDXL Base (8GB) → Generate variation 3 → Unload
  Total time: 36s (3 × 12s)

Open The Eyes approach:
  Load SDXL Base (8GB) → Generate ALL variations in batch → Unload
  Total time: 18.5s (single batch)
  Efficiency gain: 47% faster
```

**Output**:
```
gen/3_final_result_0_20250207_143022_original.png
gen/3_final_result_0_20250207_143022_variation_01.png
gen/3_final_result_0_20250207_143022_variation_02.png
```

---

## Stage 4: Blend Service

**Module**: `blend_eye_patch.py`

**Purpose**: Seamlessly integrate generated eyes back into original image

**Input**:
- Original image
- Generated eye regions (512×512)
- Crop metadata (rotation angle, position)
- Face mapping (which generated eye goes to which face)

**Process**:

1. **Create integration mask**: Binary mask indicating blend region
2. **Feather the mask**: Create smooth gradient at edges
   - **Problem**: Hard-edge masking creates visible seams
   - **Solution**: Gaussian blur the mask
   - **Effect**: Values vary smoothly from 0→255 over ~25 pixels

3. **Reverse rotation**: Undo the alignment rotation from crop stage
4. **Blend into original**:
   ```
   output_pixel = (generated_pixel × feathered_mask) + (original_pixel × (1 - feathered_mask))
   ```
5. **Process all faces**: Repeat for each generated eye region

**Output**:
```
final_result_20250207_143022_original.png
final_result_20250207_143022_variation_01.png
```

**Why Feathering Works**:
- Without feathering: Hard edges look "pasted on"
- With 25px Gaussian: Imperceptible transition to original skin
- Preserves original texture details near boundaries

---

## Stage 5: Restoration Service

**Module**: `restore_faces.py`

**Purpose**: Enhance overall face quality using CodeFormer blind face restoration

**Input**:
- Blended image (with newly opened eyes)
- CodeFormer model weights
- Optional upscaling factor

**Process**:

1. **Initialize CodeFormer**: Load pre-trained blind face restoration model
2. **Initialize face detector**: RetinaFace via facelib
3. **Detect and align faces**: Find faces in blended image
4. **Restore each face**:
   - Input face image → CodeFormer network → Restored face
   - Learns discrete "face codes" (e.g., smooth forehead, natural eye texture)
5. **Paste back**: Insert restored faces into full image

**Why CodeFormer?**

- **Blind restoration**: Doesn't need paired training data
- **Codebook approach**: Learns discrete face codes for natural artifacts
- **Texture preservation**: Maintains skin details while removing artifacts
- **Reliable**: Tested on various face conditions and styles
- **Quality**: Final output looks photorealistic without over-processing

**Output**:
```
final_restore_20250207_143022_original.png
final_restore_20250207_143022_variation_01.png
```

---

## Stage 6: Orchestrator

**Module**: `open_the_eyes.py`

**Purpose**: Coordinate all services, manage state, handle errors, and produce final output

**Responsibilities**:

1. **Argument parsing**: Read --config, --input, --num-variations, --verbose
2. **Configuration loading**: Parse JSON, validate paths
3. **Timestamp generation**: Create unique batch_timestamp (YYYYMMDD_HHMMSS)
4. **Service orchestration**: Call each stage in sequence
5. **Error handling**: Catch failures, record error codes
6. **State management**: Track which faces succeeded/failed
7. **Batch coordination**: Collect all variation requests for generation
8. **Cleanup**: Remove intermediate files (unless verbose mode)
9. **Metadata embedding**: Add processing info to final PNG files

**Error Handling Pattern**:
```python
@handle_stage_errors("Face Detection", ErrorCode.FACE_DETECTION_FAILED)
def stage_face_detection(run_id, image_path):
    # Call face detection service via subprocess
    result = subprocess.run([...], capture_output=True)
    if result.returncode != 0:
        raise StageError(...)
    return parse_json_output(result.stdout)
```

**Variation Handling**:
```python
# 1. Run shared stages once
face_data = run_face_detection(...)
crop_data = run_crop_processing(...)

# 2. Collect all generation requests
batch_requests = []
for variation_config in [original_config] + variation_configs:
    batch_requests.append({...})

# 3. Generate all at once
run_batch_generation(batch_requests)

# 4. Blend and restore each variation
for run_id in ["original", "variation_01", "variation_02"]:
    run_blending(run_id)
    run_restoration(run_id)
```

**Metadata Embedding**:
```python
def append_metadata_to_image(image_path, config, stage_timings):
    img = Image.open(image_path)
    metadata = PngInfo()
    metadata.add_text("ProcessingConfig", json.dumps(config))
    metadata.add_text("StageTiming", json.dumps(stage_timings))
    metadata.add_text("GeneratedBy", "OpenTheEyes")
    img.save(image_path, pnginfo=metadata)
```

---

## Service Communication Summary

| Stage | Input | Output | Timing |
|-------|-------|--------|--------|
| Face Detection | Image | face_data.json | 2.1s |
| Crop & Mask | face_data.json | crop_data.json + crops | 1.8s |
| Generation | crop_data.json | generated_eyes.png | 12.5s |
| Blend | generated_eyes.png | blended_image.png | 1.5s |
| Restoration | blended_image.png | final_restore.png | 5.8s |
| Orchestrate | All | Metadata + cleanup | 3.2s |
| **Total** | | | **26.9s** |
