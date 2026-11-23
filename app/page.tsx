import type { Metadata } from "next";
import Hero from "@/components/hero";
import JsonLd from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { person, website } from "@/lib/structured-data";
import About from "@/components/about";
import Contact from "@/components/contact";

export const metadata: Metadata = pageMetadata("/", {
  description: site.description,
});

export default function Home() {
  return (
    <>
      <JsonLd data={[person, website]} />
      <Hero />
      <About />
      <Contact />
    </>
  );
}
