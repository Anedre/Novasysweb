import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useV4Page } from '../hooks';
import { Icon } from '../Icons';
import { Shead, CtaBand, BloqueDatos, FichaNegocio } from '../partials';
import Photo from '../Photo';
import { EMPRESA } from '../../data/empresa';
import { getProductoLegal } from '../../data/legal.jsx';
import '../styles/detail-kit.css';
import '../styles/sol-aria.css';

const ARIA_IMG = '/v4/aria/';

/* Canales de la bandeja única. Iconos neutrales del sprite: cada canal se nombra
   por su nombre, sin usar logotipos de terceros (Meta prohíbe el aval implícito). */
const CANALES = [
  {
    id: 'wa', icon: 'i-msg', name: 'WhatsApp', sub: 'tu propio número', unread: '4',
    av: 'MC', who: 'María C.', when: 'hace 2 min', estado: 'Atendido por IA',
    msgs: [
      { from: 'in', t: '¿Siguen atendiendo hoy? Quiero pasar por la tienda' },
      { from: 'bot', t: 'Sí, hasta las 7 p.m. Puedo reservarte un horario si quieres.' },
      { from: 'in', t: 'Sí, a las 5' },
      { from: 'out', t: 'Listo, quedó agendado a las 5:00 p.m. Te llega la confirmación por aquí.' },
    ],
    resumen: 'consulta de horario, cita agendada a las 17:00.',
    tip: 'Cita agendada',
  },
  {
    id: 'ig', icon: 'i-ig', name: 'Instagram', sub: 'mensajes directos', unread: '2',
    av: 'JR', who: '@jrodriguez', when: 'hace 6 min', estado: 'Con un asesor',
    msgs: [
      { from: 'in', t: 'Vi la publicación del sábado, ¿tienen la talla M?' },
      { from: 'bot', t: 'Te paso con una asesora que revisa el stock ahora mismo.' },
      { from: 'out', t: 'Hola Jorge, sí tenemos M en dos colores. ¿Te los muestro?' },
    ],
    resumen: 'consulta de stock, derivada a una asesora en 40 s.',
    tip: 'Oportunidad de venta',
  },
  {
    id: 'ms', icon: 'i-send', name: 'Messenger', sub: 'tu página', unread: '1',
    av: 'LP', who: 'Lucía P.', when: 'hace 11 min', estado: 'Atendido por IA',
    msgs: [
      { from: 'in', t: '¿Hacen envíos a provincia?' },
      { from: 'bot', t: 'Sí, a todo el Perú. Llega en 2 a 4 días hábiles según el destino.' },
      { from: 'in', t: 'Perfecto, gracias' },
    ],
    resumen: 'consulta de cobertura de envíos, resuelta sin intervención.',
    tip: 'Consulta resuelta',
  },
  {
    id: 'ml', icon: 'i-mail', name: 'Correo', sub: 'buzón de atención', unread: '',
    av: 'AS', who: 'Andrea S. — Compras', when: 'hace 24 min', estado: 'Con un asesor',
    msgs: [
      { from: 'in', t: 'Adjunto la orden de compra 4471. ¿Confirman recepción?' },
      { from: 'out', t: 'Recibida, Andrea. La despachamos el jueves y te enviamos la guía.' },
    ],
    resumen: 'orden de compra recibida, despacho comprometido para el jueves.',
    tip: 'Pedido en curso',
  },
  {
    id: 'vz', icon: 'i-phone', name: 'Llamadas', sub: 'voz sobre AWS', unread: '',
    av: 'RT', who: 'Ricardo T.', when: 'hace 38 min', estado: 'Llamada cerrada',
    msgs: [
      { from: 'in', t: '· Llamada entrante · 4 min 12 s' },
      { from: 'bot', t: 'Transcripción y resumen listos al colgar. Sentimiento: positivo.' },
      { from: 'out', t: 'Quedó programada la visita técnica para el martes 9 a.m.' },
    ],
    resumen: 'soporte técnico, visita programada para el martes.',
    tip: 'Visita programada',
  },
  {
    id: 'we', icon: 'i-monitor', name: 'Chat web', sub: 'widget del sitio', unread: '3',
    av: 'VN', who: 'Visitante · Lima', when: 'ahora', estado: 'Atendido por IA',
    msgs: [
      { from: 'in', t: 'Quiero cotizar para 30 usuarios' },
      { from: 'bot', t: 'Te tomo los datos y lo derivo al equipo comercial. ¿Tu correo?' },
      { from: 'in', t: 'compras@empresa.pe' },
    ],
    resumen: 'lead corporativo de 30 usuarios, creado en el embudo.',
    tip: 'Lead creado',
  },
];

const PASOS = [
  {
    n: 'Paso 01', icon: 'i-shield', title: 'Conectas tus cuentas',
    text: 'Entras con tu cuenta de Meta y eliges qué números de WhatsApp y qué páginas atiende ARIA. Las cuentas siguen siendo tuyas: puedes quitar el acceso cuando quieras.',
  },
  {
    n: 'Paso 02', icon: 'i-users', title: 'Tu equipo atiende',
    text: 'Todo lo que te escriben llega a una sola bandeja. Cada asesor ve lo que le toca, responde y deja registrado en qué quedó la conversación.',
  },
  {
    n: 'Paso 03', icon: 'i-chart', title: 'Mides y mejoras',
    text: 'Tiempos de respuesta, volumen por canal y resultado de cada conversación, sin descargar nada ni cruzar planillas.',
  },
];

const MODULOS = [
  {
    n: '01', icon: 'i-layers', title: 'Bandeja única',
    text: 'Las conversaciones de todos los canales, con el historial del cliente al costado y la transcripción de la llamada en vivo.',
    tags: ['Omnicanal', 'Historial 360°', 'Tipificación'],
  },
  {
    n: '02', icon: 'i-zap', title: 'Asistentes',
    text: 'Un guion de respuestas o un asistente que entiende lenguaje libre, configurado por ti, que deriva a una persona cuando hace falta.',
    tags: ['Bots', 'Agentes IA', 'Derivación'],
  },
  {
    n: '03', icon: 'i-send', title: 'Campañas',
    text: 'Envíos por WhatsApp con las plantillas que tú apruebas, a un ritmo que cuida la reputación de tu número. También campañas de voz.',
    tags: ['Plantillas aprobadas', 'Ritmo controlado', 'Voz saliente'],
  },
  {
    n: '04', icon: 'i-chart', title: 'Reportes',
    text: 'Qué canal trae más clientes, cuánto demora tu equipo en responder y en qué termina cada conversación. Exportables y programables.',
    tags: ['Tiempos de respuesta', 'Sentimiento', 'Export CSV'],
  },
];

/* Para quién es: un escenario por sector. Cada uno trae la conversación de
   ejemplo que se «actúa» en el teléfono (from: in = cliente, bot = ARIA,
   out = asesor, sys = línea de sistema) y el paso del flujo que ilumina cada
   mensaje. Las conversaciones son ilustrativas, como las del hero. */
const ESCENARIOS = [
  {
    id: 'edu', icon: 'i-users', t: 'Universidades y centros de estudios',
    d: 'Postulantes que escriben por WhatsApp a toda hora, con seguimiento desde la consulta hasta la matrícula.',
    photo: '090-team.jpg', alt: 'Estudiantes conversando con sus laptops',
    canal: { icon: 'i-msg', name: 'WhatsApp' }, av: 'VR', who: 'Valeria R.', when: '22:14', estado: 'Atendido por IA',
    msgs: [
      { from: 'in', step: 0, t: 'Hola, ¿todavía puedo postular a Administración? ¿Qué documentos necesito?' },
      { from: 'bot', step: 1, t: 'Sí, las inscripciones siguen abiertas. Necesitas DNI, certificado de estudios y una foto. ¿Te agendo una llamada con Admisión?' },
      { from: 'in', step: 1, t: 'Sí, mañana en la tarde por favor' },
      { from: 'sys', step: 2, t: 'Cita creada · derivado a Admisión' },
      { from: 'out', step: 3, t: 'Hola Valeria, soy Carla de Admisión. Te llamo mañana a las 4 p.m. y te dejo el link de preinscripción por aquí.' },
    ],
    resumen: 'consulta fuera de horario, cita creada y postulante en seguimiento.',
    tip: 'Postulante en embudo',
    flow: ['Postulante escribe', 'ARIA responde 24/7', 'Deriva a Admisión', 'Seguimiento a matrícula'],
  },
  {
    id: 'retail', icon: 'i-box', t: 'Retail y comercio',
    d: 'Stock, envíos y postventa resueltos en el mismo canal donde el cliente ya está escribiendo.',
    photo: '020-callcenter.jpg', alt: 'Pago con tarjeta en un punto de venta',
    canal: { icon: 'i-ig', name: 'Instagram' }, av: 'CQ', who: '@camila.qv', when: 'hace 1 min', estado: 'Con un asesor',
    msgs: [
      { from: 'in', step: 0, t: '¿Tienen la zapatilla del post en talla 38? ¿Envían a Arequipa?' },
      { from: 'bot', step: 1, t: 'Sí, queda stock en 38. El envío a Arequipa demora 2 a 3 días hábiles. ¿Te separo un par?' },
      { from: 'in', step: 1, t: 'Sí. Y quiero cambiar la talla del pedido de la semana pasada' },
      { from: 'sys', step: 3, t: 'Pedido anterior ubicado · postventa en el mismo hilo' },
      { from: 'out', step: 2, t: 'Listo, Camila: par separado y cambio en curso. Te llega el jueves con la guía por aquí.' },
    ],
    resumen: 'venta desde Instagram y cambio de talla resueltos sin cambiar de canal.',
    tip: 'Venta + postventa',
    flow: ['Cliente pregunta stock', 'ARIA confirma y ofrece', 'Asesor cierra la venta', 'Postventa en el mismo hilo'],
  },
  {
    id: 'cobr', icon: 'i-send', t: 'Servicios y cobranzas',
    d: 'Campañas de recordatorio y atención con evidencia completa de cada conversación.',
    photo: '050-meeting.jpg', alt: 'Documentos y calculadora sobre un escritorio',
    canal: { icon: 'i-msg', name: 'WhatsApp · campaña' }, av: 'CM', who: 'Carlos M.', when: '09:30', estado: 'Con un asesor',
    msgs: [
      { from: 'bot', step: 0, t: 'Hola Carlos, te recordamos que tu cuota vence el 30. Puedes pagar desde este enlace o responder si necesitas apoyo.' },
      { from: 'in', step: 1, t: 'Necesito fraccionarla, ¿se puede?' },
      { from: 'sys', step: 2, t: 'Derivado a Cobranzas · evidencia guardada: hora, canal y mensajes' },
      { from: 'out', step: 3, t: 'Claro, Carlos. Te propongo dos cuotas: te envío el acuerdo por este mismo chat para que lo confirmes.' },
      { from: 'in', step: 3, t: 'Perfecto, gracias' },
    ],
    resumen: 'recordatorio con plantilla aprobada, acuerdo de pago con trazabilidad completa.',
    tip: 'Acuerdo con evidencia',
    flow: ['Campaña de recordatorio', 'Cliente responde', 'Deriva a Cobranzas', 'Evidencia completa'],
  },
];
const ESC_AUTOPLAY = 11000;

/* Ficha legal del producto: de aquí salen el nombre, los canales, la marca y la
   URL de sus términos. Los bloques que revisa Meta se arman con ella. */
const PRODUCTO = getProductoLegal('aria');

/* Viñetas de «Cómo funciona»: mini pantallas de la app que se animan cuando la
   tarjeta entra en pantalla (.rv → .in): los permisos se encienden, la bandeja
   asigna cada chat y el reporte dibuja sus barras. Decorativas (aria-hidden). */
function VgConn() {
  const filas = [['i-msg', 'WhatsApp', 'tu propio número'], ['i-ig', 'Instagram', 'mensajes directos'], ['i-send', 'Messenger', 'tu página']];
  return (
    <div className="vg vg-conn" aria-hidden="true">
      <div className="vg-bar"><i className="vg-dot" /><b>Permisos de la cuenta</b><small>Meta Business</small></div>
      <ul>
        {filas.map(([icon, n, sub], i) => (
          <li key={n} style={{ '--i': i }}>
            <span className="mi"><Icon id={icon} /></span>
            <span className="tx"><b>{n}</b><small>{sub}</small></span>
            <span className="sw"><i /></span>
          </li>
        ))}
      </ul>
      <div className="vg-ok"><Icon id="i-check" />Acceso autorizado · revocable cuando quieras</div>
    </div>
  );
}
function VgTeam() {
  const filas = [
    ['i-msg', 'María C.', '¿Siguen atendiendo hoy?', 'CR', 'Carla', ''],
    ['i-ig', '@jrodriguez', '¿Tienen la talla M?', 'IA', 'ARIA', 'bot'],
    ['i-mail', 'Andrea S.', 'Orden de compra 4471', 'DL', 'Diego', ''],
  ];
  return (
    <div className="vg vg-team" aria-hidden="true">
      <div className="vg-bar"><i className="vg-dot" /><b>Bandeja única</b><small>3 nuevas</small></div>
      <ul>
        {filas.map(([icon, n, sub, av, who, cls], i) => (
          <li key={n} style={{ '--i': i }}>
            <span className="mi"><Icon id={icon} /></span>
            <span className="tx"><b>{n}</b><small>{sub}</small></span>
            <span className={`as ${cls}`.trim()}><i>{av}</i>{who}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
function VgRep() {
  const barras = [['WA', 80], ['IG', 52], ['MS', 34], ['Correo', 22], ['Voz', 30]];
  return (
    <div className="vg vg-rep" aria-hidden="true">
      <div className="vg-bar"><i className="vg-dot" /><b>Reporte semanal</b><small>por canal</small></div>
      <div className="vg-kpis">
        <div><small>1ª respuesta</small><b>48 s</b></div>
        <div><small>Resueltas por IA</small><b>62 %</b></div>
        <div><small>Conversaciones</small><b>1 240</b></div>
      </div>
      <div className="vg-bars">
        {barras.map(([l, v], i) => <span key={l} style={{ '--v': `${v}%`, '--i': i }}><i /><small>{l}</small></span>)}
      </div>
    </div>
  );
}
const VINETAS = [VgConn, VgTeam, VgRep];

function Bandeja() {
  const [act, setAct] = useState(0);
  const timerRef = useRef(null);
  const isStatic = () => document.documentElement.classList.contains('static');

  const restart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isStatic()) timerRef.current = setInterval(() => setAct((a) => (a + 1) % CANALES.length), 4600);
  }, []);

  useEffect(() => {
    restart();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [restart]);

  const c = CANALES[act];

  return (
    <div
      className="arw rv d2"
      onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
      onMouseLeave={restart}
    >
      <div className="ar-app">
        <div className="ar-bar">
          <img className="armk only-light" src={ARIA_IMG + 'aria-mark.png'} alt="" />
          <img className="armk only-dark" src={ARIA_IMG + 'aria-mark-white.png'} alt="" />
          <b>Bandeja única</b>
          <span className="ar-live"><i />En vivo</span>
        </div>
        <div className="ar-body">
          <div className="ar-rail" role="tablist" aria-label="Canales de la bandeja">
            {CANALES.map((ch, i) => (
              <button
                key={ch.id}
                type="button"
                role="tab"
                aria-selected={i === act}
                className={`ar-ch ${i === act ? 'on' : ''}`.trim()}
                onClick={() => { setAct(i); restart(); }}
              >
                <span className="mi"><Icon id={ch.icon} /></span>
                <span className="tx"><b>{ch.name}</b><small>{ch.sub}</small></span>
                {ch.unread && <span className="nb">{ch.unread}</span>}
              </button>
            ))}
          </div>

          <div className="ar-thread" key={c.id} role="tabpanel" aria-label={`Conversación de ${c.name}`}>
            <div className="ar-who">
              <span className="av">{c.av}</span>
              <span className="id"><b>{c.who}</b><small>{c.name} · {c.when}</small></span>
              <span className="st">{c.estado}</span>
            </div>
            <div className="ar-msgs">
              <span className="ar-day">Hoy</span>
              {c.msgs.map((m, i) => (
                <div className={`ar-b ${m.from}`} key={i} style={{ animationDelay: `${0.14 + i * 0.3}s` }}>
                  {m.from === 'bot' && <span className="bt">ARIA</span>}
                  {m.t}
                </div>
              ))}
            </div>
            <div className="ar-foot">
              <span className="fi"><Icon id="i-zap" /></span>
              <span className="fx"><b>Resumen automático</b> — {c.resumen}</span>
              <span className="tp">{c.tip}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="demo-note">Ejemplo ilustrativo de la bandeja · <b>haz clic en un canal</b></p>
    </div>
  );
}

/* Sección «Para quién es»: elige un sector y el teléfono actúa la conversación
   de ese escenario (escribiendo… → burbuja), el flujo de abajo se ilumina al
   ritmo de los mensajes y una barra avanza al siguiente sector. Se pausa al
   pasar el mouse o enfocar; solo corre cuando está en pantalla; con
   reduced-motion no hay autoplay ni tipeo (todo se muestra de una vez). */
function Escenarios() {
  const rootRef = useRef(null);
  const [act, setAct] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(null);
  const isStatic = () => document.documentElement.classList.contains('static');
  const esc = ESCENARIOS[act];

  // solo actúa cuando la sección está en pantalla
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([en]) => setInView(en.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // reproducción de la conversación del escenario activo
  useEffect(() => {
    const msgs = esc.msgs;
    if (!inView) { setShown(0); setTyping(null); return undefined; }
    if (isStatic()) { setShown(msgs.length); setTyping(null); return undefined; }
    setShown(0); setTyping(null);
    const timers = [];
    let i = 0;
    const step = () => {
      if (i >= msgs.length) return;
      const m = msgs[i];
      if (m.from === 'sys') { i += 1; setShown(i); timers.push(setTimeout(step, 650)); return; }
      setTyping(m.from);
      timers.push(setTimeout(() => {
        setTyping(null); i += 1; setShown(i);
        timers.push(setTimeout(step, 550));
      }, m.from === 'bot' ? 700 : 850));
    };
    timers.push(setTimeout(step, 450));
    return () => timers.forEach(clearTimeout);
  }, [esc, inView]);

  // autoplay al siguiente sector
  useEffect(() => {
    if (!inView || paused || isStatic()) return undefined;
    const t = setTimeout(() => setAct((a) => (a + 1) % ESCENARIOS.length), ESC_AUTOPLAY);
    return () => clearTimeout(t);
  }, [act, inView, paused, cycle]);

  const elegir = (i) => { setAct(i); setCycle((c) => c + 1); };
  const resume = () => { setPaused(false); setCycle((c) => c + 1); };
  const stepOn = shown ? esc.msgs[shown - 1].step : -1;
  const playing = inView && !paused;

  return (
    <div
      ref={rootRef}
      className={`esc ${playing ? 'playing' : ''}`.trim()}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={resume}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) resume(); }}
    >
      <ol className="esc-tabs rv" role="tablist" aria-label="Sectores">
        {ESCENARIOS.map((e, i) => (
          <li key={e.id} role="presentation">
            <button
              type="button"
              role="tab"
              id={`esc-tab-${e.id}`}
              aria-selected={i === act}
              aria-controls="esc-stage"
              className={`esc-tab ${i === act ? 'on' : ''}`.trim()}
              onClick={() => elegir(i)}
            >
              <span className="en mono">{`0${i + 1}`}</span>
              <span className="ei"><Icon id={e.icon} /></span>
              <span className="et"><b>{e.t}</b><small>{e.d}</small></span>
              <span className="bar" aria-hidden="true">{i === act && <i key={cycle} />}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="esc-stage rv d1" id="esc-stage" role="tabpanel" aria-labelledby={`esc-tab-${esc.id}`}>
        <i className="esc-ring" aria-hidden="true" />
        <i className="esc-dot" aria-hidden="true" />
        <div className="esc-scene hi-enter" key={esc.id}>
          <div className="esc-photo">
            <Photo src={esc.photo} alt={esc.alt} sizes="(max-width: 640px) 100vw, 360px" />
          </div>
          <div className="esc-phone" aria-label="Conversación de ejemplo">
            <div className="ar-who">
              <span className="av">{esc.av}</span>
              <span className="id"><b>{esc.who}</b><small><Icon id={esc.canal.icon} /> {esc.canal.name} · {esc.when}</small></span>
              <span className="st">{esc.estado}</span>
            </div>
            <div className="ar-msgs">
              {esc.msgs.slice(0, shown).map((m, i) => (
                m.from === 'sys'
                  ? <span className="esc-sys" key={i}><Icon id="i-check" />{m.t}</span>
                  : (
                    <div className={`ar-b ${m.from}`} key={i}>
                      {m.from === 'bot' && <span className="bt">ARIA</span>}
                      {m.t}
                    </div>
                  )
              ))}
              {typing && (
                <div className={`ar-b esc-typing ${typing}`} aria-hidden="true"><i /><i /><i /></div>
              )}
            </div>
            <div className="ar-foot">
              <span className="fi"><Icon id="i-zap" /></span>
              <span className="fx"><b>Resumen automático</b> — {esc.resumen}</span>
              <span className="tp">{esc.tip}</span>
            </div>
          </div>
        </div>
        <ol className="esc-flow" aria-label="Qué pasa en cada momento">
          {esc.flow.map((f, i) => (
            <li key={f} className={`esc-fn ${i <= stepOn ? 'on' : ''} ${i === stepOn ? 'now' : ''}`.trim()}>
              <span className="mono">{`0${i + 1}`}</span>{f}
            </li>
          ))}
        </ol>
        <p className="demo-note">Conversaciones ilustrativas · <b>haz clic en un sector</b></p>
      </div>

      {/* modelo comercial: bajo las pestañas en escritorio, al final en móvil */}
      <div className="esc-note rv">
        <p className="ar-modelo">
          <b>Cómo se contrata:</b> suscripción mensual por asesor, con implementación y capacitación
          incluidas. Sin permanencia mínima y sin licencias separadas por canal.
        </p>
      </div>
    </div>
  );
}

export default function AriaV4() {
  const ref = useV4Page();

  return (
    <div ref={ref} className="aria-scope">
      <Helmet>
        <title>ARIA — plataforma de atención al cliente | Novasys del Perú</title>
        <meta
          name="description"
          content="ARIA es la plataforma de atención al cliente de Novasys del Perú S.A.C.: WhatsApp, Instagram, Messenger, correo, llamadas y chat web en una sola bandeja, con asistentes que responden 24/7 sobre infraestructura AWS."
        />
        <meta property="og:title" content="ARIA — plataforma de atención al cliente de Novasys" />
        <meta property="og:description" content="Toda la conversación con tu cliente en un solo lugar: WhatsApp, Instagram, Messenger, correo, llamadas y chat web en una sola bandeja." />
        <meta property="og:url" content="https://www.novasys.com.pe/soluciones/aria" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'ARIA',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: 'https://www.novasys.com.pe/soluciones/aria',
          description: 'Plataforma de atención al cliente omnicanal: WhatsApp, Instagram, Messenger, correo, llamadas y chat web en una sola bandeja, con asistentes automáticos.',
          offers: { '@type': 'Offer', category: 'Suscripción mensual por asesor' },
          provider: {
            '@type': 'Organization',
            name: EMPRESA.razon,
            url: 'https://www.novasys.com.pe/',
            telephone: EMPRESA.telefono,
            email: EMPRESA.correo,
            address: {
              '@type': 'PostalAddress',
              streetAddress: EMPRESA.direccion,
              addressLocality: 'Lima',
              addressCountry: 'PE',
            },
          },
        })}</script>
      </Helmet>

      {/* HERO — la bandeja única, en vivo */}
      <section className="hero hero-aria" style={{ paddingTop: 0 }}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap">
          <div>
            <div className="dt-crumb rv">
              <Link to="/soluciones">Soluciones</Link><span className="sep">/</span>
              <Link to="/soluciones">Producto Novasys</Link><span className="sep">/</span>
              <b>ARIA</b>
            </div>
            <div className="ar-brand rv d1">
              <img className="only-light" src={ARIA_IMG + 'aria-mark.png'} alt="" />
              <img className="only-dark" src={ARIA_IMG + 'aria-mark-white.png'} alt="" />
              <span className="tx"><b>ARIA</b><small>Producto de {EMPRESA.razon}</small></span>
            </div>
            <h1 className="rv d1" style={{ '--h1': 'clamp(33px,4.3vw,56px)' }}>
              Toda la conversación con tu cliente. En un solo lugar<span style={{ color: 'var(--red)' }}>.</span>
            </h1>
            <p className="hero-sub rv d2">
              ARIA es la plataforma de atención al cliente de Novasys. Tu equipo responde WhatsApp,
              Instagram, Messenger, correo y llamadas desde una sola pantalla, con asistentes que
              contestan solos cuando nadie está disponible.
            </p>
            <div className="hero-ctas rv d3">
              <Link className="btn" to="/contacto">Agenda una demo</Link>
              <a className="link" href="#como-funciona">Cómo funciona <span className="ar">→</span></a>
            </div>
          </div>
          <Bandeja />
        </div>
      </section>

      {/* FRANJA DE DATOS */}
      <div className="statsbar">
        <div className="wrap sb-grid">
          <div className="stat rv rl"><span className="v"><span className="num" data-n="6">0</span></span><span className="lbl">Canales en una bandeja</span></div>
          <div className="stat rv rl d1"><span className="v"><span className="num" data-n="100">0</span><i>%</i></span><span className="lbl">Tus propias cuentas</span></div>
          <div className="stat rv rl d2"><span className="v">24/7</span><span className="lbl">Respuesta automática</span></div>
          <div className="stat rv rl d3"><span className="v">AWS</span><span className="lbl">Infraestructura</span></div>
        </div>
      </div>

      {/* 01 — CÓMO FUNCIONA */}
      <section id="como-funciona" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead
            label="01 — Cómo funciona"
            title="Tres pasos. Sin proyecto de meses."
            text="Conectas tus cuentas, tu equipo atiende desde una sola pantalla y mides lo que pasó. En ese orden."
          />
          <div className="ar-steps">
            {PASOS.map((p, i) => {
              const Vg = VINETAS[i];
              return (
                <div className={`ar-step rv ${i ? `d${i}` : ''}`.trim()} key={p.n}>
                  <div className="ar-vg"><Vg /></div>
                  <div className="ar-sb">
                    <span className="n">{p.n}</span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                  {i < PASOS.length - 1 && <span className="ar-next" aria-hidden="true"><Icon id="i-arrow" /></span>}
                </div>
              );
            })}
          </div>
          <p className="demo-note">Pantallas ilustrativas</p>

          <div className="ar-chan rv">
            <span className="lbl">Canales que atiende</span>
            <div className="ar-chips">
              {CANALES.map((c) => (
                <span className="chip ichip" key={c.id}><Icon id={c.icon} />{c.name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — QUÉ HACE POR DENTRO */}
      <section>
        <div className="wrap">
          <Shead
            label="02 — Qué hace por dentro"
            title="Cuatro piezas que trabajan juntas."
            text="No son módulos que se compran aparte: vienen en la misma plataforma y comparten el historial del cliente."
          />
          {/* las cuatro piezas cuelgan de un mismo bus: el historial del cliente */}
          <div className="ar-mods">
            {MODULOS.map((m, i) => (
              <Fragment key={m.n}>
                <div className={`ar-mod rv ${i < 2 ? 'top' : 'bot'} ${i % 3 ? `d${i % 3}` : ''}`.trim()}>
                  <span className="mi"><Icon id={m.icon} /></span>
                  <span className="mn">{m.n}</span>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                  <div className="tags">{m.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
                </div>
                {i === 1 && (
                  <div className="ar-bus rv" aria-hidden="true">
                    <i className="pk p1" /><i className="pk p2" />
                    <span className="bi"><Icon id="i-db" /></span>
                    <span className="bt"><b>Historial del cliente</b><small>compartido por las cuatro piezas</small></span>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — TUS CUENTAS Y TUS DATOS SON TUYOS */}
      <section id="tus-datos" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead label="03 — Tus datos" title="Tus cuentas y tus datos son tuyos." />
          <BloqueDatos producto={PRODUCTO} />
        </div>
      </section>

      {/* 04 — PARA QUIÉN ES */}
      <section>
        <div className="wrap">
          <Shead
            label="04 — Para quién es"
            title="Equipos que atienden mucho, por muchos lados."
            text="Si tu operación vive hoy en tres apps distintas y una planilla, ARIA reemplaza a las cuatro."
          />
          <Escenarios />
        </div>
      </section>

      {/* 05 — QUIÉN PRESTA EL SERVICIO */}
      <section id="quien-presta" style={{ scrollMarginTop: 84 }}>
        <div className="wrap">
          <Shead
            label="05 — Quién presta el servicio"
            title="ARIA es un producto de Novasys del Perú."
            text={`Empresa de tecnología con equipo propio en Lima desde ${EMPRESA.desde}. ARIA corre sobre infraestructura AWS y la implementa y opera el mismo equipo que la construyó.`}
          />
          <FichaNegocio empresa={EMPRESA} producto={PRODUCTO} />
        </div>
      </section>

      {/* 06 — PREGUNTAS */}
      <section>
        <div className="wrap">
          <Shead label="06 — Preguntas" title="Lo que siempre nos preguntan." />
          <div className="faq rv">
            <details>
              <summary>¿Mi número de WhatsApp sigue siendo mío?</summary>
              <p>Sí. Conectas tu propia cuenta y tu propio número; ARIA solo recibe el acceso que tú autorizas para atender por ti. Puedes revocarlo cuando quieras desde tu cuenta de Meta, y el número se queda contigo.</p>
            </details>
            <details>
              <summary>¿Dónde se guardan las conversaciones?</summary>
              <p>En infraestructura AWS, cifradas y separadas por empresa: cada cliente ve únicamente sus cuentas y sus conversaciones. También podemos desplegarlo sobre tu propia cuenta de AWS si prefieres que los datos no salgan de tu nube.</p>
            </details>
            <details>
              <summary>¿Qué pasa si el asistente no sabe responder?</summary>
              <p>Deriva la conversación a una persona con todo el contexto a la vista. El asistente no reemplaza a tu equipo: le quita las preguntas repetidas y los turnos fuera de horario.</p>
            </details>
            <details>
              <summary>¿Puedo cancelar?</summary>
              <p>Sí. La suscripción es mensual y no tiene permanencia mínima. Al cerrar la cuenta puedes exportar tus conversaciones y pedir la eliminación de tus datos — el proceso está descrito en la página de <Link to="/legal/eliminacion-de-datos">eliminación de datos</Link>.</p>
            </details>
            <details>
              <summary>¿Cuánto demora ponerlo en marcha?</summary>
              <p>La conexión de canales y la configuración inicial toman días, no meses. El tiempo real depende de cuántos flujos y plantillas quieras dejar automatizados desde el arranque; eso lo definimos en la demo.</p>
            </details>
            <details>
              <summary>¿Se integra con lo que ya uso?</summary>
              <p>Sí: CRM (incluido Salesforce), ERP y sistemas propios vía API. Es el mismo equipo que implementa CRM, BI y gestión documental en Novasys, así que la integración no se terceriza.</p>
            </details>
          </div>
        </div>
      </section>

      <CtaBand
        title={<>¿Quieres verlo con tus <span style={{ color: 'var(--red)' }}>propios canales</span>?</>}
        text="Agenda una demo de 30 minutos. Conectamos un canal de prueba y te mostramos cómo se ve tu operación dentro de ARIA."
        btnLabel="Agenda una demo"
      />
    </div>
  );
}
