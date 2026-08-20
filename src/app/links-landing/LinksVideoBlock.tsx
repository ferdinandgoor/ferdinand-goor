import {
  ArrowSquareOut,
  MusicNotes,
  Play,
  SpotifyLogo,
  YoutubeLogo,
} from "phosphor-react";
import { ActionLink } from "@/components/action/Action";

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

  return (
    <section
      className="links-page__feature links-page__feature--video"
      aria-label={label}
    >
      <div className="links-page__feature-heading">
        <p className="links-page__section-label">{label}</p>
        <h2>{primaryVideo.song}</h2>
      </div>

      <a
        className="links-page__thumbnail"
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

      <div className="links-page__feature-copy">
        <ActionLink
          variant="primary"
          href={primaryHref}
          external
          fullWidth
          icon={<YoutubeLogo weight="fill" />}
          iconPosition="start"
        >
          {buttonLabel}
        </ActionLink>
        {listeningLinks.map((link) => (
          <ActionLink
            variant="secondary"
            href={link.href}
            external
            fullWidth
            icon={listeningLinkIcon(link.platform)}
            iconPosition="start"
            key={`${link.platform}-${link.href}`}
          >
            {link.label}
          </ActionLink>
        ))}
      </div>

      {secondaryVideos.length > 0 && secondaryLabel ? (
        <div
          className="links-page__feature-secondary"
          aria-label={secondaryLabel}
        >
          <p className="links-page__section-label">{secondaryLabel}</p>
          <div className="links-page__list">
            {secondaryVideos.map((video) => (
              <a
                className="links-page__link"
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
        <ActionLink
          className="links-page__feature-more"
          variant="text"
          href={moreHref}
          external
          icon={<ArrowSquareOut weight="bold" />}
        >
          {moreLabel}
        </ActionLink>
      ) : (
        <ActionLink
          className="links-page__feature-more"
          variant="text"
          to={moreHref}
          icon={<ArrowSquareOut weight="bold" />}
        >
          {moreLabel}
        </ActionLink>
      )}
    </section>
  );
};

export default LinksVideoBlock;
