import { motion } from "framer-motion";
import { FaArrowRight, FaAws, FaPlay, FaCheck, FaCloud, FaDatabase, FaHeadset } from "react-icons/fa";
import { SiOracle } from "react-icons/si";
import { HiSparkles, HiChartBar, HiCube, HiLightningBolt } from "react-icons/hi";
import logo from "../../../img/logo_novasys_transparent.png";
import "./HeroSection.css";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

function HeroSection({ onMenuOpen }) {
  return (
    <section id="intro" className="hero-section">
      {/* Premium animated background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-gradient"></div>
        <div className="hero-bg-noise"></div>
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-glow hero-glow-3"></div>
        
        {/* Floating particles */}
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <motion.header 
        className="hero-nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-nav-inner">
          <button
            className="hero-menu-btn"
            aria-label="Abrir menú"
            onClick={onMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <a href="/" className="hero-logo">
            <img src={logo} alt="Novasys del Perú" />
          </a>

          <nav className="hero-links">
            <a href="/Soluciones">Soluciones</a>
            <a href="/Nosotros">Nosotros</a>
            <a href="/Casos_de_exito">Casos de Éxito</a>
            <a href="/Eventos">Eventos</a>
          </nav>

          <a href="/Contacto" className="hero-nav-cta">
            <span>Contactar</span>
            <FaArrowRight />
          </a>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Announcement badge */}
          <motion.div className="hero-badge" variants={fadeInUp}>
            <HiSparkles className="badge-icon" />
            <span>+20 años transformando empresas</span>
            <FaArrowRight className="badge-arrow" />
          </motion.div>

          {/* Main headline */}
          <motion.h1 className="hero-title" variants={fadeInUp}>
            Construimos el
            <span className="hero-title-gradient"> futuro digital </span>
            de tu empresa
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="hero-subtitle" variants={fadeInUp}>
            Somos la empresa integradora de tecnología líder en Perú. 
            Implementamos soluciones de cloud, contact center y transformación 
            digital que potencian el crecimiento de tu negocio.
          </motion.p>

          {/* CTA buttons */}
          <motion.div className="hero-actions" variants={fadeInUp}>
            <motion.a 
              href="/Contacto" 
              className="hero-cta-primary"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Agenda una consulta
              <FaArrowRight />
            </motion.a>
            <motion.a 
              href="/Casos_de_exito" 
              className="hero-cta-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaPlay />
              Ver proyectos
            </motion.a>
          </motion.div>

          {/* Social proof */}
          <motion.div className="hero-proof" variants={fadeInUp}>
            <div className="proof-partners">
              <span className="proof-label">Partners certificados</span>
              <div className="proof-logos">
                <div className="proof-logo aws"><FaAws /></div>
                <div className="proof-logo oracle"><SiOracle /></div>
                <div className="proof-logo hp">hp</div>
              </div>
            </div>
            <div className="proof-divider"></div>
            <div className="proof-stats">
              <div className="proof-stat">
                <span className="proof-stat-value">200+</span>
                <span className="proof-stat-label">Proyectos</span>
              </div>
              <div className="proof-stat">
                <span className="proof-stat-value">98%</span>
                <span className="proof-stat-label">Satisfacción</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual dashboard mockup */}
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 60, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="hero-dashboard">
            {/* Dashboard window */}
            <div className="dashboard-window">
              <div className="dashboard-header">
                <div className="window-controls">
                  <span className="control red"></span>
                  <span className="control yellow"></span>
                  <span className="control green"></span>
                </div>
                <span className="dashboard-title">Novasys Analytics</span>
              </div>
              
              <div className="dashboard-body">
                {/* Stats row */}
                <div className="dash-stats">
                  <div className="dash-stat-card">
                    <div className="stat-icon blue"><HiChartBar /></div>
                    <div className="stat-info">
                      <span className="stat-val">+45%</span>
                      <span className="stat-desc">Eficiencia</span>
                    </div>
                  </div>
                  <div className="dash-stat-card highlight">
                    <div className="stat-icon green"><FaCheck /></div>
                    <div className="stat-info">
                      <span className="stat-val">98%</span>
                      <span className="stat-desc">Uptime</span>
                    </div>
                  </div>
                  <div className="dash-stat-card">
                    <div className="stat-icon purple"><HiLightningBolt /></div>
                    <div className="stat-info">
                      <span className="stat-val">2.5x</span>
                      <span className="stat-desc">ROI</span>
                    </div>
                  </div>
                </div>

                {/* Chart area */}
                <div className="dash-chart">
                  <div className="chart-header">
                    <span>Métricas de rendimiento</span>
                    <span className="chart-period">Últimos 7 días</span>
                  </div>
                  <div className="chart-visual">
                    <svg viewBox="0 0 300 80" className="chart-line">
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0,60 Q30,55 50,45 T100,40 T150,25 T200,30 T250,15 T300,10" 
                        fill="none" 
                        stroke="var(--primary-color)" 
                        strokeWidth="2"
                      />
                      <path 
                        d="M0,60 Q30,55 50,45 T100,40 T150,25 T200,30 T250,15 T300,10 L300,80 L0,80 Z" 
                        fill="url(#chartGradient)"
                      />
                    </svg>
                  </div>
                </div>

                {/* Service cards */}
                <div className="dash-services">
                  <div className="service-mini">
                    <FaCloud className="service-icon" />
                    <span>Cloud</span>
                  </div>
                  <div className="service-mini">
                    <FaHeadset className="service-icon" />
                    <span>Contact</span>
                  </div>
                  <div className="service-mini">
                    <FaDatabase className="service-icon" />
                    <span>Data</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div 
              className="float-card float-card-1"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <FaAws className="float-icon" />
              <div className="float-content">
                <span className="float-title">AWS Connect</span>
                <span className="float-desc">Activo</span>
              </div>
              <span className="float-status active"></span>
            </motion.div>

            <motion.div 
              className="float-card float-card-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
            >
              <HiCube className="float-icon purple" />
              <div className="float-content">
                <span className="float-title">Oracle Cloud</span>
                <span className="float-desc">Conectado</span>
              </div>
            </motion.div>

            <motion.div 
              className="float-card float-card-3"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
            >
              <div className="float-notification">
                <span className="notif-badge">+12</span>
                <span className="notif-text">Leads hoy</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom stats bar */}
      <motion.div 
        className="hero-stats-bar"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <div className="stats-inner">
          <div className="stat-block">
            <span className="stat-number">20+</span>
            <span className="stat-label">Años de experiencia</span>
          </div>
          <div className="stat-separator"></div>
          <div className="stat-block">
            <span className="stat-number">200+</span>
            <span className="stat-label">Proyectos exitosos</span>
          </div>
          <div className="stat-separator"></div>
          <div className="stat-block">
            <span className="stat-number">50+</span>
            <span className="stat-label">Clientes activos</span>
          </div>
          <div className="stat-separator"></div>
          <div className="stat-block">
            <span className="stat-number">3</span>
            <span className="stat-label">Países</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
