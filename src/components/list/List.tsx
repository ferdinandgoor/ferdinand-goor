import Card from "@/components/card";
import type { VideoCardMode } from "@/components/card/Card";
import type Video from "@/types/Video";
import "./List.scss";

interface ListProps {
  title?: string;
  data: Video[];
  maxSize: number;
  linkMode?: VideoCardMode;
}

const List = ({ title, data, maxSize, linkMode }: ListProps) => (
  <div className="portfolio-list" id="main-work">
    {title ? <h2 className="portfolio-list__title">{title}</h2> : null}
    <ul className="portfolio-list__grid">
      {[...data]
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, maxSize || data.length)
        .map((item) => (
          <li className="portfolio-list__item" key={item.youtubeId}>
            <Card {...item} linkMode={linkMode} />
          </li>
        ))}
    </ul>
  </div>
);

export default List;
