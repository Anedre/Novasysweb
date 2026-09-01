import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand } from '../partials';
import { getCloudBySlug } from '../../data/cloud.jsx';
import '../styles/detail-kit.css';
import '../styles/cloud-ia.css';

const s = getCloudBySlug('sagemaker');
const AWS = '/v4/aws/';

const CASOS_ML = {
  forecast: {
    label: 'Forecast de demanda', job: 'forecast-demanda-v3',
    metric: ['Error (MAPE)', '8.4%'], points: [12, 26, 22, 38, 34, 52, 47, 62, 58, 71, 68, 79, 76, 84, 82, 88],
    stack: [['sagemaker.png', 'SageMaker'], ['s3.png', 'S3 · histórico de ventas'], ['lambda.png', 'Lambda · API']],
  },
  fraude: {
    label: 'Detección de fraude', job: 'fraude-transacciones-v5',
    metric: ['Recall', '96.1%'], points: [8, 30, 24, 44, 40, 58, 52, 68, 63, 76, 72, 83, 80, 88, 85, 90],
    stack: [['sagemaker.png', 'SageMaker'], ['kinesis.png', 'Kinesis · tiempo real'], ['lambda.png', 'Lambda · scoring']],
  },
  docs: {
    label: 'Clasificación de documentos', job: 'clasificador-docs-v2',
    metric: ['Precisión', '94.7%'], points: [15, 32, 28, 46, 42, 58, 55, 67, 64, 75, 72, 81, 79, 86, 84, 89],
    stack: [['bedrock.png', 'Bedrock · LLM'], ['s3.png', 'S3 · documentos'], ['lambda.png', 'Lambda · pipeline']],
  },
  reco: {
    label: 'Recomendación', job: 'recomendador-catalogo-v1',
    metric: ['Uplift de CTR', '+18%'], points: [10, 24, 20, 36, 32, 48, 44, 58, 54, 66, 63, 74, 71, 80, 78, 85],
    stack: [['sagemaker.png', 'SageMaker'], ['dynamodb.png', 'DynamoDB · perfiles'], ['lambda.png', 'Lambda · serving']],
  },
};

const EPOCHS = 24;

function TrainingLab() {
  const [caso, setCaso] = useState('forecast');
  const [epoch, setEpoch] = useState(1);
  const timerRef = useRef(null);
  const isStatic = () => document.documentElement.classList.contains('static');
  const c = CASOS_ML[caso];

  useEffect(() => {
    if (isStatic()) { setEpoch(EPOCHS); return undefined; }
    setEpoch(1);
    timerRef.current = setInterval(() => {
      setEpoch((e) => (e < EPOCHS ? e + 1 : e));
    }, 480);
    return () => clearInterval(timerRef.current);
  }, [caso]);

  const done = epoch >= EPOCHS;
  /* la curva sube (la métrica mejora); en el SVG el eje y va invertido */
  const pts = c.points.map((v, i) => `${i * 20 + 4},${104 - v}`).join(' ');
  const area = `4,104 ${pts} ${(c.points.length - 1) * 20 + 4},104`;

  return (
    <div className="ial rv d2">
      <div className="fchips">
        {Object.entries(CASOS_ML).map(([key, v]) => (
          <button key={key} type="button" className={caso === key ? 'on' : ''} aria-pressed={caso === key} onClick={() => setCaso(key)}>
            {v.label}
          </button>
        ))}
      </div>
      <div className="iaj" key={caso} role="img" aria-label={`Job de entrenamiento de ${c.label} (ilustrativo)`}>
        <div className="iaj-bar">
          <img src={AWS + 'sagemaker.png'} alt="" />
          <span>Training job — {c.job}</span>
          <span className={`iaj-st ${done ? 'ok' : 'run'}`}><i />{done ? 'Listo' : 'Entrenando'}</span>
        </div>
        <div className="iaj-body">
          <div className="ia-curve">
            <div className="t">Métrica de validación por época</div>
            <svg viewBox="0 0 310 110" preserveAspectRatio="none" aria-hidden="true">
              <line className="grid" x1="0" y1="30" x2="310" y2="30" />
              <line className="grid" x1="0" y1="65" x2="310" y2="65" />
              <line className="grid" x1="0" y1="100" x2="310" y2="100" />
              <polygon className="area" points={area} />
              <polyline className="loss" points={pts} />
            </svg>
          </div>
          <div className="ia-mets">
            <div className="iam"><span className="k">Época</span><div className="n">{epoch}/{EPOCHS}</div></div>
            <div className="iam"><span className="k">{c.metric[0]}</span><div className="n">{c.metric[1]}</div></div>
            <div className="iam"><span className="k">Infraestructura</span><div className="n" style={{ fontSize: 15, marginTop: 6 }}>Gestionada</div></div>
          </div>
          <div className="ia-sub">
            <div className="ias"><i />Endpoint<small>inferencia bajo demanda</small></div>
            <div className="ias"><i />Model Monitor<small>drift: sin alertas</small></div>
          </div>
          <div className="ia-stack">
            {c.stack.map(([img, label]) => (
              <span className="chip ichip" key={label}><img src={AWS + img} alt="" />{label}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="demo-note">Job ilustrativo · <b>elige un caso de uso</b> para ver su pipeline</p>
    </div>
  );
}

const FEAT_ICONS = ['sagemaker.png', 'bedrock.png', 'cloudwatch.png', 'costexplorer.png'];

export default function SageMakerV4() {
  const ref = useV4Page();

  return (
    <div ref={ref}>
      <Helmet>
        <title>IA & Machine Learning — SageMaker · Bedrock | Novasys del Perú</title>
        <meta name="description" content="Machine learning en producción sobre AWS: modelos propios con Amazon SageMaker, IA generativa con Bedrock y MLOps para que no se degraden. Con tus datos, en tu cuenta, desde Lima." />
      </Helmet>

      {/* HERO — laboratorio de entrenamiento */}
      <section className="hero hero-ia" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div>
            <div className="dt-crumb rv">
              <Link to="/cloud">Soluciones</Link><span className="sep">/</span>
              <Link to="/cloud">Cloud AWS</Link><span className="sep">/</span>
              <b>IA & Machine Learning</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.2vw,68px)' }}>Del notebook a producción<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">Amazon SageMaker para modelos propios, Amazon Bedrock para IA generativa — y MLOps para que el modelo siga vivo después del demo. Con tus datos, dentro de tu cuenta AWS.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Evaluar mi caso de uso</Link>
              <a className="link" href="#caminos-ia">SageMaker o Bedrock <span className="ar">→</span></a>
            </div>
          </div>
          <TrainingLab />
        </div>
      </section>

      {/* DOS CAMINOS */}
      <section id="caminos-ia" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead label="01 — Dos caminos" title="¿Modelo propio o IA generativa?" text="La primera decisión de todo proyecto de IA — y la tomamos contigo, mirando el caso de uso y los datos que ya tienes." />
          <div className="ia-two">
            <div className="iat rv">
              <img src={AWS + 'sagemaker.png'} alt="" />
              <span className="plabel">Amazon SageMaker</span>
              <h3>Modelo propio</h3>
              <p>Cuando tienes histórico rico y el problema es numérico: demanda, fraude, churn, precios. El modelo se entrena con tus datos y es tuyo.</p>
              <div className="inc-it"><Icon id="i-check" />Entrenamiento gestionado, sin administrar GPUs</div>
              <div className="inc-it" style={{ marginTop: 10 }}><Icon id="i-check" />Endpoint serverless: pagas por inferencia</div>
              <div className="inc-it" style={{ marginTop: 10 }}><Icon id="i-check" />Reentrenamiento programado con MLOps</div>
            </div>
            <div className="iat rv d1">
              <img src={AWS + 'bedrock.png'} alt="" />
              <span className="plabel">Amazon Bedrock</span>
              <h3>IA generativa</h3>
              <p>Cuando el problema es lenguaje: clasificar documentos, resumir, responder, extraer. LLMs de frontera vía API, sin entrenar desde cero.</p>
              <div className="inc-it"><Icon id="i-check" />Claude, Llama y más — elegidos por el caso</div>
              <div className="inc-it" style={{ marginTop: 10 }}><Icon id="i-check" />Tus datos no salen de tu cuenta AWS</div>
              <div className="inc-it" style={{ marginTop: 10 }}><Icon id="i-check" />RAG sobre tus documentos y sistemas</div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPACIDADES */}
      <section>
        <div className="wrap">
          <Shead label="02 — Capacidades" title="Lo que cubre el servicio." />
          <div className="steps">
            {s.features.map((f, i) => (
              <div className={`step rv ${i ? `d${i}` : ''}`.trim()} key={f.title}>
                <img className="sico" src={AWS + FEAT_ICONS[i]} alt="" />
                <span className="n n-abs">{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section>
        <div className="wrap">
          <Shead label="03 — Pipeline" title="Del dato crudo al modelo monitoreado." />
          <div className="arch rv">
            <div className="node"><img className="nico" src={AWS + 's3.png'} alt="" /><b>Datos</b><span>S3 · data lake</span></div>
            <div className="conn"><i /></div>
            <div className="node"><b>Features</b><span>preparación · etiquetado</span></div>
            <div className="conn"><i /></div>
            <div className="node first"><img className="nico" src={AWS + 'sagemaker.png'} alt="" /><b>Entrenamiento</b><span>SageMaker · Bedrock</span></div>
            <div className="conn"><i /></div>
            <div className="node"><img className="nico" src={AWS + 'lambda.png'} alt="" /><b>Endpoint</b><span>API · batch · streaming</span></div>
            <div className="conn"><i /></div>
            <div className="node"><img className="nico" src={AWS + 'cloudwatch.png'} alt="" /><b>Monitoreo</b><span>drift · reentrenamiento</span></div>
          </div>
          <div className="archmeta">
            <div className="bl rv">
              <h4>Stack de referencia</h4>
              <div className="chips">
                {s.architecture.stack.map((c) => <span className="chip" key={c.label}>{c.label}</span>)}
              </div>
            </div>
            <div className="bl rv d1">
              <h4>Decisiones clave</h4>
              <ul>{s.architecture.notes.map((n) => <li key={n}>{n}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE + KPIs */}
      <section>
        <div className="wrap">
          <Shead label="04 — Qué incluye" title="El alcance, por escrito." />
          <div className="inc-grid rv">
            {s.includes.map((it) => (
              <div className="inc-it" key={it}><Icon id="i-check" />{it}</div>
            ))}
          </div>
          <div className="kpis3" style={{ marginTop: 'clamp(40px,5vw,64px)' }}>
            {s.kpis.map((k, i) => (
              <div className={`stat rv rl ${i ? `d${i}` : ''}`.trim()} key={k.label}>
                <span className="v">{k.value}</span>
                <span className="lbl">{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIN HUMO */}
      <section>
        <div className="wrap">
          <Shead label="05 — Sin humo" title="Reglas de la casa para proyectos de IA." text="Preferimos decirte que tu caso no es viable a venderte un modelo que nunca llegará a producción." />
          <div className="ia-hon">
            <div className="m rv"><span className="rn">I</span><h3>ROI antes que tecnología</h3><p>Empezamos por un caso de uso con retorno claro — no por la herramienta de moda.</p></div>
            <div className="m rv d1"><span className="rn">II</span><h3>Tus datos, tu cuenta</h3><p>Modelos y datos viven dentro de tu cuenta AWS. Nada se comparte con terceros.</p></div>
            <div className="m rv d2"><span className="rn">III</span><h3>Modelo monitoreado o modelo muerto</h3><p>Sin monitoreo de drift y reentrenamiento, todo modelo se degrada. El MLOps no es opcional.</p></div>
          </div>
        </div>
      </section>

      <CtaBand
        title={<>¿Tienes datos pero ningún modelo <span style={{ color: 'var(--red)' }}>en producción</span>?</>}
        text="En 30 minutos evaluamos si tu caso de uso es viable con SageMaker o Bedrock — y te devolvemos un enfoque concreto. Si no es viable, también te lo decimos."
        btnLabel="Evaluar mi caso"
      />
    </div>
  );
}
