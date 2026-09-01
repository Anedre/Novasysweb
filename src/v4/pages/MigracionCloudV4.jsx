import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand, CaseCard } from '../partials';
import { getCloudBySlug } from '../../data/cloud.jsx';
import '../styles/detail-kit.css';
import '../styles/cloud-migracion.css';

const s = getCloudBySlug('migracion');
const AWS = '/v4/aws/';

function WaveBoard() {
  const [pct, setPct] = useState(52);
  const timerRef = useRef(null);
  const isStatic = () => document.documentElement.classList.contains('static');

  useEffect(() => {
    if (isStatic()) { setPct(68); return undefined; }
    timerRef.current = setInterval(() => {
      setPct((p) => (p >= 92 ? 46 : p + 6));
    }, 1800);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="mig rv d2" role="img" aria-label="Tablero del plan de migración por olas (ilustrativo)">
      <div className="mig-bar">
        <img src={AWS + 'migration.png'} alt="" />
        <span>Plan de migración — por olas, con rollback listo</span>
      </div>
      <div className="mig-route" aria-hidden="true">
        <div className="mig-end">
          <span className="bx"><span className="mig-rack"><i /><i /><i /></span></span>
          <small>Tu datacenter</small>
        </div>
        <div className="mig-line"><span className="pk" /><span className="pk p2" /><span className="pk p3" /></div>
        <div className="mig-end">
          <span className="bx"><img src={AWS + 'awscloud.png'} alt="" /></span>
          <small>AWS · us-east-1</small>
        </div>
      </div>
      <div className="mig-waves">
        <div className="mgw">
          <div className="mgw-h">Ola 1 — Web y contenido estático<span className="st done">✓ migrada</span></div>
          <div className="mgw-chips"><span className="chip">Portales</span><span className="chip">Archivos</span><span className="chip">DNS</span></div>
          <div className="mgw-bar"><i style={{ width: '100%' }} /></div>
        </div>
        <div className="mgw">
          <div className="mgw-h">Ola 2 — Aplicaciones core<span className="st run">en curso · replicando</span></div>
          <div className="mgw-chips"><span className="chip">ERP satélite</span><span className="chip">Intranet</span><span className="chip">APIs</span></div>
          <div className="mgw-bar"><i style={{ width: `${pct}%` }} /></div>
        </div>
        <div className="mgw">
          <div className="mgw-h">Ola 3 — Bases de datos<span className="st plan">planificada</span></div>
          <div className="mgw-chips"><span className="chip">Oracle → RDS</span><span className="chip">DMS · CDC</span></div>
          <div className="mgw-bar"><i style={{ width: '0%' }} /></div>
        </div>
      </div>
      <div className="mig-foot">
        <span><b>Rollback</b> validado antes de cada ola</span>
        <span>panel ilustrativo</span>
      </div>
    </div>
  );
}

const FEAT_ICONS = ['migration.png', 'awscloud.png', 'lambda.png', 'costexplorer.png'];

const R6 = {
  rehost: { label: 'Rehost', t: 'Mover la carga tal cual', p: 'Lift-and-shift con AWS MGN: la aplicación se replica en bloque y se corta el tráfico cuando todo está validado.', cu: 'La vía rápida para salir del datacenter sin tocar la aplicación.' },
  replatform: { label: 'Replatform', t: 'Ajustes mínimos, mucho ahorro', p: 'Pequeños cambios para aprovechar servicios gestionados: la base de datos a RDS, el balanceo a ELB, los archivos a S3.', cu: 'Cuando un cambio chico elimina años de mantenimiento manual.' },
  repurchase: { label: 'Repurchase', t: 'Reemplazar por SaaS', p: 'La aplicación se retira y su función pasa a un producto en la nube que ya la resuelve mejor.', cu: 'Cuando mantener la app custom ya no se justifica frente a un SaaS maduro.' },
  refactor: { label: 'Refactor', t: 'Rediseñar para la nube', p: 'Re-arquitectura serverless o en contenedores — la inversión más alta, reservada para las cargas que la ameritan.', cu: 'Cargas core con roadmap largo, donde la elasticidad paga el rediseño.' },
  retire: { label: 'Retire', t: 'Apagar lo que nadie usa', p: 'El assessment siempre encuentra sistemas que ya nadie abre. Se documentan, se respaldan y se apagan.', cu: 'Ahorro inmediato: menos licencias, menos parches, menos superficie de ataque.' },
  retain: { label: 'Retain', t: 'Dejar lo que debe quedarse', p: 'No todo debe migrar hoy. Lo que tiene razones de regulación, latencia o dependencias se queda — documentado y revisado cada año.', cu: 'Una migración honesta también sabe decir «esto todavía no».' },
};

export default function MigracionCloudV4() {
  const ref = useV4Page();
  const [r, setR] = useState('rehost');
  const rd = R6[r];

  return (
    <div ref={ref}>
      <Helmet>
        <title>Migración Cloud a AWS — Sin interrupciones | Novasys del Perú</title>
        <meta name="description" content="Migramos tu infraestructura on-premise a AWS por olas, con rollback validado y downtime bajo control: assessment, 6R, Landing Zone y optimización FinOps. AWS Advanced Partner en Lima." />
      </Helmet>

      {/* HERO — tablero de olas */}
      <section className="hero hero-mig" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div>
            <div className="dt-crumb rv">
              <Link to="/cloud">Soluciones</Link><span className="sep">/</span>
              <Link to="/cloud">Cloud AWS</Link><span className="sep">/</span>
              <b>Migración Cloud</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.2vw,68px)' }}>A la nube por olas, no de un salto<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">Migramos tu infraestructura a AWS con un plan por olas: cada carga se replica, se valida y recién entonces se corta — con rollback listo y downtime bajo control.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Pedir TCO comparativo</Link>
              <a className="link" href="#metodo-mig">Ver la metodología <span className="ar">→</span></a>
            </div>
          </div>
          <WaveBoard />
        </div>
      </section>

      {/* METODOLOGÍA */}
      <section id="metodo-mig" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead label="01 — Metodología" title="AWS MAP, adaptado al Perú." text="Assessment con inventario real, plan por olas con criterios de éxito, y FinOps después del cutover para que el ahorro no se evapore." />
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

      {/* 6R */}
      <section>
        <div className="wrap">
          <Shead label="02 — Las 6R" title="No todo se migra igual." text="Cada carga recibe una estrategia — elige una R para ver qué significa y cuándo aplica." />
          <div className="fchips rv">
            {Object.entries(R6).map(([key, v]) => (
              <button key={key} type="button" className={r === key ? 'on' : ''} aria-pressed={r === key} onClick={() => setR(key)}>
                {v.label}
              </button>
            ))}
          </div>
          <div className="r6p" key={r}>
            <h3><b>{rd.label}</b> — {rd.t}</h3>
            <p>{rd.p}</p>
            <div className="cu"><b>Cuándo aplica:</b> {rd.cu}</div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section>
        <div className="wrap">
          <Shead label="03 — Herramientas" title="Con qué se ejecuta la migración." />
          <div className="archmeta" style={{ marginTop: 0 }}>
            <div className="bl rv">
              <h4>Stack de referencia</h4>
              <div className="chips">
                <span className="chip ichip"><img src={AWS + 'migration.png'} alt="" />AWS Migration Hub</span>
                {s.architecture.stack.filter((c) => !c.label.includes('Migration Hub')).map((c) => (
                  <span className="chip" key={c.label}>{c.label}</span>
                ))}
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
          <Shead label="05 — Casos" title="Migraciones que ya aterrizaron." />
          <div className="ccards two">
            <CaseCard img="029-city.jpg" sector="Telecomunicaciones" title="Americatel: migración cloud completa" text="Migración de infraestructura on-premise a AWS con arquitectura cloud-native — sin interrupciones." pill="<b>−45%</b> costos de infraestructura" to="/casos-de-exito/americatel" linkLabel="Ver el expediente →" />
            <CaseCard img="019-callcenter.jpg" sector="Telecomunicaciones" title="Entel: contact center a la nube" text="El contact center completo migrado a Amazon Connect — el caso insignia de la migración por olas." pill="<b>−40%</b> costos operativos" d="d1" to="/casos-de-exito/entel" linkLabel="Ver el expediente →" />
          </div>
        </div>
      </section>

      <CtaBand
        title={<>¿Pensando en <span style={{ color: 'var(--red)' }}>migrar</span> a la nube?</>}
        text="Te enviamos un TCO comparativo cloud vs. on-premise en 72 horas — sin costo y sin compromiso. Si aún no te conviene migrar, el análisis también lo dirá."
        btnLabel="Pedir TCO comparativo"
      />
    </div>
  );
}
