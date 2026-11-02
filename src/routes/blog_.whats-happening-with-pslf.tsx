import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";
import type { TranslationKey } from "@/i18n/translations";

const TITLE = "What’s Happening with Public Service Loan Forgiveness (PSLF)? | Grad Navigator";
const DESCRIPTION =
  "Processing delays, payment tracker backlogs, and changing rules are creating uncertainty for public servants. Complete data analysis by Jaylen Peng & Carson Foulke.";
const URL = "https://www.graduationnavigator.com/blog/whats-happening-with-pslf";

export const Route = createFileRoute("/blog_/whats-happening-with-pslf")({
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: URL,
          author: [
            {
              "@type": "Person",
              name: "Jaylen Peng",
            },
            {
              "@type": "Person",
              name: "Carson Foulke",
            },
          ],
          publisher: {
            "@type": "Organization",
            name: "Grad Navigator",
            url: "https://www.graduationnavigator.com",
            logo: "https://www.graduationnavigator.com/regular-compass.png",
          },
          datePublished: "2026-10-24",
          dateModified: "2026-10-24",
        }),
      },
    ],
  }),
  component: WhatsHappeningWithPslfArticlePage,
});

/* ---------- Inline Icons ---------- */
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

function ClockIcon() {
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
      style={{ color: "var(--gold)" }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function InboxIcon() {
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
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      style={{ color: "var(--teal)", flexShrink: 0, marginTop: "2px" }}
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

function FileTextIcon() {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="28"
      height="28"
      style={{ color: "color-mix(in srgb, var(--teal) 35%, transparent)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );
}

/* ---------- Cumulative Forgiveness Historical Dataset ---------- */
interface CumulativeForgivenessPoint {
  year: number;
  cumulative: number;
  annualIncrease: number | null;
  pctIncrease: string | null;
  milestoneKey: TranslationKey;
}

const FORGIVENESS_DATA: CumulativeForgivenessPoint[] = [
  {
    year: 2018,
    cumulative: 48231,
    annualIncrease: null,
    pctIncrease: null,
    milestoneKey: "pslf.milestone.2018",
  },
  {
    year: 2019,
    cumulative: 49158,
    annualIncrease: 927,
    pctIncrease: "+1.9%",
    milestoneKey: "pslf.milestone.2019",
  },
  {
    year: 2020,
    cumulative: 67337,
    annualIncrease: 18179,
    pctIncrease: "+37.0%",
    milestoneKey: "pslf.milestone.2020",
  },
  {
    year: 2021,
    cumulative: 102910,
    annualIncrease: 35573,
    pctIncrease: "+52.8%",
    milestoneKey: "pslf.milestone.2021",
  },
  {
    year: 2022,
    cumulative: 308304,
    annualIncrease: 205394,
    pctIncrease: "+199.6%",
    milestoneKey: "pslf.milestone.2022",
  },
  {
    year: 2023,
    cumulative: 440691,
    annualIncrease: 132387,
    pctIncrease: "+42.9%",
    milestoneKey: "pslf.milestone.2023",
  },
  {
    year: 2024,
    cumulative: 980844,
    annualIncrease: 540153,
    pctIncrease: "+122.6%",
    milestoneKey: "pslf.milestone.2024",
  },
  {
    year: 2025,
    cumulative: 1197997,
    annualIncrease: 217153,
    pctIncrease: "+22.1%",
    milestoneKey: "pslf.milestone.2025",
  },
];

/* Smooth Catmull-Rom to Cubic Bezier curve generator */
function createSmoothSvgPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function WhatsHappeningWithPslfArticlePage() {
  const { t, lang } = useI18n();
  const [hoveredPoint, setHoveredPoint] = useState<CumulativeForgivenessPoint | null>(
    FORGIVENESS_DATA[FORGIVENESS_DATA.length - 1]
  );
  const [showTable, setShowTable] = useState(false);
  const [activeActionTab, setActiveActionTab] = useState<"tab1" | "tab2" | "tab3" | "tab4">("tab1");

  /* SVG Coordinates Calculation */
  const width = 800;
  const height = 400;
  const paddingLeft = 85;
  const paddingRight = 35;
  const paddingTop = 40;
  const paddingBottom = 60;

  const plotW = width - paddingLeft - paddingRight;
  const plotH = height - paddingTop - paddingBottom;

  const minYear = 2018;
  const maxYear = 2025;
  const maxCumulative = 1300000;

  const getX = (year: number) => paddingLeft + ((year - minYear) / (maxYear - minYear)) * plotW;
  const getY = (cumulative: number) => paddingTop + (1 - cumulative / maxCumulative) * plotH;

  const points = FORGIVENESS_DATA.map((d) => ({
    x: getX(d.year),
    y: getY(d.cumulative),
    data: d,
  }));

  const linePath = createSmoothSvgPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(paddingTop + plotH).toFixed(1)} L ${points[0].x.toFixed(1)} ${(paddingTop + plotH).toFixed(1)} Z`;

  const yTicks = [0, 300000, 600000, 900000, 1200000];

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
          <div className="eyebrow">{t("pslf.eyebrow")}</div>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 36px)", lineHeight: "1.25", marginBottom: "14px" }}>
            {t("pslf.h1")}
          </h1>
          <p className="sub" style={{ fontSize: "17px", lineHeight: "1.65", maxWidth: "760px", color: "var(--ink-soft)" }}>
            {t("pslf.sub")}
          </p>
          <div className="updated" style={{ marginTop: "16px", marginBottom: "28px" }}>
            <span className="dot" />
            {t("pslf.updated")}
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "14px",
              margin: "24px 0 32px",
            }}
          >
            <div
              style={{
                background: "var(--card)",
                padding: "16px 20px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
                borderTop: "3px solid var(--teal)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "var(--teal)",
                }}
              >
                {t("pslf.stat.cumulative")}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--ink-soft)",
                  marginTop: "4px",
                }}
              >
                {t("pslf.stat.cumulative.label")}
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                padding: "16px 20px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
                borderTop: "3px solid var(--gold)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                {t("pslf.stat.payments")}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--ink-soft)",
                  marginTop: "4px",
                }}
              >
                {t("pslf.stat.payments.label")}
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                padding: "16px 20px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
                borderTop: "3px solid #ef4444",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#ef4444",
                }}
              >
                {t("pslf.stat.delay")}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--ink-soft)",
                  marginTop: "4px",
                }}
              >
                {t("pslf.stat.delay.label")}
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                padding: "16px 20px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
                borderTop: "3px solid var(--ink-soft)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                {t("pslf.stat.response")}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--ink-soft)",
                  marginTop: "4px",
                }}
              >
                {t("pslf.stat.response.label")}
              </div>
            </div>
          </div>

          {/* Why it matters Hero Callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("pslf.alert.title")}</h4>
              <p>{t("pslf.alert.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#how-does-pslf-work">{t("pslf.nav.how")}</a>
          <a href="#whats-happening">{t("pslf.nav.delays")}</a>
          <a href="#why-it-matters">{t("pslf.nav.matters")}</a>
          <a href="#cumulative-forgiveness-chart">{t("pslf.nav.chart")}</a>
          <a href="#why-is-this-happening">{t("pslf.nav.why")}</a>
          <a href="#action-guide">{t("pslf.nav.action")}</a>
          <a href="#the-bottom-line">{t("pslf.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: How Does PSLF Work? */}
          <section className="doc-section" id="how-does-pslf-work">
            <span className="section-num">{t("pslf.part1")}</span>
            <h2>{t("pslf.how.h2")}</h2>
            <p className="lead" style={{ marginBottom: "20px" }}>
              {t("pslf.how.p1")}
            </p>
            <p style={{ fontSize: "15.5px", lineHeight: "1.75", color: "var(--ink-soft)", marginBottom: "24px" }}>
              {t("pslf.how.p2")}
            </p>

            {/* 4 Pillars Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  background: "var(--card)",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  borderLeft: "3px solid var(--teal)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <CheckCircleIcon />
                  <h4 style={{ margin: 0, fontSize: "15.5px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("pslf.req.emp.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {t("pslf.req.emp.desc")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  borderLeft: "3px solid var(--teal)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <CheckCircleIcon />
                  <h4 style={{ margin: 0, fontSize: "15.5px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("pslf.req.loans.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {t("pslf.req.loans.desc")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  borderLeft: "3px solid var(--gold)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <CheckCircleIcon />
                  <h4 style={{ margin: 0, fontSize: "15.5px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("pslf.req.pmt.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {t("pslf.req.pmt.desc")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  borderLeft: "3px solid var(--gold)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <CheckCircleIcon />
                  <h4 style={{ margin: 0, fontSize: "15.5px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("pslf.req.plan.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {t("pslf.req.plan.desc")}
                </p>
              </div>
            </div>

            {/* Department of Education Recommendation & Buyback Callout */}
            <div
              style={{
                background: "color-mix(in srgb, var(--card) 94%, var(--teal))",
                border: "1px solid color-mix(in srgb, var(--teal) 30%, transparent)",
                borderRadius: "8px",
                padding: "22px 24px",
                marginBottom: "28px",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                <FileTextIcon />
                <div>
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("pslf.how.cert.title")}
                  </h4>
                  <p style={{ margin: "4px 0 0", fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                    {t("pslf.how.cert.desc")}
                  </p>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "14px", marginTop: "14px" }}>
                <h4 style={{ margin: "0 0 4px", fontSize: "15.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {t("pslf.how.buyback.title")}
                </h4>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.65" }}>
                  {t("pslf.how.p3")}
                </p>
              </div>
            </div>

            {/* Companion Notice */}
            <div
              style={{
                background: "var(--card)",
                border: "1px dashed var(--line)",
                borderRadius: "8px",
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div style={{ maxWidth: "600px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--teal)",
                    background: "color-mix(in srgb, var(--teal) 12%, transparent)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {t("pslf.companion.badge")}
                </span>
                <p style={{ margin: "8px 0 0", fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: "1.5" }}>
                  {t("pslf.companion.desc")}
                </p>
              </div>
              <Link
                to="/blog"
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--ink)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {t("pslf.companion.link")}
              </Link>
            </div>
          </section>

          {/* Section 2: What’s Happening with PSLF? (Delays & Backlogs) */}
          <section className="doc-section" id="whats-happening">
            <span className="section-num">{t("pslf.part2")}</span>
            <h2>{t("pslf.delays.h2")}</h2>
            <p className="lead" style={{ marginBottom: "28px" }}>
              {t("pslf.delays.lead")}
            </p>

            {/* Two Side-by-Side Issue Cards as featured in original article */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px",
                marginBottom: "36px",
              }}
            >
              {/* Payment Tracker Delays */}
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "10px",
                  padding: "26px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid var(--gold)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <ClockIcon />
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-display)",
                      fontSize: "19px",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    {t("pslf.tracker.title")}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.7", color: "var(--ink-soft)" }}>
                  {t("pslf.tracker.desc")}
                </p>
              </div>

              {/* PSLF Buyback Backlogs */}
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "10px",
                  padding: "26px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid var(--teal)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <InboxIcon />
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-display)",
                      fontSize: "19px",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    {t("pslf.buyback.title")}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.7", color: "var(--ink-soft)" }}>
                  {t("pslf.buyback.desc")}
                </p>
              </div>
            </div>

            {/* Timeline Comparison Table */}
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 600,
                margin: "0 0 14px",
                color: "var(--ink)",
              }}
            >
              {t("pslf.delays.table.title")}
            </h3>
            <div className="roi-table-wrap" style={{ marginBottom: "32px" }}>
              <table className="roi-table">
                <thead>
                  <tr>
                    <th>{t("pslf.delays.table.colProcess")}</th>
                    <th>{t("pslf.delays.table.colExpected")}</th>
                    <th>{t("pslf.delays.table.colActual")}</th>
                    <th>{t("pslf.delays.table.colImpact")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600, color: "var(--ink)" }}>{t("pslf.delays.row1.process")}</td>
                    <td style={{ color: "var(--teal)", fontWeight: 600 }}>{t("pslf.delays.row1.expected")}</td>
                    <td style={{ color: "#ef4444", fontWeight: 700 }}>{t("pslf.delays.row1.actual")}</td>
                    <td style={{ fontSize: "13.5px", color: "var(--ink-soft)" }}>{t("pslf.delays.row1.impact")}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: "var(--ink)" }}>{t("pslf.delays.row2.process")}</td>
                    <td style={{ color: "var(--teal)", fontWeight: 600 }}>{t("pslf.delays.row2.expected")}</td>
                    <td style={{ color: "#ef4444", fontWeight: 700 }}>{t("pslf.delays.row2.actual")}</td>
                    <td style={{ fontSize: "13.5px", color: "var(--ink-soft)" }}>{t("pslf.delays.row2.impact")}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: "var(--ink)" }}>{t("pslf.delays.row3.process")}</td>
                    <td style={{ color: "var(--teal)", fontWeight: 600 }}>{t("pslf.delays.row3.expected")}</td>
                    <td style={{ color: "#ef4444", fontWeight: 700 }}>{t("pslf.delays.row3.actual")}</td>
                    <td style={{ fontSize: "13.5px", color: "var(--ink-soft)" }}>{t("pslf.delays.row3.impact")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Why It Matters (Borrower Stories & Human Impact) */}
          <section className="doc-section" id="why-it-matters">
            <span className="section-num">{t("pslf.part3")}</span>
            <h2>{t("pslf.matters.h2")}</h2>
            <p className="lead" style={{ marginBottom: "20px" }}>
              {t("pslf.matters.p1")}
            </p>
            <p style={{ fontSize: "15.5px", lineHeight: "1.75", color: "var(--ink-soft)", marginBottom: "32px" }}>
              {t("pslf.matters.p2")}
            </p>

            {/* Case Study Feature Box */}
            <div
              style={{
                background: "linear-gradient(135deg, var(--card) 0%, color-mix(in srgb, var(--card) 90%, var(--teal)) 100%)",
                border: "1px solid color-mix(in srgb, var(--teal) 24%, var(--line))",
                borderRadius: "12px",
                padding: "clamp(24px, 4vw, 36px)",
                marginBottom: "32px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--teal)",
                  background: "color-mix(in srgb, var(--teal) 12%, transparent)",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  marginBottom: "14px",
                }}
              >
                {t("pslf.matters.case.tag")}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  margin: "0 0 16px",
                }}
              >
                {t("pslf.matters.case.title")}
              </h3>

              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--ink-soft)", margin: "0 0 20px" }}>
                {t("pslf.matters.case.p1")}
              </p>

              {/* Quote 1 */}
              <div
                style={{
                  background: "var(--card)",
                  borderLeft: "4px solid var(--teal)",
                  borderRadius: "0 8px 8px 0",
                  padding: "16px 22px",
                  margin: "18px 0",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <QuoteIcon />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "17.5px",
                      fontStyle: "italic",
                      lineHeight: "1.5",
                      color: "var(--ink)",
                    }}
                  >
                    {t("pslf.matters.case.quote1")}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11.5px",
                      color: "var(--ink-soft)",
                      marginTop: "6px",
                    }}
                  >
                    — {t("pslf.matters.case.quote1.attr")}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--ink-soft)", margin: "20px 0 16px" }}>
                {t("pslf.matters.case.p2")}
              </p>

              {/* Quote 2 */}
              <div
                style={{
                  background: "var(--card)",
                  borderLeft: "4px solid #ef4444",
                  borderRadius: "0 8px 8px 0",
                  padding: "16px 22px",
                  margin: "18px 0 0",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <QuoteIcon />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "17.5px",
                      fontStyle: "italic",
                      lineHeight: "1.5",
                      color: "var(--ink)",
                    }}
                  >
                    {t("pslf.matters.case.quote2")}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11.5px",
                      color: "var(--ink-soft)",
                      marginTop: "6px",
                    }}
                  >
                    — {t("pslf.matters.case.quote2.attr")}
                  </div>
                </div>
              </div>
            </div>

            {/* Trap Callout */}
            <div className="callout" style={{ borderLeftColor: "var(--gold)" }}>
              <p>
                <strong>{t("pslf.matters.trap.title")}: </strong>
                {t("pslf.matters.trap.desc")}
              </p>
            </div>
          </section>

          {/* Section 4: Cumulative Forgiveness Surge (The Chart) */}
          <section className="doc-section" id="cumulative-forgiveness-chart">
            <span className="section-num">{t("pslf.part4")}</span>
            <h2>{t("pslf.chart.h2")}</h2>
            <p className="lead" style={{ marginBottom: "16px" }}>
              {t("pslf.chart.lead")}
            </p>

            {/* Key Growth Banner */}
            <div
              className="rates-callout-zoom"
              style={{
                marginBottom: "28px",
                background: "color-mix(in srgb, var(--card) 95%, var(--teal))",
                borderColor: "color-mix(in srgb, var(--teal) 28%, var(--line))",
              }}
            >
              <div className="rates-callout-zoom-icon">
                <TrendingUpIcon />
              </div>
              <div className="rates-callout-zoom-content">
                <p style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--ink)" }}>
                  {t("pslf.chart.growthNote")}
                </p>
              </div>
            </div>

            {/* Interactive SVG Chart Container */}
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                padding: "clamp(16px, 3vw, 28px)",
                marginBottom: "20px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "17.5px",
                      fontWeight: 700,
                      margin: 0,
                      color: "var(--ink)",
                    }}
                  >
                    {t("pslf.chart.legendLabel")}
                  </h3>
                  <span style={{ fontSize: "12px", color: "var(--ink-soft)" }}>
                    {t("pslf.chart.source")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTable((prev) => !prev)}
                  style={{
                    background: "var(--paper)",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    padding: "6px 14px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    cursor: "pointer",
                  }}
                >
                  {showTable ? t("pslf.chart.tableToggleHide") : t("pslf.chart.tableToggleShow")}
                </button>
              </div>

              {/* Chart SVG Canvas */}
              <div style={{ width: "100%", overflowX: "auto" }}>
                <svg
                  viewBox={`0 0 ${width} ${height}`}
                  style={{
                    width: "100%",
                    minWidth: "620px",
                    height: "auto",
                    display: "block",
                  }}
                  aria-label="Cumulative Federal Student Loans Forgiven from 2018 to 2025"
                  role="img"
                >
                  <defs>
                    <linearGradient id="pslfGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.32" />
                      <stop offset="60%" stopColor="var(--teal)" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="var(--teal)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {yTicks.map((tick) => {
                    const y = getY(tick);
                    return (
                      <g key={tick}>
                        <line
                          x1={paddingLeft}
                          y1={y}
                          x2={paddingLeft + plotW}
                          y2={y}
                          stroke="var(--line)"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                        />
                        <text
                          x={paddingLeft - 12}
                          y={y + 4}
                          textAnchor="end"
                          fontSize="11"
                          fontFamily="var(--font-mono)"
                          fill="var(--ink-soft)"
                        >
                          {tick >= 1000000
                            ? `${(tick / 1000000).toFixed(1)}M`
                            : tick > 0
                            ? `${tick / 1000}k`
                            : "0"}
                        </text>
                      </g>
                    );
                  })}

                  {/* Vertical Year Grid Lines */}
                  {FORGIVENESS_DATA.map((d) => {
                    const x = getX(d.year);
                    const isHovered = hoveredPoint?.year === d.year;
                    return (
                      <g key={d.year}>
                        <line
                          x1={x}
                          y1={paddingTop}
                          x2={x}
                          y2={paddingTop + plotH}
                          stroke={isHovered ? "var(--teal)" : "var(--line)"}
                          strokeWidth={isHovered ? 1.5 : 1}
                          strokeDasharray={isHovered ? undefined : "3 3"}
                          opacity={isHovered ? 0.6 : 0.4}
                        />
                        <text
                          x={x}
                          y={paddingTop + plotH + 24}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight={isHovered ? 700 : 500}
                          fontFamily="var(--font-mono)"
                          fill={isHovered ? "var(--teal)" : "var(--ink-soft)"}
                        >
                          {d.year}
                        </text>
                      </g>
                    );
                  })}

                  {/* Filled Area */}
                  <path d={areaPath} fill="url(#pslfGradient)" />

                  {/* Smooth Trend Line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="var(--teal)"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Points */}
                  {points.map((pt) => {
                    const isHovered = hoveredPoint?.year === pt.data.year;
                    return (
                      <g
                        key={pt.data.year}
                        style={{ cursor: "pointer" }}
                        onMouseEnter={() => setHoveredPoint(pt.data)}
                        onClick={() => setHoveredPoint(pt.data)}
                      >
                        {/* Hit target */}
                        <circle cx={pt.x} cy={pt.y} r={16} fill="transparent" />

                        {/* Outer halo */}
                        {isHovered && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={9}
                            fill="color-mix(in srgb, var(--teal) 25%, transparent)"
                          />
                        )}

                        {/* Data point */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? 5.5 : 4}
                          fill={isHovered ? "var(--teal)" : "var(--card)"}
                          stroke="var(--teal)"
                          strokeWidth={2.4}
                        />

                        {/* Value label */}
                        <text
                          x={pt.x}
                          y={pt.y - 12}
                          textAnchor="middle"
                          fontSize="11.5"
                          fontWeight={700}
                          fontFamily="var(--font-mono)"
                          fill={isHovered ? "var(--teal)" : "var(--ink)"}
                        >
                          {pt.data.cumulative.toLocaleString()}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Active Point Detail Card */}
              {hoveredPoint && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "16px 20px",
                    background: "var(--paper)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "14px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--teal)",
                      }}
                    >
                      {hoveredPoint.year} Snapshot:
                    </span>{" "}
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>
                      {hoveredPoint.cumulative.toLocaleString()} loans discharged
                    </span>{" "}
                    {hoveredPoint.pctIncrease && (
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "var(--teal)",
                          marginLeft: "6px",
                        }}
                      >
                        ({hoveredPoint.pctIncrease} YoY)
                      </span>
                    )}
                    <div style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "4px" }}>
                      {t(hoveredPoint.milestoneKey)}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--ink-soft)",
                    }}
                  >
                    Click any point to inspect
                  </span>
                </div>
              )}

              {/* Accessible Data Table (Collapsible) */}
              {showTable && (
                <div className="roi-table-wrap" style={{ marginTop: "24px" }}>
                  <table className="roi-table">
                    <thead>
                      <tr>
                        <th>{t("pslf.chart.colYear")}</th>
                        <th>{t("pslf.chart.colCumulative")}</th>
                        <th>{t("pslf.chart.colAnnualChange")}</th>
                        <th>{t("pslf.chart.colMilestone")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FORGIVENESS_DATA.map((row) => (
                        <tr key={row.year}>
                          <td style={{ fontWeight: 700, fontFamily: "var(--font-mono)" }}>{row.year}</td>
                          <td style={{ fontWeight: 700, color: "var(--teal)" }}>
                            {row.cumulative.toLocaleString()}
                          </td>
                          <td style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                            {row.annualIncrease ? `+${row.annualIncrease.toLocaleString()}` : "—"}{" "}
                            {row.pctIncrease && (
                              <span style={{ color: "var(--teal)", fontWeight: 600 }}>({row.pctIncrease})</span>
                            )}
                          </td>
                          <td style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
                            {t(row.milestoneKey)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* Section 5: Why Is This Happening? (Administration Restructuring & Delays) */}
          <section className="doc-section" id="why-is-this-happening">
            <span className="section-num">{t("pslf.part5")}</span>
            <h2>{t("pslf.why.h2")}</h2>
            <p className="lead" style={{ marginBottom: "28px" }}>
              {t("pslf.why.lead")}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px",
                marginBottom: "32px",
              }}
            >
              {/* Biden Era Card */}
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "10px",
                  padding: "24px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid var(--teal)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--teal)",
                    background: "color-mix(in srgb, var(--teal) 12%, transparent)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {t("pslf.why.biden.tag")}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "18.5px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    margin: "12px 0 10px",
                  }}
                >
                  {t("pslf.why.biden.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.7", color: "var(--ink-soft)" }}>
                  {t("pslf.why.biden.desc")}
                </p>
              </div>

              {/* Trump Era Card */}
              <div
                style={{
                  background: "var(--card)",
                  borderRadius: "10px",
                  padding: "24px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid #ef4444",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#ef4444",
                    background: "color-mix(in srgb, #ef4444 12%, transparent)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {t("pslf.why.trump.tag")}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "18.5px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    margin: "12px 0 10px",
                  }}
                >
                  {t("pslf.why.trump.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.7", color: "var(--ink-soft)" }}>
                  {t("pslf.why.trump.desc")}
                </p>
              </div>
            </div>

            {/* Department of Education No-Response Notice */}
            <div
              style={{
                background: "color-mix(in srgb, var(--paper) 70%, var(--card))",
                border: "1px dashed var(--line)",
                borderRadius: "8px",
                padding: "16px 20px",
                fontSize: "13.5px",
                fontStyle: "italic",
                color: "var(--ink-soft)",
                marginBottom: "32px",
              }}
            >
              {t("pslf.why.noresponse")}
            </div>
          </section>

          {/* Section 6: Action Guide & Interactive Self-Check */}
          <section className="doc-section" id="action-guide">
            <span className="section-num">{t("pslf.part6")}</span>
            <h2>{t("pslf.action.h2")}</h2>
            <p className="lead" style={{ marginBottom: "24px" }}>
              {t("pslf.action.lead")}
            </p>

            <div
              style={{
                background: "var(--card)",
                borderRadius: "12px",
                border: "1px solid var(--line)",
                overflow: "hidden",
                marginBottom: "36px",
              }}
            >
              {/* Scenario Tab Buttons */}
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid var(--line)",
                  background: "var(--paper)",
                  overflowX: "auto",
                }}
              >
                {(
                  [
                    { id: "tab1", labelKey: "pslf.action.tab1" },
                    { id: "tab2", labelKey: "pslf.action.tab2" },
                    { id: "tab3", labelKey: "pslf.action.tab3" },
                    { id: "tab4", labelKey: "pslf.action.tab4" },
                  ] as const
                ).map((tab) => {
                  const isActive = activeActionTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveActionTab(tab.id)}
                      style={{
                        flex: "1 0 auto",
                        padding: "14px 18px",
                        fontSize: "13.5px",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "var(--teal)" : "var(--ink-soft)",
                        background: isActive ? "var(--card)" : "transparent",
                        border: "none",
                        borderBottom: isActive ? "3px solid var(--teal)" : "3px solid transparent",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {t(tab.labelKey)}
                    </button>
                  );
                })}
              </div>

              {/* Scenario Tab Content */}
              <div style={{ padding: "clamp(20px, 3.5vw, 32px)" }}>
                {activeActionTab === "tab1" && (
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        fontWeight: 700,
                        margin: "0 0 8px",
                        color: "var(--ink)",
                      }}
                    >
                      {t("pslf.action.tab1.title")}
                    </h3>
                    <p style={{ fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6", margin: "0 0 20px" }}>
                      {t("pslf.action.tab1.desc")}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <CheckCircleIcon />
                        <span style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink)" }}>
                          {t("pslf.action.tab1.step1")}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <CheckCircleIcon />
                        <span style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink)" }}>
                          {t("pslf.action.tab1.step2")}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <CheckCircleIcon />
                        <span style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink)" }}>
                          {t("pslf.action.tab1.step3")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeActionTab === "tab2" && (
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        fontWeight: 700,
                        margin: "0 0 8px",
                        color: "var(--ink)",
                      }}
                    >
                      {t("pslf.action.tab2.title")}
                    </h3>
                    <p style={{ fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6", margin: "0 0 20px" }}>
                      {t("pslf.action.tab2.desc")}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <CheckCircleIcon />
                        <span style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink)" }}>
                          {t("pslf.action.tab2.step1")}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <CheckCircleIcon />
                        <span style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink)" }}>
                          {t("pslf.action.tab2.step2")}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <CheckCircleIcon />
                        <span style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink)" }}>
                          {t("pslf.action.tab2.step3")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeActionTab === "tab3" && (
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        fontWeight: 700,
                        margin: "0 0 8px",
                        color: "var(--ink)",
                      }}
                    >
                      {t("pslf.action.tab3.title")}
                    </h3>
                    <p style={{ fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6", margin: "0 0 20px" }}>
                      {t("pslf.action.tab3.desc")}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <CheckCircleIcon />
                        <span style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink)" }}>
                          {t("pslf.action.tab3.step1")}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <CheckCircleIcon />
                        <span style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink)" }}>
                          {t("pslf.action.tab3.step2")}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <CheckCircleIcon />
                        <span style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink)" }}>
                          {t("pslf.action.tab3.step3")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeActionTab === "tab4" && (
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "18px",
                        fontWeight: 700,
                        margin: "0 0 8px",
                        color: "var(--ink)",
                      }}
                    >
                      {t("pslf.action.tab4.title")}
                    </h3>
                    <p style={{ fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6", margin: "0 0 20px" }}>
                      {t("pslf.action.tab4.desc")}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <CheckCircleIcon />
                        <span style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink)" }}>
                          {t("pslf.action.tab4.step1")}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <CheckCircleIcon />
                        <span style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink)" }}>
                          {t("pslf.action.tab4.step2")}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <CheckCircleIcon />
                        <span style={{ fontSize: "14px", lineHeight: "1.55", color: "var(--ink)" }}>
                          {t("pslf.action.tab4.step3")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 7: The Bottom Line */}
          <section className="doc-section" id="the-bottom-line">
            <span className="section-num">{t("pslf.part7")}</span>
            <h2>{t("pslf.bottomline.h2")}</h2>
            <p className="lead" style={{ marginBottom: "20px" }}>
              {t("pslf.bottomline.lead")}
            </p>

            <div
              style={{
                background: "color-mix(in srgb, var(--card) 95%, var(--gold))",
                border: "1px solid var(--line)",
                borderLeft: "4px solid var(--gold)",
                borderRadius: "8px",
                padding: "22px 26px",
                marginBottom: "36px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: "1.75",
                  fontWeight: 500,
                  color: "var(--ink)",
                }}
              >
                {t("pslf.bottomline.box")}
              </p>
            </div>

            {/* Sources & Methodology Block */}
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                padding: "20px 24px",
                marginBottom: "40px",
              }}
            >
              <h4
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--teal)",
                  margin: "0 0 8px",
                }}
              >
                {t("pslf.sources.title")}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  lineHeight: "1.6",
                  color: "var(--ink-soft)",
                }}
              >
                {t("pslf.sources.text")}
              </p>
            </div>

            {/* Bottom CTA Banner */}
            <div className="cta-strip">
              <div>
                <h2>{t("pslf.cta.h2")}</h2>
                <p>{t("pslf.cta.p")}</p>
              </div>
              <Link to="/chart-your-path" className="btn-primary">
                {t("pslf.cta.btn")}
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
