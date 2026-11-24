import Link from "next/link";
import { Fragment } from "react";
import JumpButton from "@/components/home/jump-button";

export type NextLink = { before: string; label: string; href: string; after?: string };

/**
 * "Where to next" as one sentence of links. It grows as sections get content,
 * e.g. "Read the notes, see what I'm doing now, browse what I'm reading… or jump anywhere with ⌘K."
 */
export default function WhereNext({ links }: { links: NextLink[] }) {
  return (
    <section
      id="where-next"
      data-chapter="where --next"
      aria-labelledby="where-next-title"
      className="px-6 pb-28 pt-[380px] md:px-12"
      style={{ background: "linear-gradient(#2C1F14, #FAF7F2 320px)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <h2 id="where-next-title" className="mb-6 font-mono text-[13px] font-normal text-muted-foreground">
          $ where --next
        </h2>
        <p className="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.2] text-foreground">
          {links.map((l, i) => (
            <Fragment key={l.href}>
              {i === 0 ? l.before.charAt(0).toUpperCase() + l.before.slice(1) : l.before}{" "}
              <Link href={l.href} className="inline-link">
                {l.label}
              </Link>
              {l.after ? ` ${l.after}` : ""},{" "}
            </Fragment>
          ))}
          or jump anywhere with <JumpButton />.
        </p>
      </div>
    </section>
  );
}
