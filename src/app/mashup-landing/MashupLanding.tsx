import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FacebookLogo,
  InstagramLogo,
  MusicNotes,
  Play,
  SpotifyLogo,
  TiktokLogo,
  YoutubeLogo,
} from "phosphor-react";
import funnyMashupList from "@/data/funnyMashupList.json";
import ferdPhoto from "./ferd.jpg";
import imageAyaKorn from "./imageAyaKorn.png";
import roroPhoto from "./roro.jpg";
import "./MashupLanding.css";

type Platform = "spotify" | "apple" | "deezer" | "youtubeMusic" | "youtube";

type ReleaseLink = {
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

type FeaturedVideo = {
  label: string;
  title: string;
  youtubeId: string;
};

type MashupItem = {
  artist: string;
  song: string;
  slug: string;
  date: string;
  youtubeId: string;
  landing?: {
    artist?: string;
    title?: string;
    kicker?: string;
    profileIds?: string[];
    videos?: FeaturedVideo[];
    links?: ReleaseLink[];
  };
};

const mashups = funnyMashupList as MashupItem[];

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

const youtubeWatchUrl = (youtubeId: string) => `https://www.youtube.com/watch?v=${youtubeId}`;
const youtubeEmbedUrl = (youtubeId: string) => `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`;
const youtubeThumbnailUrl = (youtubeId: string) => `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

const getRelease = (slug?: string) => mashups.find((mashup) => mashup.slug === slug) ?? mashups[0];

const getReleaseLinks = (release: MashupItem): ReleaseLink[] =>
  release.landing?.links ?? [
    {
      label: "Voir sur YouTube",
      href: youtubeWatchUrl(release.youtubeId),
      platform: "youtube",
      isPrimary: true,
    },
  ];

const getReleaseVideos = (release: MashupItem): FeaturedVideo[] =>
  release.landing?.videos ?? [
    {
      label: "Video",
      title: release.song,
      youtubeId: release.youtubeId,
    },
  ];

const getProfiles = (release: MashupItem) =>
  (release.landing?.profileIds ?? ["ferd"])
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

const getDeepLink = (platform: Platform, href: string, isAndroid: boolean, isIOS: boolean) => {
  if (platform === "spotify") {
    const match = href.match(/open\.spotify\.com\/(track|album|artist)\/([a-zA-Z0-9]+)/);
    return match ? `spotify:${match[1]}:${match[2]}` : null;
  }

  if (platform === "deezer") {
    const match = href.match(/deezer\.com\/(?:[a-z]{2}\/)?(track|album|artist)\/(\d+)/);
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

const ReleaseButton = ({ link }: { link: ReleaseLink }) => {
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
    <a
      className={link.isPrimary ? "mashup-button mashup-button-primary" : "mashup-button"}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <span className="mashup-button-icon" aria-hidden="true">
        {link.isPrimary ? <Play weight="fill" /> : platformIcon(link.platform)}
      </span>
      <span>{link.label}</span>
    </a>
  );
};

const MashupLanding = () => {
  const { slug } = useParams();
  const release = getRelease(slug);
  const releaseTitle = release.landing?.title ?? release.song;
  const releaseArtist = release.landing?.artist ?? release.artist;
  const backgroundImage = backgroundImages[release.slug] ?? youtubeThumbnailUrl(release.youtubeId);
  const profiles = getProfiles(release);
  const links = getReleaseLinks(release);
  const videos = getReleaseVideos(release);

  useEffect(() => {
    document.title = `${releaseTitle} | ${releaseArtist}`;
  }, [releaseArtist, releaseTitle]);

  return (
    <main
      className="mashup-page"
      style={{ "--mashup-bg-image": `url(${backgroundImage})` } as React.CSSProperties}
    >
      <section className="mashup-shell" aria-label={releaseTitle}>
        <header className="mashup-hero">
          <p className="mashup-kicker">{release.landing?.kicker ?? "Mashup"}</p>
          <h1>{releaseTitle}</h1>
          <p className="mashup-artist">{releaseArtist}</p>
        </header>

        <section className="mashup-release-card" aria-label="Release video and links">
          <div className="mashup-featured-videos">
            {videos.map((video) => (
              <article className="mashup-video-feature" key={video.youtubeId}>
                <p>{video.label}</p>
                <div className="mashup-video">
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

          <div className="mashup-links" aria-label="Streaming links">
            {links.map((link) => (
              <ReleaseButton key={`${link.platform}-${link.href}`} link={link} />
            ))}
          </div>
        </section>

        <section className="mashup-socials" aria-label="Social links">
          {profiles.map((profile) => (
            <div className="mashup-social-group" key={profile.id}>
              <img src={profile.photo} alt={profile.alt} loading="lazy" />
              <p>{profile.name}</p>
              <div>
                {profile.socials.map((social) => (
                  <a
                    key={`${social.owner}-${social.label}`}
                    className={`mashup-social mashup-social-${social.icon}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.owner} ${social.label}`}
                  >
                    {socialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
};

export default MashupLanding;
