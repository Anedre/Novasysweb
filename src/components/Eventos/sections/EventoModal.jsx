import React from "react";
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiExternalLink, FiShare2, FiCheck } from "react-icons/fi";
import { FaAws, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { SiOracle } from "react-icons/si";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button/Button";
import Badge from "../../ui/Badge/Badge";
import { formatFecha, getDiasRestantes, getCapacidadPorcentaje } from "../data/eventosData";
import "./EventoModal.css";

function EventoModal({ evento, isOpen, onClose }) {
  if (!evento) return null;

  const diasRestantes = evento.estado === "proximo" ? getDiasRestantes(evento.fecha) : null;
  const capacidadPct = getCapacidadPorcentaje(evento.registrados, evento.capacidad);
  const isPasado = evento.estado === "pasado";

  const getPartnerInfo = (partner) => {
    const info = {
      aws: { icon: <FaAws />, name: "Amazon Web Services", color: "var(--aws-orange)" },
      oracle: { icon: <SiOracle />, name: "Oracle", color: "var(--oracle-red)" },
      hp: { icon: <HiOutlineDesktopComputer />, name: "HP", color: "var(--hp-blue)" },
      novasys: { icon: null, name: "Novasys", color: "var(--primary-600)" },
    };
    return info[partner] || info.novasys;
  };

  const partnerInfo = getPartnerInfo(evento.partner);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(evento.registroUrl || window.location.href)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(evento.titulo)}&url=${encodeURIComponent(evento.registroUrl || window.location.href)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(evento.titulo + ' - ' + (evento.registroUrl || window.location.href))}`,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      {/* Hero Image */}
      <div className="evento-modal-hero">
        <img src={evento.imagen} alt={evento.titulo} />
        <div className="evento-modal-hero-overlay" />
        
        {/* Partner badge */}
        <div className="evento-modal-partner" style={{ background: partnerInfo.color }}>
          {partnerInfo.icon}
          <span>{partnerInfo.name}</span>
        </div>

        {/* Countdown */}
        {diasRestantes !== null && diasRestantes > 0 && (
          <div className="evento-modal-countdown">
            <span className="countdown-number">{diasRestantes}</span>
            <span className="countdown-text">días restantes</span>
          </div>
        )}

        {isPasado && (
          <div className="evento-modal-pasado">
            <FiCheck /> Evento finalizado
          </div>
        )}
      </div>

      <Modal.Header onClose={onClose}>
        <div className="evento-modal-header-content">
          <div className="evento-modal-badges">
            <Badge variant={evento.tipo} size="md">
              {evento.tipo === "presencial" && "🏢 Presencial"}
              {evento.tipo === "webinar" && "💻 Webinar"}
              {evento.tipo === "hibrido" && "🔗 Híbrido"}
            </Badge>
            <Badge variant="soft-default" size="md">
              {evento.categoria}
            </Badge>
          </div>
          <h2 className="evento-modal-title">{evento.titulo}</h2>
          {evento.subtitulo && (
            <p className="evento-modal-subtitle">{evento.subtitulo}</p>
          )}
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="evento-modal-grid">
          {/* Main content */}
          <div className="evento-modal-main">
            {/* Description */}
            <section className="evento-modal-section">
              <h3>Descripción</h3>
              <p>{evento.descripcion}</p>
            </section>

            {/* Agenda */}
            {evento.agenda && evento.agenda.length > 0 && (
              <section className="evento-modal-section">
                <h3>Agenda</h3>
                <div className="evento-modal-agenda">
                  {evento.agenda.map((item, i) => (
                    <div key={i} className="agenda-item">
                      <span className="agenda-hora">{item.hora}</span>
                      <span className="agenda-actividad">{item.actividad}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Speakers */}
            {evento.speakers && evento.speakers.length > 0 && (
              <section className="evento-modal-section">
                <h3>Speakers</h3>
                <div className="evento-modal-speakers">
                  {evento.speakers.map((speaker, i) => (
                    <div key={i} className="speaker-card">
                      <img 
                        src={speaker.foto} 
                        alt={speaker.nombre} 
                        className="speaker-foto"
                      />
                      <div className="speaker-info">
                        <span className="speaker-nombre">{speaker.nombre}</span>
                        <span className="speaker-cargo">{speaker.cargo}</span>
                        <span className="speaker-empresa">{speaker.empresa}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Requisitos */}
            {evento.requisitos && evento.requisitos.length > 0 && (
              <section className="evento-modal-section">
                <h3>Requisitos</h3>
                <ul className="evento-modal-requisitos">
                  {evento.requisitos.map((req, i) => (
                    <li key={i}>
                      <FiCheck className="check-icon" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tags */}
            <section className="evento-modal-section">
              <h3>Temas</h3>
              <div className="evento-modal-tags">
                {evento.tags.map((tag, i) => (
                  <Badge key={i} variant="soft-default" size="md">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="evento-modal-sidebar">
            {/* Date & Time */}
            <div className="sidebar-card">
              <div className="sidebar-item">
                <FiCalendar className="sidebar-icon" />
                <div>
                  <span className="sidebar-label">Fecha</span>
                  <span className="sidebar-value">{formatFecha(evento.fecha)}</span>
                </div>
              </div>
              
              <div className="sidebar-item">
                <FiClock className="sidebar-icon" />
                <div>
                  <span className="sidebar-label">Horario</span>
                  <span className="sidebar-value">{evento.horaInicio} - {evento.horaFin}</span>
                </div>
              </div>

              <div className="sidebar-item">
                <FiMapPin className="sidebar-icon" />
                <div>
                  <span className="sidebar-label">Ubicación</span>
                  <span className="sidebar-value">{evento.ubicacion}</span>
                </div>
              </div>
            </div>

            {/* Capacity */}
            {!isPasado && (
              <div className="sidebar-card">
                <div className="sidebar-capacity">
                  <div className="capacity-header">
                    <FiUsers className="sidebar-icon" />
                    <span>{evento.registrados} / {evento.capacidad} registrados</span>
                  </div>
                  <div className="capacity-bar">
                    <div 
                      className="capacity-fill" 
                      style={{ width: `${capacidadPct}%` }}
                    />
                  </div>
                  {capacidadPct >= 80 && (
                    <p className="capacity-warning">⚡ ¡Cupos limitados!</p>
                  )}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="sidebar-card sidebar-price">
              <span className="price-label">Inversión</span>
              <span className={`price-value ${evento.precio === "Gratuito" ? 'free' : ''}`}>
                {evento.precio}
              </span>
            </div>

            {/* CTA */}
            {!isPasado && evento.registroUrl && (
              <Button 
                variant="primary" 
                size="lg" 
                fullWidth
                rightIcon={<FiExternalLink />}
                externalHref={evento.registroUrl}
              >
                Registrarme ahora
              </Button>
            )}

            {/* Share */}
            <div className="sidebar-share">
              <span className="share-label">
                <FiShare2 /> Compartir
              </span>
              <div className="share-buttons">
                <a 
                  href={shareLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="share-btn linkedin"
                  aria-label="Compartir en LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a 
                  href={shareLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="share-btn twitter"
                  aria-label="Compartir en Twitter"
                >
                  <FaTwitter />
                </a>
                <a 
                  href={shareLinks.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="share-btn whatsapp"
                  aria-label="Compartir en WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EventoModal;
