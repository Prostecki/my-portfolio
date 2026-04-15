---
name: Portfolio 2026 Design System
description: Styling conventions, tokens, breakpoints, and component patterns for the portfolio-2026 project
type: project
---

**Styling approach**: Tailwind CSS v4 with `@theme inline` design tokens defined in `src/app/globals.css`. Dark-mode-first with `next-themes`. Primary color is neutral in light mode and near-white in dark mode (oklch values, no violet/purple in token file despite CLAUDE.md claim).

**Token locations**: All CSS custom properties live in `src/app/globals.css` inside `:root` and `.dark` blocks. Tailwind utility classes map to these via `@theme inline`.

**Component library**: shadcn/ui primitives (Radix UI + CVA) in `src/components/ui/`. Do not modify unless extending.

**Breakpoints**: Tailwind defaults — `md` is the primary inflection point used across all section components.

**Layout pattern**: All sections use `max-w-4xl mx-auto` container with `py-24 px-4` section padding.

**Animation pattern**: Framer Motion `whileInView` + `viewport={{ once: true }}` + `useReducedMotion()` hook for respecting prefers-reduced-motion. Hero uses `useReducedMotion`; Contact and Skills do NOT — inconsistency to flag.

**Section heading pattern**: `text-3xl md:text-5xl font-bold tracking-tighter mb-4`. About and Experience add a `h-1 w-20 bg-primary` accent bar and an `aria-label` or `aria-labelledby` on the `<section>`. Skills and Contact omit both — inconsistency to flag.

**Card pattern**: `border-none shadow-2xl bg-muted/20 backdrop-blur-sm` (Contact) vs `border border-muted-foreground/10 bg-card/50` (Skills/Experience) — mixed conventions.

**Icon pattern**: Lucide icons with `aria-hidden="true"` on decorative instances.

**Button sizing**: The project's button CVA has an `xl` size (`h-12 rounded-md px-10 text-base`). Contact uses `h-12` via raw className instead of `size="xl"`, bypassing the design system.
