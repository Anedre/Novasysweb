import React from "react";
import "./SolucionesHPmain.css";
import HP from "../../img/HP.png";
import HP_enterprise from "../../img/HP_enterprise.png";

function SolucionesHPmain() {
    return (
        <section className="HPmain">
            <div className="HPmaintitulo">
                <h1>Soluciones HP y HP Enterprises</h1>
                <p>
                Implementamos y vendemos productos escenciales con el apoyo de nuestro partner HP
                </p>
            </div>
            <div className="divider">
                <span className="icon">☁</span>
            </div>

            {/* Cuadro adicional */}
            <div className="HPmain-box">
                <div className="HPmain-title">
                    <h2>Soluciones HP</h2>
                    <div className="HPmainunderline"></div>
                </div>
                <div className="HPmain-grid">
                    <div className="HPmain-item">
                        <div className="HPmain-image-container">
                            <img src={HP} alt="HP" />
                        </div>
                        <p className="caption">Soluciones HP</p>       
                    </div>
                    <div className="HPmain-item">
                        <div className="HPmain-image-container">
                            <img src={HP_enterprise} alt="HP_enterprise" />
                        </div>
                        <p className="caption">Soluciones HP Enterprise</p>       
                    </div>  
                </div>
            </div>
        </section>
    );
}   
export default SolucionesHPmain;




