import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import LegalPage from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/privacy", {
  title: "Privacy Policy",
  description: "How herteoh.com handles visitor data: no cookies, anonymous page view counts only.",
});

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="26 November 2026">
      <p>
        This is the personal website of Her Teoh (&ldquo;I&rdquo;,
        &ldquo;me&rdquo;) at herteoh.com. I take a minimal approach to data:
        the site has no accounts, no forms and no advertising, and it does not
        set cookies.
      </p>

      <h2>What is collected</h2>
      <p>
        I use <a href="https://www.goatcounter.com/" target="_blank" rel="noopener noreferrer">GoatCounter</a>,
        a privacy-focused analytics service, to count page views. When a page
        loads, a small script sends GoatCounter a record of the visit, which
        includes:
      </p>
      <ul>
        <li>the page visited, its title and the referring website, if any;</li>
        <li>browser, operating system and screen size;</li>
        <li>approximate country, derived from your IP address.</li>
      </ul>
      <p>
        GoatCounter does not store your IP address, does not use cookies and
        does not track you across websites. To tell first visits from repeat
        page views, it uses a short-lived, anonymous identifier rather than a
        cookie. The data is used only to understand how many people visit the
        site and which pages are useful.
      </p>
      <p>
        If you block the script, for example with an ad blocker, your visit is
        simply not counted and the site works the same.
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
        The site saves two small settings in your browser&apos;s local
        storage, so it doesn&apos;t ask again on your next visit:
      </p>
      <ul>
        <li>that you have dismissed the notice about cookies;</li>
        <li>whether you have turned click sounds on or off.</li>
      </ul>
      <p>
        These are not cookies, are never sent anywhere and stay on your device.
        Clearing your browser&apos;s site data removes them.
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
