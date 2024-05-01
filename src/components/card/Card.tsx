import Video from "@/types/Video";

const Card = ({ artist, song, date, youtubeId }: Video) => (
  // <a href={`https://www.youtube.com/watch?v=${youtubeId}`} >
  <div
    style={{
      // boxShadow: `0 0 8px #fff, inset 0 0 8px #fff, 0 0 24px #00ff347a, inset 0 0 24px #00ff34b0, 0 0 48px #00ff343b, inset 0 0 48px #00ff3426`,
      // backgroundColor: "#00ff341a",
      maxWidth: "600px",
      width: "100%",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backdropFilter: "blur(50px)",
      // WebkitBackdropFilter: "blur(50px)",
      borderRadius: "8px",
    }}
  >
    <div
      style={{
        width: "100%",
        display: "none",
      }}
    >
      <h2
        style={{
          marginBottom: "12px",
        }}
      >
        {artist} - {song}
      </h2>
      <h3
        style={{
          marginBottom: "12px",
        }}
      >
        {date}
      </h3>
    </div>
    <iframe
      style={{
        border: "none",
      }}
      width="100%"
      src={`https://www.youtube-nocookie.com/embed/${youtubeId}?modestbranding=1`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
    ></iframe>
  </div>
  // </a>
);

export default Card;
