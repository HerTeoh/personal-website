import Chapter from "@/components/home/chapter";
import DataArchitecture from "@/components/home/data-architecture";
import FoundationMap from "@/components/home/foundation-map";
import FranchiseChecklist from "@/components/home/franchise-checklist";
import { CoverageTape, MarketsLine } from "@/components/home/markets";
import OpsCity from "@/components/home/ops-city";

const em = (s: string, dark = false) => <span className={dark ? "text-background" : "text-foreground"}>{s}</span>;

/**
 * The career as five chapters. The background deepens a step with each one
 * (cream → sand → clay) and turns dark for Markets.
 */
export default function Career() {
  return (
    <div id="about">
      <Chapter
        id="foundation"
        number="01"
        meta="Minerva University"
        title="Foundation"
        from="#FAF7F2"
        to="#F3EADC"
        figure={<FoundationMap />}
      >
        <p>
          I started with an unconventional choice: {em("Minerva University")}, a globally mobile programme where
          students spend four years living and studying across seven cities, from San Francisco to Seoul, Berlin to
          Buenos Aires. It was rigorous, internationally minded, and nothing like a traditional degree.
        </p>
      </Chapter>

      <Chapter
        id="data"
        number="02"
        meta="Data Engineer · Neuron Mobility · reporting to the CTO"
        title="Data"
        from="#F3EADC"
        to="#ECDCC8"
        figure={<DataArchitecture />}
      >
        <p>
          My career began at {em("Neuron Mobility")} in 2019, where I joined as the company&apos;s first and sole Data
          Engineer, reporting to the CTO, as the business scaled from one to twenty cities. I built the data
          infrastructure on AWS from the ground up, owned the Tableau environment, and worked end-to-end across
          collection, pipeline development, and analysis.
        </p>
      </Chapter>

      <Chapter
        id="operations"
        number="03"
        meta="Operations Excellence · Neuron Mobility · under the COO"
        title="Operations"
        from="#ECDCC8"
        to="#E4CDB3"
        figure={<OpsCity />}
      >
        <p>
          My scope expanded from data into operations. I moved into a Global Operations Excellence role under the COO,
          leading cross-regional initiatives in service delivery, fleet efficiency, and supply planning, driving
          measurable improvements in cost efficiency across regional markets.
        </p>
      </Chapter>

      <Chapter
        id="entrepreneurship"
        number="04"
        meta="Entrepreneur · Fitness"
        title="Entrepreneurship"
        from="#E4CDB3"
        to="#DBBD9E"
        figure={<FranchiseChecklist />}
      >
        <p>
          I left Neuron to pursue a different kind of challenge. I brought a franchise brand into Singapore, handling
          market entry, fit-out, hiring, and day-to-day operations before completing a successful ownership transition.
          It was a hands-on lesson in what it takes to build and run something from scratch.
        </p>
      </Chapter>

      <Chapter
        id="markets"
        number="05"
        meta="Public Equities · Singular Asset Management"
        title="Markets"
        from="#DBBD9E"
        to="#2C1F14"
        dark
        topPad="pt-[360px]"
        figure={<MarketsLine />}
        after={<CoverageTape />}
      >
        <p>
          I now work at {em("Singular Asset Management", true)}, focused on public equities across Asia with an
          emphasis on ASEAN markets. I bring to the role what the earlier chapters gave me: analytical rigour,
          operational perspective, and a comfort with complexity.
        </p>
      </Chapter>
    </div>
  );
}
