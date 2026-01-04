// BusinessIntelligenceNew.jsx
// Página de categoría Business Intelligence usando el componente SolucionCategoria
// Fase 3 del Plan de Modernización

import React from "react";
import SolucionCategoria from "../SolucionCategoria";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Importar imágenes de productos
import Obusiness from "../../../img/Obusiness.png";

// Imágenes modo noche (usando versión D de Nueva carpeta)
import ObusinessN from "../../../img/Nueva carpeta/ObusinessD.png";

// Datos de productos de Business Intelligence
const biProducts = [
  {
    id: "oracle-bi",
    title: "Oracle Business Intelligence",
    description: "Dashboards, reportes y análisis avanzados para que cada decisión esté respaldada por datos reales.",
    image: Obusiness,
    imageNight: ObusinessN,
    slug: "oracle-business-intelligence"
  }
];

// Datos SEO
const seoData = {
  title: "Business Intelligence | Oracle BI Cloud | Novasys",
  description: "Visualiza, analiza y actúa con información precisa desde cualquier fuente de datos con Oracle Business Intelligence Cloud Services.",
  keywords: "Oracle Business Intelligence, BI Cloud, análisis de datos, dashboards, reportes, Novasys"
};

function BusinessIntelligenceNew() {
  return (
    <SolucionCategoria
      categoryId="business_intelligence"
      title="Convierte tus datos en inteligencia empresarial real"
      subtitle="Visualiza, analiza y actúa con información precisa desde cualquier fuente de datos, gracias a la potencia de Oracle BI."
      accentColor="var(--accent-600)"
      products={biProducts}
      excludeFromExplore={["business_intelligence", "bi"]}
      seo={seoData}
      heroAnimation={
        <DotLottieReact
          src="https://lottie.host/2f7ec95e-1f35-4d9f-aa4a-c4c7b8d24f5e/bi-analytics.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "auto" }}
        />
      }
    />
  );
}

export default BusinessIntelligenceNew;
