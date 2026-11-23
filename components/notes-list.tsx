"use client";

import Link from "next/link";
import { useState } from "react";
import FadeIn from "@/components/fade-in";
import ThemeFilter from "@/components/theme-filter";

type Item = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  statusEmoji: string;
  statusLabel: string;
  dateLabel: string;
};

export default function NotesList({ notes, tags }: { notes: Item[]; tags: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? notes.filter((n) => n.tags.includes(active)) : notes;

  return (
    <>
      <ThemeFilter tags={tags} active={active} onChange={setActive} />

      <ul className="divide-y divide-border border-y border-border">
        {shown.map((n) => (
          <li key={n.slug}>
            <FadeIn y={12}>
              <Link href={`/notes/${n.slug}`} className="group block py-7">
                <div className="flex items-baseline gap-3">
                  <span aria-label={n.statusLabel} title={n.statusLabel}>
                    {n.statusEmoji}
                  </span>
                  <h2 className="font-serif text-2xl text-foreground group-hover:text-accent transition-colors duration-200">
                    {n.title}
                  </h2>
                </div>
                {n.summary && (
                  <p className="font-sans text-base text-muted-foreground leading-relaxed mt-2 max-w-xl">
                    {n.summary}
                  </p>
                )}
                <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase mt-3">
                  {n.dateLabel}
                  {n.tags.length > 0 && <> &middot; {n.tags.join(", ")}</>}
                </p>
              </Link>
            </FadeIn>
          </li>
        ))}
      </ul>

      {shown.length === 0 && (
        <p className="font-sans text-base text-muted-foreground py-10">
          Nothing here yet. Check back soon.
        </p>
      )}
    </>
  );
}
