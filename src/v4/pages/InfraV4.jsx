import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { IMG, Shead, CtaBand, CaseCard } from '../partials';
import '../styles/infraestructura.css';
import '../styles/infra-extra.css';

const PRODUCTS = {
  computo: { src: '/products/computo.png', alt: 'Laptop empresarial HP', chips: ['EliteBook · ProBook', 'Z Workstations', 'Trabajo profesional'] },
  servidores: { src: '/products/servidores.png', alt: 'Servidor HPE ProLiant', chips: ['ProLiant Gen11', 'Stock en Lima', 'Entrega 48–72 h'] },
  almacenamiento: { src: '/products/almacenamiento.png', alt: 'Almacenamiento HPE Alletra', chips: ['Alletra · MSA', 'Datos críticos', 'Alta disponibilidad'] },
};
const KEYS = ['computo', 'servidores', 'almacenamiento'];

function Showcase() {
  const [act, setAct] = useState(1);
  const timerRef = useRef(null);
  const isStatic = () => document.documentElement.classList.contains('static');

  const restart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isStatic()) timerRef.current = setInterval(() => setAct((a) => (a + 1) % 3), 7000);
  }, []);

  useEffect(() => {
    restart();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [restart]);

  const d = PRODUCTS[KEYS[act]];

  return (
    <div
      className="hi-stage rv d2"
      aria-label="Líneas de producto HP / HPE"
      onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
      onMouseLeave={restart}
    >
      <span className="hi-ring r1" aria-hidden="true" />
      <span className="hi-ring r2" aria-hidden="true" />
      <div className="hi-ped" aria-hidden="true" />
      <span className="hi-imgwrap">
        <img key={KEYS[act]} className="hi-img hi-enter" src={d.src} alt={d.alt} />
      </span>
      <span className="hi-chip c1"><i />{d.chips[0]}</span>
      <span className="hi-chip c2"><i />{d.chips[1]}</span>
      <span className="hi-chip c3"><i />{d.chips[2]}</span>
      <div className="hi-thumbs" role="tablist" aria-label="Cambiar línea de producto">
        {KEYS.map((k, i) => (
          <button
            key={k}
            type="button"
            className={`ht ${act === i ? 'on' : ''}`}
            aria-label={`Ver ${k}`}
            onClick={() => { setAct(i); restart(); }}
          >
            <img src={PRODUCTS[k].src} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function InfraV4() {
  const ref = useV4Page();

  return (
    <div ref={ref}>
      <Helmet>
        <title>Infraestructura HP / HPE — Novasys del Perú</title>
        <meta name="description" content="Cómputo HP, servidores HPE ProLiant y almacenamiento enterprise — dimensionados sobre carga real, con stock en Lima, entrega 48–72 h y soporte on-site como distribuidores HP / HPE." />
      </Helmet>

      {/* HERO — vitrina de producto */}
      <section className="hero" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap hi-grid">
          <Showcase />
          <div>
            <div className="lbl rv">Soluciones — <b>Infraestructura HP / HPE</b></div>
            <h1 className="rv d1" style={{ fontSize: 'clamp(38px,5.4vw,72px)' }}>Infraestructura que sostiene el core<span style={{ color: 'var(--red)' }}>.</span></h1>
            <p className="hero-sub rv d2">Cómputo, servidores HPE y almacenamiento enterprise — dimensionados sobre carga real, con soporte on-site en Lima y el respaldo de nuestra alianza con HP / HPE.</p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Cotizar equipos</Link>
              <a className="link" href="#lineas">Ver líneas <span className="ar">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* LÍNEAS DE PRODUCTO */}
      <section id="lineas">
        <div className="wrap">
          <Shead label="01 — Líneas de producto" title="Del escritorio al datacenter." text="Hardware empresarial HP / HPE para cada capa de tu infraestructura — dimensionado sobre carga real, no estimada." />
          <div className="lrows">
            <Link className="lrow rv" to="/infraestructura/computo">
              <span className="lph"><img src="/products/computo.png" alt="Laptop empresarial HP" /></span>
              <span>
                <span className="n">01 · Cómputo</span>
                <h3>Equipos de cómputo</h3>
                <p>PCs, laptops y workstations HP para productividad empresarial — la flota con la que tu equipo trabaja todos los días.</p>
                <ul className="feats">
                  <li>Flota estandarizada, con despliegue e inventario en lote</li>
                  <li>Workstations Z para cargas de diseño e ingeniería</li>
                  <li>Garantía on-site para no detener a nadie</li>
                </ul>
                <span className="tags"><span className="chip">HP ProBook</span><span className="chip">EliteBook</span><span className="chip">Z Workstations</span></span>
              </span>
              <span className="go">Cotizar cómputo <span className="ar">→</span></span>
            </Link>
            <Link className="lrow rv d1" to="/infraestructura/servidores">
              <span className="lph"><img src="/products/servidores.png" alt="Servidor HPE ProLiant" /></span>
              <span>
                <span className="n">02 · Servidores</span>
                <h3>Servidores HPE</h3>
                <p>ProLiant y soluciones enterprise para el corazón del datacenter — rendimiento y confiabilidad de clase mundial.</p>
                <ul className="feats">
                  <li>DL y ML dimensionados sobre tu carga real, no estimada</li>
                  <li>Gestión remota con iLO desde el día uno</li>
                  <li>Garantía extendida con reemplazo on-site</li>
                </ul>
                <span className="tags"><span className="chip">ProLiant DL</span><span className="chip">ProLiant ML</span><span className="chip">Synergy</span></span>
              </span>
              <span className="go">Cotizar servidores <span className="ar">→</span></span>
            </Link>
            <Link className="lrow rv d2" to="/infraestructura/almacenamiento">
              <span className="lph"><img src="/products/almacenamiento.png" alt="Almacenamiento HPE Alletra" /></span>
              <span>
                <span className="n">03 · Almacenamiento</span>
                <h3>Almacenamiento HPE</h3>
                <p>Storage enterprise para los datos que no pueden perderse — con alta disponibilidad de fábrica.</p>
                <ul className="feats">
                  <li>Alletra y MSA para datos críticos del negocio</li>
                  <li>Snapshots y replicación para dormir tranquilo</li>
                  <li>Crece sin migraciones traumáticas</li>
                </ul>
                <span className="tags"><span className="chip">Alletra</span><span className="chip">MSA</span><span className="chip">StoreEver</span></span>
              </span>
              <span className="go">Cotizar storage <span className="ar">→</span></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ARQUITECTURA */}
      <section>
        <div className="wrap">
          <Shead label="02 — Arquitectura" title="Infraestructura silenciosa y defendible." text="Arquitecturas HP / HPE probadas en banca, seguros y retail peruanos." />
          <div className="archmeta" style={{ marginTop: 0 }}>
            <div className="bl rv">
              <h4>Stack de referencia</h4>
              <div className="chips">
                <span className="chip pchip"><img src="/products/servidores.png" alt="" />HPE ProLiant Gen11</span>
                <span className="chip pchip"><img src="/products/almacenamiento.png" alt="" />HPE Alletra Storage</span>
                <span className="chip">HPE Synergy</span>
                <span className="chip">Aruba CX Networking</span>
                <span className="chip pchip"><img src="/products/computo.png" alt="" />HP Z Workstations</span>
                <span className="chip">iLO Remote Management</span>
              </div>
            </div>
            <div className="bl rv d1">
              <h4>Decisiones clave</h4>
              <ul>
                <li>Dimensionamiento conservador basado en carga real medida, no estimada</li>
                <li>Garantía extendida 5 años con reemplazo on-site 24×7 en Lima</li>
                <li>Integración con directorio Windows / LDAP + SSO corporativo</li>
                <li>Plan de refresh tecnológico programado en el roadmap del cliente</li>
              </ul>
            </div>
          </div>
          <figure className="foto-panel rv" style={{ margin: '26px 0 0' }}>
            <img src={IMG + '034-datacenter.jpg'} alt="Instalación de servidores HPE en cliente" loading="lazy" />
            <figcaption className="fp-cap">Fig. HP — Instalación en cliente · Lima</figcaption>
            <div className="fp-chips">
              <span><i />Garantía 5 años</span>
              <span><i />Reemplazo on-site 24×7</span>
              <span><i />Stock en Lima</span>
            </div>
          </figure>
        </div>
      </section>

      {/* VENTAJAS */}
      <section>
        <div className="wrap">
          <Shead label="03 — Ventajas" title="¿Por qué HP con Novasys?" />
          <div className="steps">
            <div className="step rv">
              <span className="sico-chip"><Icon id="i-target" /></span>
              <span className="n n-abs">01</span>
              <h3>Alianza HP / HPE</h3><p>Somos distribuidores, con acceso directo a stock, precios y soporte del fabricante.</p>
            </div>
            <div className="step rv d1">
              <span className="sico-chip"><Icon id="i-zap" /></span>
              <span className="n n-abs">02</span>
              <h3>Entrega rápida</h3><p>Stock disponible y logística optimizada para entrega en 48–72 h.</p>
            </div>
            <div className="step rv d2">
              <span className="sico-chip"><Icon id="i-pin" /></span>
              <span className="n n-abs">03</span>
              <h3>Soporte local</h3><p>Equipo técnico certificado en Lima para soporte presencial y remoto.</p>
            </div>
            <div className="step rv d3">
              <span className="sico-chip"><Icon id="i-chart" /></span>
              <span className="n n-abs">04</span>
              <h3>Dimensionamiento experto</h3><p>Te ayudamos a elegir el hardware exacto para tu necesidad y carga real.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CASOS */}
      <section>
        <div className="wrap">
          <Shead label="04 — Casos HP" title="Infraestructura HP en producción hoy." />
          <div className="ccards two">
            <CaseCard img="041-industry.jpg" sector="Retail" title="Renzo Costa: CRM y BI para retail" text="Implementación sobre infraestructura HP dimensionada para la operación comercial." pill="<b>+60%</b> eficiencia comercial" />
            <CaseCard img="050-meeting.jpg" sector="Educación" title="Centrum PUCP: plataforma analítica" text="Dashboard de BI con infraestructura confiable para la escuela de negocios." pill="<b>+90%</b> visibilidad de KPIs" d="d1" />
          </div>
          <p className="rv" style={{ marginTop: 26 }}>
            <Link className="link" to="/casos-de-exito">Ver todos los casos <span className="ar">→</span></Link>
          </p>
        </div>
      </section>

      <CtaBand
        title={<>¿Necesitas cotizar equipos <span style={{ color: 'var(--red)' }}>HP / HPE</span>?</>}
        text="Nuestro equipo dimensiona la infraestructura ideal con TCO a 5 años. Stock en Lima — entrega en 48–72 h tras la orden de compra."
        btnLabel="Solicitar cotización"
      />
    </div>
  );
}
