import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineBolt,
  HiOutlineEnvelope,
  HiOutlineDevicePhoneMobile,
  HiOutlineBellAlert,
  HiOutlineShoppingBag,
  HiOutlineGlobeAlt,
} from 'react-icons/hi2';
import { SiOracle, SiWhatsapp } from 'react-icons/si';
import { Button } from '../design-system';
import Magnetic from '../components/interactive/Magnetic';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import customerImg from '../img/marketing/customer.jpg';
import deviceImg from '../img/marketing/device.jpg';
import styles from './MarketingAutomationPage.module.css';

const JOURNEY = [
  { Icon: HiOutlineBolt, label: 'Trigger', sub: 'nuevo lead' },
  { Icon: HiOutlineEnvelope, label: 'Email', sub: 'bienvenida' },
  { Icon: HiOutlineDevicePhoneMobile, label: 'SMS', sub: 'recordatorio' },
  { Icon: SiWhatsapp, label: 'WhatsApp', sub: 'oferta' },
  { Icon: HiOutlineBellAlert, label: 'Push', sub: 're-engage' },
  { Icon: HiOutlineShoppingBag, label: 'Convierte', sub: 'compra' },
];

const CRITERIA = [
  { key: 'compro', label: 'Compró últimos 30d', factor: 0.44 },
  { key: 'abrio', label: 'Abrió último email', factor: 0.58 },
  { key: 'carrito', label: 'Carrito abandonado', factor: 0.22 },
  { key: 'rfm', label: 'Alto valor (RFM)', factor: 0.35 },
  { key: 'lima', label: 'Región: Lima', factor: 0.62 },
  { key: 'mobile', label: 'Abre en mobile', factor: 0.74 },
];
const BASE = 48200;

const MESSAGES = [
  { ch: 'Email', Icon: HiOutlineEnvelope, txt: 'Ana, completá tu compra y llevate 15% off hoy.' },
  { ch: 'WhatsApp', Icon: SiWhatsapp, txt: '¡Tu pedido está en camino! 📦 Seguilo acá.' },
  { ch: 'Push', Icon: HiOutlineBellAlert, txt: 'Volvió tu talla favorita — quedan pocas.' },
];

const CHANNELS = [
  { Icon: HiOutlineEnvelope, l: 'Email' },
  { Icon: HiOutlineDevicePhoneMobile, l: 'SMS' },
  { Icon: SiWhatsapp, l: 'WhatsApp' },
  { Icon: HiOutlineBellAlert, l: 'Push' },
  { Icon: HiOutlineGlobeAlt, l: 'Web' },
];

// Constructor de segmentos interactivo — togglear criterios reduce la audiencia en vivo.
function SegmentBuilder() {
  const [active, setActive] = useState({});
  const toggle = (k) => setActive((a) => ({ ...a, [k]: !a[k] }));
  const audience = Math.round(CRITERIA.reduce((n, c) => (active[c.key] ? n * c.factor : n), BASE));
  const filled = Math.max(1, Math.round((audience / BASE) * 120));

  return (
    <div className={styles.segment}>
      <div className={styles.segCriteria}>
        <span className={styles.segCriteriaLabel}>Agregá condiciones</span>
        {CRITERIA.map((c) => (
          <button
            key={c.key}
            type="button"
            className={`${styles.segChip} ${active[c.key] ? styles.segChipOn : ''}`}
            onClick={() => toggle(c.key)}
            aria-pressed={!!active[c.key]}
          >
            <span className={styles.segChipMark} aria-hidden="true">{active[c.key] ? '✓' : '+'}</span>
            {c.label}
          </button>
        ))}
      </div>

      <div className={styles.segResult}>
        <span className={styles.segLabel}>Audiencia estimada</span>
        <span key={audience} className={styles.segCount}>{audience.toLocaleString('es-PE')}</span>
        <span className={styles.segSub}>de {BASE.toLocaleString('es-PE')} contactos</span>
        <div className={styles.segDots} aria-hidden="true">
          {Array.from({ length: 120 }).map((_, i) => (
            <span key={i} className={`${styles.segDot} ${i < filled ? styles.segDotOn : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MarketingAutomationPage() {
  return (
    <>
      <Helmet>
        <title>Marketing Automation (Oracle Responsys) — Novasys del Perú</title>
        <meta name="description" content="Marketing automation con Oracle Responsys y Eloqua: customer journeys omnicanal (email, SMS, WhatsApp, push), segmentación avanzada, lead scoring y A/B testing. Campañas personalizadas que escalan y se miden." />
        <link rel="canonical" href="https://www.novasys.com.pe/soluciones/marketing-automation" />
      </Helmet>

      {/* ===== Hero centrado + journey ribbon animado ===== */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.badge}>Oracle Responsys · Eloqua Partner</span>
          <h1 className={styles.heroTitle}>
            Un mensaje para <em>cada persona</em>, a escala.
          </h1>
          <p className={styles.heroLede}>
            Customer journeys omnicanal que corren solos: el mensaje correcto, en el canal correcto,
            en el momento correcto — y todo medido al centavo.
          </p>
          <div className={styles.heroCtas}>
            <Magnetic strength={0.4}>
              <Button to="/contacto" variant="primary" size="lg">Automatizar mi marketing</Button>
            </Magnetic>
            <Button to="/casos-de-exito" variant="outline" size="lg">Ver casos</Button>
          </div>
        </motion.div>

        <div className={styles.ribbon} aria-hidden="true">
          <div className={styles.ribbonTrack}>
            {JOURNEY.map((n, i) => (
              <div key={n.label} className={styles.ribbonStep}>
                <span className={styles.ribbonNode}><n.Icon /></span>
                <span className={styles.ribbonLabel}>{n.label}</span>
                <span className={styles.ribbonSub}>{n.sub}</span>
                {i < JOURNEY.length - 1 && <span className={styles.ribbonConn} />}
              </div>
            ))}
            <span className={styles.ribbonContact} />
          </div>
        </div>
      </section>

      {/* ===== Segment builder interactivo ===== */}
      <section className={styles.segSection}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Segmentación</span>
            <h2 className={styles.headTitle}>Armá tu <em>audiencia</em> — mirá cómo se afina.</h2>
            <p className={styles.headLede}>Cada condición recorta la lista. Tocá las que quieras y observá la audiencia en vivo.</p>
          </div>
          <SegmentBuilder />
        </div>
      </section>

      {/* ===== Personalización showcase (imágenes + cards flotantes) ===== */}
      <section className={styles.perso}>
        <div className={styles.persoInner}>
          <div className={styles.persoVisual}>
            <img src={customerImg} alt="Cliente recibiendo un mensaje personalizado" className={styles.persoImgA} loading="lazy" />
            <img src={deviceImg} alt="Notificación en el dispositivo" className={styles.persoImgB} loading="lazy" />
          </div>
          <div className={styles.persoText}>
            <span className={styles.sectionEyebrow}>Personalización</span>
            <h2 className={styles.headTitle}>Se siente <em>escrito a mano</em>, aunque salga a 100.000.</h2>
            <div className={styles.persoCards}>
              {MESSAGES.map((m, i) => (
                <motion.div
                  key={m.ch}
                  className={styles.persoCard}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  <span className={styles.persoCardCh}><m.Icon aria-hidden="true" /> {m.ch}</span>
                  <span className={styles.persoCardTxt}>{m.txt}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Canales + stack ===== */}
      <section className={styles.channels}>
        <div className={styles.wrap}>
          <div className={styles.chGrid}>
            <div>
              <span className={styles.sectionEyebrow}>Omnicanal</span>
              <div className={styles.chList}>
                {CHANNELS.map((c) => (
                  <span key={c.l} className={styles.chItem}><c.Icon aria-hidden="true" />{c.l}</span>
                ))}
              </div>
            </div>
            <div>
              <span className={styles.sectionEyebrow}>Plataforma</span>
              <div className={styles.chList}>
                <span className={styles.chItem}><SiOracle aria-hidden="true" /> Responsys</span>
                <span className={styles.chItem}><SiOracle aria-hidden="true" /> Eloqua</span>
                <span className={styles.chItem}><SiOracle aria-hidden="true" /> BlueKai (DMP)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿Seguís mandando <em>el mismo email</em> a toda la base?</>}
        subtitle="Diagnosticamos en 30 minutos cómo segmentar y automatizar tu base actual — con un journey real de tu sector."
        primaryCta={{ to: '/contacto', text: 'Agendar diagnóstico' }}
        secondaryCta={{ to: '/casos-de-exito', text: 'Ver casos de éxito' }}
        trust={['Oracle Responsys Partner', 'Journey a medida', 'Equipo propio · Lima']}
      />
    </>
  );
}
