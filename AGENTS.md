# FERD site development rules

These instructions apply to the whole repository, including AI-assisted changes.

## Design system is mandatory

Read `docs/design-system.md` before changing UI. All new visual work must use the tokens declared in `src/globals.scss`.

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

- `/` is the conversion landing page for FERD FILMS clip services.
- `/realisateur-clip-nantes` is a backwards-compatible alias whose canonical URL is `/`.
- `/projets` is the publicly linked FERD Films project gallery. `/realisations` and `/music-videos` redirect there for backwards compatibility.
- `/music-production` and `/youtube-videos` are FERD Process content pages. Link them from Process navigation, never as primary FERD Films navigation items.
- `/process` is the FERD Process creative/editorial homepage. `/links` redirects there for backwards compatibility.
- `/mashups/:slug` contains individual mashup releases.
- `/cgv` contains the FERD Films sales terms. Do not remove its incomplete-information notice until consumer mediator details are supplied.

Do not replace or redirect the complete portfolio when improving the commercial landing page.

Read `docs/brand-architecture.md` before changing routes, navigation, brand labels or deciding where new content belongs.

## Styling architecture

- Use SCSS only; do not add `.css` files.
- Each component owns and imports a colocated `<ComponentName>.scss` file.
- Avoid JSX inline styles. They are allowed only for genuinely dynamic runtime values passed through CSS custom properties.
- Use BEM consistently in every component and page: `.block`, `.block__element`, and `.block--modifier`. JSX class names and SCSS selectors must follow the same naming structure.
- Keep every component or page under a single SCSS block root. Nest elements with `&__element`, modifiers with `&--modifier`, and pseudo-classes or state selectors with `&:state` or `&.is-state`; do not repeat fully qualified BEM selectors at the top level.
- Nest child selectors and responsive or reduced-motion overrides inside their owning BEM block whenever possible. Keep nesting shallow and do not create unnecessary selector specificity.
- Before completing SCSS work, check for duplicated selector declarations, orphaned selectors and BEM elements or modifiers declared outside their block root.

## Verification

For UI changes, run at least `npm run typecheck` and `npm run lint`. For routes, SEO, content architecture or shared styling changes, also run `npm run build` and `npm run verify:prerender`.
