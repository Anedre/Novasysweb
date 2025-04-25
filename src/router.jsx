// router.js
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout.jsx"; // Componente que contiene Header, Footer y el Outlet para las rutas hijas
import Home from "./components/Home/Home.jsx";
import Eventos from "./components/Eventos/Eventos.jsx";
import Nosotros from "./components/Nosotros/Nosotros.jsx";
import Soluciones from "./components/Soluciones/Soluciones.jsx";
import Ventas from "./components/Soluciones/Ventas/Ventas.jsx";
import Marketing from "./components/Soluciones/Marketing/Marketing.jsx";
import Business_Intelligence from "./components/Soluciones/Business_Intelligence/Business_Intelligence.jsx";
import ELO from "./components/Soluciones/ELO/ELO.jsx";
import SolucionesHPmain from "./components/Soluciones-HP/SolucionesHPmain.jsx";
import SolucionesHP from "./components/Soluciones-HP/SolucionesHP/SolucionesHP.jsx";
import SolucionesHP_Enterprise from "./components/Soluciones-HP/SolucionesHP_Enterprise/SolucionesHP_Enterprise.jsx";
import Casos_de_exito from "./components/Casos_de_exito/Casos_de_exito.jsx";
import Entel from "./components/Casos_de_exito/Casos/Entel.jsx";
import Renzo from "./components/Casos_de_exito/Casos/Renzo.jsx";
import SolucionDetalle from "./components/Soluciones/Detalle/SolucionDetalle.jsx"; // al inicio
import AmazonMain from "./components/Soluciones-Amazon/AmazonMain.jsx"; // Ajusta la ruta según tu estructura real
import AmazonConnect from "./components/Soluciones-Amazon/Amazon-connect/AmazonConnect.jsx";
import AmazonDialer from "./components/Soluciones-Amazon/Connect-Dialer/ConnectDialer.jsx";


import Contacto from "./components/Contacto/Contacto.jsx";

export const router = createBrowserRouter([
  {
    element: <AppLayout />, // Este componente debe incluir el Header, Footer y <Outlet />
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
      {path: "/Soluciones_Amazon", element: <AmazonMain />}, // Nueva ruta para Amazon
      {path: "/Soluciones_AmazonConnect", element: <AmazonConnect />}, // Nueva ruta para Amazon Connect
      {path: "/Soluciones_AmazonDialer", element: <AmazonDialer />}, // Nueva ruta para Connect Dialer
      { path: "/Casos_de_exito", element: <Casos_de_exito /> },
      { path: "/Entel", element: <Entel />},
      {path: "/Renzo", element: <Renzo />},
      { path: "/Contacto", element: <Contacto /> },
    ],
  },
]);


