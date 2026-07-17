import type { ReactNode } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import { MusicNote, VideoCamera, YoutubeLogo } from "phosphor-react";
import Home from "./app/page";
import LinksLanding from "./app/links-landing/LinksLanding";
import MashupLanding from "./app/mashup-landing/MashupLanding";
import bigYoutubeVideoList from "./data/bigYoutubeVideoList.json";
import funnyMashupList from "./data/funnyMashupList.json";
import gearYoutubeVideoList from "./data/gearYoutubeVideoList.json";
import musicVideoList from "./data/musicVideoList.json";
import musicProductionList from "./data/musicProductionList.json";

export type TabHandle = {
  id: number;
  label: string;
  icon: ReactNode;
  video: string;
  path: string;
  headerImage: string;
  headerSubtitle: string;
};

export const tabs: TabHandle[] = [
  {
    id: 0,
    label: "Music Videos",
    icon: <VideoCamera size={24} />,
    video: "overfloodedLight.mp4",
    path: "/music-videos",
    headerImage: "/video.png",
    headerSubtitle: "I make music videos\nfor cool artists",
  },
  {
    id: 1,
    label: "Music Production",
    icon: <MusicNote size={24} />,
    video: "overfloodedLight.mp4",
    path: "/music-production",
    headerImage: "/music.png",
    headerSubtitle: "I produce music\nfor cool artists",
  },
  {
    id: 2,
    label: "YouTube Videos",
    icon: <YoutubeLogo size={24} />,
    video: "artificialafter.mp4",
    path: "/youtube-videos",
    headerImage: "/youtube.png",
    headerSubtitle: "I make content\nfor YouTube",
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/music-videos"),
  },
  {
    path: "/video",
    loader: () => redirect("/music-videos"),
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
    path: "/music-videos",
    element: <Home />,
    loader: () => ({ list: musicVideoList }),
    handle: tabs[0],
  },
  {
    path: "/music-production",
    element: <Home />,
    loader: () => ({ list: musicProductionList }),
    handle: tabs[1],
  },
  {
    path: "/youtube-videos",
    element: <Home />,
    loader: () => ({
      sections: [
        {
          title: "Videos a pousser",
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
    element: <MashupLanding />,
  },
  {
    path: "/links",
    element: <LinksLanding />,
  },
  {
    path: "*",
    loader: () => redirect("/music-videos"),
  },
]);
