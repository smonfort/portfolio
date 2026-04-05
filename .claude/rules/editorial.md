---
paths:
  - src/content/blog/**/*.md
  - src/content/blog/**/*.mdx
---

# Editorial style

## Bilingual articles

- Every French article must have an English counterpart with the same filename and slug.
- Whenever a French article is created or updated, the English version must be updated in the same operation.
- The slug must be identical in both languages: `src/content/blog/fr/<slug>.md` and `src/content/blog/en/<slug>.md` must share the exact same filename. A different slug breaks inter-language navigation and hreflang linking.

## Typography

- **No em dashes (—) in article content.** Use a colon (`:`) when introducing a list or explanation, and a comma (`,`) for asides or contrasts. This applies to both FR and EN articles.
