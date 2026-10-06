import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "The FAFSA Explained — Grad Loan Navigator";
const DESCRIPTION =
  "How the Student Aid Index (SAI) works, Pell Grant eligibility thresholds, federal loan caps, and who still misses out. Analysis by Carson Jung.";
const URL = "https://www.graduationnavigator.com/blog/fafsa-explained";

export const Route = createFileRoute("/blog_/fafsa-explained")({
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
  component: FafsaExplainedArticlePage,
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

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
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

/* ---------- Demographic Breakdown Data ---------- */
const DEMOGRAPHIC_DATA = [
  {
    groupEn: "Black Students",
    groupEs: "Estudiantes Afroamericanos",
    pct: "59.5%",
    num: 59.5,
    color: "var(--teal)",
  },
  {
    groupEn: "Hispanic Students",
    groupEs: "Estudiantes Hispanos",
    pct: "49.5%",
    num: 49.5,
    color: "var(--gold)",
  },
  {
    groupEn: "Asian Students",
    groupEs: "Estudiantes Asiáticos",
    pct: "33.7%",
    num: 33.7,
    color: "var(--ink-soft)",
  },
  {
    groupEn: "White Students",
    groupEs: "Estudiantes Blancos",
    pct: "32.1%",
    num: 32.1,
    color: "var(--ink-soft)",
  },
];

function FafsaExplainedArticlePage() {
  const { t, lang } = useI18n();
  const isEs = lang === "es";

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
          <div className="eyebrow">{t("fexp.eyebrow")}</div>
          <h1>{t("fexp.h1")}</h1>
          <p className="sub">{t("fexp.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("fexp.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("fexp.why.title")}</h4>
              <p>{t("fexp.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#what-is-fafsa">{t("fexp.nav.what")}</a>
          <a href="#who-qualifies">{t("fexp.nav.who")}</a>
          <a href="#how-formula-works">{t("fexp.nav.formula")}</a>
          <a href="#who-misses-out">{t("fexp.nav.misses")}</a>
          <a href="#where-to-apply">{t("fexp.nav.apply")}</a>
          <a href="#bottom-line">{t("fexp.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: What Is The FAFSA */}
          <section className="doc-section" id="what-is-fafsa">
            <span className="section-num">{t("fexp.part1")}</span>
            <h2>{t("fexp.what.h2")}</h2>
            <p className="lead">{t("fexp.what.lead")}</p>

            <div
              className="grid-2-col"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                marginTop: "24px",
              }}
            >
              <div
                style={{
                  background: "var(--card)",
                  padding: "22px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}
                >
                  <CheckCircleIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("fexp.what.point1.title")}
                  </h4>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("fexp.what.point1.text")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "22px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}
                >
                  <CheckCircleIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("fexp.what.point2.title")}
                  </h4>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("fexp.what.point2.text")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "22px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}
                >
                  <CheckCircleIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("fexp.what.point3.title")}
                  </h4>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("fexp.what.point3.text")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "22px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}
                >
                  <CheckCircleIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("fexp.what.point4.title")}
                  </h4>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("fexp.what.point4.text")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Who Qualifies */}
          <section className="doc-section" id="who-qualifies">
            <span className="section-num">{t("fexp.part2")}</span>
            <h2>{t("fexp.who.h2")}</h2>
            <p className="lead">{t("fexp.who.lead")}</p>

            {/* Key Stat Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
                marginTop: "24px",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  background: "var(--card)",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "var(--teal)",
                    lineHeight: "1.1",
                  }}
                >
                  {t("fexp.who.stat1.num")}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginTop: "6px",
                  }}
                >
                  {t("fexp.who.stat1.label")}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--ink-soft)",
                    marginTop: "4px",
                    lineHeight: "1.5",
                    margin: 0,
                  }}
                >
                  {t("fexp.who.stat1.sub")}
                </p>
              </div>

              <div
                style={{
                  padding: "20px",
                  background: "var(--card)",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "var(--ink)",
                    lineHeight: "1.1",
                  }}
                >
                  {t("fexp.who.stat2.num")}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginTop: "6px",
                  }}
                >
                  {t("fexp.who.stat2.label")}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--ink-soft)",
                    marginTop: "4px",
                    lineHeight: "1.5",
                    margin: 0,
                  }}
                >
                  {t("fexp.who.stat2.sub")}
                </p>
              </div>

              <div
                style={{
                  padding: "20px",
                  background: "var(--card)",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "var(--gold)",
                    lineHeight: "1.1",
                  }}
                >
                  {t("fexp.who.stat3.num")}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginTop: "6px",
                  }}
                >
                  {t("fexp.who.stat3.label")}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--ink-soft)",
                    marginTop: "4px",
                    lineHeight: "1.5",
                    margin: 0,
                  }}
                >
                  {t("fexp.who.stat3.sub")}
                </p>
              </div>
            </div>

            {/* Racial & Income Demographics Visual */}
            <div
              style={{
                marginTop: "32px",
                background: "var(--card)",
                padding: "24px",
                borderRadius: "14px",
                border: "1px solid var(--line)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                {t("fexp.who.race.title")}
              </h4>
              <p style={{ margin: "0 0 18px 0", fontSize: "14.5px", color: "var(--ink-soft)" }}>
                {t("fexp.who.race.p")}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {DEMOGRAPHIC_DATA.map((item) => (
                  <div key={item.groupEn}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "14px",
                        fontWeight: 600,
                        marginBottom: "5px",
                      }}
                    >
                      <span>{isEs ? item.groupEs : item.groupEn}</span>
                      <span
                        style={{
                          color: item.color,
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                        }}
                      >
                        {item.pct}
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "8px",
                        background: "color-mix(in srgb, var(--line) 60%, transparent)",
                        borderRadius: "999px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${item.num}%`,
                          height: "100%",
                          background: item.color,
                          borderRadius: "999px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* By The Numbers Zoom Card */}
            <div className="rates-callout-zoom" style={{ marginTop: "32px" }}>
              <div className="rates-callout-zoom-icon">
                <TrendingUpIcon />
              </div>
              <div className="rates-callout-zoom-content">
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700 }}>
                  {t("fexp.numbers.h3")}
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                    gap: "14px",
                    marginTop: "16px",
                  }}
                >
                  <div
                    style={{
                      padding: "16px",
                      background: "var(--card)",
                      borderRadius: "10px",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11.5px",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: "var(--ink-soft)",
                        fontWeight: 700,
                      }}
                    >
                      {t("fexp.numbers.avgTotal.label")}
                    </span>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: 800,
                        color: "var(--ink)",
                        marginTop: "4px",
                      }}
                    >
                      {t("fexp.numbers.avgTotal")}
                    </div>
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: "12px",
                        color: "var(--ink-soft)",
                        lineHeight: "1.4",
                      }}
                    >
                      {t("fexp.numbers.avgTotal.sub")}
                    </p>
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      background: "var(--card)",
                      borderRadius: "10px",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11.5px",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: "var(--teal)",
                        fontWeight: 700,
                      }}
                    >
                      {t("fexp.numbers.maxPell.label")}
                    </span>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: 800,
                        color: "var(--teal)",
                        marginTop: "4px",
                      }}
                    >
                      {t("fexp.numbers.maxPell")}
                    </div>
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: "12px",
                        color: "var(--ink-soft)",
                        lineHeight: "1.4",
                      }}
                    >
                      {t("fexp.numbers.maxPell.sub")}
                    </p>
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      background: "var(--card)",
                      borderRadius: "10px",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11.5px",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: "var(--ink)",
                        fontWeight: 700,
                      }}
                    >
                      {t("fexp.numbers.avgPell.label")}
                    </span>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: 800,
                        color: "var(--ink)",
                        marginTop: "4px",
                      }}
                    >
                      {t("fexp.numbers.avgPell")}
                    </div>
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: "12px",
                        color: "var(--ink-soft)",
                        lineHeight: "1.4",
                      }}
                    >
                      {t("fexp.numbers.avgPell.sub")}
                    </p>
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      background: "var(--card)",
                      borderRadius: "10px",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11.5px",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: "var(--ink-soft)",
                        fontWeight: 700,
                      }}
                    >
                      {t("fexp.numbers.minPell.label")}
                    </span>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: 800,
                        color: "var(--ink)",
                        marginTop: "4px",
                      }}
                    >
                      {t("fexp.numbers.minPell")}
                    </div>
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: "12px",
                        color: "var(--ink-soft)",
                        lineHeight: "1.4",
                      }}
                    >
                      {t("fexp.numbers.minPell.sub")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: How The Formula Works */}
          <section className="doc-section" id="how-formula-works">
            <span className="section-num">{t("fexp.part3")}</span>
            <h2>{t("fexp.formula.h2")}</h2>
            <p className="lead">{t("fexp.formula.lead")}</p>

            {/* Formula Equation Highlight Box */}
            <div
              style={{
                marginTop: "24px",
                padding: "24px 28px",
                background: "color-mix(in srgb, var(--teal) 10%, var(--card))",
                borderRadius: "14px",
                border: "1px solid color-mix(in srgb, var(--teal) 25%, transparent)",
                borderLeft: "5px solid var(--teal)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--teal)",
                  fontWeight: 800,
                  marginBottom: "6px",
                }}
              >
                {t("fexp.formula.box.title")}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(16px, 2.6vw, 20px)",
                  fontWeight: 700,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("fexp.formula.box.calc")}
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "28px" }}
            >
              <div
                style={{
                  background: "var(--card)",
                  padding: "20px 24px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {t("fexp.formula.f1.title")}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("fexp.formula.f1.text")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "20px 24px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--teal)",
                  }}
                >
                  {t("fexp.formula.f2.title")}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("fexp.formula.f2.text")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "20px 24px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {t("fexp.formula.f3.title")}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("fexp.formula.f3.text")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "20px 24px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {t("fexp.formula.f4.title")}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("fexp.formula.f4.text")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "20px 24px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 6px 0",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {t("fexp.formula.f5.title")}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("fexp.formula.f5.text")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Who Still Misses Out */}
          <section className="doc-section" id="who-misses-out">
            <span className="section-num">{t("fexp.part4")}</span>
            <h2>{t("fexp.miss.h2")}</h2>
            <p className="lead">{t("fexp.miss.lead")}</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                marginTop: "24px",
              }}
            >
              <div
                style={{
                  background: "var(--card)",
                  padding: "24px",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid #D99B26",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "16.5px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {t("fexp.miss.c1.title")}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("fexp.miss.c1.text")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "24px",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid var(--teal)",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "16.5px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {t("fexp.miss.c2.title")}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("fexp.miss.c2.text")}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "24px",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "4px solid var(--ink)",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "16.5px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {t("fexp.miss.c3.title")}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("fexp.miss.c3.text")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Where Do I Apply */}
          <section className="doc-section" id="where-to-apply">
            <span className="section-num">{t("fexp.part5")}</span>
            <h2>{t("fexp.apply.h2")}</h2>
            <p className="lead">{t("fexp.apply.lead")}</p>

            <div
              style={{
                background: "var(--card)",
                padding: "28px",
                borderRadius: "14px",
                border: "1px solid var(--line)",
                marginTop: "24px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "var(--teal)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "12px",
                      flexShrink: 0,
                    }}
                  >
                    1
                  </div>
                  <p
                    style={{ margin: 0, fontSize: "15px", color: "var(--ink)", lineHeight: "1.6" }}
                  >
                    {t("fexp.apply.step1")}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "var(--teal)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "12px",
                      flexShrink: 0,
                    }}
                  >
                    2
                  </div>
                  <p
                    style={{ margin: 0, fontSize: "15px", color: "var(--ink)", lineHeight: "1.6" }}
                  >
                    {t("fexp.apply.step2")}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "var(--teal)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "12px",
                      flexShrink: 0,
                    }}
                  >
                    3
                  </div>
                  <p
                    style={{ margin: 0, fontSize: "15px", color: "var(--ink)", lineHeight: "1.6" }}
                  >
                    {t("fexp.apply.step3")}
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <a
                  href="https://studentaid.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                  }}
                >
                  <span>{t("fexp.apply.cta")}</span>
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>
          </section>

          {/* Section 6: The Bottom Line */}
          <section className="doc-section" id="bottom-line">
            <span className="section-num">{t("fexp.part6")}</span>
            <h2>{t("fexp.bottomline.h2")}</h2>

            <div
              style={{
                marginTop: "20px",
                padding: "24px 28px",
                background: "color-mix(in srgb, var(--teal) 10%, var(--card))",
                borderRadius: "14px",
                borderLeft: "4px solid var(--teal)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "16.5px",
                  lineHeight: "1.65",
                  color: "var(--ink)",
                  fontWeight: 500,
                }}
              >
                {t("fexp.bottomline.quote")}
              </p>
            </div>

            {/* Author Biography Card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                marginTop: "36px",
                padding: "22px 24px",
                background: "var(--card)",
                borderRadius: "14px",
                border: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "var(--forest-tint)",
                  color: "var(--teal)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "18px",
                  flexShrink: 0,
                  fontFamily: "var(--font-display)",
                }}
              >
                CJ
              </div>
              <div>
                <h4
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  Carson Jung
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.5",
                  }}
                >
                  {isEs
                    ? "Investigador editorial especializado en política de ayuda financiera federal y préstamos para educación superior."
                    : "Student Editorial Contributor focusing on federal student aid policy, FAFSA reform, and higher education finance."}
                </p>
              </div>
            </div>

            {/* Sources & Citations */}
            <div
              style={{
                marginTop: "32px",
                fontSize: "12.5px",
                color: "var(--ink-soft)",
                lineHeight: "1.6",
              }}
            >
              <strong style={{ color: "var(--ink)" }}>{t("fexp.sources.label")} </strong>
              <span>{t("fexp.sources.text")}</span>
            </div>

            {/* Next Articles & Resources Navigation */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "16px",
                marginTop: "48px",
                paddingTop: "32px",
                borderTop: "1px solid var(--line)",
              }}
            >
              <Link
                to="/blog/fafsa-deadlines"
                style={{
                  textDecoration: "none",
                  padding: "18px 20px",
                  background: "var(--card)",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "var(--teal)",
                    fontWeight: 700,
                  }}
                >
                  {isEs ? "Siguiente artículo" : "Related Guide"}
                </span>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs ? "Fechas Límite del FAFSA 2027–2028 →" : "2027–2028 FAFSA Deadlines →"}
                </span>
              </Link>

              <Link
                to="/chart-your-path"
                style={{
                  textDecoration: "none",
                  padding: "18px 20px",
                  background: "var(--card)",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "var(--gold)",
                    fontWeight: 700,
                  }}
                >
                  {isEs ? "Calculadora" : "Interactive Tool"}
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>{isEs ? "Traza tu camino" : "Chart Your Path"}</span>
                  <ArrowRightIcon />
                </span>
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
