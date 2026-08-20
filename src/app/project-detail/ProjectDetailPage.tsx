import { ArrowLeft, ArrowUpRight, Play } from "phosphor-react";
import { useParams } from "react-router-dom";
import SiteHeader from "@/components/site-header/SiteHeader";
import musicVideoListData from "@/data/musicVideoList.json";
import type Video from "@/types/Video";
import { getProjectSlug } from "@/utils/projectSlug";
import FilmsFooter from "@/components/films-footer/FilmsFooter";
import useScrollReveal from "@/hooks/useScrollReveal";
import FilmsBackLink from "@/components/films-back-link/FilmsBackLink";
import Container from "@/components/container/Container";
import { ActionLink } from "@/components/action/Action";
import "./ProjectDetailPage.scss";

const musicVideoList = musicVideoListData as Video[];

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = musicVideoList.find((item) => getProjectSlug(item) === slug);
  useScrollReveal(".project-detail__video, .project-detail__youtube, .project-detail__copy section, .project-detail__bts > :not(.project-detail__video), .project-detail__credits, .project-detail__container > footer", slug);

  if (!project) {
    return (
      <main className="project-detail project-detail--missing" id="main-content">
        <SiteHeader universe="films" />
        <h1>Projet introuvable</h1>
        <ActionLink variant="nav" to="/projets" icon={<ArrowLeft />} iconPosition="start">Retour aux projets</ActionLink>
      </main>
    );
  }

  const year = new Date(project.date).getFullYear();
  const youtubeUrl = `https://www.youtube.com/watch?v=${project.youtubeId}`;

  return (
    <main className="project-detail" id="main-content">
      <SiteHeader universe="films" />
      <Container as="article" className="project-detail__container">
        <FilmsBackLink to="/projets">Tous les projets</FilmsBackLink>

        <header className="project-detail__intro">
          <div>
            <p>{project.styles?.join(" · ") || "Clip musical"} · {year}</p>
            <h1><span>{project.artist}</span>{project.song}</h1>
          </div>
          <dl>
            <div><dt>Artiste</dt><dd>{project.artist}</dd></div>
            <div><dt>Projet</dt><dd>{project.song}</dd></div>
            <div><dt>Mon rôle</dt><dd>{project.role || "Réalisation"}</dd></div>
            {typeof project.vfx === "boolean" ? <div><dt>VFX</dt><dd>{project.vfx ? project.vfxDetails || "Oui" : "Non"}</dd></div> : null}
          </dl>
        </header>

        <div className="project-detail__video">
          <iframe src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0&modestbranding=1`} title={`${project.artist} — ${project.song}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        </div>

        <ActionLink className="project-detail__youtube" variant="icon" href={youtubeUrl} external icon={<Play weight="fill" />} iconPosition="start">Voir sur YouTube</ActionLink>

        {project.description || project.directorNote ? (
          <div className="project-detail__copy">
            {project.description ? <section><p className="project-detail__label">Le projet</p><h2>À propos du clip</h2><p>{project.description}</p></section> : null}
            {project.directorNote ? <section><p className="project-detail__label">Note du réalisateur</p><h2>Un mot sur le projet</h2><p>{project.directorNote}</p></section> : null}
          </div>
        ) : null}

        {project.behindTheScenesYoutubeId ? (
          <section className="project-detail__bts" id="coulisses">
            <p className="project-detail__label">Behind the scenes</p>
            <h2>Dans les coulisses</h2>
            <div className="project-detail__video"><iframe src={`https://www.youtube-nocookie.com/embed/${project.behindTheScenesYoutubeId}?rel=0&modestbranding=1`} title={`Coulisses de ${project.artist} — ${project.song}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
          </section>
        ) : null}

        {project.credits?.length ? (
          <section className="project-detail__credits"><p className="project-detail__label">Équipe</p><h2>Crédits</h2><dl>{project.credits.map((credit) => <div key={`${credit.role}-${credit.name}`}><dt>{credit.role}</dt><dd>{credit.name}</dd></div>)}</dl></section>
        ) : null}

        <footer><ActionLink variant="primary" to="/#contact" icon={<ArrowUpRight />}>Parler de mon clip</ActionLink></footer>
      </Container>
      <FilmsFooter />
    </main>
  );
};

export default ProjectDetailPage;
