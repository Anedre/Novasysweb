// animation.jsx
import { useEffect } from 'react';

const animation = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in, .slide-up, .zoom-in");
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
};

export default animation;
