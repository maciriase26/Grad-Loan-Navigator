import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Ohio State: A National Leader in Graduate Study — Grad Loan Navigator";
const DESCRIPTION =
  "The Ohio State University offers 289 graduate degrees, $1.68B in research expenditures, top-ranked law and pharmacy programs, and generous graduate associateships. Analysis by Peter Foulke.";
const URL = "https://www.graduationnavigator.com/blog/ohio-state-national-leader-graduate-study";

export const Route = createFileRoute(
  "/blog_/ohio-state-national-leader-graduate-study"
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
  component: OhioStateArticlePage,
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
      stroke="#BA0C2F"
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

function AwardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#BA0C2F"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#BA0C2F"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#BA0C2F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="22.01" />
      <line x1="15" y1="22" x2="15" y2="22.01" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <line x1="9" y1="18" x2="9" y2="18.01" />
      <line x1="15" y1="18" x2="15" y2="18.01" />
    </svg>
  );
}

function BlockOLogo() {
  return (
    <svg
      viewBox="0 0 100 120"
      width="34"
      height="40"
      aria-label="Ohio State Block O"
      role="img"
    >
      {/* Outer Scarlet Hexagon/Octagon */}
      <polygon
        points="24,5 76,5 95,24 95,96 76,115 24,115 5,96 5,24"
        fill="#BA0C2F"
        stroke="#ffffff"
        strokeWidth="4"
      />
      {/* Inner White Cutout */}
      <polygon
        points="34,28 66,28 76,38 76,82 66,92 34,92 24,82 24,38"
        fill="#ffffff"
      />
      {/* Inner Gray Core */}
      <polygon
        points="37,32 63,32 71,40 71,80 63,88 37,88 29,80 29,40"
        fill="#666666"
      />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#BA0C2F"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#666666"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function ActivityHeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#BA0C2F"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.78L12 20.66l7.65-7.65.77-.78a5.4 5.4 0 0 0 0-7.65z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#BA0C2F"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
      <path d="M6 4h12v7a6 6 0 0 1-12 0V4z" />
    </svg>
  );
}

/* Research Expenditures Data from The Ohio State University / NSF HERD Survey */
const RESEARCH_DATA = [
  { year: "2016", amountNum: 818, label: "$818M", displayB: "$0.82B" },
  { year: "2017", amountNum: 864, label: "$864M", displayB: "$0.86B" },
  { year: "2018", amountNum: 875, label: "$875M", displayB: "$0.88B" },
  { year: "2019", amountNum: 929, label: "$929M", displayB: "$0.93B" },
  { year: "2020", amountNum: 968, label: "$968M", displayB: "$0.97B" },
  { year: "2021", amountNum: 1236, label: "$1.236B", displayB: "$1.24B" },
  { year: "2022", amountNum: 1360, label: "$1.36B", displayB: "$1.36B" },
  { year: "2023", amountNum: 1449, label: "$1.449B", displayB: "$1.45B" },
  { year: "2024", amountNum: 1580, label: "$1.58B", displayB: "$1.58B" },
  { year: "2025", amountNum: 1680, label: "$1.68B", displayB: "$1.68B" },
];

function OhioStateArticlePage() {
  const { t } = useI18n();

  return (
    <div className="osu-article-theme">
      <SiteHeader />

      <main>
        {/* Ohio State Scarlet Banner Header */}
        <div
          style={{
            background: "linear-gradient(90deg, #990024 0%, #BA0C2F 50%, #990024 100%)",
            color: "#ffffff",
            padding: "10px 20px",
            textAlign: "center",
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "0 2px 8px rgba(186, 12, 47, 0.25)",
          }}
        >
          {t("osu.banner")}
        </div>

        {/* Hero Section */}
        <section className="wrap doc-hero">
          <div className="article-back" style={{ marginBottom: "16px" }}>
            <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              ← {t("blog.h1")}
            </Link>
          </div>
          <div className="eyebrow" style={{ color: "#BA0C2F" }}>
            {t("osu.eyebrow")}
          </div>
          <h1 style={{ color: "#111827" }}>
            {t("osu.h1")}
          </h1>
          <p className="sub">
            {t("osu.sub")}
          </p>
          <div className="updated">
            <span className="dot" style={{ background: "#BA0C2F" }} />
            {t("osu.updated")}
          </div>

          {/* Academic Scope & Demographics Callout */}
          <div
            className="refi-hero-callout"
            style={{
              borderLeft: "4px solid #BA0C2F",
              background: "color-mix(in srgb, #BA0C2F 5%, var(--card))",
            }}
          >
            <div className="refi-hero-callout-icon" style={{ color: "#BA0C2F" }}>
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4 style={{ color: "#BA0C2F" }}>{t("osu.callout.title")}</h4>
              <p style={{ marginBottom: "10px" }}>{t("osu.callout.p")}</p>
              <h4 style={{ color: "#BA0C2F", marginTop: "12px" }}>{t("osu.demographics.title")}</h4>
              <p style={{ margin: 0 }}>{t("osu.demographics.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#recognized-programs">{t("osu.nav.programs")}</a>
          <a href="#research-growth">{t("osu.nav.research")}</a>
          <a href="#tuition-aid">{t("osu.nav.aid")}</a>
          <a href="#outside-classroom">{t("osu.nav.outside")}</a>
          <a href="#bottom-line">{t("osu.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: Nationally Recognized Programs */}
          <section className="doc-section" id="recognized-programs" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num" style={{ color: "#BA0C2F" }}>{t("osu.part1")}</span>
            <h2 style={{ color: "#111827" }}>{t("osu.programs.h2")}</h2>
            <p className="lead" style={{ fontSize: "17.5px", lineHeight: "1.65", marginBottom: "24px" }}>
              {t("osu.programs.lead")}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                gap: "20px",
                marginTop: "24px",
              }}
            >
              {/* Moritz Law School Card */}
              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid #BA0C2F",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <AwardIcon />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#BA0C2F",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Law School Excellence
                  </span>
                </div>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "20px", fontWeight: 700, color: "#111827" }}>
                  {t("osu.programs.law.title")}
                </h3>
                <div
                  style={{
                    display: "inline-block",
                    background: "color-mix(in srgb, #BA0C2F 10%, transparent)",
                    color: "#BA0C2F",
                    fontWeight: 700,
                    fontSize: "12.5px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    marginBottom: "12px",
                    alignSelf: "flex-start",
                  }}
                >
                  {t("osu.programs.law.rank")}
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("osu.programs.law.desc")}
                </p>
              </div>

              {/* College of Pharmacy Card */}
              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid #666666",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <TrendingUpIcon />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#666666",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Healthcare Leadership
                  </span>
                </div>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "20px", fontWeight: 700, color: "#111827" }}>
                  {t("osu.programs.pharm.title")}
                </h3>
                <div
                  style={{
                    display: "inline-block",
                    background: "color-mix(in srgb, #666666 12%, transparent)",
                    color: "#333333",
                    fontWeight: 700,
                    fontSize: "12.5px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    marginBottom: "12px",
                    alignSelf: "flex-start",
                  }}
                >
                  {t("osu.programs.pharm.rank")}
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("osu.programs.pharm.desc")}
                </p>
              </div>

              {/* Nuclear Engineering Card */}
              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid #BA0C2F",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <ShieldCheckIcon />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#BA0C2F",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Cutting-Edge STEM
                  </span>
                </div>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "20px", fontWeight: 700, color: "#111827" }}>
                  {t("osu.programs.nuclear.title")}
                </h3>
                <div
                  style={{
                    display: "inline-block",
                    background: "color-mix(in srgb, #BA0C2F 10%, transparent)",
                    color: "#BA0C2F",
                    fontWeight: 700,
                    fontSize: "12.5px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    marginBottom: "12px",
                    alignSelf: "flex-start",
                  }}
                >
                  {t("osu.programs.nuclear.rank")}
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("osu.programs.nuclear.desc")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Increased Investment in Research & Chart */}
          <section className="doc-section" id="research-growth" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num" style={{ color: "#BA0C2F" }}>{t("osu.part2")}</span>
            <h2 style={{ color: "#111827" }}>{t("osu.research.h2")}</h2>
            <p className="lead" style={{ fontSize: "17.5px", lineHeight: "1.65", marginBottom: "24px" }}>
              {t("osu.research.lead")}
            </p>

            {/* Ohio State Themed SVG Research Spending Growth Chart */}
            <div
              style={{
                margin: "24px 0",
                padding: "24px",
                background: "var(--card)",
                border: "2px solid color-mix(in srgb, #BA0C2F 25%, var(--line))",
                borderRadius: "16px",
                boxShadow: "0 6px 24px rgba(186, 12, 47, 0.08)",
              }}
            >
              {/* Header inside Chart Box (matching PDF banner style with Block O) */}
              <div
                style={{
                  background: "linear-gradient(135deg, #BA0C2F 0%, #8F0824 100%)",
                  color: "#ffffff",
                  padding: "16px 22px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 800, color: "#ffffff" }}>
                    {t("osu.research.chart.title")}
                  </h3>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "12px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      opacity: 0.9,
                    }}
                  >
                    {t("osu.research.chart.sub")}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BlockOLogo />
                </div>
              </div>

              {/* Bar Chart Graphic */}
              <div style={{ overflowX: "auto" }}>
                <svg
                  viewBox="0 0 760 350"
                  style={{ width: "100%", minWidth: "620px", height: "auto" }}
                  aria-label="Ohio State Research Spending Growth Bar Chart"
                >
                  {/* Grid Lines (from 0 to 2.0B at 0.2B / 0.4B increments) */}
                  {[
                    { val: 0, label: "0" },
                    { val: 400, label: "400M" },
                    { val: 800, label: "800M" },
                    { val: 1000, label: "1.0B" },
                    { val: 1200, label: "1.2B" },
                    { val: 1400, label: "1.4B" },
                    { val: 1600, label: "1.6B" },
                    { val: 1800, label: "1.8B" },
                    { val: 2000, label: "2.0B" },
                  ].map(({ val, label }) => {
                    const y = 280 - (val / 2000) * 230;
                    return (
                      <g key={val}>
                        <line
                          x1="75"
                          y1={y}
                          x2="735"
                          y2={y}
                          stroke="#cbd5e1"
                          strokeWidth="0.8"
                          strokeDasharray={val === 0 ? undefined : "4 4"}
                        />
                        <text
                          x="65"
                          y={y + 4}
                          fontSize="11"
                          fontWeight="600"
                          fill="#64748b"
                          textAnchor="end"
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Y-Axis Title */}
                  <text
                    x="24"
                    y="170"
                    fontSize="11"
                    fontWeight="700"
                    fill="#64748b"
                    textAnchor="middle"
                    transform="rotate(-90 24 170)"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    R&D Expenditures ($)
                  </text>

                  {/* Bars for 2016 to 2025 */}
                  {RESEARCH_DATA.map((d, index) => {
                    const x = 90 + index * 64;
                    const barHeight = (d.amountNum / 2000) * 230;
                    const y = 280 - barHeight;
                    const isLatest = index === RESEARCH_DATA.length - 1;

                    return (
                      <g key={d.year}>
                        {/* Bar Rect */}
                        <rect
                          x={x}
                          y={y}
                          width="44"
                          height={barHeight}
                          rx="4"
                          fill={isLatest ? "#BA0C2F" : "#990024"}
                          stroke={isLatest ? "#80001D" : "transparent"}
                          strokeWidth="1.5"
                        />
                        {/* Top Value Label */}
                        <text
                          x={x + 22}
                          y={y - 7}
                          fontSize="10.5"
                          fontWeight="800"
                          fill={isLatest ? "#BA0C2F" : "#1e293b"}
                          textAnchor="middle"
                        >
                          {d.label}
                        </text>
                        {/* X-Axis Year Label */}
                        <text
                          x={x + 22}
                          y="302"
                          fontSize="12.5"
                          fontWeight="700"
                          fill="#1e293b"
                          textAnchor="middle"
                        >
                          {d.year}
                        </text>
                      </g>
                    );
                  })}

                  {/* X-Axis Label */}
                  <text
                    x="410"
                    y="330"
                    fontSize="12"
                    fontWeight="700"
                    fill="#BA0C2F"
                    textAnchor="middle"
                    style={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
                  >
                    Fiscal Year
                  </text>
                </svg>
              </div>

              {/* Callout box under chart */}
              <div
                style={{
                  marginTop: "18px",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  background: "color-mix(in srgb, #BA0C2F 8%, transparent)",
                  borderLeft: "4px solid #BA0C2F",
                  fontSize: "14px",
                  lineHeight: "1.55",
                  color: "#111827",
                  fontWeight: 500,
                }}
              >
                {t("osu.research.callout")}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "16px",
                  paddingTop: "12px",
                  borderTop: "1px solid var(--line)",
                  fontSize: "12px",
                  color: "var(--ink-soft)",
                }}
              >
                <span style={{ fontWeight: 800, letterSpacing: "0.06em", color: "#BA0C2F" }}>
                  DISCIPLINE. DISCOVERY. LEADERSHIP.
                </span>
                <span style={{ fontStyle: "italic" }}>
                  {t("osu.research.chart.source")}
                </span>
              </div>
            </div>
          </section>

          {/* Section 3: Competitive Tuition and Aid */}
          <section className="doc-section" id="tuition-aid" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num" style={{ color: "#BA0C2F" }}>{t("osu.part3")}</span>
            <h2 style={{ color: "#111827" }}>{t("osu.aid.h2")}</h2>
            <p className="lead" style={{ fontSize: "17.5px", lineHeight: "1.65", marginBottom: "24px" }}>
              {t("osu.aid.lead")}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                margin: "24px 0",
              }}
            >
              {/* Stipend Pillar */}
              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid #BA0C2F",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: "color-mix(in srgb, #BA0C2F 10%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                  }}
                >
                  <DollarIcon />
                </div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "19px", fontWeight: 700, color: "#111827" }}>
                  {t("osu.aid.stipend.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("osu.aid.stipend.desc")}
                </p>
              </div>

              {/* Tuition Authorization Pillar */}
              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid #666666",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: "color-mix(in srgb, #666666 12%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                  }}
                >
                  <GraduationCapIcon />
                </div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "19px", fontWeight: 700, color: "#111827" }}>
                  {t("osu.aid.tuition.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("osu.aid.tuition.desc")}
                </p>
              </div>

              {/* Health Insurance Pillar */}
              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid #BA0C2F",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: "color-mix(in srgb, #BA0C2F 10%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                  }}
                >
                  <ActivityHeartIcon />
                </div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "19px", fontWeight: 700, color: "#111827" }}>
                  {t("osu.aid.health.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("osu.aid.health.desc")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Outside the Classroom */}
          <section className="doc-section" id="outside-classroom" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num" style={{ color: "#BA0C2F" }}>{t("osu.part4")}</span>
            <h2 style={{ color: "#111827" }}>{t("osu.outside.h2")}</h2>
            <p className="lead" style={{ fontSize: "17.5px", lineHeight: "1.65", marginBottom: "24px" }}>
              {t("osu.outside.lead")}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                marginTop: "24px",
              }}
            >
              {/* Fortune 500 Doors */}
              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid #BA0C2F",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <BuildingIcon />
                  <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 700, color: "#111827" }}>
                    {t("osu.outside.c1.title")}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("osu.outside.c1.desc")}
                </p>
              </div>

              {/* Gateway to the Midwest */}
              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid #666666",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700, color: "#111827" }}>
                  {t("osu.outside.c2.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("osu.outside.c2.desc")}
                </p>
              </div>

              {/* Cosmopolitan Columbus */}
              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid #BA0C2F",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700, color: "#111827" }}>
                  {t("osu.outside.c3.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("osu.outside.c3.desc")}
                </p>
              </div>

              {/* Game Day Atmosphere */}
              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid #666666",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <TrophyIcon />
                  <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 700, color: "#111827" }}>
                    {t("osu.outside.c4.title")}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("osu.outside.c4.desc")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: The Buckeye Bottom Line */}
          <section className="doc-section" id="bottom-line" style={{ scrollMarginTop: "80px" }}>
            <h2 style={{ color: "#111827" }}>{t("osu.bottomline.h2")}</h2>
            <blockquote
              style={{
                borderLeft: "4px solid #BA0C2F",
                padding: "20px 24px",
                background: "color-mix(in srgb, #BA0C2F 6%, var(--card))",
                borderRadius: "0 12px 12px 0",
                margin: "24px 0",
                fontSize: "17.5px",
                lineHeight: "1.65",
                fontStyle: "italic",
                color: "#111827",
              }}
            >
              "{t("osu.bottomline.quote")}"
            </blockquote>

            {/* Sources & Citations Box */}
            <div
              style={{
                marginTop: "32px",
                padding: "20px",
                background: "var(--card)",
                borderRadius: "12px",
                border: "1px solid var(--line)",
                fontSize: "13.5px",
                lineHeight: "1.6",
                color: "var(--ink-soft)",
              }}
            >
              <strong style={{ color: "#111827", display: "block", marginBottom: "6px" }}>
                {t("osu.sources.label")}
              </strong>
              {t("osu.sources.text")}
            </div>

            {/* Next Steps CTA */}
            <div
              style={{
                marginTop: "40px",
                padding: "28px 32px",
                background: "linear-gradient(135deg, color-mix(in srgb, #BA0C2F 10%, var(--card)) 0%, color-mix(in srgb, #666666 8%, var(--card)) 100%)",
                borderRadius: "16px",
                border: "1px solid color-mix(in srgb, #BA0C2F 25%, transparent)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#111827" }}>
                {t("osu.cta.h2")}
              </h3>
              <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                {t("osu.cta.p")}
              </p>
              <div>
                <Link
                  to="/chart-your-path"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#BA0C2F",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "14.5px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                  }}
                >
                  {t("osu.cta.btn")} →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
