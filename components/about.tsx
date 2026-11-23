import CareerChapters, { type Chapter } from "@/components/career-chapters";
import FadeIn from "@/components/fade-in";

const em = (s: string) => <span className="text-foreground">{s}</span>;

const chapters: Chapter[] = [
  {
    id: "foundation",
    label: "Foundation",
    meta: "Minerva University",
    body: (
      <p>
        I started with an unconventional choice: {em("Minerva University")}, a
        globally mobile programme where students spend four years living and
        studying across seven cities, from San Francisco to Seoul, Berlin to
        Buenos Aires. It was rigorous, internationally minded, and nothing like a
        traditional degree.
      </p>
    ),
  },
  {
    id: "data",
    label: "Data",
    meta: "Data Engineer · Neuron Mobility",
    body: (
      <p>
        My career began at {em("Neuron Mobility")} in 2019, where I joined as the
        company&apos;s first and sole Data Engineer as the business scaled from one
        to twenty cities. I built the data infrastructure on AWS from the ground
        up, owned the Tableau environment, and worked end-to-end across
        collection, pipeline development, and analysis.
      </p>
    ),
  },
  {
    id: "operations",
    label: "Operations",
    meta: "Operations Excellence · Neuron Mobility",
    body: (
      <p>
        My scope expanded from data into operations. I moved into a Global
        Operations Excellence role under the COO, leading cross-regional
        initiatives in service delivery, fleet efficiency, and supply planning,
        driving measurable improvements in cost efficiency across regional
        markets.
      </p>
    ),
  },
  {
    id: "entrepreneurship",
    label: "Entrepreneurship",
    meta: "Entrepreneur · Fitness",
    body: (
      <p>
        I left Neuron to pursue a different kind of challenge. I brought a
        franchise brand into Singapore, handling market entry, fit-out, hiring,
        and day-to-day operations before completing a successful ownership
        transition. It was a hands-on lesson in what it takes to build and run
        something from scratch.
      </p>
    ),
  },
  {
    id: "markets",
    label: "Markets",
    meta: "Public Equities · Singular Asset Management",
    body: (
      <p>
        I now work at {em("Singular Asset Management")}, focused on public
        equities across Asia with an emphasis on ASEAN markets. I bring to the
        role what the earlier chapters gave me: analytical rigour, operational
        perspective, and a comfort with complexity.
      </p>
    ),
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-16 lg:px-24 py-24 md:py-32 bg-card border-t border-border scroll-mt-0"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="w-8 h-px bg-accent" aria-hidden="true" />
        <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
          About
        </span>
      </div>

      <FadeIn>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-snug text-balance mb-16 md:mb-20 max-w-3xl">
          A non-linear career, deliberately built.
        </h2>
      </FadeIn>

      <CareerChapters chapters={chapters} />
    </section>
  );
}
