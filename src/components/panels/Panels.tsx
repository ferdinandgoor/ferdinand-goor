import { useEffect, useRef, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import Video from "@/types/Video";
import List from "../list/List";
import { tabs } from "@/router";
import useScrollReveal from "@/hooks/useScrollReveal";
import Container from "@/components/container/Container";
import "./Panels.scss";

type PanelSection = {
  title: string;
  list: Video[];
};

const Panels = () => {
  const { pathname } = useLocation();
  useScrollReveal(".video-card--reveal", pathname);
  const loaderData = useLoaderData() as {
    list?: Video[];
    sections?: PanelSection[];
    linkMode?: "project" | "mashup" | "video" | "gear" | "embed";
  };
  const sections = loaderData.sections ?? [
    {
      title: "",
      list: loaderData.list ?? [],
    },
  ];
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
        currentIndex > prevIndexRef.current
          ? "portfolio-panels__slide--next"
          : "portfolio-panels__slide--previous";
      setAnimClass(direction);
      const timeout = window.setTimeout(() => setAnimClass(""), 420);
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
    <div className="portfolio-panels">
      <div className={`portfolio-panels__slide ${animClass}`}>
        <Container>
          {sections.map((section) => (
            <List
              key={`${pathname}-${section.title || "default"}`}
              title={section.title}
              data={section.list}
              maxSize={100}
              linkMode={loaderData.linkMode}
            />
          ))}
        </Container>
      </div>
    </div>
  );
};

export default Panels;
