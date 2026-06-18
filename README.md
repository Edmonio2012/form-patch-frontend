# Form Patch - Frontend UI

A modern React 19 frontend application for the Form Patch SaaS platform. Built with Vite, TypeScript, and Tailwind CSS for optimal performance and developer experience.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm or pnpm
- Supabase account credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/Edmonio2012/form-patch-frontend.git
cd form-patch-frontend

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Application Configuration
VITE_APP_ID=form-patch
VITE_APP_TITLE=Form Patch

# Supabase Database
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Backend API
VITE_FRONTEND_FORGE_API_URL=http://localhost:3001
VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key

# OAuth
VITE_OAUTH_PORTAL_URL=https://your-oauth-provider.com

# Analytics
VITE_ANALYTICS_ENDPOINT=https://your-analytics-endpoint.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

### Running the Application

**Development:**
```bash
npm run dev
```

The application will start on `http://localhost:5173` with hot module replacement (HMR).

**Production Build:**
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── app/
│   └── App.tsx                # Main application component
├── components/
│   └── ui/
│       ├── button.tsx         # Button component
│       ├── calendar.tsx        # Calendar component
│       └── carousel.tsx        # Carousel component
├── hooks/
│   └── usePersistFn.ts        # Custom hook for persistent functions
├── lib/
│   └── utils.ts               # Utility functions (cn, etc.)
├── main.tsx                   # React entry point
└── index.css                  # Global styles and Tailwind
```

## 🎨 Design System

### Color Palette

The application uses CSS variables for theming:
- `--background` - Main background color
- `--foreground` - Main text color
- `--primary` - Primary brand color
- `--secondary` - Secondary color
- `--accent` - Accent color
- `--muted` - Muted text and backgrounds

### Typography

- **Font Family:** System fonts (Inter fallback)
- **Headings:** Bold, large sizes (h1-h6)
- **Body:** Regular weight, readable line height
- **Monospace:** Code blocks and technical content

### Components

All UI components are built with:
- React 19 hooks
- TypeScript for type safety
- Tailwind CSS for styling
- Radix UI primitives for accessibility

## 🔧 Available Scripts

```bash
# Development server with HMR
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build locally
npm run preview

# Linting (ESLint)
npm run lint
```

## 📦 Dependencies

### Core Framework
- **react** (^19.0.0) - UI library
- **react-dom** (^19.0.0) - React DOM rendering
- **vite** (^5.0.8) - Build tool and dev server

### Styling
- **tailwindcss** (^4.0.0) - Utility-first CSS framework
- **postcss** (^8.4.32) - CSS processing
- **autoprefixer** (^10.4.16) - Vendor prefixes

### UI Components
- **@radix-ui/** - Accessible component primitives
- **lucide-react** (^0.408.0) - Icon library
- **framer-motion** (^11.0.0) - Animation library

### Forms & State
- **react-hook-form** (^7.48.0) - Form state management
- **wouter** (^3.2.1) - Client-side routing

### Database
- **@supabase/supabase-js** (^2.38.4) - Supabase client

### Utilities
- **next-themes** (^0.2.1) - Theme management
- **tailwind-merge** (^2.2.0) - Tailwind class merging

## 🎯 Development Workflow

### Creating a New Component

```tsx
// src/components/MyComponent.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  className?: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ className }) => {
  return (
    <div className={cn('base-classes', className)}>
      {/* Component content */}
    </div>
  );
};
```

### Using Hooks

```tsx
import { usePersistFn } from '@/hooks/usePersistFn';

export const MyComponent = () => {
  const handleClick = usePersistFn(() => {
    // This function reference persists across renders
  });

  return <button onClick={handleClick}>Click me</button>;
};
```

### Styling with Tailwind

```tsx
// Use Tailwind utilities directly
<div className="flex items-center justify-between p-4 bg-background rounded-lg">
  <span className="text-foreground font-semibold">Title</span>
</div>
```

## 🔐 Environment & Security

- **Sensitive Data:** Never commit `.env.local` (included in `.gitignore`)
- **API Keys:** Use environment variables for all API keys
- **Supabase Anon Key:** Safe to expose (row-level security enforced)
- **Service Role Key:** Keep secret (backend only)

## 🚢 Deployment

### Vercel Deployment

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to master

### Build Output

```bash
npm run build
# Creates dist/ directory with optimized production build
```

### Performance Optimization

- **Code Splitting:** Automatic with Vite
- **Tree Shaking:** Removes unused code
- **Minification:** Automatic in production
- **Image Optimization:** Use optimized formats

## 🧪 Testing

### Type Checking

```bash
npm run type-check
```

Ensures all TypeScript types are correct.

### Linting

```bash
npm run lint
```

Checks code style and potential issues.

## 📊 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes and commit: `git commit -m "Add feature"`
4. Push to GitHub: `git push origin feature/your-feature`
5. Create a Pull Request

**Requirements:**
- TypeScript type checking passes
- Code follows project style
- Pull request reviewed and approved
- All checks pass before merge

## 🔄 Git Workflow

The master branch is protected with:
- Required pull request reviews (minimum 1)
- Status checks must pass
- Branch must be up-to-date

### Creating a Pull Request

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "Describe your changes"

# Push to GitHub
git push origin feature/my-feature

# Open PR on GitHub
# Wait for review and approval
# Merge when ready
```

## 📚 Resources

- [React 19 Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Supabase Documentation](https://supabase.com/docs)

## 🆘 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Dependency Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### TypeScript Errors

```bash
# Run type checking to see all errors
npm run type-check

# Fix TypeScript issues in your code
```

## 📄 License

This project is proprietary software for Form Patch.

## 📞 Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Contact the development team

---

**Last Updated:** June 2026
**Version:** 1.0.0
**Node Version:** 18+
