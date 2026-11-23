import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/fade-in";
import ReadingList from "@/components/reading-list";
import { getReading, monthLabel } from "@/lib/reading";
import { orderTags } from "@/lib/themes";

export const metadata: Metadata = {
  title: "Reading",
  description:
    "Articles, Substack posts and essays Her Teoh found worth passing on, with a line on what stuck.",
};

export default function ReadingPage() {
  const items = getReading().map((i) => ({ ...i, month: monthLabel(i.date) }));
  const tags = orderTags(items.flatMap((i) => i.tags ?? []));

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
