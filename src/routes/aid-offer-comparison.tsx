import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { AidOfferComparisonTool } from "@/components/calculator/AidOfferComparisonTool";

const TITLE = "Aid Offer Comparison — Compare Real Graduate School Costs | Grad Loan Navigator";
const DESCRIPTION =
  "Compare financial aid offers from up to 4 graduate schools side-by-side. Separate loans masquerading as aid, compare real net prices and graduation debt, and export a free browser PDF.";
const URL = "https://www.graduationnavigator.com/aid-offer-comparison";

export const Route = createFileRoute("/aid-offer-comparison")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: AidOfferComparisonPage,
});

function AidOfferComparisonPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="wrap" style={{ paddingTop: "24px", paddingBottom: "56px" }}>
          <AidOfferComparisonTool />
        </div>
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}
