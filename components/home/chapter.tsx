import type { ReactNode } from "react";
import FadeIn from "@/components/fade-in";

/**
 * One career chapter: number, role, title and text on one side, its diagram on the other.
 * `from`/`to` set the background, which blends from the previous chapter's colour
 * so the page darkens gradually towards Markets.
 */
export default function Chapter({
  id,
  number,
  meta,
  title,
  from,
  to,
  dark = false,
  topPad = "pt-32",
  figure,
  after,
  children,
}: {
  id: string;
  number: string;
  meta: string;
  title: string;
  from: string;
  to: string;
  dark?: boolean;
  topPad?: string;
  figure: ReactNode;
  after?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={`chapter-${id}`}
      data-chapter={`${number} ${title.toLowerCase()}`}
      aria-labelledby={`chapter-${id}-title`}
      className={`scroll-mt-16 ${topPad} pb-32 ${dark ? "text-background" : "text-foreground"}`}
      style={{ background: `linear-gradient(${from}, ${to} 260px)` }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-16 px-6 md:px-12">
        <FadeIn className="min-w-0 flex-[1_1_420px]">
          <p className={`font-mono text-[13px] ${dark ? "text-[#CDBBA7]" : "text-[#5A4636]"}`}>
            <span className={dark ? "text-[#E08A5A]" : "text-[#8E3F16]"}>{number}</span> · {meta}
          </p>
          <h2 id={`chapter-${id}-title`} className="mb-5 mt-3.5 font-serif text-[clamp(2.25rem,9vw,3.5rem)] font-normal leading-tight">
            {title}
          </h2>
          <div className={`max-w-[520px] font-sans text-[17px] leading-[1.7] ${dark ? "text-[#CDBBA7]" : "text-[#4A3828]"}`}>
            {children}
          </div>
        </FadeIn>
        <FadeIn delay={0.1} className="min-w-0 flex-[1_1_420px]">
          {figure}
        </FadeIn>
      </div>
      {after}
    </section>
  );
}
