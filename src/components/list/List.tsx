import Card from "@/components/card";
import "./List.scss";

interface ListProps {
  title?: string;
  data: {
    artist: string;
    date: string;
    song: string;
    youtubeId: string;
    styles?: string[];
  }[];
  maxSize: number;
}

const List = ({ title, data, maxSize }: ListProps) => (
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
            <Card {...item} />
          </li>
        ))}
    </ul>
  </div>
);

export default List;
