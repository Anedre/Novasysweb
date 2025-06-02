import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import "./StatsSection.css";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

const statsData = [
  {
    icon: "😄",
    count: 97,
    suffix: "%",
    label: "Satisfacción",
    description: "Nuestra prioridad es la seguridad y confianza de nuestros clientes. Un 97% de ellos nos recomiendan.",
    shortDescription: "97% nos recomienda.",
    smallText: "Promedio de satisfacción basado en encuestas internas.",
    buttonText: null,
    buttonLink: null
  },
  {
    icon: "🏆",
    count: 30,
    suffix: "+",
    label: "Casos de Éxito",
    description: "Hemos implementado soluciones exitosas para más de 30 empresas de diversas industrias.",
    shortDescription: "30+ casos exitosos.",
    smallText: "Incluye telecomunicaciones, retail y banca.",
    buttonText: "Ver casos de éxito",
    buttonLink: "/Casos_de_exito"
  },
  {
    icon: "🌍",
    count: 78,
    suffix: "+",
    label: "Clientes Activos",
    description: "Miles de clientes confían en nuestras soluciones para sus operaciones diarias.",
    shortDescription: "78+ clientes activos.",
    smallText: "Clientes nacionales e internacionales.",
    buttonText: null,
    buttonLink: null
  },
  {
    icon: "📈",
    count: 20,
    suffix: "+",
    label: "Certificaciones",
    description: "Contamos con más de 20 certificaciones en gestión TI y seguridad de la información.",
    shortDescription: "20+ certificaciones.",
    smallText: "Reconocidas internacionalmente.",
    buttonText: "Ver certificaciones",
    buttonLink: "/Certificaciones"
  }
];

const flipVariants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.38, ease: [0.45, 1.8, 0.47, 1.01] }
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.38, ease: [0.45, 1.8, 0.47, 1.01] }
  }
};

const StatsSection = () => {
  const isMobile = useIsMobile();
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="stats-container">
      <div className="stats-grid">
        {statsData.map((stat, index) => {
          const isFlipped = isMobile
            ? flippedIndex === index
            : hoveredIndex === index;

          // Hook IntersectionObserver para cada card
          const { ref, inView } = useInView({
            threshold: 0.5, // 50% de la tarjeta debe estar visible
            triggerOnce: false, // Se reinicia siempre
          });

          // Para forzar reinicio de CountUp cuando sale/entra
          const [countKey, setCountKey] = useState(0);
          useEffect(() => {
            if (inView) {
              setCountKey((k) => k + 1); // Cambia la key => reinicia CountUp
            }
          }, [inView]);

          return (
            <div
              key={index}
              className="stats-block-wrapper"
              ref={ref}
              onClick={() => isMobile && setFlippedIndex(prev => prev === index ? null : index)}
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
            >
              <motion.div
                className="stats-block"
                style={{ perspective: 700 }}
                animate={isFlipped ? "back" : "front"}
                variants={flipVariants}
              >
                {/* Cara frontal */}
                <motion.div
                  className="stats-card-face stats-card-front"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    zIndex: 2,
                    pointerEvents: isFlipped ? "none" : "auto",
                    opacity: isFlipped ? 0 : 1
                  }}
                  initial={false}
                  animate={{ opacity: isFlipped ? 0 : 1 }}
                  transition={{ duration: 0.13 }}
                >
                  <div className="stats-icon">{stat.icon}</div>
                  <div className="stats-number">
                    {/* CountUp reinicia cada vez que la card entra a la vista */}
                    {inView && (
                      <CountUp
                        key={countKey}
                        end={stat.count}
                        suffix={stat.suffix}
                        duration={2.5}
                        easingFn={(t, b, c, d) => {
                          // EaseOutCubic, ¡suavecito!
                          t /= d;
                          t--;
                          return c*(t*t*t + 1) + b;
                        }}
                      />

                    )}
                  </div>
                  <div className="stats-label">{stat.label}</div>
                </motion.div>

                {/* Cara trasera */}
                <motion.div
                  className="stats-card-face stats-card-back"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    zIndex: 3,
                    transform: "rotateY(180deg)",
                    pointerEvents: isFlipped ? "auto" : "none",
                    opacity: isFlipped ? 1 : 0
                  }}
                  initial={false}
                  animate={{ opacity: isFlipped ? 1 : 0 }}
                  transition={{ duration: 0.13 }}
                >
                  <div className="stats-bottom-mobile-content">
                    <p className="stats-desc">
                      {isMobile ? stat.shortDescription : stat.description}
                    </p>
                    {/* Solo en desktop mostramos smallText */}
                    {!isMobile && (
                      <small className="stats-small">{stat.smallText}</small>
                    )}
                    {stat.buttonText && stat.buttonLink && (
                      <Link to={stat.buttonLink} className="hover-button">
                        {stat.buttonText}
                      </Link>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsSection;
