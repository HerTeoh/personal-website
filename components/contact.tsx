import FadeIn from "@/components/fade-in";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-16 lg:px-24 py-20 md:py-28 bg-background border-t border-border"
    >
      <FadeIn className="max-w-4xl">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="w-8 h-px bg-accent" aria-hidden="true" />
          <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
            Thanks for reading
          </span>
        </div>

        {/* Sign-off */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-foreground text-balance leading-tight mb-6">
          Still building.
        </h2>
        <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-md text-pretty">
          Markets, data, and the operating lessons in between. More to come.
        </p>

      </FadeIn>
    </section>
  );
}
