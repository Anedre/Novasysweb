// Canonical.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Canonical = () => {
  const location = useLocation();

  useEffect(() => {
    const canonicalLink = document.querySelector("link[rel='canonical']");

    const fullUrl = `https://www.novasys.com.pe${location.pathname}`;

    if (canonicalLink) {
      canonicalLink.setAttribute("href", fullUrl);
    } else {
      const newLink = document.createElement("link");
      newLink.setAttribute("rel", "canonical");
      newLink.setAttribute("href", fullUrl);
      document.head.appendChild(newLink);
    }
  }, [location]);

  return null;
};

export default Canonical;
