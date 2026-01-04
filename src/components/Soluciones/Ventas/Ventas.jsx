import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { 
  HiOutlineCurrencyDollar, HiOutlineChartBar, HiOutlineBriefcase,
  HiOutlineArrowRight, HiOutlineUserGroup, HiOutlinePresentationChartLine,
  HiOutlineClipboardDocumentCheck, HiOutlineCog, HiOutlineSparkles,
  HiOutlineBuildingOffice2, HiOutlineRocketLaunch, HiOutlinePhone,
  HiOutlineDocumentText, HiOutlineCalculator, HiOutlineTrophy,
  HiOutlineArrowTrendingUp, HiOutlineShieldCheck, HiOutlinePlay,
  HiOutlineCheckCircle
} from 'react-icons/hi2';
import { FaCloud, FaHeadset, FaDatabase, FaCogs } from 'react-icons/fa';
import { useNightMode } from '../../../hooks/useNightMode';
import './Ventas.css';

// Componente para números animados
const AnimatedNumber = ({ value, suffix = '', prefix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseFloat(value);
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Number.isInteger(end) ? Math.floor(start) : parseFloat(start.toFixed(1)));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Componente visual de pipeline de ventas
const SalesPipeline = () => {
  const stages = [
    { name: 'Lead', value: 2500, color: '#6366f1' },
    { name: 'Qualified', value: 1800, color: '#8b5cf6' },
    { name: 'Proposal', value: 1200, color: '#a855f7' },
    { name: 'Negotiation', value: 800, color: '#c084fc' },
    { name: 'Closed', value: 500, color: '#d946ef' }
  ];

  return (
    <div className="sales-visual-container">
      {/* Main dashboard mockup */}
      <motion.div
        className="sales-dashboard"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header bar */}
        <div className="sales-dash-header">
          <div className="sales-dash-dots">
            <span></span><span></span><span></span>
          </div>
          <span className="sales-dash-title">Sales Cloud Dashboard</span>
        </div>

        {/* Content */}
        <div className="sales-dash-content">
          {/* KPI Cards Row */}
          <div className="sales-kpi-row">
            {[
              { label: 'Revenue', value: '$2.4M', change: '+12%', positive: true },
              { label: 'Deals', value: '847', change: '+8%', positive: true },
              { label: 'Win Rate', value: '68%', change: '+5%', positive: true }
            ].map((kpi, i) => (
              <motion.div
                key={i}
                className="sales-kpi-mini"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <span className="sales-kpi-value">{kpi.value}</span>
                <span className="sales-kpi-label">{kpi.label}</span>
                <span className={`sales-kpi-change ${kpi.positive ? 'positive' : ''}`}>
                  {kpi.change}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Pipeline funnel */}
          <div className="sales-pipeline-visual">
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                className="sales-stage"
                style={{ 
                  '--stage-width': `${100 - index * 15}%`,
                  '--stage-color': stage.color
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
              >
                <span className="sales-stage-name">{stage.name}</span>
                <span className="sales-stage-value">{stage.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating metric cards */}
      <motion.div
        className="sales-floating-metric sales-metric-1"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <HiOutlineArrowTrendingUp />
        <span>+24% MoM</span>
      </motion.div>

      <motion.div
        className="sales-floating-metric sales-metric-2"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        <HiOutlineTrophy />
        <span>Top Seller</span>
      </motion.div>
    </div>
  );
};

const Ventas = () => {
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

  // Productos de Ventas
  const products = [
    {
      id: 'sales-cloud',
      name: 'Oracle Sales Cloud',
      description: 'CRM inteligente con IA para gestión completa del ciclo de ventas y forecasting predictivo',
      image: isNight ? '/images/Logos/ORACLE/OSales.png' : '/images/Logos/ORACLE/OSales.png',
      link: '/soluciones/ventas/sales-cloud',
      color: '#6366f1',
      icon: <FaCloud />,
      features: ['Pipeline Management', 'AI Forecasting', 'Mobile Sales']
    },
    {
      id: 'service-cloud',
      name: 'Oracle Service Cloud',
      description: 'Plataforma omnicanal de servicio al cliente con automatización inteligente',
      image: isNight ? '/images/Logos/ORACLE/oservicecloud.png' : '/images/Logos/ORACLE/oservicecloud.png',
      link: '/soluciones/ventas/service-cloud',
      color: '#8b5cf6',
      icon: <FaHeadset />,
      features: ['Omnichannel Support', 'Knowledge Base', 'Self-Service']
    },
    {
      id: 'siebel',
      name: 'Oracle Siebel',
      description: 'Solución CRM empresarial probada para industrias específicas y procesos complejos',
      image: isNight ? '/images/Logos/ORACLE/Osiebel.png' : '/images/Logos/ORACLE/Osiebel.png',
      link: '/soluciones/ventas/siebel',
      color: '#a855f7',
      icon: <FaDatabase />,
      features: ['Industry Solutions', 'Enterprise Scale', 'Customization']
    },
    {
      id: 'cpq',
      name: 'Oracle CPQ Cloud',
      description: 'Configure, Price, Quote automatizado para propuestas complejas sin errores',
      image: isNight ? '/images/Logos/ORACLE/Oconfigure.png' : '/images/Logos/ORACLE/Oconfigure.png',
      link: '/soluciones/ventas/cpq',
      color: '#c084fc',
      icon: <FaCogs />,
      features: ['Product Config', 'Dynamic Pricing', 'Quote Automation']
    }
  ];

  // Features
  const features = [
    {
      icon: <HiOutlineSparkles />,
      title: 'IA Predictiva',
      desc: 'Predicciones de ventas precisas y recomendaciones de próxima mejor acción'
    },
    {
      icon: <HiOutlineChartBar />,
      title: 'Analytics Ejecutivo',
      desc: 'Dashboards en tiempo real para toma de decisiones basada en datos'
    },
    {
      icon: <HiOutlineUserGroup />,
      title: 'Gestión de Equipos',
      desc: 'Territorios, cuotas y rendimiento del equipo comercial centralizado'
    },
    {
      icon: <HiOutlineCog />,
      title: 'Automatización',
      desc: 'Workflows que eliminan tareas manuales y aceleran el ciclo de ventas'
    },
    {
      icon: <HiOutlineShieldCheck />,
      title: 'Datos Confiables',
      desc: 'Single source of truth para toda la información del cliente'
    },
    {
      icon: <HiOutlineBuildingOffice2 />,
      title: 'Enterprise Ready',
      desc: 'Escalabilidad y seguridad para organizaciones de cualquier tamaño'
    }
  ];

  // Process steps
  const processSteps = [
    {
      number: '01',
      title: 'Prospección',
      desc: 'Identifica leads calificados con scoring inteligente',
      icon: <HiOutlineUserGroup />
    },
    {
      number: '02',
      title: 'Engagement',
      desc: 'Interactúa con contenido personalizado multicanal',
      icon: <HiOutlineCurrencyDollar />
    },
    {
      number: '03',
      title: 'Propuesta',
      desc: 'Genera cotizaciones precisas automáticamente',
      icon: <HiOutlineDocumentText />
    },
    {
      number: '04',
      title: 'Cierre',
      desc: 'Optimiza negociaciones con insights de IA',
      icon: <HiOutlineTrophy />
    }
  ];

  // Stats
  const stats = [
    { icon: <HiOutlineCurrencyDollar />, value: '35', suffix: '%', label: 'Más Ingresos' },
    { icon: <HiOutlineArrowTrendingUp />, value: '28', suffix: '%', label: 'Mayor Productividad' },
    { icon: <HiOutlineBriefcase />, value: '45', suffix: '%', label: 'Ciclo Más Corto' },
    { icon: <HiOutlinePresentationChartLine />, value: '99', suffix: '%', label: 'Precisión Forecast' }
  ];

  return (
    <>
      <Helmet>
        <title>Ventas - CRM y Automatización Comercial | Novasys</title>
        <meta name="description" content="Soluciones Oracle CX Sales para transformar tu proceso comercial. Sales Cloud, Service Cloud, Siebel y CPQ para equipos de ventas de alto rendimiento." />
        <meta name="keywords" content="crm oracle, sales cloud, service cloud, siebel, cpq, automatización ventas, gestión comercial" />
        <link rel="canonical" href="https://novasys.com.pe/soluciones/ventas" />
      </Helmet>

      <div className={`sales-page ${isNight ? 'night' : ''}`}>
        {/* Hero Section */}
        <section className="sales-hero">
          <div className="sales-hero-bg">
            <div className="sales-hero-image" />
            <div className="sales-hero-gradient" />
            <div className="sales-hero-pattern" />
            <div className="sales-orb sales-orb-1" />
            <div className="sales-orb sales-orb-2" />
          </div>

          <motion.div 
            className="sales-hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="sales-hero-layout">
              <motion.div className="sales-hero-text" variants={fadeUp}>
                <motion.div className="sales-hero-badge" variants={fadeUp}>
                  <HiOutlineBriefcase className="sales-badge-icon" />
                  <span>Sales Excellence</span>
                </motion.div>

                <motion.h1 className="sales-hero-title" variants={fadeUp}>
                  Acelera tus
                  <span className="sales-title-gradient"> Ventas</span>
                  <br />con Inteligencia
                </motion.h1>

                <motion.p className="sales-hero-desc" variants={fadeUp}>
                  Potencia tu equipo comercial con las mejores herramientas CRM 
                  del mercado. IA predictiva, automatización inteligente y analytics 
                  avanzado para cerrar más negocios, más rápido.
                </motion.p>

                <motion.div className="sales-hero-actions" variants={fadeUp}>
                  <Link to="/contacto" className="sales-btn sales-btn-primary">
                    <HiOutlineRocketLaunch />
                    Potencia tus Ventas
                  </Link>
                  <button className="sales-btn sales-btn-secondary">
                    <HiOutlinePlay />
                    Ver Demo
                  </button>
                </motion.div>
              </motion.div>

              <motion.div 
                className="sales-hero-visual"
                variants={fadeUp}
              >
                <SalesPipeline />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="sales-stats">
          <div className="sales-stats-container">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="sales-stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="sales-stat-icon">{stat.icon}</div>
                <div className="sales-stat-value">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="sales-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section className="sales-products">
          <div className="sales-products-container">
            <motion.div 
              className="sales-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="sales-section-title">
                Plataformas de Ventas
                <span className="sales-title-underline" />
              </h2>
              <p className="sales-section-subtitle">
                Suite completa Oracle CX para todo el ciclo comercial
              </p>
            </motion.div>

            <motion.div 
              className="sales-products-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="sales-product-card"
                  variants={fadeUp}
                  style={{ '--product-color': product.color }}
                  whileHover={{ y: -8 }}
                >
                  <Link to={product.link} className="sales-product-link">
                    <div className="sales-product-header">
                      <div className="sales-product-icon-badge">
                        {product.icon}
                      </div>
                      <div className="sales-product-image-wrap">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="sales-product-image"
                        />
                      </div>
                    </div>
                    <div className="sales-product-info">
                      <h3 className="sales-product-title">{product.name}</h3>
                      <p className="sales-product-desc">{product.description}</p>
                      <div className="sales-product-features">
                        {product.features.map((feat, i) => (
                          <span key={i} className="sales-product-feature">
                            <HiOutlineCheckCircle /> {feat}
                          </span>
                        ))}
                      </div>
                      <span className="sales-product-cta">
                        Explorar <HiOutlineArrowRight />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="sales-features">
          <div className="sales-features-container">
            <motion.div 
              className="sales-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="sales-section-title">
                ¿Por qué elegirnos?
                <span className="sales-title-underline" />
              </h2>
              <p className="sales-section-subtitle">
                Tecnología que transforma resultados comerciales
              </p>
            </motion.div>

            <motion.div 
              className="sales-features-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="sales-feature-card"
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="sales-feature-icon">
                    {feature.icon}
                  </div>
                  <h3 className="sales-feature-title">{feature.title}</h3>
                  <p className="sales-feature-desc">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="sales-process">
          <div className="sales-process-container">
            <motion.div 
              className="sales-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="sales-section-title sales-title-light">
                El Proceso de Venta Perfecto
                <span className="sales-title-underline sales-underline-light" />
              </h2>
              <p className="sales-section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Optimiza cada etapa de tu funnel de ventas
              </p>
            </motion.div>

            <div className="sales-process-steps">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="sales-process-step"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="sales-step-number">{step.number}</div>
                  <div className="sales-step-icon">{step.icon}</div>
                  <h3 className="sales-step-title">{step.title}</h3>
                  <p className="sales-step-desc">{step.desc}</p>
                  {index < processSteps.length - 1 && (
                    <div className="sales-step-connector" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="sales-cta">
          <div className="sales-cta-container">
            <motion.div
              className="sales-cta-content"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="sales-cta-icon">
                <HiOutlineTrophy />
              </div>
              <h2 className="sales-cta-title">
                ¿Listo para Superar tus Metas?
              </h2>
              <p className="sales-cta-text">
                Descubre cómo nuestras soluciones Oracle CX pueden ayudarte a 
                construir un equipo de ventas de clase mundial
              </p>
              <div className="sales-cta-buttons">
                <Link to="/contacto" className="sales-btn sales-btn-light">
                  <HiOutlinePhone />
                  Hablar con Ventas
                </Link>
                <Link to="/soluciones" className="sales-btn sales-btn-ghost">
                  Más Soluciones
                  <HiOutlineArrowRight />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Ventas;
