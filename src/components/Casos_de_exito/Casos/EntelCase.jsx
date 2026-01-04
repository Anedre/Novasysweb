import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './EntelCase.css';

// Images
import imgHero from '../../../img/Corporativo/conny-schneider-xuTJZ7uD7PI-unsplash.jpg';
import imgDashboard from '../../../img/Corporativo/luke-chesser-JKUTrJ4vK00-unsplash.jpg';
import imgTeam from '../../../img/Corporativo/krakenimages-Y5bvRlcCx8k-unsplash.jpg';
import imgData from '../../../img/Corporativo/carlos-muza-hpjSkU2UYSU-unsplash.jpg';
import logoEntel from '../../../img/entel.png';

export default function EntelCase() {
  const [activeTab, setActiveTab] = useState(0);

  const solutions = [
    {
      id: 'connect',
      title: 'Amazon Connect',
      subtitle: 'Contact Center Cloud',
      description: 'Plataforma omnicanal escalable que gestiona más de 50,000 interacciones diarias con enrutamiento inteligente basado en IA.',
      features: ['IVR Inteligente', 'Enrutamiento Dinámico', 'Grabación 100%', 'Real-time Analytics'],
      metric: { value: '50K+', label: 'Llamadas/día' }
    },
    {
      id: 'lex',
      title: 'Amazon Lex',
      subtitle: 'Chatbots & Voicebots',
      description: 'Asistentes conversacionales con NLU que resuelven consultas frecuentes sin intervención humana.',
      features: ['NLU Avanzado', 'Multi-idioma', 'Integración CRM', 'Self-service'],
      metric: { value: '60%', label: 'Autoservicio' }
    },
    {
      id: 'analytics',
      title: 'Contact Lens',
      subtitle: 'Analytics & Insights',
      description: 'Análisis de sentimiento en tiempo real y transcripción automática para supervisión de calidad.',
      features: ['Sentiment Analysis', 'Speech-to-Text', 'Quality Scoring', 'Alertas Auto'],
      metric: { value: '92%', label: 'Precisión' }
    }
  ];

  const timeline = [
    { phase: 'Discovery', weeks: '3 sem', tasks: ['Assessment técnico', 'Mapeo de procesos', 'Business case'] },
    { phase: 'Design', weeks: '4 sem', tasks: ['Arquitectura cloud', 'Diseño IVR/UX', 'Plan de integración'] },
    { phase: 'Build', weeks: '10 sem', tasks: ['Desarrollo iterativo', 'Integraciones', 'Testing QA'] },
    { phase: 'Launch', weeks: '2 sem', tasks: ['Go-live piloto', 'Capacitación', 'Soporte 24/7'] }
  ];

  const kpis = [
    { icon: '⏱️', value: '45%', label: 'Reducción AHT', desc: 'Average Handle Time' },
    { icon: '💰', value: '35%', label: 'Ahorro Costos', desc: 'Operación mensual' },
    { icon: '🤖', value: '60%', label: 'Autoservicio', desc: 'Sin agente humano' },
    { icon: '⭐', value: '92%', label: 'CSAT Score', desc: 'Satisfacción cliente' }
  ];

  const techStack = [
    { name: 'Amazon Connect', category: 'Core' },
    { name: 'Amazon Lex', category: 'AI/ML' },
    { name: 'Lambda', category: 'Compute' },
    { name: 'DynamoDB', category: 'Database' },
    { name: 'S3', category: 'Storage' },
    { name: 'QuickSight', category: 'Analytics' },
    { name: 'CloudWatch', category: 'Monitoring' },
    { name: 'IAM', category: 'Security' }
  ];

  return (
    <div className="ent-page">
      {/* === HERO: Bento Grid Layout === */}
      <section className="ent-hero">
        <div className="ent-container">
          <div className="ent-hero-grid">
            {/* Main Content Card */}
            <motion.div 
              className="ent-hero-main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="ent-hero-meta">
                <span className="ent-tag">Caso de Éxito</span>
                <span className="ent-tag ent-tag-outline">Telecomunicaciones</span>
              </div>
              
              <img src={logoEntel} alt="Entel" className="ent-hero-logo" />
              
              <h1>
                Transformación del Contact Center con 
                <span> Amazon Connect</span>
              </h1>
              
              <p>
                Migramos el contact center de Entel a una arquitectura cloud-native, 
                logrando reducir costos en 35% y mejorar la experiencia del cliente.
              </p>

              <div className="ent-hero-actions">
                <Link to="/contacto" className="ent-btn-primary">
                  Solicitar Demo
                </Link>
                <a href="#resultados" className="ent-btn-secondary">
                  Ver Resultados
                </a>
              </div>
            </motion.div>

            {/* Image Card */}
            <motion.div 
              className="ent-hero-image-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <img src={imgHero} alt="Contact Center" />
              <div className="ent-hero-img-overlay" />
              <div className="ent-hero-img-badge">
                <span>✓</span> AWS Advanced Partner
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
              className="ent-hero-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="ent-hsc-icon">📞</span>
              <span className="ent-hsc-value">50K+</span>
              <span className="ent-hsc-label">Llamadas diarias</span>
            </motion.div>

            <motion.div 
              className="ent-hero-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="ent-hsc-icon">👥</span>
              <span className="ent-hsc-value">200+</span>
              <span className="ent-hsc-label">Agentes activos</span>
            </motion.div>

            <motion.div 
              className="ent-hero-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="ent-hsc-icon">🕐</span>
              <span className="ent-hsc-value">24/7</span>
              <span className="ent-hsc-label">Operación continua</span>
            </motion.div>

            <motion.div 
              className="ent-hero-stat-card ent-hero-stat-featured"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="ent-hsc-icon">📊</span>
              <span className="ent-hsc-value">5</span>
              <span className="ent-hsc-label">Canales integrados</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === CHALLENGE: Cards Grid === */}
      <section className="ent-challenge">
        <div className="ent-container">
          <div className="ent-section-intro">
            <span className="ent-label">El Desafío</span>
            <h2>Problemas del sistema legacy</h2>
          </div>

          <div className="ent-challenge-grid">
            <div className="ent-challenge-card">
              <span className="ent-cc-num">01</span>
              <h3>Infraestructura obsoleta</h3>
              <p>Sistema on-premise con más de 10 años de antigüedad, difícil de escalar y mantener.</p>
            </div>
            <div className="ent-challenge-card">
              <span className="ent-cc-num">02</span>
              <h3>Costos elevados</h3>
              <p>Altos gastos en licencias, hardware y personal técnico especializado.</p>
            </div>
            <div className="ent-challenge-card">
              <span className="ent-cc-num">03</span>
              <h3>Falta de visibilidad</h3>
              <p>Sin métricas en tiempo real ni capacidad de análisis predictivo.</p>
            </div>
            <div className="ent-challenge-card">
              <span className="ent-cc-num">04</span>
              <h3>Canales limitados</h3>
              <p>Solo voz tradicional, sin integración digital ni autoservicio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* === SOLUTION: Tabs + Content === */}
      <section className="ent-solution">
        <div className="ent-container">
          <div className="ent-solution-header">
            <div className="ent-solution-intro">
              <span className="ent-label">La Solución</span>
              <h2>Arquitectura Cloud-Native con AWS</h2>
              <p>Implementamos una suite completa de servicios AWS para crear un contact center moderno y escalable.</p>
            </div>
            
            <div className="ent-solution-tabs">
              {solutions.map((sol, idx) => (
                <button
                  key={sol.id}
                  className={`ent-tab ${activeTab === idx ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  {sol.title}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="ent-solution-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="ent-sol-left">
                <span className="ent-sol-subtitle">{solutions[activeTab].subtitle}</span>
                <h3>{solutions[activeTab].title}</h3>
                <p>{solutions[activeTab].description}</p>
                
                <div className="ent-sol-features">
                  {solutions[activeTab].features.map((f) => (
                    <span key={f} className="ent-feature-tag">{f}</span>
                  ))}
                </div>
              </div>

              <div className="ent-sol-right">
                <div className="ent-sol-metric">
                  <span className="ent-sol-metric-value">{solutions[activeTab].metric.value}</span>
                  <span className="ent-sol-metric-label">{solutions[activeTab].metric.label}</span>
                </div>
                <img src={imgDashboard} alt="Dashboard" className="ent-sol-image" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* === TIMELINE: Horizontal Steps === */}
      <section className="ent-timeline">
        <div className="ent-container">
          <div className="ent-section-intro">
            <span className="ent-label">Metodología</span>
            <h2>Proceso de Implementación</h2>
          </div>

          <div className="ent-timeline-grid">
            {timeline.map((item, idx) => (
              <motion.div
                key={item.phase}
                className="ent-timeline-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="ent-tc-header">
                  <span className="ent-tc-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="ent-tc-weeks">{item.weeks}</span>
                </div>
                <h4>{item.phase}</h4>
                <ul>
                  {item.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === RESULTS: KPI Dashboard === */}
      <section id="resultados" className="ent-results">
        <div className="ent-container">
          <div className="ent-results-layout">
            <div className="ent-results-left">
              <span className="ent-label ent-label-light">Resultados</span>
              <h2>Impacto en el Negocio</h2>
              <p>
                La migración a Amazon Connect generó mejoras significativas 
                en todas las métricas clave del contact center.
              </p>
              
              <div className="ent-results-image">
                <img src={imgData} alt="Analytics" />
              </div>
            </div>

            <div className="ent-results-right">
              <div className="ent-kpi-grid">
                {kpis.map((kpi, idx) => (
                  <motion.div
                    key={kpi.label}
                    className="ent-kpi-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="ent-kpi-icon">{kpi.icon}</span>
                    <span className="ent-kpi-value">{kpi.value}</span>
                    <strong>{kpi.label}</strong>
                    <span className="ent-kpi-desc">{kpi.desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === TECH: Grid Layout === */}
      <section className="ent-tech">
        <div className="ent-container">
          <div className="ent-tech-layout">
            <div className="ent-tech-info">
              <span className="ent-label">Stack Tecnológico</span>
              <h2>Powered by AWS</h2>
              <p>
                Utilizamos los servicios más avanzados de Amazon Web Services 
                para construir una solución enterprise-grade.
              </p>
              
              <img src={imgTeam} alt="Team" className="ent-tech-image" />
            </div>

            <div className="ent-tech-grid">
              {techStack.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  className="ent-tech-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="ent-tech-category">{tech.category}</span>
                  <strong>{tech.name}</strong>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === TESTIMONIAL === */}
      <section className="ent-testimonial">
        <div className="ent-container">
          <div className="ent-testimonial-box">
            <div className="ent-testimonial-content">
              <span className="ent-quote-icon">"</span>
              <blockquote>
                La migración a Amazon Connect transformó nuestra operación. 
                Ahora tenemos visibilidad total, costos predecibles y la 
                flexibilidad para escalar según demanda.
              </blockquote>
              <div className="ent-testimonial-author">
                <div className="ent-author-avatar">GE</div>
                <div>
                  <strong>Gerencia de Experiencia</strong>
                  <span>Entel Perú</span>
                </div>
              </div>
            </div>
            <div className="ent-testimonial-stats">
              <div className="ent-ts-item">
                <span className="ent-ts-value">15</span>
                <span className="ent-ts-label">Semanas de implementación</span>
              </div>
              <div className="ent-ts-item">
                <span className="ent-ts-value">0</span>
                <span className="ent-ts-label">Downtime en migración</span>
              </div>
              <div className="ent-ts-item">
                <span className="ent-ts-value">99.9%</span>
                <span className="ent-ts-label">Uptime garantizado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="ent-cta">
        <div className="ent-container">
          <div className="ent-cta-box">
            <div className="ent-cta-content">
              <h2>¿Listo para transformar tu Contact Center?</h2>
              <p>Agenda una sesión con nuestros expertos en Amazon Connect.</p>
            </div>
            <div className="ent-cta-actions">
              <Link to="/contacto" className="ent-btn-primary ent-btn-lg">
                Solicitar Demo
              </Link>
              <Link to="/soluciones-amazon" className="ent-btn-outline">
                Ver Soluciones AWS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
