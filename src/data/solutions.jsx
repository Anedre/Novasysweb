// Complete solutions data for dynamic templates · WF1 schema
export const solutionCategories = [
  { id: 'software', label: 'Software Empresarial', color: '#DC2626' },
  { id: 'infraestructura', label: 'Infraestructura HP', color: '#0096D6' },
  { id: 'cloud', label: 'Cloud AWS', color: '#FF9900' },
];

export const solutions = [
  {
    slug: 'software-a-medida',
    category: 'software',
    title: 'Software a Medida',
    tagline: 'Desarrollo personalizado para tu negocio',
    description:
      'Construimos aplicaciones empresariales a medida que se adaptan a tus procesos, se integran con tus sistemas existentes y escalan en AWS sin re-arquitectura.',
    partnerTier: 'Stack moderno · Lima',
    color: '#DC2626',
    kpis: [
      { value: '6-8 sem', label: 'Time-to-MVP funcional' },
      { value: '+50', label: 'Productos enterprise entregados' },
      { value: '99.9%', label: 'Uptime SLA cloud-native' },
    ],
    features: [
      { title: 'Arquitectura escalable', desc: 'Diseñamos para crecer con tu negocio sin re-arquitectura.' },
      { title: 'Integración completa', desc: 'Conectamos con ERPs, CRMs y APIs existentes desde el día 1.' },
      { title: 'UX centrada en el usuario', desc: 'Interfaces intuitivas que el equipo adopta rápido.' },
      { title: 'Metodología ágil', desc: 'Entregas incrementales con feedback continuo del negocio.' },
      { title: 'Soporte continuo', desc: 'Mantenimiento, evolución y monitoreo post-implementación.' },
      { title: 'Cloud-native', desc: 'Desplegamos en AWS para máxima disponibilidad y escala automática.' },
    ],
    architecture: {
      title: <>Software <em>cloud-native</em>, escalable y observable.</>,
      dek:
        'Arquitecturas serverless en AWS con observabilidad y CI/CD desde el día 1. Diseñadas para crecer sin reescribir.',
      imageAlt: 'Arquitectura cloud-native para software empresarial',
      stack: [
        { label: 'React · Next.js', color: '#DC2626' },
        { label: 'Node · NestJS', color: '#DC2626' },
        { label: 'Python · FastAPI', color: '#DC2626' },
        { label: 'AWS Lambda · API Gateway', color: '#FF9900' },
        { label: 'PostgreSQL · DynamoDB', color: '#DC2626' },
        { label: 'Auth0 · Cognito', color: '#FF9900' },
        { label: 'GitHub Actions CI/CD', color: '#DC2626' },
        { label: 'Datadog · Sentry', color: '#DC2626' },
      ],
      notes: [
        'Roadmap por sprints de 2 semanas con demos al equipo de negocio.',
        'Tests unitarios + integración + E2E en pipeline de CI/CD.',
        'Arquitectura desacoplada para reemplazar componentes sin reescribir.',
        'Documentación técnica + handoff al equipo interno desde el sprint 1.',
      ],
    },
    steps: [
      { title: 'Discovery', desc: 'Mapeamos procesos y requerimientos en 1-2 semanas.' },
      { title: 'Diseño UX/UI', desc: 'Prototipamos la solución antes de construirla.' },
      { title: 'Desarrollo ágil', desc: 'Sprints de 2 semanas con demos al stakeholder.' },
      { title: 'Testing & Deploy', desc: 'QA riguroso y deployment sin interrupciones.' },
    ],
    includes: [
      'Discovery + mapeo de procesos (1-2 semanas)',
      'Diseño UX/UI con prototipo interactivo antes de codear',
      'Sprints quincenales con demos al stakeholder',
      'Deploy continuo en AWS · staging + producción separados',
      'Tests automatizados (unit + integración + E2E)',
      'Capacitación + handoff al equipo interno',
      'Soporte post-launch · 30 días incluidos',
    ],
    leadMagnet: {
      title: 'Guía de software a medida',
      subtitle: 'Cómo dimensionar un proyecto enterprise antes de construir',
      desc:
        '24 páginas con framework de discovery, sizing, ROI esperado y checklist de criterios para decidir build vs. buy.',
      href: '/whitepapers/software-a-medida-discovery.pdf',
      cta: 'Descargar guía',
      foot: 'Sin suscripción · email opcional para actualizaciones',
    },
    relatedCases: ['interbank', 'americatel', 'pacifico'],
    faqs: [
      {
        question: '¿Cuánto tiempo toma desarrollar un software a medida?',
        answer:
          'Depende de la complejidad, pero un MVP funcional puede estar listo en 6-8 semanas. Proyectos más complejos se entregan en fases.',
      },
      {
        question: '¿Puedo integrar el software con mis sistemas actuales?',
        answer:
          'Sí, diseñamos todas nuestras soluciones con APIs abiertas y capacidad de integración con ERPs, CRMs y otros sistemas.',
      },
      {
        question: '¿Qué tecnologías utilizan?',
        answer:
          'Trabajamos con React, Node.js, Python, AWS, Oracle y otras tecnologías modernas según las necesidades del proyecto.',
      },
    ],
    ctaTitle: <>¿Tenés un proceso que ningún <em>software comercial</em> resuelve?</>,
    ctaSubtitle:
      'Te diagnosticamos en 30 minutos si conviene construir, integrar o comprar. Sin compromiso comercial.',
    path: '/soluciones/software-a-medida',
  },

  {
    slug: 'crm-ventas',
    category: 'software',
    title: 'CRM & Ventas',
    tagline: 'Automatiza y potencia tu gestión comercial',
    description:
      'Implementamos Oracle Sales Cloud y soluciones CRM que transforman cómo tu equipo comercial gestiona clientes, oportunidades y cierres con vista 360°.',
    partnerTier: 'Oracle Sales Cloud Partner',
    color: '#DC2626',
    kpis: [
      { value: '4-6 sem', label: 'Time-to-go-live promedio' },
      { value: '+25%', label: 'Tiempo extra para vender post-CRM' },
      { value: '360°', label: 'Vista única del cliente' },
    ],
    features: [
      { title: 'Gestión de leads', desc: 'Captura, califica y asigna leads automáticamente.' },
      { title: 'Pipeline de ventas', desc: 'Visualiza tu embudo comercial en tiempo real.' },
      { title: 'Automatización', desc: 'Flujos automatizados para seguimiento y nurturing.' },
      { title: 'Reportes avanzados', desc: 'Dashboards con métricas de rendimiento del equipo.' },
      { title: 'Integración email', desc: 'Sincroniza con Outlook, Gmail y sistemas de correo.' },
      { title: 'Mobile-ready', desc: 'Tu equipo opera desde cualquier dispositivo.' },
    ],
    architecture: {
      title: <>CRM <em>integrado</em> con email, ERP y BI desde el día 1.</>,
      dek:
        'Oracle Sales Cloud o CRM custom según fit. Sincronizado con Outlook/Gmail, ERP y plataformas de marketing.',
      imageAlt: 'Arquitectura CRM integrada con sistemas core',
      stack: [
        { label: 'Oracle Sales Cloud', color: '#DC2626' },
        { label: 'Oracle Eloqua (nurturing)', color: '#DC2626' },
        { label: 'Outlook · Gmail API', color: '#0096D6' },
        { label: 'Webhook ERP (SAP · Oracle EBS)', color: '#DC2626' },
        { label: 'Oracle Analytics (pipeline)', color: '#DC2626' },
        { label: 'Mobile · iOS · Android', color: '#DC2626' },
        { label: 'SSO corporativo', color: '#DC2626' },
        { label: 'Auditoría + compliance', color: '#DC2626' },
      ],
      notes: [
        'Migración de datos desde Excel, CRM legacy o ERP sin downtime comercial.',
        'Pipeline de ventas configurable con etapas + automatizaciones por industria.',
        'Reportes ejecutivos para dirección comercial + dashboards por vendedor.',
        'Capacitación on-site al equipo comercial + manuales de adopción.',
      ],
    },
    steps: [
      { title: 'Análisis comercial', desc: 'Entendemos tu proceso de ventas actual.' },
      { title: 'Configuración CRM', desc: 'Personalizamos campos, etapas y flujos.' },
      { title: 'Migración de datos', desc: 'Importamos tu base de datos existente.' },
      { title: 'Capacitación', desc: 'Entrenamos a tu equipo para adopción exitosa.' },
    ],
    includes: [
      'Análisis del proceso comercial actual + brechas',
      'Configuración del CRM (campos, etapas, flujos, dashboards)',
      'Migración de la base de datos existente sin pérdida',
      'Integración con email, ERP y plataformas de marketing',
      'Dashboards y reportes ejecutivos personalizados',
      'Capacitación del equipo comercial · 2 sesiones',
      'Soporte de adopción durante los primeros 3 meses',
    ],
    leadMagnet: {
      title: 'Checklist · Listo para CRM',
      subtitle: 'Los 18 criterios que deciden si tu equipo está listo para Oracle Sales Cloud',
      desc:
        '12 páginas con auto-evaluación, ROI esperado por sector, comparativo Oracle vs Salesforce vs HubSpot y errores frecuentes en migraciones.',
      href: '/whitepapers/crm-readiness-checklist.pdf',
      cta: 'Descargar checklist',
      foot: 'Sin suscripción · email opcional para actualizaciones',
    },
    relatedCases: ['entel', 'pacifico', 'americatel'],
    faqs: [
      {
        question: '¿Qué CRM implementan?',
        answer:
          'Trabajamos principalmente con Oracle Sales Cloud, pero podemos adaptar soluciones según tus necesidades y presupuesto.',
      },
      {
        question: '¿Puedo migrar datos desde mi sistema actual?',
        answer:
          'Sí, contamos con procesos probados de migración de datos desde cualquier sistema CRM o base de datos.',
      },
    ],
    ctaTitle: <>¿Tu equipo comercial pierde tiempo en <em>Excel</em>?</>,
    ctaSubtitle:
      'Diagnosticamos en 30 min si Oracle Sales Cloud (o un CRM más liviano) es la respuesta. Demo personalizada con datos de tu sector.',
    path: '/soluciones/crm-ventas',
  },

  {
    slug: 'business-intelligence',
    category: 'software',
    title: 'Business Intelligence',
    tagline: 'Decisiones basadas en datos reales',
    description:
      'Implementamos plataformas de BI con Oracle Analytics y herramientas analíticas que centralizan tus datos y los convierten en insights accionables para todo el negocio.',
    partnerTier: 'Oracle Analytics Cloud Partner',
    color: '#DC2626',
    kpis: [
      { value: '< 2 sem', label: 'Primer dashboard ejecutivo' },
      { value: '15+', label: 'Fuentes de datos integradas en promedio' },
      { value: '24/7', label: 'Refresh automático de KPIs' },
    ],
    features: [
      { title: 'Dashboards interactivos', desc: 'Visualizaciones claras de tus KPIs principales.' },
      { title: 'ETL automatizado', desc: 'Extracción y transformación de datos de múltiples fuentes.' },
      { title: 'Reportes ad-hoc', desc: 'Tu equipo crea reportes sin depender de TI.' },
      { title: 'Alertas inteligentes', desc: 'Notificaciones cuando un KPI sale de rango.' },
      { title: 'Data warehouse', desc: 'Centraliza datos de toda tu organización.' },
      { title: 'Predictive analytics', desc: 'Modelos de proyección y análisis de tendencias.' },
    ],
    architecture: {
      title: <>Data warehouse + BI con <em>una sola verdad</em> para todo el negocio.</>,
      dek:
        'Oracle Analytics Cloud sobre data warehouse modelado en estrella. ETL automatizado desde ERPs, CRMs, archivos y APIs.',
      imageAlt: 'Arquitectura BI centralizada con data warehouse',
      stack: [
        { label: 'Oracle Analytics Cloud', color: '#DC2626' },
        { label: 'Oracle Autonomous DW', color: '#DC2626' },
        { label: 'Oracle Data Integrator', color: '#DC2626' },
        { label: 'Power BI · Tableau (opcional)', color: '#DC2626' },
        { label: 'Conectores SAP · Oracle EBS', color: '#DC2626' },
        { label: 'APIs REST · CSV · S3', color: '#FF9900' },
        { label: 'Alertas Slack · Email', color: '#DC2626' },
        { label: 'Predictive (ML opcional)', color: '#DC2626' },
      ],
      notes: [
        'Modelado en estrella o copo de nieve según el dominio (finanzas, ventas, ops).',
        'ETL incremental con captura de cambios (CDC) para evitar refrescos pesados.',
        'Gobernanza de datos con catálogo + lineage + control de acceso por rol.',
        'Self-service para usuarios de negocio sin depender de TI para reportes nuevos.',
      ],
    },
    steps: [
      { title: 'Mapeo de datos', desc: 'Identificamos fuentes y calidad de datos.' },
      { title: 'Diseño de DW', desc: 'Modelamos el data warehouse óptimo.' },
      { title: 'Implementación BI', desc: 'Configuramos dashboards y reportes.' },
      { title: 'Adopción', desc: 'Capacitamos usuarios y medimos adopción.' },
    ],
    includes: [
      'Diagnóstico de fuentes de datos + calidad',
      'Diseño del data warehouse (estrella · snowflake)',
      'ETL automatizado con monitoreo de fallos',
      'Dashboards ejecutivos + operativos por área',
      'Alertas inteligentes ante variaciones críticas',
      'Self-service para que el negocio cree sus reportes',
      'Capacitación + gobernanza de datos',
    ],
    leadMagnet: {
      title: 'Whitepaper · BI enterprise sin morir intentándolo',
      subtitle: 'Roadmap de implementación realista de 90 días',
      desc:
        '20 páginas con framework de priorización de KPIs, sizing de data warehouse, modelo de gobernanza y casos peruanos de Oracle Analytics.',
      href: '/whitepapers/bi-roadmap-90-dias.pdf',
      cta: 'Descargar whitepaper',
      foot: 'Sin suscripción · email opcional para actualizaciones',
    },
    relatedCases: ['centrum', 'pacifico', 'interbank'],
    faqs: [
      {
        question: '¿Con qué fuentes de datos se integra?',
        answer:
          'Conectamos con bases de datos Oracle, SQL Server, MySQL, ERPs, CRMs, archivos Excel, APIs REST y más.',
      },
      {
        question: '¿Necesito un equipo de datos para mantenerlo?',
        answer:
          'No necesariamente. Diseñamos soluciones que los usuarios de negocio pueden operar. Además ofrecemos soporte continuo.',
      },
    ],
    ctaTitle: <>¿Tu director quiere KPIs en <em>tiempo real</em>?</>,
    ctaSubtitle:
      'Te mostramos en 30 minutos cómo se ve un dashboard ejecutivo bien construido sobre tus datos reales. Demo con datos de prueba.',
    path: '/soluciones/business-intelligence',
  },

  {
    slug: 'marketing-automation',
    category: 'software',
    title: 'Marketing Automation',
    tagline: 'Automatiza campañas que convierten',
    description:
      'Implementamos Oracle Responsys y herramientas de marketing automation que escalan tus campañas, personalizan la comunicación y miden el ROI con precisión.',
    partnerTier: 'Oracle Responsys Partner',
    color: '#DC2626',
    kpis: [
      { value: '+30%', label: 'Open rate promedio post-segmentación' },
      { value: '5-10×', label: 'Volumen de campañas sin más recursos' },
      { value: '< 6 sem', label: 'Primer customer journey en producción' },
    ],
    features: [
      { title: 'Email marketing', desc: 'Campañas personalizadas a escala.' },
      { title: 'Customer journeys', desc: 'Flujos automatizados multicanal.' },
      { title: 'Segmentación avanzada', desc: 'Audiencias basadas en comportamiento.' },
      { title: 'A/B testing', desc: 'Optimiza cada comunicación con datos.' },
      { title: 'Lead scoring', desc: 'Califica leads automáticamente.' },
      { title: 'Analytics de campañas', desc: 'ROI y métricas en tiempo real.' },
    ],
    architecture: {
      title: <>Customer journeys <em>multicanal</em>, automatizados y medibles.</>,
      dek:
        'Oracle Responsys + Eloqua para campañas B2B y B2C escaladas. Integración con CRM, BI y plataformas de pago para cerrar el loop.',
      imageAlt: 'Arquitectura marketing automation multicanal',
      stack: [
        { label: 'Oracle Responsys', color: '#DC2626' },
        { label: 'Oracle Eloqua (B2B)', color: '#DC2626' },
        { label: 'Oracle BlueKai (DMP)', color: '#DC2626' },
        { label: 'CRM (Sales Cloud · HubSpot)', color: '#DC2626' },
        { label: 'Push · SMS · WhatsApp Business', color: '#DC2626' },
        { label: 'Web tracking · UTM', color: '#DC2626' },
        { label: 'A/B testing nativo', color: '#DC2626' },
        { label: 'Attribution analytics', color: '#DC2626' },
      ],
      notes: [
        'Segmentación por comportamiento, demografía y RFM (recencia · frecuencia · monto).',
        'Lead scoring que califica leads automáticamente para el equipo comercial.',
        'A/B testing en cada touchpoint (asunto, copy, CTA, hora de envío).',
        'GDPR / Ley de Datos Personales · gestión de consentimiento incluida.',
      ],
    },
    steps: [
      { title: 'Estrategia', desc: 'Definimos objetivos y customer journeys.' },
      { title: 'Implementación', desc: 'Configuramos la plataforma y flujos.' },
      { title: 'Contenido', desc: 'Diseñamos templates y assets.' },
      { title: 'Optimización', desc: 'Iteramos basados en resultados.' },
    ],
    includes: [
      'Diseño de estrategia + customer journeys priorizados',
      'Configuración de Oracle Responsys · Eloqua',
      'Templates de email + landing pages responsivos',
      'Integración con CRM y fuentes de datos',
      'Automatización (welcome, nurture, win-back, abandono)',
      'Lead scoring y handoff a ventas',
      'Reportes ejecutivos + ROI de campañas',
    ],
    leadMagnet: {
      title: 'Guía · Customer journeys que convierten',
      subtitle: '15 plantillas validadas en B2B y B2C peruano',
      desc:
        '32 páginas con journeys de bienvenida, abandono de carrito, win-back, nurture B2B largo y reactivación. Con métricas reales por sector.',
      href: '/whitepapers/customer-journeys-peru.pdf',
      cta: 'Descargar guía',
      foot: 'Sin suscripción · email opcional para actualizaciones',
    },
    relatedCases: ['renzo-costa', 'pacifico', 'americatel'],
    faqs: [
      {
        question: '¿Qué plataforma de marketing usan?',
        answer:
          'Implementamos Oracle Responsys, una de las plataformas de marketing automation más robustas del mercado enterprise.',
      },
    ],
    ctaTitle: <>¿Sigue mandando <em>el mismo email</em> a toda la base?</>,
    ctaSubtitle:
      'Diagnosticamos en 30 min cómo segmentar y automatizar tu base actual. Demo con un journey real de tu sector.',
    path: '/soluciones/marketing-automation',
  },

  {
    slug: 'gestion-documental',
    category: 'software',
    title: 'Gestión Documental (ECM)',
    tagline: 'Digitaliza y ordena tu gestión documental',
    description:
      'Implementamos ELO ECM para digitalizar, organizar y automatizar la gestión de documentos empresariales con total trazabilidad, retención legal y cumplimiento normativo.',
    partnerTier: 'ELO ECM Certified Partner',
    color: '#DC2626',
    kpis: [
      { value: '−70%', label: 'Tiempo para encontrar un documento' },
      { value: '100%', label: 'Trazabilidad legal con auditoría' },
      { value: '5-8 sem', label: 'De papel a sistema en producción' },
    ],
    features: [
      { title: 'Captura digital', desc: 'Escaneo y digitalización masiva de documentos.' },
      { title: 'Workflows', desc: 'Flujos de aprobación y revisión automatizados.' },
      { title: 'Búsqueda full-text', desc: 'Encuentra cualquier documento en segundos.' },
      { title: 'Versionamiento', desc: 'Control de versiones con auditoría completa.' },
      { title: 'Compliance', desc: 'Cumplimiento normativo y retención legal.' },
      { title: 'Integración ERP', desc: 'Conecta con SAP, Oracle y otros sistemas.' },
    ],
    architecture: {
      title: <>Gestión documental <em>defendible</em>: trazabilidad, retención, compliance.</>,
      dek:
        'ELO ECM con workflows configurables, OCR full-text y políticas de retención. Integrado con SAP, Oracle y firma digital peruana.',
      imageAlt: 'Arquitectura ECM con compliance y workflows',
      stack: [
        { label: 'ELO ECM Enterprise', color: '#DC2626' },
        { label: 'OCR + búsqueda full-text', color: '#DC2626' },
        { label: 'Firma digital (Reniec · Llama.pe)', color: '#DC2626' },
        { label: 'Workflows BPMN configurables', color: '#DC2626' },
        { label: 'Conectores SAP · Oracle EBS', color: '#DC2626' },
        { label: 'Captura masiva (escáner enterprise)', color: '#DC2626' },
        { label: 'Mobile · web · plugin Outlook', color: '#DC2626' },
        { label: 'Auditoría + retención legal', color: '#DC2626' },
      ],
      notes: [
        'Captura digital masiva con reconocimiento de campos automático (OCR).',
        'Workflows de aprobación con SLAs, escalamientos y delegaciones.',
        'Versionamiento + auditoría completa para cumplimiento normativo.',
        'Política de retención por tipo documental con destrucción programada.',
      ],
    },
    steps: [
      { title: 'Diagnóstico', desc: 'Auditamos tu gestión documental actual.' },
      { title: 'Diseño ECM', desc: 'Definimos estructura y flujos.' },
      { title: 'Implementación', desc: 'Configuramos y migramos documentos.' },
      { title: 'Capacitación', desc: 'Formamos a tu equipo en el nuevo sistema.' },
    ],
    includes: [
      'Diagnóstico de gestión documental actual',
      'Diseño de la estructura ECM (carpetas, metadata, flujos)',
      'Configuración de ELO + workflows priorizados',
      'Captura digital + OCR de archivo histórico',
      'Integración con SAP · Oracle · firma digital',
      'Capacitación + manuales de operación',
      'Política de retención + plan de auditoría',
    ],
    leadMagnet: {
      title: 'Whitepaper · ECM y compliance en Perú',
      subtitle: 'Sunat, Sunafil y Ley de Protección de Datos en una guía práctica',
      desc:
        '18 páginas con políticas de retención por industria, plantillas de auditoría, riesgos comunes y casos legales reales en Perú.',
      href: '/whitepapers/ecm-compliance-peru.pdf',
      cta: 'Descargar whitepaper',
      foot: 'Sin suscripción · email opcional para actualizaciones',
    },
    relatedCases: ['interbank', 'pacifico', 'centrum'],
    faqs: [
      {
        question: '¿Qué sistema de gestión documental usan?',
        answer:
          'Implementamos ELO ECM (Enterprise Content Management), líder europeo en gestión documental enterprise.',
      },
    ],
    ctaTitle: <>¿Cuántas <em>horas-persona</em> al mes pierde tu equipo buscando archivos?</>,
    ctaSubtitle:
      'Calculamos en 30 min el ROI de digitalizar tu gestión documental con ELO. Demo con flujos reales de tu sector.',
    path: '/soluciones/gestion-documental',
  },
];

export const getSolutionBySlug = (slug) => solutions.find((s) => s.slug === slug);
export const getSolutionsByCategory = (catId) => solutions.filter((s) => s.category === catId);
