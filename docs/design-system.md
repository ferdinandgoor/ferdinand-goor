# FERD visual system

The source of truth is the `:root` block in `src/globals.scss`. Page-level custom properties may alias global tokens for backwards compatibility, but they must not redefine the identity.

## Identity

- Background: near-black `--color-bg` with `--color-bg-elevated` for structural separation.
- Text: warm off-white `--color-text`; secondary copy uses `--color-text-muted`.
- Accent: FERD green `--color-accent` (`#00ff0d`) everywhere: focus, CTA, labels and active states.
- Brand/interface type: Orbitron via `--font-display` for the logo, navigation, labels and buttons.
- Heading type: Space Grotesk via `--font-heading` for readable page and section titles.
- Large headings use natural sentence case. Reserve all caps for short Orbitron labels, navigation and controls.
- Reading type: Helvetica/Arial via `--font-body`.
- Shapes: restrained 4–8 px radii. Circles are reserved for icon/play controls and avatars.

## Type scale

| Token | Use |
| --- | --- |
| `--text-label` | labels, eyebrow text, metadata, buttons |
| `--text-body` | paragraphs and form content |
| `--text-card-title` | compact titles inside cards and media overlays |
| `--text-title-sm` | card and section-list titles |
| `--text-title-md` | regular page section headings |
| `--text-title-lg` | one primary hero heading per page |

Headings use `--leading-display` and `--tracking-display`. Avoid inventing a fourth oversized scale.

## Layout and spacing

- Page max width: `--content-wide`.
- Reading width: `--content-reading`.
- Main section padding: `--section-block` vertically and `--section-inline` horizontally.
- Component spacing uses `--space-1` through `--space-16`.
- Media should define dimensions or an aspect ratio to prevent layout shift.

## Motion

Motion should reveal hierarchy, never delay access to content.

- Fast interaction: `--duration-fast`.
- Header/surface transition: `--duration-medium`.
- Scroll reveal: `--duration-reveal` with `--ease-standard`.
- Shared reveal implementation: `useScrollReveal(selector)` adds `.ferd-reveal` and `.is-visible`.
- Hover media may scale very slightly (around `1.035`).
- All new motion requires a `prefers-reduced-motion` fallback.

## Heroes

Heroes are image/video-led, dark and readable. Use `--hero-overlay`, the large title token, one primary action and at most one secondary action. Videos must be muted, inline, looped only when useful, and have a poster. Do not load multiple heavy hero assets eagerly.

## Components

- Interactive actions use `src/components/action/Action.tsx`. Choose the `primary`, `secondary`, `text`, `nav` or `icon` variant instead of creating page-specific button or link animation rules.
- Primary CTA: green background, dark text, uppercase Orbitron label, compact radius.
- Secondary CTA: dark/transparent surface, off-white text and shared border.
- Panels: `--color-surface`, `--color-border`, `--shadow-panel`, `--radius-lg`.
- Cards: imagery first; metadata overlays should remain concise.
- Focus: always retain the global green `:focus-visible` outline.

## Adding a page

1. Reuse the global tokens and an existing page composition where appropriate.
2. Keep content/data editable outside deeply nested markup when it repeats.
3. Add SEO, sitemap and prerender configuration for indexable routes.
4. Test keyboard focus, reduced motion and responsive widths around 390, 430, 768 and 1440 px.
5. Run the repository verification commands described in `AGENTS.md`.

## Contact delivery

The commercial landing submits to Web3Forms. Its public access key is centralized in `src/config/contact.ts`; never duplicate it inside components. The form must preserve its loading, success, error, bot-check and analytics behavior when fields are changed.
