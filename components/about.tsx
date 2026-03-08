const milestones = [
  { label: "Data Engineer", sub: "Neuron Mobility" },
  { label: "Operations Excellence", sub: "Neuron Mobility" },
  { label: "Business Owner", sub: "F&B" },
  { label: "Assistant Portfolio Manager", sub: "Singular Asset Management" },
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left — text */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-snug text-balance mb-8">
            A non-linear career, deliberately built.
          </h2>

          <div className="space-y-5 font-sans text-base leading-relaxed text-muted-foreground">
            <p>
              I started with an unconventional choice:{" "}
              <span className="text-foreground">Minerva University</span>, a
              globally mobile programme where students spend four years living
              and studying across seven cities, from San Francisco to Seoul,
              Berlin to Buenos Aires. It was rigorous, internationally minded,
              and nothing like a traditional degree.
            </p>
            <p>
              My career began at{" "}
              <span className="text-foreground">Neuron Mobility</span> in 2019,
              where I joined as the company&apos;s first and sole Data Engineer
              as the business scaled from one to twenty cities. I built the data
              infrastructure on AWS from the ground up, owned the Tableau
              environment, and worked end-to-end across collection, pipeline
              development, and analysis. My scope expanded from data into
              operations. I moved into a Global Operations Excellence role under
              the COO, leading cross-regional initiatives in service delivery,
              fleet efficiency, and supply planning, driving measurable
              improvements in cost efficiency across regional markets.
            </p>
            <p>
              I left Neuron to pursue a different kind of challenge. I brought a
              franchise brand into Singapore, handling market entry, fit-out,
              hiring, and day-to-day operations before completing a successful
              ownership transition. It was a hands-on lesson in what it takes to
              build and run something from scratch.
            </p>
            <p>
              I am now an Assistant Portfolio Manager at{" "}
              <span className="text-foreground">Singular Asset Management</span>,
              focused on public equities across Asia with an emphasis on ASEAN
              markets. I bring to the role what the earlier chapters gave me:
              analytical rigour, operational perspective, and a comfort with
              complexity.
            </p>
          </div>

          {/* Timeline chips */}
          <div className="flex flex-wrap gap-3 mt-10">
            {milestones.map(({ label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background"
              >
                <span className="font-sans text-xs font-medium text-foreground">
                  {label}
                </span>
                <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
                <span className="font-sans text-xs text-muted-foreground">
                  {sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <div className="relative">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-muted">
            <img
              src="/her-portrait.jpg"
              alt="Her Teoh"
              className="absolute inset-0 w-full h-full object-cover object-[center_30%] scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
