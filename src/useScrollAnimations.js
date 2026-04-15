import { useEffect } from "react";

export default function useScrollAnimations() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const navbar = document.querySelector(".navbar");
    const backToTop = document.getElementById("backToTop");

    const handleScroll = () => {
      const triggerBottom = window.innerHeight * 0.85;

      reveals.forEach((el) => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) el.classList.add("active");
      });

      if (window.scrollY > 60) navbar?.classList.add("scrolled");
      else navbar?.classList.remove("scrolled");

      if (window.scrollY > 400) backToTop?.classList.add("show");
      else backToTop?.classList.remove("show");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
