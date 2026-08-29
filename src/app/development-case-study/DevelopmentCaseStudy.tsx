import { ArrowLeft, ArrowSquareOut } from "phosphor-react";
import { ActionLink } from "@/components/action/Action";
import Container from "@/components/container/Container";
import DevelopmentFooter from "@/components/development-footer/DevelopmentFooter";
import SiteHeader from "@/components/site-header/SiteHeader";
import { genesiaProject } from "@/data/development";
import useScrollReveal from "@/hooks/useScrollReveal";
import "./DevelopmentCaseStudy.scss";

const challenges = [
  { title: "SEO dans une application React", copy: "Les pages principales sont pré-générées en HTML pour livrer immédiatement leur contenu aux moteurs de recherche, puis React reprend l’interactivité côté navigateur." },
  { title: "Staging et production", copy: "Chaque évolution peut être validée dans un environnement isolé. Les versions, changelogs et déploiements de production sont ensuite automatisés à partir des releases." },
  { title: "Accessibilité en contexte médical", copy: "La structure sémantique, les contrastes, les focus clavier, la lisibilité et la réduction des animations ont été traités comme des exigences de conception." },
  { title: "Architecture éditoriale", copy: "Coordonnées, liens, appels à l’action et contenus réutilisables sont centralisés pour simplifier la maintenance et les évolutions futures." },
] as const;

const DevelopmentCaseStudy = () => {
  useScrollReveal(".case-study__section, .case-study__challenge");
  return (
    <main className="case-study" id="main-content">
      <SiteHeader universe="dev" />
      <header className="case-study__hero">
        <Container>
          <ActionLink variant="text" to="/developpeur-freelance#projets" icon={<ArrowLeft />} iconPosition="start">Retour aux projets</ActionLink>
          <p className="case-study__eyebrow">Étude de cas · Site vitrine médical</p>
          <h1>{genesiaProject.name}</h1>
          <p className="case-study__lead">{genesiaProject.summary}</p>
          <div className="case-study__hero-actions">
            <ActionLink variant="primary" href={genesiaProject.url} external icon={<ArrowSquareOut />}>Voir le site</ActionLink>
          </div>
        </Container>
      </header>

      <section className="case-study__showcase" aria-label="Aperçu visuel du site GENESIA">
        <Container>
          <div className="case-study__browser">
            <div className="case-study__browser-bar"><span /><span /><span /><small>genesia-genetique-fertilite.fr</small></div>
            <div className="case-study__browser-screen">
              <img
                src={genesiaProject.screenshot}
                alt={genesiaProject.screenshotAlt}
                width="1920"
                height="1290"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="case-study__section">
        <Container className="case-study__intro-grid">
          <div><p className="case-study__eyebrow">Contexte</p><h2>Rendre une expertise complexe claire et rassurante.</h2></div>
          <div><p>GENESIA souhaitait présenter son activité de génétique médicale, son accompagnement des parcours de fertilité et l’expertise du Dr Kamran Moradkhani.</p><p>L’identité devait rester humaine, élégante et accessible, avec une attention particulière portée à la confidentialité et à la lisibilité.</p></div>
        </Container>
      </section>

      <section className="case-study__section case-study__section--split">
        <Container className="case-study__columns">
          <div><p className="case-study__eyebrow">Rôle</p><h2>Conception et développement de bout en bout.</h2></div>
          <ul>{genesiaProject.missions.map((mission) => <li key={mission}>{mission}</li>)}</ul>
        </Container>
      </section>

      <section className="case-study__section">
        <Container>
          <p className="case-study__eyebrow">Défis &amp; solutions</p>
          <h2>Une base technique pensée pour durer.</h2>
          <div className="case-study__challenges">{challenges.map((challenge, index) => <article className="case-study__challenge" key={challenge.title}><span>0{index + 1}</span><h3>{challenge.title}</h3><p>{challenge.copy}</p></article>)}</div>
        </Container>
      </section>

      <section className="case-study__section case-study__section--result">
        <Container className="case-study__result">
          <div><p className="case-study__eyebrow">Résultat</p><h2>Rapide, rassurant et évolutif.</h2></div>
          <p>Le site présente clairement l’activité du cabinet, facilite la prise de rendez-vous et fournit une base technique évolutive pour de futurs contenus et professionnels.</p>
        </Container>
      </section>

      <section className="case-study__section">
        <Container>
          <p className="case-study__eyebrow">Technologies</p>
          <ul className="case-study__technologies">{genesiaProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        </Container>
      </section>

      <section className="case-study__contact" id="contact">
        <Container><p className="case-study__eyebrow">Votre projet</p><h2>Vous cherchez un site aussi exigeant ?</h2><p>Discutons de votre activité, de vos contenus et de la bonne architecture pour les présenter.</p><ActionLink variant="contrast" href="mailto:ferdofficial@gmail.com?subject=Projet%20web%20similaire%20à%20GENESIA">Parler de mon projet</ActionLink></Container>
      </section>
      <DevelopmentFooter />
    </main>
  );
};

export default DevelopmentCaseStudy;
