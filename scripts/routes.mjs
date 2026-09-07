/**
 * Fuente única de verdad para SEO de infraestructura.
 *
 * La usan dos consumidores:
 *   · scripts/prerender.mjs      → escribe un index.html por ruta con su <head> real
 *   · scripts/amplify-rules.mjs  → genera las customRules (301 y passthrough) de Amplify
 *
 * Si agregas una ruta en src/router.jsx, agrégala también aquí: si no, la página
 * queda sin metadatos propios para los scrapers sociales (que no ejecutan JS).
 */

export const ORIGIN = 'https://www.novasys.com.pe';

/** Casos: slug → cliente y proyecto (espejo de src/data/cases.js). */
export const CASOS = [
  ['entel', 'Entel', 'Contact center cloud con Amazon Connect'],
  ['renzo-costa', 'Renzo Costa', 'CRM y Business Intelligence para retail'],
  ['pacifico', 'Pacífico Seguros', 'Automatización de procesos para seguros'],
  ['interbank', 'Interbank', 'Business Intelligence avanzado para banca'],
  ['americatel', 'Americatel', 'Migración cloud y modernización'],
  ['centrum', 'Centrum PUCP', 'Plataforma analítica para educación ejecutiva'],
];

/** Fichas Oracle: slug → nombre del producto (espejo de src/data/tecnologias.jsx). */
export const TECNOLOGIAS = [
  ['oracle-sales-cloud', 'Oracle Sales Cloud'],
  ['oracle-service-cloud', 'Oracle Service Cloud'],
  ['oracle-siebel', 'Oracle Siebel CRM'],
  ['oracle-cpq', 'Oracle CPQ'],
  ['oracle-eloqua', 'Oracle Eloqua'],
  ['oracle-responsys', 'Oracle Responsys'],
  ['oracle-bluekai', 'Oracle BlueKai DMP'],
  ['oracle-business-intelligence', 'Oracle Business Intelligence'],
  ['oracle-paas', 'Oracle PaaS'],
];

/**
 * Páginas reales. `src` apunta al componente del que se extraen <title> y la
 * meta description del Helmet; si falta, se usan `title` y `desc` de aquí.
 */
export const PAGINAS = [
  { path: '/', src: 'src/v4/pages/HomeV4.jsx' },
  { path: '/nosotros', src: 'src/v4/pages/NosotrosV4.jsx' },
  { path: '/contacto', src: 'src/v4/pages/ContactoV4.jsx' },
  { path: '/eventos', src: 'src/v4/pages/EventosV4.jsx' },

  { path: '/soluciones', src: 'src/v4/pages/SolucionesV4.jsx' },
  { path: '/soluciones/aria', src: 'src/v4/pages/AriaV4.jsx' },
  { path: '/soluciones/crm-ventas', src: 'src/v4/pages/CrmVentasV4.jsx' },
  { path: '/soluciones/gestion-documental', src: 'src/v4/pages/GestionDocumentalV4.jsx' },
  { path: '/soluciones/business-intelligence', src: 'src/v4/pages/BusinessIntelligenceV4.jsx' },
  { path: '/soluciones/marketing-automation', src: 'src/v4/pages/MarketingAutomationV4.jsx' },
  { path: '/soluciones/software-a-medida', src: 'src/v4/pages/SoftwareMedidaV4.jsx' },
  // alias que renderizan la página de su línea (canonical apunta a la canónica)
  { path: '/soluciones/amazon', src: 'src/v4/pages/CloudV4.jsx', canonical: '/cloud' },
  { path: '/soluciones/hp', src: 'src/v4/pages/InfraV4.jsx', canonical: '/infraestructura' },
  { path: '/soluciones/novasys', src: 'src/v4/pages/SolucionesV4.jsx', canonical: '/soluciones' },

  { path: '/cloud', src: 'src/v4/pages/CloudV4.jsx' },
  { path: '/cloud/amazon-connect', src: 'src/v4/pages/AmazonConnectV4.jsx' },
  { path: '/cloud/connect-dialer', src: 'src/v4/pages/ConnectDialerV4.jsx' },
  { path: '/cloud/sagemaker', src: 'src/v4/pages/SageMakerV4.jsx' },
  { path: '/cloud/migracion', src: 'src/v4/pages/MigracionCloudV4.jsx' },

  { path: '/infraestructura', src: 'src/v4/pages/InfraV4.jsx' },
  // InfraProductV4 sirve las tres con un Helmet por plantilla (espejo de
  // src/data/infrastructure.jsx), así que aquí van explícitas.
  {
    path: '/infraestructura/computo',
    title: 'Equipos de Cómputo HP — Distribuidor HP | Novasys del Perú',
    desc: 'PCs, laptops y workstations HP para productividad empresarial. Stock en Lima, garantía on-site y dimensionamiento sobre carga real — Distribuidor HP en el Perú.',
  },
  {
    path: '/infraestructura/servidores',
    title: 'Servidores HPE ProLiant — Distribuidor HPE | Novasys del Perú',
    desc: 'Servidores ProLiant y soluciones HPE Synergy para data center. Stock en Lima, garantía on-site y dimensionamiento sobre carga real — Distribuidor HPE en el Perú.',
  },
  {
    path: '/infraestructura/almacenamiento',
    title: 'Almacenamiento HPE Alletra — Distribuidor HPE | Novasys del Perú',
    desc: 'Storage enterprise HPE Alletra y Nimble para datos críticos de negocio. Stock en Lima, garantía on-site y dimensionamiento sobre carga real — Distribuidor HPE en el Perú.',
  },

  { path: '/tecnologias', src: 'src/v4/pages/TecnologiasHubV4.jsx' },
  { path: '/casos-de-exito', src: 'src/v4/pages/CasosV4.jsx' },

  // Legales — títulos explícitos: el Helmet los arma con plantillas.
  {
    path: '/legal/privacidad',
    title: 'Política de privacidad | Novasys del Perú S.A.C.',
    desc: 'Política de privacidad de Novasys del Perú S.A.C. y de ARIA: qué datos tratamos, para qué, dónde se alojan, cuánto se conservan y cómo solicitar su eliminación.',
  },
  {
    path: '/legal/terminos',
    title: 'Términos del servicio | Novasys del Perú S.A.C.',
    desc: 'Términos del servicio de los productos de Novasys del Perú S.A.C.',
  },
  {
    path: '/legal/terminos/aria',
    title: 'Términos del servicio de ARIA | Novasys del Perú S.A.C.',
    desc: 'Términos del servicio de ARIA, la plataforma de atención al cliente de Novasys del Perú S.A.C.: alcance, cuentas conectadas, uso aceptable, suscripción y responsabilidades.',
  },
  {
    path: '/legal/eliminacion-de-datos',
    title: 'Eliminación de datos | Novasys del Perú S.A.C.',
    desc: 'Cómo solicitar la eliminación de datos en ARIA y en Novasys del Perú S.A.C.: vías de solicitud, qué se borra, plazos y confirmación.',
  },

  // Detalle dinámico: el Helmet de estas páginas se arma en runtime, así que el
  // título sale del nombre real del caso o del producto, no del slug.
  ...CASOS.map(([slug, cliente, proyecto]) => ({
    path: `/casos-de-exito/${slug}`,
    title: `${cliente} — ${proyecto} | Novasys del Perú`,
    desc: `Caso de éxito de ${cliente}: ${proyecto.toLowerCase()}. Contexto, solución implementada por Novasys del Perú y resultados medidos en producción.`,
  })),
  ...TECNOLOGIAS.map(([slug, nombre]) => ({
    path: `/tecnologias/${slug}`,
    title: `${nombre} — Implementación y soporte | Novasys del Perú`,
    desc: `Ficha técnica de ${nombre}: capacidades, casos de uso e implementación con equipo propio en Lima. Oracle Partner en el Perú.`,
  })),
];

/**
 * URLs del sitio anterior que Google sigue rastreando. Hoy devuelven 200 con la
 * app (soft 404) o redirigen solo del lado del cliente, que para un crawler no
 * es una redirección. Aquí se vuelven 301 de servidor.
 * Detectadas en Search Console (Soft 404 · Rastreada sin indexar · Duplicada).
 */
export const REDIRECTS = [
  // — soft 404 reportados por Search Console —
  ['/Casos', '/casos-de-exito'],
  ['/Pacifico', '/casos-de-exito/pacifico'],
  ['/Soluciones_HP', '/infraestructura'],
  ['/Soluciones_HP/<*>', '/infraestructura'],
  ['/Soluciones_HP_Enterprise', '/infraestructura/servidores'],
  ['/Soluciones_Oracle', '/tecnologias'],
  ['/soluciones-amazon', '/cloud'],
  ['/index.php', '/'],
  ['/index.php/<*>', '/'],
  ['/en', '/'],
  ['/en/<*>', '/'],

  // — redirects que hoy solo existen en router.jsx (client-side): pasan a 301 —
  ['/Soluciones_Novasys', '/soluciones'],
  ['/Ventas', '/soluciones/crm-ventas'],
  ['/ventas', '/soluciones/crm-ventas'],
  ['/Marketing', '/soluciones/marketing-automation'],
  ['/marketing', '/soluciones/marketing-automation'],
  ['/Business_Intelligence', '/soluciones/business-intelligence'],
  ['/business-intelligence', '/soluciones/business-intelligence'],
  ['/Elo', '/soluciones/gestion-documental'],
  ['/elo', '/soluciones/gestion-documental'],
  ['/SolucionesHPmain', '/infraestructura'],
  ['/SolucionesHP', '/infraestructura/computo'],
  ['/SolucionesHPEnterprise', '/infraestructura/servidores'],
  ['/AlmacenamientoHP', '/infraestructura/almacenamiento'],
  ['/Amazon_Web_Services', '/cloud'],
  ['/Amazon_Web_Services/Amazon_Connect', '/cloud/amazon-connect'],
  ['/Amazon_Web_Services/Connect_Dialer', '/cloud/connect-dialer'],
  ['/Amazon_Web_Services/Cloud_Migration', '/cloud/migracion'],
  ['/Casos_de_exito', '/casos-de-exito'],
  ['/Entel', '/casos-de-exito/entel'],
  ['/Renzo', '/casos-de-exito/renzo-costa'],
  ['/casos/pacifico', '/casos-de-exito/pacifico'],
  ['/casos/centrum', '/casos-de-exito/centrum'],
  ['/casos/americatel', '/casos-de-exito/americatel'],
  ['/casos/interbank', '/casos-de-exito/interbank'],
  ['/Nosotros', '/nosotros'],
  ['/Eventos', '/eventos'],
  ['/Contacto', '/contacto'],
  ['/cloud/aria', '/soluciones/aria'],
  ['/legal', '/legal/privacidad'],
];

/**
 * Restos del WordPress/Joomla anterior. Están sin reglas A PROPÓSITO.
 *
 * Probado en producción el 2026-09-07: el status `404` de Amplify no devuelve un
 * 404 de verdad — significa «redirige a la página 404», que después responde 200.
 * Con target /index.html el resultado era 200, así que la regla era config muerta.
 *
 * Se resuelven por el otro lado: caen en el catch-all → NotFoundV4, que emite
 * <meta name="robots" content="noindex">. Google renderiza JS, lee el noindex y
 * las saca del índice, que es el objetivo real. No volver a añadir reglas 404.
 */
export const GONE = [];

/**
 * Slugs Oracle que vivieron bajo tres prefijos distintos del sitio anterior y
 * hoy son fichas en /tecnologias. En router.jsx ya existen como redirect
 * client-side; estos son los 301 de servidor equivalentes.
 */
const ORACLE = TECNOLOGIAS.map(([slug]) => slug);
export const REDIRECTS_ORACLE = ['/soluciones', '/Soluciones_Novasys', '/solucion'].flatMap(
  (prefijo) => ORACLE.map((slug) => [`${prefijo}/${slug}`, `/tecnologias/${slug}`]),
);

/** Todas las redirecciones 301, en el orden en que se evalúan. */
export const TODOS_LOS_REDIRECTS = [...REDIRECTS_ORACLE, ...REDIRECTS];
