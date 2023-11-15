'use client'
import Card from "@/components/card";
import { ParallaxProvider, ParallaxBannerLayer, ParallaxBanner } from "react-scroll-parallax";

const list = [
  {
    artist: "Dissolve",
    song: "Efficiency Defiled",
    date: "Sep 10, 2023",
    youtubeId: "00odCw8P6SI",
  },
  {
    artist: "HIPSKÖR",
    song: "DANSU",
    date: "Feb 13, 2022",
    youtubeId: "jRqnSQSIcnA",
  },
  {
    artist: "Kolen.",
    song: "Flagless",
    date: "Mar 11, 2023",
    youtubeId: "gR9IgYqV8Kg",
  },
  {
    artist: "Obsidian",
    song: "A Life to Fail",
    date: "Feb 24, 2022",
    youtubeId: "Hb8tgfJ73qA",
  },
  {
    artist: "Obsidian",
    song: "Rea(lies)",
    date: "Mar 16, 2020",
    youtubeId: "hLjNzYgETSg",
  },
  {
    artist: "Causality",
    song: "Introspection",
    date: "Jun 9, 2023",
    youtubeId: "iZaNqV6_6O0",
  },
  {
    artist: "Causality",
    song: "Overflooded",
    date: "Mar 31, 2023",
    youtubeId: "-C2ydlfEn5w",
  },
  {
    artist: "Causality",
    song: "Chemicals",
    date: "Mar 4, 2022",
    youtubeId: "r5IdKc5aU7E",
  },
  {
    artist: "Causality",
    song: "Disbelief",
    date: "Feb 2, 2020",
    youtubeId: "pcZaO_aWH3I",
  },
  {
    artist: "Causality",
    song: "Icarus",
    date: "Dec 8, 2019",
    youtubeId: "7Hcxkg9KzGs",
  }
];

const List = () => (
  <ParallaxBanner
  // style={{ height: "100%" }}
  >
    <ParallaxBannerLayer image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c3c11a4e-961b-47ec-8f72-acebce4c4562/dfwmugg-4e93af69-b035-4ece-a309-bbf5ecba8a15.jpg/v1/fit/w_414,h_621,q_70,strp/cyberpunk_city_vertical_wallpaper_by_coolarts223_dfwmugg-414w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MzYzExYTRlLTk2MWItNDdlYy04ZjcyLWFjZWJjZTRjNDU2MlwvZGZ3bXVnZy00ZTkzYWY2OS1iMDM1LTRlY2UtYTMwOS1iYmY1ZWNiYThhMTUuanBnIiwiaGVpZ2h0IjoiPD0xOTIwIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvYzNjMTFhNGUtOTYxYi00N2VjLThmNzItYWNlYmNlNGM0NTYyXC9jb29sYXJ0czIyMy00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.GLSZaA9cVhtd4k52S8hHNDekYVqXshurYfP6e08w7cQ" speed={-280} />
    <ul>
      <li style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px"
      }}>
        {
          list.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
          }).map(item => <Card key={item.artist} {...item} />)
        }
      </li>
    </ul>

  </ParallaxBanner>
);

const Home = () => (
  <>
    <h1 style={{
      color: "pink"
    }}>Jaime Sounze</h1>
    <ParallaxProvider>
      <List />
    </ParallaxProvider>
  </>
);

export default Home;
