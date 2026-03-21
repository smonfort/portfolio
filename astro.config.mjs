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
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
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
    expressiveCode({ themes: ['github-dark-default'] }),
    mdx(),
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
          content: {
            type: 'element',
            tagName: 'span',
            properties: { className: ['sr-only'] },
            children: [{ type: 'text', value: " (s'ouvre dans un nouvel onglet)" }],
          },
        },
      ],
    ],
  },
});
