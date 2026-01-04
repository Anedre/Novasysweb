import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaAws, FaCloud, FaShieldAlt, FaRocket, FaUsers, FaHeadset, 
  FaPhone, FaPlay, FaPause, FaQuoteLeft, FaStar, FaCheck,
  FaNetworkWired, FaShoppingCart, FaHeartbeat, FaGraduationCap,
  FaWhatsapp, FaChartLine, FaLaptopCode, FaDatabase, FaMobileAlt
} from "react-icons/fa";
import { 
  HiArrowRight, HiSparkles, HiCheckCircle, HiGlobeAlt,
  HiOutlineLightBulb, HiOutlineCog, HiOutlineChartBar
} from "react-icons/hi2";
import { 
  FiMail, FiPhoneCall, FiArrowUpRight
} from "react-icons/fi";
import { MdVerified, MdBusinessCenter } from "react-icons/md";
import { BiCheckShield } from "react-icons/bi";

// Hook para modo noche (detecta body.night)
import { useNightMode } from "../../hooks/useNightMode";

// Imágenes de logos
import EntelLogo from "../../img/entel.png";
import RenzoLogo from "../../img/RenzoC.png";
import AmericatelLogo from "../../img/americatel.png";
import PacificoLogo from "../../img/pacifico.svg";
import InterbankLogo from "../../img/Interbank_logo.png";
import CentrumLogo from "../../img/centrum.png";
import AWSLogo from "../../img/AWscloud.png";
import OracleLogo from "../../img/Obusiness.png";
import HPLogo from "../../img/HP_enterprise.png";
import NovasysLogo from "../../assets/logonovasys.svg";

// Imágenes corporativas
import HeroImage from "../../img/Corporativo/nasa-Q1p7bh3SHj8-unsplash.jpg";
import TeamImage from "../../img/Corporativo/krakenimages-Y5bvRlcCx8k-unsplash.jpg";
import OfficeImage from "../../img/Corporativo/charles-forerunner-3fPXt37X6UQ-unsplash.jpg";
import DataImage from "../../img/Corporativo/luke-chesser-JKUTrJ4vK00-unsplash.jpg";
import CloudImage from "../../img/Corporativo/growtika-Am6pBe2FpJw-unsplash.jpg";
import TechImage from "../../img/Corporativo/conny-schneider-xuTJZ7uD7PI-unsplash.jpg";
import ServerImage from "../../img/Corporativo/compare-fibre-9HGPvHThNME-unsplash.jpg";
import AIImage from "../../img/Corporativo/michael-dziedzic-nbW-kaz2BlE-unsplash.jpg";
import MeetingImage from "../../img/Corporativo/campaign-creators-gMsnXqILjp4-unsplash.jpg";
import AbstractImage from "../../img/Corporativo/codioful-formerly-gradienta-bKESVqfxass-unsplash.jpg";
import WorkImage from "../../img/Corporativo/sigmund-Fa9b57hffnM-unsplash.jpg";
import AnalyticsImage from "../../img/Corporativo/carlos-muza-hpjSkU2UYSU-unsplash.jpg";

import "./Home.css";

// ============================================
// DATOS
// ============================================

const partners = [
  { name: "Entel", logo: EntelLogo },
  { name: "Renzo Costa", logo: RenzoLogo },
  { name: "Americatel", logo: AmericatelLogo },
  { name: "Pacífico Seguros", logo: PacificoLogo },
  { name: "Interbank", logo: InterbankLogo },
  { name: "Centrum PUCP", logo: CentrumLogo },
];

const stats = [
  { value: "24K+", label: "Clientes satisfechos", icon: <FaUsers /> },
  { value: "200+", label: "Proyectos completados", icon: <FaRocket /> },
  { value: "15+", label: "Años de experiencia", icon: <FaStar /> },
  { value: "99.9%", label: "Uptime garantizado", icon: <FaShieldAlt /> },
];

const services = [
  {
    icon: <FaAws />,
    title: "Amazon Web Services",
    description: "Infraestructura cloud escalable, Amazon Connect para contact centers inteligentes, arquitecturas serverless y soluciones de machine learning.",
    features: ["Amazon Connect", "Lambda & API Gateway", "Machine Learning", "DevOps & CI/CD"],
    image: CloudImage,
    color: "#ff9900",
    link: "/Amazon_Web_Services",
    stats: "200+ proyectos"
  },
  {
    icon: <FaLaptopCode />,
    title: "Soluciones HP Enterprise",
    description: "Equipos empresariales de alto rendimiento, workstations, servidores ProLiant, impresoras MPS y soluciones completas de networking.",
    features: ["Workstations", "Servidores ProLiant", "Impresión MPS", "Networking"],
    image: ServerImage,
    color: "#0096d6",
    link: "/SolucionesHPmain",
    stats: "5000+ equipos"
  },
  {
    icon: <FaDatabase />,
    title: "Oracle Business",
    description: "Implementación de Oracle Cloud, CRM, ERP, Business Intelligence y soluciones de gestión empresarial de clase mundial.",
    features: ["Oracle Cloud", "CRM & ERP", "Business Intelligence", "Siebel"],
    image: DataImage,
    color: "#c74634",
    link: "/Soluciones_Oracle",
    stats: "50+ implementaciones"
  },
  {
    icon: <FaMobileAlt />,
    title: "Desarrollo a Medida",
    description: "Portales corporativos, aplicaciones móviles, bots de WhatsApp, integraciones API y soluciones tecnológicas personalizadas.",
    features: ["React & Node.js", "Bots WhatsApp", "APIs REST", "Apps Móviles"],
    image: TechImage,
    color: "#6366f1",
    link: "/Soluciones_Novasys",
    stats: "80+ apps"
  },
];

const capabilities = [
  {
    icon: <FaCloud />,
    title: "Cloud Architecture",
    description: "Diseñamos arquitecturas cloud nativas optimizadas para escalabilidad, seguridad y rendimiento.",
    stat: "99.99% uptime",
    image: CloudImage,
  },
  {
    icon: <HiOutlineLightBulb />,
    title: "Inteligencia Artificial",
    description: "Implementamos soluciones de ML, chatbots inteligentes y automatización con AWS AI/ML services.",
    stat: "40+ modelos IA",
    image: AIImage,
  },
  {
    icon: <HiOutlineCog />,
    title: "DevOps & Automation",
    description: "Pipelines CI/CD automatizados, Infrastructure as Code con Terraform y monitoreo 24/7.",
    stat: "500+ deploys/mes",
    image: TechImage,
  },
  {
    icon: <FaShieldAlt />,
    title: "Ciberseguridad",
    description: "Cumplimiento normativo, auditorías de seguridad, protección de datos y certificación ISO 27001.",
    stat: "ISO 27001",
    image: ServerImage,
  },
];

const industries = [
  { 
    name: "Telecomunicaciones", 
    icon: <FaNetworkWired />, 
    count: "15+", 
    color: "#3b82f6",
    description: "Contact centers, redes y conectividad",
    highlight: "Top Partner"
  },
  { 
    name: "Banca & Finanzas", 
    icon: <MdBusinessCenter />, 
    count: "12+", 
    color: "#10b981",
    description: "Core banking, pagos digitales",
    highlight: "PCI-DSS"
  },
  { 
    name: "Retail & E-commerce", 
    icon: <FaShoppingCart />, 
    count: "20+", 
    color: "#f59e0b",
    description: "Omnicanalidad, logística, CRM",
    highlight: "Líder"
  },
  { 
    name: "Seguros", 
    icon: <FaShieldAlt />, 
    count: "8+", 
    color: "#6366f1",
    description: "Claims automation, suscripción digital",
    highlight: null
  },
  { 
    name: "Salud", 
    icon: <FaHeartbeat />, 
    count: "6+", 
    color: "#ec4899",
    description: "Telemedicina, HIS, expediente clínico",
    highlight: null
  },
  { 
    name: "Educación", 
    icon: <FaGraduationCap />, 
    count: "10+", 
    color: "#8b5cf6",
    description: "LMS, plataformas virtuales, analytics",
    highlight: null
  },
];

const cases = [
  {
    company: "Entel",
    title: "Transformación del Contact Center",
    description: "Migración completa a Amazon Connect con reducción del 40% en tiempos de espera.",
    metrics: ["-40% tiempo espera", "92% satisfacción", "3M+ llamadas/mes"],
    image: TeamImage,
    logo: EntelLogo,
    color: "#00a0e1",
    link: "/Entel"
  },
  {
    company: "Renzo Costa",
    title: "Omnicanalidad Premium",
    description: "Integración de WhatsApp Business + CRM para atención personalizada.",
    metrics: ["+60% conversión", "24/7 atención"],
    image: WorkImage,
    logo: RenzoLogo,
    color: "#8b4513",
    link: "/RenzoCosta"
  },
  {
    company: "Pacífico Seguros",
    title: "Automatización de Claims",
    description: "Bot inteligente para gestión de siniestros con IA conversacional.",
    metrics: ["-70% tiempo gestión", "+85% resolución"],
    image: OfficeImage,
    logo: PacificoLogo,
    color: "#1976d2",
    link: "/Pacifico"
  },
];

const testimonials = [
  {
    quote: "Novasys transformó completamente nuestra operación de contact center. La migración a Amazon Connect fue impecable y los resultados superaron nuestras expectativas.",
    author: "Carlos Mendoza",
    role: "Director de Tecnología",
    company: "Entel Perú",
    logo: EntelLogo,
  },
  {
    quote: "El equipo de Novasys entendió nuestras necesidades y nos propuso soluciones innovadoras. Su soporte 24/7 es excepcional.",
    author: "María García",
    role: "Gerente de Operaciones",
    company: "Pacífico Seguros",
    logo: PacificoLogo,
  },
  {
    quote: "Gracias a la integración de WhatsApp Business, logramos conectar con nuestros clientes de manera más efectiva. Las ventas aumentaron un 60%.",
    author: "Roberto Silva",
    role: "CEO",
    company: "Renzo Costa",
    logo: RenzoLogo,
  },
];

const process = [
  { 
    step: "01", 
    title: "Diagnóstico", 
    description: "Analizamos tu operación actual, identificamos pain points y oportunidades de mejora con un assessment completo.", 
    icon: <HiOutlineChartBar />,
    features: ["Auditoría técnica", "Análisis de procesos", "Benchmark"]
  },
  { 
    step: "02", 
    title: "Estrategia", 
    description: "Diseñamos un roadmap tecnológico personalizado, alineado a tus objetivos de negocio y presupuesto.", 
    icon: <HiOutlineLightBulb />,
    features: ["Roadmap", "Business case", "KPIs definidos"]
  },
  { 
    step: "03", 
    title: "Implementación", 
    description: "Ejecutamos con metodologías ágiles, sprints de 2 semanas y entregables incrementales que generan valor temprano.", 
    icon: <HiOutlineCog />,
    features: ["Agile/Scrum", "DevOps", "CI/CD"]
  },
  { 
    step: "04", 
    title: "Optimización", 
    description: "Monitoreamos métricas en tiempo real y optimizamos continuamente para maximizar el ROI de tu inversión.", 
    icon: <FaChartLine />,
    features: ["Monitoreo 24/7", "Mejora continua", "Soporte"]
  },
];

const extraServices = [
  { icon: <FaWhatsapp />, title: "Bots WhatsApp", description: "Automatización inteligente" },
  { icon: <FaChartLine />, title: "Business Intelligence", description: "Dashboards en tiempo real" },
  { icon: <FaCloud />, title: "Cloud Migration", description: "Migración segura a la nube" },
  { icon: <FaHeadset />, title: "Soporte 24/7", description: "Atención continua" },
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const isNight = useNightMode();
  
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="home">

      {/* ============================================
          SECTION 1: HERO
      ============================================ */}
      <motion.section 
        ref={heroRef}
        className="hero"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <div className="hero-background">
          <img src={HeroImage} alt="" className="hero-bg-image" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-dot pulse" />
            <HiSparkles />
            <span>Partner Oficial AWS, Oracle & HP</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Transformamos empresas
            <br />
            con <span className="gradient-text">tecnología de clase mundial</span>
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Más de 15 años impulsando la transformación digital de las empresas 
            líderes en Latinoamérica. Soluciones cloud, contact centers inteligentes 
            y desarrollo a medida.
          </motion.p>

          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/Contacto" className="btn-primary">
              Agenda una consulta gratis
              <HiArrowRight />
            </Link>
            <Link to="/Nosotros" className="btn-secondary">
              Conoce más
            </Link>
          </motion.div>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="hero-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Scroll</span>
          <div className="scroll-line" />
        </motion.div>
      </motion.section>

      {/* ============================================
          SECTION 2: PARTNERS MARQUEE
      ============================================ */}
      <section className="partners-section">
        <div className="partners-header">
          <MdVerified className="verified-icon" />
          <span>Empresas que confían en nosotros</span>
        </div>
        
        <div className="marquee">
          <div className="marquee-track">
            {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
              <div key={i} className="marquee-item">
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>

        <div className="tech-partners">
          <span className="tech-label">Tecnologías que dominamos</span>
          <div className="tech-logos">
            <img src={AWSLogo} alt="AWS" />
            <img src={OracleLogo} alt="Oracle" />
            <img src={HPLogo} alt="HP" />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: ABOUT / MISSION
      ============================================ */}
      <section className="about-section">
        <div className="about-container">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Sobre Novasys</span>
            <h2 className="section-title">
              Innovación tecnológica
              <span className="gradient-text"> que impulsa resultados</span>
            </h2>
            <p className="about-text">
              Desde 2009, Novasys ha sido el partner estratégico de las empresas 
              más importantes de Latinoamérica. Combinamos expertise técnico con 
              un profundo entendimiento del negocio para entregar soluciones que 
              generan valor real.
            </p>
            <p className="about-text">
              Nuestro equipo de más de 50 especialistas certificados trabaja con 
              las últimas tecnologías para transformar operaciones, optimizar 
              procesos y crear experiencias digitales excepcionales.
            </p>
            
            <div className="about-features">
              <div className="about-feature">
                <HiCheckCircle />
                <span>Partner certificado AWS, Oracle & HP</span>
              </div>
              <div className="about-feature">
                <HiCheckCircle />
                <span>Certificación ISO 27001</span>
              </div>
              <div className="about-feature">
                <HiCheckCircle />
                <span>Soporte técnico 24/7</span>
              </div>
              <div className="about-feature">
                <HiCheckCircle />
                <span>Presencia en 8 países</span>
              </div>
            </div>

            <Link to="/Nosotros" className="btn-outline">
              Conoce nuestra historia
              <FiArrowUpRight />
            </Link>
          </motion.div>

          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={MeetingImage} alt="Equipo Novasys" />
            <div className="about-image-card">
              <strong>50+</strong>
              <span>Expertos certificados</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: SERVICES
      ============================================ */}
      <section className="services-section">
        <div className="services-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Nuestros Servicios</span>
            <h2 className="section-title">
              Soluciones tecnológicas
              <span className="gradient-text"> integrales</span>
            </h2>
            <p className="section-subtitle">
              Desde infraestructura cloud hasta desarrollo a medida, cubrimos 
              todo el espectro de necesidades tecnológicas empresariales.
            </p>
          </motion.div>

          <div className="services-grid">
            {services.map((service, idx) => (
              <motion.article 
                key={idx}
                className="service-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="service-image">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <div className="service-overlay" style={{ background: `linear-gradient(135deg, ${service.color}ee, ${service.color}aa)` }} />
                  <div className="service-icon" style={{ background: service.color }}>
                    {service.icon}
                  </div>
                  <span className="service-stat">{service.stats}</span>
                </div>
                
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  
                  <ul className="service-features">
                    {service.features.map((feat, i) => (
                      <li key={i}>
                        <FaCheck />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link to={service.link} className="service-link">
                    Explorar solución
                    <FiArrowUpRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="extra-services-grid">
            {extraServices.map((item, idx) => (
              <motion.div 
                key={idx}
                className="extra-service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="extra-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: CAPABILITIES
      ============================================ */}
      <section className="capabilities-section">
        <div className="capabilities-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Capacidades Técnicas</span>
            <h2 className="section-title">
              Expertise que impulsa
              <span className="gradient-text"> tu transformación</span>
            </h2>
          </motion.div>

          <div className="capabilities-grid">
            {capabilities.map((cap, idx) => (
              <motion.div 
                key={idx}
                className="capability-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="capability-image">
                  <img src={cap.image} alt={cap.title} loading="lazy" />
                  <div className="capability-overlay" />
                </div>
                <div className="capability-content">
                  <div className="capability-icon">{cap.icon}</div>
                  <h3>{cap.title}</h3>
                  <p>{cap.description}</p>
                  <span className="capability-stat">
                    <HiCheckCircle />
                    {cap.stat}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: INDUSTRIES
      ============================================ */}
      <section className="industries-section">
        <div className="industries-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Experiencia Sectorial</span>
            <h2 className="section-title">
              Expertos en
              <span className="gradient-text"> múltiples industrias</span>
            </h2>
            <p className="section-subtitle">
              Más de 70 proyectos exitosos en los sectores más exigentes de Latinoamérica
            </p>
          </motion.div>

          <div className="industries-grid">
            {industries.map((ind, idx) => (
              <motion.div 
                key={idx}
                className="industry-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                style={{ '--card-color': ind.color }}
              >
                <div className="industry-icon" style={{ background: ind.color }}>
                  {ind.icon}
                </div>
                <div className="industry-info">
                  <h3>{ind.name}</h3>
                  <p className="industry-description">{ind.description}</p>
                  <div className="industry-stats">
                    <div className="industry-stat">
                      <strong>{ind.count}</strong>
                      <span>proyectos</span>
                    </div>
                    {ind.highlight && (
                      <span className="industry-badge">{ind.highlight}</span>
                    )}
                  </div>
                </div>
                <div className="industry-card-before" style={{ background: ind.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 7: CASE STUDIES
      ============================================ */}
      <section className="cases-section">
        <div className="cases-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Casos de Éxito</span>
            <h2 className="section-title">
              Resultados que
              <span className="gradient-text"> hablan por sí solos</span>
            </h2>
          </motion.div>

          <div className="cases-grid">
            {cases.map((caseItem, idx) => (
              <motion.article 
                key={idx}
                className="case-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="case-image">
                  <img src={caseItem.image} alt={caseItem.company} loading="lazy" />
                  <div className="case-overlay" style={{ background: `linear-gradient(to top, ${caseItem.color}ee, ${caseItem.color}66)` }} />
                </div>
                <div className="case-content">
                  <img src={caseItem.logo} alt={caseItem.company} className="case-logo" />
                  <h3>{caseItem.company}</h3>
                  <h4>{caseItem.title}</h4>
                  <p>{caseItem.description}</p>
                  <div className="case-metrics">
                    {caseItem.metrics.map((metric, i) => (
                      <span key={i}>{metric}</span>
                    ))}
                  </div>
                  <Link to={caseItem.link} className="case-link">
                    Ver caso completo
                    <FiArrowUpRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="cases-cta">
            <Link to="/Casos" className="btn-outline">
              Ver todos los casos
              <HiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 8: PROCESS
      ============================================ */}
      <section className="process-section">
        <div className="process-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Nuestro Proceso</span>
            <h2 className="section-title">
              Metodología probada para
              <span className="gradient-text"> resultados garantizados</span>
            </h2>
            <p className="section-subtitle">
              Un enfoque estructurado que minimiza riesgos y maximiza el valor de tu inversión
            </p>
          </motion.div>

          <div className="process-grid">
            {process.map((step, idx) => (
              <motion.div 
                key={idx}
                className="process-step"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="step-header">
                  <div className="step-number">{step.step}</div>
                  <div className="step-icon-wrapper">
                    <span className="step-icon">{step.icon}</span>
                  </div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="step-features">
                  {step.features.map((feat, i) => (
                    <span key={i} className="step-feature">
                      <HiCheckCircle /> {feat}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 9: TESTIMONIALS
      ============================================ */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Testimonios</span>
            <h2 className="section-title">
              Lo que dicen
              <span className="gradient-text"> nuestros clientes</span>
            </h2>
          </motion.div>

          <div className="testimonial-carousel">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTestimonial}
                className="testimonial-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <FaQuoteLeft className="quote-icon" />
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="star" />
                  ))}
                </div>
                <blockquote>{testimonials[activeTestimonial].quote}</blockquote>
                <div className="testimonial-author">
                  <img 
                    src={testimonials[activeTestimonial].logo} 
                    alt={testimonials[activeTestimonial].company}
                    className="author-logo"
                  />
                  <div className="author-info">
                    <strong>{testimonials[activeTestimonial].author}</strong>
                    <span>{testimonials[activeTestimonial].role}</span>
                    <span className="author-company">{testimonials[activeTestimonial].company}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="testimonial-dots">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  className={`dot ${idx === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`Ver testimonio ${idx + 1}`}
                >
                  <img 
                    src={testimonials[idx].logo} 
                    alt="" 
                    className="dot-logo" 
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 10: CTA / CONTACT
      ============================================ */}
      <section className="cta-section">
        <div className="cta-background">
          <img src={AbstractImage} alt="" />
          <div className="cta-overlay" />
        </div>

        <div className="cta-container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <HiSparkles className="cta-icon" />
            <h2>
              ¿Listo para transformar
              <span className="gradient-text-light"> tu negocio?</span>
            </h2>
            <p>
              Agenda una consulta gratuita con nuestros expertos y descubre 
              cómo podemos impulsar tu transformación digital.
            </p>

            <div className="cta-actions">
              <Link to="/Contacto" className="btn-primary-large">
                Empezar ahora
                <HiArrowRight />
              </Link>
              
              <div className="cta-contact">
                <a href="tel:+5112345678" className="contact-link">
                  <FiPhoneCall />
                  +51 1 234 5678
                </a>
                <a href="mailto:contacto@novasys.pe" className="contact-link">
                  <FiMail />
                  contacto@novasys.pe
                </a>
              </div>
            </div>

            <div className="cta-features">
              <span><HiCheckCircle /> Consulta sin costo</span>
              <span><HiCheckCircle /> Respuesta en 24h</span>
              <span><HiCheckCircle /> Expertos certificados</span>
            </div>
          </motion.div>

          <div className="cta-partners">
            <span>Partners oficiales</span>
            <div className="cta-logos">
              <img src={AWSLogo} alt="AWS" />
              <img src={OracleLogo} alt="Oracle" />
              <img src={HPLogo} alt="HP" />
            </div>
          </div>

          <div className="cta-trust">
            <BiCheckShield />
            <span>Datos protegidos · ISO 27001 Certified</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
