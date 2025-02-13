// SolucionesHP_Enterprise.jsx
import React from "react";
import "./SolucionesHP_Enterprise.css";

function SolucionesHP_Enterprise() {
  return (
    <section className="SolucionesHP-Enterprise">
      <div className="SEcontent">
        <div className="SEtexto">
          <h1>Soluciones HP Enterprise</h1>
          <p>
            Hewlett Packard Enterprise es líder del sector en servidores y sistemas, optimización de operaciones TI, modelos de consumo flexible, internet of things, conmutadores, enrutadores, puntos de acceso, almacenamiento de datos, redes con y sin cable, sistemas convergentes, software, servicios en la nube y soluciones empresariales.
          </p>
        </div>
        <div className="SEcontact">
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

export default SolucionesHP_Enterprise;
