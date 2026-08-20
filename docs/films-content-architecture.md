# FERD Films — architecture de contenu

La homepage `/` est la landing de conversion : elle montre d’abord le showreel et les clips, résume l’approche et le budget, puis mène au formulaire. Les contenus plus développés vivent sur les landing pages `/films/*`. FERD Process reste l’univers éditorial et créatif sur `/process`.

## Ajouter ou modifier un projet mis en avant

Les projets commerciaux et leurs données SEO sont dans `src/data/films.ts`, sous `filmProjects`. Ajouter un objet avec un `slug` identique au slug de sa page `/projets/:slug`, une date ISO réelle, l’identifiant YouTube, une description factuelle et les genres. Les miniatures utilisent l’image YouTube crawlable ; ne renseigner que des faits vérifiés.

Le portfolio complet reste dans `src/data/musicVideoList.json`. Si un projet doit apparaître à la fois dans le portfolio et les landing pages, conserver les deux entrées cohérentes.

## Ajouter une ville ou une spécialité

Ajouter une entrée unique à `filmLandingPages` dans `src/data/films.ts`. Le gabarit, la route, les métadonnées, le canonical, le breadcrumb, le JSON-LD et le prérendu sont générés depuis cette donnée. Écrire un `intro`, un `localCopy` et un `focusCopy` réellement spécifiques ; ne pas publier une page qui ne ferait que remplacer un nom de ville.

Les pages locales prioritaires sont Nantes, Rennes et Angers. Les pages thématiques disponibles couvrent la réalisation de clip musical et les clips metal/rock. Le footer assure le maillage discret.

## Métadonnées et données structurées

`src/seo.ts` construit les balises title, description, canonical, OpenGraph et Twitter. Il produit aussi `Organization`/`ProfessionalService`, `WebPage`, `BreadcrumbList` et un `VideoObject` par vidéo sélectionnée. `primaryImageOfPage`, les grandes prévisualisations et les entrées image du sitemap aident Google à associer les miniatures aux pages. Les champs absents ou incertains (durée, avis, note Google) ne sont pas inventés.

Le build prérend toutes les routes exposées par `filmSeoRoutes`, puis génère le sitemap. Après une modification, lancer `npm run build` puis `npm run verify:prerender`.

## Analytics

Les événements GA4 respectent le consentement et sont typés dans `src/utils/tracking.ts` : `films_visit`, `showreel_play`, `project_view`, `all_projects_click`, `cta_contact_click`, `contact_form_start`, `contact_form_submit`, `email_click`, `phone_click`, `instagram_click`, `youtube_click` et `google_reviews_click`. Les visites restent également mesurées par `page_view` avec le chemin courant.

## Avis Google

Ne jamais ajouter d’étoiles, de note ou de témoignage sans source réelle. Le modèle existant dans `src/data/clipServiceLanding.ts` peut accueillir une URL et des avis vérifiés lorsqu’ils seront disponibles.
