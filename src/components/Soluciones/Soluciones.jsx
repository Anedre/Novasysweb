import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInView from "../../hooks/useInView";
import "./Soluciones.css";

import Obusiness from "../../img/Obusiness.png";
import Ocloud from "../../img/Ocloud.png";
import Bluekai_logo_color from "../../img/Bluekai_logo_color.png";
import Eloqua from "../../img/Eloqua.png";
import Oresponsys from "../../img/Oresponsys.png";
import Oservicecloud from "../../img/oservicecloud.png";
import OSales from "../../img/OSales.png";
import Osiebel from "../../img/Osiebel.png";
import Oconfigure from "../../img/Oconfigure.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const data = {
  business: [
    { id: 1, slug: "oracle-business-intelligence", image: Obusiness, title: "Oracle Business Intelligence" },
  ],
  marketing: [
    { id: 2, slug: "oracle-paas", image: Ocloud, title: "Oracle PaaS" },
    { id: 3, slug: "oracle-bluekai", image: Bluekai_logo_color, title: "Oracle BlueKai" },
    { id: 4, slug: "oracle-eloqua", image: Eloqua, title: "Oracle Eloqua" },
    { id: 5, slug: "oracle-responsys", image: Oresponsys, title: "Oracle Responsys" },
  ],
  ventas: [
    { id: 6, slug: "oracle-service-cloud", image: Oservicecloud, title: "Oracle Service Cloud" },
    { id: 7, slug: "oracle-sales-cloud", image: OSales, title: "Oracle Sales Cloud" },
    { id: 8, slug: "oracle-siebel", image: Osiebel, title: "Oracle Siebel" },
    { id: 9, slug: "oracle-cpq", image: Oconfigure, title: "Oracle CPQ" },
  ],
};

function Soluciones() {
  const [tituloRef, tituloVisible] = useInView();
  const [gridRef, gridVisible] = useInView();
  const [filtroRef, filtroVisible] = useInView();
  const [scontentRef, scontentVisible] = useInView();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const getFilteredItems = () => {
    if (selectedCategory === "all") {
      return Object.values(data).flat();
    }
    return data[selectedCategory] || [];
  };

  return (
    <section className="Soluciones">
      <div className="Stitulo">
        <h1>Impulsa tu empresa con nuestras soluciones</h1>
        <p>
          Contamos con más de 20 soluciones innovadoras para transformar procesos específicos y mixtos, optimizando tu rendimiento empresarial.
        </p>
      </div>

      <div className="divider">
        <span className="icon">☁</span>
      </div>

      <div
        ref={gridRef}
        className={`SolucionesGrid ${gridVisible ? "fade-in-up" : ""}`}
      >
        <div className="Sitem1">
          <h1>Soluciones de Marketing</h1>
          <h2>Conecta tus datos de marketing con el cliente adecuado. Crea experiencias personalizadas y mide resultados con inteligencia.</h2>
          <div className="lottie-wrapper">
            <DotLottieReact
              src="https://lottie.host/aa09b0e3-8f02-479c-8c45-a519251f1fac/CmhW0sa0Y4.lottie"
              loop
              autoplay
            />
          </div>
          <br />
          <button className="Sboton1" onClick={() => navigate("/marketing")}>Ver más ➜</button>
        </div>

        <div className="Sitem1">
          <h1>Soluciones de Ventas</h1>
          <h2>Agiliza cada etapa del proceso comercial, desde la generación de leads hasta la conversión, con plataformas líderes en la industria.</h2>
          <div className="lottie-wrapper">
            <DotLottieReact
              src="https://lottie.host/e73b9b1f-4443-41cc-8316-204870cb3be2/53zJCtQNsh.json"
              loop
              autoplay
            />
          </div>
          <br />
          <button className="Sboton1" onClick={() => navigate("/ventas")}>Ver más ➜</button>
        </div>

        <div className="Sitem1">
          <h1>Soluciones Business Intelligence</h1>
          <h2>Toma decisiones informadas gracias a la analítica avanzada y la visualización de datos en tiempo real.</h2>
          <div className="lottie-wrapper">
            <DotLottieReact
              src="https://lottie.host/b214253b-3f85-44d2-8370-88387f20f406/xHNFdkbDpk.lottie"
              loop
              autoplay
            />
          </div>
          <br />
          <button className="Sboton1" onClick={() => navigate("/Business_Intelligence")}>Ver más ➜</button>
        </div>

        <div className="Sitem1">
          <h1>Soluciones ELO ECM</h1>
          <h2>Gestiona tu información empresarial de manera estructurada, segura y accesible, digitalizando tus procesos clave con ELO ECM.</h2>
          <div className="lottie-wrapper">
            <DotLottieReact
              src="https://lottie.host/015addc2-b7b7-4f98-8529-3a580b390737/tayTCOQrSQ.json"
              loop
              autoplay
            />
          </div>
          <br />
          <button className="Sboton1" onClick={() => navigate("/elo")}>Ver más ➜</button>
        </div>
      </div>

      <div className="divider">
        <span className="icon">☁</span>
      </div>

      <div
        ref={tituloRef}
        className={`Stitulo2 ${tituloVisible ? "fade-in-up" : ""}`}
      >
        <h1>Nuestras Soluciones</h1>
        <p>Explora nuestras soluciones propias y en asociación con los líderes globales en tecnología empresarial.</p>
      </div>

      <nav
        ref={filtroRef}
        className={`menu ${filtroVisible ? "fade-in-up" : ""}`}
      >
        {["all", "business", "marketing", "ventas"].map((category) => (
          <span
            key={category}
            className={`filter-tab ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === "all"
              ? "Todos"
              : category === "business"
              ? "Business Intelligence"
              : category === "marketing"
              ? "Marketing"
              : "Ventas"}
          </span>
        ))}
      </nav>

      <div
        ref={scontentRef}
        className={`Scontent ${scontentVisible ? "fade-in-up" : ""}`}
      >
        {getFilteredItems().map((item, index) => (
          <div
            key={item.id}
            className="Iitem"
            style={{
              animation: scontentVisible ? `fadeUp 0.6s ease forwards ${index * 0.4}s` : "none"
            }}
          >        
            <img src={item.image} alt={item.title} className="item-img" />
            <h3>{item.title}</h3>
            <button
              className="Iboton"
              onClick={() => navigate(`/Soluciones_Novasys/${item.slug}`)}
              >
              Más Información
            </button>  
          </div>
        ))}
      </div>
    </section>
  );
}

export default Soluciones;
