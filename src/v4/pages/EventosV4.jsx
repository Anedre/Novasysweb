import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand } from '../partials';
import webinarImg from '../../img/eventos/webinar.jpg';
import tallerImg from '../../img/eventos/taller.jpg';
import summitImg from '../../img/eventos/summit.jpg';
import '../styles/detail-kit.css';
import '../styles/eventos.css';

/* Mismo backend real del formulario de contacto (API GW → Lambda → SES) */
const ENDPOINT = 'https://7lquw99pc9.execute-api.us-east-1.amazonaws.com/';

const TOPICS_A = ['Amazon Connect', 'Business Intelligence', 'Migración a AWS', 'CRM & Ventas', 'Gestión Documental', 'IA en producción'];
const TOPICS_B = ['Arquitectura serverless', 'Infraestructura HPE', 'Oracle Analytics', 'Contact center con IA', 'AWS Well-Architected', 'Data warehouse'];

const FORMATOS = [
  { img: webinarImg, icon: 'i-monitor', tag: 'Online · ~45 min', title: 'Webinars', desc: 'Sesiones online, cortas y al grano, sobre un tema puntual: Amazon Connect, BI o migración a AWS. En vivo, con espacio para tus preguntas.' },
  { img: tallerImg, icon: 'i-users', tag: 'Hands-on', title: 'Talleres a medida', desc: 'Formación práctica para tu equipo, sobre casos de tu industria — de la configuración a la adopción, no slides genéricos.' },
  { img: summitImg, icon: 'i-pin', tag: 'Presencial · Lima', title: 'Encuentros presenciales', desc: 'Charlas, demos y networking junto a nuestros partners AWS, HPE y Oracle — donde los decisores de TI del Perú comparan notas.' },
];

function Newsletter() {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | ok | fail

  const submit = async (e) => {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: 'Suscripción a eventos (newsletter)',
          email,
          tipo: 'Newsletter — eventos',
          msg: 'Quiere recibir aviso cuando abra el próximo webinar o taller.',
          web: hp,
        }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setState('ok');
    } catch {
      setState('fail');
    }
  };

  return (
    <div className="ev-nl rv" id="newsletter" style={{ scrollMarginTop: 84 }}>
      <div>
        <h3>No te pierdas la <b>próxima fecha</b>.</h3>
        <p>Déjanos tu correo y te avisamos cuando abramos un webinar o taller. Sin spam — solo cuando hay algo real que contarte.</p>
      </div>
      <div>
        {state === 'ok' ? (
          <div className="ev-nlok">
            <Icon id="i-check" />
            <span><b>¡Anotado!</b> Te escribiremos cuando abramos la próxima sesión.</span>
          </div>
        ) : (
          <form className="ev-nlf" onSubmit={submit}>
            <input
              type="email"
              required
              placeholder="tu@empresa.com"
              aria-label="Tu correo de trabajo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="web"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />
            <button className="btn-red" type="submit" disabled={state === 'sending'}>
              {state === 'sending' ? 'Enviando…' : 'Avísame'}
            </button>
          </form>
        )}
        {state === 'fail' && <p className="ev-nlerr">No pudimos registrarte — intenta de nuevo o escríbenos a contacto@novasysperu.com.</p>}
        {state !== 'ok' && <p className="ev-nlfoot">Llega directo al equipo — respondemos nosotros, no un bot.</p>}
      </div>
    </div>
  );
}

export default function EventosV4() {
  const ref = useV4Page();

  return (
    <div ref={ref}>
      <Helmet>
        <title>Eventos y formación — Novasys del Perú</title>
        <meta name="description" content="Webinars, talleres a medida y encuentros presenciales sobre Amazon Connect, cloud AWS, Business Intelligence e infraestructura — dictados por los equipos que implementan en producción." />
      </Helmet>

      {/* HERO — tipográfico + doble marquee */}
      <section className="hero hero-ev" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div style={{ maxWidth: 780 }}>
            <div className="dt-crumb rv">
              <Link to="/nosotros">Empresa</Link><span className="sep">/</span>
              <b>Eventos & formación</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(40px,5.6vw,78px)' }}>Compartimos lo que implementamos<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">Webinars, talleres y encuentros presenciales — dictados por los mismos equipos que despliegan en producción, explicando cómo. Sin humo.</p>
            <div className="hero-ctas rv d3">
              <a className="btn" href="#newsletter">Avísame de la próxima</a>
              <Link className="link" to="/contacto">Pedir un taller a medida <span className="ar">→</span></Link>
            </div>
          </div>
        </div>
        <div className="ev-mq" aria-hidden="true">
          <div className="ev-track">
            {[0, 1].map((k) => (
              <div className="ev-seq" key={k}>
                {TOPICS_A.map((t) => <span className="chip" key={t}><i />{t}</span>)}
              </div>
            ))}
          </div>
        </div>
        <div className="ev-mq rev" aria-hidden="true">
          <div className="ev-track">
            {[0, 1].map((k) => (
              <div className="ev-seq" key={k}>
                {TOPICS_B.map((t) => <span className="chip" key={t}><i />{t}</span>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATOS */}
      <section>
        <div className="wrap">
          <Shead label="01 — Formatos" title="Tres maneras de aprender con nosotros." text="No publicamos un calendario fijo — las fechas salen por el newsletter y por LinkedIn. Estos son los formatos en los que compartimos lo que sabemos." />
          <div className="ev-fmts">
            {FORMATOS.map((f, i) => (
              <article className={`ev-fmt rv ${i ? `d${i}` : ''}`.trim()} key={f.title}>
                <div className="ph">
                  <img src={f.img} alt={f.title} loading="lazy" />
                  <span className="tag">{f.tag}</span>
                </div>
                <div className="bd">
                  <span className="mi"><Icon id={f.icon} /></span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section>
        <div className="wrap">
          <Newsletter />
        </div>
      </section>

      <CtaBand
        title={<>¿Un taller <span style={{ color: 'var(--red)' }}>para tu equipo</span>?</>}
        text="Armamos una sesión a medida sobre el tema que necesites — Amazon Connect, BI, cloud o infraestructura — con casos de tu propia industria."
        btnLabel="Solicitar un taller"
        extraAction={<Link className="link" style={{ color: '#fff', borderColor: '#fff' }} to="/casos-de-exito">Ver casos de éxito <span className="ar">→</span></Link>}
      />
    </div>
  );
}
