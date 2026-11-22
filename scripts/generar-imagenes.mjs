// Genera public/og-image.png (1200×630) y public/apple-touch-icon.png (180×180)
// con la estética del sitio. Uso: node scripts/generar-imagenes.mjs
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const topo = [
  'M-50 120 C 80 60, 190 180, 320 110 C 440 45, 520 150, 650 90',
  'M-50 175 C 95 110, 200 230, 335 160 C 460 95, 535 200, 650 140',
  'M-50 230 C 110 165, 210 285, 350 215 C 475 150, 550 250, 650 195',
  'M-50 320 C 70 390, 180 280, 300 350 C 420 420, 510 310, 650 370',
  'M-50 375 C 85 445, 195 335, 315 405 C 435 475, 525 365, 650 425',
]
  .map((d) => `<path d="${d}"/>`)
  .join('');

const fuente = "'Space Grotesk', 'Segoe UI', Arial, sans-serif";
const mono = "'JetBrains Mono', Consolas, 'Courier New', monospace";

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="sol" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4FC3F7" stop-opacity="0.4"/>
      <stop offset="60%" stop-color="#1E6FFF" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0A1628" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="banda" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4FC3F7" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#4FC3F7" stop-opacity="0.24"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0A1628"/>
  <g fill="none" stroke="#4FC3F7" stroke-opacity="0.08" transform="scale(2 1.05)">${topo}</g>
  <g stroke="#253144" stroke-dasharray="4 6">
    <line x1="620" y1="200" x2="1160" y2="200"/><line x1="620" y1="300" x2="1160" y2="300"/><line x1="620" y1="400" x2="1160" y2="400"/>
  </g>
  <circle cx="1010" cy="170" r="90" fill="url(#sol)"/>
  <circle cx="1010" cy="170" r="28" fill="#0F2240" stroke="#4FC3F7" stroke-opacity="0.7" stroke-width="2"/>
  <path d="M820 360 C 880 320, 940 220, 1010 215 C 1080 210, 1120 260, 1160 240 L 1160 330 C 1120 350, 1080 300, 1010 290 C 940 285, 880 360, 820 390 Z" fill="url(#banda)"/>
  <path d="M620 470 C 680 450, 720 390, 770 410 C 800 420, 810 380, 820 375" fill="none" stroke="#1E6FFF" stroke-width="4" stroke-linecap="round"/>
  <path d="M820 375 C 880 340, 940 252, 1010 252 C 1080 252, 1120 300, 1160 285" fill="none" stroke="#4FC3F7" stroke-width="3.5" stroke-dasharray="9 8" stroke-linecap="round"/>
  <circle cx="820" cy="375" r="7" fill="#4FC3F7"/>

  <rect x="80" y="90" width="72" height="72" rx="12" fill="#0F2240" stroke="#4FC3F7" stroke-opacity="0.45" stroke-width="2"/>
  <text x="116" y="138" text-anchor="middle" font-family="${fuente}" font-size="32" font-weight="700" fill="#4FC3F7">GN</text>
  <text x="80" y="270" font-family="${fuente}" font-size="68" font-weight="700" fill="#E6F1FF">Gonzalo Nazzetta</text>
  <text x="80" y="330" font-family="${fuente}" font-size="32" font-weight="600" fill="#4FC3F7">Ingeniería y Análisis de Datos</text>
  <text x="80" y="372" font-family="${fuente}" font-size="32" font-weight="600" fill="#4FC3F7">Automatización de Procesos</text>
  <text x="80" y="540" font-family="${mono}" font-size="22" fill="#8BA3C7">UTN FRSF · Freyre, Córdoba, Argentina</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile('public/og-image.png');

const favicon = await readFile('public/favicon.svg');
await sharp(favicon, { density: 400 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');

console.log('Listo: public/og-image.png y public/apple-touch-icon.png');
