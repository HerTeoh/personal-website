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

const WhatsAppIcon = () => (
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
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
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
    href: "https://www.linkedin.com/in/herteoh/",
    icon: <LinkedInIcon />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6591284041",
    icon: <WhatsAppIcon />,
  },
  {
    label: "inbox.her@gmail.com",
    href: "mailto:inbox.her@gmail.com",
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
          Her Teoh &middot; Singapore
        </p>
      </div>
    </footer>
  );
}
