import React from "react";
import { motion } from "framer-motion";

const clientesLogos = [
  "Oracle", "AWS", "Microsoft", "HP", "SAP", "Salesforce", "Google Cloud", "IBM"
];

function PartnersSection() {
  return (
    <section className="partners-premium-section">
      <div className="partners-container">
        <motion.div 
          className="partners-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="partners-label">Respaldados por los mejores</span>
          <h2 className="partners-title">Nuestros Partners Tecnológicos</h2>
        </motion.div>

        <motion.div 
          className="partners-logos-track"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="partners-logos-slide">
            {[...clientesLogos, ...clientesLogos].map((logo, index) => (
              <div key={index} className="partners-logo-item">
                <span>{logo}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PartnersSection;
export { clientesLogos };
