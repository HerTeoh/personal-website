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

// AWS services inside the account.
const nodes = [
  { x: 24, y: 80, name: "RDS", role: "app DB · primary" },
  { x: 24, y: 170, name: "RDS", role: "read replica" },
  { x: 140, y: 125, name: "EC2", role: "ETL jobs" },
  { x: 256, y: 80, name: "Redshift", role: "data warehouse" },
  { x: 140, y: 252, name: "S3", role: "cold data lake" },
];

// Data flows (arrows).
const edges = [
  "M72 122 V166", // RDS → replica (replication)
  "M120 191 H130 V146 H136", // replica → EC2 (extract)
  "M236 146 H246 V101 H252", // EC2 → Redshift (load)
  "M188 167 V248", // EC2 → S3 (archive)
  "M352 101 H380", // Redshift → consumers
  "M72 212 V310 H380", // replica → MDS API (runs below S3)
  "M370 310 V220 H380", // replica → consumers (branch)
];

const edgeLabels = [
  { x: 76, y: 148, t: "replicate", anchor: "start" },
  { x: 134, y: 182, t: "extract", anchor: "start" },
  { x: 250, y: 136, t: "load", anchor: "start" },
  { x: 192, y: 212, t: "archive", anchor: "start" },
];

const consumers = [
  { y: 74, name: "Tableau", role: "dashboards" },
  { y: 128, name: "ML scripts", role: "machine learning" },
  { y: 182, name: "Internal reports", role: "reporting" },
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
  const boxFill = planned ? "transparent" : "#FAF7F2";
  const boxDash = planned ? "4 3" : undefined;

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
        viewBox="0 0 520 352"
        className="block w-full rounded-xl bg-[#F7F0E5]"
        role="img"
        aria-label="Architecture diagram: inside an AWS account with IAM roles on every service, the primary RDS app database replicates to a read replica. EC2 ETL jobs extract from the replica, load Redshift, the data warehouse, and archive to S3, a cold data lake. Tableau dashboards, machine-learning scripts and internal reports read from Redshift or the RDS replica, and the replica also serves the Mobility Data Specification (MDS) API."
      >
        <defs>
          <pattern id="bp-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0 H0 V16" fill="none" stroke="#E8DCCB" strokeWidth={0.6} />
          </pattern>
          <marker id="bp-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill={edgeColor} />
          </marker>
        </defs>
        <rect width="520" height="352" fill="url(#bp-grid)" />

        {/* AWS account, IAM and VPC */}
        <rect x="8" y="8" width="360" height="316" rx="10" fill="none" stroke="#5A4636" strokeWidth={1.2} strokeDasharray="6 4" />
        <text x="18" y="24" fill="#5A4636" style={mono(10, 500)}>AWS account</text>
        <rect x="24" y="32" width="328" height="22" rx="6" fill="#2C1F14" />
        <text x="34" y="47" fill="#FAF7F2" style={mono(10)}>IAM · roles &amp; policies scoped per service</text>
        <path d="M72 54 V80 M188 54 V125 M304 54 V80" fill="none" stroke="#8C7A68" strokeWidth={1} strokeDasharray="2 3" />
        <rect x="16" y="64" width="344" height="180" rx="8" fill="none" stroke="#8C7A68" strokeWidth={1} strokeDasharray="3 3" />
        <text x="312" y="238" fill="#8C7A68" style={mono(10)}>VPC</text>

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
            <rect x={n.x} y={n.y} width="96" height="42" rx="6" fill={boxFill} stroke="#2C1F14" strokeWidth={1.4} strokeDasharray={boxDash} />
            <text x={n.x + 48} y={n.y + 18} textAnchor="middle" fill="#2C1F14" style={sans(12)}>{n.name}</text>
            <text x={n.x + 48} y={n.y + 33} textAnchor="middle" fill="#5A4636" style={mono(9)}>{n.role}</text>
          </g>
        ))}

        {edgeLabels.map((l) => (
          <text key={l.t} x={l.x} y={l.y} textAnchor={l.anchor as "start" | "middle"} fill="#5A4636" style={mono(8)}>{l.t}</text>
        ))}

        {/* What reads from the warehouse or the replica */}
        <rect x="384" y="40" width="128" height="196" rx="8" fill="#2C1F14" />
        <text x="396" y="58" fill="#CDBBA7" style={mono(9)}>reads from Redshift</text>
        <text x="396" y="69" fill="#CDBBA7" style={mono(9)}>or the RDS replica</text>
        {consumers.map((c) => (
          <g key={c.name}>
            <rect x="394" y={c.y + 4} width="108" height="42" rx="6" fill="#3A2B1E" stroke="#5A4636" strokeWidth={1} />
            <text x="448" y={c.y + 22} textAnchor="middle" fill="#FAF7F2" style={sans(11)}>{c.name}</text>
            <text x="448" y={c.y + 37} textAnchor="middle" fill="#CDBBA7" style={mono(8.5)}>{c.role}</text>
          </g>
        ))}

        <rect x="384" y="288" width="128" height="44" rx="8" fill={boxFill} stroke="#2C1F14" strokeWidth={1.4} strokeDasharray={boxDash} />
        <text x="448" y="306" textAnchor="middle" fill="#2C1F14" style={sans(12)}>MDS API</text>
        <text x="448" y="321" textAnchor="middle" fill="#5A4636" style={mono(8)}>mobility data spec</text>

        <path d="M18 342 H34" stroke="#5A4636" strokeWidth={2} />
        <text x="40" y="345" fill="#5A4636" style={mono(9)}>data</text>
        <path d="M84 342 H100" stroke="#8C7A68" strokeWidth={1} strokeDasharray="2 3" />
        <text x="106" y="345" fill="#5A4636" style={mono(9)}>access / control</text>
        <text x="512" y="345" textAnchor="end" fill="#A34C1D" style={mono(10, 500)}>{NOTES[s]}</text>
      </svg>
    </figure>
  );
}
