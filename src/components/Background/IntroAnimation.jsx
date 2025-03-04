import React, { useEffect, useRef } from 'react';
import './IntroAnimation.css';
import logo from '../../img/Logo_Mejores_Blanco.png';
import { gsap } from 'gsap';


const IntroAnimation = () => {
    const layer1 = useRef(null);
    const layer2 = useRef(null);
    const layer3 = useRef(null);
  
    useEffect(() => {
      // Función para generar valores aleatorios dentro de un rango
      const randomValue = (min, max) => Math.random() * (max - min) + min;
  
      // Crea una animación en bucle que actualice propiedades aleatorias
      const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
  
      // Para la capa 1
      glitchTimeline.to(layer1.current, {
        duration: 0.1,
        clipPath: `inset(${randomValue(5, 25)}% 0 ${randomValue(50, 80)}% 0)`,
        x: randomValue(-10, 10),
        y: randomValue(-10, 10),
        ease: "power2.inOut"
      }).to(layer1.current, {
        duration: 0.1,
        clipPath: `inset(0% 0 0% 0)`,
        x: 0,
        y: 0,
        ease: "power2.inOut"
      });
  
      // Para la capa 2
      glitchTimeline.to(layer2.current, {
        duration: 0.08,
        clipPath: `inset(${randomValue(10, 30)}% 0 ${randomValue(40, 70)}% 0)`,
        x: randomValue(-8, 8),
        y: randomValue(-8, 8),
        ease: "power2.inOut"
      }).to(layer2.current, {
        duration: 0.08,
        clipPath: `inset(0% 0 0% 0)`,
        x: 0,
        y: 0,
        ease: "power2.inOut"
      });
  
      // Para la capa 3
      glitchTimeline.to(layer3.current, {
        duration: 0.12,
        clipPath: `inset(${randomValue(8, 20)}% 0 ${randomValue(30, 60)}% 0)`,
        x: randomValue(-12, 12),
        y: randomValue(-12, 12),
        ease: "power2.inOut"
      }).to(layer3.current, {
        duration: 0.12,
        clipPath: `inset(0% 0 0% 0)`,
        x: 0,
        y: 0,
        ease: "power2.inOut"
      });
  
    }, []);
  
    return (
      <div className="glitch-container">
        <img src={logo} alt="Logo" className="glitch-logo main" />
        <img src={logo} alt="Logo" className="glitch-logo layer layer1" ref={layer1} />
        <img src={logo} alt="Logo" className="glitch-logo layer layer2" ref={layer2} />
        <img src={logo} alt="Logo" className="glitch-logo layer layer3" ref={layer3} />
      </div>
    );
};

export default IntroAnimation;
