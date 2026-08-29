import { ArrowRight, Code, MagnifyingGlass, Palette } from "phosphor-react";
import { Link } from "react-router-dom";
import { ActionLink } from "@/components/action/Action";
import Container from "@/components/container/Container";
import DevelopmentFooter from "@/components/development-footer/DevelopmentFooter";
import SiteHeader from "@/components/site-header/SiteHeader";
import { developmentServices, genesiaProject } from "@/data/development";
import useScrollReveal from "@/hooks/useScrollReveal";
import "./DevelopmentLanding.scss";

const serviceIcons = [Palette, Code, MagnifyingGlass];

const DevelopmentLanding = () => {
  useScrollReveal(
    ".development-page__section, .development-page__service, .development-page__project",
  );

  return (
    <main className="development-page" id="main-content">
      <SiteHeader universe="dev" />
      <section className="development-page__hero">
        <Container className="development-page__hero-inner">
          <div className="development-page__hero-copy">
            <h1 className="development-page__title">Développeur web freelance · Nantes / France</h1>
            <p className="development-page__lead">
              Je suis Ferdinand Goor, Lead Front-End et développeur freelance.
              Depuis plus de dix ans, je conçois des interfaces et des produits
              web pour des entreprises, des services publics et des plateformes
              à grande échelle.
            </p>
            <p className="development-page__hero-detail">
              Mon expérience technique et ma pratique de la réalisation visuelle
              me permettent de construire des projets cohérents, de la direction
              créative à la mise en production.
            </p>
            <dl className="development-page__profile-facts">
              <div><dt>Expérience</dt><dd>Plus de 10 ans</dd></div>
              <div><dt>Spécialité</dt><dd>Front-End · React</dd></div>
              <div><dt>Langues</dt><dd>Français · Anglais</dd></div>
            </dl>
            <div className="development-page__actions">
              <ActionLink variant="primary" href="#contact" icon={<ArrowRight />}>
                Parler de votre projet
              </ActionLink>
              <ActionLink variant="secondary" href="#projets">
                Voir les projets
              </ActionLink>
            </div>
            <ActionLink
              className="development-page__linkedin"
              variant="text"
              href="https://www.linkedin.com/in/ferdinand-goor"
              external
              icon={<ArrowRight />}
            >
              Voir mon profil LinkedIn
            </ActionLink>
          </div>
          <div className="development-page__portrait development-page__portrait--hero">
            <img
              src="/ferdinand-goor-developpeur.webp"
              alt="Ferdinand Goor, développeur web et créatif freelance"
              width="1200"
              height="1283"
            />
          </div>
        </Container>
      </section>

      <section className="development-page__section" id="services">
        <Container>
          <p className="development-page__index">01 / Services</p>
          <div className="development-page__section-head">
            <h2>Du concept à la mise en ligne.</h2>
            <p>Un interlocuteur unique pour transformer un besoin métier en site utile, durable et convaincant.</p>
          </div>
          <div className="development-page__services">
            {developmentServices.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <article className="development-page__service" key={service.title}>
                  <div><span>{service.index}</span><Icon aria-hidden="true" /></div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="development-page__section" id="projets">
        <Container>
          <p className="development-page__index">02 / Projet sélectionné</p>
          <h2>Conçu pour inspirer confiance.</h2>
          <article className="development-page__project">
            <Link
              className="development-page__project-visual"
              to="/developpeur-freelance/projets/genesia"
              aria-label="Voir l’étude de cas GENESIA"
            >
              <img
                src={genesiaProject.screenshot}
                alt={genesiaProject.screenshotAlt}
                width="1920"
                height="1290"
                loading="lazy"
              />
              <span className="development-page__project-overlay" aria-hidden="true">
                Voir le projet <ArrowRight />
              </span>
            </Link>
            <div className="development-page__project-copy">
              <p>{genesiaProject.category}</p>
              <h3>{genesiaProject.name}</h3>
              <p>{genesiaProject.summary}</p>
              <ul>{genesiaProject.technologies.slice(0, 5).map((technology) => <li key={technology}>{technology}</li>)}</ul>
              <ActionLink variant="primary" to="/developpeur-freelance/projets/genesia" icon={<ArrowRight />}>
                Lire l’étude de cas
              </ActionLink>
            </div>
          </article>
        </Container>
      </section>

      <section className="development-page__contact" id="contact">
        <Container>
          <p className="development-page__index">03 / Contact</p>
          <h2>Un site à créer ou à faire évoluer ?</h2>
          <p>Parlez-moi de votre activité, de vos objectifs et de votre calendrier. Je vous répondrai avec une première lecture du projet.</p>
          <ActionLink variant="contrast" href="mailto:ferdofficial@gmail.com?subject=Projet%20de%20site%20web" icon={<ArrowRight />}>
            Écrire à Ferdinand
          </ActionLink>
        </Container>
      </section>
      <DevelopmentFooter />
    </main>
  );
};

export default DevelopmentLanding;
