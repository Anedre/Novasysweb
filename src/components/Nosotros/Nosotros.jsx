import React, { useRef, useState, useEffect, lazy, Suspense, memo } from "react";
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { 
  FiTarget, 
  FiZap, 
  FiUsers, 
  FiAward, 
  FiShield, 
  FiTrendingUp 
} from "react-icons/fi";

import "./Nosotros.css";

// Lazy load componentes pesados
const TrianglesExample = lazy(() => import("../Background/TrianglesExample.jsx"));
const MapaPresencia = lazy(() => import("../../scripts/Mapa/MapaPresencia.jsx"));



import figura5 from "../../assets/figura7.svg";
import figura6 from "../../assets/figura8.svg";

// Imágenes corporativas para el Hero
import heroImg1 from "../../img/Corporativo/campaign-creators-gMsnXqILjp4-unsplash.jpg";
import heroImg2 from "../../img/Corporativo/cherrydeck-rMILC1PIwM0-unsplash.jpg";
import heroImg3 from "../../img/Corporativo/sigmund-Fa9b57hffnM-unsplash.jpg";
import heroImg4 from "../../img/Corporativo/krakenimages-Y5bvRlcCx8k-unsplash.jpg";
import heroBg from "../../img/Corporativo/mario-gogh-VBLHICVh-lI-unsplash.jpg";

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

// Datos para la sección de principios visual
const principiosData = [
  {
    id: 'mision',
    title: 'Misión',
    subtitle: 'Nuestro propósito',
    description: 'Impulsar la transformación digital de las organizaciones mediante soluciones tecnológicas integrales, personalizadas e innovadoras que generen valor real y sostenible.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    color: '#e62b1e',
    lottie: 'https://lottie.host/972681cc-1c6e-4dd0-8034-89467595dfa7/p8H7Lzf6aJ.json',
    highlights: ['Soluciones a medida', 'Innovación constante', 'Resultados medibles']
  },
  {
    id: 'vision',
    title: 'Visión',
    subtitle: 'Hacia dónde vamos',
    description: 'Ser reconocidos como líderes en la integración de tecnologías emergentes en América Latina, siendo el referente de excelencia y confianza en transformación digital.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    color: '#ff6b35',
    lottie: 'https://lottie.host/fc27f938-0264-4d67-8f6d-f48ed4e13ae6/oUXV2UnuHn.json',
    highlights: ['Liderazgo regional', 'Excelencia operativa', 'Expansión global']
  },
  {
    id: 'filosofia',
    title: 'Filosofía',
    subtitle: 'Lo que nos guía',
    description: 'Mantenemos un compromiso inquebrantable con la calidad, innovación, ética y transparencia. Construimos relaciones de largo plazo basadas en la confianza.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    color: '#ffae42',
    lottie: 'https://lottie.host/b7dd4335-8466-47e8-b141-415de9b63da5/I2ImR5UWVk.json',
    highlights: ['Integridad total', 'Orientación al cliente', 'Mejora continua']
  }
];

const valoresData = [
  { icon: FiTarget, nombre: 'Compromiso', desc: 'Con cada proyecto' },
  { icon: FiZap, nombre: 'Innovación', desc: 'Tecnología de vanguardia' },
  { icon: FiUsers, nombre: 'Colaboración', desc: 'Trabajo en equipo' },
  { icon: FiAward, nombre: 'Excelencia', desc: 'En cada entrega' },
  { icon: FiShield, nombre: 'Integridad', desc: 'Ética y transparencia' },
  { icon: FiTrendingUp, nombre: 'Agilidad', desc: 'Respuesta rápida' },
];

/* =============================================
   TIMELINE FULLSCREEN "TIME MODE"
   Diseño cinematográfico con autoplay
   ============================================= */

function TimelineFullscreen({ items }) {
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
      // Reiniciar autoplay al hacer click
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

  // Autoplay
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
      }, 6000); // Cambiar cada 6 segundos
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

  // Pausar autoplay al hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isTransitioning]);

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {activeItem.isVideo ? (
              <video
                src={activeItem.image}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <img src={activeItem.image} alt={activeItem.title} loading="lazy" />
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
            {/* Subtítulo */}
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

            {/* Highlights */}
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

function Nosotros() {
  const source = {
    type: "video",
    sources:[
      { src: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/video.mp4", type: "video/mp4" }
    ],
  };

  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const equipo = [
    { nombre: "Renzo Malpartida", rol: "CEO & Fundador", descripcion: "Visionario líder con +25 años en TI", imagen: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/images/team-placeholder-1.jpg" },
    { nombre: "María García", rol: "Directora de Operaciones", descripcion: "Experta en gestión de proyectos", imagen: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/images/team-placeholder-2.jpg" },
    { nombre: "Carlos Mendoza", rol: "Director de Tecnología", descripcion: "Arquitecto de soluciones cloud", imagen: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/images/team-placeholder-3.jpg" },
    { nombre: "Ana Torres", rol: "Directora Comercial", descripcion: "Estratega de negocios", imagen: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/images/team-placeholder-4.jpg" }
  ];

  const logrosData = [
    { numero: "500+", label: "Proyectos Completados", icon: "📊" },
    { numero: "98%", label: "Clientes Satisfechos", icon: "⭐" },
    { numero: "15+", label: "Industrias Atendidas", icon: "🏢" },
    { numero: "24/7", label: "Soporte Disponible", icon: "🛡️" }
  ];

  const clientesLogos = [
    "Oracle", "AWS", "Microsoft", "HP", "SAP", "Salesforce", "Google Cloud", "IBM"
  ];


  const [mode, setMode] = useState("day");
const toggleMode = () => {
  const newMode = mode === "day" ? "night" : "day";
  setMode(newMode);
  document.body.classList.toggle("night", newMode === "night");
  document.body.classList.toggle("day", newMode === "day");
};

  return (
    <motion.div
      className="nosotros"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >    
      {/* ============================================= 
          HERO PREMIUM - NOSOTROS
          ============================================= */}
      <section className="hero-nosotros-premium">
        {/* Fondo con imagen y gradiente */}
        <div className="hero-np-background">
          <img src={heroBg} alt="" className="hero-np-bg-image" />
          <div className="hero-np-gradient" />
          <div className="hero-np-pattern" />
          <div className="hero-np-glow hero-np-glow-1" />
          <div className="hero-np-glow hero-np-glow-2" />
          
          {/* Partículas flotantes - Reducidas para mejor rendimiento */}
          <div className="hero-np-particles">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className={`hero-np-particle hero-np-particle-${i % 4}`}
                style={{
                  left: `${15 + (i * 14)}%`,
                  top: `${20 + ((i * 20) % 60)}%`,
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            ))}
          </div>

          {/* Líneas decorativas */}
          <div className="hero-np-lines">
            <div className="hero-np-line hero-np-line-1" />
            <div className="hero-np-line hero-np-line-2" />
            <div className="hero-np-line hero-np-line-3" />
          </div>
        </div>

        <div className="hero-np-container">
          {/* Lado izquierdo - Contenido */}
          <motion.div 
            className="hero-np-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div 
              className="hero-np-badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <span className="hero-np-badge-icon">🏢</span>
              <span>Sobre Nosotros</span>
            </motion.div>

            {/* Título principal */}
            <motion.h1 
              className="hero-np-title"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              Transformamos
              <span className="hero-np-title-highlight"> empresas </span>
              a través de la
              <span className="hero-np-title-accent"> tecnología</span>
            </motion.h1>

            {/* Descripción */}
            <motion.p 
              className="hero-np-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Más de 20 años liderando la transformación digital en Latinoamérica. 
              Somos tu socio estratégico para llevar tu negocio al siguiente nivel 
              con soluciones innovadoras y un equipo de expertos comprometidos.
            </motion.p>

            {/* Stats rápidos */}
            <motion.div 
              className="hero-np-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="hero-np-stat">
                <span className="hero-np-stat-number">20+</span>
                <span className="hero-np-stat-label">Años de experiencia</span>
              </div>
              <div className="hero-np-stat">
                <span className="hero-np-stat-number">500+</span>
                <span className="hero-np-stat-label">Clientes satisfechos</span>
              </div>
              <div className="hero-np-stat">
                <span className="hero-np-stat-number">100+</span>
                <span className="hero-np-stat-label">Profesionales</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              className="hero-np-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <a href="#quienes-somos" className="hero-np-btn-primary">
                Conoce nuestra historia
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
              <a href="#nuestra-trayectoria" className="hero-np-btn-secondary">
                Ver timeline
              </a>
            </motion.div>
          </motion.div>

          {/* Lado derecho - Galería de imágenes */}
          <motion.div 
            className="hero-np-gallery"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {/* Imagen principal grande */}
            <motion.div 
              className="hero-np-img-main"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img src={heroImg1} alt="Equipo Novasys" />
            </motion.div>

            {/* Grid de imágenes secundarias */}
            <div className="hero-np-img-grid">
              <motion.div 
                className="hero-np-img-secondary"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.3 }}
              >
                <img src={heroImg2} alt="Colaboración" />
              </motion.div>
              <motion.div 
                className="hero-np-img-secondary"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.3 }}
              >
                <img src={heroImg3} alt="Analytics" />
              </motion.div>
              <motion.div 
                className="hero-np-img-secondary"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.3 }}
              >
                <img src={heroImg4} alt="Trabajo en equipo" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="hero-np-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span>Scroll</span>
          <motion.div 
            className="hero-np-scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </section>


      {/* =============================================
          SECCIÓN: QUIÉNES SOMOS - REDISEÑO PREMIUM
          ============================================= */}
      <section className="about-section" id="quienes-somos">
        {/* Background - CSS animations para mejor rendimiento */}
        <div className="about-bg">
          <div className="about-bg-shape about-bg-shape-1" />
          <div className="about-bg-shape about-bg-shape-2" />
          <div className="about-bg-gradient" />
        </div>

        <div className="about-container">
          {/* Header de sección */}
          <motion.div 
            className="about-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="about-label">Conócenos</span>
            <h2 className="about-title">¿Quiénes Somos?</h2>
            <p className="about-subtitle">
              Somos más que una empresa de tecnología — somos tu socio estratégico 
              en la transformación digital
            </p>
          </motion.div>

          {/* Grid principal */}
          <div className="about-grid">
            {/* Columna izquierda - Video y Stats */}
            <motion.div 
              className="about-media"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="about-video-wrapper">
                <Plyr source={source} options={{ autoplay: true, muted: true, playsinline: true }} />
                <div className="about-video-glow" />
              </div>
            </motion.div>

            {/* Columna derecha - Contenido */}
            <motion.div 
              className="about-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="about-content-title">
                Integradores de tecnología con 
                <span className="about-highlight"> +20 años </span> 
                de experiencia
              </h3>
              
              <p className="about-content-text">
                Novasys es una empresa integradora de tecnología de la información y consultoría 
                especializada. Contamos con más de dos décadas implementando y desarrollando 
                soluciones de software capaces de cumplir con las necesidades de las empresas 
                más exigentes del mercado.
              </p>

              <p className="about-content-text">
                Nuestro equipo de expertos certificados trabaja de la mano con los líderes 
                tecnológicos mundiales para ofrecer soluciones de clase mundial que impulsan 
                la innovación y el crecimiento empresarial.
              </p>

              {/* Features list */}
              <div className="about-features">
                <div className="about-feature">
                  <div className="about-feature-icon">✓</div>
                  <div className="about-feature-text">
                    <strong>Consultoría Estratégica</strong>
                    <span>Análisis y diseño de soluciones a medida</span>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">✓</div>
                  <div className="about-feature-text">
                    <strong>Implementación Experta</strong>
                    <span>Equipos certificados en las mejores tecnologías</span>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">✓</div>
                  <div className="about-feature-text">
                    <strong>Soporte Continuo</strong>
                    <span>Acompañamiento post-implementación 24/7</span>
                  </div>
                </div>
              </div>

              {/* Partners logos */}
              <div className="about-partners">
                <span className="about-partners-label">Partners tecnológicos:</span>
                <div className="about-partners-logos">
                  <span>Oracle</span>
                  <span>AWS</span>
                  <span>HP</span>
                  <span>Microsoft</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =============================================
          SECCIÓN: STATS BAR - Estadísticas en línea
          ============================================= */}
      <section className="stats-bar-section">
        <div className="stats-bar-container">
          <motion.div 
            className="stats-bar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="stats-bar-item">
              <span className="stats-bar-number">500+</span>
              <span className="stats-bar-label">Proyectos Exitosos</span>
            </div>
            <div className="stats-bar-divider" />
            <div className="stats-bar-item">
              <span className="stats-bar-number">20+</span>
              <span className="stats-bar-label">Años de Experiencia</span>
            </div>
            <div className="stats-bar-divider" />
            <div className="stats-bar-item">
              <span className="stats-bar-number">3</span>
              <span className="stats-bar-label">Países</span>
            </div>
            <div className="stats-bar-divider" />
            <div className="stats-bar-item">
              <span className="stats-bar-number">100+</span>
              <span className="stats-bar-label">Profesionales</span>
            </div>
          </motion.div>
        </div>
      </section>


      {/* =============================================
          SECCIÓN: PRINCIPIOS - SHOWCASE VISUAL
          ============================================= */}
      <section className="principles-showcase">
        {/* Background dinámico con partículas */}
        <div className="principles-bg">
          <div className="principles-bg-grid" />
          <div className="principles-bg-glow principles-bg-glow-1" />
          <div className="principles-bg-glow principles-bg-glow-2" />
          
          {/* Partículas flotantes */}
          <div className="principles-particles">
            {[...Array(35)].map((_, i) => (
              <span 
                key={i} 
                className={`principles-particle principles-particle-${i % 5}`}
                style={{
                  left: `${3 + (i * 2.8)}%`,
                  top: `${5 + ((i * 13) % 90)}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
          
          {/* Líneas decorativas diagonales */}
          <div className="principles-lines">
            <div className="principles-line principles-line-1" />
            <div className="principles-line principles-line-2" />
            <div className="principles-line principles-line-3" />
          </div>
          
          {/* Círculos decorativos */}
          <div className="principles-circles">
            <div className="principles-circle principles-circle-1" />
            <div className="principles-circle principles-circle-2" />
            <div className="principles-circle principles-circle-3" />
          </div>
        </div>

        <div className="principles-container">
          {/* Header */}
          <motion.div 
            className="principles-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="principles-label">Nuestros Principios</span>
            <h2 className="principles-title">Lo que nos define</h2>
            <p className="principles-subtitle">
              Tres pilares fundamentales que guían cada decisión y cada proyecto
            </p>
          </motion.div>

          {/* Showcase de principios */}
          {principiosData.map((principio, index) => (
            <motion.div
              key={principio.id}
              className={`principle-showcase ${index % 2 === 1 ? 'reverse' : ''}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              {/* Media side */}
              <div className="principle-media">
                <div className="principle-image-wrapper">
                  <img src={principio.image} alt={principio.title} />
                  <div className="principle-image-overlay" style={{ background: `linear-gradient(135deg, ${principio.color}40, transparent)` }} />
                </div>
              </div>

              {/* Content side */}
              <div className="principle-content">
                <div className="principle-number" style={{ color: principio.color }}>
                  0{index + 1}
                </div>
                <span className="principle-subtitle-text">{principio.subtitle}</span>
                <h3 className="principle-title" style={{ borderColor: principio.color }}>
                  {principio.title}
                </h3>
                <p className="principle-description">{principio.description}</p>
                
                <ul className="principle-highlights">
                  {principio.highlights.map((highlight, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <span className="highlight-icon" style={{ background: principio.color }}>✓</span>
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* Valores Grid */}
          <motion.div 
            className="valores-section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="valores-title">Nuestros Valores</h3>
            <div className="valores-grid">
              {valoresData.map((valor, index) => (
                <motion.div
                  key={valor.nombre}
                  className="valor-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <span className="valor-icon">
                    <valor.icon />
                  </span>
                  <span className="valor-nombre">{valor.nombre}</span>
                  <span className="valor-desc">{valor.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline CASCADA HORIZONTAL */}
      <section className="nosotros-timeline-section">
        <motion.div
          className="nosotros-timeline-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Nuestra Historia</h2>
          <p>20 años innovando y transformando empresas</p>
        </motion.div>
        <TimelineFullscreen items={timeline} />
      </section>

      {/* =============================================
          SECCIÓN: EQUIPO PREMIUM
          ============================================= */}
      <section className="team-premium-section">
        {/* Background */}
        <div className="team-bg">
          <div className="team-bg-gradient" />
          <div className="team-bg-pattern" />
          <div className="team-bg-glow team-bg-glow-1" />
          <div className="team-bg-glow team-bg-glow-2" />
        </div>

        <div className="team-container">
          {/* Header */}
          <motion.div 
            className="team-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="team-label">Nuestro Equipo</span>
            <h2 className="team-title">Los expertos detrás del éxito</h2>
            <p className="team-subtitle">
              Profesionales apasionados que impulsan la innovación
            </p>
          </motion.div>

          {/* Grid de equipo */}
          <div className="team-grid">
            {equipo.map((persona, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="team-card-image">
                  <div className="team-card-image-placeholder">
                    <span>{persona.nombre.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className="team-card-overlay" />
                </div>
                <div className="team-card-content">
                  <h3 className="team-card-name">{persona.nombre}</h3>
                  <span className="team-card-role">{persona.rol}</span>
                  <p className="team-card-desc">{persona.descripcion}</p>
                  <div className="team-card-socials">
                    <a href="#" aria-label="LinkedIn">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Banner de contratación */}
          <motion.div 
            className="team-hiring-banner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="team-hiring-content">
              <span className="team-hiring-badge">Estamos contratando</span>
              <h3>¿Quieres ser parte del equipo?</h3>
              <p>Buscamos talentos apasionados por la tecnología</p>
            </div>
            <a href="/Contacto" className="team-hiring-btn">
              Ver Oportunidades
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* =============================================
          SECCIÓN: PRESENCIA GLOBAL
          ============================================= */}
      <section className="presence-premium-section">
        {/* Background */}
        <div className="presence-bg">
          <div className="presence-bg-gradient" />
          <div className="presence-bg-lines">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`presence-line presence-line-${i + 1}`} />
            ))}
          </div>
        </div>

        <div className="presence-container">
          {/* Header */}
          <motion.div 
            className="presence-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="presence-label">Presencia Global</span>
            <h2 className="presence-title">Conectados con el mundo</h2>
            <p className="presence-subtitle">
              Operamos en múltiples países, brindando soluciones de clase mundial
            </p>
          </motion.div>

          {/* Mapa y cards */}
          <div className="presence-content">
            {/* Mapa integrado */}
            <motion.div 
              className="presence-map-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Suspense fallback={<div className="map-loading">Cargando mapa...</div>}>
                <MapaPresencia />
              </Suspense>
            </motion.div>
          </div>

          {/* Logros en strip */}
          <motion.div 
            className="presence-achievements"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {logrosData.map((logro, index) => (
              <div key={index} className="presence-achievement">
                <span className="presence-achievement-number">{logro.numero}</span>
                <span className="presence-achievement-label">{logro.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =============================================
          SECCIÓN: PARTNERS Y TECNOLOGÍAS
          ============================================= */}
      <section className="partners-premium-section">
        <div className="partners-container">
          <motion.div 
            className="partners-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="partners-label">Respaldados por los mejores</span>
            <h2 className="partners-title">Nuestros Partners Tecnológicos</h2>
          </motion.div>

          <motion.div 
            className="partners-logos-track"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="partners-logos-slide">
              {[...clientesLogos, ...clientesLogos].map((logo, index) => (
                <div key={index} className="partners-logo-item">
                  <span>{logo}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =============================================
          SECCIÓN: CTA FINAL PREMIUM - DISEÑO ESPACIADO
          ============================================= */}
      <section className="cta-premium-section">
        {/* Background con efecto cinematográfico */}
        <div className="cta-bg">
          <div className="cta-bg-gradient" />
          <div className="cta-bg-pattern" />
          <div className="cta-bg-glow cta-bg-glow-left" />
          <div className="cta-bg-glow cta-bg-glow-right" />
          <div className="cta-bg-glow cta-bg-glow-top" />
          <div className="cta-bg-glow cta-bg-glow-bottom-left" />
          <div className="cta-bg-glow cta-bg-glow-bottom-right" />
          
          {/* Partículas flotantes */}
          <div className="cta-particles">
            {[...Array(25)].map((_, i) => (
              <span 
                key={i} 
                className={`cta-particle cta-particle-${i % 4}`}
                style={{
                  left: i < 8 ? `${2 + (i * 3)}%` : i > 17 ? `${75 + ((i - 17) * 3)}%` : `${20 + ((i - 8) * 6)}%`,
                  top: `${8 + ((i * 13) % 84)}%`,
                  animationDelay: `${i * 0.25}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="cta-container-wide">
          {/* Grid principal de 2 columnas con más espacio */}
          <div className="cta-main-grid">
            {/* Columna izquierda - Contenido textual */}
            <motion.div 
              className="cta-text-column"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.span 
                className="cta-badge"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Comienza tu transformación
              </motion.span>

              <h2 className="cta-title">
                ¿Listo para llevar tu
                <span className="cta-title-highlight"> negocio </span>
                al siguiente nivel?
              </h2>

              <p className="cta-description">
                Únete a más de 500 empresas que ya confían en nosotros. 
                Nuestro equipo está listo para ayudarte a alcanzar tus objetivos.
              </p>

              {/* Feature cards pequeñas */}
              <div className="cta-features-mini">
                <div className="cta-feature-mini">
                  <div className="cta-feature-mini-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  </div>
                  <span>Implementación rápida</span>
                </div>
                <div className="cta-feature-mini">
                  <div className="cta-feature-mini-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <span>Soporte 24/7</span>
                </div>
              </div>
            </motion.div>

            {/* Columna derecha - CTA Card */}
            <motion.div 
              className="cta-action-column"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="cta-action-card">
                <div className="cta-action-header">
                  <div className="cta-action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div className="cta-action-header-text">
                    <span className="cta-action-label">Consulta gratuita</span>
                    <h3 className="cta-action-title">Hablemos de tu proyecto</h3>
                  </div>
                </div>

                <div className="cta-action-buttons">
                  <motion.a 
                    href="/Contacto" 
                    className="cta-btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Contáctanos Ahora</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="/Soluciones" 
                    className="cta-btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Ver Soluciones
                  </motion.a>
                </div>

                <div className="cta-action-divider" />

                {/* Trust indicators con iconos */}
                <div className="cta-trust-grid">
                  <div className="cta-trust-item">
                    <div className="cta-trust-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                    <div className="cta-trust-text">
                      <span className="cta-trust-label">Datos seguros</span>
                      <span className="cta-trust-desc">Encriptación SSL</span>
                    </div>
                  </div>
                  <div className="cta-trust-item">
                    <div className="cta-trust-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div className="cta-trust-text">
                      <span className="cta-trust-label">98% satisfacción</span>
                      <span className="cta-trust-desc">Clientes felices</span>
                    </div>
                  </div>
                  <div className="cta-trust-item">
                    <div className="cta-trust-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div className="cta-trust-text">
                      <span className="cta-trust-label">+500 proyectos</span>
                      <span className="cta-trust-desc">Entregados con éxito</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Fila inferior - Logos de partners con colores originales */}
          <motion.div 
            className="cta-bottom-bar"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="cta-bottom-label">Trabajamos con las mejores tecnologías</span>
            <div className="cta-bottom-logos">
              {/* Oracle - Rojo */}
              <div className="cta-bottom-logo">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path fill="#C74634" d="M16.412 4.412h-8.82a7.588 7.588 0 0 0-.008 15.176h8.828a7.588 7.588 0 0 0 0-15.176zm-.193 12.502H7.786a4.915 4.915 0 0 1 0-9.828h8.433a4.914 4.914 0 1 1 0 9.828z"/>
                </svg>
                <span>Oracle</span>
              </div>
              {/* AWS - Naranja */}
              <div className="cta-bottom-logo">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path fill="#FF9900" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.296.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.414l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
                </svg>
                <span>AWS</span>
              </div>
              {/* Microsoft - 4 colores */}
              <div className="cta-bottom-logo">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#F25022" d="M1 1h10v10H1z"/>
                  <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                  <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                  <path fill="#FFB900" d="M13 13h10v10H13z"/>
                </svg>
                <span>Microsoft</span>
              </div>
              {/* SAP - Azul */}
              <div className="cta-bottom-logo">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path fill="#0FAAFF" d="M0 6.28v11.44h11.97c.14-.2.28-.39.4-.58l1.27-1.94a20.1 20.1 0 0 0 1.08-1.88c.63-1.28.98-2.57.98-3.43 0-.79-.24-1.43-.67-1.85-.43-.41-1.05-.64-1.82-.64-.63 0-1.2.13-1.7.39-.5.26-.94.61-1.28 1.02l-.04.05v-2.58H0zm5.44 2.88c.7 0 1.28.16 1.71.46.44.31.65.81.65 1.46v4.28H6.13v-.97c-.14.22-.34.44-.57.62-.35.28-.85.49-1.5.49-.52 0-.97-.11-1.32-.36-.56-.38-.88-1.04-.88-1.83 0-.7.24-1.27.72-1.66.46-.37 1.09-.55 1.83-.55.61 0 1.15.1 1.54.32v-.14c0-.33-.13-.58-.37-.75-.24-.17-.6-.25-1.04-.25-.33 0-.68.05-1.03.13-.35.08-.68.2-.97.35l-.64-1.25c.43-.22.92-.39 1.44-.5.52-.12 1.04-.18 1.55-.18l-.01.33zm11.39-.01c.62 0 1.17.13 1.61.37.45.25.79.6 1.02 1.05.22.45.34.99.34 1.6 0 .6-.11 1.14-.34 1.59-.22.45-.56.8-1 1.05-.44.24-.97.37-1.58.37-.36 0-.7-.05-1.01-.15s-.59-.25-.84-.45v2.68h-1.69V9.27h1.53v.66c.23-.22.5-.4.82-.54.32-.14.7-.21 1.14-.21v-.03zm-10.7 4.39c-.16-.12-.4-.2-.71-.2-.33 0-.59.09-.78.25-.2.16-.29.37-.29.63 0 .28.1.49.29.64.19.14.44.21.74.21.26 0 .5-.06.69-.17.2-.12.35-.28.46-.48v-.57c-.12-.14-.26-.23-.4-.31zm10.56-2.66c-.34 0-.63.09-.86.26-.22.17-.38.41-.49.71-.1.3-.15.65-.15 1.03 0 .39.05.74.16 1.04.1.3.27.54.49.71.23.17.51.26.85.26.35 0 .64-.09.86-.27.22-.18.38-.42.49-.72.1-.3.15-.65.15-1.02 0-.38-.05-.73-.15-1.04-.1-.3-.26-.54-.48-.71-.22-.17-.51-.25-.87-.25zM24 6.28v11.44H12.03c-.14-.2-.28-.39-.4-.58l-1.27-1.94c-.39-.6-.75-1.22-1.08-1.88-.63-1.28-.98-2.57-.98-3.43 0-.79.24-1.43.67-1.85.43-.41 1.05-.64 1.82-.64.63 0 1.2.13 1.7.39.5.26.94.61 1.28 1.02l.04.05V6.28H24z"/>
                </svg>
                <span>SAP</span>
              </div>
              {/* Google - Multicolor */}
              <div className="cta-bottom-logo">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google</span>
              </div>
              {/* HP - Azul */}
              <div className="cta-bottom-logo">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path fill="#0096D6" d="M9.722 2L4 22h3.892l1.22-4.578h4.175L9.94 22h3.986L20 2zm-.403 11.906l1.986-7.283 1.903 7.283z"/>
                </svg>
                <span>HP</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default Nosotros;
