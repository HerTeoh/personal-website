import Image from "next/image";

const milestones = [
  { label: "Data Engineer", sub: "Neuron Mobility" },
  { label: "Operations Excellence", sub: "Neuron Mobility" },
  { label: "Business Owner", sub: "F&B" },
  { label: "Investment Analyst", sub: "Singular Asset Management" },
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
            Six years across data, operations, and entrepreneurship
          </h2>

          <div className="space-y-5 font-sans text-base leading-relaxed text-muted-foreground">
            <p>
              I joined{" "}
              <span className="text-foreground">Neuron Mobility</span> in 2019
              as a Data Engineer, the sole data engineer as the company scaled
              from 1 to 20 cities. I built and maintained the data
              infrastructure on AWS, managed Tableau Server, and worked
              end-to-end across data collection, pipeline development, and
              analysis.
            </p>
            <p>
              I later led the Global Operations Excellence team under the COO,
              driving efficiency across service delivery, fleet operations, and
              regional markets. The team reduced labour costs as a percentage
              of net revenue by over 11 points in H1 2022 and managed
              demand-side S&amp;OP at the eight-figure level.
            </p>
            <p>
              After Neuron, I launched and operated a food and beverage
              business in Singapore, handling everything from market entry and
              fit-out to staffing and community growth. I completed a
              successful ownership transition before moving into finance.
            </p>
            <p>
              I am now an Investment Analyst at{" "}
              <span className="text-foreground">Singular Asset Management</span>,
              focused on public equities across Asia with an emphasis on ASEAN
              markets. My academic background combines Computer Science and
              Business from Minerva University.
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
          <div className="relative aspect-square w-full max-w-xs mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/her-portrait.jpg"
              alt="Her Teoh"
              fill
              className="object-cover object-[center_15%] scale-110"
              sizes="(max-width: 1024px) 320px, 400px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
