/**
 * Articles, Substack posts, essays, reports and podcasts worth passing on,
 * shown on /reading. The three most recent also appear under Reading on /now.
 *
 * To add one, copy the example, uncomment it and fill it in. Newest can go anywhere:
 * the page sorts by `date`. A typo in `date` or `url` stops the build with a message.
 * The footer link and sitemap entry only appear once there's at least one item.
 *
 * Markets: link to ideas and frameworks; keep takeaways to process, not stock calls.
 */

export const kinds = ["Article", "Newsletter", "Essay", "Report", "Paper", "Podcast", "Video"] as const;

export type ReadingItem = {
  title: string;
  url: string;
  /** Writer or host. */
  author?: string;
  /** Publication or Substack name, e.g. "Net Interest". */
  source?: string;
  kind?: (typeof kinds)[number];
  /** When you read it, YYYY-MM-DD. Used for sorting and the month headings. */
  date: string;
  /** One or two sentences: what stuck with you. */
  takeaway?: string;
  /** Mark the ones you'd send to a friend. */
  recommended?: boolean;
  /** Any of: ASEAN markets, Operations, Building, Data (others work too). */
  tags?: string[];
  /** Optional slug of a note on /notes that builds on this piece. */
  note?: string;
};

const items: ReadingItem[] = [
  // {
  //   title: "Title of the piece",
  //   url: "https://example.substack.com/p/title-of-the-piece",
  //   author: "Writer Name",
  //   source: "Publication or Substack name",
  //   kind: "Newsletter",
  //   date: "2026-11-23",
  //   takeaway: "The one idea that stuck with me.",
  //   recommended: true,
  //   tags: ["ASEAN markets"],
  // },
];

function validate(item: ReadingItem) {
  const where = `lib/reading.ts ("${item.title}")`;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date) || Number.isNaN(Date.parse(item.date))) {
    throw new Error(`${where}: "date" must look like 2026-11-23`);
  }
  if (!/^https?:\/\//.test(item.url)) {
    throw new Error(`${where}: "url" must start with https://`);
  }
  if (item.kind && !kinds.includes(item.kind)) {
    throw new Error(`${where}: "kind" must be one of ${kinds.join(", ")}`);
  }
  return item;
}

/** All items, newest first. */
export function getReading(): ReadingItem[] {
  return items.map(validate).sort((a, b) => b.date.localeCompare(a.date));
}

export const hasReading = () => items.length > 0;

/** "November 2026" */
export function monthLabel(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
