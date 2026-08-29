import { ArrowRight, Code, MagnifyingGlass, Palette } from "phosphor-react";
import { ActionLink } from "@/components/action/Action";
import Container from "@/components/container/Container";
import DevelopmentFooter from "@/components/development-footer/DevelopmentFooter";
import SiteHeader from "@/components/site-header/SiteHeader";
import { developmentServices, genesiaProject, workflow } from "@/data/development";
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
          <p className="development-page__eyebrow">Développeur web freelance · Nantes / France</p>
          <h1>Des sites clairs, rapides et singuliers.</h1>
          <p className="development-page__lead">
            Je conçois et développe des expériences web sur mesure, de la direction
            créative à la mise en production.
          </p>
          <div className="development-page__actions">
            <ActionLink variant="primary" href="#contact" icon={<ArrowRight />}>
              Parler de votre projet
            </ActionLink>
            <ActionLink variant="secondary" href="#projets">
              Voir les projets
            </ActionLink>
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

      <section className="development-page__section development-page__section--approach" id="approche">
        <Container className="development-page__approach">
          <div>
            <p className="development-page__index">02 / Approche</p>
            <h2>Une collaboration lisible, sans boîte noire.</h2>
          </div>
          <ol>
            {workflow.map((step, index) => (
              <li key={step}><span>0{index + 1}</span>{step}</li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="development-page__section" id="projets">
        <Container>
          <p className="development-page__index">03 / Projet sélectionné</p>
          <h2>Conçu pour inspirer confiance.</h2>
          <article className="development-page__project">
            <div className="development-page__project-visual">
              <img
                src={genesiaProject.screenshot}
                alt={genesiaProject.screenshotAlt}
                width="1920"
                height="1290"
                loading="lazy"
              />
            </div>
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
          <p className="development-page__index">04 / Contact</p>
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
