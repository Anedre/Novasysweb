import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineUserGroup,
  HiOutlinePresentationChartLine,
  HiOutlineMegaphone,
  HiOutlineDocumentText,
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineMapPin,
} from 'react-icons/hi2';
import { Button } from '../design-system';
import RelatedCases from '../components/sections/RelatedCases/RelatedCases';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import { solutions } from '../data/solutions';
import codeImg from '../img/solutions/code.jpg';
import TiltCard from '../components/interactive/TiltCard';
import Magnetic from '../components/interactive/Magnetic';
import AnimeText from '../components/interactive/AnimeText';
import styles from './SolucionesPage.module.css';

const software = solutions.filter((s) => s.category === 'software');
const soft = software.find((s) => s.slug === 'software-a-medida');
const modules = software.filter((s) => s.slug !== 'software-a-medida');

const ICONS = {
  'crm-ventas': HiOutlineUserGroup,
  'business-intelligence': HiOutlinePresentationChartLine,
  'marketing-automation': HiOutlineMegaphone,
  'gestion-documental': HiOutlineDocumentText,
};
const AREAS = {
  'crm-ventas': 'crm',
  'business-intelligence': 'bi',
  'marketing-automation': 'mkt',
  'gestion-documental': 'ecm',
};

const diferenciadores = [
  { icon: HiOutlineSquares2X2, title: 'Sin lock-in de fabricante', desc: 'Elegimos Oracle, AWS o desarrollo a medida según tu caso — no según nuestra comodidad.' },
  { icon: HiOutlineUsers, title: 'Un solo equipo', desc: 'Del discovery al soporte, el mismo equipo técnico que entiende tu operación.' },
  { icon: HiOutlineMapPin, title: 'Implementación local', desc: 'Equipo en Lima, con SLAs medibles y acompañamiento on-site cuando hace falta.' },
];

const tileMotion = (i) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] },
});

export default function SolucionesHubPage() {
  return (
    <>
      <Helmet>
        <title>Soluciones — Software Empresarial | Novasys del Perú</title>
        <meta name="description" content="Software empresarial: CRM & Ventas (Oracle), Business Intelligence, Marketing Automation, Gestión Documental (ELO ECM) y desarrollo a medida. Un solo equipo, del código al soporte." />
        <link rel="canonical" href="https://www.novasys.com.pe/soluciones" />
      </Helmet>

      {/* ===== Hero bento ===== */}
      <section className={styles.bentoSection}>
        <div className={styles.bento}>
          <motion.div className={`${styles.tile} ${styles.tileHead}`} style={{ gridArea: 'head' }} {...tileMotion(0)}>
            <span className={styles.eyebrow}>Software empresarial</span>
            <h1 className={styles.headTitle}>
              Software que piensa en tu <em>proceso</em>.
            </h1>
            <AnimeText
              tag="p"
              className={styles.headLede}
              text="CRM, BI, marketing y gestión documental — más desarrollo a medida cuando ningún producto encaja. Un solo equipo, del código al soporte."
            />
            <div className={styles.headCta}>
              <Magnetic strength={0.4}>
                <Button to="/contacto" variant="primary" size="lg">Consultoría gratuita</Button>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div style={{ gridArea: 'soft' }} {...tileMotion(1)} className={styles.tileImageWrap}>
            <Link to={soft.path} className={`${styles.tile} ${styles.tileImage}`}>
              <img src={codeImg} alt="Software a medida — desarrollo cloud-native" loading="lazy" />
              <div className={styles.tileImageInner}>
                <span className={styles.tileTag}>{soft.partnerTier}</span>
                <h3 className={styles.tileTitleLg}>{soft.title}</h3>
                <p className={styles.tileTagline}>{soft.tagline}</p>
                <span className={styles.tileArrow}>
                  Ver módulo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
            </Link>
          </motion.div>

          {modules.map((m, i) => {
            const Icon = ICONS[m.slug];
            return (
              <motion.div key={m.slug} style={{ gridArea: AREAS[m.slug] }} {...tileMotion(2 + i)} className={styles.tileModuleWrap}>
                <Link to={m.path} className={`${styles.tile} ${styles.tileModule}`}>
                  {Icon && <Icon className={styles.tileIcon} aria-hidden="true" />}
                  <div className={styles.tileModuleBody}>
                    <h3 className={styles.tileTitle}>{m.title}</h3>
                    <p className={styles.tileTagline}>{m.tagline}</p>
                  </div>
                  <span className={styles.tileTag}>{m.partnerTier}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== Diferenciadores ===== */}
      <section className={styles.difs}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Por qué Novasys</span>
            <h2 className={styles.headTitle2}>
              No vendemos <em>licencias</em>. Resolvemos procesos.
            </h2>
          </div>
          <div className={styles.difGrid}>
            {diferenciadores.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <TiltCard className={styles.difItem} max={7} glare={false}>
                  <d.icon className={styles.difIcon} aria-hidden="true" />
                  <h3 className={styles.difTitle}>{d.title}</h3>
                  <p className={styles.difDesc}>{d.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Casos con software ===== */}
      <RelatedCases
        label="Capítulo 03 · Casos"
        title={<>Software nuestro, hoy en <em>producción</em>.</>}
        slugs={['renzo-costa', 'interbank', 'pacifico']}
      />

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿No sabes <em>qué solución</em> necesitas?</>}
        subtitle="Agenda una consultoría gratuita. Te ayudamos a identificar la mejor opción para tu negocio sin atarte a una tecnología específica."
        primaryCta={{ to: '/contacto', text: 'Consultoría gratuita' }}
        secondaryCta={{ to: '/casos-de-exito', text: 'Ver casos de éxito' }}
        trust={['Sin compromiso', 'Respuesta en 24 h', '15+ años en el Perú']}
      />
    </>
  );
}
