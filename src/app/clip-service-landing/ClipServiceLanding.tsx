import { FormEvent, useState } from "react";
import { ArrowDown, ArrowRight, Envelope, InstagramLogo, Phone, Play, YoutubeLogo } from "phosphor-react";
import { Link } from "react-router-dom";
import { clipFaq, clipProcess, clipProjects, googleBusiness } from "@/data/clipServiceLanding";
import { trackEvent } from "@/utils/tracking";
import useScrollReveal from "@/hooks/useScrollReveal";
import { web3FormsAccessKey } from "@/config/contact";
import SiteHeader from "@/components/site-header/SiteHeader";
import "./ClipServiceLanding.scss";

const showreelId = "ZE8c0QD2IVM";
const youtubeUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const thumbnailUrl = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

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

      <section className="clip-section clip-work" id="realisations">
        <p className="clip-index">02 / Selected work</p><h2>Quelques univers</h2>
        <div className="clip-projects">{clipProjects.map((project, index) => <a className={`clip-project clip-project-${index + 1}`} href={youtubeUrl(project.youtubeId)} target="_blank" rel="noopener noreferrer" key={project.youtubeId} onClick={() => trackEvent("project_view", { project: project.title })}><img src={thumbnailUrl(project.youtubeId)} alt={`${project.artist} — ${project.title}`} width="1280" height="720" loading="lazy" /><span><strong>{project.artist}</strong><b>{project.title}</b><small>{project.role} · {project.year}</small></span></a>)}</div>
        <Link className="clip-text-link clip-all-work" to="/realisations">Voir toutes les réalisations <ArrowRight aria-hidden="true" /></Link>
      </section>

      <section className="clip-section clip-manifesto">
        <p className="clip-index">03 / Positionnement</p><h2>Pas besoin d’un budget Netflix<br />pour avoir une identité.</h2>
        <p className="clip-intro">Je travaille principalement avec des artistes et groupes indépendants. L’objectif est de trouver l’idée et les choix visuels qui auront le plus d’impact avec le budget disponible, plutôt que de multiplier inutilement le matériel et les journées de tournage.</p>
        <div className="clip-principles"><article><h3>Concept</h3><p>On part du morceau et de l’identité du projet, pas d’un template de clip.</p></article><article><h3>Production</h3><p>On construit une production réaliste autour du budget disponible.</p></article><article><h3>Image</h3><p>Lumière, optiques, décors, montage et étalonnage sont pensés comme un seul univers.</p></article></div>
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

      <footer className="clip-footer"><div><strong>FERD FILMS</strong><p>Réalisation de clips musicaux<br />Nantes — France</p></div><div><a href="https://www.instagram.com/ferd.films" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("instagram_click")}><InstagramLogo /> @ferd.films</a><a href="https://www.youtube.com/@ferd.process" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("youtube_click")}><YoutubeLogo /> YouTube</a><Link to="/realisations">Portfolio complet</Link></div><small>© {new Date().getFullYear()} FERD FILMS</small></footer>
    </main>
  );
};

export default ClipServiceLanding;
