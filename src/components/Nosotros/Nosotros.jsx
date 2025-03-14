import React, { useState, useEffect } from "react";
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./Nosotros.css";
import TrianglesExample from "../Background/TrianglesExample.jsx"; // Asegúrate de la ruta correcta

import video from "../../assets/video.mp4";
import figura1 from "../../assets/figura3.svg";
import figura2 from "../../assets/figura4.svg";
import figura3 from "../../assets/figura5.svg";
import figura4 from "../../assets/figura6.svg"; 
import figura5 from "../../assets/figura7.svg";  
import figura6 from "../../assets/figura8.svg";
import figura7 from "../../assets/figura9.svg";
import figura8 from "../../assets/figura11.svg";
import figura9 from "../../assets/figura12.svg";
import figura10 from "../../assets/figura13.svg";

function Nosotros() {
  const source = {
    type: "video",
    sources: [
      {
        src: video,
        type: "video/mp4",
      },
    ],
  };

   // Obtenemos dimensiones dinámicas para que el fondo se ajuste al viewport
   const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
   useEffect(() => {
     const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
     window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
   }, []);
  return (
    <div className="nosotros">
      {/* Sección Hero/Introducción */}
      <section className="heroN">
        <div className="heroN-container">
        <div className="heroN-background">
            {/* Componente de fondo interactivo con triángulos */}
            <TrianglesExample width={dimensions.width} height={dimensions.height} />
          </div>
          <div className="heroN-content">
            <h1 className="heroN-title">
              <span className="word" style={{ animationDelay: "0s" }}>Bienvenidos</span>
              <span className="word" style={{ animationDelay: "0.4s" }}>a</span>
              <span className="word" style={{ animationDelay: "0.8s" }}>Novasys</span>
            </h1>
            <p className="heroN-description">
              Innovación, tecnología y pasión al servicio de tu negocio.
            </p>
            <a href="#quienes-somos" className="scroll-down">
              Descubre más
            </a>
          </div>
        </div>
      </section>

      {/* Sección: ¿Quiénes somos? */}
      <section className="quienes-somos" id="quienes-somos">
        <div className="section-background qs-background">
          {/* Fondos con SVG para la sección "¿Quiénes somos?" */}
          <img src={figura3} alt="Figura de fondo" className="qs-figure qs-figure1" />
          <img src={figura4} alt="Figura de fondo" className="qs-figure qs-figure2" />
        </div>
        <div className="quienes-somos-grid">
          <div className="quienes-somos-content">
            <h2>¿Quiénes somos?</h2>
            <p>
              Novasys es una empresa integradora de tecnología de la información y consultoría.
              Contamos con más de 15 años de experiencia implementando y desarrollando software
              capaz de cumplir con las necesidades de algunas de las empresas más exigentes del Perú.
            </p>
          </div>
          <div className="player-wrapper">
            <Plyr
              source={source}
              options={{
                autoplay: true,
                muted: true,
                playsinline: true,
              }}
            />
          </div>
        </div>
      </section>

      {/* Sección: Nuestros Principios */}
      <section className="principios">
        <div className="section-background pr-background">
          {/* Fondos con SVG para la sección Principios */}
          <img src={figura5} alt="Figura de fondo" className="pr-figure pr-figure1" />
          <img src={figura6} alt="Figura de fondo" className="pr-figure pr-figure2" />
        </div>
        <div className="principios-content">
          <div className="principio-card" style={{ animationDelay: "0.2s" }}>
            <h3>MISIÓN</h3>
            <p>
              En Novasys, nuestra misión es impulsar la transformación digital de nuestros clientes mediante el diseño e implementación de soluciones tecnológicas integrales y personalizadas.
            </p>
            <div className="lottie-wrapperM">
              <DotLottieReact
                src="https://lottie.host/972681cc-1c6e-4dd0-8034-89467595dfa7/p8H7Lzf6aJ.json"
                loop
                autoplay
              />
            </div>
          </div>
          <div className="principio-card" style={{ animationDelay: "0.4s" }}>
            <h3>VISIÓN</h3>
            <p>
              Aspiramos a ser líderes en la integración de tecnologías emergentes en América Latina, transformando la forma en que las empresas interactúan con la tecnología. Un referente de innovación y excelencia, mediante alianzas estratégicas que impulsen el crecimiento en un mercado globalizado.
            </p>
            <div className="lottie-wrapperV">
              <DotLottieReact
                src="https://lottie.host/f26d13c4-7df5-4be6-948d-12857cc4d9f6/cdITdEFzvF.json"
                loop
                autoplay
              />
            </div>
          </div>
          <div className="principio-card" style={{ animationDelay: "0.6s" }}>
            <h3>FILOSOFÍA</h3>
            <p>
              Nuestra filosofía se sustenta en un compromiso inquebrantable con la calidad, la innovación constante, la ética y la transparencia, y un enfoque total en el cliente que impulsa el desarrollo de soluciones tecnológicas integrales.
            </p>
            <div className="lottie-wrapperF">
              <DotLottieReact
                src="https://lottie.host/b7dd4335-8466-47e8-b141-415de9b63da5/I2ImR5UWVk.json"
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Nosotros;
