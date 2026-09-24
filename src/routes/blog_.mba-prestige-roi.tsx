import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "MBA Programs: Does Prestige Matter? — Grad Loan Navigator";
const DESCRIPTION =
  "How much does ranking and name recognition influence your MBA ROI? A data analysis comparing Top 10 highest ROI MBA programs and Top 10 Value MBA programs. By Jaylen Peng.";
const URL = "https://www.graduationnavigator.com/blog/mba-prestige-roi";

export const Route = createFileRoute("/blog_/mba-prestige-roi")({
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
  component: MbaPrestigeRoiArticlePage,
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
      width="18"
      height="18"
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
      width="20"
      height="20"
      style={{ color: "var(--teal)" }}
      aria-hidden="true"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
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
      style={{ color: "var(--teal)", flexShrink: 0, marginTop: "3px" }}
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
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

const HIGH_ROI_MBA = [
  { roiRank: 1, usnewsRank: 9, school: "Dartmouth Tuck School of Business", acceptance: "28.28%", tuition: "$175,072", roi: "$3,243,345" },
  { roiRank: 2, usnewsRank: 2, school: "Wharton School, University of Pennsylvania", acceptance: "18.60%", tuition: "$175,940", roi: "$3,225,932" },
  { roiRank: 3, usnewsRank: 11, school: "UVA Darden School of Business", acceptance: "39.40%", tuition: "$166,656", roi: "$2,968,384" },
  { roiRank: 4, usnewsRank: 6, school: "MIT Sloan School of Management", acceptance: "18.75%", tuition: "$179,384", roi: "$2,648,994" },
  { roiRank: 5, usnewsRank: 4, school: "Northwestern Kellogg School of Management", acceptance: "28.06%", tuition: "$177,072", roi: "$2,601,357" },
  { roiRank: 6, usnewsRank: 7, school: "Columbia Business School", acceptance: "25.72%", tuition: "$187,816", roi: "$2,583,931" },
  { roiRank: 7, usnewsRank: 15, school: "Cornell Johnson Graduate School of Management", acceptance: "28.00%", tuition: "$177,868", roi: "$2,559,222" },
  { roiRank: 8, usnewsRank: 10, school: "UC Berkeley Haas School of Business", acceptance: "21.44%", tuition: "$180,382", roi: "$2,558,369" },
  { roiRank: 9, usnewsRank: 3, school: "Chicago Booth School of Business", acceptance: "27.30%", tuition: "$179,952", roi: "$2,547,297" },
  { roiRank: 10, usnewsRank: 14, school: "Duke Fuqua School of Business", acceptance: "21.40%", tuition: "$167,400", roi: "$2,432,517" },
];

const VALUE_MBA = [
  { roiRank: 1, usnewsRank: 39, school: "BYU Marriott School of Business", acceptance: "58%", tuition: "$31,984–$63,968", roi: "$1,394,198" },
  { roiRank: 2, usnewsRank: 48, school: "Wisconsin School of Business", acceptance: "53%", tuition: "$102,826", roi: "$1,369,971" },
  { roiRank: 3, usnewsRank: 25, school: "Georgia Terry College of Business", acceptance: "38%", tuition: "$69,840", roi: "$1,232,651" },
  { roiRank: 4, usnewsRank: 36, school: "Texas A&M Mays Business School", acceptance: "36%", tuition: "$104,799", roi: "$1,135,385" },
  { roiRank: 5, usnewsRank: 32, school: "Minnesota Carlson School of Management", acceptance: "46%", tuition: "$124,560", roi: "$996,370" },
  { roiRank: 6, usnewsRank: 43, school: "Tennessee Haslam College of Business", acceptance: "49%", tuition: "$69,968", roi: "$896,266" },
  { roiRank: 7, usnewsRank: 76, school: "Oklahoma Price College of Business", acceptance: "64%", tuition: "$52,898", roi: "$807,101" },
  { roiRank: 8, usnewsRank: 53, school: "South Carolina Darla Moore School of Business", acceptance: "33%", tuition: "$29,520", roi: "$796,616" },
  { roiRank: 9, usnewsRank: 63, school: "Rutgers Business School", acceptance: "46%", tuition: "$114,672", roi: "$790,017" },
  { roiRank: 10, usnewsRank: 77, school: "Oregon Lundquist College of Business", acceptance: "72%", tuition: "$93,746", roi: "$609,890" },
];

function MbaPrestigeRoiArticlePage() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />

      <main style={{ paddingBottom: "64px" }}>
        {/* Hero Section */}
        <section className="wrap doc-hero">
          <div className="article-back" style={{ marginBottom: "16px" }}>
            <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              ← {t("blog.h1")}
            </Link>
          </div>
          <div className="eyebrow">{t("mba.eyebrow")}</div>
          <h1>{t("mba.h1")}</h1>
          <p className="sub">{t("mba.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("mba.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("mba.why.title")}</h4>
              <p>{t("mba.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#highest-roi">{t("mba.nav.highest")}</a>
          <a href="#value-programs">{t("mba.nav.value")}</a>
          <a href="#what-to-consider">{t("mba.nav.consider")}</a>
          <a href="#bottom-line">{t("mba.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: Highest ROI MBA Programs */}
          <section className="doc-section" id="highest-roi">
            <span className="section-num">{t("mba.part1")}</span>
            <h2>Highest ROI MBA Programs</h2>

            {/* Data Table 1 */}
            <div className="roi-table-wrap">
              <table className="roi-table">
                <thead>
                  <tr>
                    <th className="roi-rank-cell">ROI Rank</th>
                    <th style={{ textAlign: "center" }}>U.S. News</th>
                    <th>MBA Program</th>
                    <th>Acceptance</th>
                    <th>Tuition</th>
                    <th>Lifetime ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {HIGH_ROI_MBA.map((row) => (
                    <tr key={row.school}>
                      <td className="roi-rank-cell">
                        <span className="roi-rank-badge">{row.roiRank}</span>
                      </td>
                      <td style={{ textAlign: "center" }} className="roi-mono">#{row.usnewsRank}</td>
                      <td className="roi-school-name">{row.school}</td>
                      <td className="roi-mono">{row.acceptance}</td>
                      <td className="roi-mono">{row.tuition}</td>
                      <td className="roi-highlight">{row.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: "13px", color: "var(--ink-soft)", fontStyle: "italic", marginTop: "8px" }}>
              Sources: U.S. News & World Report, FREOPP.
            </p>

            <div style={{ marginTop: "24px" }}>
              <p style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
                There is a <strong>relationship between rank and return</strong>. Of the top 10 MBA programs in the US with the highest ROI, all the universities are ranked within the top 15. When creating rankings, U.S. News does consider career outcomes, including the percentage of graduates employed, as well as starting salary and bonus.
              </p>

              <div style={{ padding: "24px", background: "var(--card)", borderRadius: "14px", border: "1px solid var(--line)", marginTop: "20px" }}>
                <h4 style={{ margin: "0 0 14px 0", fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>
                  These top programs produce strong outcomes through:
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      <strong>Employer relationships:</strong> Established recruiting pipelines giving students access to top-tier opportunities.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      <strong>Strong alumni networks:</strong> Former graduates can provide referrals, mentorship, and direct industry access.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      <strong>Recognizable reputation:</strong> Employers understand the extreme selectivity associated with these institutions.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      <strong>Faculty expertise:</strong> These schools attract professors with extensive real-world experience and relevant skills.
                    </span>
                  </div>
                </div>
              </div>

              {/* Cost & Rankings Callouts */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "20px" }}>
                <div style={{ padding: "20px", background: "color-mix(in srgb, #D99B26 12%, var(--card))", borderRadius: "12px", borderLeft: "4px solid #D99B26" }}>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--ink)" }}>
                    The Cost Factor
                  </h4>
                  <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.6" }}>
                    The price tag for each of these two-year programs is <strong>over $160,000</strong>. Consider your financing options and what this total cost means for your long-term budget.
                  </p>
                </div>

                <div style={{ padding: "20px", background: "color-mix(in srgb, var(--teal) 12%, var(--card))", borderRadius: "12px", borderLeft: "4px solid var(--teal)" }}>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--ink)" }}>
                    Rankings Aren't Everything
                  </h4>
                  <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.6" }}>
                    U.S. News criteria include subjective quality assessments and student selectivity. It does <strong>not</strong> directly measure tuition affordability, student debt, or lifetime ROI.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Value MBA Programs */}
          <section className="doc-section" id="value-programs">
            <span className="section-num">Part 2 of 3</span>
            <h2>Value MBA Programs</h2>
            <p className="lead">
              Consider these <strong>value MBA programs</strong>. They are more accessible – lower tuitions and higher acceptance rates – but still deliver impressive lifetime ROI.
            </p>

            {/* Data Table 2 */}
            <div className="roi-table-wrap">
              <table className="roi-table">
                <thead>
                  <tr>
                    <th className="roi-rank-cell">ROI Rank</th>
                    <th style={{ textAlign: "center" }}>U.S. News</th>
                    <th>MBA Program</th>
                    <th>Acceptance</th>
                    <th>Tuition</th>
                    <th>Lifetime ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {VALUE_MBA.map((row) => (
                    <tr key={row.school}>
                      <td className="roi-rank-cell">
                        <span className="roi-rank-badge" style={{ background: "color-mix(in srgb, #D99B26 16%, transparent)", color: "#D99B26" }}>{row.roiRank}</span>
                      </td>
                      <td style={{ textAlign: "center" }} className="roi-mono">#{row.usnewsRank}</td>
                      <td className="roi-school-name">{row.school}</td>
                      <td className="roi-mono">{row.acceptance}</td>
                      <td className="roi-mono">{row.tuition}</td>
                      <td className="roi-highlight">{row.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: "13px", color: "var(--ink-soft)", fontStyle: "italic", marginTop: "8px" }}>
              Sources: U.S. News & World Report, Fortune, FREOPP.
            </p>
          </section>

          {/* Section 3: What You Should Consider */}
          <section className="doc-section" id="what-to-consider" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">Part 3 of 3</span>
            <h2>What You Should Consider</h2>

            <div className="rates-diff-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "24px" }}>
              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Factor 01
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "var(--ink)" }}>Location</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Proximity to major business centers can strengthen relationships with regional employers. Consider where you want to work postgrad.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Factor 02
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "var(--ink)" }}>Timeframe</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Many prestigious programs have high long-term ROI but also increased immediate costs. Consider your immediate financial needs, future goals, and if you are willing to wait.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Factor 03
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "var(--ink)" }}>Net Cost</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Scholarships, aid, and other assistance can lower cost of attendance without reducing post-graduation earnings.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Factor 04
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "var(--ink)" }}>Opportunity Cost</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  A full-time MBA requires two years outside the workforce, including lost salary and benefits during enrollment.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Factor 05
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "var(--ink)" }}>Specialized Programs</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Look for schools with strong recruiting pipelines in your specific field of interest.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Factor 06
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "var(--ink)" }}>Selection Effect</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Prestigious schools admit students with already strong experience and skills. Future earnings could reflect this talent pool as well as the programs themselves.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: The Bottom Line */}
          <section className="doc-section" id="bottom-line" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">Conclusion</span>
            <h2>The Bottom Line</h2>
            <p className="lead" style={{ fontSize: "18px", lineHeight: "1.65", fontWeight: 600, color: "var(--ink)", marginBottom: "20px" }}>
              Rankings mean something, but not everything. Consider if the high lifetime earnings are worth the high tuition. Balance your immediate needs with future career goals.
            </p>

            {/* Sources Attribution matching PDF */}
            <div style={{ margin: "32px 0 24px 0", padding: "16px 20px", background: "color-mix(in srgb, var(--line) 40%, transparent)", borderRadius: "10px", border: "1px solid var(--line)" }}>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--ink-soft)", fontStyle: "italic" }}>
                <strong>Sources:</strong> U.S. News & World Report, FREOPP, Fortune. <em>Reviewed as of Sept. 17, 2026.</em>
              </p>
            </div>

            {/* CTA Box */}
            <div
              style={{
                marginTop: "28px",
                padding: "28px",
                background: "color-mix(in srgb, var(--teal) 10%, var(--card))",
                borderRadius: "16px",
                border: "1px solid color-mix(in srgb, var(--teal) 30%, transparent)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: "20px", fontWeight: 700 }}>Evaluate Your MBA Financing Strategy</h3>
              <p style={{ marginBottom: "20px", fontSize: "15.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                Use our free calculator to estimate your annual borrowing gap, federal borrowing cap compliance, and return on investment.
              </p>
              <Link
                to="/chart-your-path"
                className="button-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
              >
                Chart Your Path Now
                <ArrowRightIcon />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
