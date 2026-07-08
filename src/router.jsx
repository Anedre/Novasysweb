// router.js — Novasys v3 Router (Lazy loaded)
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./AppLayout.jsx";
import RouteLoader from './components/layout/RouteLoader.jsx';

// Lazy-loaded pages (v3 redesign)
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const HomeLegacyPage = lazy(() => import('./pages/HomeLegacyPage.jsx'));
const NosotrosPage = lazy(() => import('./pages/NosotrosPage.jsx'));
const ContactoPage = lazy(() => import('./pages/ContactoPage.jsx'));
const EventosPage = lazy(() => import('./pages/EventosPage.jsx'));
const SolucionesHubPage = lazy(() => import('./pages/SolucionesHubPage.jsx'));
const SolucionDetallePage = lazy(() => import('./pages/SolucionDetallePage.jsx'));
const CRMVentasPage = lazy(() => import('./pages/CRMVentasPage.jsx'));
const GestionDocumentalPage = lazy(() => import('./pages/GestionDocumentalPage.jsx'));
const BusinessIntelligencePage = lazy(() => import('./pages/BusinessIntelligencePage.jsx'));
const MarketingAutomationPage = lazy(() => import('./pages/MarketingAutomationPage.jsx'));
const SoftwareMedidaPage = lazy(() => import('./pages/SoftwareMedidaPage.jsx'));
const InfraestructuraPage = lazy(() => import('./pages/InfraestructuraPage.jsx'));
const InfraProductPage = lazy(() => import('./pages/InfraProductPage.jsx'));
const InfraDetallePage = lazy(() => import('./pages/InfraDetallePage.jsx'));
const CloudPage = lazy(() => import('./pages/CloudPage.jsx'));
const CloudDetallePage = lazy(() => import('./pages/CloudDetallePage.jsx'));
const AmazonConnectPage = lazy(() => import('./pages/AmazonConnectPage.jsx'));
const ConnectDialerPage = lazy(() => import('./pages/ConnectDialerPage.jsx'));
const SageMakerPage = lazy(() => import('./pages/SageMakerPage.jsx'));
const MigracionCloudPage = lazy(() => import('./pages/MigracionCloudPage.jsx'));
const TecnologiasHubPage = lazy(() => import('./pages/TecnologiasHubPage.jsx'));
const TecnologiaPage = lazy(() => import('./pages/TecnologiaPage.jsx')); // bespoke ficha software (reemplaza TecnologiaDetallePage)
const CasosHubPage = lazy(() => import('./pages/CasosHubPage.jsx'));
const CasoDetallePage = lazy(() => import('./pages/CasoDetallePage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

// NOTE (C4): SolucionesHP/SolucionesHP_Enterprise/AlmacenamientoHP/AmazonConnect/
// AmazonDialer/CloudMigration ya no están ruteados — sus slugs ahora caen en
// /infraestructura/:slug y /cloud/:slug resueltos por InfraDetallePage y
// CloudDetallePage contra data/infrastructure.jsx y data/cloud.jsx.
// NOTE (T1.2): /ventas, /marketing, /elo, /business-intelligence ya no se sirven
// desde componentes legacy — ahora redirigen 301 a sus equivalentes v3 en /soluciones/*.
// Los componentes legacy (Ventas, Marketing, ELO, BusinessIntelligence) quedan en disco
// como referencia para una posible limpieza posterior.

// Suspense wrapper
const L = ({ children }) => <Suspense fallback={<RouteLoader />}>{children}</Suspense>;

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // ===== NEW PAGES (v3) =====
      { path: "/", element: <L><HomePage /></L> },
      { path: "/home-legacy", element: <L><HomeLegacyPage /></L> },
      { path: "/nosotros", element: <L><NosotrosPage /></L> },
      { path: "/contacto", element: <L><ContactoPage /></L> },
      { path: "/eventos", element: <L><EventosPage /></L> },

      // Solutions
      { path: "/soluciones", element: <L><SolucionesHubPage /></L> },
      // Partner hubs (canonical v3 routes — specific paths matched before dynamic :slug)
      { path: "/soluciones/amazon", element: <L><CloudPage /></L> },
      { path: "/soluciones/hp", element: <L><InfraestructuraPage /></L> },
      // Consolidado: /soluciones/novasys usa la misma hub de software (bento) que /soluciones,
      // igual que /soluciones/amazon=Cloud y /soluciones/hp=Infra. Canonical → /soluciones.
      { path: "/soluciones/novasys", element: <L><SolucionesHubPage /></L> },
      { path: "/soluciones/crm-ventas", element: <L><CRMVentasPage /></L> }, // bespoke, antes del :slug
      { path: "/soluciones/gestion-documental", element: <L><GestionDocumentalPage /></L> }, // bespoke, antes del :slug
      { path: "/soluciones/business-intelligence", element: <L><BusinessIntelligencePage /></L> }, // bespoke, antes del :slug
      { path: "/soluciones/marketing-automation", element: <L><MarketingAutomationPage /></L> }, // bespoke, antes del :slug
      { path: "/soluciones/software-a-medida", element: <L><SoftwareMedidaPage /></L> }, // bespoke, antes del :slug
      { path: "/soluciones/:slug", element: <L><SolucionDetallePage /></L> },
      // T1.2 · Legacy slugs sueltos → v3 (redirect 301)
      { path: "/ventas", element: <Navigate to="/soluciones/crm-ventas" replace /> },
      { path: "/marketing", element: <Navigate to="/soluciones/marketing-automation" replace /> },
      { path: "/business-intelligence", element: <Navigate to="/soluciones/business-intelligence" replace /> },
      { path: "/elo", element: <Navigate to="/soluciones/gestion-documental" replace /> },

      // Infrastructure HP — v3 dynamic template (C4)
      { path: "/infraestructura", element: <L><InfraestructuraPage /></L> },
      { path: "/infraestructura/computo", element: <L><InfraProductPage /></L> }, // bespoke datasheet, antes del :slug
      { path: "/infraestructura/servidores", element: <L><InfraProductPage /></L> }, // bespoke datasheet, antes del :slug
      { path: "/infraestructura/almacenamiento", element: <L><InfraProductPage /></L> }, // bespoke datasheet, antes del :slug
      { path: "/infraestructura/:slug", element: <L><InfraDetallePage /></L> },

      // Cloud AWS — v3 dynamic template (C4)
      { path: "/cloud", element: <L><CloudPage /></L> },
      { path: "/cloud/amazon-connect", element: <L><AmazonConnectPage /></L> }, // bespoke, antes del :slug
      { path: "/cloud/connect-dialer", element: <L><ConnectDialerPage /></L> }, // bespoke, antes del :slug
      { path: "/cloud/sagemaker", element: <L><SageMakerPage /></L> }, // bespoke, antes del :slug
      { path: "/cloud/migracion", element: <L><MigracionCloudPage /></L> }, // bespoke, antes del :slug
      { path: "/cloud/:slug", element: <L><CloudDetallePage /></L> },

      // Tecnologías — fichas técnicas de productos (C5 · opción B del roadmap)
      { path: "/tecnologias", element: <L><TecnologiasHubPage /></L> },
      { path: "/tecnologias/:slug", element: <L><TecnologiaPage /></L> }, // bespoke ficha software (Oracle)

      // Cases
      { path: "/casos-de-exito", element: <L><CasosHubPage /></L> },
      { path: "/casos-de-exito/:slug", element: <L><CasoDetallePage /></L> },

      // 404
      { path: "*", element: <L><NotFoundPage /></L> },

      // ===== LEGACY REDIRECTS =====

      // --- Oracle legacy slugs (from deprecated SolucionDetalle component) ---
      // C5 update: ahora redirigen a /tecnologias/:slug (opción B del roadmap del UX package).
      // Cada producto Oracle conserva su SEO long-tail propio en su ficha técnica.
      { path: "/Soluciones_Novasys/oracle-business-intelligence", element: <Navigate to="/tecnologias/oracle-business-intelligence" replace /> },
      { path: "/Soluciones_Novasys/oracle-paas", element: <Navigate to="/tecnologias/oracle-paas" replace /> },
      { path: "/Soluciones_Novasys/oracle-bluekai", element: <Navigate to="/tecnologias/oracle-bluekai" replace /> },
      { path: "/Soluciones_Novasys/oracle-eloqua", element: <Navigate to="/tecnologias/oracle-eloqua" replace /> },
      { path: "/Soluciones_Novasys/oracle-responsys", element: <Navigate to="/tecnologias/oracle-responsys" replace /> },
      { path: "/Soluciones_Novasys/oracle-service-cloud", element: <Navigate to="/tecnologias/oracle-service-cloud" replace /> },
      { path: "/Soluciones_Novasys/oracle-sales-cloud", element: <Navigate to="/tecnologias/oracle-sales-cloud" replace /> },
      { path: "/Soluciones_Novasys/oracle-siebel", element: <Navigate to="/tecnologias/oracle-siebel" replace /> },
      { path: "/Soluciones_Novasys/oracle-cpq", element: <Navigate to="/tecnologias/oracle-cpq" replace /> },
      // Singular lowercase variant (from handoff CONSOLIDACION.md — may exist in old backlinks)
      { path: "/solucion/oracle-business-intelligence", element: <Navigate to="/tecnologias/oracle-business-intelligence" replace /> },
      { path: "/solucion/oracle-paas", element: <Navigate to="/tecnologias/oracle-paas" replace /> },
      { path: "/solucion/oracle-bluekai", element: <Navigate to="/tecnologias/oracle-bluekai" replace /> },
      { path: "/solucion/oracle-eloqua", element: <Navigate to="/tecnologias/oracle-eloqua" replace /> },
      { path: "/solucion/oracle-responsys", element: <Navigate to="/tecnologias/oracle-responsys" replace /> },
      { path: "/solucion/oracle-service-cloud", element: <Navigate to="/tecnologias/oracle-service-cloud" replace /> },
      { path: "/solucion/oracle-sales-cloud", element: <Navigate to="/tecnologias/oracle-sales-cloud" replace /> },
      { path: "/solucion/oracle-siebel", element: <Navigate to="/tecnologias/oracle-siebel" replace /> },
      { path: "/solucion/oracle-cpq", element: <Navigate to="/tecnologias/oracle-cpq" replace /> },

      { path: "/Soluciones_Novasys", element: <Navigate to="/soluciones" replace /> },
      { path: "/Soluciones_Novasys/:slug", element: <Navigate to="/soluciones/:slug" replace /> },
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
