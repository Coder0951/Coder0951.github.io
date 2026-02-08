#!/bin/bash
# Portfolio Deployment Checklist Script
# Run this to verify everything is ready for deployment

echo "🚀 Portfolio Deployment Checklist"
echo "=================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "  Node.js: $NODE_VERSION"
else
    echo "  ✗ Node.js not found"
    exit 1
fi

# Check npm
echo "✓ Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "  npm: $NPM_VERSION"
else
    echo "  ✗ npm not found"
    exit 1
fi

# Check Git
echo "✓ Checking Git..."
if command -v git &> /dev/null; then
    GIT_VERSION=$(git -v | cut -d' ' -f3)
    echo "  Git: $GIT_VERSION"
else
    echo "  ✗ Git not found"
    exit 1
fi

echo ""
echo "📁 Project Structure"
echo "===================="

# Check key files
files=(
    "src/App.tsx"
    "src/components/Hero.tsx"
    "src/components/Navigation.tsx"
    "src/components/Experience.tsx"
    "src/components/Skills.tsx"
    "src/components/ProjectCard.tsx"
    "src/components/ProjectSection.tsx"
    "src/components/Footer.tsx"
    "src/data/resume.json"
    "src/data/projects.json"
    ".github/workflows/deploy.yml"
    "vite.config.ts"
    "tailwind.config.js"
    "package.json"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ MISSING: $file"
    fi
done

echo ""
echo "📦 Dependencies"
echo "==============="

# Check package.json for key dependencies
echo "  ✓ Checking package.json..."

if grep -q '"react"' package.json; then
    REACT_VERSION=$(grep '"react"' package.json | head -1 | cut -d'"' -f4)
    echo "    - React: $REACT_VERSION"
fi

if grep -q '"vite"' package.json; then
    VITE_VERSION=$(grep '"vite"' package.json | head -1 | cut -d'"' -f4)
    echo "    - Vite: $VITE_VERSION"
fi

if grep -q '"tailwindcss"' package.json; then
    TAILWIND_VERSION=$(grep '"tailwindcss"' package.json | head -1 | cut -d'"' -f4)
    echo "    - Tailwind CSS: $TAILWIND_VERSION"
fi

if grep -q '"typescript"' package.json; then
    TS_VERSION=$(grep '"typescript"' package.json | head -1 | cut -d'"' -f4)
    echo "    - TypeScript: $TS_VERSION"
fi

echo ""
echo "🔨 Build Status"
echo "==============="

# Check if dist folder exists (from previous build)
if [ -d "dist" ]; then
    DIST_SIZE=$(du -sh dist | cut -f1)
    FILE_COUNT=$(find dist -type f | wc -l)
    echo "  ✓ Previous build found"
    echo "    - Size: $DIST_SIZE"
    echo "    - Files: $FILE_COUNT"
else
    echo "  ℹ No previous build (run 'npm run build' to create)"
fi

echo ""
echo "📋 Configuration Files"
echo "======================"

configs=(
    "tsconfig.json"
    "postcss.config.js"
    "vite.config.ts"
    ".gitignore"
    ".github/workflows/deploy.yml"
)

for config in "${configs[@]}"; do
    if [ -f "$config" ]; then
        echo "  ✓ $config"
    else
        echo "  ✗ MISSING: $config"
    fi
done

echo ""
echo "📝 Data Files"
echo "============="

if [ -f "src/data/resume.json" ]; then
    echo "  ✓ resume.json"
    # Check for required fields
    if grep -q '"name"' src/data/resume.json; then
        echo "    - Has resume data ✓"
    fi
fi

if [ -f "src/data/projects.json" ]; then
    echo "  ✓ projects.json"
    PROJECT_COUNT=$(grep -c '"id"' src/data/projects.json)
    echo "    - Has $PROJECT_COUNT projects ✓"
fi

echo ""
echo "🚀 Deployment Checklist"
echo "======================="
echo ""
echo "Before deploying to GitHub Pages:"
echo ""
echo "[ ] 1. Update src/data/resume.json with your information"
echo "[ ] 2. Update src/data/projects.json with your projects"
echo "[ ] 3. Customize colors in tailwind.config.js"
echo "[ ] 4. Test locally: npm run dev"
echo "[ ] 5. Build: npm run build"
echo "[ ] 6. Preview: npm run preview"
echo "[ ] 7. Check GitHub repository settings for Pages"
echo "[ ] 8. Commit changes: git add . && git commit -m 'Setup portfolio'"
echo "[ ] 9. Push to main: git push origin main"
echo "[ ] 10. Monitor GitHub Actions for deployment status"
echo ""
echo "📊 Quick Commands"
echo "================="
echo ""
echo "  npm run dev       # Start development server"
echo "  npm run build     # Create production build"
echo "  npm run preview   # Preview production build"
echo "  npm run lint      # Check code quality"
echo ""
echo "🎯 Status: READY FOR SETUP"
echo ""
echo "Next steps:"
echo "1. Customize your portfolio data in src/data/"
echo "2. Run 'npm run build' to create production bundle"
echo "3. Push to main branch to deploy automatically"
echo ""
echo "✨ Your portfolio will be live at: https://coder0951.github.io"
