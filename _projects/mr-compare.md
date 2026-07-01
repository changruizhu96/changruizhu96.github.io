---
layout: page
title: MR Compare
description: Mixed reality registration and visual comparison for reconstructed 3D scenes.
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
  <div class="mr-author-line">Changrui Zhu</div>
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
  MR Compare aligns a reconstructed source scene, such as a 3D Gaussian Splatting asset or mesh, with a Quest-side target representation and supports in-headset visual comparison.
</div>

## Overview

<p class="mr-section-lead">
MR Compare is a Unity-based mixed reality system for registering reconstructed 3D scenes against a user's current physical environment. It is designed for workflows where a user brings a reconstructed scene, either as a 3D Gaussian Splatting asset or as a mesh, and aligns it with the real environment captured or represented by Meta Quest.
</p>

The project focuses on three tasks:

- deriving source and target point cloud representations from reconstructed assets and Quest-side scene data;
- registering the reconstruction to the physical environment through robust coarse alignment and fine refinement;
- comparing the registered reconstruction with passthrough in a mixed reality headset.

## Method

<div class="mr-feature-grid">
  <div class="mr-feature">
    <h3>Source Representation</h3>
    <p>Imports a reconstructed scene as either a 3D Gaussian Splatting asset or Unity mesh and extracts registration points from the source geometry.</p>
  </div>
  <div class="mr-feature">
    <h3>Quest Target</h3>
    <p>Builds a target point representation from a saved Quest scan, real-time scan, room mesh, or effect mesh.</p>
  </div>
  <div class="mr-feature">
    <h3>Coarse Registration</h3>
    <p>Uses voxelisation, FPFH features, and TEASER++ to recover a robust initial alignment under noisy correspondences.</p>
  </div>
  <div class="mr-feature">
    <h3>Fine Registration</h3>
    <p>Refines the final transform with GICP or VGICP once the source and target point clouds have reasonable overlap.</p>
  </div>
</div>

The high-level pipeline is:

<ol class="mr-pipeline-list">
  <li>Collect source data with a phone, camera, or desktop reconstruction workflow.</li>
  <li>Import the source scene as a mesh or 3DGS asset.</li>
  <li>Extract source points from the reconstructed representation.</li>
  <li>Collect target points from Quest scene data, saved scans, room meshes, or effect meshes.</li>
  <li>Run TEASER++ coarse alignment with voxelised features and robust correspondence handling.</li>
  <li>Refine the transform with GICP or VGICP.</li>
  <li>Save or load the alignment relative to a spatial anchor, room mesh, or effect mesh.</li>
  <li>Inspect the result in mixed reality with interactive visual comparison modes.</li>
</ol>

## Mixed Reality Comparison

After registration, MR Compare applies the recovered transform to the reconstructed source scene and exposes visual comparison controls inside the headset. The comparison system can target either a Gaussian Splatting renderer or a standard mesh renderer, enabling workflows such as opacity adjustment, switch-back visibility, and passthrough-based inspection.

<div class="mr-status-note">
  This page currently uses the system workflow figure as its teaser. Replace it with a headset demo video, side-by-side comparison, or captured result once the final media is ready.
</div>

## Project Status

MR Compare is a research/prototype Unity project targeting Meta Quest 3 and compatible Meta XR devices. It is intended to be opened, inspected, modified, and adapted for scene-specific registration workflows. User-specific reconstructed scenes are not included in the repository.

## Citation

<div class="mr-citation">@misc{zhu2026mrcompare,
  title  = {MR Compare: Mixed Reality Registration and Visual Comparison for Reconstructed 3D Scenes},
  author = {Zhu, Changrui},
  year   = {2026},
  note   = {Unity research prototype}
}</div>

