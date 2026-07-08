import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HiOutlineRocketLaunch, HiOutlinePuzzlePiece, HiOutlineWrenchScrewdriver } from 'react-icons/hi2';
import { FaAws } from 'react-icons/fa6';
import { SiReact, SiNextdotjs, SiVuedotjs, SiNodedotjs, SiNestjs, SiFastapi, SiPostgresql, SiMongodb, SiAmazondynamodb, SiDocker, SiGithubactions } from 'react-icons/si';
import { Button } from '../design-system';
import Magnetic from '../components/interactive/Magnetic';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import teamImg from '../img/software/team.jpg';
import coderImg from '../img/software/coder.jpg';
import styles from './SoftwareMedidaPage.module.css';

const LAYERS = [
  { key: 'front', label: 'Frontend', options: [{ Icon: SiReact, l: 'React' }, { Icon: SiNextdotjs, l: 'Next.js' }, { Icon: SiVuedotjs, l: 'Vue' }] },
  { key: 'back', label: 'Backend', options: [{ Icon: SiNodedotjs, l: 'Node' }, { Icon: SiNestjs, l: 'NestJS' }, { Icon: SiFastapi, l: 'FastAPI' }] },
  { key: 'db', label: 'Base de datos', options: [{ Icon: SiPostgresql, l: 'PostgreSQL' }, { Icon: SiMongodb, l: 'MongoDB' }, { Icon: SiAmazondynamodb, l: 'DynamoDB' }] },
  { key: 'infra', label: 'Infra & CI/CD', options: [{ Icon: SiDocker, l: 'Docker' }, { Icon: SiGithubactions, l: 'GitHub Actions' }, { Icon: FaAws, l: 'AWS' }] },
];

const CRAFT = [
  { Icon: HiOutlinePuzzlePiece, t: 'Discovery real', d: 'Mapeamos tu proceso con quienes lo viven — no asumimos, preguntamos.' },
  { Icon: HiOutlineWrenchScrewdriver, t: 'Sprints quincenales', d: 'Entregas incrementales con demo cada 2 semanas. Ves avanzar, no esperás meses.' },
  { Icon: HiOutlineRocketLaunch, t: 'Deploy continuo', d: 'CI/CD en AWS desde el sprint 1. Staging y producción separados, sin sorpresas.' },
];

// Configurador de stack interactivo — elegí por capa y armá tu arquitectura con logos reales.
function StackBuilder() {
  const [sel, setSel] = useState({ front: 0, back: 0, db: 0, infra: 2 });

  return (
    <div className={styles.builder}>
      <div className={styles.layers}>
        {LAYERS.map((layer) => (
          <div key={layer.key} className={styles.layer}>
            <span className={styles.layerLabel}>{layer.label}</span>
            <div className={styles.layerOpts}>
              {layer.options.map((o, i) => (
                <button
                  key={o.l}
                  type="button"
                  className={`${styles.optBtn} ${sel[layer.key] === i ? styles.optBtnOn : ''}`}
                  onClick={() => setSel((s) => ({ ...s, [layer.key]: i }))}
                  aria-pressed={sel[layer.key] === i}
                >
                  <o.Icon aria-hidden="true" /> {o.l}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.stackResult}>
        <span className={styles.stackResultLabel}>Tu stack</span>
        <div className={styles.stackAssembled}>
          {LAYERS.map((layer, li) => {
            const o = layer.options[sel[layer.key]];
            return (
              <div key={layer.key} className={styles.stackNode}>
                <span className={styles.stackNodeIcon}><o.Icon aria-hidden="true" /></span>
                <span className={styles.stackNodeText}><b>{o.l}</b><small>{layer.label}</small></span>
                {li < LAYERS.length - 1 && <span className={styles.stackNodeConn} aria-hidden="true" />}
              </div>
            );
          })}
        </div>
        <span className={styles.stackFoot}>Cloud-native · escalable · sin lock-in</span>
      </div>
    </div>
  );
}

export default function SoftwareMedidaPage() {
  return (
    <>
      <Helmet>
        <title>Software a Medida — Desarrollo cloud-native | Novasys del Perú</title>
        <meta name="description" content="Desarrollo de software empresarial a medida: aplicaciones cloud-native en AWS, integradas a tus sistemas, con sprints quincenales y CI/CD. Un solo equipo, del discovery al soporte, en Lima." />
        <link rel="canonical" href="https://www.novasys.com.pe/soluciones/software-a-medida" />
      </Helmet>

      {/* ===== Hero (editor de código a la izquierda + texto derecha) ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
        <motion.div
          className={styles.editorWrap}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className={styles.editor}>
            <div className={styles.edBar}>
              <span className={styles.edDots}><i /><i /><i /></span>
              <span className={styles.edTabActive}>Checkout.tsx</span>
              <span className={styles.edTab}>api.ts</span>
            </div>
            <pre className={styles.edCode}>
              <div className={styles.edLine}><span className={styles.num}>1</span><span className={styles.kw}>export function</span> <span className={styles.fn}>Checkout</span>() {'{'}</div>
              <div className={styles.edLine}><span className={styles.num}>2</span>{'  '}<span className={styles.kw}>const</span> total = <span className={styles.fn}>useCarrito</span>()</div>
              <div className={styles.edLine}><span className={styles.num}>3</span>{'  '}<span className={styles.cm}>// pago integrado a tu ERP</span></div>
              <div className={styles.edLine}><span className={styles.num}>4</span>{'  '}<span className={styles.typeLine}>{'  return <Pago total={total} />'}</span><span className={styles.cursor} /></div>
              <div className={styles.edLine}><span className={styles.num}>5</span>{'}'}</div>
            </pre>
            <div className={styles.edStatus}>
              <span className={styles.edOk}><i /> build passing</span>
              <span>deploy · AWS · main</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.badge}>Stack moderno · Lima</span>
          <h1 className={styles.heroTitle}>
            Cuando ningún producto <em>encaja</em>, lo construimos.
          </h1>
          <p className={styles.heroLede}>
            Aplicaciones empresariales a medida: cloud-native en AWS, integradas a tus sistemas
            y con la arquitectura para crecer sin reescribir. Un solo equipo, del código al soporte.
          </p>
          <div className={styles.heroCtas}>
            <Magnetic strength={0.4}>
              <Button to="/contacto" variant="primary" size="lg">Contar mi proyecto</Button>
            </Magnetic>
            <Button to="/casos-de-exito" variant="outline" size="lg">Ver casos</Button>
          </div>
        </motion.div>
        </div>
      </section>

      {/* ===== Configurador de stack ===== */}
      <section className={styles.builderSection}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Stack a tu medida</span>
            <h2 className={styles.headTitle}>Elegimos la herramienta por tu <em>caso</em>, no por moda.</h2>
            <p className={styles.headLede}>Armá una combinación y mirá cómo se arma la arquitectura. En tu proyecto real lo decidimos juntos.</p>
          </div>
          <StackBuilder />
        </div>
      </section>

      {/* ===== Equipo + craft (fotos + proceso) ===== */}
      <section className={styles.craft}>
        <div className={styles.craftInner}>
          <div className={styles.craftVisual}>
            <img src={teamImg} alt="Equipo de desarrollo colaborando" className={styles.craftImgA} loading="lazy" />
            <img src={coderImg} alt="Desarrollador escribiendo código" className={styles.craftImgB} loading="lazy" />
          </div>
          <div className={styles.craftText}>
            <span className={styles.sectionEyebrow}>Cómo construimos</span>
            <h2 className={styles.headTitle}>Un solo equipo, del <em>discovery al soporte</em>.</h2>
            <div className={styles.craftList}>
              {CRAFT.map((c, i) => (
                <motion.div
                  key={c.t}
                  className={styles.craftItem}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <c.Icon className={styles.craftIcon} aria-hidden="true" />
                  <div>
                    <h3 className={styles.craftItemTitle}>{c.t}</h3>
                    <p className={styles.craftItemDesc}>{c.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿Tenés un proceso que ningún <em>software comercial</em> resuelve?</>}
        subtitle="Te diagnosticamos en 30 minutos si conviene construir, integrar o comprar — sin compromiso comercial."
        primaryCta={{ to: '/contacto', text: 'Contar mi proyecto' }}
        secondaryCta={{ to: '/casos-de-exito', text: 'Ver casos de éxito' }}
        trust={['Stack moderno', 'Sprints quincenales', 'Equipo propio · Lima']}
      />
    </>
  );
}
