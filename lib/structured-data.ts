import { site } from "@/lib/site";

/**
 * Machine-readable descriptions (schema.org JSON-LD) for search engines and AI tools.
 * They sit in the page source but aren't shown on screen. Everything here matches
 * what the visible pages say; the LinkedIn profile is linked via `sameAs` so the
 * two can be connected without a visible link.
 */

const personId = `${site.url}/#person`;

export const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: site.name,
  url: site.url,
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
  knowsAbout: ["Public equities", "ASEAN markets", "Data engineering", "Operations", "Entrepreneurship"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Minerva University" },
  worksFor: { "@type": "Organization", name: "Singular Asset Management" },
  sameAs: [site.linkedin],
};

export const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  inLanguage: "en-SG",
  author: { "@id": personId },
};

export function article(note: {
  slug: string;
  title: string;
  summary: string;
  date: string;
  updated?: string;
  tags: string[];
}) {
  const url = `${site.url}/notes/${note.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.summary || undefined,
    url,
    mainEntityOfPage: url,
    datePublished: note.date,
    dateModified: note.updated ?? note.date,
    keywords: note.tags.length ? note.tags.join(", ") : undefined,
    inLanguage: "en-SG",
    author: { "@type": "Person", "@id": personId, name: site.name, url: site.url },
    publisher: { "@id": personId },
  };
}
