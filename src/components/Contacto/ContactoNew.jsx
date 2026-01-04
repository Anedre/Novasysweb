import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheck,
  FiAlertCircle,
  FiMessageSquare,
  FiUser,
  FiBriefcase,
  FiChevronRight,
} from "react-icons/fi";
import { FaWhatsapp, FaAws } from "react-icons/fa";
import { SiOracle } from "react-icons/si";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import MapaContacto from "../../scripts/Mapa/MapaContacto.jsx";
import { useNightMode } from "../../hooks/useNightMode.js";
import "./ContactoNew.css";

// Validaciones
const schema = yup.object().shape({
  nombres: yup
    .string()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Solo letras permitidas")
    .min(2, "Mínimo 2 caracteres")
    .required("Nombres requeridos"),
  apellidos: yup
    .string()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Solo letras permitidas")
    .min(2, "Mínimo 2 caracteres")
    .required("Apellidos requeridos"),
  email: yup.string().email("Email inválido").required("Email requerido"),
  empresa: yup
    .string()
    .notRequired()
    .test("len", "Empresa muy corta", (val) => !val || val.length >= 2),
  telefono: yup
    .string()
    .matches(/^[0-9]{7,15}$/, "Debe tener entre 7 y 15 dígitos")
    .required("Teléfono requerido"),
  linea: yup.string().required("Selecciona una línea"),
  tipoAtencion: yup.string().required("Selecciona el tipo de atención"),
  mensaje: yup.string().min(20, "Mensaje muy corto").required("Mensaje requerido"),
});

const contactInfo = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+51 908 825 660",
    href: "https://wa.me/51908825660",
    color: "#25D366",
  },
  {
    icon: FiPhone,
    label: "Teléfono",
    value: "+51-1-7024006",
    href: "tel:+5117024006",
    color: "var(--primary-500)",
  },
  {
    icon: FiMail,
    label: "Email",
    value: "contacto@novasysperu.com",
    href: "mailto:contacto@novasysperu.com",
    color: "var(--accent-500)",
  },
  {
    icon: FiMapPin,
    label: "Dirección",
    value: "Calle Narciso de la Colina, 421 - Of. 903, Miraflores, Lima",
    href: "https://maps.google.com/?q=Calle+Narciso+de+la+Colina+421+Miraflores+Lima",
    color: "var(--oracle-red)",
  },
];

const horarios = [
  { dia: "Lunes - Viernes", horas: "9:00 AM - 6:00 PM" },
  { dia: "Sábado", horas: "9:00 AM - 1:00 PM" },
  { dia: "Domingo", horas: "Cerrado" },
];

const lineasNegocio = [
  {
    id: "novasys",
    name: "Soluciones Novasys",
    icon: HiOutlineDesktopComputer,
    description: "CRM, BI, Marketing Digital",
    color: "var(--primary-500)",
  },
  {
    id: "hp",
    name: "Productos HP",
    icon: HiOutlineDesktopComputer,
    description: "Hardware empresarial",
    color: "#0096d6",
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    icon: FaAws,
    description: "Cloud & Contact Center",
    color: "#ff9900",
  },
  {
    id: "oracle",
    name: "Oracle Solutions",
    icon: SiOracle,
    description: "Service Cloud, CX",
    color: "#c74634",
  },
];

function ContactoNew() {
  const isNight = useNightMode();
  const [selectedLinea, setSelectedLinea] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://hff9kz1iy6.execute-api.us-east-1.amazonaws.com/dev/items",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        setSelectedLinea(null);
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    }
    setIsSubmitting(false);
  };

  const handleLineaSelect = (lineaId) => {
    setSelectedLinea(lineaId);
    setValue("linea", lineaId);
  };

  return (
    <>
      <Helmet>
        <title>Contacto | Novasys - Consultoría Tecnológica</title>
        <meta
          name="description"
          content="Contáctanos para transformar tu empresa con soluciones tecnológicas innovadoras. Consultoría en CRM, Cloud, BI y más."
        />
      </Helmet>

      <main className="contacto-page">
        {/* Floating Elements */}
        <div className="contacto-floating-elements" aria-hidden="true">
          <motion.div
            className="floating-shape shape-1"
            animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="floating-shape shape-2"
            animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="floating-shape shape-3"
            animate={{ y: [0, -20, 0], scale: [1, 0.9, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Grid Pattern */}
        <div className="contacto-grid-pattern" aria-hidden="true" />

        {/* Hero Section */}
        <section className="contacto-hero">
          <div className="contacto-hero-container">
            <motion.div
              className="contacto-hero-content"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="contacto-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FiMessageSquare /> Estamos aquí para ayudarte
              </motion.span>
              <h1 className="contacto-title">Contáctanos</h1>
              <p className="contacto-subtitle">
                Nos encantaría asesorarte en la optimización tecnológica de tu empresa.
                Cuéntanos tu proyecto y te ayudamos a hacerlo realidad.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="contacto-main">
          <div className="contacto-container">
            <div className="contacto-grid">
              {/* Left Column - Info */}
              <motion.div
                className="contacto-info-column"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Contact Cards */}
                <div className="contacto-info-cards">
                  {contactInfo.map((item, idx) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="contacto-info-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                    >
                      <div
                        className="info-card-icon"
                        style={{ "--icon-color": item.color }}
                      >
                        <item.icon />
                      </div>
                      <div className="info-card-content">
                        <span className="info-card-label">{item.label}</span>
                        <span className="info-card-value">{item.value}</span>
                      </div>
                      <FiChevronRight className="info-card-arrow" />
                    </motion.a>
                  ))}
                </div>

                {/* Horarios */}
                <motion.div
                  className="contacto-horarios"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="horarios-header">
                    <FiClock />
                    <h3>Horario de Atención</h3>
                  </div>
                  <ul className="horarios-list">
                    {horarios.map((h) => (
                      <li key={h.dia}>
                        <span className="horarios-dia">{h.dia}</span>
                        <span className="horarios-horas">{h.horas}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Líneas de Negocio Selection */}
                <motion.div
                  className="contacto-lineas"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <h3>¿Con qué línea deseas contactarnos?</h3>
                  <div className="lineas-grid">
                    {lineasNegocio.map((linea) => (
                      <motion.button
                        key={linea.id}
                        type="button"
                        className={`linea-card ${selectedLinea === linea.id ? "active" : ""}`}
                        onClick={() => handleLineaSelect(linea.id)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ "--linea-color": linea.color }}
                      >
                        <linea.icon className="linea-icon" />
                        <span className="linea-name">{linea.name}</span>
                        <span className="linea-desc">{linea.description}</span>
                        {selectedLinea === linea.id && (
                          <motion.div
                            className="linea-check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <FiCheck />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                  {errors.linea && (
                    <span className="field-error">{errors.linea.message}</span>
                  )}
                </motion.div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                className="contacto-form-column"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="contacto-form-card">
                  <div className="form-card-header">
                    <h2>Envíanos un mensaje</h2>
                    <p>Completa el formulario y te responderemos pronto</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="contacto-form">
                    {/* Nombres y Apellidos */}
                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="nombres">
                          <FiUser /> Nombres
                        </label>
                        <input
                          id="nombres"
                          type="text"
                          placeholder="Tu nombre"
                          className={errors.nombres ? "error" : ""}
                          {...register("nombres")}
                        />
                        {errors.nombres && (
                          <span className="field-error">
                            <FiAlertCircle /> {errors.nombres.message}
                          </span>
                        )}
                      </div>
                      <div className="form-field">
                        <label htmlFor="apellidos">
                          <FiUser /> Apellidos
                        </label>
                        <input
                          id="apellidos"
                          type="text"
                          placeholder="Tu apellido"
                          className={errors.apellidos ? "error" : ""}
                          {...register("apellidos")}
                        />
                        {errors.apellidos && (
                          <span className="field-error">
                            <FiAlertCircle /> {errors.apellidos.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Email y Empresa */}
                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="email">
                          <FiMail /> Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          className={errors.email ? "error" : ""}
                          {...register("email")}
                        />
                        {errors.email && (
                          <span className="field-error">
                            <FiAlertCircle /> {errors.email.message}
                          </span>
                        )}
                      </div>
                      <div className="form-field">
                        <label htmlFor="empresa">
                          <FiBriefcase /> Empresa (opcional)
                        </label>
                        <input
                          id="empresa"
                          type="text"
                          placeholder="Nombre de tu empresa"
                          {...register("empresa")}
                        />
                      </div>
                    </div>

                    {/* Teléfono y Tipo de Atención */}
                    <div className="form-row">
                      <div className="form-field">
                        <label htmlFor="telefono">
                          <FiPhone /> Teléfono
                        </label>
                        <input
                          id="telefono"
                          type="tel"
                          placeholder="999 999 999"
                          className={errors.telefono ? "error" : ""}
                          {...register("telefono")}
                        />
                        {errors.telefono && (
                          <span className="field-error">
                            <FiAlertCircle /> {errors.telefono.message}
                          </span>
                        )}
                      </div>
                      <div className="form-field">
                        <label htmlFor="tipoAtencion">
                          <FiMessageSquare /> Tipo de Atención
                        </label>
                        <select
                          id="tipoAtencion"
                          className={errors.tipoAtencion ? "error" : ""}
                          {...register("tipoAtencion")}
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="consultoria">Consultoría en TI</option>
                          <option value="soporte">Soporte Técnico</option>
                          <option value="compra">Cotización / Compra</option>
                          <option value="otros">Otros</option>
                        </select>
                        {errors.tipoAtencion && (
                          <span className="field-error">
                            <FiAlertCircle /> {errors.tipoAtencion.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hidden linea field */}
                    <input type="hidden" {...register("linea")} />

                    {/* Mensaje */}
                    <div className="form-field full-width">
                      <label htmlFor="mensaje">
                        <FiMessageSquare /> Mensaje
                      </label>
                      <textarea
                        id="mensaje"
                        rows="5"
                        placeholder="Cuéntanos sobre tu proyecto o consulta..."
                        className={errors.mensaje ? "error" : ""}
                        {...register("mensaje")}
                      />
                      {errors.mensaje && (
                        <span className="field-error">
                          <FiAlertCircle /> {errors.mensaje.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="submit-btn"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner" /> Enviando...
                        </>
                      ) : (
                        <>
                          <FiSend /> Enviar Mensaje
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {submitStatus && (
                      <motion.div
                        className={`submit-status ${submitStatus}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        {submitStatus === "success" ? (
                          <>
                            <FiCheck /> ¡Mensaje enviado correctamente! Te
                            contactaremos pronto.
                          </>
                        ) : (
                          <>
                            <FiAlertCircle /> Ocurrió un error. Por favor,
                            intenta nuevamente.
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="contacto-map-section">
          <div className="contacto-container">
            <motion.div
              className="map-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Nuestra Ubicación</h2>
              <p>Visítanos en nuestras oficinas en Miraflores, Lima</p>
            </motion.div>

            <motion.div
              className="map-wrapper"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {isNight === null ? (
                <div className="map-loading">Cargando mapa...</div>
              ) : isNight === true ? (
                <MapaContacto />
              ) : (
                <iframe
                  title="Mapa modo claro"
                  className="map-iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.938363332167!2d-77.03512688465083!3d-12.120058191037103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8ddbd528a73%3A0xa8ea1246c88a7a3f!2sCalle%20Narciso%20de%20la%20Colina%2C%20Miraflores%2C%20Lima!5e0!3m2!1ses-419!2spe!4v1672222222222"
                  width="100%"
                  height="450"
                  allowFullScreen=""
                  loading="lazy"
                />
              )}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="contacto-cta">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>¿Prefieres una llamada directa?</h2>
            <p>
              Nuestro equipo está listo para atenderte y resolver todas tus dudas
            </p>
            <div className="cta-buttons">
              <motion.a
                href="https://wa.me/51908825660"
                className="cta-btn whatsapp"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp /> WhatsApp
              </motion.a>
              <motion.a
                href="tel:+5117024006"
                className="cta-btn phone"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPhone /> Llamar Ahora
              </motion.a>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}

export default ContactoNew;
