import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How herteoh.com handles visitor data: no cookies, anonymous page view counts only.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="28 October 2026">
      <p>
        This is the personal website of Her Teoh (&ldquo;I&rdquo;,
        &ldquo;me&rdquo;) at herteoh.com. I take a minimal approach to data:
        the site has no accounts, no forms and no advertising, and it does not
        set cookies.
      </p>

      <h2>What is collected</h2>
      <p>
        I use <a href="https://www.goatcounter.com/" target="_blank" rel="noopener noreferrer">GoatCounter</a>,
        a privacy-focused analytics service, to count page views. For each
        visit it records:
      </p>
      <ul>
        <li>the page visited and the referring website, if any;</li>
        <li>browser, operating system and screen size;</li>
        <li>approximate country, derived from your IP address.</li>
      </ul>
      <p>
        GoatCounter does not store your IP address, does not use cookies and
        does not track you across websites. The data is used only to
        understand how many people visit the site and which pages are useful.
      </p>
      <p>
        The site is hosted on GitHub Pages. GitHub may log technical
        information such as your IP address for security and operations; see
        the{" "}
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
          GitHub Privacy Statement
        </a>
        .
      </p>

      <h2>Browser storage</h2>
      <p>
        When you dismiss the notice about cookies, your browser remembers that
        choice in local storage. It never leaves your device.
      </p>

      <h2>Third-party links</h2>
      <p>
        Links to LinkedIn and GitHub take you to sites with their own privacy
        policies. I am not responsible for how they handle your data.
      </p>

      <h2>Your rights</h2>
      <p>
        Because no personal data that identifies you is stored, there is
        usually nothing to access or delete. If you have a question or request
        under Singapore&apos;s Personal Data Protection Act 2012, contact me via{" "}
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the updated version will be posted on this
        page with a new date.
      </p>
    </LegalPage>
  );
}
