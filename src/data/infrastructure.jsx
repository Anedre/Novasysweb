/**
 * Infrastructure detail pages — data para /infraestructura/:slug
 * Cada entry alimenta InfraDetallePage.jsx (plantilla dinámica).
 *
 * Archivo con extensión .jsx para preservar JSX en títulos (em accents).
 *
 * Schema:
 *   slug, title (string), tagline, description
 *   partnerTier, color
 *   kpis [{ value, label }]
 *   features [{ title, desc }]
 *   architecture { title (JSX), dek, imageAlt, stack [{label, color}], notes [string] }
 *   includes [string]
 *   leadMagnet { title, subtitle, desc, href, cta, foot }
 *   relatedCases [slug]
 *   ctaTitle, ctaSubtitle
 */

export const infrastructure = [
  {
    slug: 'computo',
    title: 'Equipos de Cómputo HP',
    tagline: 'Workstations y laptops empresariales',
    description: 'PCs, laptops y workstations HP para productividad empresarial. Equipos diseñados para trabajo profesional: arquitectura, ingeniería, finanzas, diseño.',
    partnerTier: 'Distribuidor HP',
    color: '#0096D6',
    kpis: [
      { value: '72h', label: 'Stock en Lima' },
      { value: '5 años', label: 'Garantía on-site' },
      { value: '24×7', label: 'Soporte técnico' },
    ],
    features: [
      { title: 'HP Z Workstations', desc: 'Torres de alta performance para renderizado, CAD y simulación.' },
      { title: 'HP EliteBook', desc: 'Laptops ejecutivas con seguridad BIOS de grado enterprise.' },
      { title: 'HP ProBook', desc: 'Productividad balanceada para el grueso de la fuerza laboral.' },
      { title: 'HP Desktop Pro', desc: 'Torres compactas para puestos administrativos y call center.' },
    ],
    architecture: {
      title: <>Parque informático <em>dimensionado</em> al workload.</>,
      dek: 'Cada puesto recibe el modelo correcto para su carga real, no el más caro ni el más barato.',
      imageAlt: 'Workstations HP Z en entorno corporativo',
      stack: [
        { label: 'HP Z4/Z6/Z8', color: '#0096D6' },
        { label: 'HP EliteBook G11', color: '#0096D6' },
        { label: 'HP ProBook 460', color: '#0096D6' },
        { label: 'HP Desktop Pro G9', color: '#0096D6' },
        { label: 'HP ThinPro OS', color: '#0096D6' },
        { label: 'Intel vPro / AMD Pro', color: '#0E0E12' },
        { label: 'HP Wolf Security', color: '#E11D2A' },
        { label: 'HP Image Assistant', color: '#0096D6' },
      ],
      notes: [
        'Configuración unificada por rol (dev, diseño, administrativo, ejecutivo).',
        'Imagen corporativa pre-instalada con todas las políticas del cliente.',
        'HP Wolf Security con protección a nivel BIOS contra malware persistente.',
        'Plan de reposición programado (3-4 años) incluido en roadmap.',
      ],
    },
    includes: [
      'Assessment de puestos actuales (modelos, antigüedad, bottlenecks)',
      'Propuesta dimensionada por rol con TCO a 4 años',
      'Imagen corporativa con software estándar + políticas pre-instaladas',
      'Entrega on-site en Lima · 48-72 h tras orden de compra',
      'Capacitación al equipo de IT para despliegue masivo',
      'Soporte directo HP con reemplazo on-site 5 años',
    ],
    leadMagnet: {
      title: 'Guía de selección HP Z',
      subtitle: 'Cómo elegir la workstation correcta',
      desc: 'Tabla de selección por workload (render, CAD, desarrollo, data science) con benchmarks reales y TCO por usuario.',
      href: '/whitepapers/hp-workstation-selection.pdf',
      cta: 'Descargar guía',
      foot: 'Actualizado 2025 · modelos Gen 11',
    },
    relatedCases: ['renzo-costa', 'centrum', 'interbank'],
    ctaTitle: '¿Necesitás cotizar equipos para tu empresa?',
    ctaSubtitle: 'Enviamos una propuesta dimensionada en 24 h.',
  },

  {
    slug: 'servidores',
    title: 'Servidores HPE ProLiant',
    tagline: 'Servidores enterprise para cargas críticas',
    description: 'Servidores ProLiant y soluciones HPE Synergy para data center. Rendimiento y confiabilidad de clase mundial para workloads de misión crítica.',
    partnerTier: 'Distribuidor HPE',
    color: '#01A982',
    kpis: [
      { value: '99.999%', label: 'Disponibilidad validada' },
      { value: '< 4 h', label: 'Reemplazo on-site' },
      { value: '5 años', label: 'Garantía Care Pack' },
    ],
    features: [
      { title: 'HPE ProLiant DL', desc: 'Servidores rack estándar para virtualización y bases de datos.' },
      { title: 'HPE ProLiant ML', desc: 'Torres silenciosas para oficinas remotas y pymes grandes.' },
      { title: 'HPE Synergy', desc: 'Infraestructura composable para cargas mixtas y cloud privado.' },
      { title: 'HPE Edgeline', desc: 'Servidores robustos para edge computing y entornos industriales.' },
    ],
    architecture: {
      title: <>Data center <em>defensible</em> a 10 años.</>,
      dek: 'Arquitectura ProLiant Gen11 + iLO con gestión remota OOB y telemetría predictiva.',
      imageAlt: 'Datacenter HPE ProLiant con gestión iLO',
      stack: [
        { label: 'HPE ProLiant DL380 Gen11', color: '#01A982' },
        { label: 'HPE ProLiant DL360 Gen11', color: '#01A982' },
        { label: 'HPE Synergy 480 Gen11', color: '#01A982' },
        { label: 'iLO 6 · Management', color: '#01A982' },
        { label: 'HPE OneView', color: '#01A982' },
        { label: 'VMware vSphere', color: '#3B82F6' },
        { label: 'HPE Active Health System', color: '#01A982' },
        { label: 'Smart Update Manager', color: '#01A982' },
      ],
      notes: [
        'iLO 6 con gestión fuera de banda (OOB) incluso con el servidor apagado.',
        'Active Health System con telemetría predictiva de fallos de hardware.',
        'Compatible con VMware, Hyper-V, Proxmox y KVM sin lock-in.',
        'Alimentación redundante Titanium 96% eficiencia (menor costo energético).',
      ],
    },
    includes: [
      'Assessment de workload actual (DB, apps, virtualización, backup)',
      'Dimensionamiento CPU/RAM/storage basado en medición real',
      'Propuesta HPE ProLiant con comparativo vs cloud (TCO 5 años)',
      'Instalación on-site + rack + cableado + configuración iLO',
      'Handoff al equipo de IT con documentación operativa',
      'Care Pack 24×7 con reemplazo on-site en < 4 h · Lima',
    ],
    leadMagnet: {
      title: 'ProLiant Gen11 spec sheet',
      subtitle: 'DL380 / DL360 / Synergy — comparativa técnica',
      desc: '18 páginas con specs oficiales, benchmarks de bases de datos, consumo energético y escenarios de carga recomendados.',
      href: '/whitepapers/hpe-proliant-gen11-specs.pdf',
      cta: 'Descargar spec sheet',
      foot: 'Documento oficial HPE + notas técnicas Novasys',
    },
    relatedCases: ['interbank', 'pacifico', 'centrum'],
    ctaTitle: '¿Arquitectura para tu próximo data center?',
    ctaSubtitle: 'Enviamos propuesta HPE dimensionada a tu workload real.',
  },

  {
    slug: 'almacenamiento',
    title: 'Almacenamiento HPE Alletra',
    tagline: 'Storage enterprise para datos críticos',
    description: 'Soluciones de storage enterprise HPE Alletra y Nimble para datos críticos de negocio. Alta disponibilidad, replicación activa y deduplicación nativa.',
    partnerTier: 'Distribuidor HPE',
    color: '#01A982',
    kpis: [
      { value: '100%', label: 'Disponibilidad garantizada' },
      { value: '4:1', label: 'Ratio de deduplicación' },
      { value: '< 1 ms', label: 'Latencia all-flash' },
    ],
    features: [
      { title: 'HPE Alletra 9000', desc: 'Storage all-flash de misión crítica para DB y ERP enterprise.' },
      { title: 'HPE Alletra 6000', desc: 'Hybrid flash para workloads secundarios y archivado activo.' },
      { title: 'HPE StoreOnce', desc: 'Backup dedicado con deduplicación 20:1 y replicación a sitio secundario.' },
      { title: 'HPE Data Services', desc: 'Gestión unificada de datos on-prem + cloud con InfoSight AI.' },
    ],
    architecture: {
      title: <>Datos <em>siempre disponibles</em>, siempre protegidos.</>,
      dek: 'Alletra all-flash con garantía de 100% disponibilidad + backup 3-2-1 con StoreOnce.',
      imageAlt: 'Storage HPE Alletra con InfoSight predictive analytics',
      stack: [
        { label: 'HPE Alletra 9060', color: '#01A982' },
        { label: 'HPE Alletra 6050', color: '#01A982' },
        { label: 'HPE StoreOnce 5260', color: '#01A982' },
        { label: 'HPE InfoSight AI', color: '#01A982' },
        { label: 'HPE Data Fabric', color: '#01A982' },
        { label: 'Veeam Backup', color: '#3B82F6' },
        { label: 'Replication Peer Persistence', color: '#01A982' },
        { label: 'Snapshot orchestration', color: '#01A982' },
      ],
      notes: [
        'Peer Persistence para replicación sincrónica metro-cluster sin downtime.',
        'InfoSight AI predice 86% de los problemas antes del impacto operativo.',
        'Snapshots consistentes con Oracle, SQL Server, SAP HANA automáticos.',
        'Garantía escrita de 100% disponibilidad de datos (Availability Guarantee).',
      ],
    },
    includes: [
      'Análisis de crecimiento histórico de datos + proyección 5 años',
      'Dimensionamiento por perfil (DB, archivos, backup, data lake)',
      'Propuesta Alletra + StoreOnce + plan de replicación',
      'Migración de datos desde storage legacy sin downtime',
      'Pruebas de DR con el cliente (RTO/RPO documentados)',
      'Monitoreo con InfoSight + reporte mensual ejecutivo',
    ],
    leadMagnet: {
      title: 'HPE Alletra vs cloud storage',
      subtitle: 'TCO comparativo a 5 años',
      desc: '24 páginas con análisis de TCO on-prem vs AWS S3/Azure Blob, casos cuándo conviene cada uno, matriz de decisión.',
      href: '/whitepapers/hpe-alletra-vs-cloud-tco.pdf',
      cta: 'Descargar análisis',
      foot: 'Basado en 12 proyectos reales banca + retail peruano',
    },
    relatedCases: ['interbank', 'pacifico', 'centrum'],
    ctaTitle: '¿Storage que escala con tu crecimiento?',
    ctaSubtitle: 'Te ayudamos a dimensionar sin sobredimensionar.',
  },
];

export const getInfraBySlug = (slug) => infrastructure.find(i => i.slug === slug);
