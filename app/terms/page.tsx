import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of use for herteoh.com, including a note that nothing here is investment advice.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions" updated="28 October 2026">
      <p>
        By using herteoh.com you agree to these terms. If you do not agree,
        please do not use the site.
      </p>

      <h2>Not investment advice</h2>
      <p>
        This is a personal website. Nothing on it is financial, investment,
        legal or tax advice, or an offer or solicitation to buy or sell any
        security. Any views are my own and do not represent those of my
        employer, Singular Asset Management, or any other organisation.
      </p>

      <h2>Content</h2>
      <p>
        Content is provided &ldquo;as is&rdquo; for general information. I
        try to keep it accurate and current but make no guarantees about its
        completeness or accuracy.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Unless stated otherwise, the text, images and design of this site
        belong to me. You may share links to it freely, but please do not
        copy or republish its content without permission.
      </p>

      <h2>External links</h2>
      <p>
        This site links to third-party websites such as LinkedIn and GitHub. I
        do not control those sites and am not responsible for their content.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by law, I am not liable for any loss or damage
        arising from your use of, or reliance on, this site.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of Singapore, and the Singapore
        courts have exclusive jurisdiction over any dispute.
      </p>

      <h2>Changes</h2>
      <p>
        I may update these terms from time to time. The current version is
        always on this page.
      </p>
    </LegalPage>
  );
}
