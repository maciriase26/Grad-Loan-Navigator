import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Student Loan Types — Grad Loan Navigator";
const DESCRIPTION =
  "There are three federal student loan programs and multiple private options. Here is a cheat sheet breakdown of subsidized, unsubsidized, PLUS, and private loans.";
const URL = "https://www.graduationnavigator.com/blog/student-loan-types";

export const Route = createFileRoute("/blog_/student-loan-types")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: StudentLoanTypesArticlePage,
});

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="15"
      height="15"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function StudentLoanTypesArticlePage() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="wrap doc-hero">
          <div className="article-back" style={{ marginBottom: "16px" }}>
            <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              ← {t("blog.h1")}
            </Link>
          </div>
          <div className="eyebrow">{t("types.eyebrow")}</div>
          <h1>{t("types.h1")}</h1>
          <p className="sub">{t("types.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("types.updated")}
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#subsidized-vs-unsubsidized">{t("types.nav.sub")}</a>
          <a href="#grad-vs-parent-plus">{t("types.nav.plus")}</a>
          <a href="#private-vs-federal">{t("types.nav.private")}</a>
          <a href="#bottom-line">{t("types.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: Subsidized vs. Unsubsidized */}
          <section className="doc-section" id="subsidized-vs-unsubsidized">
            <span className="section-num">{t("types.part1")}</span>
            <h2>{t("types.sub.h2")}</h2>

            <div className="types-compare-grid">
              {/* Subsidized Card */}
              <div className="types-card card-subsidized">
                <span className="types-card-badge">{t("types.sub.card1.badge")}</span>
                <h3>{t("types.sub.card1.title")}</h3>
                <p>{t("types.sub.card1.p1")}</p>
                <p>{t("types.sub.card1.p2")}</p>
                <a
                  href="https://www.experian.com/blogs/ask-experian/what-is-a-subsidized-loan/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="types-card-link"
                >
                  {t("types.sub.card1.link")}
                  <ExternalIcon />
                </a>
              </div>

              {/* Unsubsidized Card */}
              <div className="types-card card-unsubsidized">
                <span className="types-card-badge">{t("types.sub.card2.badge")}</span>
                <h3>{t("types.sub.card2.title")}</h3>
                <p>{t("types.sub.card2.p1")}</p>
                <p>{t("types.sub.card2.p2")}</p>
              </div>
            </div>
          </section>

          {/* Section 2: Grad PLUS vs. Parent PLUS */}
          <section className="doc-section" id="grad-vs-parent-plus">
            <span className="section-num">{t("types.part2")}</span>
            <h2>{t("types.plus.h2")}</h2>
            <p className="lead">{t("types.plus.lead")}</p>

            <div className="rates-diff-grid">
              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">01</span>
                  <h3>{t("types.plus.r1.title")}</h3>
                </div>
                <p>{t("types.plus.r1.desc")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">02</span>
                  <h3>{t("types.plus.r2.title")}</h3>
                </div>
                <p>{t("types.plus.r2.desc")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">03</span>
                  <h3>{t("types.plus.r3.title")}</h3>
                </div>
                <p>{t("types.plus.r3.desc")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">04</span>
                  <h3>{t("types.plus.r4.title")}</h3>
                </div>
                <p>{t("types.plus.r4.desc")}</p>
              </div>
            </div>
          </section>

          {/* Section 3: Private vs Federal */}
          <section className="doc-section" id="private-vs-federal">
            <span className="section-num">{t("types.part3")}</span>
            <h2>{t("types.private.h2")}</h2>

            <div className="rates-cost-box">
              <p>{t("types.private.p1")}</p>

              <div className="rates-calc-example">
                <span className="rates-calc-label">{t("rates.calc.label")}</span>
                <span className="rates-calc-gap">+$1,345</span>
              </div>
            </div>
          </section>

          {/* Section 4: The Bottom Line */}
          <section className="doc-section" id="bottom-line">
            <span className="section-num">{t("types.part4")}</span>
            <h2>{t("types.bottomline.h2")}</h2>

            <div className="refi-bottom-card">
              <blockquote className="refi-bottom-quote">“{t("types.bottomline.quote")}”</blockquote>
            </div>

            {/* Experian Deep Dive Box */}
            <div className="types-experian-box">
              <div className="types-experian-content">
                <h4>{t("types.experian.title")}</h4>
                <p>{t("types.experian.text")}</p>
              </div>
              <a
                href="https://www.experian.com/blogs/ask-experian/what-is-a-subsidized-loan/"
                target="_blank"
                rel="noreferrer noopener"
                className="types-experian-btn"
              >
                {t("types.experian.link")}
                <ExternalIcon />
              </a>
            </div>

            {/* CTA Strip */}
            <div className="cta-strip">
              <div>
                <h2>{t("types.cta.h2")}</h2>
                <p>{t("types.cta.p")}</p>
              </div>
              <Link
                to="/"
                hash="quiz"
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <span>{t("types.cta.btn")}</span>
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Sources Footnote */}
            <div className="refi-sources">
              <p>
                <strong>{t("types.sources.label")}</strong>
                {t("types.sources.text")}
              </p>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
