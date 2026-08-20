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
import { getProcessVideoSlug } from "@/utils/projectSlug";
import useScrollReveal from "@/hooks/useScrollReveal";
import SiteHeader from "@/components/site-header/SiteHeader";
import ferdPhoto from "../mashup-landing/ferd.jpg";
import imageAyaKorn from "../mashup-landing/imageAyaKorn.webp";
import roroPhoto from "../mashup-landing/roro.jpg";
import "./ProcessDetailPage.scss";
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

type ProcessCategory = "mashups" | "videos" | "matos";

const categories: Record<
  ProcessCategory,
  { items: ProcessItem[]; kicker: string }
> = {
  mashups: { items: mashups, kicker: "Mashup" },
  videos: { items: longVideos, kicker: "Vidéo longue" },
  matos: { items: gearVideos, kicker: "Matos et production" },
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
      variant={link.isPrimary ? "primary" : "secondary"}
      href={link.href}
      external
      fullWidth
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

const ProcessDetailPage = () => {
  useScrollReveal(
    ".process-detail__hero, .process-detail__content, .process-detail__social-group",
  );
  const { slug } = useParams();
  const { pathname } = useLocation();
  const category: ProcessCategory = pathname.startsWith("/videos/")
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
      className="process-detail"
      style={
        {
          "--process-detail-bg-image": `url(${backgroundImage})`,
        } as React.CSSProperties
      }
    >
      <SiteHeader universe="process" />
      <section className="process-detail__shell" aria-label={contentTitle}>
        <ActionLink
          variant="nav"
          to={`/${category}`}
          icon={<ArrowLeft weight="bold" />}
          iconPosition="start"
        >
          Retour à la liste
        </ActionLink>
        <header className="process-detail__hero">
          <p className="process-detail__kicker">
            {content.landing?.kicker ?? categoryConfig.kicker}
          </p>
          <h1>{contentTitle}</h1>
          <p className="process-detail__artist">{contentArtist}</p>
        </header>

        <section
          className="process-detail__content"
          aria-label="Vidéo et liens"
        >
          <div className="process-detail__featured-videos">
            {videos.map((video) => (
              <article
                className="process-detail__video-feature"
                key={video.youtubeId}
              >
                <p>{video.label}</p>
                <div className="process-detail__video">
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

          <div className="process-detail__links" aria-label="Streaming links">
            {links.map((link) => (
              <ProcessLinkButton
                key={`${link.platform}-${link.href}`}
                link={link}
              />
            ))}
          </div>
        </section>

        <section className="process-detail__socials" aria-label="Social links">
          {profiles.map((profile) => (
            <div className="process-detail__social-group" key={profile.id}>
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
      </section>
    </main>
  );
};

export default ProcessDetailPage;
