import Card from "@/components/card";

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
  <div
    style={{
      padding: "16px",
      // backdropFilter: "blur(20px) brightness(0.3) saturate(15%)",
    }}
    id="my-work"
  >
    {title ? (
      <h2
        style={{
          color: "#00ff0d",
          fontSize: "clamp(0.95rem, 2.4vw, 1.35rem)",
          fontWeight: 600,
          letterSpacing: 0,
          lineHeight: 1.2,
          margin: "4px 0 12px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h2>
    ) : null}
    <ul
      style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        alignItems: "start",
        justifyItems: "center",
      }}
    >
      {[...data]
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, maxSize || data.length)
        .map((item) => (
          <li key={item.youtubeId} style={{ width: "100%" }}>
            <Card {...item} />
          </li>
        ))}
    </ul>
  </div>
);

export default List;
