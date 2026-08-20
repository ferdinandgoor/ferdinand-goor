import { useEffect } from "react";
import { ArrowRight } from "phosphor-react";
import { useParams } from "react-router-dom";
import FilmsFooter from "@/components/films-footer/FilmsFooter";
import { ContactLink, ContactSection, ProjectsGrid, Showreel } from "@/components/films-blocks/FilmsBlocks";
import SiteHeader from "@/components/site-header/SiteHeader";
import { filmProjects, getFilmLandingPage } from "@/data/films";
import useScrollReveal from "@/hooks/useScrollReveal";
import { trackEvent } from "@/utils/tracking";
import Container from "@/components/container/Container";
import { ActionLink } from "@/components/action/Action";
import "@/app/clip-service-landing/ClipServiceLanding.scss";
import "./FilmsSeoLanding.scss";

const FilmsSeoLanding = () => {
  const { slug = "" } = useParams();
  const page = getFilmLandingPage(slug);
  useScrollReveal(".films-seo__section, .clip-project");
  useEffect(() => { if (page) trackEvent("films_visit", { page: page.slug }); }, [page]);
  if (!page) return null;
  const projects = page.featuredProjects.map((projectSlug) => filmProjects.find((project) => project.slug === projectSlug)).filter((project): project is (typeof filmProjects)[number] => Boolean(project));

  return (
    <main className="clip-page films-seo" id="main-content">
      <SiteHeader />
      <section className="films-seo__hero">
        <img src={`/video.webp`} alt="Image de réalisation de clip musical par FERD FILMS" width="1920" height="1080" />
        <div className="films-seo__hero-overlay" />
        <Container className="films-seo__hero-copy"><p className="clip-eyebrow">{page.eyebrow}</p><h1>{page.h1}</h1><p>{page.intro}</p><div className="clip-actions"><ContactLink>Parler de mon clip</ContactLink><ActionLink variant="secondary" href="#realisations" icon={<ArrowRight />}>Voir les réalisations</ActionLink></div><small>Clips à partir de 850 € · Déplacements partout en France</small></Container>
      </section>
      <Container as="nav" className="films-seo__breadcrumb" ariaLabel="Fil d’Ariane"><ActionLink variant="nav" to="/">FERD</ActionLink><span>/</span><ActionLink variant="nav" to="/films/realisation-clip-musical">Films</ActionLink><span>/</span><span>{page.city ? `Clip vidéo ${page.city}` : page.h1}</span></Container>
      <section className="clip-section films-seo__section" id="realisations"><p className="clip-index">Showreel</p><h2>Des images, tout de suite.</h2><Showreel compact /><ProjectsGrid projects={projects} /><ActionLink className="clip-all-work" to="/projets" icon={<ArrowRight />}>Voir tout le portfolio</ActionLink></section>
      <section className="clip-section films-seo__section films-seo__copy"><div><p className="clip-index">{page.city ? `À ${page.city}` : "Réalisation"}</p><h2>{page.focusTitle}</h2></div><div>{page.localCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
      <section className="clip-section films-seo__section films-seo__focus"><h2>Rock, métal, alternatif — sans s’y limiter.</h2><p>{page.focusCopy}</p></section>
      <section className="clip-section films-seo__section films-seo__budget"><div><p className="clip-index">Budget</p><h2>Clips à partir de 850 €</h2></div><p>Le tarif dépend du concept, des décors, de l’équipe, de la lumière, de la location de matériel et des éventuels VFX.</p></section>
      <ContactSection />
      <FilmsFooter />
    </main>
  );
};

export default FilmsSeoLanding;
