import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import "./StatsSection.css";

const StatsSection = () => {
  const statsData = [
    {
      icon: "😄",
      count: 97,
      suffix: "%",
      title: "Satisfacción",
      description: "Nuestra prioridad es la seguridad y confianza de nuestros clientes. Un 97% de ellos nos recomiendan.",
      smallText: "Promedio de satisfacción basado en encuestas internas.",
      buttonText: null,
      buttonLink: null
    },
    {
      icon: "🏆",
      count: 30,
      title: "Casos de Éxito",
      description: "Hemos implementado soluciones exitosas para más de 30 empresas de diversas industrias.",
      smallText: "Incluyendo telecomunicaciones, retail, banca y más.",
      buttonText: "Ver casos de éxito",
      buttonLink: "/Casos_de_exito"
    },
    {
      icon: "🌍",
      count: 2939,
      title: "Usuarios Activos",
      description: "Miles de usuarios confían en nuestras soluciones para sus operaciones diarias.",
      smallText: "Usuarios a nivel nacional e internacional.",
      buttonText: null,
      buttonLink: null
    },
    {
      icon: "📈",
      count: 196,
      title: "Certificaciones",
      description: "Contamos con más de 196 certificaciones en gestión TI y seguridad de la información.",
      smallText: "Reconocidas a nivel internacional.",
      buttonText: "Ver certificaciones",
      buttonLink: "/Certificaciones"
    }
  ];

  return (
    <div className="statistics-container">
      <motion.div
        className="stats-grid"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        {statsData.map((stat, index) => {
          const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });

          return (
            <motion.div
              key={index}
              ref={ref}
              className="stats-block-wrapper"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 10,
                mass: 0.5,
                delay: index * 0.2
              }}
              viewport={{ once: false }}
             >
          
              <div className="stats-block">
                <div className="stats-top">
                  <div className="stats-icon">{stat.icon}</div>
                  <h3 className="contentH">
                    {inView && (
                      <motion.span
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 0.6,
                          times: [0, 0.5, 1],
                          repeat: 0,
                          delay: 2
                        }}
                      >
                        <CountUp end={stat.count} suffix={stat.suffix} duration={2} key={inView ? "start" : "reset"} />
                      </motion.span>
                    )}
                  </h3>
                  <p className="extra-info">{stat.title}</p>
                </div>
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
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default StatsSection;
