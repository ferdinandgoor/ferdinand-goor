import Panels from "@/components/panels";
import "./page.scss";
import SiteHeader from "@/components/site-header/SiteHeader";
import { useLocation } from "react-router-dom";
import FilmsFooter from "@/components/films-footer/FilmsFooter";

const pageTitles: Record<string, string> = {
  "/projets": "Projets de clips musicaux de Ferd",
  "/music-production": "Productions musicales de Ferd",
  "/youtube-videos": "Vidéos YouTube de Ferd",
};

const Home = () => {
  const { pathname } = useLocation();
  return (
    <main id="main-content" className="portfolio-page">
      <SiteHeader universe={pathname === "/projets" ? "films" : "process"} />
      <h1 className="visually-hidden">{pageTitles[pathname] ?? "Projets de Ferd"}</h1>
      <Panels />
      {pathname === "/projets" ? <FilmsFooter /> : null}
    </main>
  );
};

export default Home;
