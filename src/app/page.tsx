import Panels from "@/components/panels";
import "./page.scss";
import SiteHeader from "@/components/site-header/SiteHeader";
import { useLocation } from "react-router-dom";
import { ArrowSquareOut } from "phosphor-react";
import FilmsFooter from "@/components/films-footer/FilmsFooter";
import FilmsBackLink from "@/components/films-back-link/FilmsBackLink";
import Container from "@/components/container/Container";
import { ActionLink } from "@/components/action/Action";

const pageTitles: Record<string, string> = {
  "/projets": "Projets de clips musicaux de Ferd",
  "/music-production": "Productions musicales de Ferd",
  "/youtube-videos": "Vidéos YouTube de Ferd",
  "/mashups": "Mashups de FERD Process",
  "/videos": "Vidéos longues de FERD Process",
  "/matos": "Tests de matériel de FERD Process",
};

const processArchives: Record<string, { playlist: string; label: string }> = {
  "/mashups": { playlist: "https://www.youtube.com/playlist?list=PLTGarG5bkXoA", label: "Playlist des mashups" },
  "/videos": { playlist: "https://www.youtube.com/playlist?list=PLOGfm0l52k3g", label: "Playlist des vidéos longues" },
  "/matos": { playlist: "https://www.youtube.com/playlist?list=PLOvnmxmjrjv4", label: "Playlist matos et production" },
};

const Home = () => {
  const { pathname } = useLocation();
  const processArchive = processArchives[pathname];
  return (
    <main id="main-content" className="portfolio-page">
      <SiteHeader universe={pathname === "/projets" ? "films" : "process"} />
      {pathname === "/projets" ? (
        <Container className="portfolio-page__intro">
          <FilmsBackLink to="/">Retour à l’accueil</FilmsBackLink>
        </Container>
      ) : null}
      {processArchive ? (
        <Container className="portfolio-page__intro"><FilmsBackLink to="/process">Retour à FERD Process</FilmsBackLink><ActionLink variant="secondary" href={processArchive.playlist} external icon={<ArrowSquareOut weight="bold" />}>{processArchive.label}</ActionLink></Container>
      ) : null}
      <h1 className="visually-hidden">
        {pageTitles[pathname] ?? "Projets de Ferd"}
      </h1>
      <Panels />
      {pathname === "/projets" ? <FilmsFooter /> : null}
    </main>
  );
};

export default Home;
