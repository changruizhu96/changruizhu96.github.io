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
    color: var(--global-text-color);
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 700;
    line-height: 1.12;
    margin: 0 auto 1.25rem;
    max-width: 1040px;
  }
  .paper-authors {
    font-size: 1.05rem;
    margin-bottom: 0.3rem;
  }
  .paper-authors a {
    color: var(--global-text-color);
  }
  .paper-authors sup,
  .paper-affiliations sup {
    color: var(--global-theme-color);
    font-size: 0.7rem;
    margin-left: 0.08rem;
  }
  .paper-affiliations {
    color: var(--global-text-color-light);
    font-size: 0.95rem;
    line-height: 1.55;
    margin-bottom: 0.45rem;
  }
  .paper-emails {
    color: var(--global-text-color-light);
    font-size: 0.86rem;
    line-height: 1.55;
    margin: 0 auto 1.2rem;
    max-width: 780px;
    overflow-wrap: anywhere;
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
  .paper-video {
    background: #000;
    display: block;
    margin: 1rem auto 0.35rem;
    max-height: 72vh;
    width: 100%;
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
  .paper-figure {
    margin: 1rem auto 0.35rem;
  }
  .paper-figure-caption {
    color: var(--global-text-color-light);
    font-size: 0.9rem;
    line-height: 1.55;
    margin: 0 auto 1.2rem;
    max-width: 900px;
    text-align: center;
  }
  .paper-pipeline {
    display: grid;
    gap: 0.9rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    margin-top: 1rem;
  }
  .paper-pipeline-step {
    border: 1px solid var(--global-divider-color);
    border-radius: 0.5rem;
    padding: 0.95rem;
  }
  .paper-pipeline-step strong {
    color: var(--global-text-color);
    display: block;
    font-size: 0.98rem;
    margin-bottom: 0.25rem;
  }
  .paper-step-label {
    color: var(--global-theme-color);
    margin-right: 0.35rem;
  }
  .paper-pipeline-step p {
    color: var(--global-text-color-light);
    font-size: 0.96rem;
    line-height: 1.62;
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
    <div class="paper-authors">
      <a href="mailto:changrui.zhu.19@ucl.ac.uk">Changrui Zhu</a><sup>1</sup>,
      <a href="mailto:ernst.kruijff@h-brs.de">Ernst Kruijff</a><sup>2</sup>,
      <a href="mailto:pengju.zhang.21@ucl.ac.uk">Pengju Zhang</a><sup>1</sup>,
      <a href="mailto:s.julier@ucl.ac.uk">Simon Julier</a><sup>1</sup>
    </div>
    <div class="paper-affiliations">
      <sup>1</sup>University College London &nbsp;&nbsp; <sup>2</sup>Hochschule Bonn-Rhein-Sieg
    </div>
    <div class="paper-emails">
      changrui.zhu.19@ucl.ac.uk | ernst.kruijff@h-brs.de | pengju.zhang.21@ucl.ac.uk | s.julier@ucl.ac.uk
    </div>

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
      <a class="paper-button" href="#demo">
        <i class="fa-solid fa-film"></i>
        <span>Demo</span>
      </a>
    </div>
  </section>

  <div class="paper-teaser">
    {% include figure.liquid loading="eager" path="assets/img/mr-compare/teaser.jpg" title="MR-Compare overview" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="paper-caption">
    MR-Compare registers mesh and 3D Gaussian Splatting reconstructions to the physical world, then supports in-headset visual comparison through a geometry-driven 3D Slider.
  </div>

  <section class="paper-section" id="demo">
    <h2>Demo</h2>
    <p>
      This demo shows the final MR-Compare outcome in an office scene. Heterogeneous 3D reconstructions have already been registered to the physical space, allowing the user to switch between the aligned reconstruction and the live environment, and to inspect the result with the 3D Slider.
    </p>
    <video class="paper-video rounded z-depth-1" controls playsinline preload="metadata">
      <source src="{{ '/assets/video/mr-compare/office-demo.mp4' | relative_url }}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="paper-figure-caption">
      Final outcome demo: five registered reconstruction outputs aligned with the physical office, including standard 3DGS, RealityScan dense mesh, Scaniverse 3DGS splat, Polycam mesh, and 3DGS-MCMC. The demo shows switching between reconstructions and visualization with the 3D Slider.
    </div>
  </section>

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
    <h2>What does MR-Compare show?</h2>
    <p>
      The system is designed for situations where the physical room is still accessible but the user also has reconstructed digital versions of that room. MR-Compare registers each reconstruction to the live MR coordinate system, so the user can inspect where a reconstruction agrees with, deviates from, or visually complements the current physical environment.
    </p>
    <div class="paper-figure">
      {% include figure.liquid loading="eager" path="assets/img/mr-compare/visual-comparison.jpg" title="Visual comparison examples" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="paper-figure-caption">
      Examples of registered reconstructions in two physical rooms. The columns compare mesh and 3DGS workflows, including desktop and mobile capture pipelines.
    </div>
  </section>

  <section class="paper-section">
    <h2>Method</h2>
    <p>
      The teaser summarises MR-Compare as a single source-to-interaction pipeline. The system first converts heterogeneous reconstructions and headset observations into comparable point-cloud representations, then uses coarse-to-fine registration to place the reconstruction in the Quest world coordinate system before enabling in-headset visual comparison.
    </p>
    <div class="paper-pipeline">
      <div class="paper-pipeline-step">
        <strong><span class="paper-step-label">(a)</span>Source point collection</strong>
        <p>Each reconstruction is converted into a source point cloud: mesh vertices for mesh workflows and Gaussian centres for 3DGS workflows. A radius crop and optional voxel-hash density filter remove distant background content, skyboxes, and isolated floating points before registration.</p>
      </div>
      <div class="paper-pipeline-step">
        <strong><span class="paper-step-label">(b)</span>Target point collection</strong>
        <p>The Quest-side target cloud is built from the Meta Quest 3 Depth API. A point cloud generator raycasts screen-space samples into world-space points, while chunked storage and density caps keep the scan practical for in-headset use.</p>
      </div>
      <div class="paper-pipeline-step">
        <strong><span class="paper-step-label">(c)</span>Coarse registration</strong>
        <p>After voxelisation reduces density mismatch, FPFH-based correspondences provide a global initialisation. MR-Compare supports robust coarse estimators such as TEASER++ and TurboReg, producing an initial alignment between reconstruction and headset scan.</p>
      </div>
      <div class="paper-pipeline-step">
        <strong><span class="paper-step-label">(d)</span>Fine registration</strong>
        <p>The coarse transform is refined with G-ICP or V-GICP through the small_gicp backend. The resulting transform is persisted in the Quest world coordinate system so the aligned asset remains spatially grounded during comparison.</p>
      </div>
      <div class="paper-pipeline-step">
        <strong><span class="paper-step-label">(e)</span>XR interactive comparison</strong>
        <p>The final interface combines the registered reconstruction with live video see-through. A geometry-driven 3D Slider uses a movable volumetric alpha mask, letting users reveal reconstruction and physical-world content in the same spatial frame.</p>
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
    <p>
      A second controlled Replica evaluation complements the real-world study. It uses eight NICE-SLAM Replica indoor scenes, reconstructs each scene with 3DGS and 3DGS-MCMC, and generates Quest-like target scans from the Replica meshes to isolate registration behaviour under reproducible conditions.
    </p>
    <p>
      In this setting, MR-Compare evaluates a zero-shot anisotropy filter for 3DGS source point selection. Sweeping the anisotropy threshold shows that moderate pruning can rescue failed registrations and reduce both translation and rotation error. The reported gains are larger for standard 3DGS, with reductions of 0.35 cm / 37.6% and 0.08 degrees / 38.7%, while 3DGS-MCMC improves by 0.12 cm / 16.9% and 0.04 degrees / 29.1%.
    </p>
    <div class="paper-figure">
      {% include figure.liquid loading="lazy" path="assets/img/mr-compare/replica-anisotropy.jpg" title="Replica anisotropy filter evaluation" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="paper-figure-caption">
      Replica tau-sweep heatmaps for translation and rotation errors. Moderate anisotropy pruning improves robustness and accuracy, especially for standard 3DGS.
    </div>
    <div class="paper-figure">
      {% include figure.liquid loading="lazy" path="assets/img/mr-compare/registration-ratings.jpg" title="Registration ratings" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="paper-figure-caption">
      Predicted response distributions for subjective registration ratings across rooms and reconstruction workflows.
    </div>
    <div class="paper-figure">
      {% include figure.liquid loading="lazy" path="assets/img/mr-compare/visual-consistency.jpg" title="Visual consistency ratings" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="paper-figure-caption">
      Predicted response distributions for visual consistency dimensions, including clarity, depth, completeness, geometry, and recognizability.
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
  author = {Zhu, Changrui and Kruijff, Ernst and Zhang, Pengju and Julier, Simon},
  year   = {2026},
  note   = {Conditionally accepted at IEEE ISMAR 2026}
}</pre>
  </section>
</div>
