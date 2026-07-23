import assert from "node:assert/strict";
import test from "node:test";
import {
  buildSynchronizedPublications,
  parseArxivFeed,
  parseCrossrefResponse,
} from "../scripts/sync-publications.mjs";
import { mergePublications } from "../src/lib/publications.mjs";

const arxivFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:arxiv="http://arxiv.org/schemas/atom">
  <entry>
    <id>http://arxiv.org/abs/2607.20325v2</id>
    <updated>2026-07-23T12:00:00Z</updated>
    <published>2026-07-22T12:00:00Z</published>
    <title>MR-Compare: A Mixed-Reality Framework</title>
    <author><name>Changrui Zhu</name></author>
    <author><name>Ernst Kruijff</name></author>
    <category term="cs.GR" scheme="http://arxiv.org/schemas/atom"/>
    <arxiv:doi>10.1000/mr-compare</arxiv:doi>
  </entry>
  <entry>
    <id>http://arxiv.org/abs/2601.00001v1</id>
    <published>2026-01-01T12:00:00Z</published>
    <title>A namesake's paper</title>
    <author><name>Changrui Zhu</name></author>
    <author><name>Someone Else</name></author>
    <category term="physics.optics" scheme="http://arxiv.org/schemas/atom"/>
  </entry>
</feed>`;

const crossrefResponse = {
  message: {
    items: [
      {
        DOI: "10.1000/mr-compare",
        type: "journal-article",
        title: ["MR-Compare: A Mixed-Reality Framework"],
        author: [
          { given: "Changrui", family: "Zhu" },
          { given: "Ernst", family: "Kruijff" },
        ],
        "container-title": ["IEEE TVCG"],
        published: { "date-parts": [[2026, 8, 1]] },
        subject: ["Computer Graphics"],
      },
      {
        DOI: "10.1000/namesake",
        type: "journal-article",
        title: ["Another person's work"],
        author: [
          { given: "Changrui", family: "Zhu" },
          { given: "Someone", family: "Else" },
        ],
        published: { "date-parts": [[2026, 1, 1]] },
      },
      {
        DOI: "10.1000/supplement",
        type: "component",
        title: ["MR-Compare supplementary video"],
        author: [{ given: "Changrui", family: "Zhu" }],
        published: { "date-parts": [[2026, 8, 1]] },
      },
    ],
  },
};

test("arXiv parsing keeps exact author matches and canonicalizes versioned IDs", () => {
  const entries = parseArxivFeed(arxivFeed);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].arxivId, "2607.20325");
  assert.deepEqual(entries[0].categories, ["cs.GR"]);
});

test("Crossref parsing rejects namesakes and non-publication components", () => {
  const entries = parseCrossrefResponse(crossrefResponse, ["MR-Compare: A Mixed-Reality Framework"]);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].DOI, "10.1000/mr-compare");
});

test("automatic sources deduplicate formal and preprint records by DOI", () => {
  const publications = buildSynchronizedPublications(arxivFeed, crossrefResponse);
  assert.equal(publications.length, 1);
  assert.equal(publications[0].venue, "IEEE TVCG");
  assert.equal(publications[0].href, "https://doi.org/10.1000/mr-compare");
});

test("curated records take precedence and titles provide a fallback key", () => {
  const curated = {
    year: "2026",
    venue: "Curated venue",
    kind: "Preprint",
    title: "A Spatial Paper: With Punctuation",
    authors: "Changrui Zhu",
    summary: "Hand-written summary.",
    topics: ["Spatial computing"],
    href: "https://example.com/curated",
  };
  const automatic = {
    ...curated,
    venue: "Automatic venue",
    title: "A spatial paper — with punctuation",
    summary: undefined,
  };

  assert.deepEqual(mergePublications([curated], [automatic]), [curated]);
});

test("deduplication carries identifiers across matching record variants", () => {
  const curated = {
    year: "2026",
    venue: "Curated",
    kind: "Preprint",
    title: "One paper",
    authors: "Changrui Zhu",
    topics: [],
    href: "https://example.com/curated",
  };
  const titleMatch = {
    ...curated,
    venue: "Automatic preprint",
    href: "https://doi.org/10.1000/one",
    doi: "10.1000/one",
  };
  const doiMatch = {
    ...titleMatch,
    venue: "Automatic duplicate",
    title: "A changed title",
  };

  assert.deepEqual(mergePublications([curated], [titleMatch, doiMatch]), [curated]);
});
