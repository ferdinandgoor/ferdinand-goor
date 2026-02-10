"use client";

import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface SelectProps {
  items: {
    id: number;
    label: string;
    icon: ReactNode;
  }[];
  onChangePanel: (id: number) => void;
  selectedPanel: number;
}

const Select = ({ items, onChangePanel, selectedPanel }: SelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  const measure = () => {
    const el = itemRefs.current[selectedPanel];
    const root = containerRef.current;
    if (!el || !root) return;

    const elRect = el.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();

    setPill({
      left: elRect.left - rootRect.left,
      width: elRect.width,
    });
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPanel]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setActiveAndNotify = (id: number) => {
    onChangePanel?.(id);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveAndNotify(Math.min(selectedPanel + 1, items.length - 1));
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveAndNotify(Math.max(selectedPanel - 1, 0));
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      style={{
        position: "relative",
        display: "flex",
        gap: 12,
        padding: 10,
        borderRadius: 999,
        background: "rgba(255,255,255,0.06)",
        width: "fit-content",
        outline: "none",
        userSelect: "none",
      }}
      onFocus={measure}
    >
      {/* Le "pill" animé */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 6,
          bottom: 6,
          left: pill.left,
          width: pill.width,
          borderRadius: 999,
          background: "rgba(255,255,255,0.18)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          transition:
            "left 260ms cubic-bezier(.2,.9,.2,1), width 260ms cubic-bezier(.2,.9,.2,1)",
        }}
      />

      {items.map(({ label, icon, id }) => {
        const isActive = id === selectedPanel;
        return (
          <a
            href="#my-work"
            key={label}
            ref={(el) => (itemRefs.current[id] = el)}
            type="button"
            onClick={() => setActiveAndNotify(id)}
            style={{
              position: "relative",
              zIndex: 1,
              border: "none",
              background: "transparent",
              padding: "10px 14px",
              borderRadius: 999,
              color: "rgba(255,255,255,0.8)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 0.2,
              cursor: "pointer",
              opacity: isActive ? 1 : 0.75,
              transition: "opacity 180ms ease, color 180ms ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              // petit “lift” façon tvOS
              e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
            }}
          >
            {icon}
            {label}
          </a>
        );
      })}
    </div>
  );
};

export default Select;
