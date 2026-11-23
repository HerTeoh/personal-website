/**
 * Open questions I'm thinking about, shown on /questions.
 * Idea from Patrick Collison's questions page, credited in lib/credits.ts.
 *
 * To add one, copy the example, uncomment it and fill it in.
 * When you reach a view, set status to "answered" and add an `answer`
 * and/or a `note` (the slug of a note on /notes). Answered questions stay on
 * the page, below the open ones, as a record of how thinking moved.
 * A typo in a date or status stops the build with a message.
 * The footer link and sitemap entry only appear once there's at least one question.
 *
 * Markets: frame questions about patterns and process, not specific stocks.
 */

export type Question = {
  question: string;
  /** Optional: a sentence on why it matters or where it came from. */
  context?: string;
  /** When you started asking, YYYY-MM-DD. */
  since: string;
  status: "open" | "answered";
  /** For answered questions: a short answer. */
  answer?: string;
  /** For answered questions: when, YYYY-MM-DD. */
  answeredOn?: string;
  /** Optional slug of a note on /notes that explores this. */
  note?: string;
  /** Any of: ASEAN markets, Operations, Building, Data (others work too). */
  tags?: string[];
};

const questions: Question[] = [
  // {
  //   question: "The question, phrased the way you'd ask a friend?",
  //   context: "Why it's on my mind.",
  //   since: "2026-11-23",
  //   status: "open",
  //   tags: ["ASEAN markets"],
  // },
];

const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));

function validate(q: Question) {
  const where = `lib/questions.ts ("${q.question.slice(0, 40)}")`;
  if (!isDate(q.since)) throw new Error(`${where}: "since" must look like 2026-11-23`);
  if (q.status !== "open" && q.status !== "answered") {
    throw new Error(`${where}: "status" must be "open" or "answered"`);
  }
  if (q.answeredOn && !isDate(q.answeredOn)) {
    throw new Error(`${where}: "answeredOn" must look like 2026-11-23`);
  }
  return q;
}

/** Open questions (newest first), then answered ones (most recently answered first). */
export function getQuestions(): { open: Question[]; answered: Question[] } {
  const all = questions.map(validate);
  return {
    open: all.filter((q) => q.status === "open").sort((a, b) => b.since.localeCompare(a.since)),
    answered: all
      .filter((q) => q.status === "answered")
      .sort((a, b) => (b.answeredOn ?? b.since).localeCompare(a.answeredOn ?? a.since)),
  };
}

export const hasQuestions = () => questions.length > 0;

/** "November 2026" */
export function monthYear(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
