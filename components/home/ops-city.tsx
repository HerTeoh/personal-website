"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/components/home/use-reduced-motion-safe";

// Each scooter rides its own loop around the blocks (some leave the map and come back,
// some cross the river), with its own speed and starting point.
const routes = [
  { d: "M125 91 H275 V191 H125 Z", dur: 10, begin: 0 },
  { d: "M125 91 V191 H275 V91 Z", dur: 12.5, begin: -5 },
  { d: "M275 91 H395 V191 H275 Z", dur: 7.8, begin: -2 },
  { d: "M395 91 V191 H275 V91 Z", dur: 9.3, begin: -6 },
  { d: "M-30 91 H125 V191 H-30 Z", dur: 11, begin: -3 },
  { d: "M395 191 V91 H550 V191 Z", dur: 10.4, begin: -7 },
  { d: "M125 91 H395 V191 H125 Z", dur: 16, begin: -4 },
  { d: "M395 191 H125 V91 H395 Z", dur: 14.2, begin: -9 },
  { d: "M125 -30 V91 H275 V-30 Z", dur: 8.6, begin: -1 },
  { d: "M395 -30 V91 H275 V-30 Z", dur: 10.1, begin: -8 },
  { d: "M125 350 V191 H275 V350 Z", dur: 12, begin: -2.5 },
  { d: "M395 191 V350 H275 V191 Z", dur: 11.3, begin: -6.5 },
  { d: "M-30 191 H550 V91 H-30 Z", dur: 18, begin: -11 },
  { d: "M550 91 H-30 V191 H550 Z", dur: 20, begin: -3.5 },
  { d: "M395 -30 V350 H275 V-30 Z", dur: 15, begin: -10 },
  { d: "M125 91 H275 V191 H395 V91 H275 V-30 H125 Z", dur: 17, begin: -5.5 },
];

// Where each scooter parks when motion is reduced (a point on its route, inside the map).
const parked = [
  [200, 91], [125, 150], [330, 191], [395, 130], [60, 91], [460, 191], [250, 191], [180, 91],
  [125, 40], [395, 50], [200, 191], [275, 290], [480, 191], [40, 191], [275, 140], [275, 60],
];

function Scooter() {
  // Side-on e-scooter, drawn so its wheels sit on the street line.
  return (
    <g transform="translate(-13 -15)">
      <circle cx="5" cy="15" r="3.5" fill="#FAF7F2" stroke="#C4622D" strokeWidth={2} />
      <circle cx="23" cy="15" r="3.5" fill="#FAF7F2" stroke="#C4622D" strokeWidth={2} />
      <path d="M5 15 H19 L22 3 H25" fill="none" stroke="#2C1F14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export default function OpsCity() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotionSafe();
  const fleet = inView || reduce ? routes.length : 1;

  return (
    <figure ref={ref} className="m-0">
      <p className="mb-3 flex justify-between font-mono text-xs text-[#5A4636]">
        <span>fleet on the streets</span>
        <span>
          1 city → <span className="text-accent-strong">20 cities</span>
        </span>
      </p>
      <svg
        viewBox="0 0 520 320"
        className="block w-full rounded-2xl border border-[#D4C2A8] bg-[#F7F0E5]"
        role="img"
        aria-label="A city map with e-scooters riding their own looping routes around the blocks"
      >
        <path d="M-10 250 C 120 210, 220 300, 330 250 S 470 200, 540 230" fill="none" stroke="#CFE0E3" strokeWidth={26} />
        {[[20, 20, 90, 56], [140, 20, 120, 56], [290, 20, 90, 56], [410, 20, 90, 56],
          [20, 106, 90, 70], [290, 106, 90, 70], [410, 106, 90, 70],
          [20, 276, 90, 40], [140, 280, 120, 36], [290, 274, 90, 42], [410, 270, 90, 46]].map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx={6} fill="#EADCC8" />
        ))}
        <rect x="140" y="106" width="120" height="70" rx="6" fill="#DCE5D2" />
        {[91, 191].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="520" y2={y} stroke="#FFFFFF" strokeWidth={14} />
        ))}
        {[125, 275, 395].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="320" stroke="#FFFFFF" strokeWidth={14} />
        ))}

        {routes.map((r, i) => (
          <g key={r.d} style={{ opacity: i < fleet ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06}s` }}>
            {reduce ? (
              <g transform={`translate(${parked[i][0]} ${parked[i][1]})`}>
                <Scooter />
              </g>
            ) : (
              <g>
                <Scooter />
                <animateMotion dur={`${r.dur}s`} begin={`${r.begin}s`} repeatCount="indefinite" path={r.d} />
              </g>
            )}
          </g>
        ))}
      </svg>
      <p className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-foreground">
        <span>● service delivery</span>
        <span>● fleet efficiency</span>
        <span>● supply planning</span>
      </p>
    </figure>
  );
}
