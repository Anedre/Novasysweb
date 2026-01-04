// AWSCalculator.jsx
// Calculadora de costos AWS para Contact Center
// Fase 4 del Plan de Modernización

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import "./AWSCalculator.css";

// Tarifas AWS Connect (aproximadas - USD)
const AWS_RATES = {
  connectPerMinute: 0.018, // Voz entrante/saliente por minuto
  connectChatPerMessage: 0.004, // Chat por mensaje
  dialerPerMinute: 0.025, // Dialer por minuto conectado
  transcribePerMinute: 0.024, // Transcripción
  lexPerRequest: 0.004, // Lex bot por request
  lambdaPerRequest: 0.0000002, // Lambda por request
  s3PerGB: 0.023, // S3 almacenamiento
};

// Planes predefinidos
const PRESET_PLANS = [
  { name: "Startup", agents: 5, callsPerDay: 100, avgDuration: 5, usesChat: false, usesBot: false },
  { name: "Pyme", agents: 15, callsPerDay: 300, avgDuration: 6, usesChat: true, usesBot: false },
  { name: "Empresa", agents: 50, callsPerDay: 1000, avgDuration: 5, usesChat: true, usesBot: true },
  { name: "Enterprise", agents: 200, callsPerDay: 5000, avgDuration: 4, usesChat: true, usesBot: true },
];

function AWSCalculator() {
  const [config, setConfig] = useState({
    agents: 10,
    callsPerDay: 200,
    avgDuration: 5, // minutos
    workDays: 22,
    usesChat: false,
    chatMessagesPerDay: 500,
    usesBot: false,
    botInteractionsPerDay: 100,
    usesTranscription: false,
    recordingStorageGB: 10,
  });

  const [showDetails, setShowDetails] = useState(false);

  // Calcular costos
  const costs = useMemo(() => {
    const monthlyMinutes = config.callsPerDay * config.avgDuration * config.workDays;
    
    const voiceCost = monthlyMinutes * AWS_RATES.connectPerMinute;
    const chatCost = config.usesChat 
      ? config.chatMessagesPerDay * config.workDays * AWS_RATES.connectChatPerMessage 
      : 0;
    const botCost = config.usesBot 
      ? config.botInteractionsPerDay * config.workDays * AWS_RATES.lexPerRequest 
      : 0;
    const transcriptionCost = config.usesTranscription 
      ? monthlyMinutes * AWS_RATES.transcribePerMinute 
      : 0;
    const storageCost = config.recordingStorageGB * AWS_RATES.s3PerGB;
    const lambdaCost = (config.callsPerDay * config.workDays * 10) * AWS_RATES.lambdaPerRequest;

    const subtotal = voiceCost + chatCost + botCost + transcriptionCost + storageCost + lambdaCost;
    
    // Agregar margen de contingencia del 15%
    const contingency = subtotal * 0.15;
    const total = subtotal + contingency;

    return {
      voiceCost,
      chatCost,
      botCost,
      transcriptionCost,
      storageCost,
      lambdaCost,
      subtotal,
      contingency,
      total,
      monthlyMinutes,
      perAgent: total / config.agents,
    };
  }, [config]);

  const handleInputChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const applyPreset = (preset) => {
    setConfig(prev => ({
      ...prev,
      agents: preset.agents,
      callsPerDay: preset.callsPerDay,
      avgDuration: preset.avgDuration,
      usesChat: preset.usesChat,
      usesBot: preset.usesBot,
    }));
  };

  return (
    <section className="aws-calculator">
      <div className="aws-calc-container">
        <motion.div
          className="aws-calc-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="aws-calc-badge">💰 Herramienta Gratuita</span>
          <h2 className="aws-calc-title">
            Calculadora de Costos AWS Connect
          </h2>
          <p className="aws-calc-subtitle">
            Estima el costo mensual de tu Contact Center en la nube. 
            Valores aproximados basados en tarifas públicas de AWS.
          </p>
        </motion.div>

        {/* Presets */}
        <div className="aws-calc-presets">
          <span className="preset-label">Configuraciones rápidas:</span>
          <div className="preset-buttons">
            {PRESET_PLANS.map((preset) => (
              <button
                key={preset.name}
                className="preset-btn"
                onClick={() => applyPreset(preset)}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="aws-calc-content">
          {/* Panel de configuración */}
          <motion.div
            className="aws-calc-form"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="form-section-title">📊 Volumen de Operación</h3>
            
            <div className="form-group">
              <label>Número de Agentes</label>
              <div className="input-with-value">
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={config.agents}
                  onChange={(e) => handleInputChange('agents', Number(e.target.value))}
                />
                <span className="input-value">{config.agents}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Llamadas por día</label>
              <div className="input-with-value">
                <input
                  type="range"
                  min="10"
                  max="10000"
                  step="10"
                  value={config.callsPerDay}
                  onChange={(e) => handleInputChange('callsPerDay', Number(e.target.value))}
                />
                <span className="input-value">{config.callsPerDay.toLocaleString()}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Duración promedio (minutos)</label>
              <div className="input-with-value">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={config.avgDuration}
                  onChange={(e) => handleInputChange('avgDuration', Number(e.target.value))}
                />
                <span className="input-value">{config.avgDuration} min</span>
              </div>
            </div>

            <div className="form-group">
              <label>Días laborales al mes</label>
              <div className="input-with-value">
                <input
                  type="range"
                  min="15"
                  max="30"
                  value={config.workDays}
                  onChange={(e) => handleInputChange('workDays', Number(e.target.value))}
                />
                <span className="input-value">{config.workDays}</span>
              </div>
            </div>

            <h3 className="form-section-title">🔧 Servicios Adicionales</h3>

            <div className="form-toggle">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={config.usesChat}
                  onChange={(e) => handleInputChange('usesChat', e.target.checked)}
                />
                <span className="toggle-switch" />
                💬 Chat (Amazon Connect Chat)
              </label>
            </div>

            {config.usesChat && (
              <div className="form-group nested">
                <label>Mensajes de chat por día</label>
                <input
                  type="number"
                  value={config.chatMessagesPerDay}
                  onChange={(e) => handleInputChange('chatMessagesPerDay', Number(e.target.value))}
                  min="0"
                />
              </div>
            )}

            <div className="form-toggle">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={config.usesBot}
                  onChange={(e) => handleInputChange('usesBot', e.target.checked)}
                />
                <span className="toggle-switch" />
                🤖 Bot con Amazon Lex
              </label>
            </div>

            {config.usesBot && (
              <div className="form-group nested">
                <label>Interacciones de bot por día</label>
                <input
                  type="number"
                  value={config.botInteractionsPerDay}
                  onChange={(e) => handleInputChange('botInteractionsPerDay', Number(e.target.value))}
                  min="0"
                />
              </div>
            )}

            <div className="form-toggle">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={config.usesTranscription}
                  onChange={(e) => handleInputChange('usesTranscription', e.target.checked)}
                />
                <span className="toggle-switch" />
                📝 Transcripción automática
              </label>
            </div>

            <div className="form-group">
              <label>Almacenamiento de grabaciones (GB)</label>
              <div className="input-with-value">
                <input
                  type="range"
                  min="1"
                  max="1000"
                  value={config.recordingStorageGB}
                  onChange={(e) => handleInputChange('recordingStorageGB', Number(e.target.value))}
                />
                <span className="input-value">{config.recordingStorageGB} GB</span>
              </div>
            </div>
          </motion.div>

          {/* Panel de resultados */}
          <motion.div
            className="aws-calc-results"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="results-main">
              <div className="result-total">
                <span className="result-label">Costo Mensual Estimado</span>
                <span className="result-value">
                  ${costs.total.toFixed(2)}
                  <span className="result-currency">USD</span>
                </span>
              </div>

              <div className="result-secondary">
                <div className="result-item">
                  <span className="result-item-label">Por agente/mes</span>
                  <span className="result-item-value">${costs.perAgent.toFixed(2)}</span>
                </div>
                <div className="result-item">
                  <span className="result-item-label">Minutos mensuales</span>
                  <span className="result-item-value">{costs.monthlyMinutes.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button 
              className="toggle-details-btn"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Ocultar desglose" : "Ver desglose completo"} 
              <span className={`arrow ${showDetails ? 'up' : 'down'}`}>↓</span>
            </button>

            {showDetails && (
              <motion.div
                className="results-breakdown"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="breakdown-item">
                  <span>📞 Amazon Connect (Voz)</span>
                  <span>${costs.voiceCost.toFixed(2)}</span>
                </div>
                {config.usesChat && (
                  <div className="breakdown-item">
                    <span>💬 Amazon Connect (Chat)</span>
                    <span>${costs.chatCost.toFixed(2)}</span>
                  </div>
                )}
                {config.usesBot && (
                  <div className="breakdown-item">
                    <span>🤖 Amazon Lex</span>
                    <span>${costs.botCost.toFixed(2)}</span>
                  </div>
                )}
                {config.usesTranscription && (
                  <div className="breakdown-item">
                    <span>📝 Amazon Transcribe</span>
                    <span>${costs.transcriptionCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="breakdown-item">
                  <span>📦 Amazon S3 (Grabaciones)</span>
                  <span>${costs.storageCost.toFixed(2)}</span>
                </div>
                <div className="breakdown-item">
                  <span>⚡ AWS Lambda</span>
                  <span>${costs.lambdaCost.toFixed(4)}</span>
                </div>
                <div className="breakdown-divider" />
                <div className="breakdown-item subtotal">
                  <span>Subtotal</span>
                  <span>${costs.subtotal.toFixed(2)}</span>
                </div>
                <div className="breakdown-item">
                  <span>Contingencia (15%)</span>
                  <span>${costs.contingency.toFixed(2)}</span>
                </div>
                <div className="breakdown-item total">
                  <span>Total Estimado</span>
                  <span>${costs.total.toFixed(2)}</span>
                </div>
              </motion.div>
            )}

            <div className="results-disclaimer">
              <p>
                ⚠️ <strong>Nota:</strong> Esta es una estimación basada en tarifas públicas de AWS. 
                El costo real puede variar según región, descuentos y uso real.
              </p>
            </div>

            <div className="results-cta">
              <a href="/Contacto" className="aws-calc-btn primary">
                Solicitar Cotización Exacta
              </a>
              <a 
                href="https://aws.amazon.com/connect/pricing/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="aws-calc-btn secondary"
              >
                Ver Precios AWS Oficiales
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AWSCalculator;
