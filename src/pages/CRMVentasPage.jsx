import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineUserGroup,
  HiOutlineFunnel,
  HiOutlineBolt,
  HiOutlineChartBar,
  HiOutlineEnvelope,
  HiOutlineDevicePhoneMobile,
  HiOutlineMagnifyingGlass,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineCircleStack,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2';
import { SiOracle, SiGmail, SiSap, SiTableau, SiAndroid, SiWhatsapp, SiSlack } from 'react-icons/si';
import { Button } from '../design-system';
import TiltCard from '../components/interactive/TiltCard';
import Magnetic from '../components/interactive/Magnetic';
import RelatedCases from '../components/sections/RelatedCases/RelatedCases';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import dealImg from '../img/crm/deal.jpg';
import dashboardImg from '../img/crm/dashboard.jpg';
import consultantImg from '../img/crm/consultant.jpg';
import styles from './CRMVentasPage.module.css';

// Pipeline ilustrativo (nombres genéricos — no son clientes reales).
const PIPELINE = [
  { stage: 'Prospecto', tone: 'a', deals: [{ co: 'Retail Corp', val: 'S/ 48K' }, { co: 'Andes Group', val: 'S/ 22K' }] },
  { stage: 'Calificado', tone: 'b', deals: [{ co: 'Banco Sur', val: 'S/ 120K' }, { co: 'Norte SAC', val: 'S/ 35K' }] },
  { stage: 'Propuesta', tone: 'c', deals: [{ co: 'Seguros Lima', val: 'S/ 85K' }] },
  { stage: 'Ganado', tone: 'd', deals: [{ co: 'TelcoPe', val: 'S/ 210K', won: true }] },
];

const KPIS = [
  { value: '4-6', unit: 'sem', label: 'Time-to-go-live' },
  { value: '360', unit: '°', label: 'Vista única del cliente' },
  { value: '+25', unit: '%', label: 'Más tiempo para vender' },
];

const FEATURES = [
  { Icon: HiOutlineFunnel, title: 'Pipeline visual', desc: 'Arrastra oportunidades entre etapas y ve tu embudo en tiempo real.' },
  { Icon: HiOutlineUserGroup, title: 'Gestión de leads', desc: 'Captura, califica y asigna leads automáticamente por reglas.' },
  { Icon: HiOutlineBolt, title: 'Automatización', desc: 'Flujos de seguimiento y nurturing que corren solos.' },
  { Icon: HiOutlineChartBar, title: 'Reportes ejecutivos', desc: 'Dashboards de rendimiento por vendedor y por región.' },
  { Icon: HiOutlineEnvelope, title: 'Email integrado', desc: 'Sincroniza Outlook y Gmail — cada correo queda en el CRM.' },
  { Icon: HiOutlineDevicePhoneMobile, title: 'Mobile-first', desc: 'Tu fuerza comercial opera desde el celular, con o sin señal.' },
];

// Integración: núcleo Oracle CRM + 6 satélites con logos reales, en hexágono.
const HUB = [
  { Icon: SiGmail, label: 'Email', role: 'Outlook · Gmail', pos: { x: 50, y: 7 } },
  { Icon: SiSap, label: 'ERP', role: 'SAP · Oracle EBS', pos: { x: 90, y: 30 } },
  { Icon: SiTableau, label: 'BI', role: 'Oracle Analytics', pos: { x: 90, y: 73 } },
  { Icon: SiAndroid, label: 'Mobile', role: 'iOS · Android', pos: { x: 50, y: 95 } },
  { Icon: SiWhatsapp, label: 'Canales', role: 'WhatsApp · SMS', pos: { x: 10, y: 73 } },
  { Icon: SiSlack, label: 'Alertas', role: 'Slack · Email', pos: { x: 10, y: 30 } },
];

const STEPS = [
  {
    icon: HiOutlineMagnifyingGlass, t: 'Análisis comercial', dur: 'Semana 1',
    d: 'Mapeamos tu proceso de ventas actual y dónde se fugan las oportunidades.',
    items: ['Entrevistas con el equipo comercial', 'Mapa del embudo + cuellos de botella', 'Definición de etapas y criterios'],
  },
  {
    icon: HiOutlineAdjustmentsHorizontal, t: 'Configuración', dur: 'Semana 2-3',
    d: 'Personalizamos el CRM a tu forma de vender — no al revés.',
    items: ['Campos, etapas y flujos a medida', 'Dashboards por rol (vendedor · gerente)', 'Reglas de asignación y automatización'],
  },
  {
    icon: HiOutlineCircleStack, t: 'Migración', dur: 'Semana 3-4',
    d: 'Traemos tu base desde Excel o CRM legacy, sin perder un dato.',
    items: ['Limpieza y deduplicación de datos', 'Migración validada por lotes', 'Integración con email, ERP y BI'],
  },
  {
    icon: HiOutlineRocketLaunch, t: 'Adopción', dur: 'Semana 4+',
    d: 'Capacitamos al equipo y medimos uso real durante 3 meses.',
    items: ['Capacitación por rol + manuales', 'Acompañamiento on-site las primeras semanas', 'Métricas de adopción y ajustes'],
  },
];

// Stepper interactivo del proceso: timeline clickeable + auto-avance + panel de detalle animado.
function ProcessStepper() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 3800);
    return () => clearInterval(id);
  }, [paused]);

  const step = STEPS[active];

  return (
    <div
      className={styles.stepper}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.timeline}>
        <div className={styles.tlTrack} aria-hidden="true">
          <div className={styles.tlProgress} style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }} />
        </div>
        {STEPS.map((s, i) => (
          <button
            key={s.t}
            type="button"
            className={`${styles.tlNode} ${i === active ? styles.tlNodeActive : ''} ${i < active ? styles.tlNodeDone : ''}`}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
          >
            <span className={styles.tlDot}><s.icon aria-hidden="true" /></span>
            <span className={styles.tlNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.tlLabel}>{s.t}</span>
          </button>
        ))}
      </div>

      {/* key={active} → React remonta el div al cambiar de paso; la animación CSS re-dispara.
          Sin AnimatePresence/exit: no depende de rAF (robusto en tabs de fondo) ni acumula nodos. */}
      <div key={active} className={styles.tlPanel}>
        <div className={styles.tlPanelMain}>
          <span className={styles.tlPanelDur}>{step.dur}</span>
          <h3 className={styles.tlPanelTitle}>{step.t}</h3>
          <p className={styles.tlPanelDesc}>{step.d}</p>
        </div>
        <ul className={styles.tlPanelList}>
          {step.items.map((it) => (
            <li key={it} className={styles.tlPanelItem}><span className={styles.tlCheck} aria-hidden="true" />{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function CRMVentasPage() {
  return (
    <>
      <Helmet>
        <title>CRM & Ventas (Oracle Sales Cloud) — Novasys del Perú</title>
        <meta name="description" content="Implementamos Oracle Sales Cloud y CRM a medida: pipeline visual, automatización, email integrado y reportes ejecutivos. Integrado con tu ERP, BI y canales. Un solo equipo, en Lima." />
        <link rel="canonical" href="https://www.novasys.com.pe/soluciones/crm-ventas" />
      </Helmet>

      {/* ===== Hero · pipeline comercial animado ===== */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.badge}><SiOracle aria-hidden="true" /> Oracle Sales Cloud Partner</span>
            <span className={styles.eyebrow}>Software · CRM & Ventas</span>
            <h1 className={styles.heroTitle}>
              Tu embudo comercial, <em>bajo control</em>.
            </h1>
            <p className={styles.heroLede}>
              Implementamos Oracle Sales Cloud (o un CRM a medida) para que tu equipo deje
              el Excel: pipeline visual, seguimiento automático y vista 360° del cliente.
            </p>
            <div className={styles.heroCtas}>
              <Magnetic strength={0.4}>
                <Button to="/contacto" variant="primary" size="lg">Solicitar demo</Button>
              </Magnetic>
              <Button to="/casos-de-exito" variant="outline" size="lg">Ver casos</Button>
            </div>
          </motion.div>

          {/* Kanban pipeline */}
          <motion.div
            className={styles.board}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <div className={styles.boardHead}>
              <span className={styles.boardDot} /> Pipeline · en vivo
            </div>
            <div className={styles.boardCols}>
              {PIPELINE.map((col) => (
                <div key={col.stage} className={styles.col}>
                  <span className={styles.colTitle} data-tone={col.tone}>{col.stage}</span>
                  {col.deals.map((d, j) => (
                    <div
                      key={d.co}
                      className={`${styles.deal} ${d.won ? styles.dealWon : ''}`}
                      style={{ animationDelay: `${(j * 0.7).toFixed(2)}s` }}
                    >
                      <span className={styles.dealCo}>{d.co}</span>
                      <span className={styles.dealVal}>{d.val}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== KPIs ===== */}
      <section className={styles.kpis}>
        <div className={styles.kpiInner}>
          {KPIS.map((k, i) => (
            <motion.div
              key={k.label}
              className={styles.kpi}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className={styles.kpiValue}>{k.value}<em>{k.unit}</em></span>
              <span className={styles.kpiLabel}>{k.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Features · tilt ===== */}
      <section className={styles.features}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Qué incluye</span>
            <h2 className={styles.headTitle}>Todo lo que tu equipo comercial <em>necesita</em>.</h2>
          </div>
          <div className={styles.featGrid}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <TiltCard className={styles.featCard} max={8}>
                  <f.Icon className={styles.featIcon} aria-hidden="true" />
                  <h3 className={styles.featTitle}>{f.title}</h3>
                  <p className={styles.featDesc}>{f.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Arquitectura de integración (logos reales) ===== */}
      <section className={styles.arch}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Arquitectura de integración</span>
            <h2 className={styles.headTitle}>El CRM en el <em>centro</em>, conectado a todo.</h2>
            <p className={styles.headLede}>
              Oracle Sales Cloud sincronizado con tu email, ERP, BI y canales — una sola fuente de verdad del cliente.
            </p>
          </div>

          <div className={styles.hubStage}>
            <svg className={styles.hubLines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {HUB.map((n, i) => (
                <line key={i} x1="50" y1="50" x2={n.pos.x} y2={n.pos.y} className={styles.hubLine} style={{ animationDelay: `${i * 0.4}s` }} />
              ))}
            </svg>

            <div className={styles.hubCore}>
              <SiOracle className={styles.hubCoreLogo} aria-hidden="true" />
              <span className={styles.hubCoreLabel}>Oracle CRM</span>
            </div>

            {HUB.map((n) => (
              <div key={n.label} className={styles.hubNode} style={{ left: `${n.pos.x}%`, top: `${n.pos.y}%` }}>
                <span className={styles.hubNodeIcon}><n.Icon aria-hidden="true" /></span>
                <span className={styles.hubNodeLabel}>{n.label}</span>
                <span className={styles.hubNodeRole}>{n.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Un vistazo real (mosaico de fotos) ===== */}
      <section className={styles.glimpse}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>De cerca</span>
            <h2 className={styles.headTitle}>Ventas que se <em>cierran</em>, no solo se miden.</h2>
          </div>
          <div className={styles.glimpseGrid}>
            <motion.figure
              className={styles.gA}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <img src={dealImg} alt="Cierre de un acuerdo comercial con apretón de manos" loading="lazy" />
              <figcaption>El cierre — donde el pipeline se vuelve resultado.</figcaption>
            </motion.figure>
            <motion.figure
              className={styles.gB}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <img src={dashboardImg} alt="Dashboard de analítica comercial en pantalla" loading="lazy" />
              <figcaption>Dashboards ejecutivos sobre datos reales.</figcaption>
            </motion.figure>
            <motion.figure
              className={styles.gC}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src={consultantImg} alt="Asesoría comercial con el cliente frente a la pantalla" loading="lazy" />
              <figcaption>Acompañamiento consultivo, no solo una licencia.</figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ===== Proceso ===== */}
      <section className={styles.process}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Cómo lo implementamos</span>
            <h2 className={styles.headTitle}>De Excel a CRM en <em>semanas</em>, no meses.</h2>
            <p className={styles.headLede}>Un proceso en 4 etapas — recorré la línea de tiempo o dejá que avance sola.</p>
          </div>
          <ProcessStepper />
        </div>
      </section>

      {/* ===== Casos ===== */}
      <RelatedCases
        label="Capítulo 05 · Casos"
        title={<>Equipos comerciales que <em>ya operan</em> con nuestro CRM.</>}
        slugs={['entel', 'pacifico', 'americatel']}
      />

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿Tu equipo comercial pierde tiempo en <em>Excel</em>?</>}
        subtitle="Agenda una demo de 30 minutos con datos de tu sector. Te mostramos cómo se ve el pipeline funcionando, sin compromiso."
        primaryCta={{ to: '/contacto', text: 'Solicitar demo' }}
        secondaryCta={{ to: '/casos-de-exito', text: 'Ver casos de éxito' }}
        trust={['Oracle Partner', 'Demo personalizada', 'Equipo propio · Lima']}
      />
    </>
  );
}
