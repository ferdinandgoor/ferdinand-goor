import { useState } from "react";
import { ArrowUpRight } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";
import Video from "@/types/Video";
import { getProjectPath } from "@/utils/projectSlug";
import "./Card.scss";

const Card = ({ artist, song, date, youtubeId, styles = [] }: Video) => {
  const { pathname } = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  const year = new Date(date).getFullYear();
  const isPortfolioProject = pathname === "/projets";

  if (isPortfolioProject) {
    return (
      <article className="list-item video-card video-card--project">
        <Link className="video-card__project-link" to={getProjectPath({ artist, song })} aria-label={`Découvrir le projet ${artist} — ${song}`}>
          <span className="video-card__media">
            <img src={thumbnail} alt={`${artist} — ${song}`} width="480" height="360" loading="lazy" />
            <span className="video-card__open" aria-hidden="true"><ArrowUpRight /></span>
          </span>
        </Link>
      </article>
    );
  }

  return (
    <article className="list-item video-card">
      <div className="video-card__media">
        {isLoaded ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&modestbranding=1`} title={`${artist} — ${song}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" loading="lazy" />
        ) : (
          <button type="button" aria-label={`Lire ${artist} — ${song}`} onClick={() => setIsLoaded(true)}>
            <img src={thumbnail} alt={`${artist} — ${song}`} width="480" height="360" loading="lazy" />
            <span className="video-card__overlay" aria-hidden="true">
              <i />
              <span className="video-card__meta">
                <span className="video-card__artist">{artist}</span>
                <strong>{song}</strong>
                <span className="video-card__details">
                  <span>{styles.join(" · ")}</span>
                  <span>{year}</span>
                </span>
              </span>
            </span>
          </button>
        )}
      </div>
    </article>
  );
};

export default Card;
