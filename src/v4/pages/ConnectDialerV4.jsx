import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand, CaseCard } from '../partials';
import { getCloudBySlug } from '../../data/cloud.jsx';
import '../styles/detail-kit.css';
import '../styles/cloud-dialer.css';

const s = getCloudBySlug('connect-dialer');
const AWS = '/v4/aws/';

const MODOS = {
  predictivo: { label: 'Predictivo', lines: 4, nota: 'El algoritmo marca más números que agentes libres hay — maximiza ocupación en carteras grandes.' },
  progresivo: { label: 'Progresivo', lines: 2, nota: 'Una llamada por agente disponible — para campañas donde el trato importa más que el volumen.' },
  power: { label: 'Power', lines: 3, nota: 'Ritmo fijo de líneas por agente — el punto medio entre volumen y control.' },
  preview: { label: 'Preview', lines: 1, nota: 'El agente ve el registro antes de marcar — ideal para cobranza VIP y casos delicados.' },
};

const ESTADOS = [
  ['mk', 'Marcando…'], ['mk', 'Timbrando'], ['ok', 'Contactado'], ['bz', 'Buzón · siguiente'],
];

const NUMS = ['+51 9•• ••• •41', '+51 9•• ••• •87', '+51 9•• ••• •23', '+51 9•• ••• •65'];

function CampaignMonitor() {
  const [modo, setModo] = useState('predictivo');
  const [tick, setTick] = useState(0);
  const timerRef = useRef(null);
  const isStatic = () => document.documentElement.classList.contains('static');

  useEffect(() => {
    if (isStatic()) return undefined;
    timerRef.current = setInterval(() => setTick((t) => t + 1), 1600);
    return () => clearInterval(timerRef.current);
  }, []);

  const m = MODOS[modo];

  return (
    <div className="dlr rv d2" role="img" aria-label="Monitor de campaña de marcación (ilustrativo)">
      <div className="dlr-bar">
        <img src={AWS + 'connect.png'} alt="" />
        <span>Campaña — Cobranza temprana · líneas activas</span>
      </div>
      <div className="dlr-mode">
        {Object.entries(MODOS).map(([key, v]) => (
          <button key={key} type="button" className={modo === key ? 'on' : ''} aria-pressed={modo === key} onClick={() => setModo(key)}>
            {v.label}
          </button>
        ))}
      </div>
      <p className="dlr-note"><b>{m.label}</b> — {m.nota}</p>
      <div className="dlr-lines" key={modo}>
        {Array.from({ length: m.lines }).map((_, i) => {
          const st = ESTADOS[(tick + i * 2) % ESTADOS.length];
          return (
            <div className="dlr-ln" key={i}>
              <span className="li"><Icon id="i-phone" /></span>
              <span>{NUMS[i]}<small>lista: mora 15–30 días</small></span>
              <span className={`dlr-st ${st[0]}`}>{st[1]}</span>
            </div>
          );
        })}
      </div>
      <div className="dlr-foot">
        <span><b>DNC</b> filtrado</span>
        <span>horario permitido ✓</span>
        <span>panel ilustrativo</span>
      </div>
    </div>
  );
}

const ROMAN = ['I', 'II', 'III', 'IV'];

export default function ConnectDialerV4() {
  const ref = useV4Page();

  return (
    <div ref={ref}>
      <Helmet>
        <title>Connect Dialer — Campañas outbound | Novasys del Perú</title>
        <meta name="description" content="Marcación predictiva, progresiva y preview sobre Amazon Connect: cobranza, televentas y encuestas con compliance TCPA, listas DNC y blending inbound/outbound. Desde Lima." />
      </Helmet>

      {/* HERO — monitor de campaña */}
      <section className="hero hero-dlr" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <CampaignMonitor />
          <div>
            <div className="dt-crumb rv">
              <Link to="/cloud">Soluciones</Link><span className="sep">/</span>
              <Link to="/cloud">Cloud AWS</Link><span className="sep">/</span>
              <b>Connect Dialer</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.2vw,68px)' }}>Marcación masiva, sin cruzar la línea<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">El marcador outbound nativo de Amazon Connect: campañas de cobranza, televentas y encuestas con el modo de marcación correcto para cada cartera — y compliance de fábrica.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Pedir análisis outbound</Link>
              <a className="link" href="#modos-dlr">Ver los modos <span className="ar">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* MODOS */}
      <section id="modos-dlr" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead label="01 — Modos de marcación" title="Cada cartera pide un ritmo distinto." text="El modo se define por campaña, no para siempre — y el mismo agente puede atender inbound cuando el outbound baja." />
          <div className="nrows">
            {s.features.map((f, i) => (
              <div className="nrow rv" key={f.title}>
                <span className="rn">{ROMAN[i]}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIPELINE DE CAMPAÑA */}
      <section>
        <div className="wrap">
          <Shead label="02 — Pipeline de campaña" title="De la lista al resultado medido." />
          <div className="arch rv">
            <div className="node"><b>Lista segmentada</b><span>riesgo · mejor hora</span></div>
            <div className="conn"><i /></div>
            <div className="node"><b>Reglas</b><span>DNC · horarios · opt-out</span></div>
            <div className="conn"><i /></div>
            <div className="node first"><b>Marcador</b><span>predictivo · progresivo</span></div>
            <div className="conn"><i /></div>
            <div className="node"><b>Agente</b><span>con contexto en pantalla</span></div>
            <div className="conn"><i /></div>
            <div className="node"><b>Resultado</b><span>contact rate · promesas</span></div>
          </div>
          <div className="archmeta">
            <div className="bl rv">
              <h4>Compliance de fábrica</h4>
              <ul>
                <li>Registro DNC (Do Not Call) filtrado automáticamente antes de marcar</li>
                <li>Opt-out instantáneo — el cliente sale de la lista en el momento</li>
                <li>TCPA y Ley peruana de protección de datos (Ley 29733)</li>
                <li>Ventanas horarias permitidas por tipo de campaña</li>
              </ul>
            </div>
            <div className="bl rv d1">
              <h4>Stack de referencia</h4>
              <div className="chips">
                <span className="chip ichip"><img src={AWS + 'connect.png'} alt="" />Connect High-Volume Outbound</span>
                <span className="chip ichip"><img src={AWS + 'lambda.png'} alt="" />AWS Lambda</span>
                <span className="chip ichip"><img src={AWS + 's3.png'} alt="" />Amazon S3 · listas</span>
                <span className="chip ichip"><img src={AWS + 'dynamodb.png'} alt="" />DynamoDB · DNC</span>
                <span className="chip ichip"><img src={AWS + 'kinesis.png'} alt="" />Kinesis Analytics</span>
                <span className="chip ichip"><img src={AWS + 'cloudwatch.png'} alt="" />Contact Lens QA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE + KPIs */}
      <section>
        <div className="wrap">
          <Shead label="03 — Qué incluye" title="El alcance, por escrito." />
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

      {/* CASOS */}
      <section>
        <div className="wrap">
          <Shead label="04 — Casos" title="Operaciones outbound sobre Connect." />
          <div className="ccards two">
            <CaseCard img="020-callcenter.jpg" sector="Telecomunicaciones" title="Entel: contact center cloud" text="La misma plataforma Connect que sostiene el inbound, lista para campañas salientes." pill="<b>−40%</b> costos operativos" to="/casos-de-exito/entel" linkLabel="Ver el expediente →" />
            <CaseCard img="029-city.jpg" sector="Telecomunicaciones" title="Americatel: operación modernizada" text="Infraestructura cloud-native que absorbe picos de campaña sin provisionar hardware." pill="<b>99.99%</b> disponibilidad" d="d1" to="/casos-de-exito/americatel" linkLabel="Ver el expediente →" />
          </div>
        </div>
      </section>

      <CtaBand
        title={<>¿Tu cartera necesita <span style={{ color: 'var(--red)' }}>marcación masiva</span>?</>}
        text="Cuéntanos cómo trabajas hoy el outbound y te devolvemos un análisis en 48 horas: modo de marcación, listas y compliance incluidos."
        btnLabel="Pedir análisis outbound"
      />
    </div>
  );
}
