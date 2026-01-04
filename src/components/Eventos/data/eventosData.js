/**
 * Datos de Eventos Novasys 2025-2026
 * Eventos de partners: Oracle, Amazon, HP, Microsoft
 */

// Imágenes de eventos (puedes reemplazar con URLs reales)
const eventImages = {
  aws: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
  oracle: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
  hp: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
  microsoft: "https://images.unsplash.com/photo-1591267990439-bc68529677c3?w=800&q=80",
  novasys: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  cloud: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  crm: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
};

export const eventos = [
  // ===== EVENTOS PRÓXIMOS 2026 =====
  {
    id: "evt-001",
    titulo: "AWS re:Invent 2025 Watch Party",
    subtitulo: "Novasys te invita a vivir las novedades de AWS",
    fecha: "2026-01-15",
    horaInicio: "09:00",
    horaFin: "13:00",
    tipo: "presencial",
    categoria: "cloud",
    partner: "aws",
    ubicacion: "Novasys HQ - Calle Narciso de la Colina 421, Miraflores, Lima",
    descripcion: "Únete a nosotros para ver en vivo los highlights del AWS re:Invent 2025. Analizaremos las nuevas funcionalidades de Amazon Connect, Lambda, Bedrock y más. Networking incluido con desayuno ejecutivo.",
    agenda: [
      { hora: "09:00", actividad: "Registro y bienvenida con café" },
      { hora: "09:30", actividad: "Keynote highlights: Novedades AWS 2025" },
      { hora: "10:30", actividad: "Deep dive: Amazon Connect + GenAI" },
      { hora: "11:30", actividad: "Coffee break y networking" },
      { hora: "12:00", actividad: "Panel: Casos de éxito en Perú" },
      { hora: "12:45", actividad: "Q&A y cierre" },
    ],
    speakers: [
      { 
        nombre: "Carlos Mendoza", 
        cargo: "AWS Solutions Architect", 
        empresa: "Novasys",
        foto: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      { 
        nombre: "María Fernanda López", 
        cargo: "Cloud Practice Lead", 
        empresa: "Novasys",
        foto: "https://randomuser.me/api/portraits/women/44.jpg"
      },
    ],
    imagen: eventImages.aws,
    registroUrl: "https://forms.novasys.com/aws-reinvent-2025",
    capacidad: 60,
    registrados: 42,
    tags: ["AWS", "Cloud", "Inteligencia Artificial", "Amazon Connect"],
    estado: "proximo",
    destacado: true,
    precio: "Gratuito",
    requisitos: ["Laptop opcional", "Tarjeta de presentación"],
  },
  {
    id: "evt-002",
    titulo: "Oracle CloudWorld Tour Lima 2026",
    subtitulo: "La transformación digital llega a Perú",
    fecha: "2026-02-20",
    horaInicio: "08:30",
    horaFin: "17:00",
    tipo: "presencial",
    categoria: "crm",
    partner: "oracle",
    ubicacion: "Westin Lima Hotel & Convention Center",
    descripcion: "El evento más importante de Oracle en Latinoamérica llega a Lima. Conoce las últimas innovaciones en Oracle Cloud, Fusion Applications, y cómo la IA está transformando el CRM empresarial. Novasys como Gold Partner presenta casos de éxito exclusivos.",
    agenda: [
      { hora: "08:30", actividad: "Registro y desayuno de bienvenida" },
      { hora: "09:30", actividad: "Keynote: Oracle Cloud Vision 2026" },
      { hora: "11:00", actividad: "Track 1: Oracle Service Cloud + AI" },
      { hora: "11:00", actividad: "Track 2: Oracle Sales Cloud Automation" },
      { hora: "12:30", actividad: "Almuerzo ejecutivo y networking" },
      { hora: "14:00", actividad: "Casos de éxito: Entel, Pacífico, Interbank" },
      { hora: "15:30", actividad: "Hands-on Labs" },
      { hora: "17:00", actividad: "Cocktail de cierre" },
    ],
    speakers: [
      { 
        nombre: "Roberto Sánchez", 
        cargo: "Oracle CX Practice Director", 
        empresa: "Novasys",
        foto: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      { 
        nombre: "Andrea Torres", 
        cargo: "Oracle Regional Manager", 
        empresa: "Oracle",
        foto: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      { 
        nombre: "Juan Carlos Vega", 
        cargo: "CTO", 
        empresa: "Entel Perú",
        foto: "https://randomuser.me/api/portraits/men/52.jpg"
      },
    ],
    imagen: eventImages.oracle,
    registroUrl: "https://forms.novasys.com/oracle-cloudworld-2026",
    capacidad: 200,
    registrados: 156,
    tags: ["Oracle", "CRM", "Cloud", "Transformación Digital"],
    estado: "proximo",
    destacado: true,
    precio: "Gratuito",
    requisitos: ["Registro previo obligatorio"],
  },
  {
    id: "evt-003",
    titulo: "Webinar: Amazon Connect + Lex para Contact Centers",
    subtitulo: "Automatiza tu atención al cliente con IA conversacional",
    fecha: "2026-01-28",
    horaInicio: "11:00",
    horaFin: "12:30",
    tipo: "webinar",
    categoria: "cloud",
    partner: "aws",
    ubicacion: "Online - Zoom",
    descripcion: "Descubre cómo implementar un contact center inteligente en la nube con Amazon Connect y Amazon Lex. Veremos arquitecturas reales, integraciones con CRM y demos en vivo de bots conversacionales.",
    agenda: [
      { hora: "11:00", actividad: "Introducción a Amazon Connect" },
      { hora: "11:20", actividad: "Integración con Amazon Lex y Bedrock" },
      { hora: "11:45", actividad: "Demo en vivo: Bot de atención" },
      { hora: "12:10", actividad: "Preguntas y respuestas" },
    ],
    speakers: [
      { 
        nombre: "Diego Ramírez", 
        cargo: "AWS DevOps Engineer", 
        empresa: "Novasys",
        foto: "https://randomuser.me/api/portraits/men/22.jpg"
      },
    ],
    imagen: eventImages.cloud,
    registroUrl: "https://zoom.us/webinar/register/novasys-aws-connect",
    capacidad: 500,
    registrados: 287,
    tags: ["Amazon Connect", "Lex", "Contact Center", "Chatbots"],
    estado: "proximo",
    destacado: false,
    precio: "Gratuito",
    requisitos: ["Conexión a internet estable"],
  },
  {
    id: "evt-004",
    titulo: "HP Amplify Partner Summit 2026",
    subtitulo: "Estrategias de crecimiento para partners HP",
    fecha: "2026-03-12",
    horaInicio: "09:00",
    horaFin: "14:00",
    tipo: "hibrido",
    categoria: "hardware",
    partner: "hp",
    ubicacion: "JW Marriott Lima + Streaming online",
    descripcion: "Evento exclusivo para partners HP Amplify. Conoce las nuevas líneas de productos 2026, programas de incentivos, y estrategias de go-to-market. Novasys como Platinum Partner comparte su experiencia.",
    agenda: [
      { hora: "09:00", actividad: "Registro" },
      { hora: "09:30", actividad: "HP Amplify: Novedades del programa" },
      { hora: "10:30", actividad: "Portfolio 2026: Laptops, Workstations, Impresión" },
      { hora: "11:30", actividad: "HP Enterprise: Soluciones para Data Centers" },
      { hora: "12:30", actividad: "Networking lunch" },
    ],
    speakers: [
      { 
        nombre: "Patricia Muñoz", 
        cargo: "HP Channel Manager", 
        empresa: "HP Inc.",
        foto: "https://randomuser.me/api/portraits/women/35.jpg"
      },
      { 
        nombre: "Fernando Castillo", 
        cargo: "HP Practice Lead", 
        empresa: "Novasys",
        foto: "https://randomuser.me/api/portraits/men/38.jpg"
      },
    ],
    imagen: eventImages.hp,
    registroUrl: "https://forms.novasys.com/hp-amplify-2026",
    capacidad: 100,
    registrados: 67,
    tags: ["HP", "Hardware", "Partners", "Enterprise"],
    estado: "proximo",
    destacado: false,
    precio: "Solo partners HP",
    requisitos: ["Ser partner HP Amplify registrado"],
  },
  {
    id: "evt-005",
    titulo: "Workshop: Inteligencia Artificial Generativa para Empresas",
    subtitulo: "De la teoría a la práctica con AWS Bedrock y Azure OpenAI",
    fecha: "2026-02-05",
    horaInicio: "14:00",
    horaFin: "18:00",
    tipo: "presencial",
    categoria: "ai",
    partner: "aws",
    ubicacion: "Novasys Training Center - Miraflores, Lima",
    descripcion: "Workshop práctico donde construirás tu primer asistente virtual con IA generativa. Aprenderás a usar AWS Bedrock, Amazon Q y Azure OpenAI para crear soluciones empresariales reales.",
    agenda: [
      { hora: "14:00", actividad: "Fundamentos de IA Generativa" },
      { hora: "14:45", actividad: "Setup del ambiente de desarrollo" },
      { hora: "15:30", actividad: "Lab 1: Creando tu primer prompt" },
      { hora: "16:15", actividad: "Coffee break" },
      { hora: "16:30", actividad: "Lab 2: Integrando IA en aplicaciones" },
      { hora: "17:30", actividad: "Proyecto final y presentaciones" },
    ],
    speakers: [
      { 
        nombre: "Luis García", 
        cargo: "AI/ML Specialist", 
        empresa: "Novasys",
        foto: "https://randomuser.me/api/portraits/men/25.jpg"
      },
      { 
        nombre: "Carla Vásquez", 
        cargo: "Data Scientist", 
        empresa: "Novasys",
        foto: "https://randomuser.me/api/portraits/women/32.jpg"
      },
    ],
    imagen: eventImages.ai,
    registroUrl: "https://forms.novasys.com/workshop-genai-2026",
    capacidad: 25,
    registrados: 23,
    tags: ["IA Generativa", "AWS Bedrock", "Machine Learning", "Workshop"],
    estado: "proximo",
    destacado: true,
    precio: "S/ 150",
    requisitos: ["Laptop con Python 3.10+", "Conocimientos básicos de programación"],
  },

  // ===== EVENTOS PASADOS 2025 =====
  {
    id: "evt-006",
    titulo: "Oracle CX Summit 2025",
    subtitulo: "El futuro del Customer Experience",
    fecha: "2025-11-15",
    horaInicio: "09:00",
    horaFin: "17:00",
    tipo: "presencial",
    categoria: "crm",
    partner: "oracle",
    ubicacion: "Swissôtel Lima",
    descripcion: "El evento más importante de Oracle CX en Perú. Más de 300 asistentes conocieron las últimas tendencias en experiencia del cliente.",
    speakers: [
      { 
        nombre: "Roberto Sánchez", 
        cargo: "Oracle CX Practice Director", 
        empresa: "Novasys",
        foto: "https://randomuser.me/api/portraits/men/45.jpg"
      },
    ],
    imagen: eventImages.crm,
    capacidad: 300,
    registrados: 285,
    tags: ["Oracle", "CX", "Customer Experience"],
    estado: "pasado",
    destacado: false,
    precio: "Gratuito",
  },
  {
    id: "evt-007",
    titulo: "AWS Summit Lima 2025",
    subtitulo: "Cloud innovation at scale",
    fecha: "2025-10-20",
    horaInicio: "08:00",
    horaFin: "18:00",
    tipo: "presencial",
    categoria: "cloud",
    partner: "aws",
    ubicacion: "Centro de Convenciones de Lima",
    descripcion: "El AWS Summit más grande de Perú. Novasys participó como sponsor Gold con un booth y 3 sesiones técnicas.",
    speakers: [
      { 
        nombre: "Carlos Mendoza", 
        cargo: "AWS Solutions Architect", 
        empresa: "Novasys",
        foto: "https://randomuser.me/api/portraits/men/32.jpg"
      },
    ],
    imagen: eventImages.aws,
    capacidad: 2000,
    registrados: 1850,
    tags: ["AWS", "Cloud", "Summit"],
    estado: "pasado",
    destacado: false,
    precio: "Gratuito",
  },
  {
    id: "evt-008",
    titulo: "Webinar: Migración a Oracle Cloud",
    subtitulo: "De on-premise a la nube sin fricciones",
    fecha: "2025-09-10",
    horaInicio: "11:00",
    horaFin: "12:00",
    tipo: "webinar",
    categoria: "cloud",
    partner: "oracle",
    ubicacion: "Online",
    descripcion: "Más de 200 participantes aprendieron las mejores prácticas para migrar sus aplicaciones Oracle a la nube.",
    speakers: [
      { 
        nombre: "Andrea Flores", 
        cargo: "Cloud Architect", 
        empresa: "Novasys",
        foto: "https://randomuser.me/api/portraits/women/41.jpg"
      },
    ],
    imagen: eventImages.oracle,
    capacidad: 300,
    registrados: 215,
    tags: ["Oracle Cloud", "Migración", "Webinar"],
    estado: "pasado",
    destacado: false,
    precio: "Gratuito",
  },
];

// Categorías disponibles
export const categorias = [
  { id: "todos", label: "Todos", icon: "📋" },
  { id: "cloud", label: "Cloud & DevOps", icon: "☁️" },
  { id: "crm", label: "CRM & CX", icon: "💼" },
  { id: "ai", label: "Inteligencia Artificial", icon: "🤖" },
  { id: "hardware", label: "Hardware & Infra", icon: "🖥️" },
  { id: "marketing", label: "Marketing Digital", icon: "📈" },
];

// Tipos de evento
export const tiposEvento = [
  { id: "todos", label: "Todos los formatos", icon: "🎯" },
  { id: "presencial", label: "Presencial", icon: "🏢" },
  { id: "webinar", label: "Webinar", icon: "💻" },
  { id: "hibrido", label: "Híbrido", icon: "🔗" },
];

// Partners
export const partners = [
  { id: "todos", label: "Todos", color: "#6b7280" },
  { id: "aws", label: "Amazon Web Services", color: "#ff9900" },
  { id: "oracle", label: "Oracle", color: "#c74634" },
  { id: "hp", label: "HP", color: "#0096d6" },
  { id: "microsoft", label: "Microsoft", color: "#00a4ef" },
  { id: "novasys", label: "Novasys", color: "#c62828" },
];

// Utilidades
export const getEventoById = (id) => eventos.find(e => e.id === id);

export const getEventosProximos = () => 
  eventos.filter(e => e.estado === "proximo")
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

export const getEventosPasados = () => 
  eventos.filter(e => e.estado === "pasado")
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

export const getEventosDestacados = () => 
  eventos.filter(e => e.estado === "proximo" && e.destacado);

export const getEventosByCategoria = (categoria) => 
  categoria === "todos" 
    ? eventos 
    : eventos.filter(e => e.categoria === categoria);

export const getEventosByPartner = (partner) =>
  partner === "todos"
    ? eventos
    : eventos.filter(e => e.partner === partner);

export const formatFecha = (fecha) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fecha).toLocaleDateString('es-PE', options);
};

export const formatFechaCorta = (fecha) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(fecha).toLocaleDateString('es-PE', options);
};

export const getDiasRestantes = (fecha) => {
  const hoy = new Date();
  const fechaEvento = new Date(fecha);
  const diff = Math.ceil((fechaEvento - hoy) / (1000 * 60 * 60 * 24));
  return diff;
};

export const getCapacidadPorcentaje = (registrados, capacidad) => 
  Math.round((registrados / capacidad) * 100);

// Alias para compatibilidad
export const eventosData = eventos;
