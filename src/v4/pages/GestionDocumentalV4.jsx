import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand, CaseCard } from '../partials';
import { getSolutionBySlug } from '../../data/solutions.jsx';
import '../styles/detail-kit.css';
import '../styles/sol-ecm.css';

const s = getSolutionBySlug('gestion-documental');

const ETAPAS = [
  { icon: 'i-doc', name: 'Captura', sub: 'escáner · email · masiva', info: 'El documento entra por escáner, correo o carga masiva — y desde el segundo uno ya es trazable.' },
  { icon: 'i-search', name: 'OCR', sub: 'texto y campos extraídos', info: 'OCR full-text: el sistema lee RUC, fechas y montos — y todo el contenido queda buscable en segundos.' },
  { icon: 'i-layers', name: 'Clasificación', sub: 'tipo y carpeta automáticos', info: 'Se clasifica y archiva solo, según reglas por tipo documental — nadie decide «dónde lo guardo».' },
  { icon: 'i-check', name: 'Aprobación', sub: 'flujo con SLA', info: 'El aprobador recibe la tarea con SLA. Si no responde a tiempo, el flujo escala solo.' },
  { icon: 'i-shield', name: 'Archivo', sub: 'retención y auditoría', info: 'Retención legal por tipo de documento, con auditoría completa de cada acceso y cada versión.' },
];

const LINES = [92, 78, 86, 60, 88, 74, 52];

function DocStage({ stage }) {
  return (
    <div className="ecmd" key={stage} role="img" aria-label={`Documento en etapa: ${ETAPAS[stage].name}`}>
      <div className="dhead" />
      {LINES.map((w, i) => (
        <div className={`dline ${stage === 1 && (i === 1 || i === 3) ? 'hl' : ''}`.trim()} key={i} style={{ width: `${w}%` }} />
      ))}
      {stage === 0 && <span className="ecm-beam" aria-hidden="true" />}
      {stage === 1 && (
        <>
          <span className="ecm-f" style={{ right: 18, top: '30%' }}><i>✓</i>RUC 20•••••••1</span>
          <span className="ecm-f" style={{ right: 30, top: '44%', animationDelay: '.15s' }}><i>✓</i>Fecha 12/08/2026</span>
          <span className="ecm-f" style={{ right: 22, top: '58%', animationDelay: '.3s' }}><i>✓</i>Monto S/ 8,540</span>
        </>
      )}
      {stage === 2 && (
        <div className="ecm-route">
          <span className="tp">Factura</span>
          <span className="rt">Finanzas / 2026 / Proveedores</span>
        </div>
      )}
      {stage === 3 && (
        <div className="ecm-stamp">Aprobado<small>G. Finanzas · dentro del SLA</small></div>
      )}
      {stage === 4 && (
        <div className="ecm-lock">
          <span className="lk"><Icon id="i-shield" /></span>
          <span>Retención 7 años · auditoría activa</span>
        </div>
      )}
    </div>
  );
}

function Expediente() {
  const [stage, setStage] = useState(0);
  const timerRef = useRef(null);
  const isStatic = () => document.documentElement.classList.contains('static');

  const restart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isStatic()) timerRef.current = setInterval(() => setStage((p) => (p + 1) % ETAPAS.length), 2700);
  }, []);

  useEffect(() => {
    restart();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [restart]);

  return (
    <div
      className="ecmw rv d2"
      onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
      onMouseLeave={restart}
    >
      <div className="est-rail">
        {ETAPAS.map((e, i) => (
          <button key={e.name} type="button" className={`est ${stage === i ? 'on' : ''}`.trim()} aria-pressed={stage === i} onClick={() => { setStage(i); restart(); }}>
            <span className="mi"><Icon id={e.icon} /></span>
            <span><b>{`0${i + 1} · ${e.name}`}</b><small>{e.sub}</small></span>
          </button>
        ))}
        <p className="ecm-info"><b>{ETAPAS[stage].name}</b> — {ETAPAS[stage].info}</p>
      </div>
      <DocStage stage={stage} />
    </div>
  );
}

export default function GestionDocumentalV4() {
  const ref = useV4Page();

  return (
    <div ref={ref}>
      <Helmet>
        <title>Gestión Documental ECM — ELO | Novasys del Perú</title>
        <meta name="description" content="Implementamos ELO ECM: captura digital, OCR, workflows de aprobación con SLA y retención legal con auditoría completa. Integrado con SAP, Oracle y firma digital, desde Lima." />
      </Helmet>

      {/* HERO — expediente que recorre el workflow */}
      <section className="hero hero-ecm" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div>
            <div className="dt-crumb rv">
              <Link to="/soluciones">Soluciones</Link><span className="sep">/</span>
              <Link to="/soluciones">Software empresarial</Link><span className="sep">/</span>
              <b>Gestión Documental</b>
            </div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.2vw,68px)' }}>Cada documento sabe dónde vive<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">Implementamos ELO ECM: los documentos se capturan, se leen, se clasifican y se aprueban solos — con trazabilidad completa y retención legal que resiste cualquier auditoría.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Calcula tu ROI documental</Link>
              <a className="link" href="#capacidades-ecm">Ver capacidades <span className="ar">→</span></a>
            </div>
          </div>
          <Expediente />
        </div>
      </section>

      {/* CAPACIDADES */}
      <section id="capacidades-ecm" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead label="01 — Capacidades" title="Del papel al sistema, sin fricción." text="ELO ECM configurado sobre tus tipos documentales reales — facturas, contratos, legajos, pólizas — no sobre un demo genérico." />
          <div className="prods" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {s.features.map((f, i) => (
              <div className={`prod rv ${i % 3 ? `d${i % 3}` : ''}`.trim()} key={f.title} style={{ padding: '24px 24px 22px' }}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE — banda oscura */}
      <section>
        <div className="wrap">
          <Shead label="02 — Compliance" title="Defendible ante quien venga a preguntar." />
          <div className="ecm-dark rv">
            <div>
              <h3>Cuando llega la auditoría, el sistema responde por ti.</h3>
              <p>Cada documento guarda quién lo vio, quién lo cambió y cuándo. Las políticas de retención se aplican solas — y la destrucción programada también queda registrada.</p>
            </div>
            <div className="inc-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="inc-it"><Icon id="i-check" />Trazabilidad completa: cada acceso y cada versión, registrados</div>
              <div className="inc-it"><Icon id="i-check" />Retención por tipo documental con destrucción programada</div>
              <div className="inc-it"><Icon id="i-check" />Workflows de aprobación con SLA, escalamiento y delegación</div>
              <div className="inc-it"><Icon id="i-check" />Firma digital peruana integrada al flujo</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRACIÓN */}
      <section>
        <div className="wrap">
          <Shead label="03 — Integración" title="Conectado al resto de tu operación." text="El expediente no vive en una isla: conversa con tu ERP, tu correo y tu firma digital." />
          <div className="archmeta" style={{ marginTop: 0 }}>
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

      {/* CASOS */}
      <section>
        <div className="wrap">
          <Shead label="05 — Casos" title="Documentos críticos, hoy en orden." />
          <div className="ccards two">
            <CaseCard img="057-office.jpg" sector="Seguros" title="Pacífico: procesos core automatizados" text="Gestión documental y automatización inteligente del negocio asegurador — con trazabilidad total." pill="<b>−50%</b> tiempo en procesos" to="/casos-de-exito/pacifico" linkLabel="Ver el expediente →" />
            <CaseCard img="002-building.jpg" sector="Banca" title="Interbank: información centralizada" text="La misma disciplina documental que exige la banca, aplicada con plataformas enterprise." pill="<b>100%</b> trazabilidad" d="d1" to="/casos-de-exito/interbank" linkLabel="Ver el expediente →" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <Shead label="06 — Preguntas" title="Lo que siempre nos preguntan." />
          <div className="faq rv">
            {s.faqs.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
            <details>
              <summary>¿Qué pasa con mi archivo histórico en papel?</summary>
              <p>Se digitaliza por lotes con captura masiva y OCR. Definimos juntos qué se digitaliza, qué se archiva físico y qué se destruye — con acta y política de retención.</p>
            </details>
            <details>
              <summary>¿En cuánto tiempo está en producción?</summary>
              <p>Entre 5 y 8 semanas para pasar del papel al sistema: diagnóstico, estructura documental, configuración de ELO y capacitación del equipo.</p>
            </details>
          </div>
        </div>
      </section>

      <CtaBand
        title={<>¿Cuántas horas pierde tu equipo <span style={{ color: 'var(--red)' }}>buscando archivos</span>?</>}
        text="En 30 minutos calculamos el ROI de digitalizar tu gestión documental — con flujos reales de tu sector y un plan de implementación por fases."
        btnLabel="Calcula tu ROI"
      />
    </div>
  );
}
