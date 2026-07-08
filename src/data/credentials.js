/**
 * Credentials — partner tiers, certifications, years-in-market badges.
 * Used by footer, about page, and trust strips across sections.
 *
 * ⚠️  NO INVENTAR: solo listar credenciales que Novasys realmente tiene.
 * Si una certificación no está confirmada por el stakeholder, dejarla comentada.
 */

import awsLogo from '../img/partners/aws.png';
import hpLogo from '../img/partners/hp.png';
import hpeLogo from '../img/partners/hp-enterprise.png';
import oracleLogo from '../img/partners/oracle.png';

// ========== Partner tiers (confirmed) ==========
export const partners = [
  {
    slug: 'aws',
    name: 'AWS',
    full: 'Amazon Web Services',
    tier: 'Advanced Consulting Partner',
    tierShort: 'Advanced Partner',
    logo: awsLogo,
    color: '#FF9900',
    since: '2018',
  },
  {
    slug: 'hp',
    name: 'HP Inc.',
    full: 'HP Inc.',
    tier: 'Gold Partner',
    tierShort: 'Gold Partner',
    logo: hpLogo,
    color: '#0096D6',
    since: '2012',
  },
  {
    slug: 'hpe',
    name: 'HP Enterprise',
    full: 'Hewlett Packard Enterprise',
    tier: 'Gold Partner',
    tierShort: 'Gold Partner',
    logo: hpeLogo,
    color: '#01A982',
    since: '2014',
  },
  {
    slug: 'oracle',
    name: 'Oracle',
    full: 'Oracle Corporation',
    tier: 'Certified Partner',
    tierShort: 'Certified Partner',
    logo: oracleLogo,
    color: '#C74634',
    since: '2010',
  },
];

// ========== Trust chips (high-level numbers displayed in hero / footer) ==========
export const trustChips = [
  { label: 'Años operando', value: '15+', context: 'desde 2010' },
  { label: 'Proyectos entregados', value: '200+', context: 'empresas líderes' },
  { label: 'Usuarios impactados', value: '24K+', context: 'en plataformas' },
  { label: 'Uptime crítico', value: '99.97%', context: 'SLA firmado' },
];

// ========== Industries served ==========
export const industries = [
  { slug: 'telco', label: 'Telecomunicaciones', icon: 'phone' },
  { slug: 'banca', label: 'Banca y Finanzas', icon: 'bank' },
  { slug: 'seguros', label: 'Seguros', icon: 'shield' },
  { slug: 'retail', label: 'Retail', icon: 'bag' },
  { slug: 'edu', label: 'Educación superior', icon: 'academic' },
  { slug: 'gobierno', label: 'Gobierno', icon: 'gov' },
];

// ========== Service pillars (short form for badges) ==========
export const pillars = [
  { slug: 'software', label: 'Software empresarial', color: '#E11D2A' },
  { slug: 'infra', label: 'Infraestructura HP', color: '#3B82F6' },
  { slug: 'cloud', label: 'Cloud AWS', color: '#F97316' },
];

export const getPartnerBySlug = (slug) => partners.find(p => p.slug === slug);
