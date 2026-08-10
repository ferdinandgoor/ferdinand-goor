# Ferd

Portfolio React 18 construit avec Vite 5 et React Router. Les routes publiques sont pré-rendues au build, puis hydratées dans le navigateur. La production reste un hébergement statique : seul `dist/` doit être publié.

## Développement

```bash
npm ci
npm run dev
```

## Validation et build

```bash
npm run lint
npm run typecheck
npm run build
npm run verify:prerender
```

Le build client est écrit dans `dist/`. Le bundle SSR temporaire `dist-ssr/` sert uniquement au pré-rendu et ne doit jamais être déployé.

## SEO et Google Search Console

Le domaine canonique est `https://ferd.fr`. Les métadonnées partagées et les données structurées sont centralisées dans `src/seo.ts`. Les routes indexables sont déclarées dans `public/sitemap.xml` et référencées par `public/robots.txt`.

Pour ajouter la balise de validation Search Console, copier `.env.example` vers `.env.local` puis renseigner :

```dotenv
VITE_GOOGLE_SITE_VERIFICATION=jeton_fourni_par_google
```

Après déploiement, soumettre `https://ferd.fr/sitemap.xml` dans Search Console.
