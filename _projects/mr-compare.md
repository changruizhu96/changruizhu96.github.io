---
layout: page
title: MR-Compare
description: Conditionally accepted at IEEE ISMAR 2026.
img: assets/img/mr-compare/teaser.jpg
importance: 0
category: work
github: https://github.com/changruizhu96/MR-Compare
_styles: >
  .mr-project-hero {
    margin-top: 0.75rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  .mr-author-line {
    color: var(--global-text-color-light);
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .mr-paper-title {
    font-size: 1.15rem;
    line-height: 1.55;
    margin: 0 auto 0.8rem;
    max-width: 900px;
  }
  .mr-status-badge {
    border: 1px solid var(--global-theme-color);
    border-radius: 999px;
    color: var(--global-theme-color);
    display: inline-flex;
    font-size: 0.92rem;
    margin-bottom: 1rem;
    padding: 0.35rem 0.75rem;
  }
  .mr-link-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem;
    margin: 1rem 0 1.5rem;
  }
  .mr-link-button {
    align-items: center;
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    display: inline-flex;
    font-size: 0.95rem;
    gap: 0.45rem;
    padding: 0.45rem 0.85rem;
  }
  .mr-link-button.disabled {
    color: var(--global-text-color-light);
    cursor: default;
    opacity: 0.7;
  }
  .mr-teaser {
    margin: 1.25rem auto 0.5rem;
    max-width: 1100px;
  }
  .mr-teaser img {
    width: 100%;
  }
  .mr-section-lead {
    font-size: 1.05rem;
    line-height: 1.7;
  }
  .mr-feature-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    margin: 1.25rem 0 1.5rem;
  }
  .mr-feature {
    border: 1px solid var(--global-divider-color);
    border-radius: 0.5rem;
    padding: 1rem;
  }
  .mr-feature h3 {
    font-size: 1rem;
    margin-bottom: 0.4rem;
  }
  .mr-feature p {
    color: var(--global-text-color-light);
    font-size: 0.95rem;
    margin-bottom: 0;
  }
  .mr-pipeline-list li {
    margin-bottom: 0.4rem;
  }
  .mr-status-note {
    border-left: 3px solid var(--global-theme-color);
    color: var(--global-text-color-light);
    margin: 1.25rem 0;
    padding: 0.75rem 1rem;
  }
  .mr-citation {
    background: var(--global-code-bg-color);
    border-radius: 0.5rem;
    font-size: 0.9rem;
    padding: 1rem;
    white-space: pre-wrap;
  }
---

<div class="mr-project-hero">
  <div class="mr-paper-title">
    MR-Compare: A Mixed-Reality Framework for Spatially Grounded Visual Comparison of Heterogeneous 3D Reconstructions with Reality
  </div>
  <div class="mr-author-line">Changrui Zhu et al.</div>
  <div class="mr-status-badge">Conditionally accepted at IEEE ISMAR 2026</div>
  <div class="mr-link-row">
    <a class="mr-link-button" href="https://github.com/changruizhu96/MR-Compare" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-github"></i>
      <span>Code</span>
    </a>
    <a class="mr-link-button" href="https://github.com/changruizhu96/MR-Compare#readme" target="_blank" rel="noopener noreferrer">
      <i class="fa-solid fa-book-open"></i>
      <span>Docs</span>
    </a>
    <span class="mr-link-button disabled">
      <i class="fa-solid fa-file-lines"></i>
      <span>Paper coming soon</span>
    </span>
    <span class="mr-link-button disabled">
      <i class="fa-solid fa-film"></i>
      <span>Demo coming soon</span>
    </span>
  </div>
</div>

<div class="mr-teaser">
  {% include figure.liquid loading="eager" path="assets/img/mr-compare/teaser.jpg" title="MR Compare system workflow" class="img-fluid rounded z-depth-1" %}
</div>
<div class="caption">
  MR-Compare registers heterogeneous 3D reconstructions to the physical world and supports spatially grounded visual comparison in mixed reality.
</div>

## Overview

<p class="mr-section-lead">
MR-Compare is a spatially grounded mixed reality framework for comparing heterogeneous 3D reconstructions with the live physical world. Implemented on Meta Quest 3, it aligns mesh and 3D Gaussian Splatting reconstructions to the headset's world coordinate system and lets users compare the reconstructed past with the live video see-through present.
</p>

The paper studies three connected problems:

- deriving source and target point clouds from heterogeneous reconstruction outputs and Quest-side scene sensing;
- registering reconstructed assets to the physical environment with a self-contained coarse-to-fine Unity pipeline;
- supporting perceptually grounded in-headset comparison through an interactive 3D Slider.

## Method

<div class="mr-feature-grid">
  <div class="mr-feature">
    <h3>Heterogeneous Inputs</h3>
    <p>Supports mesh and 3DGS reconstructions by converting each source representation into registration-ready point clouds.</p>
  </div>
  <div class="mr-feature">
    <h3>Quest Target</h3>
    <p>Builds a target point representation from Quest-side depth and scene information for spatial grounding in the physical room.</p>
  </div>
  <div class="mr-feature">
    <h3>Registration</h3>
    <p>Combines robust global alignment with fine refinement, using TEASER++ or TurboReg for coarse registration and G-ICP or V-GICP for refinement.</p>
  </div>
  <div class="mr-feature">
    <h3>3D Slider</h3>
    <p>Uses geometry-driven masking to slide between the reconstruction and live VST, enabling direct spatial comparison inside MR.</p>
  </div>
</div>

The high-level pipeline is:

<ol class="mr-pipeline-list">
  <li>Collect source data using desktop or mobile reconstruction workflows.</li>
  <li>Import the source scene as a mesh or 3DGS asset.</li>
  <li>Extract and filter source points from the reconstructed representation.</li>
  <li>Acquire target points from Quest-side depth sensing and scene data.</li>
  <li>Estimate a robust global transform from feature correspondences.</li>
  <li>Refine the alignment with G-ICP or V-GICP.</li>
  <li>Persist the transform relative to the MR world coordinate system.</li>
  <li>Compare the aligned reconstruction with live VST using the 3D Slider.</li>
</ol>

## Evaluation

The paper evaluates MR-Compare through a real-world comparative benchmark and an exploratory user study with 30 participants. The study covers five practical reconstruction workflows: RealityScan mesh, Polycam mesh, desktop 3DGS, desktop 3DGS-MCMC, and Scaniverse 3DGS. Across these workflows, MR-Compare achieved centimetre-level registration, with desktop 3DGS workflows showing the strongest overall visual consistency in the tested settings.

The draft also studies a training-free anisotropy filter for improving 3DGS-to-scan registration on Replica scenes. Moderate pruning reduces residual alignment error by selecting more surface-proximal Gaussian centres for registration.

## Project Status

MR-Compare is a paper project conditionally accepted at IEEE ISMAR 2026. The final publication route is still pending, so the public paper link and final citation will be updated after the camera-ready version is available.

## Citation

<div class="mr-citation">@misc{zhu2026mrcompare,
  title  = {MR-Compare: A Mixed-Reality Framework for Spatially Grounded Visual Comparison of Heterogeneous 3D Reconstructions with Reality},
  author = {Zhu, Changrui and others},
  year   = {2026},
  note   = {Conditionally accepted at IEEE ISMAR 2026}
}</div>

