import React, { useState, useRef, useEffect } from 'react';
import CountUp from 'react-countup';
import { FaShieldAlt, FaTrophy, FaUsers, FaCertificate } from 'react-icons/fa';
import "./StatsSection.css";

function StatsSection() {
  const [startCount, setStartCount] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        } else {
          setStartCount(false);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  return (
    <div className={`statistics-container ${startCount ? "active" : ""}`} ref={statsRef}>
      {/* Bloque 1: Satisfacción */}
      <div className="stats-block-wrapper">
        <div className="stats-block">
          <div className="border-fill"></div>
          <div className="contentH">
            <h2>{startCount ? <CountUp end={97} duration={2} /> : 0}%</h2>
            <div className="dividerST" />
            <p>Satisfacción</p>
          </div>
          <div className="extra-info">
            <div className="detail">
              <span className="icon"><FaShieldAlt /></span>
              <p>Nuestra prioridad es la seguridad y confianza de nuestros clientes. Un 97% de ellos nos recomiendan.</p>
              <small>Promedio de satisfacción basado en encuestas internas.</small>
            </div>
          </div>
        </div>
      </div>
  
      {/* Bloque 2: Casos de Éxito */}
      <div className="stats-block-wrapper">
        <div className="stats-block">
          <div className="border-fill"></div>
          <div className="contentH">
            <h2>+{startCount ? <CountUp end={30} duration={2} /> : 0}</h2>
            <div className="dividerST" />
            <p>Casos de Éxito</p>
          </div>
          <div className="extra-info">
            <div className="detail">
              <span className="icon"><FaTrophy /></span>
              <p>Hemos implementado soluciones tecnológicas para más de 30 empresas en diversas industrias.</p>
              <a href="/Casos_de_exito" className="btn">Ver casos de éxito</a>
            </div>
          </div>
        </div>
      </div>
  
      {/* Bloque 3: Usuarios Activos */}
      <div className="stats-block-wrapper">
        <div className="stats-block">
          <div className="border-fill"></div>
          <div className="contentH">
            <h2>+{startCount ? <CountUp end={2939} duration={2} separator="," /> : 0}</h2>
            <div className="dividerST" />
            <p>Usuarios Activos</p>
          </div>
          <div className="extra-info">
            <div className="detail">
              <span className="icon"><FaUsers /></span>
              <p>Cientos de empresas y profesionales confían en nuestras soluciones de ciberseguridad y gestión TI.</p>
            </div>
          </div>
        </div>
      </div>
  
      {/* Bloque 4: Certificaciones */}
      <div className="stats-block-wrapper">
        <div className="stats-block">
          <div className="border-fill"></div>
          <div className="contentH">
            <h2>+{startCount ? <CountUp end={196} duration={2} /> : 0}</h2>
            <div className="dividerST" />
            <p>Certificaciones</p>
          </div>
          <div className="extra-info">
            <div className="detail">
              <span className="icon"><FaCertificate /></span>
              <p>Contamos con más de 196 certificaciones en seguridad, gestión TI y tecnologías emergentes.</p>
              <a href="/certificaciones" className="btn">Ver certificaciones</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default StatsSection;
