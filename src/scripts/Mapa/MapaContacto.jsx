import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapaContacto = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const coordsLima = [-77.02637548019109, -12.118034449321014];

  useEffect(() => {
    const getMapStyle = () =>
      document.body.classList.contains("night")
        ? "mapbox://styles/mapbox/dark-v10"
        : "mapbox://styles/mapbox/light-v10";

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: getMapStyle(),
      center: coordsLima,
      zoom: 18,
    });

const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
  <a href="https://www.google.com/maps?q=-12.118034449321014,-77.02637548019109" target="_blank" style="
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
    display: block;
    background-color: #1a1a1a;
    color: #f0f0f0;
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 14px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  ">
    <div style="font-weight: bold; font-size: 15px; margin-bottom: 4px;">📍 Novasys Perú</div>
    <div style="font-size: 13px; color: #ccc;">Calle Narciso de la Colina 421, Miraflores</div>
    <div style="margin-top: 6px; color: #00bfff; font-weight: bold;">→ Ver en Google Maps</div>
  </a>
`);



 const el = document.createElement("div");
el.className = "emoji-marker";
el.textContent = "📍"; // O usa tu propio ícono SVG aquí

new mapboxgl.Marker(el).setLngLat(coordsLima).setPopup(popup).addTo(mapRef.current);


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

  return <div ref={mapContainer} className="map-frame dark-mode" style={{ height: "450px", width: "100%" }} />;
};

export default MapaContacto;
