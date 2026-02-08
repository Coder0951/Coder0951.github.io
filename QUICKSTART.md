# Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js v20.x
- npm v10+
- Git

### Installation

```bash
# Navigate to project directory
cd /mnt/data/gitprojects/MyWebsite

# Install dependencies
npm install
```

### Development

```bash
# Start development server with HMR (Hot Module Reload)
npm run dev

# Server runs at: http://localhost:5173/
# Auto-reloads on file changes
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Output:
# dist/index.html           0.46 kB │ gzip:  0.29 kB
# dist/assets/index-*.css   29.69 kB │ gzip:  5.94 kB
# dist/assets/index-*.js    242.89 kB │ gzip: 76.69 kB
```

### Preview Build

```bash
# Preview production build locally (before deployment)
npm run preview

# Server runs at: http://localhost:4173/
```

---

## 📂 File Structure

```
MyWebsite/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions workflow
│
├── src/
│   ├── components/
│   │   ├── Navigation.tsx       # Header with navigation
│   │   ├── Hero.tsx            # Hero/intro section
│   │   ├── Experience.tsx       # Experience timeline
│   │   ├── Skills.tsx          # Skills grid
│   │   ├── ProjectCard.tsx      # Project card component
│   │   ├── ProjectSection.tsx   # Projects grid
│   │   └── Footer.tsx          # Footer
│   │
│   ├── types/
│   │   └── project.ts          # TypeScript types
│   │
│   ├── data/
│   │   ├── projects.json       # Featured projects
│   │   └── resume.json         # Resume/experience
│   │
│   ├── App.tsx                 # Main app with routing
│   ├── App.css                 # App styles
│   ├── index.css               # Tailwind config
│   ├── main.tsx                # React entry point
│   └── vite-env.d.ts          # Vite type definitions
│
├── dist/                       # Build output (generated)
├── node_modules/               # Dependencies (generated)
│
├── public/                     # Static assets
├── .gitignore                 # Git ignore rules
├── index.html                 # HTML template
├── package.json               # Dependencies & scripts
├── package-lock.json          # Dependency lock file
├── tsconfig.json              # TypeScript config
├── tsconfig.app.json          # App TypeScript config
├── tsconfig.node.json         # Node TypeScript config
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── eslint.config.js           # ESLint configuration
│
└── MIGRATION_GUIDE.md         # This guide
```

---

## ✏️ Customization

### Update Resume Information

Edit `src/data/resume.json`:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "email": "your-email@example.com",
  "github": "https://github.com/yourusername",
  "summary": "Your professional summary..."
}
```

### Add/Edit Projects

Edit `src/data/projects.json`:

```json
[
  {
    "id": "project-id",
    "title": "Project Title",
    "description": "Short description",
    "techStack": ["React", "TypeScript", "Tailwind"],
    ...
  }
]
```

### Customize Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
}
```

### Update Navigation Links

Edit `src/components/Navigation.tsx`:

```tsx
<a href="#your-section" className="...">
  Your Section
</a>
```

---

## 🔧 npm Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint checks
npm run type-check # TypeScript type checking
```

---

## 📤 Deployment

### GitHub Pages Setup

1. **Repository Settings**
   - Go to Settings → Pages
   - Ensure "Source" is set to "GitHub Actions"
   - HTTPS should be enforced

2. **Push to Main**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

3. **Monitor Deployment**
   - Go to repository → Actions
   - Watch the `deploy.yml` workflow run
   - Wait for green checkmark ✅

4. **View Live Site**
   - Visit `https://coder0951.github.io`
   - Should automatically redirect from GitHub Pages

### Subsequent Updates

After the initial deployment, any push to `main` will:
1. Automatically trigger the build workflow
2. Build the React app with Vite
3. Deploy to GitHub Pages
4. Update the live site in ~2-3 minutes

---

## 🐛 Troubleshooting

### Build Errors

**Error: "tailwindcss plugin not found"**
```bash
npm install -D @tailwindcss/postcss
```

**Error: "terser not found"**
```bash
npm install -D terser
```

### Development Server Issues

**Port 5173 already in use**
```bash
# Vite will automatically try port 5174, or:
npm run dev -- --port 3000
```

**HMR not updating**
```bash
# Restart development server
npm run dev
```

### Deployment Issues

**Blank page after deployment**
- Check base path in `vite.config.ts`
- Verify `dist/` folder exists and contains files
- Check GitHub Actions logs for build errors

**CSS not loading**
- Verify `src/index.css` has Tailwind imports
- Check `postcss.config.js` is correct
- Rebuild: `npm run build`

---

## 📚 Resources

- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [GitHub Pages Help](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

## 📝 Notes

- **Development**: All changes auto-reload with HMR
- **Production**: Minified and optimized ~77KB gzipped
- **Deployment**: Fully automated via GitHub Actions
- **Mobile**: Fully responsive design with Tailwind
- **TypeScript**: Type-safe development with strict mode

---

**Last Updated**: February 8, 2026  
**Status**: ✅ Ready for deployment
