import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FiTarget, FiZap, FiUsers, FiAward, FiShield, FiTrendingUp,
  FiCheck, FiArrowRight, FiPlay, FiMapPin, FiMail, FiPhone,
  FiLinkedin, FiGlobe, FiCheckCircle
} from "react-icons/fi";
import { 
  FaBuilding, FaRocket, FaHandshake, FaGlobeAmericas, FaAward,
  FaQuoteLeft
} from "react-icons/fa";
import CountUp from 'react-countup';

import "./NosotrosRedesign.css";

// Imágenes
import heroBg from "../../img/Corporativo/mario-gogh-VBLHICVh-lI-unsplash.jpg";
import aboutImg from "../../img/Corporativo/campaign-creators-gMsnXqILjp4-unsplash.jpg";
import teamImg from "../../img/Corporativo/cherrydeck-rMILC1PIwM0-unsplash.jpg";
import officeImg from "../../img/Corporativo/sigmund-Fa9b57hffnM-unsplash.jpg";

// Flags
import FlagPE from '../../assets/peru.png';
import FlagCO from '../../assets/colombia.png';
import FlagCA from '../../assets/canada.png';

// ============================================
// DATOS
// ============================================
const timelineData = [
  {
    year: "2005",
    title: "Fundación",
    description: "Novasys nace en Lima con la visión de transformar empresas a través de la tecnología.",
    icon: FaBuilding,
    color: "#e62b1e",
    metrics: ["5 fundadores", "Primera oficina Lima"],
    video: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/crono1.mp4"
  },
  {
    year: "2010",
    title: "Expansión",
    description: "Ampliamos servicios a CRM, BI y Marketing Digital. Equipo crece a 30+ profesionales.",
    icon: FaRocket,
    color: "#ff6b35",
    metrics: ["+50 clientes", "30 profesionales"],
    video: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/crono2.mp4"
  },
  {
    year: "2015",
    title: "Alianzas Globales",
    description: "Partnerships estratégicos con Oracle, AWS, Microsoft y HP nos posicionan como líderes.",
    icon: FaHandshake,
    color: "#ffae42",
    metrics: ["Oracle Gold Partner", "AWS Partner"],
    video: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/crono3.mp4"
  },
  {
    year: "2020",
    title: "Expansión Internacional",
    description: "Abrimos operaciones en Canadá. Transformación digital acelerada post-pandemia.",
    icon: FaGlobeAmericas,
    color: "#34c759",
    metrics: ["Oficinas Canadá", "+200 proyectos"],
    video: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/crono4.mp4"
  },
  {
    year: "2025",
    title: "20 Años de Éxito",
    description: "Dos décadas liderando la transformación digital en Latinoamérica con IA y Cloud.",
    icon: FaAward,
    color: "#0071e3",
    metrics: ["+500 clientes", "100+ profesionales"],
    video: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/Novasys-20años-Logo.MOV"
  }
];

const valoresData = [
  { 
    icon: FiTarget, 
    title: "Compromiso", 
    desc: "Nos involucramos al 100% en cada proyecto, tratándolo como propio.",
    color: "#e62b1e"
  },
  { 
    icon: FiZap, 
    title: "Innovación", 
    desc: "Siempre a la vanguardia con las últimas tecnologías del mercado.",
    color: "#ff6b35"
  },
  { 
    icon: FiUsers, 
    title: "Colaboración", 
    desc: "Trabajamos en equipo con nuestros clientes como verdaderos socios.",
    color: "#ffae42"
  },
  { 
    icon: FiAward, 
    title: "Excelencia", 
    desc: "Buscamos la perfección en cada entrega y solución implementada.",
    color: "#34c759"
  },
  { 
    icon: FiShield, 
    title: "Integridad", 
    desc: "Transparencia y ética en todas nuestras operaciones.",
    color: "#0071e3"
  },
  { 
    icon: FiTrendingUp, 
    title: "Resultados", 
    desc: "Enfocados en generar valor real y medible para tu negocio.",
    color: "#5856d6"
  }
];

const statsData = [
  { value: 20, label: "Años de experiencia", suffix: "+" },
  { value: 500, label: "Clientes satisfechos", suffix: "+" },
  { value: 100, label: "Profesionales expertos", suffix: "+" },
  { value: 99.9, label: "Uptime garantizado", suffix: "%" }
];

const clientesData = [
  { name: "Entel", logo: "/src/img/entel.png" },
  { name: "Interbank", logo: "/src/img/Interbank_logo.png" },
  { name: "Pacífico", logo: "/src/img/pacifico.svg" },
  { name: "Centrum", logo: "/src/img/centrum.png" },
  { name: "Americatel", logo: "/src/img/americatel.png" },
  { name: "HP", logo: "/src/img/HP_LOGO.png" }
];

const presenciaData = [
  { 
    pais: "Perú", 
    ciudad: "Lima",
    tipo: "Sede Principal",
    flag: FlagPE,
    clientes: 350,
    proyectos: 400,
    descripcion: "Centro de operaciones principal con más de 80 profesionales"
  },
  { 
    pais: "Canadá", 
    ciudad: "Toronto",
    tipo: "Oficina Norteamérica",
    flag: FlagCA,
    clientes: 50,
    proyectos: 80,
    descripcion: "Hub para clientes en Norteamérica y soporte 24/7"
  },
  { 
    pais: "Colombia", 
    ciudad: "Bogotá",
    tipo: "Operaciones Andinas",
    flag: FlagCO,
    clientes: 100,
    proyectos: 120,
    descripcion: "Atención a clientes en la región Andina"
  }
];

const testimonialsData = [
  {
    quote: "Novasys transformó completamente nuestra operación comercial. El CRM implementado aumentó nuestras ventas en 40%.",
    author: "Director Comercial",
    company: "Entel Perú",
    logo: "/src/img/entel.png"
  },
  {
    quote: "El equipo de Novasys demostró un compromiso excepcional. Entregaron a tiempo y superaron expectativas.",
    author: "Gerente de TI",
    company: "Interbank",
    logo: "/src/img/Interbank_logo.png"
  }
];

const equipoData = [
  { 
    nombre: "Renzo Malpartida", 
    rol: "CEO & Fundador", 
    bio: "25+ años liderando transformación digital",
    linkedin: "#"
  },
  { 
    nombre: "María García", 
    rol: "COO", 
    bio: "Experta en gestión de proyectos enterprise",
    linkedin: "#"
  },
  { 
    nombre: "Carlos Mendoza", 
    rol: "CTO", 
    bio: "Arquitecto de soluciones cloud y AI",
    linkedin: "#"
  },
  { 
    nombre: "Ana Torres", 
    rol: "Directora Comercial", 
    bio: "Estratega de negocios B2B",
    linkedin: "#"
  }
];

// ============================================
// COMPONENTE STAT ANIMADO
// ============================================
function AnimatedStat({ value, suffix, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className="ns-stat-item">
      <strong>
        {isInView ? (
          <CountUp end={value} duration={2.5} decimals={value % 1 !== 0 ? 1 : 0} />
        ) : 0}
        <span className="ns-stat-suffix">{suffix}</span>
      </strong>
      <span>{label}</span>
    </div>
  );
}

// ============================================
// COMPONENTE STACKED HISTORY CARDS
// ============================================
function StackedHistoryCard({ item, index, activeIndex, total, onClick, isAutoPlaying }) {
  // Calcular posición relativa al activo
  const relativeIndex = index - activeIndex;
  const isActive = index === activeIndex;
  
  // Calcular transformaciones 3D más dramáticas
  const getTransform = () => {
    if (isActive) {
      return { 
        scale: 1, 
        y: 0, 
        x: 0, 
        z: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        opacity: 1
      };
    }
    
    const offset = Math.abs(relativeIndex);
    const direction = relativeIndex > 0 ? 1 : -1;
    
    // Limitar a 3 tarjetas visibles
    if (offset > 3) {
      return {
        scale: 0.6,
        y: direction * 200,
        x: direction * 150,
        z: -400,
        rotateX: direction * 10,
        rotateY: direction * -25,
        rotateZ: direction * 3,
        opacity: 0
      };
    }
    
    return {
      scale: 1 - (offset * 0.08),
      y: direction * (40 * offset),
      x: direction * (80 * offset),
      z: -100 * offset,
      rotateX: direction * (5 * offset),
      rotateY: direction * (-12 * offset),
      rotateZ: direction * (2 * offset),
      opacity: 1 - (offset * 0.25)
    };
  };

  const transform = getTransform();

  return (
    <motion.div
      className={`ns-stack-card ${isActive ? 'active' : ''}`}
      style={{ 
        '--card-color': item.color,
        zIndex: total - Math.abs(relativeIndex)
      }}
      animate={{
        scale: transform.scale,
        y: transform.y,
        x: transform.x,
        z: transform.z,
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
        rotateZ: transform.rotateZ,
        opacity: transform.opacity,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        mass: 0.8
      }}
      onClick={() => !isActive && onClick(index)}
      whileHover={!isActive ? { 
        scale: transform.scale + 0.03,
        y: transform.y - 10,
        transition: { duration: 0.2 }
      } : {}}
    >
      {/* Fondo con color sutil */}
      <div 
        className="ns-stack-color-accent"
        style={{ background: `linear-gradient(135deg, ${item.color}15 0%, transparent 60%)` }}
      />
      
      {/* Año grande de fondo */}
      <div className="ns-stack-year-bg" style={{ color: item.color }}>
        {item.year}
      </div>
      
      {/* Contenido */}
      <div className="ns-stack-content">
        <div className="ns-stack-icon" style={{ background: item.color }}>
          <item.icon />
        </div>
        
        <div className="ns-stack-header">
          <span className="ns-stack-year" style={{ color: item.color }}>{item.year}</span>
          <h3>{item.title}</h3>
        </div>
        
        <p>{item.description}</p>
        
        <div className="ns-stack-metrics">
          {item.metrics.map((m, i) => (
            <span key={i} style={{ borderColor: `${item.color}40` }}>
              <FiCheckCircle style={{ color: item.color }} /> {m}
            </span>
          ))}
        </div>
      </div>
      
      {/* Video preview en card activa */}
      {isActive && (
        <motion.div 
          className="ns-stack-video"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <video 
            src={item.video}
            autoPlay 
            loop 
            muted 
            playsInline
          />
        </motion.div>
      )}
      
      {/* Indicador de progreso automático */}
      {isActive && isAutoPlaying && (
        <motion.div 
          className="ns-stack-progress"
          style={{ background: item.color }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
function NosotrosRedesign() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Autoplay timeline cards
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTimeline(prev => (prev + 1) % timelineData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Autoplay testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Handler para clicks en timeline
  const handleTimelineClick = (index) => {
    setActiveTimeline(index);
    setIsAutoPlaying(false);
    // Reactivar autoplay después de 10 segundos de inactividad
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="nosotros-new">
      
      {/* ========== HERO ========== */}
      <section className="ns-hero" ref={heroRef}>
        <motion.div className="ns-hero-bg" style={{ y: heroY }}>
          <img src={heroBg} alt="" loading="eager" />
          <div className="ns-hero-overlay" />
        </motion.div>
        
        <motion.div className="ns-hero-content" style={{ opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="ns-hero-text"
          >
            <span className="ns-hero-badge">
              <FiAward /> 20 años transformando empresas
            </span>
            
            <h1>
              Somos <span className="gradient-text">Novasys</span>
            </h1>
            
            <p>
              Tu socio estratégico en transformación digital. Combinamos experiencia, 
              innovación y compromiso para llevar tu negocio al siguiente nivel.
            </p>
            
            <div className="ns-hero-actions">
              <Link to="/contacto" className="ns-btn-primary">
                Conversemos <FiArrowRight />
              </Link>
              <a href="#historia" className="ns-btn-outline">
                <FiPlay /> Ver nuestra historia
              </a>
            </div>
            
            {/* Stats integrados en el panel */}
            <div className="ns-hero-stats">
              {statsData.map((stat, i) => (
                <AnimatedStat key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Video background */}
        <div className="ns-hero-video-bg">
          <video autoPlay loop muted playsInline preload="metadata">
            <source src="https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/video.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ========== CLIENTES MARQUEE ========== */}
      <section className="ns-clients-bar">
        <div className="ns-clients-header">
          <FiCheckCircle className="ns-verified" />
          <span>Empresas que confían en nosotros</span>
        </div>
        <div className="ns-clients-marquee">
          <div className="ns-clients-track">
            {[...clientesData, ...clientesData].map((client, i) => (
              <div key={i} className="ns-client-logo">
                <img src={client.logo} alt={client.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section className="ns-about">
        <div className="ns-container">
          <div className="ns-about-grid">
            <motion.div 
              className="ns-about-content"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="ns-label">Sobre Nosotros</span>
              <h2>Más que tecnología, <br/><span className="text-accent">resultados reales</span></h2>
              
              <p className="ns-about-lead">
                Desde 2005, hemos ayudado a más de 500 empresas en Latinoamérica a 
                transformar sus operaciones mediante soluciones tecnológicas de clase mundial.
              </p>
              
              <p>
                No somos solo proveedores de tecnología. Somos socios estratégicos que 
                entienden tu negocio y se comprometen con tus resultados. Cada proyecto 
                es una oportunidad de demostrar nuestro compromiso con la excelencia.
              </p>
              
              <ul className="ns-about-features">
                <li><FiCheck /> Soluciones personalizadas para cada industria</li>
                <li><FiCheck /> Equipo certificado en tecnologías líderes</li>
                <li><FiCheck /> Soporte 24/7 y acompañamiento continuo</li>
                <li><FiCheck /> Metodologías ágiles y resultados medibles</li>
              </ul>
              
              <Link to="/soluciones" className="ns-btn-primary">
                Ver nuestras soluciones <FiArrowRight />
              </Link>
            </motion.div>
            
            <motion.div 
              className="ns-about-visual"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="ns-collage">
                {/* Imagen principal grande */}
                <motion.div 
                  className="ns-collage-main"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={aboutImg} alt="Equipo Novasys trabajando" loading="lazy" />
                </motion.div>
                
                {/* Imagen secundaria arriba derecha */}
                <motion.div 
                  className="ns-collage-top"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={officeImg} alt="Oficina Novasys" loading="lazy" />
                </motion.div>
                
                {/* Imagen pequeña abajo */}
                <motion.div 
                  className="ns-collage-bottom"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={teamImg} alt="Equipo de trabajo" loading="lazy" />
                </motion.div>
                
                {/* Card de estadística flotante */}
                <motion.div 
                  className="ns-collage-stat"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: "spring" }}
                >
                  <strong>15+</strong>
                  <span>Industrias</span>
                </motion.div>
                
                {/* Badge de años */}
                <motion.div 
                  className="ns-collage-badge"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                  <FiAward />
                  <span>20 años</span>
                </motion.div>
                
                {/* Elemento decorativo */}
                <div className="ns-collage-decoration" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== VALORES ========== */}
      <section className="ns-valores">
        <div className="ns-container">
          <motion.div 
            className="ns-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="ns-label">Nuestros Valores</span>
            <h2>Lo que nos define</h2>
            <p>Los principios que guían cada decisión y cada proyecto</p>
          </motion.div>
          
          <div className="ns-valores-grid">
            {valoresData.map((valor, i) => (
              <motion.div
                key={i}
                className="ns-valor-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="ns-valor-icon" style={{ background: valor.color }}>
                  <valor.icon />
                </div>
                <h3>{valor.title}</h3>
                <p>{valor.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HISTORIA - STACKED CARDS ========== */}
      <section className="ns-history" id="historia">
        <div className="ns-container">
          <motion.div 
            className="ns-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="ns-label">Nuestra Historia</span>
            <h2>20 años de evolución</h2>
            <p>Un viaje de crecimiento, innovación y éxitos compartidos</p>
          </motion.div>
          
          {/* Stack de tarjetas */}
          <div className="ns-stack-container">
            <div className="ns-stack-wrapper">
              {timelineData.map((item, i) => (
                <StackedHistoryCard
                  key={i}
                  item={item}
                  index={i}
                  activeIndex={activeTimeline}
                  total={timelineData.length}
                  onClick={handleTimelineClick}
                  isAutoPlaying={isAutoPlaying}
                />
              ))}
            </div>
            
            {/* Navegación */}
            <div className="ns-stack-nav">
              {timelineData.map((item, i) => (
                <button
                  key={i}
                  className={`ns-stack-dot ${activeTimeline === i ? 'active' : ''}`}
                  style={{ 
                    background: activeTimeline === i ? item.color : 'transparent',
                    borderColor: item.color
                  }}
                  onClick={() => handleTimelineClick(i)}
                >
                  <span className="ns-stack-dot-year">{item.year}</span>
                </button>
              ))}
            </div>
            
            {/* Controles */}
            <div className="ns-stack-controls">
              <button 
                className="ns-stack-arrow prev"
                onClick={() => handleTimelineClick((activeTimeline - 1 + timelineData.length) % timelineData.length)}
              >
                <FiArrowRight style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button 
                className="ns-stack-arrow next"
                onClick={() => handleTimelineClick((activeTimeline + 1) % timelineData.length)}
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EQUIPO ========== */}
      <section className="ns-equipo">
        <div className="ns-container">
          <motion.div 
            className="ns-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="ns-label">Nuestro Equipo</span>
            <h2>Liderazgo experimentado</h2>
            <p>Profesionales apasionados por la tecnología y los resultados</p>
          </motion.div>
          
          <div className="ns-equipo-grid">
            {equipoData.map((persona, i) => (
              <motion.div
                key={i}
                className="ns-equipo-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="ns-equipo-avatar">
                  <span>{persona.nombre.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3>{persona.nombre}</h3>
                <span className="ns-equipo-rol">{persona.rol}</span>
                <p>{persona.bio}</p>
                <a href={persona.linkedin} className="ns-equipo-link">
                  <FiLinkedin />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRESENCIA GLOBAL REDISEÑADA ========== */}
      <section className="ns-presencia">
        <div className="ns-container">
          <motion.div 
            className="ns-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="ns-label">Presencia Global</span>
            <h2>Donde estamos</h2>
            <p>Con presencia en 3 países, atendemos clientes en toda América</p>
          </motion.div>
          
          {/* Grid de países */}
          <div className="ns-presencia-grid">
            {presenciaData.map((loc, i) => (
              <motion.div
                key={i}
                className="ns-presencia-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="ns-presencia-header">
                  <img src={loc.flag} alt={loc.pais} className="ns-presencia-flag" />
                  <div>
                    <h3>{loc.pais}</h3>
                    <span className="ns-presencia-tipo">{loc.tipo}</span>
                  </div>
                </div>
                
                <p className="ns-presencia-desc">{loc.descripcion}</p>
                
                <div className="ns-presencia-stats">
                  <div>
                    <strong>{loc.clientes}+</strong>
                    <span>Clientes</span>
                  </div>
                  <div>
                    <strong>{loc.proyectos}+</strong>
                    <span>Proyectos</span>
                  </div>
                </div>
                
                <div className="ns-presencia-city">
                  <FiMapPin />
                  <span>{loc.ciudad}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Stats globales */}
          <motion.div 
            className="ns-presencia-global-stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="ns-global-stat">
              <FiGlobe className="ns-global-icon" />
              <div>
                <strong>3</strong>
                <span>Países con presencia</span>
              </div>
            </div>
            <div className="ns-global-stat">
              <FiUsers className="ns-global-icon" />
              <div>
                <strong>500+</strong>
                <span>Clientes atendidos</span>
              </div>
            </div>
            <div className="ns-global-stat">
              <FiZap className="ns-global-icon" />
              <div>
                <strong>24/7</strong>
                <span>Soporte disponible</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== TESTIMONIOS ========== */}
      <section className="ns-testimonials">
        <div className="ns-container">
          <motion.div 
            className="ns-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="ns-label">Testimonios</span>
            <h2>Lo que dicen nuestros clientes</h2>
          </motion.div>
          
          <div className="ns-testimonial-wrapper">
            <motion.div
              key={activeTestimonial}
              className="ns-testimonial-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <FaQuoteLeft className="ns-quote-icon" />
              <blockquote>{testimonialsData[activeTestimonial].quote}</blockquote>
              <div className="ns-testimonial-author">
                <img 
                  src={testimonialsData[activeTestimonial].logo} 
                  alt={testimonialsData[activeTestimonial].company}
                  className="ns-testimonial-logo"
                />
                <div>
                  <strong>{testimonialsData[activeTestimonial].author}</strong>
                  <span>{testimonialsData[activeTestimonial].company}</span>
                </div>
              </div>
            </motion.div>
            
            {/* Dots */}
            <div className="ns-testimonial-dots">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  className={`ns-dot ${activeTestimonial === i ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== PARTNERS CON LOGOS ========== */}
      <section className="ns-partners">
        <div className="ns-container">
          <motion.div 
            className="ns-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="ns-label">Partners Tecnológicos</span>
            <h2>Trabajamos con los mejores</h2>
          </motion.div>
          
          <div className="ns-partners-grid">
            {/* Oracle */}
            <motion.div className="ns-partner-logo" whileHover={{ scale: 1.05 }}>
              <svg viewBox="0 0 200 50" width="120" height="40">
                <path fill="#C74634" d="M25.5 10.5C14.2 10.5 5 19.7 5 31s9.2 20.5 20.5 20.5h29c11.3 0 20.5-9.2 20.5-20.5S65.8 10.5 54.5 10.5h-29zm28.7 33.5H26.8c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h27.4c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9z"/>
                <text x="85" y="38" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#C74634">ORACLE</text>
              </svg>
              <span>Oracle Gold Partner</span>
            </motion.div>
            
            {/* AWS */}
            <motion.div className="ns-partner-logo" whileHover={{ scale: 1.05 }}>
              <svg viewBox="0 0 100 60" width="80" height="48">
                <path fill="#252F3E" d="M27.8 38.4c-3.9 2.9-9.5 4.4-14.3 4.4-6.8 0-12.9-2.5-17.5-6.7-.4-.3 0-.8.4-.5 5 2.9 11.2 4.6 17.5 4.6 4.3 0 9-0.9 13.4-2.7.7-.3 1.2.4.5.9z"/>
                <path fill="#FF9900" d="M29.5 36.3c-.5-.6-3.2-.3-4.4-.2-.4 0-.4-.3-.1-.5 2.2-1.5 5.7-1.1 6.1-.6.4.5-.1 4.1-2.1 5.8-.3.3-.6.1-.5-.2.5-1.2 1.5-3.7 1-4.3z"/>
                <path fill="#252F3E" d="M25.3 5.8V3.4c0-.4.3-.6.6-.6h10.5c.4 0 .6.2.6.6v2.1c0 .3-.3.8-.8 1.5l-5.4 7.8c2 0 4.1.2 5.9 1.2.4.2.5.5.5.9v2.6c0 .4-.4.8-.8.6-3.4-1.8-7.9-2-11.6 0-.4.2-.8-.2-.8-.6v-2.4c0-.4 0-1.1.4-1.8l6.3-9h-5.5c-.3 0-.6-.2-.6-.6z"/>
              </svg>
              <span>AWS Partner</span>
            </motion.div>
            
            {/* Microsoft */}
            <motion.div className="ns-partner-logo" whileHover={{ scale: 1.05 }}>
              <svg viewBox="0 0 100 100" width="40" height="40">
                <rect fill="#F25022" x="5" y="5" width="42" height="42"/>
                <rect fill="#00A4EF" x="5" y="53" width="42" height="42"/>
                <rect fill="#7FBA00" x="53" y="5" width="42" height="42"/>
                <rect fill="#FFB900" x="53" y="53" width="42" height="42"/>
              </svg>
              <span>Microsoft Partner</span>
            </motion.div>
            
            {/* HP */}
            <motion.div className="ns-partner-logo" whileHover={{ scale: 1.05 }}>
              <svg viewBox="0 0 100 100" width="48" height="48">
                <circle fill="#0096D6" cx="50" cy="50" r="45"/>
                <path fill="#fff" d="M35 25h8l-5 20h12l-8 30h-8l5-20H27z M57 25h8l5 20h12l-8 30h-8l-5-20h-12z"/>
              </svg>
              <span>HP Partner</span>
            </motion.div>
            
            {/* SAP */}
            <motion.div className="ns-partner-logo" whileHover={{ scale: 1.05 }}>
              <svg viewBox="0 0 120 50" width="90" height="40">
                <rect fill="#0FAAFF" width="120" height="50" rx="4"/>
                <text x="60" y="35" fontFamily="Arial" fontSize="22" fontWeight="bold" fill="#fff" textAnchor="middle">SAP</text>
              </svg>
              <span>SAP Partner</span>
            </motion.div>
            
            {/* Google Cloud */}
            <motion.div className="ns-partner-logo" whileHover={{ scale: 1.05 }}>
              <svg viewBox="0 0 100 100" width="40" height="40">
                <path fill="#4285F4" d="M80 52c0-2.5-.2-5-.7-7.4H50v14h17c-.7 4-2.9 7.3-6.2 9.5v8h10c5.8-5.4 9.2-13.4 9.2-24.1z"/>
                <path fill="#34A853" d="M50 85c8.4 0 15.4-2.8 20.6-7.5l-10-8c-2.8 1.9-6.3 3-10.6 3-8.1 0-15-5.5-17.4-12.9H22v8.2C27.2 78.2 37.8 85 50 85z"/>
                <path fill="#FBBC05" d="M32.6 59.6c-1.3-3.8-1.3-7.9 0-11.7V39.7H22c-4.3 8.6-4.3 18.7 0 27.3l10.6-7.4z"/>
                <path fill="#EA4335" d="M50 27.1c4.6-.1 8.9 1.6 12.2 4.8l9.1-9.1C63.8 15.7 57.1 12.5 50 12.5c-12.2 0-22.8 6.8-28 17.2l10.6 8.2c2.4-7.4 9.3-12.8 17.4-12.8z"/>
              </svg>
              <span>Google Cloud</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="ns-cta">
        <div className="ns-cta-bg">
          <img src={teamImg} alt="" loading="lazy" />
          <div className="ns-cta-overlay" />
        </div>
        
        <div className="ns-container">
          <motion.div 
            className="ns-cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>¿Listo para transformar tu empresa?</h2>
            <p>
              Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos 
              con soluciones tecnológicas de clase mundial.
            </p>
            
            <div className="ns-cta-actions">
              <Link to="/contacto" className="ns-btn-primary-large">
                Agenda una consulta gratis <FiArrowRight />
              </Link>
            </div>
            
            <div className="ns-cta-contact">
              <a href="mailto:info@novasys.com.pe">
                <FiMail /> info@novasys.com.pe
              </a>
              <a href="tel:+5114567890">
                <FiPhone /> +51 1 456 7890
              </a>
            </div>
            
            <div className="ns-cta-trust">
              <FiShield />
              <span>Más de 500 empresas confían en nosotros</span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

export default NosotrosRedesign;
