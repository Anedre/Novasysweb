import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {
  ChapterLabel,
  EditorialTitle,
  SectionHead,
  Reveal,
  PillButton,
  CornerMarks,
  LiveDot,
  SparkIcon,
} from '../design-system';
import PartnersNova from '../components/sections/PartnersNova/PartnersNova';
import TimelineDeck from '../components/sections/TimelineDeck/TimelineDeck';
import teamA from '../img/Corporativo/krakenimages-Y5bvRlcCx8k-unsplash.jpg';
import teamB from '../img/Corporativo/sigmund-LCun3uxh-z0-unsplash.jpg';
import teamC from '../img/Corporativo/pexels-mizunokozuki-12899168.jpg';
import teamD from '../img/Corporativo/pexels-cottonbro-3205570.jpg';
import storyPhoto from '../img/Corporativo/campaign-creators-gMsnXqILjp4-unsplash.jpg';
import entelLogo from '../img/clients/entel.png';
import interbankLogo from '../img/clients/interbank.png';
import pacificoLogo from '../img/clients/pacifico.svg';
import renzoLogo from '../img/clients/renzo-costa.png';
import americatelLogo from '../img/clients/americatel.png';
import centrumLogo from '../img/clients/centrum.png';
import styles from './NosotrosPage.module.css';

// Stats con count-up animado (separamos número y sufijo para CountUp)
const stats = [
  { count: 200, decimals: 0, suffix: '+', label: 'Proyectos entregados', context: 'desde 2010' },
  { count: 24, decimals: 0, suffix: 'K+', label: 'Usuarios impactados', context: 'en plataformas' },
  { count: 99.97, decimals: 2, suffix: '%', label: 'Uptime SLA', context: 'ops críticas' },
  { count: 15, decimals: 0, suffix: '+', label: 'Años operando', context: 'en el Perú' },
];

// 6 paneles del Timeline acordeón (TL4) — port del design pack
const timelinePanels = [
  {
    year: '2010',
    bg: '#E11D2A', bgd: '#B8141F',
    tag: 'Capítulo I · Fundación',
    title: 'Tres ingenieros, una mesa prestada.',
    desc: 'Miguel Ángel V. firma el RUC el 14 de marzo. Primera factura: 22 días después, integración Oracle Forms para una financiera limeña.',
    facts: [
      { label: 'Sede', value: 'San Isidro · 60 m²' },
      { label: 'Headcount', value: '3 ingenieros' },
      { label: 'Stack', value: 'Oracle Forms · Java 1.6' },
    ],
    quote: 'Empezamos vendiendo confianza, no software.',
  },
  {
    year: '2012',
    bg: '#C81824', bgd: '#9C0F18',
    tag: 'Capítulo II · Oracle Partner',
    title: 'Oracle nos firma como Certified Partner.',
    desc: 'Examen rendido en Buenos Aires. Volvemos con seis contratos pre-firmados de banca y retail. Facturación se duplica en seis meses.',
    facts: [
      { label: 'Certificación', value: 'Oracle Certified Partner' },
      { label: 'Headcount', value: '9 ingenieros' },
      { label: 'Verticales', value: 'Banca · Retail' },
    ],
    quote: 'Pasar de Forms a Sales Cloud nos forzó a pensar en datos.',
  },
  {
    year: '2016',
    bg: '#AF131E', bgd: '#840A12',
    tag: 'Capítulo III · AWS Partner Network',
    title: 'Migramos el portafolio a la nube.',
    desc: 'Tres ingenieros viajan a re:Invent. Decisión: migrar a AWS en 18 meses. Lo logramos en 14. Seis prácticas certificadas de inicio.',
    facts: [
      { label: 'Nivel APN', value: 'Standard → Advanced' },
      { label: 'Headcount', value: '22 ingenieros' },
      { label: 'Workloads', value: '47 migrados · 14 meses' },
    ],
    quote: 'Dejamos de vender fierros y empezamos a vender continuidad.',
  },
  {
    year: '2019',
    bg: '#961018', bgd: '#6F060C',
    tag: 'Capítulo IV · HP Gold',
    title: 'Workstations, servidores y storage en casa.',
    desc: 'Renovamos el laboratorio: dos racks completos de demo. Testeamos topologías reales antes de proponerlas. Cuatro retailers firman renovación.',
    facts: [
      { label: 'Nivel', value: 'HP & HPE Gold' },
      { label: 'Headcount', value: '34 ingenieros' },
      { label: 'Lab interno', value: '2 racks · 18U útiles' },
    ],
    quote: 'Tener el lab nos cambió la conversación: ya no especulamos.',
  },
  {
    year: '2022',
    bg: '#7E0C12', bgd: '#580407',
    tag: 'Capítulo V · Amazon Connect',
    title: 'Primer contact center cloud production-grade.',
    desc: 'Proyecto Entel: arranca en febrero, va vivo en agosto. 240 agentes migrados desde un PBX legado. Latencia de cola: de 11.0s a 1.4s.',
    facts: [
      { label: 'Especialización', value: 'Service Delivery · Connect' },
      { label: 'Headcount', value: '41 ingenieros' },
      { label: 'Latencia cola', value: '11.0s → 1.4s' },
    ],
    quote: 'Un cliente bien acompañado vuelve — y trae otros.',
  },
  {
    year: '2025',
    bg: '#0E0E12', bgd: '#000000',
    tag: 'Capítulo VI · Hoy',
    title: '200+ proyectos. Y el folio sigue abierto.',
    desc: '48 personas, cinco partnerships activos, oficinas en San Isidro y Arequipa. La tesis sigue siendo la misma de 2010.',
    facts: [
      { label: 'Headcount', value: '48 personas' },
      { label: 'Proyectos', value: '200+ entregados' },
      { label: 'Uptime · 12m', value: '99.97%' },
    ],
    quote: 'El próximo capítulo se co-firma contigo.',
    live: true,
    highlight: true,
    amberTag: true,
  },
];

const values = [
  {
    roman: 'I',
    title: 'Rigor',
    desc: 'Cada decisión técnica se defiende con datos. No vendemos magia, vendemos ingeniería defendible.',
  },
  {
    roman: 'II',
    title: 'Transparencia',
    desc: 'SLA visibles, roadmap compartido, demos quincenales. El cliente ve todo lo que hacemos.',
  },
  {
    roman: 'III',
    title: 'Proximidad',
    desc: 'Equipo propio en Lima, no subcontratado. Respuesta en tu zona horaria y con contexto local.',
  },
];

const team = [
  { name: 'Miguel Ángel V.', role: 'CEO & Fundador', quote: 'La tecnología sobra. Lo que escasea es gente que sepa integrarla con sentido.', photo: teamA },
  { name: 'Carlos Mendoza', role: 'CTO', quote: 'Diseñamos sistemas para sostener 10 años, no para deslumbrar hoy.', photo: teamB },
  { name: 'Andrea Torres', role: 'Directora Comercial', quote: 'Un cliente bien acompañado vuelve — y trae otros.', photo: teamC },
  { name: 'Luis Paredes', role: 'Lead Architect', quote: 'El mejor código es el que otro arquitecto pueda entender en 5 minutos.', photo: teamD },
];

const clients = [
  { name: 'Entel', logo: entelLogo },
  { name: 'Interbank', logo: interbankLogo },
  { name: 'Pacífico Seguros', logo: pacificoLogo },
  { name: 'Renzo Costa', logo: renzoLogo },
  { name: 'Americatel', logo: americatelLogo },
  { name: 'Centrum PUCP', logo: centrumLogo },
];

export default function NosotrosPage() {
  return (
    <>
      <Helmet>
        <title>Nosotros — Novasys del Perú · 15 años de ingeniería crítica</title>
        <meta
          name="description"
          content="Fundada en 2010 en Lima. Socio tecnológico de los bancos, aseguradoras y telcos más importantes del Perú. Equipo propio, partners certificados, SLAs auditados."
        />
        <link rel="canonical" href="https://www.novasys.com.pe/nosotros" />
      </Helmet>

      {/* ===== 01 · Hero editorial narrativo ===== */}
      <section className={styles.hero}>
        <div className={styles.heroPhoto} aria-hidden="true">
          <img src={storyPhoto} alt="" loading="eager" />
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroGridBg} aria-hidden="true" />

        <div className={styles.heroMeta}>
          <span><b>Lima, Perú</b> · Fundada 2010</span>
          <span className={styles.dot} />
          <span><b>15+</b> años de operación continua</span>
          <span className={styles.dot} />
          <span className={styles.live}>
            <LiveDot tone="green" size={7} />
            Equipo propio · 48 personas
          </span>
        </div>

        <div className={styles.heroBody}>
          <span className={styles.heroKicker}>Capítulo 00 · Sobre Novasys</span>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine}><span>Construimos</span></span>
            <span className={styles.heroTitleLine}><span>la infraestructura</span></span>
            <span className={styles.heroTitleLine}><span><em>silenciosa</em> del Perú.</span></span>
          </h1>
          <motion.p
            className={styles.heroLede}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Desde 2010 operamos el stack digital detrás de los bancos, aseguradoras y telcos que sostienen la economía peruana. No buscamos ser visibles — buscamos que los sistemas críticos de nuestros clientes lo sean menos.
          </motion.p>
        </div>
      </section>

      {/* ===== 02 · Stats strip (con count-up + corner marks) ===== */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className={styles.statCell}>
              <div className={styles.statVal}>
                <CountUp
                  end={s.count}
                  decimals={s.decimals}
                  suffix={s.suffix}
                  duration={2.4}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statContext}>{s.context}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 03 · Partners certificados (reuse) ===== */}
      <PartnersNova />

      {/* ===== 04 · Quiénes somos (story con caption + sign) ===== */}
      <section className={styles.story} id="quienes">
        <div className={styles.storyInner}>
          <Reveal from="left" className={styles.storyPhotoWrap}>
            <div className={styles.storyPhoto}>
              <img src={storyPhoto} alt="Equipo Novasys en reunión" loading="lazy" />
              <CornerMarks tone="red" corners={['tl', 'br']} size={28} weight={1.5} offset={14} />
            </div>
            <div className={styles.storyCaption}>
              <span>Fig. 01</span>
              <span>Oficina central · San Isidro, Lima</span>
            </div>
          </Reveal>

          <Reveal from="right" delay={0.1} className={styles.storyText}>
            {/* size="xl" matchea h2.title del spec */}
            <SectionHead
              label="Capítulo 01 · Quiénes somos"
              title={<>Tecnología que <em>resuelve</em>,<br />no que deslumbra.</>}
              titleSize="xl"
              titleAccent="red"
            />
            <p className={styles.storyParagraph}>
              Novasys nace en 2010 con una convicción: la tecnología debe ser un habilitador real del negocio, no una complejidad adicional. Construimos un equipo de ingenieros con una visión común — que los sistemas críticos deben sostener 10 años de operación, no deslumbrar en la demo.
            </p>
            <p className={styles.storyParagraph}>
              Como partners certificados de AWS, HP y Oracle tenemos acceso a tecnología de clase mundial. Lo que nos diferencia es <em>cómo</em> la implementamos: con cercanía, con SLAs auditables y con un equipo propio en Lima que responde en tu misma zona horaria.
            </p>
            <div className={styles.storySign}>
              <span>— Miguel Ángel V.</span>
              <span>Fundador &amp; CEO</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 05 · Timeline acordeón (TL4 — reemplaza al timeline vertical) ===== */}
      <TimelineDeck
        label="Capítulo 02 · Historia"
        title={<>Quince años, <em>seis paneles</em>.</>}
        dek="Cada panel guarda un capítulo. Pasá el cursor o hacé click para abrirlo — el resto se contrae."
        panels={timelinePanels}
      />

      {/* ===== 06 · Equipo líder ===== */}
      <section className={styles.team} id="equipo">
        <div className={styles.teamInner}>
          <Reveal>
            {/* size="xl" matchea h2.title del spec (clamp 40,5.5vw,84) */}
            <SectionHead
              label="Capítulo 03 · Equipo líder"
              title={<>Personas que <em>firman</em> cada decisión.</>}
              titleSize="xl"
              dek="Los rostros detrás de cada propuesta técnica y comercial. Cercanos, disponibles, responsables."
              rule
            />
          </Reveal>

          <div className={styles.teamGrid}>
            {team.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.1} className={styles.teamCard}>
                <div className={styles.teamPhoto}>
                  <img src={person.photo} alt={person.name} loading="lazy" />
                  <div className={styles.teamOverlay} aria-hidden="true" />
                  <span className={styles.teamBadge}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <blockquote className={styles.teamQuote}>{person.quote}</blockquote>
                <div className={styles.teamAttr}>
                  <span className={styles.teamName}>{person.name}</span>
                  <span className={styles.teamRole}>{person.role}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <p className={styles.teamDisclaimer}>
            <SparkIcon size={14} /> Retratos ilustrativos — producción fotográfica oficial en curso.
          </p>
        </div>
      </section>

      {/* ===== 07 · Valores + Clientes ===== */}
      <section className={styles.valoresClientes} id="valores">
        <div className={styles.vcInner}>
          <Reveal from="left" className={styles.vcValues}>
            <ChapterLabel>Capítulo 04 · Valores</ChapterLabel>
            {/* size="xl" matchea h2.title del spec */}
            <EditorialTitle size="xl">
              Tres principios <br /><em>no negociables.</em>
            </EditorialTitle>
            <ul className={styles.valuesList}>
              {values.map((v) => (
                <li key={v.title} className={styles.valueRow}>
                  <div className={styles.valueRoman}>{v.roman}</div>
                  <div>
                    <h4 className={styles.valueTitle}>{v.title}</h4>
                    <p className={styles.valueDesc}>{v.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal from="right" delay={0.1} className={styles.vcClients}>
            <ChapterLabel>Capítulo 05 · Clientes</ChapterLabel>
            {/* size="xl" matchea h2.title del spec */}
            <EditorialTitle size="xl">
              Empresas que <em>nos confían</em> su operación.
            </EditorialTitle>
            <div className={styles.clientsGrid}>
              {clients.map((c) => (
                <div key={c.name} className={styles.clientLogo} title={c.name}>
                  <img src={c.logo} alt={c.name} loading="lazy" />
                </div>
              ))}
            </div>
            <p className={styles.clientsFoot}>
              Bancos, aseguradoras, telcos, retail y educación superior. Industrias donde el uptime no es opcional.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== 08 · CTA dual ===== */}
      <section className={styles.ctaDual} id="contacto">
        <div className={styles.ctaInner}>
          <Reveal>
            <ChapterLabel tone="amber">Siguiente capítulo</ChapterLabel>
            <EditorialTitle size="xl" accent="amber" inverse>
              ¿Trabajamos juntos o te <em>sumás al equipo</em>?
            </EditorialTitle>
            <p className={styles.ctaLede}>
              Dos caminos, una misma puerta. Elegí el que mejor calza con tu intención.
            </p>
            <div className={styles.ctaActions}>
              <PillButton to="/contacto" variant="primary" arrow size="lg" inverse>
                Conversemos
              </PillButton>
              <PillButton to="/contacto?intent=careers" variant="secondary" size="lg" inverse>
                Únete al equipo
              </PillButton>
            </div>
            <div className={styles.ctaTrust}>
              <span>◆ Respuesta &lt; 24 h</span>
              <span>◆ Consultoría sin costo</span>
              <span>◆ Procesos abiertos · Lima</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
