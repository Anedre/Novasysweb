/**
 * Contenido del mega menú «Soluciones» (HeaderV4 → MegaSoluciones) y del
 * submenú del menú móvil.
 *
 * Vive en src/v4 —y no en src/data— porque el header se carga en todas las
 * páginas: importar src/data arrastraría el chunk app-data al arranque.
 * Los textos salen de los hubs y fichas de cada línea (titulares, módulos,
 * casos y KPIs publicados); si cambian allá, se actualizan aquí.
 */
export const LINEAS = [
  {
    id: 'software',
    num: '01',
    icon: 'i-code',
    title: 'Software empresarial',
    tag: 'Oracle · ELO',
    to: '/soluciones',
    hub: 'Ver Software empresarial',
    lede: 'Software que piensa en tu proceso.',
    items: [
      { icon: 'i-target', title: 'CRM & Ventas', desc: 'Pipeline, forecast y gestión comercial en una vista.', to: '/soluciones/crm-ventas' },
      { icon: 'i-chart', title: 'Business Intelligence', desc: 'Data warehouse y dashboards con una sola verdad.', to: '/soluciones/business-intelligence' },
      { icon: 'i-zap', title: 'Marketing Automation', desc: 'Journeys multicanal automatizados y medibles.', to: '/soluciones/marketing-automation' },
      { icon: 'i-doc', title: 'Gestión Documental', desc: 'Trazabilidad, retención y compliance defendibles.', to: '/soluciones/gestion-documental' },
      { icon: 'i-code', title: 'Software a Medida', desc: 'Cuando ningún producto encaja, lo construimos.', to: '/soluciones/software-a-medida' },
      { icon: 'i-layers', title: 'Tecnologías Oracle', desc: 'Nueve plataformas, cada una con su ficha técnica.', to: '/tecnologias' },
    ],
    facts: ['Sin lock-in de fabricante', 'Un solo equipo', 'Implementación local'],
    feature: {
      kind: 'case',
      photo: '041-industry.jpg',
      sector: 'Retail',
      title: 'Renzo Costa: CRM y BI integrados',
      kpi: '+60%',
      kpiLabel: 'eficiencia comercial',
      to: '/casos-de-exito/renzo-costa',
    },
  },
  {
    id: 'cloud',
    num: '02',
    icon: 'i-cloud',
    title: 'Cloud AWS',
    tag: 'AWS',
    to: '/cloud',
    hub: 'Ver Cloud AWS',
    lede: 'La nube que sostiene tu operación.',
    items: [
      { icon: 'i-headset', title: 'Contact Center con IA', desc: 'El contact center completo en la nube, sin hardware que mantener.', to: '/cloud/amazon-connect' },
      { icon: 'i-phone', title: 'Connect Dialer', desc: 'Campañas salientes sobre Connect, con compliance de fábrica.', to: '/cloud/connect-dialer' },
      { icon: 'i-refresh', title: 'Migración cloud', desc: 'De on-premise a AWS sin apagar la operación.', to: '/cloud/migracion' },
      { icon: 'i-layers', title: 'IA & Machine Learning', desc: 'Modelos en producción, no en un notebook.', to: '/cloud/sagemaker' },
    ],
    facts: ['AWS Advanced Partner', 'Well-Architected', 'Monitoreo 24/7'],
    feature: {
      kind: 'case',
      photo: '019-callcenter.jpg',
      sector: 'Telecomunicaciones',
      title: 'Entel: contact center cloud con Amazon Connect',
      kpi: '−40%',
      kpiLabel: 'costos operativos',
      to: '/casos-de-exito/entel',
    },
  },
  {
    id: 'infra',
    num: '03',
    icon: 'i-server',
    title: 'Infraestructura HP / HPE',
    tag: 'HP · HPE',
    to: '/infraestructura',
    hub: 'Ver Infraestructura',
    lede: 'Infraestructura que sostiene el core.',
    items: [
      { icon: 'i-monitor', title: 'Equipos de cómputo', desc: 'PCs, laptops y workstations HP para productividad empresarial.', to: '/infraestructura/computo' },
      { icon: 'i-server', title: 'Servidores HPE', desc: 'ProLiant y soluciones enterprise para el corazón del datacenter.', to: '/infraestructura/servidores' },
      { icon: 'i-db', title: 'Almacenamiento HPE', desc: 'Storage enterprise para los datos que no pueden perderse.', to: '/infraestructura/almacenamiento' },
      { icon: 'i-send', title: 'Cotizar equipos', desc: 'Stock en Lima y entrega en 48\u2060–\u206072\u00a0h.', to: '/contacto', cta: true },
    ],
    facts: ['Distribuidores HP / HPE', 'Entrega 48\u2060–\u206072\u00a0h', 'Soporte on-site'],
    feature: {
      kind: 'case',
      photo: '050-meeting.jpg',
      sector: 'Educación',
      title: 'Centrum PUCP: plataforma analítica',
      kpi: '+90%',
      kpiLabel: 'visibilidad de KPIs',
      to: '/casos-de-exito/centrum',
    },
  },
  {
    id: 'aria',
    num: '04',
    icon: 'i-msg',
    title: 'ARIA — atención al cliente',
    short: 'ARIA', // en el índice del mega menú; el tag ya dice qué es
    tag: 'Atención al cliente',
    to: '/soluciones/aria',
    hub: 'Ver ARIA',
    lede: 'Toda la conversación con tu cliente. En un solo lugar.',
    items: [
      { icon: 'i-play', title: 'Cómo funciona', desc: 'Tres pasos. Sin proyecto de meses.', to: '/soluciones/aria#como-funciona' },
      { icon: 'i-layers', title: 'Qué hace por dentro', desc: 'Cuatro piezas que trabajan juntas.', to: '/soluciones/aria#que-hace' },
      { icon: 'i-users', title: 'Para quién es', desc: 'Equipos que atienden mucho, por muchos lados.', to: '/soluciones/aria#para-quien' },
      { icon: 'i-shield', title: 'Tus datos', desc: 'Tus cuentas y tus datos son tuyos.', to: '/soluciones/aria#tus-datos' },
    ],
    facts: ['6 canales en una bandeja', 'Respuesta 24/7', 'Sobre AWS'],
    feature: {
      kind: 'product',
      eyebrow: 'Producto propio de Novasys',
      title: 'Asistentes que contestan solos cuando nadie está disponible.',
      channels: ['WhatsApp', 'Instagram', 'Messenger', 'Correo', 'Llamadas', 'Chat web'],
      cta: 'Agenda una demo',
      to: '/contacto',
    },
  },
];

// rutas que pertenecen a cada línea (prefijos), en orden de prioridad:
// ARIA va antes que Software porque también cuelga de /soluciones
const RUTAS = [
  ['aria', ['/soluciones/aria']],
  ['cloud', ['/cloud', '/soluciones/amazon']],
  ['infra', ['/infraestructura', '/soluciones/hp']],
  ['software', ['/soluciones', '/tecnologias']],
];

const enRuta = (pathname, base) => pathname === base || pathname.startsWith(`${base}/`);

/** Índice en LINEAS de la línea a la que pertenece la ruta, o -1. */
export function lineaDeRuta(pathname) {
  const hit = RUTAS.find(([, bases]) => bases.some((b) => enRuta(pathname, b)));
  return hit ? LINEAS.findIndex((l) => l.id === hit[0]) : -1;
}
