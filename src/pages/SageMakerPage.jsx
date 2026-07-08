import { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineCpuChip,
  HiOutlineSparkles,
  HiOutlineArrowPath,
  HiOutlineBriefcase,
  HiOutlineChartBarSquare,
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineBolt,
} from 'react-icons/hi2';
import { FaAws } from 'react-icons/fa6';
import { SiPython, SiPytorch, SiTensorflow, SiScikitlearn, SiPandas, SiJupyter, SiAmazons3, SiAwslambda, SiAmazondynamodb } from 'react-icons/si';
import { Button } from '../design-system';
import Magnetic from '../components/interactive/Magnetic';
import EditorialCta from '../components/sections/EditorialCta/EditorialCta';
import networkImg from '../img/ia/network.jpg';
import codeImg from '../img/ia/code.jpg';
import dataImg from '../img/ia/data.jpg';
import styles from './SageMakerPage.module.css';

const NeuralNet3D = lazy(() => import('../components/three/NeuralNet3D'));

const T = {
  py: { Icon: SiPython, label: 'Python' },
  torch: { Icon: SiPytorch, label: 'PyTorch' },
  tf: { Icon: SiTensorflow, label: 'TensorFlow' },
  sklearn: { Icon: SiScikitlearn, label: 'scikit-learn' },
  pandas: { Icon: SiPandas, label: 'Pandas' },
  jupyter: { Icon: SiJupyter, label: 'Jupyter' },
  sagemaker: { Icon: FaAws, label: 'SageMaker' },
  bedrock: { Icon: FaAws, label: 'Bedrock' },
  s3: { Icon: SiAmazons3, label: 'S3' },
  lambda: { Icon: SiAwslambda, label: 'Lambda' },
  dynamo: { Icon: SiAmazondynamodb, label: 'DynamoDB' },
};

const STACK = [T.py, T.torch, T.tf, T.sklearn, T.pandas, T.jupyter, T.sagemaker, T.bedrock, T.s3, T.lambda];

const USECASES = [
  { key: 'forecast', Icon: HiOutlineChartBarSquare, title: 'Forecasting de demanda', approach: 'Modelos de series de tiempo (DeepAR en SageMaker) que predicen ventas o stock por SKU y región, y se reentrenan solos con cada cierre.', tools: [T.py, T.pandas, T.sagemaker] },
  { key: 'fraud', Icon: HiOutlineShieldCheck, title: 'Detección de fraude', approach: 'Clasificación en tiempo real de transacciones sospechosas, con detección de drift y reentrenamiento ante nuevos patrones de ataque.', tools: [T.sklearn, T.sagemaker, T.lambda] },
  { key: 'docs', Icon: HiOutlineDocumentText, title: 'Clasificación de documentos', approach: 'OCR + NLP con Bedrock para extraer, clasificar y resumir contratos, facturas y formularios — con tus datos, dentro de tu cuenta AWS.', tools: [T.bedrock, T.py, T.s3] },
  { key: 'reco', Icon: HiOutlineSparkles, title: 'Recomendación', approach: 'Motores de recomendación con embeddings que suben conversión y ticket promedio, servidos como endpoint de baja latencia.', tools: [T.tf, T.sagemaker, T.dynamo] },
];

// Explorador de casos de uso interactivo (master-detail robusto: div key-eado + CSS).
function UseCaseExplorer() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % USECASES.length), 4200);
    return () => clearInterval(id);
  }, [paused]);

  const uc = USECASES[active];

  return (
    <div className={styles.explorer} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={styles.ucList}>
        {USECASES.map((u, i) => (
          <button
            key={u.key}
            type="button"
            className={`${styles.ucBtn} ${i === active ? styles.ucBtnActive : ''}`}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
          >
            <u.Icon className={styles.ucBtnIcon} aria-hidden="true" />
            <span>{u.title}</span>
          </button>
        ))}
      </div>
      <div key={active} className={styles.ucPanel}>
        <span className={styles.ucPanelTag}>modelo · en producción</span>
        <h3 className={styles.ucPanelTitle}>{uc.title}</h3>
        <p className={styles.ucPanelDesc}>{uc.approach}</p>
        <div className={styles.ucStack}>
          <span className={styles.ucStackLabel}>Stack de referencia</span>
          <div className={styles.ucStackLogos}>
            {uc.tools.map((tl) => (
              <span key={tl.label} className={styles.ucTool}><tl.Icon aria-hidden="true" />{tl.label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SageMakerPage() {
  return (
    <>
      <Helmet>
        <title>IA & Machine Learning (SageMaker · Bedrock) — Novasys del Perú</title>
        <meta name="description" content="Machine learning en producción sobre AWS: entrenamiento y despliegue con Amazon SageMaker, IA generativa con Bedrock y MLOps. Forecasting, detección de fraude, clasificación de documentos y recomendación. AWS Advanced Partner." />
        <link rel="canonical" href="https://www.novasys.com.pe/cloud/sagemaker" />
      </Helmet>

      {/* ===== Hero inmersivo · red neuronal 3D full-bleed ===== */}
      <section className={styles.hero}>
        <div className={styles.heroCanvas} aria-hidden="true">
          <Suspense fallback={<div className={styles.canvasFallback}>Cargando red neuronal…</div>}>
            <NeuralNet3D />
          </Suspense>
        </div>
        <div className={styles.heroVeil} aria-hidden="true" />
        <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.badge}><FaAws aria-hidden="true" /> AWS Advanced Partner</span>
            <h1 className={styles.heroTitle}>
              Del notebook al modelo <em>en producción</em>.
            </h1>
            <p className={styles.heroLede}>
              Machine learning más allá del prototipo: entrenamiento y despliegue con Amazon SageMaker,
              IA generativa con Bedrock y MLOps para que el modelo siga vivo.
            </p>
            <div className={styles.heroCtas}>
              <Magnetic strength={0.4}>
                <Button to="/contacto" variant="primary" size="lg">Evaluar mi caso de uso</Button>
              </Magnetic>
              <Button to="/cloud" variant="outline" size="lg">Ver más de Cloud</Button>
            </div>
          </motion.div>
        </div>
        <div className={styles.heroStack} aria-hidden="true">
          <span className={styles.heroStackLabel}>Construido con</span>
          {STACK.map((tl) => (
            <span key={tl.label} className={styles.heroStackItem} title={tl.label}><tl.Icon /></span>
          ))}
        </div>
        </div>
        <span className={styles.heroHint}>◆ Red neuronal interactiva · mové el cursor</span>
      </section>

      {/* ===== Bento asimétrico ===== */}
      <section className={styles.bentoSection}>
        <div className={styles.wrap}>
          <div className={styles.bento}>
            <div className={`${styles.tile} ${styles.tSm}`}>
              <HiOutlineCpuChip className={styles.tileIconLg} aria-hidden="true" />
              <div className={styles.tileBody}>
                <h3 className={styles.tileTitleLg}>Amazon SageMaker</h3>
                <p className={styles.tileDesc}>Entrená, ajustá y desplegá modelos con infraestructura gestionada — sin administrar servidores ni GPUs. Del experimento al endpoint, en el mismo lugar.</p>
              </div>
            </div>

            <div className={`${styles.tile} ${styles.tBed}`}>
              <HiOutlineSparkles className={styles.tileIcon} aria-hidden="true" />
              <h3 className={styles.tileTitle}>IA generativa · Bedrock</h3>
              <p className={styles.tileDescSm}>LLMs de frontera (Claude, Llama, Titan) vía API — con tus datos, sin exponerlos.</p>
            </div>

            <div className={`${styles.tile} ${styles.tMlo}`}>
              <HiOutlineArrowPath className={styles.tileIcon} aria-hidden="true" />
              <h3 className={styles.tileTitle}>MLOps</h3>
              <p className={styles.tileDescSm}>Reentrenamiento, versionado y detección de drift para que no se degrade.</p>
            </div>

            <div className={`${styles.tile} ${styles.tImg}`} style={{ backgroundImage: `url(${dataImg})` }}>
              <span className={styles.tImgCaption}>Tus datos, dentro de tu cuenta AWS.</span>
            </div>

            <div className={`${styles.tile} ${styles.tStat}`}>
              <HiOutlineBolt className={styles.tileIcon} aria-hidden="true" />
              <span className={styles.statVal}>Serverless</span>
              <span className={styles.statLbl}>Inferencia bajo demanda · pay-per-use</span>
            </div>

            <div className={`${styles.tile} ${styles.tCases}`}>
              <HiOutlineBriefcase className={styles.tileIcon} aria-hidden="true" />
              <h3 className={styles.tileTitle}>Casos de negocio</h3>
              <p className={styles.tileDescSm}>Forecasting de demanda · detección de fraude · clasificación de documentos · recomendación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Explorador de casos de uso ===== */}
      <section className={styles.useSection}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.sectionEyebrow}>Casos de uso</span>
            <h2 className={styles.headTitle}>Elegí un problema, mirá <em>cómo se resuelve</em>.</h2>
            <p className={styles.headLede}>Cada caso empieza por el ROI, no por el modelo. Tocá uno o dejá que rote.</p>
          </div>
          <UseCaseExplorer />
        </div>
      </section>

      {/* ===== Banda cinematográfica full-bleed ===== */}
      <section className={styles.cinema} style={{ backgroundImage: `url(${networkImg})` }}>
        <div className={styles.cinemaVeil} aria-hidden="true" />
        <motion.div
          className={styles.cinemaContent}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.cinemaTag}>§ Del dato al valor</span>
          <p className={styles.cinemaQuote}>
            No entrenamos modelos para un paper. Los llevamos a producción, los medimos contra tu negocio y los mantenemos vivos.
          </p>
        </motion.div>
      </section>

      {/* ===== CTA ===== */}
      <EditorialCta
        label="Siguiente paso"
        title={<>¿Tenés datos pero <em>ningún modelo</em> en producción?</>}
        subtitle="Evaluamos en 30 minutos si tu caso de uso es viable con SageMaker o Bedrock, y te devolvemos un enfoque concreto — sin humo."
        primaryCta={{ to: '/contacto', text: 'Evaluar mi caso de uso' }}
        secondaryCta={{ to: '/cloud', text: 'Ver más de Cloud' }}
        trust={['AWS Advanced Partner', 'Tus datos en tu cuenta', 'Equipo propio · Lima']}
      />
    </>
  );
}
