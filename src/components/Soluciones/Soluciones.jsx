import React, { useState } from "react";
import "./Soluciones.css";
import Obusiness from "../../img/Obusiness.png";
import Ocloud from "../../img/Ocloud.png";
import Bluekai_logo_color from "../../img/Bluekai_logo_color.png";
import Eloqua from "../../img/Eloqua.png";
import Oresponsys from "../../img/Oresponsys.png";
import Oservicecloud from "../../img/oservicecloud.png";
import OSales from "../../img/OSales.png";
import Osiebel from "../../img/Osiebel.png";
import Oconfigure from "../../img/Oconfigure.png";



const data = {
  business: [
    { id: 1, image: Obusiness },    
  ],
  marketing: [
    { id: 2, image: Ocloud},
    { id: 3, image: Bluekai_logo_color},
    { id: 4, image: Eloqua},
    { id: 5, image: Oresponsys},

  ],
  ventas: [
    { id: 6, image: Oservicecloud},
    { id: 7, image: OSales},
    { id: 8, image: Osiebel},
    { id: 9, image: Oconfigure},

  ],
};




function Soluciones() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const getFilteredItems = () => {
      if (selectedCategory === "all") {
        return Object.values(data).flat();
      }
      return data[selectedCategory] || [];
    };
    return (
        <section className="Soluciones">
            <div className="Stitulo">
                <h1>Simplifique conectando datos, marketing App y medios</h1>
                <p>Contamos con más de 20 soluciones con diversas características que permitirá a tu empresa optimizar procesos tanto específicos como mixtos</p>
            </div>
            <div className="divider">
                <span className="icon">☁</span>
            </div>
            <div className="Cuadro1S">
                <div className="Sitem1">
                    <h1>Soluciones de Marketing</h1>
                    <h2>Novasys cuenta con soluciones eficaces para ayudar a los marketers a adquirir y retener a los clientes ideales, proporcionándoles una experiencia relevante que abarque el ciclo de vida completo del cliente. Ayudamos al marketer a conectar los datos en el ecosistema de marketing con un cliente individual, organizar una experiencia relevante y analizar el rendimiento de sus esfuerzos.</h2>
                </div>
                <div className="Sitem1">
                    <h1>Soluciones de Ventas</h1>
                    <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia soluta asperiores cupiditate sit quas, cumque reprehenderit voluptas ipsam suscipit voluptate animi repellat sequi, ut inventore ullam! </h2>
                </div>
                <div className="Sitem1">
                    <h1>Soluciones Business Intelligence</h1>
                    <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia soluta asperiores cupiditate sit quas, cumque reprehenderit voluptas ipsam suscipit voluptate animi repellat sequi, ut inventore ullam! </h2>
                </div>

            </div>
            <div className="Cuadro2S">
            <button className="Sboton1">Ver más ➜</button>
            <button className="Sboton1">Ver más ➜</button>
            <button className="Sboton1">Ver más ➜</button>
            </div>
            <div className="divider">
                <span className="icon">☁</span>
            </div>
            <div className="Stitulo2">
                <h1>Nuestras Soluciones</h1>
                <p>Ofrecemos una gran variedad de productos y soluciones propias y en asociación con algunos de los partner más importantes en innovación tecnológica</p>            
            </div>

                        {/* Menú de filtrado */}
            <nav className="menu">
                {["all", "business", "marketing", "ventas"].map((category) => (
                <span 
                    key={category} 
                    className={`filter-tab ${selectedCategory === category ? "active" : ""}`} 
                    onClick={() => setSelectedCategory(category)}
                >
                    {category === "all" ? "All" 
                    : category === "business" ? "Business Intelligence" 
                    : category === "marketing" ? "Marketing" 
                    : "Ventas"}
                </span>
                ))}
            </nav>

            {/* Contenido Filtrado */}
            <div className="Scontent">
                {getFilteredItems().map((item) => (
                <div key={item.id} className="item">
                    <img src={item.image} alt={item.title} className="item-img" />
                    <button>Más Información</button>
                </div>
                ))}
            </div>
            
        </section>
    );
}
export default Soluciones;