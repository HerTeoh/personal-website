import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import FadeIn from "@/components/fade-in";
import { now } from "@/lib/now";
import { getReading } from "@/lib/reading";

export const metadata: Metadata = pageMetadata("/now", {
  title: "Now",
  description: "What Her Teoh is focused on at the moment.",
});

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function NowPage() {
  // The three most recent items on /reading appear under Reading automatically.
  const recent = getReading()
    .slice(0, 3)
    .map((r) => ({ text: r.source ? `${r.title}, ${r.source}` : r.title, href: r.url }));
  const sections = now.sections
    .map((s) => (s.title === "Reading" ? { ...s, items: [...recent, ...s.items] } : s))
    .filter((s) => s.items.length > 0);

  return (
    <div className="min-h-screen bg-background px-6 md:px-16 lg:px-24 pb-12">

      <main className="max-w-2xl py-20 md:py-28">
        <FadeIn>
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-px bg-accent" aria-hidden="true" />
            <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
              Now
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-foreground text-balance leading-tight mb-6">
            What I&apos;m focused on.
          </h1>
          <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase mb-20">
            Updated {formatDate(now.updated)} &middot; {now.location}
          </p>
        </FadeIn>

        <div className="space-y-14">
          {sections.map((section) => (
            <FadeIn key={section.title}>
              <section aria-labelledby={`now-${section.title.toLowerCase()}`}>
                <h2
                  id={`now-${section.title.toLowerCase()}`}
                  className="font-serif text-2xl text-foreground mb-5"
                >
                  {section.title}
                </h2>
                <ul className="space-y-3 font-sans text-base leading-relaxed text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item.text} className="flex gap-3">
                      <span
                        className="mt-[0.7em] w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground underline underline-offset-2 hover:text-accent-strong transition-colors duration-200"
                          >
                            {item.text}
                          </a>
                        ) : (
                          item.text
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>
          ))}
        </div>

        <p className="font-sans text-xs text-muted-foreground mt-24 tracking-wide leading-relaxed max-w-md">
          This is a{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-accent-strong"
          >
            now page
          </a>
          , an idea from Derek Sivers. Personal views only, not investment advice.
        </p>
      </main>
    </div>
  );
}
