# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

Single-page portfolio built with **Next.js 16 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

**Page structure** (`src/app/page.tsx`): One root page composing section components in order — `Header`, `Hero`, `About`, `Experience`, `Skills`, `Projects`, `Contact`. All sections are anchored by `id` for smooth-scroll navigation (`html { scroll-behavior: smooth }` in `globals.css`).

**Section components** live in `src/components/sections/`. Each is a self-contained `"use client"` component with its own hardcoded data (no external data fetching). To add or update content (projects, experience entries, skills), edit the relevant section file directly.

**UI components** in `src/components/ui/` are shadcn/ui primitives (Radix UI + CVA). The `Button` component has been extended beyond shadcn defaults with extra sizes: `xs`, `xl`, `icon-xs`, `icon-sm`, `icon-lg`.

**Theming**: dark mode by default via `next-themes`. CSS variables are defined in `globals.css` using Tailwind v4's `@theme inline` block. The palette is monochromatic — `--primary` is near-white in dark mode and near-black in light mode (chroma `0`, no hue). A companion `--primary-rgb` variable is maintained manually alongside `--primary` for use in `rgba()`/gradient contexts (e.g. the radial gradient in `page.tsx`). Theme-aware classes use `dark:` variants or `resolvedTheme` from `useTheme()`.

**Header** (`src/components/layout/Header.tsx`): Fixed header that transitions to frosted glass (`backdrop-blur-md bg-background/80`) once the user scrolls past 20px. Nav links are anchor links to section IDs.

**Background animation** (`src/components/visuals/BackgroundCanvas.tsx`): A Three.js star field rendered via `@react-three/fiber`. Only mounts client-side (guarded by a `mounted` state) to avoid SSR hydration issues. Currently rendered inside the `Hero` section.

**Contact API** (`src/app/api/contact/route.ts`): POST endpoint that forwards form submissions to a Telegram bot. Requires `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env.local`. Success/error feedback is surfaced via Sonner toast (`src/components/ui/sonner.tsx`).

**Animations**: Framer Motion with `whileInView` + `viewport={{ once: true }}` pattern throughout sections for scroll-triggered entrance animations. `useReducedMotion()` is used in `Hero` to disable looping animations when the OS accessibility setting is active.

**Fonts**: Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`) loaded via `next/font/google` in `src/app/layout.tsx`.

**Path alias**: `@/` maps to `src/` (configured in `tsconfig.json`).
