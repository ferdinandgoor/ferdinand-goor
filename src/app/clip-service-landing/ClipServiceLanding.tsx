import { FormEvent, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Envelope, Phone, Play } from "phosphor-react";
import { Link } from "react-router-dom";
import { clipFaq, clipProcess, clipProjects, googleBusiness } from "@/data/clipServiceLanding";
import { trackEvent } from "@/utils/tracking";
import useScrollReveal from "@/hooks/useScrollReveal";
import { web3FormsAccessKey } from "@/config/contact";
import SiteHeader from "@/components/site-header/SiteHeader";
import musicVideoListData from "@/data/musicVideoList.json";
import type Video from "@/types/Video";
import { getProjectPath } from "@/utils/projectSlug";
import FilmsFooter from "@/components/films-footer/FilmsFooter";
import "./ClipServiceLanding.scss";

const showreelId = "ZE8c0QD2IVM";
const thumbnailUrl = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const musicVideoList = musicVideoListData as Video[];
const projectPath = (youtubeId: string) => {
  const project = musicVideoList.find((item) => item.youtubeId === youtubeId);
  return project ? getProjectPath(project) : "/projets";
};

const ContactLink = ({ children, className = "clip-cta" }: { children: React.ReactNode; className?: string }) => (
  <a className={className} href="#contact" onClick={() => trackEvent("cta_contact_click")}>
    {children}<ArrowRight weight="bold" aria-hidden="true" />
  </a>
);

const ClipContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [started, setStarted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    try {
      const formData = new FormData(form);
      formData.append("access_key", web3FormsAccessKey);
      formData.append("subject", "Nouvelle demande de clip — FERD FILMS");
      formData.append("from_name", "Landing FERD FILMS");
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json() as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Web3Forms submission failed");
      setStatus("sent");
      form.reset();
      trackEvent("contact_form_submit");
    } catch {
      setStatus("error");
    }
  };

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      trackEvent("contact_form_start");
    }
  };

  return (
    <form className="clip-form" onSubmit={handleSubmit} onFocus={markStarted}>
      <input className="clip-botcheck" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
      <label>Nom / groupe<input name="name" autoComplete="name" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Lien vers la musique<input name="music_link" type="url" inputMode="url" /></label>
      <label>Budget approximatif<select name="budget" defaultValue="À définir"><option>Moins de 850 €</option><option>850 – 1 500 €</option><option>1 500 – 2 500 €</option><option>2 500 €+</option><option>À définir</option></select></label>
      <label className="clip-form-wide">Message<textarea name="request" rows={6} required /></label>
      <button className="clip-cta clip-form-wide" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "ENVOI…" : "ENVOYER MON PROJET"}<ArrowRight weight="bold" aria-hidden="true" />
      </button>
      <p className="clip-form-wide clip-form-status" aria-live="polite">
        {status === "sent" && "Merci. Ton projet a bien été envoyé."}
        {status === "error" && "L’envoi a échoué. Tu peux écrire à ferdofficial@gmail.com."}
      </p>
    </form>
  );
};

const ClipServiceLanding = () => {
  const [showreelPlaying, setShowreelPlaying] = useState(false);
  useScrollReveal(
    ".clip-section, .clip-project, .clip-principles article, .clip-process li, .clip-faq details",
  );

  return (
    <main className="clip-page" id="main-content">
      <SiteHeader />

      <section className="clip-hero" id="top">
        <video autoPlay muted loop playsInline preload="metadata" poster="/video.webp" aria-hidden="true"><source src="/overfloodedLight.mp4" type="video/mp4" /></video>
        <div className="clip-hero-overlay" />
        <div className="clip-hero-copy">
          <p className="clip-eyebrow">Réalisation de clips musicaux · Nantes / France</p>
          <h1>Des clips qui ont<br />quelque chose à dire.</h1>
          <p>Réalisation de clips musicaux à Nantes et partout en France.<br />Du concept à l’image finale.</p>
          <div className="clip-actions"><ContactLink>Parler de mon projet</ContactLink><a className="clip-text-link" href="#showreel">Voir le showreel <ArrowDown aria-hidden="true" /></a></div>
          <small>Clips à partir de 850 €</small>
        </div>
      </section>

      <section className="clip-section clip-showreel" id="showreel">
        <p className="clip-index">01 / Showreel</p><h2>60 secondes pour voir<br />ce qu’on peut faire.</h2>
        <div className="clip-showreel-frame">
          {showreelPlaying ? <iframe src={`https://www.youtube-nocookie.com/embed/${showreelId}?autoplay=1&rel=0`} title="Showreel FERD FILMS" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <button onClick={() => { setShowreelPlaying(true); trackEvent("showreel_play"); }} aria-label="Lire le showreel"><img src={thumbnailUrl(showreelId)} alt="Extrait du showreel FERD FILMS" width="1280" height="720" /><span><Play weight="fill" /></span></button>}
        </div>
        <p className="clip-intro">Fiction, performance, expérimentation, VFX : chaque morceau appelle son propre univers.</p>
      </section>

      <section className="clip-section clip-work" id="projets">
        <p className="clip-index">02 / Selected work</p><h2>Quelques univers</h2>
        <div className="clip-projects">{clipProjects.map((project, index) => <Link className={`clip-project clip-project-${index + 1}`} to={projectPath(project.youtubeId)} key={project.youtubeId} onClick={() => trackEvent("project_view", { project: project.title })}><img src={thumbnailUrl(project.youtubeId)} alt={`${project.artist} — ${project.title}`} width="1280" height="720" loading="lazy" /><span className="clip-project-play" aria-hidden="true"><ArrowUpRight /></span><span className="clip-project-info"><strong>{project.artist}</strong><b>{project.title}</b><small>{project.role} · {project.styles.join(" · ")} · {project.year}</small></span></Link>)}</div>
        <Link className="clip-text-link clip-all-work" to="/projets">Voir tous les projets <ArrowRight aria-hidden="true" /></Link>
        <aside className="clip-case-study">
          <div className="clip-case-study__intro"><p className="clip-index">Behind the scenes</p><p>Un aperçu de ce qui se passe derrière la caméra pendant un tournage.</p></div>
          <div className="clip-case-study__videos">
            {[{ id: "uzz4Izr4b0Q", label: "BTS — DTAYL · Wake Up" }].map((video) => (
              <article key={video.id}>
                <span>{video.label}</span>
                <div>
                  <Link to="/projets/dtayl-wake-up-feat-dimi#coulisses" onClick={() => trackEvent("project_view", { project: "Wake Up BTS" })} aria-label="Voir les coulisses de DTAYL — Wake Up"><img src={thumbnailUrl(video.id)} alt={`${video.label} de DTAYL — Wake Up`} width="1280" height="720" loading="lazy" /><i aria-hidden="true"><ArrowUpRight /></i></Link>
                </div>
              </article>
            ))}
          </div>
          <Link className="clip-text-link" to="/projets/dtayl-wake-up-feat-dimi#coulisses">Voir les coulisses du projet <ArrowRight aria-hidden="true" /></Link>
        </aside>
      </section>

      <section className="clip-section clip-manifesto" id="services">
        <p className="clip-index">03 / Positionnement</p><h2>Pas besoin d’un budget Netflix<br />pour avoir une identité.</h2>
        <p className="clip-intro">Je travaille principalement avec des artistes et groupes indépendants. L’objectif est de trouver l’idée et les choix visuels qui auront le plus d’impact avec le budget disponible, plutôt que de multiplier inutilement le matériel et les journées de tournage.</p>
        <div className="clip-principles"><article><h3>Concept</h3><p>On part du morceau et de l’identité du projet, pas d’un template de clip.</p></article><article><h3>Production</h3><p>On construit une production réaliste autour du budget disponible.</p></article><article><h3>Image</h3><p>Lumière, optiques, décors, montage et étalonnage sont pensés comme un seul univers.</p></article></div>
        <aside className="clip-extras">
          <div><p className="clip-index">Contenus complémentaires</p><h3>Faire vivre le morceau<br />au-delà du clip.</h3></div>
          <div><p>Un tournage peut aussi produire du contenu supplémentaire pour accompagner la sortie : making-of, teasers, formats verticaux et extraits pour les réseaux sociaux.</p><ul><li>Making-of / BTS</li><li>Teasers de sortie</li><li>Reels, Shorts et TikTok</li><li>Extraits promotionnels</li></ul><small>Prestations optionnelles, estimées selon le projet.</small><Link className="clip-text-link" to="/projets/dtayl-wake-up-feat-dimi#coulisses">Voir un exemple de making-of <ArrowRight aria-hidden="true" /></Link></div>
        </aside>
      </section>

      <section className="clip-section clip-process" id="process">
        <div><p className="clip-index">04 / Process</p><h2>Du morceau<br />au tournage.</h2><img src="/ferd_behind.jpg" alt="Ferd pendant un tournage" width="1200" height="800" loading="lazy" /></div>
        <ol>{clipProcess.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      </section>

      <section className="clip-section clip-pricing">
        <p className="clip-index">05 / Budget</p><h2>Combien coûte un clip ?</h2><p className="clip-price">À partir de <strong>850 €</strong></p>
        <div className="clip-pricing-copy"><p>Chaque projet est différent. Le budget dépend notamment du concept, du nombre de lieux, de la durée du tournage et des besoins de production.</p><p>Les éventuels frais de location de lieu, matériel spécifique, décors, comédiens, déplacements ou équipe supplémentaire sont estimés séparément lorsque le projet en nécessite.</p><ContactLink>Me parler du projet</ContactLink></div>
      </section>

      {googleBusiness.testimonials.length > 0 ? <section className="clip-section"><h2>Ils m’ont confié leur musique.</h2></section> : null}

      <section className="clip-section clip-faq"><p className="clip-index">06 / FAQ</p><h2>Avant de tourner</h2><div>{clipFaq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="clip-section clip-contact" id="contact">
        <div><p className="clip-index">07 / Contact</p><h2>Ton prochain morceau<br />mérite des images.</h2><p>Parle-moi du morceau, de ton idée et de ton budget. Même si le projet n’est encore qu’une envie.</p><small>Pas besoin d’avoir déjà un scénario ou un dossier de production.</small><div className="clip-direct-contact"><a href="tel:+33651609666"><Phone weight="bold" aria-hidden="true" /><span><small>Appeler</small>+33 6 51 60 96 66</span></a><a href="mailto:ferdofficial@gmail.com"><Envelope weight="bold" aria-hidden="true" /><span><small>Écrire</small>ferdofficial@gmail.com</span></a></div></div><ClipContactForm />
      </section>

      <FilmsFooter />
    </main>
  );
};

export default ClipServiceLanding;
