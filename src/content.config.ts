import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const urlOVacio = z.union([z.url(), z.literal('')]);

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/proyectos' }),
  schema: z.object({
    titulo: z.string(),
    contexto: z.string(),
    rol: z.string(),
    periodo: z.string(),
    estado: z.string().optional(),
    orden: z.number(),
    resumen: z.string(),
    repo: urlOVacio.optional().default(''),
    tags: z.array(z.string()).default([]),
    imagenes: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().min(1, 'Cada imagen necesita un alt'),
          caption: z.string().optional(),
        }),
      )
      .default([]),
    links: z
      .array(
        z.object({
          tipo: z.enum(['docs', 'repo', 'paper', 'demo', 'video', 'presentacion', 'api', 'otro']),
          label: z.string(),
          url: z.url(),
        }),
      )
      .default([]),
  }),
});

export const collections = { proyectos };
