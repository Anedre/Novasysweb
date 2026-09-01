import { Link } from 'react-router-dom';
import { Icon } from './Icons';

export const IMG = '/v4/img/';

export function Shead({ label, title, text, id }) {
  return (
    <div className="shead rv" id={id}>
      <div>
        <h2>{title}</h2>
        {text && (
          <p style={{ marginTop: 12, color: 'var(--ink-2)', maxWidth: '64ch', fontSize: '15.5px' }}>{text}</p>
        )}
      </div>
      <span className="lbl">{label}</span>
    </div>
  );
}

export function StatsBar({ style }) {
  return (
    <div className="statsbar" style={style}>
      <div className="wrap sb-grid">
        <div className="stat rv rl"><span className="v"><span className="num" data-n="200">0</span><i>+</i></span><span className="lbl">Proyectos entregados</span></div>
        <div className="stat rv rl d1"><span className="v"><span className="num" data-n="24">0</span><i>K+</i></span><span className="lbl">Usuarios impactados</span></div>
        <div className="stat rv rl d2"><span className="v"><span className="num" data-n="99.97" data-dec="2">0</span><i>%</i></span><span className="lbl">Uptime SLA</span></div>
        <div className="stat rv rl d3"><span className="v"><span className="num" data-n="15">0</span><i>+</i></span><span className="lbl">Años en el Perú</span></div>
      </div>
    </div>
  );
}

export function CtaBand({ title, text, btnLabel, extraAction, id }) {
  return (
    <section className="cta" id={id} style={{ paddingTop: 0 }}>
      <span className="deco ring" aria-hidden="true" />
      <span className="deco ring2" aria-hidden="true" />
      <span className="deco dot" aria-hidden="true" />
      <div className="wrap">
        <div className="rv">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-side rv d1">
          <Link className="btn-red" to="/contacto">{btnLabel}</Link>
          {extraAction}
          <div className="meta">
            <a href="tel:+5116433467"><Icon id="i-phone" />+51 1 643-3467</a>
            <a href="mailto:contacto@novasysperu.com"><Icon id="i-mail" />contacto@novasysperu.com</a>
            <span style={{ display: 'flex', gap: 11, alignItems: 'center', fontFamily: '"IBM Plex Mono",monospace', fontSize: '12.5px', color: 'var(--band-tx2)' }}>
              <Icon id="i-pin" style={{ width: 16, height: 16, color: 'var(--red)' }} />Lima, Perú · Lun–Vie 9:00–18:00
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseCard({ img, exp, sector, title, text, pill, d = '', dataSector }) {
  return (
    <div className={`ccard rv ${d}`} data-sector={dataSector}>
      <div className="ph">
        <img src={IMG + img} alt="" loading="lazy" />
        {exp && <span className="exp">{exp}</span>}
        <span className="pill" dangerouslySetInnerHTML={{ __html: pill }} />
      </div>
      <div className="bd">
        <span className="sec">{sector}</span>
        <h3>{title}</h3>
        <p>{text}</p>
        <Link className="go" to="/casos-de-exito">Ver el expediente completo →</Link>
      </div>
    </div>
  );
}
