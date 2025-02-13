import React from "react";
import "./Marketing.css";
import Ocloud from "../../../img/Ocloud.png";
import Bluekai_logo_color from "../../../img/Bluekai_logo_color.png";
import Eloqua from "../../../img/Eloqua.png";
import Oresponsys from "../../../img/Oresponsys.png";

function Marketing() { 
    return (
        <section className="Marketing">
            <div className="MTitulo">
                <h1>Soluciones Marketing</h1>
                <p>
                  Ofrecemos una gran variedad de productos e implementaciones en asociación con nuestro partner Oracle
                </p>
            </div>
            <div className="divider">
                <span className="icon">☁</span>
            </div>

            {/* Cuadro adicional */}
            <div className="Marketing-box">
                <div className="Marketing-title">
                    <h2>Marketing</h2>
                    <div className="Munderline"></div>
                </div>
                <div className="Marketing-grid">
                    <div className="Marketing-item">
                        <div className="image-container">
                            <img src={Ocloud} alt="Oracle PaaS" />
                        </div>
                        <p className="caption">Oracle PaaS</p>
                    </div>
                    <div className="Marketing-item">
                        <div className="image-container">
                            <img src={Bluekai_logo_color} alt="Oracle BlueKai" />
                        </div>
                        <p className="caption">Oracle BlueKai</p>
                    </div>
                    <div className="Marketing-item">
                        <div className="image-container">
                            <img src={Eloqua} alt="Oracle Eloqua" />
                        </div>
                        <p className="caption">Oracle Eloqua</p>
                    </div>
                    <div className="Marketing-item">
                        <div className="image-container">
                            <img src={Oresponsys} alt="Oracle Responsys" />
                        </div>
                        <p className="caption">Oracle Responsys</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Marketing;
