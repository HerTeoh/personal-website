/** Renders schema.org data as a <script type="application/ld+json"> tag. */
export default function JsonLd({ data }: { data: object | object[] }) {
  // Escape "<" so the JSON can never close the script tag early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
