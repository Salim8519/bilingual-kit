## للمطورين العرب 
هذا التطبيق قالب شامل يحل معظم مشاكل نماذج اللغة الكبيرة (LLMs) مثل مشاكل RTL، عدم اتباع أنماط البرمجة الصحيحة، والتحكم المركزي في الثيم واللغة. انسخ هذا القالب والقواعد، وابدأ ڤايب كودنج! 🚀


Try it out: https://react-bilingual.netlify.app/

**Common LLM Mistakes to Avoid:**
- Using `text-white`, `bg-white`, `text-black` directly instead of semantic design tokens
- Not considering responsive design for mobile (always test layouts on small screens)
- Improper quote escaping in JSX strings (use double quotes for strings with apostrophes)
- Ignoring RTL support and Arabic text rendering


# Architecture: Single-Responsibility Principle (SRP) Template

This app is mobile friendly first, and seniro poeple friendly too.

## Core Architecture Principles
### 1. Global Context System

```tsx
// Single source of truth for language & theme
LanguageContext → { language: 'en' | 'ar', dir: 'ltr' | 'rtl' }
ThemeContext    → { theme: 'light' | 'dark' }
GlobalAlertContext → showAlert({ title, message, confirmText, type, buttonDelay, onConfirm })
```

- **ONE** global language provider controls all translations
- **ONE** global theme provider controls light/dark mode
- **GlobalAlert**: Use `useGlobalAlert().showAlert()` for confirmation dialogs with timed buttons (default 1s delay). Supports `type: 'danger' | 'warning' | 'info'` and custom `buttonDelay` (0 = instant).
- **Storage**: Use `useSessionStorage(key, default)` or `useIndexedDB(key, default)` for client-side data with 2 lines of code. Direct access: `storage.session.set/get()` or `storage.indexed.set/get()`.
- ALL pages and components consume via hooks: `useLanguage()`, `useTheme()`, `useGlobalAlert()`

### 2. Strict Folder Structure (MANDATORY)

```
src/
├── pages/[feature]/              # Each page is isolated
│   ├── [feature].tsx             # ORCHESTRATOR ONLY - composes components
│   ├── components/               # Feature-specific UI components
│   ├── hooks/                    # Feature-specific custom hooks
│   ├── utils/                    # Feature-specific utilities
│   └── translations/
│       ├── en.ts                 # English translations object
│       ├── ar.ts                 # Arabic translations object
│       └── index.ts              # Export translations[language]
│
└── shared/                       # Cross-feature reusables
    ├── components/[Component]/   # Same structure as pages
    │   ├── [Component].tsx
    │   ├── components/
    │   ├── hooks/
    │   ├── utils/
    │   └── translations/
    │       ├── en.ts
    │       ├── ar.ts
    │       └── index.ts
    ├── context/                  # Global contexts (Language, Theme)
    ├── config/                   # Navigation, constants
    └── hooks/                    # Global hooks
```

### 3. Orchestrator Pattern (CRITICAL)

```tsx
// ❌ WRONG - Business logic in page file
export default function Dashboard() {
  const [data, setData] = useState([]);
  const handleSubmit = () => { /* logic */ };
  return <div>...</div>;
}

// ✅ CORRECT - Page is pure composition
export default function Dashboard() {
  return (
    <AppLayout>
      <StatsGrid />
      <RecentActivity />
    </AppLayout>
  );
}
```

- Page files ONLY import and arrange components
- NO hooks, logic, or translations in main page file
- Extract ALL logic → components/, hooks/, utils/

### 4. Translation System (STRICT)

```tsx
// pages/dashboard/translations/en.ts
export const dashboardTranslations = {
  title: "Dashboard",
  welcome: "Welcome back"
};

// pages/dashboard/translations/ar.ts
export const dashboardTranslations = {
  title: "لوحة التحكم",
  welcome: "مرحبا بعودتك"
};

// Usage in component
const { language } = useLanguage();
const t = translations[language];
return <h1>{t.title}</h1>;
```

- NEVER hardcode strings - use translation objects
- EVERY key in `en.ts` MUST exist in `ar.ts`
- Test RTL layout for Arabic (`dir="rtl"`)

### 5. Design System (NO EXCEPTIONS)

```tsx
// ❌ FORBIDDEN
<Button className="bg-blue-500 text-white">

// ✅ REQUIRED
<Button variant="default">  // Uses semantic tokens from index.css
```

- Colors: HSL format in `index.css` → use semantic tokens (`primary`, `foreground`)
- NO direct colors: `text-white`, `bg-[#hex]`, `text-gray-500`
- Customize shadcn components via variants, not inline classes

## Navigation Architecture

- **Desktop**: Sidebar from `shared/components/AppLayout/components/DesktopSidebar.tsx`
- **Mobile**: Hamburger menu from `shared/components/AppLayout/components/MobileHeader.tsx`
- **Config**: Both read from `shared/config/navigation.ts` (single source)

## TypeScript Rules

- NO `any` types - use proper interfaces
- Define types for: props, API responses, context values, hooks return
- Use discriminated unions for complex state

## Tech Stack

React 18 • TypeScript 5 • Vite • Tailwind CSS • Radix UI (shadcn) • React Router 6

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
