import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, TopRouteDeco } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE =
  "Which 11 Professional Degrees Qualify for Higher Federal Student Loan Limits? | Grad Navigator";
const DESCRIPTION =
  "The Department of Education has established new federal borrowing limits for graduate and professional students, with 11 degree fields qualifying for $50k/year and $200k overall. Analysis by Peter Foulke.";
const URL =
  "https://www.graduationnavigator.com/blog/professional-degree-loan-limits";

export const Route = createFileRoute("/blog_/professional-degree-loan-limits")({
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
              name: "Peter Foulke",
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
  component: ProfessionalDegreeLoanLimitsArticlePage,
});

/* ---------- Data Interface & Table Dataset ---------- */
interface ProfessionalDegreeData {
  id: string;
  nameEn: string;
  nameEs: string;
  credential: string;
  lengthYears: string;
  lengthYearsEs: string;
  coa: number;
  meanDebt: number;
  diff: number; // meanDebt - 200,000
  isOverCap: boolean;
  notesEn?: string;
  notesEs?: string;
}

const PROFESSIONAL_DEGREES: ProfessionalDegreeData[] = [
  {
    id: "chiropractic",
    nameEn: "Chiropractic",
    nameEs: "Quiropráctica",
    credential: "D.C.",
    lengthYears: "4 years",
    lengthYearsEs: "4 años",
    coa: 277452,
    meanDebt: 176297,
    diff: -23703,
    isOverCap: false,
  },
  {
    id: "clinical-psychology",
    nameEn: "Clinical Psychology",
    nameEs: "Psicología Clínica",
    credential: "Psy.D. / Ph.D.",
    lengthYears: "5–6 years",
    lengthYearsEs: "5–6 años",
    coa: 261435,
    meanDebt: 136000,
    diff: -64000,
    isOverCap: false,
    notesEn: "*Estimated median cost of attendance from published budgets",
    notesEs: "*Costo mediano estimado de asistencia según presupuestos publicados",
  },
  {
    id: "dentistry",
    nameEn: "Dentistry",
    nameEs: "Odontología",
    credential: "D.D.S. / D.M.D.",
    lengthYears: "4 years",
    lengthYearsEs: "4 años",
    coa: 445588,
    meanDebt: 297800,
    diff: 97800,
    isOverCap: true,
  },
  {
    id: "law",
    nameEn: "Law",
    nameEs: "Derecho / Leyes",
    credential: "J.D.",
    lengthYears: "3 years",
    lengthYearsEs: "3 años",
    coa: 237120,
    meanDebt: 143100,
    diff: -56900,
    isOverCap: false,
  },
  {
    id: "medicine",
    nameEn: "Medicine",
    nameEs: "Medicina",
    credential: "M.D.",
    lengthYears: "4 years",
    lengthYearsEs: "4 años",
    coa: 337491,
    meanDebt: 223130,
    diff: 23130,
    isOverCap: true,
    notesEn: "*Estimated median cost of attendance from published budgets",
    notesEs: "*Costo mediano estimado de asistencia según presupuestos publicados",
  },
  {
    id: "optometry",
    nameEn: "Optometry",
    nameEs: "Optometría",
    credential: "O.D.",
    lengthYears: "4 years",
    lengthYearsEs: "4 años",
    coa: 326800,
    meanDebt: 209280,
    diff: 9280,
    isOverCap: true,
  },
  {
    id: "osteopathic-medicine",
    nameEn: "Osteopathic Medicine",
    nameEs: "Medicina Osteopática",
    credential: "D.O.",
    lengthYears: "4 years",
    lengthYearsEs: "4 años",
    coa: 355160,
    meanDebt: 254459,
    diff: 54459,
    isOverCap: true,
    notesEn: "*Estimated median cost of attendance from published budgets",
    notesEs: "*Costo mediano estimado de asistencia según presupuestos publicados",
  },
  {
    id: "pharmacy",
    nameEn: "Pharmacy",
    nameEs: "Farmacia",
    credential: "Pharm.D.",
    lengthYears: "4 years",
    lengthYearsEs: "4 años",
    coa: 270000,
    meanDebt: 188157,
    diff: -11843,
    isOverCap: false,
    notesEn: "*Estimated median cost of attendance from published budgets",
    notesEs: "*Costo mediano estimado de asistencia según presupuestos publicados",
  },
  {
    id: "podiatry",
    nameEn: "Podiatry",
    nameEs: "Podología",
    credential: "D.P.M.",
    lengthYears: "4 years",
    lengthYearsEs: "4 años",
    coa: 366212,
    meanDebt: 295000,
    diff: 95000,
    isOverCap: true,
    notesEn: "*Estimated median cost of attendance from published budgets",
    notesEs: "*Costo mediano estimado de asistencia según presupuestos publicados",
  },
  {
    id: "theology",
    nameEn: "Theology",
    nameEs: "Teología",
    credential: "M.Div.",
    lengthYears: "3 years",
    lengthYearsEs: "3 años",
    coa: 152430,
    meanDebt: 36000,
    diff: -164000,
    isOverCap: false,
    notesEn: "*Estimated median cost of attendance from published budgets",
    notesEs: "*Costo mediano estimado de asistencia según presupuestos publicados",
  },
  {
    id: "veterinary-medicine",
    nameEn: "Veterinary Medicine",
    nameEs: "Medicina Veterinaria",
    credential: "D.V.M.",
    lengthYears: "4 years",
    lengthYearsEs: "4 años",
    coa: 292000,
    meanDebt: 212499,
    diff: 12499,
    isOverCap: true,
    notesEn: "*Estimated median cost of attendance from published budgets",
    notesEs: "*Costo mediano estimado de asistencia según presupuestos publicados",
  },
];

/* ---------- Helper Icons ---------- */
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

function ShieldCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "20px", height: "20px", color: "var(--teal)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
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

function ScaleIcon() {
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

function ProfessionalDegreeLoanLimitsArticlePage() {
  const { t, lang } = useI18n();
  const isEs = lang === "es";

  // Calculator State
  const [selectedDegreeId, setSelectedDegreeId] = useState<string>("dentistry");
  const [filterType, setFilterType] = useState<"all" | "over" | "under">("all");

  const selectedDegree = useMemo(() => {
    return (
      PROFESSIONAL_DEGREES.find((d) => d.id === selectedDegreeId) ||
      PROFESSIONAL_DEGREES[2]
    );
  }, [selectedDegreeId]);

  const federalCap = 200000;
  const fundingGap = Math.max(0, selectedDegree.coa - federalCap);
  const federalCoveragePct = Math.min(
    100,
    Math.round((federalCap / selectedDegree.coa) * 100)
  );

  const filteredDegrees = useMemo(() => {
    if (filterType === "over") {
      return PROFESSIONAL_DEGREES.filter((d) => d.isOverCap);
    }
    if (filterType === "under") {
      return PROFESSIONAL_DEGREES.filter((d) => !d.isOverCap);
    }
    return PROFESSIONAL_DEGREES;
  }, [filterType]);

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
              <div className="eyebrow">{t("pdl.eyebrow")}</div>
              <h1
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  lineHeight: "1.2",
                  marginBottom: "14px",
                }}
              >
                {t("pdl.h1")}
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
                {t("pdl.sub")}
              </p>
              <div className="updated" style={{ marginBottom: "22px" }}>
                <span className="dot" />
                {t("pdl.updated")}
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
                    {t("pdl.why.title")}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14.5px",
                      lineHeight: "1.6",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {t("pdl.why.p")}
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Animation */}
            <div className="doc-hero-media">
              <img
                src="/images/gn-animation-understand-loans.svg"
                width="800"
                height="600"
                alt={
                  isEs
                    ? "Animación de estudiante evaluando límites federales de préstamos y opciones de financiamiento"
                    : "Animated student reviewing federal student loan limits and financing options"
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
                $50k / $200k
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
                  ? "Tope Nivel 1: Títulos Profesionales"
                  : "Tier 1 Professional Degree Cap"}
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
                  ? "Hasta $50,000 anuales y $200,000 acumulados para 11 áreas profesionales designadas."
                  : "Up to $50,000 annually and $200,000 aggregate for 11 designated professional fields."}
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
                $20.5k / $100k
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
                  ? "Tope Nivel 2: Otros Posgrados"
                  : "Tier 2 Other Graduate Degrees"}
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
                  ? "Educación, negocios (MBA) y ciencias sociales enfrentan topes de $20,500/año y $100,000 total."
                  : "Education, business (MBA), and social sciences face stricter caps of $20,500/yr and $100,000 total."}
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
                {isEs ? "6 de 11" : "6 of 11"}
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
                  ? "Carreras Donde la Deuda Supera el Tope"
                  : "Degrees Exceeding the $200k Cap"}
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
                  ? "La deuda promedio en Odontología, Podología, Medicina Osteopática, M.D., Veterinaria y Optometría supera los $200,000."
                  : "Mean debt in Dentistry, Podiatry, D.O., M.D., Veterinary Medicine, and Optometry exceeds $200k."}
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
                Grad PLUS
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
                  ? "Programa Federal Eliminado"
                  : "Federal Program Eliminated"}
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
                  ? "Ya no existe el endeudamiento federal ilimitado hasta el costo total de asistencia (COA)."
                  : "Uncapped federal borrowing up to full cost of attendance has ended under the new law."}
              </div>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#two-tiers">{t("pdl.nav.tiers")}</a>
          <a href="#qualifying-degrees">{t("pdl.nav.degrees")}</a>
          <a href="#funding-gaps">{t("pdl.nav.gaps")}</a>
          <a href="#strategic-considerations">{t("pdl.nav.consider")}</a>
          <a href="#court-rulings">{t("pdl.nav.court")}</a>
          <a href="#calculator">{t("pdl.nav.calculator")}</a>
          <a href="#sources">{t("pdl.nav.sources")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: The New Federal Borrowing Limits */}
          <section className="doc-section" id="two-tiers" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 1 de 7" : "Part 1 of 7"}</span>
            <h2>{isEs ? "Los Nuevos Límites Federales de Endeudamiento" : "The New Federal Borrowing Limits"}</h2>
            <p className="lead" style={{ fontSize: "17px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Tras la aprobación de la ley <strong>One Big Beautiful Bill Act</strong>, los nuevos límites federales de endeudamiento entraron en vigor el <strong>1 de julio de 2026</strong>, estableciendo dos niveles marcados de acceso a préstamos para estudiantes de posgrado:
                </>
              ) : (
                <>
                  Following the passage of the <strong>One Big Beautiful Bill Act</strong>, new federal borrowing limits took effect <strong>July 1, 2026</strong>, establishing two distinct tiers of graduate student loan borrowing:
                </>
              )}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
                  <ShieldCheckIcon />
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>
                    {isEs ? "Nivel 1: Títulos Profesionales ($50,000 / $200,000)" : "Tier 1: Professional Degrees ($50k / $200k)"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Los estudiantes que cursen uno de los <strong style={{ color: "var(--ink)" }}>11 títulos profesionales designados</strong> pueden pedir prestado hasta <strong>$50,000 anuales</strong> y un máximo de <strong>$200,000 en total</strong> a lo largo de su formación académica.
                    </>
                  ) : (
                    <>
                      Students pursuing <strong style={{ color: "var(--ink)" }}>11 designated professional degrees</strong> can borrow up to <strong>$50,000 annually</strong> and up to <strong>$200,000 overall</strong> over the course of their education.
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <ScaleIcon />
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>
                    {isEs ? "Nivel 2: Otros Posgrados ($20,500 / $100,000)" : "Tier 2: Other Graduate Degrees ($20.5k / $100k)"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Los estudiantes que cursan títulos no calificados —incluyendo maestrías en <strong style={{ color: "var(--ink)" }}>educación, ciencias sociales y negocios (MBA)</strong>— enfrentan límites estrictos de <strong>$20,500 anuales</strong> y <strong>$100,000 acumulados</strong>.
                    </>
                  ) : (
                    <>
                      Students pursuing non-qualifying degrees, including <strong style={{ color: "var(--ink)" }}>education, social sciences, and business (MBA)</strong>, face federal loan limits of <strong>$20,500 annually</strong> and <strong>$100,000 overall</strong>.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Grad PLUS Elimination Callout */}
            <div
              style={{
                padding: "22px 26px",
                background: "color-mix(in srgb, #c6333b 7%, var(--card))",
                borderRadius: "14px",
                border: "1px solid color-mix(in srgb, #c6333b 25%, transparent)",
                margin: "24px 0",
              }}
            >
              <h4 style={{ margin: "0 0 10px 0", fontSize: "17px", color: "#c6333b", fontWeight: 700 }}>
                {isEs ? "El Fin de Grad PLUS y el Reto del Costo de Vida" : "The Elimination of Grad PLUS & The Non-Tuition Expense Gap"}
              </h4>
              <p style={{ margin: "0 0 12px 0", fontSize: "15px", lineHeight: "1.65", color: "var(--ink)" }}>
                {isEs ? (
                  <>
                    Estos cambios legislativos <strong>eliminaron definitivamente el programa Grad PLUS</strong>, el cual anteriormente permitía a los estudiantes de posgrado solicitar préstamos federales hasta cubrir el 100% del costo total de asistencia (COA), incluyendo colegiatura, vivienda, transporte, seguro médico y manutención.
                  </>
                ) : (
                  <>
                    These changes also <strong>eliminated the Grad PLUS program</strong>, which previously allowed graduate and professional students to take out federal loans up to the full total cost of attendance (COA), including tuition, housing, transportation, and living expenses.
                  </>
                )}
              </p>
              <p style={{ margin: "0 0 8px 0", fontSize: "14.5px", fontWeight: 600, color: "var(--ink)" }}>
                {isEs
                  ? "Según datos del College Board, los gastos no relacionados con la matrícula representan aproximadamente:"
                  : "According to the College Board, these non-tuition expenses make up approximately:"}
              </p>
              <ul style={{ margin: 0, paddingLeft: "22px", fontSize: "14px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                <li>
                  <strong style={{ color: "var(--ink)" }}>62%</strong>{" "}
                  {isEs ? "del costo total en universidades públicas para estudiantes locales (in-state)." : "of total cost of attendance at public universities for in-state students."}
                </li>
                <li>
                  <strong style={{ color: "var(--ink)" }}>38%</strong>{" "}
                  {isEs ? "en universidades públicas para estudiantes de fuera del estado (out-of-state)." : "at public universities for out-of-state students."}
                </li>
                <li>
                  <strong style={{ color: "var(--ink)" }}>31%</strong>{" "}
                  {isEs ? "en universidades privadas sin fines de lucro." : "at private nonprofit universities."}
                </li>
              </ul>
              <p style={{ margin: "12px 0 0 0", fontSize: "14px", lineHeight: "1.6", color: "var(--ink-soft)", fontStyle: "italic" }}>
                {isEs
                  ? "La eliminación de Grad PLUS, combinada con límites de endeudamiento fijos, hace que financiar un posgrado sea significativamente más desafiante sin una planificación previa."
                  : "Eliminating Grad PLUS, along with the hard borrowing limits, makes it increasingly difficult for students to fund their entire education through federal programs alone."}
              </p>
            </div>
          </section>

          {/* Section 2: Which 11 Professional Degrees Qualify? */}
          <section className="doc-section" id="qualifying-degrees" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 2 de 7" : "Part 2 of 7"}</span>
            <h2>{isEs ? "¿Cuáles son los 11 Títulos Profesionales que Califican?" : "Which 11 Professional Degrees Qualify?"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Los estudiantes matriculados en los siguientes 11 programas tienen acceso al tope federal elevado de <strong>$50,000 anuales y $200,000 acumulados</strong>. No obstante, en <strong>6 de los 11 programas</strong>, la deuda promedio de graduación ya supera los $200,000.
                </>
              ) : (
                <>
                  Students pursuing the degrees below have access to higher federal loan limits of <strong>$50,000 annually and $200,000 overall</strong>. However, students in <strong>six of the 11 qualifying professional degrees</strong> graduate with average debt that already exceeds the $200,000 federal borrowing cap.
                </>
              )}
            </p>

            {/* Filter Toggle Buttons */}
            <div style={{ display: "flex", gap: "8px", margin: "20px 0 14px 0", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setFilterType("all")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1px solid var(--line)",
                  background: filterType === "all" ? "var(--teal)" : "var(--card)",
                  color: filterType === "all" ? "#fff" : "var(--ink)",
                  cursor: "pointer",
                }}
              >
                {isEs ? "Todos los 11 Títulos" : "All 11 Degrees"}
              </button>
              <button
                type="button"
                onClick={() => setFilterType("over")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1px solid var(--line)",
                  background: filterType === "over" ? "#c6333b" : "var(--card)",
                  color: filterType === "over" ? "#fff" : "var(--ink)",
                  cursor: "pointer",
                }}
              >
                {isEs ? "Superan el Tope de $200k (6)" : "Exceeds $200k Cap (6)"}
              </button>
              <button
                type="button"
                onClick={() => setFilterType("under")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1px solid var(--line)",
                  background: filterType === "under" ? "var(--teal)" : "var(--card)",
                  color: filterType === "under" ? "#fff" : "var(--ink)",
                  cursor: "pointer",
                }}
              >
                {isEs ? "Por Debajo del Tope (5)" : "Under $200k Cap (5)"}
              </button>
            </div>

            {/* Complete Data Table */}
            <div style={{ overflowX: "auto", margin: "16px 0", borderRadius: "12px", border: "1px solid var(--line)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "var(--card)", borderBottom: "2px solid var(--line)" }}>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Título Profesional" : "Professional Degree"}</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Duración" : "Length"}</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Costo Total (COA)*" : "Total Program COA*"}</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Deuda Promedio" : "Mean Debt"}</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Brecha vs. Tope de $200k" : "Average Debt vs. $200k Cap"}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDegrees.map((item, idx) => (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: "1px solid var(--line)",
                        background: idx % 2 === 1 ? "color-mix(in srgb, var(--bg) 50%, var(--card))" : "var(--card)",
                      }}
                    >
                      <td style={{ padding: "14px 16px", fontWeight: 700 }}>
                        <div style={{ color: "var(--ink)" }}>{isEs ? item.nameEs : item.nameEn}</div>
                        <span style={{ fontSize: "12px", color: "var(--ink-soft)", fontWeight: 500 }}>
                          ({item.credential})
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", color: "var(--ink-soft)" }}>
                        {isEs ? item.lengthYearsEs : item.lengthYears}
                      </td>
                      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                        ${item.coa.toLocaleString()}
                        {item.notesEn && <span style={{ color: "var(--ink-soft)" }}>*</span>}
                      </td>
                      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                        ${item.meanDebt.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontFamily: "var(--font-mono)",
                            fontSize: "13px",
                            fontWeight: 700,
                            background: item.isOverCap
                              ? "color-mix(in srgb, #c6333b 12%, transparent)"
                              : "color-mix(in srgb, var(--teal) 12%, transparent)",
                            color: item.isOverCap ? "#c6333b" : "var(--teal)",
                          }}
                        >
                          {item.diff > 0 ? `+$${item.diff.toLocaleString()}` : `-$${Math.abs(item.diff).toLocaleString()}`}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: "12.5px", color: "var(--ink-soft)", fontStyle: "italic", marginTop: "8px" }}>
              {isEs
                ? "*Costos medianos de asistencia estimados calculados a partir de los presupuestos publicados de universidades públicas y privadas seleccionadas, incluyendo colegiatura, tarifas y costos de manutención."
                : "*Estimated median costs of attendance calculated from selected public and private universities’ published budgets, including tuition, fees, and living expenses."}
            </p>
          </section>

          {/* Section 3: What If Borrowing Limits Aren't Enough? */}
          <section className="doc-section" id="funding-gaps" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 3 de 7" : "Part 3 of 7"}</span>
            <h2>{isEs ? "¿Qué Hacer si los Límites de Endeudamiento no Alcanzan?" : "What If Borrowing Limits Aren't Enough?"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Los estudiantes en 6 de los 11 programas se gradúan con una deuda que supera el nuevo límite federal de $200,000. He aquí cómo los futuros estudiantes pueden adaptarse para cubrir la brecha:
                </>
              ) : (
                <>
                  Students in six of the 11 qualifying professional degrees graduate with average debt that exceeds the new $200,000 federal borrowing cap. Here is how prospective students can adapt:
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
                  <ShieldCheckIcon />
                  <h3 style={{ margin: 0, fontSize: "17.5px", fontWeight: 700 }}>
                    {isEs ? "1. Becas y Subvenciones Institucionales" : "1. Pursue Scholarships and Grants"}
                  </h3>
                </div>
                <p style={{ margin: "0 0 12px 0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Las becas institucionales son cada vez más decisivas para cubrir los costos de educación de posgrado. Varias escuelas ya están respondiendo con fondos de ayuda específicos.
                    </>
                  ) : (
                    <>
                      Institutional scholarships are becoming increasingly important for students looking to cover the costs of graduate education.
                    </>
                  )}
                </p>
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "8px",
                    background: "var(--bg)",
                    border: "1px solid var(--line)",
                    fontSize: "13.5px",
                    lineHeight: "1.55",
                    color: "var(--ink)",
                  }}
                >
                  <strong>{isEs ? "Ejemplo real:" : "Real-world example:"}</strong>{" "}
                  {isEs
                    ? "Lewis & Clark College estableció la beca basada en necesidad Bridge the Gap Scholarship en respuesta directa a los nuevos límites federales."
                    : "Lewis & Clark College established the need-based Bridge the Gap Scholarship in direct response to the new federal loan limits."}
                </div>
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
                  <ScaleIcon />
                  <h3 style={{ margin: 0, fontSize: "17.5px", fontWeight: 700 }}>
                    {isEs ? "2. Evaluar Préstamos Privados con Cautela" : "2. Consider Private Student Loans"}
                  </h3>
                </div>
                <p style={{ margin: "0 0 12px 0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Los préstamos estudiantiles privados pueden cubrir las brechas financieras que dejan los topes federales. No obstante, presentan diferencias clave frente al crédito federal.
                    </>
                  ) : (
                    <>
                      Private student loans could address the funding gaps created by the new limits. However, private loans carry significant trade-offs.
                    </>
                  )}
                </p>
                <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", lineHeight: "1.55", color: "var(--ink-soft)" }}>
                  <li>{isEs ? "No cuentan con las protecciones federales (planes IDR, condonación PSLF)" : "Lack federal protections like income-driven repayment and PSLF"}</li>
                  <li>{isEs ? "Pueden tener tasas variables y exigir verificación de crédito" : "May carry variable interest rates and require strict credit checks"}</li>
                  <li>{isEs ? "Pueden requerir codeudor o pagos mientras aún estás estudiando" : "May require a creditworthy cosigner or in-school payments"}</li>
                </ul>
              </div>

              <div
                style={{
                  padding: "24px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #d97706",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <TrendingUpIcon />
                  <h3 style={{ margin: 0, fontSize: "17.5px", fontWeight: 700 }}>
                    {isEs ? "3. Condonación y Reembolso Laboral" : "3. Explore Other Funding Opportunities"}
                  </h3>
                </div>
                <p style={{ margin: "0 0 12px 0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Quienes planean ejercer en comunidades desatendidas pueden calificar para programas de condonación de préstamos o asistencia para el pago de matrícula.
                    </>
                  ) : (
                    <>
                      Students pursuing careers in underserved communities may qualify for state and federal loan forgiveness or tuition assistance programs.
                    </>
                  )}
                </p>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.55", color: "var(--ink)" }}>
                  {isEs
                    ? "Asimismo, los profesionales que ya se encuentran en el mercado laboral deben verificar si su empleador ofrece reembolsos o subsidios educativos."
                    : "In addition, prospective students already in the workforce can check whether their employer offers tuition reimbursement or educational stipends."}
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: What Else You Should Consider */}
          <section className="doc-section" id="strategic-considerations" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 4 de 7" : "Part 4 of 7"}</span>
            <h2>{isEs ? "Otras Consideraciones Estratégicas y Retorno de Inversión" : "What Else You Should Consider"}</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
                }}
              >
                <h3 style={{ marginTop: 0, fontSize: "17.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs ? "Evalúa el Retorno de Inversión (ROI)" : "Evaluate ROI"}
                </h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Ciertos títulos como <strong>Medicina (M.D.), Odontología y Medicina Osteopática (D.O.)</strong> cuentan con ingresos medianos relativamente altos que facilitan el pago de deudas elevadas. En contraste, campos como <strong>Psicología Clínica y Medicina Veterinaria</strong> suelen tener salarios iniciales moderados, haciendo la decisión financiera mucho más delicada. Sopesa siempre el costo del título frente a los ingresos proyectados.
                    </>
                  ) : (
                    <>
                      Certain professional degrees, including <strong>medicine, dentistry, and osteopathic medicine</strong>, have relatively high median earnings that help graduates repay substantial debt. Graduates in other fields, such as <strong>clinical psychology and veterinary medicine</strong>, typically earn less, making the financial calculation much more complex. Carefully weigh program cost against expected career earnings.
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
                }}
              >
                <h3 style={{ marginTop: 0, fontSize: "17.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs ? "Considera Programas Menos Costosos" : "Consider Less Costly Programs"}
                </h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      En muchos casos, puedes alcanzar metas profesionales afines a través de programas más asequibles. Por ejemplo, quien se interese en salud mental puede cursar una <strong>Maestría en Trabajo Social (MSW)</strong> en lugar de un Psy.D., brindando apoyo terapéutico con una carga de deuda significativamente menor.
                    </>
                  ) : (
                    <>
                      Students may be able to pursue similar career paths through less expensive degrees. For example, students interested in psychology could pursue a <strong>Master of Social Work (MSW)</strong> instead of a Psy.D., still providing mental health counseling but with a significantly lower financial debt burden.
                    </>
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Federal Court Challenges */}
          <section className="doc-section" id="court-rulings" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 5 de 7" : "Part 5 of 7"}</span>
            <h2>{isEs ? "Desarrollos Legales: Demandas y Nuevas Carreras en Disputa" : "Stay Up to Date on New Legal Developments"}</h2>
            <div
              style={{
                padding: "22px 26px",
                background: "color-mix(in srgb, #2563eb 8%, var(--card))",
                borderRadius: "14px",
                border: "1px solid color-mix(in srgb, #2563eb 25%, transparent)",
                margin: "20px 0",
              }}
            >
              <h4 style={{ margin: "0 0 10px 0", fontSize: "17px", color: "#2563eb", fontWeight: 700 }}>
                {isEs ? "Fallos Judiciales Federales en Curso" : "Active Federal Court Injunctions & Degree Expansions"}
              </h4>
              <p style={{ margin: "0 0 12px 0", fontSize: "15px", lineHeight: "1.65", color: "var(--ink)" }}>
                {isEs ? (
                  <>
                    Demandas ante tribunales federales ya han impugnado la definición restrictiva de títulos profesionales emitida por el Departamento de Educación, expandiendo temporalmente la lista para incluir campos de alta demanda en salud:
                  </>
                ) : (
                  <>
                    Federal court rulings have already challenged the Department of Education’s narrow definition of qualifying professional degrees, temporarily expanding the list to include high-demand healthcare fields:
                  </>
                )}
              </p>
              <ul style={{ margin: 0, paddingLeft: "22px", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink)" }}>
                <li>
                  <strong>{isEs ? "Enfermería de Práctica Avanzada (NP / DNP):" : "Advanced Practice Nursing (NP / DNP):"}</strong>{" "}
                  {isEs ? "Enfermeros practicantes y doctorados en enfermería." : "Nurse practitioners and doctor of nursing practice."}
                </li>
                <li>
                  <strong>{isEs ? "Asistente Médico (Physician Assistant - PA):" : "Physician Assistant (PA):"}</strong>{" "}
                  {isEs ? "Profesionales clínicos con programas intensivos de 2 a 3 años." : "Intensive 2-to-3-year clinical master's programs."}
                </li>
                <li>
                  <strong>{isEs ? "Terapia Física (Doctor of Physical Therapy - DPT):" : "Physical Therapy (DPT):"}</strong>{" "}
                  {isEs ? "Doctorados clínicos en rehabilitación física." : "Doctoral-level clinical physical therapy programs."}
                </li>
              </ul>
              <p style={{ margin: "14px 0 0 0", fontSize: "14px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                {isEs
                  ? "Los futuros estudiantes deben seguir de cerca estas resoluciones legales para conocer con certeza el límite de préstamo aplicable a su programa al momento de la matrícula."
                  : "Prospective students should actively monitor these legal proceedings to understand how final rulings will affect their intended degree programs and borrowing eligibility."}
              </p>
            </div>
          </section>

          {/* Section 6: Interactive Funding Gap Calculator */}
          <section className="doc-section" id="calculator" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 6 de 7" : "Part 6 of 7"}</span>
            <h2>{isEs ? "Calculadora Interactiva de Brecha de Endeudamiento" : "Interactive Funding Gap Estimator"}</h2>
            <p className="lead" style={{ fontSize: "16px", lineHeight: "1.6" }}>
              {isEs
                ? "Selecciona uno de los 11 títulos profesionales para visualizar cómo se compara el costo total frente al tope federal de $200,000:"
                : "Select any of the 11 professional degrees to see how its total Cost of Attendance compares against the $200,000 federal loan limit:"}
            </p>

            <div
              style={{
                padding: "24px",
                background: "var(--card)",
                borderRadius: "16px",
                border: "1px solid var(--line)",
                margin: "24px 0",
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="degree-select"
                  style={{ display: "block", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}
                >
                  {isEs ? "Elige tu Título Profesional:" : "Choose a Professional Degree:"}
                </label>
                <select
                  id="degree-select"
                  value={selectedDegreeId}
                  onChange={(e) => setSelectedDegreeId(e.target.value)}
                  style={{
                    width: "100%",
                    maxWidth: "420px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--ink)",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  {PROFESSIONAL_DEGREES.map((d) => (
                    <option key={d.id} value={d.id}>
                      {isEs ? d.nameEs : d.nameEn} ({d.credential}) — {isEs ? d.lengthYearsEs : d.lengthYears}
                    </option>
                  ))}
                </select>
              </div>

              {/* Visual Breakdown Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                <div style={{ padding: "16px", borderRadius: "10px", background: "var(--bg)", border: "1px solid var(--line)" }}>
                  <div style={{ fontSize: "12px", color: "var(--ink-soft)", textTransform: "uppercase", fontWeight: 700 }}>
                    {isEs ? "Costo Total (COA)" : "Total Program COA"}
                  </div>
                  <div style={{ fontSize: "22px", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--ink)", marginTop: "4px" }}>
                    ${selectedDegree.coa.toLocaleString()}
                  </div>
                </div>

                <div style={{ padding: "16px", borderRadius: "10px", background: "var(--bg)", border: "1px solid var(--line)" }}>
                  <div style={{ fontSize: "12px", color: "var(--teal)", textTransform: "uppercase", fontWeight: 700 }}>
                    {isEs ? "Tope Federal Permitido" : "Max Federal Loan Cap"}
                  </div>
                  <div style={{ fontSize: "22px", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--teal)", marginTop: "4px" }}>
                    ${federalCap.toLocaleString()}
                  </div>
                </div>

                <div style={{ padding: "16px", borderRadius: "10px", background: "var(--bg)", border: "1px solid var(--line)" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      color: fundingGap > 0 ? "#c6333b" : "var(--teal)",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    {isEs ? "Brecha de Financiamiento" : "Projected Funding Gap"}
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      color: fundingGap > 0 ? "#c6333b" : "var(--teal)",
                      marginTop: "4px",
                    }}
                  >
                    {fundingGap > 0 ? `$${fundingGap.toLocaleString()}` : "$0"}
                  </div>
                </div>

                <div style={{ padding: "16px", borderRadius: "10px", background: "var(--bg)", border: "1px solid var(--line)" }}>
                  <div style={{ fontSize: "12px", color: "var(--ink-soft)", textTransform: "uppercase", fontWeight: 700 }}>
                    {isEs ? "Deuda Media de Graduados" : "Mean Graduate Debt"}
                  </div>
                  <div style={{ fontSize: "22px", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--ink)", marginTop: "4px" }}>
                    ${selectedDegree.meanDebt.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Progress Bar of Federal Coverage */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13.5px", fontWeight: 600, marginBottom: "8px" }}>
                  <span>{isEs ? "Cobertura del Tope Federal:" : "Federal Cap Coverage of COA:"}</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--teal)" }}>
                    {federalCoveragePct}% {isEs ? "del costo total" : "of total cost"}
                  </span>
                </div>
                <div
                  style={{
                    height: "14px",
                    borderRadius: "999px",
                    background: "var(--line)",
                    overflow: "hidden",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: `${federalCoveragePct}%`,
                      background: "var(--teal)",
                      height: "100%",
                      transition: "width 0.3s ease",
                    }}
                  />
                  {fundingGap > 0 && (
                    <div
                      style={{
                        width: `${100 - federalCoveragePct}%`,
                        background: "#c6333b",
                        height: "100%",
                        transition: "width 0.3s ease",
                      }}
                    />
                  )}
                </div>
                <div style={{ display: "flex", gap: "18px", marginTop: "10px", fontSize: "12.5px", color: "var(--ink-soft)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "var(--teal)" }} />
                    {isEs ? "Préstamo Federal (Hasta $200k)" : "Federal Direct Loan (Up to $200k)"}
                  </span>
                  {fundingGap > 0 && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "#c6333b" }} />
                      {isEs ? "Brecha (Becas, Ahorro o Privado)" : "Gap (Scholarships, Savings, or Private)"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Sources & Related Articles */}
          <section className="doc-section" id="sources" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 7 de 7" : "Part 7 of 7"}</span>
            <h2>{isEs ? "Conclusión y Recursos Relacionados" : "The Bottom Line & Related Resources"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Los nuevos límites de endeudamiento han cambiado de raíz la forma en que los estudiantes pueden financiar su educación de posgrado. Hoy más que nunca, los aspirantes deben evaluar con rigor el <strong>costo de su programa</strong>, sus <strong>opciones de financiamiento</strong> y sus <strong>ingresos proyectados</strong>.
                </>
              ) : (
                <>
                  New federal student loan borrowing limits have significantly changed how students can fund their graduate education. Now more than ever, prospective students should carefully consider the <strong>cost of their education</strong>, their <strong>financing options</strong>, and their <strong>potential earnings</strong>.
                </>
              )}
            </p>

            {/* Related Articles Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "18px",
                margin: "24px 0",
              }}
            >
              <Link
                to="/blog/federal-aid-cuts-low-earning-programs"
                style={{
                  display: "block",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #c6333b",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#c6333b", textTransform: "uppercase" }}>
                  {isEs ? "Reglas Federales OBBB" : "OBBB Federal Policy"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "Cortes de Ayuda Federal para Programas de Bajos Ingresos"
                    : "Federal Aid Cuts for Low-Earning Programs"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Conoce la regla del Departamento de Educación que cancela préstamos federales para programas que no superan las pruebas salariales."
                    : "Breakdown of the Department of Education rule cutting federal loans for programs failing earnings tests."}
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
                  borderTop: "3px solid var(--teal)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--teal)", textTransform: "uppercase" }}>
                  {isEs ? "Estrategia de Deuda" : "Debt Strategy"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "Refinanciamiento de Préstamos Estudiantiles, Explicado"
                    : "Refinancing Student Loans, Explained"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Cuándo conviene refinanciar con prestamistas privados y los riesgos de perder beneficios federales de condonación."
                    : "When and how to refinance student loans safely without jeopardizing federal forgiveness rights."}
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
                  {isEs ? "Préstamos Privados" : "Private Lending"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs ? "Centro del Codeudor (Cosigner Hub)" : "The Cosigner Hub"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Todo lo que necesitas saber antes de solicitar un préstamo privado con codeudor para cubrir tu brecha de posgrado."
                    : "Everything you and your family need to know before taking out private loans to bridge graduate funding gaps."}
                </p>
              </Link>

              <Link
                to="/blog/when-to-get-masters-degree"
                style={{
                  display: "block",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #7c3aed",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase" }}>
                  {isEs ? "Análisis de ROI" : "ROI Analysis"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "¿Cuándo Deberías Obtener una Maestría?"
                    : "When Should You Get a Master’s Degree?"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Plazos de amortización por edad y carrera frente al salario no percibido y costos de matrícula."
                    : "Payoff timelines by starting age across 10 fields of study, evaluating wage premiums versus debt."}
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
                    <strong>Fuentes oficiales:</strong> U.S. Department of Education; Federal Student Aid; Federal Register; College Board; U.S. Bureau of Labor Statistics, Occupational Outlook Handbook; Association of American Medical Colleges (AAMC); American Dental Education Association (ADEA); American Bar Association, Standard 509 Required Disclosures; American Veterinary Medical Association (AVMA); Association of Theological Schools; American Association of Colleges of Podiatric Medicine; presupuestos publicados de costo de asistencia de universidades públicas y privadas seleccionadas; Associated Press; National Association of Student Financial Aid Administrators (NASFAA). Revisado al 15 de nov. de 2026. Autor: Peter Foulke.
                  </>
                ) : (
                  <>
                    <strong>Sources:</strong> U.S. Department of Education; Federal Student Aid; Federal Register; College Board; U.S. Bureau of Labor Statistics, Occupational Outlook Handbook; Association of American Medical Colleges (AAMC); American Dental Education Association (ADEA); American Bar Association, Standard 509 Required Disclosures; American Veterinary Medical Association (AVMA); Association of Theological Schools; American Association of Colleges of Podiatric Medicine; published cost-of-attendance budgets from selected public and private universities; Associated Press; National Association of Student Financial Aid Administrators (NASFAA). Reviewed as of Nov. 15, 2026. Author: Peter Foulke.
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
                  Este artículo tiene fines informativos y educativos únicamente y no constituye asesoramiento legal ni financiero. Las políticas federales y los fallos judiciales están sujetos a apelaciones y actualizaciones periódicas. Confirma las cifras y condiciones vigentes en{" "}
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
                  This article is for informational and educational purposes only and does not constitute legal or financial advice. Federal loan regulations and court proceedings are subject to ongoing appeals and revisions. Always verify current borrowing figures directly at{" "}
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
                  ? "Calcula tu Brecha de Préstamos y Diseña tu Plan de Financiamiento"
                  : "Calculate Your Funding Gap & Model Your Repayment Plan"}
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
                  ? "Utiliza nuestras herramientas gratuitas para proyectar pagos mensuales, comparar ofertas de financiamiento y diseñar tu estrategia sin sorpresas."
                  : "Use our free interactive tools to model projected monthly payments, compare private vs. federal borrowing trade-offs, and chart your financing path."}
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

export default ProfessionalDegreeLoanLimitsArticlePage;

