import {
  ArrowRight,
  MusicNotes,
  Play,
  SpotifyLogo,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { ActionLink } from "@/components/action/Action";
import { getProcessVideoSlug } from "@/utils/projectSlug";

type ListeningLink = {
  label: string;
  href: string;
  platform: string;
  isPrimary?: boolean;
};

export type LinksVideo = {
  artist: string;
  song: string;
  slug?: string;
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
  detailBasePath: string;
  moreHref: string;
  moreLabel: string;
  showListeningLinks?: boolean;
};

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
  detailBasePath,
  moreHref,
  moreLabel,
  showListeningLinks = false,
}: LinksVideoBlockProps) => {
  const getDetailPath = (video: LinksVideo) =>
    `${detailBasePath}/${getProcessVideoSlug(video)}`;
  const primaryPath = getDetailPath(primaryVideo);
  const listeningLinks = showListeningLinks
    ? (primaryVideo.landing?.links ?? []).filter(
        (link) => link.platform !== "youtube",
      )
    : [];

  return (
    <section
      className="links-page__feature links-page__feature--video"
      aria-label={label}
    >
      <div className="links-page__feature-heading">
        <p className="links-page__section-label">{label}</p>
        <h2>{primaryVideo.song}</h2>
      </div>

      <Link
        className="links-page__thumbnail"
        to={primaryPath}
        aria-label={`Découvrir ${primaryVideo.song}`}
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
      </Link>

      <div className="links-page__feature-copy">
        <ActionLink
          variant="primary"
          to={primaryPath}
          fullWidth
          icon={<ArrowRight weight="bold" />}
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
              <Link
                className="links-page__link"
                to={getDetailPath(video)}
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
                <ArrowRight weight="bold" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <ActionLink
        className="links-page__feature-more"
        variant="text"
        to={moreHref}
        icon={<ArrowRight weight="bold" />}
      >
        {moreLabel}
      </ActionLink>
    </section>
  );
};

export default LinksVideoBlock;
