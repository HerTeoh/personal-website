import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import FadeIn from "@/components/fade-in";
import QuestionsList from "@/components/questions-list";
import { getNote } from "@/lib/notes";
import { getQuestions, hasQuestions, monthYear, type Question } from "@/lib/questions";
import { orderTags } from "@/lib/themes";

export const metadata: Metadata = pageMetadata("/questions", {
  title: "Questions",
  description: "Open questions Her Teoh is thinking about, and where the thinking has got to.",
  // Kept out of search results until the first entry is added.
  ...(hasQuestions() ? {} : { robots: { index: false, follow: true } }),
});

function withLabels(q: Question) {
  // Catch links to notes that don't exist (e.g. a typo in the slug).
  if (q.note && !getNote(q.note)) {
    throw new Error(`lib/questions.ts: no note called "${q.note}" in content/notes/`);
  }
  return {
    ...q,
    sinceLabel: monthYear(q.since),
    answeredLabel: q.answeredOn ? monthYear(q.answeredOn) : undefined,
  };
}

export default function QuestionsPage() {
  const { open, answered } = getQuestions();
  const tags = orderTags([...open, ...answered].flatMap((q) => q.tags ?? []));

  return (
    <div className="min-h-screen bg-background px-6 md:px-16 lg:px-24 pb-12">

      <main className="max-w-3xl py-20 md:py-28">
        <FadeIn>
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-px bg-accent" aria-hidden="true" />
            <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
              Questions
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-foreground text-balance leading-tight mb-6">
            Still figuring out.
          </h1>
          <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-xl text-pretty mb-16">
            Questions I keep coming back to. Some have a tentative answer; most
            don&apos;t yet. If you have a view, I&apos;d like to hear it.
          </p>
        </FadeIn>

        <QuestionsList
          open={open.map(withLabels)}
          answered={answered.map(withLabels)}
          tags={tags}
        />

        <p className="font-sans text-xs text-muted-foreground mt-24 tracking-wide">
          Personal views only, not investment advice.
        </p>
      </main>
    </div>
  );
}
