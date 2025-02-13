import React from "react";
import "./SolucionesHP.css";

function SolucionesHP() {
    return (
        <section className="SolucionesHP">
      <div className="SHPcontent">
        <div className="SHPtexto">
          <h1>Soluciones HP</h1>
          <p>
          HP le ofrece soluciones de tipo software, hardware y de servicios, específicas para particulares y empresas.          </p>
        </div>
        <div className="SHPcontact">
          <h2>Contáctanos</h2>
          <p>
            Para más información sobre los productos HP puede contactarnos.
          </p>
          <button className="info-btn">
            Más Información <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>
    );
}

export default SolucionesHP;