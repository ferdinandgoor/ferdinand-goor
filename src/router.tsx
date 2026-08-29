import { useEffect, type ReactNode } from "react";
import {
  createBrowserRouter,
  redirect,
  useLocation,
  type RouteObject,
} from "react-router-dom";
import VideoListPage from "./app/video-list-page/VideoListPage";
import LinksLanding from "./app/links-landing/LinksLanding";
import MediaDetailPage from "./app/media-detail/MediaDetailPage";
import ClipServiceLanding from "./app/clip-service-landing/ClipServiceLanding";
import TermsPage from "./app/legal/TermsPage";
import FilmsSeoLanding from "./app/films-seo/FilmsSeoLanding";
import DevelopmentLanding from "./app/development-landing/DevelopmentLanding";
import DevelopmentCaseStudy from "./app/development-case-study/DevelopmentCaseStudy";
import bigYoutubeVideoList from "./data/bigYoutubeVideoList.json";
import funnyMashupList from "./data/funnyMashupList.json";
import gearYoutubeVideoList from "./data/gearYoutubeVideoList.json";
import musicVideoList from "./data/musicVideoList.json";
import musicProductionList from "./data/musicProductionList.json";
import SeoManager from "./components/SeoManager";
import CookieConsent from "./components/cookie-consent/CookieConsent";

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        document.querySelector(hash)?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, left: 0 });
    return;
  }, [pathname, hash]);

  return (
    <>
      <SeoManager />
      {children}
      <CookieConsent />
    </>
  );
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ScrollToTop>
        <ClipServiceLanding />
      </ScrollToTop>
    ),
  },
  {
    path: "/video",
    loader: () => redirect("/projets"),
  },
  {
    path: "/music-videos",
    loader: () => redirect("/projets"),
  },
  {
    path: "/music",
    loader: () => redirect("/music-production"),
  },
  {
    path: "/youtube",
    loader: () => redirect("/youtube-videos"),
  },
  {
    path: "/projets",
    element: (
      <ScrollToTop>
        <VideoListPage
          title="Projets de clips musicaux de Ferd"
          list={musicVideoList}
          linkMode="project"
          universe="films"
          backTo="/"
          backLabel="Retour à l’accueil"
          showFilmsFooter
        />
      </ScrollToTop>
    ),
  },
  {
    path: "/projets/:slug",
    element: (
      <ScrollToTop>
        <MediaDetailPage />
      </ScrollToTop>
    ),
  },
  {
    path: "/realisations/:slug",
    loader: ({ params }) => redirect(`/projets/${params.slug}`),
  },
  {
    path: "/realisations",
    loader: () => redirect("/projets"),
  },
  {
    path: "/music-production",
    element: (
      <ScrollToTop>
        <VideoListPage
          title="Productions musicales de Ferd"
          list={musicProductionList}
          linkMode="music"
          universe="process"
          backTo="/process"
          backLabel="Retour à FERD Process"
        />
      </ScrollToTop>
    ),
  },
  {
    path: "/music-production/:slug",
    element: (
      <ScrollToTop>
        <MediaDetailPage />
      </ScrollToTop>
    ),
  },
  {
    path: "/youtube-videos",
    loader: () => redirect("/videos"),
  },
  {
    path: "/mashups",
    element: (
      <ScrollToTop>
        <VideoListPage
          title="Mashups de FERD Process"
          list={funnyMashupList}
          linkMode="mashup"
          universe="process"
          backTo="/process"
          backLabel="Retour à FERD Process"
          playlist={{
            href: "https://www.youtube.com/playlist?list=PLTGarG5bkXoA",
            label: "Playlist des mashups",
          }}
        />
      </ScrollToTop>
    ),
  },
  {
    path: "/videos",
    element: (
      <ScrollToTop>
        <VideoListPage
          title="Vidéos longues de FERD Process"
          list={bigYoutubeVideoList}
          linkMode="video"
          universe="process"
          backTo="/process"
          backLabel="Retour à FERD Process"
          playlist={{
            href: "https://www.youtube.com/playlist?list=PLOGfm0l52k3g",
            label: "Playlist des vidéos longues",
          }}
        />
      </ScrollToTop>
    ),
  },
  {
    path: "/matos",
    element: (
      <ScrollToTop>
        <VideoListPage
          title="Tests de matériel de FERD Process"
          list={gearYoutubeVideoList}
          linkMode="gear"
          universe="process"
          backTo="/process"
          backLabel="Retour à FERD Process"
          playlist={{
            href: "https://www.youtube.com/playlist?list=PLOvnmxmjrjv4",
            label: "Playlist matos et production",
          }}
        />
      </ScrollToTop>
    ),
  },
  {
    path: "/videos/:slug",
    element: (
      <ScrollToTop>
        <MediaDetailPage />
      </ScrollToTop>
    ),
  },
  {
    path: "/matos/:slug",
    element: (
      <ScrollToTop>
        <MediaDetailPage />
      </ScrollToTop>
    ),
  },
  {
    path: "/aya-korn",
    loader: () => redirect("/mashups/aya-korn"),
  },
  {
    path: "/mashups/:slug",
    element: (
      <ScrollToTop>
        <MediaDetailPage />
      </ScrollToTop>
    ),
  },
  {
    path: "/films/:slug",
    element: (
      <ScrollToTop>
        <FilmsSeoLanding />
      </ScrollToTop>
    ),
  },
  {
    path: "/realisateur-clip-nantes",
    element: (
      <ScrollToTop>
        <ClipServiceLanding />
      </ScrollToTop>
    ),
  },
  {
    path: "/developpeur-freelance",
    element: (
      <ScrollToTop>
        <DevelopmentLanding />
      </ScrollToTop>
    ),
  },
  {
    path: "/developpeur-freelance/projets/genesia",
    element: (
      <ScrollToTop>
        <DevelopmentCaseStudy />
      </ScrollToTop>
    ),
  },
  {
    path: "/cgv",
    element: (
      <ScrollToTop>
        <TermsPage />
      </ScrollToTop>
    ),
  },
  {
    path: "/process",
    element: (
      <ScrollToTop>
        <LinksLanding />
      </ScrollToTop>
    ),
  },
  {
    path: "/links",
    loader: () => redirect("/process"),
  },
  {
    path: "*",
    loader: () => redirect("/projets"),
  },
];

export const createRouter = () => createBrowserRouter(routes);
