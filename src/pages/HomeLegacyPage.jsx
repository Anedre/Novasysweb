import { Helmet } from 'react-helmet-async';
import HeroPulse from '../components/sections/HeroPulse/HeroPulse';
import ServicesAlternating from '../components/sections/ServicesAlternating/ServicesAlternating';
import CasesCarousel from '../components/sections/CasesCarousel/CasesCarousel';
import PartnersBanner from '../components/sections/PartnersBanner/PartnersBanner';
import ConversionBlockV4 from '../components/sections/ConversionBlockV4/ConversionBlockV4';

export default function HomeLegacyPage() {
  return (
    <>
      <Helmet>
        <title>Novasys del Perú — Ingeniería Digital que Transforma Empresas</title>
        <meta
          name="description"
          content="Más de 15 años transformando empresas con soluciones tecnológicas a medida. Partners de AWS, HP y Oracle. CRM, BI, Cloud, Infraestructura y más."
        />
      </Helmet>

      {/* 01 — Hero con red animada + stats */}
      <HeroPulse />

      {/* 02 — Servicios en filas alternadas */}
      <ServicesAlternating />

      {/* 03 — Casos de éxito (carrusel autoplay) */}
      <CasesCarousel />

      {/* 04 — Partners estratégicos (dark banner) */}
      <PartnersBanner />

      {/* 05 — CTA Final */}
      <ConversionBlockV4 />
    </>
  );
}
