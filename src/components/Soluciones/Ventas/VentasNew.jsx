// VentasNew.jsx
// Página de categoría Ventas usando el componente SolucionCategoria
// Fase 3 del Plan de Modernización

import React from "react";
import SolucionCategoria from "../SolucionCategoria";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Importar imágenes de productos
import Oservicecloud from "../../../img/oservicecloud.png";
import OSales from "../../../img/OSales.png";
import Osiebel from "../../../img/Osiebel.png";
import Oconfigure from "../../../img/Oconfigure.png";

// Imágenes modo noche (usando versiones D de Nueva carpeta)
import OservicecloudN from "../../../img/Nueva carpeta/oservicecloudD.png";
import OSalesN from "../../../img/Nueva carpeta/OSalesD.png";
import OsiebelN from "../../../img/Nueva carpeta/OsiebelD.png";
import OconfigureN from "../../../img/Nueva carpeta/OconfigureD.png";

// Datos de productos de Ventas
const ventasProducts = [
  {
    id: "service-cloud",
    title: "Oracle Service Cloud",
    description: "Mejora el servicio al cliente con herramientas para centros de contacto, autoservicio y asistencia en vivo.",
    image: Oservicecloud,
    imageNight: OservicecloudN,
    slug: "oracle-service-cloud"
  },
  {
    id: "sales-cloud",
    title: "Oracle Sales Cloud",
    description: "Visión integral del proceso de ventas que mejora la productividad y previsión del equipo comercial.",
    image: OSales,
    imageNight: OSalesN,
    slug: "oracle-sales-cloud"
  },
  {
    id: "siebel",
    title: "Oracle Siebel CRM",
    description: "Gestiona relaciones con el cliente en entornos complejos como banca, telecomunicaciones o gobierno.",
    image: Osiebel,
    imageNight: OsiebelN,
    slug: "oracle-siebel"
  },
  {
    id: "cpq",
    title: "Oracle CPQ",
    description: "Acelera y automatiza procesos de ventas complejos con configuración, precio y cotización inteligente.",
    image: Oconfigure,
    imageNight: OconfigureN,
    slug: "oracle-cpq"
  }
];

// Datos SEO
const seoData = {
  title: "Soluciones de Ventas | Oracle CRM & Sales Cloud | Novasys",
  description: "Potencia tu equipo comercial con Oracle Service Cloud, Sales Cloud, Siebel CRM y CPQ. Automatiza procesos de ventas y mejora la relación con tus clientes.",
  keywords: "Oracle Sales Cloud, Oracle Service Cloud, Siebel CRM, Oracle CPQ, CRM empresarial, automatización ventas, Novasys"
};

function VentasNew() {
  return (
    <SolucionCategoria
      categoryId="ventas"
      title="Impulsa tu estrategia comercial con soluciones Oracle"
      subtitle="Automatiza, optimiza y escala tus procesos de ventas con herramientas diseñadas para equipos comerciales de alto rendimiento."
      accentColor="var(--primary-500)"
      products={ventasProducts}
      excludeFromExplore={["ventas"]}
      seo={seoData}
      heroAnimation={
        <DotLottieReact
          src="https://lottie.host/0a83f7f2-9ed6-4f2f-949d-d2cd67e06419/1i8V3L1Rsm.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "auto" }}
        />
      }
    />
  );
}

export default VentasNew;
