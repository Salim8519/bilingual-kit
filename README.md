# Project Development Guidelines

## Core Principles
- **Design System First**: ALWAYS use semantic tokens from `index.css` and `tailwind.config.ts`. NEVER use direct colors (e.g., `text-white`, `bg-black`)
- **Separation of Concerns**: Keep components small, focused, and reusable
- **Type Safety**: Use TypeScript strictly - no `any` types
- **Internationalization**: Support both English and Arabic with RTL/LTR layouts

## Folder Structure Rules
Each page/component MUST follow this structure:
```
pages/[page-name]/
  ├── [page-name].tsx          # Main page component
  ├── components/              # Page-specific components
  ├── hooks/                   # Page-specific hooks
  ├── utils/                   # Page-specific utilities
  └── translations/
      ├── en.ts               # English translations
      ├── ar.ts               # Arabic translations
      └── index.ts            # Export both languages
```

## Must-Follow Rules
1. **Translations**: ALWAYS isolate translations - each component/page has its own `translations/` folder
2. **Design Tokens**: Use HSL colors only, defined in design system - no hardcoded colors
3. **Theming**: Support both light and dark modes via ThemeContext
4. **Language**: Support RTL (Arabic) and LTR (English) via LanguageContext
5. **Components**: Customize shadcn components with variants, never inline styles
6. **Semantic HTML**: Use proper HTML5 tags for accessibility and SEO
7. **Responsive**: Mobile-first approach, test all breakpoints

## Tech Stack
React 18 • TypeScript • Vite • Tailwind CSS • shadcn/ui • React Router • React Query

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/28589d60-a08b-4851-9485-3ca836afb0c5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
