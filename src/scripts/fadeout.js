export function addfadeout() {
    const paragraphs = document.querySelectorAll(".section__paragraph");
  
    function isInView(element) {
      const rect = element.getBoundingClientRect();
      return rect.bottom >= 0 && rect.top <= (window.innerHeight - 150 || document.documentElement.clientHeight - 150);
    }
  
    function handleScroll() {
      paragraphs.forEach((paragraph) => {
        if (isInView(paragraph)) {
          paragraph.classList.add("section__paragraph--visible");
        }
      });
    }
  
    document.addEventListener("scroll", handleScroll);
  
    // Retornamos una función para remover el event listener cuando ya no sea necesario
    return () => document.removeEventListener("scroll", handleScroll);
  }
  