"use client";

import Link from "next/link";
import { useState } from "react";
import FadeIn from "@/components/fade-in";
import ThemeFilter from "@/components/theme-filter";
import type { Principle } from "@/lib/principles";

type Item = Principle & { number: string; revisedLabel?: string };

export default function PrinciplesList({ items, tags }: { items: Item[]; tags: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? items.filter((p) => p.tags?.includes(active)) : items;

  return (
    <>
      <ThemeFilter tags={tags} active={active} onChange={setActive} />

      <ol className="divide-y divide-border border-y border-border">
        {shown.map((p) => (
          <li key={p.principle}>
            <FadeIn y={12}>
              <article className="py-10 grid grid-cols-[3rem_1fr] md:grid-cols-[4.5rem_1fr] gap-x-2">
                <span
                  className="font-serif text-2xl md:text-3xl text-accent leading-snug"
                  aria-hidden="true"
                >
                  {p.number}
                </span>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground leading-snug text-balance">
                    {p.principle}
                  </h2>
                  {p.origin && (
                    <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase mt-3">
                      From {p.origin}
                    </p>
                  )}
                  {p.story && (
                    <p className="font-sans text-base text-muted-foreground leading-relaxed mt-5 max-w-xl">
                      {p.story}
                    </p>
                  )}
                  {p.inInvesting && (
                    <div className="mt-5 pl-5 border-l-2 border-accent max-w-xl">
                      <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase mb-1">
                        In investing
                      </p>
                      <p className="font-sans text-base text-foreground leading-relaxed">
                        {p.inInvesting}
                      </p>
                    </div>
                  )}
                  {(p.note || p.essay || p.revisedLabel || (p.tags && p.tags.length > 0)) && (
                    <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase mt-5 flex flex-wrap gap-x-3 gap-y-1">
                      {p.tags && p.tags.length > 0 && <span>{p.tags.join(", ")}</span>}
                      {p.revisedLabel && <span>Revised {p.revisedLabel}</span>}
                      {p.essay && (
                        <a
                          href={p.essay}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="normal-case tracking-normal text-sm text-foreground underline underline-offset-2 hover:text-accent transition-colors duration-200"
                        >
                          Read the essay &rarr;
                        </a>
                      )}
                      {p.note && (
                        <Link
                          href={`/notes/${p.note}`}
                          className="normal-case tracking-normal text-sm text-foreground underline underline-offset-2 hover:text-accent transition-colors duration-200"
                        >
                          More in my note &rarr;
                        </Link>
                      )}
                    </p>
                  )}
                </div>
              </article>
            </FadeIn>
          </li>
        ))}
      </ol>

      {shown.length === 0 && (
        <p className="font-sans text-base text-muted-foreground py-10">
          The first principles are being written down. Check back soon.
        </p>
      )}
    </>
  );
}
