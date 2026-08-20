import Video from "@/types/Video";
import List from "../list/List";
import useScrollReveal from "@/hooks/useScrollReveal";
import Container from "@/components/container/Container";
import type { VideoCardMode } from "@/components/card/Card";
import "./Panels.scss";

type PanelSection = {
  title: string;
  list: Video[];
};

type PanelsProps = {
  sections: PanelSection[];
  linkMode: VideoCardMode;
  refreshKey: string;
};

const Panels = ({ sections, linkMode, refreshKey }: PanelsProps) => {
  useScrollReveal(".video-card--reveal", refreshKey);

  return (
    <div className="portfolio-panels">
      <div className="portfolio-panels__slide">
        <Container>
          {sections.map((section) => (
            <List
              key={`${refreshKey}-${section.title || "default"}`}
              title={section.title}
              data={section.list}
              maxSize={100}
              linkMode={linkMode}
            />
          ))}
        </Container>
      </div>
    </div>
  );
};

export default Panels;
