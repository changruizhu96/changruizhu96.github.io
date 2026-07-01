---
layout: page
title: MR-Compare
description: Conditionally accepted at IEEE ISMAR 2026.
img: assets/img/mr-compare/teaser.jpg
importance: 0
category: work
github: https://github.com/changruizhu96/MR-Compare
_styles: >
  .post-header {
    display: none;
  }
  .paper-page {
    margin: 0 auto;
    max-width: 1040px;
  }
  .paper-hero {
    margin: 0.5rem auto 2rem;
    text-align: center;
  }
  .paper-venue {
    border: 1px solid var(--global-theme-color);
    border-radius: 999px;
    color: var(--global-theme-color);
    display: inline-flex;
    font-size: 0.92rem;
    margin-bottom: 1rem;
    padding: 0.35rem 0.8rem;
  }
  .paper-title {
    font-family: var(--global-font-family);
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 700;
    line-height: 1.12;
    margin: 0 auto 1rem;
    max-width: 980px;
  }
  .paper-subtitle {
    color: var(--global-text-color-light);
    font-size: 1.05rem;
    line-height: 1.6;
    margin: 0 auto 1.1rem;
    max-width: 800px;
  }
  .paper-authors {
    font-size: 1.05rem;
    margin-bottom: 0.3rem;
  }
  .paper-affiliations {
    color: var(--global-text-color-light);
    font-size: 0.95rem;
    margin-bottom: 1.2rem;
  }
  .paper-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    justify-content: center;
    margin: 1rem 0 1.5rem;
  }
  .paper-button {
    align-items: center;
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    display: inline-flex;
    font-size: 0.95rem;
    gap: 0.45rem;
    padding: 0.5rem 0.9rem;
  }
  .paper-button.disabled {
    color: var(--global-text-color-light);
    cursor: default;
    opacity: 0.72;
  }
  .paper-teaser {
    margin: 1.25rem auto 0.4rem;
  }
  .paper-teaser img {
    width: 100%;
  }
  .paper-caption {
    color: var(--global-text-color-light);
    font-size: 0.92rem;
    line-height: 1.55;
    margin: 0 auto 2.2rem;
    max-width: 900px;
    text-align: center;
  }
  .paper-section {
    margin: 2.4rem 0;
  }
  .paper-section h2 {
    font-size: 1.55rem;
    margin-bottom: 0.85rem;
  }
  .paper-section p {
    font-size: 1.02rem;
    line-height: 1.72;
  }
  .paper-highlight-grid {
    display: grid;
    gap: 0.9rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    margin-top: 1rem;
  }
  .paper-highlight {
    border: 1px solid var(--global-divider-color);
    border-radius: 0.5rem;
    padding: 0.95rem;
  }
  .paper-highlight h3 {
    font-size: 1rem;
    margin-bottom: 0.35rem;
  }
  .paper-highlight p {
    color: var(--global-text-color-light);
    font-size: 0.94rem;
    line-height: 1.55;
    margin-bottom: 0;
  }
  .paper-results {
    display: grid;
    gap: 0.9rem;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    margin-top: 1rem;
  }
  .paper-result {
    border-left: 3px solid var(--global-theme-color);
    padding-left: 0.8rem;
  }
  .paper-result strong {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
  .paper-result span {
    color: var(--global-text-color-light);
    font-size: 0.95rem;
  }
  .paper-bibtex {
    background: var(--global-code-bg-color);
    border-radius: 0.5rem;
    font-size: 0.9rem;
    overflow-x: auto;
    padding: 1rem;
    white-space: pre;
  }
---

<div class="paper-page">
  <section class="paper-hero">
    <div class="paper-venue">Conditionally accepted at IEEE ISMAR 2026</div>
    <h1 class="paper-title">MR-Compare</h1>
    <p class="paper-subtitle">
      A Mixed-Reality Framework for Spatially Grounded Visual Comparison of Heterogeneous 3D Reconstructions with Reality
    </p>
    <div class="paper-authors">Changrui Zhu et al.</div>
    <div class="paper-affiliations">University College London</div>

    <div class="paper-links">
      <span class="paper-button disabled">
        <i class="fa-solid fa-file-lines"></i>
        <span>Paper coming soon</span>
      </span>
      <a class="paper-button" href="https://github.com/changruizhu96/MR-Compare" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-github"></i>
        <span>Code</span>
      </a>
      <a class="paper-button" href="https://github.com/changruizhu96/MR-Compare#readme" target="_blank" rel="noopener noreferrer">
        <i class="fa-solid fa-book-open"></i>
        <span>Docs</span>
      </a>
      <span class="paper-button disabled">
        <i class="fa-solid fa-film"></i>
        <span>Video coming soon</span>
      </span>
    </div>
  </section>

  <div class="paper-teaser">
    {% include figure.liquid loading="eager" path="assets/img/mr-compare/teaser.jpg" title="MR-Compare overview" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="paper-caption">
    MR-Compare registers mesh and 3D Gaussian Splatting reconstructions to the physical world, then supports in-headset visual comparison through a geometry-driven 3D Slider.
  </div>

  <section class="paper-section">
    <h2>Abstract</h2>
    <p>
      MR-Compare is a spatially grounded mixed reality framework for comparing heterogeneous 3D reconstructions with the live physical world. Implemented on Meta Quest 3, the system aligns mesh and 3D Gaussian Splatting reconstructions to the headset's world coordinate system and enables cross-media comparison between reconstructed scenes and live video see-through.
    </p>
    <p>
      The paper evaluates MR-Compare through a real-world benchmark and an exploratory user study with 30 participants, covering practical desktop and mobile reconstruction workflows. The results show centimetre-level registration across tested workflows and strong visual consistency for desktop 3DGS-based reconstructions.
    </p>
  </section>

  <section class="paper-section">
    <h2>Method</h2>
    <div class="paper-highlight-grid">
      <div class="paper-highlight">
        <h3>Heterogeneous Inputs</h3>
        <p>Mesh and 3DGS assets are converted into point-cloud representations suitable for registration.</p>
      </div>
      <div class="paper-highlight">
        <h3>Quest Target</h3>
        <p>Quest-side depth and scene data provide a target representation of the physical environment.</p>
      </div>
      <div class="paper-highlight">
        <h3>Coarse-to-Fine Registration</h3>
        <p>Feature-based global alignment is refined with G-ICP or V-GICP inside a self-contained Unity pipeline.</p>
      </div>
      <div class="paper-highlight">
        <h3>3D Slider</h3>
        <p>A geometry-driven MR mask lets users slide between reconstruction and live VST for spatial comparison.</p>
      </div>
    </div>
  </section>

  <section class="paper-section">
    <h2>Evaluation</h2>
    <p>
      The evaluation covers five representative reconstruction workflows: RealityScan mesh, Polycam mesh, desktop 3DGS, desktop 3DGS-MCMC, and Scaniverse 3DGS. The study combines objective registration and image-based consistency metrics with subjective ratings of perceived alignment, perceived visual consistency, usability, and cognitive workload.
    </p>
    <div class="paper-results">
      <div class="paper-result">
        <strong>30 participants</strong>
        <span>Exploratory user study in mixed reality.</span>
      </div>
      <div class="paper-result">
        <strong>5 workflows</strong>
        <span>Desktop and mobile capture, mesh and 3DGS representations.</span>
      </div>
      <div class="paper-result">
        <strong>Centimetre-level</strong>
        <span>Registration accuracy across tested real-world settings.</span>
      </div>
      <div class="paper-result">
        <strong>Anisotropy filter</strong>
        <span>Training-free 3DGS source pruning evaluated on Replica scenes.</span>
      </div>
    </div>
  </section>

  <section class="paper-section">
    <h2>Status</h2>
    <p>
      MR-Compare is conditionally accepted at IEEE ISMAR 2026. The public preprint, final publication venue details, video, and camera-ready citation will be added after they are available.
    </p>
  </section>

  <section class="paper-section">
    <h2>BibTeX</h2>
<pre class="paper-bibtex">@misc{zhu2026mrcompare,
  title  = {MR-Compare: A Mixed-Reality Framework for Spatially Grounded Visual Comparison of Heterogeneous 3D Reconstructions with Reality},
  author = {Zhu, Changrui and others},
  year   = {2026},
  note   = {Conditionally accepted at IEEE ISMAR 2026}
}</pre>
  </section>
</div>
