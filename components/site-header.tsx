"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { openPalette } from "@/components/command-palette";
import { SoundToggle } from "@/components/sound";
import type { NavLink } from "@/lib/nav";

/**
 * Site header. Every page gets the brand, the Sound switch and "Jump to… ⌘K".
 * Inner pages also list the writing sections; the home page leaves them out
 * so it reads as one story (the sections are in "Where to next" and the footer).
 */
export default function SiteHeader({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-3 md:px-12">
        <Link href="/" className="font-mono text-[13px] text-foreground hover:text-accent-strong">
          herteoh.com<span className="text-muted-foreground">:~$</span>
        </Link>

        {!isHome && (
          <nav aria-label="Sections" className="order-3 w-full sm:order-none sm:w-auto">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map(({ href, label }) => {
                const current = isCurrent(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={current ? "page" : undefined}
                      className={`border-b pb-1 font-sans text-sm tracking-wide transition-colors duration-200 ${
                        current
                          ? "border-accent text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        <div className="flex items-center gap-2.5">
          <SoundToggle />
          <button
            type="button"
            onClick={openPalette}
            aria-keyshortcuts="Meta+K Control+K"
            aria-label="Jump to… (Command K)"
            className="press flex min-h-[44px] min-w-[44px] items-center gap-3 rounded-[10px] border border-border bg-background px-3 font-sans text-[13px] font-medium text-foreground hover:bg-card sm:min-w-[200px] sm:px-3.5"
          >
            <span className="hidden text-muted-foreground sm:inline">Jump to…</span>
            <kbd className="ml-auto rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-xs">⌘K</kbd>
          </button>
        </div>
      </div>
    </header>
  );
}
