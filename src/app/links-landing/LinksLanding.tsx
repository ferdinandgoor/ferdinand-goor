import type { CSSProperties } from "react";
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
import useScrollReveal from "@/hooks/useScrollReveal";
import LinksVideoBlock from "./LinksVideoBlock";
import type { LinksVideo, LinksVideoBlockProps } from "./LinksVideoBlock";
import "./LinksLanding.scss";
import { ActionLink } from "@/components/action/Action";

type VideoBlock = Omit<
  LinksVideoBlockProps,
  "primaryVideo" | "secondaryVideos"
> & {
  key: string;
  videos: LinksVideo[];
};

const youtubeChannelUrl = "https://www.youtube.com/@ferd.process";
const spotifyArtistUrl =
  "https://open.spotify.com/artist/15Z2HnTByQHjpyLZrHB3vs";

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
    moreHref: "/mashups",
    moreLabel: "Voir plus de mashups",
    videos: getRecentVideos(funnyMashupList),
  },
  {
    key: "long-videos",
    label: "À voir aussi",
    secondaryLabel: "Autres vidéos longues",
    buttonLabel: "Voir la vidéo",
    moreHref: "/videos",
    moreLabel: "Voir plus de vidéos longues",
    videos: getRecentVideos(bigYoutubeVideoList),
  },
  {
    key: "gear",
    label: "Matos et prod",
    secondaryLabel: "Autres vidéos matos et prod",
    buttonLabel: "Voir la vidéo",
    moreHref: "/matos",
    moreLabel: "Voir plus de tests matos",
    videos: getRecentVideos(gearYoutubeVideoList),
  },
  {
    key: "music-videos",
    label: "Dernier clip réalisé",
    secondaryLabel: "Autres clips réalisés",
    buttonLabel: "Voir le clip",
    moreHref: "/projets",
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
    tone: "youtube" as const,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ferd.process",
    icon: <InstagramLogo weight="fill" />,
    tone: "instagram" as const,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ferd.process",
    icon: <TiktokLogo weight="fill" />,
    tone: "tiktok" as const,
  },
  {
    label: "Spotify",
    href: spotifyArtistUrl,
    icon: <SpotifyLogo weight="fill" />,
    tone: "spotify" as const,
  },
];

const LinksLanding = () => {
  useScrollReveal(".links-page__profile, .links-page__feature");

  return (
    <main
      id="main-content"
      className="links-page"
      style={{ "--links-bg-image": `url(${ferdPhoto})` } as CSSProperties}
    >
      <section className="links-page__shell" aria-label="Ferd links">
        <section className="links-page__profile" aria-label="Profil Ferd">
          <img src={ferdPhoto} alt="Portrait de Ferd" loading="lazy" />
          <div className="links-page__profile-copy">
            <h1>@ferd.process</h1>
            <p className="links-page__profile-bio">
              Salut, je m'appelle FERD. Je fais des mashups débiles, des vidéos
              YouTube marrantes, des clips et de la production musicale metal.
              Je suis aussi développeur web freelance pour ceux que ça
              intéresse. Oui, je fais tout mdr.
            </p>
            <div className="links-page__profile-socials">
              {socials.map((social) => (
                <ActionLink
                  key={social.href}
                  variant="icon-bubble"
                  href={social.href}
                  external
                  icon={social.icon}
                  iconPosition="start"
                  tone={social.tone}
                  ariaLabel={social.label}
                >
                  {social.label}
                </ActionLink>
              ))}
            </div>
          </div>
        </section>

        <section
          className="links-page__content"
          id="contenus"
          aria-label="Contenus FERD Process"
        >
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
        </section>

        <div className="links-page__main-action">
          <ActionLink
            variant="nav"
            to="/"
            icon={<ArrowSquareOut weight="bold" />}
          >
            Découvrir FERD Films
          </ActionLink>
        </div>
      </section>
    </main>
  );
};

export default LinksLanding;
