import { useState, useId } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";
import type { TranslationKey } from "@/i18n/translations";

const TITLE = "When Should You Get a Master’s Degree? — Grad Loan Navigator";
const DESCRIPTION =
  "A master's degree can boost long-term career prospects and future earnings. But when is it not worth it? Age, opportunity cost, and payoff analysis by Jaylen Peng.";
const URL = "https://www.graduationnavigator.com/blog/when-to-get-masters-degree";

export const Route = createFileRoute("/blog_/when-to-get-masters-degree")({
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
  component: WhenToGetMastersDegreeArticlePage,
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

function ClockIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DollarSignIcon() {
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
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function UserIcon() {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/* ---------- Chart Data Structure ---------- */
interface MajorTrajectory {
  id: string;
  nameKey: TranslationKey;
  color: string;
  points: { age: number; years: number }[];
}

const MAJORS_DATA: MajorTrajectory[] = [
  {
    id: "business",
    nameKey: "wmd.major.business",
    color: "#162c44",
    points: [
      { age: 30, years: 11.5 },
      { age: 35, years: 12.7 },
      { age: 40, years: 13.3 },
      { age: 45, years: 13.6 },
      { age: 50, years: 13.6 },
      { age: 55, years: 13.4 },
      { age: 60, years: 12.7 },
    ],
  },
  {
    id: "nursing",
    nameKey: "wmd.major.nursing",
    color: "#cc8026",
    points: [
      { age: 30, years: 11.1 },
      { age: 35, years: 11.8 },
      { age: 40, years: 12.3 },
      { age: 45, years: 12.7 },
      { age: 50, years: 12.8 },
      { age: 55, years: 12.8 },
      { age: 60, years: 12.6 },
    ],
  },
  {
    id: "accounting",
    nameKey: "wmd.major.accounting",
    color: "#c6333b",
    points: [
      { age: 30, years: 11.5 },
      { age: 35, years: 12.7 },
      { age: 40, years: 13.3 },
      { age: 45, years: 13.6 },
      { age: 50, years: 13.7 },
      { age: 55, years: 13.4 },
      { age: 60, years: 12.7 },
    ],
  },
  {
    id: "specialEd",
    nameKey: "wmd.major.specialEd",
    color: "#739f31",
    points: [
      { age: 30, years: 8.7 },
      { age: 35, years: 9.0 },
      { age: 40, years: 9.3 },
      { age: 45, years: 9.5 },
      { age: 50, years: 9.5 },
      { age: 55, years: 9.5 },
      { age: 60, years: 9.2 },
    ],
  },
  {
    id: "teacherSubjects",
    nameKey: "wmd.major.teacherSubjects",
    color: "#1e8e9c",
    points: [
      { age: 30, years: 9.3 },
      { age: 35, years: 9.7 },
      { age: 40, years: 10.1 },
      { age: 45, years: 10.2 },
      { age: 50, years: 10.3 },
      { age: 55, years: 10.2 },
      { age: 60, years: 9.8 },
    ],
  },
  {
    id: "eduAdmin",
    nameKey: "wmd.major.eduAdmin",
    color: "#6e9b87",
    points: [
      { age: 30, years: 8.9 },
      { age: 35, years: 9.1 },
      { age: 40, years: 9.4 },
      { age: 45, years: 9.5 },
      { age: 50, years: 9.6 },
      { age: 55, years: 9.6 },
      { age: 60, years: 9.3 },
    ],
  },
  {
    id: "teacherLevels",
    nameKey: "wmd.major.teacherLevels",
    color: "#9476d8",
    points: [
      { age: 30, years: 8.6 },
      { age: 35, years: 8.9 },
      { age: 40, years: 9.2 },
      { age: 45, years: 9.4 },
      { age: 50, years: 9.4 },
      { age: 55, years: 9.4 },
      { age: 60, years: 9.1 },
    ],
  },
  {
    id: "studentCounseling",
    nameKey: "wmd.major.studentCounseling",
    color: "#4da3bb",
    points: [
      { age: 30, years: 8.8 },
      { age: 35, years: 9.1 },
      { age: 40, years: 9.4 },
      { age: 45, years: 9.6 },
      { age: 50, years: 9.6 },
      { age: 55, years: 9.6 },
      { age: 60, years: 9.3 },
    ],
  },
  {
    id: "psychology",
    nameKey: "wmd.major.psychology",
    color: "#cf6897",
    points: [
      { age: 30, years: 8.4 },
      { age: 35, years: 8.9 },
      { age: 40, years: 9.1 },
      { age: 45, years: 9.2 },
      { age: 50, years: 9.3 },
      { age: 55, years: 9.2 },
      { age: 60, years: 9.0 },
    ],
  },
  {
    id: "socialWork",
    nameKey: "wmd.major.socialWork",
    color: "#93969d",
    points: [
      { age: 30, years: 8.3 },
      { age: 35, years: 8.7 },
      { age: 40, years: 9.0 },
      { age: 45, years: 9.1 },
      { age: 50, years: 9.2 },
      { age: 55, years: 9.1 },
      { age: 60, years: 8.9 },
    ],
  },
];

/* Catmull-Rom to Cubic Bezier path generator */
function createSmoothPath(pts: { x: number; y: number }[]) {
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

function WhenToGetMastersDegreeArticlePage() {
  const { t, lang } = useI18n();
  const isEs = lang === "es";
  const [activeMajor, setActiveMajor] = useState<string | null>(null);
  const [hoveredAge, setHoveredAge] = useState<number | null>(null);

  /* SVG Coordinate Calculations */
  const viewBoxWidth = 780;
  const viewBoxHeight = 460;
  const marginLeft = 90;
  const marginRight = 35;
  const marginTop = 30;
  const marginBottom = 70;

  const plotWidth = viewBoxWidth - marginLeft - marginRight;
  const plotHeight = viewBoxHeight - marginTop - marginBottom;

  const xCoord = (age: number) => marginLeft + ((age - 30) / 30) * plotWidth;
  const yCoord = (years: number) => marginTop + ((14.0 - years) / 6.0) * plotHeight;

  const yTicks = [14.0, 13.5, 13.0, 12.5, 12.0, 11.5, 11.0, 10.5, 10.0, 9.5, 9.0, 8.5, 8.0];
  const xTicks = [30, 35, 40, 45, 50, 55, 60];

  const selectedMajorObj = MAJORS_DATA.find((m) => m.id === activeMajor);

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
          <div className="eyebrow">{t("wmd.eyebrow")}</div>
          <h1>{t("wmd.h1")}</h1>
          <p className="sub">{t("wmd.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("wmd.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("wmd.why.title")}</h4>
              <p>{t("wmd.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#payoff-horizon">{t("wmd.nav.payoff")}</a>
          <a href="#opportunity-cost">{t("wmd.nav.oppcost")}</a>
          <a href="#age-matters">{t("wmd.nav.age")}</a>
          <a href="#is-it-too-late">{t("wmd.nav.toolate")}</a>
          <a href="#the-bottom-line">{t("wmd.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-body">
          {/* Stat Callouts Grid */}
          <section className="doc-section" style={{ borderTop: "none", paddingTop: 0 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <UserIcon />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {t("wmd.stat.avgAge.label")}
                  </span>
                </div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--ink)", marginTop: "4px" }}>
                  {t("wmd.stat.avgAge")}
                </div>
                <div style={{ fontSize: "13px", color: "var(--ink-soft)", lineHeight: "1.4" }}>
                  {t("wmd.numbers.lead")}
                </div>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <ClockIcon />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {t("wmd.stat.over40.label")}
                  </span>
                </div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--teal)", marginTop: "4px" }}>
                  {t("wmd.stat.over40")}
                </div>
                <div style={{ fontSize: "13px", color: "var(--ink-soft)", lineHeight: "1.4" }}>
                  {isEs
                    ? "Casi 1 de cada 4 estudiantes de posgrado supera los 40 años."
                    : "Nearly 1 in 4 graduate students is over the age of 40."}
                </div>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <DollarSignIcon />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {t("wmd.stat.cost.label")}
                  </span>
                </div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--ink)", marginTop: "4px" }}>
                  {t("wmd.stat.cost")}
                </div>
                <div style={{ fontSize: "13px", color: "var(--ink-soft)", lineHeight: "1.4" }}>
                  {isEs
                    ? "Con una prima salarial promedio de $17,250 anuales."
                    : "Accompanied by a $17,250 annual post-grad wage premium."}
                </div>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <TrendingUpIcon />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {t("wmd.stat.payoff.label")}
                  </span>
                </div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--teal)", marginTop: "4px" }}>
                  {t("wmd.stat.payoff")}
                </div>
                <div style={{ fontSize: "13px", color: "var(--ink-soft)", lineHeight: "1.4" }}>
                  {isEs
                    ? "Recuperación directa antes de contabilizar el costo de oportunidad."
                    : "Direct recovery before accounting for foregone career earnings."}
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: How Long Will It Take You to Pay It Off? */}
          <section className="doc-section" id="payoff-horizon" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{t("wmd.part1")}</span>
            <h2>{t("wmd.payoff.h2")}</h2>
            <p className="lead">{t("wmd.payoff.p1")}</p>

            <div id="opportunity-cost" style={{ scrollMarginTop: "80px", marginTop: "32px" }}>
              <h3 style={{ fontSize: "19px", marginBottom: "12px", color: "var(--ink)" }}>
                {t("wmd.oppcost.lead")}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "16px",
                  marginTop: "16px",
                }}
              >
                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "color-mix(in srgb, var(--teal) 15%, transparent)",
                        color: "var(--teal)",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    >
                      1
                    </span>
                    <h4 style={{ margin: 0, fontSize: "16.5px", color: "var(--ink)" }}>
                      {t("wmd.oppcost.item1.title")}
                    </h4>
                  </div>
                  <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                    {t("wmd.oppcost.item1.desc")}
                  </p>
                </div>

                <div
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "color-mix(in srgb, var(--teal) 15%, transparent)",
                        color: "var(--teal)",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    >
                      2
                    </span>
                    <h4 style={{ margin: 0, fontSize: "16.5px", color: "var(--ink)" }}>
                      {t("wmd.oppcost.item2.title")}
                    </h4>
                  </div>
                  <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                    {t("wmd.oppcost.item2.desc")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: How Does Your Age Matter? (Chart Section) */}
          <section className="doc-section" id="age-matters" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{t("wmd.part2")}</span>
            <h2>{t("wmd.age.h2")}</h2>
            <p className="lead">{t("wmd.age.lead")}</p>

            {/* Visual SVG Chart Matching Original PDF */}
            <div
              style={{
                margin: "28px 0",
                padding: "28px 24px",
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
              }}
            >
              {/* Chart Title & Subtitle */}
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 6px 0", color: "var(--ink)" }}>
                  {t("wmd.age.chart.title")}
                </h3>
                <p style={{ fontSize: "12.5px", color: "var(--ink-soft)", margin: 0 }}>
                  {t("wmd.age.chart.filterPrompt")}
                </p>
              </div>

              {/* Interactive Legend (2 Rows matching the PDF) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "8px 12px",
                  marginBottom: "24px",
                  padding: "14px",
                  background: "var(--card-paper)",
                  borderRadius: "10px",
                  border: "1px solid var(--line)",
                }}
              >
                {MAJORS_DATA.map((major) => {
                  const isSelected = activeMajor === major.id;
                  const isDimmed = activeMajor !== null && !isSelected;

                  return (
                    <button
                      key={major.id}
                      type="button"
                      onClick={() => setActiveMajor(isSelected ? null : major.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: isSelected
                          ? "color-mix(in srgb, var(--teal) 12%, var(--card))"
                          : "transparent",
                        border: isSelected ? "1px solid var(--teal)" : "1px solid transparent",
                        borderRadius: "6px",
                        padding: "5px 8px",
                        cursor: "pointer",
                        opacity: isDimmed ? 0.35 : 1,
                        transition: "all 0.15s ease",
                        textAlign: "left",
                      }}
                      title={t(major.nameKey)}
                    >
                      <span
                        style={{
                          width: "22px",
                          height: "3.5px",
                          backgroundColor: major.color,
                          borderRadius: "2px",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: isSelected ? 700 : 500,
                          color: "var(--ink)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {t(major.nameKey)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Reset filter button if a major is selected */}
              {activeMajor && (
                <div style={{ marginBottom: "16px", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => setActiveMajor(null)}
                    style={{
                      fontSize: "12px",
                      background: "none",
                      border: "none",
                      color: "var(--teal)",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontWeight: 600,
                    }}
                  >
                    ← {t("wmd.age.chart.allMajors")}
                  </button>
                </div>
              )}

              {/* Responsive SVG Chart Graphic */}
              <div style={{ width: "100%", overflowX: "auto" }}>
                <svg
                  viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
                  style={{
                    width: "100%",
                    minWidth: "620px",
                    height: "auto",
                    overflow: "visible",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {/* Horizontal Gridlines & Y-axis Ticks (8 to 14 years) */}
                  {yTicks.map((val) => {
                    const y = yCoord(val);
                    return (
                      <g key={val}>
                        <line
                          x1={marginLeft}
                          y1={y}
                          x2={marginLeft + plotWidth}
                          y2={y}
                          stroke="#cbd5e1"
                          strokeWidth={val === 8.0 ? 1.5 : 0.75}
                          strokeDasharray={val === 8.0 ? undefined : "3 3"}
                          opacity={0.7}
                        />
                        <text
                          x={marginLeft - 10}
                          y={y + 4}
                          fontSize="10.5"
                          fontWeight={val % 1 === 0 ? "700" : "500"}
                          fill="var(--ink-soft)"
                          textAnchor="end"
                        >
                          {val % 1 === 0 ? `${val} years` : `${val.toFixed(1)} years`}
                        </text>
                      </g>
                    );
                  })}

                  {/* Left Y Axis Baseline Line */}
                  <line
                    x1={marginLeft}
                    y1={marginTop}
                    x2={marginLeft}
                    y2={marginTop + plotHeight}
                    stroke="#475569"
                    strokeWidth="1.2"
                  />

                  {/* Bottom X Axis Baseline Line */}
                  <line
                    x1={marginLeft}
                    y1={marginTop + plotHeight}
                    x2={marginLeft + plotWidth}
                    y2={marginTop + plotHeight}
                    stroke="#475569"
                    strokeWidth="1.2"
                  />

                  {/* Y Axis Title (Rotated) */}
                  <text
                    x={22}
                    y={marginTop + plotHeight / 2}
                    transform={`rotate(-90 22 ${marginTop + plotHeight / 2})`}
                    textAnchor="middle"
                    fontSize="12.5"
                    fontWeight="700"
                    fill="var(--ink)"
                  >
                    {t("wmd.age.chart.yAxis")}
                  </text>

                  {/* X Axis Ticks & Tick Labels (Age 30 to Age 60) */}
                  {xTicks.map((age) => {
                    const x = xCoord(age);
                    const isHovered = hoveredAge === age;
                    return (
                      <g key={age}>
                        <line
                          x1={x}
                          y1={marginTop + plotHeight}
                          x2={x}
                          y2={marginTop + plotHeight + 6}
                          stroke="#475569"
                          strokeWidth="1.2"
                        />
                        <text
                          x={x}
                          y={marginTop + plotHeight + 20}
                          fontSize="11.5"
                          fontWeight={isHovered ? "700" : "600"}
                          fill={isHovered ? "var(--teal)" : "var(--ink)"}
                          textAnchor="middle"
                        >
                          {`Age ${age}`}
                        </text>
                      </g>
                    );
                  })}

                  {/* X Axis Title */}
                  <text
                    x={marginLeft + plotWidth / 2}
                    y={marginTop + plotHeight + 48}
                    textAnchor="middle"
                    fontSize="12.5"
                    fontWeight="700"
                    fill="var(--ink)"
                  >
                    {t("wmd.age.chart.xAxis")}
                  </text>

                  {/* Major Line Curves */}
                  {MAJORS_DATA.map((major) => {
                    const isSelected = activeMajor === major.id;
                    const isDimmed = activeMajor !== null && !isSelected;

                    const screenPoints = major.points.map((pt) => ({
                      x: xCoord(pt.age),
                      y: yCoord(pt.years),
                    }));

                    const pathString = createSmoothPath(screenPoints);

                    return (
                      <g key={major.id} style={{ transition: "opacity 0.2s ease" }} opacity={isDimmed ? 0.15 : 1}>
                        {/* Glow / Stroke behind if selected */}
                        {isSelected && (
                          <path
                            d={pathString}
                            fill="none"
                            stroke={major.color}
                            strokeWidth="6"
                            opacity="0.3"
                          />
                        )}

                        {/* Main Line */}
                        <path
                          d={pathString}
                          fill="none"
                          stroke={major.color}
                          strokeWidth={isSelected ? 3.5 : 2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ cursor: "pointer" }}
                          onClick={() => setActiveMajor(isSelected ? null : major.id)}
                        />

                        {/* Data Point Circles */}
                        {screenPoints.map((pt, idx) => {
                          const dataPt = major.points[idx];
                          return (
                            <circle
                              key={idx}
                              cx={pt.x}
                              cy={pt.y}
                              r={isSelected ? 4.5 : 2.5}
                              fill={isSelected ? "#fff" : major.color}
                              stroke={major.color}
                              strokeWidth={isSelected ? 2.5 : 1}
                              style={{ cursor: "pointer" }}
                              onMouseEnter={() => setHoveredAge(dataPt.age)}
                              onMouseLeave={() => setHoveredAge(null)}
                              onClick={() => setActiveMajor(isSelected ? null : major.id)}
                            >
                              <title>{`${t(major.nameKey)} (Age ${dataPt.age}): ${dataPt.years} years`}</title>
                            </circle>
                          );
                        })}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Active Selection Details Card */}
              {selectedMajorObj && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "16px 20px",
                    background: "color-mix(in srgb, var(--teal) 8%, var(--card))",
                    border: "1px solid color-mix(in srgb, var(--teal) 30%, transparent)",
                    borderRadius: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        backgroundColor: selectedMajorObj.color,
                      }}
                    />
                    <strong style={{ fontSize: "15px", color: "var(--ink)" }}>
                      {t(selectedMajorObj.nameKey)}
                    </strong>
                  </div>
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "13px" }}>
                    {selectedMajorObj.points
                      .filter((p) => [30, 40, 50, 60].includes(p.age))
                      .map((p) => (
                        <span key={p.age} style={{ color: "var(--ink-soft)" }}>
                          <strong>Age {p.age}:</strong>{" "}
                          <span style={{ color: "var(--ink)", fontWeight: 700 }}>
                            {p.years} yrs
                          </span>
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Exact Formula / Caption Underneath the Chart Matching the PDF */}
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "1.6",
                  color: "var(--ink-soft)",
                  fontStyle: "italic",
                  marginTop: "16px",
                  marginBottom: 0,
                  borderTop: "1px solid var(--line)",
                  paddingTop: "12px",
                }}
              >
                {t("wmd.age.chart.formula")}
              </p>
            </div>

            {/* Cost and Benefit Callouts */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                marginTop: "28px",
              }}
            >
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <AlertTriangleIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", color: "var(--ink)" }}>
                    {t("wmd.age.cost.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {t("wmd.age.cost.p")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <TrendingUpIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", color: "var(--ink)" }}>
                    {t("wmd.age.benefit.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {t("wmd.age.benefit.p")}
                </p>
              </div>
            </div>

            {/* Comparative Payoff Timeline Table */}
            <div style={{ marginTop: "36px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "14px", color: "var(--ink)" }}>
                {t("wmd.table.title")}
              </h3>
              <div className="table-wrap" style={{ overflowX: "auto" }}>
                <table className="roi-table" style={{ width: "100%", textAlign: "left" }}>
                  <thead>
                    <tr>
                      <th style={{ width: "40%" }}>{t("wmd.table.colField")}</th>
                      <th style={{ textAlign: "right" }}>{t("wmd.table.colAge30")}</th>
                      <th style={{ textAlign: "right" }}>{t("wmd.table.colAge40")}</th>
                      <th style={{ textAlign: "right" }}>{t("wmd.table.colAge50")}</th>
                      <th style={{ textAlign: "right" }}>{t("wmd.table.colAge60")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MAJORS_DATA.map((major) => {
                      const age30 = major.points.find((p) => p.age === 30)?.years ?? "-";
                      const age40 = major.points.find((p) => p.age === 40)?.years ?? "-";
                      const age50 = major.points.find((p) => p.age === 50)?.years ?? "-";
                      const age60 = major.points.find((p) => p.age === 60)?.years ?? "-";
                      const isSelected = activeMajor === major.id;

                      return (
                        <tr
                          key={major.id}
                          onClick={() => setActiveMajor(isSelected ? null : major.id)}
                          style={{
                            cursor: "pointer",
                            background: isSelected
                              ? "color-mix(in srgb, var(--teal) 10%, var(--card))"
                              : undefined,
                          }}
                        >
                          <td className="roi-school-name" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: major.color,
                                flexShrink: 0,
                              }}
                            />
                            {t(major.nameKey)}
                          </td>
                          <td style={{ textAlign: "right" }} className="roi-mono">{age30} yrs</td>
                          <td style={{ textAlign: "right" }} className="roi-mono">{age40} yrs</td>
                          <td style={{ textAlign: "right" }} className="roi-highlight">{age50} yrs</td>
                          <td style={{ textAlign: "right" }} className="roi-mono">{age60} yrs</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 3: Is It Too Late? */}
          <section className="doc-section" id="is-it-too-late" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{t("wmd.part3")}</span>
            <h2>{t("wmd.toolate.h2")}</h2>
            <p className="lead">{t("wmd.toolate.lead")}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <CheckCircleIcon />
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", color: "var(--ink)" }}>
                    {t("wmd.toolate.c1.title")}
                  </h4>
                  <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                    {t("wmd.toolate.c1.desc")}
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <CheckCircleIcon />
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", color: "var(--ink)" }}>
                    {t("wmd.toolate.c2.title")}
                  </h4>
                  <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                    {t("wmd.toolate.c2.desc")}
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <CheckCircleIcon />
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", color: "var(--ink)" }}>
                    {t("wmd.toolate.c3.title")}
                  </h4>
                  <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                    {t("wmd.toolate.c3.desc")}
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <CheckCircleIcon />
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", color: "var(--ink)" }}>
                    {t("wmd.toolate.c4.title")}
                  </h4>
                  <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                    {t("wmd.toolate.c4.desc")}
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <CheckCircleIcon />
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", color: "var(--ink)" }}>
                    {t("wmd.toolate.c5.title")}
                  </h4>
                  <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                    {t("wmd.toolate.c5.desc")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: The Bottom Line */}
          <section className="doc-section" id="the-bottom-line" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{t("wmd.part4")}</span>
            <h2>{t("wmd.bottomline.h2")}</h2>
            <div
              style={{
                background: "color-mix(in srgb, var(--teal) 8%, var(--card))",
                border: "1px solid color-mix(in srgb, var(--teal) 25%, transparent)",
                borderRadius: "12px",
                padding: "24px 28px",
                marginBottom: "32px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "16.5px",
                  lineHeight: "1.65",
                  color: "var(--ink)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {t("wmd.bottomline.lead")}
              </p>
            </div>

            {/* Interactive Calculator CTA */}
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                alignItems: "flex-start",
                marginTop: "24px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "20px", color: "var(--ink)" }}>
                {t("wmd.cta.h2")}
              </h3>
              <p style={{ margin: 0, fontSize: "15px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                {t("wmd.cta.p")}
              </p>
              <Link
                to="/chart-your-path"
                className="nav-cta"
                style={{
                  marginTop: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                }}
              >
                {t("wmd.cta.btn")}
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Sources & Citations Box */}
            <div
              style={{
                marginTop: "36px",
                padding: "20px",
                background: "var(--card-paper)",
                borderRadius: "10px",
                border: "1px solid var(--line)",
                fontSize: "12px",
                color: "var(--ink-soft)",
                lineHeight: "1.6",
              }}
            >
              <strong style={{ color: "var(--ink)", display: "block", marginBottom: "4px" }}>
                {t("wmd.sources.label")}
              </strong>
              {t("wmd.sources.text")}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
