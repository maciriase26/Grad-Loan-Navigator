import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Pay for School — Grad Loan Navigator";
const DESCRIPTION =
  "Start with the question that matches where you are: estimate your funding gap, prepare your loan checklist, or browse graduate student lenders.";
const URL = "https://graduationnavigator.com/pay-for-school";

export const Route = createFileRoute("/pay-for-school")({
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
  component: PayForSchoolPage,
});

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function PayForSchoolPage() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />

      <main>
        {/* Banner Section */}
        <section className="wrap resources-banner">
          <div className="eyebrow">{t("pfs.eyebrow")}</div>
          <h1>{t("pfs.h1")}</h1>
          <p className="sub">{t("pfs.sub")}</p>
        </section>

        {/* 3 Cards Row */}
        <section className="wrap pfs-section">
          <div className="pfs-grid">
            {/* Card 1: Do I need a loan? */}
            <Link to="/chart-your-path" className="pfs-card">
              <span className="pfs-tag">{t("pfs.card1.tag")}</span>
              <h2>{t("pfs.card1.title")}</h2>
              <p className="pfs-desc">{t("pfs.card1.desc")}</p>
              <span className="pfs-arrow">
                <Arrow />
              </span>
            </Link>

            {/* Card 2: How to get a student loan */}
            <Link to="/apply" className="pfs-card">
              <span className="pfs-tag">{t("pfs.card2.tag")}</span>
              <h2>{t("pfs.card2.title")}</h2>
              <p className="pfs-desc">{t("pfs.card2.desc")}</p>
              <span className="pfs-arrow">
                <Arrow />
              </span>
            </Link>

            {/* Card 3: Browse lenders */}
            <Link to="/apply" className="pfs-card">
              <span className="pfs-tag">{t("pfs.card3.tag")}</span>
              <h2>{t("pfs.card3.title")}</h2>
              <p className="pfs-desc">{t("pfs.card3.desc")}</p>
              <span className="pfs-arrow">
                <Arrow />
              </span>
            </Link>
          </div>
        </section>

        {/* Most Frequently Asked Section (Matches Navigation Hub format) */}
        <section className="wrap mfa-section" style={{ marginTop: "16px" }}>
          <span className="mfa-tag">{t("mfa.tag")}</span>

          <div className="mfa-grid">
            <Link to="/blog/refinancing-student-loans" className="mfa-card">
              <h3>{t("mfa.card1.title")}</h3>
              <span className="mfa-arrow">→</span>
            </Link>

            <Link to="/blog/student-loan-types" className="mfa-card">
              <h3>{t("mfa.card2.title")}</h3>
              <span className="mfa-arrow">→</span>
            </Link>

            <Link to="/blog/student-loan-interest-by-the-numbers" className="mfa-card">
              <h3>{t("mfa.card3.title")}</h3>
              <span className="mfa-arrow">→</span>
            </Link>

            <a
              href="https://www.experian.com/blogs/ask-experian/how-to-get-a-student-loan/"
              target="_blank"
              rel="noreferrer noopener"
              className="mfa-card"
            >
              <h3>{t("mfa.card4.title")}</h3>
              <span className="mfa-arrow">→</span>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
