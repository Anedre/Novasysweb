// FAQSection.jsx
// Componente reutilizable de preguntas frecuentes (FAQ)
// Fase 3 del Plan de Modernización

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FAQSection.css";

/**
 * Componente FAQSection
 * 
 * @param {Object} props
 * @param {string} props.title - Título de la sección (opcional)
 * @param {string} props.subtitle - Subtítulo descriptivo (opcional)
 * @param {Array} props.faqs - Array de objetos {question, answer}
 * @param {string} props.accentColor - Color de acento (CSS variable o hex)
 */
function FAQSection({ 
  title = "Preguntas Frecuentes", 
  subtitle = "Resolvemos tus dudas más comunes",
  faqs = [],
  accentColor = "var(--primary-500)"
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="faq-section" style={{ "--faq-accent": accentColor }}>
      <div className="faq-container">
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="faq-title">{title}</h2>
          <p className="faq-subtitle">{subtitle}</p>
        </motion.div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${openIndex === index ? "faq-item-open" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="faq-question-text">{faq.question}</span>
                <motion.span
                  className="faq-icon"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="faq-answer-content">
                      {typeof faq.answer === "string" ? (
                        <p>{faq.answer}</p>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
