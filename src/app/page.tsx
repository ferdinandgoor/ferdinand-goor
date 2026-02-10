"use client";

import List from "./List";
import videoList from "./videoList.json";
import musicList from "./musicList.json";
import youtubeList from "./youtubeList.json";
import ContactForm from "./ContactForm";
import Header from "./Header";
import { useState } from "react";
import { VideoCamera, MusicNote, YoutubeLogo } from "phosphor-react";
import Panels from "@/components/panels";

const items = [
  {
    id: 0,
    icon: <VideoCamera size={24} />,
    label: "Video Production",
    video: "overfloodedLight.mp4",
    content: (
      <>
        <div
          style={{
            borderTop: "solid 2px #00ff0d",
            backgroundColor: "#131313",
            backgroundImage: 'url("/topography.svg")',
            padding: "20px",
          }}
          id="my-work"
        >
          <List data={videoList} maxSize={15} />
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
    video: "overfloodedLight.mp4",
    content: (
      <>
        <div
          style={{
            borderTop: "solid 2px #00ff0d",
            backgroundColor: "#131313",
            backgroundImage: 'url("/topography.svg")',
            padding: "20px",
          }}
          id="my-work"
        >
          <List data={musicList} maxSize={15} />
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
    video: "artificialafter.mp4",
    content: (
      <div
        style={{
          borderTop: "solid 2px #00ff0d",
          backgroundColor: "#131313",
          backgroundImage: 'url("/topography.svg")',
          padding: "20px",
        }}
        id="my-work"
      >
        <List data={youtubeList} maxSize={15} />
      </div>
    ),
  },
];

const Home = () => {
  const [active, setActive] = useState(0);

  return (
    <div
      style={{
        position: "relative",
        borderTop: "solid 2px #00ff0d",
      }}
    >
      <Header items={items} selectedPanel={active} onChangePanel={setActive} />
      <Panels activeId={active} items={items} />
    </div>
  );
};

export default Home;
