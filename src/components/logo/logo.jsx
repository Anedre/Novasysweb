import React from "react";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="spinner-container">
    <svg className="spinner" viewBox="0 0 100 100">
      <circle
        className="spinner-arc"
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#eb2026"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  </div>
  );
};

export default Logo;
