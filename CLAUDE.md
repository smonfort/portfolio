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

### Content Layer (Astro 5+ API)

Blog posts live in `src/content/blog/*.md`. The schema is defined in `src/content.config.ts` using the Content Layer API (`loader: glob(...)` from `astro/loaders`). Frontmatter fields: `title`, `description`, `date`, `tags[]`, `draft`, `image` (optional, processed by `astro:assets`).

- `z` is imported from `astro:content` (not `astro/zod`)
- Posts use `post.id` for URL slugs (not `post.slug`)
- Rendering uses standalone `render(post)` from `astro:content` (not `post.render()`)

### Pages & Layouts

- `src/pages/index.astro` — Single-page portfolio (hero, about, skills, experience, blog preview, contact). All data is hardcoded inline in the frontmatter script block.
- `src/pages/blog/index.astro` — Blog listing
- `src/pages/blog/[slug].astro` — Blog post (uses `getStaticPaths`)
- `src/layouts/Layout.astro` — Base HTML shell with Nav + Footer, Google Fonts (Inter)
- `src/layouts/BlogLayout.astro` — Wraps `Layout`, adds article header with date/tags/LinkedIn share button and Utterances comments

### Integrations

- `@astrojs/sitemap` — auto-generated sitemap
- `rehype-external-links` — adds `target="_blank" rel="noopener noreferrer"` to external links in Markdown

### Code quality

Pre-commit hook (Husky + lint-staged) runs Prettier on staged `*.{js,ts,astro,css,md,json}` files.
