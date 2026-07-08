import { Helmet } from 'react-helmet-async';
import HeroTerminal from '../components/sections/HeroTerminal/HeroTerminal';
import PartnersNova from '../components/sections/PartnersNova/PartnersNova';
import ServicesTabs from '../components/sections/ServicesTabs/ServicesTabs';
import ImpactoGrid from '../components/sections/ImpactoGrid/ImpactoGrid';
import CasosArchive from '../components/sections/CasosArchive/CasosArchive';
import TestimonioSpotlight from '../components/sections/TestimonioSpotlight/TestimonioSpotlight';
import ProcesoSteps from '../components/sections/ProcesoSteps/ProcesoSteps';
import FAQNova from '../components/sections/FAQNova/FAQNova';
import CtaNova from '../components/sections/CtaNova/CtaNova';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Novasys del Perú — Tecnología que sostiene lo crítico</title>
        <meta
          name="description"
          content="Diseñamos, desplegamos y operamos el stack digital detrás de los bancos, aseguradoras y telcos más importantes del Perú. 15 años construyendo infraestructura silenciosa."
        />
        <link rel="canonical" href="https://www.novasys.com.pe/" />
      </Helmet>

      {/* 01 — Hero editorial con foto corporativa + metric cluster + ticker */}
      <HeroTerminal />

      {/* 02 — Alianzas certificadas (dark strip) */}
      <PartnersNova />

      {/* 03 — Capítulo 01 · Capacidades (3 tabs con fotos) */}
      <ServicesTabs />

      {/* 04 — Capítulo 02 · Impacto (dashboard de KPIs) */}
      <ImpactoGrid />

      {/* 05 — Capítulo 03 · Casos (archivo con filtros) */}
      <CasosArchive />

      {/* 06 — Capítulo 3½ · Voces (testimonios rotando con retrato) */}
      <TestimonioSpotlight />

      {/* 07 — Capítulo 04 · Proceso (4 pasos editoriales) */}
      <ProcesoSteps />

      {/* 08 — Capítulo 05 · FAQ editorial con sticky head */}
      <FAQNova />

      {/* 09 — Siguiente capítulo · contacto editorial con form */}
      <CtaNova />
    </>
  );
}
