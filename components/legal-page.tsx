import Link from "next/link";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen px-6 md:px-16 lg:px-24 py-12 bg-background">
      <Link
        href="/"
        className="font-sans text-sm text-muted-foreground tracking-widest uppercase hover:text-foreground transition-colors duration-200"
      >
        &larr; HerTeoh.com
      </Link>

      <article className="max-w-2xl mt-16 md:mt-24">
        <h1 className="font-serif text-4xl md:text-5xl font-normal text-foreground leading-tight mb-4">
          {title}
        </h1>
        <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase mb-12">
          Last updated {updated}
        </p>
        <div className="space-y-6 font-sans text-base leading-relaxed text-muted-foreground [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:pt-4 [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
          {children}
        </div>
      </article>
    </main>
  );
}
