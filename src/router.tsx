import { useEffect, type ReactNode } from "react";
import {
  createBrowserRouter,
  redirect,
  useLocation,
  type RouteObject,
} from "react-router-dom";
import { MusicNote, VideoCamera, YoutubeLogo } from "phosphor-react";
import Home from "./app/page";
import LinksLanding from "./app/links-landing/LinksLanding";
import MashupLanding from "./app/mashup-landing/MashupLanding";
import ClipServiceLanding from "./app/clip-service-landing/ClipServiceLanding";
import TermsPage from "./app/legal/TermsPage";
import ProjectDetailPage from "./app/project-detail/ProjectDetailPage";
import FilmsSeoLanding from "./app/films-seo/FilmsSeoLanding";
import bigYoutubeVideoList from "./data/bigYoutubeVideoList.json";
import funnyMashupList from "./data/funnyMashupList.json";
import gearYoutubeVideoList from "./data/gearYoutubeVideoList.json";
import musicVideoList from "./data/musicVideoList.json";
import musicProductionList from "./data/musicProductionList.json";
import SeoManager from "./components/SeoManager";
import CookieConsent from "./components/cookie-consent/CookieConsent";

export type TabHandle = {
  id: number;
  label: string;
  icon: ReactNode;
  video: string;
  path: string;
  headerImage: string;
  headerSubtitle: string;
};

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

export const tabs: TabHandle[] = [
  {
    id: 0,
    label: "Projets",
    icon: <VideoCamera size={24} />,
    video: "overfloodedLight.mp4",
    path: "/projets",
    headerImage: "/video.webp",
    headerSubtitle: "I make music videos\nfor cool artists",
  },
  {
    id: 1,
    label: "Music Production",
    icon: <MusicNote size={24} />,
    video: "overfloodedLight.mp4",
    path: "/music-production",
    headerImage: "/music.webp",
    headerSubtitle: "I produce music\nfor cool artists",
  },
  {
    id: 2,
    label: "YouTube Videos",
    icon: <YoutubeLogo size={24} />,
    video: "artificialafter.mp4",
    path: "/youtube-videos",
    headerImage: "/youtube.webp",
    headerSubtitle: "I make content\nfor YouTube",
  },
];

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
        <Home />
      </ScrollToTop>
    ),
    loader: () => ({ list: musicVideoList }),
    handle: tabs[0],
  },
  {
    path: "/projets/:slug",
    element: (
      <ScrollToTop>
        <ProjectDetailPage />
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
        <Home />
      </ScrollToTop>
    ),
    loader: () => ({ list: musicProductionList }),
    handle: tabs[1],
  },
  {
    path: "/youtube-videos",
    element: (
      <ScrollToTop>
        <Home />
      </ScrollToTop>
    ),
    loader: () => ({
      sections: [
        {
          title: "Grosses vidéos",
          list: bigYoutubeVideoList,
        },
        {
          title: "Mashups fun",
          list: funnyMashupList,
        },
        {
          title: "Matos et production",
          list: gearYoutubeVideoList,
        },
      ],
    }),
    handle: tabs[2],
  },
  {
    path: "/aya-korn",
    loader: () => redirect("/mashups/aya-korn"),
  },
  {
    path: "/mashups/:slug",
    element: (
      <ScrollToTop>
        <MashupLanding />
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
