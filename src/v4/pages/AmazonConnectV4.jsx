import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand, CaseCard } from '../partials';
import { getCloudBySlug } from '../../data/cloud.jsx';
import '../styles/detail-kit.css';
import '../styles/cloud-connect.css';

const s = getCloudBySlug('amazon-connect');
const AWS = '/v4/aws/';

const CONTACTS = [
  { icon: 'i-phone', name: 'Voz · Consulta de saldo', sub: 'cola: banca personal', st: ['b', 'Lex resolvió'] },
  { icon: 'i-msg', name: 'WhatsApp · Cambio de plan', sub: 'cola: retención', st: ['a', 'Con agente'] },
  { icon: 'i-monitor', name: 'Web · Estado de pedido', sub: 'cola: e-commerce', st: ['b', 'Lex resolvió'] },
  { icon: 'i-phone', name: 'Voz · Reclamo de recibo', sub: 'cola: facturación', st: ['q', 'En cola 0:12'] },
  { icon: 'i-msg', name: 'Chat · Reprogramar visita', sub: 'cola: soporte técnico', st: ['a', 'Con agente'] },
  { icon: 'i-phone', name: 'Voz · Alta de servicio', sub: 'cola: ventas', st: ['q', 'En cola 0:07'] },
];

function SupervisorConsole() {
  const isStatic = () => document.documentElement.classList.contains('static');
  const [tick, setTick] = useState(0);
  const [mets, setMets] = useState({ sl: 94, ag: 23, wt: 42 });
  const timerRef = useRef(null);

  useEffect(() => {
    if (isStatic()) return undefined;
    timerRef.current = setInterval(() => {
      setTick((t) => t + 1);
      setMets((m) => ({
        sl: Math.min(97, Math.max(91, m.sl + (Math.random() > 0.5 ? 1 : -1))),
        ag: Math.min(26, Math.max(21, m.ag + (Math.random() > 0.5 ? 1 : -1))),
        wt: Math.min(58, Math.max(31, m.wt + Math.round(Math.random() * 8 - 4))),
      }));
    }, 2200);
    return () => clearInterval(timerRef.current);
  }, []);

  const rows = [0, 1, 2, 3].map((i) => CONTACTS[(tick + i) % CONTACTS.length]);

  return (
    <div className="acx rv d2" role="img" aria-label="Consola de supervisor de Amazon Connect (ilustrativa)">
      <div className="acx-bar">
        <img src={AWS + 'connect.png'} alt="" />
        <span>Amazon Connect — vista del supervisor</span>
        <span className="acx-live"><i />En vivo</span>
      </div>
      <div className="acx-mets">
        <div className="acxm"><span className="k">Nivel de servicio</span><div className="n">{mets.sl}%<i>▲</i></div></div>
        <div className="acxm"><span className="k">Agentes en línea</span><div className="n">{mets.ag}</div></div>
        <div className="acxm"><span className="k">Espera promedio</span><div className="n">0:{String(mets.wt).padStart(2, '0')}</div></div>
      </div>
      <div className="acx-q">
        {rows.map((c, i) => (
          <div className={`acx-row ${i === 0 ? 'new' : ''}`.trim()} key={`${tick}-${i}`}>
            <span className="ci"><Icon id={c.icon} /></span>
            <span>{c.name}<small>{c.sub}</small></span>
            <span className={`acx-st ${c.st[0]}`}>{c.st[1]}</span>
          </div>
        ))}
      </div>
      <div className="acx-foot">
        <span>Lex atendió 38% solo*</span>
        <span>Contact Lens grabando</span>
        <span>*panel ilustrativo</span>
      </div>
    </div>
  );
}

const FEAT_ICONS = ['connect.png', 'lex.png', 'cloudwatch.png', 'user.png'];

const CANALES = {
  voz: {
    label: 'Voz', nota: 'El IVR con Lex entiende la intención sin menús de «marca 1» — y si deriva, el agente recibe todo el contexto.',
    flow: [['Llama', 'cualquier teléfono'], ['Lex entiende', 'lenguaje natural'], ['Resuelve o deriva', 'según intención'], ['Agente con contexto', 'pantalla lista']],
  },
  chat: {
    label: 'Chat web', nota: 'El mismo bot y las mismas colas del canal de voz — el cliente no repite su historia al cambiar de canal.',
    flow: [['Escribe en tu web', 'widget embebido'], ['Bot responde', 'mismo Lex de voz'], ['Escala si hace falta', 'con transcripción'], ['Agente continúa', 'sin repetir nada']],
  },
  whatsapp: {
    label: 'WhatsApp', nota: 'El canal donde ya están tus clientes, conectado a las mismas colas y métricas del contact center.',
    flow: [['Escribe por WhatsApp', 'número oficial'], ['Bot atiende 24/7', 'respuestas al instante'], ['Deriva en horario', 'a la cola correcta'], ['Todo queda medido', 'mismo dashboard']],
  },
};

export default function AmazonConnectV4() {
  const ref = useV4Page();
  const [canal, setCanal] = useState('voz');
  const c = CANALES[canal];

  return (
    <div ref={ref}>
      <Helmet>
        <title>Amazon Connect — Contact center cloud | Novasys del Perú</title>
        <meta name="description" content="Contact center 100% cloud sobre AWS: omnicanalidad real, IVR inteligente con Amazon Lex, analytics en vivo con Contact Lens y pago por uso. Implementado desde Lima por un AWS Advanced Partner." />
      </Helmet>

      {/* HERO — consola del supervisor */}
      <section className="hero hero-acx" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div>
            <div className="dt-crumb rv">
              <Link to="/cloud">Soluciones</Link><span className="sep">/</span>
              <Link to="/cloud">Cloud AWS</Link><span className="sep">/</span>
              <b>Amazon Connect</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.2vw,68px)' }}>El contact center que escala solo<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">Amazon Connect: tu operación de atención completa en la nube — voz, chat y WhatsApp en un solo journey, IVR que entiende lenguaje natural y analytics en vivo. Sin hardware, pagando por uso.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Solicitar evaluación</Link>
              <a className="link" href="#caps-acx">Ver capacidades <span className="ar">→</span></a>
            </div>
          </div>
          <SupervisorConsole />
        </div>
      </section>

      {/* CAPACIDADES */}
      <section id="caps-acx" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead label="01 — Capacidades" title="Lo que cambia con Connect." />
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

      {/* CANALES */}
      <section>
        <div className="wrap">
          <Shead label="02 — Canales" title="Un journey, el canal que el cliente elija." text="Elige un canal para ver su recorrido — todos comparten colas, bots y métricas." />
          <div className="fchips rv">
            {Object.entries(CANALES).map(([key, v]) => (
              <button key={key} type="button" className={canal === key ? 'on' : ''} aria-pressed={canal === key} onClick={() => setCanal(key)}>
                {v.label}
              </button>
            ))}
          </div>
          <div key={canal}>
            <div className="arch rv in">
              {c.flow.map(([t, sub], i) => (
                <span key={t} style={{ display: 'contents' }}>
                  {i > 0 && <div className="conn"><i /></div>}
                  <div className={`node ${i === 1 ? 'first' : ''}`.trim()}><b>{t}</b><span>{sub}</span></div>
                </span>
              ))}
            </div>
            <p className="demo-note" style={{ textAlign: 'left', marginTop: 16 }}><b>{c.label}</b> — {c.nota}</p>
          </div>
        </div>
      </section>

      {/* ARQUITECTURA */}
      <section>
        <div className="wrap">
          <Shead label="03 — Arquitectura" title="Serverless por diseño." text="La misma arquitectura de referencia que hoy sostiene contact centers de telco y banca en el Perú." />
          <div className="archmeta" style={{ marginTop: 0 }}>
            <div className="bl rv">
              <h4>Stack de referencia</h4>
              <div className="chips">
                <span className="chip ichip"><img src={AWS + 'connect.png'} alt="" />Amazon Connect</span>
                <span className="chip ichip"><img src={AWS + 'lex.png'} alt="" />Amazon Lex</span>
                <span className="chip ichip"><img src={AWS + 'lambda.png'} alt="" />AWS Lambda</span>
                <span className="chip ichip"><img src={AWS + 'kinesis.png'} alt="" />Kinesis Data Streams</span>
                <span className="chip ichip"><img src={AWS + 'dynamodb.png'} alt="" />DynamoDB</span>
                <span className="chip ichip"><img src={AWS + 'cloudwatch.png'} alt="" />Contact Lens · CloudWatch</span>
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

      {/* CASOS */}
      <section>
        <div className="wrap">
          <Shead label="05 — Casos" title="Contact centers que ya migraron." />
          <div className="ccards two">
            <CaseCard img="019-callcenter.jpg" sector="Telecomunicaciones" title="Entel: contact center cloud" text="Migración del contact center on-premise a Amazon Connect — mejor experiencia y costos bajo control." pill="<b>−40%</b> costos operativos" to="/casos-de-exito/entel" linkLabel="Ver el expediente →" />
            <CaseCard img="029-city.jpg" sector="Telecomunicaciones" title="Americatel: migración cloud completa" text="Infraestructura on-premise modernizada a AWS con arquitectura cloud-native." pill="<b>−45%</b> costos de infraestructura" d="d1" to="/casos-de-exito/americatel" linkLabel="Ver el expediente →" />
          </div>
        </div>
      </section>

      <CtaBand
        title={<>¿Tu contact center está <span style={{ color: 'var(--red)' }}>saturado</span>?</>}
        text="Evaluamos tu escenario actual y te devolvemos una arquitectura de referencia con TCO comparativo en 48 horas — sin costo."
        btnLabel="Solicitar evaluación"
      />
    </div>
  );
}
