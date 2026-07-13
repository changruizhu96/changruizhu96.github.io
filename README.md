# Changrui Zhu — Spatial Research Portfolio

An Astro-based personal research portfolio focused on mixed reality, human perception, 3D reconstruction, and human-in-the-loop intelligent systems.

Live site: <https://changruizhu96.github.io/>

## Local development

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

The development server uses Astro's fast local refresh. The production site is fully static.

## Validation

```bash
npm run check
npm run build
```

The build output is written to `dist/`. Expected routes include `/`, `/publications/`, `/work/mr-compare/`, and `/404.html`.

## Content and design

- Identity, links, research coordinates, and selected publications: `src/data/site.ts`
- Home-page narrative: `src/pages/index.astro`
- Project stories: `src/pages/work/`
- Visual system: `src/styles/global.css`
- Published media: `public/media/`
- Project development guidance: `skills/astro-research-portfolio/`

## Deployment

Pushes to `main` in `changruizhu96/changruizhu96.github.io` are built with the official Astro GitHub Action and deployed to the root GitHub Pages URL through `.github/workflows/deploy.yml`.
