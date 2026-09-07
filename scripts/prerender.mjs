/**
 * Prerender del <head> por ruta. Se ejecuta después de `vite build`.
 *
 * Problema que resuelve: el sitio es una SPA, así que el HTML que sale del
 * servidor es siempre el mismo index.html — con el título, la descripción y el
 * canonical del home. Googlebot ejecuta JS y lo corrige, pero los scrapers
 * sociales (WhatsApp, LinkedIn, Facebook, Slack) NO: cualquier enlace del sitio
 * se previsualizaba como la home.
 *
 * Este script escribe dist/<ruta>/index.html con el <head> correcto de cada
 * página. El <body> sigue siendo el shell de la SPA: React monta encima como
 * siempre, así que no hay hidratación ni riesgo de desajuste.
 *
 * Los títulos y descripciones se extraen del Helmet de cada página para no
 * duplicar el copy. Si el patrón deja de reconocerse, el script FALLA — es a
 * propósito: mejor romper el build que publicar metadatos equivocados.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ORIGIN, PAGINAS } from './routes.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Saca <title> y la meta description del Helmet de un componente de página. */
function metadatosDe(srcRel) {
  const file = join(root, srcRel);
  if (!existsSync(file)) throw new Error(`no existe el componente ${srcRel}`);
  const s = readFileSync(file, 'utf8');

  const t = s.match(/<title>([^<{]+)<\/title>/);
  const d =
    s.match(/<meta\s+name="description"\s+content="([^"]+)"/s) ||
    s.match(/name="description"\s*\n?\s*content="([^"]+)"/s);

  if (!t || !d) {
    throw new Error(
      `no pude extraer title/description de ${srcRel}. ` +
      'Si el Helmet cambió de forma, ajusta scripts/prerender.mjs o pon title/desc explícitos en scripts/routes.mjs.',
    );
  }
  return { title: t[1].trim(), desc: d[1].replace(/\s+/g, ' ').trim() };
}

const base = readFileSync(join(dist, 'index.html'), 'utf8');
if (!base.includes('rel="canonical"')) {
  throw new Error('dist/index.html no trae <link rel="canonical">: revisa index.html');
}

let escritas = 0;
const resumen = [];

for (const p of PAGINAS) {
  const { title, desc } = p.src ? metadatosDe(p.src) : { title: p.title, desc: p.desc };
  if (!title || !desc) throw new Error(`ruta ${p.path} sin title/desc`);

  const url = ORIGIN + (p.canonical || p.path);
  const html = base
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(desc)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(desc)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`);

  const salida = p.path === '/' ? join(dist, 'index.html') : join(dist, p.path, 'index.html');
  mkdirSync(dirname(salida), { recursive: true });
  writeFileSync(salida, html, 'utf8');
  escritas += 1;
  resumen.push(`${p.path.padEnd(38)} ${title.slice(0, 62)}`);
}

console.log(`\nprerender · ${escritas} rutas con <head> propio\n`);
console.log(resumen.join('\n'));
console.log('');
