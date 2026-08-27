import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Educational Resources — Grad Loan Navigator";
const DESCRIPTION =
  "Two ways to learn about graduate borrowing: long-form in-depth analysis, or short student-written blog posts.";
const URL = "https://www.graduationnavigator.com/educational-resources";

export const Route = createFileRoute("/educational-resources")({
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
  component: EducationalResources,
});

function DocIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 4.5h9.5L20 9v10.5H6Z" />
      <path d="M15.5 4.5V9H20" />
      <line x1="9" y1="12.5" x2="16" y2="12.5" />
      <line x1="9" y1="15.5" x2="16" y2="15.5" />
      <line x1="9" y1="9.5" x2="12" y2="9.5" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="14" y2="13" />
      <circle cx="8" cy="17" r="0.6" fill="currentColor" />
      <circle cx="10.5" cy="17" r="0.6" fill="currentColor" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

function EducationalResources() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />

      <main>
        <section className="wrap resources-banner">
          <div className="eyebrow">{t("er.eyebrow")}</div>
          <h1>{t("er.h1")}</h1>
          <p className="sub">{t("er.sub")}</p>
        </section>

        <section className="wrap resources-section">
          <div className="path-grid">
            <Link className="path-card card-a" to="/in-depth-analysis">
              <span className="path-icon">
                <DocIcon />
              </span>
              <span className="path-subheader">{t("er.card1.sub")}</span>
              <h2>{t("er.card1.title")}</h2>
              <p className="desc">{t("er.card1.desc")}</p>
              <span className="path-cta">
                {t("er.card1.cta")}
                <Arrow />
              </span>
            </Link>

            <Link className="path-card card-b" to="/blog">
              <span className="path-icon">
                <ListIcon />
              </span>
              <span className="path-subheader">{t("er.card2.sub")}</span>
              <h2>{t("er.card2.title")}</h2>
              <p className="desc">{t("er.card2.desc")}</p>
              <span className="path-cta">
                {t("er.card2.cta")}
                <Arrow />
              </span>
            </Link>
          </div>
        </section>

        {/* Most Frequently Asked Section */}
        <section className="wrap mfa-section">
          <span className="mfa-tag">{t("mfa.tag")}</span>

          <div className="mfa-grid">
            <a
              href="https://www.experian.com/blogs/ask-experian/how-do-student-loans-work/"
              target="_blank"
              rel="noreferrer noopener"
              className="mfa-card"
            >
              <h3>{t("mfa.card1.title")}</h3>
              <span className="mfa-arrow">→</span>
            </a>

            <Link to="/blog/student-loan-types" className="mfa-card">
              <h3>{t("mfa.card2.title")}</h3>
              <span className="mfa-arrow">→</span>
            </Link>

            <a
              href="https://www.experian.com/blogs/ask-experian/student-loan-repayment/"
              target="_blank"
              rel="noreferrer noopener"
              className="mfa-card"
            >
              <h3>{t("mfa.card3.title")}</h3>
              <span className="mfa-arrow">→</span>
            </a>

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
