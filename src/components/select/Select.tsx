import useCurrentTab from "@/hooks/useCurrentTab";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { tabs as items } from "@/router";

const Select = () => {
  const containerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const currentTab = useCurrentTab();
  const selectedId = currentTab?.id ?? 0;

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

  useEffect(() => {
    requestAnimationFrame(measure);
  }, [selectedId]);

  useEffect(() => {
    const onResize = () => requestAnimationFrame(measure);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    const el = itemRefs.current[selectedId];
    if (!root || !el) return;

    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    ro.observe(root);
    ro.observe(el);

    if (document?.fonts?.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(measure));
    }

    return () => ro.disconnect();
  }, [selectedId]);

  return (
    <nav
      aria-label="Catégories du portfolio"
      className="select-tabs"
      ref={containerRef}
      tabIndex={0}
      style={{
        position: "relative",
        display: "flex",
        gap: 12,
        padding: "var(--space-2)",
        borderRadius: "var(--radius-pill)",
        background: "var(--color-surface-soft)",
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
          borderRadius: "var(--radius-pill)",
          background: "var(--color-border)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          transition:
            "left var(--duration-medium) var(--ease-standard), width var(--duration-medium) var(--ease-standard)",
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
              padding: "var(--space-3) var(--space-4)",
              borderRadius: "var(--radius-pill)",
              textDecoration: "none",
              color: "rgba(255,255,255,0.8)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 0.2,
              cursor: "pointer",
              opacity: isActive ? 1 : 0.75,
              transition: "opacity var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
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
    </nav>
  );
};

export default Select;
