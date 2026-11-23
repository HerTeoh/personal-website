import type { Metadata } from "next";
import Hero from "@/components/hero";
import JsonLd from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { person, website } from "@/lib/structured-data";
import About from "@/components/about";
import Contact from "@/components/contact";
import WhereNext, { type NextCard } from "@/components/where-next";
import { formatDate, getAllNotes } from "@/lib/notes";
import { now } from "@/lib/now";
import { getPrinciples } from "@/lib/principles";
import { getQuestions } from "@/lib/questions";
import { getReading } from "@/lib/reading";

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** Cards for the "Where to next" section; sections without content are left out. */
function nextCards(): NextCard[] {
  const notes = getAllNotes();
  const reading = getReading();
  const principles = getPrinciples();
  const { open } = getQuestions();
  return [
    {
      href: "/notes",
      label: "Notes",
      blurb: "Short notes on what I'm learning, tended over time.",
      detail: notes[0] ? `${plural(notes.length, "note")} · latest: ${notes[0].title}` : "First notes coming soon",
    },
    ...(principles.length
      ? [{ href: "/principles", label: "Principles", blurb: "Lessons learned the hard way, applied to markets.", detail: plural(principles.length, "principle") }]
      : []),
    ...(open.length
      ? [{ href: "/questions", label: "Questions", blurb: "What I'm still figuring out.", detail: `${plural(open.length, "open question")}` }]
      : []),
    ...(reading.length
      ? [{ href: "/reading", label: "Reading", blurb: "Pieces worth passing on.", detail: `latest: ${reading[0].title}` }]
      : []),
    {
      href: "/now",
      label: "Now",
      blurb: "What I'm focused on at the moment.",
      detail: `Updated ${formatDate(now.updated)}`,
    },
  ];
}

export const metadata: Metadata = pageMetadata("/", {
  description: site.description,
});

export default function Home() {
  return (
    <>
      <JsonLd data={[person, website]} />
      <Hero />
      <About />
      <WhereNext cards={nextCards()} />
      <Contact />
    </>
  );
}
