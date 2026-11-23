import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 bg-background">
      <div className="flex items-center gap-4 mb-8">
        <span className="w-8 h-px bg-accent" aria-hidden="true" />
        <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
          404
        </span>
      </div>
      <h1 className="font-serif text-5xl md:text-7xl font-normal text-foreground leading-tight text-balance mb-6">
        This page doesn&apos;t exist.
      </h1>
      <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-md mb-10">
        The link may be broken or the page may have moved.
      </p>
      <Link
        href="/"
        className="self-start inline-flex items-center px-6 py-3 rounded-full bg-foreground text-background font-sans text-sm hover:bg-accent-strong transition-colors duration-200"
      >
        Back to home
      </Link>
    </main>
  );
}
