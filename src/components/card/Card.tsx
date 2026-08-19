import { useState } from "react";
import Video from "@/types/Video";
import "./Card.scss";

const Card = ({ artist, song, youtubeId }: Video) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <article className="list-item video-card">
      <div className="video-card__media">
        {isLoaded ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&modestbranding=1`} title={`${artist} — ${song}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" loading="lazy" />
        ) : (
          <button type="button" aria-label={`Lire ${artist} — ${song}`} onClick={() => setIsLoaded(true)}>
            <img src={thumbnail} alt={`${artist} — ${song}`} width="480" height="360" loading="lazy" />
            <span className="video-card__overlay" aria-hidden="true"><i /></span>
          </button>
        )}
      </div>
    </article>
  );
};

export default Card;
