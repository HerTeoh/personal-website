"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * The visitor's reduced-motion preference, applied only after hydration.
 * The server can't know the preference, so the first browser render must match
 * the server's (motion on); the preference takes effect immediately after.
 */
export function useReducedMotionSafe(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduce;
}
