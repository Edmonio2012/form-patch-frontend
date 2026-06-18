# Contributing to Form Patch Frontend

Thank you for your interest in contributing to Form Patch! This document provides guidelines and instructions for contributing to the frontend repository.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Report issues professionally

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR-USERNAME/form-patch-frontend.git
cd form-patch-frontend

# Add upstream remote
git remote add upstream https://github.com/Edmonio2012/form-patch-frontend.git
```

### 2. Create a Feature Branch

```bash
# Update from upstream
git fetch upstream
git checkout -b feature/your-feature-name upstream/master
```

### 3. Set Up Development Environment

```bash
# Install dependencies
npm install --legacy-peer-deps

# Copy environment template
cp .env.example .env.local

# Configure .env.local with your credentials
```

## Development Guidelines

### Code Style

- Use TypeScript for all code
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic

### React Best Practices

```typescript
// ✅ Good: Functional component with hooks
import React, { useState, useEffect } from 'react';

interface MyComponentProps {
  title: string;
  onClose?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Side effect logic
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  );
};

// ❌ Avoid: Class components (use hooks instead)
// ❌ Avoid: Inline arrow functions in JSX (use usePersistFn)
// ❌ Avoid: Creating objects/arrays in render
```

### TypeScript Best Practices

```typescript
// ✅ Good: Explicit types
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick: () => void;
}

// ❌ Avoid: Using 'any'
const handleClick: any = () => {};

// ✅ Good: Proper typing for hooks
const [count, setCount] = useState<number>(0);
const [items, setItems] = useState<Item[]>([]);
```

### Tailwind CSS Best Practices

```typescript
// ✅ Good: Using Tailwind utilities
<div className="flex items-center justify-between p-4 bg-background rounded-lg">
  <span className="text-foreground font-semibold">Title</span>
</div>

// ✅ Good: Using cn() for conditional classes
<button className={cn('px-4 py-2', isActive && 'bg-primary')}>
  Click me
</button>

// ❌ Avoid: Inline styles
<div style={{ display: 'flex', padding: '16px' }}>

// ❌ Avoid: Dynamic class names
<div className={`p-${size}`}> {/* Won't work with Tailwind */}
```

### Commit Messages

Use clear, descriptive commit messages:

```
feat: Add user profile page
fix: Resolve button alignment issue
docs: Update component documentation
refactor: Simplify form validation logic
test: Add tests for auth hook
style: Format code with Prettier
```

Format: `type: description`

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `style`, `chore`

### Testing

Before submitting a PR:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build check
npm run build

# Test locally
npm run dev
```

## Pull Request Process

### Before Submitting

1. **Update your branch:**
   ```bash
   git fetch upstream
   git rebase upstream/master
   ```

2. **Run checks:**
   ```bash
   npm run type-check
   npm run lint
   npm run build
   ```

3. **Test your changes:**
   - Test locally with `npm run dev`
   - Test on different screen sizes
   - Test keyboard navigation
   - Check for accessibility issues

### Creating a Pull Request

1. Push your branch to your fork
2. Open a PR against `Edmonio2012/form-patch-frontend:master`
3. Fill in the PR template with:
   - Description of changes
   - Related issues
   - Testing performed
   - Screenshots (if applicable)

### PR Requirements

Your PR must:
- Have a clear, descriptive title
- Include detailed description of changes
- Reference related issues
- Pass all TypeScript checks
- Pass linting checks
- Have at least 1 approval
- Be up-to-date with master branch

## Common Contributions

### Creating a New Component

1. Create component file in `src/components/`
2. Use TypeScript with proper interfaces
3. Export component as named export
4. Add JSDoc comments
5. Test component locally
6. Update relevant documentation

Example:
```typescript
// src/components/Card.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card title */
  title?: string;
  /** Card content */
  children: React.ReactNode;
}

/**
 * Card component for displaying content in a contained box
 * @example
 * <Card title="My Card">
 *   <p>Card content here</p>
 * </Card>
 */
export const Card: React.FC<CardProps> = ({ title, children, className, ...props }) => {
  return (
    <div className={cn('bg-card rounded-lg p-4 shadow-sm', className)} {...props}>
      {title && <h3 className="font-bold mb-2">{title}</h3>}
      {children}
    </div>
  );
};
```

### Adding a New Page

1. Create page component in `src/pages/`
2. Add route in `src/app/App.tsx`
3. Add navigation link if needed
4. Test routing and navigation
5. Update README with page description

### Fixing a Bug

1. Create an issue describing the bug
2. Create a branch: `fix/bug-description`
3. Implement the fix
4. Add comments explaining the fix
5. Test thoroughly on different browsers/devices
6. Submit PR with issue reference

### Improving Documentation

1. Update README.md for user-facing changes
2. Add JSDoc comments to components
3. Update CONTRIBUTING.md if process changes
4. Include code examples where helpful

## Accessibility Guidelines

- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios (WCAG AA)
- Use focus indicators

## Performance Guidelines

- Lazy load images and components
- Minimize bundle size
- Use React.memo for expensive components
- Avoid unnecessary re-renders
- Use production builds for testing

## Reporting Issues

When reporting bugs:

1. **Check existing issues** first
2. **Provide reproduction steps**
3. **Include environment info:**
   - Browser and version
   - Operating system
   - Node.js version
4. **Share screenshots** if applicable
5. **Describe expected vs actual behavior**

## Review Process

- Maintainers review all PRs
- Feedback will be provided within 48 hours
- Address feedback and push updates
- PR is merged once approved

## Questions?

- Check existing issues and discussions
- Ask in PR comments
- Contact maintainers directly

---

Thank you for contributing to Form Patch! 🎉
