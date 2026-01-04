import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiGrid, FiList, FiCalendar } from "react-icons/fi";
import { FaAws } from "react-icons/fa";
import { SiOracle } from "react-icons/si";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { categorias, tiposEvento, partners } from "../data/eventosData";
import "./EventosFilters.css";

function EventosFilters({ 
  filtros, 
  setFiltros, 
  vista, 
  setVista,
  totalEventos,
  eventosFiltrados 
}) {
  const handleBusqueda = (e) => {
    setFiltros(prev => ({ ...prev, busqueda: e.target.value }));
  };

  const handleCategoria = (categoria) => {
    setFiltros(prev => ({ ...prev, categoria }));
  };

  const handleTipo = (tipo) => {
    setFiltros(prev => ({ ...prev, tipo }));
  };

  const handlePartner = (partner) => {
    setFiltros(prev => ({ ...prev, partner }));
  };

  const handleEstado = (estado) => {
    setFiltros(prev => ({ ...prev, estado }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      busqueda: "",
      categoria: "todos",
      tipo: "todos",
      partner: "todos",
      estado: "todos"
    });
  };

  const hayFiltrosActivos = 
    filtros.busqueda || 
    filtros.categoria !== "todos" || 
    filtros.tipo !== "todos" || 
    filtros.partner !== "todos" ||
    filtros.estado !== "todos";

  const getPartnerIcon = (id) => {
    switch (id) {
      case "aws": return <FaAws />;
      case "oracle": return <SiOracle />;
      case "hp": return <HiOutlineDesktopComputer />;
      default: return null;
    }
  };

  return (
    <motion.div 
      className="eventos-filters"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search bar */}
      <div className="filters-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Buscar eventos, temas, speakers..."
          value={filtros.busqueda}
          onChange={handleBusqueda}
          className="search-input"
        />
        {filtros.busqueda && (
          <button 
            className="search-clear" 
            onClick={() => setFiltros(prev => ({ ...prev, busqueda: "" }))}
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="filters-row">
        {/* Estado (próximos/pasados) */}
        <div className="filter-group">
          <span className="filter-label">Estado</span>
          <div className="filter-chips">
            {["todos", "proximo", "pasado"].map((estado) => (
              <button
                key={estado}
                className={`filter-chip ${filtros.estado === estado ? 'active' : ''}`}
                onClick={() => handleEstado(estado)}
              >
                {estado === "todos" && "📅 Todos"}
                {estado === "proximo" && "🔜 Próximos"}
                {estado === "pasado" && "✓ Pasados"}
              </button>
            ))}
          </div>
        </div>

        {/* Categorías */}
        <div className="filter-group">
          <span className="filter-label">Categoría</span>
          <div className="filter-chips">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                className={`filter-chip ${filtros.categoria === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoria(cat.id)}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de evento */}
        <div className="filter-group">
          <span className="filter-label">Formato</span>
          <div className="filter-chips">
            {tiposEvento.map((tipo) => (
              <button
                key={tipo.id}
                className={`filter-chip ${filtros.tipo === tipo.id ? 'active' : ''}`}
                onClick={() => handleTipo(tipo.id)}
              >
                {tipo.icon} {tipo.label}
              </button>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="filter-group">
          <span className="filter-label">Partner</span>
          <div className="filter-chips partner-chips">
            {partners.map((partner) => (
              <button
                key={partner.id}
                className={`filter-chip partner-chip ${filtros.partner === partner.id ? 'active' : ''}`}
                onClick={() => handlePartner(partner.id)}
                style={{ 
                  '--partner-color': partner.color 
                }}
              >
                {partner.id !== "todos" && getPartnerIcon(partner.id)}
                <span>{partner.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions row */}
      <div className="filters-actions">
        {/* Results count */}
        <div className="filters-count">
          <span>
            Mostrando <strong>{eventosFiltrados}</strong> de <strong>{totalEventos}</strong> eventos
          </span>
          {hayFiltrosActivos && (
            <button className="clear-filters" onClick={limpiarFiltros}>
              Limpiar filtros
            </button>
          )}
        </div>

        {/* View toggle */}
        <div className="filters-view">
          <button
            className={`view-btn ${vista === 'grid' ? 'active' : ''}`}
            onClick={() => setVista('grid')}
            aria-label="Vista en cuadrícula"
          >
            <FiGrid />
          </button>
          <button
            className={`view-btn ${vista === 'list' ? 'active' : ''}`}
            onClick={() => setVista('list')}
            aria-label="Vista en lista"
          >
            <FiList />
          </button>
          <button
            className={`view-btn ${vista === 'calendar' ? 'active' : ''}`}
            onClick={() => setVista('calendar')}
            aria-label="Vista calendario"
          >
            <FiCalendar />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default EventosFilters;
