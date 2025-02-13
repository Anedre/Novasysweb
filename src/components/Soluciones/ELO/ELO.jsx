import React from "react";
import "./ELO.css";
import elo from "../../../img/elo.png";


function ELO() { 
    return (
        <section className="ELO">
            <div className="Etitulo">
                <h1>Soluciones ELO ECM</h1>
                <p>
                Ofrecemos una gran variedad de productos e implementaciones en asociación con nuestro partner Oracle
                </p>
            </div>
            <div className="divider">
                <span className="icon">☁</span>
            </div>

            {/* Cuadro adicional */}
            <div className="ELO-box">
                <div className="ELO-title">
                    <h2>ELO ECM</h2>
                    <div className="Eunderline"></div>
                </div>
                <div className="ELO-grid">
                    <div className="ELO-item">
                        <div className="image-container">
                            <img src={elo} alt="elo" />
                        </div>
                        <p className="caption">Enterprise Content Management (ELO ECM)</p>       
                    </div>             
                </div>
            </div>
        </section>
    );
}

export default ELO;
