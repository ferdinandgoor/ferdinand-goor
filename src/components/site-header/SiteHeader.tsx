import { useEffect, useState } from "react";
import { ArrowSquareOut, List, X } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";
import "./SiteHeader.scss";
import Container from "@/components/container/Container";
import { ActionLink } from "@/components/action/Action";

type SiteHeaderProps = { universe?: "films" | "process" };

const SiteHeader = ({ universe = "films" }: SiteHeaderProps) => {
  const { pathname, hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setMenuOpen(false), [pathname, hash]);

  const filmsNavigation = (
    <>
      <ActionLink
        variant="nav"
        className={pathname.startsWith("/projets") ? "is-active" : ""}
        to="/projets"
      >
        Projets
      </ActionLink>
      <ActionLink variant="nav" to="/#services">
        Approche
      </ActionLink>
      <ActionLink variant="nav" to="/#budget">
        Budget
      </ActionLink>
      <ActionLink
        variant="nav"
        className="site-header__bridge"
        to="/process"
        icon={<ArrowSquareOut weight="bold" />}
      >
        Process
      </ActionLink>
      <ActionLink variant="primary" className="site-header__cta" to="/#contact">
        Parler de mon clip
      </ActionLink>
    </>
  );

  const processNavigation = (
    <>
      <ActionLink variant="nav" to="/videos">
        Vidéos
      </ActionLink>
      <ActionLink variant="nav" to="/music-production">
        Musique
      </ActionLink>
      <ActionLink variant="nav" to="/process#contenus">
        Projets
      </ActionLink>
      <ActionLink
        variant="nav"
        className="site-header__bridge"
        to="/"
        icon={<ArrowSquareOut weight="bold" />}
      >
        FERD Films
      </ActionLink>
    </>
  );

  return (
    <header
      className={`site-header site-header--${universe}${scrolled ? " is-scrolled" : ""}`}
    >
      <Container className="site-header__inner">
        <Link
          className="site-header__brand"
          to={universe === "films" ? "/" : "/process"}
        >
          FERD <span>{universe === "films" ? "FILMS" : "PROCESS"}</span>
        </Link>
        <button
          className="site-header__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? <X /> : <List />}
        </button>
        <nav
          id="site-navigation"
          className={`site-header__nav${menuOpen ? " is-open" : ""}`}
          aria-label={`Navigation FERD ${universe === "films" ? "Films" : "Process"}`}
        >
          {universe === "films" ? filmsNavigation : processNavigation}
        </nav>
      </Container>
    </header>
  );
};

export default SiteHeader;
