import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Tuition vs. Inflation: Which Has Grown More? — Grad Loan Navigator";
const DESCRIPTION =
  "As inflation occurs, the price of everything increases. Has the rise in higher education tuition outpaced inflation? A 1990–2026 data analysis by Jaylen Peng.";
const URL = "https://www.graduationnavigator.com/blog/tuition-vs-inflation-which-has-grown-more";

export const Route = createFileRoute(
  "/blog_/tuition-vs-inflation-which-has-grown-more"
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
  component: TuitionVsInflationArticlePage,
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

const DECADE_DATA = [
  { decade: "1990s", inflation: "31.8%", undergrad: "78.3%", grad: "87.8%" },
  { decade: "2000s", inflation: "26.6%", undergrad: "78.1%", grad: "78.2%" },
  { decade: "2010s", inflation: "18.7%", undergrad: "42.8%", grad: "31.5%" },
  { decade: "2020–2026", inflation: "27.8%", undergrad: "23.8%", grad: "17.9%" },
  { decade: "Total 1990–2026", inflation: "153.0%", undergrad: "461.5%", grad: "418.7%", isTotal: true },
];

function TuitionVsInflationArticlePage() {
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
          <div className="eyebrow">{t("tvi.eyebrow")}</div>
          <h1>{t("tvi.h1")}</h1>
          <p className="sub">{t("tvi.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("tvi.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("tvi.why.title")}</h4>
              <p>{t("tvi.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#by-the-numbers">{t("tvi.nav.numbers")}</a>
          <a href="#undergrad-vs-grad">{t("tvi.nav.comparison")}</a>
          <a href="#chart-section">{t("tvi.nav.chart")}</a>
          <a href="#what-this-means">{t("tvi.nav.meaning")}</a>
          <a href="#bottom-line">{t("tvi.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Stat Banner & By the Numbers */}
          <section className="doc-section" id="by-the-numbers">
            <div className="rates-callout-zoom">
              <div className="rates-callout-zoom-icon">
                <TrendingUpIcon />
              </div>
              <div className="rates-callout-zoom-content">
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700 }}>
                  By the numbers: Since 1990, inflation has increased 153.0%.
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "16px" }}>
                  <div style={{ padding: "16px", background: "var(--card)", borderRadius: "10px", border: "1px solid var(--line)" }}>
                    <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink)", fontWeight: 700 }}>
                      Undergraduate Tuition
                    </span>
                    <div style={{ fontSize: "26px", fontWeight: 800, color: "var(--ink)", marginTop: "4px" }}>
                      +461.5%
                    </div>
                  </div>

                  <div style={{ padding: "16px", background: "var(--card)", borderRadius: "10px", border: "1px solid var(--line)" }}>
                    <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--teal)", fontWeight: 700 }}>
                      Graduate Tuition
                    </span>
                    <div style={{ fontSize: "26px", fontWeight: 800, color: "var(--teal)", marginTop: "4px" }}>
                      +418.7%
                    </div>
                  </div>

                  <div style={{ padding: "16px", background: "var(--card)", borderRadius: "10px", border: "1px solid var(--line)" }}>
                    <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#D99B26", fontWeight: 700 }}>
                      Overall Inflation (CPI-U)
                    </span>
                    <div style={{ fontSize: "26px", fontWeight: 800, color: "#D99B26", marginTop: "4px" }}>
                      +153.0%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Short Answer Box */}
            <div
              style={{
                marginTop: "24px",
                padding: "20px 24px",
                background: "color-mix(in srgb, #D99B26 12%, var(--card))",
                borderRadius: "12px",
                borderLeft: "4px solid #D99B26",
              }}
            >
              <h4 style={{ margin: "0 0 6px 0", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--ink)" }}>
                The Short Answer
              </h4>
              <p style={{ margin: 0, fontSize: "16px", lineHeight: "1.6", fontWeight: 600 }}>
                Both undergraduate and graduate education is comparatively more expensive than 30+ years ago.
              </p>
            </div>
          </section>

          {/* Section 1: Undergraduate vs. Graduate */}
          <section className="doc-section" id="undergrad-vs-grad">
            <span className="section-num">{t("tvi.part1")}</span>
            <h2>Undergraduate vs. Graduate</h2>
            <p className="lead">
              Tuition for both degree levels have outpaced inflation. Tuition now costs more compared to overall consumer prices.
            </p>

            {/* Data Table */}
            <div className="roi-table-wrap">
              <table className="roi-table">
                <thead>
                  <tr>
                    <th>Decade</th>
                    <th style={{ textAlign: "right" }}>Total Inflation Increase</th>
                    <th style={{ textAlign: "right" }}>Total Undergrad Tuition Increase</th>
                    <th style={{ textAlign: "right" }}>Total Graduate Tuition Increase</th>
                  </tr>
                </thead>
                <tbody>
                  {DECADE_DATA.map((item) => (
                    <tr
                      key={item.decade}
                      style={{
                        background: item.isTotal ? "color-mix(in srgb, var(--teal) 12%, var(--card))" : undefined,
                        fontWeight: item.isTotal ? 700 : 500,
                      }}
                    >
                      <td className="roi-school-name">{item.decade}</td>
                      <td style={{ textAlign: "right" }} className="roi-mono">{item.inflation}</td>
                      <td style={{ textAlign: "right" }} className="roi-mono">{item.undergrad}</td>
                      <td style={{ textAlign: "right" }} className="roi-highlight">{item.grad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", fontStyle: "italic", marginTop: "8px" }}>
              Note: The 2026 tuition figures extend the 2010–2020 growth rates. The 2026 inflation figure uses available January–July CPI-U data.
            </p>

            {/* Key Bullets */}
            <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <CheckCircleIcon />
                <p style={{ margin: 0, fontSize: "16px", lineHeight: "1.6" }}>
                  <strong>Cumulative Growth Parity:</strong> The cumulative increase rate for undergraduate and graduate tuitions was similar from 1990 to 2020.
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <CheckCircleIcon />
                <p style={{ margin: 0, fontSize: "16px", lineHeight: "1.6" }}>
                  <strong>Undergraduate Pace:</strong> Undergraduate tuition is still rising faster than ever (+461.5% total increase since 1990).
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <CheckCircleIcon />
                <p style={{ margin: 0, fontSize: "16px", lineHeight: "1.6" }}>
                  <strong>Graduate Deceleration:</strong> However, the growth of graduate tuition has recently slowed down (17.9% in 2020–2026 vs. 23.8% for undergrad).
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Visual Chart */}
          <section className="doc-section" id="chart-section" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">Part 2 of 4</span>
            <h2>Cumulative Growth Comparison (1990–2026)</h2>

            {/* SVG Visual Chart Matching Original PDF */}
            <div
              style={{
                margin: "24px 0",
                padding: "28px",
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
              }}
            >
              {/* Chart Legend */}
              <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", marginBottom: "28px", fontSize: "14px", fontWeight: 700, alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="32" height="12" viewBox="0 0 32 12">
                    <line x1="0" y1="6" x2="32" y2="6" stroke="#1E293B" strokeWidth="3" />
                    <circle cx="16" cy="6" r="3.5" fill="#1E293B" />
                  </svg>
                  <span style={{ color: "#1E293B" }}>Undergraduate tuition</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="36" height="12" viewBox="0 0 36 12">
                    <line x1="0" y1="6" x2="36" y2="6" stroke="#059669" strokeWidth="3" strokeDasharray="6 4" />
                    <circle cx="18" cy="6" r="3.5" fill="#059669" />
                  </svg>
                  <span style={{ color: "#059669" }}>Graduate tuition</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="32" height="12" viewBox="0 0 32 12">
                    <line x1="0" y1="6" x2="32" y2="6" stroke="#D99B26" strokeWidth="3" />
                    <circle cx="16" cy="6" r="3.5" fill="#D99B26" />
                  </svg>
                  <span style={{ color: "#D99B26" }}>Inflation</span>
                </div>
              </div>

              {/* Chart Graphic */}
              <svg viewBox="0 0 620 340" style={{ width: "100%", height: "auto", overflow: "visible" }}>
                {/* Horizontal Grid lines (50% intervals from 0% to 500%) */}
                {[
                  { label: "500%", y: 20 },
                  { label: "450%", y: 44 },
                  { label: "400%", y: 68 },
                  { label: "350%", y: 92 },
                  { label: "300%", y: 116 },
                  { label: "250%", y: 140 },
                  { label: "200%", y: 164 },
                  { label: "150%", y: 188 },
                  { label: "100%", y: 212 },
                  { label: "50%", y: 236 },
                  { label: "0%", y: 260 },
                ].map((g) => (
                  <g key={g.label}>
                    <line x1="55" y1={g.y} x2="575" y2={g.y} stroke="#059669" strokeWidth="0.8" opacity="0.15" strokeDasharray={g.y === 260 ? undefined : "3 3"} />
                    <text x="45" y={g.y + 4} fontSize="11" fontWeight="600" fill="#059669" textAnchor="end">
                      {g.label}
                    </text>
                  </g>
                ))}

                {/* X Axis Labels */}
                <text x="60" y="285" fontSize="13" fontWeight="700" fill="#059669" textAnchor="middle">1990</text>
                <text x="193" y="285" fontSize="13" fontWeight="700" fill="#059669" textAnchor="middle">2000</text>
                <text x="327" y="285" fontSize="13" fontWeight="700" fill="#059669" textAnchor="middle">2010</text>
                <text x="460" y="285" fontSize="13" fontWeight="700" fill="#059669" textAnchor="middle">2020</text>
                <text x="540" y="285" fontSize="13" fontWeight="700" fill="#059669" textAnchor="middle">2026</text>

                {/* --- 1. Inflation Line (Gold/Ochre) --- */}
                <polyline
                  fill="none"
                  stroke="#D99B26"
                  strokeWidth="3.2"
                  points="60,260 193,244.7 327,227.9 460,212.96 540,186.56"
                />

                {/* --- 2. Graduate Tuition Line (Teal Dashed) --- */}
                <polyline
                  fill="none"
                  stroke="#059669"
                  strokeWidth="3.2"
                  strokeDasharray="6 4"
                  points="60,260 193,217.8 327,147.35 460,90.37 540,59.0"
                />

                {/* --- 3. Undergraduate Tuition Line (Navy Solid) --- */}
                <polyline
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="3.2"
                  points="60,260 193,222.4 327,155.5 460,96.75 540,38.5"
                />

                {/* Point Circles */}
                <circle cx="60" cy="260" r="4" fill="#1E293B" />
                <circle cx="193" cy="244.7" r="4" fill="#D99B26" />
                <circle cx="327" cy="227.9" r="4" fill="#D99B26" />
                <circle cx="460" cy="212.96" r="4" fill="#D99B26" />
                <circle cx="540" cy="186.56" r="4" fill="#D99B26" />

                <circle cx="193" cy="217.8" r="4" fill="#059669" />
                <circle cx="327" cy="147.35" r="4" fill="#059669" />
                <circle cx="460" cy="90.37" r="4" fill="#059669" />
                <circle cx="540" cy="59.0" r="4" fill="#059669" />

                <circle cx="193" cy="222.4" r="4" fill="#1E293B" />
                <circle cx="327" cy="155.5" r="4" fill="#1E293B" />
                <circle cx="460" cy="96.75" r="4" fill="#1E293B" />
                <circle cx="540" cy="38.5" r="4" fill="#1E293B" />

                {/* --- Data Badges with Solid Masking Rect Backgrounds --- */}
                {/* Year 2000 Badges */}
                <g transform="translate(193, 194)">
                  <rect x="-26" y="-9" width="52" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="0" y="1" fontSize="11" fontWeight="700" fill="#059669" textAnchor="middle" dominantBaseline="middle">87.8%</text>
                </g>
                <g transform="translate(193, 238)">
                  <rect x="-26" y="-9" width="52" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="0" y="1" fontSize="11" fontWeight="700" fill="#1E293B" textAnchor="middle" dominantBaseline="middle">78.3%</text>
                </g>
                <g transform="translate(193, 264)">
                  <rect x="-26" y="-9" width="52" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="0" y="1" fontSize="11" fontWeight="700" fill="#D99B26" textAnchor="middle" dominantBaseline="middle">31.8%</text>
                </g>

                {/* Year 2010 Badges */}
                <g transform="translate(327, 122)">
                  <rect x="-28" y="-9" width="56" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="0" y="1" fontSize="11" fontWeight="700" fill="#059669" textAnchor="middle" dominantBaseline="middle">234.7%</text>
                </g>
                <g transform="translate(327, 178)">
                  <rect x="-28" y="-9" width="56" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="0" y="1" fontSize="11" fontWeight="700" fill="#1E293B" textAnchor="middle" dominantBaseline="middle">217.6%</text>
                </g>
                <g transform="translate(327, 248)">
                  <rect x="-26" y="-9" width="52" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="0" y="1" fontSize="11" fontWeight="700" fill="#D99B26" textAnchor="middle" dominantBaseline="middle">66.9%</text>
                </g>

                {/* Year 2020 Badges */}
                <g transform="translate(460, 68)">
                  <rect x="-28" y="-9" width="56" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="0" y="1" fontSize="11" fontWeight="700" fill="#059669" textAnchor="middle" dominantBaseline="middle">353.4%</text>
                </g>
                <g transform="translate(460, 118)">
                  <rect x="-28" y="-9" width="56" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="0" y="1" fontSize="11" fontWeight="700" fill="#1E293B" textAnchor="middle" dominantBaseline="middle">340.1%</text>
                </g>
                <g transform="translate(460, 234)">
                  <rect x="-26" y="-9" width="52" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="0" y="1" fontSize="11" fontWeight="700" fill="#D99B26" textAnchor="middle" dominantBaseline="middle">98.0%</text>
                </g>

                {/* Year 2026 Badges */}
                <g transform="translate(540, 16)">
                  <rect x="-28" y="-9" width="56" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="0" y="1" fontSize="11" fontWeight="700" fill="#1E293B" textAnchor="middle" dominantBaseline="middle">461.5%</text>
                </g>
                <g transform="translate(540, 80)">
                  <rect x="-28" y="-9" width="56" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="0" y="1" fontSize="11" fontWeight="700" fill="#059669" textAnchor="middle" dominantBaseline="middle">418.7%</text>
                </g>
                <g transform="translate(540, 206)">
                  <rect x="-28" y="-9" width="56" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="0" y="1" fontSize="11" fontWeight="700" fill="#D99B26" textAnchor="middle" dominantBaseline="middle">153.0%</text>
                </g>
              </svg>

              <p style={{ fontSize: "13px", color: "var(--ink-soft)", fontStyle: "italic", marginTop: "16px", marginBottom: 0 }}>
                Note: The 2026 tuition figures extend the 2010–2020 growth rates. The 2026 inflation figure uses available January–July CPI-U data.
              </p>
            </div>
          </section>

          {/* Section 3: What Does This Mean? */}
          <section className="doc-section" id="what-this-means" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">Part 3 of 4</span>
            <h2>What Does This Mean?</h2>
            <p className="lead" style={{ fontSize: "17px", lineHeight: "1.65", marginBottom: "24px" }}>
              The rapid rise in AI is actively changing the job market. An advanced degree can make you stand out. If tuition is also becoming relatively cheaper, that means the value of a graduate degree could potentially increase. However, still consider:
            </p>

            <div className="rates-diff-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginTop: "24px" }}>
              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Consideration 01
                  </span>
                  <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>The Payoff</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Consider whether your specific program will allow you to recover your total financial investment within a reasonable timeframe.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Consideration 02
                  </span>
                  <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>Funding Packages</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Scholarships, financial aid, assistantships, and employer tuition reimbursement can dramatically alter the net cost calculation for you.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Consideration 03
                  </span>
                  <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>Debt Risk & Interest</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Interest accumulation can make the final amount you pay significantly more than base tuition costs, especially at 8%–9% federal rates.
                </p>
              </div>

              <div className="rates-diff-card" style={{ padding: "24px", borderRadius: "12px", background: "var(--card)", border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    Consideration 04
                  </span>
                  <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>Compare Alternatives</h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  Certificates, professional licenses, bootcamps, and other less expensive options can also boost your career without heavy borrowing.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: The Bottom Line */}
          <section className="doc-section" id="bottom-line" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">Part 4 of 4</span>
            <h2>The Bottom Line</h2>
            <p className="lead" style={{ fontSize: "18px", lineHeight: "1.65", fontWeight: 600, color: "var(--ink)", marginBottom: "20px" }}>
              Tuition has outpaced inflation, though graduate tuition growth has slowed. In an AI-driven economy, an advanced degree could mean more, but the margin for choosing the wrong program has narrowed.
            </p>

            {/* Sources Attribution matching PDF */}
            <div style={{ margin: "32px 0 24px 0", padding: "16px 20px", background: "color-mix(in srgb, var(--line) 40%, transparent)", borderRadius: "10px", border: "1px solid var(--line)" }}>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--ink-soft)", fontStyle: "italic" }}>
                <strong>Sources:</strong> National Center for Education Statistics, Bureau of Labor Statistics. <em>Reviewed as of Sept. 11, 2026.</em>
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
              <h3 style={{ marginTop: 0, fontSize: "20px", fontWeight: 700 }}>Evaluate Your Graduate Funding Needs</h3>
              <p style={{ marginBottom: "20px", fontSize: "15.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                Use our free college need calculator to estimate your annual funding gap, check federal borrowing cap compliance, and model total degree costs.
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
