import type { ReactNode } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import { MusicNote, VideoCamera, YoutubeLogo } from "phosphor-react";
import Home from "./app/Page";
import videoList from "./data/videoList.json";
import musicList from "./data/musicList.json";
import youtubeList from "./data/youtubeList.json";

export type TabHandle = {
  id: number;
  label: string;
  icon: ReactNode;
  video: string;
  path: string;
};

export const tabs: TabHandle[] = [
  {
    id: 0,
    label: "Video Production",
    icon: <VideoCamera size={24} />,
    video: "overfloodedLight.mp4",
    path: "/video",
  },
  {
    id: 1,
    label: "Music Production",
    icon: <MusicNote size={24} />,
    video: "overfloodedLight.mp4",
    path: "/music",
  },
  {
    id: 2,
    label: "Youtube",
    icon: <YoutubeLogo size={24} />,
    video: "artificialafter.mp4",
    path: "/youtube",
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/video"),
  },
  {
    path: "/video",
    element: <Home />,
    loader: () => ({ list: videoList }),
    handle: tabs[0],
  },
  {
    path: "/music",
    element: <Home />,
    loader: () => ({ list: musicList }),
    handle: tabs[1],
  },
  {
    path: "/youtube",
    element: <Home />,
    loader: () => ({ list: youtubeList }),
    handle: tabs[2],
  },
  {
    path: "*",
    loader: () => redirect("/video"),
  },
]);
