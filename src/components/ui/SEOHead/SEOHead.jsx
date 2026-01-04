// ============================================
// SEOHead - Meta tags dinámicos para SEO
// Fase 5 del Plan de Modernización - SEO
// ============================================

import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * Configuración SEO base del sitio
 */
const DEFAULT_SEO = {
  siteName: "Novasys",
  siteUrl: "https://novasys.com.pe",
  defaultTitle: "Novasys | Transformación Digital & Soluciones Empresariales",
  defaultDescription: "Líderes en transformación digital en Perú. Soluciones en CRM, ERP, Contact Center, Business Intelligence y servicios cloud AWS. +20 años de experiencia.",
  defaultImage: "/images/og-image.jpg",
  twitterHandle: "@NovasysPerú",
  locale: "es_PE",
  themeColor: "#0066cc"
};

/**
 * SEOHead - Componente para meta tags dinámicos
 * 
 * @param {string} title - Título de la página
 * @param {string} description - Descripción meta
 * @param {string} image - Imagen para Open Graph
 * @param {string} url - URL canónica
 * @param {string} type - Tipo de contenido (website, article, product)
 * @param {object} article - Datos de artículo (author, publishedTime, etc)
 * @param {object} product - Datos de producto (price, availability, etc)
 * @param {array} keywords - Keywords adicionales
 * @param {boolean} noindex - Si true, no indexar página
 * @param {object} jsonLd - Datos estructurados JSON-LD
 */
function SEOHead({
  title,
  description,
  image,
  url,
  type = "website",
  article = null,
  product = null,
  keywords = [],
  noindex = false,
  nofollow = false,
  jsonLd = null,
  children
}) {
  // Construir título completo
  const fullTitle = title 
    ? `${title} | ${DEFAULT_SEO.siteName}`
    : DEFAULT_SEO.defaultTitle;

  // Descripción
  const metaDescription = description || DEFAULT_SEO.defaultDescription;

  // Imagen completa
  const metaImage = image 
    ? (image.startsWith("http") ? image : `${DEFAULT_SEO.siteUrl}${image}`)
    : `${DEFAULT_SEO.siteUrl}${DEFAULT_SEO.defaultImage}`;

  // URL canónica
  const canonicalUrl = url 
    ? (url.startsWith("http") ? url : `${DEFAULT_SEO.siteUrl}${url}`)
    : null;

  // Keywords base + adicionales
  const baseKeywords = [
    "Novasys", "transformación digital", "Perú", "CRM", "ERP", 
    "Contact Center", "Amazon Connect", "Business Intelligence", "HP"
  ];
  const allKeywords = [...new Set([...baseKeywords, ...keywords])].join(", ");

  // Robots meta
  const robotsContent = [
    noindex ? "noindex" : "index",
    nofollow ? "nofollow" : "follow"
  ].join(", ");

  // JSON-LD por defecto (Organization)
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Novasys",
    "url": DEFAULT_SEO.siteUrl,
    "logo": `${DEFAULT_SEO.siteUrl}/images/logo.png`,
    "description": DEFAULT_SEO.defaultDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lima",
      "addressCountry": "PE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+51-1-213-0500",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/novasys",
      "https://www.facebook.com/novasys"
    ]
  };

  // JSON-LD para artículos
  const articleJsonLd = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": metaDescription,
    "image": metaImage,
    "author": {
      "@type": "Organization",
      "name": article.author || "Novasys"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Novasys",
      "logo": {
        "@type": "ImageObject",
        "url": `${DEFAULT_SEO.siteUrl}/images/logo.png`
      }
    },
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime
  } : null;

  // JSON-LD para productos/servicios
  const productJsonLd = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": metaDescription,
    "image": metaImage,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Novasys"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price || "0",
      "priceCurrency": product.currency || "PEN",
      "availability": product.availability || "https://schema.org/InStock"
    }
  } : null;

  // Seleccionar JSON-LD apropiado
  const structuredData = jsonLd || articleJsonLd || productJsonLd || defaultJsonLd;

  return (
    <Helmet>
      {/* Básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={allKeywords} />
      <meta name="robots" content={robotsContent} />
      <meta name="theme-color" content={DEFAULT_SEO.themeColor} />

      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={DEFAULT_SEO.locale} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Article specific OG */}
      {article && (
        <>
          <meta property="article:author" content={article.author || "Novasys"} />
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={DEFAULT_SEO.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Hijos adicionales */}
      {children}
    </Helmet>
  );
}

/**
 * BreadcrumbJsonLd - Datos estructurados para breadcrumbs
 */
export function BreadcrumbJsonLd({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") 
        ? item.url 
        : `${DEFAULT_SEO.siteUrl}${item.url}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}

/**
 * FAQJsonLd - Datos estructurados para FAQs
 */
export function FAQJsonLd({ faqs }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}

/**
 * LocalBusinessJsonLd - Datos para negocio local
 */
export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Novasys",
    "image": `${DEFAULT_SEO.siteUrl}/images/logo.png`,
    "url": DEFAULT_SEO.siteUrl,
    "telephone": "+51-1-213-0500",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Javier Prado Este",
      "addressLocality": "San Isidro",
      "addressRegion": "Lima",
      "postalCode": "15036",
      "addressCountry": "PE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -12.0892,
      "longitude": -77.0223
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}

export default SEOHead;
