"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { useReducedMotionSafe } from "@/components/home/use-reduced-motion-safe";

const steps = ["market entry", "fit-out", "hiring", "day-to-day operations", "ownership transition"];

/** The franchise launch as an opening checklist that ticks itself off as you scroll through. */
export default function FranchiseChecklist() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const [done, setDone] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(steps.length, Math.floor(v * (steps.length + 0.99)));
    if (next !== done) setDone(next);
  });
  const ticked = reduce ? steps.length : done;

  return (
    <figure ref={ref} className="m-0 rounded-2xl bg-background p-6">
      <p className="mb-3 flex justify-between gap-4 font-mono text-xs text-[#5A4636]">
        <span>opening checklist · fitness franchise, Singapore</span>
        <span>
          <span className="text-accent-strong">{ticked}</span>/{steps.length}
        </span>
      </p>
      <ul className="m-0 list-none p-0">
        {steps.map((step, i) => {
          const isDone = i < ticked;
          return (
            <li
              key={step}
              className={`flex items-center gap-3.5 border-t border-muted py-3 font-mono text-[15px] transition-colors duration-300 ${
                isDone ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <span
                aria-hidden="true"
                className={`inline-flex h-[22px] w-[22px] items-center justify-center rounded-md border-[1.5px] text-[13px] text-background transition-colors duration-300 ${
                  isDone ? "border-accent bg-accent" : "border-[#B9A894] bg-transparent"
                }`}
              >
                {isDone ? "✓" : ""}
              </span>
              <span>
                {step}
                <span className="sr-only">{isDone ? " (done)" : ""}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
