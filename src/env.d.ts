/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** URL a la que el formulario de contacto hace POST (JSON). Vacía → botón mailto. */
  readonly PUBLIC_CONTACT_ENDPOINT?: string;
  /** Solo Web3Forms: access key pública que se envía como `access_key`. */
  readonly PUBLIC_CONTACT_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
