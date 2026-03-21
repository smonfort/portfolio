# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm format       # Format all files with Prettier
pnpm format:check # Check formatting without writing
```

No test suite is configured.

## Architecture

Static portfolio site built with **Astro 6** + **Tailwind CSS v4** (via `@tailwindcss/vite` Vite plugin — no `tailwind.config.js`). Deployed to Vercel.

### Internationalisation (i18n)

The site is bilingual: **FR** (default, at root `/`) and **EN** (at `/en/`). Astro i18n routing is configured in `astro.config.mjs` with `prefixDefaultLocale: false`.

**Translation files:**

- `src/i18n/fr.ts` — source of truth; exports `type Translations = typeof fr`
- `src/i18n/en.ts` — implements `Translations`, covers all the same keys
- `src/i18n/index.ts` — exports `Lang`, `useTranslations(lang)`, `getLangBase(lang)`, `getNavLinks(lang)`, `getAltLang(lang)`, `getAltLangPath(lang, pathname)`

**Data (language-agnostic):**

- `src/data/expertises.ts` — skills/certifications with SVG/icon keys; display names live in translations
- `src/data/personSchema.ts` — `getPersonSchema(siteUrl, lang)` builds the JSON-LD Person schema

**Rules:**

- All user-visible strings must go through `useTranslations(lang)` — never hardcode FR or EN text in components
- Homepage components all accept a `lang?: Lang` prop and default to `'fr'`
- `Layout.astro` and `BlogLayout.astro` both accept `lang?: Lang` and emit `hreflang` alternates + correct `<html lang>`

### Content Layer (Astro 5+ API)

Blog posts are split by locale:

- `src/content/blog/fr/` — French articles
- `src/content/blog/en/` — English articles
- `src/content/blog/img/` — Shared images (do **not** duplicate across locale folders)

**Every French article must have an English counterpart** with the same filename and slug. Whenever a French article is created or updated, the English version must be updated accordingly in the same operation.

Two collections are defined in `src/content.config.ts`: `blogFr` and `blogEn`, with identical schemas. Frontmatter fields: `title`, `description`, `date`, `tags[]`, `draft`, `image` (optional, processed by `astro:assets`).

- `z` is imported from `astro:content` (not `astro/zod`)
- Posts use `post.id` for URL slugs (not `post.slug`)
- Rendering uses standalone `render(post)` from `astro:content` (not `post.render()`)
- Markdown image paths reference `../img/` (relative from the `fr/` or `en/` subfolder)

### Pages & Layouts

- `src/pages/index.astro` — FR homepage; all strings via `useTranslations('fr')`
- `src/pages/en/index.astro` — EN homepage; all strings via `useTranslations('en')`
- `src/pages/blog/index.astro` — FR blog listing
- `src/pages/blog/[slug].astro` — FR blog post (`getCollection('blogFr')`, `getStaticPaths`)
- `src/pages/en/blog/index.astro` — EN blog listing
- `src/pages/en/blog/[slug].astro` — EN blog post (`getCollection('blogEn')`, `getStaticPaths`)
- `src/pages/en/404.astro` — EN 404 page
- `src/layouts/Layout.astro` — Base HTML shell; emits `hreflang` alternates, `<html lang>`, passes `lang` to Nav
- `src/layouts/BlogLayout.astro` — Wraps `Layout`; article header with date, share buttons, prev/next nav, giscus comments — all strings via translations

### Components

- `src/components/Nav.astro` — Fixed nav with language switcher (desktop badge + mobile menu entry)
- `src/components/homepage/` — Hero, About, Skills, Experience, BlogPreview, Contact — all accept `lang?: Lang`
- `src/components/blog/PostCard.astro` — Vertical card; accepts `dateLocale` prop
- `src/components/blog/PostListItem.astro` — Horizontal list item; accepts `dateLocale` prop

### Integrations

- `@astrojs/sitemap` — auto-generated sitemap
- `rehype-external-links` — adds `target="_blank" rel="noopener noreferrer"` to external links in Markdown

### Code quality

Pre-commit hook (Husky + lint-staged) runs Prettier on staged `*.{js,ts,astro,css,md,json}` files.

**Always use TypeScript path aliases for imports** — never relative paths when an alias covers the target:

- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@i18n/*` → `src/i18n/*`
- `@data/*` → `src/data/*`
- `@utils/*` → `src/utils/*`

**Avoid duplicating logic between FR and EN versions.** The FR and EN pages are intentionally symmetric — any logic shared between them must be factored out:

- Shared UI → Astro component accepting a `lang?: Lang` prop (e.g. `BlogListing.astro`)
- Shared computation → utility function in `src/utils/` (e.g. `getReadingTime`)
- Shared data → `src/data/` (e.g. `expertises.ts`, `personSchema.ts`)

**The project must always typecheck without errors.** Run `pnpm astro check` to verify. Any code change must preserve a clean TypeScript compilation.
