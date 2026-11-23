/**
 * Credits & references — the single source of truth for the /credits page.
 *
 * Rule of thumb: whenever we add a package, copy a component, borrow an
 * animation, use a font/icon/image, or lift an idea from someone's site,
 * add an entry here in the same commit. It keeps licences honest and
 * gives the original creators their due.
 */

export type CreditCategory =
  | "Framework & tooling"
  | "Styling"
  | "Typography"
  | "Icons & graphics"
  | "Animation"
  | "Hosting & infrastructure"
  | "Ideas & inspiration";

export type Credit = {
  /** Name of the project, package, font or site. */
  name: string;
  /** Person, team or company behind it. */
  creator: string;
  /** Where to find it (homepage or repo). */
  href: string;
  /** SPDX-style licence id, or a short note for non-code inspiration. */
  license?: string;
  /** What we actually use it for on this site. */
  usedFor: string;
  category: CreditCategory;
};

/** Order in which categories appear on the page. */
export const categoryOrder: CreditCategory[] = [
  "Framework & tooling",
  "Styling",
  "Typography",
  "Icons & graphics",
  "Animation",
  "Hosting & infrastructure",
  "Ideas & inspiration",
];

export const credits: Credit[] = [
  // Framework & tooling
  {
    name: "Next.js",
    creator: "Vercel & contributors",
    href: "https://nextjs.org",
    license: "MIT",
    usedFor: "The site framework, built as a static export.",
    category: "Framework & tooling",
  },
  {
    name: "React",
    creator: "Meta & contributors",
    href: "https://react.dev",
    license: "MIT",
    usedFor: "UI components.",
    category: "Framework & tooling",
  },
  {
    name: "TypeScript",
    creator: "Microsoft",
    href: "https://www.typescriptlang.org",
    license: "Apache-2.0",
    usedFor: "Type-safe code.",
    category: "Framework & tooling",
  },

  // Styling
  {
    name: "Tailwind CSS",
    creator: "Tailwind Labs",
    href: "https://tailwindcss.com",
    license: "MIT",
    usedFor: "All layout and styling.",
    category: "Styling",
  },
  {
    name: "PostCSS & Autoprefixer",
    creator: "Andrey Sitnik & contributors",
    href: "https://postcss.org",
    license: "MIT",
    usedFor: "CSS processing for Tailwind.",
    category: "Styling",
  },

  // Typography
  {
    name: "Playfair Display",
    creator: "Claus Eggers Sørensen",
    href: "https://fonts.google.com/specimen/Playfair+Display",
    license: "OFL-1.1",
    usedFor: "Headings and the serif voice of the site.",
    category: "Typography",
  },
  {
    name: "Inter",
    creator: "Rasmus Andersson",
    href: "https://rsms.me/inter/",
    license: "OFL-1.1",
    usedFor: "Body text and labels.",
    category: "Typography",
  },


  // Animation
  {
    name: "Motion",
    creator: "Matt Perry & contributors",
    href: "https://motion.dev",
    license: "MIT",
    usedFor: "Fade-in animations as sections scroll into view.",
    category: "Animation",
  },

  // Hosting & infrastructure
  {
    name: "GitHub Pages & GitHub Actions",
    creator: "GitHub",
    href: "https://pages.github.com",
    usedFor: "Building and hosting the site.",
    category: "Hosting & infrastructure",
  },
  {
    name: "GoatCounter",
    creator: "Martin Tournoij",
    href: "https://www.goatcounter.com",
    license: "EUPL-1.2",
    usedFor: "Privacy-friendly, cookie-free visitor counts.",
    category: "Hosting & infrastructure",
  },
];
