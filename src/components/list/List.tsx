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
      padding: "var(--space-4)",
      // backdropFilter: "blur(20px) brightness(0.3) saturate(15%)",
    }}
    id="main-work"
  >
    {title ? (
      <h2
        style={{
          color: "var(--color-accent)",
          fontSize: "var(--text-title-sm)",
          fontWeight: 600,
          letterSpacing: 0,
          lineHeight: 1.2,
          margin: "var(--space-1) 0 var(--space-3)",
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
        gap: "var(--space-4)",
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
