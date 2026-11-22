# Portafolio — Gonzalo Nazzetta

Portafolio personal: ingeniería y análisis de datos, automatización de procesos.

- **Diseño:** generado con Google Stitch (referencia externa, fuera del repo: `../portfolio(1)/portfolio/design/stitch/`)
- **Contenido:** `content/perfil.md`
- **CV:** `public/cv/CV_Gonzalo_Nazzetta.pdf`
- **Stack previsto:** Astro + Tailwind CSS, deploy en GitHub Pages con GitHub Actions

Las instrucciones de desarrollo para Claude Code están en `CLAUDE.md`.

## Desarrollo local (una vez inicializado el proyecto)

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Agregar o editar un proyecto

1. Crear `content/proyectos/<slug>.md` copiando uno existente.
2. Completar el frontmatter: `titulo`, `contexto`, `rol`, `periodo`, `estado`, `orden`, `resumen`, `tags`.
3. `repo`: URL del repositorio (activa el ícono de GitHub de la tarjeta). Vacío = no se muestra.
4. Imágenes: guardarlas en `public/proyectos/<slug>/` y listarlas en `imagenes`:
   `{ src: "panel.png", alt: "Panel principal", caption: "Panel de control principal" }`
5. Botones: `links` con `{ tipo: "docs", label: "Documentación Técnica", url: "https://..." }`.
   Tipos: `docs`, `repo`, `paper`, `demo`, `video`, `presentacion`, `api`, `otro`. El primero se ve como botón principal.
6. Cuerpo: secciones `## Desafíos técnicos`, `## Solución implementada`, `## Impacto`, `## Metodología`. Las que no estén no se muestran.
