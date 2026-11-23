import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/fade-in";
import PrinciplesList from "@/components/principles-list";
import { getNote } from "@/lib/notes";
import { getPrinciples } from "@/lib/principles";
import { orderTags } from "@/lib/themes";

export const metadata: Metadata = {
  title: "Principles",
  description:
    "Lessons from data, operations and building a business, and how they carry into investing.",
};

export default function PrinciplesPage() {
  const principles = getPrinciples();
  const items = principles.map((p, i) => {
    // Catch links to notes that don't exist (e.g. a typo in the slug).
    if (p.note && !getNote(p.note)) {
      throw new Error(`lib/principles.ts: no note called "${p.note}" in content/notes/`);
    }
    return {
      ...p,
      number: String(i + 1).padStart(2, "0"),
      revisedLabel: p.revised
        ? new Date(`${p.revised}T00:00:00Z`).toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          })
        : undefined,
    };
  });
  const tags = orderTags(principles.flatMap((p) => p.tags ?? []));

  return (
    <div className="min-h-screen bg-background px-6 md:px-16 lg:px-24 py-12">
      <header>
        <Link
          href="/"
          className="font-sans text-sm text-muted-foreground tracking-widest uppercase hover:text-foreground transition-colors duration-200"
        >
          &larr; HerTeoh.com
        </Link>
      </header>

      <main className="max-w-3xl py-20 md:py-28">
        <FadeIn>
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-px bg-accent" aria-hidden="true" />
            <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
              Principles
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-foreground text-balance leading-tight mb-6">
            Learned the hard way.
          </h1>
          <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-xl text-pretty mb-16">
            Lessons from building data systems, running operations and starting
            a business, and how each one shapes the way I look at markets.
            Held firmly, open to revision.
          </p>
        </FadeIn>

        <PrinciplesList items={items} tags={tags} />

        <p className="font-sans text-xs text-muted-foreground mt-24 tracking-wide">
          Personal views only, not investment advice.
        </p>
      </main>
    </div>
  );
}
