"use client";

import { useInView, useReducedMotion, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef, useState, type ReactNode } from "react";
import FadeIn from "@/components/fade-in";

export type Chapter = {
  id: string;
  label: string;
  /** Role and place, e.g. "Data Engineer · Neuron Mobility". */
  meta: string;
  body: ReactNode;
};

function ChapterBlock({
  chapter,
  index,
  active,
  onActive,
}: {
  chapter: Chapter;
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // "Active" = the chapter crossing the middle band of the screen.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} id={`chapter-${chapter.id}`} className="scroll-mt-24 py-10 md:py-14 first:pt-0 last:pb-0">
      <FadeIn>
        <p className="flex items-baseline gap-3">
          <span
            className={`font-serif text-lg transition-colors duration-500 ${
              active ? "text-accent" : "text-muted-foreground"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
            {chapter.meta}
          </span>
        </p>
        <h3 className="font-serif text-2xl md:text-3xl text-foreground mt-3 mb-4">{chapter.label}</h3>
        <div className="font-sans text-base leading-relaxed text-muted-foreground max-w-xl">
          {chapter.body}
        </div>
      </FadeIn>
    </div>
  );
}

/**
 * The career as a scroll story: a sticky chapter rail (desktop) and a progress line
 * that fills as you read. With reduced motion, the line is simply drawn in full.
 */
export default function CareerChapters({ chapters }: { chapters: Chapter[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-12 lg:gap-16">
      {/* Chapter rail: desktop only, sticks while the chapters scroll past */}
      <nav aria-label="Career chapters" className="hidden lg:block">
        <ol className="sticky top-24 space-y-3">
          {chapters.map((c, i) => (
            <li key={c.id}>
              <a
                href={`#chapter-${c.id}`}
                aria-current={active === i ? "step" : undefined}
                className={`flex items-baseline gap-3 font-sans text-sm transition-colors duration-500 ${
                  active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`h-px transition-all duration-500 ${
                    active === i ? "w-8 bg-accent" : "w-4 bg-border"
                  }`}
                  aria-hidden="true"
                />
                {c.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Chapters, with a progress line down the left */}
      <div ref={listRef} className="relative pl-8 md:pl-10">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
        <m.div
          className="absolute left-0 top-0 bottom-0 w-px bg-accent origin-top"
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
          aria-hidden="true"
        />
        {chapters.map((c, i) => (
          <ChapterBlock key={c.id} chapter={c} index={i} active={active === i} onActive={setActive} />
        ))}
      </div>
    </div>
  );
}
