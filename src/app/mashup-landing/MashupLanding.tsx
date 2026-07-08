import { useEffect } from "react";
import {
  FacebookLogo,
  InstagramLogo,
  MusicNotes,
  Play,
  SpotifyLogo,
  TiktokLogo,
  YoutubeLogo,
} from "phosphor-react";
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
  name: string;
  photo: string;
  alt: string;
};

const release = {
  artist: "Ferd x Romain Gamain",
  title: "Djadja - Aya Nakamura Version Korn",
  kicker: "Mashup release",
  subtitle: "Le mashup metal/pop par Ferd et Romain Gamain, avec le clip complet et les liens streaming.",
  videoEmbedUrl: "https://www.youtube-nocookie.com/embed/wgUIkQ0wJR0?rel=0",
  videoTitle: "Djadja - Aya Nakamura Version Korn",
  backgroundImage: imageAyaKorn,
  links: [
    {
      label: "Voir le clip complet",
      href: "https://youtu.be/wgUIkQ0wJR0",
      platform: "youtube",
      isPrimary: true,
    },
    {
      label: "Ecouter sur Spotify",
      href: "https://open.spotify.com/album/14uJMMjwiQeKTBi0QeWPso",
      platform: "spotify",
    },
    {
      label: "Ecouter sur Apple Music",
      href: "http://itunes.apple.com/album/id/6787368672",
      platform: "apple",
    },
    {
      label: "Ecouter sur Deezer",
      href: "https://www.deezer.com/fr/album/1020834781",
      platform: "deezer",
    },
    {
      label: "Behind the scenes",
      href: "https://youtu.be/todo",
      platform: "youtube",
    },
  ] satisfies ReleaseLink[],
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
  ] satisfies SocialLink[],
  profiles: [
    {
      name: "Ferd",
      photo: ferdPhoto,
      alt: "Portrait de Ferd",
    },
    {
      name: "Romain",
      photo: roroPhoto,
      alt: "Portrait de Romain Gamain",
    },
  ] satisfies ArtistProfile[],
};

const socialGroups = release.socials.reduce<Record<string, SocialLink[]>>((groups, social) => {
  groups[social.owner] = [...(groups[social.owner] ?? []), social];
  return groups;
}, {});

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
  useEffect(() => {
    document.title = `${release.title} | ${release.artist}`;
  }, []);

  return (
    <main
      className="mashup-page"
      style={{ "--mashup-bg-image": `url(${release.backgroundImage})` } as React.CSSProperties}
    >
      <section className="mashup-shell" aria-label={release.title}>
        <header className="mashup-hero">
          <p className="mashup-kicker">{release.kicker}</p>
          <h1>{release.title}</h1>
          <p className="mashup-artist">{release.artist}</p>
          <p className="mashup-subtitle">{release.subtitle}</p>
        </header>

        <section className="mashup-release-card" aria-label="Release video and links">
          <div className="mashup-video">
            <iframe
              loading="lazy"
              src={release.videoEmbedUrl}
              title={release.videoTitle}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mashup-links" aria-label="Streaming links">
            {release.links.map((link) => (
              <ReleaseButton key={`${link.platform}-${link.label}`} link={link} />
            ))}
          </div>
        </section>

        <section className="mashup-socials" aria-label="Social links">
          {release.profiles.map((profile) => (
            <div className="mashup-social-group" key={profile.name}>
              <img src={profile.photo} alt={profile.alt} loading="lazy" />
              <p>{profile.name}</p>
              <div>
                {(socialGroups[profile.name] ?? []).map((social) => (
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
