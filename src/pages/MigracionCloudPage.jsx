import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineServerStack,
  HiOutlineArrowsRightLeft,
  HiOutlineWrenchScrewdriver,
  HiOutlineShoppingBag,
  HiOutlineCpuChip,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { FaAws } from 'react-icons/fa6';
import { SiAmazonec2, SiAmazons3, SiAmazonrds, SiAwslambda } from 'react-icons/si';
import { Button } from '../design-system';
import Magnetic from '../components/interactive/Magnetic';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import cablesImg from '../img/migracion/cables.jpg';
import serversImg from '../img/migracion/servers.jpg';
import styles from './MigracionCloudPage.module.css';

const SIXRS = [
  { t: 'Rehost', d: 'Lift-and-shift: mover la carga tal cual, rápido y con bajo riesgo.', Icon: HiOutlineArrowsRightLeft },
  { t: 'Replatform', d: 'Ajustes mínimos para aprovechar servicios nativos de AWS.', Icon: HiOutlineWrenchScrewdriver },
  { t: 'Repurchase', d: 'Cambiar a un SaaS cuando comprar gana a mantener.', Icon: HiOutlineShoppingBag },
  { t: 'Refactor', d: 'Rediseñar a serverless o containers donde se justifica.', Icon: HiOutlineCpuChip },
  { t: 'Retire', d: 'Apagar lo que ya nadie usa — la mejor migración es la que no hacés.', Icon: HiOutlineTrash },
  { t: 'Retain', d: 'Dejar on-prem lo que todavía no toca mover. Sin dogmas.', Icon: HiOutlineServerStack },
];

const AWS_SVC = [
  { Icon: SiAmazonec2, l: 'EC2' }, { Icon: SiAmazons3, l: 'S3' },
  { Icon: SiAmazonrds, l: 'RDS' }, { Icon: SiAwslambda, l: 'Lambda' },
];

// Slider de TCO interactivo — mové la escala y mirá el ahorro estimado (ilustrativo).
function TCOSlider() {
  const [servers, setServers] = useState(40);
  const savings = 38 + Math.round((servers / 120) * 14); // 38–52%, economías de escala
  const onpremCost = servers * 1150;
  const awsCost = Math.round(onpremCost * (1 - savings / 100));

  return (
    <div className={styles.tco}>
      <div className={styles.tcoControl}>
        <label className={styles.tcoLabel} htmlFor="tco">Tamaño de tu operación: <b>{servers}</b> servidores</label>
        <input
          id="tco"
          className={styles.tcoRange}
          type="range"
          min="5"
          max="120"
          value={servers}
          onChange={(e) => setServers(Number(e.target.value))}
        />
      </div>
      <div className={styles.tcoBars}>
        <div className={styles.tcoRow}>
          <span className={styles.tcoRowLabel}>On-premise</span>
          <div className={styles.tcoTrack}><div className={`${styles.tcoFill} ${styles.tcoOnprem}`} style={{ width: '100%' }}>US$ {onpremCost.toLocaleString('en-US')}/mes</div></div>
        </div>
        <div className={styles.tcoRow}>
          <span className={styles.tcoRowLabel}>AWS</span>
          <div className={styles.tcoTrack}><div className={`${styles.tcoFill} ${styles.tcoAws}`} style={{ width: `${100 - savings}%` }}>US$ {awsCost.toLocaleString('en-US')}/mes</div></div>
        </div>
      </div>
      <div className={styles.tcoSavings}>
        <span key={savings} className={styles.tcoSavingsNum}>−{savings}%</span>
        <span className={styles.tcoSavingsLbl}>TCO estimado · ilustrativo</span>
      </div>
    </div>
  );
}

export default function MigracionCloudPage() {
  return (
    <>
      <Helmet>
        <title>Migración Cloud AWS — On-prem a AWS sin interrupciones | Novasys del Perú</title>
        <meta name="description" content="Migración de infraestructura on-premise a AWS con metodología por olas (AWS MAP + 6R): assessment, re-platform, re-architect y FinOps. Downtime real mínimo, rollback siempre listo. AWS Advanced Partner." />
        <link rel="canonical" href="https://www.novasys.com.pe/cloud/migracion" />
      </Helmet>

      {/* ===== Hero + transfer on-prem → AWS ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.badge}><FaAws aria-hidden="true" /> AWS Advanced Partner</span>
          <span className={styles.eyebrow}>Cloud · Migración</span>
          <h1 className={styles.heroTitle}>
            De tu sótano a la nube, <em>sin apagar nada</em>.
          </h1>
          <p className={styles.heroLede}>
            Migramos tu infraestructura a AWS por olas, con downtime real mínimo y rollback siempre
            listo. Metodología AWS MAP + 6R adaptada al contexto peruano.
          </p>
          <div className={styles.heroCtas}>
            <Magnetic strength={0.4}>
              <Button to="/contacto" variant="primary" size="lg">Pedir mi TCO comparativo</Button>
            </Magnetic>
            <Button to="/cloud" variant="outline" size="lg">Ver más de Cloud</Button>
          </div>
        </motion.div>

        <motion.div
          className={styles.transfer}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className={styles.tSide}>
            <span className={styles.tSideLabel}>On-premise</span>
            <div className={styles.tRack}>
              {[0, 1, 2, 3].map((i) => <span key={i} className={styles.tRackRow}><HiOutlineServerStack /></span>)}
            </div>
          </div>
          <div className={styles.tPipe}>
            <span className={styles.tPacket} style={{ animationDelay: '0s' }} />
            <span className={styles.tPacket} style={{ animationDelay: '0.8s' }} />
            <span className={styles.tPacket} style={{ animationDelay: '1.6s' }} />
            <span className={styles.tPipeLabel}>migrando…</span>
          </div>
          <div className={`${styles.tSide} ${styles.tCloud}`}>
            <span className={styles.tSideLabel}><FaAws /> AWS</span>
            <div className={styles.tSvc}>
              {AWS_SVC.map((s) => <span key={s.l} className={styles.tSvcItem}><s.Icon /><small>{s.l}</small></span>)}
            </div>
          </div>
        </motion.div>
        </div>
      </section>

      {/* ===== TCO slider ===== */}
      <section className={styles.tcoSection}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>¿Cuánto ahorrás?</span>
            <h2 className={styles.headTitle}>Mové la escala y mirá el <em>TCO</em>.</h2>
            <p className={styles.headLede}>Una estimación ilustrativa. En tu proyecto real te devolvemos un TCO con tus números en 72 h.</p>
          </div>
          <TCOSlider />
        </div>
      </section>

      {/* ===== Banda cinemática (imagen) ===== */}
      <section className={styles.band} style={{ backgroundImage: `url(${serversImg})` }}>
        <div className={styles.bandVeil} aria-hidden="true" />
        <motion.p
          className={styles.bandQuote}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          El hierro, la refrigeración y el UPS <em>dejan de ser tu problema</em>.
        </motion.p>
      </section>

      {/* ===== 6Rs ===== */}
      <section className={styles.sixrs}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Estrategia · 6R</span>
            <h2 className={styles.headTitle}>No todo se migra <em>igual</em>.</h2>
            <p className={styles.headLede}>Para cada workload elegimos la R correcta — el framework 6R de AWS, sin dogmas.</p>
          </div>
          <div className={styles.rGrid}>
            {SIXRS.map((r, i) => (
              <motion.div
                key={r.t}
                className={styles.rCard}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              >
                <span className={styles.rNum}>{String(i + 1).padStart(2, '0')}</span>
                <r.Icon className={styles.rIcon} aria-hidden="true" />
                <h3 className={styles.rTitle}>{r.t}</h3>
                <p className={styles.rDesc}>{r.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿Pensando en <em>migrar a la nube</em>?</>}
        subtitle="Te enviamos un TCO comparativo con tus números y un plan de migración por olas — en 72 h, sin costo ni compromiso."
        primaryCta={{ to: '/contacto', text: 'Pedir mi TCO' }}
        secondaryCta={{ href: 'tel:+5116433467', text: 'Llamar ahora' }}
        trust={['AWS Advanced Partner', 'TCO en 72 h', 'Rollback siempre listo']}
      />
    </>
  );
}
