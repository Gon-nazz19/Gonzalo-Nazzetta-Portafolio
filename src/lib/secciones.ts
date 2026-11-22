import { marked } from 'marked';

/** Secciones del cuerpo Markdown de un proyecto, en el orden en que se muestran. */
export const SECCIONES = ['Desafíos técnicos', 'Solución implementada', 'Impacto', 'Metodología'] as const;

export type Seccion = { titulo: string; html: string };

const normalizar = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .toLowerCase();

/**
 * Separa el cuerpo por sus encabezados `##` y devuelve solo las secciones
 * conocidas que tienen contenido, renderizadas a HTML y en el orden de SECCIONES.
 */
export function seccionesDe(body: string | undefined): Seccion[] {
  if (!body) return [];
  const partes = new Map<string, string>();
  const bloques = body.split(/^##\s+/m).slice(1);
  for (const bloque of bloques) {
    const salto = bloque.indexOf('\n');
    const titulo = (salto === -1 ? bloque : bloque.slice(0, salto)).trim();
    const contenido = salto === -1 ? '' : bloque.slice(salto + 1).trim();
    if (contenido) partes.set(normalizar(titulo), contenido);
  }
  return SECCIONES.flatMap((titulo) => {
    const md = partes.get(normalizar(titulo));
    return md ? [{ titulo, html: marked.parse(md, { async: false }) as string }] : [];
  });
}
