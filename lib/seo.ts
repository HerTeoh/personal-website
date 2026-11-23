import type { Metadata } from "next";
import { site } from "@/lib/site";

// The site-wide social preview image (app/opengraph-image.png). A page that sets its own
// openGraph replaces the site-wide one entirely, so the image is listed here explicitly.
const image = { url: "/opengraph-image.png", width: 1200, height: 630, alt: `${site.name} — Singapore` };

const rss = { "application/rss+xml": [{ url: "/notes/feed.xml", title: `${site.name}: Notes` }] };

/**
 * Metadata for one page: its own canonical address (so search engines don't treat it
 * as a copy of the home page), social preview text, and the notes RSS feed link.
 */
export function pageMetadata(
  path: string,
  { title, description, ...rest }: Omit<Metadata, "title" | "description"> & { title?: string; description: string },
): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : site.title;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path, types: rss },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en_SG",
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
    ...rest,
  };
}
