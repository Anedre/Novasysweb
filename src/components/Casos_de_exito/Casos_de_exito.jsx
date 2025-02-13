import React from "react";
import "./Casos_de_exito.css";
import entel from "../../img/entel.png";
import pacifico from "../../img/pacifico.svg";
import centrum from "../../img/centrum.png";
import americatel from "../../img/americatel.png";
import interbank from "../../img/Interbank_logo.png";
import renzocosta from "../../img/renzocosta.png";    


function Casos_de_exito() {
  return (
    <section className="Casos_de_exito">
      <div className="CEtitulo">
        <h1>Casos de éxito</h1>
        <p>Nuestros casos de éxito más recientes y destacados en Perú</p>
      </div>
      <div className="carousel">
        <div className="carousel-track">
          {/* Items originales */}
            <div className="carousel-item">
                <img src={entel} alt="entel" />
                            </div>
            <div className="carousel-item">
                <img src={pacifico} alt="pacifico" />
               
            </div>
            <div className="carousel-item">
                <img src={centrum} alt="centrum" />
                            </div>
            <div className="carousel-item">
                <img src={americatel} alt="americatel" />
               
            </div>
            <div className="carousel-item">
                <img src={interbank} alt="interbank" />
            </div>
            <div className="carousel-item">
                <img src={renzocosta} alt="renzocosta" />
                            </div>
            
            {/* Items duplicados para lograr efecto de loop continuo */}
            <div className="carousel-item">
                <img src={entel} alt="entel" />
               
            </div>
            <div className="carousel-item">
                <img src={pacifico} alt="pacifico" />
            </div>
            <div className="carousel-item">
                <img src={centrum} alt="centrum" />
            </div>
            <div className="carousel-item">
                <img src={americatel} alt="americatel" />
            </div>
            <div className="carousel-item">
                <img src={interbank} alt="interbank" />
            </div>
            <div className="carousel-item">
                <img src={renzocosta} alt="renzocosta" />
               
            </div>
        </div>
      </div>
    </section>
  );
}

export default Casos_de_exito;
