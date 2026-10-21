import automaticPublications from "./auto-publications.json";
import { mergePublications } from "../lib/publications.mjs";

export type Publication = {
  year: string;
  venue: string;
  kind: string;
  title: string;
  authors: string;
  summary?: string;
  award?: string;
  topics: string[];
  href: string;
  doi?: string;
  arxivId?: string;
  published?: string;
};

export const site = {
  name: "Changrui Zhu",
  role: "PhD researcher · Spatial computing · UCL",
  email: "changrui.zhu.19@ucl.ac.uk",
  statement: "Every space exists between the memory of what it was and the possibility of what it might become.",
  introduction: "I build systems for understanding and interacting with physical, reconstructed, and virtual environments. My work brings together 3D vision, VR/MR development, and studies of human perception, from reconstructing scenes and detecting change to how people compare and understand them.",
  links: [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=gjFTZ9EAAAAJ" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/changrui-zhu-b078031bb" },
    { label: "Email", href: "mailto:changrui.zhu.19@ucl.ac.uk" },
  ],
};

const curatedPublications = [
  {
    year: "2026",
    venue: "arXiv",
    kind: "Preprint",
    title: "Learning from Automatic 3D Gaussian Splatting Edits for Online Bayesian Scene Change Detection",
    authors: "Changrui Zhu, Simon Julier",
    summary: "Scene-specific evidence models learned from automatic reference-scene edits support online change detection through Bayesian evidence fusion and a shared 3D history.",
    topics: ["Scene change detection", "3D Gaussian Splatting", "Bayesian inference"],
    href: "https://arxiv.org/abs/2610.28490",
    arxivId: "2610.28490",
    published: "2026-10-20",
  },
  {
    year: "2026",
    venue: "IEEE ISMAR 2026",
    kind: "IEEE TVCG Special Issue",
    award: "Best Paper Award · Honorable Mention",
    title: "MR-Compare: A Mixed-Reality Framework for Spatially Grounded Visual Comparison of 3D Gaussian Splatting and Mesh Reconstructions with the Physical Environment",
    authors: "Changrui Zhu, Ernst Kruijff, Pengju Zhang, Simon Julier",
    summary: "A mixed-reality framework that spatially registers 3D Gaussian Splatting and mesh reconstructions with the physical environment for in-headset visual comparison.",
    topics: ["Mixed reality", "3D reconstruction", "Spatial registration"],
    href: "https://arxiv.org/abs/2607.20325",
  },
  {
    year: "2026",
    venue: "Displays",
    kind: "Journal article",
    title: "Does display type matter for change detection? Comparing immersive and non-immersive displays under low and high semantic availability",
    authors: "Changrui Zhu, Ernst Kruijff, Harvey Stedman, Vijay M. Pawar, Simon Julier",
    summary: "A controlled investigation of how immersion and semantic availability shape visual change detection.",
    topics: ["Change detection", "Display", "Perception"],
    href: "https://doi.org/10.1016/j.displa.2026.103379",
  },
  {
    year: "2025",
    venue: "ACM UIST",
    kind: "Conference paper",
    title: "Do You See What I See? Bring Live Pedestrians into an Outdoor Collaborative Mixed Reality Experience",
    authors: "Jingyi Zhang, Ziwen Lu, Changrui Zhu, Simon Julier, Anthony Steed",
    summary: "A collaborative mixed-reality system that brings live pedestrians into a shared outdoor experience.",
    topics: ["Mixed reality", "Collaboration", "Live capture"],
    href: "https://doi.org/10.1145/3746059.3747667",
  },
  {
    year: "2025",
    venue: "IEEE VR 2025",
    kind: "IEEE TVCG Special Issue",
    title: "Evaluating 3D Visual Comparison Techniques for Change Detection in Virtual Reality",
    authors: "Changrui Zhu, Ernst Kruijff, Vijay M. Pawar, Simon Julier",
    summary: "An evaluation of spatial comparison techniques for identifying change in immersive 3D environments.",
    topics: ["Virtual reality", "3D comparison", "Human study"],
    href: "https://doi.org/10.1109/TVCG.2025.3549578",
  },
  {
    year: "2025",
    venue: "ISARC",
    kind: "Conference paper",
    title: "Enabling human-robot collaboration in unstructured construction environment through sharing control: Classification, Challenges, and Future Trends",
    authors: "Guohao Wang, Changrui Zhu, Honghu Chu, Abdul-Majeed Mahamadu, Vijay M. Pawar",
    summary: "A classification of shared-control approaches, challenges, and research directions for construction robotics.",
    topics: ["Human-robot collaboration", "Shared control", "Construction"],
    href: "https://doi.org/10.22260/ISARC2025/0117",
  },
  {
    year: "2019",
    venue: "IEEE DASC",
    kind: "Conference paper",
    title: "Emotion recognition from speech to improve human-robot interaction",
    authors: "Changrui Zhu, Waseem Ahmad",
    summary: "An early exploration of speech emotion recognition as a signal for more responsive human-robot interaction.",
    topics: ["Emotion recognition", "Speech", "Human-robot interaction"],
    href: "https://ieeexplore.ieee.org/document/8877543",
  },
] satisfies Publication[];

export const publications = mergePublications(
  curatedPublications,
  automaticPublications,
) as Publication[];
