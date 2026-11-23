import { hasPrinciples } from "@/lib/principles";
import { hasQuestions } from "@/lib/questions";
import { hasReading } from "@/lib/reading";

export type NavLink = { href: string; label: string };

/** The writing sections, in menu order. Empty sections stay hidden until they have content. */
export function sectionLinks(): NavLink[] {
  return [
    { href: "/notes", label: "Notes" },
    ...(hasReading() ? [{ href: "/reading", label: "Reading" }] : []),
    ...(hasPrinciples() ? [{ href: "/principles", label: "Principles" }] : []),
    ...(hasQuestions() ? [{ href: "/questions", label: "Questions" }] : []),
    { href: "/now", label: "Now" },
  ];
}

/** Everything in the footer: sections, then the small print. */
export function footerLinks(): NavLink[] {
  return [
    ...sectionLinks(),
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/credits", label: "Credits" },
  ];
}
