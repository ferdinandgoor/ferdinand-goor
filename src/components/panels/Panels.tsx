"use client";

import { ReactNode, useRef } from "react";

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
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        transition: "height 250ms ease",
      }}
    >
      {items.map((item, index) => {
        if (index !== activeIndex) return null;
        return (
          <div
            key={item.id}
            ref={(el) => (panelRefs.current[index] = el)}
            style={{
              width: "100%",
            }}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};

export default Panels;
