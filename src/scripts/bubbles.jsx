// BubbleAnimation.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Bubble = ({ delay }) => {
  return (
    <motion.div
      className="absolute w-6 h-6 bg-blue-400 rounded-full opacity-75"
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: "50vh", opacity: 1 }}
      transition={{ duration: 2, delay, ease: "easeOut" }}
    />
  );
};

const BubbleAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const bubbles = Array.from({ length: 10 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {bubbles.map((_, i) => (
        <Bubble key={i} delay={i * 0.2} />
      ))}
    </div>
  );
};

export default BubbleAnimation;
