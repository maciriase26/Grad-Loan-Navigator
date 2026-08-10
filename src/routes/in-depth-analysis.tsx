import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "In-Depth Analysis — Grad Loan Navigator";
const DESCRIPTION =
  "Long-form explainers on graduate borrowing: caps, grandfather rules, cosigners, rate types, and repayment.";
const URL = "https://graduationnavigator.com/in-depth-analysis";

export const Route = createFileRoute("/in-depth-analysis")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: InDepthAnalysis,
});

function InDepthAnalysis() {
  const { t } = useI18n();
  return (
    <>
      <SiteHeader />
      <main>
        <section className="wrap resources-banner">
          <h1>{t("depth.h1")}</h1>
          <p className="sub">{t("depth.sub")}</p>
        </section>
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}
