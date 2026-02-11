import { useState } from "react";
import Video from "@/types/Video";

const Card = ({ artist, song, date, youtubeId }: Video) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <>
      <div
        className="list-item"
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            width: "100%",
          }}
        >
          {isLoaded ? (
            <iframe
              style={{
                border: "none",
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&modestbranding=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
              loading="lazy"
            ></iframe>
          ) : (
            <button
              type="button"
              aria-label={`Play ${artist} - ${song}`}
              onClick={() => setIsLoaded(true)}
              style={{
                position: "absolute",
                inset: 0,
                padding: 0,
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <img
                src={thumbnail}
                alt={`${artist} - ${song}`}
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.4))",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      borderLeft: "16px solid white",
                      marginLeft: 4,
                    }}
                  />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
      <style>{`
      .list-item {
        transition: transform 180ms ease, filter 180ms ease;
        will-change: transform, filter;
      }
      .list-item:hover {
        transform: scale(1.01);
        filter: brightness(1.3);
      }
    `}</style>
    </>
  );
};

export default Card;
