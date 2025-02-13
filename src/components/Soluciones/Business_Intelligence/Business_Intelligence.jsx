import React from "react";
import "./Business_Intelligence.css";
import Obusiness from "../../../img/Obusiness.png";


function Business_Intelligence() { 
    return (
        <section className="Business_Intelligence">
            <div className="Btitulo">
                <h1>Soluciones Business Intelligence</h1>
                <p>
                Ofrecemos una gran variedad de productos e implementaciones en asociación con nuestro partner Oracle
                </p>
            </div>
            <div className="divider">
                <span className="icon">☁</span>
            </div>

            {/* Cuadro adicional */}
            <div className="Business_Intelligence-box">
                <div className="Business_Intelligence-title">
                    <h2>Business Intelligence</h2>
                    <div className="Bunderline"></div>
                </div>
                <div className="Business_Intelligence-grid">
                    <div className="Business_Intelligence-item">
                        <div className="image-container">
                            <img src={Obusiness} alt="Oracle Business intelligence" />
                        </div>
                        <p className="caption">Business Intelligence Cloud Services (BICS)</p>       
                    </div>             
                </div>
            </div>
        </section>
    );
}

export default Business_Intelligence;
