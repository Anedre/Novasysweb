import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { IMG, CtaBand } from '../partials';

const MARQUEE = ['001-building.jpg', '020-callcenter.jpg', '036-datacenter.jpg', '046-meeting.jpg', '057-office.jpg', '081-team.jpg', '115-tech.jpg', '060-office.jpg'];

const LEDGER = [
  { client: 'Entel', sector: 'Telecomunicaciones', proj: 'Contact center cloud con Amazon Connect', delta: '−40%', unit: 'costos operativos' },
  { client: 'Interbank', sector: 'Banca', proj: 'BI que centraliza datos para decisiones en tiempo real', delta: '5×', unit: 'velocidad de análisis' },
  { client: 'Pacífico Seguros', sector: 'Seguros', proj: 'Automatización de procesos core con gestión documental', delta: '−50%', unit: 'tiempo en procesos' },
  { client: 'Renzo Costa', sector: 'Retail', proj: 'CRM y BI integrados para la gestión comercial', delta: '+60%', unit: 'eficiencia comercial' },
  { client: 'Americatel', sector: 'Telecomunicaciones', proj: 'Migración cloud y modernización de infraestructura', delta: '−45%', unit: 'costos de infraestructura' },
  { client: 'Centrum PUCP', sector: 'Educación', proj: 'Plataforma analítica para educación ejecutiva', delta: '+90%', unit: 'visibilidad de KPIs' },
];

export default function HomeV4() {
  const ref = useV4Page();

  return (
    <div ref={ref}>
      <Helmet>
        <title>Novasys del Perú — La tecnología detrás de la operación</title>
        <meta name="description" content="Software empresarial, cloud AWS e infraestructura HP / HPE para las empresas que mueven el Perú. Un solo equipo en Lima — del diagnóstico al soporte." />
      </Helmet>

      {/* HERO — collage geométrico */}
      <section className="hero" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div>
            <div className="lbl rv">Novasys del Perú — Lima · <b>desde 2010</b></div>
            <h1 className="rv d1">La tecnología detrás de la operación<span className="dot">.</span></h1>
            <p className="hero-sub rv d2">Software empresarial, cloud AWS e infraestructura HP / HPE para las empresas que mueven el Perú. Un solo equipo — del diagnóstico al soporte.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Agenda una consultoría</Link>
              <Link className="link" to="/casos-de-exito">Ver casos de éxito <span className="ar">→</span></Link>
            </div>
          </div>
          <div className="collage" role="img" aria-label="Collage de la operación de Novasys: equipo, datacenter y clientes">
            <div className="cl cl-a"><img src={IMG + '045-meeting.jpg'} alt="" /></div>
            <div className="cl cl-b" aria-hidden="true" />
            <div className="cl cl-c"><img src={IMG + '033-datacenter.jpg'} alt="" /></div>
            <div className="cl cl-d" aria-hidden="true"><img src={IMG + 'novasys-isotipo.svg'} alt="" /></div>
            <div className="cl cl-e"><img src={IMG + '074-portrait.jpg'} alt="" /></div>
            <div className="cl cl-f"><img src={IMG + '022-callcenter.jpg'} alt="" /></div>
            <div className="cl cl-g" aria-hidden="true"><i className="ring" /></div>
            <div className="cl cl-h" aria-hidden="true" />
          </div>
        </div>
        <div className="s-hint" aria-hidden="true"><span>Scroll</span><i /></div>
      </section>

      {/* STATS */}
      <div className="statsbar">
        <div className="wrap sb-grid">
          <div className="stat rv rl"><span className="v"><span className="num" data-n="200">0</span><i>+</i></span><span className="lbl">Proyectos entregados</span></div>
          <div className="stat rv rl d1"><span className="v"><span className="num" data-n="24">0</span><i>K+</i></span><span className="lbl">Usuarios impactados</span></div>
          <div className="stat rv rl d2"><span className="v"><span className="num" data-n="99.97" data-dec="2">0</span><i>%</i></span><span className="lbl">Uptime SLA</span></div>
          <div className="stat rv rl d3"><span className="v"><span className="num" data-n="15">0</span><i>+</i></span><span className="lbl">Años en el Perú</span></div>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="partners">
        <div className="wrap rv">
          <span><b>AWS</b> Advanced Partner</span>
          <span><b>HP · HPE</b> Distribuidor</span>
          <span><b>Oracle</b> Partner</span>
          <span><b>ELO</b> ECM Certified</span>
        </div>
      </div>

      {/* SERVICIOS */}
      <section id="servicios">
        <div className="wrap">
          <div className="shead rv">
            <h2>Tres líneas. Un solo equipo.</h2>
            <span className="lbl">01 — Servicios</span>
          </div>
        </div>
        <div className="wrap svc">
          <div className="svc-row rv">
            <div className="svc-num">01</div>
            <div className="svc-ph wp"><img src={IMG + '111-tech.jpg'} alt="Desarrollo de software empresarial" loading="lazy" /></div>
            <div>
              <div className="svc-t">Software empresarial</div>
              <p className="svc-d">CRM, analítica, marketing y gestión documental sobre Oracle y ELO — y desarrollo a medida cuando ningún producto encaja. Del código al soporte.</p>
              <div className="svc-chips">
                <span className="chip">Oracle CRM</span><span className="chip">Business Intelligence</span><span className="chip">Eloqua</span><span className="chip">ELO ECM</span><span className="chip">A medida</span>
              </div>
            </div>
            <Link className="link svc-link" to="/soluciones">Explorar <span className="ar">→</span></Link>
          </div>
          <div className="svc-row rv">
            <div className="svc-num">02</div>
            <div className="svc-ph wp"><img src={IMG + '019-callcenter.jpg'} alt="Contact center operando en la nube" loading="lazy" /></div>
            <div>
              <div className="svc-t">Cloud AWS</div>
              <p className="svc-d">Contact centers con IA, migraciones sin interrupciones y arquitecturas serverless — implementadas y operadas por un equipo local certificado.</p>
              <div className="svc-chips">
                <span className="chip">Amazon Connect</span><span className="chip">Migración</span><span className="chip">SageMaker</span><span className="chip">Serverless</span>
              </div>
            </div>
            <Link className="link svc-link" to="/cloud">Explorar <span className="ar">→</span></Link>
          </div>
          <div className="svc-row rv">
            <div className="svc-num">03</div>
            <div className="svc-ph wp"><img src={IMG + '034-datacenter.jpg'} alt="Servidores HPE en rack" loading="lazy" /></div>
            <div>
              <div className="svc-t">Infraestructura HP / HPE</div>
              <p className="svc-d">Cómputo, servidores y almacenamiento enterprise dimensionados sobre carga real — con stock en Lima y soporte presencial cuando hace falta.</p>
              <div className="svc-chips">
                <span className="chip">ProLiant</span><span className="chip">Alletra</span><span className="chip">Synergy</span><span className="chip">Soporte on-site</span>
              </div>
            </div>
            <Link className="link svc-link" to="/infraestructura">Explorar <span className="ar">→</span></Link>
          </div>
        </div>
      </section>

      {/* CASOS — ledger */}
      <section id="casos">
        <div className="wrap">
          <div className="shead rv">
            <h2>Resultados en producción.</h2>
            <span className="lbl">02 — Casos</span>
          </div>
          <div className="ledger">
            <div className="lg-head">
              <span className="lbl">Cliente</span><span className="lbl">Sector</span><span className="lbl">Proyecto</span><span className="lbl" style={{ textAlign: 'right' }}>Resultado</span>
            </div>
            {LEDGER.map((r) => (
              <div className="lg-row rv" key={r.client}>
                <span className="lg-client">{r.client}</span>
                <span className="lg-sector">{r.sector}</span>
                <span className="lg-proj">{r.proj}</span>
                <span className="lg-delta">{r.delta}<small>{r.unit}</small></span>
              </div>
            ))}
            <div className="rv" style={{ padding: '20px 0 4px' }}>
              <Link className="link" to="/casos-de-exito">Ver todos los casos en detalle <span className="ar">→</span></Link>
            </div>
          </div>
        </div>
        <figure className="photo-band">
          <img src={IMG + '035-datacenter.jpg'} alt="Sala de servidores operada por Novasys" loading="lazy" data-plx />
          <figcaption>Fig. 01 — Operación continua · Lima, Perú</figcaption>
          <div className="pb-chips">
            <span><i />Uptime 99.97%</span>
            <span><i />Soporte 24/7</span>
            <span><i />Lima · On-site</span>
          </div>
        </figure>
      </section>

      {/* MARQUEE FOTOGRÁFICO */}
      <div className="mq" aria-label="Galería de operación">
        <div className="mq-in">
          {[0, 1].map((k) => (
            <div className="mq-seq" aria-hidden={k === 1 || undefined} key={k}>
              {MARQUEE.map((f) => (
                <figure key={f}><img src={IMG + f} alt="" /></figure>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* MÉTODO */}
      <section id="metodo">
        <div className="wrap">
          <div className="shead rv">
            <h2>Cuatro pasos. Sin ambigüedad.</h2>
            <span className="lbl">03 — Método</span>
          </div>
          <div className="steps">
            <div className="step rv"><span className="n">Paso 01</span><h3>Diagnóstico</h3><p>Entendemos tu operación, tu stack y tus números antes de proponer nada.</p></div>
            <div className="step rv d1"><span className="n">Paso 02</span><h3>Propuesta</h3><p>Arquitectura, alcance, hitos y costos por escrito. Sin letra chica.</p></div>
            <div className="step rv d2"><span className="n">Paso 03</span><h3>Implementación</h3><p>Por fases y con demos frecuentes — ves avance real desde la semana uno.</p></div>
            <div className="step rv d3"><span className="n">Paso 04</span><h3>Operación</h3><p>SLA medibles, soporte local y mejora continua sobre lo implementado.</p></div>
          </div>
        </div>
      </section>

      {/* PRINCIPIOS */}
      <section id="principios">
        <div className="wrap">
          <div className="shead rv">
            <h2>Tres principios no negociables.</h2>
            <span className="lbl">04 — Principios</span>
          </div>
          <div className="prin">
            <div className="p rv">
              <div className="ph wp"><img src={IMG + '113-tech.jpg'} alt="Análisis técnico con datos" loading="lazy" /></div>
              <div className="bd"><span className="lbl"><b>I</b></span><h3>Rigor</h3><p>Cada decisión técnica se defiende con datos. No vendemos magia — vendemos ingeniería.</p></div>
            </div>
            <div className="p rv d1">
              <div className="ph wp"><img src={IMG + '047-meeting.jpg'} alt="Reunión de trabajo con el cliente" loading="lazy" /></div>
              <div className="bd"><span className="lbl"><b>II</b></span><h3>Transparencia</h3><p>SLA visibles, roadmap compartido y costos sin sorpresas. El cliente ve lo mismo que nosotros.</p></div>
            </div>
            <div className="p rv d2">
              <div className="ph wp"><img src={IMG + '082-team.jpg'} alt="Equipo de Novasys en Lima" loading="lazy" /></div>
              <div className="bd"><span className="lbl"><b>III</b></span><h3>Proximidad</h3><p>Equipo propio en Lima, en tu zona horaria y con contexto local. Sin tercerizar.</p></div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        id="contacto"
        title={<>¿Hablamos de tu operación<span className="dot">?</span></>}
        text="Agenda 30 minutos con un arquitecto — no con un comercial. Te devolvemos un primer diagnóstico técnico en 24 horas."
        btnLabel="Contactar"
      />
    </div>
  );
}
