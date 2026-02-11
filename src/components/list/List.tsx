import Card from "@/components/card";

interface ListProps {
  data: {
    artist: string;
    date: string;
    song: string;
    youtubeId: string;
    price: number;
  }[];
  maxSize: number;
}

const List = ({ data, maxSize }: ListProps) => (
  <div
    style={{
      padding: "20px",
      backdropFilter: "blur(20px) brightness(0.3) saturate(15%)",
    }}
    id="my-work"
  >
    <ul
      style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "grid",
        gap: "28px",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        alignItems: "start",
        justifyItems: "center",
      }}
    >
      {/* Gain total : {data.reduce((total, current) => total += current.price, 0)} */}
      {data
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, maxSize || data.length)
        .map((item) => (
          <li key={item.artist} className="list-item" style={{ width: "100%" }}>
            <Card {...item} />
          </li>
        ))}
      <style>{`
      .list-item {
        transition: transform 180ms ease, filter 180ms ease;
        will-change: transform, filter;
      }
      .list-item:hover {
        transform: scale(1.02);
        filter: brightness(1.08);
      }
    `}</style>
    </ul>
  </div>
);

export default List;
