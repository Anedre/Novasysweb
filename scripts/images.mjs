/**
 * Variantes responsive de las fotos de public/v4/img (JPG de 1400px).
 *
 * Genera, por cada foto, public/v4/img/r/<base>-<ancho>.{avif,webp,jpg} en
 * 480 / 960 / 1400 px. La carpeta r/ NO se versiona (.gitignore): se regenera
 * en `npm run build` y en `npm run dev` (predev). Es incremental: salta las
 * variantes que ya existen y son más nuevas que el original.
 *
 * Quién las consume: src/v4/Photo.jsx, que arma <picture> con srcset por
 * formato. Un móvil de 360px baja el AVIF de 480px (~15 KB) en vez del JPG
 * original (150–450 KB).
 */
import { readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'public', 'v4', 'img');
const OUT = join(SRC, 'r');

export const WIDTHS = [480, 960, 1400];
// El JPG de 1400 es el original (Vite lo copia tal cual): solo se recodifican
// los JPG chicos. AVIF con effort bajo: 3–4× más rápido y apenas más pesado.
const FORMATS = [
  ['avif', (s) => s.avif({ quality: 55, effort: 2 })],
  ['webp', (s) => s.webp({ quality: 74 })],
  ['jpg', (s) => s.jpeg({ quality: 78, mozjpeg: true, progressive: true })],
];
const CONCURRENCIA = 4;

mkdirSync(OUT, { recursive: true });

const fotos = readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f));
let hechas = 0;
let saltadas = 0;

async function procesar(f) {
  const src = join(SRC, f);
  const { name } = parse(f);
  const mtime = statSync(src).mtimeMs;
  const base = sharp(src).rotate();
  const { width: ow = 1400 } = await base.metadata();

  for (const w of WIDTHS) {
    for (const [ext, encode] of FORMATS) {
      if (ext === 'jpg' && w === WIDTHS.at(-1)) continue; // el grande es el original
      const out = join(OUT, `${name}-${w}.${ext}`);
      if (existsSync(out) && statSync(out).mtimeMs >= mtime) { saltadas++; continue; }
      // withoutEnlargement: si el original es menor, se escribe a su tamaño real
      // (el archivo debe existir igual, porque el srcset lo referencia).
      await encode(base.clone().resize({ width: Math.min(w, ow), withoutEnlargement: true })).toFile(out);
      hechas++;
    }
  }
}

// pool simple: CONCURRENCIA fotos a la vez (libvips ya paraleliza por dentro)
const cola = [...fotos];
await Promise.all(Array.from({ length: CONCURRENCIA }, async () => {
  while (cola.length) await procesar(cola.shift());
}));

console.log(`imágenes · ${fotos.length} fotos → ${hechas} variantes generadas, ${saltadas} al día (${OUT.replace(root + '/', '')})`);
