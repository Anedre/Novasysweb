// src/hooks/useScrollEffect.js
import { useState, useEffect } from 'react';

const useScrollEffect = () => {
  const [scrolledSections, setScrolledSections] = useState([]);

  const handleScroll = () => {
    const sections = document.querySelectorAll('.scroll-section');
    const scrolled = [];

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      // Verifica si la sección está completamente visible o casi visible (ajustamos para que se active antes)
      if (rect.top <= window.innerHeight * 0.25) {
        scrolled.push(index + 1); // Añade la sección como visible
      }
    });

    // Siempre activa el título con el primer scroll
    const introSection = document.querySelector('.intro');
    const introRect = introSection.getBoundingClientRect();
    if (introRect.top <= window.innerHeight * 0.25) {
      scrolled.push(0); // Asegura que la introducción desaparezca al hacer scroll
    }

    setScrolledSections(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrolledSections };
};

export default useScrollEffect;
