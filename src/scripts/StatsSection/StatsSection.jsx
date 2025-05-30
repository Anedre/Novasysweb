import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import "./StatsSection.css";

// Helper hook para detectar mobile en tiempo real
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

const StatsSection = () => {
  const statsData = [
    {
      icon: "😄",
      count: 97,
      suffix: "%",
      titleST: "Satisfacción",
      description: "Nuestra prioridad es la seguridad y confianza de nuestros clientes. Un 97% de ellos nos recomiendan.",
      smallText: "Promedio de satisfacción basado en encuestas internas.",
      buttonText: null,
      buttonLink: null
    },
    {
      icon: "🏆",
      count: 30,
      suffix: "+",
      titleST: "Casos de Éxito",
      description: "Hemos implementado soluciones exitosas para más de 30 empresas de diversas industrias.",
      smallText: "Incluyendo telecomunicaciones, retail, banca y más.",
      buttonText: "Ver casos de éxito",
      buttonLink: "/Casos_de_exito"
    },
    {
      icon: "🌍",
      count: 78,
      suffix: "+",
      titleST: "Clientes Activos",
      description: "Miles de clientes confían en nuestras soluciones para sus operaciones diarias.",
      smallText: "Clientes a nivel nacional e internacional.",
      buttonText: null,
      buttonLink: null
    },
    {
      icon: "📈",
      count: 20,
      suffix: "+",
      titleST: "Certificaciones",
      description: "Contamos con más de 20 certificaciones en gestión TI y seguridad de la información.",
      smallText: "Reconocidas a nivel internacional.",
      buttonText: "Ver certificaciones",
      buttonLink: "/Certificaciones"
    }
  ];

  const isMobile = useIsMobile();
  const [ref, inView] = useInView({ triggerOnce: true });
  const [flippedIndex, setFlippedIndex] = useState(null);

  // Al cambiar el tamaño de pantalla, resetea los flips para evitar glitches
  useEffect(() => { setFlippedIndex(null); }, [isMobile]);

  const handleFlip = (idx) => {
    if (!isMobile) return;
    setFlippedIndex(flippedIndex === idx ? null : idx);
  };

  return (
    <div className="statistics-container" ref={ref}>
      <motion.div
        className="stats-grid"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {statsData.map((stat, index) => {
          const [cardRef, cardInView] = useInView({ triggerOnce: false, threshold: 0.5 });
          const isFlipped = isMobile && flippedIndex === index;
          return (
            <div
              key={index}
              ref={cardRef}
              className={`stats-block-wrapper${isFlipped ? " flipped" : ""}`}
              onClick={() => handleFlip(index)}
            >
              <div className={`stats-block${isFlipped ? " flip-anim" : ""}`}>
                {/* Cara frontal: SIEMPRE */}
                <div className="stats-card-face stats-card-front">
                  <div className="stats-top">
                    <div className="stats-icon">{stat.icon}</div>
                    <h3 className="contentH">
                      <CountUp
                        end={cardInView ? stat.count : 0}
                        suffix={stat.suffix}
                        duration={2}
                        redraw={true}
                      />
                    </h3>
                    <p className="extra-infoST">{stat.titleST}</p>
                  </div>
                </div>
                {/* Cara trasera: SOLO MOBILE */}
                {isMobile && (
                  <div className="stats-card-face stats-card-back">
                    <div className="stats-bottom-mobile-content">
                      <p>{stat.description}</p>
                      <small>{stat.smallText}</small>
                      {stat.buttonText && stat.buttonLink && (
                        <Link to={stat.buttonLink} className="hover-button">
                          {stat.buttonText}
                        </Link>
                      )}
                    </div>
                  </div>
                )}
                {/* Escritorio: info extra SOLO DESKTOP */}
                {!isMobile && (
                  <>
                    <div className="separator-line"></div>
                    <div className="stats-bottom">
                      <p>{stat.description}</p>
                      <small>{stat.smallText}</small>
                      {stat.buttonText && stat.buttonLink && (
                        <Link to={stat.buttonLink} className="hover-button">
                          {stat.buttonText}
                        </Link>
                      )}
                    </div>
                  </>
                )}
              </div>              
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default StatsSection;
