import funnyMashupList from "./data/funnyMashupList.json";
import musicVideoListData from "./data/musicVideoList.json";
import type Video from "./types/Video";
import { getProjectSlug } from "./utils/projectSlug";
import { filmLandingPages, filmProjects, getFilmLandingPage, showreel, youtubeThumbnail } from "./data/films";

const musicVideoList = musicVideoListData as Video[];

export const siteConfig = {
  name: "Ferd",
  url: "https://ferd.fr",
  language: "fr",
  locale: "fr_FR",
  defaultTitle: "Réalisateur Clip Musical Nantes | FERD FILMS",
  defaultDescription:
    "Réalisation de clips musicaux à Nantes et partout en France. Concept, tournage et post-production pour artistes et groupes indépendants.",
  logo: "/ferd_logo_3.png",
  email: "ferdofficial@gmail.com",
  profiles: [
    "https://www.youtube.com/@ferd.process",
    "https://www.instagram.com/ferd.process",
    "https://www.tiktok.com/@ferd.process",
    "https://open.spotify.com/artist/15Z2HnTByQHjpyLZrHB3vs",
  ],
} as const;

export type SeoData = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: "website" | "video.other";
};

const staticPages: Record<string, Omit<SeoData, "canonical">> = {
  "/": {
    title: "Réalisateur Clip Musical Nantes | FERD FILMS",
    description:
      "Réalisation de clips musicaux à Nantes et partout en France. Concept, tournage et post-production pour artistes et groupes indépendants.",
    image: "/video.webp",
    type: "website",
  },
  "/projets": {
    title: "Projets de clips musicaux | FERD FILMS",
    description:
      "Découvrez les clips musicaux réalisés par Ferd pour des artistes, avec une sélection de vidéos à regarder.",
    image: "/video.webp",
    type: "website",
  },
  "/music-production": {
    title: "Musique et productions | FERD Process",
    description:
      "Écoutez les morceaux, productions musicales et expérimentations publiés dans l’univers FERD Process.",
    image: "/music.webp",
    type: "website",
  },
  "/youtube-videos": {
    title: "Vidéos YouTube, mashups et matériel | FERD Process",
    description:
      "Retrouvez les vidéos longues, mashups et contenus consacrés au matériel et à la production publiés par Ferd.",
    image: "/youtube.webp",
    type: "website",
  },
  "/process": {
    title: "FERD Process | Vidéos, mashups et expérimentations",
    description:
      "Suivez FERD Process : mashups, vidéos YouTube, musique, matériel, coulisses et expérimentations créatives.",
    image: "/ferd_logo_3.png",
    type: "website",
  },
  "/realisateur-clip-nantes": {
    title: "FERD FILMS | Réalisation de clips à Nantes",
    description:
      "Découvrez FERD FILMS, réalisateur de clips basé près de Nantes, et parlons de votre prochain projet musical.",
    image: "/video.webp",
    type: "website",
  },
  "/cgv": {
    title: "Conditions générales de vente | FERD FILMS",
    description:
      "Consultez les conditions générales applicables aux prestations de réalisation et de production audiovisuelle FERD FILMS.",
    image: "/ferd_logo_3.png",
    type: "website",
  },
};

const normalizePath = (pathname: string) => {
  const normalized = pathname.split(/[?#]/, 1)[0].replace(/\/+$/, "");
  return normalized || "/";
};

export const absoluteUrl = (value: string) =>
  value.startsWith("http") ? value : `${siteConfig.url}${value}`;

export function getSeoData(pathname: string): SeoData {
  const path = normalizePath(pathname);
  const filmsSlug = path.startsWith("/films/") ? path.slice("/films/".length) : "";
  const filmsPage = getFilmLandingPage(filmsSlug);
  if (filmsPage) {
    return {
      title: filmsPage.title,
      description: filmsPage.metaDescription,
      canonical: absoluteUrl(path),
      image: youtubeThumbnail(filmsPage.featuredProjects.length ? filmProjects.find((project) => project.slug === filmsPage.featuredProjects[0])?.youtubeId ?? showreel.youtubeId : showreel.youtubeId),
      type: "website",
    };
  }
  const staticPage = staticPages[path];
  if (staticPage) {
    return {
      ...staticPage,
      canonical: absoluteUrl(path === "/realisateur-clip-nantes" ? "/" : path),
    };
  }

  const slug = path.startsWith("/mashups/") ? path.slice("/mashups/".length) : "";
  const mashup = funnyMashupList.find((item) => item.slug === slug);
  if (mashup) {
    const title = mashup.landing?.title ?? mashup.song;
    const artist = mashup.landing?.artist ?? mashup.artist;
    return {
      title: `${title} | FERD Process`,
      description: `Regardez ${title}, ${mashup.landing?.kicker?.toLowerCase() ?? "mashup"} de ${artist}, et retrouvez ses liens vidéo et musique.`,
      canonical: absoluteUrl(path),
      image: `https://i.ytimg.com/vi/${mashup.youtubeId}/maxresdefault.jpg`,
      type: "video.other",
    };
  }

  const projectSlug = path.startsWith("/projets/") ? path.slice("/projets/".length) : "";
  const project = musicVideoList.find((item) => getProjectSlug(item) === projectSlug);
  if (project) {
    return {
      title: `${project.artist} — ${project.song} | FERD FILMS`,
      description: project.description || `Découvrez le clip ${project.song} de ${project.artist}, réalisé par FERD FILMS.`,
      canonical: absoluteUrl(path),
      image: `https://i.ytimg.com/vi/${project.youtubeId}/maxresdefault.jpg`,
      type: "video.other",
    };
  }

  return {
    ...staticPages["/"],
    canonical: absoluteUrl(path),
  };
}

export function getStructuredData(pathname: string, seo = getSeoData(pathname)) {
  const path = normalizePath(pathname);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: absoluteUrl(siteConfig.logo),
      email: `mailto:${siteConfig.email}`,
      sameAs: siteConfig.profiles,
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteConfig.url}/#films`,
      name: "FERD FILMS",
      url: `${siteConfig.url}/`,
      logo: absoluteUrl(siteConfig.logo),
      image: absoluteUrl(seo.image),
      email: siteConfig.email,
      telephone: "+33651609666",
      address: {
        "@type": "PostalAddress",
        streetAddress: "173 chemin du Printemps",
        postalCode: "44800",
        addressLocality: "Saint-Herblain",
        addressCountry: "FR",
      },
      areaServed: "France",
      priceRange: "À partir de 850 €",
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: `${siteConfig.url}/`,
      name: siteConfig.name,
      inLanguage: siteConfig.language,
      publisher: { "@id": `${siteConfig.url}/#person` },
    },
    {
      "@type": "WebPage",
      "@id": `${seo.canonical}#webpage`,
      url: seo.canonical,
      name: seo.title,
      description: seo.description,
      inLanguage: siteConfig.language,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#person` },
    },
  ];

  const filmsSlug = path.startsWith("/films/") ? path.slice("/films/".length) : "";
  const filmsPage = getFilmLandingPage(filmsSlug);
  if (filmsPage) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "FERD", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Films", item: `${siteConfig.url}/films/realisation-clip-musical` },
        { "@type": "ListItem", position: 3, name: filmsPage.city ? `Clip vidéo ${filmsPage.city}` : filmsPage.h1, item: seo.canonical },
      ],
    });
  } else if (path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: `${siteConfig.url}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: seo.title,
          item: seo.canonical,
        },
      ],
    });
  }

  const featuredSlugs = filmsPage?.featuredProjects ?? (path === "/" ? filmProjects.slice(0, 6).map((project) => project.slug) : []);
  if (path === "/" || filmsPage) {
    graph.push({
      "@type": "VideoObject",
      name: showreel.title,
      description: showreel.description,
      thumbnailUrl: youtubeThumbnail(showreel.youtubeId),
      uploadDate: showreel.uploadDate,
      embedUrl: `https://www.youtube-nocookie.com/embed/${showreel.youtubeId}`,
      contentUrl: `https://www.youtube.com/watch?v=${showreel.youtubeId}`,
    });
    featuredSlugs.forEach((slug) => {
      const project = filmProjects.find((item) => item.slug === slug);
      if (!project) return;
      graph.push({
        "@type": "VideoObject",
        name: `${project.artist} — ${project.title}`,
        description: project.description,
        thumbnailUrl: youtubeThumbnail(project.youtubeId),
        uploadDate: project.uploadDate,
        embedUrl: `https://www.youtube-nocookie.com/embed/${project.youtubeId}`,
        contentUrl: `https://www.youtube.com/watch?v=${project.youtubeId}`,
      });
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export const filmSeoRoutes = filmLandingPages.map((page) => `/films/${page.slug}`);
