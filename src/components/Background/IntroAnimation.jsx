import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import LogoSVG from '../../assets/nova.svg';

import './IntroAnimation.css';

const totalDrops = 75;
const raindrops = Array.from({ length: totalDrops }, () => ({
  x: Math.random() * 100,
  size: Math.random() * 20 + 20, // tamaños variados entre 20px y 40px
  delay: Math.random() * 2,
  duration: 4 + Math.random() * 5 // antes era 2 + Math.random() * 3
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
      {/* Cubitos cayendo con estilo */}
      {raindrops.map((drop, index) => (
        <motion.div
          key={`drop-${index}`}
          className="square raindrop"
          style={{
            left: `${drop.x}%`,
            width: `${drop.size}px`,
            height: `${drop.size}px`,
            zIndex: 1
          }}
          initial={{ top: '-10%', opacity: 0, rotate: 0 }}
          animate={{
            top: '110%',
            opacity: [0, 1, 0],
            rotate: [0, 360],
            x: [0, 5, -5, 0]
          }}
          transition={{
            delay: drop.delay,
            duration: drop.duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Logo animado con glow */}
      <motion.div
        className="logo-wrapper"
        style={{ zIndex: 2, position: 'relative' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <img src={LogoSVG} alt="Logo Novasys" className="intro-logo" />
      </motion.div>

      <motion.div
        className="intro-arrow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={handleArrowClick}
      >
        <motion.div
          className="arrow-reflection-wrapper"
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FiChevronDown className='arrow-icon'/>
      


        </motion.div>
      </motion.div>


    </div>
  );
};

export default IntroAnimation;
