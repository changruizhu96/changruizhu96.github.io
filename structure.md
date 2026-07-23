# Project structure

## Current Astro flow

- `src/pages/index.astro` renders an identity-first research homepage: author and research focus, the interactive change-blindness premise, an outside-the-test bridge from perception to spatial computing, featured work, the three newest publication records from shared data, and a colour-portrait biography.
- `src/pages/publications.astro` renders the complete publication collection as a spatial archive ordered by date.
- `src/pages/work/mr-compare.astro` renders a source-faithful academic project page with canonical arXiv metadata and BibTeX, abstract, local demo video, five-stage system workflow, visual comparison, and evaluation summary.
- `src/data/site.ts` is the structured source for identity, links, and curated publication records. It merges `src/data/auto-publications.json` at build time; curated records take precedence over automatically discovered matches.
- `scripts/sync-publications.mjs` performs the weekly, dependency-free arXiv and Crossref author queries, identity filtering by exact name plus research-category/coauthor/affiliation evidence, metadata normalization, and DOI/arXiv/title deduplication. `.github/workflows/sync-publications.yml` commits the generated JSON only when it changes and then dispatches the Pages deployment.
- `src/components/ChangeBlindnessTest.astro` owns only the change-blindness task itself: its truthful perceptual framing, rotated isometric Canvas rendering, the user-adjustable blank-gap timer, hit testing, feedback, and reduced-motion controls. Broader research interpretation remains in the page that embeds it.
- `src/lib/changeBlindnessScene.mjs` deterministically generates a 20-object mixed-primitive scene pair from a seed; one projection-visible target is sampled across balanced depth bands and then moves by at least one footprint, appears, disappears, is replaced, or changes colour.
- `src/components/` also contains the shared site header.
- `src/layouts/BaseLayout.astro` owns document metadata and global progressive enhancement.
- `src/styles/global.css` defines the complete visual system, responsive layouts, dark mode, and reduced-motion behavior.
- `public/media/` contains only media copied into the Astro output, including the MR-Compare figures and office demo video used by the project page.
- `.github/workflows/deploy.yml` builds static Astro output and deploys it to GitHub Pages.
- `skills/astro-research-portfolio/` records the project-specific implementation and quality rules.
- `tests/change-blindness.test.mjs` verifies deterministic generation, all five change modes, 20-object mixed-shape composition, continuous poses, footprint-relative displacement, colour isolation, projection visibility, and statistically balanced depth selection with Node's built-in test runner.

## Deployment path

- `astro.config.mjs` targets `https://changruizhu96.github.io` and uses Astro's default `/` base for the username Pages repository.
- Internal navigation and media URLs continue to derive from `import.meta.env.BASE_URL`, so the same components remain portable without hard-coded repository prefixes.
- The former Jekyll deployment is preserved on `legacy-site-2026-07-13`; the independent `spatial-research-portfolio` repository remains available as a fallback preview.
