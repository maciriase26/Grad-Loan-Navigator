import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Manage Loans — Grad Loan Navigator";
const DESCRIPTION = "Manage your loans, explore refinancing, and track what is coming next.";
const URL = "https://graduationnavigator.com/manage-loans";

export const Route = createFileRoute("/manage-loans")({
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
  component: ManageLoansPage,
});

function ManageLoansPage() {
  const { t } = useI18n();
  return (
    <>
      <SiteHeader />

      <main>
        <section className="wrap resources-banner">
          <div className="eyebrow">Manage Loans</div>
          <h1>Existing loans & refinance</h1>
          <p className="sub">Explore your options and plan your next steps.</p>
        </section>

        <section className="wrap resources-section">
          <div className="path-grid">
            <div className="path-card card-a">
              <span className="path-subheader">Coming Soon</span>
              <h2>Existing Loans</h2>
              <p className="desc">Track your current loans, review terms, and understand your repayment options.</p>
              <span className="path-cta">Learn more</span>
            </div>

            <div className="path-card card-b">
              <span className="path-subheader">Coming Soon</span>
              <h2>Refinance</h2>
              <p className="desc">Explore refinancing options to potentially lower your rates and simplify payments.</p>
              <span className="path-cta">Learn more</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}

