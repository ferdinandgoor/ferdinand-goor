import { useEffect } from "react";
import {
  ArrowSquareOut,
  Bell,
  InstagramLogo,
  LinkSimple,
  Play,
  TiktokLogo,
  YoutubeLogo,
} from "phosphor-react";
import bigYoutubeVideoList from "@/data/bigYoutubeVideoList.json";
import funnyMashupList from "@/data/funnyMashupList.json";
import gearYoutubeVideoList from "@/data/gearYoutubeVideoList.json";
import ferdPhoto from "../mashup-landing/ferd.jpg";
import "./LinksLanding.css";

type YoutubeVideo = {
  artist: string;
  song: string;
  date: string;
  youtubeId: string;
  price: number;
};

type VideoFeatureProps = {
  label: string;
  description: string;
  video: YoutubeVideo;
  buttonLabel: string;
};

const youtubeChannelUrl = "https://www.youtube.com/@ferd.process";

const youtubeWatchUrl = (youtubeId: string) => `https://www.youtube.com/watch?v=${youtubeId}`;

const getLatestVideo = (videos: YoutubeVideo[]) =>
  [...videos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

const latestFeaturedVideo = getLatestVideo(bigYoutubeVideoList);
const latestMashup = getLatestVideo(funnyMashupList);
const latestGearVideo = getLatestVideo(gearYoutubeVideoList);

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

const mashupPages = [
  {
    title: "Djadja - Aya Nakamura Version Korn",
    subtitle: "Ferd x Romain Gamain",
    href: "/aya-korn",
  },
];

const VideoFeature = ({ label, description, video, buttonLabel }: VideoFeatureProps) => {
  const href = youtubeWatchUrl(video.youtubeId);

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
          />
        ) : null}

        {latestFeaturedVideo ? (
          <VideoFeature
            label="À voir aussi"
            description="Une vidéo plus longue pour découvrir mon univers et ma manière de créer."
            video={latestFeaturedVideo}
            buttonLabel="Voir la vidéo"
          />
        ) : null}

        {latestGearVideo ? (
          <VideoFeature
            label="Matos et prod"
            description="Du contenu plus studio, production et matériel."
            video={latestGearVideo}
            buttonLabel="Voir la vidéo"
          />
        ) : null}

        <section className="links-mashup-pages" aria-label="Landing pages des mashups">
          <p className="links-section-label">Landing pages mashups</p>
          <div className="links-page-list">
            {mashupPages.map((page) => (
              <a className="links-page-link" href={page.href} key={page.href}>
                <span>
                  <strong>{page.title}</strong>
                  <small>{page.subtitle}</small>
                </span>
                <LinkSimple weight="bold" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default LinksLanding;
