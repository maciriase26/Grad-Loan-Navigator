import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Federal Cuts to Financial Aid for Low-Earning Programs — Grad Loan Navigator";
const DESCRIPTION =
  "The Department of Education's final rule eliminates federal loans and Pell Grants for programs failing earnings tests. Analysis by Jaylen Peng.";
const URL = "https://www.graduationnavigator.com/blog/federal-aid-cuts-low-earning-programs";

export const Route = createFileRoute("/blog_/federal-aid-cuts-low-earning-programs")({
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
  component: FederalAidCutsArticlePage,
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

function TrendingDownIcon() {
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
      style={{ color: "#ef4444" }}
      aria-hidden="true"
    >
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  );
}

function ShieldAlertIcon() {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function ScaleIcon() {
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
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
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

/* ---------- Graduate Degree Earnings Dataset ---------- */
interface DegreeEarningItem {
  id: string;
  nameEn: string;
  nameEs: string;
  tuition: string;
  withoutDegree: string;
  withDegree: string;
  roi: string;
  isNegative: boolean;
}

const DEGREE_DATA: DegreeEarningItem[] = [
  {
    id: "psychology",
    nameEn: "Psychology",
    nameEs: "Psicología",
    tuition: "$14,688",
    withoutDegree: "$1,154,257",
    withDegree: "$1,060,595",
    roi: "-8.1%",
    isNegative: true,
  },
  {
    id: "clinical-psychology",
    nameEn: "Clinical Psychology",
    nameEs: "Psicología Clínica",
    tuition: "$14,688",
    withoutDegree: "$1,094,789",
    withDegree: "$1,040,889",
    roi: "-4.9%",
    isNegative: true,
  },
  {
    id: "social-work",
    nameEn: "Social Work",
    nameEs: "Trabajo Social",
    tuition: "$14,688",
    withoutDegree: "$1,045,884",
    withDegree: "$1,020,845",
    roi: "-2.4%",
    isNegative: true,
  },
  {
    id: "curriculum-instruction",
    nameEn: "Curriculum and Instruction",
    nameEs: "Currículo e Instrucción",
    tuition: "$7,344",
    withoutDegree: "$1,135,585",
    withDegree: "$1,113,297",
    roi: "-2.0%",
    isNegative: true,
  },
  {
    id: "computer-engineering",
    nameEn: "Computer Engineering",
    nameEs: "Ingeniería en Computación",
    tuition: "$8,864",
    withoutDegree: "$2,115,246",
    withDegree: "$2,158,402",
    roi: "+2.0%",
    isNegative: false,
  },
  {
    id: "architecture",
    nameEn: "Architecture",
    nameEs: "Arquitectura",
    tuition: "$7,344",
    withoutDegree: "$1,342,216",
    withDegree: "$1,389,545",
    roi: "+3.5%",
    isNegative: false,
  },
  {
    id: "mechanical-engineering",
    nameEn: "Mechanical Engineering",
    nameEs: "Ingeniería Mecánica",
    tuition: "$8,864",
    withoutDegree: "$2,056,675",
    withDegree: "$2,127,855",
    roi: "+3.5%",
    isNegative: false,
  },
  {
    id: "electrical-engineering",
    nameEn: "Electrical Engineering",
    nameEs: "Ingeniería Eléctrica",
    tuition: "$8,864",
    withoutDegree: "$2,256,768",
    withDegree: "$2,337,338",
    roi: "+3.6%",
    isNegative: false,
  },
  {
    id: "computer-science",
    nameEn: "Computer Science",
    nameEs: "Ciencias de la Computación",
    tuition: "$8,864",
    withoutDegree: "$1,885,524",
    withDegree: "$1,995,574",
    roi: "+5.8%",
    isNegative: false,
  },
  {
    id: "educational-administration",
    nameEn: "Educational Administration",
    nameEs: "Administración Educativa",
    tuition: "$7,344",
    withoutDegree: "$1,206,579",
    withDegree: "$1,301,778",
    roi: "+7.9%",
    isNegative: false,
  },
];

/* ---------- Main Component Page ---------- */
function FederalAidCutsArticlePage() {
  const { t, lang } = useI18n();
  const isEs = lang === "es";

  return (
    <>
      <SiteHeader />

      <main style={{ paddingBottom: "64px" }}>
        {/* Hero Section */}
        <section className="wrap doc-hero">
          <div className="article-back" style={{ marginBottom: "16px" }}>
            <Link
              to="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              ← {t("blog.h1")}
            </Link>
          </div>
          <div className="eyebrow">{t("aidcuts.eyebrow")}</div>
          <h1>{t("aidcuts.h1")}</h1>
          <p className="sub">{t("aidcuts.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("aidcuts.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("aidcuts.why.title")}</h4>
              <p>{t("aidcuts.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#what-the-rule-says">{t("aidcuts.nav.rule")}</a>
          <a href="#who-this-affects">{t("aidcuts.nav.who")}</a>
          <a href="#programs-at-risk-table">{t("aidcuts.nav.table")}</a>
          <a href="#what-to-consider">{t("aidcuts.nav.consider")}</a>
          <a href="#bottom-line">{t("aidcuts.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: What The Rule Says */}
          <section className="doc-section" id="what-the-rule-says">
            <span className="section-num">{isEs ? "Parte 1 de 5" : "Part 1 of 5"}</span>
            <h2>{t("aidcuts.rule.h2")}</h2>
            <p className="lead">{t("aidcuts.rule.lead")}</p>

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
                  padding: "22px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <TrendingDownIcon />
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    {t("aidcuts.rule.loss.title")}
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
                  {t("aidcuts.rule.loss.text")}
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <ShieldAlertIcon />
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    {t("aidcuts.rule.timeline.title")}
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
                  {t("aidcuts.rule.timeline.text")}
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <ScaleIcon />
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    {t("aidcuts.rule.undergrad.title")}
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
                  {t("aidcuts.rule.undergrad.text")}
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <ScaleIcon />
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    {t("aidcuts.rule.grad.title")}
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
                  {t("aidcuts.rule.grad.text")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Who This Affects */}
          <section className="doc-section" id="who-this-affects" style={{ marginTop: "48px" }}>
            <span className="section-num">{isEs ? "Parte 2 de 5" : "Part 2 of 5"}</span>
            <h2>{t("aidcuts.who.h2")}</h2>
            <p className="lead">{t("aidcuts.who.lead")}</p>

            {/* 3 Metric Stat Highlights */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
                margin: "24px 0",
              }}
            >
              <div
                style={{
                  background: "var(--card)",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #ef4444",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    fontFamily: "var(--font-mono)",
                    color: "#ef4444",
                    marginBottom: "4px",
                  }}
                >
                  {t("aidcuts.who.stat1.num")}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: "4px",
                  }}
                >
                  {t("aidcuts.who.stat1.label")}
                </div>
                <div
                  style={{
                    fontSize: "12.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.4",
                  }}
                >
                  {t("aidcuts.who.stat1.sub")}
                </div>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid var(--gold)",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    fontFamily: "var(--font-mono)",
                    color: "var(--gold)",
                    marginBottom: "4px",
                  }}
                >
                  {t("aidcuts.who.stat2.num")}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: "4px",
                  }}
                >
                  {t("aidcuts.who.stat2.label")}
                </div>
                <div
                  style={{
                    fontSize: "12.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.4",
                  }}
                >
                  {t("aidcuts.who.stat2.sub")}
                </div>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #ef4444",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    fontFamily: "var(--font-mono)",
                    color: "#ef4444",
                    marginBottom: "4px",
                  }}
                >
                  {t("aidcuts.who.stat3.num")}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: "4px",
                  }}
                >
                  {t("aidcuts.who.stat3.label")}
                </div>
                <div
                  style={{
                    fontSize: "12.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.4",
                  }}
                >
                  {t("aidcuts.who.stat3.sub")}
                </div>
              </div>
            </div>

            {/* Impacted fields callout box */}
            <div
              style={{
                background: "color-mix(in srgb, var(--gold) 8%, transparent)",
                border: "1px solid color-mix(in srgb, var(--gold) 25%, transparent)",
                borderRadius: "12px",
                padding: "22px 24px",
                marginTop: "20px",
              }}
            >
              <h4
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                {t("aidcuts.who.impact.title")}
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  fontSize: "14.5px",
                  color: "var(--ink-soft)",
                  lineHeight: "1.7",
                }}
              >
                <li style={{ marginBottom: "6px" }}>
                  <strong>{t("aidcuts.who.impact.p1")}</strong>
                </li>
                <li style={{ marginBottom: "6px" }}>
                  <strong>{t("aidcuts.who.impact.p2")}</strong>
                </li>
                <li>
                  <strong>{t("aidcuts.who.impact.p3")}</strong>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Graduate Programs Table */}
          <section
            className="doc-section"
            id="programs-at-risk-table"
            style={{ marginTop: "48px" }}
          >
            <span className="section-num">{isEs ? "Parte 3 de 5" : "Part 3 of 5"}</span>
            <h2>{t("aidcuts.table.h2")}</h2>
            <p className="lead">{t("aidcuts.table.lead")}</p>

            <div className="roi-table-wrap" style={{ marginTop: "24px" }}>
              <table className="roi-table">
                <thead>
                  <tr>
                    <th>{t("aidcuts.table.col.degree")}</th>
                    <th>{t("aidcuts.table.col.tuition")}</th>
                    <th>{t("aidcuts.table.col.without")}</th>
                    <th>{t("aidcuts.table.col.with")}</th>
                    <th>{t("aidcuts.table.col.roi")}</th>
                    <th>{isEs ? "Estado / Riesgo" : "Status / Risk"}</th>
                  </tr>
                </thead>
                <tbody>
                  {DEGREE_DATA.map((item) => (
                    <tr
                      key={item.id}
                      style={{
                        background: item.isNegative
                          ? "color-mix(in srgb, #ef4444 3%, transparent)"
                          : "inherit",
                      }}
                    >
                      <td style={{ fontWeight: 600, color: "var(--ink)" }}>
                        {isEs ? item.nameEs : item.nameEn}
                      </td>
                      <td className="roi-mono">{item.tuition}</td>
                      <td className="roi-mono">{item.withoutDegree}</td>
                      <td className="roi-mono">{item.withDegree}</td>
                      <td
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          fontSize: "14px",
                          color: item.isNegative ? "#ef4444" : "var(--teal)",
                        }}
                      >
                        {item.roi}
                      </td>
                      <td>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            borderRadius: "12px",
                            fontSize: "11.5px",
                            fontWeight: 700,
                            fontFamily: "var(--font-mono)",
                            background: item.isNegative
                              ? "color-mix(in srgb, #ef4444 14%, transparent)"
                              : "color-mix(in srgb, var(--teal) 14%, transparent)",
                            color: item.isNegative ? "#dc2626" : "var(--teal)",
                          }}
                        >
                          {item.isNegative
                            ? isEs
                              ? "Alto Riesgo (Pérdida Neta)"
                              : "High Risk (Net Loss)"
                            : isEs
                              ? "Supera Prueba (ROI Positivo)"
                              : "Passing (Positive ROI)"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footnote card */}
            <div
              style={{
                marginTop: "12px",
                padding: "14px 18px",
                borderRadius: "8px",
                background: "var(--card-paper)",
                border: "1px solid var(--line)",
                fontSize: "12.5px",
                color: "var(--ink-soft)",
                lineHeight: "1.6",
              }}
            >
              <strong style={{ color: "var(--ink)" }}>
                {isEs ? "Metodología y Fuentes: " : "Methodology & Notes: "}
              </strong>
              {t("aidcuts.table.footnote")}
            </div>
          </section>

          {/* Section 4: What Else You Should Consider */}
          <section className="doc-section" id="what-to-consider" style={{ marginTop: "48px" }}>
            <span className="section-num">{isEs ? "Parte 4 de 5" : "Part 4 of 5"}</span>
            <h2>{t("aidcuts.consider.h2")}</h2>
            <p className="lead">{t("aidcuts.consider.lead")}</p>

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
                  padding: "22px",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {t("aidcuts.consider.c1.title")}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("aidcuts.consider.c1.text")}
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
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {t("aidcuts.consider.c2.title")}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("aidcuts.consider.c2.text")}
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
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {t("aidcuts.consider.c3.title")}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("aidcuts.consider.c3.text")}
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
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {t("aidcuts.consider.c4.title")}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14.5px",
                    color: "var(--ink-soft)",
                    lineHeight: "1.6",
                  }}
                >
                  {t("aidcuts.consider.c4.text")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: The Bottom Line */}
          <section className="doc-section" id="bottom-line" style={{ marginTop: "48px" }}>
            <span className="section-num">{isEs ? "Parte 5 de 5" : "Part 5 of 5"}</span>
            <h2>{t("aidcuts.bottomline.h2")}</h2>

            <div className="refi-bottom-card">
              <blockquote className="refi-bottom-quote">
                “{t("aidcuts.bottomline.quote")}”
              </blockquote>
            </div>

            {/* CTA Strip */}
            <div className="cta-strip" style={{ marginTop: "32px" }}>
              <div>
                <h2>
                  {isEs
                    ? "Evalúa el retorno y la deuda de tu posgrado"
                    : "Model your graduate degree ROI and borrowing risk"}
                </h2>
                <p>
                  {isEs
                    ? "Usa nuestras calculadoras para proyectar pagos mensuales, límites de endeudamiento y salarios netos antes de matricularte."
                    : "Use our interactive calculators to project debt service, borrowing caps, and take-home earnings before taking out loans."}
                </p>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  to="/pay-for-school"
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>{isEs ? "Guía para Financiar Posgrados" : "Pay for School Guide"}</span>
                  <ArrowRightIcon />
                </Link>
                <Link
                  to="/chart-your-path"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--card)",
                    color: "var(--ink)",
                    fontWeight: 600,
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  <span>{isEs ? "Calculadora Traza Tu Ruta" : "Borrowing Calculator"}</span>
                  <ArrowRightIcon />
                </Link>
              </div>
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
                  background: "color-mix(in srgb, var(--amber, #d97706) 15%, transparent)",
                  color: "var(--amber, #d97706)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "18px",
                  flexShrink: 0,
                  fontFamily: "var(--font-display)",
                }}
              >
                JP
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
                  Jaylen Peng
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
                    ? "Analista de políticas de educación superior y financiamiento estudiantil especializado en reformas legislativas, rendición de cuentas y retorno de programas de posgrado."
                    : "Higher Education Policy & Student Lending Analyst specializing in legislative reform, institutional accountability, and graduate program ROI."}
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
              <strong style={{ color: "var(--ink)" }}>{t("aidcuts.sources.label")} </strong>
              <span>{t("aidcuts.sources.text")}</span>
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
                to="/blog/student-loans-political-background-and-future"
                style={{
                  textDecoration: "none",
                  padding: "16px 18px",
                  borderRadius: "10px",
                  border: "1px solid var(--line)",
                  background: "var(--card)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    color: "var(--teal)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {isEs ? "Contexto Político" : "Political Background"}
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color: "var(--ink)",
                    fontSize: "15px",
                  }}
                >
                  {isEs
                    ? "Antecedentes Políticos y el Futuro de los Préstamos"
                    : "Student Loans Political Background and Future"}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--ink-soft)",
                    marginTop: "auto",
                  }}
                >
                  {isEs
                    ? "Los cambios de One Big Beautiful Bill en préstamos y Grad PLUS →"
                    : "How the One Big Beautiful Bill Act reshaped borrowing programs →"}
                </span>
              </Link>

              <Link
                to="/blog/which-phd-fields-are-worth-it"
                style={{
                  textDecoration: "none",
                  padding: "16px 18px",
                  borderRadius: "10px",
                  border: "1px solid var(--line)",
                  background: "var(--card)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    color: "var(--teal)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {isEs ? "Análisis Salarial" : "Earnings Analysis"}
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color: "var(--ink)",
                    fontSize: "15px",
                  }}
                >
                  {isEs
                    ? "¿Qué Campos de Doctorado Valen la Pena?"
                    : "Which Ph.D. Fields Are Worth It?"}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--ink-soft)",
                    marginTop: "auto",
                  }}
                >
                  {isEs
                    ? "Comparativa de deuda, salarios y retorno a 10 años →"
                    : "Comparing debt, salary, and 10-year ROI by discipline →"}
                </span>
              </Link>

              <Link
                to="/blog/value-law-schools"
                style={{
                  textDecoration: "none",
                  padding: "16px 18px",
                  borderRadius: "10px",
                  border: "1px solid var(--line)",
                  background: "var(--card)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    color: "var(--teal)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {isEs ? "Retorno en Derecho" : "Law School ROI"}
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color: "var(--ink)",
                    fontSize: "15px",
                  }}
                >
                  {isEs
                    ? "Facultades de Derecho de Gran Valor"
                    : "Value Law Schools for Elite Outcomes"}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--ink-soft)",
                    marginTop: "auto",
                  }}
                >
                  {isEs
                    ? "Colocación en BigLaw y secretarías judiciales con baja deuda →"
                    : "BigLaw placement and clerkships without six-figure debt →"}
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
