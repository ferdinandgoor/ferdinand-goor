# FERD brand architecture

## FERD

FERD is the shared identity and the single codebase behind two related universes. They share design tokens, typography, layout primitives, motion, analytics and SEO helpers, but their navigation and editorial priorities differ.

## FERD Films

FERD Films is the primary professional activity: music-video direction and production for artists and independent bands.

- Purpose: **Show → Trust → Convert → Client**.
- Homepage: `/`.
- Public work index: `/realisations`.
- Primary action: start or discuss a music-video project.
- Navigation prioritizes projects, services, positioning and contact.
- Visual tone: cinematic, premium, minimal, musical and slightly alternative.
- FERD Process appears only as a secondary bridge.

SEO intent includes réalisateur clip, réalisateur clip Nantes, clip musical, réalisation clip, vidéaste clip and production clip musical. Copy must remain natural and useful rather than keyword-stuffed.

Dedicated local and thematic acquisition pages live under `/films/*`. They support the short visual homepage with genuinely specific SEO content; see `docs/films-content-architecture.md` for the data-driven workflow.

## FERD Process

FERD Process is Ferdinand's creative and editorial universe: mashups, YouTube videos, music, production, guitar, gear, behind-the-scenes material, experiments and personal projects.

- Purpose: **Create → Publish → Audience → Brand**.
- Homepage: `/process`.
- Content routes include `/mashups`, `/mashups/:slug`, `/videos`, `/matos` and `/music-production`. `/youtube-videos` redirects to `/videos` for backwards compatibility.
- Clip, mashup, music-production, long-video and gear detail routes share `src/app/media-detail/MediaDetailPage.tsx`; category-specific pages must configure this component instead of creating parallel detail layouts.
- Navigation prioritizes content and offers a clear but non-aggressive bridge back to FERD Films.
- Visual tone may be more playful, energetic and internet-native while retaining FERD tokens.
- `/links` redirects to `/process` for backwards compatibility.

Process SEO should describe the actual creative content and must not compete with the commercial intent of FERD Films.

## Relationship and content rule

> FERD Process montre le processus. FERD Films vend le résultat.

- If content mainly helps convince someone to work with FERD, it belongs to FERD Films.
- If content mainly helps someone follow FERD as a creator, it belongs to FERD Process.

A final music video may live in FERD Films while its making-of lives in FERD Process. Cross-links should connect related content without flattening both universes into one navigation hierarchy.

## Technical rules

- Keep one codebase and one shared design system.
- `SiteHeader` is shared but must receive the correct `films` or `process` universe variant.
- Share primitives and infrastructure; allow universe-specific page compositions.
- Do not create empty category routes before content justifies them.
- Preserve old URLs with explicit redirects when public routes change.
- Update `src/seo.ts`, prerender routes and `public/sitemap.xml` together.
