import Link from "next/link";
import FadeIn from "@/components/fade-in";

export type NextCard = { href: string; label: string; blurb: string; detail: string };

/** "Where to next": the writing sections as cards that lift in one by one. */
export default function WhereNext({ cards }: { cards: NextCard[] }) {
  return (
    <section
      id="index"
      aria-labelledby="where-next"
      className="px-6 md:px-16 lg:px-24 py-24 md:py-32 bg-background border-t border-border"
    >
      <div className="flex items-center gap-4 mb-12">
        <span className="w-8 h-px bg-accent" aria-hidden="true" />
        <h2 id="where-next" className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
          Where to next
        </h2>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl">
        {cards.map((c, i) => (
          <li key={c.href}>
            <FadeIn delay={i * 0.08} y={20} className="h-full">
              <Link
                href={c.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 md:p-7 transition-all duration-300 hover:border-accent motion-safe:hover:-translate-y-1 hover:shadow-[0_12px_30px_-18px_rgba(44,31,20,0.35)]"
              >
                <div>
                  <p className="flex items-center justify-between font-serif text-2xl text-foreground">
                    {c.label}
                    <span
                      className="text-accent text-lg transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      &rarr;
                    </span>
                  </p>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mt-3">{c.blurb}</p>
                </div>
                <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase mt-6">
                  {c.detail}
                </p>
              </Link>
            </FadeIn>
          </li>
        ))}
      </ul>
    </section>
  );
}
