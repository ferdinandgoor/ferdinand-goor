import { Envelope, InstagramLogo, Phone, YoutubeLogo } from "phosphor-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/utils/tracking";
import "./FilmsFooter.scss";
import Container from "@/components/container/Container";

const FilmsFooter = () => (
  <footer className="films-footer">
    <Container className="films-footer__inner">
      <div className="films-footer__identity">
      <strong>FERD FILMS</strong>
      <p>Ferdinand Goor — Entrepreneur individuel<br />SIRET 884 098 922 00021<br />173 chemin du Printemps, 44800 Saint-Herblain, France<br />TVA non applicable, article 293 B du CGI</p>
    </div>
    <div className="films-footer__links">
      <strong>Contact</strong>
      <a href="mailto:ferdofficial@gmail.com" onClick={() => trackEvent("email_click")}><Envelope /> Email</a>
      <a href="tel:+33651609666" onClick={() => trackEvent("phone_click")}><Phone /> +33 6 51 60 96 66</a>
      <a href="https://www.instagram.com/ferd.films" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("instagram_click")}><InstagramLogo /> @ferd.films</a>
      <a href="https://www.youtube.com/@ferd.process" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("youtube_click")}><YoutubeLogo /> YouTube</a>
    </div>
    <div className="films-footer__links">
      <strong>Réalisation de clips</strong>
      <Link to="/films/clip-video-nantes">Nantes</Link>
      <Link to="/films/clip-video-rennes">Rennes</Link>
      <Link to="/films/clip-video-angers">Angers</Link>
      <Link to="/films/realisation-clip-metal">Clips metal & rock</Link>
    </div>
    <div className="films-footer__links">
      <strong>Navigation</strong>
      <Link to="/">Accueil</Link>
      <Link to="/projets">Tous les projets</Link>
      <Link to="/cgv">CGV</Link>
    </div>
      <small>© {new Date().getFullYear()} FERD FILMS</small>
    </Container>
  </footer>
);

export default FilmsFooter;
