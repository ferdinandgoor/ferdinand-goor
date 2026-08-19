import Card from "@/components/card";
import "./List.scss";

interface ListProps {
  title?: string;
  data: {
    artist: string;
    date: string;
    song: string;
    youtubeId: string;
  }[];
  maxSize: number;
}

const List = ({ title, data, maxSize }: ListProps) => (
  <div className="portfolio-list" id="main-work">
    {title ? (
      <h2>
        {title}
      </h2>
    ) : null}
    <ul>
      {[...data]
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, maxSize || data.length)
        .map((item) => (
          <li key={item.youtubeId}>
            <Card {...item} />
          </li>
        ))}
    </ul>
  </div>
);

export default List;
