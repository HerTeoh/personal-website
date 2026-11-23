"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/nav";

/**
 * Small header for inner pages. The home page has none on purpose:
 * it reads as one story, ending in the footer.
 */
export default function SiteHeader({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="bg-background px-6 md:px-16 lg:px-24 pt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href="/"
        className="font-sans text-sm text-muted-foreground tracking-widest uppercase hover:text-foreground transition-colors duration-200"
      >
        HerTeoh.com
      </Link>
      <nav aria-label="Sections">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map(({ href, label }) => {
            const current = isCurrent(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={current ? "page" : undefined}
                  className={`font-sans text-sm tracking-wide transition-colors duration-200 pb-1 border-b ${
                    current
                      ? "text-foreground border-accent"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
