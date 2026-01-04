// router.js
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout.jsx";
import Home from "./components/Home/Home.jsx";
import Eventos from "./components/Eventos/EventosNew.jsx";
import Nosotros from "./components/Nosotros/NosotrosRedesign.jsx";
import Soluciones from "./components/Soluciones/SolucionesNew.jsx";
import SolucionDetalle from "./components/Soluciones/Detalle/SolucionDetalleNew.jsx";
import Ventas from "./components/Soluciones/Ventas/VentasNew.jsx";
import Marketing from "./components/Soluciones/Marketing/MarketingNew.jsx";
import Business_Intelligence from "./components/Soluciones/Business_Intelligence/BusinessIntelligenceNew.jsx";
import ELO from "./components/Soluciones/ELO/EloNew.jsx";
import SolucionesHPmain from "./components/Soluciones-HP/SolucionesHPNew.jsx";
import SolucionesHP from "./components/Soluciones-HP/SolucionesHP/SolucionesHP.jsx";
import SolucionesHP_Enterprise from "./components/Soluciones-HP/SolucionesHP_Enterprise/SolucionesHP_Enterprise.jsx";
import AlmacenamientoHP from "./components/Soluciones-HP/Almacenamiento/AlmacenamientoHP.jsx";
import Casos_de_exito from "./components/Casos_de_exito/CasosExitoNew.jsx";
import EntelCase from "./components/Casos_de_exito/Casos/EntelCase.jsx";
import RenzoCase from "./components/Casos_de_exito/Casos/RenzoCase.jsx";
import PacificoCase from "./components/Casos_de_exito/Casos/PacificoCase.jsx";
import CentrumCase from "./components/Casos_de_exito/Casos/CentrumCase.jsx";
import AmericatelCase from "./components/Casos_de_exito/Casos/AmericatelCase.jsx";
import InterbankCase from "./components/Casos_de_exito/Casos/InterbankCase.jsx";
import AmazonMain from "./components/Soluciones-Amazon/AmazonMain.jsx";
import AmazonConnect from "./components/Soluciones-Amazon/Amazon-connect/AmazonConnect.jsx";
import AmazonDialer from "./components/Soluciones-Amazon/Connect-Dialer/ConnectDialer.jsx";
import CloudMigration from "./components/Soluciones-Amazon/Cloud-Migration/CloudMigration.jsx";
import Contacto from "./components/Contacto/ContactoNew.jsx";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Eventos", element: <Eventos /> },
      { path: "/Nosotros", element: <Nosotros /> },
      { path: "/Soluciones_Novasys", element: <Soluciones /> },
      { path: "/Soluciones_Novasys/:slug", element: <SolucionDetalle /> },
      { path: "/Ventas", element: <Ventas /> },
      { path: "/Marketing", element: <Marketing /> },
      { path: "/Business_Intelligence", element: <Business_Intelligence /> },
      { path: "/Elo", element: <ELO /> },
      { path: "/SolucionesHPmain", element: <SolucionesHPmain /> },
      { path: "/SolucionesHP", element: <SolucionesHP /> },
      { path: "/SolucionesHPEnterprise", element: <SolucionesHP_Enterprise /> },
      { path: "/AlmacenamientoHP", element: <AlmacenamientoHP /> },
      { path: "/Amazon_Web_Services", element: <AmazonMain /> },
      { path: "/Amazon_Web_Services/Amazon_Connect", element: <AmazonConnect /> },
      { path: "/Amazon_Web_Services/Connect_Dialer", element: <AmazonDialer /> },
      { path: "/Amazon_Web_Services/Cloud_Migration", element: <CloudMigration /> },
      { path: "/Casos_de_exito", element: <Casos_de_exito /> },
      { path: "/Entel", element: <EntelCase /> },
      { path: "/Renzo", element: <RenzoCase /> },
      { path: "/casos/pacifico", element: <PacificoCase /> },
      { path: "/casos/centrum", element: <CentrumCase /> },
      { path: "/casos/americatel", element: <AmericatelCase /> },
      { path: "/casos/interbank", element: <InterbankCase /> },
      { path: "/Contacto", element: <Contacto /> },
    ],
  },
]);


