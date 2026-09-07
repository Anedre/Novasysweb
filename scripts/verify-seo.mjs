/**
 * Comprueba contra producción que el contrato de SEO se cumple:
 *   · cada página prerenderizada responde 200 y trae SU título y SU canonical
 *     en el HTML crudo (sin ejecutar JS, que es lo que ven los scrapers sociales)
 *   · cada URL vieja responde 301 al destino correcto
 *
 *   node scripts/verify-seo.mjs                 → contra www.novasys.com.pe
 *   node scripts/verify-seo.mjs http://localhost:4173
 *
 * Sale con código 1 si algo no cumple, para poder encadenarlo en CI.
 */
import { ORIGIN, PAGINAS, TODOS_LOS_REDIRECTS } from './routes.mjs';

const base = (process.argv[2] || ORIGIN).replace(/\/$/, '');
const fallos = [];
let ok = 0;

const pedir = async (url, redirect) => {
  try {
    return await fetch(url, { redirect, headers: { 'user-agent': 'novasys-seo-check' } });
  } catch (e) {
    return { status: 0, error: e.message, headers: { get: () => null }, text: async () => '' };
  }
};

console.log(`\nVerificando ${base}\n`);

// 1 · páginas: 200 + head propio
for (const p of PAGINAS) {
  const url = base + p.path;
  const r = await pedir(url, 'follow');
  if (r.status !== 200) {
    fallos.push(`${p.path} → ${r.status || r.error} (se esperaba 200)`);
    continue;
  }
  const html = await r.text();
  const canonEsperado = ORIGIN + (p.canonical || p.path);
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];

  if (canon !== canonEsperado) {
    fallos.push(`${p.path} → canonical "${canon}" (se esperaba "${canonEsperado}")`);
  } else if (p.path !== '/' && /Soluciones Tecnológicas Enterprise/.test(title || '')) {
    fallos.push(`${p.path} → sigue con el título genérico del home`);
  } else {
    ok += 1;
  }
}

// 2 · redirecciones: 301 al destino correcto
for (const [from, to] of TODOS_LOS_REDIRECTS) {
  if (from.includes('<*>')) continue; // los comodines se prueban a mano
  const r = await pedir(base + from, 'manual');
  const loc = r.headers.get('location');
  if (r.status !== 301) {
    fallos.push(`${from} → ${r.status || r.error} (se esperaba 301)`);
  } else if (loc && !loc.endsWith(to)) {
    fallos.push(`${from} → 301 a "${loc}" (se esperaba "${to}")`);
  } else {
    ok += 1;
  }
}

console.log(`${ok} comprobaciones correctas`);
if (fallos.length) {
  console.log(`\n${fallos.length} FALLOS:\n`);
  fallos.forEach((f) => console.log('  ✗ ' + f));
  process.exit(1);
}
console.log('Todo en orden.\n');
