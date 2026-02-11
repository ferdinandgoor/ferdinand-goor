import List from "./List";
import videoList from "../data/videoList.json";
import musicList from "../data/musicList.json";
import youtubeList from "../data/youtubeList.json";
import Header from "./Header";
import { VideoCamera, MusicNote, YoutubeLogo } from "phosphor-react";
import Panels from "@/components/panels";

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
            padding: "20px",
            backdropFilter: "blur(20px) brightness(0.3) saturate(15%)",
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
            padding: "20px",
            backdropFilter: "blur(50px) brightness(0.2) saturate(10%)",
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
          backdropFilter: "blur(50px) brightness(0.2) saturate(10%)",
          padding: "20px",
        }}
        id="my-work"
      >
        <List data={youtubeList} maxSize={100} />
      </div>
    ),
  },
];

const Home = () => (
  <div
    style={{
      position: "relative",
      borderTop: "solid 2px #00ff0d",
    }}
  >
    <Header items={items} />
    <Panels items={items} />
  </div>
);

export default Home;
