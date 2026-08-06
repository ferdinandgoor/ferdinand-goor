import { Fragment, ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowSquareOut,
  Bell,
  InstagramLogo,
  Play,
  SpotifyLogo,
  TiktokLogo,
  YoutubeLogo,
} from "phosphor-react";
import bigYoutubeVideoList from "@/data/bigYoutubeVideoList.json";
import funnyMashupList from "@/data/funnyMashupList.json";
import gearYoutubeVideoList from "@/data/gearYoutubeVideoList.json";
import musicVideoList from "@/data/musicVideoList.json";
import ferdPhoto from "../mashup-landing/ferd.jpg";
import "./LinksLanding.css";

type YoutubeVideo = {
  artist: string;
  song: string;
  slug?: string;
  date: string;
  youtubeId: string;
  landing?: {
    artist?: string;
    title?: string;
  };
};

type VideoFeatureProps = {
  label: string;
  video: YoutubeVideo;
  buttonLabel: string;
  moreHref: string;
  moreLabel: string;
  children?: ReactNode;
};

const youtubeChannelUrl = "https://www.youtube.com/@ferd.process";
const spotifyArtistUrl = "https://open.spotify.com/artist/15Z2HnTByQHjpyLZrHB3vs";
const mashupPlaylistUrl = "https://www.youtube.com/playlist?list=PLTGarG5bkXoA";
const longVideosPlaylistUrl = "https://www.youtube.com/playlist?list=PLOGfm0l52k3g";
const gearPlaylistUrl = "https://www.youtube.com/playlist?list=PLOvnmxmjrjv4";

const youtubeWatchUrl = (youtubeId: string) => `https://www.youtube.com/watch?v=${youtubeId}`;

const getVideoTimestamp = (video?: YoutubeVideo) =>
  video ? new Date(video.date).getTime() : 0;

const getLatestVideo = (videos: YoutubeVideo[]) =>
  [...videos].sort((a, b) => getVideoTimestamp(b) - getVideoTimestamp(a))[0];

const latestFeaturedVideo = getLatestVideo(bigYoutubeVideoList);
const latestMashup = getLatestVideo(funnyMashupList);
const latestGearVideo = getLatestVideo(gearYoutubeVideoList);
const nextFeaturedVideos = [...(bigYoutubeVideoList as YoutubeVideo[])]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(1, 3);
const latestMashupPages = [...(funnyMashupList as YoutubeVideo[])]
  .filter((mashup) => mashup.slug)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(1, 3);
const latestMusicVideos = [...(musicVideoList as YoutubeVideo[])]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 2);
const latestMusicVideo = latestMusicVideos[0];

const socials = [
  {
    label: "YouTube",
    href: youtubeChannelUrl,
    icon: <YoutubeLogo weight="fill" />,
    className: "links-social-youtube",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ferd.process",
    icon: <InstagramLogo weight="fill" />,
    className: "links-social-instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ferd.process",
    icon: <TiktokLogo weight="fill" />,
    className: "links-social-tiktok",
  },
  {
    label: "Spotify",
    href: spotifyArtistUrl,
    icon: <SpotifyLogo weight="fill" />,
    className: "links-social-spotify",
  },
];

const VideoFeature = ({
  label,
  video,
  buttonLabel,
  moreHref,
  moreLabel,
  children,
}: VideoFeatureProps) => {
  const href = youtubeWatchUrl(video.youtubeId);
  const isExternalMoreLink = moreHref.startsWith("http");

  return (
    <section className="links-feature links-feature-video" aria-label={label}>
      <div className="links-feature-heading">
        <p className="links-section-label">{label}</p>
        <h2>{video.song}</h2>
      </div>
      <a
        className="links-thumbnail"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Regarder ${video.song} sur YouTube`}
      >
        <img src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
        <span>
          <Play weight="fill" aria-hidden="true" />
        </span>
      </a>
      <div className="links-feature-copy">
        <a className="links-button links-button-primary" href={href} target="_blank" rel="noopener noreferrer">
          <YoutubeLogo weight="fill" aria-hidden="true" />
          <span>{buttonLabel}</span>
        </a>
      </div>
      {children}
      {isExternalMoreLink ? (
        <a className="links-more-link links-feature-more" href={moreHref} target="_blank" rel="noopener noreferrer">
          <span>{moreLabel}</span>
          <ArrowSquareOut weight="bold" aria-hidden="true" />
        </a>
      ) : (
        <Link className="links-more-link links-feature-more" to={moreHref}>
          <span>{moreLabel}</span>
          <ArrowSquareOut weight="bold" aria-hidden="true" />
        </Link>
      )}
    </section>
  );
};

const LinksLanding = () => {
  useEffect(() => {
    document.title = "Ferd | Links";
  }, []);

  const contentSections = [
    {
      key: "mashups",
      latestTimestamp: getVideoTimestamp(latestMashup),
      content: latestMashup ? (
        <VideoFeature
          label="Dernier mashup"
          video={latestMashup}
          buttonLabel="Voir le mashup"
          moreHref={mashupPlaylistUrl}
          moreLabel="Voir plus de mashups"
        >
          <div className="links-feature-secondary" aria-label="Autres mashups metal">
            <p className="links-section-label">Autres mashups metal</p>
            <div className="links-page-list">
              {latestMashupPages.map((page) => (
                <a
                  className="links-page-link"
                  href={youtubeWatchUrl(page.youtubeId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={page.slug}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${page.youtubeId}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                  />
                  <span>
                    <strong>{page.landing?.title ?? page.song}</strong>
                    <small>{page.landing?.artist ?? page.artist}</small>
                  </span>
                  <YoutubeLogo weight="fill" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </VideoFeature>
      ) : null,
    },
    {
      key: "long-videos",
      latestTimestamp: getVideoTimestamp(latestFeaturedVideo),
      content: latestFeaturedVideo ? (
        <VideoFeature
          label="À voir aussi"
          video={latestFeaturedVideo}
          buttonLabel="Voir la vidéo"
          moreHref={longVideosPlaylistUrl}
          moreLabel="Voir plus de vidéos longues"
        >
          {nextFeaturedVideos.length > 0 ? (
            <div className="links-feature-secondary" aria-label="Autres vidéos longues">
              <p className="links-section-label">Autres vidéos longues</p>
              <div className="links-page-list">
                {nextFeaturedVideos.map((video) => (
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
                      loading="lazy"
                    />
                    <span>
                      <strong>{video.song}</strong>
                      <small>{video.artist}</small>
                    </span>
                    <YoutubeLogo weight="fill" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </VideoFeature>
      ) : null,
    },
    {
      key: "gear",
      latestTimestamp: getVideoTimestamp(latestGearVideo),
      content: latestGearVideo ? (
        <VideoFeature
          label="Matos et prod"
          video={latestGearVideo}
          buttonLabel="Voir la vidéo"
          moreHref={gearPlaylistUrl}
          moreLabel="Voir plus de tests matos"
        />
      ) : null,
    },
    {
      key: "music-videos",
      latestTimestamp: getVideoTimestamp(latestMusicVideo),
      content: latestMusicVideo ? (
        <section className="links-music-videos" aria-label="Derniers clips réalisés">
          <p className="links-section-label">Derniers clips réalisés</p>
          <div className="links-video-list">
            {latestMusicVideos.map((video) => (
              <a
                className="links-video-link"
                href={youtubeWatchUrl(video.youtubeId)}
                target="_blank"
                rel="noopener noreferrer"
                key={video.youtubeId}
              >
                <img
                  src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                />
                <span>
                  <strong>{video.song}</strong>
                  <small>{video.artist}</small>
                </span>
                <YoutubeLogo weight="fill" aria-hidden="true" />
              </a>
            ))}
          </div>
          <Link className="links-more-link links-section-more" to="/music-videos">
            <span>Voir plus de clips</span>
            <ArrowSquareOut weight="bold" aria-hidden="true" />
          </Link>
        </section>
      ) : null,
    },
  ]
    .filter((section) => section.content)
    .sort((a, b) => b.latestTimestamp - a.latestTimestamp);

  return (
    <main className="links-page" style={{ "--links-bg-image": `url(${ferdPhoto})` } as React.CSSProperties}>
      <section className="links-shell" aria-label="Ferd links">

        <section className="links-profile" aria-label="Profil Ferd">
          <img src={ferdPhoto} alt="Portrait de Ferd" loading="lazy" />
          <div className="links-profile-copy">
            <p className="links-section-label">Ferd</p>
            <h2>@ferd.process</h2>
            <p className="links-profile-bio">
              Salut, je m'appelle FERD. Je fais des mashups débiles, des vidéos YouTube marrantes,
              des clips et de la production musicale metal. Je suis aussi développeur web freelance
              pour ceux que ça intéresse. Oui, je fais tout mdr.
            </p>
            <div className="links-profile-socials">
              {socials.map((social) => (
                <a
                  key={social.href}
                  className={`links-profile-social ${social.className}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </section>

        {contentSections.map((section) => (
          <Fragment key={section.key}>
            {section.content}
          </Fragment>
        ))}

        <Link className="links-main-page-link" to="/">
          <span>Tout mon univers</span>
          <ArrowSquareOut weight="bold" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
};

export default LinksLanding;
