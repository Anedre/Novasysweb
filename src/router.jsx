// router.jsx — Novasys Router (Lazy loaded) · rediseño v4 completo
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./AppLayout.jsx";
import RouteLoader from './components/layout/RouteLoader.jsx';

// Referencia histórica (home anterior al rediseño; sin enlaces entrantes)
const HomeLegacyPage = lazy(() => import('./pages/HomeLegacyPage.jsx'));

// Páginas v4 — hubs (rediseño 2026)
const HomeV4 = lazy(() => import('./v4/pages/HomeV4.jsx'));
const SolucionesV4 = lazy(() => import('./v4/pages/SolucionesV4.jsx'));
const CloudV4 = lazy(() => import('./v4/pages/CloudV4.jsx'));
const InfraV4 = lazy(() => import('./v4/pages/InfraV4.jsx'));
const CasosV4 = lazy(() => import('./v4/pages/CasosV4.jsx'));
const NosotrosV4 = lazy(() => import('./v4/pages/NosotrosV4.jsx'));
const ContactoV4 = lazy(() => import('./v4/pages/ContactoV4.jsx'));

// Páginas v4 — detalle (rediseño 2026, reemplazan a las bespoke v3)
const CrmVentasV4 = lazy(() => import('./v4/pages/CrmVentasV4.jsx'));
const BusinessIntelligenceV4 = lazy(() => import('./v4/pages/BusinessIntelligenceV4.jsx'));
const MarketingAutomationV4 = lazy(() => import('./v4/pages/MarketingAutomationV4.jsx'));
const GestionDocumentalV4 = lazy(() => import('./v4/pages/GestionDocumentalV4.jsx'));
const SoftwareMedidaV4 = lazy(() => import('./v4/pages/SoftwareMedidaV4.jsx'));
const AriaV4 = lazy(() => import('./v4/pages/AriaV4.jsx'));
const LegalV4 = lazy(() => import('./v4/pages/LegalV4.jsx'));
const AmazonConnectV4 = lazy(() => import('./v4/pages/AmazonConnectV4.jsx'));
const ConnectDialerV4 = lazy(() => import('./v4/pages/ConnectDialerV4.jsx'));
const SageMakerV4 = lazy(() => import('./v4/pages/SageMakerV4.jsx'));
const MigracionCloudV4 = lazy(() => import('./v4/pages/MigracionCloudV4.jsx'));
const InfraProductV4 = lazy(() => import('./v4/pages/InfraProductV4.jsx'));
const TecnologiasHubV4 = lazy(() => import('./v4/pages/TecnologiasHubV4.jsx'));
const TecnologiaV4 = lazy(() => import('./v4/pages/TecnologiaV4.jsx'));
const CasoDetalleV4 = lazy(() => import('./v4/pages/CasoDetalleV4.jsx'));
const EventosV4 = lazy(() => import('./v4/pages/EventosV4.jsx'));
const NotFoundV4 = lazy(() => import('./v4/pages/NotFoundV4.jsx'));

// NOTE: los slugs reales de soluciones/cloud/infraestructura tienen ruta estática
// bespoke, así que los :slug de esas familias solo reciben rutas inválidas → 404.
// Los componentes v3 reemplazados quedan en disco como referencia (sin importar).

// Suspense wrapper
const L = ({ children }) => <Suspense fallback={<RouteLoader />}>{children}</Suspense>;

// Slugs Oracle que vivieron bajo /Soluciones_Novasys y /solucion — hoy en /tecnologias
const ORACLE_SLUGS = [
  'oracle-business-intelligence', 'oracle-paas', 'oracle-bluekai', 'oracle-eloqua',
  'oracle-responsys', 'oracle-service-cloud', 'oracle-sales-cloud', 'oracle-siebel', 'oracle-cpq',
];
const oracleRedirects = (prefix) => ORACLE_SLUGS.map((slug) => ({
  path: `${prefix}/${slug}`,
  element: <Navigate to={`/tecnologias/${slug}`} replace />,
}));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // ===== HUBS v4 =====
      { path: "/", element: <L><HomeV4 /></L> },
      { path: "/home-legacy", element: <L><HomeLegacyPage /></L> },
      { path: "/nosotros", element: <L><NosotrosV4 /></L> },
      { path: "/contacto", element: <L><ContactoV4 /></L> },
      { path: "/eventos", element: <L><EventosV4 /></L> },

      // ===== SOLUCIONES (software) =====
      { path: "/soluciones", element: <L><SolucionesV4 /></L> },
      // Partner hubs (alias canónicos — rutas específicas antes del :slug)
      { path: "/soluciones/amazon", element: <L><CloudV4 /></L> },
      { path: "/soluciones/hp", element: <L><InfraV4 /></L> },
      { path: "/soluciones/novasys", element: <L><SolucionesV4 /></L> },
      { path: "/soluciones/crm-ventas", element: <L><CrmVentasV4 /></L> },
      { path: "/soluciones/gestion-documental", element: <L><GestionDocumentalV4 /></L> },
      { path: "/soluciones/business-intelligence", element: <L><BusinessIntelligenceV4 /></L> },
      { path: "/soluciones/marketing-automation", element: <L><MarketingAutomationV4 /></L> },
      { path: "/soluciones/software-a-medida", element: <L><SoftwareMedidaV4 /></L> },
      // ARIA — producto propio (URL pública que revisa Meta en la verificación)
      { path: "/soluciones/aria", element: <L><AriaV4 /></L> },
      // Backlinks antiguos a productos Oracle bajo /soluciones → ficha técnica
      ...oracleRedirects('/soluciones'),
      { path: "/soluciones/:slug", element: <L><NotFoundV4 /></L> },
      // T1.2 · Legacy slugs sueltos → v4 (redirect)
      { path: "/ventas", element: <Navigate to="/soluciones/crm-ventas" replace /> },
      { path: "/marketing", element: <Navigate to="/soluciones/marketing-automation" replace /> },
      { path: "/business-intelligence", element: <Navigate to="/soluciones/business-intelligence" replace /> },
      { path: "/elo", element: <Navigate to="/soluciones/gestion-documental" replace /> },

      // ===== INFRAESTRUCTURA HP / HPE =====
      { path: "/infraestructura", element: <L><InfraV4 /></L> },
      { path: "/infraestructura/computo", element: <L><InfraProductV4 /></L> },
      { path: "/infraestructura/servidores", element: <L><InfraProductV4 /></L> },
      { path: "/infraestructura/almacenamiento", element: <L><InfraProductV4 /></L> },
      { path: "/infraestructura/:slug", element: <L><NotFoundV4 /></L> },

      // ===== CLOUD AWS =====
      { path: "/cloud", element: <L><CloudV4 /></L> },
      { path: "/cloud/amazon-connect", element: <L><AmazonConnectV4 /></L> },
      { path: "/cloud/connect-dialer", element: <L><ConnectDialerV4 /></L> },
      { path: "/cloud/sagemaker", element: <L><SageMakerV4 /></L> },
      { path: "/cloud/migracion", element: <L><MigracionCloudV4 /></L> },
      // ARIA corre sobre AWS: la ficha canónica vive en /soluciones/aria
      { path: "/cloud/aria", element: <Navigate to="/soluciones/aria" replace /> },
      { path: "/cloud/:slug", element: <L><NotFoundV4 /></L> },

      // ===== TECNOLOGÍAS (fichas Oracle) =====
      { path: "/tecnologias", element: <L><TecnologiasHubV4 /></L> },
      { path: "/tecnologias/:slug", element: <L><TecnologiaV4 /></L> },

      // ===== LEGAL (URLs públicas que se cargan en la App de Meta) =====
      // Privacidad y eliminación de datos son de empresa (sirven a todos los
      // productos); los términos son por producto → /legal/terminos/:producto.
      { path: "/legal", element: <Navigate to="/legal/privacidad" replace /> },
      { path: "/legal/terminos", element: <L><LegalV4 /></L> },
      { path: "/legal/terminos/:producto", element: <L><LegalV4 /></L> },
      { path: "/legal/:slug", element: <L><LegalV4 /></L> },

      // ===== CASOS =====
      { path: "/casos-de-exito", element: <L><CasosV4 /></L> },
      { path: "/casos-de-exito/:slug", element: <L><CasoDetalleV4 /></L> },

      // 404
      { path: "*", element: <L><NotFoundV4 /></L> },

      // ===== LEGACY REDIRECTS =====

      // --- Oracle legacy slugs (sitio anterior) → /tecnologias/:slug ---
      ...oracleRedirects('/Soluciones_Novasys'),
      ...oracleRedirects('/solucion'),

      { path: "/Soluciones_Novasys", element: <Navigate to="/soluciones" replace /> },
      { path: "/Soluciones_Novasys/:slug", element: <Navigate to="/soluciones" replace /> },
      { path: "/Ventas", element: <Navigate to="/soluciones/crm-ventas" replace /> },
      { path: "/Marketing", element: <Navigate to="/soluciones/marketing-automation" replace /> },
      { path: "/Business_Intelligence", element: <Navigate to="/soluciones/business-intelligence" replace /> },
      { path: "/Elo", element: <Navigate to="/soluciones/gestion-documental" replace /> },
      { path: "/SolucionesHPmain", element: <Navigate to="/infraestructura" replace /> },
      { path: "/SolucionesHP", element: <Navigate to="/infraestructura/computo" replace /> },
      { path: "/SolucionesHPEnterprise", element: <Navigate to="/infraestructura/servidores" replace /> },
      { path: "/AlmacenamientoHP", element: <Navigate to="/infraestructura/almacenamiento" replace /> },
      { path: "/Amazon_Web_Services", element: <Navigate to="/cloud" replace /> },
      { path: "/Amazon_Web_Services/Amazon_Connect", element: <Navigate to="/cloud/amazon-connect" replace /> },
      { path: "/Amazon_Web_Services/Connect_Dialer", element: <Navigate to="/cloud/connect-dialer" replace /> },
      { path: "/Amazon_Web_Services/Cloud_Migration", element: <Navigate to="/cloud/migracion" replace /> },
      { path: "/Casos_de_exito", element: <Navigate to="/casos-de-exito" replace /> },
      { path: "/Entel", element: <Navigate to="/casos-de-exito/entel" replace /> },
      { path: "/Renzo", element: <Navigate to="/casos-de-exito/renzo-costa" replace /> },
      { path: "/casos/pacifico", element: <Navigate to="/casos-de-exito/pacifico" replace /> },
      { path: "/casos/centrum", element: <Navigate to="/casos-de-exito/centrum" replace /> },
      { path: "/casos/americatel", element: <Navigate to="/casos-de-exito/americatel" replace /> },
      { path: "/casos/interbank", element: <Navigate to="/casos-de-exito/interbank" replace /> },
      { path: "/Nosotros", element: <Navigate to="/nosotros" replace /> },
      { path: "/Eventos", element: <Navigate to="/eventos" replace /> },
      { path: "/Contacto", element: <Navigate to="/contacto" replace /> },
    ],
  },
]);
