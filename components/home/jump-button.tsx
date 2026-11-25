"use client";

import { openPalette } from "@/components/command-palette";

/** "⌘K" written inline in a sentence, opening the Jump to… menu. */
export default function JumpButton() {
  return (
    <button
      type="button"
      onClick={openPalette}
      className="inline-link cursor-pointer border-0 bg-transparent p-0 font-[inherit] leading-[inherit]"
    >
      ⌘K
    </button>
  );
}
