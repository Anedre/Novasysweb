import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ToggleSwitch.css';

const ToggleSwitch = ({ isOn, onToggle }) => {
  const [particles, setParticles] = useState([]);

  const handleClick = () => {
    onToggle();
    const newParticles = Array.from({ length: 10 }).map((_, index) => ({
      id: Date.now() + index,
      x: Math.random() * 30 - 15,
      y: Math.random() * 30 - 15,
      delay: Math.random() * 0.3,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 600);
  };

  return (
    <div className="toggle-switch" onClick={handleClick}>
      <div className={`toggle-track ${isOn ? 'on' : 'off'}`}>
        <div className="toggle-thumb">
          {isOn ? (
           <FaSun className="toggle-icon sun-icon" />
          ) : (
            <FaMoon className="toggle-icon moon-icon" />
          )}
        </div>
      </div>
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            transform: `translate(${p.x}px, ${p.y}px)`,
            animationDelay: `${p.delay}s`,
            backgroundColor: isOn ? '#ADD8E6' : '#FFD700'
          }}
        ></span>
      ))}
    </div>
  );
};

export default ToggleSwitch;
