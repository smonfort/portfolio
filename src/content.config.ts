import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      slug: z.string().optional(),
      tags: z.array(z.string()).max(5).default([]),
      draft: z.boolean().default(false),
      image: image().optional(),
    }),
});

export const collections = { blog };
