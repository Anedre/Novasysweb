import React from "react";
import HeroAmazon from "./HeroAmazon";
import WhyAmazon from "./WhyAmazon";
import AmazonProducts from "./AmazonProducts";

import "./AmazonMain.css";

function AmazonMain() {
  return (
    <div className="amazon-page">
      <HeroAmazon />
      <WhyAmazon />
      <AmazonProducts />
    </div>
  );
}

export default AmazonMain;
