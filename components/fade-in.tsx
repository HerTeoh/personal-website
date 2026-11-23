"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before starting, for staggering siblings. */
  delay?: number;
  /** How far (px) the element slides up as it fades in. */
  y?: number;
};

/**
 * Fades and slides its children in the first time they scroll into view.
 * Uses Motion (https://motion.dev, MIT). Credited in lib/credits.ts.
 */
export default function FadeIn({ children, className, delay = 0, y = 24 }: FadeInProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

/**
 * Wrap the app in this so anyone with "reduce motion" turned on in their
 * device settings gets no slide, only a gentle opacity fade.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    // LazyMotion + `m` ships only the animation features we use (smaller bundle).
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
