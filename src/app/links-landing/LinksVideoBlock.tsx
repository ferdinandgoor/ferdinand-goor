import {
  ArrowSquareOut,
  MusicNotes,
  Play,
  SpotifyLogo,
  YoutubeLogo,
} from "phosphor-react";
import { Link } from "react-router-dom";

type ListeningLink = {
  label: string;
  href: string;
  platform: string;
  isPrimary?: boolean;
};

export type LinksVideo = {
  artist: string;
  song: string;
  date: string;
  youtubeId: string;
  landing?: {
    artist?: string;
    title?: string;
    links?: ListeningLink[];
  };
};

export type LinksVideoBlockProps = {
  label: string;
  primaryVideo: LinksVideo;
  secondaryVideos?: LinksVideo[];
  secondaryLabel?: string;
  buttonLabel: string;
  moreHref: string;
  moreLabel: string;
};

const youtubeWatchUrl = (youtubeId: string) =>
  `https://www.youtube.com/watch?v=${youtubeId}`;

const listeningLinkIcon = (platform: string) => {
  if (platform === "spotify") {
    return <SpotifyLogo weight="fill" aria-hidden="true" />;
  }

  return <MusicNotes weight="fill" aria-hidden="true" />;
};

const LinksVideoBlock = ({
  label,
  primaryVideo,
  secondaryVideos = [],
  secondaryLabel,
  buttonLabel,
  moreHref,
  moreLabel,
}: LinksVideoBlockProps) => {
  const primaryHref = youtubeWatchUrl(primaryVideo.youtubeId);
  const listeningLinks = (primaryVideo.landing?.links ?? []).filter(
    (link) => link.platform !== "youtube",
  );
  const isExternalMoreLink = moreHref.startsWith("http");
  const moreLinkContent = (
    <>
      <span>{moreLabel}</span>
      <ArrowSquareOut weight="bold" aria-hidden="true" />
    </>
  );

  return (
    <section className="links-feature links-feature-video" aria-label={label}>
      <div className="links-feature-heading">
        <p className="links-section-label">{label}</p>
        <h2>{primaryVideo.song}</h2>
      </div>

      <a
        className="links-thumbnail"
        href={primaryHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Regarder ${primaryVideo.song} sur YouTube`}
      >
        <img
          src={`https://i.ytimg.com/vi/${primaryVideo.youtubeId}/hqdefault.jpg`}
          alt=""
          width="480"
          height="360"
          loading="lazy"
        />
        <span>
          <Play weight="fill" aria-hidden="true" />
        </span>
      </a>

      <div className="links-feature-copy">
        <a
          className="links-button links-button-primary"
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <YoutubeLogo weight="fill" aria-hidden="true" />
          <span>{buttonLabel}</span>
        </a>
        {listeningLinks.map((link) => (
          <a
            className="links-button"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            key={`${link.platform}-${link.href}`}
          >
            {listeningLinkIcon(link.platform)}
            <span>{link.label}</span>
          </a>
        ))}
      </div>

      {secondaryVideos.length > 0 && secondaryLabel ? (
        <div className="links-feature-secondary" aria-label={secondaryLabel}>
          <p className="links-section-label">{secondaryLabel}</p>
          <div className="links-page-list">
            {secondaryVideos.map((video) => (
              <a
                className="links-page-link"
                href={youtubeWatchUrl(video.youtubeId)}
                target="_blank"
                rel="noopener noreferrer"
                key={video.youtubeId}
              >
                <img
                  src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt=""
                  width="480"
                  height="360"
                  loading="lazy"
                />
                <span>
                  <strong>{video.landing?.title ?? video.song}</strong>
                  <small>{video.landing?.artist ?? video.artist}</small>
                </span>
                <YoutubeLogo weight="fill" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {isExternalMoreLink ? (
        <a
          className="links-more-link links-feature-more"
          href={moreHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {moreLinkContent}
        </a>
      ) : (
        <Link className="links-more-link links-feature-more" to={moreHref}>
          {moreLinkContent}
        </Link>
      )}
    </section>
  );
};

export default LinksVideoBlock;
