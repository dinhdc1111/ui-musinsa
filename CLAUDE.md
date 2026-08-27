# Frontend CSS Rules

These rules apply to every file in this repository. They are mandatory for AI-generated and human-authored UI code.

## Tailwind-first policy

- Use Tailwind utility classes in Vue templates as the default styling mechanism.
- Before adding a `<style>` block or a CSS declaration, verify that the requirement cannot be expressed clearly with existing Tailwind utilities or the project theme tokens in `src/styles/tokens.css`.
- New Vue components must not contain `<style>` by default.
- Do not create BEM selectors merely to move ordinary utility declarations out of the template.
- Do not use inline `style` attributes for static values. Inline styles are allowed only for runtime values that cannot be represented by a finite, statically detectable class map.
- Keep class names as complete static strings. For variants, use typed maps such as `{ primary: 'bg-accent text-accent-contrast' }`; never construct fragments such as `bg-${color}`.

## Project tokens

- Prefer semantic theme utilities exposed by `src/styles/tokens.css`: `bg-canvas`, `bg-surface`, `bg-surface-muted`, `text-text`, `text-muted`, `text-sale`, `border-border`, `border-border-strong`, `ring-focus`, `font-sans`, `font-display`, `max-w-content`, `max-w-reading`, `px-page-gutter`, `py-section`, `gap-grid`, `rounded-control`, `rounded-panel`, `rounded-pill`, `shadow-soft`, and `shadow-overlay`.
- Use the standard Tailwind spacing, sizing, typography, border, radius, shadow, opacity, and responsive scales whenever they match the design.
- Arbitrary values are acceptable for exact design measurements that have no reusable semantic meaning, for example `h-[3.125rem]`. Repeated arbitrary values must be promoted to a token.
- Do not add raw hex, rgb, or hsl values in Vue files. Add a semantic color token first when a new reusable color is required.
- Do not reference `--ds-*` variables directly in Vue templates or component CSS when a corresponding Tailwind theme utility exists.

## Responsive and interaction rules

- Build mobile-first: base utilities target small screens, followed by `sm:`, `md:`, `lg:`, `xl:`, or `2xl:` overrides.
- Prefer Tailwind state variants such as `hover:`, `focus-visible:`, `disabled:`, `aria-selected:`, `data-[state=open]:`, `group-hover:`, and `peer-*` over custom pseudo-class selectors.
- Every interactive control must retain a visible `focus-visible` state. Do not remove outlines without adding an accessible ring or equivalent.
- Prefer `motion-reduce:` and `motion-safe:` variants for component motion.

## Allowed custom CSS

Custom CSS is allowed only when utilities would be substantially less clear or cannot target the requirement:

- `@font-face`, root document defaults, global selection/focus policy, and design-token declarations.
- `@keyframes`, complex multi-stage animation, or browser-specific behavior not covered cleanly by Tailwind.
- Vue transition class contracts such as `.fade-enter-active` and `.fade-leave-to`.
- Third-party internals that require selectors such as `:deep(.swiper-wrapper)`.
- Pseudo-elements or relational selectors whose utility form would be unreadable.
- Runtime-calculated values supplied through CSS custom properties or bound inline styles.

When custom CSS is necessary:

- Keep it scoped and colocated with the component, except for true global rules in `src/styles/main.css`.
- Add a short comment explaining why Tailwind utilities are insufficient when the reason is not obvious.
- Use project tokens instead of hard-coded reusable values.
- Do not use `@apply` to hide ordinary utility combinations. Extract a Vue component when a repeated visual pattern has semantic meaning.

## Refactoring and review checklist

- Convert static layout, display, position, sizing, spacing, typography, color, border, radius, shadow, overflow, object-fit, and breakpoint declarations to template utilities.
- Remove the corresponding selector after migration; do not keep dead CSS.
- Consolidate repeated class strings into a component only when the markup/behavior is also reusable. For variant-only repetition, use a typed static class map.
- Keep third-party, transition, keyframe, and dynamic-value CSS only when it meets the exceptions above.
- Run `pnpm run lint`, `pnpm exec prettier --check .`, and `pnpm run build` after styling changes.

## Repository-specific direction

- Tailwind v4 is configured through `@tailwindcss/vite` and `@theme inline`; do not introduce `tailwind.config.*` unless a feature truly requires JavaScript configuration.
- Add or adjust semantic tokens in `src/styles/tokens.css`; keep `src/styles/main.css` limited to global document behavior.
- Existing CSS-heavy components are migration debt, not examples to copy. Any touched component must move toward this policy and must not increase its custom-CSS footprint.
