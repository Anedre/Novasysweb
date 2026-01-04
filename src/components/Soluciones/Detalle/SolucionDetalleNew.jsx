// SolucionDetalleNew.jsx
// Página de detalle de solución - Diseño moderno modular
// Rediseño completo con layout profesional tipo SaaS

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNightMode } from "../../../hooks/useNightMode";
import FAQSection from "./FAQSection";
import solucionesFAQs from "./solucionesFAQs";
import "./SolucionDetalleNew.css";

// ==========================================
// IMÁGENES
// ==========================================
import Obusiness from "../../../img/Obusiness.png";
import Ocloud from "../../../img/Ocloud.png";
import Bluekai from "../../../img/Bluekai_logo_color.png";
import Eloqua from "../../../img/Eloqua.png";
import Oresponsys from "../../../img/Oresponsys.png";
import Oservicecloud from "../../../img/oservicecloud.png";
import OSales from "../../../img/OSales.png";
import Osiebel from "../../../img/Osiebel.png";
import Oconfigure from "../../../img/Oconfigure.png";

import ObusinessN from "../../../img/Nueva carpeta/ObusinessD.png";
import OcloudN from "../../../img/Nueva carpeta/OcloudD.png";
import BluekaiN from "../../../img/Nueva carpeta/1x/bluekainoche.png";
import OresponsysN from "../../../img/Nueva carpeta/OresponsysD.png";
import OservicecloudN from "../../../img/Nueva carpeta/oservicecloudD.png";
import OSalesN from "../../../img/Nueva carpeta/OSalesD.png";
import OsiebelN from "../../../img/Nueva carpeta/OsiebelD.png";
import OconfigureN from "../../../img/Nueva carpeta/OconfigureD.png";

import BIImage from "../../../img/NexInfo-Oracle-Buissness-Inteligence-1024x1024.png";
import PaasImage from "../../../img/oracle-servicio-cloud-Photoroom.png";
import OBImage from "../../../img/bluekai_114140-Photoroom.png";
import OEImage from "../../../img/clipart2153512.png";
import ORImage from "../../../img/ORACLERESPONSYSPNG.png";
import OSCImage from "../../../img/ORACLESCpng.png";
import OSAImage from "../../../img/oracle-sales-cloud-Photoroom.png";
import OSBImage from "../../../img/OSEIpng.png";
import OEQCImage from "../../../img/OEQCpng.png";

// ==========================================
// DATOS DE SOLUCIONES
// ==========================================
const soluciones = [
  {
    slug: "oracle-business-intelligence",
    title: "Oracle Business Intelligence",
    shortTitle: "Oracle BI",
    category: "Business Intelligence",
    categoryIcon: "📊",
    categoryPath: "/Business_Intelligence",
    tagline: "Transforma datos en decisiones estratégicas",
    image: Obusiness,
    imageNight: ObusinessN,
    imageExtra: BIImage,
    // Layout y animaciones únicas
    layout: "centered", // Hero centrado con imagen flotante
    animation: "float", // Animación principal
    // Colores basados en el logo Oracle BI (azul/cyan analítico)
    colors: {
      primary: "#0077c8",
      primaryLight: "#00a3e0",
      secondary: "#00b4d8",
      gradient: "linear-gradient(135deg, #0077c8 0%, #00a3e0 50%, #00b4d8 100%)",
      gradientDark: "linear-gradient(135deg, #003d66 0%, #005580 50%, #006699 100%)",
      glow: "rgba(0, 119, 200, 0.3)"
    },
    description: "Plataforma analítica avanzada que transforma grandes volúmenes de datos en información estratégica y visualizaciones impactantes.",
    longDescription: "Oracle Business Intelligence es una suite completa de herramientas de análisis que permite a las organizaciones obtener insights accionables de sus datos. Con capacidades de reporting, dashboards interactivos, análisis ad-hoc y visualización avanzada, Oracle BI empodera a los usuarios de negocio para tomar decisiones informadas basadas en datos en tiempo real.",
    features: [
      { icon: "📊", title: "Dashboards Interactivos", desc: "Cuadros de mando en tiempo real con drill-down" },
      { icon: "📈", title: "Análisis Predictivo", desc: "Machine learning integrado para pronósticos" },
      { icon: "🔗", title: "Multi-fuente", desc: "Conecta cualquier base de datos o API" },
      { icon: "📱", title: "Mobile Ready", desc: "Accede desde cualquier dispositivo" }
    ],
    stats: [
      { value: "10x", label: "Más rápido en reportes" },
      { value: "360°", label: "Visión del negocio" },
      { value: "99.9%", label: "Uptime garantizado" }
    ],
    useCases: [
      "Análisis financiero en tiempo real",
      "Seguimiento de KPIs operativos",
      "Reportes ejecutivos automatizados",
      "Detección de anomalías y fraude"
    ],
    benefits: [
      { title: "Toma de decisiones más rápida", desc: "Reduce el tiempo de análisis de días a minutos con dashboards en tiempo real." },
      { title: "Visibilidad total del negocio", desc: "Consolida datos de múltiples fuentes en una única vista unificada." },
      { title: "Democratización del análisis", desc: "Permite que usuarios no técnicos creen sus propios reportes." },
      { title: "Reducción de costos de TI", desc: "Menos dependencia del equipo técnico para generar informes." }
    ],
    howItWorks: [
      { step: "01", title: "Conexión de Datos", desc: "Conectamos tus bases de datos, ERPs, CRMs y otras fuentes de información." },
      { step: "02", title: "Modelado Semántico", desc: "Creamos un modelo de datos empresarial que entiende tu negocio." },
      { step: "03", title: "Diseño de Dashboards", desc: "Construimos visualizaciones interactivas adaptadas a cada rol." },
      { step: "04", title: "Despliegue y Capacitación", desc: "Implementamos la solución y entrenamos a tu equipo." }
    ],
    integrations: ["SAP", "Salesforce", "Oracle ERP", "Microsoft SQL", "PostgreSQL", "REST APIs"],
    videoUrl: "https://www.youtube.com/embed/js1bzfXl5lc?autoplay=1&controls=0&rel=0&mute=1",
    related: ["oracle-paas", "oracle-cpq", "oracle-bluekai", "oracle-eloqua"]
  },
  {
    slug: "oracle-paas",
    title: "Oracle PaaS",
    shortTitle: "Oracle PaaS",
    category: "Marketing",
    categoryIcon: "☁️",
    categoryPath: "/Marketing",
    tagline: "Infraestructura cloud empresarial",
    image: Ocloud,
    imageNight: OcloudN,
    imageExtra: PaasImage,
    // Layout y animaciones únicas
    layout: "split-right", // Hero con imagen a la derecha grande
    animation: "scale", // Animación de escala
    // Colores basados en Oracle Cloud (rojo Oracle corporativo)
    colors: {
      primary: "#c74634",
      primaryLight: "#e85a48",
      secondary: "#ff6b5b",
      gradient: "linear-gradient(135deg, #c74634 0%, #e85a48 50%, #ff6b5b 100%)",
      gradientDark: "linear-gradient(135deg, #7a2a1f 0%, #992f22 50%, #b33d2d 100%)",
      glow: "rgba(199, 70, 52, 0.3)"
    },
    description: "Suite completa de servicios cloud para desarrollar, ejecutar e integrar aplicaciones empresariales con máxima escalabilidad.",
    longDescription: "Oracle Platform as a Service (PaaS) ofrece una plataforma cloud completa para desarrollar, integrar, proteger y gestionar aplicaciones empresariales. Con servicios que abarcan desde bases de datos hasta inteligencia artificial, Oracle PaaS permite a las organizaciones modernizar sus aplicaciones y acelerar la innovación sin preocuparse por la infraestructura.",
    features: [
      { icon: "⚙️", title: "Dev Rápido", desc: "Entornos listos en minutos" },
      { icon: "🚀", title: "Auto-scaling", desc: "Escala automáticamente según demanda" },
      { icon: "🧠", title: "AI/ML Ready", desc: "Servicios de IA integrados" },
      { icon: "🔐", title: "Seguridad", desc: "Compliance y cifrado enterprise" }
    ],
    stats: [
      { value: "50%", label: "Menos tiempo desarrollo" },
      { value: "∞", label: "Escalabilidad" },
      { value: "24/7", label: "Soporte técnico" }
    ],
    useCases: [
      "Desarrollo de aplicaciones cloud-native",
      "Migración de sistemas legacy",
      "Integración de microservicios",
      "APIs y gestión de datos"
    ],
    benefits: [
      { title: "Acelera el tiempo al mercado", desc: "Desarrolla y despliega aplicaciones hasta 10x más rápido." },
      { title: "Reduce costos operativos", desc: "Paga solo por lo que usas con modelo de consumo flexible." },
      { title: "Seguridad de nivel enterprise", desc: "Cumple con estándares SOC 2, HIPAA, PCI-DSS y más." },
      { title: "Innovación continua", desc: "Accede a las últimas tecnologías sin gestionar infraestructura." }
    ],
    howItWorks: [
      { step: "01", title: "Evaluación", desc: "Analizamos tu infraestructura actual y definimos la estrategia cloud." },
      { step: "02", title: "Arquitectura", desc: "Diseñamos la arquitectura óptima para tus aplicaciones." },
      { step: "03", title: "Migración", desc: "Migramos tus aplicaciones con mínimo tiempo de inactividad." },
      { step: "04", title: "Optimización", desc: "Monitoreamos y optimizamos continuamente el rendimiento." }
    ],
    integrations: ["Kubernetes", "Docker", "Jenkins", "GitHub", "Terraform", "Oracle Autonomous DB"],
    videoUrl: "https://www.youtube.com/embed/Gcw-8YmkKos?autoplay=1&controls=0&rel=0&mute=1",
    related: ["oracle-business-intelligence", "oracle-bluekai", "oracle-cpq", "oracle-siebel"]
  },
  {
    slug: "oracle-bluekai",
    title: "Oracle BlueKai",
    shortTitle: "BlueKai DMP",
    category: "Marketing",
    categoryIcon: "🎯",
    categoryPath: "/Marketing",
    tagline: "Gestión de datos de audiencia",
    image: Bluekai,
    imageNight: BluekaiN,
    imageExtra: OBImage,
    // Layout y animaciones únicas
    layout: "diagonal", // Hero con división diagonal
    animation: "pulse", // Animación de pulso
    // Colores basados en BlueKai (azul vibrante/eléctrico)
    colors: {
      primary: "#1e88e5",
      primaryLight: "#42a5f5",
      secondary: "#64b5f6",
      gradient: "linear-gradient(135deg, #1565c0 0%, #1e88e5 50%, #42a5f5 100%)",
      gradientDark: "linear-gradient(135deg, #0d3c61 0%, #0d47a1 50%, #1565c0 100%)",
      glow: "rgba(30, 136, 229, 0.3)"
    },
    description: "Plataforma DMP que centraliza y activa datos de audiencia para campañas digitales altamente personalizadas.",
    longDescription: "Oracle BlueKai es la plataforma de gestión de datos (DMP) líder del mercado que permite a los marketers recopilar, organizar y activar datos de audiencia de primera, segunda y tercera parte. Con BlueKai, puedes crear segmentos de audiencia precisos y activarlos en tiempo real a través de cualquier canal digital.",
    features: [
      { icon: "🎯", title: "Segmentación", desc: "Audiencias precisas por comportamiento" },
      { icon: "📡", title: "Data Activation", desc: "Activa en cualquier canal digital" },
      { icon: "🔄", title: "Real-time", desc: "Datos actualizados al instante" },
      { icon: "🧩", title: "Integración", desc: "Compatible con todo el stack martech" }
    ],
    stats: [
      { value: "3B+", label: "Perfiles de usuario" },
      { value: "200+", label: "Integraciones" },
      { value: "40%", label: "Mejor ROAS" }
    ],
    useCases: [
      "Personalización de contenido web",
      "Retargeting inteligente",
      "Lookalike audiences",
      "Cross-device tracking"
    ],
    benefits: [
      { title: "Conoce mejor a tu audiencia", desc: "Unifica datos de múltiples fuentes para una vista 360° del cliente." },
      { title: "Mejora el ROI de campañas", desc: "Dirige tu inversión solo a las audiencias más relevantes." },
      { title: "Personalización a escala", desc: "Entrega experiencias personalizadas a millones de usuarios." },
      { title: "Cumplimiento de privacidad", desc: "Gestiona el consentimiento y cumple con GDPR y CCPA." }
    ],
    howItWorks: [
      { step: "01", title: "Recolección", desc: "Implementamos tags para capturar datos de comportamiento." },
      { step: "02", title: "Enriquecimiento", desc: "Enriquecemos tus datos con fuentes de terceros." },
      { step: "03", title: "Segmentación", desc: "Creamos audiencias basadas en comportamiento e intereses." },
      { step: "04", title: "Activación", desc: "Sincronizamos audiencias con tus plataformas de media." }
    ],
    integrations: ["Google Ads", "Facebook", "The Trade Desk", "Adobe", "Salesforce", "Oracle Eloqua"],
    videoUrl: "https://www.youtube.com/embed/pDhFrewNup0?autoplay=1&controls=0&rel=0&mute=1",
    related: ["oracle-eloqua", "oracle-paas", "oracle-cpq", "oracle-responsys"]
  },
  {
    slug: "oracle-eloqua",
    title: "Oracle Eloqua",
    shortTitle: "Eloqua",
    category: "Marketing",
    categoryIcon: "🤖",
    categoryPath: "/Marketing",
    tagline: "Automatización de marketing B2B",
    image: Eloqua,
    imageNight: Eloqua,
    imageExtra: OEImage,
    // Layout y animaciones únicas
    layout: "split-left", // Hero con imagen a la izquierda
    animation: "rotate", // Animación de rotación suave
    // Colores basados en Eloqua (verde esmeralda marketing)
    colors: {
      primary: "#00897b",
      primaryLight: "#26a69a",
      secondary: "#4db6ac",
      gradient: "linear-gradient(135deg, #00695c 0%, #00897b 50%, #26a69a 100%)",
      gradientDark: "linear-gradient(135deg, #003d33 0%, #004d40 50%, #00695c 100%)",
      glow: "rgba(0, 137, 123, 0.3)"
    },
    description: "Solución líder de automatización B2B para orquestar campañas sofisticadas y nutrir leads en entornos empresariales.",
    longDescription: "Oracle Eloqua es la plataforma de automatización de marketing más potente para empresas B2B. Permite crear campañas multicanal sofisticadas, nurturing de leads automatizado, lead scoring avanzado y atribución de ingresos. Eloqua se integra nativamente con CRMs y proporciona las herramientas necesarias para alinear marketing y ventas.",
    features: [
      { icon: "🤖", title: "Automation", desc: "Flujos de nurturing inteligentes" },
      { icon: "📧", title: "Email Pro", desc: "Templates y A/B testing avanzado" },
      { icon: "📊", title: "Lead Scoring", desc: "Califica leads automáticamente" },
      { icon: "🔗", title: "CRM Sync", desc: "Integración nativa con Salesforce/Oracle" }
    ],
    stats: [
      { value: "85%", label: "Más leads calificados" },
      { value: "3x", label: "Mayor conversión" },
      { value: "60%", label: "Menos tiempo manual" }
    ],
    useCases: [
      "Campañas de nurturing multicanal",
      "Account-based marketing",
      "Webinars y eventos",
      "Onboarding de clientes"
    ],
    benefits: [
      { title: "Leads más calificados", desc: "Entrega a ventas solo los leads listos para comprar." },
      { title: "Campañas personalizadas", desc: "Crea journeys únicos basados en comportamiento." },
      { title: "Alineación marketing-ventas", desc: "Comparte datos en tiempo real con tu CRM." },
      { title: "Medición de impacto", desc: "Atribuye ingresos a cada acción de marketing." }
    ],
    howItWorks: [
      { step: "01", title: "Estrategia", desc: "Definimos tu buyer journey y criterios de calificación." },
      { step: "02", title: "Configuración", desc: "Implementamos Eloqua y lo conectamos con tu CRM." },
      { step: "03", title: "Campañas", desc: "Diseñamos y lanzamos tus primeras campañas automatizadas." },
      { step: "04", title: "Optimización", desc: "Analizamos resultados y mejoramos continuamente." }
    ],
    integrations: ["Salesforce", "Oracle Sales Cloud", "Microsoft Dynamics", "Zoom", "ON24", "LinkedIn"],
    videoUrl: "https://www.youtube.com/embed/g5eYRaa7V9g?autoplay=1&controls=0&rel=0&mute=1",
    related: ["oracle-bluekai", "oracle-responsys", "oracle-paas", "oracle-sales-cloud"]
  },
  {
    slug: "oracle-responsys",
    title: "Oracle Responsys",
    shortTitle: "Responsys",
    category: "Marketing",
    categoryIcon: "💬",
    categoryPath: "/Marketing",
    tagline: "Marketing omnicanal B2C",
    image: Oresponsys,
    imageNight: OresponsysN,
    imageExtra: ORImage,
    // Layout y animaciones únicas
    layout: "wave", // Hero con forma de ola
    animation: "bounce", // Animación de rebote
    // Colores basados en Responsys (púrpura/violeta omnicanal)
    colors: {
      primary: "#7b1fa2",
      primaryLight: "#9c27b0",
      secondary: "#ba68c8",
      gradient: "linear-gradient(135deg, #6a1b9a 0%, #7b1fa2 50%, #9c27b0 100%)",
      gradientDark: "linear-gradient(135deg, #3a0e5a 0%, #4a148c 50%, #6a1b9a 100%)",
      glow: "rgba(123, 31, 162, 0.3)"
    },
    description: "Plataforma de automatización omnicanal para empresas B2C que buscan experiencias personalizadas a gran escala.",
    longDescription: "Oracle Responsys es la solución de marketing omnicanal líder para empresas B2C. Permite orquestar experiencias personalizadas a través de email, SMS, push notifications, redes sociales y web. Con potentes capacidades de segmentación, personalización en tiempo real y analítica avanzada, Responsys ayuda a las marcas a construir relaciones duraderas con sus clientes.",
    features: [
      { icon: "💬", title: "Omnicanal", desc: "Email, SMS, push, social en uno" },
      { icon: "🎨", title: "Personalización", desc: "Contenido dinámico 1:1" },
      { icon: "⏱️", title: "Real-time", desc: "Triggers por comportamiento" },
      { icon: "📈", title: "Analytics", desc: "Attribution y reporting avanzado" }
    ],
    stats: [
      { value: "5x", label: "Mayor engagement" },
      { value: "1B+", label: "Mensajes/día" },
      { value: "25%", label: "Más revenue" }
    ],
    useCases: [
      "Campañas de ciclo de vida",
      "Recuperación de carritos",
      "Programas de fidelización",
      "Comunicación transaccional"
    ],
    benefits: [
      { title: "Experiencia consistente", desc: "El mismo mensaje, optimizado para cada canal." },
      { title: "Personalización 1:1", desc: "Contenido único para cada cliente en tiempo real." },
      { title: "Escalabilidad masiva", desc: "Envía millones de mensajes sin perder rendimiento." },
      { title: "Ingresos incrementales", desc: "Recupera ventas perdidas con triggers automáticos." }
    ],
    howItWorks: [
      { step: "01", title: "Integración", desc: "Conectamos Responsys con tu e-commerce y CRM." },
      { step: "02", title: "Segmentación", desc: "Creamos segmentos dinámicos basados en comportamiento." },
      { step: "03", title: "Automatización", desc: "Configuramos triggers y flujos de comunicación." },
      { step: "04", title: "Optimización", desc: "A/B testing continuo para maximizar resultados." }
    ],
    integrations: ["Shopify", "Magento", "Salesforce Commerce", "Oracle Commerce", "Adobe Analytics", "Google Analytics"],
    videoUrl: "https://www.youtube.com/embed/wxluQYbwTKs?autoplay=1&controls=0&rel=0&mute=1",
    related: ["oracle-eloqua", "oracle-bluekai", "oracle-siebel", "oracle-sales-cloud"]
  },
  {
    slug: "oracle-service-cloud",
    title: "Oracle Service Cloud",
    shortTitle: "Service Cloud",
    category: "Ventas",
    categoryIcon: "📞",
    categoryPath: "/Ventas",
    tagline: "Servicio al cliente inteligente",
    image: Oservicecloud,
    imageNight: OservicecloudN,
    imageExtra: OSCImage,
    // Layout y animaciones únicas
    layout: "cards", // Hero con tarjetas flotantes
    animation: "slide", // Animación de deslizamiento
    // Colores basados en Service Cloud (naranja/ámbar servicio)
    colors: {
      primary: "#f57c00",
      primaryLight: "#ff9800",
      secondary: "#ffb74d",
      gradient: "linear-gradient(135deg, #e65100 0%, #f57c00 50%, #ff9800 100%)",
      gradientDark: "linear-gradient(135deg, #7a2d00 0%, #993800 50%, #bf4300 100%)",
      glow: "rgba(245, 124, 0, 0.3)"
    },
    description: "Solución de atención al cliente para ofrecer soporte omnicanal, ágil y consistente con herramientas de automatización.",
    longDescription: "Oracle Service Cloud es una plataforma completa de servicio al cliente que unifica todos los canales de atención en una sola vista. Con chat en vivo, gestión de casos, base de conocimientos, chatbots con IA y analítica de servicio, Service Cloud permite a las organizaciones ofrecer experiencias de soporte excepcionales mientras reducen costos operativos.",
    features: [
      { icon: "📞", title: "Omnicanal", desc: "Chat, email, voz, redes sociales" },
      { icon: "🤖", title: "AI Assistant", desc: "Chatbots y respuestas sugeridas" },
      { icon: "📚", title: "Knowledge Base", desc: "Autoservicio inteligente" },
      { icon: "📋", title: "Case Management", desc: "Gestión eficiente de tickets" }
    ],
    stats: [
      { value: "40%", label: "Menos llamadas" },
      { value: "95%", label: "Satisfacción cliente" },
      { value: "2x", label: "Productividad agentes" }
    ],
    useCases: [
      "Contact center moderno",
      "Portal de autoservicio",
      "Field service management",
      "Social customer service"
    ],
    benefits: [
      { title: "Clientes más satisfechos", desc: "Resuelve problemas rápidamente en cualquier canal." },
      { title: "Agentes más productivos", desc: "IA sugiere respuestas y automatiza tareas repetitivas." },
      { title: "Costos reducidos", desc: "El autoservicio resuelve hasta el 40% de consultas." },
      { title: "Insights accionables", desc: "Identifica tendencias y mejora continuamente." }
    ],
    howItWorks: [
      { step: "01", title: "Diagnóstico", desc: "Evaluamos tu operación de servicio actual." },
      { step: "02", title: "Diseño", desc: "Creamos la arquitectura omnicanal óptima." },
      { step: "03", title: "Implementación", desc: "Configuramos y personalizamos Service Cloud." },
      { step: "04", title: "Go-Live", desc: "Lanzamos y monitoreamos los primeros resultados." }
    ],
    integrations: ["Oracle Sales Cloud", "Salesforce", "Zendesk", "Twilio", "WhatsApp Business", "Facebook Messenger"],
    videoUrl: "https://www.youtube.com/embed/TSLKuyyYOOc?autoplay=1&controls=0&rel=0&mute=1",
    related: ["oracle-sales-cloud", "oracle-siebel", "oracle-cpq", "oracle-business-intelligence"]
  },
  {
    slug: "oracle-sales-cloud",
    title: "Oracle Sales Cloud",
    shortTitle: "Sales Cloud",
    category: "Ventas",
    categoryIcon: "💼",
    categoryPath: "/Ventas",
    tagline: "CRM de ventas inteligente",
    image: OSales,
    imageNight: OSalesN,
    imageExtra: OSAImage,
    // Layout y animaciones únicas
    layout: "gradient", // Hero con gradiente animado
    animation: "glow", // Animación de brillo
    // Colores basados en Sales Cloud (dorado/oro ventas)
    colors: {
      primary: "#ffa000",
      primaryLight: "#ffc107",
      secondary: "#ffd54f",
      gradient: "linear-gradient(135deg, #ff8f00 0%, #ffa000 50%, #ffc107 100%)",
      gradientDark: "linear-gradient(135deg, #805000 0%, #996000 50%, #b37000 100%)",
      glow: "rgba(255, 160, 0, 0.3)"
    },
    description: "Plataforma de automatización de ventas que optimiza el proceso comercial desde el lead hasta el cierre.",
    longDescription: "Oracle Sales Cloud es un CRM de nueva generación que combina automatización de ventas con inteligencia artificial para ayudar a los equipos comerciales a vender más y mejor. Con gestión de pipeline visual, forecasting predictivo, mobile CRM y coaching de ventas, Sales Cloud proporciona las herramientas necesarias para acelerar el crecimiento de ingresos.",
    features: [
      { icon: "📈", title: "Pipeline Visual", desc: "Gestión drag & drop de deals" },
      { icon: "🧠", title: "AI Insights", desc: "Recomendaciones de next best action" },
      { icon: "📱", title: "Mobile CRM", desc: "App nativa iOS/Android" },
      { icon: "📊", title: "Forecasting", desc: "Pronósticos con machine learning" }
    ],
    stats: [
      { value: "30%", label: "Más deals cerrados" },
      { value: "50%", label: "Menos tiempo admin" },
      { value: "360°", label: "Vista del cliente" }
    ],
    useCases: [
      "Gestión de pipeline",
      "Territory management",
      "Partner relationship",
      "Sales performance"
    ],
    benefits: [
      { title: "Más tiempo vendiendo", desc: "Automatiza tareas administrativas y enfócate en cerrar." },
      { title: "Decisiones data-driven", desc: "IA identifica los deals con mayor probabilidad de cierre." },
      { title: "Colaboración efectiva", desc: "Comparte información del cliente en tiempo real." },
      { title: "Forecasting preciso", desc: "Predice ingresos con hasta 95% de precisión." }
    ],
    howItWorks: [
      { step: "01", title: "Discovery", desc: "Analizamos tu proceso de ventas actual." },
      { step: "02", title: "Configuración", desc: "Personalizamos Sales Cloud para tu negocio." },
      { step: "03", title: "Migración", desc: "Importamos tus datos y oportunidades." },
      { step: "04", title: "Adopción", desc: "Capacitamos a tu equipo comercial." }
    ],
    integrations: ["Oracle Marketing Cloud", "LinkedIn Sales Navigator", "DocuSign", "Zoom", "Microsoft 365", "Google Workspace"],
    videoUrl: "https://www.youtube.com/embed/d1RpXQVEgiU?autoplay=1&controls=0&rel=0&mute=1",
    related: ["oracle-service-cloud", "oracle-responsys", "oracle-cpq", "oracle-eloqua"]
  },
  {
    slug: "oracle-siebel",
    title: "Oracle Siebel",
    shortTitle: "Siebel CRM",
    category: "Ventas",
    categoryIcon: "🏢",
    categoryPath: "/Ventas",
    tagline: "CRM enterprise configurable",
    image: Osiebel,
    imageNight: OsiebelN,
    imageExtra: OSBImage,
    // Layout y animaciones únicas
    layout: "geometric", // Hero con formas geométricas
    animation: "morph", // Animación de morphing
    // Colores basados en Siebel (índigo enterprise)
    colors: {
      primary: "#3949ab",
      primaryLight: "#5c6bc0",
      secondary: "#7986cb",
      gradient: "linear-gradient(135deg, #283593 0%, #3949ab 50%, #5c6bc0 100%)",
      gradientDark: "linear-gradient(135deg, #1a1f5c 0%, #1a237e 50%, #283593 100%)",
      glow: "rgba(57, 73, 171, 0.3)"
    },
    description: "CRM empresarial altamente configurable para organizaciones con procesos complejos en industrias reguladas.",
    longDescription: "Oracle Siebel es el CRM on-premise más robusto y configurable del mercado, diseñado para organizaciones con procesos de negocio complejos y requisitos específicos de industria. Con más de 20 años de evolución, Siebel ofrece soluciones verticales para telecomunicaciones, servicios financieros, sector público, utilities y más, con capacidades de personalización prácticamente ilimitadas.",
    features: [
      { icon: "🔒", title: "Enterprise", desc: "Para procesos complejos" },
      { icon: "🏭", title: "Industry-specific", desc: "Soluciones por vertical" },
      { icon: "📡", title: "Multicanal", desc: "Web, mobile, call center" },
      { icon: "⚙️", title: "Configurable", desc: "Personalización sin código" }
    ],
    stats: [
      { value: "20+", label: "Años en el mercado" },
      { value: "4000+", label: "Clientes enterprise" },
      { value: "15", label: "Industrias cubiertas" }
    ],
    useCases: [
      "Telecomunicaciones",
      "Servicios financieros",
      "Sector público",
      "Utilities y energía"
    ],
    benefits: [
      { title: "Adaptado a tu industria", desc: "Soluciones pre-configuradas para tu vertical." },
      { title: "Control total", desc: "Personaliza cada aspecto sin depender del vendor." },
      { title: "Cumplimiento regulatorio", desc: "Funcionalidades para industrias altamente reguladas." },
      { title: "Protección de inversión", desc: "Moderniza sin reemplazar completamente." }
    ],
    howItWorks: [
      { step: "01", title: "Assessment", desc: "Evaluamos tu instalación actual de Siebel." },
      { step: "02", title: "Roadmap", desc: "Definimos la estrategia de modernización." },
      { step: "03", title: "Implementación", desc: "Ejecutamos mejoras y actualizaciones." },
      { step: "04", title: "Soporte", desc: "Mantenemos y evolucionamos tu sistema." }
    ],
    integrations: ["Oracle EBS", "SAP", "Salesforce", "Oracle Integration Cloud", "TIBCO", "MuleSoft"],
    videoUrl: "https://www.youtube.com/embed/VOMtk4Ppev0?autoplay=1&controls=0&rel=0&mute=1",
    related: ["oracle-responsys", "oracle-service-cloud", "oracle-bluekai", "oracle-paas"]
  },
  {
    slug: "oracle-cpq",
    title: "Oracle CPQ",
    shortTitle: "CPQ Cloud",
    category: "Ventas",
    categoryIcon: "🧩",
    categoryPath: "/Ventas",
    tagline: "Configure, Price, Quote",
    image: Oconfigure,
    imageNight: OconfigureN,
    imageExtra: OEQCImage,
    // Layout y animaciones únicas
    layout: "modular", // Hero con bloques modulares
    animation: "assemble", // Animación de ensamblaje
    // Colores basados en CPQ (teal/cyan configurador)
    colors: {
      primary: "#00838f",
      primaryLight: "#0097a7",
      secondary: "#00bcd4",
      gradient: "linear-gradient(135deg, #006064 0%, #00838f 50%, #0097a7 100%)",
      gradientDark: "linear-gradient(135deg, #003033 0%, #004d40 50%, #006064 100%)",
      glow: "rgba(0, 131, 143, 0.3)"
    },
    description: "Solución para automatizar configuración de productos, pricing y generación de cotizaciones en ventas complejas.",
    longDescription: "Oracle CPQ (Configure, Price, Quote) transforma el proceso de cotización de ventas complejas. Permite a los equipos comerciales configurar productos y servicios personalizados, aplicar precios dinámicos y generar propuestas profesionales en minutos en lugar de días. Con validación en tiempo real y workflows de aprobación, CPQ elimina errores y acelera el ciclo de ventas.",
    features: [
      { icon: "🧩", title: "Configurator", desc: "Productos complejos sin errores" },
      { icon: "💰", title: "Dynamic Pricing", desc: "Reglas de precios automatizadas" },
      { icon: "📄", title: "Quote Gen", desc: "Propuestas profesionales en minutos" },
      { icon: "✅", title: "Approvals", desc: "Workflows de aprobación" }
    ],
    stats: [
      { value: "75%", label: "Menos errores en quotes" },
      { value: "2x", label: "Más rápido el ciclo" },
      { value: "20%", label: "Mayor deal size" }
    ],
    useCases: [
      "Ventas de productos configurables",
      "Pricing por suscripción",
      "Contratos complejos",
      "Renovaciones automatizadas"
    ],
    benefits: [
      { title: "Cotizaciones sin errores", desc: "Validación automática elimina configuraciones inválidas." },
      { title: "Ciclo de ventas más corto", desc: "Genera cotizaciones profesionales en minutos." },
      { title: "Deals más grandes", desc: "Guided selling sugiere upsells y cross-sells." },
      { title: "Vendedores más productivos", desc: "Menos tiempo en tareas administrativas." }
    ],
    howItWorks: [
      { step: "01", title: "Catálogo", desc: "Modelamos tu catálogo de productos y servicios." },
      { step: "02", title: "Reglas", desc: "Configuramos reglas de pricing y validación." },
      { step: "03", title: "Templates", desc: "Diseñamos plantillas de propuestas." },
      { step: "04", title: "Integración", desc: "Conectamos con tu CRM y ERP." }
    ],
    integrations: ["Oracle Sales Cloud", "Salesforce", "Oracle E-Business Suite", "DocuSign", "SAP", "NetSuite"],
    videoUrl: "https://www.youtube.com/embed/NwpxBVMPqE4?autoplay=1&controls=0&rel=0&mute=1",
    related: ["oracle-sales-cloud", "oracle-paas", "oracle-business-intelligence", "oracle-bluekai"]
  }
];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
function SolucionDetalleNew() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNight = useNightMode();
  const [activeTab, setActiveTab] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const solucion = soluciones.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab(0);
  }, [slug]);

  if (!solucion) {
    return (
      <motion.div className="sd-not-found" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="sd-not-found-box">
          <span>🔍</span>
          <h2>Solución no encontrada</h2>
          <button onClick={() => navigate("/Soluciones_Novasys")} className="sd-btn">
            Ver soluciones
          </button>
        </div>
      </motion.div>
    );
  }

  const currentImage = isNight ? solucion.imageNight : solucion.image;

  // Colores dinámicos de la solución
  const colors = solucion.colors;
  const layout = solucion.layout || 'centered';
  const animationType = solucion.animation || 'float';

  // Configuraciones de animación por tipo
  const animationConfigs = {
    float: {
      visual: { y: [0, -15, 0] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      hover: { scale: 1.05, rotateY: 5 }
    },
    scale: {
      visual: { scale: [1, 1.03, 1] },
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      hover: { scale: 1.08, rotate: 2 }
    },
    pulse: {
      visual: { opacity: [1, 0.85, 1], scale: [1, 1.02, 1] },
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
      hover: { scale: 1.1, boxShadow: "0 25px 80px rgba(30,136,229,0.4)" }
    },
    rotate: {
      visual: { rotateZ: [-1, 1, -1] },
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      hover: { scale: 1.05, rotateZ: 3 }
    },
    bounce: {
      visual: { y: [0, -10, 0, -5, 0] },
      transition: { duration: 2, repeat: Infinity, ease: "easeOut" },
      hover: { y: -15, scale: 1.03 }
    },
    slide: {
      visual: { x: [-5, 5, -5] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      hover: { x: 10, scale: 1.02 }
    },
    glow: {
      visual: { filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"] },
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      hover: { scale: 1.05, filter: "brightness(1.2)" }
    },
    morph: {
      visual: { borderRadius: ["20px", "35px", "20px"] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      hover: { scale: 1.05, borderRadius: "50px" }
    },
    assemble: {
      visual: { rotateY: [-3, 3, -3], scale: [1, 1.01, 1] },
      transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
      hover: { scale: 1.08, rotateY: 5 }
    }
  };

  const currentAnim = animationConfigs[animationType] || animationConfigs.float;

  const dynamicStyles = {
    '--sd-brand-primary': colors.primary,
    '--sd-brand-primary-light': colors.primaryLight,
    '--sd-brand-secondary': colors.secondary,
    '--sd-brand-gradient': isNight ? colors.gradientDark : colors.gradient,
    '--sd-brand-glow': colors.glow,
    '--sd-layout': layout,
  };

  return (
    <>
      <Helmet>
        <title>{solucion.title} | Novasys Perú</title>
        <meta name="description" content={solucion.description} />
      </Helmet>

      <motion.div 
        className="sd-page" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        style={dynamicStyles}
      >
        
        {/* === HERO MODERNO CON LAYOUT DINÁMICO === */}
        <section className={`sd-hero sd-layout-${layout}`}>
          <div className="sd-hero-bg">
            <div className="sd-hero-gradient" />
            <div className="sd-hero-pattern" />
            {/* Elementos decorativos según layout */}
            {layout === 'diagonal' && <div className="sd-hero-diagonal-stripe" />}
            {layout === 'wave' && <div className="sd-hero-wave-bg" />}
            {layout === 'geometric' && (
              <>
                <div className="sd-geo-shape sd-geo-1" />
                <div className="sd-geo-shape sd-geo-2" />
                <div className="sd-geo-shape sd-geo-3" />
              </>
            )}
            {layout === 'gradient' && <div className="sd-hero-animated-gradient" />}
            {layout === 'modular' && (
              <div className="sd-modular-grid-bg">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="sd-modular-cell"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="sd-hero-inner">
            {/* Breadcrumb */}
            <motion.nav 
              className="sd-bread"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/Soluciones_Novasys">Soluciones</Link>
              <span>›</span>
              <Link to={solucion.categoryPath}>{solucion.category}</Link>
              <span>›</span>
              <span className="sd-bread-current">{solucion.shortTitle}</span>
            </motion.nav>

            <div className={`sd-hero-row sd-hero-row-${layout}`}>
              {/* Texto - posición varía según layout */}
              <motion.div 
                className="sd-hero-text"
                initial={{ opacity: 0, x: layout.includes('split-right') ? 50 : layout.includes('split-left') ? -50 : 0, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.span 
                  className="sd-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                >
                  {solucion.categoryIcon} {solucion.category}
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {solucion.title.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      style={{ display: 'inline-block', marginRight: '0.3em' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
                
                <motion.p 
                  className="sd-tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {solucion.tagline}
                </motion.p>
                
                <motion.p 
                  className="sd-desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {solucion.description}
                </motion.p>

                <motion.div 
                  className="sd-hero-btns"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/Contacto" className="sd-btn sd-btn-primary">
                      🚀 Solicitar Demo
                    </Link>
                  </motion.div>
                  <motion.button 
                    className="sd-btn sd-btn-ghost" 
                    onClick={() => setShowVideo(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ▶ Ver Video
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Visual - con animación dinámica */}
              <motion.div 
                className={`sd-hero-visual sd-visual-${layout}`}
                initial={{ opacity: 0, scale: 0.8, rotateY: layout === 'split-right' ? -20 : layout === 'split-left' ? 20 : 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                  ...currentAnim.visual 
                }}
                transition={{ 
                  opacity: { delay: 0.3, duration: 0.5 },
                  scale: { delay: 0.3, type: "spring" },
                  rotateY: { delay: 0.3, duration: 0.8 },
                  ...currentAnim.transition
                }}
                whileHover={currentAnim.hover}
              >
                <div className="sd-visual-card">
                  <img src={currentImage} alt={solucion.title} />
                  <div className="sd-visual-glow" />
                  
                  {/* Elementos decorativos flotantes según layout */}
                  {layout === 'cards' && (
                    <>
                      <motion.div 
                        className="sd-floating-card sd-fc-1"
                        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <span>📊</span>
                      </motion.div>
                      <motion.div 
                        className="sd-floating-card sd-fc-2"
                        animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
                        transition={{ duration: 5, repeat: Infinity }}
                      >
                        <span>⚡</span>
                      </motion.div>
                      <motion.div 
                        className="sd-floating-card sd-fc-3"
                        animate={{ y: [-5, 15, -5], x: [-5, 5, -5] }}
                        transition={{ duration: 3.5, repeat: Infinity }}
                      >
                        <span>🔗</span>
                      </motion.div>
                    </>
                  )}
                  
                  {layout === 'modular' && (
                    <motion.div 
                      className="sd-modular-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`sd-mod-block sd-mod-${i + 1}`}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 1 + i * 0.15, type: "spring" }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Stats Bar con animación stagger */}
            <motion.div 
              className="sd-stats-bar"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {solucion.stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="sd-stat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <motion.span 
                    className="sd-stat-val"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="sd-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* === TABS CONTENT === */}
        <section className="sd-tabs-section">
          <div className="sd-container">
            {/* Tab Navigation con animación */}
            <motion.div 
              className="sd-tabs-nav"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {['Features', 'Casos de Uso', 'Video Demo'].map((tab, i) => (
                <motion.button
                  key={i}
                  className={`sd-tab ${activeTab === i ? 'active' : ''}`}
                  onClick={() => setActiveTab(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {tab}
                </motion.button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div
                  key="features"
                  className="sd-tab-content"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="sd-features-grid">
                    {solucion.features.map((feat, i) => (
                      <motion.div
                        key={i}
                        className="sd-feature-card"
                        initial={{ opacity: 0, y: 30, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                        whileHover={{ 
                          y: -12, 
                          scale: 1.03,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                        }}
                        style={{ '--item-index': i }}
                      >
                        <motion.span 
                          className="sd-feature-icon"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                          {feat.icon}
                        </motion.span>
                        <h3>{feat.title}</h3>
                        <p>{feat.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div
                  key="usecases"
                  className="sd-tab-content"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="sd-usecases-layout">
                    <div className="sd-usecases-list">
                      {solucion.useCases.map((uc, i) => (
                        <motion.div
                          key={i}
                          className="sd-usecase"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.12, type: "spring" }}
                          whileHover={{ x: 10, backgroundColor: "rgba(var(--sd-brand-primary), 0.1)" }}
                        >
                          <motion.span 
                            className="sd-usecase-num"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.12 + 0.1, type: "spring" }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </motion.span>
                          <span className="sd-usecase-text">{uc}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div 
                      className="sd-usecases-img"
                      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <img src={solucion.imageExtra} alt="Use cases" />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div
                  key="video"
                  className="sd-tab-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="sd-video-box">
                    <iframe
                      src={solucion.videoUrl}
                      title={solucion.title}
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* === DESCRIPCIÓN EXTENDIDA CON ANIMACIONES === */}
        <section className="sd-extended-section">
          <div className="sd-container">
            <motion.div 
              className="sd-extended-content"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="sd-extended-text"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.span 
                  className="sd-section-badge"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  📖 Conoce más
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  ¿Qué es {solucion.title}?
                </motion.h2>
                <motion.p 
                  className="sd-extended-desc"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {solucion.longDescription}
                </motion.p>
                <div className="sd-extended-highlights">
                  {['Implementación rápida y guiada', 'Soporte técnico especializado', 'Escalable según tu crecimiento'].map((text, i) => (
                    <motion.div 
                      key={i}
                      className="sd-highlight-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <motion.span 
                        className="sd-highlight-icon"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      >
                        ✅
                      </motion.span>
                      <span>{text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                className="sd-extended-visual"
                initial={{ opacity: 0, x: 50, rotateY: -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <img src={solucion.imageExtra} alt={solucion.title} />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* === BENEFICIOS CON ANIMACIONES AVANZADAS === */}
        <section className="sd-benefits-section">
          <div className="sd-container">
            <motion.div 
              className="sd-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="sd-section-badge"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                💎 Beneficios
              </motion.span>
              <h2 className="sd-section-title">¿Por qué elegir {solucion.shortTitle}?</h2>
              <p className="sd-section-subtitle">Ventajas competitivas que transformarán tu negocio</p>
            </motion.div>
            <div className="sd-benefits-grid">
              {solucion.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  className="sd-benefit-card"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
                  }}
                  style={{ '--item-index': i }}
                >
                  <motion.div 
                    className="sd-benefit-number"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.2, type: "spring" }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </motion.div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                  <motion.div 
                    className="sd-benefit-line"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.3, duration: 0.5 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === CÓMO FUNCIONA CON TIMELINE ANIMADO === */}
        <section className="sd-howitworks-section">
          <div className="sd-container">
            <motion.div 
              className="sd-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="sd-section-badge"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                🔧 Proceso
              </motion.span>
              <h2 className="sd-section-title">¿Cómo implementamos {solucion.shortTitle}?</h2>
              <p className="sd-section-subtitle">Un proceso estructurado para garantizar el éxito de tu proyecto</p>
            </motion.div>
            <div className="sd-steps-timeline">
              {solucion.howItWorks.map((step, i) => (
                <motion.div
                  key={i}
                  className="sd-step-item"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className="sd-step-connector"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.3, duration: 0.4 }}
                  />
                  <motion.div 
                    className="sd-step-number"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, type: "spring", stiffness: 300 }}
                    whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                  >
                    {step.step}
                  </motion.div>
                  <motion.div 
                    className="sd-step-content"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.15 }}
                  >
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === INTEGRACIONES CON CLOUD ANIMADO === */}
        <section className="sd-integrations-section">
          <div className="sd-container">
            <motion.div 
              className="sd-section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="sd-section-badge"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring" }}
              >
                🔗 Ecosistema
              </motion.span>
              <h2 className="sd-section-title">Integraciones Disponibles</h2>
              <p className="sd-section-subtitle">{solucion.shortTitle} se conecta con las herramientas que ya usas</p>
            </motion.div>
            <motion.div 
              className="sd-integrations-cloud"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {solucion.integrations.map((integration, i) => (
                <motion.div
                  key={i}
                  className="sd-integration-badge"
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 300 }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -8,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="sd-integration-icon"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  >
                    🔌
                  </motion.span>
                  {integration}
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              className="sd-integrations-cta"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p>¿Necesitas una integración personalizada?</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/Contacto" className="sd-btn sd-btn-outline">
                  Contáctanos →
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* === ESTADÍSTICAS CON ANIMACIONES CONTADOR === */}
        <section className="sd-impact-section">
          <div className="sd-container">
            <motion.div 
              className="sd-impact-content"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="sd-impact-text"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.span 
                  className="sd-section-badge"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  📈 Impacto
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Resultados que hablan por sí solos
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Empresas líderes en Perú y Latinoamérica confían en {solucion.shortTitle} para transformar sus operaciones y alcanzar sus objetivos de negocio.
                </motion.p>
                <div className="sd-impact-stats">
                  {[
                    { value: "500+", label: "Proyectos exitosos" },
                    { value: "98%", label: "Clientes satisfechos" },
                    { value: "15+", label: "Años de experiencia" }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      className="sd-impact-stat"
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <motion.span 
                        className="sd-impact-value"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.15 }}
                      >
                        {stat.value}
                      </motion.span>
                      <span className="sd-impact-label">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                className="sd-impact-visual"
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.div 
                  className="sd-impact-card"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring" }}
                >
                  <div className="sd-impact-quote">
                    <motion.span 
                      className="sd-quote-icon"
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      "
                    </motion.span>
                    <p>La implementación de {solucion.shortTitle} nos permitió reducir tiempos operativos y mejorar significativamente nuestra toma de decisiones.</p>
                    <div className="sd-quote-author">
                      <div className="sd-author-avatar">👤</div>
                      <div className="sd-author-info">
                        <span className="sd-author-name">Director de TI</span>
                        <span className="sd-author-company">Empresa Fortune 500</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* === RELATED CON ANIMACIONES === */}
        <section className="sd-related-section">
          <div className="sd-container">
            <motion.h2 
              className="sd-section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              🔗 Soluciones Relacionadas
            </motion.h2>
            <div className="sd-related-grid">
              {solucion.related.map((relSlug, i) => {
                const rel = soluciones.find((s) => s.slug === relSlug);
                if (!rel) return null;
                const relImg = isNight ? rel.imageNight : rel.image;
                return (
                  <motion.div
                    key={relSlug}
                    className="sd-related-card"
                    onClick={() => navigate(`/Soluciones_Novasys/${relSlug}`)}
                    initial={{ opacity: 0, y: 30, rotateY: -10 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    whileHover={{ 
                      y: -12, 
                      scale: 1.05,
                      rotateY: 5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="sd-related-img"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={relImg} alt={rel.title} />
                    </motion.div>
                    <div className="sd-related-info">
                      <span>{rel.categoryIcon} {rel.category}</span>
                      <h4>{rel.shortTitle}</h4>
                    </div>
                    <motion.span 
                      className="sd-related-arrow"
                      initial={{ x: 0 }}
                      whileHover={{ x: 8 }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* === FAQ === */}
        {solucionesFAQs[solucion.slug] && (
          <FAQSection
            title="Preguntas Frecuentes"
            subtitle={`Sobre ${solucion.shortTitle}`}
            faqs={solucionesFAQs[solucion.slug]}
          />
        )}

        {/* === CTA CON ANIMACIONES ÉPICAS === */}
        <section className="sd-cta-section">
          <div className="sd-container">
            <motion.div 
              className="sd-cta-box"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                ¿Listo para {solucion.shortTitle}?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Nuestro equipo está listo para ayudarte
              </motion.p>
              <motion.div 
                className="sd-cta-btns"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.08, y: -3 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/Contacto" className="sd-btn sd-btn-primary sd-btn-lg">
                    📩 Contáctanos
                  </Link>
                </motion.div>
                <motion.a
                  href={`https://wa.me/51953730189?text=Hola, me interesa ${encodeURIComponent(solucion.title)}`}
                  className="sd-btn sd-btn-wa sd-btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    boxShadow: [
                      "0 4px 20px rgba(37, 211, 102, 0.3)",
                      "0 4px 40px rgba(37, 211, 102, 0.5)",
                      "0 4px 20px rgba(37, 211, 102, 0.3)"
                    ]
                  }}
                  transition={{ 
                    boxShadow: { duration: 2, repeat: Infinity }
                  }}
                >
                  💬 WhatsApp
                </motion.a>
              </motion.div>
              <motion.div 
                className="sd-cta-contact"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.span whileHover={{ scale: 1.05, x: 5 }}>
                  📧 contacto@novasysperu.com
                </motion.span>
                <motion.span whileHover={{ scale: 1.05, x: 5 }}>
                  📞 +51 1 643 3467
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.div>

      {/* Video Modal con animaciones mejoradas */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="sd-modal-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              className="sd-modal-box"
              initial={{ scale: 0.7, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                className="sd-modal-close" 
                onClick={() => setShowVideo(false)}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
              <iframe
                src={solucion.videoUrl.replace('mute=1', 'mute=0')}
                title={solucion.title}
                frameBorder="0"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SolucionDetalleNew;
