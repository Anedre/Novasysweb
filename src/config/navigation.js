// navigation.js - Configuración centralizada de navegación
// Este archivo contiene toda la estructura de menús del sitio
// Modifica aquí para agregar, quitar o reorganizar páginas

import { 
  FaCode, 
  FaRobot, 
  FaChartLine, 
  FaMobileAlt, 
  FaServer, 
  FaNetworkWired, 
  FaAws, 
  FaCloud, 
  FaDatabase, 
  FaShieldAlt,
  FaLaptopCode,
  FaUsersCog,
  FaHeadset,
  FaPhoneVolume,
  FaFileAlt,
  FaCogs,
  FaUsers,
  FaTrophy,
  FaCalendarAlt,
  FaInfoCircle,
  FaEnvelope,
  FaHome
} from 'react-icons/fa';
import { 
  HiOutlineDesktopComputer, 
  HiOutlineCube,
  HiOutlineDocumentText
} from 'react-icons/hi';
import { 
  MdBusinessCenter, 
  MdDashboard,
  MdStorage
} from 'react-icons/md';

// =============================================================================
// CONFIGURACIÓN PRINCIPAL DE NAVEGACIÓN
// =============================================================================

export const navigationConfig = {
  // Logo y marca
  brand: {
    name: 'Novasys',
    logo: '/img/logo_novasys_transparent.png',
    homeLink: '/'
  },

  // Links de la barra superior (top bar)
  topBar: {
    left: [
      { label: 'Soporte', path: '/Contacto', icon: FaHeadset },
      { label: 'Recursos', path: '/Eventos', icon: FaFileAlt },
      { label: 'Partners', path: '/Nosotros', icon: FaUsers },
    ],
    right: [
      { label: 'Blog', path: '/Eventos', icon: FaFileAlt },
    ]
  },

  // Navegación principal con mega menús
  mainNav: [
    // =========================================
    // SOLUCIONES - Mega menú principal
    // =========================================
    {
      id: 'soluciones',
      label: 'Soluciones',
      type: 'megamenu',
      categories: [
        {
          title: 'SOLUCIONES NOVASYS',
          description: 'Software empresarial a medida',
          items: [
            { 
              icon: FaCode, 
              label: 'Software a Medida', 
              desc: 'Desarrollo personalizado',
              path: '/Soluciones_Novasys'
            },
            { 
              icon: MdBusinessCenter, 
              label: 'Ventas', 
              desc: 'CRM y automatización',
              path: '/Ventas'
            },
            { 
              icon: FaChartLine, 
              label: 'Marketing', 
              desc: 'Automatización marketing',
              path: '/Marketing'
            },
            { 
              icon: MdDashboard, 
              label: 'Business Intelligence', 
              desc: 'Análisis de datos',
              path: '/Business_Intelligence'
            },
            { 
              icon: HiOutlineDocumentText, 
              label: 'ELO ECM', 
              desc: 'Gestión documental',
              path: '/Elo'
            },
          ]
        },
        {
          title: 'SOLUCIONES HP',
          description: 'Infraestructura y hardware',
          items: [
            { 
              icon: HiOutlineDesktopComputer, 
              label: 'Equipos de Cómputo', 
              desc: 'PCs y laptops HP',
              path: '/SolucionesHP'
            },
            { 
              icon: FaServer, 
              label: 'Servidores HPE', 
              desc: 'ProLiant & Enterprise',
              path: '/SolucionesHPEnterprise'
            },
            { 
              icon: FaNetworkWired, 
              label: 'Networking', 
              desc: 'Aruba Networks',
              path: '/SolucionesHPmain'
            },
            { 
              icon: MdStorage, 
              label: 'Almacenamiento', 
              desc: 'Storage empresarial',
              path: '/AlmacenamientoHP'
            },
          ]
        },
        {
          title: 'AWS CLOUD',
          description: 'Servicios Amazon Web Services',
          items: [
            { 
              icon: FaAws, 
              label: 'Amazon Web Services', 
              desc: 'Servicios cloud completos',
              path: '/Amazon_Web_Services'
            },
            { 
              icon: FaHeadset, 
              label: 'Amazon Connect', 
              desc: 'Contact Center cloud',
              path: '/Amazon_Web_Services/Amazon_Connect'
            },
            { 
              icon: FaPhoneVolume, 
              label: 'Connect Dialer', 
              desc: 'Marcador predictivo',
              path: '/Amazon_Web_Services/Connect_Dialer'
            },
            { 
              icon: FaCloud, 
              label: 'Migración Cloud', 
              desc: 'On-premise a cloud',
              path: '/Amazon_Web_Services/Cloud_Migration'
            },
          ]
        },
        {
          title: 'SERVICIOS',
          highlight: true,
          description: 'Acompañamiento experto',
          items: [
            { 
              icon: FaLaptopCode, 
              label: 'Consultoría TI', 
              desc: 'Asesoría especializada',
              path: '/Contacto'
            },
            { 
              icon: FaUsersCog, 
              label: 'Soporte 24/7', 
              desc: 'Asistencia continua',
              path: '/Contacto'
            },
          ]
        }
      ]
    },

    // =========================================
    // EMPRESA - Dropdown simple
    // =========================================
    {
      id: 'empresa',
      label: 'Empresa',
      type: 'dropdown',
      items: [
        { 
          icon: FaInfoCircle, 
          label: 'Nosotros', 
          desc: 'Conoce nuestra historia',
          path: '/Nosotros'
        },
        { 
          icon: FaTrophy, 
          label: 'Casos de Éxito', 
          desc: 'Nuestros proyectos',
          path: '/Casos_de_exito'
        },
        { 
          icon: FaCalendarAlt, 
          label: 'Eventos', 
          desc: 'Próximos eventos',
          path: '/Eventos'
        },
      ]
    },

    // =========================================
    // LINKS SIMPLES
    // =========================================
    { 
      id: 'casos',
      label: 'Casos de Éxito', 
      type: 'link',
      path: '/Casos_de_exito' 
    },
    { 
      id: 'eventos',
      label: 'Eventos', 
      type: 'link',
      path: '/Eventos' 
    },
  ],

  // Botones de acción (CTA)
  actions: {
    primary: {
      label: 'Contactar',
      path: '/Contacto',
      icon: FaEnvelope
    },
    secondary: {
      label: 'Cotizar',
      path: '/Contacto'
    }
  },

  // Configuración del menú móvil
  mobile: {
    showSearch: true,
    showThemeToggle: true,
    quickLinks: [
      { label: 'Inicio', path: '/', icon: FaHome },
      { label: 'Contacto', path: '/Contacto', icon: FaEnvelope },
    ]
  }
};

// =============================================================================
// FUNCIONES HELPER
// =============================================================================

/**
 * Obtiene todos los links planos para el sitemap o búsqueda
 */
export const getAllLinks = () => {
  const links = [];
  
  navigationConfig.mainNav.forEach(item => {
    if (item.type === 'link') {
      links.push({ label: item.label, path: item.path });
    } else if (item.type === 'dropdown') {
      item.items.forEach(subItem => {
        links.push({ label: subItem.label, path: subItem.path });
      });
    } else if (item.type === 'megamenu') {
      item.categories.forEach(category => {
        category.items.forEach(subItem => {
          links.push({ label: subItem.label, path: subItem.path, category: category.title });
        });
      });
    }
  });
  
  return links;
};

/**
 * Busca en la navegación por término
 */
export const searchNavigation = (term) => {
  const allLinks = getAllLinks();
  const lowerTerm = term.toLowerCase();
  
  return allLinks.filter(link => 
    link.label.toLowerCase().includes(lowerTerm) ||
    (link.category && link.category.toLowerCase().includes(lowerTerm))
  );
};

/**
 * Obtiene el breadcrumb para una ruta
 */
export const getBreadcrumb = (pathname) => {
  const breadcrumb = [{ label: 'Inicio', path: '/' }];
  
  const allLinks = getAllLinks();
  const currentLink = allLinks.find(link => link.path === pathname);
  
  if (currentLink) {
    if (currentLink.category) {
      breadcrumb.push({ label: currentLink.category, path: '#' });
    }
    breadcrumb.push({ label: currentLink.label, path: currentLink.path });
  }
  
  return breadcrumb;
};

export default navigationConfig;
