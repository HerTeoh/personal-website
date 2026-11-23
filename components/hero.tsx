"use client";

import { useScroll, useTransform, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";
import FadeIn from "@/components/fade-in";

/**
 * Opening screen. As you scroll away, the name eases up, shrinks slightly and fades,
 * handing over to the career chapters. Static for visitors who prefer reduced motion.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-between px-6 md:px-16 lg:px-24 py-12 bg-background overflow-hidden"
    >
      {/* Top bar */}
      <header className="flex items-center">
        <span className="font-sans text-sm text-muted-foreground tracking-widest uppercase">
          HerTeoh.com
        </span>
      </header>

      {/* Main hero content */}
      <main className="flex-1 flex flex-col justify-center py-20">
        <m.div
          className="max-w-4xl origin-left will-change-transform"
          style={reduce ? undefined : { y, scale, opacity }}
        >
          {/* Location pill */}
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
              <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
                Singapore
              </span>
            </div>
          </FadeIn>

          {/* Name */}
          <FadeIn delay={0.15}>
            <h1 className="font-serif text-[clamp(3.5rem,12vw,9rem)] leading-none font-normal text-foreground text-balance">
              Her Teoh
            </h1>
          </FadeIn>

          {/* Divider */}
          <FadeIn delay={0.3}>
            <div className="w-16 h-px bg-accent mt-10 mb-10" aria-hidden="true" />
          </FadeIn>

          {/* One-liner */}
          <FadeIn delay={0.45}>
            <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg text-pretty">
              Data. Operations. Entrepreneurship.{" "}
              <span className="text-foreground font-medium">Now markets.</span>
            </p>
          </FadeIn>
        </m.div>
      </main>

      {/* Bottom scroll hint: fades as soon as scrolling starts */}
      <m.footer
        className="flex items-center justify-end"
        style={reduce ? undefined : { opacity: hintOpacity }}
      >
        <a
          href="#about"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 motion-safe:animate-bounce">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </m.footer>
    </section>
  );
}
