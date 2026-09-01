import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { IMG, Shead, StatsBar, CtaBand } from '../partials';
import '../styles/nosotros.css';
import '../styles/nosotros-extra.css';

/* Hero orbital: dos anillos girando con medallones-fotografía. */
const MEDS_A = [
  { a: 20, f: '090-team.jpg' }, { a: 110, f: '097-team.jpg' },
  { a: 200, f: '083-team.jpg' }, { a: 290, f: '095-team.jpg' },
];
const MEDS_B = [
  { a: 0, f: '033-datacenter.jpg' }, { a: 65, f: '084-team.jpg' },
  { a: 140, f: '036-datacenter.jpg' }, { a: 215, f: '105-team.jpg' }, { a: 285, f: '111-tech.jpg' },
];

function OrbitHero() {
  const [lit, setLit] = useState(-1);
  useEffect(() => {
    if (document.documentElement.classList.contains('static')) return undefined;
    const total = MEDS_A.length + MEDS_B.length;
    const t = setInterval(() => setLit(Math.floor(Math.random() * total)), 1700);
    return () => clearInterval(t);
  }, []);

  const med = (m, idx) => (
    <span
      key={m.f}
      className={`omed ${lit === idx ? 'lit' : ''}`}
      style={{ transform: `rotate(${m.a}deg) translateX(var(--r))` }}
    >
      <span className="okeep-rot">
        <span className="okeep-fix" style={{ rotate: `${-m.a}deg` }}>
          <img src={IMG + m.f} alt="" />
        </span>
      </span>
    </span>
  );

  return (
    <section className="hero-nos2">
      <div className="orbit" aria-hidden="true">
        <span className="ocenter" />
        <div className="oring b">{MEDS_B.map((m, i) => med(m, MEDS_A.length + i))}</div>
        <div className="oring a">{MEDS_A.map((m, i) => med(m, i))}</div>
      </div>
      <div className="onucleo">
        <div className="lbl rv">Nosotros — <b>Desde 2010 · Lima</b></div>
        <h1 className="nos-h rv d1">
          Construimos la infraestructura silenciosa del Perú<span style={{ color: 'var(--red)' }}>.</span>
        </h1>
        <p className="hero-sub rv d2" style={{ maxWidth: '58ch', margin: '0 auto' }}>
          Los sistemas que sostienen a bancos, aseguradoras y telcos — operados con
          equipo propio, sin tercerizar. Que funcionen tan bien que nadie tenga que pensar en ellos.
        </p>
        <div className="hero-ctas rv d3">
          <Link className="btn" to="/contacto">Conversemos</Link>
          <Link className="link" to="/casos-de-exito">Ver casos <span className="ar">→</span></Link>
        </div>
      </div>
    </section>
  );
}

const PRINCIPIOS = [
  { n: 'I', icon: 'i-target', tag: 'Decisiones con datos', title: 'Rigor', text: 'Cada decisión técnica se defiende con datos. No vendemos magia — vendemos ingeniería que se puede auditar.' },
  { n: 'II', icon: 'i-doc', tag: 'SLA por escrito', title: 'Transparencia', text: 'SLA visibles, roadmap compartido y costos sin sorpresas. El cliente ve exactamente lo mismo que nosotros.' },
  { n: 'III', icon: 'i-pin', tag: 'GMT-5 · Lima', title: 'Proximidad', text: 'Equipo propio en Lima, en tu zona horaria y con contexto local. Resuelves con quien conoce tu operación — sin tercerizar.' },
];

export default function NosotrosV4() {
  const ref = useV4Page();

  return (
    <div ref={ref}>
      <Helmet>
        <title>Nosotros — Novasys del Perú</title>
        <meta name="description" content="Desde 2010 construimos y operamos los sistemas que sostienen a bancos, aseguradoras y telcos del Perú — con equipo propio en Lima, sin tercerizar." />
      </Helmet>

      {/* HERO — orbital: el manifiesto rodeado de la operación girando */}
      <OrbitHero />

      <StatsBar style={{ borderTop: '1px solid var(--line)' }} />

      {/* PRINCIPIOS */}
      <section>
        <div className="wrap">
          <Shead label="01 — Principios" title="Tres principios no negociables." />
          <div className="nrows">
            {PRINCIPIOS.map((p) => (
              <div className="nrow rv" key={p.n}>
                <span>
                  <span className="rn-box">
                    <span className="sico-chip"><Icon id={p.icon} /></span>
                    <span className="rn">{p.n}</span>
                  </span>
                  <span className="mono-tag">{p.tag}</span>
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDO */}
      <section>
        <div className="wrap">
          <Shead label="02 — Credo" title="Lo que defendemos. Lo que evitamos." text="Quince años operando tecnología crítica dejan reglas claras — estas son las nuestras." />
          <div className="credo">
            <div className="cr si rv">
              <h4>Defendemos</h4>
              <ul>
                <li><i>✓</i>SLA por escrito y visibles para el cliente, siempre.</li>
                <li><i>✓</i>Demos frecuentes: avance real desde la semana uno.</li>
                <li><i>✓</i>Arquitecturas que otro equipo podría auditar y mantener.</li>
                <li><i>✓</i>Decir «esto no te conviene» aunque cueste una venta.</li>
                <li><i>✓</i>Hablar claro y rápido cuando algo sale mal.</li>
              </ul>
            </div>
            <div className="cr no rv d1">
              <h4>Evitamos</h4>
              <ul>
                <li><i>✕</i>Cajas negras que solo nosotros entendemos.</li>
                <li><i>✕</i>Atarte a una marca por comodidad nuestra.</li>
                <li><i>✕</i>Prometer mejoras sin una línea base medida.</li>
                <li><i>✕</i>Tercerizar tu operación a un equipo que no conoces.</li>
                <li><i>✕</i>Cobrar por horas lo que se puede resolver en una.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section>
        <div className="wrap">
          <Shead label="03 — El equipo" title="Las personas detrás de la operación." text="Ingenieros propios — sin tercerizar — trabajando al lado de tu operación desde 2010." />
          <div className="bento">
            <figure className="b1 rv"><img src={IMG + '097-team.jpg'} alt="Sesión de planificación con post-its" loading="lazy" /><figcaption>Diseño de solución</figcaption></figure>
            <figure className="rv d1"><img src={IMG + '084-team.jpg'} alt="Trabajo en equipo con laptop" loading="lazy" /><figcaption>Con el cliente</figcaption></figure>
            <figure className="rv d2"><img src={IMG + '088-team.jpg'} alt="Equipo trabajando en oficina" loading="lazy" /><figcaption>Ingeniería</figcaption></figure>
            <figure className="b4 rv d3"><img src={IMG + '095-team.jpg'} alt="Equipo revisando una tablet" loading="lazy" /><figcaption>Un solo equipo · Lima</figcaption></figure>
          </div>
        </div>
      </section>

      {/* ALIANZAS */}
      <section>
        <div className="wrap">
          <Shead label="04 — Alianzas" title="Partners certificados, operados desde Lima." />
        </div>
        <div className="partners" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="wrap rv">
            <span><b>AWS</b> Advanced Partner</span>
            <span><b>HP · HPE</b> Gold Partner</span>
            <span><b>Oracle</b> Partner</span>
            <span><b>ELO</b> ECM Certified</span>
          </div>
        </div>
      </section>

      <figure className="photo-band" style={{ marginTop: 'clamp(64px,9vw,110px)' }}>
        <img src={IMG + '100-team.jpg'} alt="Oficina del equipo en Lima" loading="lazy" data-plx />
        <figcaption>Fig. 02 — El equipo, en Lima</figcaption>
        <div className="pb-chips">
          <span><i />Equipo propio</span>
          <span><i />Sin tercerizar</span>
          <span><i />Desde 2010</span>
        </div>
      </figure>

      <CtaBand
        title={<>¿Trabajamos <span style={{ color: 'var(--red)' }}>juntos</span>?</>}
        text="Dos caminos, una misma puerta: cuéntanos tu reto — o si eres ingeniero y quieres operar tecnología crítica, súmate al equipo."
        btnLabel="Conversemos"
        extraAction={(
          <a className="link" href="mailto:contacto@novasysperu.com" style={{ color: 'var(--paper)', borderColor: 'var(--band-tx2)' }}>
            ¿Eres ingeniero? Súmate al equipo <span className="ar">→</span>
          </a>
        )}
      />
    </div>
  );
}
