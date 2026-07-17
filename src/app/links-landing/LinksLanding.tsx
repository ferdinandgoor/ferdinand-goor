import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowSquareOut,
  Bell,
  InstagramLogo,
  Play,
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
  price: number;
  landing?: {
    artist?: string;
    title?: string;
  };
};

type VideoFeatureProps = {
  label: string;
  description: string;
  video: YoutubeVideo;
  buttonLabel: string;
  moreHref: string;
  moreLabel: string;
};

const youtubeChannelUrl = "https://www.youtube.com/@ferd.process";
const mashupPlaylistUrl = "https://www.youtube.com/watch?v=QiPXZwJDoFY&list=PLTGarG5bkXoA";
const longVideosPlaylistUrl = "https://www.youtube.com/watch?v=jQEJ8EPNPog&list=PLOGfm0l52k3g";
const gearPlaylistUrl = "https://www.youtube.com/watch?v=Nm4eX1_C-Kk&list=PLOvnmxmjrjv4";

const youtubeWatchUrl = (youtubeId: string) => `https://www.youtube.com/watch?v=${youtubeId}`;

const getLatestVideo = (videos: YoutubeVideo[]) =>
  [...videos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

const latestFeaturedVideo = getLatestVideo(bigYoutubeVideoList);
const latestMashup = getLatestVideo(funnyMashupList);
const latestGearVideo = getLatestVideo(gearYoutubeVideoList);
const latestMashupPages = [...(funnyMashupList as YoutubeVideo[])]
  .filter((mashup) => mashup.slug)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(1, 4);
const latestMusicVideos = [...(musicVideoList as YoutubeVideo[])]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

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
];

const VideoFeature = ({ label, description, video, buttonLabel, moreHref, moreLabel }: VideoFeatureProps) => {
  const href = youtubeWatchUrl(video.youtubeId);
  const isExternalMoreLink = moreHref.startsWith("http");

  return (
    <section className="links-feature links-feature-video" aria-label={label}>
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
        <p className="links-section-label">{label}</p>
        <h2>{video.song}</h2>
        <p>{description}</p>
        <a className="links-button links-button-primary" href={href} target="_blank" rel="noopener noreferrer">
          <YoutubeLogo weight="fill" aria-hidden="true" />
          <span>{buttonLabel}</span>
        </a>
        {isExternalMoreLink ? (
          <a className="links-more-link" href={moreHref} target="_blank" rel="noopener noreferrer">
            <span>{moreLabel}</span>
            <ArrowSquareOut weight="bold" aria-hidden="true" />
          </a>
        ) : (
          <Link className="links-more-link" to={moreHref}>
            <span>{moreLabel}</span>
            <ArrowSquareOut weight="bold" aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
};

const LinksLanding = () => {
  useEffect(() => {
    document.title = "Ferd | Links";
  }, []);

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

        {latestMashup ? (
          <VideoFeature
            label="Dernier mashup"
            description="Le dernier mashup fun publié sur ma chaîne."
            video={latestMashup}
            buttonLabel="Voir le mashup"
            moreHref={mashupPlaylistUrl}
            moreLabel="Voir plus de mashups"
          />
        ) : null}

        {latestFeaturedVideo ? (
          <VideoFeature
            label="À voir aussi"
            description="Une vidéo plus longue pour découvrir mon univers et ma manière de créer."
            video={latestFeaturedVideo}
            buttonLabel="Voir la vidéo"
            moreHref={longVideosPlaylistUrl}
            moreLabel="Voir plus de vidéos longues"
          />
        ) : null}

        {latestGearVideo ? (
          <VideoFeature
            label="Matos et prod"
            description="Du contenu plus studio, production et matériel."
            video={latestGearVideo}
            buttonLabel="Voir la vidéo"
            moreHref={gearPlaylistUrl}
            moreLabel="Voir plus de tests matos"
          />
        ) : null}

        <section className="links-mashup-pages" aria-label="Mashups Metal">
          <p className="links-section-label">Mashups Metal</p>
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
          <a
            className="links-more-link links-section-more"
            href={mashupPlaylistUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Voir plus de mashups</span>
            <ArrowSquareOut weight="bold" aria-hidden="true" />
          </a>
        </section>

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
      </section>
    </main>
  );
};

export default LinksLanding;
