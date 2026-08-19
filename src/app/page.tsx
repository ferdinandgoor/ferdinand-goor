import Panels from "@/components/panels";
import "./page.scss";
import SiteHeader from "@/components/site-header/SiteHeader";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/realisations": "Portfolio de clips musicaux de Ferd",
  "/music-production": "Productions musicales de Ferd",
  "/youtube-videos": "Vidéos YouTube de Ferd",
};

const Home = () => {
  const { pathname } = useLocation();
  return (
    <main id="main-content" className="portfolio-page">
      <SiteHeader />
      <h1 className="visually-hidden">{pageTitles[pathname] ?? "Portfolio de Ferd"}</h1>
      <Panels />
    </main>
  );
};

export default Home;
