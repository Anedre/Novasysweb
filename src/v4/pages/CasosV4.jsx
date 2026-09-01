import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { IMG, Shead, StatsBar, CtaBand } from '../partials';
import '../styles/casos.css';

const SECTORES = [
  ['todos', 'Todos'], ['telco', 'Telco'], ['banca', 'Banca'], ['seguros', 'Seguros'], ['retail', 'Retail'], ['educacion', 'Educación'],
];

const CASOS = [
  { exp: 'EXP-01', img: '021-callcenter.jpg', sector: 'telco', sectorLabel: 'Telecomunicaciones', title: 'Entel: contact center cloud', text: 'Migración a Amazon Connect con mejor experiencia y costos bajo control.', pill: '<b>−40%</b> costos operativos' },
  { exp: 'EXP-02', img: '002-building.jpg', sector: 'banca', sectorLabel: 'Banca', title: 'Interbank: BI en tiempo real', text: 'Plataforma que centraliza datos de múltiples fuentes para decisiones estratégicas al instante.', pill: '<b>5×</b> velocidad de análisis' },
  { exp: 'EXP-03', img: '057-office.jpg', sector: 'seguros', sectorLabel: 'Seguros', title: 'Pacífico: procesos core automatizados', text: 'Transformación del negocio asegurador con gestión documental y automatización.', pill: '<b>−50%</b> tiempo en procesos' },
  { exp: 'EXP-04', img: '041-industry.jpg', sector: 'retail', sectorLabel: 'Retail', title: 'Renzo Costa: CRM y BI integrados', text: 'Gestión comercial optimizada con analítica para decisiones basadas en datos.', pill: '<b>+60%</b> eficiencia comercial' },
  { exp: 'EXP-05', img: '029-city.jpg', sector: 'telco', sectorLabel: 'Telecomunicaciones', title: 'Americatel: migración cloud completa', text: 'Modernización de infraestructura on-premise a AWS con arquitectura cloud-native.', pill: '<b>−45%</b> costos de infraestructura' },
  { exp: 'EXP-06', img: '050-meeting.jpg', sector: 'educacion', sectorLabel: 'Educación', title: 'Centrum PUCP: plataforma analítica', text: 'Dashboard de BI para gestión académica y seguimiento de KPIs de la escuela de negocios.', pill: '<b>+90%</b> visibilidad de KPIs' },
];

export default function CasosV4() {
  const ref = useV4Page();
  const [filtro, setFiltro] = useState('todos');

  const visibles = useMemo(
    () => CASOS.filter((c) => filtro === 'todos' || c.sector === filtro),
    [filtro],
  );

  return (
    <div ref={ref}>
      <Helmet>
        <title>Casos de éxito — Novasys del Perú</title>
        <meta name="description" content="Entel, Interbank, Pacífico, Renzo Costa, Americatel y Centrum PUCP: casos reales con KPIs medidos junto al cliente, hoy en producción en el Perú." />
      </Helmet>

      {/* HERO — portada editorial */}
      <section className="hero-cover">
        <img className="hc-bg" src={IMG + '022-callcenter.jpg'} alt="Operación del contact center de Entel" data-plx />
        <div className="hc-scrim" aria-hidden="true" />
        <div className="wrap hc-in">
          <span className="lbl rv">Expediente N.º 01 — <b>Entel · Telecomunicaciones</b></span>
          <h1 className="rv d1">El contact center que se fue a la nube<span style={{ color: 'var(--coral)' }}>.</span></h1>
          <p className="hc-sub rv d2">Casos reales, con KPIs medidos junto al cliente. Estos son los proyectos que hoy sostienen operaciones críticas en el Perú.</p>
          <div className="hc-kpis rv d2">
            <div className="hc-k"><span className="v">−<span className="num" data-n="40">0</span><i>%</i></span><span className="lbl">Costos operativos</span></div>
            <div className="hc-k"><span className="v">+<span className="num" data-n="35">0</span><i>%</i></span><span className="lbl">Satisfacción cliente</span></div>
            <div className="hc-k"><span className="v"><span className="num" data-n="99.9" data-dec="1">0</span><i>%</i></span><span className="lbl">Disponibilidad</span></div>
          </div>
          <div className="hero-ctas rv d3" style={{ marginTop: 0 }}>
            <Link className="btn-red" to="/contacto">Quiero un caso así</Link>
            <a className="link" href="#archivo">Ver todo el archivo <span className="ar">→</span></a>
          </div>
        </div>
      </section>

      {/* ARCHIVO */}
      <section id="archivo">
        <div className="wrap">
          <Shead label="01 — Archivo" title="Todos los casos, en producción." text="Filtra por industria — cada resultado fue medido con el cliente." />
          <div className="fbar rv">
            <div className="fchips" id="filtros">
              {SECTORES.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={filtro === key ? 'on' : ''}
                  aria-pressed={filtro === key}
                  onClick={() => setFiltro(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className="fcount">
              <b>{visibles.length}</b> {visibles.length === 1 ? 'expediente' : 'expedientes'}{filtro !== 'todos' ? ` · ${filtro}` : ''}
            </span>
          </div>
          <div className="ccards" id="grid-casos">
            {visibles.map((c, i) => (
              <div className={`ccard rv in d${i % 3 || ''}`.trim()} key={c.exp} style={{ transitionDelay: `${i * 45}ms` }}>
                <div className="ph">
                  <img src={IMG + c.img} alt="" loading="lazy" />
                  <span className="exp">{c.exp}</span>
                  <span className="pill" dangerouslySetInnerHTML={{ __html: c.pill }} />
                </div>
                <div className="bd">
                  <span className="sec">{c.sectorLabel}</span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <Link className="go" to="/contacto">Conversemos sobre tu caso →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTODO DE MEDICIÓN */}
      <section>
        <div className="wrap">
          <Shead label="02 — Método de medición" title="KPIs que se pueden auditar." text="Ningún número de esta página salió de un demo: así se mide cada expediente." />
          <div className="medimos">
            <div className="m rv"><span className="rn">I</span><h3>Línea base, juntos</h3><p>El punto de partida se mide contigo antes de tocar nada — sin baseline no hay mejora que reclamar.</p></div>
            <div className="m rv d1"><span className="rn">II</span><h3>Medición en producción</h3><p>El KPI se mide con tu operación y tus datos reales — no en un ambiente de prueba.</p></div>
            <div className="m rv d2"><span className="rn">III</span><h3>Resultado documentado</h3><p>El cierre se revisa con tu equipo y queda escrito en el expediente del proyecto.</p></div>
          </div>
        </div>
      </section>

      <StatsBar style={{ marginTop: 'clamp(64px,9vw,110px)', borderTop: '1px solid var(--line)' }} />

      <CtaBand
        title={<>¿Quieres resultados <span style={{ color: 'var(--red)' }}>similares</span>?</>}
        text="Conversemos sobre cómo transformar tu operación con la misma metodología que aplicamos en estos casos."
        btnLabel="Agendar consultoría"
      />
    </div>
  );
}
