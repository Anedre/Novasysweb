import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  const whatsappNumber = "+51908825660"; // Tu número
  const mensaje = encodeURIComponent("Hola, necesito información.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensaje}`;

  // Detectamos si el ancho es menor a 768px
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
    >
      {/* Usamos un tamaño distinto si es móvil */}
      <FaWhatsapp size={isMobile ? 32 : 34} />
    </a>
  );
};

export default WhatsAppWidget;
