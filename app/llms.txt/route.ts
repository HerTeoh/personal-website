import { getAllNotes } from "@/lib/notes";
import { hasPrinciples } from "@/lib/principles";
import { hasQuestions } from "@/lib/questions";
import { hasReading } from "@/lib/reading";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt: a plain-text guide to the site for AI tools (a proposed convention,
 * see llmstxt.org). Lists only pages that have content.
 */
export function GET() {
  const pages = [
    ["Notes", "/notes", "Short notes on what I'm learning, each marked seedling, budding or evergreen."],
    ...(hasPrinciples() ? [["Principles", "/principles", "Lessons from data, operations and building a business, applied to investing."]] : []),
    ...(hasQuestions() ? [["Questions", "/questions", "Open questions I'm thinking about, and tentative answers."]] : []),
    ...(hasReading() ? [["Reading", "/reading", "Articles, newsletters and essays worth passing on, with takeaways."]] : []),
    ["Now", "/now", "What I'm focused on at the moment."],
  ];
  const notes = getAllNotes();

  const text = `# ${site.name}

> ${site.description}

Based in Singapore. Background in data engineering and operations (Neuron Mobility) and in building a franchise business; now focused on public equities across Asia, with an emphasis on ASEAN markets. Everything here is personal views, not investment advice.

## Pages

${pages.map(([label, path, desc]) => `- [${label}](${site.url}${path}): ${desc}`).join("\n")}

## Notes

${notes.map((n) => `- [${n.title}](${site.url}/notes/${n.slug})${n.summary ? `: ${n.summary}` : ""}`).join("\n")}

## Optional

- [Credits](${site.url}/credits): Open-source projects and ideas this site is built on.
- [Privacy](${site.url}/privacy) and [Terms](${site.url}/terms)
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
