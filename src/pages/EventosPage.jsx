import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineVideoCamera,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
} from 'react-icons/hi2';
import { Button } from '../design-system';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import LottieIcon from '../components/interactive/LottieIcon';
import orbitLottie from '../assets/lottie/orbit.json';
import summitImg from '../img/eventos/summit.jpg';
import webinarImg from '../img/eventos/webinar.jpg';
import tallerImg from '../img/eventos/taller.jpg';
import styles from './EventosPage.module.css';

// Temas evergreen (áreas reales de servicio) — alimentan el marquee del hero.
const TOPICS_A = ['Amazon Connect', 'Business Intelligence', 'Migración a AWS', 'CRM & Ventas', 'Gestión Documental', 'Automatización con IA'];
const TOPICS_B = ['Arquitectura Serverless', 'Infraestructura HPE', 'Oracle Analytics', 'Contact Center con IA', 'AWS Well-Architected', 'Data Warehouse'];

const formatos = [
  {
    icon: HiOutlineVideoCamera,
    img: webinarImg,
    tag: 'Online · ~45 min',
    title: 'Webinars',
    desc: 'Sesiones online, cortas y al grano, sobre un tema puntual: Amazon Connect, BI o migración a AWS. En vivo, con espacio para tus preguntas.',
  },
  {
    icon: HiOutlineAcademicCap,
    img: tallerImg,
    tag: 'Hands-on',
    title: 'Talleres a medida',
    desc: 'Formación práctica para tu equipo. Trabajamos sobre casos de tu industria — de la configuración a la adopción, no slides genéricos.',
  },
  {
    icon: HiOutlineUserGroup,
    img: summitImg,
    tag: 'Presencial · Lima',
    title: 'Encuentros presenciales',
    desc: 'Charlas, demos y networking junto a nuestros partners AWS, HPE y Oracle. Donde los decisores de TI del Perú intercambian lo que funciona.',
  },
];

export default function EventosPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToNewsletter = () => {
    document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <>
      <Helmet>
        <title>Eventos y formación — Novasys del Perú</title>
        <meta name="description" content="Webinars, talleres a medida y encuentros presenciales de Novasys sobre Amazon Connect, cloud AWS, Business Intelligence e infraestructura. Suscríbete para las próximas fechas." />
        <link rel="canonical" href="https://www.novasys.com.pe/eventos" />
      </Helmet>

      {/* ===== Hero · marquee kinético ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Eventos &amp; formación</span>
          <h1 className={styles.heroTitle}>
            Compartimos lo que <em>implementamos</em>.
          </h1>
          <p className={styles.heroLede}>
            Webinars, talleres y encuentros presenciales. Los mismos equipos que
            despliegan en producción, explicando cómo — sin humo.
          </p>
          <div className={styles.heroCtas}>
            <Button variant="primary" size="lg" onClick={scrollToNewsletter}>
              Avísame de la próxima
            </Button>
            <Button to="/contacto" variant="outline" size="lg">Pedir un taller a medida</Button>
          </div>
        </div>

        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeRow}>
            <div className={styles.marqueeTrack}>
              {[...TOPICS_A, ...TOPICS_A].map((t, i) => (
                <span key={`a-${i}`} className={styles.chip}><span className={styles.chipDot} />{t}</span>
              ))}
            </div>
          </div>
          <div className={`${styles.marqueeRow} ${styles.reverse}`}>
            <div className={styles.marqueeTrack}>
              {[...TOPICS_B, ...TOPICS_B].map((t, i) => (
                <span key={`b-${i}`} className={styles.chip}><span className={styles.chipDot} />{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Formatos ===== */}
      <section className={styles.formatos}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Formatos</span>
            <h2 className={styles.headTitle}>Tres maneras de <em>aprender con nosotros</em>.</h2>
            <p className={styles.headLede}>
              No publicamos un calendario fijo — las fechas salen por el newsletter y por LinkedIn.
              Estos son los formatos en los que compartimos lo que sabemos.
            </p>
          </div>
          <div className={styles.formatGrid}>
            {formatos.map((f, i) => (
              <motion.article
                key={f.title}
                className={styles.formatCard}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.formatPhoto}>
                  <img src={f.img} alt={f.title} loading="lazy" />
                  <span className={styles.formatTag}>{f.tag}</span>
                </div>
                <div className={styles.formatBody}>
                  <f.icon className={styles.formatIcon} aria-hidden="true" />
                  <h3 className={styles.formatTitle}>{f.title}</h3>
                  <p className={styles.formatDesc}>{f.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Newsletter ===== */}
      <section className={styles.newsletter} id="newsletter">
        <div className={styles.nlInner}>
          <LottieIcon animationData={orbitLottie} size={62} style={{ marginBottom: 6 }} />
          <span className={styles.sectionEyebrow}>Newsletter</span>
          <h2 className={styles.nlTitle}>No te pierdas la <em>próxima fecha</em>.</h2>
          <p className={styles.nlLede}>
            Un correo cuando abrimos un webinar o taller. Sin spam — solo cuando hay algo real que contarte.
          </p>

          {subscribed ? (
            <div className={styles.nlDone}>
              <HiOutlineCheckCircle className={styles.nlDoneIcon} aria-hidden="true" />
              <div>
                <strong>¡Anotado!</strong> Te escribiremos cuando abramos la próxima sesión.
              </div>
            </div>
          ) : (
            <form className={styles.nlForm} onSubmit={handleSubscribe}>
              <input
                type="email"
                className={styles.nlInput}
                placeholder="tu@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Tu correo de trabajo"
              />
              <Button type="submit" variant="primary" size="lg">Suscribirme</Button>
            </form>
          )}
          <span className={styles.nlFoot}>Frontend en construcción · aún no conectado a un backend de envíos.</span>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Formación in-company"
        title={<>¿Querés un taller <em>para tu equipo</em>?</>}
        subtitle="Armamos una sesión a medida sobre el tema que necesites — Amazon Connect, BI, cloud o infraestructura — con casos de tu propia industria."
        primaryCta={{ to: '/contacto', text: 'Solicitar un taller' }}
        secondaryCta={{ to: '/casos-de-exito', text: 'Ver casos de éxito' }}
        trust={['Online o presencial', 'Contenido a medida', '15+ años en el Perú']}
      />
    </>
  );
}
