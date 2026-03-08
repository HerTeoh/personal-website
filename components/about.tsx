import Image from "next/image";

const milestones = [
  { year: "Early career", label: "Data Engineer" },
  { year: "Then", label: "Neuron Mobility" },
  { year: "Now", label: "Singular Asset Management" },
];

export default function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-16 lg:px-24 py-24 md:py-32 bg-card border-t border-border"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="w-8 h-px bg-accent" aria-hidden="true" />
        <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
          About
        </span>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left — text */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-snug text-balance mb-8">
            A winding path that{" "}
            <em className="italic text-accent">made sense</em>{" "}
            in hindsight.
          </h2>

          <div className="space-y-5 font-sans text-base leading-relaxed text-muted-foreground">
            <p>
              I started out as a Data Engineer — building pipelines, wrangling
              messy datasets, and learning to find signal in noise. It was
              technical, precise work, and I loved it for what it taught me:
              how to think in systems, how to ask better questions.
            </p>
            <p>
              From there I moved into operations and strategy at{" "}
              <span className="text-foreground font-medium">Neuron Mobility</span>,
              one of Southeast Asia&apos;s leading shared e-scooter companies.
              That chapter taught me what it meant to be accountable for
              outcomes at scale — fast-moving, high-stakes, and formative in
              equal measure.
            </p>
            <p>
              Now I work as an Assistant Portfolio Manager at{" "}
              <span className="text-foreground font-medium">
                Singular Asset Management
              </span>
              , and it turns out all those threads connect more than I expected.
              The analytical rigour, the operational instinct, the habit of
              seeing things whole — they all show up at the desk.
            </p>
            <p className="text-foreground font-medium">
              I&apos;m a builder at heart. Always have been.
            </p>
          </div>

          {/* Timeline chips */}
          <div className="flex flex-wrap gap-3 mt-10">
            {milestones.map(({ year, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background"
              >
                <span className="font-sans text-xs text-muted-foreground">
                  {year}
                </span>
                <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
                <span className="font-sans text-xs font-medium text-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <div className="relative">
          <div className="aspect-[4/5] w-full max-w-sm lg:max-w-none rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/her-portrait.jpg"
              alt="Her Teoh — a warm editorial portrait"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Terracotta accent card */}
          <div className="absolute -bottom-6 -left-6 hidden lg:block px-6 py-4 bg-accent rounded-xl shadow-lg">
            <p className="font-serif italic text-accent-foreground text-sm leading-relaxed">
              &ldquo;Find the signal,<br />follow it.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
