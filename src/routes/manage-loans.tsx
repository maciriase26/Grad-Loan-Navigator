import { createFileRoute, Link } from "@tanstack/react-router";
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

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="15"
      height="15"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

function ManageLoansPage() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />

      <main>
        <section className="wrap resources-banner">
          <div className="eyebrow">{t("manage.eyebrow")}</div>
          <h1>{t("manage.h1")}</h1>
          <p className="sub">{t("manage.sub")}</p>
        </section>

        <section className="wrap resources-section">
          <div className="path-grid">
            <div className="path-card card-a">
              <span className="path-subheader">{t("manage.card1.sub")}</span>
              <h2>{t("manage.card1.title")}</h2>
              <p className="desc">{t("manage.card1.desc")}</p>
              <span className="path-cta">{t("manage.card1.cta")}</span>
            </div>

            <Link className="path-card card-b" to="/blog/refinancing-student-loans">
              <span className="path-subheader">{t("manage.card2.sub")}</span>
              <h2>{t("manage.card2.title")}</h2>
              <p className="desc">{t("manage.card2.desc")}</p>
              <span className="path-cta">
                {t("manage.card2.cta")}
                <Arrow />
              </span>
            </Link>
          </div>

          {/* Ready to Compare Refinance Lenders Banner */}
          <div className="manage-refi-banner">
            <h3>{t("manage.refiBanner.title")}</h3>
            <Link to="/apply" className="manage-refi-btn">
              {t("manage.refiBanner.btn")}
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
