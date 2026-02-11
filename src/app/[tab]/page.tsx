"use client";

import Home from "../page";

export const dynamicParams = false;

export const generateStaticParams = () => [
  { tab: "video" },
  { tab: "music" },
  { tab: "youtube" },
];

const TabPage = () => <Home />;

export default TabPage;
