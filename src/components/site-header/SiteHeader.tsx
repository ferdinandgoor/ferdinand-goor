import { useEffect, useState } from "react";
import { List, X } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";
import "./SiteHeader.scss";

const SiteHeader = () => {
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

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <Link className="site-header__brand" to="/">FERD FILMS</Link>
      <button className="site-header__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-navigation" aria-label="Ouvrir le menu">{menuOpen ? <X /> : <List />}</button>
      <nav id="site-navigation" className={`site-header__nav${menuOpen ? " is-open" : ""}`} aria-label="Navigation principale">
        <Link className={pathname === "/" ? "is-active" : ""} to="/">Home</Link>
        <Link className={pathname === "/realisations" ? "is-active" : ""} to="/realisations">Réalisations</Link>
        <Link className={pathname === "/links" ? "is-active" : ""} to="/links">Links</Link>
        <Link className="site-header__cta" to="/#contact">Parler de mon clip</Link>
      </nav>
    </header>
  );
};

export default SiteHeader;
