import React from "react";
import { motion } from "framer-motion";

function CTASection() {
  return (
    <section className="cta-premium-section">
      {/* Background con efecto cinematográfico */}
      <div className="cta-bg">
        <div className="cta-bg-gradient" />
        <div className="cta-bg-pattern" />
        <div className="cta-bg-glow cta-bg-glow-left" />
        <div className="cta-bg-glow cta-bg-glow-right" />
        <div className="cta-bg-glow cta-bg-glow-top" />
        <div className="cta-bg-glow cta-bg-glow-bottom-left" />
        <div className="cta-bg-glow cta-bg-glow-bottom-right" />
        
        {/* Partículas flotantes */}
        <div className="cta-particles">
          {[...Array(25)].map((_, i) => (
            <span 
              key={i} 
              className={`cta-particle cta-particle-${i % 4}`}
              style={{
                left: i < 8 ? `${2 + (i * 3)}%` : i > 17 ? `${75 + ((i - 17) * 3)}%` : `${20 + ((i - 8) * 6)}%`,
                top: `${8 + ((i * 13) % 84)}%`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="cta-container-wide">
        {/* Grid principal de 2 columnas */}
        <div className="cta-main-grid">
          {/* Columna izquierda - Contenido textual */}
          <motion.div 
            className="cta-text-column"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.span 
              className="cta-badge"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Comienza tu transformación
            </motion.span>

            <h2 className="cta-title">
              ¿Listo para llevar tu
              <span className="cta-title-highlight"> negocio </span>
              al siguiente nivel?
            </h2>

            <p className="cta-description">
              Únete a más de 500 empresas que ya confían en nosotros. 
              Nuestro equipo está listo para ayudarte a alcanzar tus objetivos.
            </p>

            {/* Feature cards pequeñas */}
            <div className="cta-features-mini">
              <div className="cta-feature-mini">
                <div className="cta-feature-mini-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <span>Implementación rápida</span>
              </div>
              <div className="cta-feature-mini">
                <div className="cta-feature-mini-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <span>Soporte 24/7</span>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha - CTA Card */}
          <motion.div 
            className="cta-action-column"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="cta-action-card">
              <div className="cta-action-header">
                <div className="cta-action-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div className="cta-action-header-text">
                  <span className="cta-action-label">Consulta gratuita</span>
                  <h3 className="cta-action-title">Hablemos de tu proyecto</h3>
                </div>
              </div>

              <div className="cta-action-buttons">
                <motion.a 
                  href="/Contacto" 
                  className="cta-btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Contáctanos Ahora</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.a>
                <motion.a 
                  href="/Soluciones" 
                  className="cta-btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Soluciones
                </motion.a>
              </div>

              <div className="cta-action-divider" />

              {/* Trust indicators */}
              <div className="cta-trust-grid">
                <div className="cta-trust-item">
                  <div className="cta-trust-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <div className="cta-trust-text">
                    <span className="cta-trust-label">Datos seguros</span>
                    <span className="cta-trust-desc">Encriptación SSL</span>
                  </div>
                </div>
                <div className="cta-trust-item">
                  <div className="cta-trust-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="cta-trust-text">
                    <span className="cta-trust-label">98% satisfacción</span>
                    <span className="cta-trust-desc">Clientes felices</span>
                  </div>
                </div>
                <div className="cta-trust-item">
                  <div className="cta-trust-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div className="cta-trust-text">
                    <span className="cta-trust-label">+500 proyectos</span>
                    <span className="cta-trust-desc">Entregados con éxito</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fila inferior - Logos de partners */}
        <motion.div 
          className="cta-bottom-bar"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="cta-bottom-label">Trabajamos con las mejores tecnologías</span>
          <div className="cta-bottom-logos">
            {/* Oracle */}
            <div className="cta-bottom-logo">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path fill="#C74634" d="M16.412 4.412h-8.82a7.588 7.588 0 0 0-.008 15.176h8.828a7.588 7.588 0 0 0 0-15.176zm-.193 12.502H7.786a4.915 4.915 0 0 1 0-9.828h8.433a4.914 4.914 0 1 1 0 9.828z"/>
              </svg>
              <span>Oracle</span>
            </div>
            {/* AWS */}
            <div className="cta-bottom-logo">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path fill="#FF9900" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.296.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296z"/>
              </svg>
              <span>AWS</span>
            </div>
            {/* Microsoft */}
            <div className="cta-bottom-logo">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="#F25022" d="M1 1h10v10H1z"/>
                <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                <path fill="#FFB900" d="M13 13h10v10H13z"/>
              </svg>
              <span>Microsoft</span>
            </div>
            {/* Google */}
            <div className="cta-bottom-logo">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </div>
            {/* HP */}
            <div className="cta-bottom-logo">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path fill="#0096D6" d="M9.722 2L4 22h3.892l1.22-4.578h4.175L9.94 22h3.986L20 2zm-.403 11.906l1.986-7.283 1.903 7.283z"/>
              </svg>
              <span>HP</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
