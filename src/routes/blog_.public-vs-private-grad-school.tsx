import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Graduate School: Public vs. Private — Grad Loan Navigator";
const DESCRIPTION =
  "There are over 1,000 universities in the U.S. that offer graduate programs. Understanding the difference between public and private institutions can set you up for success. By Jaylen Peng.";
const URL = "https://www.graduationnavigator.com/blog/public-vs-private-grad-school";

export const Route = createFileRoute(
  "/blog_/public-vs-private-grad-school"
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
  component: PublicVsPrivateGradSchoolArticlePage,
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

const TUITION_TABLE = [
  {
    type: "Public",
    tuition: "In-state: $11,766\nOut-of-state: $21,165",
    inState: "$11,766",
    outOfState: "$21,165",
    schools: "University of California, Berkeley\nUniversity of California, Los Angeles\nUniversity of Michigan–Ann Arbor",
    accent: "var(--teal)",
  },
  {
    type: "Private nonprofit",
    tuition: "$20,184",
    inState: "$20,184",
    outOfState: "$20,184",
    schools: "Princeton University\nMassachusetts Institute of Technology\nHarvard University",
    accent: "var(--ink)",
  },
  {
    type: "Private for-profit",
    tuition: "$17,672",
    inState: "$17,672",
    outOfState: "$17,672",
    schools: "Grand Canyon University\nUniversity of Phoenix\nDeVry University",
    accent: "#D99B26",
  },
];

function PublicVsPrivateGradSchoolArticlePage() {
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
          <div className="eyebrow">{t("pvp.eyebrow")}</div>
          <h1>{t("pvp.h1")}</h1>
          <p className="sub">{t("pvp.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("pvp.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("pvp.why.title")}</h4>
              <p>{t("pvp.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#whats-the-difference">{t("pvp.nav.difference")}</a>
          <a href="#tuition-comparison">{t("pvp.nav.tuition")}</a>
          <a href="#beyond-cost">{t("pvp.nav.beyond")}</a>
          <a href="#keep-in-mind">{t("pvp.nav.mind")}</a>
          <a href="#bottom-line">{t("pvp.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: What's the Difference? */}
          <section className="doc-section" id="whats-the-difference">
            <span className="section-num">{t("pvp.part1")}</span>
            <h2>What's the Difference?</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", margin: "24px 0" }}>
              <div style={{ padding: "24px", background: "var(--card)", borderRadius: "14px", border: "1px solid var(--line)" }}>
                <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--teal)", fontWeight: 700 }}>
                  Public Universities
                </span>
                <h3 style={{ margin: "8px 0 12px 0", fontSize: "20px", fontWeight: 700 }}>State-Supported & Publicly Governed</h3>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  <li style={{ marginBottom: "8px" }}>Receives government funding.</li>
                  <li>Governing boards with state oversight, but institutional independence.</li>
                </ul>
              </div>

              <div style={{ padding: "24px", background: "var(--card)", borderRadius: "14px", border: "1px solid var(--line)" }}>
                <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink)", fontWeight: 700 }}>
                  Private Universities
                </span>
                <h3 style={{ margin: "8px 0 12px 0", fontSize: "20px", fontWeight: 700 }}>Privately Owned & Operated</h3>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  <li style={{ marginBottom: "8px" }}>Relies on tuition, endowments, and donations.</li>
                  <li>Divided into private for-profit and nonprofit institutions.</li>
                </ul>
              </div>
            </div>

            <p style={{ fontSize: "16px", lineHeight: "1.65" }}>
              Private universities are also broken down into <strong>private for-profit</strong> and <strong>nonprofit</strong> schools. <strong>For-profit</strong> operate like a business, seeking to generate returns for shareholders. <strong>Nonprofit universities</strong> reinvest all surplus revenue back into education and student services.
            </p>

            {/* Stat Banner */}
            <div className="rates-callout-zoom" style={{ marginTop: "24px" }}>
              <div className="rates-callout-zoom-icon">
                <TrendingUpIcon />
              </div>
              <div className="rates-callout-zoom-content">
                <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: 700 }}>
                  By the numbers: Institutional Distribution in the U.S.
                </h3>
                <p style={{ margin: 0, fontSize: "15.5px", lineHeight: "1.6" }}>
                  Of all postsecondary educational institutions in the U.S., <strong>32% are public</strong>, <strong>38% private for-profit</strong>, and <strong>30% private nonprofit</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: What It Means for You (Tuition Table) */}
          <section className="doc-section" id="tuition-comparison">
            <span className="section-num">Part 2 of 4</span>
            <h2>What It Means for You</h2>
            <p className="lead">
              The money public universities receive from state government allows them to offer lower in-state tuition for residents. Out-of-state tuition is higher, often comparable to private schools. On average, private for-profit is slightly cheaper than nonprofit.
            </p>

            {/* Data Table */}
            <div className="roi-table-wrap">
              <table className="roi-table">
                <thead>
                  <tr>
                    <th>Institution Type</th>
                    <th style={{ textAlign: "center" }}>Average Annual Graduate Tuition & Required Fees</th>
                    <th>Notable Schools</th>
                  </tr>
                </thead>
                <tbody>
                  {TUITION_TABLE.map((row) => (
                    <tr key={row.type}>
                      <td className="roi-school-name" style={{ color: row.accent }}>
                        {row.type}
                      </td>
                      <td style={{ textAlign: "center" }} className="roi-mono">
                        {row.type === "Public" ? (
                          <div>
                            <div style={{ color: "var(--teal)", fontWeight: 700 }}>In-state: $11,766</div>
                            <div style={{ color: "var(--ink)", fontWeight: 600, marginTop: "4px" }}>Out-of-state: $21,165</div>
                          </div>
                        ) : (
                          <div className="roi-highlight">{row.tuition}</div>
                        )}
                      </td>
                      <td style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                        {row.schools.split("\n").map((s) => (
                          <div key={s}>{s}</div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: "13px", color: "var(--ink-soft)", fontStyle: "italic", marginTop: "8px" }}>
              Note: Tuition figures are 2023–24 institutional averages.
            </p>
          </section>

          {/* Section 3: Differences Beyond Cost of Attendance */}
          <section className="doc-section" id="beyond-cost" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">Part 3 of 4</span>
            <h2>Differences Beyond Cost of Attendance</h2>
            <p className="lead" style={{ fontSize: "17px", lineHeight: "1.65", marginBottom: "24px" }}>
              There are also structural differences beyond tuition and cost of attendance.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginTop: "24px" }}>
              {/* Public Universities Card */}
              <div style={{ padding: "28px", borderRadius: "14px", background: "var(--card)", border: "1px solid var(--line)", borderTop: "3px solid var(--teal)" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "21px", fontWeight: 700, color: "var(--teal)" }}>
                  Public Universities
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      <strong>Larger overall enrollment</strong> with diverse student bodies.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      <strong>Extensive alumni networks</strong> tied strongly to state regions.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      <strong>Major research institutions</strong> with vast resources, large-scale federal grants, and a wide selection of programs.
                    </span>
                  </div>
                </div>
              </div>

              {/* Private Universities Card */}
              <div style={{ padding: "28px", borderRadius: "14px", background: "var(--card)", border: "1px solid var(--line)", borderTop: "3px solid var(--ink)" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "21px", fontWeight: 700, color: "var(--ink)" }}>
                  Private Universities
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      May offer <strong>smaller cohorts</strong>, lower student-to-faculty ratio, and a more compact community.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      More <strong>geographically diverse</strong> and broader national alumni network.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      May offer more <strong>tightly focused specialties</strong> or niche programs.
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "15px", lineHeight: "1.6" }}>
                      <strong>Private nonprofit schools</strong> typically generate much stronger job outcomes, graduation rates, and lower student debt than private for-profit.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Keep In Mind... */}
          <section className="doc-section" id="keep-in-mind" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">Part 4 of 4</span>
            <h2>Keep In Mind…</h2>

            <div className="rates-diff-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "24px" }}>
              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Consideration 01
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "var(--ink)" }}>Your State</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Consider the schools in your specific state of residence where you could qualify for in-state tuition benefits.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Consideration 02
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "var(--ink)" }}>Career Location</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Public universities can have especially strong in-state alumni networks and employer relations.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Consideration 03
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "var(--ink)" }}>Diminished Admissions Benefit</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Unlike for undergraduates, graduate admissions are handled by individual departments not a centralized office. There can still be an in-state boost, but it’s less strong.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Consideration 04
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "var(--ink)" }}>Net Price & Aid</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Assistantships, scholarships, and employer benefits can make private programs cheaper than public.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: The Bottom Line */}
          <section className="doc-section" id="bottom-line" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">Conclusion</span>
            <h2>The Bottom Line</h2>
            <p className="lead" style={{ fontSize: "18px", lineHeight: "1.65", fontWeight: 600, color: "var(--ink)", marginBottom: "20px" }}>
              For in-state residents, public is usually the cheapest. Funding packages for private can narrow the gap. Choose based on program outcomes, career fit, and location.
            </p>

            {/* Sources Attribution matching PDF */}
            <div style={{ margin: "32px 0 24px 0", padding: "16px 20px", background: "color-mix(in srgb, var(--line) 40%, transparent)", borderRadius: "10px", border: "1px solid var(--line)" }}>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--ink-soft)", fontStyle: "italic" }}>
                <strong>Sources:</strong> U.S. News & World Reports, National Center for Educational Statistics. <em>Reviewed as of Sept. 11, 2026.</em>
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
              <h3 style={{ marginTop: 0, fontSize: "20px", fontWeight: 700 }}>Planning Your Graduate Funding?</h3>
              <p style={{ marginBottom: "20px", fontSize: "15.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                Use our free calculator to estimate your annual funding gap, check federal borrowing cap compliance, and model public vs. private degree costs.
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
