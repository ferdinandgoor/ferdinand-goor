"use client";

import List from "./List";
import videoList from "./videoList.json";
import musicList from "./musicList.json";
import youtubeList from "./youtubeList.json";
import ContactForm from "./ContactForm";
import Header from "./Header";
import { useEffect, useMemo, useState } from "react";
import { VideoCamera, MusicNote, YoutubeLogo } from "phosphor-react";
import Panels from "@/components/panels";
import { usePathname, useRouter } from "next/navigation";

const items = [
  {
    id: 0,
    icon: <VideoCamera size={24} />,
    label: "Video Production",
    path: "/video",
    video: "overfloodedLight.mp4",
    content: (
      <>
        <div
          style={{
            borderTop: "solid 2px #00ff0d",
            backgroundColor: "#090909",
            backgroundImage: 'url("/topography.svg")',
            padding: "20px",
          }}
          id="my-work"
        >
          <List data={videoList} maxSize={100} />
        </div>
        {/* <div
          style={{
            height: "100vh",
            borderTop: "solid 2px #00ff0d",
            padding: "20px",
          }}
          id="contact"
        >
          <ContactForm />
        </div> */}
      </>
    ),
  },
  {
    id: 1,
    icon: <MusicNote size={24} />,
    label: "Music Production",
    path: "/music",
    video: "overfloodedLight.mp4",
    content: (
      <>
        <div
          style={{
            borderTop: "solid 2px #00ff0d",
            backgroundColor: "#090909",
            backgroundImage: 'url("/topography.svg")',
            padding: "20px",
          }}
          id="my-work"
        >
          <List data={musicList} maxSize={100} />
        </div>
        {/* <div
          style={{
            height: "100vh",
            borderTop: "solid 2px #00ff0d",
            padding: "20px",
          }}
          id="contact"
        >
          <ContactForm />
        </div> */}
      </>
    ),
  },
  {
    id: 2,
    icon: <YoutubeLogo size={24} />,
    label: "Youtube",
    path: "/youtube",
    video: "artificialafter.mp4",
    content: (
      <div
        style={{
          borderTop: "solid 2px #00ff0d",
          backgroundColor: "#090909",
          backgroundImage: 'url("/topography.svg")',
          padding: "20px",
        }}
        id="my-work"
      >
        <List data={youtubeList} maxSize={100} />
      </div>
    ),
  },
];

const defaultActive =
  items.find((item) => item.label.toLowerCase().includes("video"))?.id ??
  items[0]?.id ??
  0;

const Home = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(defaultActive);

  const pathToId = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item) => map.set(item.path, item.id));
    return map;
  }, []);

  useEffect(() => {
    const id = pathToId.get(pathname);
    if (id !== undefined && id !== active) {
      setActive(id);
    }
  }, [active, pathname, pathToId]);

  const handleChangePanel = (id: number) => {
    setActive(id);
    const path = items.find((item) => item.id === id)?.path;
    if (path && path !== pathname) {
      router.push(path);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        borderTop: "solid 2px #00ff0d",
      }}
    >
      <Header
        items={items}
        selectedPanel={active}
        onChangePanel={handleChangePanel}
      />
      <Panels activeId={active} items={items} />
    </div>
  );
};

export default Home;
