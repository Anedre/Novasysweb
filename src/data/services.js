import {
  HiOutlineCodeBracket,
  HiOutlineServerStack,
  HiOutlineCloudArrowUp,
} from 'react-icons/hi2';

import CloudImage from '../img/Corporativo/growtika-Am6pBe2FpJw-unsplash.jpg';
import ServerImage from '../img/Corporativo/compare-fibre-9HGPvHThNME-unsplash.jpg';
import DataImage from '../img/Corporativo/luke-chesser-JKUTrJ4vK00-unsplash.jpg';

export const serviceLines = [
  {
    id: 'software',
    icon: HiOutlineCodeBracket,
    title: 'Software Empresarial',
    tagline: 'Soluciones a medida para tu negocio',
    description: 'Desarrollo personalizado de CRM, Business Intelligence, Marketing Automation y Gestión Documental que se adaptan a tus procesos.',
    image: DataImage,
    color: '#DC2626',
    features: [
      { label: 'CRM & Ventas', path: '/soluciones/crm-ventas' },
      { label: 'Business Intelligence', path: '/soluciones/business-intelligence' },
      { label: 'Marketing Automation', path: '/soluciones/marketing-automation' },
      { label: 'Gestión Documental (ECM)', path: '/soluciones/gestion-documental' },
    ],
    stats: '50+ implementaciones',
    path: '/soluciones',
  },
  {
    id: 'infraestructura',
    icon: HiOutlineServerStack,
    title: 'Infraestructura HP',
    tagline: 'Hardware empresarial de alto rendimiento',
    description: 'Equipos de cómputo, servidores ProLiant, almacenamiento empresarial y soluciones de networking con respaldo HP y HPE.',
    image: ServerImage,
    color: '#0096D6',
    features: [
      { label: 'Equipos de Cómputo', path: '/infraestructura/computo' },
      { label: 'Servidores HPE', path: '/infraestructura/servidores' },
      { label: 'Almacenamiento', path: '/infraestructura/almacenamiento' },
      { label: 'Networking Aruba', path: '/infraestructura/computo' },
    ],
    stats: '5,000+ equipos desplegados',
    path: '/infraestructura/computo',
  },
  {
    id: 'cloud',
    icon: HiOutlineCloudArrowUp,
    title: 'Cloud AWS',
    tagline: 'Infraestructura cloud escalable',
    description: 'Amazon Connect para contact centers inteligentes, migración cloud, arquitecturas serverless y soluciones de machine learning.',
    image: CloudImage,
    color: '#FF9900',
    features: [
      { label: 'Amazon Connect', path: '/cloud/amazon-connect' },
      { label: 'Migración Cloud', path: '/cloud/migracion' },
      { label: 'Arquitectura Serverless', path: '/cloud' },
      { label: 'Machine Learning', path: '/cloud' },
    ],
    stats: '200+ proyectos cloud',
    path: '/cloud',
  },
];
