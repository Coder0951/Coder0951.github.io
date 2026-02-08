# Open The Eyes: Practical Examples

## Visual Results

### Real-World Before & After

Here's a real example of the system in action:

**Before** (Eyes Closed):
![Before: Eyes Closed](/images/open-the-eyes/Eyes_closed.png)

**After** (Eyes Open):
![After: Eyes Open](/images/open-the-eyes/Eyes_Open.png)

Notice how the restoration maintains:
- Natural eye appearance
- Skin tone consistency
- Facial expression authenticity
- No visible artifacts or seams

---

## Example 1: Basic Usage

### Setup

```bash
# Install and activate environment
conda create -n open-eyes python=3.10
conda activate open-eyes
pip install open-the-eyes

# Verify GPU
python -c "import torch; print(f'GPU: {torch.cuda.get_device_name(0)}')"
# Output: GPU: NVIDIA RTX 4090
```

### Single Image, Single Variation

```bash
open-the-eyes \
  --input "family_photo.jpg" \
  --output "results/" \
  --config "config/default.json"
```

**Output files**:
```
results/
├── open_eyes_20250207_143022_original.png    # Result
├── open_eyes_20250207_143022_face_data.json  # Metadata
└── open_eyes_20250207_143022.log             # Processing log
```

**Processing time**: 26.9 seconds

### View Results

```bash
# Check metadata
python -c "
import json
with open('results/open_eyes_20250207_143022_face_data.json') as f:
    data = json.load(f)
print(f'Faces detected: {len(data[\"faces\"])}')
print(f'Processing time: {data[\"total_time_seconds\"]}s')
"

# Output:
# Faces detected: 2
# Processing time: 26.9s
```

---

## Example 2: Batch Processing with Variations

### Multi-Variation Configuration

Create `config/variations.json`:
```json
{
  "config_name": "Family Photo - Multiple Variations",
  "base_config": "config/default.json",
  "num_variations": 4,
  "variations": [
    {
      "name": "Neutral Expression",
      "prompt": "photorealistic neutral open eyes, relaxed facial expression",
      "negative_prompt": "closed, squinting, expression, dramatic"
    },
    {
      "name": "Bright & Cheerful",
      "prompt": "photorealistic bright open eyes with smile, warm lighting",
      "negative_prompt": "closed, dark, sad, neutral expression"
    },
    {
      "name": "Natural & Calm",
      "prompt": "photorealistic naturally open eyes, calm peaceful expression",
      "negative_prompt": "artificial, dramatic, exaggerated"
    },
    {
      "name": "Focused Intent",
      "prompt": "photorealistic alert open eyes with focused gaze",
      "negative_prompt": "closed, unfocused, drowsy"
    }
  ]
}
```

### Run Batch

```bash
open-the-eyes \
  --input "family_photo.jpg" \
  --config "config/variations.json" \
  --output "results/" \
  --num-variations 4
```

**Processing time**: 48.8 seconds (2.2× faster than 4 sequential runs)

**Output files**:
```
results/
├── open_eyes_20250207_143022_original.png
├── open_eyes_20250207_143022_variation_01.png
├── open_eyes_20250207_143022_variation_02.png
├── open_eyes_20250207_143022_variation_03.png
└── open_eyes_20250207_143022_variation_04.png
```

### Compare Variations

```python
from PIL import Image
import matplotlib.pyplot as plt

# Load all variations
images = {
    'Original': Image.open('results/open_eyes_20250207_143022_original.png'),
    'Neutral': Image.open('results/open_eyes_20250207_143022_variation_01.png'),
    'Cheerful': Image.open('results/open_eyes_20250207_143022_variation_02.png'),
    'Calm': Image.open('results/open_eyes_20250207_143022_variation_03.png'),
    'Focused': Image.open('results/open_eyes_20250207_143022_variation_04.png'),
}

# Display grid
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes = axes.flatten()

for ax, (name, img) in zip(axes, images.items()):
    ax.imshow(img)
    ax.set_title(name)
    ax.axis('off')

plt.tight_layout()
plt.show()
```

---

## Example 3: API Service Usage

### Python API

```python
from open_the_eyes import EyeRestorer

# Initialize (loads models once)
restorer = EyeRestorer(device="cuda:0")

# Process image
result = restorer.process(
    image_path="selfie_closed_eyes.jpg",
    output_dir="results/",
    save_intermediate=False  # Only save final result
)

print(f"✓ Processed in {result.total_time}s")
print(f"✓ Faces: {result.num_faces_processed}")
print(f"✓ Output: {result.output_path}")
```

### HTTP API (FastAPI)

```python
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
import io
from open_the_eyes import EyeRestorer

app = FastAPI()
restorer = EyeRestorer(device="cuda:0")

@app.post("/restore-eyes")
async def restore_eyes(file: UploadFile = File(...)):
    """Restore closed eyes in uploaded image."""
    
    # Load image from upload
    image_data = await file.read()
    
    # Process
    result = restorer.process_bytes(image_data)
    
    # Return result
    return FileResponse(
        io.BytesIO(result.image_bytes),
        media_type="image/png",
        filename=f"restored_{file.filename}"
    )

# Usage
# curl -X POST -F "file=@photo.jpg" http://localhost:8000/restore-eyes > result.jpg
```

### Docker Deployment

```dockerfile
FROM nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu22.04

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y python3.10 python3-pip
RUN pip install open-the-eyes fastapi uvicorn python-multipart

# Copy API code
COPY api.py .

# Expose port
EXPOSE 8000

# Run server
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Deploy with Docker Compose**:
```yaml
version: '3.8'
services:
  api:
    build: .
    container_name: open-eyes-api
    devices:
      - /dev/nvidia0:/dev/nvidia0
    environment:
      - NVIDIA_VISIBLE_DEVICES=all
    ports:
      - "8000:8000"
    volumes:
      - ./uploads:/app/uploads
```

---

## Example 4: Advanced Configuration

### High-Quality Settings

Create `config/high_quality.json`:
```json
{
  "face_detection": {
    "threshold": 260,
    "debug": false
  },
  "generation": {
    "num_inference_steps": 50,
    "guidance_scale": 18.0,
    "strength": 0.5,
    "seed": 42
  },
  "restoration": {
    "enhance_level": "high",
    "upscale_factor": 1.0
  },
  "blend": {
    "feather_size": 35,
    "blend_quality": "high"
  }
}
```

**Usage**:
```bash
open-the-eyes \
  --input "professional_headshot.jpg" \
  --config "config/high_quality.json" \
  --output "results/"
```

**Processing time**: 28.4 seconds (higher quality, slower)

### Fast Preview Settings

Create `config/fast.json`:
```json
{
  "generation": {
    "num_inference_steps": 15,
    "guidance_scale": 7.5
  },
  "restoration": {
    "enhance_level": "light"
  },
  "blend": {
    "feather_size": 20
  }
}
```

**Usage** (for real-time preview):
```bash
open-the-eyes \
  --input "photo.jpg" \
  --config "config/fast.json" \
  --output "preview/" \
  --no-metadata  # Skip metadata generation
```

**Processing time**: 6.2 seconds (preview quality)

---

## Example 5: Selective Face Processing

### Process Only Specific Faces

```json
{
  "face_selection": {
    "mode": "specific",
    "face_indices": [0, 2],
    "ignore_faces": [1]
  },
  "generation": {
    "num_inference_steps": 30
  }
}
```

**Processing**:
```bash
# Process only faces 0 and 2 (skip face 1)
open-the-eyes \
  --input "group_photo.jpg" \
  --config "config/selective.json" \
  --output "results/"
```

**Output**: Only specified faces processed, others preserved

### Batch Process Directory

```python
import os
from pathlib import Path
from open_the_eyes import EyeRestorer

restorer = EyeRestorer()

# Process all JPGs in directory
input_dir = Path("photos/")
output_dir = Path("results/")
output_dir.mkdir(exist_ok=True)

for image_path in sorted(input_dir.glob("*.jpg")):
    print(f"Processing {image_path.name}...")
    result = restorer.process(
        image_path=str(image_path),
        output_dir=str(output_dir)
    )
    print(f"  ✓ {result.num_faces_processed} faces restored in {result.total_time:.1f}s")

# Batch statistics
print(f"\nProcessed {len(list(input_dir.glob('*.jpg')))} images")
```

---

## Example 6: Programmatic Face Analysis

### Analyze Closed Eyes Before Processing

```python
from open_the_eyes import FaceAnalyzer

analyzer = FaceAnalyzer()

# Analyze image
analysis = analyzer.analyze("closed_eyes.jpg")

print("Face Analysis:")
for i, face in enumerate(analysis.faces):
    print(f"\nFace {i}:")
    print(f"  Location: {face.bbox}")
    print(f"  Left eye polygon area: {face.left_eye_area:.1f} px²")
    print(f"  Right eye polygon area: {face.right_eye_area:.1f} px²")
    print(f"  Left eye closed: {face.left_eye_closed} (threshold: 260px²)")
    print(f"  Right eye closed: {face.right_eye_closed}")
    print(f"  Requires processing: {face.requires_processing}")
    print(f"  Confidence: {face.confidence:.1%}")
```

**Output**:
```
Face Analysis:

Face 0:
  Location: [120, 85, 420, 385]
  Left eye polygon area: 245.3 px²
  Right eye polygon area: 380.1 px²
  Left eye closed: True (threshold: 260px²)
  Right eye closed: False
  Requires processing: True
  Confidence: 99.2%

Face 1:
  Location: [650, 120, 950, 420]
  Left eye polygon area: 520.2 px²
  Right eye polygon area: 515.8 px²
  Left eye closed: False
  Right eye closed: False
  Requires processing: False
  Confidence: 98.7%
```

---

## Example 7: Post-Processing Pipeline

### Custom Post-Processing

```python
from open_the_eyes import EyeRestorer
from PIL import Image, ImageEnhance
import numpy as np

class CustomPipeline:
    def __init__(self):
        self.restorer = EyeRestorer()
    
    def process(self, image_path):
        # Step 1: Restore eyes
        result = self.restorer.process(image_path)
        img = Image.open(result.output_path)
        
        # Step 2: Enhance slightly (optional)
        enhancer = ImageEnhance.Sharpness(img)
        img = enhancer.enhance(1.15)  # 15% sharpness boost
        
        # Step 3: Normalize contrast
        arr = np.array(img)
        arr = np.clip(arr * 1.05, 0, 255).astype(np.uint8)
        img = Image.fromarray(arr)
        
        # Step 4: Save
        output_path = image_path.replace('.jpg', '_enhanced.jpg')
        img.save(output_path, quality=95)
        
        return output_path

# Usage
pipeline = CustomPipeline()
enhanced = pipeline.process("photo.jpg")
print(f"Enhanced result saved to: {enhanced}")
```

---

## Example 8: Troubleshooting Common Issues

### Issue 1: CUDA Out of Memory

```python
# Solution: Reduce batch size or use CPU for blending
config = {
    "device": "cuda:0",
    "blend_device": "cpu",  # CPU blending instead
    "generation": {
        "num_inference_steps": 20,  # Fewer steps
    }
}
```

### Issue 2: Multiple Faces Detected Incorrectly

```python
from open_the_eyes import FaceAnalyzer

analyzer = FaceAnalyzer()
analysis = analyzer.analyze("photo.jpg")

# Debug: Show detected faces
import matplotlib.pyplot as plt
from PIL import Image, ImageDraw

img = Image.open("photo.jpg")
draw = ImageDraw.Draw(img)

for i, face in enumerate(analysis.faces):
    x1, y1, x2, y2 = face.bbox
    draw.rectangle([x1, y1, x2, y2], outline="red", width=3)
    draw.text((x1, y1-10), f"Face {i}", fill="red")

img.show()
```

### Issue 3: Poor Quality Results

```python
# Solution: Increase quality settings
config = {
    "generation": {
        "num_inference_steps": 50,  # More steps = better quality
        "guidance_scale": 20.0,     # Higher = more prompt adherence
        "seed": 42                   # Reproducible results
    },
    "restoration": {
        "enhance_level": "high"
    }
}
```

### Issue 4: Inconsistent Results Across Variations

```python
# Solution: Use fixed seed for consistency
config = {
    "generation": {
        "seed": 42,  # Fixed seed
        "num_inference_steps": 30
    },
    "variation_seeds": [42, 43, 44, 45]  # Sequential seeds
}
```

---

## Performance Tips

1. **Batch variations together**: 4 images in 48.8s vs. 107.6s sequentially (2.2× faster)
2. **Use fast mode for preview**: 6.2s instead of 26.9s during development
3. **Pin GPU for consistency**: `CUDA_VISIBLE_DEVICES=0` to avoid conflicts
4. **Preload models on startup**: Avoid first-run 2-second overhead
5. **Cache metadata**: Store face analysis JSON to skip re-detection
6. **Parallel batch processing**: Process 4+ images via ThreadPoolExecutor

---

## Integration Examples

### Instagram/Facebook Bot

```python
from instabot import Bot
from open_the_eyes import EyeRestorer

restorer = EyeRestorer()

@bot.on_caption_match(r"@restore_eyes")
def handle_restore_request(update):
    # Download user's photo
    photo = update.download_photo("temp.jpg")
    
    # Process
    result = restorer.process("temp.jpg")
    
    # Upload result
    bot.upload_photo(result.output_path)
    bot.reply("✓ Eyes restored!")
```

### Jupyter Notebook Widget

```python
import ipywidgets as widgets
from IPython.display import display, Image as IPImage
from open_the_eyes import EyeRestorer

restorer = EyeRestorer()

# Upload widget
upload = widgets.FileUpload(accept_multiple=False)
button = widgets.Button(description="Restore Eyes")
output = widgets.Output()

def on_button_click(b):
    with output:
        result = restorer.process(upload.value)
        display(IPImage(result.output_path))

button.on_click(on_button_click)
display(upload, button, output)
```
