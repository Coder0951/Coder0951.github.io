# Professional AI Research Portfolio

> A modern, responsive portfolio website showcasing technical expertise in AI research, computer vision, and knowledge engineering.

![Build Status](https://github.com/coder0951/coder0951.github.io/actions/workflows/deploy.yml/badge.svg)
![React](https://img.shields.io/badge/React-19.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.3-646cff)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-06b6d4)

## 🎯 Features

- ✨ **Modern UI/UX**: Dark theme optimized for technical content
- 📱 **Fully Responsive**: Mobile-first design with Tailwind CSS
- ⚡ **High Performance**: Vite for instant HMR and optimized builds (~77KB gzipped)
- 🎨 **Component-Based**: Reusable React components with TypeScript
- 📊 **Data-Driven**: JSON-based project and resume data
- 🚀 **Auto-Deployment**: GitHub Actions CI/CD to GitHub Pages
- 🎯 **SEO-Ready**: Optimized structure and semantic HTML
- 🌙 **Dark Mode**: Professional dark theme as default

## 📋 Sections

1. **Navigation**: Fixed header with smooth scrolling
2. **Hero**: Compelling introduction with CTA and stats
3. **Experience**: Professional timeline with achievements
4. **Skills**: Categorized technical expertise matrix
5. **Projects**: Featured research projects with tech stack
6. **Footer**: Links and metadata

## 🛠️ Technology Stack

### Frontend
- **React 18**: UI library with hooks
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast module bundler
- **Tailwind CSS 4**: Utility-first CSS framework
- **React Router v7**: Client-side routing

### Build & Deployment
- **PostCSS**: CSS transformations
- **Terser**: Code minification
- **ESLint**: Code quality checks
- **GitHub Actions**: Automated CI/CD

### Development
- **Node.js 20.x**: JavaScript runtime
- **npm 10+**: Package manager

## 🚀 Quick Start

### Prerequisites
```bash
node -v  # Verify Node.js v20+
npm -v   # Verify npm v10+
git -v   # Verify Git is installed
```

### Installation

```bash
# Navigate to workspace
cd /mnt/data/gitprojects/MyWebsite

# Install all dependencies
npm install

# Start development server with HMR
npm run dev
```

Dev server will open at `http://localhost:5173/`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── Navigation.tsx      # Header navigation
│   ├── Hero.tsx           # Hero/intro section
│   ├── Experience.tsx      # Experience timeline
│   ├── Skills.tsx         # Skills matrix
│   ├── ProjectCard.tsx    # Project card
│   ├── ProjectSection.tsx # Projects grid
│   └── Footer.tsx         # Footer
├── data/                   # JSON data
│   ├── resume.json
│   └── projects.json
├── types/                  # TypeScript types
│   └── project.ts
├── App.tsx                # Main App
└── index.css              # Tailwind CSS
```

## ✏️ Customization

### Update Resume Information

Edit `src/data/resume.json`:

```json
{
  "name": "Your Name",
  "title": "Your Professional Title",
  "email": "your-email@example.com",
  "github": "https://github.com/yourusername",
  "summary": "Your professional summary here"
}
```

### Add/Edit Projects

Edit `src/data/projects.json`:

```json
[
  {
    "id": "project-1",
    "title": "Project Title",
    "description": "Short description",
    "techStack": ["React", "TypeScript", "Tailwind"],
    "highlights": ["Achievement 1", "Achievement 2"],
    "status": "Active",
    "year": "2024-2025"
  }
]
```

### Customize Colors & Theme

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

## 🔄 Deployment

### GitHub Pages Setup

1. **Repository Settings**
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"
   - HTTPS will be enforced automatically

2. **Initial Deployment**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

3. **Monitor Deployment**
   - Go to repository → Actions tab
   - Watch the deploy.yml workflow
   - Wait for green checkmark ✅

4. **View Live Site**
   - Visit `https://coder0951.github.io`

### Continuous Deployment

Every push to `main` automatically:
1. Triggers GitHub Actions workflow
2. Installs dependencies with `npm ci`
3. Builds optimized bundle: `npm run build`
4. Deploys `dist/` to GitHub Pages
5. Updates live site (2-3 minutes)

Monitor in **Actions** tab for build logs and status.

## 📊 Build Output

Optimized production bundle:
```
HTML         0.46 KB  (gzip: 0.29 KB)
CSS         29.69 KB  (gzip: 5.94 KB)
JavaScript 242.89 KB  (gzip: 76.69 KB)
─────────────────────────────────────────
Total      ~273 KB    (gzip: ~83 KB)
```

Performance benchmarks:
- Lighthouse Performance: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <2.5s

## 📖 Documentation

- **[Quick Start Guide](./QUICKSTART.md)** - Setup and customization
- **[Migration Guide](./MIGRATION_GUIDE.md)** - Technical details
- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [GitHub Pages Help](https://pages.github.com)

## 🧪 Available Scripts

```bash
npm run dev       # Start dev server (HMR enabled)
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint checks
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### CSS Not Updating
```bash
npm install -D @tailwindcss/postcss
npm run build
```

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🤝 Community & Resources

- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Share ideas in Discussions
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com
- **Vite Guide**: https://vite.dev

## 📄 License

MIT License - Feel free to use this template for your portfolio!

## 🙌 Acknowledgments

- Built with [Vite](https://vite.dev) ⚡
- Styled with [Tailwind CSS](https://tailwindcss.com) 🎨
- Deployed via [GitHub Actions](https://github.com/features/actions) 🚀

---

**Status**: ✅ Production Ready  
**Last Updated**: February 8, 2026  
**Built with ❤️ for the AI research community**
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
