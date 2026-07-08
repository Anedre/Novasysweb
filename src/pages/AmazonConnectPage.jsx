import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineChartBar,
  HiOutlineArrowsRightLeft,
  HiOutlineGlobeAlt,
  HiOutlineBolt,
} from 'react-icons/hi2';
import { FaAws, FaHeadset, FaPhone, FaComments, FaRobot, FaMicrophone } from 'react-icons/fa6';
import { SiAwslambda, SiAmazondynamodb, SiWhatsapp } from 'react-icons/si';
import { Button } from '../design-system';
import TiltCard from '../components/interactive/TiltCard';
import Magnetic from '../components/interactive/Magnetic';
import RelatedCases from '../components/sections/RelatedCases/RelatedCases';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import agentImg from '../img/connect/agent.jpg';
import agent2Img from '../img/connect/agent2.jpg';
import customerImg from '../img/connect/customer.jpg';
import styles from './AmazonConnectPage.module.css';

const KPIS = [
  { value: '99.99%', label: 'SLA de Amazon' },
  { value: 'Omnicanal', label: 'Voz · chat · WhatsApp · web' },
  { value: 'Pay-per-use', label: 'Sin licencias fijas' },
];

const CAPS = [
  { Icon: FaHeadset, title: 'Omnicanalidad real', desc: 'Voz, chat, SMS, WhatsApp y web en un mismo journey del cliente — sin islas.' },
  { Icon: FaRobot, title: 'IVR con IA (Lex)', desc: 'Amazon Lex entiende la intención y deriva a la cola correcta, sin menús eternos.' },
  { Icon: HiOutlineChartBar, title: 'Analytics en vivo', desc: 'Contact Lens con sentimiento, adherencia y transcripción automática para QA.' },
  { Icon: HiOutlineArrowsRightLeft, title: 'Integración CRM', desc: 'Salesforce, Oracle o API custom — el agente ve al cliente completo desde el saludo.' },
];

const CHANNELS = [
  { key: 'voz', Icon: FaPhone, label: 'Voz', note: 'La llamada entra a Amazon Connect, Lex identifica la intención por voz y rutea al agente con el skill correcto — con el contexto del cliente ya cargado.' },
  { key: 'chat', Icon: FaComments, label: 'Chat', note: 'El bot resuelve lo simple 24/7 y hace handoff al agente con todo el historial cuando de verdad hace falta un humano.' },
  { key: 'whatsapp', Icon: SiWhatsapp, label: 'WhatsApp', note: 'Canal oficial de WhatsApp Business integrado: el cliente escribe donde ya está, el agente responde desde la misma consola.' },
  { key: 'web', Icon: HiOutlineGlobeAlt, label: 'Web', note: 'Click-to-call y chat embebido en tu web o app — sin números 0800 ni fricción para el cliente.' },
];

const FLOW = [
  { Icon: FaHeadset, label: 'Canales', sub: 'voz · chat · WhatsApp' },
  { Icon: FaAws, label: 'Amazon Connect', sub: 'contact center' },
  { Icon: FaRobot, label: 'Amazon Lex', sub: 'IVR · IA' },
  { Icon: SiAwslambda, label: 'AWS Lambda', sub: 'lógica de ruteo' },
  { Icon: SiAmazondynamodb, label: 'DynamoDB', sub: 'datos del cliente' },
  { Icon: FaMicrophone, label: 'Contact Lens', sub: 'analytics · QA' },
];

const CALLS = [
  { Icon: FaPhone, from: 'Cliente · Lima', st: 'En cola', tone: 'wait' },
  { Icon: SiWhatsapp, from: 'WhatsApp · +51 9··', st: 'Con bot (Lex)', tone: 'bot' },
  { Icon: FaComments, from: 'Chat · web', st: 'Agente 04', tone: 'live' },
  { Icon: FaPhone, from: 'Cliente · Arequipa', st: 'Resuelta', tone: 'done' },
];

// Consola "en vivo" del hero — métricas que laten + lista de llamadas.
function LiveConsole() {
  const [q, setQ] = useState(7);
  const [agents, setAgents] = useState(12);
  useEffect(() => {
    const id = setInterval(() => {
      setQ((v) => Math.max(2, Math.min(14, v + (Math.round(Math.random() * 2) - 1))));
      setAgents((v) => Math.max(8, Math.min(18, v + (Math.round(Math.random() * 2) - 1))));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.console} aria-hidden="true">
      <div className={styles.consoleHead}>
        <span className={styles.liveDot} /> EN VIVO · Contact Center
        <span className={styles.consoleTag}>AWS</span>
      </div>
      <div className={styles.consoleMetrics}>
        <div><span className={styles.cmVal}>{q}</span><span className={styles.cmLbl}>En cola</span></div>
        <div><span className={styles.cmVal}>{agents}</span><span className={styles.cmLbl}>Agentes activos</span></div>
        <div><span className={styles.cmVal}>0:14</span><span className={styles.cmLbl}>Espera prom.</span></div>
      </div>
      <div className={styles.consoleList}>
        {CALLS.map((c, i) => (
          <div key={i} className={styles.callRow} style={{ animationDelay: `${i * 0.8}s` }}>
            <span className={styles.callIcon}><c.Icon aria-hidden="true" /></span>
            <span className={styles.callFrom}>{c.from}</span>
            <span className={`${styles.callSt} ${styles[`tone_${c.tone}`]}`}>{c.st}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Router de canales interactivo — click un canal para ver su journey (robusto: div key-eado + CSS).
function ChannelRouter() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % CHANNELS.length), 3800);
    return () => clearInterval(id);
  }, [paused]);

  const ch = CHANNELS[active];

  return (
    <div className={styles.router} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={styles.chTabs}>
        {CHANNELS.map((c, i) => (
          <button
            key={c.key}
            type="button"
            className={`${styles.chTab} ${i === active ? styles.chTabActive : ''}`}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
          >
            <c.Icon aria-hidden="true" /> {c.label}
          </button>
        ))}
      </div>

      <div key={active} className={styles.chFlow}>
        <div className={styles.chFlowRow}>
          <span className={`${styles.chNode} ${styles.chNodeIn}`}><ch.Icon aria-hidden="true" /><b>{ch.label}</b></span>
          <span className={styles.chArrow} aria-hidden="true" />
          <span className={styles.chNode}><FaAws aria-hidden="true" /><b>Connect</b></span>
          <span className={styles.chArrow} aria-hidden="true" />
          <span className={styles.chNode}><FaRobot aria-hidden="true" /><b>Lex</b></span>
          <span className={styles.chArrow} aria-hidden="true" />
          <span className={`${styles.chNode} ${styles.chNodeOut}`}><FaHeadset aria-hidden="true" /><b>Agente</b></span>
        </div>
        <p className={styles.chNote}>{ch.note}</p>
      </div>
    </div>
  );
}

export default function AmazonConnectPage() {
  return (
    <>
      <Helmet>
        <title>Amazon Connect — Contact center cloud con IA | Novasys del Perú</title>
        <meta name="description" content="Contact center 100% cloud en AWS: omnicanalidad (voz, chat, WhatsApp), IVR con IA (Amazon Lex), analytics en vivo con Contact Lens y escalabilidad pay-per-use. AWS Advanced Partner en Lima." />
        <link rel="canonical" href="https://www.novasys.com.pe/cloud/amazon-connect" />
      </Helmet>

      {/* ===== Hero · consola en vivo ===== */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.badge}><FaAws aria-hidden="true" /> AWS Advanced Partner</span>
            <span className={styles.eyebrow}>Cloud · Contact Center</span>
            <h1 className={styles.heroTitle}>
              Tu contact center, <em>sin fierros</em>.
            </h1>
            <p className={styles.heroLede}>
              Amazon Connect: atención omnicanal con IA que escala sola en cada campaña —
              voz, chat y WhatsApp en una sola consola, sin licencias ni servidores.
            </p>
            <div className={styles.heroCtas}>
              <Magnetic strength={0.4}>
                <Button to="/contacto" variant="primary" size="lg">Evaluar mi contact center</Button>
              </Magnetic>
              <Button to="/cloud" variant="outline" size="lg">Ver más de Cloud</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <LiveConsole />
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
              <span className={styles.kpiValue}>{k.value}</span>
              <span className={styles.kpiLabel}>{k.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Capacidades · tilt ===== */}
      <section className={styles.caps}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Capacidades</span>
            <h2 className={styles.headTitle}>Un contact center que <em>piensa</em>.</h2>
          </div>
          <div className={styles.capGrid}>
            {CAPS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              >
                <TiltCard className={styles.capCard} max={8}>
                  <c.Icon className={styles.capIcon} aria-hidden="true" />
                  <h3 className={styles.capTitle}>{c.title}</h3>
                  <p className={styles.capDesc}>{c.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Router de canales interactivo ===== */}
      <section className={styles.routerSection}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Ruteo omnicanal</span>
            <h2 className={styles.headTitle}>Elegí un canal y seguí la <em>llamada</em>.</h2>
            <p className={styles.headLede}>Cada canal entra al mismo cerebro — Connect + Lex — y sale al agente correcto. Tocá un canal o dejá que rote.</p>
          </div>
          <ChannelRouter />
        </div>
      </section>

      {/* ===== Arquitectura AWS con logos ===== */}
      <section className={styles.arch}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Arquitectura AWS</span>
            <h2 className={styles.headTitle}>Serverless de punta a punta.</h2>
            <p className={styles.headLede}>Sin hardware que provisionar: cada servicio escala solo y pagás por uso.</p>
          </div>
          <div className={styles.flow}>
            {FLOW.map((n, i) => (
              <div key={n.label} className={styles.flowItem}>
                <div className={styles.flowNode}>
                  <n.Icon className={styles.flowIcon} aria-hidden="true" />
                  <span className={styles.flowLabel}>{n.label}</span>
                  <span className={styles.flowSub}>{n.sub}</span>
                </div>
                {i < FLOW.length - 1 && (
                  <span className={styles.flowConn} aria-hidden="true">
                    <span className={styles.flowDot} style={{ animationDelay: `${i * 0.4}s` }} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Glimpse (fotos) ===== */}
      <section className={styles.glimpse}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>De cerca</span>
            <h2 className={styles.headTitle}>Personas atendiendo <em>personas</em>.</h2>
          </div>
          <div className={styles.glimpseGrid}>
            <motion.figure className={styles.gA} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}>
              <img src={agentImg} alt="Agente de contact center con headset atendiendo" loading="lazy" />
              <figcaption>El agente, con el cliente entero a la vista.</figcaption>
            </motion.figure>
            <motion.figure className={styles.gB} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.1 }}>
              <img src={customerImg} alt="Cliente contactando por su smartphone" loading="lazy" />
              <figcaption>El cliente escribe donde ya está.</figcaption>
            </motion.figure>
            <motion.figure className={styles.gC} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.2 }}>
              <img src={agent2Img} alt="Agente de soporte en operación" loading="lazy" />
              <figcaption>Sin fierros: la operación vive en AWS.</figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ===== Casos ===== */}
      <RelatedCases
        label="Capítulo 05 · Casos"
        title={<>Contact centers que <em>ya operan</em> en Amazon Connect.</>}
        slugs={['entel', 'americatel', 'interbank']}
      />

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿Tu contact center <em>saturado</em>?</>}
        subtitle="Evaluamos tu escenario y te devolvemos una arquitectura + TCO comparativo vs. tu solución actual en 48 h."
        primaryCta={{ to: '/contacto', text: 'Evaluar mi contact center' }}
        secondaryCta={{ href: 'tel:+5116433467', text: 'Llamar ahora' }}
        trust={['AWS Advanced Partner', 'TCO en 48 h', 'Equipo propio · Lima']}
      />
    </>
  );
}
