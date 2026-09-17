// Integración con ARIA (contact center de Novasys) — Ajustes → Integraciones.
//
// Dos piezas:
//   1. Botón de WhatsApp con atribución: ARIA entrega un código corto por visita
//      (lleva página + utm_*) y lo mete en el texto prellenado del wa.me. Cuando el
//      cliente escribe, el asesor ve «WhatsApp web · <campaña>».
//   2. Formulario web: POST JSON al endpoint de leads; el lead cae en su programa
//      con nombre, celular, correo y cualquier campo extra (utm_*, tipo, mensaje…).
//
// La clave es PÚBLICA (data-key del snippet); lo que protege la cuenta es la lista
// de dominios autorizados en ARIA (novasys.com.pe + el dominio de Amplify).

export const ARIA_SITE_KEY = 'wab_ea3279ebc0131b2ba4ad';
export const ARIA_WA_SCRIPT = 'https://aria.novasys.com.pe/aria-wa.js';
export const ARIA_FORM_ENDPOINT = 'https://ewueot5u74raowbl3lusqit4qy0wiiyi.lambda-url.us-east-1.on.aws/';

// Número que atiende ARIA (Ajustes → Integraciones → Botón de tu web). Sirve de
// respaldo: si el script no responde, el botón igual abre WhatsApp (sin atribución).
export const ARIA_WA_PHONE = '51908825660';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

/** utm_* presentes en la URL actual, para adjuntarlos al lead. */
export function utmFromLocation() {
  const out = {};
  try {
    const q = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach((k) => {
      const v = q.get(k);
      if (v) out[k] = v.slice(0, 120);
    });
  } catch { /* SSR / URL rara: sin utm */ }
  return out;
}

/**
 * Carga aria-wa.js una sola vez. El script marca como listos todos los
 * elementos [data-aria-wa] (y los que aparezcan después, vía MutationObserver)
 * y sigue solo la navegación de la SPA: al cambiar la ruta o el <title> pide un
 * código nuevo para la página nueva. Por eso NO ponemos data-page: un nombre
 * fijo ganaría sobre el <title> en todas las páginas.
 * Devuelve el <script> ya presente si se llamó antes.
 */
export function loadAriaWa() {
  if (typeof document === 'undefined') return null;
  const existing = document.querySelector(`script[src="${ARIA_WA_SCRIPT}"]`);
  if (existing) return existing;
  const s = document.createElement('script');
  s.src = ARIA_WA_SCRIPT;
  s.async = true;
  s.dataset.key = ARIA_SITE_KEY;
  s.dataset.phone = ARIA_WA_PHONE;
  document.head.appendChild(s);
  return s;
}

/**
 * Envía un lead al formulario web de ARIA.
 * Obligatorios: name, phone (número válido). email y el resto son opcionales y
 * se guardan como datos del lead. Lanza Error con el mensaje del servidor si falla.
 */
export async function sendAriaLead({ formId, name, phone, email, ...extra }) {
  const body = {
    key: ARIA_SITE_KEY,
    formId,
    name,
    phone,
    email,
    ...utmFromLocation(),
    ...extra,
  };
  const r = await fetch(ARIA_FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    let msg = String(r.status);
    try { msg = (await r.json()).error || msg; } catch { /* sin cuerpo */ }
    throw new Error(msg);
  }
  return r.json().catch(() => ({}));
}
