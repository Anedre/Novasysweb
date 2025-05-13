// 📍 MapaPresencia.jsx con cambio dinámico de estilo según modo día/noche
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { motion } from "framer-motion";
import "./MapaPresencia.css";
import FlagPE from '../../assets/peru.png';
import FlagCO from '../../assets/colombia.png';
import FlagCA from '../../assets/canada.png';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const paises = [
  { nombre: "Perú", bandera: <img src={FlagPE} alt="Perú" className="bandera-icono" />, coords: [-75.0152, -9.19], detalle: "📍 Sede principal en Lima" },
  { nombre: "Canadá", bandera: <img src={FlagCA} alt="Canadá" className="bandera-icono" />, coords: [-106.3468, 56.1304], detalle: "🧑‍💻 Soporte remoto y expansión" },
  { nombre: "Colombia", bandera: <img src={FlagCO} alt="Colombia" className="bandera-icono" />, coords: [-74.2973, 4.5709], detalle: "🤝 Clientes activos y proyectos" }
];

const MapaPresencia = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const getMapStyle = () =>
      document.body.classList.contains("night")
        ? "mapbox://styles/mapbox/dark-v10"
        : "mapbox://styles/mapbox/light-v10";

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: getMapStyle(),
      center: [-60, 10],
      zoom: 2.2,
    });

    paises.forEach((pais) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div style="font-size: 14px; font-family: 'DM Sans', sans-serif;">
          <strong>${pais.nombre}</strong><br/>
          ${pais.detalle}
        </div>`
      );

      const el = document.createElement("div");
      el.className = "emoji-marker";
      el.textContent = "📌";

      new mapboxgl.Marker(el).setLngLat(pais.coords).setPopup(popup).addTo(mapRef.current);
    });

    const observer = new MutationObserver(() => {
      const newStyle = getMapStyle();
      if (mapRef.current && mapRef.current.getStyle().metadata['mapbox:origin'] !== newStyle) {
        mapRef.current.setStyle(newStyle);
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      mapRef.current.remove();
    };
  }, []);

  return (
    <motion.div
      className="mapbox-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="mapa-titulo">🌍 Nuestra presencia internacional</h2>
      <p className="mapa-descripcion">
        Conoce los países donde <strong>Novasys</strong> desarrolla soluciones tecnológicas con impacto.
      </p>

      <div ref={mapContainer} className="mapbox-frame"></div>

      <div className="mapa-panel-info">
        {paises.map((pais, idx) => (
          <motion.div
            className="mapa-card"
            key={idx}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="mapa-bandera">{pais.bandera}</span>
            <div>
              <strong>{pais.nombre}</strong>
              <p>{pais.detalle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MapaPresencia;
