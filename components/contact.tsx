import Link from "next/link";
import { site } from "@/lib/site";

const LinkedInIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const links = [
  {
    label: "LinkedIn",
    href: site.linkedin,
    icon: <LinkedInIcon />,
    primary: true,
  },
  {
    label: "HerTeoh",
    href: "https://github.com/HerTeoh",
    icon: <GitHubIcon />,
  },
  {
    label: "JHTeoh",
    href: "https://github.com/JHTeoh",
    icon: <GitHubIcon />,
  },
];

export default function Contact() {
  return (
    <footer
      id="contact"
      className="px-6 md:px-16 lg:px-24 py-20 md:py-28 bg-background border-t border-border"
    >
      <div className="max-w-4xl">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="w-8 h-px bg-accent" aria-hidden="true" />
          <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
            Contact
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-foreground text-balance leading-tight mb-6">
          Let&apos;s connect.
        </h2>
        <p className="font-sans text-base text-muted-foreground leading-relaxed mb-12 max-w-md text-pretty">
          Whether it&apos;s a conversation about markets, data, or something
          in between — my inbox is open.
        </p>

        {/* Links */}
        <ul className="flex flex-col sm:flex-row flex-wrap gap-4">
          {links.map(({ label, href, icon, primary }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={primary ? undefined : `GitHub: ${label}`}
                className={
                  primary
                    ? "inline-flex items-center gap-3 px-5 py-3 rounded-full border border-foreground bg-foreground text-background hover:bg-accent-strong hover:border-accent-strong transition-colors duration-200 font-sans text-sm"
                    : "inline-flex items-center gap-3 px-5 py-3 rounded-full border border-border text-foreground hover:border-accent-strong hover:text-accent-strong transition-colors duration-200 font-sans text-sm"
                }
              >
                {icon}
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom credit line */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-20 font-sans text-xs text-muted-foreground tracking-wide">
          <p>Her Teoh &middot; Singapore</p>
          <nav aria-label="Legal" className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors duration-200">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
