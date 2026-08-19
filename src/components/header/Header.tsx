import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { TiktokLogo } from "phosphor-react";
import Youtube from "@/icons/Youtube";
import Instagram from "@/icons/Instagram";
import Ferd from "@/icons/Ferd";
import Select from "@/components/select";
import useCurrentTab from "@/hooks/useCurrentTab";
import { tabs } from "@/router";
import "./Header.scss";

const Header = () => {
  const currentTab = useCurrentTab();
  const fallback = tabs[0];
  const image = currentTab?.headerImage ?? fallback?.headerImage ?? "/video.webp";
  const subtitle = currentTab?.headerSubtitle ?? fallback?.headerSubtitle ?? "I make music videos\nfor cool artists";

  return (
    <header className="portfolio-header" style={{ "--header-bg-image": `url("${image}")` } as CSSProperties}>
      <a className="skip-link" href="#main-work">Aller au contenu principal</a>
      <div className="portfolio-header__background" aria-hidden="true"><div /></div>
      <div className="portfolio-header__content">
        <div className="portfolio-header__nav">
          <div><Link to="/links">Links</Link><Link className="is-accent" to="/realisateur-clip-nantes">Réalisation de clips</Link></div>
          <a href="mailto:ferdofficial@gmail.com">Contact</a>
        </div>
        <div className="portfolio-header__brand-wrap">
          <div className="portfolio-header__brand">
            <h1><span className="visually-hidden">{currentTab?.label ?? fallback.label} par Ferd</span><Ferd /></h1>
            <div className="portfolio-header__details">
              <p>{subtitle}<br />ferdofficial@gmail.com</p>
              <div className="portfolio-header__socials">
                <a href="https://www.youtube.com/@ferd.process" target="_blank" rel="noopener noreferrer" aria-label="Ferd YouTube"><Youtube /></a>
                <a href="https://www.instagram.com/ferd.process" target="_blank" rel="noopener noreferrer" aria-label="Ferd Instagram"><Instagram /></a>
                <a href="https://www.tiktok.com/@ferd.process" target="_blank" rel="noopener noreferrer" aria-label="Ferd TikTok"><TiktokLogo size="100%" weight="regular" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="portfolio-header__tabs"><Select /></div>
      </div>
    </header>
  );
};

export default Header;
