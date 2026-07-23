import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { mergePublications } from "../src/lib/publications.mjs";

export const AUTHOR = {
  display: "Changrui Zhu",
  given: "Changrui",
  family: "Zhu",
};

const CONTACT_EMAIL = "changrui.zhu.19@ucl.ac.uk";
const MAX_RESULTS = 100;
const OUTPUT_PATH = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/auto-publications.json");
const TRUSTED_COAUTHORS = [
  "Ernst Kruijff",
  "Pengju Zhang",
  "Simon Julier",
  "Harvey Stedman",
  "Vijay M Pawar",
  "Vijay Pawar",
  "Jingyi Zhang",
  "Ziwen Lu",
  "Anthony Steed",
  "Guohao Wang",
  "Honghu Chu",
  "Abdul-Majeed Mahamadu",
  "Waseem Ahmad",
  "Wasim Ahmad",
].map(normalizeName);
const RESEARCH_CATEGORIES = new Set(["cs.CV", "cs.GR", "cs.HC", "cs.MM", "cs.RO"]);
const CROSSREF_TYPES = new Set(["book-chapter", "journal-article", "posted-content", "proceedings-article"]);

function normalizeWhitespace(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function normalizeName(value) {
  return normalizeWhitespace(value)
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim();
}

function isTargetDisplayName(value) {
  const normalized = normalizeName(value);
  return normalized === normalizeName(AUTHOR.display)
    || normalized === normalizeName(`${AUTHOR.family} ${AUTHOR.given}`);
}

function isTargetCrossrefAuthor(author) {
  return normalizeName(author?.family) === normalizeName(AUTHOR.family)
    && normalizeName(author?.given).split(" ")[0] === normalizeName(AUTHOR.given);
}

function hasTrustedDisplayName(names) {
  return names.some((name) => TRUSTED_COAUTHORS.includes(normalizeName(name)));
}

function crossrefAuthorName(author) {
  return [author?.given, author?.family].filter(Boolean).join(" ");
}

function hasTrustedCrossrefIdentity(item) {
  const hasTrustedCoauthor = item.author?.some((author) => (
    !isTargetCrossrefAuthor(author)
    && TRUSTED_COAUTHORS.includes(normalizeName(crossrefAuthorName(author)))
  ));
  const targetAuthor = item.author?.find(isTargetCrossrefAuthor);
  const hasUclAffiliation = targetAuthor?.affiliation?.some((affiliation) => {
    const name = normalizeName(affiliation?.name);
    return name.includes("university college london") || /\bucl\b/.test(name);
  });
  return Boolean(hasTrustedCoauthor || hasUclAffiliation);
}

function decodeXml(value) {
  const namedEntities = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: "\"",
  };

  return String(value ?? "")
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => namedEntities[name.toLowerCase()] ?? match);
}

function textContent(value) {
  return normalizeWhitespace(decodeXml(String(value ?? "").replace(/<[^>]+>/g, " ")));
}

function extractTag(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? textContent(match[1]) : "";
}

function extractArxivId(value) {
  return String(value ?? "")
    .replace(/^https?:\/\/arxiv\.org\/abs\//i, "")
    .replace(/v\d+$/i, "")
    .trim();
}

function arxivTopics(categories) {
  const labels = {
    "cs.CV": "3D vision",
    "cs.GR": "Computer graphics",
    "cs.HC": "Human-computer interaction",
    "cs.RO": "Robotics",
  };
  return [...new Set(categories.map((category) => labels[category] || category))].slice(0, 3);
}

export function parseArxivFeed(xml) {
  const entries = [...String(xml).matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map((match) => match[1]);

  return entries.map((entry) => {
    const authors = [...entry.matchAll(/<author>([\s\S]*?)<\/author>/gi)]
      .map((match) => extractTag(match[1], "name"))
      .filter(Boolean);
    const categories = [...entry.matchAll(/<category\b[^>]*\bterm=(["'])(.*?)\1[^>]*\/?>/gi)]
      .map((match) => decodeXml(match[2]));
    const arxivId = extractArxivId(extractTag(entry, "id"));
    const published = extractTag(entry, "published").slice(0, 10);

    return {
      arxivId,
      title: extractTag(entry, "title"),
      authors,
      published,
      updated: extractTag(entry, "updated").slice(0, 10),
      categories,
      doi: extractTag(entry, "arxiv:doi"),
    };
  }).filter((entry) => (
    entry.arxivId
    && entry.title
    && entry.authors.some(isTargetDisplayName)
    && (
      hasTrustedDisplayName(entry.authors)
      || entry.categories.some((category) => RESEARCH_CATEGORIES.has(category))
    )
  ));
}

export function arxivEntryToPublication(entry) {
  return {
    year: entry.published.slice(0, 4),
    venue: "arXiv",
    kind: "Preprint",
    title: entry.title,
    authors: entry.authors.join(", "),
    topics: arxivTopics(entry.categories),
    href: `https://arxiv.org/abs/${entry.arxivId}`,
    arxivId: entry.arxivId,
    ...(entry.doi ? { doi: entry.doi } : {}),
    published: entry.published,
  };
}

function crossrefDate(item) {
  const dateParts = [
    item["published-print"],
    item["published-online"],
    item.published,
    item.issued,
  ].map((value) => value?.["date-parts"]?.[0]).find((parts) => Number.isInteger(parts?.[0]));

  if (!dateParts) return item.created?.["date-time"]?.slice(0, 10) || "";
  const [year, month = 1, day = 1] = dateParts;
  return [year, month, day].map((value, index) => index === 0 ? String(value) : String(value).padStart(2, "0")).join("-");
}

function crossrefKind(type) {
  const labels = {
    "journal-article": "Journal article",
    "proceedings-article": "Conference paper",
    "posted-content": "Preprint",
    "book-chapter": "Book chapter",
  };
  return labels[type] || "Research output";
}

export function parseCrossrefResponse(payload, knownTitles = []) {
  const items = payload?.message?.items;
  if (!Array.isArray(items)) throw new Error("Crossref returned an unexpected response.");
  const normalizedKnownTitles = new Set(knownTitles.map((title) => normalizeName(title)));
  return items.filter((item) => (
    item?.DOI
    && item?.title?.[0]
    && CROSSREF_TYPES.has(item.type)
    && crossrefDate(item)
    && item?.author?.some(isTargetCrossrefAuthor)
    && (
      hasTrustedCrossrefIdentity(item)
      || normalizedKnownTitles.has(normalizeName(item.title[0]))
    )
  ));
}

export function crossrefItemToPublication(item) {
  const published = crossrefDate(item);
  const venue = textContent(item["container-title"]?.[0]
    || item["short-container-title"]?.[0]
    || item.publisher
    || "Crossref");
  const authors = item.author
    .map((author) => normalizeWhitespace([author.given, author.family].filter(Boolean).join(" ")))
    .filter(Boolean);

  return {
    year: published.slice(0, 4),
    venue,
    kind: crossrefKind(item.type),
    title: textContent(item.title[0]),
    authors: authors.join(", "),
    topics: [...new Set(item.subject || [])].slice(0, 3),
    href: `https://doi.org/${item.DOI}`,
    doi: item.DOI.toLowerCase(),
    published,
  };
}

export function buildSynchronizedPublications(arxivXml, crossrefPayload) {
  const arxivEntries = parseArxivFeed(arxivXml);
  const arxivPublications = arxivEntries.map(arxivEntryToPublication);
  const crossrefPublications = parseCrossrefResponse(
    crossrefPayload,
    arxivEntries.map((entry) => entry.title),
  ).map(crossrefItemToPublication);

  if (arxivPublications.length === 0) {
    throw new Error("The arXiv query returned no exact author matches; keeping the previous data.");
  }
  if (crossrefPublications.length === 0) {
    throw new Error("The Crossref query returned no exact author matches; keeping the previous data.");
  }

  return mergePublications([], [...crossrefPublications, ...arxivPublications]);
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": `changruizhu96.github.io publication sync (${CONTACT_EMAIL})` },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`${url.hostname} returned HTTP ${response.status}.`);
  return response.text();
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": `changruizhu96.github.io publication sync (${CONTACT_EMAIL})`,
    },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`${url.hostname} returned HTTP ${response.status}.`);
  return response.json();
}

export async function synchronizePublications(outputPath = OUTPUT_PATH) {
  const arxivUrl = new URL("https://export.arxiv.org/api/query");
  arxivUrl.search = new URLSearchParams({
    search_query: `au:"${AUTHOR.display}"`,
    start: "0",
    max_results: String(MAX_RESULTS),
    sortBy: "submittedDate",
    sortOrder: "descending",
  });

  const crossrefUrl = new URL("https://api.crossref.org/works");
  crossrefUrl.search = new URLSearchParams({
    "query.author": AUTHOR.display,
    rows: String(MAX_RESULTS),
    mailto: CONTACT_EMAIL,
  });

  const [arxivXml, crossrefPayload] = await Promise.all([
    fetchText(arxivUrl),
    fetchJson(crossrefUrl),
  ]);
  const publications = buildSynchronizedPublications(arxivXml, crossrefPayload);
  const nextContent = `${JSON.stringify(publications, null, 2)}\n`;
  const currentContent = await readFile(outputPath, "utf8").catch(() => "");

  if (nextContent === currentContent) {
    console.log(`Publication data is already current (${publications.length} automatic records).`);
    return false;
  }

  await writeFile(outputPath, nextContent, "utf8");
  console.log(`Updated ${publications.length} automatic publication records.`);
  return true;
}

const isMain = process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;
if (isMain) {
  await synchronizePublications();
}
