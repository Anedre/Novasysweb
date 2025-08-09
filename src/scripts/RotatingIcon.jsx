import React, { useState, useEffect, useRef } from 'react';
import '../components/Casos_de_exito/Casos/Entel.css';

const RotatingIcon = ({ icon, className }) => {
  const defaultSpeed = 30;
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(0);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = time => {
    if (previousTimeRef.current != null) {
      const deltaTime = (time - previousTimeRef.current) / 1000;
      setRotation(prev => prev + speed * deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [speed]);

  useEffect(() => {
    setSpeed(360);
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
    return () => clearInterval(decelerationInterval);
  }, []);

  const handleMouseEnter = () => {
    setSpeed(360);
  };

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
      <span
        className={className}
        style={{
          display: 'inline-block',
          transform: `perspective(800px) rotateY(${rotation}deg)`,
          transition: 'transform 0.1s linear',
        }}
        role="img"
        aria-label="emoji-icon"
      >
        {icon}
      </span>
    </div>
  );
};

RotatingIcon.defaultProps = {
  icon: '⚠️',
  className: 'challenge-large-icon',
};

export default RotatingIcon;
