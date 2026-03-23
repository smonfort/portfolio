import { defineCollection } from 'astro:content';
import type { SchemaContext } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blogSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    slug: z.string(),
    tags: z.array(z.string()).max(5).default([]),
    draft: z.boolean().default(false),
    image: image().optional(),
    lang: z.string(),
  });

const blogFr = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog/fr' }),
  schema: blogSchema,
});

const blogEn = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog/en' }),
  schema: blogSchema,
});

export const collections = { blogFr, blogEn };
