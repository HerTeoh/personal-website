"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/components/home/use-reduced-motion-safe";

const LINE = "30,230 70,210 100,222 140,180 170,195 210,150 240,165 280,120 310,140 350,96 380,118 420,80 450,94 490,60";

/** A price line that draws itself when the Markets chapter comes into view (symbolic, no data). */
export function MarketsLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotionSafe();
  return (
    <figure ref={ref} className="m-0">
      <svg viewBox="0 0 520 300" className="block w-full" role="img" aria-label="A price line forming, as a symbol of markets">
        <line x1="30" y1="270" x2="490" y2="270" stroke="#5A4636" strokeWidth={1} />
        <polyline points={LINE} fill="none" stroke="#5A4636" strokeWidth={1.5} />
        <polyline
          points={LINE}
          fill="none"
          stroke="#E08A5A"
          strokeWidth={2.5}
          strokeDasharray={700}
          strokeDashoffset={inView || reduce ? 0 : 700}
          style={{ transition: reduce ? "none" : "stroke-dashoffset 2s ease" }}
        />
      </svg>
    </figure>
  );
}

const coverage = [
  ["SG", "Singapore"], ["MY", "Malaysia"], ["ID", "Indonesia"], ["TH", "Thailand"], ["PH", "Philippines"], ["VN", "Vietnam"],
  ["HK", "Hong Kong"], ["CN", "China"], ["TW", "Taiwan"], ["JP", "Japan"], ["KR", "South Korea"],
];

/** Markets covered, as a slow ticker tape inside the dark Markets chapter. */
export function CoverageTape() {
  const names = coverage.map(([, name]) => name);
  return (
    <div className="mt-[72px]">
      <p className="mx-auto mb-3 max-w-[1200px] px-6 font-mono text-xs text-[#CDBBA7] md:px-12">
        coverage · ASEAN and North Asia
      </p>
      <p className="sr-only">Markets covered: {names.slice(0, -1).join(", ")} and {names[names.length - 1]}.</p>
      <div className="overflow-hidden border-y border-[#5A4636]" aria-hidden="true">
        <div className="tape flex w-max font-mono text-sm tracking-wide text-background">
          {[...coverage, ...coverage].map(([code, name], i) => (
            <span key={`${code}-${i}`} className="whitespace-nowrap px-[30px] py-4">
              <span className="mr-2.5 text-[#E08A5A]">{code}</span>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
