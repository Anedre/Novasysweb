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

/**
 * Banda de entrada a ARIA. Vive aquí porque la usan Home, Soluciones y Cloud:
 * cada una carga su propio CSS por página, así que los estilos van en shell.css.
 */
export function AriaBand({ eyebrow = 'Producto propio de Novasys', d = '' }) {
  return (
    <div className={`aria-band rv ${d}`.trim()}>
      <div className="ab-l">
        <span className="ab-mark">
          <img className="only-light" src="/v4/aria/aria-mark.png" alt="" />
          <img className="only-dark" src="/v4/aria/aria-mark-white.png" alt="" />
        </span>
        <div>
          <span className="lbl">{eyebrow}</span>
          <h3>ARIA — toda la conversación con tu cliente, en un solo lugar.</h3>
          <p>
            Nuestra plataforma de atención al cliente: WhatsApp, Instagram, Messenger, correo,
            llamadas y chat web en una sola bandeja, con asistentes que responden cuando tu equipo
            no está. Corre sobre AWS y la opera el mismo equipo que la construyó.
          </p>
        </div>
      </div>
      <div className="ab-r">
        <div className="ab-chips">
          {['WhatsApp', 'Instagram', 'Messenger', 'Correo', 'Llamadas', 'Chat web'].map((c) => (
            <span className="chip" key={c}>{c}</span>
          ))}
        </div>
        <Link className="btn" to="/soluciones/aria">Conocer ARIA</Link>
      </div>
    </div>
  );
}

/**
 * Bloques que revisa Meta en la Verificación de acceso. Viven aquí —y no dentro
 * de la página de cada producto— para que la redacción NO se desvíe entre un
 * producto y otro: es exactamente lo que el revisor compara con el formulario.
 * Los datos entran por props (nada de importar src/data desde partials, que se
 * carga en todas las páginas). Estilos: shell.css, prefijo .pl-.
 */
export function BloqueDatos({ producto }) {
  return (
    <div className="pl-trust rv">
      <div className="pl-tl">
        <h3>No somos dueños de tu conversación.</h3>
        <div className="pl-flow" aria-hidden="true">
          <span className="fn"><b>Tus cuentas</b><small>{producto.canales}</small></span>
          <span className="fa"><i /></span>
          <span className="fn mid"><b>{producto.nombre}</b><small>el acceso que tú autorizas</small></span>
          <span className="fa"><i /></span>
          <span className="fn"><b>Tu operación</b><small>solo tu empresa lo ve</small></span>
        </div>
        <p className="pl-rev"><Icon id="i-refresh" />Puedes revocar el acceso cuando quieras, desde tu propia cuenta de Meta.</p>
      </div>
      <div className="pl-tr">
        <ul className="pl-items">
          <li><Icon id="i-check" />Cada empresa conecta sus propias cuentas y autoriza a Novasys a usarlas solo para atenderla.</li>
          <li><Icon id="i-check" />Cada empresa ve únicamente sus cuentas y sus conversaciones.</li>
          <li><Icon id="i-check" />No compartimos esa información con terceros ni la usamos para publicidad, y la borramos cuando el cliente lo pide.</li>
        </ul>
        <div className="pl-legal">
          <Link to="/legal/privacidad">Política de privacidad</Link>
          <Link to={producto.terminos}>Términos del servicio</Link>
          <Link to="/legal/eliminacion-de-datos">Eliminación de datos</Link>
        </div>
      </div>
    </div>
  );
}

export function FichaNegocio({ empresa, producto }) {
  return (
    <div className="pl-biz rv">
      <dl className="pl-dl">
        <div><dt>Razón social</dt><dd>{empresa.razon}</dd></div>
        <div><dt>RUC</dt><dd>{empresa.ruc || <span className="pl-todo">(completar)</span>}</dd></div>
        <div><dt>Dirección</dt><dd>{empresa.direccion}<br />{empresa.ciudad}</dd></div>
        <div><dt>Teléfono</dt><dd><a href={empresa.telHref}>{empresa.telefono}</a></dd></div>
        <div><dt>Correo</dt><dd><a href={'mailto:' + empresa.correo}>{empresa.correo}</a></dd></div>
        <div><dt>Sitio</dt><dd><a href="https://www.novasys.com.pe/">www.novasys.com.pe</a></dd></div>
      </dl>
      <div className="pl-biz-side">
        <img className="only-light" src={producto.mark} alt="" />
        <img className="only-dark" src={producto.markDark} alt="" />
        <p>{producto.notaLegal}</p>
        <Link className="link" to="/nosotros">Conocer a Novasys <span className="ar">→</span></Link>
      </div>
    </div>
  );
}

export function CaseCard({ img, exp, sector, title, text, pill, d = '', dataSector, to = '/casos-de-exito', linkLabel = 'Ver el expediente completo →' }) {
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
        <Link className="go" to={to}>{linkLabel}</Link>
      </div>
    </div>
  );
}
