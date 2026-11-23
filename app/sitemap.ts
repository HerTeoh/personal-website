import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllNotes } from "@/lib/notes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/notes`, changeFrequency: "weekly", priority: 0.7 },
    ...getAllNotes().map((n) => ({
      url: `${site.url}/notes/${n.slug}`,
      lastModified: n.updated ?? n.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    { url: `${site.url}/now`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/credits`, changeFrequency: "monthly", priority: 0.3 },
  ];
}
