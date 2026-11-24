import type { PaletteItem } from "@/components/command-palette";
import { hasPrinciples } from "@/lib/principles";
import { hasQuestions } from "@/lib/questions";
import { hasReading } from "@/lib/reading";

export type NavLink = { href: string; label: string; key?: string };

/** The writing sections, in menu order. Empty sections stay hidden until they have content. */
export function sectionLinks(): NavLink[] {
  return [
    { href: "/notes", label: "Notes", key: "N" },
    ...(hasReading() ? [{ href: "/reading", label: "Reading", key: "R" }] : []),
    ...(hasPrinciples() ? [{ href: "/principles", label: "Principles", key: "P" }] : []),
    ...(hasQuestions() ? [{ href: "/questions", label: "Questions", key: "Q" }] : []),
    { href: "/now", label: "Now", key: "W" },
  ];
}

/** Sections that exist in the plan but have no content yet (shown as "soon" in the footer). */
export function upcomingSections(): string[] {
  return [
    ...(hasReading() ? [] : ["Reading"]),
    ...(hasPrinciples() ? [] : ["Principles"]),
    ...(hasQuestions() ? [] : ["Questions"]),
  ];
}

/** The career chapters on the home page, in order. */
export const chapters: NavLink[] = [
  { href: "/#chapter-foundation", label: "Foundation", key: "1" },
  { href: "/#chapter-data", label: "Data", key: "2" },
  { href: "/#chapter-operations", label: "Operations", key: "3" },
  { href: "/#chapter-entrepreneurship", label: "Entrepreneurship", key: "4" },
  { href: "/#chapter-markets", label: "Markets", key: "5" },
];

export const sitePages: NavLink[] = [
  { href: "/credits", label: "Credits" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

/** Everything the ⌘K menu can jump to. */
export function paletteItems(hints: Record<string, string> = {}): PaletteItem[] {
  return [
    { key: "H", label: "Home", href: "/", group: "Sections" as const },
    ...sectionLinks().map((l) => ({ ...l, hint: hints[l.href], group: "Sections" as const })),
    ...chapters.map((l) => ({ ...l, hint: hints[l.href], group: "On the home page" as const })),
    ...sitePages.map((l) => ({ ...l, group: "Site" as const })),
  ];
}
