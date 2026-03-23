---
name: sync-translations
description: Synchronise la traduction anglaise d'un article de blog à partir de la version française. Use when the user says "sync translations", "synchronise les traductions", "traduis l'article", "update the english article", "met à jour l'article anglais", or after creating/updating a French blog post and wanting to keep the English counterpart in sync.
tools: Read, Write, Edit, Glob, Grep
---

# Sync Translations

This skill synchronises the English translation of a blog article based on its French source.

## Context

This portfolio is bilingual (FR/EN). French articles live in `src/content/blog/fr/`, English articles in `src/content/blog/en/`. Every French article must have an English counterpart with the **same filename and slug**.

Frontmatter fields: `title`, `description`, `date`, `tags[]`, `draft`, `image`, `lang`, `slug`.

## Process

### Step 1 — Identify the French source

If the user provides a filename or slug, use it directly. Otherwise, list recent French articles:

```
src/content/blog/fr/
```

Ask the user which article to sync if not specified.

### Step 2 — Read the French article

Read the full content of the French article (frontmatter + body).

### Step 3 — Check if the English counterpart exists

Look for the same filename in `src/content/blog/en/`. For example:

- FR: `src/content/blog/fr/likec4.mdx` → EN: `src/content/blog/en/likec4.mdx`
- FR: `src/content/blog/fr/missing-semester-mit.md` → EN: `src/content/blog/en/missing-semester-mit.md`

### Step 4 — Translate or update

**If the English file does NOT exist → create it:**

1. Translate the entire article (frontmatter + body) from French to English.
2. Keep the same `slug`, `date`, `tags` (translate tag labels if they are in French), `image` path, and `draft` value.
3. Set `lang: 'en-US'` in the frontmatter.
4. Preserve all code blocks, MDX components, and image references exactly as-is — only translate prose.
5. Use the same file extension (`.md` or `.mdx`).

**If the English file already exists → update it:**

1. Read the existing English file.
2. Identify what changed in the French article (new sections, updated paragraphs, changed frontmatter).
3. Apply the corresponding changes to the English file, translating new or updated French prose into English.
4. Do NOT overwrite sections that were not changed in the French source.
5. Preserve any English-specific phrasing that is already correct.

### Step 5 — Quality checks

Before writing the file, verify:

- [ ] `lang: 'en-US'` is set in the frontmatter
- [ ] `slug` matches the French article exactly
- [ ] `image` path is unchanged (images are shared in `src/content/blog/img/`)
- [ ] All code blocks are intact and unmodified
- [ ] No hardcoded French text remains in the body
- [ ] The file uses the same extension as the French source

### Step 6 — Confirm

After writing the file, report:

- What was created or updated
- Any sections that required particular attention
- Whether a `pnpm astro check` is recommended (if frontmatter schema was modified)

## Translation Guidelines

- Write natural, fluent **American English** (en-US) — not word-for-word translation.
- Preserve the author's tone (technical but accessible).
- Technical terms, tool names, and proper nouns stay in their original form.
- French quotes (`«»`) become English quotes (`""`).
- Adapt idioms and expressions so they read naturally in English.
- Section headings should be translated but keep the same structure.
