import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Which Ph.D. Fields Are Worth It? — Grad Loan Navigator";
const DESCRIPTION =
  "A Ph.D. can significantly boost your career prospects but requires time and money. Here are the programs that have the best financial outcomes.";
const URL = "https://www.graduationnavigator.com/blog/which-phd-fields-are-worth-it";

export const Route = createFileRoute("/blog_/which-phd-fields-are-worth-it")({
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
  component: WhichPhdFieldsAreWorthItArticlePage,
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

const HIGHEST_PAYING = [
  { rank: 1, program: "Ph.D. in Computer and Information Sciences", salary: "$185,000" },
  { rank: 2, program: "Ph.D. in Electrical and Computer Engineering", salary: "$181,000" },
  { rank: 3, program: "Ph.D. in Aerospace, Aeronautical, and Astronautical Engineering", salary: "$171,000" },
  { rank: 4, program: "Ph.D. in Economics", salary: "$160,000" },
  { rank: 5, program: "Ph.D. in Chemical Engineering", salary: "$159,000" },
  { rank: 6, program: "Ph.D. in Physics", salary: "$156,000" },
  { rank: 7, program: "Ph.D. in Metallurgical and Materials Engineering", salary: "$154,000" },
  { rank: 8, program: "Ph.D. in Mechanical Engineering", salary: "$150,000" },
  { rank: 9, program: "Ph.D. in Biochemistry and Biophysics", salary: "$140,000" },
  { rank: 10, program: "Ph.D. in Microbiological Sciences and Immunology", salary: "$139,000" },
];

const FAST_GROWING = [
  { rank: 1, program: "Ph.D. in Health Sciences", growth: "17.9%" },
  { rank: 2, program: "Ph.D. in Nursing", growth: "17.1%" },
  { rank: 3, program: "Ph.D. in Biomedical Sciences", growth: "12.6%" },
  { rank: 4, program: "Ph.D. in Biochemistry and Biophysics", growth: "12.3%" },
  { rank: 5, program: "Ph.D. in Clinical Psychology", growth: "11.7%" },
  { rank: 6, program: "Ph.D. in Astronomy", growth: "7.8%" },
  { rank: 7, program: "Ph.D. in Engineering", growth: "7.8%" },
  { rank: 8, program: "Ph.D. in Biological Sciences", growth: "7.3%" },
  { rank: 9, program: "Ph.D. in Physics", growth: "7.2%" },
  { rank: 10, program: "Ph.D. in Business", growth: "5.9%" },
];

const SHRINKING = [
  { rank: 1, program: "Ph.D. in Survey Methodology", growth: "-4.8%" },
  { rank: 2, program: "Ph.D. in Geography", growth: "-2.1%" },
  { rank: 3, program: "Ph.D. in Political Science", growth: "-2.0%" },
  { rank: 4, program: "Ph.D. in English Language and Literature", growth: "0.0%" },
  { rank: 5, program: "Ph.D. in History", growth: "0.0%" },
];

function WhichPhdFieldsAreWorthItArticlePage() {
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
          <div className="eyebrow">{t("phd.eyebrow")}</div>
          <h1>{t("phd.h1")}</h1>
          <p className="sub">{t("phd.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("phd.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("phd.why.title")}</h4>
              <p>{t("phd.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#highest-paying">{t("phd.nav.paying")}</a>
          <a href="#changing-economy">{t("phd.nav.economy")}</a>
          <a href="#keep-in-mind">{t("phd.nav.mind")}</a>
          <a href="#bottom-line">{t("phd.nav.bottomline")}</a>
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
                <strong>By the numbers:</strong> On average, a Ph.D. increases median lifetime earnings by <strong>$1.2 million</strong>.
              </p>
            </div>
          </div>

          {/* Section 1: Highest Paying Ph.D. Fields */}
          <section className="doc-section" id="highest-paying">
            <span className="section-num">{t("phd.part1")}</span>
            <h2>{t("phd.paying.h2")}</h2>
            <p className="lead">{t("phd.paying.lead")}</p>

            <div className="roi-table-wrap">
              <table className="roi-table">
                <thead>
                  <tr>
                    <th className="roi-rank-cell">Rank</th>
                    <th>Ph.D. Program</th>
                    <th>Median Annual Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {HIGHEST_PAYING.map((item) => (
                    <tr key={item.rank}>
                      <td className="roi-rank-cell">
                        <span className="roi-rank-badge">{item.rank}</span>
                      </td>
                      <td className="roi-school-name">{item.program}</td>
                      <td className="roi-highlight">{item.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2: The Changing Economy */}
          <section className="doc-section" id="changing-economy">
            <span className="section-num">{t("phd.part2")}</span>
            <h2>{t("phd.economy.h2")}</h2>
            <p className="lead">{t("phd.economy.lead")}</p>

            <h3 style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px", fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              {t("phd.economy.fast.title")}
            </h3>

            <div className="roi-table-wrap">
              <table className="roi-table">
                <thead>
                  <tr>
                    <th className="roi-rank-cell">Rank</th>
                    <th>Ph.D. Program</th>
                    <th>Projected Employment Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {FAST_GROWING.map((item) => (
                    <tr key={item.rank}>
                      <td className="roi-rank-cell">
                        <span className="roi-rank-badge">{item.rank}</span>
                      </td>
                      <td className="roi-school-name">{item.program}</td>
                      <td className="roi-highlight" style={{ color: "var(--teal)" }}>{item.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={{ fontSize: "18px", marginTop: "32px", marginBottom: "8px", fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              {t("phd.economy.shrink.title")}
            </h3>
            <p style={{ fontSize: "15px", color: "var(--ink-soft)", marginBottom: "16px" }}>
              {t("phd.economy.shrink.lead")}
            </p>

            <div className="roi-table-wrap">
              <table className="roi-table">
                <thead>
                  <tr>
                    <th className="roi-rank-cell">Rank</th>
                    <th>Ph.D. Program</th>
                    <th>Projected Employment Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {SHRINKING.map((item) => (
                    <tr key={item.rank}>
                      <td className="roi-rank-cell">
                        <span className="roi-rank-badge" style={{ background: "color-mix(in srgb, var(--destructive) 14%, transparent)", color: "var(--destructive)" }}>
                          {item.rank}
                        </span>
                      </td>
                      <td className="roi-school-name">{item.program}</td>
                      <td className="roi-mono" style={{ color: item.growth.startsWith("-") ? "var(--destructive)" : "var(--ink-soft)", fontWeight: 600 }}>
                        {item.growth}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Keep In Mind… */}
          <section className="doc-section" id="keep-in-mind">
            <span className="section-num">{t("phd.part3")}</span>
            <h2>{t("phd.mind.h2")}</h2>

            <div className="rates-diff-grid">
              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">01</span>
                  <h3>{t("phd.mind.p1.title")}</h3>
                </div>
                <p>{t("phd.mind.p1.text")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">02</span>
                  <h3>{t("phd.mind.p2.title")}</h3>
                </div>
                <p>{t("phd.mind.p2.text")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">03</span>
                  <h3>{t("phd.mind.p3.title")}</h3>
                </div>
                <p>{t("phd.mind.p3.text")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">04</span>
                  <h3>{t("phd.mind.p4.title")}</h3>
                </div>
                <p>{t("phd.mind.p4.text")}</p>
              </div>
            </div>

            {/* Who this actually makes sense for */}
            <div className="rates-action-box" style={{ marginTop: "24px" }}>
              <h4>
                <LightbulbIcon />
                {t("phd.mind.who.title")}
              </h4>
              <p>{t("phd.mind.who.text")}</p>
            </div>
          </section>

          {/* Section 4: The Bottom Line */}
          <section className="doc-section" id="bottom-line">
            <span className="section-num">{t("phd.part4")}</span>
            <h2>{t("phd.bottomline.h2")}</h2>

            <div className="refi-bottom-card">
              <blockquote className="refi-bottom-quote">“{t("phd.bottomline.quote")}”</blockquote>
            </div>

            {/* CTA Strip */}
            <div className="cta-strip">
              <div>
                <h2>{t("phd.cta.h2")}</h2>
                <p>{t("phd.cta.p")}</p>
              </div>
              <Link
                to="/chart-your-path"
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <span>{t("phd.cta.btn")}</span>
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Sources Footnote */}
            <div className="refi-sources">
              <p>
                <strong>{t("phd.sources.label")}</strong>{" "}
                {t("phd.sources.text")}
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
