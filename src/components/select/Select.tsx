import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import useCurrentTab from "@/hooks/useCurrentTab";
import { tabs as items } from "@/router";
import "./Select.scss";

const Select = () => {
  const containerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const selectedId = useCurrentTab()?.id ?? 0;
  const measure = () => {
    const el = itemRefs.current[selectedId]; const root = containerRef.current;
    if (!el || !root) return;
    const elRect = el.getBoundingClientRect(); const rootRect = root.getBoundingClientRect();
    setPill({ left: elRect.left - rootRect.left, width: elRect.width });
  };
  useEffect(() => { requestAnimationFrame(measure); }, [selectedId]);
  useEffect(() => { const onResize = () => requestAnimationFrame(measure); window.addEventListener("resize", onResize); return () => window.removeEventListener("resize", onResize); }, []);
  useEffect(() => {
    const root = containerRef.current; const el = itemRefs.current[selectedId]; if (!root || !el) return;
    const observer = new ResizeObserver(() => requestAnimationFrame(measure)); observer.observe(root); observer.observe(el);
    document.fonts?.ready.then(() => requestAnimationFrame(measure)); return () => observer.disconnect();
  }, [selectedId]);

  return (
    <nav aria-label="Catégories du portfolio" className="select-tabs" ref={containerRef} tabIndex={0} onFocus={measure}>
      <div className="select-tabs__pill" aria-hidden style={{ "--pill-left": `${pill.left}px`, "--pill-width": `${pill.width}px` } as CSSProperties} />
      {items.map(({ label, icon, id, path }) => <Link to={path} className={id === selectedId ? "is-active" : ""} key={label} ref={(el) => (itemRefs.current[id] = el)}>{icon}<span>{label}</span></Link>)}
    </nav>
  );
};

export default Select;
