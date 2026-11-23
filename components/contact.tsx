import Link from "next/link";
import FadeIn from "@/components/fade-in";
import { hasReading } from "@/lib/reading";
import { hasQuestions } from "@/lib/questions";
import { hasPrinciples } from "@/lib/principles";

export default function Contact() {
  return (
    <footer
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

        {/* Bottom credit line */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-20 font-sans text-xs text-muted-foreground tracking-wide">
          <p>Her Teoh &middot; Singapore</p>
          <nav aria-label="Site" className="flex gap-6">
            <Link href="/notes" className="hover:text-foreground transition-colors duration-200">
              Notes
            </Link>
            {hasReading() && (
              <Link href="/reading" className="hover:text-foreground transition-colors duration-200">
                Reading
              </Link>
            )}
            {hasPrinciples() && (
              <Link href="/principles" className="hover:text-foreground transition-colors duration-200">
                Principles
              </Link>
            )}
            {hasQuestions() && (
              <Link href="/questions" className="hover:text-foreground transition-colors duration-200">
                Questions
              </Link>
            )}
            <Link href="/now" className="hover:text-foreground transition-colors duration-200">
              Now
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors duration-200">
              Terms
            </Link>
            <Link href="/credits" className="hover:text-foreground transition-colors duration-200">
              Credits
            </Link>
          </nav>
        </div>
      </FadeIn>
    </footer>
  );
}
