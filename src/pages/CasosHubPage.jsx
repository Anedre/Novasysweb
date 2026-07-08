import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CasosDossier from '../components/sections/CasosDossier/CasosDossier';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import { featuredCases } from '../data/cases';
import torresPhoto from '../img/Corporativo/pexels-pixabay-273209.jpg';
import styles from './CasosPage.module.css';

const industries = [...new Set(featuredCases.map((c) => c.industry))];

export default function CasosHubPage() {
  return (
    <>
      <Helmet>
        <title>Casos de Éxito — Novasys del Perú</title>
        <meta
          name="description"
          content="Casos reales de Entel, Interbank, Pacífico Seguros, Renzo Costa y más: el reto, la arquitectura y los KPIs medidos de cada proyecto en producción."
        />
        <link rel="canonical" href="https://www.novasys.com.pe/casos-de-exito" />
      </Helmet>

      {/* ===== Hero editorial (theme-aware) + foto corporativa enmarcada ===== */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.ticker}>
              <span>Lima, Perú</span>
              <span aria-hidden="true">·</span>
              <span>{featuredCases.length} expedientes · en producción</span>
            </div>
            <span className={styles.eyebrow}>Casos de éxito</span>
            <h1 className={styles.title}>
              Clientes reales,<br />resultados en <em>producción</em>.
            </h1>
            <p className={styles.lede}>
              Cada caso trae un reto concreto, una arquitectura y KPIs medidos con el
              cliente. Estos son los proyectos que hoy sostienen operaciones críticas
              en el Perú.
            </p>
            <ul className={styles.industries}>
              {industries.map((ind) => (
                <li key={ind}>{ind}</li>
              ))}
            </ul>
          </motion.div>

          <motion.figure
            className={styles.heroPhoto}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={torresPhoto} alt="Torres corporativas — empresas líderes del Perú" />
            <span className={styles.photoCorner} data-c="tl" aria-hidden="true" />
            <span className={styles.photoCorner} data-c="br" aria-hidden="true" />
            <figcaption className={styles.photoCaption}>
              Fig. 01 · Empresas líderes del Perú
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ===== El expediente: lector maestro-detalle con KPIs animados ===== */}
      <CasosDossier cases={featuredCases} />

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿Quieres <em>resultados</em> similares?</>}
        subtitle="Conversemos sobre cómo transformar tu empresa con la misma metodología que aplicamos en estos casos."
        primaryCta={{ to: '/contacto', text: 'Agendar consultoría' }}
        secondaryCta={{ to: '/soluciones', text: 'Ver soluciones' }}
        trust={['Sin compromiso', 'Respuesta en 24 h', '+200 proyectos entregados']}
      />
    </>
  );
}
