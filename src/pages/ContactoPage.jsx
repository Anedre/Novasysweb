import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineChevronDown,
} from 'react-icons/hi2';
import { Button, Input } from '../design-system';
import CalendlyEmbed from '../components/sections/CalendlyEmbed/CalendlyEmbed';
import ContactoConsola from '../components/sections/ContactoConsola/ContactoConsola';
import styles from './ContactoPage.module.css';

const contactFAQs = [
  { question: '¿Cuánto tiempo toma recibir una respuesta?', answer: 'Nos comprometemos a responder todas las consultas en un máximo de 24 horas hábiles.' },
  { question: '¿Trabajan con empresas pequeñas y medianas?', answer: 'Sí. Nuestras soluciones se adaptan al tamaño y presupuesto de cada empresa, desde pymes hasta corporaciones.' },
  { question: '¿Tienen soporte 24/7?', answer: 'Sí, ofrecemos soporte técnico 24/7 para todos nuestros clientes con contratos activos de mantenimiento.' },
  { question: '¿En qué países operan?', answer: 'Nuestra sede está en Lima, Perú, pero atendemos clientes en toda Latinoamérica de forma remota y presencial.' },
  { question: '¿Cuánto cuesta una consultoría inicial?', answer: 'La primera consultoría de discovery es completamente gratuita y sin compromiso.' },
];

const PROCESO = [
  { n: '01', t: 'Respondemos en 24 h', d: 'Un arquitecto —no un comercial— revisa tu solicitud y te escribe.' },
  { n: '02', t: 'Discovery de 30 min', d: 'Entendemos tu operación, tu stack y qué métrica quieres mover.' },
  { n: '03', t: 'Propuesta técnica', d: 'Arquitectura, alcance, hitos y costos. Sin ambigüedad ni sorpresas.' },
  { n: '04', t: 'Kickoff', d: 'Arrancamos por fases, con demos de avance auditables desde la semana 1.' },
];

// Mapea el "reto" elegido en la consola del hero al value del select `interes` del form.
const RETO_TO_INTERES = {
  'CRM & Ventas': 'crm-ventas',
  'Business Intelligence': 'business-intelligence',
  'Contact Center': 'cloud-aws',
  'Cloud / Migración': 'cloud-aws',
  Infraestructura: 'infra-hp',
  'Gestión documental': 'gestion-documental',
};

// Convierte slug kebab-case a copy legible: 'bi-roadmap-90-dias' → 'bi roadmap 90 dias'
const slugToReadable = (slug) =>
  decodeURIComponent(slug || '').replace(/-/g, ' ').trim();

export default function ContactoPage() {
  const [searchParams] = useSearchParams();
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '', email: '', empresa: '', telefono: '', tipo: '', mensaje: '',
    stack: '', equipoSize: '', timeline: '', interes: '',
  });

  const isDemoMode = formData.tipo === 'demo';

  useEffect(() => {
    const recurso = searchParams.get('recurso');
    const type = searchParams.get('type');
    setFormData((prev) => {
      const next = { ...prev };
      if (type && ['demo', 'cotizacion', 'soporte', 'otro'].includes(type)) next.tipo = type;
      if (recurso) {
        if (!next.tipo) next.tipo = 'otro';
        const recursoLegible = slugToReadable(recurso);
        next.mensaje = `Hola, me interesa recibir el recurso "${recursoLegible}" cuando esté disponible. Por favor avísenme por email apenas lo publiquen.`;
      }
      return next;
    });
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Integración con EmailJS o AWS SES iría aquí — hoy es stub frontend.
    alert('Mensaje enviado. Nos comunicaremos contigo pronto.');
  };

  // Recibe las respuestas de la consola del hero y pre-llena el formulario.
  const handleConsoleSend = ({ industria, reto, stack }) => {
    setFormData((prev) => ({
      ...prev,
      tipo: 'demo',
      interes: RETO_TO_INTERES[reto] || 'varios',
      mensaje:
        `Vengo del configurador de la web — industria: ${industria} · objetivo: ${reto} · stack: ${stack}. ` +
        'Me gustaría que un arquitecto revise mi caso.',
    }));
    setTimeout(() => {
      const el = document.getElementById('contacto-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  return (
    <>
      <Helmet>
        <title>Contacto — Novasys del Perú</title>
        <meta name="description" content="Contacta a Novasys. Arma tu proyecto en la consola, agenda una consultoría gratuita o cuéntanos tu necesidad. Respondemos en menos de 24 horas." />
        <link rel="canonical" href="https://www.novasys.com.pe/contacto" />
      </Helmet>

      {/* Hero — consola interactiva "arma tu proyecto" (pre-llena el form al terminar) */}
      <ContactoConsola onSend={handleConsoleSend} />

      {/* ===== Formulario + info ===== */}
      <div id="contacto-form" />
      <section className={styles.formSection}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Escríbenos</span>
            <h2 className={styles.headTitle}>
              O cuéntanos tu <em>reto</em> directo.
            </h2>
            <p className={styles.headLede}>
              Sin bots ni call centers: tu mensaje lo lee el equipo técnico y te responde un
              arquitecto senior.
            </p>
          </div>

          <div className={styles.layout}>
            <div className={styles.formCard}>
              <p className={styles.formCardTitle}>// formulario</p>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                  <Input label="Nombre completo" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Tu nombre" />
                  <Input label="Email corporativo" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="nombre@empresa.com" />
                  <Input label="Empresa" name="empresa" value={formData.empresa} onChange={handleChange} placeholder="Nombre de tu empresa" />
                  <Input label="Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} placeholder="+51 999 999 999" />
                  <div className={styles.formFull}>
                    <Input label="Tipo de consulta" name="tipo" type="select" value={formData.tipo} onChange={handleChange}>
                      <option value="">Seleccionar...</option>
                      <option value="demo">Agendar demo técnica</option>
                      <option value="cotizacion">Cotizar proyecto</option>
                      <option value="soporte">Soporte técnico</option>
                      <option value="otro">Otro</option>
                    </Input>
                  </div>

                  <AnimatePresence initial={false}>
                    {isDemoMode && (
                      <motion.div
                        key="demo-fields"
                        className={styles.formFull}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className={styles.demoBlock}>
                          <span className={styles.demoBlockKicker}>Cuestionario técnico · sólo para demo</span>
                          <p className={styles.demoBlockHint}>
                            Estos datos nos permiten preparar una demo enfocada en tu stack real.
                            Te ahorra 20 minutos de &ldquo;primero cuéntanos qué usan&rdquo;.
                          </p>
                          <div className={styles.formGrid} style={{ marginTop: 16 }}>
                            <Input label="Solución que quieres ver" name="interes" type="select" value={formData.interes} onChange={handleChange}>
                              <option value="">Seleccionar...</option>
                              <option value="crm-ventas">CRM &amp; Ventas (Oracle Sales Cloud)</option>
                              <option value="business-intelligence">Business Intelligence (Oracle Analytics)</option>
                              <option value="marketing-automation">Marketing Automation (Responsys / Eloqua)</option>
                              <option value="gestion-documental">Gestión Documental (ELO ECM)</option>
                              <option value="software-a-medida">Software a medida</option>
                              <option value="cloud-aws">Cloud AWS · Migración / Connect</option>
                              <option value="infra-hp">Infraestructura HP / HPE</option>
                              <option value="varios">Varios / aún no sé</option>
                            </Input>
                            <Input label="Tamaño del equipo afectado" name="equipoSize" type="select" value={formData.equipoSize} onChange={handleChange}>
                              <option value="">Seleccionar...</option>
                              <option value="1-10">1 – 10 personas</option>
                              <option value="11-50">11 – 50 personas</option>
                              <option value="51-200">51 – 200 personas</option>
                              <option value="201-1000">201 – 1.000 personas</option>
                              <option value="1000+">+ 1.000 personas</option>
                            </Input>
                            <Input label="¿Cuándo necesitas implementarlo?" name="timeline" type="select" value={formData.timeline} onChange={handleChange}>
                              <option value="">Seleccionar...</option>
                              <option value="ya">Ya — proyecto en marcha</option>
                              <option value="0-3m">0 – 3 meses</option>
                              <option value="3-6m">3 – 6 meses</option>
                              <option value="6-12m">6 – 12 meses</option>
                              <option value="explorando">Sólo explorando</option>
                            </Input>
                            <div className={styles.formFull}>
                              <Input
                                label="Stack actual / sistemas críticos"
                                name="stack"
                                type="textarea"
                                value={formData.stack}
                                onChange={handleChange}
                                placeholder="Ej.: SAP S/4 HANA, Salesforce, Oracle EBS, Office 365…"
                                hint="Si no lo sabes con exactitud, está OK — pon lo que tengas a mano."
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={styles.formFull}>
                    <Input
                      label={isDemoMode ? 'Contexto adicional (opcional)' : 'Mensaje'}
                      name="mensaje"
                      type="textarea"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder={isDemoMode ? 'Algo más que tengamos que saber antes de la demo…' : 'Cuéntanos sobre tu proyecto o necesidad...'}
                    />
                  </div>
                  <div className={styles.formFull}>
                    <Button type="submit" variant="primary" size="lg" fullWidth>Enviar mensaje</Button>
                  </div>
                </div>
              </form>
            </div>

            <aside className={styles.info}>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Contacto directo</span>
                <a href="tel:+5116433467" className={styles.infoLink}>
                  <HiOutlinePhone className={styles.infoIcon} />
                  +51 1 643-3467
                </a>
                <a href="mailto:contacto@novasysperu.com" className={styles.infoLink}>
                  <HiOutlineEnvelope className={styles.infoIcon} />
                  contacto@novasysperu.com
                </a>
              </div>

              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Sede</span>
                <div className={styles.infoItem}>
                  <HiOutlineMapPin className={styles.infoIcon} />
                  Lima, Perú
                </div>
                <div className={styles.infoItem}>
                  <HiOutlineClock className={styles.infoIcon} />
                  Lun – Vie · 9:00 – 18:00
                </div>
              </div>

              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Soporte 24/7</span>
                <p className={styles.infoText}>
                  ¿Ya eres cliente y necesitas asistencia técnica urgente? Nuestro equipo está
                  disponible las 24 horas.
                </p>
                <Button href="https://wa.me/5116433467" variant="outline" size="sm">WhatsApp Soporte</Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== Agenda directa (Calendly) ===== */}
      <CalendlyEmbed
        eyebrow="Capítulo 02 · Agenda directa"
        title={<>O agenda en <em>30 segundos</em>.</>}
        dek="Si prefieres saltarte el formulario, elige el horario que te calce. La consultoría inicial dura 30 minutos y siempre la conduce un arquitecto senior, no un comercial."
      />

      {/* ===== Qué pasa después ===== */}
      <section className={styles.proceso}>
        <div className={styles.wrap}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Después de escribir</span>
            <h2 className={styles.headTitle}>
              Qué pasa <em>después</em>.
            </h2>
          </div>
          <div className={styles.procesoGrid}>
            {PROCESO.map((s, i) => (
              <motion.div
                key={s.n}
                className={styles.procesoStep}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.procesoNum}>{s.n}</span>
                <h3 className={styles.procesoTitle}>{s.t}</h3>
                <p className={styles.procesoDesc}>{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className={styles.faqSection}>
        <div className={styles.wrapNarrow}>
          <div className={styles.head}>
            <span className={styles.eyebrow}>Dudas</span>
            <h2 className={styles.headTitle}>
              Preguntas <em>frecuentes</em>.
            </h2>
          </div>
          <div className={styles.faqList}>
            {contactFAQs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
                  <button
                    className={styles.faqTrigger}
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                  >
                    <span>{faq.question}</span>
                    <HiOutlineChevronDown className={styles.faqIcon} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className={styles.faqContent}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className={styles.faqAnswer}>{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
