import React from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiClock, FiUsers, FiArrowRight } from "react-icons/fi";
import { FaAws } from "react-icons/fa";
import { SiOracle } from "react-icons/si";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import Badge from "../../ui/Badge/Badge";
import { formatFechaCorta, getDiasRestantes, getCapacidadPorcentaje } from "../data/eventosData";
import "./EventoCard.css";

function EventoCard({ evento, index = 0, onClick }) {
  const diasRestantes = evento.estado === "proximo" ? getDiasRestantes(evento.fecha) : null;
  const capacidadPct = getCapacidadPorcentaje(evento.registrados, evento.capacidad);
  const isPasado = evento.estado === "pasado";

  const getPartnerIcon = (partner) => {
    switch (partner) {
      case "aws": return <FaAws />;
      case "oracle": return <SiOracle />;
      case "hp": return <HiOutlineDesktopComputer />;
      default: return null;
    }
  };

  const getTipoBadge = () => {
    switch (evento.tipo) {
      case "presencial": return { variant: "presencial", label: "🏢 Presencial" };
      case "webinar": return { variant: "webinar", label: "💻 Webinar" };
      case "hibrido": return { variant: "hibrido", label: "🔗 Híbrido" };
      default: return { variant: "default", label: evento.tipo };
    }
  };

  const tipoInfo = getTipoBadge();

  return (
    <motion.article
      className={`evento-card ${isPasado ? 'evento-card-pasado' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => onClick && onClick(evento)}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${evento.titulo}`}
    >
      {/* Image */}
      <div className="evento-card-image">
        <img src={evento.imagen} alt="" loading="lazy" />
        <div className="evento-card-image-overlay" />
        
        {/* Badges flotantes */}
        <div className="evento-card-badges">
          <Badge variant={tipoInfo.variant} size="sm">
            {tipoInfo.label}
          </Badge>
        </div>

        {/* Partner badge */}
        <div className="evento-card-partner" data-partner={evento.partner}>
          {getPartnerIcon(evento.partner)}
        </div>

        {/* Días restantes (solo próximos) */}
        {diasRestantes !== null && diasRestantes > 0 && diasRestantes <= 14 && (
          <div className="evento-card-countdown">
            <span className="countdown-days">{diasRestantes}</span>
            <span className="countdown-label">días</span>
          </div>
        )}

        {/* Pasado overlay */}
        {isPasado && (
          <div className="evento-card-pasado-overlay">
            <span>Evento finalizado</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="evento-card-content">
        {/* Category tag */}
        <span className="evento-card-category">{evento.categoria}</span>

        {/* Title */}
        <h3 className="evento-card-title">{evento.titulo}</h3>

        {/* Description */}
        <p className="evento-card-description">
          {evento.descripcion.length > 120 
            ? evento.descripcion.slice(0, 120) + '...' 
            : evento.descripcion}
        </p>

        {/* Meta */}
        <div className="evento-card-meta">
          <div className="meta-item">
            <FiCalendar />
            <span>{formatFechaCorta(evento.fecha)}</span>
          </div>
          <div className="meta-item">
            <FiClock />
            <span>{evento.horaInicio}</span>
          </div>
        </div>

        <div className="evento-card-location">
          <FiMapPin />
          <span>{evento.ubicacion.length > 40 
            ? evento.ubicacion.slice(0, 40) + '...' 
            : evento.ubicacion}</span>
        </div>

        {/* Capacity (solo próximos) */}
        {!isPasado && (
          <div className="evento-card-capacity">
            <div className="capacity-info">
              <FiUsers />
              <span>{evento.registrados}/{evento.capacidad}</span>
              <span className="capacity-pct">{capacidadPct}%</span>
            </div>
            <div className="capacity-bar">
              <div 
                className="capacity-fill" 
                style={{ width: `${capacidadPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="evento-card-footer">
          <div className="evento-card-price">
            {evento.precio === "Gratuito" ? (
              <span className="price-free">Gratuito</span>
            ) : (
              <span className="price-paid">{evento.precio}</span>
            )}
          </div>
          <button className="evento-card-cta">
            {isPasado ? "Ver resumen" : "Ver detalles"}
            <FiArrowRight />
          </button>
        </div>

        {/* Tags */}
        <div className="evento-card-tags">
          {evento.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="tag">#{tag}</span>
          ))}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="evento-card-glow" aria-hidden="true" />
    </motion.article>
  );
}

export default EventoCard;
