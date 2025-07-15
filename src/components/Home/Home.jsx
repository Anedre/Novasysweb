import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './Home.css';
import entel from '../../img/entel.png';
import pacifico from '../../img/pacifico.svg';
import renzocosta from '../../img/renzocosta.png';
import americatel from '../../img/americatel.png';
import IntroAnimation from '../Background/IntroAnimation.jsx';
import SolucionesCarousel from '../../scripts/CustomCarousel/CustomCarousel.jsx';
import StatsSection from '../../scripts/StatsSection/StatsSection.jsx';

function Home() {
  const successItems = [
    { img: entel, title: 'CRM Entel Empresas', desc: 'Entel optimizó...', tags: ['💼 CRM', '☁️ Oracle'], link: '/Entel' },
    { img: pacifico, title: 'Proyecto Pacífico', desc: 'Pacífico mejora...', tags: ['🏥 Salud', '💼 CRM'] },
    { img: renzocosta, title: 'Proyecto Renzo Costa', desc: 'Implementación pendiente...', tags: ['🛍️ Retail', '🧥 Moda'], link: '/Renzo' },
    { img: americatel, title: 'Proyecto Americatel', desc: 'Americatel mejora...', tags: ['📡 Telecom', '💼 CRM'] },
  ];

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

  const sectionVariant = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const sectionRefs = useRef([]);
  const [scrolling, setScrolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Si quieres que funcione también en móvil, quita esta función
  const isDesktop = () => window.innerWidth > 1024;

  useEffect(() => {
    const sections = sectionRefs.current;

    // Actualiza el índice según scroll manual
    const onScroll = () => {
      const scrollY = window.scrollY;
      let idx = 0;
      sections.forEach((sec, i) => {
        if (sec.offsetTop <= scrollY + window.innerHeight / 2) {
          idx = i;
        }
      });
      setCurrentIndex(idx);
    };
    window.addEventListener('scroll', onScroll);

    // Maneja la rueda para saltar sección
    const handleWheel = (e) => {
      if (!isDesktop() || scrolling) return;

      // Pequeño umbral para ignorar micro-scrolls
      if (Math.abs(e.deltaY) < 10) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + direction;
      if (nextIndex < 0 || nextIndex >= sections.length) {
        // Si no hay más secciones, dejamos el scroll normal
        return;
      }

      // Bloquear el scroll nativo y hacer el salto suave
      e.preventDefault();
      setScrolling(true);

      const targetTop = sections[nextIndex].offsetTop;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      setCurrentIndex(nextIndex);

      // Desbloquear después de que termine el scroll
      setTimeout(() => setScrolling(false), 800);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    // Por si redimensionan la ventana durante un scroll
    const onResize = () => setScrolling(false);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', onResize);
    };
  }, [scrolling, currentIndex]);

  return (
    <div className="Home">
      {/* Sección 0: Intro */}
      <section
        className="section-scroll intro-section"
        ref={el => (sectionRefs.current[0] = el)}
      >
        <IntroAnimation />
      </section>

      {/* Sección 1: Casos de éxito */}
      <motion.section
        className="section-scroll section__paragraph1"
        ref={el => (sectionRefs.current[1] = el)}
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.4 }}
      >
        <h2>Casos de éxito</h2>
        <p>Nuestros casos de éxito más recientes y destacados en Perú</p>
        <div className="success-grid">
          {successItems.map((item, i) => (
            <motion.div
              key={i}
              className="success-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="success-logo-wrapper">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="success-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="success-tags">
                  {item.tags.map((tag, j) => (
                    <span key={j} className="tag">{tag}</span>
                  ))}
                </div>
                {item.link && (
                  <Link to={item.link}>
                    <div className="more-link">➡️ Ver más</div>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <Link to="/Casos_de_exito" className="btn-casos">
          Ver Casos de Éxito
        </Link>
      </motion.section>

      {/* Sección 2: Nuestras soluciones */}
      <motion.section
        className="section-scroll section__paragraph2"
        ref={el => (sectionRefs.current[2] = el)}
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.4 }}
      >
        <div className="solutions-content-wrapper">
          <div className="solutions-text-wrapper">
            <div className="solutions-text">
              <h2>Nuestras soluciones</h2>
              <p>
                Ofrecemos una gran variedad de servicios e implementaciones en
                asociación con las empresas tecnológicas más importantes
              </p>
              <div className="solutions-btn">
                <Link to="/Soluciones_novasys" className="btn-casos">
                  Ver nuestras soluciones
                </Link>
              </div>
            </div>
          </div>
          <div className="solutions-carousel">
            <SolucionesCarousel />
          </div>
        </div>
      </motion.section>

      {/* Sección 3: Estadísticas */}
      <motion.section
        className="section-scroll section__paragraph3"
        ref={el => (sectionRefs.current[3] = el)}
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.4 }}
      >
        <StatsSection />
      </motion.section>
    </div>
  );
}

export default Home;
