import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const timeline = [
  {
    year: "2005",
    title: "Fundación de Novasys",
    subtitle: "El inicio de una visión tecnológica",
    description: "Novasys nace en Lima, Perú, con la misión de transformar empresas a través de la tecnología. Desde el día uno, nos enfocamos en ser más que proveedores: somos socios estratégicos que entienden el negocio de nuestros clientes.",
    highlights: ["Primer proyecto CRM implementado", "Equipo fundador de 5 expertos", "Oficina central en Lima"],
    image: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/crono1.mp4",
    isVideo: true,
    icon: "🚀"
  },
  {
    year: "2010",
    title: "Expansión de Servicios",
    subtitle: "Diversificación y crecimiento",
    description: "Ampliamos nuestro portafolio para ofrecer soluciones integrales en CRM, Business Intelligence y Marketing Digital. Nuestro equipo crece a más de 30 profesionales certificados.",
    highlights: ["Soluciones BI implementadas", "Marketing Digital integrado", "+50 clientes corporativos"],
    image: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/crono2.mp4",
    isVideo: true,
    icon: "📈"
  },
  {
    year: "2015",
    title: "Alianzas Estratégicas",
    subtitle: "Partners de clase mundial",
    description: "Consolidamos alianzas estratégicas con líderes tecnológicos globales como Oracle, HP, Amazon Web Services y Microsoft. Estas partnerships nos permiten ofrecer las mejores soluciones del mercado.",
    highlights: ["Oracle Gold Partner", "AWS Select Partner", "HP Platinum Partner"],
    image: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/crono3.mp4",
    isVideo: true,
    icon: "🤝"
  },
  {
    year: "2020",
    title: "Presencia Internacional",
    subtitle: "Sin fronteras, sin límites",
    description: "Expandimos nuestras operaciones a Norteamérica con la apertura de oficinas en Canadá. La transformación digital acelerada nos posiciona como líderes en soluciones cloud y trabajo remoto.",
    highlights: ["Oficinas en Canadá", "Operaciones 100% cloud", "+200 proyectos exitosos"],
    image: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/crono4.mp4",
    isVideo: true,
    icon: "🌎"
  },
  {
    year: "2023",
    title: "20 Años de Innovación",
    subtitle: "Dos décadas transformando empresas",
    description: "Celebramos 20 años liderando la transformación digital en Latinoamérica. Hoy somos más de 100 profesionales, con presencia en múltiples países y un compromiso inquebrantable con la excelencia e innovación.",
    highlights: ["+500 clientes satisfechos", "+100 profesionales", "Presencia multinacional"],
    image: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/Novasys-20años-Logo.MOV",
    isVideo: true,
    icon: "🎉"
  },
];

function TimelineFullscreen({ items = timeline }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const autoplayRef = useRef(null);

  const handleYearClick = (index) => {
    if (index !== activeIndex && !isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 600);
      resetAutoplay();
    }
  };

  const handleNext = () => {
    if (!isTransitioning) {
      const nextIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
      handleYearClick(nextIndex);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      const prevIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
      handleYearClick(prevIndex);
    }
  };

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
      }, 6000);
    }
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isPaused]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isTransitioning]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const activeItem = items[activeIndex];

  return (
    <div 
      className="tl-fullscreen" 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fondo con video/imagen */}
      <div className="tl-background">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="tl-bg-media"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {activeItem.isVideo ? (
              <video
                src={activeItem.image}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img src={activeItem.image} alt={activeItem.title} />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="tl-bg-overlay" />
        <div className="tl-bg-gradient" />
      </div>

      {/* Header con modo y barra de progreso */}
      <div className="tl-header">
        <span className="tl-mode-label">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Historia
        </span>
        <div className="tl-progress-dots">
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`tl-progress-dot ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => handleYearClick(idx)}
              aria-label={`Ir a ${items[idx].year}`}
            >
              {idx === activeIndex && !isPaused && (
                <motion.span 
                  className="tl-progress-fill"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
        <span className="tl-counter">
          <button onClick={handlePrev}>←</button>
          <span>{activeIndex + 1} / {items.length}</span>
          <button onClick={handleNext}>→</button>
        </span>
      </div>

      {/* Año gigante */}
      <motion.div 
        className="tl-giant-year"
        key={activeItem.year}
        initial={{ opacity: 0, x: -100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {activeItem.year}
      </motion.div>

      {/* Contenido principal */}
      <div className="tl-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="tl-content-inner"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span
              className="tl-subtitle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              {activeItem.subtitle}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {activeItem.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {activeItem.description}
            </motion.p>

            <motion.ul
              className="tl-highlights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {activeItem.highlights && activeItem.highlights.map((highlight, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + idx * 0.1, duration: 0.4 }}
                >
                  <span className="tl-highlight-icon">✓</span>
                  {highlight}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Línea de tiempo vertical */}
      <div className="tl-vertical-line">
        <div className="tl-line-track">
          <motion.div 
            className="tl-line-progress"
            animate={{ 
              height: `${((activeIndex + 1) / items.length) * 100}%` 
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          
          return (
            <motion.button
              key={item.year}
              className={`tl-year-node ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
              onClick={() => handleYearClick(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="tl-node-dot">
                {isActive && (
                  <motion.span 
                    className="tl-node-pulse"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </span>
              <span className="tl-node-year">{item.year}</span>
              {isActive && (
                <motion.span 
                  className="tl-node-indicator"
                  initial={{ width: 0 }}
                  animate={{ width: 30 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Indicador de pausa */}
      <motion.div 
        className="tl-pause-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPaused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span>⏸ Pausado</span>
      </motion.div>
    </div>
  );
}

export default TimelineFullscreen;
export { timeline };
