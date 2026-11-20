import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, TopRouteDeco } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE =
  "Can You Replace Grad PLUS with Private Loans? | Grad Navigator";
const DESCRIPTION =
  "Traditionally, federal student loans have been the safer, cheaper option. However, recent changes to federal graduate student loans have left borrowers with fewer financing options. Should you turn to private lenders instead? By Jaylen Peng.";
const URL =
  "https://www.graduationnavigator.com/blog/can-you-replace-grad-plus-with-private-loans";

export const Route = createFileRoute(
  "/blog_/can-you-replace-grad-plus-with-private-loans"
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
          ],
          publisher: {
            "@type": "Organization",
            name: "Grad Navigator",
            url: "https://www.graduationnavigator.com",
            logo: "https://www.graduationnavigator.com/regular-compass.png",
          },
          datePublished: "2026-11-15",
          dateModified: "2026-11-15",
        }),
      },
    ],
  }),
  component: CanYouReplaceGradPlusWithPrivateLoansPage,
});

/* ---------- Inline SVG Icons ---------- */
function AlertTriangleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "22px", height: "22px", color: "#d97706", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ShieldAlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "20px", height: "20px", color: "#c6333b", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "20px", height: "20px", color: "var(--teal)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "20px", height: "20px", color: "#2563eb", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function PercentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "20px", height: "20px", color: "var(--teal)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "16px", height: "16px" }}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ---------- Checklist Items Definition ---------- */
interface ChecklistItem {
  id: string;
  tagEn: string;
  tagEs: string;
  titleEn: string;
  titleEs: string;
  descEn: string;
  descEs: string;
}

const SUITABILITY_ITEMS: ChecklistItem[] = [
  {
    id: "maxed-federal",
    tagEn: "Prerequisite",
    tagEs: "Requisito Previo",
    titleEn: "Have You Exhausted Low-Cost Federal Direct Unsubsidized Loans First?",
    titleEs: "¿Agotaste Primero los Préstamos Federales Directos No Subsidiados?",
    descEn:
      "Always take out your annual Federal Direct Unsubsidized limit ($20,500 for standard graduate programs or $50,000 for qualifying professional degrees) before considering private debt, as federal loans include built-in income-driven safety nets.",
    descEs:
      "Siempre toma tu límite federal directo no subsidiado ($20,500 para posgrados regulares o $50,000 para carreras profesionales calificadas) antes de recurrir a deuda privada, ya que los créditos federales incluyen redes de protección según ingresos.",
  },
  {
    id: "public-service",
    tagEn: "PSLF Eligibility",
    tagEs: "Elegibilidad para PSLF",
    titleEn: "Do You Plan to Work for a Government Agency or 501(c)(3) Non-Profit?",
    titleEs: "¿Planeas Trabajar para el Gobierno o una Organización Sin Fines de Lucro 501(c)(3)?",
    descEn:
      "If you anticipate qualifying for Public Service Loan Forgiveness (PSLF), private student loans are NOT eligible. Any amount borrowed privately must be repaid in full without federal forgiveness.",
    descEs:
      "Si prevés calificar para el Programa de Condonación de Préstamos por Servicio Público (PSLF), los préstamos privados NO son elegibles. Cualquier monto privado deberá pagarse íntegramente sin perdón federal.",
  },
  {
    id: "credit-cosigner",
    tagEn: "Credit Profile",
    tagEs: "Perfil Crediticio",
    titleEn: "Do You or a Cosigner Have Excellent Credit (FICO 720+) and Reliable Income?",
    titleEs: "¿Tú o un Codeudor Tienen un Crédito Excelente (FICO 720+) e Ingresos Estables?",
    descEn:
      "Private lenders reserve their lowest advertised APRs only for prime borrowers with strong credit scores and low debt-to-income ratios. Borrowers with thin credit will face higher rates or require a cosigner who assumes full legal liability.",
    descEs:
      "Los prestamistas privados reservan sus tasas más bajas solo para perfiles con excelente puntaje crediticio y baja relación deuda-ingreso. Quienes tengan poco historial enfrentarán tasas altas o necesitarán un codeudor con responsabilidad legal total.",
  },
  {
    id: "full-cost",
    tagEn: "Fee & APR Audit",
    tagEs: "Auditoría de Tarifas y APR",
    titleEn: "Have You Compared Fixed APR, Origination Fees, and Repayment Schedules?",
    titleEs: "¿Comparaste el APR Fijo, las Tarifas de Originación y los Plazos de Pago?",
    descEn:
      "Don't just evaluate the headline interest rate. Check whether the loan requires in-school interest payments, variable vs. fixed interest caps, and the total cumulative interest paid over the life of the loan.",
    descEs:
      "No te fijes solo en la tasa inicial anunciada. Revisa si exige pagos de interés durante los estudios, topes de tasa fija vs. variable y el interés acumulado total a pagar durante la vida del crédito.",
  },
];

function CanYouReplaceGradPlusWithPrivateLoansPage() {
  const { t, lang } = useI18n();
  const isEs = lang === "es";
  const [checkedIds, setCheckedIds] = useState<string[]>([
    "maxed-federal",
    "credit-cosigner",
  ]);

  const toggleChecklist = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <SiteHeader />

      <main style={{ paddingBottom: "64px" }}>
        {/* Hero Section */}
        <section className="wrap doc-hero" style={{ position: "relative" }}>
          <TopRouteDeco variant="doc" />

          <div className="article-back" style={{ marginBottom: "16px" }}>
            <Link
              to="/blog"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              ← {t("blog.h1")}
            </Link>
          </div>

          <div className="doc-hero-flex">
            <div className="doc-hero-text">
              <div className="eyebrow">{t("gpp.eyebrow")}</div>
              <h1
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  lineHeight: "1.2",
                  marginBottom: "14px",
                }}
              >
                {t("gpp.h1")}
              </h1>
              <p
                className="sub"
                style={{
                  fontSize: "17.5px",
                  lineHeight: "1.6",
                  color: "var(--ink-soft)",
                  marginBottom: "16px",
                }}
              >
                {t("gpp.sub")}
              </p>
              <div className="updated" style={{ marginBottom: "22px" }}>
                <span className="dot" />
                {t("gpp.updated")}
              </div>

              {/* Why it matters callout */}
              <div className="refi-hero-callout">
                <div className="refi-hero-callout-icon">
                  <AlertTriangleIcon />
                </div>
                <div className="refi-hero-callout-content">
                  <h4
                    style={{
                      margin: "0 0 6px 0",
                      fontSize: "16px",
                      fontWeight: 700,
                    }}
                  >
                    {t("gpp.why.title")}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14.5px",
                      lineHeight: "1.6",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {t("gpp.why.p")}
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Animation */}
            <div className="doc-hero-media">
              <img
                src="/images/gn-animation-compare-offers.svg"
                width="800"
                height="600"
                alt={
                  isEs
                    ? "Animación de estudiante evaluando préstamos federales frente a préstamos privados con una brújula"
                    : "Animated student evaluating federal loans versus private loans with a compass"
                }
                loading="lazy"
                className="doc-hero-animation"
              />
            </div>
          </div>

          {/* Key Benchmark Stat Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "16px",
              marginTop: "28px",
            }}
          >
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderTop: "3px solid var(--teal)",
                borderRadius: "12px",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "var(--teal)",
                  lineHeight: 1.15,
                }}
              >
                +119%
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Crecimiento en Sallie Mae" : "Sallie Mae Originations Surge"}
              </div>
              <div
                style={{
                  fontSize: "12.5px",
                  color: "var(--ink-soft)",
                  marginTop: "4px",
                  lineHeight: 1.45,
                }}
              >
                {isEs
                  ? "Aumento interanual en la emisión de préstamos para graduados en el tercer trimestre de 2026."
                  : "Year-over-year increase in graduate-loan originations during the third quarter of 2026."}
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderTop: "3px solid #2563eb",
                borderRadius: "12px",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#2563eb",
                  lineHeight: 1.15,
                }}
              >
                +173%
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Crecimiento en Navient" : "Navient Originations Surge"}
              </div>
              <div
                style={{
                  fontSize: "12.5px",
                  color: "var(--ink-soft)",
                  marginTop: "4px",
                  lineHeight: 1.45,
                }}
              >
                {isEs
                  ? "Crecimiento interanual masivo en préstamos privados para posgrado reportado por Navient en el T3 2026."
                  : "Massive year-over-year surge in private graduate loans reported by Navient in Q3 2026."}
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderTop: "3px solid #d97706",
                borderRadius: "12px",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#d97706",
                  lineHeight: 1.15,
                }}
              >
                +96%
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Aumento en Emisiones de SoFi" : "SoFi Originations Increase"}
              </div>
              <div
                style={{
                  fontSize: "12.5px",
                  color: "var(--ink-soft)",
                  marginTop: "4px",
                  lineHeight: 1.45,
                }}
              >
                {isEs
                  ? "Nuevos préstamos de posgrado y refinanciamiento aumentaron 96% frente al año anterior."
                  : "New graduate lending and borrowers refinancing existing debt jumped 96% year-over-year."}
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderTop: "3px solid #c6333b",
                borderRadius: "12px",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#c6333b",
                  lineHeight: 1.15,
                }}
              >
                {isEs ? "1 Jul 2026" : "July 1, 2026"}
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Fin de Grad PLUS para Nuevos" : "Grad PLUS Discontinued"}
              </div>
              <div
                style={{
                  fontSize: "12.5px",
                  color: "var(--ink-soft)",
                  marginTop: "4px",
                  lineHeight: 1.45,
                }}
              >
                {isEs
                  ? "Solo prestatarios previos mantienen acceso; nuevos alumnos dependen de topes Directos o crédito privado."
                  : "Only grandfathered borrowers continue; new borrowers must navigate fixed Direct caps or private loans."}
              </div>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#policy-change">{t("gpp.nav.policy")}</a>
          <a href="#public-to-private">{t("gpp.nav.surge")}</a>
          <a href="#private-loans-eval">{t("gpp.nav.eval")}</a>
          <a href="#compare-full-cost">{t("gpp.nav.compare")}</a>
          <a href="#side-by-side">{t("gpp.nav.calculator")}</a>
          <a href="#suitability">{t("gpp.nav.sources")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: Policy Change: Grad PLUS */}
          <section className="doc-section" id="policy-change" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 1 de 6" : "Part 1 of 6"}</span>
            <h2>{isEs ? "Cambio de Política: La Eliminación de Grad PLUS" : "Policy Change: Grad PLUS"}</h2>
            <p className="lead" style={{ fontSize: "17px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  La ley <strong>One Big Beautiful Bill Act</strong> reformó profundamente el sistema federal de préstamos estudiantiles e introdujo límites de endeudamiento más bajos. A partir del <strong>1 de julio de 2026</strong>, ha eliminado el Programa Federal Graduate PLUS (<strong>Grad PLUS</strong>) para todos los nuevos prestatarios.
                </>
              ) : (
                <>
                  The <strong>One Big Beautiful Bill Act</strong> overhauled the federal student loan system and introduced lower borrowing limits. As of <strong>July 1, 2026</strong>, it has eliminated the Federal Graduate Plus Program (<strong>Grad PLUS</strong>).
                </>
              )}
            </p>

            <div
              style={{
                padding: "20px 24px",
                background: "var(--card)",
                borderRadius: "14px",
                border: "1px solid var(--line)",
                borderLeft: "4px solid var(--teal)",
                margin: "20px 0",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                {isEs ? "Regla para Prestatarios Existentes vs. Nuevos" : "Grandfathering Rule for Existing vs. New Borrowers"}
              </h4>
              <p style={{ margin: "0 0 10px 0", fontSize: "15px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                {isEs ? (
                  <>
                    Los estudiantes que <strong>ya habían recibido desembolsos de préstamos Grad PLUS</strong> antes de la fecha límite pueden continuar solicitando estos fondos para completar su título. Sin embargo, el programa fue <strong>discontinuado por completo para los nuevos estudiantes</strong>.
                  </>
                ) : (
                  <>
                    Students who had <strong>already received Grad PLUS loan disbursements</strong> could continue borrowing to finish their degree, but the program was <strong>discontinued for new borrowers</strong>.
                  </>
                )}
              </p>
              <div style={{ fontSize: "14px" }}>
                <Link
                  to="/blog/professional-degree-loan-limits"
                  style={{ color: "var(--teal)", fontWeight: 600, textDecoration: "underline" }}
                >
                  {isEs
                    ? "Conoce más sobre los nuevos límites de endeudamiento federal aquí →"
                    : "Learn more about recent federal student loan policy changes and borrowing limits here →"}
                </Link>
              </div>
            </div>

            <p style={{ fontSize: "15.5px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
              {isEs ? (
                <>
                  <strong>Por qué es importante:</strong> Anteriormente, los préstamos Grad PLUS permitían a los estudiantes de posgrado o profesionales pedir prestado hasta el <em>costo total de asistencia (COA)</em> fijado por su universidad. Estos préstamos cerraban la brecha crítica entre financiar la matrícula y solventar el costo total de obtener el título, incluyendo libros de texto, vivienda, comida, transporte y seguro médico. Al desaparecer esta opción para nuevos estudiantes, muchos se ven forzados a recurrir a préstamos privados para cubrir los gastos restantes.
                </>
              ) : (
                <>
                  <strong>Why it matters:</strong> Grad PLUS loans previously allowed graduate or professional students to borrow up to the <em>total cost of attendance</em>. These loans previously closed the gap between financing tuition and the entire cost of earning the degree, including textbooks, housing, transportation, and other essential living expenses. With these changes, many students are turning to private loans to help cover remaining expenses.
                </>
              )}
            </p>
          </section>

          {/* Section 2: The Aftermath: Public to Private Surge */}
          <section className="doc-section" id="public-to-private" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 2 de 6" : "Part 2 of 6"}</span>
            <h2>{isEs ? "Las Consecuencias: Del Sector Público al Privado" : "The Aftermath: Public to Private"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Las emisiones de préstamos privados se han <strong>disparado drásticamente</strong>, con múltiples entidades financieras privadas apresurándose a llenar el vacío financiero dejado por las restricciones federales. Según un análisis publicado por <em>Business Insider</em>, el volumen crediticio de las principales compañías de servicios financieros ha aumentado notablemente en el último año.
                </>
              ) : (
                <>
                  Private loan originations have <strong>surged</strong>, with many private lenders filling the funding gap left by federal loan changes. According to a <em>Business Insider</em> analysis, lending from several major financial services companies has increased dramatically in the past year.
                </>
              )}
            </p>

            {/* Custom Visual Bar Chart recreating PDF Chart */}
            <div
              style={{
                background: "var(--card)",
                borderRadius: "16px",
                border: "1px solid var(--line)",
                padding: "28px 24px",
                margin: "24px 0",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "Crecimiento en Emisiones de Préstamos para Posgrado"
                    : "Graduate Loan Originations Growth"}
                </h3>
                <div style={{ fontSize: "13.5px", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Aumento porcentual interanual en el tercer trimestre de 2026 (T3 2026)"
                    : "Year-over-year percentage increase in Q3 2026"}
                </div>
              </div>

              {/* Chart Visualization */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  gap: "48px",
                  height: "240px",
                  padding: "0 20px 20px 20px",
                  borderBottom: "2px solid var(--line)",
                  position: "relative",
                }}
              >
                {/* Horizontal reference lines */}
                <div
                  style={{
                    position: "absolute",
                    top: "15%",
                    left: 0,
                    right: 0,
                    borderTop: "1px dashed var(--line)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: 0,
                    right: 0,
                    borderTop: "1px dashed var(--line)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "65%",
                    left: 0,
                    right: 0,
                    borderTop: "1px dashed var(--line)",
                    pointerEvents: "none",
                  }}
                />

                {/* Sallie Mae Bar */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "140px",
                    height: "100%",
                    justifyContent: "flex-end",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--teal)",
                      marginBottom: "8px",
                    }}
                  >
                    +119%
                  </span>
                  <div
                    style={{
                      width: "100%",
                      height: "59.5%", // 119 / 200
                      background: "linear-gradient(180deg, var(--teal) 0%, color-mix(in srgb, var(--teal) 75%, #0f172a) 100%)",
                      borderRadius: "8px 8px 0 0",
                      boxShadow: "0 4px 12px rgba(14, 159, 110, 0.2)",
                    }}
                  />
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", marginTop: "10px" }}>
                    Sallie Mae
                  </span>
                </div>

                {/* Navient Bar */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "140px",
                    height: "100%",
                    justifyContent: "flex-end",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#2563eb",
                      marginBottom: "8px",
                    }}
                  >
                    +173%
                  </span>
                  <div
                    style={{
                      width: "100%",
                      height: "86.5%", // 173 / 200
                      background: "linear-gradient(180deg, #2563eb 0%, color-mix(in srgb, #2563eb 75%, #0f172a) 100%)",
                      borderRadius: "8px 8px 0 0",
                      boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
                    }}
                  />
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", marginTop: "10px" }}>
                    Navient
                  </span>
                </div>
              </div>

              {/* Chart Caption matching PDF */}
              <p
                style={{
                  margin: "16px 0 0 0",
                  fontSize: "12.5px",
                  lineHeight: "1.5",
                  color: "var(--ink-soft)",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                {isEs
                  ? "Las cifras muestran el porcentaje de incremento interanual en originaciones de préstamos de posgrado durante el tercer trimestre de 2026. Sallie Mae reportó un 119% de crecimiento, mientras que Navient reportó un 173%."
                  : "Figures show the year-over-year percentage increase in graduate-loan originations during the third quarter of 2026. Sallie Mae reported 119% growth, while Navient reported 173% growth."}
              </p>
            </div>

            {/* SoFi Highlight Callout */}
            <div
              style={{
                padding: "18px 22px",
                background: "color-mix(in srgb, #d97706 8%, var(--card))",
                borderRadius: "12px",
                border: "1px solid color-mix(in srgb, #d97706 25%, transparent)",
                margin: "20px 0",
              }}
            >
              <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", color: "#d97706", fontWeight: 700 }}>
                {isEs ? "Aumento Adicional en SoFi (+96%)" : "SoFi Originations Also Surge 96%"}
              </h4>
              <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink)" }}>
                {isEs ? (
                  <>
                    Las emisiones totales de préstamos estudiantiles de <strong>SoFi</strong> —que incluyeron nuevos préstamos para posgrado y solicitudes de prestatarios refinanciando deudas existentes— también fueron un <strong>96% superiores</strong> a las registradas en el mismo período del año anterior.
                  </>
                ) : (
                  <>
                    <strong>SoFi’s</strong> student loan originations, which included new graduate lending and borrowers refinancing existing debt, were also <strong>96% higher</strong> than the previous year.
                  </>
                )}
              </p>
            </div>
          </section>

          {/* Section 3: Are Private Loans Right for You? */}
          <section className="doc-section" id="private-loans-eval" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 3 de 6" : "Part 3 of 6"}</span>
            <h2>{isEs ? "¿Son los Préstamos Privados Adecuados para Ti?" : "Are Private Loans Right for You?"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Aquí tienes los factores clave que debes sopesar detenidamente al decidir si los prestamistas privados son una alternativa viable para financiar tus estudios:
                </>
              ) : (
                <>
                  Here are the fundamental factors to consider when deciding whether private loans are a viable alternative for your graduate education:
                </>
              )}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                gap: "20px",
                margin: "24px 0",
              }}
            >
              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid var(--teal)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <PercentIcon />
                  <h3 style={{ margin: 0, fontSize: "17.5px", fontWeight: 700 }}>
                    {isEs ? "1. Tasas de Interés Potencialmente Menores" : "1. Can Offer Lower Interest Rates"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Los préstamos privados pueden ofrecer tasas de interés más bajas que los préstamos federales para prestatarios con un <strong>historial crediticio sólido e ingresos estables</strong>.
                    </>
                  ) : (
                    <>
                      Private loans can offer lower interest rates than federal loans for borrowers with <strong>strong credit scores and stable, verifiable incomes</strong>.
                    </>
                  )}
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #c6333b",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <TrendingUpIcon />
                  <h3 style={{ margin: 0, fontSize: "17.5px", fontWeight: 700 }}>
                    {isEs ? "2. Requisitos de Aprobación Más Estrictos" : "2. Stricter Eligibility Requirements"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Tienen criterios de evaluación mucho más exigentes: la aprobación y la tasa de interés asignada dependen directamente de tu <strong>puntuación FICO</strong>, ingresos y reporte crediticio.
                    </>
                  ) : (
                    <>
                      They feature stricter requirements: both your eligibility and your approved interest rate depend heavily on factors like your <strong>credit history and debt-to-income ratio</strong>.
                    </>
                  )}
                </p>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #2563eb",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <UsersIcon />
                  <h3 style={{ margin: 0, fontSize: "17.5px", fontWeight: 700 }}>
                    {isEs ? "3. Exigencia Frecuente de Codeudor" : "3. Cosigner Requirements"}
                  </h3>
                </div>
                <p style={{ margin: "0 0 12px 0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Muchos prestamistas solicitan al estudiante contar con un <strong>codeudor con buen crédito</strong>, quien pasa a ser <em>legalmente responsable</em> del pago si el prestatario principal se atrasa.
                    </>
                  ) : (
                    <>
                      Lenders frequently ask borrowers for a <strong>creditworthy cosigner</strong>, who also becomes <em>fully legally responsible</em> for repayment if the primary student defaults.
                    </>
                  )}
                </p>
                <Link
                  to="/cosigner-hub"
                  style={{ fontSize: "13.5px", color: "#2563eb", fontWeight: 600, textDecoration: "underline" }}
                >
                  {isEs ? "Visita el Centro del Codeudor (Cosigner Hub) →" : "Visit our Cosigner Hub for guidelines & rights →"}
                </Link>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #c6333b",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <ShieldAlertIcon />
                  <h3 style={{ margin: 0, fontSize: "17.5px", fontWeight: 700 }}>
                    {isEs ? "4. Falta de Protecciones Federales" : "4. Lack of Federal Protections"}
                  </h3>
                </div>
                <p style={{ margin: "0 0 10px 0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Los préstamos privados <strong>carecen de programas de alivio y condonación federal</strong>, incluyendo la Condonación de Préstamos por Servicio Público (PSLF) y los planes de pago basados en ingresos (IDR).
                    </>
                  ) : (
                    <>
                      Private loans <strong>lack critical federal relief programs</strong>, including Public Service Loan Forgiveness (PSLF) and Income-Driven Repayment (IDR).
                    </>
                  )}
                </p>
                <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.55", color: "var(--ink)" }}>
                  {isEs
                    ? "Los prestamistas privados no están obligados a reducir ni suspender pagos ante dificultades financieras imprevistas, y las políticas de aplazamiento o indulgencia moratoria varían ampliamente."
                    : "Private lenders may not reduce or suspend payments for borrowers facing financial hardship, and deferment and forbearance policies vary widely by lender."}
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Compare the Full Cost */}
          <section className="doc-section" id="compare-full-cost" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 4 de 6" : "Part 4 of 6"}</span>
            <h2>{isEs ? "Compara el Costo Total: Más Allá de la Tasa Anunciada" : "Compare the Full Cost"}</h2>
            <div
              style={{
                padding: "22px 26px",
                background: "color-mix(in srgb, var(--teal) 7%, var(--card))",
                borderRadius: "14px",
                border: "1px solid color-mix(in srgb, var(--teal) 25%, transparent)",
                margin: "20px 0",
              }}
            >
              <h4 style={{ margin: "0 0 10px 0", fontSize: "17.5px", fontWeight: 700, color: "var(--teal)" }}>
                {isEs ? "Lo que Debes Evaluar Antes de Firmar" : "What to Examine Before Choosing a Lender"}
              </h4>
              <p style={{ margin: "0 0 12px 0", fontSize: "15px", lineHeight: "1.65", color: "var(--ink)" }}>
                {isEs ? (
                  <>
                    Al comparar prestamistas, <strong>no te fijes únicamente en la tasa de interés promocional anunciada</strong>. También debes examinar minuciosamente:
                  </>
                ) : (
                  <>
                    When comparing lenders, <strong>don’t only look at the advertised headline interest rate</strong>. You must also thoroughly examine:
                  </>
                )}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px",
                  marginTop: "16px",
                }}
              >
                <div style={{ padding: "12px 16px", background: "var(--card)", borderRadius: "8px", border: "1px solid var(--line)" }}>
                  <strong style={{ fontSize: "14px", color: "var(--ink)" }}>{isEs ? "Tarifas de Originación" : "Origination Fees"}</strong>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12.5px", color: "var(--ink-soft)" }}>
                    {isEs ? "Cargos administrativos deducidos antes de recibir el dinero." : "Upfront fees deducted from loan disbursements."}
                  </p>
                </div>
                <div style={{ padding: "12px 16px", background: "var(--card)", borderRadius: "8px", border: "1px solid var(--line)" }}>
                  <strong style={{ fontSize: "14px", color: "var(--ink)" }}>{isEs ? "Tasa APR Real" : "Annual Percentage Rate (APR)"}</strong>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12.5px", color: "var(--ink-soft)" }}>
                    {isEs ? "El costo anualizado verdadero que incluye comisiones y capitalización." : "True annualized borrowing cost incorporating compounding & fees."}
                  </p>
                </div>
                <div style={{ padding: "12px 16px", background: "var(--card)", borderRadius: "8px", border: "1px solid var(--line)" }}>
                  <strong style={{ fontSize: "14px", color: "var(--ink)" }}>{isEs ? "Pagos Durante el Estudio" : "In-School Payments"}</strong>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12.5px", color: "var(--ink-soft)" }}>
                    {isEs ? "¿Exigen pagos de intereses mínimos mientras aún cursas materias?" : "Does the lender mandate interest payments while enrolled?"}
                  </p>
                </div>
                <div style={{ padding: "12px 16px", background: "var(--card)", borderRadius: "8px", border: "1px solid var(--line)" }}>
                  <strong style={{ fontSize: "14px", color: "var(--ink)" }}>{isEs ? "Plazo y Monto Total" : "Total Repaid Over Time"}</strong>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12.5px", color: "var(--ink-soft)" }}>
                    {isEs ? "La suma total de capital e intereses durante 5, 10 o 15 años." : "Cumulative principal + interest across 5, 10, or 15-year terms."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Side-by-Side Comparison Matrix */}
          <section className="doc-section" id="side-by-side" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 5 de 6" : "Part 5 of 6"}</span>
            <h2>{isEs ? "Tabla Comparativa: Préstamos Federales Directos vs. Préstamos Privados" : "Comparison Matrix: Federal Direct Loans vs. Private Student Loans"}</h2>
            <p className="lead" style={{ fontSize: "16px", lineHeight: "1.6" }}>
              {isEs
                ? "Diferencias estructurales entre las opciones federales vigentes y los préstamos privados de posgrado:"
                : "Structural differences between current federal direct lending and private graduate student loans:"}
            </p>

            <div style={{ overflowX: "auto", margin: "20px 0", borderRadius: "12px", border: "1px solid var(--line)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "var(--card)", borderBottom: "2px solid var(--line)" }}>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Característica" : "Feature"}</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700, color: "var(--teal)" }}>{isEs ? "Préstamos Federales Directos" : "Federal Direct Loans"}</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700, color: "#2563eb" }}>{isEs ? "Préstamos Privados de Posgrado" : "Private Graduate Loans"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Límites de Endeudamiento" : "Borrowing Limits"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "$20,500/año ($100k total) o $50,000/año ($200k profesional)" : "$20,500/yr ($100k cap) or $50,000/yr ($200k professional)"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Hasta el costo de asistencia (COA) menos otra ayuda" : "Up to total cost of attendance (COA) minus other aid"}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--line)", background: "color-mix(in srgb, var(--bg) 50%, var(--card))" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Tipo de Tasa de Interés" : "Interest Rate Basis"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Fija por ley para toda la vida del préstamo" : "Fixed for the life of the loan by federal statute"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Fija o Variable (basada en SOFR/mercado y solvencia)" : "Fixed or Variable (based on SOFR, credit tier & cosigner)"}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Verificación de Crédito" : "Credit Score Check"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "No se requiere verificación crediticia" : "No credit check required for Direct Unsubsidized"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Obligatoria (FICO y verificación de ingresos)" : "Mandatory hard inquiry, strict credit & income scrutiny"}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--line)", background: "color-mix(in srgb, var(--bg) 50%, var(--card))" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Requisito de Codeudor" : "Cosigner Requirement"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Nunca se requiere codeudor" : "Never required"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Frecuentemente necesario para obtener tasas competitivas" : "Frequently required to obtain viable interest rates"}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Planes Basados en Ingresos (IDR)" : "Income-Driven Repayment (IDR)"}</td>
                    <td style={{ padding: "14px 16px", color: "var(--teal)", fontWeight: 600 }}>{isEs ? "Disponibles por ley federal (pagos según salario)" : "Yes, payments capped as a percentage of discretionary income"}</td>
                    <td style={{ padding: "14px 16px", color: "#c6333b", fontWeight: 600 }}>{isEs ? "No disponible (cuotas fijas mensuales obligatorias)" : "No IDR safety net (fixed standard payments required)"}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Condonación por Servicio Público (PSLF)" : "Public Service Loan Forgiveness (PSLF)"}</td>
                    <td style={{ padding: "14px 16px", color: "var(--teal)", fontWeight: 600 }}>{isEs ? "Califica tras 120 pagos en empleo cualificado" : "Eligible after 120 qualifying monthly payments"}</td>
                    <td style={{ padding: "14px 16px", color: "#c6333b", fontWeight: 600 }}>{isEs ? "Completamente inelegible para PSLF" : "Ineligible for federal forgiveness"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6: Interactive Decision & Suitability Tool */}
          <section className="doc-section" id="suitability" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 6 de 6" : "Part 6 de 6"}</span>
            <h2>{isEs ? "Lista Interactiva de Evaluación: ¿Tiene Sentido un Préstamo Privado?" : "Interactive Suitability Checklist: Should You Borrow Privately?"}</h2>
            <p className="lead" style={{ fontSize: "16px", lineHeight: "1.6" }}>
              {isEs
                ? "Utiliza esta guía para revisar si cumples las condiciones óptimas antes de solicitar financiamiento privado:"
                : "Review these four critical checkpoints to determine whether taking out private loans is prudent for your degree:"}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "14px",
                margin: "24px 0",
              }}
            >
              {SUITABILITY_ITEMS.map((item) => {
                const isChecked = checkedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleChecklist(item.id)}
                    style={{
                      textAlign: "left",
                      padding: "18px 20px",
                      borderRadius: "12px",
                      border: isChecked ? "1.5px solid var(--teal)" : "1px solid var(--line)",
                      background: isChecked
                        ? "color-mix(in srgb, var(--teal) 6%, var(--card))"
                        : "var(--bg)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                          border: isChecked ? "2px solid var(--teal)" : "2px solid var(--ink-soft)",
                          background: isChecked ? "var(--teal)" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: "13px",
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        {isChecked ? "✓" : ""}
                      </div>
                      <div>
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: "11.5px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            color: isChecked ? "var(--teal)" : "var(--ink-soft)",
                            marginBottom: "4px",
                          }}
                        >
                          {isEs ? item.tagEs : item.tagEn}
                        </span>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", marginBottom: "6px" }}>
                          {isEs ? item.titleEs : item.titleEn}
                        </div>
                        <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                          {isEs ? item.descEs : item.descEn}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Line Summary */}
            <div
              style={{
                padding: "24px",
                background: "var(--card)",
                borderRadius: "14px",
                border: "1px solid var(--line)",
                borderLeft: "4px solid var(--teal)",
                margin: "24px 0",
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>
                {isEs ? "En Conclusión (The Bottom Line)" : "The Bottom Line"}
              </h3>
              <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                {isEs ? (
                  <>
                    Los cambios recientes en la política federal de préstamos de posgrado han estado empujando a los estudiantes <strong>del crédito público hacia los préstamos privados</strong>. Compara el costo integral de cada prestamista y sopesa cuidadosamente tus finanzas personales, tu elegibilidad y tus metas de carrera para comprobar si los préstamos privados tienen sentido para ti.
                  </>
                ) : (
                  <>
                    Recent changes in federal graduate student loan policy have been pushing borrowers <strong>from public to private loans</strong>. Compare the full cost of lenders, as well as consider your personal finances, eligibility, and career goals to see if private loans make sense for you.
                  </>
                )}
              </p>
            </div>

            {/* Related Articles Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "18px",
                margin: "28px 0 24px 0",
              }}
            >
              <Link
                to="/blog/professional-degree-loan-limits"
                style={{
                  display: "block",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid var(--teal)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--teal)", textTransform: "uppercase" }}>
                  {isEs ? "Límites Federales" : "Federal Limits"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "¿Cuáles son los 11 Títulos Profesionales que Califican para Límites Más Altos?"
                    : "Which 11 Professional Degrees Qualify for Higher Federal Loan Limits?"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Desglose de los topes de $50k/año y $200k acumulados, costos de asistencia y las 6 carreras donde la deuda supera el límite."
                    : "Breakdown of the $50k/yr and $200k aggregate caps across medicine, law, dentistry, and 8 other fields."}
                </p>
              </Link>

              <Link
                to="/cosigner-hub"
                style={{
                  display: "block",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #2563eb",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>
                  {isEs ? "Centro del Codeudor" : "Cosigner Guide"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs ? "Centro del Codeudor (Cosigner Hub)" : "The Cosigner Hub"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Derechos, responsabilidades legales, requisitos crediticios y cláusulas de liberación para codeudores de préstamos privados."
                    : "Legal obligations, credit requirements, and cosigner release clauses for private education loans."}
                </p>
              </Link>

              <Link
                to="/blog/whats-happening-with-pslf"
                style={{
                  display: "block",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #d97706",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#d97706", textTransform: "uppercase" }}>
                  {isEs ? "Servicio Público" : "Public Service"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "¿Qué Está Pasando con la Condonación PSLF?"
                    : "What's Happening with Public Service Loan Forgiveness (PSLF)?"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Análisis de demoras, el rastreador de pagos y cómo los préstamos privados quedan excluidos del perdón de deuda."
                    : "Analysis of processing delays, buyback backlogs, and why private loans forfeit all forgiveness rights."}
                </p>
              </Link>

              <Link
                to="/blog/refinancing-student-loans"
                style={{
                  display: "block",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid var(--ink)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink)", textTransform: "uppercase" }}>
                  {isEs ? "Refinanciamiento" : "Refinancing"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "Refinanciamiento de Préstamos Estudiantiles, Explicado"
                    : "Refinancing Student Loans, Explained"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Paso a paso para evaluar si el refinanciamiento privado es conveniente y cómo calcular el ahorro neto de intereses."
                    : "A six-step guide to calculating net interest savings and navigating private refinancing safely."}
                </p>
              </Link>
            </div>

            {/* Official Sources Citation Box */}
            <div
              style={{
                marginTop: "32px",
                padding: "20px 24px",
                background: "var(--bg)",
                borderRadius: "12px",
                border: "1px solid var(--line)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  lineHeight: "1.65",
                  color: "var(--ink-soft)",
                }}
              >
                {isEs ? (
                  <>
                    <strong>Fuentes oficiales:</strong> Business Insider, UC Law San Francisco, U.S. Department of Education, Consumer Financial Protection Bureau. Revisado al 15 de nov. de 2026. Autor: Jaylen Peng.
                  </>
                ) : (
                  <>
                    <strong>Sources:</strong> Business Insider, UC Law San Francisco, U.S. Department of Education, Consumer Financial Protection Bureau. Reviewed as of Nov. 15, 2026. Author: Jaylen Peng.
                  </>
                )}
              </p>
            </div>

            {/* Educational Disclaimer */}
            <p
              style={{
                margin: "18px 0 28px 0",
                fontSize: "13px",
                lineHeight: "1.6",
                color: "var(--ink-soft)",
                fontStyle: "italic",
              }}
            >
              {isEs ? (
                <>
                  Este artículo tiene fines exclusivamente educativos e informativos y no constituye asesoramiento financiero ni legal. Las tasas de interés de los prestamistas privados y los términos de crédito varían según el perfil individual.
                </>
              ) : (
                <>
                  This article is for education and informational purposes only and is not financial or legal advice. Private student loan interest rates and approval terms vary based on individual credit profiles and underwriting criteria.
                </>
              )}
            </p>

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
              <h3 style={{ marginTop: 0, fontSize: "20px", fontWeight: 700 }}>
                {isEs
                  ? "Modela tus Opciones de Financiamiento y Compara Ofertas"
                  : "Model Your Financing Options & Compare Aid Offers"}
              </h3>
              <p
                style={{
                  marginBottom: "20px",
                  fontSize: "15.5px",
                  lineHeight: "1.6",
                  color: "var(--ink-soft)",
                }}
              >
                {isEs
                  ? "Utiliza nuestras herramientas gratuitas para calcular tu costo neto, estimar cuotas mensuales y evaluar alternativas antes de contraer deuda privada."
                  : "Use our free interactive tools to project net costs, compare aid packages, and evaluate borrowing trade-offs before taking on private debt."}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <Link
                  to="/chart-your-path"
                  className="button-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                  }}
                >
                  {isEs ? "Traza tu camino" : "Chart Your Path"}
                  <ArrowRightIcon />
                </Link>
                <Link
                  to="/aid-offer-comparison"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 20px",
                    borderRadius: "999px",
                    border: "1.5px solid var(--teal)",
                    color: "var(--teal)",
                    fontWeight: 700,
                    fontSize: "14.5px",
                    textDecoration: "none",
                    background: "var(--card)",
                  }}
                >
                  {isEs ? "Comparar ofertas de ayuda" : "Compare Aid Offers"}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}

export default CanYouReplaceGradPlusWithPrivateLoansPage;

