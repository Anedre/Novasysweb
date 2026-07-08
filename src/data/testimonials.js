/**
 * Testimonials — quotes from client decision-makers.
 * Used by the (upcoming) TestimonioSpotlight section.
 *
 * Schema:
 *   slug        — stable id (kebab-case)
 *   quote       — the pull quote, keep ≤ 180 chars, single voice
 *   name        — decisor name
 *   title       — position
 *   company     — company name
 *   industry    — Telco | Banca | Seguros | Retail | Educación | Salud | Gobierno
 *   kpi         — headline metric ("−40%")
 *   kpiLabel    — what it measures ("Costos operativos")
 *   portrait    — import path to B&W editorial portrait (placeholder until real)
 *   caseSlug    — optional link to /casos-de-exito/:slug
 *   date        — ISO date of when quote was captured
 *   verified    — boolean · true if captured on-record, false if illustrative
 *
 * IMPORTANT: Quotes below are PLACEHOLDER / ILLUSTRATIVE until replaced with
 * on-record statements from real clients. Do NOT publish without verification.
 */

// Placeholder portraits — reuse Corporativo stock until real portraits are produced.
// When swapping: drop B&W editorial headshots in src/img/testimonials/
// with filenames matching the slug (e.g. entel-jorge-salinas.jpg).
import portraitPlaceholder1 from '../img/Corporativo/krakenimages-Y5bvRlcCx8k-unsplash.jpg';
import portraitPlaceholder2 from '../img/Corporativo/sigmund-LCun3uxh-z0-unsplash.jpg';
import portraitPlaceholder3 from '../img/Corporativo/pexels-jeshoots-com-147458-530024.jpg';

export const testimonials = [
  {
    slug: 'entel-contact-center',
    quote: 'Novasys rediseñó nuestro contact center desde la arquitectura hasta las métricas. En tres meses teníamos routing inteligente, reportes en tiempo real y un backlog de 0.',
    name: 'Decisor referencial',
    title: 'Gerente de Operaciones',
    company: 'Entel',
    industry: 'Telco',
    kpi: '−40%',
    kpiLabel: 'Costos operativos',
    portrait: portraitPlaceholder1,
    caseSlug: 'entel',
    date: '2024-08-15',
    verified: false,
  },
  {
    slug: 'interbank-bi',
    quote: 'El diferencial fue la velocidad analítica: de reportes semanales a dashboards en vivo con detección de fraude integrada al flujo de cartera.',
    name: 'Decisor referencial',
    title: 'Head de Data & Analytics',
    company: 'Interbank',
    industry: 'Banca',
    kpi: '5×',
    kpiLabel: 'Velocidad analítica',
    portrait: portraitPlaceholder2,
    caseSlug: 'interbank',
    date: '2024-11-20',
    verified: false,
  },
  {
    slug: 'renzo-costa-crm',
    quote: 'Pasamos de planillas de Excel a una vista 360 del cliente en todos los puntos de venta. La fuerza comercial ganó tiempo y los gerentes ganaron visibilidad.',
    name: 'Decisor referencial',
    title: 'Director Comercial',
    company: 'Renzo Costa',
    industry: 'Retail',
    kpi: '+60%',
    kpiLabel: 'Eficiencia comercial',
    portrait: portraitPlaceholder3,
    caseSlug: 'renzo-costa',
    date: '2025-02-10',
    verified: false,
  },
];

export const getTestimonialBySlug = (slug) => testimonials.find(t => t.slug === slug);
export const getTestimonialsByIndustry = (industry) =>
  testimonials.filter(t => t.industry === industry);
export const getFeaturedTestimonial = () => testimonials.find(t => t.verified) || testimonials[0];
