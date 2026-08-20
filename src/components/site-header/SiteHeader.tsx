import { useEffect, useState } from "react";
import { ArrowSquareOut, List, X } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";
import "./SiteHeader.scss";

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
      <Link className={pathname.startsWith("/projets") ? "is-active" : ""} to="/projets">Projets</Link>
      <Link to="/#services">Approche</Link>
      <Link to="/#budget">Budget</Link>
      <Link className="site-header__bridge" to="/process">Process <ArrowSquareOut weight="bold" /></Link>
      <Link className="site-header__cta" to="/#contact">Parler de mon clip</Link>
    </>
  );

  const processNavigation = (
    <>
      <Link to="/youtube-videos">Vidéos</Link>
      <Link to="/music-production">Musique</Link>
      <Link to="/process#contenus">Projets</Link>
      <Link className="site-header__bridge" to="/">FERD Films <ArrowSquareOut weight="bold" /></Link>
    </>
  );

  return (
    <header className={`site-header site-header--${universe}${scrolled ? " is-scrolled" : ""}`}>
      <Link className="site-header__brand" to={universe === "films" ? "/" : "/process"}>FERD <span>{universe === "films" ? "FILMS" : "PROCESS"}</span></Link>
      <button className="site-header__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-navigation" aria-label="Ouvrir le menu">{menuOpen ? <X /> : <List />}</button>
      <nav id="site-navigation" className={`site-header__nav${menuOpen ? " is-open" : ""}`} aria-label={`Navigation FERD ${universe === "films" ? "Films" : "Process"}`}>
        {universe === "films" ? filmsNavigation : processNavigation}
      </nav>
    </header>
  );
};

export default SiteHeader;
