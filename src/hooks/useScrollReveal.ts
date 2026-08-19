import { useEffect } from "react";

const useScrollReveal = (selector: string, refreshKey = "") => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    elements.forEach((element) => element.classList.add("ferd-reveal"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [selector, refreshKey]);
};

export default useScrollReveal;
