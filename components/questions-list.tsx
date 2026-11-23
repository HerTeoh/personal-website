"use client";

import Link from "next/link";
import { useState } from "react";
import FadeIn from "@/components/fade-in";
import ThemeFilter from "@/components/theme-filter";
import type { Question } from "@/lib/questions";

type Item = Question & { sinceLabel: string; answeredLabel?: string };

function QuestionItem({ q }: { q: Item }) {
  const answered = q.status === "answered";
  return (
    <li className="py-7">
      <p
        className={`font-serif text-2xl leading-snug text-balance ${
          answered ? "text-muted-foreground" : "text-foreground"
        }`}
      >
        {q.question}
      </p>
      {q.context && (
        <p className="font-sans text-base text-muted-foreground leading-relaxed mt-3 max-w-xl">
          {q.context}
        </p>
      )}
      {answered && (q.answer || q.note) && (
        <div className="mt-4 pl-5 border-l-2 border-accent max-w-xl font-sans text-base leading-relaxed text-foreground">
          {q.answer && <p>{q.answer}</p>}
          {q.note && (
            <Link
              href={`/notes/${q.note}`}
              className="inline-block mt-2 text-sm underline underline-offset-2 hover:text-accent transition-colors duration-200"
            >
              {answered ? "More in my note" : "My note so far"} &rarr;
            </Link>
          )}
        </div>
      )}
      {!answered && q.note && (
        <Link
          href={`/notes/${q.note}`}
          className="inline-block mt-3 font-sans text-sm text-foreground underline underline-offset-2 hover:text-accent transition-colors duration-200"
        >
          My note so far &rarr;
        </Link>
      )}
      <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase mt-4">
        {answered && q.answeredLabel
          ? `Asked ${q.sinceLabel} · answered ${q.answeredLabel}`
          : `Asking since ${q.sinceLabel}`}
        {q.tags && q.tags.length > 0 && <> &middot; {q.tags.join(", ")}</>}
      </p>
    </li>
  );
}

export default function QuestionsList({
  open,
  answered,
  tags,
}: {
  open: Item[];
  answered: Item[];
  tags: string[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const pick = (list: Item[]) => (active ? list.filter((q) => q.tags?.includes(active)) : list);
  const groups = [
    { label: "Open", items: pick(open) },
    { label: "Answered, for now", items: pick(answered) },
  ].filter((g) => g.items.length > 0);

  return (
    <>
      <ThemeFilter tags={tags} active={active} onChange={setActive} />

      <div className="space-y-16">
        {groups.map(({ label, items }) => (
          <FadeIn key={label}>
            <section aria-label={label}>
              <h2 className="font-sans text-xs text-muted-foreground tracking-widest uppercase mb-6">
                {label}
              </h2>
              <ul className="divide-y divide-border border-y border-border">
                {items.map((q) => (
                  <QuestionItem key={q.question} q={q} />
                ))}
              </ul>
            </section>
          </FadeIn>
        ))}
      </div>

      {groups.length === 0 && (
        <p className="font-sans text-base text-muted-foreground">
          The first questions are on their way. Check back soon.
        </p>
      )}
    </>
  );
}
