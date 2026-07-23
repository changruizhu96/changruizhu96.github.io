function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

export function normalizeTitle(title) {
  return normalizeText(title);
}

function normalizeDoi(value) {
  return String(value ?? "")
    .trim()
    .replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "")
    .toLowerCase();
}

function normalizeArxivId(value) {
  return String(value ?? "")
    .trim()
    .replace(/^https?:\/\/arxiv\.org\/abs\//i, "")
    .replace(/v\d+$/i, "")
    .toLowerCase();
}

export function publicationKeys(publication) {
  const keys = [];
  const doi = normalizeDoi(publication.doi || (publication.href?.includes("doi.org/") ? publication.href : ""));
  const arxivId = normalizeArxivId(
    publication.arxivId || (publication.href?.includes("arxiv.org/abs/") ? publication.href : ""),
  );
  const title = normalizeTitle(publication.title);

  if (doi) keys.push(`doi:${doi}`);
  if (arxivId) keys.push(`arxiv:${arxivId}`);
  if (title) keys.push(`title:${title}`);
  return keys;
}

function publicationDate(publication) {
  return publication.published || `${publication.year || "0000"}-01-01`;
}

export function mergePublications(curatedPublications, automaticPublications) {
  const seen = new Set();
  const merged = [];

  for (const publication of [...curatedPublications, ...automaticPublications]) {
    const keys = publicationKeys(publication);
    const isDuplicate = keys.some((key) => seen.has(key));
    keys.forEach((key) => seen.add(key));
    if (isDuplicate) continue;
    merged.push(publication);
  }

  return merged.sort((left, right) => publicationDate(right).localeCompare(publicationDate(left)));
}
