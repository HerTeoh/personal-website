import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { categoryOrder, credits } from "@/lib/credits";
import FadeIn from "@/components/fade-in";

export const metadata: Metadata = pageMetadata("/credits", {
  title: "Credits",
  description:
    "The open-source projects, fonts, tools and ideas this site is built on, with thanks to their creators.",
});

export default function CreditsPage() {
  const groups = categoryOrder
    .map((category) => ({
      category,
      items: credits.filter((c) => c.category === category),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-background px-6 md:px-16 lg:px-24 pb-12">

      <main className="max-w-4xl py-20 md:py-28">
        <FadeIn>
        <div className="flex items-center gap-4 mb-12">
          <span className="w-8 h-px bg-accent" aria-hidden="true" />
          <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
            Credits
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-foreground text-balance leading-tight mb-6">
          Standing on generous shoulders.
        </h1>
        <p className="font-sans text-base text-muted-foreground leading-relaxed mb-20 max-w-xl text-pretty">
          This site is built with open-source work, typefaces and ideas from
          people who chose to share them. Here they are, with thanks.
        </p>
        </FadeIn>

        <div className="space-y-16">
          {groups.map(({ category, items }) => (
            <FadeIn key={category}>
            <section aria-labelledby={slug(category)}>
              <h2
                id={slug(category)}
                className="font-sans text-xs text-muted-foreground tracking-widest uppercase mb-6"
              >
                {category}
              </h2>
              <ul className="divide-y divide-border border-y border-border">
                {items.map((c) => (
                  <li
                    key={c.name}
                    className="py-5 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-1 md:gap-8"
                  >
                    <div>
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif text-xl text-foreground hover:text-accent transition-colors duration-200"
                      >
                        {c.name}
                      </a>
                      <p className="font-sans text-sm text-muted-foreground mt-1">
                        {c.creator}
                        {c.license && (
                          <>
                            {" "}
                            &middot;{" "}
                            <span className="text-foreground">{c.license}</span>
                          </>
                        )}
                      </p>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed md:pt-1">
                      {c.usedFor}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
            </FadeIn>
          ))}
        </div>

        <p className="font-sans text-xs text-muted-foreground mt-20 tracking-wide max-w-xl leading-relaxed">
          Spotted something of yours that isn&apos;t credited properly? It
          will be corrected as soon as it&apos;s noticed.
        </p>
      </main>
    </div>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
