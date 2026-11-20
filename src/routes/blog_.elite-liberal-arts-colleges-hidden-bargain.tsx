import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, TopRouteDeco } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE =
  "Elite Liberal Arts Colleges: A Hidden Bargain | Grad Navigator";
const DESCRIPTION =
  "Sticker prices topping $75,000 can scare families away, but elite liberal arts colleges offer transformative financial aid — with free tuition for families earning under $200,000. Data analysis of net prices vs. public flagships by Jaylen Peng.";
const URL =
  "https://www.graduationnavigator.com/blog/elite-liberal-arts-colleges-hidden-bargain";

export const Route = createFileRoute(
  "/blog_/elite-liberal-arts-colleges-hidden-bargain"
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
          datePublished: "2026-11-08",
          dateModified: "2026-11-08",
        }),
      },
    ],
  }),
  component: EliteLiberalArtsHiddenBargainArticlePage,
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

function SparklesIcon() {
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
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
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

/* ---------- Table Dataset Interface ---------- */
interface NetPriceRow {
  institution: string;
  type: "lac" | "public";
  isLac: boolean;
  b1: number; // $0-30k
  b2: number; // $30k-48k
  b3: number; // $48k-75k
  b4: number; // $75k-110k
  b5: number; // >$110k
  notes?: string;
}

const NET_PRICE_DATA: NetPriceRow[] = [
  {
    institution: "Williams College",
    type: "lac",
    isLac: true,
    b1: 0,
    b2: 0,
    b3: 0,
    b4: 8825,
    b5: 48374,
  },
  {
    institution: "UMass Amherst",
    type: "public",
    isLac: false,
    b1: 11103,
    b2: 13259,
    b3: 16738,
    b4: 24016,
    b5: 31297,
  },
  {
    institution: "Swarthmore College",
    type: "lac",
    isLac: true,
    b1: 8580,
    b2: 5592,
    b3: 8292,
    b4: 22443,
    b5: 47429,
    notes: "*$75k–$110k figure uses available 2023–24 value",
  },
  {
    institution: "Penn State (University Park)",
    type: "public",
    isLac: false,
    b1: 19458,
    b2: 19743,
    b3: 26257,
    b4: 33579,
    b5: 37209,
  },
  {
    institution: "Wesleyan University",
    type: "lac",
    isLac: true,
    b1: 4432,
    b2: 5898,
    b3: 10310,
    b4: 10905,
    b5: 50788,
  },
  {
    institution: "University of Connecticut",
    type: "public",
    isLac: false,
    b1: 13936,
    b2: 14656,
    b3: 18705,
    b4: 26945,
    b5: 31886,
  },
  {
    institution: "Bowdoin College",
    type: "lac",
    isLac: true,
    b1: 3275,
    b2: 3464,
    b3: 6764,
    b4: 20899,
    b5: 42867,
  },
  {
    institution: "University of Maine",
    type: "public",
    isLac: false,
    b1: 13222,
    b2: 12893,
    b3: 13468,
    b4: 18513,
    b5: 22823,
  },
  {
    institution: "Grinnell College",
    type: "lac",
    isLac: true,
    b1: 6739,
    b2: 6235,
    b3: 6220,
    b4: 16891,
    b5: 36265,
  },
  {
    institution: "University of Iowa",
    type: "public",
    isLac: false,
    b1: 13811,
    b2: 16220,
    b3: 20136,
    b4: 22711,
    b5: 24580,
  },
];

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

const FIT_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "income-subsidized",
    tagEn: "Family Income Under $200k",
    tagEs: "Ingresos Familiares Bajo $200k",
    titleEn: "Qualify for $0 Tuition or Deep Need-Based Discounts",
    titleEs: "Calificas para Matrícula de $0 o Grandes Descuentos por Necesidad",
    descEn:
      "Institutions like Williams, Swarthmore, and Davidson eliminate tuition entirely for households under $175k–$200k, meaning your net price could be far lower than your local in-state public university.",
    descEs:
      "Instituciones como Williams, Swarthmore y Davidson eliminan totalmente la matrícula para hogares con ingresos inferiores a $175k–$200k, lo que hace que tu precio neto sea mucho menor que el de una universidad pública local.",
  },
  {
    id: "small-seminars",
    tagEn: "Classroom Learning",
    tagEs: "Aprendizaje en Aula",
    titleEn: "Thrive in Discussion-Based Seminars (Under 20 Students)",
    titleEs: "Prosperas en Seminarios Basados en Discusión (Menos de 20 Alumnos)",
    descEn:
      "You learn best when engaging directly with full professors in intimate classes rather than sitting in 300-person lecture halls taught by graduate teaching assistants.",
    descEs:
      "Aprendes mejor interactuando directamente con profesores titulares en clases reducidas en lugar de asistir a clases magistrales masivas con asistentes de docencia.",
  },
  {
    id: "undergrad-research",
    tagEn: "Lab & Faculty Access",
    tagEs: "Acceso a Laboratorios",
    titleEn: "Unshared Access to Research Equipment & Faculty Mentorship",
    titleEs: "Acceso Exclusivo a Equipos de Investigación y Mentoría Docente",
    descEn:
      "Because liberal arts colleges have few or no graduate students, undergraduates get priority access to multimillion-dollar labs, research grants, and direct co-authoring credits with professors.",
    descEs:
      "Debido a que las universidades de artes liberales tienen pocos o ningún alumno de posgrado, los universitarios de pregrado tienen prioridad para usar laboratorios avanzados y coescribir publicaciones con profesores.",
  },
  {
    id: "career-earnings",
    tagEn: "Long-Term ROI",
    tagEs: "ROI a Largo Plazo",
    titleEn: "Aim for High Long-Term Earning Trajectories ($88k+ at 10 Years)",
    titleEs: "Apuntas a Trayectorias Salariales Altas ($88k+ a los 10 Años)",
    descEn:
      "Graduates of top-tier liberal arts colleges achieve median earnings of $88,220 a decade after enrollment, outpacing top-10 public national universities ($83,283) across finance, tech, law, and medicine.",
    descEs:
      "Los graduados de colegios de artes liberales de élite alcanzan ingresos medianos de $88,220 diez años después de matricularse, superando a las 10 mejores universidades públicas nacionales ($83,283).",
  },
];

function EliteLiberalArtsHiddenBargainArticlePage() {
  const { t, lang } = useI18n();
  const isEs = lang === "es";

  // Table filter state
  const [filterType, setFilterType] = useState<"all" | "lac" | "public">("all");
  const [checkedIds, setCheckedIds] = useState<string[]>([
    "income-subsidized",
    "small-seminars",
  ]);

  const toggleChecklist = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredData = useMemo(() => {
    if (filterType === "lac") return NET_PRICE_DATA.filter((r) => r.isLac);
    if (filterType === "public") return NET_PRICE_DATA.filter((r) => !r.isLac);
    return NET_PRICE_DATA;
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
              <div className="eyebrow">{t("lacb.eyebrow")}</div>
              <h1
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  lineHeight: "1.2",
                  marginBottom: "14px",
                }}
              >
                {t("lacb.h1")}
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
                {t("lacb.sub")}
              </p>
              <div className="updated" style={{ marginBottom: "22px" }}>
                <span className="dot" />
                {t("lacb.updated")}
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
                    {t("lacb.why.title")}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14.5px",
                      lineHeight: "1.6",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {t("lacb.why.p")}
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Animation */}
            <div className="doc-hero-media">
              <img
                src="/images/gn-animation-free-money-first.svg"
                width="800"
                height="600"
                alt={
                  isEs
                    ? "Animación de estudiante encontrando becas y ayuda financiera transformadora en la universidad"
                    : "Animated student discovering financial aid and hidden bargains in higher education"
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
                $75,417
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Matrícula Promedio Top 10 LACs" : "Top 10 LAC Average Tuition"}
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
                  ? "Supera la matrícula promedio de $71,534 de las 10 mejores universidades nacionales (Harvard, MIT, Princeton)."
                  : "Exceeds the $71,534 average tuition of top 10 national universities (MIT, Princeton, Harvard)."}
              </div>
            </div>

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
                {isEs ? "$0 Matrícula" : "$0 Tuition"}
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Ingresos Familiares Bajo $200k" : "Families Earning Under $200k"}
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
                  ? "Swarthmore y Williams garantizan cero matrícula bajo $200k; Davidson bajo $175k."
                  : "Swarthmore & Williams guarantee free tuition under $200k; Davidson under $175k."}
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
                $88,220
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Ingreso Mediano a 10 Años (LACs)" : "10-Yr Median Earnings (LACs)"}
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
                  ? "Supera los $83,283 de las 10 mejores universidades públicas nacionales de EE. UU."
                  : "Out-earns the top 10 public national universities ($83,283) a decade after enrolling."}
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
                $300,000+
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Familias que Aún Califican" : "Income Still Qualifying"}
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
                  ? "Incluso familias que ganan más de $300,000 reciben sustanciales ofertas de ayuda basada en necesidad."
                  : "Households earning $300k or more frequently receive generous need-based grants."}
              </div>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#sticker-price">{t("lacb.nav.tuition")}</a>
          <a href="#generous-aid">{t("lacb.nav.aid")}</a>
          <a href="#net-price-table">{t("lacb.nav.table")}</a>
          <a href="#median-earnings">{t("lacb.nav.earnings")}</a>
          <a href="#the-experience">{t("lacb.nav.experience")}</a>
          <a href="#sources">{t("lacb.nav.sources")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: At First Glance */}
          <section className="doc-section" id="sticker-price" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 1 de 6" : "Part 1 of 6"}</span>
            <h2>{isEs ? "A Primera Vista: El Mito del Precio de Lista" : "At First Glance"}</h2>
            <p className="lead" style={{ fontSize: "17px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  <strong>En cifras:</strong> Los 10 mejores colegios privados de artes liberales según la clasificación de <em>U.S. News &amp; World Report</em> —incluyendo instituciones como Williams, Amherst y Bowdoin— tienen una matrícula promedio anual de <strong>$75,417</strong>.
                </>
              ) : (
                <>
                  <strong>By the numbers:</strong> The top 10 private liberal arts colleges in <em>U.S. News &amp; World Report’s</em> rankings, including schools like Williams, Amherst, and Bowdoin, have an average annual tuition of <strong>$75,417</strong>.
                </>
              )}
            </p>
            <p style={{ fontSize: "15.5px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
              {isEs ? (
                <>
                  Esta cifra supera los <strong>$71,534</strong> de matrícula anual promedio de las 10 mejores universidades nacionales de investigación en el ranking de U.S. News, que incluye al MIT, Princeton y Harvard. Sin embargo, juzgar estas instituciones únicamente por su precio de catálogo es uno de los errores financieros más costosos que cometen los postulantes.
                </>
              ) : (
                <>
                  This actually exceeds the <strong>$71,534</strong> average annual tuition of the top 10 national research universities in the U.S. News rankings, including MIT, Princeton, and Harvard. Yet evaluating these institutions solely by their sticker price is one of the most common mistakes prospective applicants make.
                </>
              )}
            </p>
          </section>

          {/* Section 2: The Difference: Generous Financial Aid */}
          <section className="doc-section" id="generous-aid" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 2 de 6" : "Part 2 of 6"}</span>
            <h2>{isEs ? "La Verdadera Diferencia: Paquetes Masivos de Ayuda Financiera" : "The Difference: Generous Financial Aid"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  No permitas que el precio de etiqueta te intimide. Muchas facultades de artes liberales ofrecen <strong>amplios paquetes de ayuda financiera</strong> para estudiantes de una extensa gama de niveles socioeconómicos. A medida que el grupo demográfico de postulantes universitarios se reduce, la asequibilidad se ha convertido en una estrategia primordial para que estas prestigiosas instituciones atraigan al mejor talento.
                </>
              ) : (
                <>
                  Don’t let the sticker price scare you. Many liberal arts colleges offer <strong>extensive financial aid packages</strong> for students across a wide range of income levels. As the national pool of college applicants shrinks, affordability has become an increasingly important strategy for these schools to stand out and attract prospective students.
                </>
              )}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                gap: "18px",
                margin: "24px 0",
              }}
            >
              <div
                style={{
                  padding: "22px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid var(--teal)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <ShieldCheckIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Matrícula $0 Bajo $200k" : "$0 Tuition Under $200k"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      A partir del próximo año, las familias con ingresos inferiores a <strong>$200,000</strong> no pagarán matrícula en <strong>Swarthmore</strong> y <strong>Williams</strong>.
                    </>
                  ) : (
                    <>
                      Starting next year, families earning under <strong>$200,000</strong> will pay zero tuition at <strong>Swarthmore</strong> and <strong>Williams</strong>.
                    </>
                  )}
                </p>
              </div>

              <div
                style={{
                  padding: "22px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #2563eb",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <SparklesIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Umbral de $175k en Davidson" : "$175k Threshold at Davidson"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Lo mismo aplica para familias con ingresos menores a <strong>$175,000 en Davidson College</strong>. Otras instituciones de élite como <strong>Wellesley, Washington and Lee y Colby</strong> cuentan con programas similares.
                    </>
                  ) : (
                    <>
                      The same applies to families earning under <strong>$175,000 at Davidson</strong>. Many other elite LACs, including <strong>Wellesley, Washington and Lee, and Colby</strong>, have similar programs.
                    </>
                  )}
                </p>
              </div>

              <div
                style={{
                  padding: "22px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #d97706",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <TrendingUpIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Ayuda Incluso Superando los $300k" : "Aid Extending Past $300k"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Muchas familias por encima de estos umbrales también reciben generosas ofertas de ayuda, e incluso familias que ganan <strong>$300,000 o más</strong> aún califican para subvenciones según la composición familiar y activos.
                    </>
                  ) : (
                    <>
                      Many families above these thresholds also receive generous financial aid offers, and some families earning <strong>$300,000 or more</strong> still qualify depending on family size and assets.
                    </>
                  )}
                </p>
              </div>
            </div>

            <p style={{ fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
              {isEs ? (
                <>
                  En muchos casos, especialmente para familias de ingresos bajos y medios, un colegio de artes liberales de élite resulta <strong>más barato que una universidad pública estatal</strong>. Los LAC son además notablemente más asequibles para estudiantes de familias de mayores ingresos de lo que su precio de lista sugiere.
                </>
              ) : (
                <>
                  In some cases, especially for lower-income families, an elite liberal arts college can be <strong>cheaper than a state school</strong>. LACs are also significantly more affordable for students from higher-earning families than their tuition indicates.
                </>
              )}
            </p>
          </section>

          {/* Section 3: LAC vs. Public Net Price Matrix */}
          <section className="doc-section" id="net-price-table" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 3 de 6" : "Part 3 of 6"}</span>
            <h2>{isEs ? "Precio Neto: Colegios de Artes Liberales vs. Universidades Públicas" : "LAC vs. Public University Net Price at Various Income Levels"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Las cifras reflejan el precio neto anual promedio que pagan los estudiantes de primer año a tiempo completo que reciben ayuda del Título IV dentro de cada tramo de ingresos familiares. El precio neto incluye colegiatura, cuotas, libros y gastos estimados de manutención, restando becas y subvenciones que no se reembolsan.
                </>
              ) : (
                <>
                  Figures show the average annual net price paid by first-time, full-time students receiving federal Title IV aid within each reported family-income bracket. Net price includes tuition, fees, books, and estimated living expenses, minus grants and scholarships.
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
                {isEs ? "Todas las 10 Instituciones" : "All 10 Institutions"}
              </button>
              <button
                type="button"
                onClick={() => setFilterType("lac")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1px solid var(--line)",
                  background: filterType === "lac" ? "var(--teal)" : "var(--card)",
                  color: filterType === "lac" ? "#fff" : "var(--ink)",
                  cursor: "pointer",
                }}
              >
                {isEs ? "Solo Colegios de Artes Liberales (5)" : "Liberal Arts Colleges Only (5)"}
              </button>
              <button
                type="button"
                onClick={() => setFilterType("public")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1px solid var(--line)",
                  background: filterType === "public" ? "var(--ink)" : "var(--card)",
                  color: filterType === "public" ? "#fff" : "var(--ink)",
                  cursor: "pointer",
                }}
              >
                {isEs ? "Solo Universidades Públicas (5)" : "Public Universities Only (5)"}
              </button>
            </div>

            {/* Net Price Table */}
            <div style={{ overflowX: "auto", margin: "16px 0", borderRadius: "12px", border: "1px solid var(--line)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "var(--card)", borderBottom: "2px solid var(--line)" }}>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Institución" : "Institution"}</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>$0–$30,000</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>$30,001–$48,000</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>$48,001–$75,000</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>$75,001–$110,000</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Más de $110,000" : "Over $110,000"}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, idx) => (
                    <tr
                      key={row.institution}
                      style={{
                        borderBottom: "1px solid var(--line)",
                        background:
                          row.isLac
                            ? "color-mix(in srgb, var(--teal) 4%, var(--card))"
                            : idx % 2 === 1
                            ? "color-mix(in srgb, var(--bg) 50%, var(--card))"
                            : "var(--card)",
                      }}
                    >
                      <td style={{ padding: "14px 16px", fontWeight: 700 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span
                            style={{
                              display: "inline-block",
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: row.isLac ? "var(--teal)" : "var(--ink-soft)",
                            }}
                          />
                          <span style={{ color: "var(--ink)" }}>{row.institution}</span>
                          {row.isLac && (
                            <span
                              style={{
                                fontSize: "11px",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                background: "color-mix(in srgb, var(--teal) 15%, transparent)",
                                color: "var(--teal)",
                                fontWeight: 700,
                              }}
                            >
                              LAC
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontWeight: row.b1 === 0 ? 700 : 500, color: row.b1 === 0 ? "var(--teal)" : "inherit" }}>
                        ${row.b1.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontWeight: row.b2 === 0 ? 700 : 500, color: row.b2 === 0 ? "var(--teal)" : "inherit" }}>
                        ${row.b2.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontWeight: row.b3 === 0 ? 700 : 500, color: row.b3 === 0 ? "var(--teal)" : "inherit" }}>
                        ${row.b3.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontWeight: 500 }}>
                        ${row.b4.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", fontWeight: 500 }}>
                        ${row.b5.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: "12.5px", color: "var(--ink-soft)", fontStyle: "italic", marginTop: "8px" }}>
              {isEs
                ? "Las cifras muestran el precio neto anual promedio para estudiantes primerizos a tiempo completo que reciben ayuda del Título IV en cada tramo. Datos del ciclo 2022–23, excepto el tramo de $75,001–$110,000 de Swarthmore que utiliza el valor disponible de 2023–24."
                : "Figures show the average annual net price paid by first-time, full-time students receiving federal Title IV aid within each reported family-income bracket. Figures are from 2022–23, except Swarthmore’s $75,001–$110,000 figure, which uses its available 2023–24 value."}
            </p>
          </section>

          {/* Section 4: Elite Outcomes: 10-Year Earnings Chart */}
          <section className="doc-section" id="median-earnings" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 4 de 6" : "Part 4 of 6"}</span>
            <h2>{isEs ? "Resultados de Élite: Ingresos Medianos a 10 Años de Matrícula" : "Elite Outcomes: Median Annual Earnings 10 Years After Enrollment"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Los colegios de artes liberales ofrecen resultados de graduación del más alto calibre, compitiendo de tú a tú con las universidades públicas y privadas líderes del país:
                </>
              ) : (
                <>
                  Liberal arts colleges offer elite career outcomes that directly compete with top private and public national universities:
                </>
              )}
            </p>

            {/* Custom Horizontal Bar Chart recreating PDF Chart */}
            <div
              style={{
                background: "var(--card)",
                borderRadius: "16px",
                border: "1px solid var(--line)",
                padding: "28px 24px",
                margin: "24px 0",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "26px" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "19px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "Ingresos Medianos Anuales 10 Años Después de la Matrícula"
                    : "Median Annual Earnings 10 Years After Enrollment"}
                </h3>
              </div>

              {/* Horizontal Bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Bar 1: Top 10 Private National Universities */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "14px", fontWeight: 600 }}>
                    <span style={{ color: "var(--ink)" }}>
                      {isEs ? "Top 10 Universidades Privadas Nacionales" : "Top 10 Private National Universities"}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--ink)" }}>
                      $105,784
                    </span>
                  </div>
                  <div style={{ height: "32px", background: "var(--line)", borderRadius: "6px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: "88%", // 105,784 / 120,000
                        height: "100%",
                        background: "#1e3a8a",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                </div>

                {/* Bar 2: Top 10 Private Liberal Arts Colleges */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "14px", fontWeight: 700 }}>
                    <span style={{ color: "var(--teal)" }}>
                      {isEs ? "Top 10 Colegios de Artes Liberales Privados" : "Top 10 Private Liberal Arts Colleges"}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--teal)" }}>
                      $88,220
                    </span>
                  </div>
                  <div style={{ height: "32px", background: "var(--line)", borderRadius: "6px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: "73.5%", // 88,220 / 120,000
                        height: "100%",
                        background: "var(--teal)",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                </div>

                {/* Bar 3: Top 10 Public National Universities */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "14px", fontWeight: 600 }}>
                    <span style={{ color: "var(--ink-soft)" }}>
                      {isEs ? "Top 10 Universidades Públicas Nacionales" : "Top 10 Public National Universities"}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--ink-soft)" }}>
                      $83,283
                    </span>
                  </div>
                  <div style={{ height: "32px", background: "var(--line)", borderRadius: "6px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: "69.4%", // 83,283 / 120,000
                        height: "100%",
                        background: "#0284c7",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Chart Scale Labels */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "16px",
                  paddingTop: "10px",
                  borderTop: "1px solid var(--line)",
                  fontSize: "12px",
                  color: "var(--ink-soft)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <span>$0</span>
                <span>$20k</span>
                <span>$40k</span>
                <span>$60k</span>
                <span>$80k</span>
                <span>$100k</span>
                <span>$120k</span>
              </div>
            </div>

            <p style={{ fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
              {isEs ? (
                <>
                  Si bien no es tan alto como el de las universidades privadas de mayor escala, los colegios de artes liberales mejor clasificados aún ofrecen un <strong>alto potencial de ingresos a un costo neto potencialmente mucho menor</strong>, superando con holgura a las mejores universidades públicas del país.
                </>
              ) : (
                <>
                  While not quite as high as top private research universities, the highest-ranked liberal arts colleges still offer a <strong>high earning potential at a potentially lower cost</strong>, comfortably out-earning the nation's premier public flagship institutions.
                </>
              )}
            </p>
          </section>

          {/* Section 5: The Liberal Arts Experience */}
          <section className="doc-section" id="the-experience" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 5 de 6" : "Part 5 of 6"}</span>
            <h2>{isEs ? "La Experiencia de Artes Liberales: Factores Distintivos" : "The Liberal Arts Experience"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Más allá de la asequibilidad, el prestigio y el sólido retorno de inversión, los colegios de artes liberales ofrecen una experiencia formativa única que los diferencia de las universidades masivas:
                </>
              ) : (
                <>
                  Beyond affordability, prestige, and strong returns on investment, liberal arts colleges offer a unique undergraduate experience that sets them apart from larger public and private universities:
                </>
              )}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "18px",
                margin: "24px 0",
              }}
            >
              <div
                style={{
                  padding: "22px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid var(--teal)",
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", fontSize: "17px", fontWeight: 700 }}>
                  {isEs ? "Clases Más Reducidas" : "Smaller Class Sizes"}
                </h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Las clases pequeñas brindan a los estudiantes mayores oportunidades para conectar directamente con sus profesores y compañeros, debatir ideas y recibir retroalimentación continua.
                    </>
                  ) : (
                    <>
                      Liberal arts colleges offer smaller classes, giving students more opportunities to connect with professors and peers.
                    </>
                  )}
                </p>
              </div>

              <div
                style={{
                  padding: "22px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #2563eb",
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", fontSize: "17px", fontWeight: 700 }}>
                  {isEs ? "Comunidad Muy Cercana" : "Tight-Knit Community"}
                </h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Las poblaciones estudiantiles más pequeñas fomentan una comunidad sólida, creando un entorno más personal, solidario y colaborativo.
                    </>
                  ) : (
                    <>
                      Smaller student populations foster a strong community, creating a more personal, supportive, and collaborative environment.
                    </>
                  )}
                </p>
              </div>

              <div
                style={{
                  padding: "22px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid #d97706",
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", fontSize: "17px", fontWeight: 700 }}>
                  {isEs ? "Requisitos Básicos Amplios" : "Core Curricular Requirements"}
                </h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Los planes de estudio fomentan la curiosidad intelectual, exigiendo completar cursos en múltiples disciplinas junto a la carrera para desarrollar un pensamiento crítico multidisciplinario.
                    </>
                  ) : (
                    <>
                      Liberal arts curricula encourage intellectual curiosity and exploration, typically requiring students to complete coursework across multiple disciplines alongside their major.
                    </>
                  )}
                </p>
              </div>

              <div
                style={{
                  padding: "22px",
                  background: "var(--card)",
                  borderRadius: "14px",
                  border: "1px solid var(--line)",
                  borderTop: "3px solid var(--ink)",
                }}
              >
                <h3 style={{ margin: "0 0 8px 0", fontSize: "17px", fontWeight: 700 }}>
                  {isEs ? "Enfoque en el Pregrado" : "Undergraduate Focus"}
                </h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      La población de posgrado es mínima o inexistente, por lo que los recursos del campus, fondos de investigación y laboratorios están diseñados principalmente para los alumnos de pregrado.
                    </>
                  ) : (
                    <>
                      The graduate student population is typically smaller, with campus resources, faculty grants, and laboratories primarily designed for undergraduates.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* What you miss out on Callout */}
            <div
              style={{
                padding: "20px 24px",
                background: "var(--bg)",
                borderRadius: "12px",
                border: "1px solid var(--line)",
                margin: "24px 0",
              }}
            >
              <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                {isEs ? "De Qué Prescindes al Elegir un LAC" : "What You Miss Out On"}
              </h4>
              <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                {isEs ? (
                  <>
                    Una experiencia más íntima puede tener como contrapartida prescindir de la vibrante cultura de campus multitudinario (como los grandes eventos deportivos División 1), macro-laboratorios de investigación médica y ciertas oportunidades reservadas a universidades de enorme escala.
                  </>
                ) : (
                  <>
                    The more intimate experience can come at the cost of a massive, bustling campus culture (like Division 1 mega-stadium sports), massive medical research complexes, and other opportunities exclusive to very large universities.
                  </>
                )}
              </p>
            </div>
          </section>

          {/* Section 6: Interactive Fit Checklist */}
          <section className="doc-section" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Herramienta de Evaluación" : "Evaluation Tool"}</span>
            <h2>{isEs ? "¿Es un Colegio de Artes Liberales Adecuado para Ti?" : "Interactive Fit & Affordability Checklist"}</h2>
            <p className="lead" style={{ fontSize: "16px", lineHeight: "1.6" }}>
              {isEs
                ? "Revisa estos 4 factores para comprobar si un colegio de artes liberales se ajusta a tus necesidades financieras y académicas:"
                : "Check these four key indicators to determine whether an elite liberal arts college matches your financial profile and educational goals:"}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "14px",
                margin: "24px 0",
              }}
            >
              {FIT_CHECKLIST_ITEMS.map((item) => {
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
          </section>

          {/* Section 7: The Bottom Line & Sources */}
          <section className="doc-section" id="sources" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 6 de 6" : "Part 6 of 6"}</span>
            <h2>{isEs ? "En Conclusión (The Bottom Line)" : "The Bottom Line"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  No permitas que el precio de etiqueta te aleje. Un colegio de artes liberales ofrece <strong>resultados igualmente de élite</strong> y una <strong>experiencia universitaria íntima</strong>, potencialmente a un costo mucho menor gracias a su ayuda financiera. Considera tu carrera, tus preferencias de aprendizaje y tus metas a futuro para decidir si un LAC es el camino adecuado para ti.
                </>
              ) : (
                <>
                  Don’t let the sticker price scare you off. A liberal arts college offers <strong>similarly elite outcomes</strong> and an <strong>intimate college experience</strong>, potentially at a lower cost. Consider your degree, preferences, and career goals to decide whether a LAC is right for you.
                </>
              )}
            </p>

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
                to="/blog/5-liberal-arts-colleges-graduate-school"
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
                  {isEs ? "Colegios de Valor" : "Value LACs"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "5 Universidades de Artes Liberales Destacadas para Posgrados"
                    : "5 Liberal Arts Colleges That Punch Above Their Weight for Graduate School"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Descubre cómo Wooster, Haverford, St. John's, Union y Colorado College logran una admisión superior al 90% a posgrados y convenios 4+1 con la Ivy League."
                    : "Explore how Wooster, Haverford, St. John's, Union, and Colorado College secure elite master's & Ph.D. pipelines."}
                </p>
              </Link>

              <Link
                to="/blog/public-vs-private-grad-school"
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
                  {isEs ? "Pública vs. Privada" : "Public vs. Private"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "Posgrado Público vs. Privado: Costo, ROI y Deuda"
                    : "Public vs. Private Graduate School: Cost, ROI & Debt"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Comparativa detallada entre costos brutos de matrícula y el impacto de los paquetes de financiamiento institucional."
                    : "Comprehensive analysis of tuition structures, endowments, and real net price differences."}
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
                  borderTop: "3px solid #d97706",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#d97706", textTransform: "uppercase" }}>
                  {isEs ? "Implicaciones por Industria" : "Specific Industries"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "¿Cuándo Deberías Obtener una Maestría?"
                    : "When Should You Get a Master’s Degree?"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Cómo influyen los títulos avanzados en las primas salariales según el momento de tu carrera e industria."
                    : "Evaluating wage premiums by industry and starting age against tuition and forgone wages."}
                </p>
              </Link>

              <Link
                to="/blog/which-phd-fields-are-worth-it"
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
                  {isEs ? "Retorno Doctoral" : "Doctoral Fields"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "¿Qué Campos de Doctorado Valen la Pena?"
                    : "Which PhD Fields Are Worth It?"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Tiempos de graduación, estipendios y viabilidad laboral entre humanidades, ciencias sociales y STEM."
                    : "Completion rates, stipend viability, and academic vs. industry career returns across disciplines."}
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
                    <strong>Fuentes oficiales:</strong> U.S. News &amp; World Report; U.S. Department of Education, College Scorecard; National Center for Education Statistics (NCES), Integrated Postsecondary Education Data System (IPEDS); Williams College; Swarthmore College; Davidson College; The Washington Post; The Wall Street Journal; University of Olivet. Revisado al 8 de nov. de 2026. Autor: Jaylen Peng.
                  </>
                ) : (
                  <>
                    <strong>Sources:</strong> U.S. News &amp; World Report; U.S. Department of Education, College Scorecard; National Center for Education Statistics, Integrated Postsecondary Education Data System (IPEDS); Williams College; Swarthmore College; Davidson College; The Washington Post; The Wall Street Journal; University of Olivet. Reviewed as of Nov. 8, 2026. Author: Jaylen Peng.
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
                  Este artículo tiene fines informativos y educativos únicamente. Las políticas de ayuda financiera, umbrales de ingresos familiares y costos netos están sujetos a cambios anuales por parte de cada institución. Te recomendamos consultar directamente las oficinas de ayuda financiera de cada colegio.
                </>
              ) : (
                <>
                  This article is for informational and educational purposes only. Financial aid policies, family income thresholds, and published net prices are subject to annual revisions by respective colleges. Always verify current aid criteria with institutional financial aid offices.
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
                  ? "Calcula tu Ayuda Financiera y Compara tus Ofertas Universitarias"
                  : "Calculate Your Aid & Compare College Offers"}
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
                  ? "Usa nuestras herramientas gratuitas para comparar el precio neto real, evaluar paquetes de becas y modelar tus finanzas universitarias."
                  : "Use our free interactive tools to compare real net prices, evaluate financial aid packages, and chart your debt-free pathway."}
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

export default EliteLiberalArtsHiddenBargainArticlePage;

