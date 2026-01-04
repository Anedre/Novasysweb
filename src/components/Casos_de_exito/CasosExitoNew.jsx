import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiArrowRight, FiTrendingUp, FiAward, FiUsers } from "react-icons/fi";
import "./CasosExitoNew.css";

// Logos
import entel from "../../img/entel.png";
import pacifico from "../../img/pacifico.svg";
import centrum from "../../img/centrum.png";
import americatel from "../../img/americatel.png";
import interbank from "../../img/Interbank_logo.png";
import renzocosta from "../../img/renzocosta.png";

const DATA = [
  {
    id: "entel",
    cliente: "Entel",
    industria: "Telecomunicaciones",
    tag: "Telecom",
    logo: entel,
    resumen: "Implementación de plataforma omnicanal con Oracle Service Cloud y WhatsApp Business. Campañas integradas y soporte 360°.",
    descripcion: "Transformamos la atención al cliente de Entel mediante una solución omnicanal que integra todos los puntos de contacto en una sola plataforma.",
    kpis: [
      { label: "CSAT", value: "+22%", icon: FiAward },
      { label: "TMO", value: "-18%", icon: FiTrendingUp },
      { label: "Resolución", value: "+31%", icon: FiUsers },
    ],
    tags: ["Oracle Service Cloud", "WhatsApp Business", "Omnicanal"],
    link: "/entel",
    color: "#00a0e1",
    featured: true,
  },
  {
    id: "renzocosta",
    cliente: "Renzo Costa",
    industria: "Retail / Moda",
    tag: "Retail",
    logo: renzocosta,
    resumen: "Unificación de eCommerce, Oracle Service Cloud y POS en una plataforma integral para mejorar la experiencia del cliente.",
    descripcion: "Integramos todos los canales de venta y servicio para crear una experiencia de cliente unificada y personalizada.",
    kpis: [
      { label: "Repeat Buyers", value: "+18%", icon: FiUsers },
      { label: "AOV", value: "+21%", icon: FiTrendingUp },
      { label: "Incidentes", value: "-16%", icon: FiAward },
    ],
    tags: ["eCommerce", "Oracle CX", "POS Integration"],
    link: "/renzo",
    color: "#8b4513",
    featured: true,
  },
  {
    id: "pacifico",
    cliente: "Pacífico Seguros",
    industria: "Seguros",
    tag: "Seguros",
    logo: pacifico,
    resumen: "Implementación de Vista 360° del cliente con pólizas integradas y priorización por impacto.",
    descripcion: "Desarrollamos una solución que permite a los agentes ver toda la información del cliente y sus pólizas en tiempo real.",
    kpis: [
      { label: "SLA", value: "-25%", icon: FiTrendingUp },
      { label: "FCR", value: "+17%", icon: FiAward },
      { label: "NPS", value: "+12%", icon: FiUsers },
    ],
    tags: ["Vista 360°", "CRM", "Analytics"],
    link: "/casos/pacifico",
    color: "#1e88e5",
    featured: false,
  },
  {
    id: "centrum",
    cliente: "CENTRUM PUCP",
    industria: "Educación",
    tag: "Educación",
    logo: centrum,
    resumen: "Plataforma de onboarding digital con journeys personalizados por programa académico.",
    descripcion: "Creamos una experiencia de onboarding digital que guía a los nuevos estudiantes a través de todo el proceso de admisión.",
    kpis: [
      { label: "Leads", value: "+15%", icon: FiUsers },
      { label: "Conversión", value: "+9%", icon: FiTrendingUp },
      { label: "Abandono", value: "-20%", icon: FiAward },
    ],
    tags: ["Marketing Automation", "CRM", "Digital Journey"],
    link: "/casos/centrum",
    color: "#6a1b9a",
    featured: false,
  },
  {
    id: "americatel",
    cliente: "Americatel",
    industria: "Telecomunicaciones",
    tag: "Telecom",
    logo: americatel,
    resumen: "Sistema POS conectado con gestión de tickets en tiempo real para mejorar la atención en tiendas.",
    descripcion: "Implementamos un sistema que conecta los puntos de venta con el centro de atención para resolver incidentes en tiempo real.",
    kpis: [
      { label: "Tiempo Espera", value: "-28%", icon: FiTrendingUp },
      { label: "1er Contacto", value: "+14%", icon: FiAward },
      { label: "LTV", value: "+11%", icon: FiUsers },
    ],
    tags: ["POS", "Real-time", "Service Cloud"],
    link: "/casos/americatel",
    color: "#e91e63",
    featured: false,
  },
  {
    id: "interbank",
    cliente: "Interbank",
    industria: "Banca",
    tag: "Finanzas",
    logo: interbank,
    resumen: "Vista 360° del cliente bancario con fidelización personalizada basada en comportamiento.",
    descripcion: "Desarrollamos una solución que permite a los ejecutivos conocer profundamente a cada cliente y ofrecer productos relevantes.",
    kpis: [
      { label: "Conversión", value: "+15%", icon: FiTrendingUp },
      { label: "SLA", value: "-25%", icon: FiAward },
      { label: "LTV", value: "+12%", icon: FiUsers },
    ],
    tags: ["Banca Digital", "CRM", "Personalización"],
    link: "/casos/interbank",
    color: "#00897b",
    featured: false,
  },
];

const industrias = ["Todos", ...new Set(DATA.map((d) => d.tag))];

function CasosExitoNew() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustria, setSelectedIndustria] = useState("Todos");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCasos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return DATA.filter((caso) => {
      const matchIndustria = selectedIndustria === "Todos" || caso.tag === selectedIndustria;
      if (!query) return matchIndustria;
      return (
        matchIndustria &&
        (caso.cliente.toLowerCase().includes(query) ||
          caso.resumen.toLowerCase().includes(query) ||
          caso.tags.some((t) => t.toLowerCase().includes(query)))
      );
    });
  }, [searchQuery, selectedIndustria]);

  const featuredCasos = filteredCasos.filter((c) => c.featured);
  const otherCasos = filteredCasos.filter((c) => !c.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Helmet>
        <title>Casos de Éxito | Novasys - Transformación Digital</title>
        <meta
          name="description"
          content="Conoce cómo hemos ayudado a empresas líderes a transformar su negocio con soluciones tecnológicas innovadoras. Casos reales con resultados medibles."
        />
      </Helmet>

      <main className="casos-page">
        {/* Floating Elements */}
        <div className="casos-floating-elements" aria-hidden="true">
          <motion.div
            className="floating-shape shape-1"
            animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="floating-shape shape-2"
            animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="floating-shape shape-3"
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Grid Pattern */}
        <div className="casos-grid-pattern" aria-hidden="true" />

        {/* Hero Section */}
        <section className="casos-hero">
          <div className="casos-hero-container">
            <motion.div
              className="casos-hero-content"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="casos-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FiAward /> Resultados comprobados
              </motion.span>
              <h1 className="casos-title">Casos de Éxito</h1>
              <p className="casos-subtitle">
                Descubre cómo hemos ayudado a empresas líderes a alcanzar resultados
                extraordinarios con soluciones tecnológicas de vanguardia.
              </p>

              {/* Stats */}
              <motion.div
                className="casos-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="stat-item">
                  <span className="stat-value">500+</span>
                  <span className="stat-label">Proyectos exitosos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">98%</span>
                  <span className="stat-label">Clientes satisfechos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">20+</span>
                  <span className="stat-label">Años de experiencia</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="casos-filters-section">
          <div className="casos-container">
            <motion.div
              className="casos-filters"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Search */}
              <div className="casos-search">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar cliente, solución o industria..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Industry Filters */}
              <div className="casos-industry-filters">
                {industrias.map((ind) => (
                  <motion.button
                    key={ind}
                    className={`industry-chip ${selectedIndustria === ind ? "active" : ""}`}
                    onClick={() => setSelectedIndustria(ind)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {ind}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cases Grid */}
        <section className="casos-grid-section">
          <div className="casos-container">
            {/* Featured Cases */}
            {featuredCasos.length > 0 && (
              <div className="casos-featured">
                <motion.h2
                  className="section-label"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="label-dot featured" />
                  Casos Destacados
                </motion.h2>

                <motion.div
                  className="featured-grid"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {featuredCasos.map((caso) => (
                    <motion.a
                      key={caso.id}
                      href={caso.link}
                      className="caso-card featured"
                      variants={cardVariants}
                      onMouseEnter={() => setHoveredCard(caso.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{ "--caso-color": caso.color }}
                      whileHover={{ y: -8 }}
                    >
                      {/* Glow Effect */}
                      <div className="card-glow" />

                      {/* Header */}
                      <div className="card-header">
                        <img
                          src={caso.logo}
                          alt={`${caso.cliente} logo`}
                          className="card-logo"
                        />
                        <span className="card-industry">{caso.industria}</span>
                      </div>

                      {/* Content */}
                      <div className="card-content">
                        <h3 className="card-title">{caso.cliente}</h3>
                        <p className="card-description">{caso.resumen}</p>

                        {/* Tags */}
                        <div className="card-tags">
                          {caso.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* KPIs */}
                      <div className="card-kpis">
                        {caso.kpis.map((kpi, idx) => (
                          <div key={idx} className="kpi-item">
                            <kpi.icon className="kpi-icon" />
                            <span className="kpi-value">{kpi.value}</span>
                            <span className="kpi-label">{kpi.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="card-cta">
                        <span>Ver caso completo</span>
                        <FiArrowRight />
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Other Cases */}
            {otherCasos.length > 0 && (
              <div className="casos-others">
                <motion.h2
                  className="section-label"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="label-dot" />
                  Más Casos de Éxito
                </motion.h2>

                <motion.div
                  className="others-grid"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {otherCasos.map((caso) => (
                    <motion.a
                      key={caso.id}
                      href={caso.link}
                      className="caso-card"
                      variants={cardVariants}
                      style={{ "--caso-color": caso.color }}
                      whileHover={{ y: -6 }}
                    >
                      {/* Header */}
                      <div className="card-header">
                        <img
                          src={caso.logo}
                          alt={`${caso.cliente} logo`}
                          className="card-logo"
                        />
                        <span className="card-industry">{caso.industria}</span>
                      </div>

                      {/* Content */}
                      <div className="card-content">
                        <h3 className="card-title">{caso.cliente}</h3>
                        <p className="card-description">{caso.resumen}</p>
                      </div>

                      {/* KPIs Mini */}
                      <div className="card-kpis-mini">
                        {caso.kpis.slice(0, 2).map((kpi, idx) => (
                          <span key={idx} className="kpi-mini">
                            {kpi.value} {kpi.label}
                          </span>
                        ))}
                      </div>

                      {/* Arrow */}
                      <div className="card-arrow">
                        <FiArrowRight />
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Empty State */}
            {filteredCasos.length === 0 && (
              <motion.div
                className="casos-empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="empty-icon">🔍</span>
                <h3>No se encontraron casos</h3>
                <p>Intenta con otros términos de búsqueda o filtros</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedIndustria("Todos");
                  }}
                >
                  Limpiar filtros
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="casos-cta-section">
          <motion.div
            className="casos-cta"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>¿Listo para ser nuestro próximo caso de éxito?</h2>
            <p>
              Conversemos sobre cómo podemos ayudarte a alcanzar resultados
              extraordinarios en tu negocio.
            </p>
            <motion.a
              href="/Contacto"
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contáctanos <FiArrowRight />
            </motion.a>
          </motion.div>
        </section>
      </main>
    </>
  );
}

export default CasosExitoNew;
