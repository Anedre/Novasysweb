// MarketingNew.jsx
// Página de categoría Marketing usando el componente SolucionCategoria
// Fase 3 del Plan de Modernización

import React from "react";
import SolucionCategoria from "../SolucionCategoria";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Importar imágenes de productos
import Ocloud from "../../../img/Ocloud.png";
import Bluekai from "../../../img/Bluekai_logo_color.png";
import Eloqua from "../../../img/Eloqua.png";
import Oresponsys from "../../../img/Oresponsys.png";

// Imágenes modo noche (usando versiones D de Nueva carpeta)
import OcloudN from "../../../img/Nueva carpeta/OcloudD.png";
import BluekaiN from "../../../img/Nueva carpeta/1x/bluekainoche.png";
import OresponsysN from "../../../img/Nueva carpeta/OresponsysD.png";

// Eloqua usa la misma imagen (no hay versión noche)
const EloquaN = Eloqua;

// Datos de productos de Marketing
const marketingProducts = [
  {
    id: "paas",
    title: "Oracle PaaS",
    description: "Infraestructura y servicios de plataforma para integrar tu ecosistema de marketing digital.",
    image: Ocloud,
    imageNight: OcloudN,
    slug: "oracle-paas"
  },
  {
    id: "bluekai",
    title: "Oracle BlueKai",
    description: "Gestión avanzada de audiencias para campañas más precisas y personalizadas.",
    image: Bluekai,
    imageNight: BluekaiN,
    slug: "oracle-bluekai"
  },
  {
    id: "eloqua",
    title: "Oracle Eloqua",
    description: "Automatización B2B con flujos inteligentes y nutrición de leads efectiva.",
    image: Eloqua,
    imageNight: EloquaN,
    slug: "oracle-eloqua"
  },
  {
    id: "responsys",
    title: "Oracle Responsys",
    description: "Orquesta campañas multicanal B2C desde una sola plataforma centralizada.",
    image: Oresponsys,
    imageNight: OresponsysN,
    slug: "oracle-responsys"
  }
];

// Datos SEO
const seoData = {
  title: "Soluciones de Marketing Digital | Oracle Marketing Cloud | Novasys",
  description: "Automatiza campañas, analiza comportamientos y personaliza experiencias con Oracle Eloqua, Responsys, BlueKai y PaaS. Soluciones omnicanal B2B y B2C.",
  keywords: "Oracle Eloqua, Oracle Responsys, Oracle BlueKai, Oracle PaaS, marketing automation, marketing digital, Novasys"
};

function MarketingNew() {
  return (
    <SolucionCategoria
      categoryId="marketing"
      title="Estrategias digitales inteligentes para impactar a tu audiencia"
      subtitle="Automatiza campañas, analiza comportamientos y personaliza experiencias con el portafolio de soluciones Oracle para marketing omnicanal."
      accentColor="var(--primary-500)"
      products={marketingProducts}
      excludeFromExplore={["marketing"]}
      seo={seoData}
      heroAnimation={
        <DotLottieReact
          src="https://lottie.host/e1f8a05f-2e30-4a6e-8e1e-b1e2f4c8e7f0/marketing.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "auto" }}
        />
      }
    />
  );
}

export default MarketingNew;
