import { Fragment, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineShieldCheck,
  HiOutlineSquares2X2,
  HiOutlineBolt,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { Button } from '../design-system';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import RelatedCases from '../components/sections/RelatedCases/RelatedCases';
import ShinyText from '../components/interactive/ShinyText';
import styles from './CloudPage.module.css';

// Malla de nodos AWS 3D — lazy para code-split de three.js (solo carga en esta ruta).
const CloudNodes3D = lazy(() => import('../components/three/CloudNodes3D'));

// Flujo de referencia del contact center cloud (nodos del diagrama animado del hero).
const NODES = [
  { label: 'Cliente', sub: 'voz · chat · web' },
  { label: 'Amazon Connect', sub: 'contact center' },
  { label: 'Amazon Lex', sub: 'IVR · IA' },
  { label: 'AWS Lambda', sub: 'serverless' },
  { label: 'DynamoDB', sub: 'datos' },
];

const servicios = [
  {
    no: '01',
    cat: 'Contact Center',
    title: 'Amazon Connect',
    desc: 'Contact center cloud con IA. Omnicanalidad, IVR inteligente, analytics en tiempo real y escalabilidad automática.',
    features: ['Omnicanal', 'IA / ML', 'Pay-per-use', 'Escalable'],
    path: '/cloud/amazon-connect',
  },
  {
    no: '02',
    cat: 'Outbound',
    title: 'Connect Dialer',
    desc: 'Marcación predictiva y campañas outbound sobre Amazon Connect. Cobranza, telemarketing y encuestas con compliance TCPA.',
    features: ['Predictivo', 'Blending', 'DNC / TCPA', 'Cobranza'],
    path: '/cloud/connect-dialer',
  },
  {
    no: '03',
    cat: 'Migración',
    title: 'Migración cloud',
    desc: 'Migra tu infraestructura on-premise a AWS sin interrupciones. Assessment, planning, ejecución y optimización.',
    features: ['Assessment', 'Re-platform', 'Re-architect', 'FinOps'],
    path: '/cloud/migracion',
  },
  {
    no: '04',
    cat: 'Machine Learning',
    title: 'IA & Machine Learning',
    desc: 'Modelos en producción sobre AWS: entrenamiento con SageMaker, IA generativa con Bedrock y MLOps para mantenerlos vivos.',
    features: ['SageMaker', 'Bedrock', 'MLOps', 'Serverless'],
    path: '/cloud/sagemaker',
  },
];

const stack = [
  { label: 'Amazon Connect', color: '#F5A623' },
  { label: 'AWS Lambda', color: '#F5A623' },
  { label: 'Kinesis Data Streams', color: '#F5A623' },
  { label: 'DynamoDB', color: '#F5A623' },
  { label: 'CloudWatch', color: '#F5A623' },
  { label: 'Amazon Lex', color: '#F5A623' },
  { label: 'Terraform', color: '#3B82F6' },
  { label: 'CI/CD · GitHub Actions', color: '#E11D2A' },
];

const notes = [
  'Multi-región con failover activo-pasivo (us-east-1 / us-west-2).',
  'Infraestructura 100% como código (Terraform + módulos internos).',
  'Well-Architected Review anual como AWS Advanced Partner.',
  'Observabilidad end-to-end con CloudWatch + X-Ray.',
];

const ventajas = [
  { icon: HiOutlineShieldCheck, title: 'AWS Advanced Partner', desc: 'Acceso directo a soporte y recursos exclusivos de Amazon Web Services.' },
  { icon: HiOutlineSquares2X2, title: 'Well-Architected', desc: 'Diseñamos siguiendo el AWS Well-Architected Framework para máxima confiabilidad.' },
  { icon: HiOutlineBolt, title: 'Pay-per-use', desc: 'Solo pagas por lo que usas. Optimizamos costos desde el diseño de la arquitectura.' },
  { icon: HiOutlineChartBar, title: 'Monitoreo 24/7', desc: 'Dashboards de CloudWatch y alertas proactivas para tu infraestructura.' },
];

export default function CloudPage() {
  return (
    <>
      <Helmet>
        <title>Cloud AWS — Novasys del Perú</title>
        <meta name="description" content="Servicios Amazon Web Services: Amazon Connect, migración cloud y arquitectura serverless. AWS Advanced Partner, operado desde Lima." />
        <link rel="canonical" href="https://www.novasys.com.pe/cloud" />
      </Helmet>

      {/* ===== Hero + diagrama de arquitectura animado ===== */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className={styles.badge}><ShinyText speed={4}>◆ AWS Advanced Partner</ShinyText></span>
            <span className={styles.eyebrow}>Cloud · AWS</span>
            <h1 className={styles.heroTitle}>
              La nube que <em>sostiene</em> tu operación.
            </h1>
            <p className={styles.heroLede}>
              Contact centers con IA, migración sin interrupciones y arquitecturas serverless.
              Todo el poder de AWS, implementado y operado por un equipo local.
            </p>
            <div className={styles.heroCtas}>
              <Button to="/contacto" variant="primary" size="lg">Consultoría cloud</Button>
              <Button to="/cloud/amazon-connect" variant="outline" size="lg">Ver Amazon Connect</Button>
            </div>
          </motion.div>

          <div
            className={styles.diagram}
            role="img"
            aria-label="Flujo de arquitectura AWS: Cliente, Amazon Connect, Amazon Lex, AWS Lambda, DynamoDB"
          >
            {NODES.map((n, i) => (
              <Fragment key={n.label}>
                <div className={styles.node}>
                  <span className={styles.nodeDot} />
                  <span className={styles.nodeLabel}>{n.label}</span>
                  <span className={styles.nodeSub}>{n.sub}</span>
                </div>
                {i < NODES.length - 1 && (
                  <div className={styles.connector} aria-hidden="true">
                    <span className={styles.flowDot} style={{ animationDelay: `${i * 0.5}s` }} />
                    <span className={styles.flowDot} style={{ animationDelay: `${i * 0.5 + 1.3}s` }} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <span className={styles.diagramCaption}>Flujo de referencia · contact center AWS · datos en vivo</span>
        </div>
      </section>

      {/* ===== Servicios ===== */}
      <section className={styles.servicios}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Servicios</span>
            <h2 className={styles.headTitle}>
              Tres pilares <em>cloud</em>.
            </h2>
            <p className={styles.headLede}>
              Del contact center al datacenter serverless — cubrimos el stack AWS completo.
            </p>
          </div>
          <div className={styles.servGrid}>
            {servicios.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link to={s.path} className={styles.servCard}>
                  <span className={styles.servNo}>{s.no} · {s.cat.toUpperCase()}</span>
                  <h3 className={styles.servTitle}>{s.title}</h3>
                  <p className={styles.servDesc}>{s.desc}</p>
                  <div className={styles.servFeatures}>
                    {s.features.map((f) => (
                      <span key={f} className={styles.servFeature}>{f}</span>
                    ))}
                  </div>
                  <span className={styles.servLink}>
                    Ver servicio
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Arquitectura de referencia ===== */}
      <section className={styles.arquitectura}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Arquitectura</span>
            <h2 className={styles.headTitle}>
              Cómo se <em>ve por dentro</em>.
            </h2>
            <p className={styles.headLede}>
              Arquitectura de referencia probada en despliegues de banca, telco y retail peruano.
            </p>
          </div>
          <div className={styles.arqGrid}>
            <div>
              <span className={styles.arqLabel}>Stack de referencia</span>
              <div className={styles.stackChips}>
                {stack.map((t) => (
                  <span key={t.label} className={styles.stackChip}>
                    <span className={styles.stackDot} style={{ '--chip-color': t.color }} />
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className={styles.arqLabel}>Decisiones clave</span>
              <ul className={styles.notesList}>
                {notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Ventajas ===== */}
      <section className={styles.ventajas}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Ventajas</span>
            <h2 className={styles.headTitle}>
              ¿Por qué AWS con <em>Novasys</em>?
            </h2>
          </div>
          <div className={styles.ventGrid}>
            {ventajas.map((b, i) => (
              <motion.div
                key={b.title}
                className={styles.ventItem}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <b.icon className={styles.ventIcon} aria-hidden="true" />
                <h3 className={styles.ventTitle}>{b.title}</h3>
                <p className={styles.ventDesc}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== La nube como red viva (three.js) ===== */}
      <section className={styles.arquitectura}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Arquitectura viva</span>
            <h2 className={styles.headTitle}>Tu nube, como una <em>red viva</em>.</h2>
            <p className={styles.headLede}>
              Cada servicio de AWS es un nodo; cada conexión, un flujo de datos. Mueve el cursor para recorrer la malla.
            </p>
          </div>
          <div
            style={{
              position: 'relative',
              height: 'min(58vh, 520px)',
              marginTop: 40,
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(245, 166, 35, 0.25)',
              background: 'radial-gradient(ellipse at 50% 45%, rgba(245, 166, 35, 0.08), transparent 70%)',
            }}
          >
            <Suspense fallback={(
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#F5A623', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.1em' }}>
                Cargando malla 3D…
              </div>
            )}>
              <CloudNodes3D />
            </Suspense>
            <span
              style={{
                position: 'absolute', top: 14, left: 14, zIndex: 2,
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#F5A623', background: 'rgba(10, 10, 15, 0.55)', padding: '6px 10px', borderRadius: 4,
                backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', border: '1px solid rgba(245, 166, 35, 0.3)',
              }}
            >
              ◆ Malla de servicios AWS · interactiva
            </span>
          </div>
        </div>
      </section>

      {/* ===== Casos AWS ===== */}
      <RelatedCases
        label="Capítulo 04 · Casos AWS"
        title={<>Casos con esta <em>arquitectura</em>, hoy en producción.</>}
        slugs={['entel', 'americatel', 'interbank']}
      />

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿Listo para llevar tu <em>infraestructura</em> a la nube?</>}
        subtitle="Agenda una consultoría cloud gratuita. Te devolvemos un TCO comparativo y un plan de migración por olas en menos de 24 h."
        primaryCta={{ to: '/contacto', text: 'Consultoría cloud gratuita' }}
        secondaryCta={{ href: 'tel:+5116433467', text: 'Llamar ahora' }}
        trust={['Sin compromiso', 'Respuesta en 24 h', 'AWS Advanced Partner']}
      />
    </>
  );
}
