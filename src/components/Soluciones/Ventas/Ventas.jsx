import React from "react";
import "./Ventas.css";
import Oservicecloud from "../../../img/oservicecloud.png";
import OSales from "../../../img/OSales.png";
import Osiebel from "../../../img/osiebel.png";
import Oconfigure from "../../../img/oconfigure.png";

function Ventas() { 
    return (
        <section className="Ventas">
            <div className="Vtitulo">
                <h1>Optimice su proceso de ventas con Novasys</h1>
                <p>
                  Contamos con más de 20 soluciones con diversas características que permitirá a tu empresa optimizar procesos tanto específicos como mixtos
                </p>
            </div>
            <div className="divider">
                <span className="icon">☁</span>
            </div>

            {/* Cuadro adicional */}
            <div className="ventas-box">
                <div className="ventas-title">
                    <h2>Ventas</h2>
                    <div className="Vunderline"></div>
                </div>
                <div className="ventas-grid">
                    <div className="ventas-item">
                        <div className="image-container">
                            <img src={Oservicecloud} alt="Oracle Service Cloud" />
                        </div>
                        <p className="caption">Oracle Service Cloud</p>
                    </div>
                    <div className="ventas-item">
                        <div className="image-container">
                            <img src={OSales} alt="Oracle Sales Cloud" />
                        </div>
                        <p className="caption">Oracle Sales Cloud</p>
                    </div>
                    <div className="ventas-item">
                        <div className="image-container">
                            <img src={Osiebel} alt="Oracle Siebel" />
                        </div>
                        <p className="caption">Oracle Siebel</p>
                    </div>
                    <div className="ventas-item">
                        <div className="image-container">
                            <img src={Oconfigure} alt="Oracle Configure, Price, and Quote" />
                        </div>
                        <p className="caption">Oracle Configure, Price, and Quote</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Ventas;
