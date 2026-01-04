import { useState, useEffect, useRef } from "react";
import CountUp from "../../../scripts/Countup/Countup.jsx";
import "./MetricsSection.css";

const metrics = [
  { value: 12, suffix: "+", label: "Años de", highlight: "experiencia" },
  { value: 36, suffix: "+", label: "Equipo de", highlight: "expertos" },
  { value: 80, suffix: "+", label: "Casos de", highlight: "éxito" },
  { value: 200, suffix: "+", label: "Proyectos", highlight: "entregados" }
];

function MetricsSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      className="home-metrics" 
      ref={sectionRef}
      aria-labelledby="metrics-title"
    >
      <div className="metrics-container">
        {/* Header */}
        <header className="metrics-header">
          <span className="metrics-line" aria-hidden="true"></span>
          <div className="metrics-header-content">
            <h2 id="metrics-title" className="metrics-title">
              Resultados que hablan por sí solos
            </h2>
            <p className="metrics-subtitle">
              Lo validan nuestros clientes, las certificaciones que nos respaldan 
              y los casos de éxito en producción.
            </p>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="metrics-grid" role="list">
          {metrics.map((metric, index) => (
            <article 
              key={index} 
              className="metric-card"
              role="listitem"
            >
              <div className="metric-value">
                <CountUp 
                  to={metric.value} 
                  start={inView} 
                  duration={1200 + (index * 100)} 
                />
                <span className="metric-suffix">{metric.suffix}</span>
              </div>
              <div className="metric-label">
                {metric.label} <strong>{metric.highlight}</strong>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="metrics-newsletter">
          <h3 className="newsletter-title">¡Suscríbete a nuestro boletín!</h3>
          <p className="newsletter-desc">
            Recibe novedades, lanzamientos y aprendizajes de Novasys. Cero spam, solo valor.
          </p>

          <form 
            className="newsletter-form" 
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: Implementar lógica de suscripción
              alert('¡Gracias por suscribirte! Te mantendremos informado.');
            }}
          >
            <label htmlFor="newsletter-email" className="visually-hidden">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Tu correo electrónico"
              aria-describedby="newsletter-hint"
              className="newsletter-input"
            />
            <span id="newsletter-hint" className="visually-hidden">
              Ingresa tu correo electrónico para recibir nuestro boletín
            </span>
            <button type="submit" className="newsletter-btn">
              Suscribirme
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default MetricsSection;
