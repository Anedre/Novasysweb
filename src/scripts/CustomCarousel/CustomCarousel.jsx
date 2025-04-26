import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './CustomCarousel.css';
import entel from '../../img/elo.png';
import pacifico from '../../img/Bluekai_logo_color.png';
import renzocosta from '../../img/Ocloud.png';
import americatel from '../../img/Amazon_Connect_logo.png';

const images = [entel, pacifico, renzocosta, americatel];

const CustomCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;
  const navigate = useNavigate();

  // Calcula las 3 imágenes visibles: anterior, actual y siguiente.
  const getVisibleSlides = () => {
    const prev = images[(activeIndex - 1 + total) % total];
    const current = images[activeIndex];
    const next = images[(activeIndex + 1) % total];
    return [prev, current, next];
  };

  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());
  useEffect(() => {
    setVisibleSlides(getVisibleSlides());
  }, [activeIndex, total]);

  // Auto-avanza el carousel cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [total]);

  // Cambia el slide mediante los dots
  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  // Maneja el click en cada slide
  const handleSlideClick = (position, img) => {
    if (position === 'center') {
      if (typeof img === 'string') {
        if (img.includes('elo')) {
          navigate('/Elo');
        } else if (img.includes('Bluekai_logo_color')) {
          navigate('/Soluciones_Novasys/oracle-bluekai');
        } else if (img.includes('Ocloud')) {
          navigate('/Soluciones_Novasys/oracle-paas');
        } else if (img.includes('Amazon_Connect')) {
          navigate('/Soluciones_AmazonConnect');
        }
      }
    } else if (position === 'left') {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    } else if (position === 'right') {
      setActiveIndex((prev) => (prev + 1) % total);
    }
  };
  

  // Variantes para animar cada posición del slide
  const slideVariants = {
    left: {
      x: -260,
      rotateY: 20,
      scale: 0.8,
      opacity: 0.5,
      zIndex: 1,
    },
    center: {
      x: 0,
      rotateY: 0,
      scale: 1.2,
      opacity: 1,
      zIndex: 2,
    },
    right: {
      x: 250,
      rotateY: -20,
      scale: 0.8,
      opacity: 0.5,
      zIndex: 1,
    },
  };

  // Variantes para animar el overlay con framer-motion
  const overlayVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    hover: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
  };

  // Función para devolver un degradado según la imagen
  const getOverlayGradient = (img) => {
    if (typeof img === 'string') {
      if (img.includes('elo')) {
        // Entel
        return 'linear-gradient(180deg, rgba(255,184,108,0.2) 30%, rgba(0,123,255,0.6) 100%)';
      } else if (img.includes('Bluekai_logo_color')) {
        // Pacifico
        return 'linear-gradient(180deg, rgba(0,123,255,0.2) 30%, rgba(0,0,255,0.6) 100%)';
      } else if (img.includes('Ocloud')) {
        // Ocloud
        return 'linear-gradient(180deg, rgba(76,175,80,0.2) 30%, rgba(27,94,32,0.7) 100%)';
      } else if (img.includes('Amazon_Connect')) {
        // Amazon
        return 'linear-gradient(180deg, rgba(255,204,0,0.2) 30%, rgba(255,152,0,0.7) 100%)';
      }
    }
    // Default fallback
    return 'linear-gradient(180deg, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.7) 100%)';
  };
  

  return (
    <div className="carouselS">
      {visibleSlides.map((img, index) => {
        const position = index === 0 ? 'left' : index === 1 ? 'center' : 'right';
        return (
          <motion.div
            key={`${img}-${index}`}
            className="slide"
            onClick={() => handleSlideClick(position, img)}
            variants={slideVariants}
            animate={position}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className="slide-content">
              <img src={img} alt={`Slide ${index}`} draggable="false" />
              <motion.div
                className="slide-overlay"
                variants={overlayVariants}
                initial="initial"
                whileHover="hover"
                style={{ background: getOverlayGradient(img) }}
              >
                <p>Saber más</p>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
      {/* Dots de navegación */}
      <div className="carousel-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${activeIndex === idx ? 'active' : ''}`}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
