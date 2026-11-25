import Link from "next/link";
import { chapters, sectionLinks, sitePages, upcomingSections } from "@/lib/nav";

const linkClass = "text-foreground transition-colors duration-200 hover:text-accent-strong";

/** Sitemap footer on every page: writing, about, and the small print. */
export default function SiteFooter() {
  const writing = sectionLinks().filter((l) => l.href !== "/now");
  const soon = upcomingSections();

  return (
    <footer className="border-t border-border bg-background px-6 pb-20 pt-16 md:px-12">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-x-16 gap-y-12">
        <div className="min-w-0 flex-[1_1_260px]">
          <p className="font-serif text-[32px] leading-tight text-foreground">Her Teoh</p>
          <p className="mt-2.5 flex items-center gap-2 font-sans text-sm text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            Singapore
          </p>
          <p className="mt-7 font-serif text-[22px] text-foreground">
            Still building<span className="text-accent">.</span>
          </p>
        </div>

        <nav aria-label="Writing" className="min-w-0 flex-[1_1_150px]">
          <p className="mb-4 font-mono text-xs text-muted-foreground">writing/</p>
          <ul className="flex flex-col gap-3 font-sans text-[15px]">
            {writing.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>{l.label}</Link>
              </li>
            ))}
            {soon.map((label) => (
              <li key={label} className="text-muted-foreground">
                {label} <span className="font-mono text-[11px]">soon</span>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="About" className="min-w-0 flex-[1_1_150px]">
          <p className="mb-4 font-mono text-xs text-muted-foreground">about/</p>
          <ul className="flex flex-col gap-3 font-sans text-[15px]">
            <li><Link href="/now" className={linkClass}>Now</Link></li>
            {chapters.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Site" className="min-w-0 flex-[1_1_150px]">
          <p className="mb-4 font-mono text-xs text-muted-foreground">site/</p>
          <ul className="flex flex-col gap-3 font-sans text-[15px]">
            {sitePages.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>{l.label}</Link>
              </li>
            ))}
            <li><a href="/notes/feed.xml" className={linkClass}>RSS feed</a></li>
            <li><a href="/llms.txt" className={linkClass}>llms.txt</a></li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-border pt-5 font-mono text-xs text-muted-foreground">
        <span>⌘K jump · N notes · W now · ? all shortcuts</span>
        <span>Personal views only, not investment advice.</span>
      </div>
    </footer>
  );
}
