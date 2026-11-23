import { getAllNotes } from "@/lib/notes";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cdata = (s: string) => `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

/** RSS feed of notes at /notes/feed.xml, for feed readers and discovery. */
export function GET() {
  const notes = getAllNotes();
  const items = notes
    .map((n) => {
      const url = `${site.url}/notes/${n.slug}`;
      return `    <item>
      <title>${esc(n.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${n.date}T00:00:00Z`).toUTCString()}</pubDate>
${n.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
      <description>${esc(n.summary)}</description>
      <content:encoded>${cdata(n.html)}</content:encoded>
    </item>`;
    })
    .join("\n");

  const latest = notes[0] ? (notes[0].updated ?? notes[0].date) : undefined;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${esc(site.name)}: Notes</title>
    <link>${site.url}/notes</link>
    <atom:link href="${site.url}/notes/feed.xml" rel="self" type="application/rss+xml" />
    <description>Short notes on what I'm learning across markets, operations, building and data. Personal views only, not investment advice.</description>
    <language>en-sg</language>
${latest ? `    <lastBuildDate>${new Date(`${latest}T00:00:00Z`).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
