"use client";

import Link from "next/link";
import { useState } from "react";
import FadeIn from "@/components/fade-in";
import ThemeFilter from "@/components/theme-filter";
import type { ReadingItem } from "@/lib/reading";

type Item = ReadingItem & { month: string };

export default function ReadingList({ items, tags }: { items: Item[]; tags: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? items.filter((i) => i.tags?.includes(active)) : items;

  // Group by month, keeping newest-first order.
  const months: { month: string; items: Item[] }[] = [];
  for (const item of shown) {
    const last = months[months.length - 1];
    if (last?.month === item.month) last.items.push(item);
    else months.push({ month: item.month, items: [item] });
  }

  return (
    <>
      <ThemeFilter tags={tags} active={active} onChange={setActive} />

      <div className="space-y-16">
        {months.map(({ month, items }) => (
          <FadeIn key={month}>
            <section aria-label={month}>
              <h2 className="font-sans text-xs text-muted-foreground tracking-widest uppercase mb-6">
                {month}
              </h2>
              <ul className="divide-y divide-border border-y border-border">
                {items.map((item) => (
                  <li
                    key={item.url}
                    className="py-5 grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-2 md:gap-8"
                  >
                    <div>
                      <p className="flex items-baseline gap-2">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-serif text-xl text-foreground hover:text-accent transition-colors duration-200"
                        >
                          {item.title}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        {item.recommended && (
                          <span className="text-accent text-sm" title="Recommended" aria-label="Recommended">
                            ★
                          </span>
                        )}
                      </p>
                      <p className="font-sans text-sm text-muted-foreground mt-1">
                        {[item.author, item.source].filter(Boolean).join(", ")}
                        {item.kind && (
                          <span className="ml-2 text-xs tracking-widest uppercase">{item.kind}</span>
                        )}
                      </p>
                    </div>
                    <div className="font-sans text-sm text-muted-foreground leading-relaxed md:pt-1">
                      {item.takeaway && <p>{item.takeaway}</p>}
                      {item.note && (
                        <Link
                          href={`/notes/${item.note}`}
                          className="inline-block mt-2 text-foreground underline underline-offset-2 hover:text-accent transition-colors duration-200"
                        >
                          My note on this &rarr;
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="font-sans text-base text-muted-foreground">
          The list is being started. Check back soon.
        </p>
      )}
    </>
  );
}
