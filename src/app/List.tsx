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
  <ul style={{
    margin: 0,
    padding: 0
  }}>
    <li
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
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
          <Card key={item.artist} {...item} />
        ))}
    </li>
  </ul>
);

export default List;
