import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "What Makes a Good MBA Program? | Grad Navigator";
const DESCRIPTION =
  "Here’s what to consider when choosing the best MBA program for you: accreditation, rankings, comparing costs, graduate outcomes, and personal career fit. By Carson Jung, revised by Jaylen Peng.";
const URL = "https://www.graduationnavigator.com/blog/what-makes-a-good-mba-program";

export const Route = createFileRoute("/blog_/what-makes-a-good-mba-program")({
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
              name: "Carson Jung",
            },
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
          datePublished: "2026-11-03",
          dateModified: "2026-11-03",
        }),
      },
    ],
  }),
  component: WhatMakesAGoodMbaProgramArticlePage,
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

function ShieldCheckIcon() {
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
      style={{ color: "var(--teal)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function AwardIcon() {
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
      style={{ color: "var(--teal)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
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
      style={{ color: "var(--teal)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
      style={{ color: "var(--teal)", flexShrink: 0 }}
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

function CompassIcon() {
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
      style={{ color: "var(--teal)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
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

interface ChecklistItem {
  id: string;
  tagEn: string;
  tagEs: string;
  titleEn: string;
  titleEs: string;
  descEn: string;
  descEs: string;
}

const MBA_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "accreditation",
    tagEn: "Baseline Quality",
    tagEs: "Calidad Base",
    titleEn: "Verified Institution-Wide & Business Accreditation",
    titleEs: "Acreditación Institucional y de Negocios Verificada",
    descEn:
      "Confirmed the university holds recognized institution-wide accreditation (required for federal aid) and checked business school credentials such as AACSB.",
    descEs:
      "Confirmaste que la universidad cuenta con acreditación institucional reconocida (requisito para ayuda federal) y verificaste sellos como AACSB.",
  },
  {
    id: "net-cost",
    tagEn: "Cost & ROI",
    tagEs: "Costo y ROI",
    titleEn: "Compared Total 2-Year Net Cost & Lost Earnings",
    titleEs: "Comparaste el Costo Neto Total a 2 Años e Ingresos No Percibidos",
    descEn:
      "Evaluated total cost of attendance ($63k average to $200k+ top tier), scholarships, in-state options, and two years of forgone salary.",
    descEs:
      "Evaluaste el costo total de asistencia ($63k promedio a $200k+ nivel superior), becas, opciones estatales y dos años de salario no percibido.",
  },
  {
    id: "loan-gap",
    tagEn: "Borrowing Plan",
    tagEs: "Plan de Préstamos",
    titleEn: "Checked Federal Loan Caps vs. Private Debt Need",
    titleEs: "Verificaste los Límites Federales frente a Deuda Privada",
    descEn:
      "Calculated whether the program costs more than federal Direct Loans allow you to borrow, and confirmed whether you can comfortably repay any loans taken.",
    descEs:
      "Calculaste si el programa cuesta más de lo que permiten los préstamos federales y confirmaste si podrás pagar los préstamos solicitados.",
  },
  {
    id: "placement",
    tagEn: "Career Demand",
    tagEs: "Demanda Laboral",
    titleEn: "Reviewed 3-to-6 Month Job Placement & Starting Income",
    titleEs: "Revisaste la Tasa de Empleo a 3–6 Meses e Ingreso Promedio",
    descEn:
      "Checked the percentage of graduates securing full-time positions in their intended industries within 3 to 6 months and verified the program passes federal earnings benchmarks.",
    descEs:
      "Verificaste el porcentaje de graduados que consiguen empleo a tiempo completo en su industria en 3 a 6 meses y que el programa supere la prueba federal de ingresos.",
  },
  {
    id: "format",
    tagEn: "Personal Fit",
    tagEs: "Ajuste Personal",
    titleEn: "Matched Program Format & Employer Proximity",
    titleEs: "Alineaste el Formato del Programa y Cercanía a Empleadores",
    descEn:
      "Decided whether a full-time, part-time, or online schedule fits your circumstances and assessed proximity to target employers and networking hubs.",
    descEs:
      "Definiste si un horario de tiempo completo, parcial o en línea se adapta a tu situación y evaluaste la cercanía con empleadores clave.",
  },
  {
    id: "pipeline",
    tagEn: "Skills & Network",
    tagEs: "Habilidades y Red",
    titleEn: "Evaluated Career Advising, Internships & Concentrations",
    titleEs: "Evaluaste Asesoría Profesional, Pasantías y Especialidades",
    descEn:
      "Confirmed strong recruiting relationships, active alumni connections, internship pipelines, and courses that build relevant skills for your career goals.",
    descEs:
      "Confirmaste relaciones sólidas de reclutamiento, red activa de exalumnos, acceso a pasantías y cursos que desarrollen habilidades relevantes.",
  },
];

function WhatMakesAGoodMbaProgramArticlePage() {
  const { t, lang } = useI18n();
  const isEs = lang === "es";
  const [checkedIds, setCheckedIds] = useState<string[]>([
    "accreditation",
    "net-cost",
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
        <section className="wrap doc-hero">
          <div className="article-back" style={{ marginBottom: "16px" }}>
            <Link
              to="/blog"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              ← {t("blog.h1")}
            </Link>
          </div>
          <div className="eyebrow">{t("gmba.eyebrow")}</div>
          <h1>{t("gmba.h1")}</h1>
          <p className="sub">{t("gmba.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("gmba.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("gmba.why.title")}</h4>
              <p>{t("gmba.why.p")}</p>
            </div>
          </div>

          {/* Key Benchmark Stat Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginTop: "24px",
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
                ~6%
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs
                  ? "Escuelas con Acreditación AACSB"
                  : "AACSB-Accredited Globally"}
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
                  ? "Acreditación voluntaria que posee ~6% de escuelas de negocios en el mundo"
                  : "Voluntary quality signal held by ~6% of business schools worldwide"}
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderTop: "3px solid var(--ink)",
                borderRadius: "12px",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  lineHeight: 1.15,
                }}
              >
                ~$63,000
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs
                  ? "Costo Promedio de un MBA (2 Años)"
                  : "Average 2-Year MBA Cost"}
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
                  ? "Incluyendo matrícula, cuotas y gastos de manutención durante dos años"
                  : "Including tuition, fees, and living expenses over two years"}
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderTop: "3px solid #D99B26",
                borderRadius: "12px",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#D99B26",
                  lineHeight: 1.15,
                }}
              >
                $200,000+
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs
                  ? "Costo en Programas de Alto Costo"
                  : "Upper-Tier Program Cost"}
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
                  ? "Para ciertos programas de MBA, el costo total supera los $200,000"
                  : "For certain MBA programs, two-year total cost reaches over $200,000"}
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
                {isEs ? "1 Jul 2027" : "July 1, 2027"}
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs
                  ? "Prueba Federal de Ingresos"
                  : "Federal Earnings Test Rule"}
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
                  ? "Programas cuyos graduados no superen la prueba pueden perder Préstamos Directos"
                  : "Programs failing the OBBB earnings test can lose Direct Loan access"}
              </div>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#accreditation">{t("gmba.nav.accreditation")}</a>
          <a href="#program-rank">{t("gmba.nav.rank")}</a>
          <a href="#comparing-costs">{t("gmba.nav.costs")}</a>
          <a href="#graduate-outcomes">{t("gmba.nav.outcomes")}</a>
          <a href="#what-else">{t("gmba.nav.consider")}</a>
          <a href="#bottom-line">{t("gmba.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: Accreditation Comes First */}
          <section className="doc-section" id="accreditation" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 1 de 5" : "Part 1 of 5"}</span>
            <h2>{isEs ? "La Acreditación Primero" : "Accreditation Comes First"}</h2>
            <p className="lead" style={{ fontSize: "17px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  La acreditación, una <strong>revisión externa</strong> que verifica si una institución cumple con los estándares de calidad, es la base de referencia para cualquier programa.
                </>
              ) : (
                <>
                  Accreditation, an <strong>external review</strong> that checks whether a school meets quality standards, is the baseline for any program.
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <ShieldCheckIcon />
                  <h3 style={{ margin: 0, fontSize: "17.5px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs ? "El Estándar AACSB (~6%)" : "AACSB Accreditation (~6%)"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Uno de los acreditadores de escuelas de negocios ampliamente reconocidos es la{" "}
                      <strong style={{ color: "var(--ink)" }}>
                        Association to Advance Collegiate Schools of Business (AACSB)
                      </strong>
                      , la cual es voluntaria y la posee cerca del 6% de las escuelas de negocios en todo el mundo.
                    </>
                  ) : (
                    <>
                      One widely-recognized business school accreditor is the{" "}
                      <strong style={{ color: "var(--ink)" }}>
                        Association to Advance Collegiate Schools of Business (AACSB)
                      </strong>
                      , which is voluntary and held by about 6% of business schools worldwide.
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
                  borderTop: "3px solid var(--ink)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <AwardIcon />
                  <h3 style={{ margin: 0, fontSize: "17.5px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs ? "Una Señal de Calidad, No la Única" : "One Quality Signal to Weigh"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Una escuela sin acreditación de la AACSB{" "}
                      <strong style={{ color: "var(--ink)" }}>no carece automáticamente de acreditación</strong>. La AACSB es una señal de calidad a considerar, no la única.
                    </>
                  ) : (
                    <>
                      A school without an AACSB accreditation{" "}
                      <strong style={{ color: "var(--ink)" }}>is not automatically unaccredited</strong>. AACSB is one quality signal to weigh, not the only one.
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
                  borderTop: "3px solid #D99B26",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <CompassIcon />
                  <h3 style={{ margin: 0, fontSize: "17.5px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs ? "Verifica el Acreditador Oficial" : "Verify Recognized Agencies"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      <strong style={{ color: "var(--ink)" }}>Puedes verificar</strong> el acreditador de una institución consultando la{" "}
                      <a
                        href="https://www.ed.gov/laws-and-policy/higher-education-laws-and-policy/college-accreditation"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--teal)", fontWeight: 600, textDecoration: "underline" }}
                      >
                        lista de agencias reconocidas del Departamento de Educación
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      <strong style={{ color: "var(--ink)" }}>You can check</strong> a school’s accreditor against the{" "}
                      <a
                        href="https://www.ed.gov/laws-and-policy/higher-education-laws-and-policy/college-accreditation"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--teal)", fontWeight: 600, textDecoration: "underline" }}
                      >
                        Department of Education’s list of recognized agencies
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Federal Aid Institution-Wide Accreditation Callout */}
            <div
              className="rates-callout-zoom"
              style={{
                marginTop: "20px",
                background: "color-mix(in srgb, var(--teal) 9%, var(--card))",
                borderLeft: "4px solid var(--teal)",
              }}
            >
              <div className="rates-callout-zoom-icon">
                <ShieldCheckIcon />
              </div>
              <div className="rates-callout-zoom-content">
                <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "Requisito Clave para Ayuda Financiera Federal"
                    : "Federal Financial Aid Eligibility Rule"}
                </h4>
                <p style={{ margin: 0, fontSize: "15.5px", lineHeight: "1.6", color: "var(--ink)" }}>
                  {isEs ? (
                    <>
                      Para la ayuda federal, la <strong>acreditación de toda la institución</strong> es fundamental porque solo las instituciones acreditadas son elegibles.
                    </>
                  ) : (
                    <>
                      For federal aid, <strong>institution-wide accreditation</strong> matters because only accredited institutions are eligible.
                    </>
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Program Rank */}
          <section className="doc-section" id="program-rank" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 2 de 5" : "Part 2 of 5"}</span>
            <h2>{isEs ? "Clasificación del Programa (Rankings)" : "Program Rank"}</h2>
            <p style={{ fontSize: "16.5px", lineHeight: "1.65", marginBottom: "16px" }}>
              {isEs ? (
                <>
                  <strong>Los rankings pueden ser una herramienta útil.</strong> U.S. News &amp; World Report clasifica los programas de MBA de tiempo completo utilizando una combinación ponderada de resultados profesionales de los graduados, credenciales académicas estudiantiles y evaluaciones de pares de escuelas de negocios y reclutadores. Las publicaciones utilizan <strong>diferentes metodologías</strong> y fórmulas, por lo que las clasificaciones pueden variar según dónde consultes.
                </>
              ) : (
                <>
                  <strong>Rankings can be a helpful tool.</strong> U.S. News &amp; World Report ranks full-time MBA programs using a weighted combination of graduate career outcomes, student academic credentials, and assessments from business school peers and recruiters. Publications use <strong>different methodologies</strong> and formulas, so rankings may vary depending on where you look.
                </>
              )}
            </p>
            <p style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Sin embargo, los rankings no cuentan toda la historia y pueden omitir factores que son importantes para un estudiante. Los futuros estudiantes también deben considerar sus finanzas y sus objetivos profesionales individuales.
                </>
              ) : (
                <>
                  However, rankings don’t tell the whole story and may not include factors that matter to a student. Prospective students should also consider the finances and their individual career goals.
                </>
              )}
            </p>

            {/* Side-by-side comparison: What Rankings Weigh vs. What Rankings Leave Out */}
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
                  borderRadius: "14px",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid var(--teal)",
                }}
              >
                <span
                  style={{
                    fontSize: "11.5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontWeight: 700,
                    color: "var(--teal)",
                  }}
                >
                  {isEs ? "Qué Miden las Listas (ej. U.S. News)" : "What Rankings Typically Weigh"}
                </span>
                <h3 style={{ margin: "6px 0 14px 0", fontSize: "19px", fontWeight: 700 }}>
                  {isEs ? "Métricas Institucionales Ponderadas" : "Weighted Institutional Metrics"}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "14.5px", lineHeight: "1.55" }}>
                      {isEs ? (
                        <>
                          <strong>Resultados profesionales:</strong> tasas de empleo y salarios iniciales de los graduados.
                        </>
                      ) : (
                        <>
                          <strong>Graduate career outcomes:</strong> employment rates and starting compensation packages.
                        </>
                      )}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "14.5px", lineHeight: "1.55" }}>
                      {isEs ? (
                        <>
                          <strong>Credenciales académicas:</strong> puntajes de exámenes de admisión, GPA y selectividad.
                        </>
                      ) : (
                        <>
                          <strong>Student academic credentials:</strong> test scores, undergraduate GPA, and admissions selectivity.
                        </>
                      )}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "14.5px", lineHeight: "1.55" }}>
                      {isEs ? (
                        <>
                          <strong>Evaluaciones de reputación:</strong> encuestas a decanos, pares académicos y reclutadores corporativos.
                        </>
                      ) : (
                        <>
                          <strong>Peer &amp; recruiter assessments:</strong> reputation surveys from business school peers and corporate recruiters.
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "24px",
                  borderRadius: "14px",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #D99B26",
                }}
              >
                <span
                  style={{
                    fontSize: "11.5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontWeight: 700,
                    color: "#D99B26",
                  }}
                >
                  {isEs ? "Lo Que los Rankings No Muestran" : "What Rankings Don't Tell You"}
                </span>
                <h3 style={{ margin: "6px 0 14px 0", fontSize: "19px", fontWeight: 700 }}>
                  {isEs ? "Tus Finanzas y Metas Individuales" : "Your Finances & Individual Goals"}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "14.5px", lineHeight: "1.55" }}>
                      {isEs ? (
                        <>
                          <strong>Costo neto personal:</strong> becas disponibles, matrícula estatal y endeudamiento requerido.
                        </>
                      ) : (
                        <>
                          <strong>Personal net cost &amp; debt:</strong> your scholarship offer, in-state tuition savings, and loan burden.
                        </>
                      )}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "14.5px", lineHeight: "1.55" }}>
                      {isEs ? (
                        <>
                          <strong>Metas profesionales específicas:</strong> qué tan bien conecta la escuela con tu industria o región objetivo.
                        </>
                      ) : (
                        <>
                          <strong>Individual career alignment:</strong> how well the program connects to your specific target industry or region.
                        </>
                      )}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircleIcon />
                    <span style={{ fontSize: "14.5px", lineHeight: "1.55" }}>
                      {isEs ? (
                        <>
                          <strong>Diferencias de fórmulas:</strong> una misma escuela puede variar drásticamente entre distintas publicaciones.
                        </>
                      ) : (
                        <>
                          <strong>Methodology swings:</strong> different publications use different formulas, causing ranks to vary widely.
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Companion Article Link */}
            <div
              style={{
                marginTop: "20px",
                padding: "18px 22px",
                borderRadius: "12px",
                background: "color-mix(in srgb, var(--line) 35%, var(--card))",
                border: "1px solid var(--line)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--teal)",
                    fontWeight: 700,
                  }}
                >
                  {isEs ? "Lectura Relacionada" : "Related Analysis"}
                </span>
                <div style={{ fontSize: "15.5px", fontWeight: 700, color: "var(--ink)", marginTop: "2px" }}>
                  {isEs
                    ? "Programas de MBA: ¿Importa el Prestigio? (Comparativa de Top 10 ROI vs. Top 10 Valor)"
                    : "MBA Programs: Does Prestige Matter? (Top 10 Highest ROI vs. Top 10 Value Programs)"}
                </div>
              </div>
              <Link
                to="/blog/mba-prestige-roi"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--teal)",
                  textDecoration: "none",
                }}
              >
                {isEs ? "Ver datos de ROI" : "Explore ROI data"}
                <ArrowRightIcon />
              </Link>
            </div>
          </section>

          {/* Section 3: Comparing Costs */}
          <section className="doc-section" id="comparing-costs" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 3 de 5" : "Part 3 of 5"}</span>
            <h2>{isEs ? "Comparación de Costos" : "Comparing Costs"}</h2>
            <p className="lead" style={{ fontSize: "17px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  El costo de un programa afecta el <strong>retorno de inversión (ROI)</strong> del estudiante.
                </>
              ) : (
                <>
                  A program’s cost affects a student’s <strong>return on investment (ROI)</strong>.
                </>
              )}
            </p>

            {/* Visual Cost vs. Federal Borrowing Cap Bar Comparison */}
            <div
              style={{
                padding: "26px",
                borderRadius: "16px",
                background: "var(--card)",
                border: "1px solid var(--line)",
                margin: "24px 0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <DollarSignIcon />
                <h3 style={{ margin: 0, fontSize: "18.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "El Panorama de Costos de un MBA (2 Años)"
                    : "The Two-Year MBA Cost Spectrum"}
                </h3>
              </div>
              <p style={{ margin: "0 0 20px 0", fontSize: "14.5px", color: "var(--ink-soft)" }}>
                {isEs
                  ? "Comparación del costo total de dos años (matrícula, cuotas y manutención) frente a los límites anuales de préstamos federales."
                  : "Comparing total two-year MBA costs (tuition, fees, and living expenses) against federal graduate borrowing limits."}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Bar 1: Average MBA */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "6px",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--ink)" }}>
                      {isEs
                        ? "Costo Promedio de un Programa de MBA (2 años, incluye matrícula, cuotas y manutención)"
                        : "Average MBA Program (2 years, including tuition, fees & living expenses)"}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "var(--teal)",
                        flexShrink: 0,
                      }}
                    >
                      ~$63,000
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "12px",
                      background: "color-mix(in srgb, var(--line) 65%, transparent)",
                      borderRadius: "999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "31.5%",
                        height: "100%",
                        background: "var(--teal)",
                        borderRadius: "999px",
                      }}
                    />
                  </div>
                </div>

                {/* Bar 2: Upper-Tier MBA */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "6px",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--ink)" }}>
                      {isEs
                        ? "Ciertos Programas de MBA de Alto Costo (2 años)"
                        : "Certain High-Cost MBA Programs (2 years total cost)"}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#D99B26",
                        flexShrink: 0,
                      }}
                    >
                      $200,000+
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "12px",
                      background: "color-mix(in srgb, var(--line) 65%, transparent)",
                      borderRadius: "999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, var(--teal) 0%, #D99B26 70%, #c6333b 100%)",
                        borderRadius: "999px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Bullet Points from PDF */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                gap: "18px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  padding: "22px",
                  background: "var(--card)",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <span className="rates-diff-tag" style={{ display: "inline-block", marginBottom: "10px" }}>
                  {isEs ? "Rango de Costo" : "Cost Benchmark"}
                </span>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink)" }}>
                  {isEs ? (
                    <>
                      <strong>
                        El programa de MBA promedio cuesta aproximadamente{" "}
                        <span style={{ color: "var(--teal)" }}>$63,000</span> durante dos años, incluyendo matrícula, cuotas y gastos de manutención.
                      </strong>{" "}
                      En ciertos programas, puede superar los{" "}
                      <strong style={{ color: "var(--teal)" }}>$200,000</strong>.
                    </>
                  ) : (
                    <>
                      <strong>
                        The average MBA program costs approximately{" "}
                        <span style={{ color: "var(--teal)" }}>$63,000</span> over two years, including tuition, fees, and living expenses.
                      </strong>{" "}
                      For certain programs, it can reach over{" "}
                      <strong style={{ color: "var(--teal)" }}>$200,000</strong>.
                    </>
                  )}
                </p>
              </div>

              <div
                style={{
                  padding: "22px",
                  background: "var(--card)",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <span className="rates-diff-tag" style={{ display: "inline-block", marginBottom: "10px" }}>
                  {isEs ? "Ecuación Completa" : "Total Investment"}
                </span>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Los futuros estudiantes deben comparar el <strong style={{ color: "var(--ink)" }}>costo total de asistencia</strong> de cada escuela, las <strong style={{ color: "var(--ink)" }}>becas disponibles</strong> y los <strong style={{ color: "var(--ink)" }}>posibles ingresos no percibidos</strong> al evaluar si un programa vale la inversión.
                    </>
                  ) : (
                    <>
                      Prospective students should compare each school’s <strong style={{ color: "var(--ink)" }}>total cost of attendance</strong>, <strong style={{ color: "var(--ink)" }}>available scholarships</strong>, and <strong style={{ color: "var(--ink)" }}>potential lost earnings</strong> when evaluating whether a program is worth the investment.
                    </>
                  )}
                </p>
              </div>

              <div
                style={{
                  padding: "22px",
                  background: "var(--card)",
                  borderRadius: "12px",
                  border: "1px solid var(--line)",
                }}
              >
                <span className="rates-diff-tag" style={{ display: "inline-block", marginBottom: "10px" }}>
                  {isEs ? "Ventaja Residente" : "Public In-State Value"}
                </span>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Los estudiantes pueden considerar <strong style={{ color: "var(--ink)" }}>opciones dentro de su estado</strong>, ya que los residentes suelen pagar una matrícula más baja en los programas públicos locales.
                    </>
                  ) : (
                    <>
                      Students may want to consider <strong style={{ color: "var(--ink)" }}>in-state options</strong>, as residents may pay lower tuition at local public programs.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Federal Loan Cap & Private Debt Callout from PDF */}
            <div
              style={{
                padding: "24px",
                borderRadius: "14px",
                background: "color-mix(in srgb, #D99B26 10%, var(--card))",
                border: "1px solid color-mix(in srgb, #D99B26 35%, var(--line))",
                borderLeft: "4px solid #D99B26",
              }}
            >
              <p style={{ margin: 0, fontSize: "16px", lineHeight: "1.65", color: "var(--ink)" }}>
                {isEs ? (
                  <>
                    Un MBA ahora puede <strong>costar más</strong> de lo que los préstamos federales te permiten pedir prestado. El programa que elijas también afecta cuánta deuda privada podrías asumir después. Los prestatarios deben considerar si podrán pagar los préstamos que tomen para su programa. Puedes conocer las posibles opciones de financiamiento{" "}
                    <Link
                      to="/pay-for-school"
                      style={{ color: "var(--teal)", fontWeight: 700, textDecoration: "underline" }}
                    >
                      aquí
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    An MBA can now <strong>cost more</strong> than federal loans allow you to borrow. The program you choose also affects how much private debt you may carry afterward. Borrowers should consider whether they can repay the loans they take for their program. You can learn about potential financing options{" "}
                    <Link
                      to="/pay-for-school"
                      style={{ color: "var(--teal)", fontWeight: 700, textDecoration: "underline" }}
                    >
                      here
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>
          </section>

          {/* Section 4: Graduate Outcomes */}
          <section className="doc-section" id="graduate-outcomes" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 4 de 5" : "Part 4 of 5"}</span>
            <h2>{isEs ? "Resultados de los Graduados" : "Graduate Outcomes"}</h2>
            <p className="lead" style={{ fontSize: "17px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Los resultados de los graduados son uno de los <strong>factores más importantes</strong> al elegir un programa de MBA, especialmente para quienes solicitan préstamos estudiantiles. Los altos ingresos permiten al estudiante pagar sus préstamos y maximizar su ROI.
                </>
              ) : (
                <>
                  Graduate outcomes are one of the <strong>most important factors</strong> when choosing an MBA program, especially for student borrowers. High earnings allow students to repay student loans and maximize their ROI.
                </>
              )}
            </p>

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
                  borderTop: "3px solid var(--teal)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <TrendingUpIcon />
                  <h3 style={{ margin: 0, fontSize: "17.5px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs ? "Empleo en 3 a 6 Meses" : "3-to-6 Month Job Placement"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Revisa <strong style={{ color: "var(--ink)" }}>qué porcentaje de graduados consigue empleo</strong> dentro de los tres a seis meses posteriores a la graduación. Las altas tasas de empleo pueden indicar una fuerte demanda por parte de los empleadores.
                    </>
                  ) : (
                    <>
                      Check <strong style={{ color: "var(--ink)" }}>what percentage of graduates secure jobs</strong> within three to six months of graduation. High employment rates can indicate strong employer demand.
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
                  borderTop: "3px solid var(--ink)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <DollarSignIcon />
                  <h3 style={{ margin: 0, fontSize: "17.5px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs ? "Industria Objetivo e Ingreso Promedio" : "Industry Fit & Average Income"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Considera también si consiguen <strong style={{ color: "var(--ink)" }}>puestos de tiempo completo en sus industrias previstas</strong> y cuál es su <strong style={{ color: "var(--ink)" }}>ingreso promedio</strong>.
                    </>
                  ) : (
                    <>
                      Also consider whether they secure <strong style={{ color: "var(--ink)" }}>full-time positions in their intended industries</strong> and <strong style={{ color: "var(--ink)" }}>average income</strong>.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* July 1, 2027 One Big Beautiful Bill Warning Card */}
            <div
              style={{
                marginTop: "20px",
                padding: "24px",
                borderRadius: "14px",
                background: "color-mix(in srgb, #c6333b 8%, var(--card))",
                border: "1px solid color-mix(in srgb, #c6333b 28%, var(--line))",
                borderLeft: "4px solid #c6333b",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#c6333b",
                    background: "color-mix(in srgb, #c6333b 12%, transparent)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {isEs ? "Alerta Normativa · 1 de Julio de 2027" : "Policy Alert · July 1, 2027"}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "15.5px", lineHeight: "1.65", color: "var(--ink)" }}>
                {isEs ? (
                  <>
                    El 1 de julio de 2027, como parte de la ley <strong>One Big Beautiful Bill</strong>, los programas cuyos graduados no superen una prueba de ingresos pueden <strong>perder el acceso</strong> a los Préstamos Federales Directos (Direct Loans). Conoce más sobre los recientes cambios en los préstamos estudiantiles federales y lo que significan{" "}
                    <Link
                      to="/blog/federal-aid-cuts-low-earning-programs"
                      style={{ color: "var(--teal)", fontWeight: 700, textDecoration: "underline" }}
                    >
                      aquí
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    On July 1, 2027, as part of the <strong>One Big Beautiful Bill</strong>, programs whose graduates fail an earnings test can <strong>lose access</strong> to federal Direct Loans. Learn more about recent federal student loan changes and what they mean{" "}
                    <Link
                      to="/blog/federal-aid-cuts-low-earning-programs"
                      style={{ color: "var(--teal)", fontWeight: 700, textDecoration: "underline" }}
                    >
                      here
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>
          </section>

          {/* Section 5: What Else You Should Consider */}
          <section className="doc-section" id="what-else" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 5 de 5" : "Part 5 of 5"}</span>
            <h2>{isEs ? "Qué Más Deberías Considerar" : "What Else You Should Consider"}</h2>
            <p className="lead" style={{ fontSize: "17px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  También es recomendable evaluar qué tan bien se alinea un programa con tus <strong>planes profesionales</strong> y <strong>circunstancias personales</strong>. No existe un enfoque único para encontrar un programa de MBA, y comparar programas puede ayudar a los estudiantes a elegir la mejor opción.
                </>
              ) : (
                <>
                  You also may want to consider how well a program aligns with your <strong>career plans</strong> and <strong>personal circumstances</strong>. No one-size-fits-all approach exists for finding an MBA program, and comparing programs can help students choose the best fit.
                </>
              )}
            </p>

            <div
              className="rates-diff-grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                gap: "20px",
                marginTop: "24px",
              }}
            >
              <div
                className="rates-diff-card"
                style={{
                  padding: "24px",
                  borderRadius: "12px",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    {isEs ? "Factor 01 · Ubicación y Formato" : "Factor 01 · Location & Format"}
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs
                      ? "Cercanía a Empleadores y Horario"
                      : "Employer Proximity & Schedule Fit"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Considera la <strong style={{ color: "var(--ink)" }}>cercanía a los empleadores, las oportunidades de networking</strong> y si un programa de tiempo completo, tiempo parcial o en línea se adapta a tu horario.
                    </>
                  ) : (
                    <>
                      Consider <strong style={{ color: "var(--ink)" }}>proximity to employers, networking opportunities,</strong> and whether a full-time, part-time, or online program fits your schedule.
                    </>
                  )}
                </p>
              </div>

              <div
                className="rates-diff-card"
                style={{
                  padding: "24px",
                  borderRadius: "12px",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    {isEs ? "Factor 02 · Red y Reclutamiento" : "Factor 02 · Recruiting & Network"}
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs
                      ? "Asesoría Profesional, Pasantías y Exalumnos"
                      : "Advising, Internships & Alumni"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Evalúa la <strong style={{ color: "var(--ink)" }}>asesoría profesional, las relaciones de reclutamiento con empleadores, las pasantías y las conexiones con exalumnos.</strong>
                    </>
                  ) : (
                    <>
                      Evaluate <strong style={{ color: "var(--ink)" }}>career advising, employer recruiting relationships, internships, and alumni connections.</strong>
                    </>
                  )}
                </p>
              </div>

              <div
                className="rates-diff-card"
                style={{
                  padding: "24px",
                  borderRadius: "12px",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                  <span className="rates-diff-tag" style={{ alignSelf: "flex-start" }}>
                    {isEs ? "Factor 03 · Plan de Estudios" : "Factor 03 · Curriculum"}
                  </span>
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs
                      ? "Cursos y Especialidades Relevantes"
                      : "Courses & Relevant Skills"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Busca cursos y concentraciones que desarrollen <strong style={{ color: "var(--ink)" }}>habilidades relevantes</strong> para la carrera que deseas seguir.
                    </>
                  ) : (
                    <>
                      Look for courses and concentrations that develop <strong style={{ color: "var(--ink)" }}>relevant skills</strong> for your intended career.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Interactive MBA Evaluation Scorecard */}
            <div
              style={{
                marginTop: "32px",
                padding: "28px",
                borderRadius: "16px",
                background: "var(--card)",
                border: "1px solid var(--line)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11.5px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "var(--teal)",
                    }}
                  >
                    {isEs ? "Herramienta Interactiva · Autoevaluación" : "Interactive Tool · Program Self-Check"}
                  </span>
                  <h3 style={{ margin: "4px 0 6px 0", fontSize: "20px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs
                      ? "Lista de Verificación para Evaluar tu MBA"
                      : "MBA Program Evaluation Checklist"}
                  </h3>
                  <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)" }}>
                    {isEs
                      ? "Marca cada criterio a medida que comparas tus escuelas objetivo antes de comprometerte."
                      : "Check off each pillar as you compare your target schools before committing to a program."}
                  </p>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    fontWeight: 700,
                    padding: "6px 12px",
                    borderRadius: "999px",
                    background: "color-mix(in srgb, var(--teal) 12%, transparent)",
                    color: "var(--teal)",
                  }}
                >
                  {checkedIds.length} / {MBA_CHECKLIST_ITEMS.length}{" "}
                  {isEs ? "Verificados" : "Verified"}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "14px",
                }}
              >
                {MBA_CHECKLIST_ITEMS.map((item) => {
                  const isChecked = checkedIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleChecklist(item.id)}
                      style={{
                        textAlign: "left",
                        padding: "16px 18px",
                        borderRadius: "12px",
                        border: isChecked
                          ? "1.5px solid var(--teal)"
                          : "1px solid var(--line)",
                        background: isChecked
                          ? "color-mix(in srgb, var(--teal) 6%, var(--card))"
                          : "var(--bg)",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "6px",
                          border: isChecked
                            ? "2px solid var(--teal)"
                            : "2px solid var(--ink-soft)",
                          background: isChecked ? "var(--teal)" : "transparent",
                          color: "#fff",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                        aria-hidden="true"
                      >
                        {isChecked ? "✓" : ""}
                      </span>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "10.5px",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            color: "var(--teal)",
                            fontWeight: 700,
                            marginBottom: "3px",
                          }}
                        >
                          {isEs ? item.tagEs : item.tagEn}
                        </div>
                        <div
                          style={{
                            fontSize: "14.5px",
                            fontWeight: 700,
                            color: "var(--ink)",
                            marginBottom: "4px",
                            lineHeight: 1.35,
                          }}
                        >
                          {isEs ? item.titleEs : item.titleEn}
                        </div>
                        <div
                          style={{
                            fontSize: "13px",
                            color: "var(--ink-soft)",
                            lineHeight: 1.5,
                          }}
                        >
                          {isEs ? item.descEs : item.descEn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 6: The Bottom Line */}
          <section className="doc-section" id="bottom-line" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Conclusión" : "Conclusion"}</span>
            <h2>{isEs ? "En Conclusión" : "The Bottom Line"}</h2>

            <div
              style={{
                padding: "24px 28px",
                borderRadius: "14px",
                background: "color-mix(in srgb, var(--teal) 8%, var(--card))",
                borderTop: "2px solid var(--teal)",
                borderBottom: "2px solid var(--teal)",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "17.5px",
                  lineHeight: "1.65",
                  color: "var(--ink)",
                }}
              >
                {isEs ? (
                  <>
                    <strong>En conclusión:</strong> Muchos factores importan al elegir un programa de MBA. Los rankings son una métrica útil, pero no son completos ni personalizados. Considera también los resultados de los graduados, tus objetivos profesionales y aquello que maximizará tu ROI.
                  </>
                ) : (
                  <>
                    <strong>The bottom line:</strong> Many factors matter when choosing an MBA program. Rankings are a helpful metric, but they are not complete or personalized. Also consider graduate outcomes, your career goals, and what will maximize your ROI.
                  </>
                )}
              </p>
            </div>

            {/* Sources Attribution matching PDF */}
            <div
              style={{
                margin: "24px 0 16px 0",
                padding: "16px 20px",
                background: "color-mix(in srgb, var(--line) 40%, transparent)",
                borderRadius: "10px",
                border: "1px solid var(--line)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  color: "var(--ink-soft)",
                  fontStyle: "italic",
                }}
              >
                {isEs ? (
                  <>
                    <strong>Fuentes:</strong> Experian; National Black MBA Association; University Times (University of Pittsburgh); Student Loan Planner, citando a Education Data Initiative; NASFAA; AdmitStreet; Poets&amp;Quants; U.S. Department of Education College Scorecard; Leadership Brainery, MAC vía bschools.org; AACSB vía UCCS; Georgetown University Center on Education and the Workforce. Revisado al 3 de nov. de 2026.
                  </>
                ) : (
                  <>
                    <strong>Sources:</strong> Experian; National Black MBA Association; University Times (University of Pittsburgh); Student Loan Planner, citing Education Data Initiative; NASFAA; AdmitStreet; Poets&amp;Quants; U.S. Department of Education College Scorecard; Leadership Brainery, MAC via bschools.org; AACSB via UCCS; Georgetown University Center on Education and the Workforce. Revised as of Nov. 3, 2026.
                  </>
                )}
              </p>
            </div>

            {/* Educational Disclaimer matching PDF */}
            <p
              style={{
                margin: "0 0 28px 0",
                fontSize: "13.5px",
                lineHeight: "1.6",
                color: "var(--ink-soft)",
                fontStyle: "italic",
              }}
            >
              {isEs ? (
                <>
                  Este artículo es solo para fines educativos y no constituye asesoramiento financiero. Los límites y las reglas federales pueden cambiar, por lo que te recomendamos confirmar las cifras vigentes en{" "}
                  <a
                    href="https://studentaid.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--teal)", textDecoration: "underline" }}
                  >
                    studentaid.gov
                  </a>
                  .
                </>
              ) : (
                <>
                  This article is for education only and is not financial advice. Federal limits and rules can change, so confirm current figures at{" "}
                  <a
                    href="https://studentaid.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--teal)", textDecoration: "underline" }}
                  >
                    studentaid.gov
                  </a>
                  .
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
                  ? "Compara tus Ofertas de MBA y Calcula tu Brecha de Financiamiento"
                  : "Compare Your MBA Offers & Calculate Your Funding Gap"}
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
                  ? "Usa nuestras herramientas gratuitas para comparar el costo total de asistencia, becas y límites de préstamos federales entre programas de MBA."
                  : "Use our free interactive tools to compare total cost of attendance, scholarships, federal loan limits, and projected monthly payments across MBA programs."}
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

