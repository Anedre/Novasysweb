import React, { useRef,useState, useEffect } from "react";
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, useAnimation, useInView } from "framer-motion";

import "./Nosotros.css";
import TrianglesExample from "../Background/TrianglesExample.jsx";
import MapaPresencia from "../../scripts/Mapa/MapaPresencia.jsx"; // asegúrate de ajustar el path



import figura5 from "../../assets/figura7.svg";
import figura6 from "../../assets/figura8.svg";

const timeline = [
  {
    year: "2005",
    title: "Fundación de Novasys",
    description: "Inicio de operaciones en Lima como integradora de tecnología y consultoría TI.",
    image: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/crono1.mp4",
    isVideo: true
  },
  {
    year: "2010",
    title: "Expansión de Servicios",
    description: "Ampliación de soluciones en CRM, BI y marketing digital.",
    image: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/crono2.mp4",
    isVideo: true
  },
  {
    year: "2015",
    title: "Alianzas Estratégicas",
    description: "Alianzas con Oracle, HP y otras empresas líderes en tecnología.",
    image: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/crono3.mp4",
    isVideo: true
  },
  {
    year: "2020",
    title: "Presencia Internacional",
    description: "Apertura de operaciones en Canadá y expansión remota.",
    image: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/crono4.mp4",
    isVideo: true
  },
  {
    year: "2023",
    title: "Innovación Continua (20 años)",
    description: "Implementación de soluciones en la nube y transformación digital. ¡Celebramos 20 años de innovación contigo! 🚀",
    image: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/Novasys-20años-Logo.MOV",
    isVideo: true,
  },
];

function TimelineCard({ data, index }) {
  const isLeft = index % 2 === 0;
  const yearDigits = data.year.split("");
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  useEffect(() => {
    if (inView) {
      controls.start(i => ({
        y: 0,
        scale: 1,
        transition: {
          delay: index * 0.1 + i * 0.12 + 0.25,
          duration: 0.54,
          type: "spring",
          bounce: 0.36,
        },
      }));
    } else {
      controls.start(i => ({
        y: 36,
        scale: 1.3,
        transition: { duration: 0.22 }
      }));
    }
  }, [inView, controls, index]);

  // Hover solo escala/salta, sin blur
  const handleHover = () => {
    controls.start(i => ({
      y: -10,
      scale: 1.15,
      transition: {
        delay: i * 0.09,
        duration: 0.33,
        type: "spring",
        bounce: 0.20,
      },
    })).then(() =>
      controls.start(i => ({
        y: 0,
        scale: 1,
        transition: {
          delay: i * 0.06,
          duration: 0.38,
          type: "spring",
          bounce: 0.32,
        },
      }))
    );
  };

  return (
    <div className={`timeline-row ${isLeft ? "left" : "right"}`} ref={ref}>
      <motion.div
        className={`timeline-card-custom ${isLeft ? "left" : "right"}`}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        whileHover="hover"
      >
        <div className="timeline-card-content">
          <h3 className="timeline-title-custom">{data.title}</h3>
          <p className="timeline-desc-custom">{data.description}</p>
        </div>
        <div className="timeline-card-image">
          {data.isVideo ? (
          <video 
              src={data.image} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="timeline-image-custom"
              style={{objectFit: "cover"}}
            />
          ) : (
            <img src={data.image} alt={data.title} className="timeline-image-custom" />
          )}
        </div>
      </motion.div>
      <motion.span
        className={`timeline-year-text ${isLeft ? "right" : "left"}`}
        aria-hidden="true"
        onMouseEnter={handleHover}
        style={{ cursor: "pointer" }}
      >
        {yearDigits.map((digit, i) => (
          <motion.span
            key={i}
            custom={i}
            initial={{
              y: 36,
              scale: 1.3,
            }}
            animate={controls}
            style={{
              display: "inline-block"
              // SIN blur, SIN color/opacity aquí
            }}
          >
            {digit}
          </motion.span>
        ))}
      </motion.span>
    </div>
  );
}

function Nosotros() {
  const source = {
    type: "video",
    sources: [
      { src: "https://dist-webpagenovasys.s3.us-east-1.amazonaws.com/Videos/video.mp4", type: "video/mp4" }
    ],
  };

  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const equipo = [
    { nombre: "Ana Rodríguez", rol: "CEO", emoji: "👩‍💼" },
    { nombre: "Carlos Vega", rol: "Desarrollador Fullstack", emoji: "👨‍💻" },
    { nombre: "Lucía Torres", rol: "Diseñadora UX/UI", emoji: "🎨" },
    { nombre: "Eduardo Quispe", rol: "Especialista Cloud", emoji: "☁️" }
  ];


  const [mode, setMode] = useState("day");
const toggleMode = () => {
  const newMode = mode === "day" ? "night" : "day";
  setMode(newMode);
  document.body.classList.toggle("night", newMode === "night");
  document.body.classList.toggle("day", newMode === "day");
};

  return (
    <motion.div
      className="nosotros"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >    
      <motion.section
        className="heroN"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -60 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="heroN-container">
          <TrianglesExample
            key={mode}
            width={dimensions.width}
            height={dimensions.height}
          />
          <motion.div
            className="heroN-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="heroN-title">
              <span className="word" style={{ animationDelay: "0s" }}>Bienvenidos </span>{" "}
              <span className="word" style={{ animationDelay: "0.4s" }}>a </span>{" "}
              <span className="word" style={{ animationDelay: "0.8s" }}>Novasys</span>
            </h1>
            <motion.p
              className="heroN-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Innovación, tecnología y pasión al servicio de tu negocio.
            </motion.p>
            <motion.a
              href="#quienes-somos"
              className="scroll-down"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Descubre más
            </motion.a>
          </motion.div>
        </div>
      </motion.section>


      <section className="quienes-somos" id="quienes-somos">
       
        <motion.div
          className="quienes-somos-grid"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >    
          <div className="quienes-somos-content">
            <h2>¿Quiénes somos?</h2>
            <p>
              Novasys es una empresa integradora de tecnología de la información y consultoría.
              Contamos con más de 15 años de experiencia implementando y desarrollando software
              capaz de cumplir con las necesidades de algunas de las empresas más exigentes del Perú.
            </p>
          </div>
          <div className="player-wrapper">
            <Plyr source={source} options={{ autoplay: true, muted: true, playsinline: true }} />
          </div>
        </motion.div>
      </section>

      <section className="principios">
        <div className="section-background pr-background">
          <img src={figura5} alt="Figura de fondo" className="pr-figure pr-figure1" />
          <img src={figura6} alt="Figura de fondo" className="pr-figure pr-figure2" />
        </div>
        <div className="principios-content">
          <div className="principio-card">
            <h3>MISIÓN</h3>
            <p>Impulsar la transformación digital mediante soluciones tecnológicas integrales y personalizadas.</p>
            <div className="lottie-wrapperM">
              <DotLottieReact src="https://lottie.host/972681cc-1c6e-4dd0-8034-89467595dfa7/p8H7Lzf6aJ.json" loop autoplay />
            </div>
          </div>
          <div className="principio-card">
            <h3>VISIÓN</h3>
            <p>Aspiramos a ser líderes en la integración de tecnologías emergentes en América Latina.</p>
            <div className="lottie-wrapperV">
              <DotLottieReact src="https://lottie.host/fc27f938-0264-4d67-8f6d-f48ed4e13ae6/oUXV2UnuHn.json" loop autoplay />
            </div>
          </div>
          <div className="principio-card">
            <h3>FILOSOFÍA</h3>
            <p>Compromiso inquebrantable con la calidad, innovación, ética y transparencia.</p>
            <div className="lottie-wrapperF">
              <DotLottieReact src="https://lottie.host/b7dd4335-8466-47e8-b141-415de9b63da5/I2ImR5UWVk.json" loop autoplay />
            </div>
          </div>
        </div>
      </section>

       {/* Timeline PRO */}
      <section className="timeline-section">
        <h2 className="timeline-title">Nuestra Historia</h2>
        <div className="timeline-intercalado">
          {timeline.map((item, idx) => (
            <TimelineCard key={item.year} data={item} index={idx} />
          ))}
        </div>
      </section>

      <section className="equipo-novasys">
        <h2>Conoce a nuestro equipo</h2>
        <div className="equipo-grid">
          {equipo.map((persona, index) => (
            <motion.div
              key={index}
              className="equipo-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="emoji-icon">{persona.emoji}</div>
              <h3>{persona.nombre}</h3>
              <p>{persona.rol}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="presencia-novasys">
        <MapaPresencia />
      </section>

      <section className="cta-final">
        <h2>¿Quieres ser parte de nuestra historia?</h2>
        <a href="/Contacto" className="cta-btnN">Contáctanos</a>
      </section>
    </motion.div>
  );
}

export default Nosotros;
