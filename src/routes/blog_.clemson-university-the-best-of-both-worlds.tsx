import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Clemson: The Best of Both Worlds — Grad Loan Navigator";
const DESCRIPTION =
  "Clemson delivers a well-rounded college experience through excellent academics, storied traditions, and vibrant campus life. A data analysis by the Student Editorial Board.";
const URL = "https://www.graduationnavigator.com/blog/clemson-university-the-best-of-both-worlds";

export const Route = createFileRoute(
  "/blog_/clemson-university-the-best-of-both-worlds"
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
  component: ClemsonArticlePage,
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
      stroke="#F56600"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
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
      stroke="#F56600"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      style={{ flexShrink: 0, marginTop: "3px" }}
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

const ENROLLMENT_DATA = [
  { year: "1900", count: 483, height: 12 },
  { year: "1920", count: 847, height: 20 },
  { year: "1940", count: 2381, height: 42 },
  { year: "1960", count: 4048, height: 65 },
  { year: "1980", count: 11579, height: 135 },
  { year: "2000", count: 17465, height: 185 },
  { year: "2010", count: 19453, height: 205 },
  { year: "2025", count: 29545, height: 260 },
];

function ClemsonArticlePage() {
  const { t } = useI18n();

  return (
    <div className="clemson-article-theme">
      <SiteHeader />

      <main>
        {/* Clemson Orange Banner Header */}
        <div className="clemson-banner">
          🐾 CLEMSON UNIVERSITY SPOTLIGHT · TIGER EXCELLENCE 🐾
        </div>

        {/* Hero Section */}
        <section className="wrap doc-hero">
          <div className="article-back" style={{ marginBottom: "16px" }}>
            <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              ← {t("blog.h1")}
            </Link>
          </div>
          <div className="eyebrow">
            {t("clemson.eyebrow")}
          </div>
          <h1>
            {t("clemson.h1")}
          </h1>
          <p className="sub">
            {t("clemson.sub")}
          </p>
          <div className="updated">
            <span className="dot" />
            {t("clemson.updated")}
          </div>

          {/* The Clemson Experience callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>The Clemson Experience</h4>
              <p>
                Clemson has come a long way since its founding as an agricultural university in 1889. Today the university offers <strong>over 80 undergraduate majors</strong> ranging from engineering and business to science, architecture, and education as well as offering <strong>over 130 graduate programs</strong>. However, Clemson has not forgotten the traditions that have defined the university experience for over <strong>29,545 current students</strong> and its nearly <strong>200,000 strong living alumni</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#beyond-classroom">{t("clemson.nav.beyond")}</a>
          <a href="#by-the-numbers">{t("clemson.nav.numbers")}</a>
          <a href="#academics">{t("clemson.nav.academics")}</a>
          <a href="#advantage">{t("clemson.nav.advantage")}</a>
          <a href="#bottom-line">{t("clemson.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Stat Banner: Success at Clemson */}
          <section id="beyond-classroom" style={{ scrollMarginTop: "80px" }}>
            <div
              className="rates-callout-zoom"
              style={{
                padding: "28px 32px",
                background: "linear-gradient(135deg, color-mix(in srgb, #F56600 12%, var(--card)) 0%, color-mix(in srgb, #522D80 12%, var(--card)) 100%)",
                borderRadius: "16px",
                border: "1px solid color-mix(in srgb, #F56600 25%, transparent)",
              }}
            >
              <div className="rates-callout-zoom-icon" style={{ background: "#F56600", color: "#ffffff", borderRadius: "50%", padding: "8px", display: "flex" }}>
                <TrendingUpIcon />
              </div>
              <div className="rates-callout-zoom-content">
                <h3 style={{ margin: "0 0 10px 0", fontSize: "20px", fontWeight: 700, color: "#522D80" }}>
                  Success at Clemson: 92% Employed or Continuing Education
                </h3>
                <p style={{ margin: 0, fontSize: "16px", lineHeight: "1.6" }}>
                  <strong>92% of Clemson graduates</strong> are employed or continuing their education within six months of graduation, while <strong>92% of seniors surveyed</strong> rated their overall Clemson experience as “excellent” or “good.”
                </p>
              </div>
            </div>

            {/* Beyond the Classroom section */}
            <div style={{ marginTop: "32px" }}>
              <span className="section-num" style={{ color: "#F56600" }}>Part 1 of 4</span>
              <h2 style={{ color: "#522D80" }}>Beyond the Classroom</h2>
              <p className="lead" style={{ fontSize: "17.5px", lineHeight: "1.65", marginBottom: "24px" }}>
                Clemson has a plethora of beloved traditions that create a strong bond between students and keep generations of Tigers connected to their alma mater.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "24px" }}>
                <div style={{ padding: "24px", background: "var(--card)", borderRadius: "14px", border: "1px solid var(--line)", borderTop: "4px solid #F56600" }}>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: "20px", fontWeight: 700, color: "#522D80" }}>Game Day</h3>
                  <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                    Students pack Death Valley to watch their Tigers “run down the hill” contributing to one of college football's most exciting game day atmospheres.
                  </p>
                </div>

                <div style={{ padding: "24px", background: "var(--card)", borderRadius: "14px", border: "1px solid var(--line)", borderTop: "4px solid #522D80" }}>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: "20px", fontWeight: 700, color: "#522D80" }}>Clubs & Organizations</h3>
                  <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                    There are over <strong>600 clubs and organizations</strong> to serve Clemson students creating plenty of opportunities for involvement and leadership.
                  </p>
                </div>

                <div style={{ padding: "24px", background: "var(--card)", borderRadius: "14px", border: "1px solid var(--line)", borderTop: "4px solid #F56600" }}>
                  <h3 style={{ margin: "0 0 10px 0", fontSize: "20px", fontWeight: 700, color: "#522D80" }}>Outdoor Recreation</h3>
                  <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                    Students take advantage of Clemson's close proximity to nature by hiking in the Blue Ridge mountains, sailing, fishing, and swimming in Lake Hartwell, taking in the sunsets that inspired the university's colors.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Clemson By the Numbers (Enrollment Growth Chart) */}
          <section className="doc-section" id="by-the-numbers" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num" style={{ color: "#F56600" }}>Part 2 of 4</span>
            <h2 style={{ color: "#522D80" }}>Clemson: By the Numbers</h2>
            <p className="lead" style={{ fontSize: "17.5px", lineHeight: "1.65", marginBottom: "24px" }}>
              Clemson has exploded in popularity in recent years no doubt due in part to its commitment to academic excellence without sacrificing the robust campus life that draws so many students to the university.
            </p>

            {/* Customized Clemson Themed SVG Enrollment Growth Chart */}
            <div
              style={{
                margin: "24px 0",
                padding: "28px",
                background: "var(--card)",
                border: "2px solid color-mix(in srgb, #F56600 30%, var(--line))",
                borderRadius: "16px",
                boxShadow: "0 6px 24px rgba(245, 102, 0, 0.08)",
              }}
            >
              {/* Header inside Chart Box */}
              <div style={{ background: "linear-gradient(135deg, #F56600 0%, #D95300 100%)", color: "#ffffff", padding: "18px 24px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 800, color: "#ffffff" }}>Clemson Enrollment Growth</h3>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.9 }}>
                    From a small agricultural college to a leading public university
                  </p>
                </div>
                <div style={{ fontSize: "32px" }}>🐾</div>
              </div>

              {/* Bar Chart Graphic */}
              <div style={{ overflowX: "auto" }}>
                <svg viewBox="0 0 650 320" style={{ width: "100%", minWidth: "540px", height: "auto" }}>
                  {/* Grid Lines */}
                  {[0, 5000, 10000, 15000, 20000, 25000, 30000, 35000].map((val) => {
                    const y = 260 - (val / 35000) * 230;
                    return (
                      <g key={val}>
                        <line x1="60" y1={y} x2="620" y2={y} stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray={val === 0 ? undefined : "4 4"} />
                        <text x="50" y={y + 4} fontSize="11" fontWeight="600" fill="#64748b" textAnchor="end">
                          {val.toLocaleString()}
                        </text>
                      </g>
                    );
                  })}

                  {/* Bars */}
                  {ENROLLMENT_DATA.map((d, index) => {
                    const x = 75 + index * 68;
                    const barHeight = (d.count / 35000) * 230;
                    const y = 260 - barHeight;
                    return (
                      <g key={d.year}>
                        {/* Bar Gradient Fill */}
                        <rect
                          x={x}
                          y={y}
                          width="38"
                          height={barHeight}
                          rx="4"
                          fill={index === ENROLLMENT_DATA.length - 1 ? "#F56600" : "color-mix(in srgb, #F56600 85%, #522D80 15%)"}
                        />
                        {/* Top Count Label */}
                        <text x={x + 19} y={y - 8} fontSize="11.5" fontWeight="800" fill="#522D80" textAnchor="middle">
                          {d.count.toLocaleString()}
                        </text>
                        {/* X-Axis Year Label */}
                        <text x={x + 19} y="282" fontSize="13" fontWeight="700" fill="#1e293b" textAnchor="middle">
                          {d.year}
                        </text>
                      </g>
                    );
                  })}

                  {/* Axis Label */}
                  <text x="340" y="310" fontSize="12" fontWeight="700" fill="#F56600" textAnchor="middle">Year</text>
                </svg>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--line)", fontSize: "12px", color: "var(--ink-soft)" }}>
                <span style={{ fontWeight: 800, letterSpacing: "0.08em", color: "#522D80" }}>PEOPLE. PURPOSE. PROGRESS.</span>
                <span style={{ fontStyle: "italic" }}>Source: Clemson University Office of Institutional Research</span>
              </div>
            </div>
          </section>

          {/* Section 3: Great Academic Programs */}
          <section className="doc-section" id="academics" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num" style={{ color: "#F56600" }}>Part 3 of 4</span>
            <h2 style={{ color: "#522D80" }}>Great Academic Programs</h2>
            <p className="lead" style={{ fontSize: "17.5px", lineHeight: "1.65", marginBottom: "24px" }}>
              Clemson leads the Southeast in many academic programs creating opportunities for its students to excel after graduation.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "24px 0" }}>
              {/* Engineering */}
              <div style={{ padding: "20px 24px", background: "var(--card)", borderRadius: "12px", border: "1px solid var(--line)", borderLeft: "5px solid #F56600" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "19px", fontWeight: 700, color: "#522D80" }}>
                  Engineering Excellence
                </h3>
                <p style={{ margin: 0, fontSize: "15.5px", lineHeight: "1.6" }}>
                  Clemson's undergraduate engineering program ranks <strong>50th in the nation</strong>, with its industrial engineering and civil engineering programs ranking <strong>16th</strong> and <strong>29th</strong> respectively.
                </p>
              </div>

              {/* Business School */}
              <div style={{ padding: "20px 24px", background: "var(--card)", borderRadius: "12px", border: "1px solid var(--line)", borderLeft: "5px solid #522D80" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "19px", fontWeight: 700, color: "#522D80" }}>
                  Powers College of Business (+33% Growth)
                </h3>
                <p style={{ margin: 0, fontSize: "15.5px", lineHeight: "1.6" }}>
                  Wilbur O. and Ann Powers College of Business has grown exponentially recently; <strong>up 33% since 2018</strong> and accounting for nearly a quarter of all applications to Clemson. According to the university's fact book, <strong>85% of surveyed seniors</strong> in the college have completed a co-op, internship, or part-time job while in the program.
                </p>
              </div>

              {/* Mechanical Engineering */}
              <div style={{ padding: "20px 24px", background: "var(--card)", borderRadius: "12px", border: "1px solid var(--line)", borderLeft: "5px solid #F56600" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "19px", fontWeight: 700, color: "#522D80" }}>
                  Mechanical Engineering (90% Employed)
                </h3>
                <p style={{ margin: 0, fontSize: "15.5px", lineHeight: "1.6" }}>
                  <strong>90% of students</strong> that graduate from this program are employed with a median starting income of <strong>$73,500</strong>.
                </p>
              </div>

              {/* Placement Success */}
              <div style={{ padding: "20px 24px", background: "var(--card)", borderRadius: "12px", border: "1px solid var(--line)", borderLeft: "5px solid #522D80" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "19px", fontWeight: 700, color: "#522D80" }}>
                  79% Early Placement Success
                </h3>
                <p style={{ margin: 0, fontSize: "15.5px", lineHeight: "1.6" }}>
                  <strong>79% of Clemson students</strong> across all colleges report that they are hired for full-time employment or accepted to graduate programs before graduation.
                </p>
              </div>
            </div>

            <p style={{ fontSize: "16px", lineHeight: "1.65" }}>
              Clemson offers not only competitive academic programs but also a strong pipeline for employment after graduation.
            </p>
          </section>

          {/* Section 4: The Clemson Advantage */}
          <section className="doc-section" id="advantage" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num" style={{ color: "#F56600" }}>Part 4 of 4</span>
            <h2 style={{ color: "#522D80" }}>The Clemson Advantage</h2>

            <div className="rates-diff-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "24px" }}>
              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)", borderTop: "3px solid #F56600" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start", background: "color-mix(in srgb, #F56600 15%, transparent)", color: "#F56600" }}>
                    Advantage 01
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "#522D80" }}>Great Traditions & Student Life</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Clemson offers its students storied game day traditions, a plethora of student-led organizations, and direct access to outdoor recreation.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)", borderTop: "3px solid #522D80" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start", background: "color-mix(in srgb, #522D80 15%, transparent)", color: "#522D80" }}>
                    Advantage 02
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "#522D80" }}>Great Academics</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Clemson offers a broad selection of nationally ranked academic programs as well as a proven track record of preparing students for success after graduation.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)", borderTop: "3px solid #F56600" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start", background: "color-mix(in srgb, #F56600 15%, transparent)", color: "#F56600" }}>
                    Advantage 03
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "#522D80" }}>Great Outcomes</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Clemson students report high rates of success in finding internships, gainful employment, and networking opportunities after graduation.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: The Bottom Line */}
          <section className="doc-section" id="bottom-line" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num" style={{ color: "#F56600" }}>Conclusion</span>
            <h2 style={{ color: "#522D80" }}>The Bottom Line</h2>
            <p className="lead" style={{ fontSize: "18px", lineHeight: "1.65", fontWeight: 600, color: "var(--ink)", marginBottom: "20px" }}>
              Clemson offers its students the quintessential college experience without sacrificing the academics and career opportunities that lead to post grad success.
            </p>

            {/* Sources Attribution matching PDF */}
            <div style={{ margin: "32px 0 24px 0", padding: "16px 20px", background: "color-mix(in srgb, var(--line) 40%, transparent)", borderRadius: "10px", border: "1px solid var(--line)" }}>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--ink-soft)", fontStyle: "italic" }}>
                <strong>Sources:</strong> Clemson University, Clemson University Office of Institutional Research, Clemson Center for Career and Professional Development, U.S. News & World Report. <em>Reviewed as of Sept. 18, 2026.</em>
              </p>
            </div>

            {/* CTA Box */}
            <div
              style={{
                marginTop: "28px",
                padding: "28px",
                background: "linear-gradient(135deg, color-mix(in srgb, #F56600 12%, var(--card)) 0%, color-mix(in srgb, #522D80 12%, var(--card)) 100%)",
                borderRadius: "16px",
                border: "1px solid color-mix(in srgb, #F56600 30%, transparent)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: "20px", fontWeight: 700, color: "#522D80" }}>Planning Your Clemson Degree Funding?</h3>
              <p style={{ marginBottom: "20px", fontSize: "15.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                Use our free calculator to estimate your annual borrowing gap, check federal borrowing cap compliance, and model total degree costs.
              </p>
              <Link
                to="/chart-your-path"
                className="button-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", background: "#F56600" }}
              >
                Chart Your Path Now 🐾
                <ArrowRightIcon />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
