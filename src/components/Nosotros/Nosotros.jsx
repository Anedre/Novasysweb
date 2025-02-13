import React from "react";
import "./Nosotros.css";

function Nosotros() {
    return (
        <div className="nosotros">
            <div className="cuadro1">    
                <div className="figura"> 
                    <h2>99%</h2>
                    <p>__</p>
                    <p>Satisfaccion</p>
                </div>
                <div className="figura">  
                    <h2>+30</h2>
                    <p>__</p>
                    <p>Casos de éxito</p>
                </div>
                <div className="figura">
                    <h2>+3000</h2>
                    <p>__</p>
                    <p>Usuarios activos</p>
                </div>
                <div className="figura">
                        <h2>+200</h2>
                    <p>__</p>
                        <p>Certificaciones</p>
                </div>         
            </div>    
         <h1>Nosotros</h1>
         <section className="quienes-somos">
             <h2>¿Quiénes somos?</h2>
                <p>
                   Novasys es una empresa integradora de tecnología de la información y consultoría. Contamos con más de 15 años de experiencia implementando y desarrollando software capaz de cumplir con las necesidades de algunas de las empresas más exigentes del Perú.
               </p>
               <ul>
                  <li>Optimización de procesos: 90%</li>
                  <li>Mejora de relación con los clientes: 100%</li>
                  <li>Posicionamiento en el mercado: 85%</li>
                  <li>Social Media: 85%</li>
               </ul>
         </section>
  
         <section className="mision-vision">
             <div className="MVF">
                 <h2>MISIÓN</h2>
                 <p>Hacer de nuestras soluciones una fuente de ventajas competitiva y continua para nuestros Clientes.</p>
               </div>
              <div className="MVF">
                  <h2>VISIÓN</h2>
                 <p>Ser la mejor compañía experta en el uso de tecnología abierta de la información.</p>
               </div>
  
         <section className="MVF">
             <h2>FILOSOFÍA</h2>
              <ul>
                 <li>Clientes satisfechos</li>
                 <li>Usuarios entrenados</li>
                 <li>Implementación de la solución a tiempo</li>
                 <li>Dentro del presupuesto</li>
                 <li>Uso extensivo de mejores prácticas</li>
                 <li>Renovación continua</li>
                <li>Socios y alianzas</li>
              </ul>
         </section>
         </section>
      </div>
    );
}
export default Nosotros;
