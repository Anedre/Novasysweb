import React, { useEffect, useState } from 'react';
import './Home.css';
import {addfadeout} from '../../scripts/fadeout.js';
import introImage from '../../img/Logo_Mejores_Blanco.png';
import entel from '../../img/entel.png';
import pacifico from '../../img/pacifico.svg';
import renzocosta from '../../img/renzocosta.png';
import americatel from '../../img/americatel.png';

function Home() {

  useEffect(() => { 
    const removeFadeOut = addfadeout();
    return () => removeFadeOut();
  }, []);
  

 
  return (
    <div className="Home">
      <div className="intro">
        <img src={introImage} alt="Intro"/>  
      </div>
      <section className="section">
      <div className="section__paragraph1">
        <h2>Casos de éxito</h2>
        <p>Nuestros casos de éxito más recientes y destacados en Perú</p>
        <div className="success-grid">
          <div className="success-item">
           <img src={entel} alt="Proyecto 1" />
           <p>Descripción del proyecto 1</p>
          </div>
         <div className="success-item">
           <img src={pacifico} alt="Proyecto 2" />
           <p>Descripción del proyecto 2</p>
         </div>
         <div className="success-item">
           <img src={renzocosta} alt="Proyecto 3" />
           <p>Descripción del proyecto 3</p>
         </div>
         <div className="success-item">
            <img src={americatel} alt="Proyecto 4" /> 
           <p>Descripción del proyecto 4</p>
         </div>
       </div>
      </div>
      <div className="section__paragraph2">
        <div className="solutions-text">
          <h2>Nuestras soluciones</h2>
          <p>Ofrecemos una gran variedad de servicios e implementaciones en asociación con las empresas tecnológicas más importantes</p>
       </div>
       <div className="solutions-grid">
          <div className="solution-item"><img src={entel} alt="Solución 1" /></div>
          <div className="solution-item"><img src={pacifico} alt="Solución 2" /></div>
          <div className="solution-item"><img src={renzocosta} alt="Solución 3" /></div>
         <div className="solution-item"><img src={americatel} alt="Solución 4" /></div>
        </div>
      </div>
      <div className="section__paragraph3">
        <div className="cuadrado"> 
         <h2>99%</h2>
         <p>__</p>
         <p>Satisfaccion</p>
        </div>
        <div className="cuadrado">  
         <h2>+30</h2>
         <p>__</p>
         <p>Casos de éxito</p>
        </div>
        <div className="cuadrado">
         <h2>+3000</h2>
         <p>__</p>
         <p>Usuarios activos</p>
       </div>
       <div className="cuadrado">
        <h2>+200</h2>
         <p>__</p>
         <p>Certificaciones</p>
       </div>
      </div>
    </section>
  </div>
  );
}

export default Home;
