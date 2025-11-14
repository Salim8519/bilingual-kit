# Development Standards & Architecture

## Critical Rules (MUST FOLLOW)

### 1. Design System - NO EXCEPTIONS
```tsx
// ❌ WRONG - Direct color usage
<div className="text-white bg-black border-gray-500">

// ✅ CORRECT - Semantic tokens only
<div className="text-foreground bg-background border-border">
```
- ALL colors MUST be HSL format in `index.css`
- NEVER use hardcoded colors (`text-white`, `bg-[#fff]`, `text-gray-500`)
- Define new colors in design system first, then use them
- Use `tailwind.config.ts` to extend theme with semantic tokens

### 2. File Structure (STRICT)
```
pages/[feature]/
  ├── [feature].tsx           # Page entry point
  ├── components/             # Feature-specific components ONLY
  ├── hooks/                  # Feature-specific hooks
  ├── utils/                  # Feature-specific utilities
  └── translations/
      ├── en.ts              # English translations
      ├── ar.ts              # Arabic translations  
      └── index.ts           # Must export both languages
```
- NEVER mix page logic with components
- NEVER import from sibling page folders - use `shared/`
- Each translation key MUST exist in both `en.ts` AND `ar.ts`

### 3. TypeScript (ZERO TOLERANCE)
```tsx
// ❌ FORBIDDEN
const data: any = response;
function handleClick(e: any) { }

// ✅ REQUIRED
interface ApiResponse { id: string; name: string; }
const data: ApiResponse = response;
function handleClick(e: React.MouseEvent<HTMLButtonElement>) { }
```
- NO `any` types - use `unknown` if truly unknown, then type-guard
- ALWAYS define interfaces for props, API responses, context values
- Use discriminated unions for complex state

### 4. Internationalization (MANDATORY)
- EVERY text string MUST go through translation system
- Test ALL features in both LTR (en) and RTL (ar) modes
- Never assume left-to-right layout
- Use `isRTL` checks for directional logic

### 5. Context Usage
```tsx
// ✅ ALWAYS use these contexts
const { language, setLanguage, dir } = useLanguage();
const { theme, toggleTheme } = useTheme();
```
- NEVER localStorage.getItem directly for theme/language
- Use context hooks for consistent state management

## Common Mistakes to AVOID

1. **Button Variants**: Customize in design system, not inline
2. **String Escaping**: Use `"text"` not `'text'` when text contains apostrophes
3. **Import Paths**: Use `@/` alias, never relative paths like `../../../`
4. **Component Size**: Max 200 lines - split if larger
5. **Responsive Design**: Test mobile (375px), tablet (768px), desktop (1440px)

## Tech Stack
React 18.3 • TypeScript 5 • Vite 5 • Tailwind CSS 3 • Radix UI • React Router 6 • TanStack Query 5

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm run dev

# Type checking
npm run build

# Lint code
npx eslint src/
```

## Project URL
https://lovable.dev/projects/28589d60-a08b-4851-9485-3ca836afb0c5
