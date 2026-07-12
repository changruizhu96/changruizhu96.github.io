# Project structure

## Current Astro flow

- `src/pages/index.astro` renders the single-page research narrative: research premise, coordinates, featured work, publications, and biography.
- `src/pages/work/mr-compare.astro` renders the first long-form project story.
- `src/data/site.ts` is the structured source for identity, research coordinates, links, and selected publications.
- `src/components/` contains the shared header and lightweight spatial Canvas enhancement.
- `src/layouts/BaseLayout.astro` owns document metadata and global progressive enhancement.
- `src/styles/global.css` defines the complete visual system, responsive layouts, dark mode, and reduced-motion behavior.
- `public/media/` contains only media copied into the Astro output.
- `.github/workflows/deploy.yml` builds static Astro output and deploys it to GitHub Pages.
- `skills/astro-research-portfolio/` records the project-specific implementation and quality rules.

## Legacy migration sources

- `_pages/`, `_projects/`, `_bibliography/`, `_layouts/`, `_includes/`, `_sass/`, and most of `assets/` belong to the previous Jekyll site.
- These sources remain temporarily for content verification and are not part of the Astro build.
