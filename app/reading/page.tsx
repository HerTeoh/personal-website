import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import FadeIn from "@/components/fade-in";
import ReadingList from "@/components/reading-list";
import { getNote } from "@/lib/notes";
import { getReading, monthLabel } from "@/lib/reading";
import { orderTags } from "@/lib/themes";

export const metadata: Metadata = pageMetadata("/reading", {
  title: "Reading",
  description:
    "Articles, Substack posts and essays Her Teoh found worth passing on, with a line on what stuck.",
});

export default function ReadingPage() {
  const items = getReading().map((i) => {
    // Catch links to notes that don't exist (e.g. a typo in the slug).
    if (i.note && !getNote(i.note)) {
      throw new Error(`lib/reading.ts: no note called "${i.note}" in content/notes/`);
    }
    return { ...i, month: monthLabel(i.date) };
  });
  const tags = orderTags(items.flatMap((i) => i.tags ?? []));

  return (
    <div className="min-h-screen bg-background px-6 md:px-16 lg:px-24 pb-12">

      <main className="max-w-4xl py-20 md:py-28">
        <FadeIn>
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-px bg-accent" aria-hidden="true" />
            <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
              Reading
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-foreground text-balance leading-tight mb-6">
            Worth passing on.
          </h1>
          <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-xl text-pretty mb-16">
            Articles, newsletters and essays I&apos;ve read, with a line on
            what stuck. <span className="text-accent" aria-hidden="true">★</span>{" "}
            marks the ones I&apos;d send to a friend.
          </p>
        </FadeIn>

        <ReadingList items={items} tags={tags} />

        <p className="font-sans text-xs text-muted-foreground mt-24 tracking-wide leading-relaxed max-w-md">
          Links go to the original writers. Sharing a piece isn&apos;t an
          endorsement of every view in it. Personal views only, not investment
          advice.
        </p>
      </main>
    </div>
  );
}
