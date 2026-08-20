import { useEffect } from "react";
import { ArrowDown, ArrowRight } from "phosphor-react";
import SiteHeader from "@/components/site-header/SiteHeader";
import FilmsFooter from "@/components/films-footer/FilmsFooter";
import { ContactLink, ContactSection, ProjectsGrid, Showreel } from "@/components/films-blocks/FilmsBlocks";
import { filmProjects } from "@/data/films";
import useScrollReveal from "@/hooks/useScrollReveal";
import { trackEvent } from "@/utils/tracking";
import Container from "@/components/container/Container";
import { ActionLink } from "@/components/action/Action";
import "./ClipServiceLanding.scss";

const ClipServiceLanding = () => {
  useScrollReveal(".clip-section, .clip-project, .clip-approach article");
  useEffect(() => trackEvent("films_visit", { page: "home" }), []);
  return (
    <main className="clip-page" id="main-content">
      <SiteHeader />
      <section className="clip-hero" id="top">
        <video autoPlay muted loop playsInline preload="metadata" poster="/video.webp" aria-hidden="true"><source src="/overfloodedLight.mp4" type="video/mp4" /></video>
        <div className="clip-hero-overlay" />
        <Container className="clip-hero-copy">
          <p className="clip-eyebrow">Réalisateur de clips · Nantes / France</p>
          <h1>Des clips pour les<br />musiques alternatives.</h1>
          <p>Rock, métal, alternatif — et tout projet avec un univers.</p>
          <div className="clip-actions"><ContactLink>Parler de mon clip</ContactLink><ActionLink href="#projets" icon={<ArrowDown aria-hidden="true" />}>Voir les réalisations</ActionLink></div>
          <small>Basé à Nantes · Disponible partout en France · À partir de 850 €</small>
        </Container>
      </section>
      <section className="clip-section clip-showreel" id="showreel">
        <p className="clip-index">01 / Showreel</p><h2>Le film avant le discours.</h2><Showreel />
      </section>
      <section className="clip-section clip-work" id="projets">
        <p className="clip-index">02 / Clips</p><h2>Univers sélectionnés</h2><ProjectsGrid projects={filmProjects.slice(0, 6)} />
        <ActionLink className="clip-all-work" to="/projets" icon={<ArrowRight aria-hidden="true" />} onClick={() => trackEvent("all_projects_click")}>Voir tous les projets</ActionLink>
      </section>
      <section className="clip-section clip-approach" id="services">
        <div><p className="clip-index">03 / Approche</p><h2>Une idée forte.<br />Une production agile.</h2></div>
        <div><p>Le morceau guide le concept, la lumière et le rythme. L’équipe et les moyens s’adaptent à l’idée — pas l’inverse.</p><p className="clip-process-line">Morceau → concept → préparation → tournage → montage & étalonnage</p></div>
      </section>
      <section className="clip-section clip-pricing" id="budget">
        <div><p className="clip-index">04 / Budget</p><h2>Clips à partir de</h2><p className="clip-price"><strong>850 €</strong></p></div>
        <div className="clip-pricing-copy"><p>Le budget dépend du concept, des décors, de l’équipe, de la lumière, du matériel et des éventuels VFX.</p><ContactLink>Parler de mon clip</ContactLink></div>
      </section>
      <ContactSection />
      <aside className="clip-mobile-cta"><ContactLink>Parler de mon clip</ContactLink></aside>
      <FilmsFooter />
    </main>
  );
};

export default ClipServiceLanding;
