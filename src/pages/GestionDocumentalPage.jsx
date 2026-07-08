import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineDocumentArrowUp,
  HiOutlineMagnifyingGlass,
  HiOutlineSquares2X2,
  HiOutlineCheckBadge,
  HiOutlineArchiveBox,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';
import { SiSap, SiOracle } from 'react-icons/si';
import { Button } from '../design-system';
import Magnetic from '../components/interactive/Magnetic';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import docsImg from '../img/ecm/docs.jpg';
import redfoldersImg from '../img/ecm/redfolders.jpg';
import archiveImg from '../img/ecm/archive.jpg';
import digitalImg from '../img/ecm/digital.jpg';
import styles from './GestionDocumentalPage.module.css';

const SCAN_LINES = [92, 78, 86, 64, 88, 72, 81, 58];
const SCAN_FIELDS = [
  { k: 'Tipo', v: 'Contrato de servicio' },
  { k: 'Fecha', v: '07 · 2026' },
  { k: 'Firma', v: 'Válida · Reniec' },
  { k: 'Estado', v: 'Indexado ✓' },
];

const STAGES = [
  { key: 'captura', Icon: HiOutlineDocumentArrowUp, title: 'Captura', dur: 'Entrada', desc: 'Escaneo masivo o carga digital: cada documento entra con su metadata reconocida desde el primer segundo.', tools: ['Escáner enterprise', 'Email', 'Mobile', 'Plugin Outlook'] },
  { key: 'ocr', Icon: HiOutlineMagnifyingGlass, title: 'OCR & indexación', dur: 'Automático', desc: 'Reconocimiento full-text y extracción de campos — todo queda buscable en segundos, no en horas.', tools: ['OCR', 'Búsqueda full-text', 'Metadata'] },
  { key: 'clasif', Icon: HiOutlineSquares2X2, title: 'Clasificación', dur: 'Reglas + ML', desc: 'Reglas y machine learning clasifican por tipo documental y aplican la estructura de carpetas correcta.', tools: ['ELO ECM', 'Auto-tag', 'Estructura'] },
  { key: 'aprob', Icon: HiOutlineCheckBadge, title: 'Aprobación', dur: 'Workflow', desc: 'Workflows BPMN con SLAs, escalamientos y delegaciones — con firma digital válida ante Reniec.', tools: ['BPMN', 'Firma digital', 'SLAs'] },
  { key: 'retencion', Icon: HiOutlineArchiveBox, title: 'Retención & auditoría', dur: 'Compliance', desc: 'Política de retención por tipo documental, con auditoría completa y destrucción programada. Defendible ante Sunat o Sunafil.', tools: ['Retención legal', 'Auditoría', 'Compliance'] },
];

// Scanner de documento animado (hero) — beam que barre + campos que se extraen.
function DocScanner() {
  return (
    <div className={styles.scanner} aria-hidden="true">
      <div className={styles.scanPaper}>
        <div className={styles.scanBadge}>DOC · 0001</div>
        <div className={styles.scanHeadline} />
        {SCAN_LINES.map((w, i) => (
          <div key={i} className={styles.scanTxt} style={{ width: `${w}%` }} />
        ))}
        <div className={styles.scanBeam} />
      </div>
      <div className={styles.scanFields}>
        <span className={styles.scanFieldsLabel}>Campos extraídos</span>
        {SCAN_FIELDS.map((f, i) => (
          <div key={f.k} className={styles.scanField} style={{ animationDelay: `${i * 0.9}s` }}>
            <span className={styles.scanFieldK}>{f.k}</span>
            <span className={styles.scanFieldV}>{f.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Workflow vertical acordeón interactivo — la etapa activa se expande; token de doc desciende.
function WorkflowFlow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 4000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className={styles.flow} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {STAGES.map((s, i) => (
        <div
          key={s.key}
          className={`${styles.stage} ${i === active ? styles.stageActive : ''} ${i < active ? styles.stageDone : ''}`}
        >
          <div className={styles.stageRail}>
            <button type="button" className={styles.stageNode} onClick={() => setActive(i)} aria-label={s.title}>
              <s.Icon aria-hidden="true" />
            </button>
            {i < STAGES.length - 1 && <span className={styles.stageLine} aria-hidden="true" />}
          </div>
          <div className={styles.stageBody}>
            <button type="button" className={styles.stageHead} onClick={() => setActive(i)} aria-expanded={i === active}>
              <span className={styles.stageNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.stageTitle}>{s.title}</span>
              <span className={styles.stageDur}>{s.dur}</span>
            </button>
            {i === active && (
              <div className={styles.stageDetail}>
                <p className={styles.stageDesc}>{s.desc}</p>
                <div className={styles.stageTools}>
                  {s.tools.map((tl) => <span key={tl} className={styles.stageTool}>{tl}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const FILM = [
  { img: docsImg, cap: 'Antes: el papel que nadie encuentra.' },
  { img: redfoldersImg, cap: 'Orden por tipo documental.' },
  { img: archiveImg, cap: 'Del archivo físico…' },
  { img: digitalImg, cap: '…al expediente digital, buscable y auditable.' },
];

export default function GestionDocumentalPage() {
  return (
    <>
      <Helmet>
        <title>Gestión Documental (ELO ECM) — Digitaliza y ordena | Novasys del Perú</title>
        <meta name="description" content="Digitalización y gestión documental con ELO ECM: captura masiva, OCR full-text, workflows BPMN, firma digital y retención legal auditable. Integrado con SAP y Oracle. Compliance defendible ante Sunat y Sunafil." />
        <link rel="canonical" href="https://www.novasys.com.pe/soluciones/gestion-documental" />
      </Helmet>

      {/* ===== Hero centrado + scanner animado ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.badge}><HiOutlineShieldCheck aria-hidden="true" /> ELO ECM Certified Partner</span>
            <h1 className={styles.heroTitle}>
              Del papel al <em>expediente digital</em>.
            </h1>
            <p className={styles.heroLede}>
              Digitalizamos, ordenamos y automatizamos tu gestión documental con ELO ECM:
              búsqueda en segundos, workflows con firma digital y retención legal auditable.
            </p>
            <div className={styles.heroCtas}>
              <Magnetic strength={0.4}>
                <Button to="/contacto" variant="primary" size="lg">Digitalizar mi operación</Button>
              </Magnetic>
              <Button to="/casos-de-exito" variant="outline" size="lg">Ver casos</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <DocScanner />
          </motion.div>
        </div>
      </section>

      {/* ===== Workflow vertical interactivo ===== */}
      <section className={styles.flowSection}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>El recorrido de un documento</span>
            <h2 className={styles.headTitle}>De la bandeja de entrada al <em>archivo legal</em>.</h2>
            <p className={styles.headLede}>Seguí el camino de un documento por el sistema. Tocá una etapa o dejá que avance.</p>
          </div>
          <WorkflowFlow />
        </div>
      </section>

      {/* ===== Integraciones + compliance (layout propio) ===== */}
      <section className={styles.compliance}>
        <div className={styles.wrap}>
          <div className={styles.compGrid}>
            <div className={styles.compText}>
              <span className={styles.sectionEyebrow}>Defendible</span>
              <h2 className={styles.headTitle}>Compliance que <em>resiste una auditoría</em>.</h2>
              <p className={styles.compDesc}>
                Cada documento con trazabilidad completa, versionado y política de retención por tipo.
                Se integra con tu core para que la fuente de verdad sea una sola.
              </p>
              <div className={styles.integra}>
                <span className={styles.integraLabel}>Se integra con</span>
                <div className={styles.integraLogos}>
                  <span className={styles.integraItem}><SiSap aria-hidden="true" /> SAP</span>
                  <span className={styles.integraItem}><SiOracle aria-hidden="true" /> Oracle EBS</span>
                  <span className={styles.integraItem}><HiOutlineShieldCheck aria-hidden="true" /> Firma digital</span>
                </div>
              </div>
            </div>
            <ul className={styles.compList}>
              {[
                'Trazabilidad y auditoría completa de cada acción',
                'Versionado con historial inmutable',
                'Retención legal por tipo documental',
                'Destrucción programada y certificada',
                'SSO corporativo + control de acceso por rol',
                'Cumplimiento SBS · Sunat · Ley de Protección de Datos',
              ].map((c) => (
                <li key={c} className={styles.compItem}><span className={styles.compCheck} aria-hidden="true" />{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Filmstrip horizontal ===== */}
      <section className={styles.filmSection}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Antes / después</span>
            <h2 className={styles.headTitle}>La misma información, <em>otra vida</em>.</h2>
          </div>
        </div>
        <div className={styles.film}>
          {FILM.map((f, i) => (
            <figure key={i} className={styles.frame}>
              <img src={f.img} alt={f.cap} loading="lazy" />
              <figcaption>{f.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿Cuántas <em>horas-persona</em> se van buscando archivos?</>}
        subtitle="Calculamos en 30 minutos el ROI de digitalizar tu gestión documental con ELO — con flujos reales de tu sector."
        primaryCta={{ to: '/contacto', text: 'Calcular mi ROI' }}
        secondaryCta={{ to: '/casos-de-exito', text: 'Ver casos de éxito' }}
        trust={['ELO Certified Partner', 'Compliance auditable', 'Equipo propio · Lima']}
      />
    </>
  );
}
