import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  const whatsappNumber = "1234567890"; // Reemplaza con tu número real
  const mensaje = encodeURIComponent("Hola, necesito información.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensaje}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
    >
      <FaWhatsapp size={34} />
    </a>
  );
};

export default WhatsAppWidget;
