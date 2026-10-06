import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Student Loan Interest Rates History — Grad Loan Navigator";
const DESCRIPTION =
  "A 60-year history of federal student loan interest rates: from flat statutory rates in 1965 to variable formulas, the 2013 Certainty Act, pandemic 0% freeze, and 2026 rates. Analysis by Carson Jung.";
const URL = "https://www.graduationnavigator.com/blog/student-loan-interest-rates-history";

export const Route = createFileRoute(
  "/blog_/student-loan-interest-rates-history"
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
  component: StudentLoanInterestRatesHistoryPage,
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

function CalendarClockIcon() {
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M12 14v4l2 1" />
    </svg>
  );
}

function PercentIcon() {
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
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function LandmarkIcon() {
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
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
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

/* Historical Era Comparison Matrix */
const HISTORICAL_ERAS = [
  {
    eraEn: "1965–1992",
    eraEs: "1965–1992",
    regimeEn: "Flat Statutory Rate",
    regimeEs: "Tasa Legal Fija",
    formulaEn: "Congress set fixed percentage by statute",
    formulaEs: "Fijada por ley directa del Congreso",
    rangeEn: "6.00% – 10.00%",
    rangeEs: "6.00% – 10.00%",
    notesEn: "6% initial rate in 1965; raised up to 10% post-grad by 1988",
    notesEs: "6% inicial en 1965; subió hasta 10% tras graduarse en 1988",
  },
  {
    eraEn: "1992–2006",
    eraEs: "1992–2006",
    regimeEn: "Variable Market-Tied",
    regimeEs: "Tasa Variable Flotante",
    formulaEn: "91-Day Treasury Bill + 3.10% (Capped at 9.0%)",
    formulaEs: "Letras del Tesoro a 91 Días + 3.10% (Tope 9.0%)",
    rangeEn: "3.40% – 9.00%",
    rangeEs: "3.40% – 9.00%",
    notesEn: "Reset every July 1; reached all-time low of ~3.4% in 2003–04",
    notesEs: "Ajuste cada 1 de julio; mínimo histórico de ~3.4% en 2003–04",
  },
  {
    eraEn: "2006–2013",
    eraEs: "2006–2013",
    regimeEn: "Fixed Statutory & CCRAA",
    regimeEs: "Fija Legal y CCRAA",
    formulaEn: "Statutory 6.8% phased down to 3.4% (subsidized)",
    formulaEs: "6.8% legal reducido a 3.4% (subsidiados)",
    rangeEn: "3.40% – 6.80%",
    rangeEs: "3.40% – 6.80%",
    notesEn: "Phased cuts for undergraduate subsidized loans under CCRAA",
    notesEs: "Reducción escalonada de pregrado subsidiado bajo CCRAA",
  },
  {
    eraEn: "2013–Present",
    eraEs: "2013–Presente",
    regimeEn: "Certainty Act Formula",
    regimeEs: "Fórmula Ley de Certeza",
    formulaEn: "10-Year Treasury Yield + Add-on (UG: +2.05%, Grad: +3.60%, PLUS: +4.60%)",
    formulaEs: "Bono Tesoro 10 Años + Margen (UG: +2.05%, Pos: +3.60%, PLUS: +4.60%)",
    rangeEn: "2.75% – 9.08%",
    rangeEs: "2.75% – 9.08%",
    notesEn: "Fixed for loan life based on May auction; 0% pause 2020–23",
    notesEs: "Fijo por toda la deuda según subasta de mayo; pausa al 0% 2020–23",
  },
];

function StudentLoanInterestRatesHistoryPage() {
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
          <div className="eyebrow">{t("irh.eyebrow")}</div>
          <h1>{t("irh.h1")}</h1>
          <p className="sub">{t("irh.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("irh.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("irh.why.title")}</h4>
              <p>{t("irh.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#flat-rate">{t("irh.nav.flat")}</a>
          <a href="#variable-rate">{t("irh.nav.variable")}</a>
          <a href="#fixed-overhaul">{t("irh.nav.fixed")}</a>
          <a href="#certainty-act">{t("irh.nav.formula")}</a>
          <a href="#bottom-line">{t("irh.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: Flat Rate Era */}
          <section className="doc-section" id="flat-rate" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{t("irh.part1")}</span>
            <h2>{t("irh.flat.h2")}</h2>
            <p className="lead">{t("irh.flat.lead")}</p>

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
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <LandmarkIcon />
                  <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("irh.flat.p1.title")}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("irh.flat.p1.text")}
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <TrendingUpIcon />
                  <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("irh.flat.p2.title")}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("irh.flat.p2.text")}
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <CalendarClockIcon />
                  <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("irh.flat.p3.title")}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("irh.flat.p3.text")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Variable Rates with Direct Lending */}
          <section className="doc-section" id="variable-rate" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{t("irh.part2")}</span>
            <h2>{t("irh.variable.h2")}</h2>
            <p className="lead">{t("irh.variable.lead")}</p>

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
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                  {t("irh.variable.p1.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("irh.variable.p1.text")}
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                  {t("irh.variable.p2.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("irh.variable.p2.text")}
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                  {t("irh.variable.p3.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("irh.variable.p3.text")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Fixed Rates Return & CCRAA */}
          <section className="doc-section" id="fixed-overhaul" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{t("irh.part3")}</span>
            <h2>{t("irh.fixed.h2")}</h2>
            <p className="lead">{t("irh.fixed.lead")}</p>

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
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                  {t("irh.fixed.p1.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("irh.fixed.p1.text")}
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                  {t("irh.fixed.p2.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("irh.fixed.p2.text")}
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                  {t("irh.fixed.p3.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("irh.fixed.p3.text")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: The 2013 Certainty Act & Modern Swings */}
          <section className="doc-section" id="certainty-act" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{t("irh.part4")}</span>
            <h2>{t("irh.formula.h2")}</h2>
            <p className="lead">{t("irh.formula.lead")}</p>

            {/* Formula Callout Card */}
            <div className="rates-action-box" style={{ margin: "28px 0", padding: "26px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <PercentIcon />
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "var(--ink)" }}>
                  {t("irh.formula.box.title")}
                </h3>
              </div>
              <p style={{ margin: "0 0 20px 0", fontSize: "15px", color: "var(--ink-soft)" }}>
                {t("irh.formula.box.lead")}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    padding: "18px 20px",
                    background: "var(--card)",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--teal)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {t("irh.formula.box.ug.title")}
                  </span>
                  <strong style={{ fontSize: "15px", color: "var(--ink)", lineHeight: "1.4", display: "block" }}>
                    {t("irh.formula.box.ug.calc")}
                  </strong>
                </div>

                <div
                  style={{
                    padding: "18px 20px",
                    background: "var(--card)",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--teal)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {t("irh.formula.box.grad.title")}
                  </span>
                  <strong style={{ fontSize: "15px", color: "var(--ink)", lineHeight: "1.4", display: "block" }}>
                    {t("irh.formula.box.grad.calc")}
                  </strong>
                </div>

                <div
                  style={{
                    padding: "18px 20px",
                    background: "var(--card)",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--teal)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {t("irh.formula.box.plus.title")}
                  </span>
                  <strong style={{ fontSize: "15px", color: "var(--ink)", lineHeight: "1.4", display: "block" }}>
                    {t("irh.formula.box.plus.calc")}
                  </strong>
                </div>
              </div>
            </div>

            {/* Historical Era Matrix Table */}
            <div style={{ margin: "32px 0" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px", color: "var(--ink)" }}>
                {isEs ? "Resumen Histórico de Regímenes de Tasas" : "Historical Rate Regimes at a Glance"}
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    background: "var(--card)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid var(--line)",
                  }}
                >
                  <thead>
                    <tr style={{ background: "color-mix(in srgb, var(--card) 92%, var(--ink))", textAlign: "left" }}>
                      <th style={{ padding: "14px 16px", borderBottom: "1px solid var(--line)", fontWeight: 700 }}>
                        {isEs ? "Periodo" : "Era"}
                      </th>
                      <th style={{ padding: "14px 16px", borderBottom: "1px solid var(--line)", fontWeight: 700 }}>
                        {isEs ? "Régimen" : "Rate Regime"}
                      </th>
                      <th style={{ padding: "14px 16px", borderBottom: "1px solid var(--line)", fontWeight: 700 }}>
                        {isEs ? "Rango de Tasas" : "Historical Range"}
                      </th>
                      <th style={{ padding: "14px 16px", borderBottom: "1px solid var(--line)", fontWeight: 700 }}>
                        {isEs ? "Mecanismo y Claves" : "Mechanism & Key Takeaways"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {HISTORICAL_ERAS.map((era, i) => (
                      <tr
                        key={era.eraEn}
                        style={{
                          borderBottom: i === HISTORICAL_ERAS.length - 1 ? "none" : "1px solid var(--line)",
                          background: i % 2 === 0 ? "transparent" : "color-mix(in srgb, var(--card) 97%, var(--ink))",
                        }}
                      >
                        <td style={{ padding: "14px 16px", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                          {isEs ? era.eraEs : era.eraEn}
                        </td>
                        <td style={{ padding: "14px 16px", fontWeight: 600 }}>
                          {isEs ? era.regimeEs : era.regimeEn}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            fontFamily: "var(--font-mono)",
                            fontWeight: 700,
                            color: "var(--ink)",
                          }}
                        >
                          {isEs ? era.rangeEs : era.rangeEn}
                        </td>
                        <td style={{ padding: "14px 16px", color: "var(--ink-soft)" }}>
                          {isEs ? era.notesEs : era.notesEn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pandemic & Recent Developments */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                gap: "20px",
                marginTop: "24px",
              }}
            >
              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                  {t("irh.pandemic.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("irh.pandemic.text")}
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                  {t("irh.inflation.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("irh.inflation.text")}
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                  {t("irh.obb.title")}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {t("irh.obb.text")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: The Bottom Line */}
          <section className="doc-section" id="bottom-line" style={{ scrollMarginTop: "80px" }}>
            <h2>{t("irh.bottomline.h2")}</h2>

            <div className="refi-bottom-card">
              <blockquote className="refi-bottom-quote">
                “{t("irh.bottomline.quote")}”
              </blockquote>
            </div>

            {/* Sources & Citations Box */}
            <div className="refi-sources">
              <p>
                <strong>{t("irh.sources.label")}</strong>
                {t("irh.sources.text")}
              </p>
            </div>

            {/* Next Steps CTA */}
            <div className="cta-strip">
              <div>
                <h2>{t("irh.cta.h2")}</h2>
                <p>{t("irh.cta.p")}</p>
              </div>
              <Link
                to="/chart-your-path"
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <span>{t("irh.cta.btn")}</span>
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
