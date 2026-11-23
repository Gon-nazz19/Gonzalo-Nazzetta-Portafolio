// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// El mismo repo se publica en dos lugares:
// - Vercel (define VERCEL=1 al construir): sitio en la raíz del dominio.
// - GitHub Pages: https://gon-nazz19.github.io/Gonzalo-Nazzetta-Portafolio/
const enVercel = Boolean(process.env.VERCEL);
const dominioVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export default defineConfig({
  site: enVercel && dominioVercel ? `https://${dominioVercel}` : 'https://gon-nazz19.github.io',
  base: enVercel ? '/' : '/Gonzalo-Nazzetta-Portafolio',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
