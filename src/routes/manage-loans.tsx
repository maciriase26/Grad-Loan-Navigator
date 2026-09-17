import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Manage Loans — Grad Loan Navigator";
const DESCRIPTION = "Manage your loans, explore refinancing, and track what is coming next.";
const URL = "https://www.graduationnavigator.com/manage-loans";

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
            <Link className="path-card card-a" to="/educational-resources">
              <span className="path-subheader">{t("manage.card1.sub")}</span>
              <h2>{t("manage.card1.title")}</h2>
              <p className="desc">{t("manage.card1.desc")}</p>
              <span className="path-cta">
                {t("manage.card1.cta")}
                <Arrow />
              </span>
            </Link>

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

          <div style={{ marginTop: "24px", display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <div style={{ background: "rgba(248, 250, 252, 0.7)", padding: "14px 18px", borderRadius: "8px", border: "1px solid #e2e8f0", borderLeft: "3px solid #cbd5e1" }}>
              <div style={{ fontSize: "0.825rem", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
                {t("manage.section.idr.title")}
              </div>
              <p style={{ color: "#64748b", lineHeight: "1.45", fontSize: "0.8rem", margin: 0 }}>
                {t("manage.section.idr.text")}
              </p>
            </div>

            <div style={{ background: "rgba(248, 250, 252, 0.7)", padding: "14px 18px", borderRadius: "8px", border: "1px solid #e2e8f0", borderLeft: "3px solid #cbd5e1" }}>
              <div style={{ fontSize: "0.825rem", fontWeight: "600", color: "#475569", marginBottom: "4px" }}>
                {t("manage.section.consolidation.title")}
              </div>
              <p style={{ color: "#64748b", lineHeight: "1.45", fontSize: "0.8rem", margin: 0 }}>
                {t("manage.section.consolidation.text")}
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
