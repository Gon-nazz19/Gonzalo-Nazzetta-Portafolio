# CLAUDE.md — Portafolio de Gonzalo Nazzetta

Instrucciones para Claude Code. Respondé y escribí los commits en español.

## Objetivo

Construir el portafolio personal de Gonzalo Nazzetta (datos, análisis y
automatización de procesos) como sitio estático, rápido y accesible, a partir
del diseño generado en Google Stitch, y publicarlo en GitHub Pages.

## Dónde está cada cosa

- **Este repo** (donde está este archivo): todo el código, `content/`, `public/`. Ejecutar npm y git acá.
- **Diseño de Stitch**: está **fuera del repo**, en `../portfolio(1)/portfolio/design/stitch/` (`desktop.html` y `mobile.html`), agregada a la sesión con `--add-dir`. Es solo referencia: no copiarla al repo ni servirla.

GitHub Actions construye el sitio solo con lo que está en el repo.

## Archivos de referencia

| Ruta | Qué es | Cómo usarlo |
|---|---|---|
| `../portfolio(1)/portfolio/design/stitch/desktop.html` (fuera del repo) | Diseño de Stitch, versión escritorio | Referencia visual: layout, colores, tipografías, espaciados, efectos. NO se sirve tal cual. |
| `../portfolio(1)/portfolio/design/stitch/mobile.html` (fuera del repo) | Diseño de Stitch, versión móvil | Referencia para el comportamiento responsive. |
| `content/perfil.md` | Todo el texto del sitio | **Fuente única de verdad.** Si el texto de Stitch difiere, gana este archivo. |
| `content/proyectos/*.md` | Detalle de cada proyecto (frontmatter + descripción larga) | Content collection de Astro (ver "Proyectos con detalle desplegable"). |
| `public/proyectos/<slug>/` | Imágenes de cada proyecto | Las referencia el campo `imagenes` del `.md` correspondiente. |
| `public/cv/CV_Gonzalo_Nazzetta.pdf` | CV para descargar (referencias "a pedido") | Botón "Descargar CV". |
| `public/cv/CV_Gonzalo_Nazzetta.docx` | Fuente editable del mismo CV | No se enlaza desde el sitio. |

## Stack

- **Astro** + **Tailwind CSS** (instalado por npm, no el CDN que usa Stitch).
- Sitio 100 % estático, sin backend.
- Deploy en **GitHub Pages** con un workflow de **GitHub Actions** (`.github/workflows/deploy.yml`) que construye en cada push a `main`. Configurar `site` y `base` en `astro.config.mjs` según el nombre del repo.
- Íconos de tecnologías: paquete npm **`simple-icons`** (logos oficiales, monocromo `#4FC3F7` y color de marca al hover). **Power BI no está en simple-icons**: usar un ícono genérico de barras ascendentes, o el SVG oficial si Gonzalo lo agrega en `public/icons/powerbi.svg`. No dibujar ni inventar logos de marca.
- Íconos de interfaz: inline SVG o una librería liviana (lucide). Quitar la dependencia de Material Symbols de Google Fonts.

## Diseño (respetar lo de Stitch)

- Fondo `#0A1628`, superficies `#0F2240` / `#162D52`, primario `#1E6FFF`, acento celeste `#4FC3F7`, secundario `#00B4D8`, texto `#E6F1FF`, texto atenuado `#8BA3C7`. Pasar el `tailwind.config` de Stitch al config del proyecto.
- Tipografías: Space Grotesk (títulos), Inter (texto), JetBrains Mono (etiquetas técnicas).
- Motivos propios: curvas de nivel (scouts), gráfico de predicción con sol en el hero (paper fotovoltaico), timeline de experiencia dibujada como pipeline de datos, encabezados estilo código (`> sobre_mi.py`, `SELECT * FROM proyectos`).
- Animaciones sutiles, respetando `prefers-reduced-motion`.

## Estructura sugerida

```
src/
  layouts/Base.astro          # <head>, fuentes, meta/SEO, fondo
  components/                 # Navbar, Hero, SobreMi, Experiencia, Proyectos,
                              # Tecnologias, Publicaciones, Contacto, Footer
  data/perfil.ts              # contenido de content/perfil.md tipado
  data/habilidades.ts         # categorías, chips y metodologías
  content.config.ts           # collection "proyectos" (glob ./content/proyectos)
  pages/index.astro
public/
  cv/                         # ya existe
  og-image.png                # imagen para compartir (1200×630) — generarla con la estética del sitio
```

## Proyectos con detalle desplegable

Referencia de estilo: tarjeta oscura con borde celeste sutil y un leve brillo en la esquina superior derecha.

**Tarjeta cerrada** (de arriba hacia abajo):
- Badge con número correlativo (`01`, `02`…) en JetBrains Mono + **título** + **contexto** debajo, en texto atenuado.
- Arriba a la derecha, **ícono de GitHub** que abre `repo` en una pestaña nueva, con `aria-label="Ver repositorio de <título>"`. Si `repo` está vacío, el ícono no se muestra.
- Badge de **rol** (mayúsculas, JetBrains Mono, fondo `#1E6FFF` al 15 % y texto celeste).
- **Resumen** (`resumen`).
- **Tags** como chips chicos en mono.
- Badge de **estado** si existe (`en producción`, `publicado`, `finalizado`).
- Botón ancho **"Ver detalles ⌄"** al pie.

**Desplegado** (inline, la tarjeta crece; no modal). Secciones en este orden, cada una con un título en mayúsculas mono celeste precedido por un guion corto (`— CAPTURAS DEL SISTEMA`):
1. **Capturas del sistema**: grilla de 3 columnas (1 en móvil) con miniatura + `caption` debajo. Clic → **lightbox** a pantalla completa (flechas, contador "2 / 5", Esc para cerrar, ← → para navegar, foco atrapado).
2. **Desafíos técnicos**, 3. **Solución implementada**, 4. **Impacto**, 5. **Metodología**: salen de las secciones `##` del cuerpo Markdown con esos mismos nombres. Las listas se muestran con viñetas en forma de triángulo celeste.
6. **Botones de links** (`links`): el primero con estilo primario (gradiente `#1E6FFF → #4FC3F7`) y los demás con estilo secundario (borde), cada uno con un ícono según `tipo` (docs, repo, paper, demo, video, presentacion, api, otro).
7. Botón **"Ver menos ⌃"**.

Una sección sin contenido no se muestra: sin títulos vacíos ni placeholders.

Implementación:
- Content collection `proyectos` con el loader `glob` sobre `./content/proyectos` y esquema Zod: `titulo`, `contexto`, `rol`, `periodo`, `estado`, `orden`, `resumen`, `repo?` (url), `tags[]`, `imagenes[{src, alt, caption}]`, `links[{tipo, label, url}]`. Ordenar por `orden`; el número `01`… sale de ese orden.
- Separar el cuerpo Markdown por sus `##` para armar las secciones.
- Desplegable accesible: `<button aria-expanded aria-controls>`, transición de altura suave, respetando `prefers-reduced-motion`. Al cerrar, volver al inicio de la tarjeta si quedó fuera de pantalla.
- Imágenes con `<Image>` de Astro, `loading="lazy"`, `alt` obligatorio.
- Agregar un proyecto = un `.md` nuevo + su carpeta en `public/proyectos/<slug>/`. No hay que tocar componentes.

## Habilidades técnicas

- Sección "Habilidades técnicas" con **chips** agrupados por categoría y un **contador** junto al nombre de la categoría (estilo tarjeta oscura con borde sutil, título de categoría en JetBrains Mono celeste en mayúsculas). Lista completa en `content/perfil.md`.
- Arriba de los chips, una fila de **logos destacados** (los marcados con ★) con simple-icons.
- Al lado o debajo, una tarjeta "Metodologías y conceptos" con la lista de `content/perfil.md`.
- Los datos van en `src/data/` (no hardcodeados en el componente) para poder sumar habilidades fácilmente.

## Correcciones obligatorias sobre lo que generó Stitch

1. **Email incorrecto**: Stitch puso `gonzalonazzetta@gmail.com`. El correcto es **`nazzettagonzalo@gmail.com`**.
2. **Links genéricos**: reemplazar `https://linkedin.com` por `https://www.linkedin.com/in/gonzalo-nazzetta-b58430222` y `https://github.com` / `github.com/gonzalonazzetta` por el usuario real (ver `content/perfil.md`; si sigue en [COMPLETAR], preguntarle a Gonzalo).
3. **Formulario de contacto** (sección "Trabajemos juntos", `src/components/Contacto.astro`, antes del footer): campos nombre, email y mensaje obligatorios y celular opcional (formato argentino). Hace POST en JSON a `PUBLIC_CONTACT_ENDPOINT` (Formspree, Web3Forms con `PUBLIC_CONTACT_ACCESS_KEY`, o un endpoint propio como un Cloudflare Worker o una Edge Function de Supabase). En el deploy, ambas se leen de las Variables del repo (`vars.*`). Si el endpoint no está configurado, el botón abre un `mailto:` a nazzettagonzalo@gmail.com con los datos precargados: **nunca fingir un envío**. Mantener validación en el cliente, honeypot, estados accesibles (`aria-live`) y botón deshabilitado mientras envía. Al lado del formulario van los accesos directos a email, LinkedIn, GitHub y CV. Cómo configurarlo: ver README.
4. **Logos**: los SVG de tecnologías de Stitch pueden ser inexactos; reemplazarlos por los de `simple-icons`.
5. **Botones de proyectos**: mostrar "GitHub" / "Ver más" solo si hay URL real en `content/perfil.md`. El portal de Estudio Rosso es privado de un cliente: sin código, sin capturas con datos reales.
6. **Botón "Descargar CV"**: apunta a `/cv/CV_Gonzalo_Nazzetta.pdf` (respetando el `base` de GitHub Pages).

## Reglas de contenido

- No inventar métricas, clientes, testimonios, links ni proyectos. Lo que falta queda oculto o se pregunta.
- No publicar datos de contacto de terceros (las referentes del CV NO van en el sitio).
- Textos sin frases de relleno ("me apasiona…", "amante de…"): directos y concretos, como en `content/perfil.md`.
- Idioma del sitio: español (`<html lang="es">`).

## Calidad

- Responsive real: probar 375 px, 768 px y 1440 px.
- Accesibilidad: contraste AA, `alt`/`aria-label` en íconos, navegación con teclado, foco visible, landmarks.
- SEO: `<title>`, meta description, Open Graph y Twitter card, `sitemap`, favicon con el monograma "GN".
- Lighthouse ≥ 90 en Performance, Accessibility, Best Practices y SEO.

## Primer paso sugerido

1. Leer `../portfolio(1)/portfolio/design/stitch/desktop.html`, `../portfolio(1)/portfolio/design/stitch/mobile.html`, `content/perfil.md` y `content/proyectos/`.
2. Proponer el plan en pocas líneas y confirmarlo con Gonzalo.
3. Inicializar Astro + Tailwind dentro de `` (sin borrar `content/`, `public/` ni los archivos existentes), migrar sección por sección, y al final configurar el deploy.