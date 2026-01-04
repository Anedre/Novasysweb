// SolucionesHPNew.jsx
// Página principal de Soluciones HP modernizada
// Versión actualizada con componentes modulares

import React from "react";
import { Helmet } from "react-helmet-async";
import { useNightMode } from "../../hooks/useNightMode";

// Componentes HP modernizados
import HeroHP from "./HeroHP";
import WhyHP from "./WhyHP";
import HPProducts from "./HPProducts";

// Estilos base
import "./SolucionesHPNew.css";

function SolucionesHPNew() {
  const isNight = useNightMode();

  return (
    <>
      <Helmet>
        <title>Soluciones HP y HPE | Partner Certificado en Perú | Novasys</title>
        <meta name="description" content="Partner certificado HP en Perú. Laptops, impresoras, servidores ProLiant, almacenamiento empresarial. Venta, implementación y soporte HP Inc y HP Enterprise." />
        <meta name="keywords" content="HP Peru, HP Enterprise, partner HP, servidores ProLiant, laptops HP, impresoras HP, Novasys" />
        <link rel="canonical" href="https://novasys.pe/Soluciones_HP" />
      </Helmet>

      <main className={`hp-main-page ${isNight ? "night" : ""}`}>
        {/* Hero Section */}
        <HeroHP />

        {/* Why HP Section */}
        <WhyHP />

        {/* Products Section */}
        <HPProducts />
      </main>
    </>
  );
}

export default SolucionesHPNew;
