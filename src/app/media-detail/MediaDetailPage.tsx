import { useLocation, useParams } from "react-router-dom";
import {
  FacebookLogo,
  InstagramLogo,
  MusicNotes,
  Play,
  SpotifyLogo,
  TiktokLogo,
  YoutubeLogo,
  ArrowLeft,
} from "phosphor-react";
import funnyMashupList from "@/data/funnyMashupList.json";
import bigYoutubeVideoList from "@/data/bigYoutubeVideoList.json";
import gearYoutubeVideoList from "@/data/gearYoutubeVideoList.json";
import musicVideoList from "@/data/musicVideoList.json";
import musicProductionList from "@/data/musicProductionList.json";
import { getProcessVideoSlug } from "@/utils/projectSlug";
import useScrollReveal from "@/hooks/useScrollReveal";
import SiteHeader from "@/components/site-header/SiteHeader";
import FilmsFooter from "@/components/films-footer/FilmsFooter";
import Container from "@/components/container/Container";
import ferdPhoto from "../mashup-landing/ferd.jpg";
import imageAyaKorn from "../mashup-landing/imageAyaKorn.webp";
import roroPhoto from "../mashup-landing/roro.jpg";
import "./MediaDetailPage.scss";
import { ActionLink } from "@/components/action/Action";

type Platform = "spotify" | "apple" | "deezer" | "youtubeMusic" | "youtube";

type ProcessLink = {
  label: string;
  href: string;
  platform: Platform;
  isPrimary?: boolean;
};

type SocialLink = {
  owner: string;
  label: string;
  href: string;
  icon: "instagram" | "tiktok" | "youtube" | "facebook";
};

type ArtistProfile = {
  id: string;
  name: string;
  photo: string;
  alt: string;
  socials: SocialLink[];
};

type ProcessVideo = {
  label: string;
  title: string;
  youtubeId: string;
};

type ProcessItem = {
  artist: string;
  song: string;
  slug?: string;
  date: string;
  youtubeId: string;
  styles?: string[];
  role?: string;
  description?: string;
  directorNote?: string;
  behindTheScenesYoutubeId?: string;
  credits?: { role: string; name: string }[];
  landing?: {
    artist?: string;
    title?: string;
    kicker?: string;
    profileIds?: string[];
    videos?: ProcessVideo[];
    links?: ProcessLink[];
  };
};

const mashups = funnyMashupList as ProcessItem[];
const longVideos = bigYoutubeVideoList as ProcessItem[];
const gearVideos = gearYoutubeVideoList as ProcessItem[];
const projects = musicVideoList as ProcessItem[];
const music = musicProductionList as ProcessItem[];

type ProcessCategory = "projects" | "mashups" | "videos" | "matos" | "music";

const categories: Record<
  ProcessCategory,
  {
    items: ProcessItem[];
    kicker: string;
    listPath: string;
    universe: "films" | "process";
  }
> = {
  projects: {
    items: projects,
    kicker: "Clip musical",
    listPath: "/projets",
    universe: "films",
  },
  mashups: {
    items: mashups,
    kicker: "Mashup",
    listPath: "/mashups",
    universe: "process",
  },
  videos: {
    items: longVideos,
    kicker: "Vidéo longue",
    listPath: "/videos",
    universe: "process",
  },
  matos: {
    items: gearVideos,
    kicker: "Matos et production",
    listPath: "/matos",
    universe: "process",
  },
  music: {
    items: music,
    kicker: "Production musicale",
    listPath: "/music-production",
    universe: "process",
  },
};

const profileRegistry: Record<string, ArtistProfile> = {
  ferd: {
    id: "ferd",
    name: "Ferd",
    photo: ferdPhoto,
    alt: "Portrait de Ferd",
    socials: [
      {
        owner: "Ferd",
        label: "YouTube",
        href: "https://www.youtube.com/@ferd.process",
        icon: "youtube",
      },
      {
        owner: "Ferd",
        label: "Instagram",
        href: "https://www.instagram.com/ferd.process",
        icon: "instagram",
      },
      {
        owner: "Ferd",
        label: "TikTok",
        href: "https://www.tiktok.com/@ferd.process",
        icon: "tiktok",
      },
    ],
  },
  romain: {
    id: "romain",
    name: "Romain",
    photo: roroPhoto,
    alt: "Portrait de Romain Gamain",
    socials: [
      {
        owner: "Romain",
        label: "YouTube",
        href: "https://www.youtube.com/@romaingamain",
        icon: "youtube",
      },
      {
        owner: "Romain",
        label: "Instagram",
        href: "https://www.instagram.com/chezgamain/",
        icon: "instagram",
      },
      {
        owner: "Romain",
        label: "TikTok",
        href: "https://www.tiktok.com/@chezgamain",
        icon: "tiktok",
      },
    ],
  },
};

const backgroundImages: Record<string, string> = {
  "aya-korn": imageAyaKorn,
};

const youtubeWatchUrl = (youtubeId: string) =>
  `https://www.youtube.com/watch?v=${youtubeId}`;
const youtubeEmbedUrl = (youtubeId: string) =>
  `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`;
const youtubeThumbnailUrl = (youtubeId: string) =>
  `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

const getProcessItem = (items: ProcessItem[], slug?: string) =>
  items.find((item) => getProcessVideoSlug(item) === slug) ?? items[0];

const getProcessLinks = (content: ProcessItem): ProcessLink[] =>
  content.landing?.links ?? [
    {
      label: "Voir sur YouTube",
      href: youtubeWatchUrl(content.youtubeId),
      platform: "youtube",
      isPrimary: true,
    },
  ];

const getProcessVideos = (content: ProcessItem): ProcessVideo[] =>
  content.landing?.videos ?? [
    {
      label: "Video",
      title: content.song,
      youtubeId: content.youtubeId,
    },
  ];

const getProfiles = (content: ProcessItem) =>
  (content.landing?.profileIds ?? ["ferd"])
    .map((profileId) => profileRegistry[profileId])
    .filter(Boolean);

const getContentYear = (date: string) =>
  date.match(/\b\d{4}\b/)?.[0] ?? date;

const categoryRoles: Record<ProcessCategory, string> = {
  projects: "Réalisation",
  mashups: "Mashup & production",
  videos: "Réalisation",
  matos: "Test & production",
  music: "Production musicale",
};

const platformIcon = (platform: Platform) => {
  switch (platform) {
    case "spotify":
      return <SpotifyLogo weight="fill" />;
    case "youtube":
    case "youtubeMusic":
      return <YoutubeLogo weight="fill" />;
    case "apple":
    case "deezer":
      return <MusicNotes weight="fill" />;
  }
};

const socialIcon = (icon: SocialLink["icon"]) => {
  switch (icon) {
    case "instagram":
      return <InstagramLogo weight="fill" />;
    case "tiktok":
      return <TiktokLogo weight="fill" />;
    case "youtube":
      return <YoutubeLogo weight="fill" />;
    case "facebook":
      return <FacebookLogo weight="fill" />;
  }
};

const getDeepLink = (
  platform: Platform,
  href: string,
  isAndroid: boolean,
  isIOS: boolean,
) => {
  if (platform === "spotify") {
    const match = href.match(
      /open\.spotify\.com\/(track|album|artist)\/([a-zA-Z0-9]+)/,
    );
    return match ? `spotify:${match[1]}:${match[2]}` : null;
  }

  if (platform === "deezer") {
    const match = href.match(
      /deezer\.com\/(?:[a-z]{2}\/)?(track|album|artist)\/(\d+)/,
    );
    if (!match) {
      return null;
    }

    if (isAndroid) {
      return `intent://www.deezer.com/${match[1]}/${match[2]}#Intent;scheme=https;package=deezer.android.app;end`;
    }

    return `deezer://www.deezer.com/${match[1]}/${match[2]}`;
  }

  if (platform === "apple" && isIOS) {
    return href.replace(/^https?:\/\//, "music://");
  }

  if (platform === "youtube") {
    const watchMatch = href.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    const shortMatch = href.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    const videoId = watchMatch?.[1] ?? shortMatch?.[1];
    return videoId ? `vnd.youtube://${videoId}` : null;
  }

  if (platform === "youtubeMusic") {
    const watchMatch = href.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (!watchMatch) {
      return null;
    }

    if (isAndroid) {
      return `intent://music.youtube.com/watch?v=${watchMatch[1]}#Intent;scheme=https;package=com.google.android.apps.youtube.music;end`;
    }

    return `youtubemusic://watch?v=${watchMatch[1]}`;
  }

  return null;
};

const ProcessLinkButton = ({ link }: { link: ProcessLink }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isMobile = isAndroid || isIOS;

    if (!isMobile) {
      return;
    }

    const deepLink = getDeepLink(link.platform, link.href, isAndroid, isIOS);
    if (!deepLink) {
      return;
    }

    event.preventDefault();
    window.location.href = deepLink;

    window.setTimeout(() => {
      window.location.href = link.href;
    }, 900);
  };

  return (
    <ActionLink
      variant={link.isPrimary ? "text" : "secondary"}
      href={link.href}
      external
      fullWidth={!link.isPrimary}
      onClick={handleClick}
      icon={
        link.isPrimary ? <Play weight="fill" /> : platformIcon(link.platform)
      }
      iconPosition="start"
    >
      {link.label}
    </ActionLink>
  );
};

const MediaDetailPage = () => {
  useScrollReveal(
    ".media-detail__intro, .media-detail__content, .media-detail__social-group",
  );
  const { slug } = useParams();
  const { pathname } = useLocation();
  const category: ProcessCategory = pathname.startsWith("/projets/")
    ? "projects"
    : pathname.startsWith("/music-production/")
      ? "music"
      : pathname.startsWith("/videos/")
        ? "videos"
        : pathname.startsWith("/matos/")
          ? "matos"
          : "mashups";
  const categoryConfig = categories[category];
  const content = getProcessItem(categoryConfig.items, slug);
  const contentTitle = content.landing?.title ?? content.song;
  const contentArtist = content.landing?.artist ?? content.artist;
  const backgroundImage =
    backgroundImages[content.slug ?? ""] ??
    youtubeThumbnailUrl(content.youtubeId);
  const profiles = getProfiles(content);
  const links = getProcessLinks(content);
  const videos = getProcessVideos(content);

  return (
    <main
      id="main-content"
      className="media-detail"
      style={
        {
          "--media-detail-bg-image": `url(${backgroundImage})`,
        } as React.CSSProperties
      }
    >
      <SiteHeader universe={categoryConfig.universe} />
      <Container
        as="section"
        className="media-detail__shell"
        ariaLabel={contentTitle}
      >
        <ActionLink
          variant="nav"
          to={categoryConfig.listPath}
          icon={<ArrowLeft weight="bold" />}
          iconPosition="start"
        >
          Retour à la liste
        </ActionLink>
        <header className="media-detail__intro">
          <div>
            <p>
              {content.styles?.join(" · ") ??
                content.landing?.kicker ??
                categoryConfig.kicker}
              {" · "}
              {getContentYear(content.date)}
            </p>
            <h1>
              <span>{contentArtist}</span>
              {contentTitle}
            </h1>
          </div>
          <dl>
            <div>
              <dt>Artiste</dt>
              <dd>{contentArtist}</dd>
            </div>
            <div>
              <dt>Projet</dt>
              <dd>{contentTitle}</dd>
            </div>
            <div>
              <dt>Mon rôle</dt>
              <dd>{content.role ?? categoryRoles[category]}</dd>
            </div>
          </dl>
        </header>

        <section className="media-detail__content" aria-label="Vidéo et liens">
          <div className="media-detail__featured-videos">
            {videos.map((video) => (
              <article
                className="media-detail__video-feature"
                key={video.youtubeId}
              >
                <p>{video.label}</p>
                <div className="media-detail__video">
                  <iframe
                    loading="lazy"
                    src={youtubeEmbedUrl(video.youtubeId)}
                    title={video.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="media-detail__links" aria-label="Streaming links">
            {links.map((link) => (
              <ProcessLinkButton
                key={`${link.platform}-${link.href}`}
                link={link}
              />
            ))}
          </div>
        </section>

        {content.description || content.directorNote ? (
          <div className="media-detail__copy">
            {content.description ? (
              <section>
                <p className="media-detail__label">Le projet</p>
                <h2>À propos</h2>
                <p>{content.description}</p>
              </section>
            ) : null}
            {content.directorNote ? (
              <section>
                <p className="media-detail__label">Note</p>
                <h2>Un mot sur le projet</h2>
                <p>{content.directorNote}</p>
              </section>
            ) : null}
          </div>
        ) : null}

        {content.behindTheScenesYoutubeId ? (
          <section className="media-detail__extra">
            <p className="media-detail__label">Coulisses</p>
            <h2>Behind the scenes</h2>
            <div className="media-detail__video">
              <iframe
                src={youtubeEmbedUrl(content.behindTheScenesYoutubeId)}
                title={`Coulisses de ${contentTitle}`}
                allowFullScreen
              />
            </div>
          </section>
        ) : null}

        {content.credits?.length ? (
          <section className="media-detail__credits">
            <p className="media-detail__label">Équipe</p>
            <h2>Crédits</h2>
            <dl>
              {content.credits.map((credit) => (
                <div key={`${credit.role}-${credit.name}`}>
                  <dt>{credit.role}</dt>
                  <dd>{credit.name}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <section className="media-detail__socials" aria-label="Social links">
          {profiles.map((profile) => (
            <div className="media-detail__social-group" key={profile.id}>
              <img src={profile.photo} alt={profile.alt} loading="lazy" />
              <p>{profile.name}</p>
              <div>
                {profile.socials.map((social) => (
                  <ActionLink
                    key={`${social.owner}-${social.label}`}
                    variant="icon-bubble"
                    href={social.href}
                    external
                    icon={socialIcon(social.icon)}
                    iconPosition="start"
                    tone={social.icon}
                    ariaLabel={`${social.owner} ${social.label}`}
                  >
                    {social.label}
                  </ActionLink>
                ))}
              </div>
            </div>
          ))}
        </section>
      </Container>
      {category === "projects" ? <FilmsFooter /> : null}
    </main>
  );
};

export default MediaDetailPage;
