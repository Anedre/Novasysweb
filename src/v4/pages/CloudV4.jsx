import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { IMG, Shead, CtaBand, CaseCard, AriaBand } from '../partials';
import '../styles/cloud.css';
import '../styles/cloud-extra.css';

const AWS = '/v4/aws/';

const NODES = [
  { name: 'Cliente', sub: 'voz · chat', icon: 'user.png', first: true, info: 'Voz y chat entran por cualquier canal — teléfono, web o WhatsApp.' },
  { name: 'Amazon Connect', sub: 'contact center', icon: 'connect.png', info: 'El contact center en la nube: enrutamiento, colas y agentes.' },
  { name: 'Amazon Lex', sub: 'IVR · bots', icon: 'lex.png', info: 'Bots e IVR conversacional que entienden lenguaje natural.' },
  { name: 'AWS Lambda', sub: 'lógica', icon: 'lambda.png', info: 'La lógica de negocio en serverless — escala sola y pagas por uso.' },
  { name: 'DynamoDB', sub: 'datos', icon: 'dynamodb.png', info: 'Datos de clientes y sesiones con latencia de milisegundos.' },
];

/* Diagrama por capas — coordenadas en el viewBox 660×620 (columna) */
const VB = { w: 660, h: 620 };

const ANODES = [
  { id: 'user', x: 330, y: 34, icon: 'user.png', name: 'Cliente', sub: 'voz · chat', ghost: true, info: 'Voz y chat entran por cualquier canal — teléfono, web o WhatsApp.' },
  { id: 'connect', x: 185, y: 172, icon: 'connect.png', name: 'Amazon Connect', sub: 'contact center', info: 'El contact center en la nube: enrutamiento, colas y agentes.' },
  { id: 'lex', x: 475, y: 172, icon: 'lex.png', name: 'Amazon Lex', sub: 'IVR · bots', info: 'Bots e IVR conversacional que entienden lenguaje natural.' },
  { id: 'lambda', x: 170, y: 372, icon: 'lambda.png', name: 'AWS Lambda', sub: 'lógica', info: 'La lógica de negocio en serverless — escala sola y pagas por uso.' },
  { id: 'dynamo', x: 340, y: 372, icon: 'dynamodb.png', name: 'DynamoDB', sub: 'datos', info: 'Datos de clientes y sesiones con latencia de milisegundos.' },
  { id: 'kinesis', x: 528, y: 372, icon: 'kinesis.png', name: 'Kinesis', sub: 'streams', info: 'Eventos de cada llamada fluyendo en tiempo real.' },
  { id: 'cw', x: 150, y: 556, icon: 'cloudwatch.png', name: 'CloudWatch', sub: 'métricas', info: 'Métricas, logs y alarmas de toda la plataforma.' },
  { id: 's3', x: 330, y: 556, icon: 's3.png', name: 'Amazon S3', sub: 'grabaciones', info: 'Grabaciones y reportes, cifrados y versionados.' },
  { id: 'xray', x: 510, y: 556, icon: 'xray.png', name: 'X-Ray', sub: 'trazas', info: 'Trazas end-to-end de cada request para depurar rápido.' },
];

const ALAYERS = [
  { cls: '', x: 16, y: 92, w: 628, h: 512, tag: 'AWS Cloud', icon: 'awscloud.png' },
  { cls: '', x: 48, y: 258, w: 564, h: 206, tag: 'Región · us-east-1' },
  { cls: 'vpc', x: 76, y: 300, w: 350, h: 138, tag: 'VPC privada' },
];

const AWIRES = [
  { d: 'M330 52 L330 110 L185 110 L185 148', flow: true },
  { d: 'M185 172 L475 172', flow: true },
  { d: 'M185 196 L185 372', flow: true },
  { d: 'M170 372 L340 372', flow: true },
  { d: 'M340 396 L340 430 L528 430 L528 396', flow: true },
  { d: 'M528 396 L528 500 L330 500 L330 534', flow: true },
  { d: 'M110 464 L150 532', flow: false },
  { d: 'M550 464 L510 532', flow: false },
];

const PILLARS = [
  {
    icon: 'connect.png', photo: '020-callcenter.jpg', label: 'Amazon Connect',
    title: 'Contact Center con IA', to: '/cloud/amazon-connect',
    desc: 'El contact center completo en la nube, sin hardware que mantener.',
    feats: ['IVR inteligente con Amazon Lex', 'Analytics de llamadas en tiempo real', 'Escala sola en picos de demanda'],
    tags: ['Omnicanal', 'Voz', 'Chat'],
  },
  {
    icon: 'connect.png', photo: '021-callcenter.jpg', label: 'Amazon Connect · Outbound',
    title: 'Connect Dialer', to: '/cloud/connect-dialer',
    desc: 'Campañas salientes sobre Connect, con compliance de fábrica.',
    feats: ['Marcación predictiva y progresiva', 'Cobranza, televentas y encuestas', 'Horarios y listas con reglas'],
    tags: ['Campañas', 'Contactabilidad'],
  },
  {
    icon: 'migration.png', photo: '036-datacenter.jpg', label: 'AWS Migration',
    title: 'Migración cloud', to: '/cloud/migracion',
    desc: 'De on-premise a AWS sin apagar la operación.',
    feats: ['Assessment y plan por olas', 'Ejecución sin interrupciones', 'TCO claro antes de mover nada'],
    tags: ['Rehost', 'Replatform'],
  },
  {
    icon: 'sagemaker.png', photo: '114-tech.jpg', label: 'SageMaker · Bedrock',
    title: 'IA & Machine Learning', to: '/cloud/sagemaker',
    desc: 'Modelos en producción, no en un notebook.',
    feats: ['MLOps para mantenerlos vivos', 'IA generativa con Bedrock', 'Datos listos para entrenar'],
    tags: ['MLOps', 'GenAI'],
  },
];

const STACK_CHIPS = [
  { t: 'Amazon Connect', i: 'connect.png' }, { t: 'AWS Lambda', i: 'lambda.png' },
  { t: 'Kinesis Data Streams', i: 'kinesis.png' }, { t: 'DynamoDB', i: 'dynamodb.png' },
  { t: 'CloudWatch', i: 'cloudwatch.png' }, { t: 'Terraform' }, { t: 'CI/CD · GitHub Actions' },
];

const MARQUEE = [
  { t: 'Amazon Connect', i: 'connect.png' }, { t: 'Amazon Lex', i: 'lex.png' },
  { t: 'AWS Lambda', i: 'lambda.png' }, { t: 'DynamoDB', i: 'dynamodb.png' },
  { t: 'Kinesis', i: 'kinesis.png' }, { t: 'CloudWatch', i: 'cloudwatch.png' },
  { t: 'X-Ray', i: 'xray.png' }, { t: 'SageMaker', i: 'sagemaker.png' },
  { t: 'Bedrock', i: 'bedrock.png' }, { t: 'S3', i: 's3.png' },
  { t: 'CloudFront', i: 'cloudfront.png' }, { t: 'Terraform' },
];

const VENTAJAS = [
  { icon: 'awscloud.png', n: '01', title: 'AWS Advanced Partner', text: 'Acceso directo a soporte y recursos exclusivos de Amazon Web Services.' },
  { icon: 'wellarchitected.png', n: '02', title: 'Well-Architected', text: 'Diseñamos siguiendo el AWS Well-Architected Framework, con review anual.' },
  { icon: 'costexplorer.png', n: '03', title: 'Pay-per-use', text: 'Solo pagas por lo que usas — optimizamos costos desde el diseño de la arquitectura.' },
  { icon: 'cloudwatch.png', n: '04', title: 'Monitoreo 24/7', text: 'Dashboards de CloudWatch y alertas proactivas para tu infraestructura.' },
];

function PillarStack() {
  const [act, setAct] = useState(0);
  const timerRef = useRef(null);
  const n = PILLARS.length;
  const isStatic = () => document.documentElement.classList.contains('static');

  const restart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isStatic()) timerRef.current = setInterval(() => setAct((a) => (a + 1) % n), 5200);
  }, [n]);

  useEffect(() => {
    restart();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [restart]);

  return (
    <div
      className="pstack rv"
      aria-label="Pilares cloud"
      onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
      onMouseLeave={restart}
    >
      {PILLARS.map((p, i) => (
        <Link
          key={p.title}
          className="pcardx"
          to={p.to}
          data-pos={String((i - act + n) % n)}
          onClick={(e) => { if (i !== act) { e.preventDefault(); setAct(i); restart(); } }}
        >
          <span className="pph"><img src={IMG + p.photo} alt="" /></span>
          <span className="pbd">
            <img className="aico" src={AWS + p.icon} alt="" />
            <span className="plabel">{p.label}</span>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <ul className="feats">{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
            <span className="tags">{p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</span>
            <span className="go">Conocer el servicio →</span>
          </span>
        </Link>
      ))}
      <div className="pstack-dots" aria-hidden="true">
        {PILLARS.map((p, i) => (
          <i key={p.title} className={i === act ? 'on' : ''} onClick={() => { setAct(i); restart(); }} />
        ))}
      </div>
    </div>
  );
}

export default function CloudV4() {
  const ref = useV4Page();
  const [active, setActive] = useState(null);
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  return (
    <div ref={ref}>
      <Helmet>
        <title>Cloud AWS — Novasys del Perú</title>
        <meta name="description" content="Contact centers con Amazon Connect, migraciones a AWS sin interrupciones, serverless e IA con SageMaker — implementado y operado desde Lima por un AWS Advanced Partner." />
      </Helmet>

      {/* HERO — diagrama protagonista */}
      <section className="hero hero-cloud" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div className="hc-top">
            <div className="lbl rv">Soluciones — <b>Cloud AWS</b></div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.4vw,72px)' }}>La nube que sostiene tu operación<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">Contact centers con IA, migraciones sin interrupciones y arquitecturas serverless. Todo el poder de AWS, operado por un equipo local certificado.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Consultoría cloud</Link>
              <a className="link" href="#servicios-cloud">Ver servicios <span className="ar">→</span></a>
            </div>
            <div className="arch-cap rv d3" style={{ marginTop: 30 }}>
              <span className="lbl">Flujo de referencia · <b>Contact center</b></span>
            </div>
            <p className="arch-info rv d3">
              {active
                ? <><b>{active.name}</b> — {active.info}</>
                : <><b>›</b> Pasa el cursor por un nodo para ver qué hace.</>}
            </p>
          </div>
          {/* Diagrama por capas (desktop, al costado) */}
          <div className="archi rv d2" aria-label="Arquitectura de referencia del contact center en AWS">
            {ALAYERS.map((l) => (
              <div
                key={l.tag}
                className={`alayer ${l.cls}`}
                style={{ left: `${(l.x / VB.w) * 100}%`, top: `${(l.y / VB.h) * 100}%`, width: `${(l.w / VB.w) * 100}%`, height: `${(l.h / VB.h) * 100}%` }}
              >
                <span className="ltag">{l.icon && <img src={AWS + l.icon} alt="" />}{l.tag}</span>
              </div>
            ))}
            <svg className="wires" viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="none" aria-hidden="true">
              {AWIRES.map((w, i) => (
                <path key={i} id={`aw${i}`} className={`wire ${w.flow ? '' : 'dash'}`} d={w.d} />
              ))}
              {!reduced && AWIRES.filter((w) => w.flow).map((w, i) => (
                <circle key={`d${i}`} className="flowdot" r="3.2">
                  <animateMotion dur={`${2.6 + i * 0.5}s`} repeatCount="indefinite" path={w.d} />
                </circle>
              ))}
            </svg>
            {ANODES.map((nd) => (
              <div
                key={nd.id}
                className={`anode ${nd.ghost ? 'ghost' : ''}`}
                style={{ left: `${(nd.x / VB.w) * 100}%`, top: `${(nd.y / VB.h) * 100}%` }}
                onMouseEnter={() => setActive(nd)}
                onMouseLeave={() => setActive(null)}
              >
                <img src={AWS + nd.icon} alt="" />
                <b>{nd.name}</b><span>{nd.sub}</span>
              </div>
            ))}
            <span className="obs-label" style={{ left: '50%', top: `${(617 / VB.h) * 100}%` }}>· Observabilidad ·</span>
          </div>

          {/* Fallback lineal (móvil) */}
          <div className="arch archero solo-movil rv d2">
            {NODES.map((nd, i) => (
              <span key={nd.name} style={{ display: 'contents' }}>
                {i > 0 && <div className="conn"><i /></div>}
                <div
                  className={`node ${nd.first ? 'first' : ''}`}
                  onMouseEnter={() => setActive(nd)}
                  onMouseLeave={() => setActive(null)}
                >
                  <img className="nico" src={AWS + nd.icon} alt="" />
                  <b>{nd.name}</b><span>{nd.sub}</span>
                </div>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PILARES — stack 3D */}
      <section id="servicios-cloud">
        <div className="wrap">
          <Shead label="01 — Servicios" title="Cuatro pilares cloud." text="Del contact center al machine learning — haz clic en una tarjeta para traerla al frente, o entra al servicio desde la activa." />
          <PillarStack />
          <div style={{ marginTop: 'clamp(28px,4vw,48px)' }}>
            <AriaBand eyebrow="Producto propio · corre sobre AWS" />
          </div>
        </div>
      </section>

      {/* DECISIONES */}
      <section>
        <div className="wrap">
          <Shead label="02 — Arquitectura" title="Decisiones que sostienen el diagrama." text="Arquitectura de referencia probada en despliegues de banca, telco y retail peruano." />
          <div className="archmeta" style={{ marginTop: 0 }}>
            <div className="bl rv">
              <h4>Stack de referencia</h4>
              <div className="chips">
                {STACK_CHIPS.map((c) => (
                  <span className={`chip ${c.i ? 'ichip' : ''}`} key={c.t}>
                    {c.i && <img src={AWS + c.i} alt="" />}{c.t}
                  </span>
                ))}
              </div>
            </div>
            <div className="bl rv d1">
              <h4>Decisiones clave</h4>
              <ul>
                <li>Multi-región con failover activo-pasivo (us-east-1 / us-west-2)</li>
                <li>Infraestructura 100% como código — Terraform + módulos internos</li>
                <li>Observabilidad end-to-end con CloudWatch + X-Ray</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VENTAJAS */}
      <section>
        <div className="wrap">
          <Shead label="03 — Ventajas" title="¿Por qué AWS con Novasys?" />
          <div className="steps">
            {VENTAJAS.map((v, i) => (
              <div className={`step rv ${i ? `d${i}` : ''}`} key={v.n}>
                <img className="sico" src={AWS + v.icon} alt="" />
                <span className="n n-abs">{v.n}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE DEL STACK */}
      <div className="mq mq-chips" aria-label="Stack AWS operado">
        <div className="mq-in">
          {[0, 1].map((k) => (
            <div className="mq-seq" aria-hidden={k === 1 || undefined} key={k}>
              {MARQUEE.map((c) => (
                <span className={`chip ${c.i ? 'ichip' : ''}`} key={c.t}>
                  {c.i && <img src={AWS + c.i} alt="" />}{c.t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CASOS */}
      <section>
        <div className="wrap">
          <Shead label="04 — Casos AWS" title="Casos con esta arquitectura, hoy en producción." />
          <div className="ccards two">
            <CaseCard img="019-callcenter.jpg" sector="Telecomunicaciones" title="Entel: contact center cloud con Amazon Connect" text="Migración del contact center on-premise a la nube, reduciendo costos y mejorando la experiencia del cliente." pill="<b>−40%</b> costos operativos" />
            <CaseCard img="029-city.jpg" sector="Telecomunicaciones" title="Americatel: migración cloud y modernización" text="Migración completa de infraestructura on-premise a AWS con arquitectura cloud-native." pill="<b>−45%</b> costos de infraestructura" d="d1" />
          </div>
          <p className="rv" style={{ marginTop: 26 }}>
            <Link className="link" to="/casos-de-exito">Ver todos los casos <span className="ar">→</span></Link>
          </p>
        </div>
      </section>

      <CtaBand
        title={<>¿Listo para llevar tu infraestructura a la <span style={{ color: 'var(--red)' }}>nube</span>?</>}
        text="Agenda una consultoría cloud gratuita. Te devolvemos un TCO comparativo y un plan de migración por olas en menos de 24 h."
        btnLabel="Consultoría cloud gratuita"
      />
    </div>
  );
}
