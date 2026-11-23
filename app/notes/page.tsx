import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/fade-in";
import NotesList from "@/components/notes-list";
import { formatDate, getAllNotes, statuses, themes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short notes on what Her Teoh is learning across markets, operations, building and data.",
};

export default function NotesPage() {
  const notes = getAllNotes();
  const used = new Set(notes.flatMap((n) => n.tags));
  const tags = [
    ...themes.filter((t) => used.has(t)),
    ...[...used].filter((t) => !themes.includes(t)).sort(),
  ];

  const items = notes.map((n) => ({
    slug: n.slug,
    title: n.title,
    summary: n.summary,
    tags: n.tags,
    statusEmoji: statuses[n.status].emoji,
    statusLabel: statuses[n.status].label,
    dateLabel: n.updated ? `Updated ${formatDate(n.updated)}` : formatDate(n.date),
  }));

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
              Notes
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-foreground text-balance leading-tight mb-6">
            Learning in public.
          </h1>
          <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-xl text-pretty mb-6">
            Short notes, published before they&apos;re finished and tended over
            time.
          </p>
          <p className="font-sans text-xs text-muted-foreground tracking-wide mb-16 flex flex-wrap gap-x-5 gap-y-2">
            {Object.values(statuses).map((s) => (
              <span key={s.label}>
                {s.emoji} {s.label}: {s.hint.toLowerCase()}
              </span>
            ))}
          </p>
        </FadeIn>

        <NotesList notes={items} tags={tags} />

        <p className="font-sans text-xs text-muted-foreground mt-20 tracking-wide">
          Personal views only, not investment advice.
        </p>
      </main>
    </div>
  );
}
