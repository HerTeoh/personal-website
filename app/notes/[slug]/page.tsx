import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { article } from "@/lib/structured-data";
import FadeIn from "@/components/fade-in";
import { formatDate, getAllNotes, getNote, statuses } from "@/lib/notes";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};
  const meta = pageMetadata(`/notes/${note.slug}`, {
    title: note.title,
    description: note.summary || `A note by ${site.name}.`,
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: note.date,
      modifiedTime: note.updated ?? note.date,
      authors: [site.name],
      tags: note.tags,
    },
  };
}

export default async function NotePage({ params }: Params) {
  const note = getNote((await params).slug);
  if (!note) notFound();
  const status = statuses[note.status];

  return (
    <div className="min-h-screen bg-background px-6 md:px-16 lg:px-24 pb-12">
      <JsonLd data={article(note)} />

      <main className="max-w-2xl py-20 md:py-28">
        <FadeIn>
          <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase mb-6">
            <span title={status.hint}>
              {status.emoji} {status.label}
            </span>
            {note.tags.length > 0 && <> &middot; {note.tags.join(", ")}</>}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-foreground text-balance leading-tight mb-4">
            {note.title}
          </h1>
          <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase mb-14">
            {formatDate(note.date)}
            {note.updated && note.updated !== note.date && (
              <> &middot; Updated {formatDate(note.updated)}</>
            )}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <article
            className="font-sans text-base leading-relaxed text-muted-foreground space-y-6 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:pt-4 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-foreground [&_strong]:text-foreground [&_strong]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-accent-strong [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:italic [&_code]:font-mono [&_code]:text-sm [&_code]:bg-card [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_hr]:border-border"
            dangerouslySetInnerHTML={{ __html: note.html }}
          />
        </FadeIn>

        <p className="font-sans text-xs text-muted-foreground mt-24 tracking-wide border-t border-border pt-6">
          Personal views only, not investment advice.{" "}
          <Link href="/notes" className="underline underline-offset-2 hover:text-accent-strong">
            More notes
          </Link>
        </p>
      </main>
    </div>
  );
}
