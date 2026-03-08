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

const InstagramIcon = () => (
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
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MailIcon = () => (
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
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const links = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/herteoh",
    icon: <LinkedInIcon />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/herteoh",
    icon: <InstagramIcon />,
  },
  {
    label: "herteoh@email.com",
    href: "mailto:herteoh@email.com",
    icon: <MailIcon />,
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
          {links.map(({ label, href, icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-border text-foreground hover:border-accent hover:text-accent transition-colors duration-200 font-sans text-sm"
              >
                {icon}
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom credit line */}
        <p className="font-sans text-xs text-muted-foreground mt-20 tracking-wide">
          &copy; {new Date().getFullYear()} Her Teoh &middot; Singapore
        </p>
      </div>
    </footer>
  );
}
