/**
 * Principles: rules learned the hard way, and how they carry into investing.
 * Shown on /principles in the order written here (put the most important first).
 *
 * Each principle has three parts:
 *   principle  - the rule itself, in one line
 *   story      - where it came from (an experience at Neuron, the franchise, markets...)
 *   inInvesting - how it shows up in how I look at markets
 * Optionally link the full essay (e.g. a Substack post) with `essay`, or a note with `note`.
 * This page is the short, curated index; the long version can live anywhere.
 * A typo in a date or a link to a note that doesn't exist stops the build with a message.
 * The footer link and sitemap entry only appear once there's at least one principle.
 *
 * Markets: keep `inInvesting` to process and what you look for, not specific stocks.
 */

export type Principle = {
  principle: string;
  /** Where it came from, e.g. "Running fleet operations at Neuron". */
  origin?: string;
  /** The experience behind it, a few sentences. */
  story?: string;
  /** How it carries into investing. */
  inInvesting?: string;
  /** Any of: ASEAN markets, Operations, Building, Data (others work too). */
  tags?: string[];
  /** Optional slug of a note on /notes that goes deeper. */
  note?: string;
  /** Optional link to the full essay elsewhere, e.g. a Substack post. */
  essay?: string;
  /** Optional: when last revised, YYYY-MM-DD. */
  revised?: string;
};

const principles: Principle[] = [
  // {
  //   principle: "The rule, in one line.",
  //   origin: "Where it came from",
  //   story: "The experience that taught it.",
  //   inInvesting: "How it shows up in how I look at companies.",
  //   tags: ["Operations"],
  // },
];

function validate(p: Principle) {
  if (p.essay && !/^https?:\/\//.test(p.essay)) {
    throw new Error(`lib/principles.ts ("${p.principle.slice(0, 40)}"): "essay" must start with https://`);
  }
  if (p.revised && !(/^\d{4}-\d{2}-\d{2}$/.test(p.revised) && !Number.isNaN(Date.parse(p.revised)))) {
    throw new Error(`lib/principles.ts ("${p.principle.slice(0, 40)}"): "revised" must look like 2026-11-23`);
  }
  return p;
}

export const getPrinciples = () => principles.map(validate);
export const hasPrinciples = () => principles.length > 0;
