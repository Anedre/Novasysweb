// ============================================
// AmazonMain - Página Principal AWS Modernizada
// Diseño: Cloud Experience AWS
// ============================================

import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import HeroAmazon from "./HeroAmazon";
import WhyAmazon from "./WhyAmazon";
import AmazonProducts from "./AmazonProducts";
import AWSCertifications from "./AWSCertifications";
import AWSCalculator from "./AWSCalculator";
import AmazonConnectDemo from "./AmazonConnectDemo";
import { useNightMode } from "../../hooks/useNightMode";
import "./AmazonMain.css";

function AmazonMain() {
  const isNight = useNightMode();

  return (
    <>
      <Helmet>
        <title>Amazon Web Services | Soluciones Cloud | Novasys Perú</title>
        <meta 
          name="description" 
          content="Soluciones empresariales en Amazon Web Services. Amazon Connect, Lambda, S3 y más. Partner AWS certificado en Perú."
        />
        <meta name="keywords" content="AWS, Amazon Web Services, Amazon Connect, cloud, Perú, contact center" />
      </Helmet>

      <motion.div 
        className="am-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <HeroAmazon />
        <WhyAmazon />
        <AmazonProducts />
        <AWSCertifications />
        <AWSCalculator />
        <AmazonConnectDemo />
      </motion.div>
    </>
  );
}

export default AmazonMain;
