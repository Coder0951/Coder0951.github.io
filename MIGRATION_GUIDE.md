# Professional Portfolio Website - React + Vite Setup Guide

## 📋 Overview

This document details the complete setup of a modern, professional portfolio website showcasing technical work in AI research, computer vision, and knowledge engineering. Built with React 18, Vite, TypeScript, and Tailwind CSS with automated GitHub Pages deployment.

**Portfolio Features:**
- Professional hero section with resume summary
- Experience timeline with detailed achievements
- Skills matrix organized by category
- Featured projects with tech stack badges
- Responsive mobile-first design
- Automated CI/CD deployment to GitHub Pages
- Dark theme optimized for technical audience

---

## ✅ Task 1: Environment Setup (Pop!OS/Ubuntu)

### Install Node.js v20.x from Nodesource Repository

```bash
# Add Nodesource repository and install Node.js v20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Verification

```bash
# Check Node.js version
node -v
# Output: v20.20.0

# Check npm version
npm -v
# Output: 10.8.2
```

✅ **Status**: Node.js v20.20.0 and npm v10.8.2 successfully installed

---

## ✅ Task 2: Repository Migration & Initialization

### Clone the Repository

```bash
# Clone the existing repository
git clone https://github.com/coder0951/coder0951.github.io.git temp-backup
cd temp-backup
```

### Initialize Vite Project in Workspace

```bash
# Navigate to workspace
cd /mnt/data/gitprojects/MyWebsite

# Initialize git with remote
git init
git remote add origin https://github.com/coder0951/coder0951.github.io.git

# Create new Vite project with React + TypeScript
npm create vite@latest . -- --template react-ts
```

### Install Required Dependencies

```bash
# Install Tailwind CSS with PostCSS and Autoprefixer
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind (manually if needed)
# Configuration files are pre-configured in the project

# Install React Router
npm install react-router-dom
```

## 📦 Installed Dependencies

### Production Dependencies
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.1.1"
}
```

### Development Dependencies
```json
{
  "vite": "^7.2.4",
  "@vitejs/plugin-react": "^5.1.1",
  "typescript": "~5.9.3",
  "tailwindcss": "^4.1.18",
  "@tailwindcss/postcss": "latest",
  "postcss": "^8.5.6",
  "autoprefixer": "^10.4.24",
  "terser": "^5.x",
  "eslint": "^9.39.1",
  "@types/react": "^19.2.5",
  "@types/react-dom": "^19.2.3"
}
```

### Installation Commands

```bash
# Install all dependencies
npm install

# Install specific packages
npm install react-router-dom
npm install -D tailwindcss@latest postcss autoprefixer
npm install -D @tailwindcss/postcss terser
npm install -D typescript
```

---

## 🎨 Tailwind CSS Configuration

### Tailwind v4 Setup

**tailwind.config.js**
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
      },
    },
  },
}
```

**postcss.config.js** (Tailwind v4 requires new plugin)
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

**src/index.css** (Updated for Tailwind v4)
```css
@import "tailwindcss";

@layer base {
  body {
    @apply bg-slate-950 text-slate-100 antialiased;
  }
}
```

**Key Differences:**
- Tailwind v4 uses `@import "tailwindcss"` instead of individual `@tailwind` directives
- PostCSS plugin moved to `@tailwindcss/postcss` package
- Simpler, more streamlined configuration

### Color Palette

```
Background: slate-950 (#030712)
Text: slate-100 (#f1f5f9)
Primary: blue-600 (#2563eb)
Accent: purple-400 (#c084fc)
Highlight: pink-400 (#f472b6)
Borders: slate-800 (#1e293b)
```

---

## ✅ Task 3: Portfolio Component Architecture

### Project Structure

```
src/
├── components/
│   ├── Navigation.tsx       # Fixed header with navigation links
│   ├── Hero.tsx            # Hero section with intro and CTA
│   ├── Experience.tsx       # Timeline of professional experience
│   ├── Skills.tsx          # Technical skills organized by category
│   ├── ProjectCard.tsx      # Individual project showcase card
│   ├── ProjectSection.tsx   # Projects grid layout
│   └── Footer.tsx          # Footer with links and metadata
├── types/
│   └── project.ts          # TypeScript interfaces
├── data/
│   ├── projects.json       # Featured projects data
│   └── resume.json         # Resume/experience data
├── App.tsx                 # Main routing component
├── App.css                 # Global styles
├── index.css               # Tailwind CSS configuration
└── main.tsx                # React entry point

.github/workflows/
  └── deploy.yml            # GitHub Actions workflow

Configuration Files:
├── vite.config.ts          # Vite bundler configuration
├── tailwind.config.js      # Tailwind CSS theme
├── postcss.config.js       # PostCSS with Tailwind plugin
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies & scripts
```

### Data Schemas

#### Resume Schema (`src/data/resume.json`)

```json
{
  "name": "string",
  "title": "string",
  "email": "string",
  "github": "url",
  "location": "string",
  "summary": "string",
  "experience": [
    {
      "id": "string",
      "company": "string",
      "position": "string",
      "duration": "string (e.g., '2024 - Present')",
      "highlights": ["string"]
    }
  ],
  "skills": {
    "category": ["skill1", "skill2", ...]
  },
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "year": "string",
      "focus": "string"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "year": "string"
    }
  ]
}
```

#### Projects Schema (`src/data/projects.json`)

```json
[
  {
    "id": "unique-id",
    "title": "Project Title",
    "description": "Short description",
    "longDescription": "Detailed description",
    "techStack": ["Technology1", "Technology2"],
    "highlights": ["Achievement 1", "Achievement 2"],
    "documentationUrl": "/path/to/docs",
    "githubUrl": "https://github.com/...",
    "tags": ["tag1", "tag2"],
    "status": "Active | Completed | In Progress",
    "year": "2024-2025"
  }
]
```

### Core Components

#### 1. Navigation Component
- Fixed header navigation with smooth scrolling
- Mobile-responsive hamburger menu
- Quick links to all portfolio sections
- Direct GitHub link

#### 2. Hero Section
- Eye-catching intro with gradient effects
- Professional title and summary (from resume.json)
- Call-to-action buttons
- Key statistics cards

#### 3. Experience Component
- Timeline visualization of work history
- Company, position, and duration details
- Bullet-point achievements
- Hover effects and animations

#### 4. Skills Component
- Skills organized by category (AI/ML, CV, Backend, etc.)
- Grid layout with hover effects
- Specialization summary box
- Icon indicators for skill categories

#### 5. Project Cards
- Featured project showcase
- Tech stack badges with distinct styling
- Project highlights/achievements
- Links to documentation and GitHub
- Status indicators (Active/Completed)

#### 6. Project Section
- Responsive grid layout (1-2 columns)
- Call-to-action for GitHub exploration
- Smooth animations and transitions

#### 7. Footer
- About section
- Quick navigation links
- Technology stack highlights
- Copyright information

---

## ✅ Task 4: GitHub Pages Deployment

### Vite Configuration for GitHub Pages

The `vite.config.ts` is configured for deployment:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/',                    // Root path for GitHub Pages
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: 'dist',             // Build output directory
    sourcemap: false,           // Disable source maps in production
    minify: 'terser',          # Code minification
  },
})
```

### GitHub Actions Workflow

Located at `.github/workflows/deploy.yml`

**Workflow Steps:**

1. **Build Job** (`ubuntu-latest`)
   - Checkout repository with full history
   - Setup Node.js v20.x with npm cache
   - Install dependencies: `npm ci`
   - Build application: `npm run build`
   - Upload dist/ artifacts

2. **Deploy Job** (only on main branch push)
   - Download build artifacts
   - Setup GitHub Pages environment
   - Upload artifacts to GitHub Pages
   - Deploy to GitHub Pages using official action

**Key Features:**
- ✅ Automatic deployment on push to `main`
- ✅ Pull request builds (no deployment)
- ✅ Node.js v20.x compatibility
- ✅ npm cache for faster builds
- ✅ Environment configuration for Pages
- ✅ Concurrency controls to prevent race conditions

### Deployment Process

```bash
# 1. Code pushed to main branch
git push origin main

# 2. GitHub Actions automatically triggers
# → Build job starts
# → npm ci installs dependencies
# → npm run build creates optimized dist/
# → Artifacts uploaded

# 3. Deploy job runs
# → Configures GitHub Pages environment
# → Uploads dist/ artifacts
# → Deploys to github.io domain
# → Site goes live

# 3. View live at: https://coder0951.github.io
```

### Deployment Status

Check deployment status in GitHub:
1. Go to repository → Actions tab
2. View workflow runs for `deploy.yml`
3. Click latest run for detailed logs
4. Green checkmark ✅ = successful deployment

---

## 🚀 Running the Application

### Development Server

```bash
cd /mnt/data/gitprojects/MyWebsite

# Start development server with HMR
npm run dev

# Output:
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Output:
#   ✓ built in 0.55s
#   dist/index.html           0.52 kB │ gzip: 0.31 kB
#   dist/assets/index-*.js    125.45 kB │ gzip: 42.23 kB
```

### Preview Build Locally

```bash
npm run preview
```

---

## 📝 Git Workflow

### Initial Setup

```bash
cd /mnt/data/gitprojects/MyWebsite

# Configure git
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Create initial commit
git commit -m "chore: initialize React + Vite portfolio

- Set up Vite with React 18 and TypeScript
- Configure Tailwind CSS for styling
- Create modular component architecture
- Implement project data schema with 4 core projects
- Configure GitHub Actions deployment workflow
- Set up GitHub Pages with automatic builds"

# Push to main
git push -u origin main
```

### Subsequent Updates

```bash
# Make changes, then:
git add .
git commit -m "feat: add new component"
git push origin main

# GitHub Actions will automatically:
# 1. Run build
# 2. Deploy to gh-pages branch
# 3. Update live site at coder0951.github.io
```

---

## 🔧 Tailwind CSS Configuration

### tailwind.config.js

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
      },
    },
  },
}
```

### postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-950 text-slate-100 antialiased;
  }
}
```

---

## 🎨 Styling Features

- **Dark Theme**: Slate-950 background with slate-100 text
- **Gradient Effects**: Blue to purple gradients for visual appeal
- **Glass Morphism**: Backdrop blur effects on cards
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Tech Badges**: Color-coded technology stack
- **Hover Animations**: Smooth transitions and scale effects

---

## 🔐 GitHub Pages Configuration

### CNAME Record

The workflow automatically sets `CNAME` to `coder0951.github.io`. This ensures:
- Custom domain routing works correctly
- HTTPS is automatically enabled
- DNS propagation is handled by GitHub

### Repository Settings

Ensure these settings in GitHub repository:
1. **Pages Source**: Deploy from `gh-pages` branch
2. **Custom Domain**: `coder0951.github.io`
3. **HTTPS**: Enforced (automatic after CNAME setup)

---

## 📊 Asset Optimization

The build process generates optimized assets:

- **JavaScript Code Splitting**: Lazy-loaded components
- **CSS Minification**: Tailwind purges unused styles
- **Image Optimization**: Vite handles asset optimization
- **Gzip Compression**: GitHub Pages serves gzipped assets

---

## 🛠️ Troubleshooting

### Build Fails with Asset Errors

**Solution**: Ensure `base` property in `vite.config.ts` matches repository name.

```typescript
base: '/coder0951.github.io/'
```

### Components Not Rendering

**Solution**: Check that imports use relative paths correctly.

```typescript
import { ProjectSection } from './components/ProjectSection';
```

### GitHub Actions Workflow Not Triggering

**Solution**: Verify workflow file is in `.github/workflows/deploy.yml` on the `main` branch.

```bash
git status
# Should show .github/workflows/deploy.yml
```

---

## 📚 Project Files Created

```
.github/workflows/
  └── deploy.yml               # GitHub Actions workflow

src/
  ├── components/
  │   ├── Hero.tsx            # Landing hero section
  │   ├── ProjectCard.tsx      # Project card component
  │   ├── ProjectSection.tsx   # Projects grid
  │   └── Footer.tsx           # Footer
  ├── types/
  │   └── project.ts           # TypeScript interfaces
  ├── data/
  │   └── projects.json        # Project data
  ├── App.tsx                  # Main app
  ├── index.css                # Tailwind directives
  └── main.tsx                 # Entry point

vite.config.ts                 # Base path configured
tailwind.config.js             # Tailwind configuration
postcss.config.js              # PostCSS configuration
package.json                   # Dependencies (updated)
```

---

## 🎯 Next Steps

1. **Commit and Push** to main branch
2. **Monitor GitHub Actions** for deployment status
3. **Visit** `https://coder0951.github.io` to view live site
4. **Add Forensic Documentation** pages under `/forensics/*` routes
5. **Enhance Components** with additional features

---

## 📖 Resources

- [Vite Documentation](https://vite.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [GitHub Pages Guide](https://pages.github.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Last Updated**: February 8, 2026  
**Migration Status**: ✅ Complete
