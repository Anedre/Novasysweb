import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar } from "react-icons/fi";

// Data
import { eventosData, getEventosProximos } from "./data/eventosData";

// Sections
import HeroEventos from "./sections/HeroEventos";
import EventoCard from "./sections/EventoCard";
import EventosFilters from "./sections/EventosFilters";
import EventoModal from "./sections/EventoModal";

// UI Components
import Button from "../ui/Button/Button";
import Badge from "../ui/Badge/Badge";

// Styles
import "./Eventos.css";

function Eventos() {
  // Estados
  const [filtros, setFiltros] = useState({
    search: "",
    estado: "todos",
    categoria: "todas",
    tipo: "todos",
    partner: "todos",
  });
  const [vistaActual, setVistaActual] = useState("grid"); // grid | list | calendar
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Evento destacado (primer evento próximo)
  const eventoDestacado = useMemo(() => {
    const proximos = getEventosProximos();
    return proximos.length > 0 ? proximos[0] : null;
  }, []);

  // Filtrar eventos
  const eventosFiltrados = useMemo(() => {
    return eventosData.filter((evento) => {
      // Búsqueda por texto
      if (filtros.search) {
        const searchLower = filtros.search.toLowerCase();
        const matchSearch =
          evento.titulo.toLowerCase().includes(searchLower) ||
          evento.descripcion.toLowerCase().includes(searchLower) ||
          evento.tags.some((tag) => tag.toLowerCase().includes(searchLower));
        if (!matchSearch) return false;
      }

      // Filtro por estado
      if (filtros.estado !== "todos" && evento.estado !== filtros.estado) {
        return false;
      }

      // Filtro por categoría
      if (filtros.categoria !== "todas" && evento.categoria !== filtros.categoria) {
        return false;
      }

      // Filtro por tipo
      if (filtros.tipo !== "todos" && evento.tipo !== filtros.tipo) {
        return false;
      }

      // Filtro por partner
      if (filtros.partner !== "todos" && evento.partner !== filtros.partner) {
        return false;
      }

      return true;
    });
  }, [filtros]);

  // Agrupar por estado para la vista
  const eventosAgrupados = useMemo(() => {
    const proximos = eventosFiltrados.filter((e) => e.estado === "proximo");
    const pasados = eventosFiltrados.filter((e) => e.estado === "pasado");
    return { proximos, pasados };
  }, [eventosFiltrados]);

  // Handlers
  const handleFiltroChange = (key, value) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFiltros({
      search: "",
      estado: "todos",
      categoria: "todas",
      tipo: "todos",
      partner: "todos",
    });
  };

  const handleEventoClick = (evento) => {
    setEventoSeleccionado(evento);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEventoSeleccionado(null), 300);
  };

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <Helmet>
        <title>Eventos | Novasys - Webinars, Conferencias y Capacitaciones</title>
        <meta
          name="description"
          content="Descubre nuestros próximos eventos, webinars y conferencias sobre tecnología, AWS, Oracle, HP y más. Capacítate con expertos de la industria."
        />
        <meta
          name="keywords"
          content="eventos tecnología, webinars AWS, conferencias Oracle, capacitaciones HP, eventos IT Perú"
        />
      </Helmet>

      <main className="eventos-page">
        {/* Floating Decorative Elements */}
        <div className="eventos-floating-elements" aria-hidden="true">
          <motion.div 
            className="floating-shape shape-1"
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="floating-shape shape-2"
            animate={{ 
              y: [0, 25, 0],
              x: [0, -15, 0],
              rotate: [0, -15, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="floating-shape shape-3"
            animate={{ 
              y: [0, -20, 0],
              x: [0, 20, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="floating-shape shape-4"
            animate={{ 
              y: [0, 35, 0],
              rotate: [0, 20, 0]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="floating-shape shape-5"
            animate={{ 
              y: [0, -25, 0],
              x: [0, -10, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="eventos-grid-pattern" aria-hidden="true" />

        {/* Hero con evento destacado */}
        {eventoDestacado && (
          <HeroEventos
            evento={eventoDestacado}
            onVerDetalles={() => handleEventoClick(eventoDestacado)}
          />
        )}

        {/* Sección principal de eventos */}
        <section className="eventos-section">
          <div className="eventos-container">
            {/* Header de sección */}
            <motion.div 
              className="eventos-section-header"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="section-title-wrapper">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Badge variant="primary" size="lg">
                    <FiCalendar /> Calendario
                  </Badge>
                </motion.div>
                <motion.h2 
                  className="section-title"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Todos los Eventos
                </motion.h2>
                <motion.p 
                  className="section-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Explora nuestra agenda de eventos, webinars y conferencias con partners tecnológicos líderes
                </motion.p>
              </div>
            </motion.div>

            {/* Filtros */}
            <EventosFilters
              filtros={filtros}
              onFiltroChange={handleFiltroChange}
              onClearFilters={handleClearFilters}
              vistaActual={vistaActual}
              onVistaChange={setVistaActual}
              totalEventos={eventosFiltrados.length}
            />

            {/* Contenido de eventos */}
            <div className="eventos-content">
              {/* Sin resultados */}
              {eventosFiltrados.length === 0 && (
                <motion.div
                  className="eventos-empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="empty-icon">📅</div>
                  <h3>No se encontraron eventos</h3>
                  <p>Prueba ajustando los filtros de búsqueda</p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Limpiar filtros
                  </Button>
                </motion.div>
              )}

              {/* Próximos eventos */}
              {eventosAgrupados.proximos.length > 0 && (
                <motion.div 
                  className="eventos-group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="eventos-group-header"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="eventos-group-title">
                      <motion.span 
                        className="status-dot proximo"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      />
                      Próximos Eventos
                    </h3>
                    <motion.span 
                      className="eventos-count"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      {eventosAgrupados.proximos.length}
                    </motion.span>
                  </motion.div>

                  <motion.div
                    className={`eventos-grid ${vistaActual}`}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <AnimatePresence mode="popLayout">
                      {eventosAgrupados.proximos.map((evento, idx) => (
                        <motion.div
                          key={evento.id}
                          variants={itemVariants}
                          layout
                          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <EventoCard
                            evento={evento}
                            index={idx}
                            onClick={() => handleEventoClick(evento)}
                            vista={vistaActual}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}

              {/* Eventos pasados */}
              {eventosAgrupados.pasados.length > 0 && (
                <motion.div 
                  className="eventos-group"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="eventos-group-header"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="eventos-group-title">
                      <motion.span 
                        className="status-dot pasado"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      />
                      Eventos Anteriores
                    </h3>
                    <motion.span 
                      className="eventos-count"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      {eventosAgrupados.pasados.length}
                    </motion.span>
                  </motion.div>

                  <motion.div
                    className={`eventos-grid ${vistaActual}`}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <AnimatePresence mode="popLayout">
                      {eventosAgrupados.pasados.map((evento, idx) => (
                        <motion.div
                          key={evento.id}
                          variants={itemVariants}
                          layout
                          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <EventoCard
                            evento={evento}
                            index={idx}
                            onClick={() => handleEventoClick(evento)}
                            vista={vistaActual}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* CTA Section */}
            <motion.div 
              className="eventos-cta"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div 
                className="cta-content"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  ¿Quieres ser el primero en enterarte?
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  Suscríbete a nuestra newsletter y recibe invitaciones exclusivas a nuestros eventos
                </motion.p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="primary" size="lg" href="/contacto">
                  Suscribirme
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Modal de evento */}
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
