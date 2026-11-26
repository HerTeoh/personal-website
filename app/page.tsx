import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import Career from "@/components/home/career";
import Hero from "@/components/home/hero";
import StatusBar from "@/components/home/status-bar";
import WhereNext, { type NextLink } from "@/components/home/where-next";
import { hasPrinciples } from "@/lib/principles";
import { hasQuestions } from "@/lib/questions";
import { hasReading } from "@/lib/reading";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { person, website } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata("/", {
  description: site.description,
});

/** The "Where to next" sentence, with a clause for each section that has content. */
function nextLinks(): NextLink[] {
  return [
    { before: "read the", label: "notes", href: "/notes" },
    { before: "see what I’m doing", label: "now", href: "/now" },
    ...(hasReading() ? [{ before: "browse what I’m", label: "reading", href: "/reading" }] : []),
    ...(hasPrinciples() ? [{ before: "see the", label: "principles", href: "/principles", after: "I’ve learned" }] : []),
    ...(hasQuestions() ? [{ before: "look at the", label: "questions", href: "/questions", after: "I’m still figuring out" }] : []),
  ];
}

export default function Home() {
  return (
    <>
      <JsonLd data={[person, website]} />
      <main>
        <Hero />
        <Career />
        <WhereNext links={nextLinks()} />
      </main>
      <StatusBar />
    </>
  );
}
