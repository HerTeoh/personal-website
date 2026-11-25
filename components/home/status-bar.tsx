"use client";

import { useEffect, useState } from "react";
import { useSound } from "@/components/sound";

/**
 * Slim status bar fixed to the bottom of the home page: which chapter you're in,
 * plus the ⌘K and sound reminders. Decorative (the same information is on the page),
 * so it's hidden from screen readers.
 */
export default function StatusBar() {
  const [label, setLabel] = useState("~/intro");
  const { on } = useSound();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const update = () => {
      const mid = window.innerHeight * 0.55;
      let current = els[0]?.dataset.chapter ?? "~/intro";
      for (const el of els) if (el.getBoundingClientRect().top < mid) current = el.dataset.chapter ?? current;
      setLabel(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1296px] items-center justify-between gap-4 px-6 py-2.5 font-mono text-xs text-[#5A4636] md:px-12">
        <span>
          <span className="text-accent">●</span> {label}
        </span>
        <span>⌘K jump · sound {on ? "on" : "off"}</span>
      </div>
    </div>
  );
}
