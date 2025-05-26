// useNightMode.js
import { useEffect, useState } from "react";

export function useNightMode() {
  const [isNight, setIsNight] = useState(
    document.body.classList.contains("night")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsNight(document.body.classList.contains("night"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isNight;
}
