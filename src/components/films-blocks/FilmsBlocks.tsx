import { FormEvent, useState } from "react";
import { ArrowRight, ArrowUpRight, Envelope, Phone, Play } from "phosphor-react";
import { Link } from "react-router-dom";
import { web3FormsAccessKey } from "@/config/contact";
import { FilmProject, showreel, youtubeThumbnail } from "@/data/films";
import { trackEvent } from "@/utils/tracking";

export const ContactLink = ({ children, className = "clip-cta" }: { children: React.ReactNode; className?: string }) => (
  <a className={className} href="#contact" onClick={() => trackEvent("cta_contact_click")}>
    {children}<ArrowRight weight="bold" aria-hidden="true" />
  </a>
);

export const Showreel = ({ compact = false }: { compact?: boolean }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`clip-showreel-frame${compact ? " is-compact" : ""}`}>
      {playing ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${showreel.youtubeId}?autoplay=1&rel=0`} title={showreel.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      ) : (
        <button onClick={() => { setPlaying(true); trackEvent("showreel_play"); }} aria-label="Lire le showreel FERD FILMS">
          <img src={youtubeThumbnail(showreel.youtubeId)} alt="Showreel de clips musicaux réalisés par FERD FILMS" width="1280" height="720" />
          <span><Play weight="fill" /></span>
        </button>
      )}
    </div>
  );
};

export const ProjectsGrid = ({ projects }: { projects: FilmProject[] }) => (
  <div className="clip-projects">
    {projects.map((project, index) => (
      <Link className={`clip-project clip-project-${index + 1}`} to={`/projets/${project.slug}`} key={project.slug} onClick={() => trackEvent("project_view", { project: project.title })}>
        <img src={youtubeThumbnail(project.youtubeId)} alt={`Clip ${project.title} de ${project.artist}, réalisé par FERD FILMS`} width="1280" height="720" loading="lazy" decoding="async" />
        <span className="clip-project-play" aria-hidden="true"><ArrowUpRight /></span>
        <span className="clip-project-info"><strong>{project.artist}</strong><b>{project.title}</b><small>{project.role} · {project.genres.join(" · ")} · {project.year}</small></span>
      </Link>
    ))}
  </div>
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
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const result = await response.json() as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Web3Forms submission failed");
      setStatus("sent");
      form.reset();
      trackEvent("contact_form_submit");
    } catch { setStatus("error"); }
  };
  const markStarted = () => {
    if (!started) { setStarted(true); trackEvent("contact_form_start"); }
  };
  return (
    <form className="clip-form" onSubmit={handleSubmit} onFocus={markStarted}>
      <input className="clip-botcheck" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
      <label>Nom / groupe<input name="name" autoComplete="name" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Lien vers la musique<input name="music_link" type="url" inputMode="url" /></label>
      <label>Budget approximatif<select name="budget" defaultValue="À définir"><option>Moins de 850 €</option><option>850 – 1 500 €</option><option>1 500 – 2 500 €</option><option>2 500 €+</option><option>À définir</option></select></label>
      <label className="clip-form-wide">Message<textarea name="request" rows={5} required /></label>
      <button className="clip-cta clip-form-wide" type="submit" disabled={status === "sending"}>{status === "sending" ? "ENVOI…" : "ENVOYER MON PROJET"}<ArrowRight weight="bold" aria-hidden="true" /></button>
      <p className="clip-form-wide clip-form-status" aria-live="polite">{status === "sent" && "Merci. Ton projet a bien été envoyé."}{status === "error" && "L’envoi a échoué. Tu peux écrire à ferdofficial@gmail.com."}</p>
    </form>
  );
};

export const ContactSection = ({ title = "Tu as un morceau ? Parlons du clip." }: { title?: string }) => (
  <section className="clip-section clip-contact" id="contact">
    <div><p className="clip-index">Contact</p><h2>{title}</h2><p>Envoie le morceau, quelques références et ton budget, même si le projet n’est encore qu’une idée.</p><div className="clip-direct-contact"><a href="tel:+33651609666" onClick={() => trackEvent("phone_click")}><Phone weight="bold" aria-hidden="true" /><span><small>Appeler</small>+33 6 51 60 96 66</span></a><a href="mailto:ferdofficial@gmail.com" onClick={() => trackEvent("email_click")}><Envelope weight="bold" aria-hidden="true" /><span><small>Écrire</small>ferdofficial@gmail.com</span></a></div></div>
    <ClipContactForm />
  </section>
);
