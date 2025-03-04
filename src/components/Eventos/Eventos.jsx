import React from "react";
import "./Eventos.css";
function Eventos() {
  return (
    <div className="Eventos">
      <h1>Proximos Eventos</h1>
      <h2>Los eventos más recientes para conocer los próximos métodos de gestión empresarial</h2>
      <div className="gridEventos">
            <div className="evento">
                <div className="cuadradoE">1</div>
                <h2>Evento CX Lifecycle</h2>
                <p>Próximamente</p>
            </div>            
            <div className="evento">
                <div className="cuadradoE">2</div>
                <h2>Evento Oracle Communications Security Shield</h2>
                <p>Webinar 08 de Abril 2021 - 10:00 AM</p>
            </div>
            <div className="evento">
                <div className="cuadradoE">3</div>
                <h2>Evento Oracle Talari SD-WAN</h2>
                <p>Webinar 17 de Noviembre 2020 - 11:00 AM</p>
            </div>
        </div>
    </div>
    
  );
}

export default Eventos;
