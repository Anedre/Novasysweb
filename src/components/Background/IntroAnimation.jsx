import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import LogoSVG from '../../assets/nova.svg';
import './IntroAnimation.css';

const totalDrops = 30; // Número total de gotas (cuadrados)
const raindrops = Array.from({ length: totalDrops }, () => ({
  x: Math.random() * 100,          // Posición horizontal aleatoria
  delay: Math.random() * 3,          // Retardo inicial aleatorio
  duration: 1 + Math.random() * 4    // Duración variable para la caída
}));

const IntroAnimation = () => {
  const handleArrowClick = () => {
    const sections = document.querySelectorAll('.section-scroll');
    if (sections.length > 1) {
      sections[1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="intro-container">
      {/* Gotas de lluvia en forma de cuadrados */}
      {raindrops.map((drop, index) => (
        <motion.div
          key={`drop-${index}`}
          className="square raindrop"
          style={{ left: `${drop.x}%`, zIndex: 0 }}
          initial={{ top: '-10%', opacity: 0 }}
          animate={{ top: '110%', opacity: [0, 1, 0] }}
          transition={{
            delay: drop.delay,
            duration: drop.duration*2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Logo animado con z-index mayor */}
      <motion.div
        className="logo-wrapper"
        style={{ zIndex: 2, position: 'relative' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, rotate: 2, filter: 'drop-shadow(0 0 10px rgba(255,28,34,0.8))' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <img src={LogoSVG} alt="Logo" className="intro-logo logo-line-draw" />
      </motion.div>


      {/* Flecha animada con z-index mayor */}
      <motion.div
        className="intro-arrow"
        style={{ zIndex: 2 }}  // Se elimina position: 'relative'
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 1 },
          y: { delay: 0.5, duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        onClick={handleArrowClick}
      >
        <FiChevronDown size={75} />
      </motion.div>

    </div>
  );
};

export default IntroAnimation;
