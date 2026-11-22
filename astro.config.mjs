// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages: https://gon-nazz19.github.io/Gonzalo-Nazzetta-Portafolio/
export default defineConfig({
  site: 'https://gon-nazz19.github.io',
  base: '/Gonzalo-Nazzetta-Portafolio',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
