import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlinePhone,
  HiOutlineQueueList,
  HiOutlineFunnel,
  HiOutlineBanknotes,
  HiOutlineShieldCheck,
  HiOutlineNoSymbol,
  HiOutlineMicrophone,
  HiOutlineClock,
  HiOutlineBolt,
  HiOutlineUserGroup,
  HiOutlineArrowRight,
} from 'react-icons/hi2';
import { FaAws } from 'react-icons/fa6';
import { Button } from '../design-system';
import Magnetic from '../components/interactive/Magnetic';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import RelatedCases from '../components/sections/RelatedCases/RelatedCases';
import floorImg from '../img/dialer/floor.jpg';
import outboundImg from '../img/dialer/outbound.jpg';
import styles from './ConnectDialerPage.module.css';

// Filas de la consola del dialer (estados fijos + animación ambiente CSS).
const CALL_ROWS = [
  { num: '+51 9•• ••• 214', status: 'conectado', tone: 'ok' },
  { num: '+51 9•• ••• 087', status: 'marcando…', tone: 'dial' },
  { num: '+51 9•• ••• 342', status: 'agente López', tone: 'agent' },
  { num: '+51 9•• ••• 556', status: 'en cola', tone: 'queue' },
  { num: '+51 9•• ••• 771', status: 'sin respuesta', tone: 'no' },
  { num: '+51 9•• ••• 903', status: 'marcando…', tone: 'dial' },
];

// Modos de marcación — selector interactivo. `lines` = líneas por agente (visual).
const MODES = [
  {
    id: 'predictivo',
    label: 'Predictivo',
    lines: 4,
    tag: 'Máxima ocupación',
    desc: 'El algoritmo marca varios números por agente y predice cuándo quedará libre. Absorbe el abandono estadísticamente para exprimir cada minuto de agente.',
    when: 'Cobranza masiva y telemarketing de alto volumen.',
  },
  {
    id: 'progresivo',
    label: 'Progresivo',
    lines: 2,
    tag: 'Cero abandono',
    desc: 'Marca el siguiente número solo cuando un agente queda libre. Nunca hay una llamada sin nadie que la atienda — abandono real cercano a cero.',
    when: 'Campañas con compliance estricto o marca sensible.',
  },
  {
    id: 'power',
    label: 'Power',
    lines: 3,
    tag: 'Ratio fijo',
    desc: 'Ratio constante de líneas por agente (2:1, 3:1). Balance simple y predecible entre ocupación y tasa de abandono, sin algoritmo adaptativo.',
    when: 'Equipos medianos con carga estable y KPIs claros.',
  },
  {
    id: 'preview',
    label: 'Preview',
    lines: 1,
    tag: 'Contexto primero',
    desc: 'El agente ve la ficha completa del contacto antes de marcar y decide cuándo lanzar la llamada. Máximo control, cero sorpresas.',
    when: 'Cobranza VIP, ventas consultivas y cuentas delicadas.',
  },
];

const PIPELINE = [
  { Icon: HiOutlineQueueList, t: 'Lista', d: 'Carga de cartera o base de contactos desde tu core.' },
  { Icon: HiOutlineFunnel, t: 'Segmentación', d: 'Mejor hora de contacto + riesgo de morosidad por registro.' },
  { Icon: HiOutlinePhone, t: 'Motor de marcación', d: 'Predictivo o progresivo según la campaña y el compliance.' },
  { Icon: HiOutlineBanknotes, t: 'Resultado', d: 'Right-party contact, promesa de pago y disposición tipificada.' },
];

const COMPLIANCE = [
  { Icon: HiOutlineShieldCheck, t: 'TCPA & Ley 29733', d: 'Consentimiento, horarios permitidos y registro auditable de cada intento de contacto.' },
  { Icon: HiOutlineNoSymbol, t: 'DNC + opt-out', d: 'Cruce automático con listas Do-Not-Call y baja instantánea en cada marcación.' },
  { Icon: HiOutlineMicrophone, t: 'Grabación & QA', d: 'Contact Lens transcribe e indexa cada llamada para auditoría y calidad.' },
];

const METRICS = [
  { Icon: HiOutlineBolt, v: '3×', l: 'Tasa de contacto vs marcación manual' },
  { Icon: HiOutlineClock, v: '< 5 s', l: 'Tiempo de conexión agente-cliente' },
  { Icon: HiOutlineUserGroup, v: '+40%', l: 'Right-party contact efectivo' },
];

function DialerModeSelector() {
  const [active, setActive] = useState('predictivo');
  const mode = MODES.find((m) => m.id === active);

  return (
    <div className={styles.modeWrap}>
      <div className={styles.modeTabs} role="tablist" aria-label="Modos de marcación">
        {MODES.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={active === m.id}
            className={`${styles.modeTab} ${active === m.id ? styles.modeTabOn : ''}`}
            onClick={() => setActive(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div key={active} className={styles.modePanel}>
        <div className={styles.modeViz} aria-hidden="true">
          <div className={styles.modeAgent}>
            <HiOutlineUserGroup />
            <span>1 agente</span>
          </div>
          <div className={styles.modeLines}>
            {Array.from({ length: mode.lines }).map((_, i) => (
              <span
                key={i}
                className={styles.modeLine}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <HiOutlinePhone />
              </span>
            ))}
          </div>
          <span className={styles.modeRatio}>{mode.lines}:1 líneas</span>
        </div>
        <div className={styles.modeInfo}>
          <span className={styles.modeTag}>{mode.tag}</span>
          <h3 className={styles.modeTitle}>Modo {mode.label}</h3>
          <p className={styles.modeDesc}>{mode.desc}</p>
          <p className={styles.modeWhen}><strong>Cuándo:</strong> {mode.when}</p>
        </div>
      </div>
    </div>
  );
}

export default function ConnectDialerPage() {
  return (
    <>
      <Helmet>
        <title>Amazon Connect Dialer — Marcación predictiva y outbound | Novasys del Perú</title>
        <meta name="description" content="Marcador predictivo y campañas outbound sobre Amazon Connect: cobranza, telemarketing y encuestas con blending inbound/outbound, DNC automático y compliance TCPA + Ley 29733. AWS Advanced Partner en Lima." />
        <link rel="canonical" href="https://www.novasys.com.pe/cloud/connect-dialer" />
      </Helmet>

      {/* ===== Hero + consola del dialer ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.badge}><FaAws aria-hidden="true" /> AWS Advanced Partner</span>
          <span className={styles.eyebrow}>Cloud · Outbound</span>
          <h1 className={styles.heroTitle}>
            Marcá <em>3× más</em>, sin quemar tu cartera.
          </h1>
          <p className={styles.heroLede}>
            Motor de marcación predictiva sobre Amazon Connect. Campañas de cobranza, telemarketing
            y encuestas con blending inbound/outbound y compliance de fábrica.
          </p>
          <div className={styles.heroCtas}>
            <Magnetic strength={0.4}>
              <Button to="/contacto" variant="primary" size="lg">Analizar mi estrategia outbound</Button>
            </Magnetic>
            <Button to="/cloud/amazon-connect" variant="outline" size="lg">Ver Amazon Connect</Button>
          </div>
        </motion.div>

        <motion.div
          className={styles.console}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className={styles.consoleBar}>
            <span className={styles.consoleDot} />
            <span className={styles.consoleCampaign}>Campaña · Cobranza Q3</span>
            <span className={styles.consolePace}>Predictivo · 4:1</span>
          </div>
          <div className={styles.consoleRows}>
            {CALL_ROWS.map((r, i) => (
              <div key={r.num} className={styles.callRow} style={{ animationDelay: `${i * 0.25}s` }}>
                <span className={`${styles.callDot} ${styles[`dot_${r.tone}`]}`} />
                <span className={styles.callNum}>{r.num}</span>
                <span className={`${styles.callStatus} ${styles[`st_${r.tone}`]}`}>{r.status}</span>
              </div>
            ))}
          </div>
          <div className={styles.consoleFoot}>
            <span><b>1,240</b> llamadas/h</span>
            <span><b>34%</b> contacto</span>
            <span><b>58</b> en cola</span>
          </div>
        </motion.div>
        </div>
      </section>

      {/* ===== Selector de modos de marcación (interactivo) ===== */}
      <section className={styles.modes}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>El motor</span>
            <h2 className={styles.headTitle}>Cuatro formas de <em>marcar</em>. Elegís según la campaña.</h2>
            <p className={styles.headLede}>No es lo mismo cobrar una cartera masiva que llamar a una cuenta VIP. Cambiá de modo y mirá cómo se reparten las líneas por agente.</p>
          </div>
          <DialerModeSelector />
        </div>
      </section>

      {/* ===== Pipeline de campaña ===== */}
      <section className={styles.pipeline}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>De la lista a la promesa de pago</span>
            <h2 className={styles.headTitle}>Cómo corre una <em>campaña</em>.</h2>
          </div>
          <div className={styles.pipeFlow}>
            {PIPELINE.map((p, i) => (
              <motion.div
                key={p.t}
                className={styles.pipeStep}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <span className={styles.pipeNo}>0{i + 1}</span>
                <p.Icon className={styles.pipeIcon} aria-hidden="true" />
                <h3 className={styles.pipeTitle}>{p.t}</h3>
                <p className={styles.pipeDesc}>{p.d}</p>
                {i < PIPELINE.length - 1 && <HiOutlineArrowRight className={styles.pipeArrow} aria-hidden="true" />}
              </motion.div>
            ))}
          </div>
          <div className={styles.pipeGuard}>
            <HiOutlineNoSymbol aria-hidden="true" />
            <span>En cada paso: cruce con DNC, control de horario y opt-out instantáneo antes de marcar.</span>
          </div>
        </div>
      </section>

      {/* ===== Banda de métricas (imagen piso) ===== */}
      <section className={styles.band} style={{ backgroundImage: `url(${floorImg})` }}>
        <div className={styles.bandVeil} aria-hidden="true" />
        <div className={styles.bandInner}>
          <motion.h2
            className={styles.bandTitle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            Más contactos <em>útiles</em>, no solo más llamadas.
          </motion.h2>
          <div className={styles.bandStats}>
            {METRICS.map((m, i) => (
              <motion.div
                key={m.l}
                className={styles.bandStat}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <m.Icon className={styles.bandStatIcon} aria-hidden="true" />
                <span className={styles.bandStatVal}>{m.v}</span>
                <span className={styles.bandStatLbl}>{m.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Compliance (imagen outbound) ===== */}
      <section className={styles.compliance}>
        <div className={styles.compInner}>
          <motion.div
            className={styles.compVisual}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <img src={outboundImg} alt="Agente de campaña outbound gestionando múltiples canales" className={styles.compImg} loading="lazy" />
            <span className={styles.compImgTag}>Marcar rápido no puede costar una multa.</span>
          </motion.div>
          <div className={styles.compBody}>
            <span className={styles.sectionEyebrow}>Compliance de fábrica</span>
            <h2 className={styles.headTitle}>Velocidad <em>con regla</em>.</h2>
            <p className={styles.headLede}>El outbound peruano se juega en el detalle regulatorio. Lo construimos dentro del flujo, no como parche posterior.</p>
            <div className={styles.compList}>
              {COMPLIANCE.map((c, i) => (
                <motion.div
                  key={c.t}
                  className={styles.compItem}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <c.Icon className={styles.compIcon} aria-hidden="true" />
                  <div>
                    <h3 className={styles.compItemTitle}>{c.t}</h3>
                    <p className={styles.compItemDesc}>{c.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Casos ===== */}
      <RelatedCases
        label="Capítulo 04 · Casos outbound"
        title={<>Campañas que ya corren sobre <em>esta arquitectura</em>.</>}
        slugs={['entel', 'americatel']}
      />

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿Tu cartera necesita <em>marcación masiva</em>?</>}
        subtitle="Revisamos tu estrategia outbound actual y te devolvemos un diseño de campaña con proyección de contact rate y compliance — en 48 h."
        primaryCta={{ to: '/contacto', text: 'Analizar mi outbound' }}
        secondaryCta={{ href: 'tel:+5116433467', text: 'Llamar ahora' }}
        trust={['AWS Advanced Partner', 'Compliance TCPA + Ley 29733', 'Análisis en 48 h']}
      />
    </>
  );
}
