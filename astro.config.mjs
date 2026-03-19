// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.monfort.pro',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      serialize(item) {
        item.lastmod = item.lastmod ?? new Date().toISOString();
        return item;
      },
    }),
    expressiveCode(),
    mdx(),
  ],
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]],
  },
});
