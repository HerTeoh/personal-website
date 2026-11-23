/**
 * Content for the /now page: what I'm focused on at this point in my life.
 * Idea from Derek Sivers (https://nownownow.com/about), credited in lib/credits.ts.
 *
 * To update:
 *   1. Edit the sections below. Keep each item to one or two sentences.
 *   2. Change `updated` to today's date (YYYY-MM-DD).
 * A section with no items is hidden, so it's fine to leave one empty.
 *
 * Markets: describe themes and process, not specific stock views.
 * When in doubt, check with compliance before publishing.
 */

export type NowItem = {
  text: string;
  /** Optional link, e.g. to a book or article. */
  href?: string;
};

export type NowSection = {
  title: string;
  items: NowItem[];
};

export const now: {
  updated: string;
  location: string;
  sections: NowSection[];
} = {
  /** Date of the last update, YYYY-MM-DD. */
  updated: "2026-11-23",
  location: "Singapore",
  sections: [
    {
      title: "Work",
      items: [
        {
          text: "Researching public equities across Asia, with an emphasis on ASEAN markets.",
        },
      ],
    },
    {
      title: "Building",
      items: [
        {
          text: "This site. Recently added a credits page and some quiet animation. Next up: a place for short notes on what I'm learning.",
        },
      ],
    },
    {
      title: "Reading",
      items: [
        // { text: "Book title by Author: one line on why.", href: "https://..." },
      ],
    },
    {
      title: "Learning",
      items: [
        // { text: "A skill or topic I'm currently working on." },
      ],
    },
  ],
};
