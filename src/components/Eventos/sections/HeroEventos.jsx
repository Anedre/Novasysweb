import React from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiClock, FiArrowRight, FiUsers } from "react-icons/fi";
import { FaAws } from "react-icons/fa";
import { SiOracle } from "react-icons/si";
import Badge from "../../ui/Badge/Badge";
import Button from "../../ui/Button/Button";
import { formatFecha, getDiasRestantes, getCapacidadPorcentaje } from "../data/eventosData";
import "./HeroEventos.css";

function HeroEventos({ eventoDestacado, onVerDetalle }) {
  if (!eventoDestacado) {
    return (
      <section className="hero-eventos hero-eventos-empty">
        <div className="hero-eventos-container">
          <motion.div
            className="hero-eventos-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Próximos Eventos</h1>
            <p>Mantente al día con las últimas tendencias en tecnología empresarial</p>
          </motion.div>
        </div>
      </section>
    );
  }

  const diasRestantes = getDiasRestantes(eventoDestacado.fecha);
  const capacidadPct = getCapacidadPorcentaje(eventoDestacado.registrados, eventoDestacado.capacidad);

  const getPartnerIcon = (partner) => {
    switch (partner) {
      case "aws": return <FaAws />;
      case "oracle": return <SiOracle />;
      default: return null;
    }
  };

  return (
    <section className="hero-eventos">
      {/* Background Image */}
      <div className="hero-eventos-bg">
        <img src={eventoDestacado.imagen} alt="" aria-hidden="true" />
        <div className="hero-eventos-overlay" />
        <div className="hero-eventos-gradient" />
      </div>

      {/* Animated Geometric Shapes */}
      <div className="hero-eventos-shapes" aria-hidden="true">
        <motion.div 
          className="hero-shape hero-shape-1"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="hero-shape hero-shape-2"
          animate={{ 
            rotate: [360, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="hero-shape hero-shape-3"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating particles */}
      <div className="hero-eventos-particles" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i} 
            className="particle"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              y: [0, -100],
              x: [0, (Math.random() - 0.5) * 50]
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${60 + Math.random() * 40}%`,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="hero-eventos-orbs" aria-hidden="true">
        <motion.div 
          className="hero-orb hero-orb-1"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="hero-orb hero-orb-2"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="hero-eventos-container">
        <div className="hero-eventos-grid">
          {/* Content */}
          <motion.div
            className="hero-eventos-content"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Badges */}
            <div className="hero-eventos-badges">
              <Badge variant={eventoDestacado.tipo} size="md">
                {eventoDestacado.tipo === "presencial" && "🏢 Presencial"}
                {eventoDestacado.tipo === "webinar" && "💻 Webinar"}
                {eventoDestacado.tipo === "hibrido" && "🔗 Híbrido"}
              </Badge>
              <Badge variant={eventoDestacado.partner} size="md">
                {getPartnerIcon(eventoDestacado.partner)}
                <span style={{ marginLeft: 4 }}>{eventoDestacado.partner.toUpperCase()}</span>
              </Badge>
              {diasRestantes <= 7 && diasRestantes > 0 && (
                <Badge variant="warning" size="md" dot pulse>
                  ¡Últimos {diasRestantes} días!
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="hero-eventos-title">
              {eventoDestacado.titulo}
            </h1>
            <p className="hero-eventos-subtitle">
              {eventoDestacado.subtitulo}
            </p>

            {/* Meta info */}
            <div className="hero-eventos-meta">
              <div className="meta-item">
                <FiCalendar className="meta-icon" />
                <span>{formatFecha(eventoDestacado.fecha)}</span>
              </div>
              <div className="meta-item">
                <FiClock className="meta-icon" />
                <span>{eventoDestacado.horaInicio} - {eventoDestacado.horaFin}</span>
              </div>
              <div className="meta-item">
                <FiMapPin className="meta-icon" />
                <span>{eventoDestacado.ubicacion}</span>
              </div>
            </div>

            {/* Capacity bar */}
            <div className="hero-eventos-capacity">
              <div className="capacity-header">
                <span className="capacity-label">
                  <FiUsers /> {eventoDestacado.registrados} / {eventoDestacado.capacidad} registrados
                </span>
                <span className="capacity-pct">{capacidadPct}%</span>
              </div>
              <div className="capacity-bar">
                <motion.div 
                  className="capacity-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${capacidadPct}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              {capacidadPct >= 80 && (
                <p className="capacity-warning">⚡ ¡Cupos limitados! Regístrate ahora</p>
              )}
            </div>

            {/* CTAs */}
            <div className="hero-eventos-actions">
              <Button 
                variant="primary" 
                size="lg"
                rightIcon={<FiArrowRight />}
                externalHref={eventoDestacado.registroUrl}
              >
                Registrarme gratis
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => onVerDetalle && onVerDetalle(eventoDestacado)}
              >
                Ver detalles
              </Button>
            </div>
          </motion.div>

          {/* Countdown Card */}
          <motion.div
            className="hero-eventos-countdown"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="countdown-card">
              <span className="countdown-label">Próximo evento en</span>
              <div className="countdown-number">
                <span className="number">{diasRestantes}</span>
                <span className="unit">días</span>
              </div>
              <div className="countdown-date">
                {formatFecha(eventoDestacado.fecha)}
              </div>

              {/* Speakers preview */}
              {eventoDestacado.speakers && eventoDestacado.speakers.length > 0 && (
                <div className="countdown-speakers">
                  <span className="speakers-label">Speakers</span>
                  <div className="speakers-avatars">
                    {eventoDestacado.speakers.slice(0, 3).map((speaker, i) => (
                      <img 
                        key={i}
                        src={speaker.foto} 
                        alt={speaker.nombre}
                        className="speaker-avatar"
                        style={{ zIndex: 3 - i }}
                      />
                    ))}
                    {eventoDestacado.speakers.length > 3 && (
                      <span className="speakers-more">
                        +{eventoDestacado.speakers.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="countdown-tags">
                {eventoDestacado.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="hero-eventos-scroll"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <span>Explorar eventos</span>
        <div className="scroll-arrow" />
      </motion.div>
    </section>
  );
}

export default HeroEventos;
