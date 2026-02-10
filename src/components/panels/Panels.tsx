import { ReactNode, useLayoutEffect, useRef, useState } from "react";

interface PanelsProps {
  items: {
    id: number;
    label: string;
    icon: ReactNode;
    content: ReactNode;
  }[];
  activeId: number;
}

const Panels = ({ items, activeId }: PanelsProps) => {
  const activeIndex = items.findIndex((it) => it.id === activeId);
  const panelRefs = useRef([]);
  const [h, setH] = useState(0);

  useLayoutEffect(() => {
    const el = panelRefs.current[activeIndex];
    if (!el) return;

    const measure = () => setH(el.offsetHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeIndex]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        height: h, // ✅ la page suit
        transition: "height 250ms ease",
      }}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => (panelRefs.current[index] = el)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateX(${(index - activeIndex) * 100}%)`,
            transition: "transform 250ms cubic-bezier(.2,.9,.2,1)",
            willChange: "transform",
          }}
        >{item.content}</div>
      ))}
    </div>
  );
};

export default Panels;
