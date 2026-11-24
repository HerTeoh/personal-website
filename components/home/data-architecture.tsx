"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { useReducedMotionSafe } from "@/components/home/use-reduced-motion-safe";

const STAGES = ["plan", "build", "maintain"] as const;
const NOTES = [
  "stage 1 · planning the architecture",
  "stage 2 · building the pipelines",
  "stage 3 · maintaining · ● jobs healthy",
];

const nodes = [
  { x: 36, y: 98, name: "RDS", role: "app database" },
  { x: 160, y: 98, name: "EC2", role: "extract jobs" },
  { x: 296, y: 98, name: "S3", role: "raw zone" },
  { x: 160, y: 186, name: "EC2", role: "transform jobs" },
  { x: 296, y: 186, name: "S3", role: "staged zone" },
  { x: 36, y: 186, name: "Redshift", role: "data warehouse" },
];

const edges = [
  "M132 119 H158",
  "M256 119 H294",
  "M344 140 V160 H208 V184",
  "M256 207 H294",
  "M344 228 V250 H146 V215 H134",
  "M84 228 V288 H470 V206",
];

const edgeLabels = [
  { x: 300, y: 156, t: "transform" },
  { x: 226, y: 246, t: "COPY · load" },
  { x: 300, y: 284, t: "query" },
];

const mono = (size: number, weight = 400) => ({ font: `${weight} ${size}px var(--font-mono), monospace` });
const sans = (size: number, weight = 600) => ({ font: `${weight} ${size}px var(--font-inter), sans-serif` });

/**
 * The AWS data platform as an architecture diagram. Scrolling through the chapter moves it
 * through three stages: planned (blueprint dashes), built (solid), maintained (data flowing).
 */
export default function DataArchitecture() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.34 ? 0 : v < 0.67 ? 1 : 2;
    if (next !== stage) setStage(next);
  });

  const s = reduce ? 2 : stage;
  const planned = s === 0;
  const edgeColor = planned ? "#B9A894" : "#5A4636";
  const dash = planned ? "5 5" : undefined;

  return (
    <figure ref={ref} className="m-0">
      <p className="mb-3.5 flex gap-2 font-mono text-xs" aria-hidden="true">
        {STAGES.map((name, i) => (
          <span
            key={name}
            className={`rounded-full border px-3 py-1.5 transition-colors duration-300 ${
              i === s
                ? "border-foreground bg-foreground text-background"
                : i < s
                  ? "border-foreground text-foreground"
                  : "border-[#B9A894] text-muted-foreground"
            }`}
          >
            {i < s ? "✓ " : ""}
            {name}
          </span>
        ))}
      </p>
      <svg
        viewBox="0 0 520 340"
        className="block w-full rounded-xl bg-[#F7F0E5]"
        role="img"
        aria-label="Architecture diagram: inside an AWS account with IAM roles on every service, RDS feeds EC2 extract jobs into an S3 raw zone; EC2 transform jobs write to an S3 staged zone; that is loaded into Redshift, the data warehouse, which Tableau queries for dashboards on a scheduled refresh."
      >
        <defs>
          <pattern id="bp-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0 H0 V16" fill="none" stroke="#E8DCCB" strokeWidth={0.6} />
          </pattern>
          <marker id="bp-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill={edgeColor} />
          </marker>
        </defs>
        <rect width="520" height="340" fill="url(#bp-grid)" />

        <rect x="8" y="8" width="404" height="300" rx="10" fill="none" stroke="#5A4636" strokeWidth={1.2} strokeDasharray="6 4" />
        <text x="18" y="24" fill="#5A4636" style={mono(10, 500)}>AWS account</text>
        <rect x="24" y="32" width="372" height="22" rx="6" fill="#2C1F14" />
        <text x="34" y="47" fill="#FAF7F2" style={mono(10)}>IAM · roles &amp; policies scoped per service</text>
        <path d="M84 54 V98 M208 54 V98 M344 54 V98" fill="none" stroke="#8C7A68" strokeWidth={1} strokeDasharray="2 3" />
        <rect x="20" y="66" width="260" height="232" rx="8" fill="none" stroke="#8C7A68" strokeWidth={1} strokeDasharray="3 3" />
        <text x="30" y="80" fill="#8C7A68" style={mono(10)}>VPC</text>

        {edges.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke={edgeColor}
            strokeWidth={2}
            strokeDasharray={dash}
            markerEnd="url(#bp-arrow)"
            style={{ transition: "stroke 0.4s" }}
          />
        ))}

        {s === 2 && !reduce &&
          [0, 2, 4, 6].map((delay) => (
            <circle key={delay} className="pipe-dot" r={3.5} fill="#C4622D" style={{ animationDelay: `-${delay}s` }} />
          ))}

        {nodes.map((n) => (
          <g key={n.role}>
            <rect
              x={n.x}
              y={n.y}
              width="96"
              height="42"
              rx="6"
              fill={planned ? "transparent" : "#FAF7F2"}
              stroke="#2C1F14"
              strokeWidth={1.4}
              strokeDasharray={planned ? "4 3" : undefined}
            />
            <text x={n.x + 48} y={n.y + 18} textAnchor="middle" fill="#2C1F14" style={sans(12)}>{n.name}</text>
            <text x={n.x + 48} y={n.y + 33} textAnchor="middle" fill="#5A4636" style={mono(9)}>{n.role}</text>
          </g>
        ))}
        <rect x="428" y="150" width="84" height="54" rx="6" fill="#2C1F14" />
        <text x="470" y="174" textAnchor="middle" fill="#FAF7F2" style={sans(12)}>Tableau</text>
        <text x="470" y="189" textAnchor="middle" fill="#CDBBA7" style={mono(9)}>dashboards</text>

        {edgeLabels.map((l) => (
          <text key={l.t} x={l.x} y={l.y} textAnchor="middle" fill="#5A4636" style={mono(8)}>{l.t}</text>
        ))}
        <text x="470" y="132" textAnchor="middle" fill="#5A4636" style={mono(8)}>↻ scheduled</text>
        <text x="470" y="142" textAnchor="middle" fill="#5A4636" style={mono(8)}>refresh</text>

        <path d="M18 322 H34" stroke="#5A4636" strokeWidth={2} />
        <text x="40" y="325" fill="#5A4636" style={mono(9)}>data</text>
        <path d="M84 322 H100" stroke="#8C7A68" strokeWidth={1} strokeDasharray="2 3" />
        <text x="106" y="325" fill="#5A4636" style={mono(9)}>access / control</text>
        <text x="512" y="325" textAnchor="end" fill="#A34C1D" style={mono(10, 500)}>{NOTES[s]}</text>
      </svg>
    </figure>
  );
}
