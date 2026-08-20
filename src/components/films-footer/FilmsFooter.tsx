import { Envelope, InstagramLogo, Phone, YoutubeLogo } from "phosphor-react";
import { trackEvent } from "@/utils/tracking";
import "./FilmsFooter.scss";
import Container from "@/components/container/Container";
import { ActionLink } from "@/components/action/Action";

const FilmsFooter = () => (
  <footer className="films-footer">
    <Container className="films-footer__inner">
      <div className="films-footer__identity">
        <strong>FERD FILMS</strong>
        <p>
          Ferdinand Goor — Entrepreneur individuel
          <br />
          SIRET 884 098 922 00021
          <br />
          173 chemin du Printemps, 44800 Saint-Herblain, France
          <br />
          TVA non applicable, article 293 B du CGI
        </p>
      </div>
      <div className="films-footer__links">
        <strong>Contact</strong>
        <ActionLink
          variant="icon"
          href="mailto:ferdofficial@gmail.com"
          icon={<Envelope />}
          iconPosition="start"
          onClick={() => trackEvent("email_click")}
        >
          Email
        </ActionLink>
        <ActionLink
          variant="icon"
          href="tel:+33651609666"
          icon={<Phone />}
          iconPosition="start"
          onClick={() => trackEvent("phone_click")}
        >
          +33 6 51 60 96 66
        </ActionLink>
        <ActionLink
          variant="icon"
          href="https://www.instagram.com/ferd.films"
          icon={<InstagramLogo />}
          iconPosition="start"
          external
          onClick={() => trackEvent("instagram_click")}
        >
          @ferd.films
        </ActionLink>
        <ActionLink
          variant="icon"
          href="https://www.youtube.com/@ferd.process"
          icon={<YoutubeLogo />}
          iconPosition="start"
          external
          onClick={() => trackEvent("youtube_click")}
        >
          YouTube
        </ActionLink>
      </div>
      <div className="films-footer__links">
        <strong>Réalisation de clips</strong>
        <ActionLink variant="nav" to="/films/clip-video-nantes">
          Nantes
        </ActionLink>
        <ActionLink variant="nav" to="/films/clip-video-rennes">
          Rennes
        </ActionLink>
        <ActionLink variant="nav" to="/films/clip-video-angers">
          Angers
        </ActionLink>
        <ActionLink variant="nav" to="/films/realisation-clip-metal">
          Clips metal & rock
        </ActionLink>
      </div>
      <div className="films-footer__links">
        <strong>Navigation</strong>
        <ActionLink variant="nav" to="/">
          Accueil
        </ActionLink>
        <ActionLink variant="nav" to="/projets">
          Tous les projets
        </ActionLink>
        <ActionLink variant="nav" to="/cgv">
          CGV
        </ActionLink>
      </div>
      <small>© {new Date().getFullYear()} FERD FILMS</small>
    </Container>
  </footer>
);

export default FilmsFooter;
