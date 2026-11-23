import Script from "next/script";
import { site } from "@/lib/site";

// GoatCounter: privacy-friendly, cookie-free page view counting.
export default function Analytics() {
  if (!site.goatcounterCode) return null;

  return (
    <Script
      data-goatcounter={`https://${site.goatcounterCode}.goatcounter.com/count`}
      src="https://gc.zgo.at/count.js"
      strategy="afterInteractive"
    />
  );
}
