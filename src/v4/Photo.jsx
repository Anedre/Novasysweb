/** Carpeta pública de fotos v4 (partials.jsx la reexporta). */
export const IMG = '/v4/img/';

/** Anchos que genera scripts/images.mjs (espejo de WIDTHS). */
const WIDTHS = [480, 960, 1400];

// el JPG de 1400 es el original (no hay copia en r/); ver scripts/images.mjs
const variante = (base, w, ext) => (ext === 'jpg' && w === WIDTHS.at(-1) ? `${IMG}${base}.jpg` : `${IMG}r/${base}-${w}.${ext}`);
const srcset = (base, ext) => WIDTHS.map((w) => `${variante(base, w, ext)} ${w}w`).join(', ');

/**
 * Foto de public/v4/img con variantes responsive (AVIF → WebP → JPG) y
 * srcset por ancho. Se usa igual que un <img>: `src` es solo el nombre del
 * archivo (p. ej. '045-meeting.jpg'); el resto de props (className, alt,
 * data-plx, loading…) pasan al <img>, así los selectores CSS existentes
 * (`.cl img`, `.svc-ph img`…) siguen aplicando.
 *
 * `sizes` describe cuánto ocupa la foto en pantalla para que el navegador
 * escoja el ancho justo. Por defecto: ancho completo en móvil, media
 * columna en escritorio (el caso más común en el sitio).
 *
 * Si `src` no es un JPG del catálogo (SVG, PNG) se renderiza un <img> normal.
 */
export default function Photo({ src, sizes = '(max-width: 900px) 100vw, 50vw', loading = 'lazy', decoding = 'async', ...rest }) {
  const m = /^(.+)\.jpe?g$/i.exec(src);
  // SVG/PNG chicos (isotipo, marcas): <img> tal cual, sin lazy implícito
  if (!m) return <img src={IMG + src} decoding={decoding} {...rest} />;
  const base = m[1];
  return (
    <picture>
      <source type="image/avif" srcSet={srcset(base, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(base, 'webp')} sizes={sizes} />
      <img
        src={IMG + src}
        srcSet={srcset(base, 'jpg')}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
        {...rest}
      />
    </picture>
  );
}
