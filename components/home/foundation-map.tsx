"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/components/home/use-reduced-motion-safe";
import { worldLand } from "@/lib/world-land";

// Positions are projected from real coordinates onto the 520 × 210 map (see lib/world-land.ts).
const stops = [
  { n: "1", name: "San Francisco", x: 26, y: 54 },
  { n: "2", name: "Berlin", x: 269, y: 28 },
  { n: "3", name: "Buenos Aires", x: 141, y: 183 },
  { n: "4", name: "Tokyo", note: "a summer with Hitomedia", x: 494, y: 58, hollow: true },
  { n: "5", name: "Seoul", x: 471, y: 55 },
  { n: "6", name: "Hyderabad", x: 385, y: 91 },
  { n: "7", name: "London", x: 245, y: 30 },
];

const ROUTE = "M26,54 Q142,-12 269,28 Q171,77 141,183 Q290,43 494,58 Q484,47 471,55 Q420,54 385,91 Q328,30 245,30 Q130,-6 26,54";
const ROUTE_LENGTH = 1352;

// Two columns read top-to-bottom: 1–4 on the left, 5–7 and "back" on the right.
const legend = [stops[0], stops[4], stops[1], stops[5], stops[2], stops[6], stops[3]];

export default function FoundationMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotionSafe();
  const drawn = inView || reduce;

  return (
    <figure ref={ref} className="m-0">
      <svg
        viewBox="0 0 520 210"
        className="block w-full rounded-xl bg-[#F7F0E5]"
        role="img"
        aria-label="World map of my route: San Francisco, Berlin, Buenos Aires, a summer in Tokyo, Seoul, Hyderabad, London, then back to San Francisco"
      >
        <path d={worldLand} fill="#EADCC8" stroke="#C9B699" strokeWidth={0.8} />
        <path
          d={ROUTE}
          fill="none"
          stroke="#C4622D"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeDasharray={ROUTE_LENGTH}
          strokeDashoffset={drawn ? 0 : ROUTE_LENGTH}
          style={{ transition: reduce ? "none" : "stroke-dashoffset 2.6s ease" }}
        />
        {stops.map((s) => (
          <g key={s.n}>
            <circle
              cx={s.x}
              cy={s.y}
              r={7.5}
              fill={s.hollow ? "#FAF7F2" : "#C4622D"}
              stroke={s.hollow ? "#C4622D" : "#FAF7F2"}
              strokeWidth={1.5}
            />
            <text
              x={s.x}
              y={s.y + 3.5}
              textAnchor="middle"
              fill={s.hollow ? "#A34C1D" : "#FAF7F2"}
              style={{ font: "600 9px var(--font-inter), sans-serif" }}
            >
              {s.n}
            </text>
          </g>
        ))}
      </svg>
      <ol className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 font-sans text-sm text-foreground">
        {legend.map((s) => (
          <li key={s.n}>
            <span className="mr-2 font-mono text-accent-strong">{s.n}</span>
            {s.name}
            {s.note && <span className="italic text-[#5A4636]"> · {s.note}</span>}
          </li>
        ))}
        <li>
          <span className="mr-2 font-mono text-accent-strong" aria-hidden="true">↺</span>
          back to San Francisco
        </li>
      </ol>
      <figcaption className="mt-3.5 font-mono text-xs text-accent-strong">7 cities · 4 years</figcaption>
    </figure>
  );
}
