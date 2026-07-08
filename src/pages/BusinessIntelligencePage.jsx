import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HiOutlineBolt, HiOutlineArrowsPointingIn, HiOutlineUserGroup } from 'react-icons/hi2';
import { SiOracle, SiPostgresql, SiMysql, SiMongodb, SiSnowflake, SiGooglebigquery, SiApachespark, SiApachekafka, SiGooglesheets, SiSap, SiTableau } from 'react-icons/si';
import { Button } from '../design-system';
import Magnetic from '../components/interactive/Magnetic';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import analystImg from '../img/bi/analyst.jpg';
import screensImg from '../img/bi/screens.jpg';
import styles from './BusinessIntelligencePage.module.css';

// Datos de demostración del dashboard (ilustrativos — muestran cómo se ve un BI, no métricas reales).
const DOMAINS = [
  { key: 'ventas', label: 'Ventas', kpis: [{ v: 'S/ 4.2M', l: 'Ingresos mes' }, { v: '+18%', l: 'vs. mes ant.' }, { v: '1,240', l: 'Deals' }], bars: [42, 66, 52, 78, 90, 71], line: [28, 44, 40, 60, 72, 66, 86], donut: 72 },
  { key: 'finanzas', label: 'Finanzas', kpis: [{ v: 'S/ 1.1M', l: 'Margen bruto' }, { v: '26%', l: 'Rentabilidad' }, { v: '−9%', l: 'Costos' }], bars: [60, 54, 72, 48, 63, 82], line: [50, 47, 56, 52, 61, 57, 67], donut: 58 },
  { key: 'ops', label: 'Operaciones', kpis: [{ v: '99.4%', l: 'SLA cumplido' }, { v: '2.1h', l: 'Resolución' }, { v: '4,830', l: 'Tickets' }], bars: [80, 72, 86, 91, 67, 88], line: [70, 76, 72, 81, 86, 83, 92], donut: 88 },
];

const SOURCES = [
  { Icon: SiOracle, l: 'Oracle' }, { Icon: SiSap, l: 'SAP' }, { Icon: SiPostgresql, l: 'PostgreSQL' },
  { Icon: SiMysql, l: 'MySQL' }, { Icon: SiMongodb, l: 'MongoDB' }, { Icon: SiSnowflake, l: 'Snowflake' },
  { Icon: SiGooglebigquery, l: 'BigQuery' }, { Icon: SiApachespark, l: 'Spark' }, { Icon: SiApachekafka, l: 'Kafka' },
  { Icon: SiGooglesheets, l: 'Sheets' }, { Icon: SiTableau, l: 'Tableau' },
];

const CAPS = [
  { Icon: HiOutlineArrowsPointingIn, t: 'Una sola verdad', d: 'Data warehouse que unifica ERP, CRM, planillas y APIs en un modelo consistente.' },
  { Icon: HiOutlineBolt, t: 'Tiempo real', d: 'ETL incremental con captura de cambios — los KPIs se refrescan solos, sin esperar el lunes.' },
  { Icon: HiOutlineUserGroup, t: 'Self-service', d: 'El negocio crea sus reportes sin depender de TI. Gobernanza y control de acceso por rol.' },
];

function linePoints(arr) {
  const n = arr.length;
  return arr.map((v, i) => `${((i / (n - 1)) * 200).toFixed(1)},${(90 - (v / 100) * 82 - 4).toFixed(1)}`).join(' ');
}

// Dashboard interactivo con charts animados que redibujan al cambiar de dominio.
function BIDashboard() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % DOMAINS.length), 4200);
    return () => clearInterval(id);
  }, [paused]);
  const d = DOMAINS[active];

  return (
    <div className={styles.dash} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={styles.dashHead}>
        <span className={styles.dashLive}><span className={styles.dashDot} aria-hidden="true" /> Dashboard · demo en vivo</span>
        <div className={styles.dashTabs} role="tablist">
          {DOMAINS.map((dm, i) => (
            <button key={dm.key} type="button" role="tab" aria-selected={i === active} className={`${styles.dashTab} ${i === active ? styles.dashTabActive : ''}`} onClick={() => setActive(i)}>{dm.label}</button>
          ))}
        </div>
      </div>

      <div key={active} className={styles.dashBody}>
        <div className={styles.dKpis}>
          {d.kpis.map((k) => (
            <div key={k.l} className={styles.dKpi}>
              <span className={styles.dKpiVal}>{k.v}</span>
              <span className={styles.dKpiLbl}>{k.l}</span>
            </div>
          ))}
        </div>

        <div className={styles.dCharts}>
          <div className={styles.dBarsCard}>
            <span className={styles.dChartLabel}>Por mes</span>
            <div className={styles.dBars}>
              {d.bars.map((h, i) => (
                <span key={i} className={styles.dBar} style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }} />
              ))}
            </div>
          </div>

          <div className={styles.dLineCard}>
            <span className={styles.dChartLabel}>Tendencia</span>
            <svg className={styles.dLineSvg} viewBox="0 0 200 90" preserveAspectRatio="none" aria-hidden="true">
              <polyline className={styles.dLine} points={linePoints(d.line)} pathLength="1" />
            </svg>
          </div>

          <div className={styles.dDonutCard}>
            <span className={styles.dChartLabel}>Meta</span>
            <div className={styles.dDonutWrap}>
              <svg className={styles.dDonutSvg} viewBox="0 0 44 44" aria-hidden="true">
                <circle className={styles.dDonutBg} cx="22" cy="22" r="18" pathLength="100" />
                <circle className={styles.dDonutArc} cx="22" cy="22" r="18" pathLength="100" style={{ strokeDashoffset: 100 - d.donut }} />
              </svg>
              <span className={styles.dDonutPct}>{d.donut}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessIntelligencePage() {
  return (
    <>
      <Helmet>
        <title>Business Intelligence (Oracle Analytics) — Novasys del Perú</title>
        <meta name="description" content="Plataformas de BI con Oracle Analytics: data warehouse, ETL automatizado, dashboards en tiempo real y self-service. Conectamos ERP, CRM, planillas y APIs en una sola verdad. Decisiones sobre datos reales." />
        <link rel="canonical" href="https://www.novasys.com.pe/soluciones/business-intelligence" />
      </Helmet>

      {/* ===== Hero · dashboard interactivo (alineado al contenedor centrado) ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.badge}>Oracle Analytics Cloud Partner</span>
          <span className={styles.eyebrow}>Software · Business Intelligence</span>
          <h1 className={styles.heroTitle}>
            Decisiones sobre <em>datos reales</em>, no corazonadas.
          </h1>
          <p className={styles.heroLede}>
            Unificamos tus datos en un data warehouse y los convertimos en dashboards que se
            refrescan solos. La misma verdad para toda la organización — en vivo.
          </p>
          <div className={styles.heroCtas}>
            <Magnetic strength={0.4}>
              <Button to="/contacto" variant="primary" size="lg">Ver un dashboard real</Button>
            </Magnetic>
            <Button to="/casos-de-exito" variant="outline" size="lg">Ver casos</Button>
          </div>
        </motion.div>

        <motion.div
          className={styles.heroDash}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <BIDashboard />
        </motion.div>
        </div>
      </section>

      {/* ===== Fuentes de datos (logos) ===== */}
      <section className={styles.sources}>
        <span className={styles.sourcesLabel}>Conecta con todo</span>
        <div className={styles.sourcesTrack}>
          {[...SOURCES, ...SOURCES].map((s, i) => (
            <span key={i} className={styles.sourceItem}><s.Icon aria-hidden="true" />{s.l}</span>
          ))}
        </div>
      </section>

      {/* ===== Capacidades (rule-separated, editorial) ===== */}
      <section className={styles.caps}>
        <div className={styles.wrap}>
          <div className={styles.capRow}>
            {CAPS.map((c, i) => (
              <motion.div
                key={c.t}
                className={styles.capCol}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <c.Icon className={styles.capIcon} aria-hidden="true" />
                <h3 className={styles.capTitle}>{c.t}</h3>
                <p className={styles.capDesc}>{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Diptych antes/después (fotos duotono) ===== */}
      <section className={styles.diptych}>
        <figure className={styles.diptychHalf}>
          <img src={screensImg} alt="Reportes dispersos en pantallas" loading="lazy" />
          <figcaption><span className={styles.diptychTag}>Antes</span>Reportes en Excel el lunes — cuando ya es tarde.</figcaption>
        </figure>
        <figure className={`${styles.diptychHalf} ${styles.diptychAfter}`}>
          <img src={analystImg} alt="Analista tomando decisiones sobre datos en vivo" loading="lazy" />
          <figcaption><span className={styles.diptychTag}>Después</span>La verdad en vivo, 24/7 — decidís con el dato fresco.</figcaption>
        </figure>
      </section>

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿Tu directorio quiere KPIs en <em>tiempo real</em>?</>}
        subtitle="Te mostramos en 30 minutos cómo se ve un dashboard ejecutivo bien construido sobre datos de prueba de tu sector."
        primaryCta={{ to: '/contacto', text: 'Agendar demo' }}
        secondaryCta={{ to: '/casos-de-exito', text: 'Ver casos de éxito' }}
        trust={['Oracle Analytics Partner', 'Demo con datos reales', 'Equipo propio · Lima']}
      />
    </>
  );
}
