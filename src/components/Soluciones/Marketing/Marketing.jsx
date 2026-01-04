import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { 
  HiOutlineMegaphone, HiOutlineChartBar, HiOutlineUsers, 
  HiOutlineSparkles, HiOutlineArrowRight, HiOutlineLightBulb,
  HiOutlineGlobeAlt, HiOutlineCog, HiOutlinePresentationChartLine,
  HiOutlineUserGroup, HiOutlineChatBubbleLeftRight, HiOutlineEnvelope,
  HiOutlineCheckCircle, HiOutlinePlay, HiOutlineRocketLaunch
} from 'react-icons/hi2';
import { FaDatabase, FaCloud, FaEnvelopeOpenText, FaMobile } from 'react-icons/fa';
import { useNightMode } from '../../../hooks/useNightMode';
import './Marketing.css';

// Componente para números animados
const AnimatedNumber = ({ value, suffix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// Componente visual de campañas flotantes
const FloatingCampaigns = () => {
  const campaigns = [
    { icon: <HiOutlineEnvelope />, color: '#f97316', label: 'Email', x: 15, y: 20 },
    { icon: <FaMobile />, color: '#8b5cf6', label: 'SMS', x: 85, y: 25 },
    { icon: <HiOutlineGlobeAlt />, color: '#3b82f6', label: 'Web', x: 10, y: 70 },
    { icon: <HiOutlineChatBubbleLeftRight />, color: '#ec4899', label: 'Social', x: 88, y: 75 }
  ];

  return (
    <div className="mkt-visual-container">
      {/* Central Hub */}
      <motion.div
        className="mkt-central-hub"
        animate={{ 
          boxShadow: [
            '0 20px 60px rgba(249, 115, 22, 0.3)',
            '0 25px 80px rgba(249, 115, 22, 0.5)',
            '0 20px 60px rgba(249, 115, 22, 0.3)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <HiOutlineMegaphone className="mkt-hub-icon" />
        <span>Marketing</span>
        <span className="mkt-hub-subtitle">Automation</span>
      </motion.div>

      {/* Floating campaigns */}
      {campaigns.map((campaign, index) => (
        <motion.div
          key={index}
          className="mkt-floating-campaign"
          style={{ 
            left: `${campaign.x}%`, 
            top: `${campaign.y}%`,
            '--campaign-color': campaign.color
          }}
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2 + index * 0.3,
            repeat: Infinity,
            delay: index * 0.2
          }}
        >
          {campaign.icon}
          <span className="mkt-campaign-label">{campaign.label}</span>
        </motion.div>
      ))}

      {/* Pulse rings */}
      <div className="mkt-pulse-rings">
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="mkt-pulse-ring"
            animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: ring * 0.5 }}
          />
        ))}
      </div>

      {/* Connection lines */}
      <svg className="mkt-connections" viewBox="0 0 100 100" preserveAspectRatio="none">
        {campaigns.map((campaign, index) => (
          <motion.line
            key={index}
            x1="50" y1="50"
            x2={campaign.x} y2={campaign.y}
            stroke={campaign.color}
            strokeWidth="0.3"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
};

const Marketing = () => {
  const isNight = useNightMode();

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  // Productos de Marketing
  const products = [
    {
      id: 'ocloud',
      name: 'Oracle Cloud PaaS',
      description: 'Plataforma en la nube para desarrollo y despliegue de aplicaciones de marketing empresarial',
      image: isNight ? '/images/Logos/ORACLE/Ocloud.png' : '/images/Logos/ORACLE/Ocloud.png',
      link: '/soluciones/marketing/oracle-cloud',
      color: '#f97316',
      icon: <FaCloud />
    },
    {
      id: 'bluekai',
      name: 'Oracle BlueKai',
      description: 'Plataforma de gestión de datos para crear perfiles de audiencia precisos',
      image: isNight ? '/images/Logos/ORACLE/Bluekai_logo_color.png' : '/images/Logos/ORACLE/Bluekai_logo_color.png',
      link: '/soluciones/marketing/bluekai',
      color: '#3b82f6',
      icon: <FaDatabase />
    },
    {
      id: 'eloqua',
      name: 'Oracle Eloqua',
      description: 'Marketing automation B2B líder para orquestar campañas personalizadas',
      image: isNight ? '/images/Logos/ORACLE/Eloqua.png' : '/images/Logos/ORACLE/Eloqua.png',
      link: '/soluciones/marketing/eloqua',
      color: '#ef4444',
      icon: <FaEnvelopeOpenText />
    },
    {
      id: 'responsys',
      name: 'Oracle Responsys',
      description: 'Marketing cross-channel B2C para experiencias personalizadas a escala',
      image: isNight ? '/images/Logos/ORACLE/Oresponsys.png' : '/images/Logos/ORACLE/Oresponsys.png',
      link: '/soluciones/marketing/responsys',
      color: '#8b5cf6',
      icon: <FaMobile />
    }
  ];

  // Features
  const features = [
    {
      icon: <HiOutlineSparkles />,
      title: 'IA Predictiva',
      desc: 'Algoritmos inteligentes que predicen comportamientos y optimizan campañas en tiempo real'
    },
    {
      icon: <HiOutlineChartBar />,
      title: 'Analytics Avanzado',
      desc: 'Dashboards interactivos con métricas de ROI, engagement y conversión'
    },
    {
      icon: <HiOutlineUsers />,
      title: 'Segmentación Dinámica',
      desc: 'Audiencias inteligentes basadas en comportamiento, demografía e intención'
    },
    {
      icon: <HiOutlineLightBulb />,
      title: 'Personalización 1:1',
      desc: 'Contenido único para cada cliente en el momento y canal correctos'
    },
    {
      icon: <HiOutlineCog />,
      title: 'Automatización Total',
      desc: 'Workflows que nutren leads y convierten prospectos automáticamente'
    },
    {
      icon: <HiOutlineGlobeAlt />,
      title: 'Omnicanal Unificado',
      desc: 'Email, SMS, push, web, social y más desde una sola plataforma'
    }
  ];

  // Channel stats
  const channels = [
    { name: 'Email Marketing', value: 98, color: '#f97316' },
    { name: 'Social Media', value: 87, color: '#ec4899' },
    { name: 'Web Personalization', value: 92, color: '#3b82f6' },
    { name: 'Mobile Push', value: 84, color: '#8b5cf6' }
  ];

  // Stats
  const stats = [
    { icon: <HiOutlineMegaphone />, value: '500', suffix: 'M+', label: 'Campañas Enviadas' },
    { icon: <HiOutlineUserGroup />, value: '150', suffix: 'M+', label: 'Perfiles de Clientes' },
    { icon: <HiOutlinePresentationChartLine />, value: '45', suffix: '%', label: 'Aumento en ROI' },
    { icon: <HiOutlineCheckCircle />, value: '99.9', suffix: '%', label: 'Entregabilidad' }
  ];

  return (
    <>
      <Helmet>
        <title>Marketing Cloud - Automatización y Personalización | Novasys</title>
        <meta name="description" content="Soluciones de marketing automation con Oracle Marketing Cloud. Email, cross-channel, personalización, analytics y gestión de datos." />
        <meta name="keywords" content="marketing automation, oracle eloqua, responsys, bluekai, email marketing, marketing cloud, omnicanal" />
        <link rel="canonical" href="https://novasys.com.pe/soluciones/marketing" />
      </Helmet>

      <div className={`mkt-page ${isNight ? 'night' : ''}`}>
        {/* Hero Section */}
        <section className="mkt-hero">
          <div className="mkt-hero-bg">
            <div className="mkt-hero-image" />
            <div className="mkt-hero-gradient" />
            <div className="mkt-hero-pattern" />
            <div className="mkt-orb mkt-orb-1" />
            <div className="mkt-orb mkt-orb-2" />
            <div className="mkt-orb mkt-orb-3" />
          </div>

          <motion.div 
            className="mkt-hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="mkt-hero-layout">
              <motion.div className="mkt-hero-text" variants={fadeUp}>
                <motion.div className="mkt-hero-badge" variants={fadeUp}>
                  <HiOutlineSparkles className="mkt-badge-icon" />
                  <span>Marketing Automation</span>
                </motion.div>

                <motion.h1 className="mkt-hero-title" variants={fadeUp}>
                  Campañas que
                  <span className="mkt-title-gradient"> Conectan</span>
                  <br />y Convierten
                </motion.h1>

                <motion.p className="mkt-hero-desc" variants={fadeUp}>
                  Transforma la experiencia de tus clientes con marketing automation 
                  inteligente. Personalización a escala, analytics en tiempo real y 
                  orquestación cross-channel desde una sola plataforma.
                </motion.p>

                <motion.div className="mkt-hero-actions" variants={fadeUp}>
                  <Link to="/contacto" className="mkt-btn mkt-btn-primary">
                    <HiOutlineRocketLaunch />
                    Impulsa tu Marketing
                  </Link>
                  <button className="mkt-btn mkt-btn-secondary">
                    <HiOutlinePlay />
                    Ver Demo
                  </button>
                </motion.div>
              </motion.div>

              <motion.div 
                className="mkt-hero-visual"
                variants={fadeUp}
              >
                <FloatingCampaigns />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="mkt-stats">
          <div className="mkt-stats-container">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="mkt-stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mkt-stat-icon">{stat.icon}</div>
                <div className="mkt-stat-value">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mkt-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="mkt-products">
          <div className="mkt-products-container">
            <motion.div 
              className="mkt-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mkt-section-title">
                Nuestras Soluciones
                <span className="mkt-title-underline" />
              </h2>
              <p className="mkt-section-subtitle">
                Suite completa de herramientas Oracle Marketing Cloud para cada necesidad
              </p>
            </motion.div>

            <motion.div 
              className="mkt-products-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="mkt-product-card"
                  variants={fadeUp}
                  style={{ '--product-color': product.color }}
                  whileHover={{ y: -8 }}
                >
                  <Link to={product.link} className="mkt-product-link">
                    <div className="mkt-product-icon-badge">
                      {product.icon}
                    </div>
                    <div className="mkt-product-image-wrap">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="mkt-product-image"
                      />
                    </div>
                    <div className="mkt-product-info">
                      <h3 className="mkt-product-title">{product.name}</h3>
                      <p className="mkt-product-desc">{product.description}</p>
                      <span className="mkt-product-cta">
                        Conocer más <HiOutlineArrowRight />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mkt-features">
          <div className="mkt-features-container">
            <motion.div 
              className="mkt-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mkt-section-title">
                Capacidades de Plataforma
                <span className="mkt-title-underline" />
              </h2>
              <p className="mkt-section-subtitle">
                Tecnología de punta para maximizar el impacto de tus campañas
              </p>
            </motion.div>

            <motion.div 
              className="mkt-features-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="mkt-feature-card"
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="mkt-feature-icon">
                    {feature.icon}
                  </div>
                  <h3 className="mkt-feature-title">{feature.title}</h3>
                  <p className="mkt-feature-desc">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Channel Performance */}
        <section className="mkt-channels">
          <div className="mkt-channels-container">
            <motion.div 
              className="mkt-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mkt-section-title mkt-title-light">
                Rendimiento por Canal
                <span className="mkt-title-underline mkt-underline-light" />
              </h2>
              <p className="mkt-section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Optimiza cada punto de contacto con tus clientes
              </p>
            </motion.div>

            <div className="mkt-channels-grid">
              {channels.map((channel, index) => (
                <motion.div
                  key={index}
                  className="mkt-channel-card"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="mkt-channel-info">
                    <span className="mkt-channel-name">{channel.name}</span>
                    <span className="mkt-channel-value">{channel.value}%</span>
                  </div>
                  <div className="mkt-channel-bar">
                    <motion.div
                      className="mkt-channel-fill"
                      style={{ backgroundColor: channel.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${channel.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.15 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mkt-cta">
          <div className="mkt-cta-container">
            <motion.div
              className="mkt-cta-content"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mkt-cta-title">
                ¿Listo para Revolucionar tu Marketing?
              </h2>
              <p className="mkt-cta-text">
                Descubre cómo las soluciones Oracle Marketing Cloud pueden 
                transformar la manera en que te conectas con tus clientes
              </p>
              <div className="mkt-cta-buttons">
                <Link to="/contacto" className="mkt-btn mkt-btn-light">
                  <HiOutlineMegaphone />
                  Solicitar Consulta
                </Link>
                <Link to="/soluciones" className="mkt-btn mkt-btn-ghost">
                  Ver Todas las Soluciones
                  <HiOutlineArrowRight />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="mkt-cta-decoration">
            <div className="mkt-cta-icons">
              <HiOutlineEnvelope />
              <HiOutlineChatBubbleLeftRight />
              <HiOutlineGlobeAlt />
              <FaMobile />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Marketing;
