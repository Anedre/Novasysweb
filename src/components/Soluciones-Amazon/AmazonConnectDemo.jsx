// AmazonConnectDemo.jsx
// Demo interactivo de flujo de llamadas Amazon Connect
// Fase 4 del Plan de Modernización

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AmazonConnectDemo.css";

// Estados del flujo de llamada
const CALL_STATES = {
  IDLE: 'idle',
  RINGING: 'ringing',
  IVR: 'ivr',
  BOT: 'bot',
  QUEUE: 'queue',
  CONNECTED: 'connected',
  ENDED: 'ended'
};

// Opciones del IVR
const IVR_OPTIONS = [
  { key: '1', label: 'Ventas', icon: '🛒', nextState: CALL_STATES.QUEUE, queueType: 'ventas' },
  { key: '2', label: 'Soporte Técnico', icon: '🔧', nextState: CALL_STATES.BOT, queueType: 'soporte' },
  { key: '3', label: 'Facturación', icon: '📄', nextState: CALL_STATES.QUEUE, queueType: 'facturacion' },
  { key: '0', label: 'Hablar con Agente', icon: '👤', nextState: CALL_STATES.QUEUE, queueType: 'general' },
];

// Respuestas del bot
const BOT_RESPONSES = [
  { question: "¿Cuál es el problema?", options: ["Internet lento", "Sin conexión", "Otro problema"] },
  { question: "¿Ya reinició el router?", options: ["Sí", "No", "No tengo acceso"] },
];

function AmazonConnectDemo() {
  const [callState, setCallState] = useState(CALL_STATES.IDLE);
  const [selectedIVR, setSelectedIVR] = useState(null);
  const [queuePosition, setQueuePosition] = useState(3);
  const [waitTime, setWaitTime] = useState(0);
  const [botStep, setBotStep] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Timer para la cola
  useEffect(() => {
    let interval;
    if (callState === CALL_STATES.QUEUE) {
      interval = setInterval(() => {
        setWaitTime(prev => prev + 1);
        if (waitTime > 0 && waitTime % 5 === 0 && queuePosition > 1) {
          setQueuePosition(prev => prev - 1);
        }
        if (queuePosition === 1 && waitTime > 8) {
          setCallState(CALL_STATES.CONNECTED);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState, waitTime, queuePosition]);

  // Timer para llamada conectada
  useEffect(() => {
    let interval;
    if (callState === CALL_STATES.CONNECTED) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  // Auto-avance del estado ringing
  useEffect(() => {
    if (callState === CALL_STATES.RINGING) {
      const timeout = setTimeout(() => {
        setCallState(CALL_STATES.IVR);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [callState]);

  const startCall = () => {
    setIsPlaying(true);
    setCallState(CALL_STATES.RINGING);
    resetDemo();
  };

  const resetDemo = () => {
    setSelectedIVR(null);
    setQueuePosition(3);
    setWaitTime(0);
    setBotStep(0);
    setCallDuration(0);
  };

  const handleIVRSelect = (option) => {
    setSelectedIVR(option);
    setTimeout(() => {
      setCallState(option.nextState);
    }, 1000);
  };

  const handleBotResponse = (response) => {
    if (botStep < BOT_RESPONSES.length - 1) {
      setBotStep(prev => prev + 1);
    } else {
      // El bot deriva a un agente
      setCallState(CALL_STATES.QUEUE);
    }
  };

  const endCall = () => {
    setCallState(CALL_STATES.ENDED);
    setIsPlaying(false);
  };

  const restartDemo = () => {
    setCallState(CALL_STATES.IDLE);
    resetDemo();
    setIsPlaying(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="amazon-connect-demo">
      <div className="demo-container">
        <motion.div
          className="demo-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="demo-badge">🎮 Demo Interactivo</span>
          <h2 className="demo-title">
            Experimenta Amazon Connect
          </h2>
          <p className="demo-subtitle">
            Simula el flujo de una llamada entrante en un Contact Center con Amazon Connect.
            Prueba el IVR, chatbot y enrutamiento inteligente.
          </p>
        </motion.div>

        <div className="demo-content">
          {/* Panel del teléfono */}
          <motion.div
            className="phone-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="phone-screen">
              <div className="phone-header">
                <span className="phone-carrier">Amazon Connect</span>
                <span className="phone-time">{new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              <AnimatePresence mode="wait">
                {/* Estado: Idle */}
                {callState === CALL_STATES.IDLE && (
                  <motion.div
                    key="idle"
                    className="phone-state idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="idle-icon">📞</div>
                    <p>Centro de Atención</p>
                    <span className="phone-number">+51 1 234 5678</span>
                    <button className="call-btn start" onClick={startCall}>
                      <span>📞</span> Iniciar Llamada
                    </button>
                  </motion.div>
                )}

                {/* Estado: Ringing */}
                {callState === CALL_STATES.RINGING && (
                  <motion.div
                    key="ringing"
                    className="phone-state ringing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div 
                      className="ringing-icon"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                      📞
                    </motion.div>
                    <p>Conectando...</p>
                    <span className="connecting-dots">
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>●</motion.span>
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}>●</motion.span>
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}>●</motion.span>
                    </span>
                  </motion.div>
                )}

                {/* Estado: IVR */}
                {callState === CALL_STATES.IVR && (
                  <motion.div
                    key="ivr"
                    className="phone-state ivr"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="ivr-message">
                      <span className="ivr-icon">🎙️</span>
                      <p>"Bienvenido a Novasys. Por favor seleccione una opción:"</p>
                    </div>
                    <div className="ivr-options">
                      {IVR_OPTIONS.map((option) => (
                        <button
                          key={option.key}
                          className={`ivr-option ${selectedIVR?.key === option.key ? 'selected' : ''}`}
                          onClick={() => handleIVRSelect(option)}
                          disabled={selectedIVR !== null}
                        >
                          <span className="ivr-key">{option.key}</span>
                          <span className="ivr-icon-small">{option.icon}</span>
                          <span className="ivr-label">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Estado: Bot */}
                {callState === CALL_STATES.BOT && (
                  <motion.div
                    key="bot"
                    className="phone-state bot"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="bot-header">
                      <span className="bot-avatar">🤖</span>
                      <span className="bot-name">Amazon Lex Bot</span>
                    </div>
                    <div className="bot-message">
                      <p>{BOT_RESPONSES[botStep].question}</p>
                    </div>
                    <div className="bot-options">
                      {BOT_RESPONSES[botStep].options.map((option, idx) => (
                        <button
                          key={idx}
                          className="bot-option"
                          onClick={() => handleBotResponse(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Estado: Queue */}
                {callState === CALL_STATES.QUEUE && (
                  <motion.div
                    key="queue"
                    className="phone-state queue"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="queue-info">
                      <span className="queue-icon">⏳</span>
                      <p>En cola de espera</p>
                      <div className="queue-details">
                        <div className="queue-stat">
                          <span className="stat-value">{queuePosition}</span>
                          <span className="stat-label">Posición</span>
                        </div>
                        <div className="queue-stat">
                          <span className="stat-value">{formatTime(waitTime)}</span>
                          <span className="stat-label">Tiempo</span>
                        </div>
                      </div>
                      <motion.div 
                        className="queue-music"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        🎵 Música de espera...
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Estado: Connected */}
                {callState === CALL_STATES.CONNECTED && (
                  <motion.div
                    key="connected"
                    className="phone-state connected"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="connected-header">
                      <span className="agent-avatar">👤</span>
                      <div className="agent-info">
                        <span className="agent-name">María García</span>
                        <span className="agent-role">Agente de Soporte</span>
                      </div>
                    </div>
                    <div className="call-timer">
                      <span className="timer-icon">🔴</span>
                      <span className="timer-value">{formatTime(callDuration)}</span>
                    </div>
                    <div className="call-actions">
                      <button className="action-btn mute">🔇</button>
                      <button className="action-btn hold">⏸️</button>
                      <button className="action-btn end" onClick={endCall}>📞</button>
                    </div>
                  </motion.div>
                )}

                {/* Estado: Ended */}
                {callState === CALL_STATES.ENDED && (
                  <motion.div
                    key="ended"
                    className="phone-state ended"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="ended-icon">✅</div>
                    <p>Llamada finalizada</p>
                    <span className="call-summary">Duración: {formatTime(callDuration)}</span>
                    <button className="call-btn restart" onClick={restartDemo}>
                      Reiniciar Demo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Panel de información */}
          <motion.div
            className="info-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="info-title">Lo que está pasando</h3>
            
            <div className="flow-steps">
              <div className={`flow-step ${callState === CALL_STATES.RINGING ? 'active' : callState !== CALL_STATES.IDLE ? 'completed' : ''}`}>
                <div className="step-icon">📞</div>
                <div className="step-content">
                  <h4>Llamada Entrante</h4>
                  <p>Amazon Connect recibe la llamada y la rutea a un flujo.</p>
                </div>
              </div>

              <div className={`flow-step ${callState === CALL_STATES.IVR ? 'active' : ['bot', 'queue', 'connected', 'ended'].includes(callState) ? 'completed' : ''}`}>
                <div className="step-icon">🎙️</div>
                <div className="step-content">
                  <h4>IVR Inteligente</h4>
                  <p>El menú de voz guía al cliente a la opción correcta.</p>
                </div>
              </div>

              <div className={`flow-step ${callState === CALL_STATES.BOT ? 'active' : ['queue', 'connected', 'ended'].includes(callState) && selectedIVR?.nextState === CALL_STATES.BOT ? 'completed' : ''}`}>
                <div className="step-icon">🤖</div>
                <div className="step-content">
                  <h4>Amazon Lex Bot</h4>
                  <p>IA conversacional recolecta información del cliente.</p>
                </div>
              </div>

              <div className={`flow-step ${callState === CALL_STATES.QUEUE ? 'active' : callState === CALL_STATES.CONNECTED || callState === CALL_STATES.ENDED ? 'completed' : ''}`}>
                <div className="step-icon">⏳</div>
                <div className="step-content">
                  <h4>Cola Inteligente</h4>
                  <p>Enrutamiento basado en skills y disponibilidad.</p>
                </div>
              </div>

              <div className={`flow-step ${callState === CALL_STATES.CONNECTED ? 'active' : callState === CALL_STATES.ENDED ? 'completed' : ''}`}>
                <div className="step-icon">👤</div>
                <div className="step-content">
                  <h4>Agente Conectado</h4>
                  <p>CCP muestra información del cliente al agente.</p>
                </div>
              </div>
            </div>

            <div className="demo-features">
              <h4>Características demostradas:</h4>
              <ul>
                <li>✓ Contact Flows personalizables</li>
                <li>✓ IVR con reconocimiento de voz</li>
                <li>✓ Integración con Amazon Lex</li>
                <li>✓ Enrutamiento inteligente</li>
                <li>✓ Panel del agente (CCP)</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AmazonConnectDemo;
