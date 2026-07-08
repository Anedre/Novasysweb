import {
  HiOutlineSignal,
  HiOutlineBuildingLibrary,
  HiOutlineShieldCheck,
  HiOutlineShoppingBag,
  HiOutlineAcademicCap,
  HiOutlineBuildingOffice,
} from 'react-icons/hi2';

export const industries = [
  {
    id: 'telecomunicaciones',
    name: 'Telecomunicaciones',
    icon: HiOutlineSignal,
    description: 'Contact centers inteligentes, CRM y automatización para operadores telco.',
    clients: ['Entel', 'Americatel'],
  },
  {
    id: 'banca',
    name: 'Banca y Finanzas',
    icon: HiOutlineBuildingLibrary,
    description: 'Transformación digital, BI y soluciones de análisis para instituciones financieras.',
    clients: ['Interbank', 'Centrum PUCP'],
  },
  {
    id: 'seguros',
    name: 'Seguros',
    icon: HiOutlineShieldCheck,
    description: 'Automatización de procesos, gestión documental y CRM para aseguradoras.',
    clients: ['Pacífico Seguros'],
  },
  {
    id: 'retail',
    name: 'Retail y Consumo',
    icon: HiOutlineShoppingBag,
    description: 'E-commerce, marketing automation y analytics para marcas de consumo.',
    clients: ['Renzo Costa'],
  },
  {
    id: 'educacion',
    name: 'Educación',
    icon: HiOutlineAcademicCap,
    description: 'Plataformas digitales, BI académico y gestión institucional.',
    clients: ['Centrum PUCP'],
  },
  {
    id: 'gobierno',
    name: 'Sector Público',
    icon: HiOutlineBuildingOffice,
    description: 'Modernización digital, gestión documental y servicios cloud para el Estado.',
    clients: [],
  },
];
