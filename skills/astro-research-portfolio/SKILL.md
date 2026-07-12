---
name: astro-research-portfolio
description: Build and maintain Changrui Zhu's Astro-based spatial research portfolio. Use when changing its pages, research or publication content, visual system, interactive spatial elements, responsive behavior, accessibility, performance, or GitHub Pages deployment.
---

# Astro Research Portfolio

## Objective

Maintain a distinctive research portfolio that communicates a spatial-computing practice rather than reproducing a conventional academic template. Preserve scientific clarity while foregrounding research questions, systems, and evidence.

## Workflow

1. Read `memory.md`, `structure.md`, and the affected source files before non-trivial changes.
2. State a concrete user-facing and technical success criterion.
3. Keep identity, publication, and repeated content in `src/data/site.ts`; keep page-specific narrative in the page.
4. Implement the smallest coherent change with Astro, native CSS, and browser APIs.
5. Run `npm run check`, then `npm run build`.
6. Inspect the affected page at desktop and mobile widths. Check dark mode and reduced motion when animation or color changes.
7. Update `memory.md` for meaningful decisions or failed approaches and `structure.md` for flow or responsibility changes.

## Design constraints

- Lead with the research premise, not a biography, headshot, or publication inventory.
- Use the spatial language defined in `references/visual-system.md`.
- Treat publications as evidence supporting the research narrative.
- Prefer real project imagery and diagrams over decorative stock imagery.
- Use motion to communicate registration, comparison, focus, or spatial relationships. Avoid generic entrance effects as the primary identity.
- Keep pages readable without JavaScript. Canvas and motion are progressive enhancements.
- Preserve keyboard access, visible focus, semantic headings, alt text, and `prefers-reduced-motion` behavior.

## Engineering constraints

- Keep the site static and compatible with GitHub Pages.
- Do not add React, Vue, Svelte, WebGL frameworks, a CMS, or server rendering without a demonstrated requirement.
- Avoid build-time processing of the legacy `assets/` tree. Copy only required optimized media into `public/media/`.
- Do not hard-code local filesystem paths.
- Do not change publication claims, venues, dates, metrics, or author lists without checking a primary source or the repository's verified bibliography.
- Keep the official Astro GitHub Pages action as the deployment path.

## Validation

- Require zero Astro diagnostics.
- Require a successful static production build.
- Confirm `/`, `/work/mr-compare/`, and `/404.html` exist in `dist/`.
- Check that internal links use root-relative GitHub Pages-compatible paths.
- Inspect for horizontal overflow and illegible text at approximately 390 px and 1440 px viewport widths.
- Compare `document.documentElement.scrollWidth` with `clientWidth`; do not accept hidden or masked horizontal overflow.
- Check browser console errors on the home page and every changed project page.
