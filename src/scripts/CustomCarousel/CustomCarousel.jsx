import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CustomCarousel.css';
import entel from '../../img/elo.png';
import pacifico from '../../img/Bluekai_logo_color.png';
import renzocosta from '../../img/Ocloud.png';
import americatel from '../../img/Amazon_Connect_logo.png';

const images = [entel, pacifico, renzocosta, americatel];

const CustomCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;

  // Retorna las 3 imágenes visibles: la anterior, la actual y la siguiente.
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

  // Estados para controlar el arrastre
  const [startX, setStartX] = useState(null);
  const [dragDistance, setDragDistance] = useState(0);

  const handlePointerDown = (e) => {
    setStartX(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (startX !== null) {
      const delta = e.clientX - startX;
      setDragDistance(delta);
    }
  };

  const handlePointerUp = () => {
    const sensitivity = 25; // píxeles por slide
    if (Math.abs(dragDistance) > 5) {
      let slidesToMove = Math.floor(Math.abs(dragDistance) / sensitivity);
      if (slidesToMove < 1) slidesToMove = 1;
      if (dragDistance < 0) {
        // Arrastró hacia la izquierda: avanza slides
        setActiveIndex((prev) => (prev + slidesToMove) % total);
      } else if (dragDistance > 0) {
        // Arrastró hacia la derecha: retrocede slides
        setActiveIndex((prev) => (prev - slidesToMove + total) % total);
      }
    }
    setStartX(null);
    setDragDistance(0);
  };

  // También se permite cambiar slide con click
  const handleClick = (position) => {
    if (position === 1) {
      setActiveIndex((prev) => (prev + 1) % total);
    } else if (position === 0) {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    } else if (position === 2) {
      setActiveIndex((prev) => (prev + 1) % total);
    }
  };

  // Variantes para cada posición de slide (ajustadas para mayor separación)
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

  return (
    <div
      className="carouselS"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {visibleSlides.map((img, index) => {
        const position = index === 0 ? "left" : index === 1 ? "center" : "right";
        return (
          <motion.div
            key={`${img}-${index}`}
            className="slide"
            onClick={() => handleClick(index)}
            variants={slideVariants}
            animate={position}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <img src={img} alt={`Slide ${index}`} draggable="false" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default CustomCarousel;
