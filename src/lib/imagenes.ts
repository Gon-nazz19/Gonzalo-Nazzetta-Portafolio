import { join } from 'node:path';
import sharp from 'sharp';

/** Lee ancho y alto de una imagen de public/proyectos/<slug>/ en tiempo de build. */
export async function dimensiones(slug: string, src: string): Promise<{ width: number; height: number }> {
  const ruta = join(process.cwd(), 'public', 'proyectos', slug, src);
  try {
    const { width, height } = await sharp(ruta).metadata();
    if (!width || !height) throw new Error('sin dimensiones');
    return { width, height };
  } catch (e) {
    throw new Error(`No se pudo leer la imagen "${src}" del proyecto "${slug}" (${ruta}): ${(e as Error).message}`);
  }
}
