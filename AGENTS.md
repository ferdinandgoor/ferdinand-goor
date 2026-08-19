# FERD site development rules

These instructions apply to the whole repository, including AI-assisted changes.

## Design system is mandatory

Read `docs/design-system.md` before changing UI. All new visual work must use the tokens declared in `src/globals.css`.

- Do not introduce a new accent color. FERD green is `var(--color-accent)`.
- Do not hard-code colors, font stacks, title scales, spacing, radii, shadows, transition durations, easing curves, content widths, or hero overlays when a token exists.
- Use `var(--font-display)` for headings, labels, navigation and buttons. Use `var(--font-body)` for paragraphs, long descriptions and form values.
- Use `--text-title-sm`, `--text-title-md` and `--text-title-lg` for heading scale. Do not add page-specific giant heading scales.
- Use `--section-inline` and `--section-block` for primary page spacing. Use the numbered `--space-*` tokens for component spacing.
- Buttons use the accent background, `--color-on-accent` text, square/small-radius geometry and the shared motion tokens.
- Hero media uses `--hero-overlay`, with readable foreground content and an explicit poster/fallback.
- Scroll reveals use `src/hooks/useScrollReveal.ts`; do not create another IntersectionObserver implementation.
- Every animation must respect `prefers-reduced-motion` and use the shared duration/easing tokens.
- Preserve the established visual character: dark, cinematic, editorial, slightly brutal, image-led, restrained radii, no generic SaaS gradients or glass cards.

## Existing information architecture

- `/realisateur-clip-nantes` is the conversion landing page for clip services.
- `/`, `/music-videos`, `/music-production` and `/youtube-videos` are the complete portfolio and must remain accessible.
- `/links` is the compact link-in-bio page.
- `/mashups/:slug` contains individual mashup releases.

Do not replace or redirect the complete portfolio when improving the commercial landing page.

## Verification

For UI changes, run at least `npm run typecheck` and `npm run lint`. For routes, SEO, content architecture or shared styling changes, also run `npm run build` and `npm run verify:prerender`.

