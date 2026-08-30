import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "phosphor-react";
import SiteHeader from "@/components/site-header/SiteHeader";
import FilmsFooter from "@/components/films-footer/FilmsFooter";
import {
  ContactLink,
  ContactSection,
  ProjectsGrid,
  Showreel,
} from "@/components/films-blocks/FilmsBlocks";
import { filmProjects, type FilmLandingPage } from "@/data/films";
import useScrollReveal from "@/hooks/useScrollReveal";
import { trackEvent } from "@/utils/tracking";
import Container from "@/components/container/Container";
import { ActionLink } from "@/components/action/Action";
import "./ClipServiceLanding.scss";

type ClipServiceLandingProps = {
  page?: FilmLandingPage;
};

const ClipServiceLanding = ({ page }: ClipServiceLandingProps) => {
  const introSceneRef = useRef<HTMLDivElement>(null);

  useScrollReveal(
    ".clip-page__section:not(.clip-page__section--showreel), .clip-page__project, .clip-page__approach article",
  );
  useEffect(
    () => trackEvent("films_visit", { page: page?.slug ?? "home" }),
    [page?.slug],
  );

  useEffect(() => {
    const scene = introSceneRef.current;

    if (!scene) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let animationFrame = 0;

    const updateProgress = () => {
      animationFrame = 0;

      if (reducedMotion.matches) {
        scene.style.setProperty("--intro-progress", "0");
        return;
      }

      const bounds = scene.getBoundingClientRect();
      const scrollRange = Math.max(bounds.height / 2, 1);
      const progress = Math.min(Math.max(-bounds.top / scrollRange, 0), 1);

      scene.style.setProperty("--intro-progress", progress.toString());
    };

    const requestProgressUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateProgress);
    };

    requestProgressUpdate();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
    reducedMotion.addEventListener("change", requestProgressUpdate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      reducedMotion.removeEventListener("change", requestProgressUpdate);
    };
  }, []);

  const projects = page
    ? page.featuredProjects
        .map((slug) => filmProjects.find((project) => project.slug === slug))
        .filter((project): project is (typeof filmProjects)[number] =>
          Boolean(project),
        )
    : filmProjects.slice(0, 6);

  const eyebrow = page?.eyebrow ?? "Réalisateur de clips · Nantes / France";
  const intro =
    page?.intro ?? "Rock, métal, alternatif — et tout projet avec un univers.";
  const location = page?.city
    ? `${page.city} · Déplacements partout en France · À partir de 850 €`
    : "Basé à Nantes · Disponible partout en France · À partir de 850 €";

  return (
    <main className="clip-page" id="main-content">
      <SiteHeader />
      <div className="clip-page__intro-scene" ref={introSceneRef}>
        <div className="clip-page__intro-stage">
          <section className="clip-page__hero" id="top">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/video.webp"
              aria-hidden="true"
            >
              <source src="/overfloodedLight.mp4" type="video/mp4" />
            </video>
            <div className="clip-page__hero-overlay" />
            <Container className="clip-page__hero-copy">
              <p className="clip-page__eyebrow">{eyebrow}</p>
              <h1>
                {page ? (
                  page.h1
                ) : (
                  <>
                    Des clips pour les
                    <br />
                    musiques alternatives.
                  </>
                )}
              </h1>
              <p>{intro}</p>
              <div className="clip-page__actions">
                <ContactLink>Parler de mon clip</ContactLink>
                <ActionLink
                  variant="secondary"
                  href="#projets"
                  icon={<ArrowDown aria-hidden="true" />}
                >
                  Voir les réalisations
                </ActionLink>
              </div>
              <small>{location}</small>
            </Container>
          </section>
          <section
            className="clip-page__section clip-page__section--showreel"
            id="showreel"
            aria-label="Showreel FERD Films"
          >
            <Showreel />
          </section>
        </div>
      </div>
      <section
        className="clip-page__section clip-page__section--work"
        id="projets"
      >
        <p className="clip-page__index">02 / Clips</p>
        <h2>{page?.city ? `Clips réalisés depuis ${page.city}` : "Univers sélectionnés"}</h2>
        <ProjectsGrid projects={projects} />
        <ActionLink
          className="clip-page__all-work"
          to="/projets"
          icon={<ArrowRight aria-hidden="true" />}
          onClick={() => trackEvent("all_projects_click")}
        >
          Voir tous les projets
        </ActionLink>
      </section>
      <section className="clip-page__section clip-page__approach" id="services">
        <div>
          <p className="clip-page__index">03 / Approche</p>
          <h2>{page?.focusTitle ?? "Une idée forte. Une production agile."}</h2>
        </div>
        <div>
          {(page?.localCopy ?? [
            "Le morceau guide le concept, la lumière et le rythme. L’équipe et les moyens s’adaptent à l’idée — pas l’inverse.",
          ]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {page?.focusCopy ? <p>{page.focusCopy}</p> : null}
          <p className="clip-page__process-line">
            Morceau → concept → préparation → tournage → montage & étalonnage
          </p>
        </div>
      </section>
      <section className="clip-page__section clip-page__pricing" id="budget">
        <div>
          <p className="clip-page__index">04 / Budget</p>
          <h2>Clips à partir de</h2>
          <p className="clip-page__price">
            <strong>850 €</strong>
          </p>
        </div>
        <div className="clip-page__pricing-copy">
          <p>
            Le budget dépend du concept, des décors, de l’équipe, de la lumière,
            du matériel et des éventuels VFX.
          </p>
          <ContactLink variant="contrast">Parler de mon clip</ContactLink>
        </div>
      </section>
      <ContactSection />
      <FilmsFooter />
    </main>
  );
};

export default ClipServiceLanding;
