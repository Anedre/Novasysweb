import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCalendar, FiMapPin, FiClock, FiArrowRight, FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi";
import { FaAws } from "react-icons/fa";
import { SiOracle } from "react-icons/si";

// Data
import { eventosData, getEventosProximos, formatFecha, getDiasRestantes } from "./data/eventosData";

// Sections
import EventoCard from "./sections/EventoCard";
import EventoModal from "./sections/EventoModal";

// Styles
import "./EventosNew.css";

// Partner icons map
const partnerIcons = {
  aws: <FaAws />,
  oracle: <SiOracle />,
};

const partnerColors = {
  aws: "#ff9900",
  oracle: "#c74634",
  hp: "#0096d6",
  microsoft: "#00a4ef",
};

function Eventos() {
  const [filtros, setFiltros] = useState({
    search: "",
    estado: "todos",
    categoria: "todas",
    partner: "todos",
  });
  const [vistaActual, setVistaActual] = useState("grid");
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Eventos próximos para el hero
  const eventosProximos = useMemo(() => getEventosProximos(), []);
  const eventoDestacado = eventosProximos[0] || null;
  const proximosSidebar = eventosProximos.slice(1, 4);

  // Stats
  const stats = useMemo(() => ({
    total: eventosData.length,
    proximos: eventosData.filter(e => e.estado === "proximo").length,
    pasados: eventosData.filter(e => e.estado === "pasado").length,
    partners: [...new Set(eventosData.map(e => e.partner))].length,
  }), []);

  // Filtrar eventos
  const eventosFiltrados = useMemo(() => {
    return eventosData.filter((evento) => {
      if (filtros.search) {
        const searchLower = filtros.search.toLowerCase();
        const matchSearch =
          evento.titulo.toLowerCase().includes(searchLower) ||
          evento.descripcion.toLowerCase().includes(searchLower);
        if (!matchSearch) return false;
      }
      if (filtros.estado !== "todos" && evento.estado !== filtros.estado) return false;
      if (filtros.categoria !== "todas" && evento.categoria !== filtros.categoria) return false;
      if (filtros.partner !== "todos" && evento.partner !== filtros.partner) return false;
      return true;
    });
  }, [filtros]);

  // Agrupar por estado
  const eventosAgrupados = useMemo(() => {
    const proximos = eventosFiltrados.filter(e => e.estado === "proximo");
    const pasados = eventosFiltrados.filter(e => e.estado === "pasado");
    return { proximos, pasados };
  }, [eventosFiltrados]);

  // Handlers
  const handleFiltroChange = (key, value) => {
    setFiltros(prev => ({ ...prev, [key]: value }));
  };

  const handleEventoClick = (evento) => {
    setEventoSeleccionado(evento);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEventoSeleccionado(null), 300);
  };

  return (
    <>
      <Helmet>
        <title>Eventos | Novasys - Webinars, Conferencias y Capacitaciones</title>
        <meta name="description" content="Descubre nuestros próximos eventos, webinars y conferencias sobre tecnología, AWS, Oracle, HP y más." />
      </Helmet>

      <main className="ev-page">
        {/* ===== HERO SPLIT ===== */}
        <section className="ev-hero">
          <div className="ev-hero-layout">
            {/* Featured Event - Left */}
            {eventoDestacado && (
              <motion.div 
                className="ev-featured"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="ev-featured-image">
                  <img src={eventoDestacado.imagen} alt={eventoDestacado.titulo} />
                  <div className="ev-featured-overlay" />
                </div>
                
                <div className="ev-featured-content">
                  <div className="ev-featured-top">
                    <span className="ev-tag ev-tag-live">
                      <span className="ev-pulse" />
                      Próximo Evento
                    </span>
                    <span 
                      className="ev-partner-badge"
                      style={{ background: partnerColors[eventoDestacado.partner] }}
                    >
                      {partnerIcons[eventoDestacado.partner]}
                      {eventoDestacado.partner?.toUpperCase()}
                    </span>
                  </div>

                  <h1>{eventoDestacado.titulo}</h1>
                  <p className="ev-featured-desc">{eventoDestacado.descripcion?.slice(0, 150)}...</p>

                  <div className="ev-featured-meta">
                    <span><FiCalendar /> {formatFecha(eventoDestacado.fecha)}</span>
                    <span><FiClock /> {eventoDestacado.horaInicio}</span>
                    <span><FiMapPin /> {eventoDestacado.tipo}</span>
                  </div>

                  <div className="ev-featured-actions">
                    <button 
                      className="ev-btn-primary"
                      onClick={() => handleEventoClick(eventoDestacado)}
                    >
                      Ver detalles <FiArrowRight />
                    </button>
                    <span className="ev-dias">
                      {getDiasRestantes(eventoDestacado.fecha)} días restantes
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Sidebar - Right */}
            <motion.div 
              className="ev-sidebar"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="ev-sidebar-header">
                <h3>Próximos</h3>
                <Link to="#todos" className="ev-link">Ver todos →</Link>
              </div>

              <div className="ev-sidebar-list">
                {proximosSidebar.map((evento, i) => (
                  <motion.div
                    key={evento.id}
                    className="ev-sidebar-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    onClick={() => handleEventoClick(evento)}
                  >
                    <div 
                      className="ev-sidebar-accent"
                      style={{ background: partnerColors[evento.partner] }}
                    />
                    <div className="ev-sidebar-info">
                      <span className="ev-sidebar-date">
                        {formatFecha(evento.fecha)}
                      </span>
                      <h4>{evento.titulo}</h4>
                      <span className="ev-sidebar-partner">
                        {partnerIcons[evento.partner]} {evento.partner?.toUpperCase()}
                      </span>
                    </div>
                    <FiArrowRight className="ev-sidebar-arrow" />
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="ev-sidebar-stats">
                <div className="ev-stat-item">
                  <span className="ev-stat-num">{stats.proximos}</span>
                  <span className="ev-stat-label">Próximos</span>
                </div>
                <div className="ev-stat-item">
                  <span className="ev-stat-num">{stats.pasados}</span>
                  <span className="ev-stat-label">Realizados</span>
                </div>
                <div className="ev-stat-item">
                  <span className="ev-stat-num">{stats.partners}</span>
                  <span className="ev-stat-label">Partners</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== MAIN CONTENT WITH SIDEBAR FILTERS ===== */}
        <section className="ev-main" id="todos">
          <div className="ev-main-layout">
            {/* Filters Sidebar */}
            <aside className="ev-filters">
              <div className="ev-filters-header">
                <FiFilter />
                <span>Filtros</span>
              </div>

              {/* Search */}
              <div className="ev-filter-group">
                <label>Buscar</label>
                <div className="ev-search-input">
                  <FiSearch />
                  <input
                    type="text"
                    placeholder="Buscar eventos..."
                    value={filtros.search}
                    onChange={(e) => handleFiltroChange("search", e.target.value)}
                  />
                </div>
              </div>

              {/* Estado */}
              <div className="ev-filter-group">
                <label>Estado</label>
                <div className="ev-filter-options">
                  {["todos", "proximo", "pasado"].map(opt => (
                    <button
                      key={opt}
                      className={`ev-filter-btn ${filtros.estado === opt ? 'active' : ''}`}
                      onClick={() => handleFiltroChange("estado", opt)}
                    >
                      {opt === "todos" ? "Todos" : opt === "proximo" ? "Próximos" : "Pasados"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Partner */}
              <div className="ev-filter-group">
                <label>Partner</label>
                <div className="ev-filter-options">
                  {["todos", "aws", "oracle", "hp"].map(opt => (
                    <button
                      key={opt}
                      className={`ev-filter-btn ${filtros.partner === opt ? 'active' : ''}`}
                      onClick={() => handleFiltroChange("partner", opt)}
                      style={opt !== "todos" && filtros.partner === opt ? { borderColor: partnerColors[opt], color: partnerColors[opt] } : {}}
                    >
                      {opt === "todos" ? "Todos" : opt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vista toggle */}
              <div className="ev-filter-group">
                <label>Vista</label>
                <div className="ev-view-toggle">
                  <button
                    className={vistaActual === "grid" ? "active" : ""}
                    onClick={() => setVistaActual("grid")}
                  >
                    <FiGrid />
                  </button>
                  <button
                    className={vistaActual === "list" ? "active" : ""}
                    onClick={() => setVistaActual("list")}
                  >
                    <FiList />
                  </button>
                </div>
              </div>

              {/* Results count */}
              <div className="ev-filter-count">
                <span>{eventosFiltrados.length}</span> eventos encontrados
              </div>
            </aside>

            {/* Events Content */}
            <div className="ev-content">
              {/* Próximos */}
              {eventosAgrupados.proximos.length > 0 && (
                <div className="ev-section">
                  <div className="ev-section-header">
                    <h2>
                      <span className="ev-dot ev-dot-live" />
                      Próximos Eventos
                    </h2>
                    <span className="ev-count">{eventosAgrupados.proximos.length}</span>
                  </div>

                  <div className={`ev-grid ${vistaActual === "list" ? "ev-list" : ""}`}>
                    {eventosAgrupados.proximos.map((evento, idx) => (
                      <motion.div
                        key={evento.id}
                        className={`ev-card-wrapper ${idx === 0 ? "ev-card-large" : ""}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div 
                          className="ev-card"
                          onClick={() => handleEventoClick(evento)}
                        >
                          <div className="ev-card-image">
                            <img src={evento.imagen} alt={evento.titulo} />
                            <span 
                              className="ev-card-partner"
                              style={{ background: partnerColors[evento.partner] }}
                            >
                              {evento.partner?.toUpperCase()}
                            </span>
                          </div>
                          <div className="ev-card-body">
                            <div className="ev-card-date">
                              <FiCalendar /> {formatFecha(evento.fecha)}
                            </div>
                            <h3>{evento.titulo}</h3>
                            <p>{evento.descripcion?.slice(0, 80)}...</p>
                            <div className="ev-card-footer">
                              <span className="ev-card-type">{evento.tipo}</span>
                              <span className="ev-card-arrow">→</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pasados */}
              {eventosAgrupados.pasados.length > 0 && (
                <div className="ev-section">
                  <div className="ev-section-header">
                    <h2>
                      <span className="ev-dot ev-dot-past" />
                      Eventos Anteriores
                    </h2>
                    <span className="ev-count">{eventosAgrupados.pasados.length}</span>
                  </div>

                  <div className={`ev-grid ev-grid-past ${vistaActual === "list" ? "ev-list" : ""}`}>
                    {eventosAgrupados.pasados.map((evento, idx) => (
                      <motion.div
                        key={evento.id}
                        className="ev-card-wrapper"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div 
                          className="ev-card ev-card-past"
                          onClick={() => handleEventoClick(evento)}
                        >
                          <div className="ev-card-image">
                            <img src={evento.imagen} alt={evento.titulo} />
                            <span 
                              className="ev-card-partner"
                              style={{ background: partnerColors[evento.partner] }}
                            >
                              {evento.partner?.toUpperCase()}
                            </span>
                          </div>
                          <div className="ev-card-body">
                            <div className="ev-card-date">
                              <FiCalendar /> {formatFecha(evento.fecha)}
                            </div>
                            <h3>{evento.titulo}</h3>
                            <div className="ev-card-footer">
                              <span className="ev-card-type">{evento.tipo}</span>
                              <span className="ev-card-arrow">→</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {eventosFiltrados.length === 0 && (
                <div className="ev-empty">
                  <span className="ev-empty-icon">📅</span>
                  <h3>No se encontraron eventos</h3>
                  <p>Prueba ajustando los filtros</p>
                  <button 
                    className="ev-btn-outline"
                    onClick={() => setFiltros({ search: "", estado: "todos", categoria: "todas", partner: "todos" })}
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ===== CTA ASIMÉTRICO ===== */}
        <section className="ev-cta">
          <div className="ev-cta-layout">
            <div className="ev-cta-content">
              <span className="ev-cta-tag">Newsletter</span>
              <h2>¿Quieres ser el primero en enterarte?</h2>
              <p>Suscríbete y recibe invitaciones exclusivas a nuestros eventos con partners tecnológicos líderes.</p>
              <div className="ev-cta-form">
                <input type="email" placeholder="tu@email.com" />
                <button className="ev-btn-primary">Suscribirme</button>
              </div>
              <span className="ev-cta-note">Prometemos no enviarte spam 🙂</span>
            </div>
            <div className="ev-cta-visual">
              <div className="ev-cta-cards">
                <div className="ev-cta-card ev-cta-card-1">
                  <FaAws />
                  <span>AWS Events</span>
                </div>
                <div className="ev-cta-card ev-cta-card-2">
                  <SiOracle />
                  <span>Oracle Days</span>
                </div>
                <div className="ev-cta-card ev-cta-card-3">
                  <FiCalendar />
                  <span>Tech Talks</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        <EventoModal
          evento={eventoSeleccionado}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </main>
    </>
  );
}

export default Eventos;
