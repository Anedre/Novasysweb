import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineChevronDown,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineEnvelope,
  HiOutlineChartBarSquare,
  HiOutlineServerStack,
  HiOutlineCloudArrowUp,
  HiOutlinePhone,
  HiOutlineBuildingOffice2,
  HiOutlineTrophy,
  HiOutlineCalendarDays,
  HiOutlineSparkles,
  HiOutlineArrowsRightLeft,
} from 'react-icons/hi2';
import { useTheme } from '../../../context/ThemeContext';
import { Button } from '../../../design-system';
import logo from '../../../img/logo_novasys_transparent.png';
// Featured case photos (semantic match from CasosArchive)
import entelPhoto from '../../../img/Corporativo/umberto-FewHpO4VC9Y-unsplash.jpg';
import interbankPhoto from '../../../img/Corporativo/carlos-muza-hpjSkU2UYSU-unsplash.jpg';
import pacificoPhoto from '../../../img/Corporativo/charles-forerunner-3fPXt37X6UQ-unsplash.jpg';
import styles from './Header.module.css';

// Featured cases for rotating "Caso destacado" column — 3 handpicked from data/cases.js
const featuredCasesForMenu = [
  {
    slug: 'entel',
    company: 'Entel',
    industry: 'Telco',
    headline: 'Contact center cloud para 3,000 agentes',
    summary: 'Migración a Amazon Connect con routing inteligente y reportes en tiempo real.',
    photo: entelPhoto,
    path: '/casos-de-exito/entel',
    kpi: '−40% costos',
  },
  {
    slug: 'interbank',
    company: 'Interbank',
    industry: 'Banca',
    headline: 'BI para análisis de cartera en tiempo real',
    summary: 'Snowflake + Tableau con detección de fraude integrada al flujo bancario.',
    photo: interbankPhoto,
    path: '/casos-de-exito/interbank',
    kpi: '5× velocidad',
  },
  {
    slug: 'pacifico',
    company: 'Pacífico Seguros',
    industry: 'Seguros',
    headline: 'ECM integrado al core de pólizas',
    summary: 'Automatización documental con ELO ECM para gestión de pólizas y siniestros.',
    photo: pacificoPhoto,
    path: '/casos-de-exito/pacifico',
    kpi: '−50% manual',
  },
];

const navConfig = [
  {
    id: 'soluciones',
    label: 'Soluciones',
    type: 'megamenu-v2',
    intro: {
      title: 'Soluciones',
      lede: 'Empezamos por lo que necesitas resolver, no por la tecnología.',
      helper: 'Elige una necesidad a la derecha o explora nuestras áreas de práctica.',
      hubs: [
        { label: 'Software', path: '/soluciones/novasys' },
        { label: 'Infraestructura', path: '/soluciones/hp' },
        { label: 'Cloud', path: '/soluciones/amazon' },
        { label: 'Tecnologías', path: '/tecnologias' },
      ],
    },
    needs: [
      { icon: HiOutlineCloudArrowUp, title: 'Migrar a la nube', desc: 'On-prem → AWS con menos costo', path: '/soluciones/amazon' },
      { icon: HiOutlineChartBarSquare, title: 'CRM y BI', desc: 'Vender mejor con datos', path: '/soluciones/crm-ventas' },
      { icon: HiOutlineServerStack, title: 'Hardware HP', desc: 'Workstations, servidores, storage', path: '/soluciones/hp' },
      { icon: HiOutlineArrowsRightLeft, title: 'Automatizar procesos', desc: 'ECM, RPA, integraciones', path: '/soluciones/gestion-documental' },
      { icon: HiOutlinePhone, title: 'Contact center cloud', desc: 'Amazon Connect', path: '/cloud/amazon-connect' },
      { icon: HiOutlineSparkles, title: 'AI & Machine Learning', desc: 'SageMaker, Bedrock', path: '/cloud/sagemaker' },
    ],
  },
  {
    id: 'empresa',
    label: 'Empresa',
    type: 'dropdown',
    items: [
      { icon: HiOutlineBuildingOffice2, label: 'Nosotros', desc: 'Nuestra historia', path: '/nosotros' },
      { icon: HiOutlineTrophy, label: 'Casos de Éxito', desc: 'Proyectos destacados', path: '/casos-de-exito' },
      { icon: HiOutlineCalendarDays, label: 'Eventos', desc: 'Próximos eventos', path: '/eventos' },
    ],
  },
  { id: 'casos', label: 'Casos de Éxito', type: 'link', path: '/casos-de-exito' },
  { id: 'eventos', label: 'Eventos', type: 'link', path: '/eventos' },
];

export default function Header() {
  const { isDark, toggleColorMode, showBanner } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const location = useLocation();
  const menuTimeout = useRef(null);
  const featured = featuredCasesForMenu[featuredIndex];

  // Rotate featured case every 6s while mega menu is open for "soluciones"
  useEffect(() => {
    if (activeMenu !== 'soluciones') return;
    const t = setInterval(() => {
      setFeaturedIndex(i => (i + 1) % featuredCasesForMenu.length);
    }, 6000);
    return () => clearInterval(t);
  }, [activeMenu]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMenuEnter = useCallback((id) => {
    clearTimeout(menuTimeout.current);
    setActiveMenu(id);
  }, []);

  const handleMenuLeave = useCallback(() => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const isTransparent = !isScrolled && location.pathname === '/';
  const headerClass = `${styles.header} ${isTransparent ? styles.headerTransparent : styles.headerSolid} ${showBanner ? styles.withBanner : ''}`;

  return (
    <>
      <header className={headerClass}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Novasys" className={styles.logoImg} />
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            {navConfig.map((item) => (
              <div
                key={item.id}
                className={styles.navItem}
                onMouseEnter={() => item.type !== 'link' && handleMenuEnter(item.id)}
                onMouseLeave={handleMenuLeave}
              >
                {item.type === 'link' ? (
                  <Link
                    to={item.path}
                    className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className={`${styles.navLink} ${activeMenu === item.id ? styles.active : ''}`}
                      aria-expanded={activeMenu === item.id}
                    >
                      {item.label}
                      <HiOutlineChevronDown className={`${styles.chevron} ${activeMenu === item.id ? styles.chevronOpen : ''}`} />
                    </button>

                    {activeMenu === item.id && item.type === 'megamenu' && (
                      <div className={styles.megaMenu}>
                        <div className={styles.megaGrid}>
                          {item.categories.map((cat) => (
                            <div key={cat.title} className={styles.megaCategory}>
                              <span className={styles.megaCategoryTitle}>{cat.title}</span>
                              {cat.items.map((sub) => (
                                <Link key={sub.path + sub.label} to={sub.path} className={styles.megaItem}>
                                  <span className={styles.megaItemIcon}><sub.icon /></span>
                                  <span className={styles.megaItemText}>
                                    <span className={styles.megaItemLabel}>{sub.label}</span>
                                    <span className={styles.megaItemDesc}>{sub.desc}</span>
                                  </span>
                                </Link>
                              ))}
                              {cat.hubPath && (
                                <Link to={cat.hubPath} className={styles.megaHubLink}>
                                  {cat.hubLabel}
                                  <HiOutlineChevronDown style={{ transform: 'rotate(-90deg)' }} />
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeMenu === item.id && item.type === 'megamenu-v2' && (
                      <div className={styles.megaMenu}>
                        <div className={styles.megaGridV2}>
                          {/* COL 1 — Intro contextual */}
                          <div className={styles.mmIntro}>
                            <h4 className={styles.mmIntroTitle}>{item.intro.title}</h4>
                            <p className={styles.mmIntroLede}>
                              Empezamos por <em>lo que necesitas resolver</em>, no por la tecnología.
                            </p>
                            <small className={styles.mmIntroHelper}>{item.intro.helper}</small>
                            <div className={styles.mmIntroHubs}>
                              {item.intro.hubs.map(h => (
                                <Link key={h.path} to={h.path} className={styles.mmIntroHubChip}>
                                  {h.label}
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* COL 2 — Necesidades (6 items) */}
                          <div className={styles.mmNeeds}>
                            <h4 className={styles.mmColTitle}>¿Qué necesitas?</h4>
                            <div className={styles.mmNeedsList}>
                              {item.needs.map(n => (
                                <Link key={n.path + n.title} to={n.path} className={styles.mmNeedLink}>
                                  <span className={styles.mmNeedIcon}><n.icon /></span>
                                  <span className={styles.mmNeedText}>
                                    <span className={styles.mmNeedTitle}>{n.title}</span>
                                    <span className={styles.mmNeedDesc}>{n.desc}</span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* COL 3 — Caso destacado rotativo */}
                          <div className={styles.mmFeatured}>
                            <h4 className={styles.mmColTitle}>Caso destacado</h4>
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={featured.slug}
                                className={styles.mmFeatureCard}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              >
                                <Link to={featured.path} className={styles.mmFeatureLink}>
                                  <span className={styles.mmFeaturePill}>
                                    {featured.company} · {featured.industry}
                                  </span>
                                  <div className={styles.mmFeatureImg}>
                                    <img src={featured.photo} alt={featured.company} loading="lazy" />
                                    <span className={styles.mmFeatureKpi}>{featured.kpi}</span>
                                  </div>
                                  <h5 className={styles.mmFeatureHeadline}>{featured.headline}</h5>
                                  <p className={styles.mmFeatureSummary}>{featured.summary}</p>
                                  <span className={styles.mmFeatureArrow}>Leer caso →</span>
                                </Link>
                              </motion.div>
                            </AnimatePresence>
                            <div className={styles.mmFeatureDots}>
                              {featuredCasesForMenu.map((c, i) => (
                                <button
                                  key={c.slug}
                                  className={`${styles.mmFeatureDot} ${i === featuredIndex ? styles.mmFeatureDotActive : ''}`}
                                  onClick={(e) => { e.preventDefault(); setFeaturedIndex(i); }}
                                  aria-label={`Mostrar caso ${c.company}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeMenu === item.id && item.type === 'dropdown' && (
                      <div className={styles.dropdown}>
                        {item.items.map((sub) => (
                          <Link key={sub.path} to={sub.path} className={styles.dropdownItem}>
                            <span className={styles.dropdownItemIcon}><sub.icon /></span>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              className={styles.themeToggle}
              onClick={toggleColorMode}
              aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
              {isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
            </button>
            <Button
              to="/contacto"
              variant={isTransparent ? 'outline' : 'primary'}
              size="sm"
              icon={HiOutlineEnvelope}
              className="hide-mobile"
            >
              Contactar
            </Button>
            <button
              className={styles.mobileToggle}
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <HiOutlineBars3 />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div className={`${styles.mobileOverlay} open`} onClick={() => setMobileOpen(false)} />
          <div className={styles.mobileMenu}>
            <div className={styles.mobileHeader}>
              <img src={logo} alt="Novasys" className={styles.logoImg} />
              <button className={styles.mobileClose} onClick={() => setMobileOpen(false)} aria-label="Cerrar">
                <HiOutlineXMark />
              </button>
            </div>

            {navConfig.map((item) => (
              <div key={item.id} className={styles.mobileNavSection}>
                {item.type === 'link' ? (
                  <Link to={item.path} className={styles.mobileNavLink}>
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className={styles.mobileNavLink}
                      onClick={() => setMobileExpanded(mobileExpanded === item.id ? null : item.id)}
                    >
                      {item.label}
                      <HiOutlineChevronDown
                        className={`${styles.chevron} ${mobileExpanded === item.id ? styles.chevronOpen : ''}`}
                      />
                    </button>
                    {mobileExpanded === item.id && (
                      <div className={styles.mobileSubNav}>
                        {item.type === 'megamenu' && item.categories.map((cat) => (
                          <div key={cat.title}>
                            <span className={styles.mobileSectionTitle}>{cat.title}</span>
                            {cat.items.map((sub) => (
                              <Link key={sub.path + sub.label} to={sub.path} className={styles.mobileSubLink}>
                                <sub.icon />
                                {sub.label}
                              </Link>
                            ))}
                            {cat.hubPath && (
                              <Link to={cat.hubPath} className={styles.mobileSubLink} style={{ fontWeight: 600 }}>
                                {cat.hubLabel} →
                              </Link>
                            )}
                          </div>
                        ))}

                        {item.type === 'megamenu-v2' && (
                          <>
                            <div>
                              <span className={styles.mobileSectionTitle}>¿Qué necesitas?</span>
                              {item.needs.map(n => (
                                <Link key={n.path + n.title} to={n.path} className={styles.mobileSubLink}>
                                  <n.icon />
                                  {n.title}
                                </Link>
                              ))}
                            </div>
                            <div>
                              <span className={styles.mobileSectionTitle}>Áreas de práctica</span>
                              {item.intro.hubs.map(h => (
                                <Link key={h.path} to={h.path} className={styles.mobileSubLink} style={{ fontWeight: 600 }}>
                                  {h.label} →
                                </Link>
                              ))}
                            </div>
                          </>
                        )}

                        {item.type === 'dropdown' && item.items.map((sub) => (
                          <Link key={sub.path} to={sub.path} className={styles.mobileSubLink}>
                            <sub.icon />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            <div style={{ marginTop: 'auto', paddingTop: 'var(--space-6)' }}>
              <Button to="/contacto" variant="primary" size="lg" fullWidth icon={HiOutlineEnvelope}>
                Contactar
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
