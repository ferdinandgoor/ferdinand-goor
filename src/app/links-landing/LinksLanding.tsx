import { useEffect } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  ArrowSquareOut,
  InstagramLogo,
  SpotifyLogo,
  TiktokLogo,
  YoutubeLogo,
} from "phosphor-react";
import bigYoutubeVideoList from "@/data/bigYoutubeVideoList.json";
import funnyMashupList from "@/data/funnyMashupList.json";
import gearYoutubeVideoList from "@/data/gearYoutubeVideoList.json";
import musicVideoList from "@/data/musicVideoList.json";
import ferdPhoto from "../mashup-landing/ferd.jpg";
import LinksVideoBlock from "./LinksVideoBlock";
import type {
  LinksVideo,
  LinksVideoBlockProps,
} from "./LinksVideoBlock";
import "./LinksLanding.css";

type VideoBlock = Omit<LinksVideoBlockProps, "primaryVideo" | "secondaryVideos"> & {
  key: string;
  videos: LinksVideo[];
};

const youtubeChannelUrl = "https://www.youtube.com/@ferd.process";
const spotifyArtistUrl = "https://open.spotify.com/artist/15Z2HnTByQHjpyLZrHB3vs";
const mashupPlaylistUrl = "https://www.youtube.com/playlist?list=PLTGarG5bkXoA";
const longVideosPlaylistUrl = "https://www.youtube.com/playlist?list=PLOGfm0l52k3g";
const gearPlaylistUrl = "https://www.youtube.com/playlist?list=PLOvnmxmjrjv4";

const getVideoTimestamp = (video?: LinksVideo) =>
  video ? new Date(video.date).getTime() : 0;

const getRecentVideos = (videos: LinksVideo[]) =>
  [...videos]
    .sort((a, b) => getVideoTimestamp(b) - getVideoTimestamp(a))
    .slice(0, 3);

const videoBlocks: VideoBlock[] = [
  {
    key: "mashups",
    label: "Dernier mashup",
    secondaryLabel: "Autres mashups metal",
    buttonLabel: "Voir le mashup",
    moreHref: mashupPlaylistUrl,
    moreLabel: "Voir plus de mashups",
    videos: getRecentVideos(funnyMashupList),
  },
  {
    key: "long-videos",
    label: "À voir aussi",
    secondaryLabel: "Autres vidéos longues",
    buttonLabel: "Voir la vidéo",
    moreHref: longVideosPlaylistUrl,
    moreLabel: "Voir plus de vidéos longues",
    videos: getRecentVideos(bigYoutubeVideoList),
  },
  {
    key: "gear",
    label: "Matos et prod",
    secondaryLabel: "Autres vidéos matos et prod",
    buttonLabel: "Voir la vidéo",
    moreHref: gearPlaylistUrl,
    moreLabel: "Voir plus de tests matos",
    videos: getRecentVideos(gearYoutubeVideoList),
  },
  {
    key: "music-videos",
    label: "Dernier clip réalisé",
    secondaryLabel: "Autres clips réalisés",
    buttonLabel: "Voir le clip",
    moreHref: "/music-videos",
    moreLabel: "Voir plus de clips",
    videos: getRecentVideos(musicVideoList),
  },
].sort(
  (a, b) => getVideoTimestamp(b.videos[0]) - getVideoTimestamp(a.videos[0]),
);

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

const LinksLanding = () => {
  useEffect(() => {
    document.title = "Ferd | Links";
  }, []);

  return (
    <main
      className="links-page"
      style={{ "--links-bg-image": `url(${ferdPhoto})` } as CSSProperties}
    >
      <section className="links-shell" aria-label="Ferd links">

        <section className="links-profile" aria-label="Profil Ferd">
          <img src={ferdPhoto} alt="Portrait de Ferd" loading="lazy" />
          <div className="links-profile-copy">
            <p className="links-section-label">Ferd</p>
            <h1>@ferd.process</h1>
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

        {videoBlocks.map(({ key, videos, ...blockProps }) =>
          videos[0] ? (
            <LinksVideoBlock
              key={key}
              {...blockProps}
              primaryVideo={videos[0]}
              secondaryVideos={videos.slice(1)}
            />
          ) : null,
        )}

        <Link className="links-main-page-link" to="/">
          <span>Tout mon univers</span>
          <ArrowSquareOut weight="bold" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
};

export default LinksLanding;
