import { Link } from 'react-router-dom';
import {
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
} from 'react-icons/hi2';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import logo from '../../../img/logo_novasys_transparent.png';
import AWSLogo from '../../../img/AWscloud.png';
import HPLogo from '../../../img/HP_enterprise.png';
import OracleLogo from '../../../img/Obusiness.png';
import styles from './Footer.module.css';

/**
 * Footer · v3-nova editorial
 * --------------------------
 * - SIN pre-CTA (cada página v3 lleva su propio EditorialCta)
 * - Manifiesto editorial arriba (Fraunces italic)
 * - 4 columnas: Brand · Soluciones · Stack · Empresa
 * - Bottom bar mono (copyright + social + "Made in Lima")
 */

const footerLinks = {
  soluciones: [
    { label: 'Software a Medida', path: '/soluciones/software-a-medida' },
    { label: 'CRM & Ventas', path: '/soluciones/crm-ventas' },
    { label: 'Business Intelligence', path: '/soluciones/business-intelligence' },
    { label: 'Marketing Automation', path: '/soluciones/marketing-automation' },
    { label: 'Gestión Documental', path: '/soluciones/gestion-documental' },
    { label: 'Ver todas →', path: '/soluciones', emphasis: true },
  ],
  stack: [
    { label: 'Infraestructura HP / HPE', path: '/infraestructura' },
    { label: 'Cloud AWS', path: '/cloud' },
    { label: 'Tecnologías Oracle', path: '/tecnologias' },
    { label: 'Amazon Connect', path: '/cloud/amazon-connect' },
    { label: 'Servidores ProLiant', path: '/infraestructura/servidores' },
    { label: 'Almacenamiento HPE', path: '/infraestructura/almacenamiento' },
  ],
  empresa: [
    { label: 'Nosotros', path: '/nosotros' },
    { label: 'Casos de Éxito', path: '/casos-de-exito' },
    { label: 'Eventos', path: '/eventos' },
    { label: 'Contacto', path: '/contacto' },
  ],
};

const socialLinks = [
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/novasyspe/', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://x.com/novasysperu', label: 'Twitter' },
  { icon: FaFacebookF, href: 'https://www.facebook.com/Miguelavsm/', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/miguelav_sm/', label: 'Instagram' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      {/* Manifesto strip — abre el footer con un fragmento editorial */}
      <div className={styles.manifestoStrip}>
        <div className={styles.manifestoInner}>
          <span className={styles.manifestoLabel}>§ Footer · Hablemos</span>
          <p className={styles.manifesto}>
            Diseñamos, construimos y operamos software empresarial.
            En <em>Lima</em> desde el 2010 — para clientes en todo el Perú.
          </p>
        </div>
      </div>

      <div className={styles.divider} aria-hidden="true" />

      {/* Main grid */}
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          {/* Brand column */}
          <div className={styles.brand}>
            <Link to="/" aria-label="Novasys del Perú · ir al inicio">
              <img src={logo} alt="Novasys" className={styles.brandLogo} />
            </Link>

            <p className={styles.brandTagline}>
              Tecnología <em>crítica</em> con respaldo de equipo propio en Lima.
            </p>

            <div className={styles.contactLinks}>
              <a href="tel:+5116433467" className={styles.contactLink}>
                <HiOutlinePhone className={styles.contactLinkIcon} />
                +51 1 643-3467
              </a>
              <a href="mailto:contacto@novasysperu.com" className={styles.contactLink}>
                <HiOutlineEnvelope className={styles.contactLinkIcon} />
                contacto@novasysperu.com
              </a>
              <a
                href="https://maps.app.goo.gl/rwoHrEs1r5V21fPM7"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <HiOutlineMapPin className={styles.contactLinkIcon} />
                Lima, Perú
              </a>
            </div>

            <div className={styles.partnersBlock}>
              <span className={styles.partnersLabel}>Partners certificados</span>
              <div className={styles.partners}>
                <img src={AWSLogo} alt="AWS Partner" className={styles.partnerLogo} />
                <img src={HPLogo} alt="HP Partner" className={styles.partnerLogo} />
                <img src={OracleLogo} alt="Oracle Partner" className={styles.partnerLogo} />
              </div>
            </div>
          </div>

          {/* Soluciones */}
          <div className={styles.linkColumn}>
            <span className={styles.linkColumnTitle}>Soluciones</span>
            <div className={styles.linkColumnItems}>
              {footerLinks.soluciones.map((link) => (
                <Link
                  key={link.path + link.label}
                  to={link.path}
                  className={`${styles.footerLink} ${link.emphasis ? styles.footerLinkEmphasis : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className={styles.linkColumn}>
            <span className={styles.linkColumnTitle}>Stack</span>
            <div className={styles.linkColumnItems}>
              {footerLinks.stack.map((link) => (
                <Link key={link.path + link.label} to={link.path} className={styles.footerLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Empresa */}
          <div className={styles.linkColumn}>
            <span className={styles.linkColumnTitle}>Empresa</span>
            <div className={styles.linkColumnItems}>
              {footerLinks.empresa.map((link) => (
                <Link key={link.path + link.label} to={link.path} className={styles.footerLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <span className={styles.copyright}>
              © {currentYear} Novasys del Perú · Todos los derechos reservados
            </span>
            <span className={styles.madeIn}>
              Made in <em>Lima</em>
            </span>
          </div>

          <div className={styles.socialLinks}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
