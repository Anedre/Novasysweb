import React, { useState, useEffect, useRef } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import '../components/Casos_de_exito/Casos/Entel.css';

const RotatingIcon = ({ icon: IconComponent, className }) => {
  const defaultSpeed = 30; // Velocidad lenta constante (30°/seg)
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(0); // velocidad en grados/segundo
  const requestRef = useRef();
  const previousTimeRef = useRef();

  // Función de animación: actualiza el ángulo según la velocidad actual.
  const animate = time => {
    if (previousTimeRef.current != null) {
      const deltaTime = (time - previousTimeRef.current) / 1000; // convertir a segundos
      setRotation(prev => prev + speed * deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  // Inicia la animación continua
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [speed]);

  // Animación inicial: gira rápido y desacelera gradualmente hasta la velocidad lenta (defaultSpeed)
  useEffect(() => {
    setSpeed(360); // Giro rápido: 360°/seg
    const decelerationInterval = setInterval(() => {
      setSpeed(prevSpeed => {
        if (prevSpeed > defaultSpeed + 1) {
          // Desacelera pero sin bajar de defaultSpeed
          return Math.max(prevSpeed * 0.9, defaultSpeed);
        } else {
          clearInterval(decelerationInterval);
          return defaultSpeed;
        }
      });
    }, 100);
    return () => clearInterval(decelerationInterval);
  }, []);

  // Al pasar el mouse, aumenta la velocidad a 360°/seg
  const handleMouseEnter = () => {
    setSpeed(360);
  };

  // Al salir el mouse, desacelera gradualmente hasta volver a la velocidad lenta
  const handleMouseLeave = () => {
    const decelerationInterval = setInterval(() => {
      setSpeed(prevSpeed => {
        if (prevSpeed > defaultSpeed + 1) {
          return Math.max(prevSpeed * 0.9, defaultSpeed);
        } else {
          clearInterval(decelerationInterval);
          return defaultSpeed;
        }
      });
    }, 100);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <IconComponent
        className={className}
        style={{
          transform: `perspective(800px) rotateY(${rotation}deg)`,
          transition: 'transform 0.1s linear'
        }}
      />
    </div>
  );
};

// Valor por defecto: usa FaExclamationTriangle y la clase 'challenge-large-icon'
RotatingIcon.defaultProps = {
  icon: FaExclamationTriangle,
  className: 'challenge-large-icon'
};

export default RotatingIcon;
