import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { ARIA_WA_PHONE, loadAriaWa } from '../../lib/aria';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  // Respaldo sin atribución: aria-wa.js reemplaza este href en cuanto ARIA
  // responde con el código de la visita (ver src/lib/aria.js).
  const mensaje = encodeURIComponent("Hola, necesito información.");
  const whatsappUrl = `https://wa.me/${ARIA_WA_PHONE}?text=${mensaje}`;

  // Detectamos si el ancho es menor a 768px
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Script de ARIA: se carga una vez; él mismo detecta los cambios de ruta y de
  // <title> de la SPA y pide un código nuevo por página (ver src/lib/aria.js).
  useEffect(() => { loadAriaWa(); }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
      data-aria-wa=""
      aria-label="Escríbenos por WhatsApp"
    >
      {/* Usamos un tamaño distinto si es móvil */}
      <FaWhatsapp size={isMobile ? 32 : 34} />
    </a>
  );
};

export default WhatsAppWidget;
