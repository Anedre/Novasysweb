import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaCommentDots } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';
import './ContactFloatingMenu.css';

const ContactFloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amazonReady, setAmazonReady] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.amazonLaunchCallback && typeof window.amazonLaunchCallback === 'function') {
        setAmazonReady(true);
      }
    };
    window.addEventListener("amazonLaunchReady", handler);
    handler(); // llama una vez por si ya estaba disponible
    return () => window.removeEventListener("amazonLaunchReady", handler);
  }, []);

  const handleAmazonClick = () => {
    const widgetBtn = document.getElementById('launch-widget-btn');
    if (widgetBtn) {
      widgetBtn.click();
      setIsOpen(false);
    }
  };

  const handleWhatsAppClick = () => {
    setIsOpen(false);
  };

  return (
    <div id="mobile-contact-widget" className={`contact-menu-container ${isOpen ? 'open' : ''}`}>
      <div className="contact-options">
        <button
          className="contact-btn amazon"
          onClick={handleAmazonClick}
          disabled={!amazonReady}
        >
          <FaCommentDots />
        </button>

        <a
          href="https://wa.me/51999999999"
          className="contact-btn whatsapp"
          onClick={handleWhatsAppClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>
      </div>

      <button
        id="main-contact-btn"
        className="contact-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Contacto"
      >
        <MdSupportAgent />
      </button>
    </div>
  );
};

export default ContactFloatingMenu;
