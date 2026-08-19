import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Refinancing Student Loans, Explained — Grad Loan Navigator";
const DESCRIPTION =
  "Refinancing can cut your interest rate or lower monthly payments, but permanently costs federal protections. Understand the tradeoffs, steps, rates, and alternatives.";
const URL = "https://graduationnavigator.com/blog/refinancing-student-loans";

export const Route = createFileRoute("/blog_/refinancing-student-loans")({
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
  component: RefinancingArticlePage,
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

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      style={{ color: "var(--teal)" }}
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function RefinancingArticlePage() {
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
          <div className="eyebrow">{t("refi.eyebrow")}</div>
          <h1>{t("refi.h1")}</h1>
          <p className="sub">{t("refi.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("refi.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("refi.why.title")}</h4>
              <p>{t("refi.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#how-it-works">{t("refi.nav.how")}</a>
          <a href="#the-catch">{t("refi.nav.catch")}</a>
          <a href="#who-it-is-for">{t("refi.nav.who")}</a>
          <a href="#consolidation">{t("refi.nav.consolidation")}</a>
          <a href="#bottom-line">{t("refi.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: How It Actually Works */}
          <section className="doc-section" id="how-it-works">
            <span className="section-num">{t("refi.part1")}</span>
            <h2>{t("refi.how.h2")}</h2>
            <p className="lead">{t("refi.how.lead")}</p>

            <div className="refi-steps-grid">
              <div className="refi-step-card">
                <div className="refi-step-header">
                  <span className="refi-step-num">01</span>
                  <h3>{t("refi.step1.title")}</h3>
                </div>
                <p>{t("refi.step1.desc")}</p>
              </div>

              <div className="refi-step-card">
                <div className="refi-step-header">
                  <span className="refi-step-num">02</span>
                  <h3>{t("refi.step2.title")}</h3>
                </div>
                <p>{t("refi.step2.desc")}</p>
              </div>

              <div className="refi-step-card">
                <div className="refi-step-header">
                  <span className="refi-step-num">03</span>
                  <h3>{t("refi.step3.title")}</h3>
                </div>
                <p>{t("refi.step3.desc")}</p>
              </div>

              <div className="refi-step-card">
                <div className="refi-step-header">
                  <span className="refi-step-num">04</span>
                  <h3>{t("refi.step4.title")}</h3>
                </div>
                <p>{t("refi.step4.desc")}</p>
              </div>

              <div className="refi-step-card">
                <div className="refi-step-header">
                  <span className="refi-step-num">05</span>
                  <h3>{t("refi.step5.title")}</h3>
                </div>
                <p>{t("refi.step5.desc")}</p>
              </div>

              <div className="refi-step-card">
                <div className="refi-step-header">
                  <span className="refi-step-num">06</span>
                  <h3>{t("refi.step6.title")}</h3>
                </div>
                <p>{t("refi.step6.desc")}</p>
              </div>
            </div>

            {/* By the numbers stat card */}
            <div className="refi-stat-card">
              <div className="refi-stat-left">
                <span className="refi-stat-badge">{t("refi.numbers.eyebrow")}</span>
                <span className="refi-stat-rate">4% – 14%</span>
              </div>
              <div className="refi-stat-right">
                <h4>{t("refi.numbers.h3")}</h4>
                <p>{t("refi.numbers.desc")}</p>
              </div>
            </div>
          </section>

          {/* Section 2: The Catch (Federal Protections Lost) */}
          <section className="doc-section" id="the-catch">
            <span className="section-num">{t("refi.part2")}</span>
            <h2>{t("refi.catch.h2")}</h2>
            <p className="lead">{t("refi.catch.lead")}</p>

            <div className="refi-danger-grid">
              <div className="refi-danger-card">
                <div className="refi-danger-top">
                  <span className="refi-danger-cross">✕</span>
                  <h4>{t("refi.lost.idr.title")}</h4>
                </div>
                <p>{t("refi.lost.idr.desc")}</p>
              </div>

              <div className="refi-danger-card">
                <div className="refi-danger-top">
                  <span className="refi-danger-cross">✕</span>
                  <h4>{t("refi.lost.pslf.title")}</h4>
                </div>
                <p>{t("refi.lost.pslf.desc")}</p>
              </div>

              <div className="refi-danger-card">
                <div className="refi-danger-top">
                  <span className="refi-danger-cross">✕</span>
                  <h4>{t("refi.lost.defer.title")}</h4>
                </div>
                <p>{t("refi.lost.defer.desc")}</p>
              </div>

              <div className="refi-danger-card">
                <div className="refi-danger-top">
                  <span className="refi-danger-cross">✕</span>
                  <h4>{t("refi.lost.discharge.title")}</h4>
                </div>
                <p>{t("refi.lost.discharge.desc")}</p>
              </div>
            </div>

            {/* Who it makes sense for */}
            <div className="refi-who-card" id="who-it-is-for">
              <h3>{t("refi.who.title")}</h3>
              <p>{t("refi.who.desc")}</p>
              <p>{t("refi.who.check")}</p>
              <a
                href="https://studentaid.gov/manage-loans/repayment/plans"
                target="_blank"
                rel="noreferrer noopener"
                className="refi-who-link"
              >
                {t("refi.who.linkText")}
                <ExternalIcon />
              </a>
            </div>
          </section>

          {/* Section 3: The Alternative: Consolidation, not Refinancing */}
          <section className="doc-section" id="consolidation">
            <span className="section-num">{t("refi.part3")}</span>
            <h2>{t("refi.consolidation.h2")}</h2>
            <p className="lead">{t("refi.consolidation.lead")}</p>

            <div className="subblock">
              <p>{t("refi.consolidation.tradeoff")}</p>
              <p>{t("refi.consolidation.action")}</p>
              <p style={{ marginTop: "14px" }}>
                <a
                  href="https://studentaid.gov/manage-loans/consolidation"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="doc-link"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  {t("refi.consolidation.linkText")}
                  <ExternalIcon />
                </a>
              </p>
            </div>

            {/* Side-by-side comparison table */}
            <div className="refi-compare-wrap">
              <table className="refi-compare-table">
                <thead>
                  <tr>
                    <th>{t("refi.compare.feature")}</th>
                    <th className="th-refi">{t("refi.compare.refi")}</th>
                    <th className="th-consol">{t("refi.compare.consol")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="td-feat">{t("refi.compare.r1.feat")}</td>
                    <td className="td-refi">{t("refi.compare.r1.refi")}</td>
                    <td className="td-consol">{t("refi.compare.r1.consol")}</td>
                  </tr>
                  <tr>
                    <td className="td-feat">{t("refi.compare.r2.feat")}</td>
                    <td className="td-refi">{t("refi.compare.r2.refi")}</td>
                    <td className="td-consol">{t("refi.compare.r2.consol")}</td>
                  </tr>
                  <tr>
                    <td className="td-feat">{t("refi.compare.r3.feat")}</td>
                    <td className="td-refi" style={{ color: "var(--destructive)" }}>
                      {t("refi.compare.r3.refi")}
                    </td>
                    <td className="td-consol" style={{ color: "var(--teal)", fontWeight: 600 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <CheckCircleIcon />
                        {t("refi.compare.r3.consol")}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="td-feat">{t("refi.compare.r4.feat")}</td>
                    <td className="td-refi">{t("refi.compare.r4.refi")}</td>
                    <td className="td-consol">{t("refi.compare.r4.consol")}</td>
                  </tr>
                  <tr>
                    <td className="td-feat">{t("refi.compare.r5.feat")}</td>
                    <td className="td-refi">{t("refi.compare.r5.refi")}</td>
                    <td className="td-consol">{t("refi.compare.r5.consol")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: The Bottom Line */}
          <section className="doc-section" id="bottom-line">
            <span className="section-num">{t("refi.part4")}</span>
            <h2>{t("refi.bottomline.h2")}</h2>

            <div className="refi-bottom-card">
              <blockquote className="refi-bottom-quote">“{t("refi.bottomline.quote")}”</blockquote>
            </div>

            {/* CTA Strip */}
            <div className="cta-strip">
              <div>
                <h2>{t("refi.cta.h2")}</h2>
                <p>{t("refi.cta.p")}</p>
              </div>
              <Link
                to="/"
                hash="quiz"
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <span>{t("refi.cta.btn")}</span>
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Sources Footnote */}
            <div className="refi-sources">
              <p>
                <strong>{t("refi.sources.label")}</strong>
                {t("refi.sources.text")}
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
