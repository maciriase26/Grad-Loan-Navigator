import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Student Loan Interest: by the numbers — Grad Loan Navigator";
const DESCRIPTION =
  "Federal student loan rates climbed for the third straight year. Here's what that actually costs you, how rates are set, and what changed for graduate borrowers.";
const URL = "https://www.graduationnavigator.com/blog/student-loan-interest-by-the-numbers";

export const Route = createFileRoute("/blog_/student-loan-interest-by-the-numbers")({
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
  component: StudentLoanInterestArticlePage,
});

function AlertTriangleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      style={{ color: "var(--teal)" }}
      aria-hidden="true"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
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

function StudentLoanInterestArticlePage() {
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
          <div className="eyebrow">{t("rates.eyebrow")}</div>
          <h1>{t("rates.h1")}</h1>
          <p className="sub">{t("rates.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("rates.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("rates.why.title")}</h4>
              <p>{t("rates.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#by-the-numbers">{t("rates.nav.numbers")}</a>
          <a href="#catch-for-grad-students">{t("rates.nav.catch")}</a>
          <a href="#grad-vs-parent-plus">{t("rates.nav.vs")}</a>
          <a href="#real-costs">{t("rates.nav.costs")}</a>
          <a href="#bottom-line">{t("rates.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: By the Numbers */}
          <section className="doc-section" id="by-the-numbers">
            <span className="section-num">{t("rates.part1")}</span>
            <h2>{t("rates.numbers.h2")}</h2>

            {/* Framed 3-Column Rates Box matching PDF */}
            <div className="rates-trio-wrap">
              <div className="rates-trio-grid">
                <div className="rates-trio-col">
                  <span className="rates-trio-label">{t("rates.card1.label")}</span>
                  <span className="rates-trio-number">{t("rates.card1.rate")}</span>
                  <span className="rates-trio-sub">{t("rates.card1.sub")}</span>
                </div>
                <div className="rates-trio-col">
                  <span className="rates-trio-label">{t("rates.card2.label")}</span>
                  <span className="rates-trio-number">{t("rates.card2.rate")}</span>
                  <span className="rates-trio-sub">{t("rates.card2.sub")}</span>
                </div>
                <div className="rates-trio-col">
                  <span className="rates-trio-label">{t("rates.card3.label")}</span>
                  <span className="rates-trio-number">{t("rates.card3.rate")}</span>
                  <span className="rates-trio-sub">{t("rates.card3.sub")}</span>
                </div>
              </div>
            </div>

            <p className="lead" style={{ marginBottom: "20px" }}>
              {t("rates.howset.p")}
            </p>

            {/* Zoom out Callout */}
            <div className="rates-callout-zoom">
              <div className="rates-callout-zoom-icon">
                <TrendingUpIcon />
              </div>
              <div className="rates-callout-zoom-content">
                <p>
                  <strong>{t("rates.zoom.title")}</strong> {t("rates.zoom.p")}
                </p>
              </div>
            </div>

            {/* What does this mean for you action box */}
            <div className="rates-action-box">
              <h4>
                <LightbulbIcon />
                {t("rates.mean.title")}
              </h4>
              <p>{t("rates.mean.p")}</p>
            </div>
          </section>

          {/* Section 2: The catch for grad students */}
          <section className="doc-section" id="catch-for-grad-students">
            <span className="section-num">{t("rates.part2")}</span>
            <h2>{t("rates.catch.h2")}</h2>

            <div className="rates-caps-banner">
              <p>{t("rates.catch.p")}</p>
              <div className="rates-caps-chips">
                <div className="rates-cap-chip">
                  <span className="rates-cap-chip-label">{t("rates.chip1.label")}</span>
                  <span className="rates-cap-chip-val">{t("rates.chip1.val")}</span>
                </div>
                <div className="rates-cap-chip">
                  <span className="rates-cap-chip-label">{t("rates.chip2.label")}</span>
                  <span className="rates-cap-chip-val">{t("rates.chip2.val")}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Grad PLUS vs. Parent PLUS, quickly */}
          <section className="doc-section" id="grad-vs-parent-plus">
            <span className="section-num">{t("rates.part3")}</span>
            <h2>{t("rates.vs.h2")}</h2>
            <p className="lead">{t("rates.vs.lead")}</p>

            <div className="rates-diff-grid">
              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">01</span>
                  <h3>{t("rates.vs.r1.title")}</h3>
                </div>
                <p>{t("rates.vs.r1.desc")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">02</span>
                  <h3>{t("rates.vs.r2.title")}</h3>
                </div>
                <p>{t("rates.vs.r2.desc")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">03</span>
                  <h3>{t("rates.vs.r3.title")}</h3>
                </div>
                <p>{t("rates.vs.r3.desc")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">04</span>
                  <h3>{t("rates.vs.r4.title")}</h3>
                </div>
                <p>{t("rates.vs.r4.desc")}</p>
              </div>
            </div>
          </section>

          {/* Section 4: What it costs in real terms */}
          <section className="doc-section" id="real-costs">
            <span className="section-num">{t("rates.part4")}</span>
            <h2>{t("rates.costs.h2")}</h2>

            <div className="rates-cost-box">
              <p>{t("rates.costs.p1")}</p>

              <div className="rates-calc-example">
                <span className="rates-calc-label">{t("rates.calc.label")}</span>
                <span className="rates-calc-gap">+$1,345</span>
              </div>
            </div>
          </section>

          {/* Section 5: The Bottom Line */}
          <section className="doc-section" id="bottom-line">
            <span className="section-num">{t("rates.part5")}</span>
            <h2>{t("rates.bottomline.h2")}</h2>

            <div className="refi-bottom-card">
              <blockquote className="refi-bottom-quote">“{t("rates.bottomline.quote")}”</blockquote>
            </div>

            {/* CTA Strip */}
            <div className="cta-strip">
              <div>
                <h2>{t("rates.cta.h2")}</h2>
                <p>{t("rates.cta.p")}</p>
              </div>
              <Link
                to="/"
                hash="quiz"
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <span>{t("rates.cta.btn")}</span>
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Sources Footnote */}
            <div className="refi-sources">
              <p>
                <strong>{t("rates.sources.label")}</strong>
                {t("rates.sources.text")}
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
