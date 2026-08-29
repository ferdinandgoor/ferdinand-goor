import Container from "@/components/container/Container";
import { ActionLink } from "@/components/action/Action";
import "./DevelopmentFooter.scss";

const DevelopmentFooter = () => (
  <footer className="development-footer">
    <Container className="development-footer__inner">
      <div>
        <strong>FERD DEV</strong>
        <p>Conception et développement web freelance.</p>
      </div>
      <nav className="development-footer__links" aria-label="Navigation secondaire">
        <ActionLink variant="nav" to="/developpeur-freelance">
          Services
        </ActionLink>
        <ActionLink variant="nav" to="/developpeur-freelance#projets">
          Projets
        </ActionLink>
        <ActionLink variant="nav" href="mailto:ferdofficial@gmail.com">
          Contact
        </ActionLink>
      </nav>
      <small>© {new Date().getFullYear()} Ferdinand Goor</small>
    </Container>
  </footer>
);

export default DevelopmentFooter;
