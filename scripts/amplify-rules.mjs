/**
 * Genera las customRules de Amplify Hosting a partir de scripts/routes.mjs.
 *
 *   node scripts/amplify-rules.mjs            → imprime el JSON
 *   node scripts/amplify-rules.mjs --out f    → lo escribe en un archivo
 *
 * Aplicar (revisa el diff antes):
 *   aws amplify update-app --app-id d27jm76qo1m9uy --custom-rules file://reglas.json
 *
 * El orden importa: Amplify evalúa de arriba abajo y gana la primera coincidencia.
 *   1. apex → www
 *   2. passthrough de estáticos (assets, imágenes, favicons…)
 *   3. 301 de URLs del sitio anterior      ← antes que nada que las pueda tragar
 *   4. 404 de restos de WordPress/Joomla
 *   5. passthrough de cada ruta prerenderizada (sirve su index.html con <head> propio)
 *   6. catch-all → /index.html 200 (la SPA, que pinta su propio 404 con marca)
 *
 * El catch-all se queda en 200 a propósito: ponerlo en 404 daría el 404 pelado de
 * Amplify en vez del nuestro, y cualquier ruta que se nos escape se rompería. Las
 * URLs que Search Console reportó como soft 404 se resuelven arriba, con 301.
 */
import { writeFileSync } from 'node:fs';
import { PAGINAS, TODOS_LOS_REDIRECTS, GONE } from './routes.mjs';

const ESTATICOS = [
  '/assets/<*>', '/images/<*>', '/v4/<*>', '/products/<*>', '/Sounds/<*>', '/svg/<*>',
  '/apple-touch-icon.png', '/favicon-96x96.png', '/favicon.ico', '/favicon.png',
  '/favicon.svg', '/logonovasysvg.svg', '/robots.txt', '/site.webmanifest',
  '/sitemap.xml', '/vite.svg', '/web-app-manifest-192x192.png', '/web-app-manifest-512x512.png',
];

const rules = [
  { source: 'https://novasys.com.pe', target: 'https://www.novasys.com.pe', status: '301' },
  { source: 'novasys.com.pe', target: 'https://www.novasys.com.pe', status: '301' },

  ...ESTATICOS.map((s) => ({ source: s, target: s, status: '200' })),

  ...TODOS_LOS_REDIRECTS.map(([from, to]) => ({ source: from, target: to, status: '301' })),

  ...GONE.map((s) => ({ source: s, target: '/index.html', status: '404' })),

  // cada página prerenderizada se sirve desde su propio archivo
  ...PAGINAS.filter((p) => p.path !== '/').map((p) => ({
    source: p.path,
    target: `${p.path}/index.html`,
    status: '200',
  })),

  { source: '/<*>', target: '/index.html', status: '200' },
];

// red de seguridad: ninguna fuente repetida (la segunda quedaría muerta)
const vistas = new Map();
for (const r of rules) {
  if (vistas.has(r.source)) {
    throw new Error(`source duplicado: ${r.source} (${vistas.get(r.source)} y ${r.status})`);
  }
  vistas.set(r.source, r.status);
}

const json = JSON.stringify(rules, null, 2);
const outIdx = process.argv.indexOf('--out');
if (outIdx > -1 && process.argv[outIdx + 1]) {
  writeFileSync(process.argv[outIdx + 1], json, 'utf8');
  const n = (s) => rules.filter((r) => r.status === s).length;
  console.error(`${rules.length} reglas · 301:${n('301')} 200:${n('200')} 404:${n('404')} → ${process.argv[outIdx + 1]}`);
} else {
  console.log(json);
}
