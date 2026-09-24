/**
 * Normaliza los logos de clientes de los casos de éxito.
 *
 * Los originales de src/img llegan con tamaños y aires muy distintos (Entel
 * 953×715 casi cuadrado, Interbank 2560×487, Renzo Costa 1.4 MB…), así que en
 * la ficha del caso cada uno se veía de un tamaño. Aquí se recorta el margen
 * transparente/blanco y se encaja cada logo, centrado, en la MISMA caja de
 * 640×320 (2× para retina) con fondo transparente.
 *
 * Salida: src/img/casos/<slug>.webp (con alfa; Renzo Costa pasa de 1.4 MB a
 * ~30 KB) — SÍ se versiona (son ~6 archivos chicos)
 * y la consume src/data/cases.js. Se corre a mano cuando cambie un logo:
 *   node scripts/logos.mjs
 */
import { mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const IMG = join(root, 'src', 'img');
const OUT = join(IMG, 'casos');
mkdirSync(OUT, { recursive: true });

const BOX = { w: 640, h: 320 };
const LOGOS = [
  ['entel', 'entel.png'],
  ['renzo-costa', 'RenzoC.png'],
  ['pacifico', 'pacifico.svg'],
  ['interbank', 'Interbank_logo.png'],
  ['americatel', 'americatel.png'],
  ['centrum', 'centrum.png'],
];

for (const [slug, file] of LOGOS) {
  const src = join(IMG, file);
  // los SVG se rasterizan con densidad alta para que el recorte sea limpio
  const input = file.endsWith('.svg') ? sharp(src, { density: 300 }) : sharp(src);
  const recortado = await input.ensureAlpha().trim({ threshold: 12 }).toBuffer();
  const info = await sharp(recortado)
    .resize({ width: BOX.w, height: BOX.h, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 88, alphaQuality: 92 })
    .toFile(join(OUT, `${slug}.webp`));
  console.log(`${slug.padEnd(12)} ${file.padEnd(20)} → ${info.width}×${info.height} · ${(info.size / 1024).toFixed(0)} KB`);
}
