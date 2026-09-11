import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Student Loans Political Background and Future — Grad Loan Navigator";
const DESCRIPTION =
  "The One Big Beautiful Bill Act made significant changes to student loan programs. Here's why that happened, and what's to come.";
const URL = "https://www.graduationnavigator.com/blog/student-loans-political-background-and-future";

export const Route = createFileRoute(
  "/blog_/student-loans-political-background-and-future"
)({
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
  component: StudentLoansPoliticalBackgroundPage,
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
      width="18"
      height="18"
      style={{ color: "var(--teal)" }}
      aria-hidden="true"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
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

function StudentLoansPoliticalBackgroundPage() {
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
          <div className="eyebrow">{t("pol.eyebrow")}</div>
          <h1>{t("pol.h1")}</h1>
          <p className="sub">{t("pol.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("pol.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("pol.why.title")}</h4>
              <p>{t("pol.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#history">{t("pol.nav.history")}</a>
          <a href="#july-2026">{t("pol.nav.july2026")}</a>
          <a href="#july-2027">{t("pol.nav.july2027")}</a>
          <a href="#july-2028">{t("pol.nav.july2028")}</a>
          <a href="#bottom-line">{t("pol.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Stat Banner */}
          <div className="rates-callout-zoom" style={{ marginBottom: "40px" }}>
            <div className="rates-callout-zoom-icon">
              <TrendingUpIcon />
            </div>
            <div className="rates-callout-zoom-content">
              <p style={{ fontSize: "16.5px", lineHeight: "1.5" }}>
                {t("pol.stat.banner")}
              </p>
            </div>
          </div>

          {/* Section 1: The History of Federal Student Loans */}
          <section className="doc-section" id="history">
            <span className="section-num">{t("pol.part1")}</span>
            <h2>{t("pol.history.h2")}</h2>
            <p className="lead">{t("pol.history.lead")}</p>

            <div className="rates-diff-grid">
              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">1958</span>
                  <h3>{t("pol.history.p1.title")}</h3>
                </div>
                <p>{t("pol.history.p1.text")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">1964</span>
                  <h3>{t("pol.history.p2.title")}</h3>
                </div>
                <p>{t("pol.history.p2.text")}</p>
              </div>

              <div className="rates-diff-card" style={{ gridColumn: "1 / -1" }}>
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">★</span>
                  <h3>{t("pol.history.p3.title")}</h3>
                </div>
                <p>{t("pol.history.p3.text")}</p>
              </div>
            </div>
          </section>

          {/* Section 2: What changed on July 1, 2026 */}
          <section className="doc-section" id="july-2026">
            <span className="section-num">{t("pol.part2")}</span>
            <h2>{t("pol.july2026.h2")}</h2>
            <p className="lead">{t("pol.july2026.lead")}</p>

            <div className="refi-steps-grid">
              <div className="refi-step-card">
                <div className="refi-step-header">
                  <span className="refi-step-num">01</span>
                  <h3>{t("pol.july2026.rule1.title")}</h3>
                </div>
                <p>{t("pol.july2026.rule1.text")}</p>
              </div>

              <div className="refi-step-card">
                <div className="refi-step-header">
                  <span className="refi-step-num">02</span>
                  <h3>{t("pol.july2026.rule2.title")}</h3>
                </div>
                <p>{t("pol.july2026.rule2.text")}</p>
              </div>

              <div className="refi-step-card">
                <div className="refi-step-header">
                  <span className="refi-step-num">03</span>
                  <h3>{t("pol.july2026.rule3.title")}</h3>
                </div>
                <p>{t("pol.july2026.rule3.text")}</p>
              </div>

              <div className="refi-step-card">
                <div className="refi-step-header">
                  <span className="refi-step-num">04</span>
                  <h3>{t("pol.july2026.rule4.title")}</h3>
                </div>
                <p>{t("pol.july2026.rule4.text")}</p>
              </div>
            </div>

            {/* Political background block */}
            <div className="subblock" style={{ marginTop: "28px" }}>
              <h3 style={{ fontSize: "20px", marginBottom: "12px", fontFamily: "var(--font-display)" }}>
                {t("pol.july2026.politics.title")}
              </h3>
              <p style={{ fontSize: "15.5px", lineHeight: "1.7" }}>
                {t("pol.july2026.politics.text")}
              </p>
            </div>

            {/* Who this actually affects card */}
            <div className="refi-who-card" style={{ marginTop: "24px" }}>
              <h3>{t("pol.july2026.who.title")}</h3>
              <p>{t("pol.july2026.who.text")}</p>
              <a
                href="https://studentaid.gov/manage-loans"
                target="_blank"
                rel="noreferrer noopener"
                className="refi-who-link"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                {t("pol.july2026.who.link")}
                <ExternalIcon />
              </a>
            </div>
          </section>

          {/* Section 3: Changes Coming July 1, 2027 */}
          <section className="doc-section" id="july-2027">
            <span className="section-num">{t("pol.part3")}</span>
            <h2>{t("pol.july2027.h2")}</h2>
            <p className="lead">{t("pol.july2027.lead")}</p>

            <div className="rates-diff-grid">
              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">✕</span>
                  <h3>{t("pol.july2027.c1.title")}</h3>
                </div>
                <p>{t("pol.july2027.c1.text")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">⏱</span>
                  <h3>{t("pol.july2027.c2.title")}</h3>
                </div>
                <p>{t("pol.july2027.c2.text")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">9 / 24</span>
                  <h3>{t("pol.july2027.c3.title")}</h3>
                </div>
                <p>{t("pol.july2027.c3.text")}</p>
              </div>
            </div>
          </section>

          {/* Section 4: Changes coming July 1, 2028 */}
          <section className="doc-section" id="july-2028">
            <span className="section-num">{t("pol.part4")}</span>
            <h2>{t("pol.july2028.h2")}</h2>
            <p className="lead">{t("pol.july2028.lead")}</p>

            <div className="rates-diff-grid">
              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">PAYE / ICR</span>
                  <h3>{t("pol.july2028.i1.title")}</h3>
                </div>
                <p>{t("pol.july2028.i1.text")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">LEGACY</span>
                  <h3>{t("pol.july2028.i2.title")}</h3>
                </div>
                <p>{t("pol.july2028.i2.text")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">DEADLINE</span>
                  <h3>{t("pol.july2028.i3.title")}</h3>
                </div>
                <p>{t("pol.july2028.i3.text")}</p>
              </div>
            </div>
          </section>

          {/* Section 5: The Bottom Line */}
          <section className="doc-section" id="bottom-line">
            <span className="section-num">{t("pol.part5")}</span>
            <h2>{t("pol.bottomline.h2")}</h2>

            <div className="refi-bottom-card">
              <blockquote className="refi-bottom-quote">“{t("pol.bottomline.quote")}”</blockquote>
            </div>

            {/* CTA Strip */}
            <div className="cta-strip">
              <div>
                <h2>{t("pol.cta.h2")}</h2>
                <p>{t("pol.cta.p")}</p>
              </div>
              <Link
                to="/chart-your-path"
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <span>{t("pol.cta.btn")}</span>
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Sources Footnote */}
            <div className="refi-sources">
              <p>
                <strong>{t("pol.sources.label")}</strong>{" "}
                {t("pol.sources.text")}
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
