import { useEffect, useRef, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import Video from "@/types/Video";
import List from "../list/List";
import { tabs } from "@/router";

const Panels = () => {
  const { pathname } = useLocation();
  const { list } = useLoaderData() as { list: Video[] };
  const [animClass, setAnimClass] = useState("");
  const prevIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const currentIndex = tabs.findIndex((tab) => tab.path === pathname);
    if (currentIndex === -1) return;

    if (
      prevIndexRef.current !== null &&
      prevIndexRef.current !== currentIndex
    ) {
      const direction =
        currentIndex > prevIndexRef.current ? "animate-next" : "animate-prev";
      setAnimClass(direction);
      const timeout = window.setTimeout(() => setAnimClass(""), 420);
      requestAnimationFrame(() => {
        document
          .getElementById("my-work")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return () => window.clearTimeout(timeout);
    }

    prevIndexRef.current = currentIndex;
    return;
  }, [pathname]);

  useEffect(() => {
    const currentIndex = tabs.findIndex((tab) => tab.path === pathname);
    if (currentIndex !== -1) {
      prevIndexRef.current = currentIndex;
    }
  }, [pathname]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderTop: "solid 2px #00ff0d",
        // backdropFilter: "blur(50px) brightness(0.2)",
        minHeight: "100vh",
      }}
    >
      <div className={`panel-slide ${animClass}`}>
        <div
          style={{
            borderTop: "solid 2px #00ff0d",
          }}
        >
          <List key={pathname} data={list} maxSize={100} />
        </div>
      </div>
      <style>{`
        .panel-slide {
          will-change: transform, opacity;
        }
        .panel-slide.animate-next {
          animation: slideInNext 1000ms cubic-bezier(.2,.9,.2,1);
        }
        .panel-slide.animate-prev {
          animation: slideInPrev 1000ms cubic-bezier(.2,.9,.2,1);
        }
        @keyframes slideInNext {
          from { transform: translateX(28px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInPrev {
          from { transform: translateX(-28px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Panels;
