import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllNotes } from "@/lib/notes";
import { now } from "@/lib/now";
import { hasReading } from "@/lib/reading";
import { hasQuestions } from "@/lib/questions";
import { hasPrinciples } from "@/lib/principles";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getAllNotes();
  const latestNote = notes[0] ? (notes[0].updated ?? notes[0].date) : undefined;
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/notes`, lastModified: latestNote, changeFrequency: "weekly", priority: 0.7 },
    ...notes.map((n) => ({
      url: `${site.url}/notes/${n.slug}`,
      lastModified: n.updated ?? n.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...(hasReading()
      ? [{ url: `${site.url}/reading`, changeFrequency: "weekly" as const, priority: 0.6 }]
      : []),
    ...(hasPrinciples()
      ? [{ url: `${site.url}/principles`, changeFrequency: "monthly" as const, priority: 0.6 }]
      : []),
    ...(hasQuestions()
      ? [{ url: `${site.url}/questions`, changeFrequency: "monthly" as const, priority: 0.6 }]
      : []),
    { url: `${site.url}/now`, lastModified: now.updated, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/credits`, changeFrequency: "monthly", priority: 0.3 },
  ];
}
