"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type PaletteItem = {
  /** Single-key shortcut shown in the list and usable anywhere on the site. */
  key?: string;
  label: string;
  hint?: string;
  href: string;
  group: "Sections" | "On the home page" | "Site";
};

/** Opens the palette from anywhere (e.g. a "Jump to…" button). */
export function openPalette() {
  window.dispatchEvent(new Event("palette:open"));
}

const isTyping = (el: EventTarget | null) => {
  const t = el as HTMLElement | null;
  return !!t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));
};

/**
 * ⌘K / Ctrl+K "Jump to…" menu, plus single-key shortcuts (N notes, W now, 1–5 chapters…)
 * and "?" to open the menu. Shortcuts are ignored while typing in a field.
 */
export default function CommandPalette({ items }: { items: PaletteItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => `${i.label} ${i.hint ?? ""}`.toLowerCase().includes(q) || i.key?.toLowerCase() === q,
    );
  }, [items, query]);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  const go = useCallback(
    (item: PaletteItem) => {
      setOpen(false);
      router.push(item.href);
    },
    [router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
        return;
      }
      if (open || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      if (e.key === "?") {
        e.preventDefault();
        show();
        return;
      }
      const hit = items.find((i) => i.key && i.key.toLowerCase() === e.key.toLowerCase());
      if (hit) {
        e.preventDefault();
        go(hit);
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, [items, open, show, close, go]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close menu"
        onClick={close}
        className="absolute inset-0 bg-foreground/45 cursor-default"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Jump to"
        className="relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-border bg-background shadow-[0_30px_80px_-20px_rgba(44,31,20,0.5)]"
      >
        <label className="flex items-center gap-3 border-b border-border px-5 py-4">
          <span className="font-mono text-sm text-accent-strong" aria-hidden="true">
            &gt;
          </span>
          <span className="sr-only">Jump to</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Type a page or chapter… e.g. notes, ops"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `palette-${active}` : undefined}
            className="min-h-[32px] flex-1 border-0 bg-transparent font-sans text-lg text-foreground outline-none placeholder:text-muted-foreground focus-visible:outline-none"
          />
          <button
            type="button"
            onClick={close}
            className="press rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs text-muted-foreground"
          >
            esc
          </button>
        </label>
        <ul id="palette-list" role="listbox" aria-label="Pages and chapters" className="max-h-[60vh] overflow-y-auto p-2">
          {results.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            return (
              <li key={item.href + item.label} role="presentation">
                {header && (
                  <p className="px-3.5 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {header}
                  </p>
                )}
                <a
                  id={`palette-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  onMouseEnter={() => setActive(i)}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item);
                  }}
                  className={`flex items-center gap-3.5 rounded-[10px] px-3.5 py-3 text-foreground ${
                    i === active ? "bg-card" : ""
                  }`}
                >
                  <span className="w-[26px] rounded-md border border-border py-0.5 text-center font-mono text-xs">
                    {item.key ?? "·"}
                  </span>
                  <span className="font-sans text-base font-medium">{item.label}</span>
                  {item.hint && (
                    <span className="ml-auto truncate pl-4 font-sans text-[13px] text-muted-foreground">{item.hint}</span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
        {results.length === 0 && (
          <p className="px-5 pb-6 pt-4 font-sans text-sm text-muted-foreground">Nothing called that yet.</p>
        )}
        <p className="border-t border-border px-5 py-3 font-mono text-[11px] text-muted-foreground">
          ↑↓ to move · enter to open · esc to close · press a key shown on the left from anywhere on the site
        </p>
      </div>
    </div>
  );
}
