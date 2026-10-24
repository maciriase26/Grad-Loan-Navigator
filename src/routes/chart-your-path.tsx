import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ChartYourPathMockup } from "@/components/calculator/ChartYourPathMockup";

const TITLE = "Chart Your Path | Grad Navigator";
const DESCRIPTION =
  "Calculate your annual funding gap, estimated total borrowing, and monthly payment while checking against 2026 federal loan limits.";
const URL = "https://www.graduationnavigator.com/chart-your-path";

export const Route = createFileRoute("/chart-your-path")({
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
  component: ChartYourPathPage,
});

function ChartYourPathPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="wrap" style={{ paddingTop: "20px", paddingBottom: "40px" }}>
          {/* Unified 2026 Borrowing & Cap Calculator */}
          <ChartYourPathMockup />
        </div>
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}
