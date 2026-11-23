import Link from "next/link";
import { footerLinks } from "@/lib/nav";

/** Shown at the bottom of every page, so there's always somewhere to go next. */
export default function SiteFooter() {
  return (
    <footer className="bg-background px-6 md:px-16 lg:px-24 py-10 border-t border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans text-xs text-muted-foreground tracking-wide">
        <p>Her Teoh &middot; Singapore</p>
        <nav aria-label="Site">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks().map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-foreground transition-colors duration-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
