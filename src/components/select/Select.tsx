import Panel from "@/types/Panel";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";

interface SelectProps {
  items: Panel[];
}

const Select = ({ items }: SelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const { pathname } = useLocation();
  const selectedId =
    items.find((item) => item.path === pathname)?.id ?? 0;

  const measure = () => {
    const el = itemRefs.current[selectedId];
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
  }, [selectedId]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="select-tabs"
      ref={containerRef}
      tabIndex={0}
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

      {items.map(({ label, icon, id, path }) => {
        const isActive = id === selectedId;
        return (
          <Link
            to={path}
            key={label}
            ref={(el) => (itemRefs.current[id] = el)}
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
            <span className="tab-label">{label}</span>
          </Link>
        );
      })}
      <style>{`
        .select-tabs .tab-label {
          display: none;
        }
        @media (min-width: 641px) {
          .select-tabs .tab-label {
            display: inline;
          }
        }
      `}</style>
    </div>
  );
};

export default Select;
