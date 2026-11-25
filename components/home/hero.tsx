"use client";

import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/components/home/use-reduced-motion-safe";
import FadeIn from "@/components/fade-in";

/**
 * Opening screen in the terminal style. As you scroll away, the block eases up,
 * shrinks slightly and fades, handing over to the first chapter.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      data-chapter="~/intro"
      className="flex min-h-[calc(100svh-72px)] flex-col justify-center overflow-hidden bg-background py-20"
    >
      <m.div
        className="mx-auto w-full max-w-[1200px] origin-left px-6 will-change-transform md:px-12"
        style={reduce ? undefined : { y, scale, opacity }}
      >
        <FadeIn>
          <p className="font-mono text-sm text-muted-foreground">$ whoami</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-4 font-serif text-[clamp(3.5rem,11vw,9rem)] font-normal leading-none text-foreground">
            Her Teoh
          </h1>
        </FadeIn>
        <FadeIn delay={0.25}>
          <p className="mt-8 font-mono text-base text-foreground md:text-[19px]">
            &gt; data → operations → entrepreneurship → <span className="text-accent-strong">markets</span>
            <span
              className="caret ml-1.5 inline-block h-[1.1em] w-2.5 translate-y-[3px] bg-accent"
              aria-hidden="true"
            />
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <p className="mt-5 flex items-center gap-2.5 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            Singapore
          </p>
        </FadeIn>
      </m.div>
    </section>
  );
}
