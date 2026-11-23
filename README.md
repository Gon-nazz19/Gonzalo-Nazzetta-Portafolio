# Portafolio — Gonzalo Nazzetta

Portafolio personal: ingeniería y análisis de datos, automatización de procesos.

- **Diseño:** generado con Google Stitch (referencia externa, fuera del repo: `../portfolio(1)/portfolio/design/stitch/`)
- **Contenido:** `content/perfil.md`
- **CV:** `public/cv/CV_Gonzalo_Nazzetta.pdf`
- **Stack:** Astro + Tailwind CSS, deploy en GitHub Pages con GitHub Actions

Las instrucciones de desarrollo para Claude Code están en `CLAUDE.md`.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:4321/Gonzalo-Nazzetta-Portafolio/
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

## Imágenes para compartir

`public/og-image.png` (1200×630) y `public/apple-touch-icon.png` se generan con:

```bash
node scripts/generar-imagenes.mjs
```

## Deploy

Cada push a `main` construye y publica el sitio en GitHub Pages
(`.github/workflows/deploy.yml`): https://gon-nazz19.github.io/Gonzalo-Nazzetta-Portafolio/

Requisito único en GitHub: **Settings → Pages → Source: GitHub Actions**.

## Formulario de contacto ("Trabajemos juntos")

El formulario envía un `POST` con este JSON a la URL de `PUBLIC_CONTACT_ENDPOINT`:

```json
{
  "name": "…", "email": "…", "message": "…", "phone": "… (solo si lo completan)",
  "subject": "Contacto desde el portafolio: <nombre>", "_subject": "…", "from_name": "Portafolio Gonzalo Nazzetta",
  "access_key": "… (solo si está PUBLIC_CONTACT_ACCESS_KEY)"
}
```

Lo considera enviado si la respuesta es 2xx y el JSON no trae `success: false` ni `ok: false`.
**Si `PUBLIC_CONTACT_ENDPOINT` está vacía**, no hay envío: el botón abre un `mailto:` con los datos precargados.

### Dónde se configura

- **Producción:** en GitHub, *Settings → Secrets and variables → Actions → pestaña Variables → New repository variable*.
  Crear `PUBLIC_CONTACT_ENDPOINT` (y `PUBLIC_CONTACT_ACCESS_KEY` si usás Web3Forms). El workflow las lee con `vars.*`;
  después de crearlas o cambiarlas, volver a correr el deploy (*Actions → Deploy a GitHub Pages → Run workflow*).
- **Local:** copiar `.env.example` como `.env`, completar y reiniciar `npm run dev`.

Son variables `PUBLIC_`: terminan dentro del HTML. No poner nunca una clave privada.

### Opción A — Formspree

1. Crear un formulario en https://formspree.io con nazzettagonzalo@gmail.com como destino.
2. `PUBLIC_CONTACT_ENDPOINT` = `https://formspree.io/f/<id-del-formulario>`.
3. En el panel de Formspree, restringir el dominio a `gon-nazz19.github.io`.

### Opción B — Web3Forms

1. Generar una access key en https://web3forms.com con el email de destino.
2. `PUBLIC_CONTACT_ENDPOINT` = `https://api.web3forms.com/submit`.
3. `PUBLIC_CONTACT_ACCESS_KEY` = la access key (es pública por diseño; se puede limitar por dominio en su panel).

### Opción C — Endpoint propio

Cualquier URL que acepte el JSON de arriba, responda 2xx y tenga CORS para `https://gon-nazz19.github.io`
(responder también al `OPTIONS` del preflight, porque se envía `Content-Type: application/json`).

**Cloudflare Worker** (las credenciales del proveedor de email van como *secrets* del Worker, no en el repo):

```js
export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': 'https://gon-nazz19.github.io',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST') return new Response('Método no permitido', { status: 405, headers: cors });
    const { name, email, phone, message } = await req.json();
    if (!name || !email || !message) return Response.json({ ok: false }, { status: 400, headers: cors });
    // Enviar el email con el proveedor elegido (Resend, Mailchannels, etc.) usando env.<SECRET>
    return Response.json({ ok: true }, { headers: cors });
  },
};
```

`PUBLIC_CONTACT_ENDPOINT` = `https://<worker>.<cuenta>.workers.dev`.

**Edge Function de Supabase:** misma lógica en `supabase/functions/contacto/index.ts` con `Deno.serve(...)`,
desplegada con `supabase functions deploy contacto --no-verify-jwt` (el formulario no manda token).
Puede guardar el mensaje en una tabla y/o enviar el email. `PUBLIC_CONTACT_ENDPOINT` =
`https://<proyecto>.supabase.co/functions/v1/contacto`.
