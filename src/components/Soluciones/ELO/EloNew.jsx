// EloNew.jsx
// Página de categoría ELO ECM usando el componente SolucionCategoria
// Fase 3 del Plan de Modernización

import React from "react";
import SolucionCategoria from "../SolucionCategoria";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNightMode } from "../../../hooks/useNightMode";

// Importar imágenes de productos
import elo from "../../../img/elo.png";
import eloN from "../../../img/Nueva carpeta/1x/Elonoche.png";

// Datos de productos de ELO
const eloProducts = [
  {
    id: "elo-ecm",
    title: "ELO ECM",
    description: "Centraliza, digitaliza y automatiza la gestión documental de tu empresa con máxima eficiencia y seguridad.",
    image: elo,
    imageNight: eloN,
    slug: "elo-ecm"
  }
];

// Datos SEO
const seoData = {
  title: "Gestión Documental ELO ECM | Novasys",
  description: "Organiza, automatiza y protege tus documentos con ELO ECM. La solución perfecta para instituciones que buscan eficiencia y trazabilidad documental total.",
  keywords: "ELO ECM, gestión documental, digitalización, automatización documentos, flujos documentales, Novasys"
};

function EloNew() {
  return (
    <SolucionCategoria
      categoryId="elo"
      title="Digitaliza tus procesos con gestión documental inteligente"
      subtitle="Organiza, automatiza y protege tus documentos con ELO ECM. La solución perfecta para instituciones que buscan eficiencia y trazabilidad documental total."
      accentColor="var(--hp-enterprise-green)"
      products={eloProducts}
      excludeFromExplore={["elo"]}
      seo={seoData}
      heroAnimation={
        <DotLottieReact
          src="https://lottie.host/4a8e6c3d-9f12-4b5a-a8e7-d3c6f9b2e4a1/document-management.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "auto" }}
        />
      }
    />
  );
}

export default EloNew;
