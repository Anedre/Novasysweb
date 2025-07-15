import { useEffect, useState } from "react";

export function useNightMode() {
  const getNight = () => {
    if (typeof window !== 'undefined') {
      const ls = localStorage.getItem('nightMode');
      if (ls !== null) return ls === "true";
      return document.body.classList.contains("night");
    }
    return false;
  };

  const [isNight, setIsNight] = useState(null); // Arranca como null

  useEffect(() => {
    setIsNight(getNight()); // Solo aquí seteas el valor real

    const observer = new MutationObserver(() => {
      setIsNight(document.body.classList.contains("night"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const onStorage = () => setIsNight(getNight());
    window.addEventListener('storage', onStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return isNight;
}
