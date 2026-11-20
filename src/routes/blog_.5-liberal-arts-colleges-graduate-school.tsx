import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, TopRouteDeco } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE =
  "5 Liberal Arts Colleges That Punch Above Their Weight for Graduate School | Grad Navigator";
const DESCRIPTION =
  "Students planning for advanced degrees often overlook small liberal arts colleges. Here is how Wooster, Haverford, St. John's, Union, and Colorado College deliver elite research mentorship, Ivy League 4+1 partnerships, and standout graduate admissions. By Peter Foulke & Jaylen Peng.";
const URL =
  "https://www.graduationnavigator.com/blog/5-liberal-arts-colleges-graduate-school";

export const Route = createFileRoute(
  "/blog_/5-liberal-arts-colleges-graduate-school"
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
              name: "Peter Foulke",
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
          datePublished: "2026-11-08",
          dateModified: "2026-11-08",
        }),
      },
    ],
  }),
  component: LiberalArtsGraduateCollegesArticlePage,
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

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "18px", height: "18px", color: "var(--teal)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function BookOpenIcon() {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function MicroscopeIcon() {
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
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  );
}

function CompassIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function AwardIcon() {
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
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
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

const READINESS_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "faculty-mentorship",
    tagEn: "Letters & Advocacy",
    tagEs: "Cartas y Respaldo",
    titleEn: "Direct Faculty Mentorship Over Teaching Assistants",
    titleEs: "Tutoría Directa de Profesores Frente a Asistentes Docentes",
    descEn:
      "You value substantive recommendations from tenured faculty who know your research intimately over generic letters written by graduate teaching assistants at large R1 universities.",
    descEs:
      "Valoras cartas de recomendación sustanciales de profesores titulares que conocen tu investigación de cerca, en lugar de cartas genéricas de asistentes de docencia en grandes universidades.",
  },
  {
    id: "undergrad-research",
    tagEn: "Independent Thesis",
    tagEs: "Tesis Independiente",
    titleEn: "Senior Capstone & Independent Original Scholarship",
    titleEs: "Proyecto Final de Grado e Investigación Original Independiente",
    descEn:
      "You want structured, mandatory independent research experience (such as Wooster's I.S. or Union's Steinmetz Symposium) so you enter graduate school already possessing published or defended scholarship.",
    descEs:
      "Buscas experiencia de investigación obligatoria e independiente (como el I.S. de Wooster o el Simposio Steinmetz de Union) para ingresar al posgrado con trabajos defendidos o publicados.",
  },
  {
    id: "unshared-facilities",
    tagEn: "Lab Access",
    tagEs: "Acceso a Laboratorios",
    titleEn: "Direct Access to Million-Dollar Facilities Without Graduate Queues",
    titleEs: "Acceso Directo a Instalaciones Multimillonarias sin Filas de Posgrado",
    descEn:
      "You plan to enter STEM or experimental sciences and benefit from unshared access to beamlines, particle accelerators, and NMR spectrometers reserved exclusively for undergraduates.",
    descEs:
      "Planeas estudiar ciencias experimentales o STEM y aprovechar el acceso exclusivo a aceleradores de partículas y espectrómetros NMR sin competir con candidatos a doctorado.",
  },
  {
    id: "dual-degree",
    tagEn: "Accelerated Pathways",
    tagEs: "Vías Aceleradas",
    titleEn: "Guaranteed or Priority Pathways to Ivy League & Elite Master's",
    titleEs: "Vías Garantizadas o Prioritarias a Maestrías de la Ivy League y de Élite",
    descEn:
      "You want the small-seminar LAC undergraduate experience paired with locked-in 4+1 or 3+2 master's programs at institutions like UPenn, Johns Hopkins, Columbia, or Zhejiang University.",
    descEs:
      "Deseas la atención personalizada de un colegio de artes liberales combinada con programas 4+1 o 3+2 asegurados en instituciones como UPenn, Johns Hopkins, Columbia o la Universidad de Zhejiang.",
  },
  {
    id: "seminar-rigor",
    tagEn: "Seminar & Socratic Rigor",
    tagEs: "Rigor Socrático y Seminarios",
    titleEn: "Discussion-Based Inquiry Over 400-Person Lecture Halls",
    titleEs: "Indagación Basada en Discusión Frente a Clases Magistrales Masivas",
    descEn:
      "You thrive in seminar discussions (like St. John's Great Books or Colorado College's 3.5-week Block Plan) where you formulate, debate, and defend arguments daily—mirroring graduate seminars.",
    descEs:
      "Prosperas en discusiones de seminario (como los Grandes Libros de St. John's o el Plan de Bloques de Colorado College) debatiendo y defendiendo ideas a diario, tal como en el posgrado.",
  },
];

function LiberalArtsGraduateCollegesArticlePage() {
  const { t, lang } = useI18n();
  const isEs = lang === "es";
  const [checkedIds, setCheckedIds] = useState<string[]>([
    "faculty-mentorship",
    "undergrad-research",
    "dual-degree",
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
              <div className="eyebrow">{t("lac.eyebrow")}</div>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: "1.2", marginBottom: "14px" }}>
                {t("lac.h1")}
              </h1>
              <p className="sub" style={{ fontSize: "17.5px", lineHeight: "1.6", color: "var(--ink-soft)", marginBottom: "16px" }}>
                {isEs
                  ? "5 Colegios Universitarios de Artes Liberales que Preparan con Éxito para Estudios de Posgrado: Por qué la atención exclusiva al pregrado, la investigación independiente y los convenios acelerados ofrecen una ventaja insuperable."
                  : "5 Value Liberal Arts Colleges That Prepare You for Graduate School: Why undergraduate-only focus, faculty mentorship, and elite dual-degree pipelines give LAC graduates an outsized edge in top graduate and professional programs."}
              </p>
              <div className="updated" style={{ marginBottom: "22px" }}>
                <span className="dot" />
                {t("lac.updated")}
              </div>

              {/* Why it matters callout */}
              <div className="refi-hero-callout">
                <div className="refi-hero-callout-icon">
                  <AlertTriangleIcon />
                </div>
                <div className="refi-hero-callout-content">
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: 700 }}>
                    {t("lac.why.title")}
                  </h4>
                  <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                    {t("lac.why.p")}
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Animation */}
            <div className="doc-hero-media">
              <img
                src="/images/gn-animation-scholarship-search.svg"
                width="800"
                height="600"
                alt={
                  isEs
                    ? "Animación de estudiante investigando credenciales académicas, investigación y becas de posgrado"
                    : "Animated student researching academic credentials, undergraduate research, and graduate school pathways"
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
                94%
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Admisión en Wooster a Posgrados Prioritarios" : "Wooster Top-Choice Grad Admission"}
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
                  ? "De los graduados de Wooster que postulan a posgrados, el 94% es aceptado en sus universidades de preferencia (Harvard, Yale, Stanford)."
                  : "94% of Wooster grads pursuing advanced degrees gain admission to one of their top-choice universities (Harvard, Yale, Stanford)."}
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
                Top 2% / 4%
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "St. John's Producción Nacional de Ph.Ds" : "St. John's National Ph.D. Production"}
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
                  ? "Top 2% nacional produciendo doctorados en humanidades y top 4% en STEM. 100% de admisión a escuelas de leyes desde 2012."
                  : "Ranks top 2% nationally in producing humanities Ph.Ds, top 4% for STEM Ph.Ds, and holds a 100% law school admission rate since 2012."}
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
                $100M & 1.1 MV
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Union College: Complejo ISEC y Acelerador" : "Union College: $100M ISEC Facility"}
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
                  ? "Acelerador de partículas de 1.1 MV y espectrómetro NMR de 400 MHz con acceso exclusivo para estudiantes de pregrado."
                  : "1.1-MV particle accelerator & 400-MHz NMR spectrometer with zero graduate students competing for instrument beamtime."}
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
                4+1 & 3+2
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Convenios con Ivy League y Élite" : "Ivy League & Elite Dual Degrees"}
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
                  ? "Vías aceleradas automáticas con UPenn (Ingeniería y Bioética), Johns Hopkins, Columbia y Universidad de Zhejiang."
                  : "Guaranteed or priority master's pathways with UPenn (Engineering & Bioethics), Johns Hopkins, Columbia, and Zhejiang."}
              </div>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#wooster">{t("lac.nav.wooster")}</a>
          <a href="#haverford">{t("lac.nav.haverford")}</a>
          <a href="#stjohns">{t("lac.nav.stjohns")}</a>
          <a href="#union">{t("lac.nav.union")}</a>
          <a href="#colorado-college">{t("lac.nav.cc")}</a>
          <a href="#matrix">{t("lac.nav.matrix")}</a>
          <a href="#readiness">{t("lac.nav.checklist")}</a>
          <a href="#sources">{t("lac.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Executive Overview */}
          <section className="doc-section" style={{ paddingTop: "12px" }}>
            <p className="lead" style={{ fontSize: "17.5px", lineHeight: "1.7" }}>
              {isEs ? (
                <>
                  Los estudiantes universitarios que planean obtener títulos avanzados a menudo eligen grandes universidades públicas con amplias oportunidades de investigación o prestigiosas instituciones privadas por reconocimiento de marca. Sin embargo, aunque muchos colegios de artes liberales (LACs) no cuentan con los presupuestos multimillonarios de las universidades R1, lo compensan con creces mediante <strong>cursos rigurosos</strong>, <strong>tutoría docente personalizada</strong> y <strong>programas distintivos</strong> diseñados específicamente para preparar a los graduados para las exigencias del estudio de posgrado.
                </>
              ) : (
                <>
                  Undergraduates planning to earn advanced degrees often choose larger public universities with extensive research opportunities, or private institutions with national name recognition. However, while some private liberal arts colleges (LACs) may not have as many resources or as much broad national consumer recognition, they make up for it with <strong>rigorous coursework</strong>, <strong>close faculty mentorship</strong>, and <strong>distinctive programs</strong> that prepare students exceptionally well for graduate-level study.
                </>
              )}
            </p>
          </section>

          {/* Section 1: The College of Wooster */}
          <section className="doc-section" id="wooster" style={{ scrollMarginTop: "80px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "color-mix(in srgb, var(--teal) 12%, transparent)",
                  color: "var(--teal)",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {isEs ? "Colegio #1 · Wooster, Ohio" : "College #1 · Wooster, Ohio"}
              </span>
            </div>
            <h2>{isEs ? "The College of Wooster" : "The College of Wooster"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  The College of Wooster (COW), ubicado en el noreste de Ohio, se distingue nacionalmente por exigir y enfatizar la <strong>investigación original y proyectos creativos</strong> antes de la graduación. Wooster prepara sistemáticamente a sus estudiantes para llevar a cabo investigación independiente a través de una combinación secuencial de cursos y programas especializados.
                </>
              ) : (
                <>
                  The College of Wooster (COW) in northeastern Ohio distinguishes itself nationally by emphasizing <strong>original research and creative projects</strong> before graduation. COW prepares students to conduct this independent research through a rigorous combination of developmental coursework and specialized programs.
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <BookOpenIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Seminario de Primer Año" : "First-Year Seminar"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Los estudiantes comienzan a desarrollar habilidades críticas de <strong>investigación, redacción y análisis</strong> desde su primer semestre mediante un seminario enfocado en un tema de su propia elección.
                    </>
                  ) : (
                    <>
                      Students begin developing <strong>research, writing, and analytical skills</strong> through a semester-long seminar in an academic subject of their choosing during their first semester.
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <AwardIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Cursos Intensivos de Redacción" : "Writing-Intensive Coursework"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Cursos obligatorios de redacción intensiva y estudios progresivamente especializados ayudan a los estudiantes a dominar la argumentación académica necesaria para formular hipótesis y proyectos independientes.
                    </>
                  ) : (
                    <>
                      Required writing-intensive courses and increasingly specialized study help students develop the methodological skills necessary to conduct autonomous scholarly inquiry.
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
                  <MicroscopeIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Estudio Independiente (I.S.)" : "Independent Study (I.S.)"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Cada estudiante de último año completa una investigación original o proyecto creativo guiado individualmente por un profesor mentor, generando una publicación o tesis académica antes de ingresar a la escuela de posgrado.
                    </>
                  ) : (
                    <>
                      Every senior completes an original research or creative project under the direct guidance of a faculty mentor, producing original scholarship before ever setting foot in graduate school.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Wooster Outcome Callout */}
            <div
              style={{
                padding: "20px 24px",
                background: "color-mix(in srgb, var(--teal) 8%, var(--card))",
                borderRadius: "12px",
                border: "1px solid color-mix(in srgb, var(--teal) 25%, transparent)",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", color: "var(--teal)", fontWeight: 700 }}>
                {isEs ? "Resultados de Admisión a Posgrados de COW" : "COW Proven Graduate Placement Record"}
              </h4>
              <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.6", color: "var(--ink)" }}>
                {isEs ? (
                  <>
                    Este conjunto distintivo de habilidades investigativas ha llevado a numerosos exalumnos de Wooster a ingresar a las mejores escuelas de posgrado del mundo, incluyendo <strong>Harvard, Yale y Stanford</strong>. La universidad reporta oficialmente que el <strong>94% de sus graduados</strong> que buscan títulos avanzados logran admisión en una de sus universidades de primera preferencia.
                  </>
                ) : (
                  <>
                    This unique skill set has led many Wooster alumni to leading graduate schools, including <strong>Harvard, Yale, and Stanford</strong>. COW reports that <strong>94% of students</strong> pursuing graduate degrees gain admission to one of their top-choice universities.
                  </>
                )}
              </p>
            </div>
          </section>

          {/* Section 2: Haverford College */}
          <section className="doc-section" id="haverford" style={{ scrollMarginTop: "80px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "color-mix(in srgb, #2563eb 12%, transparent)",
                  color: "#2563eb",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {isEs ? "Colegio #2 · Haverford, Pensilvania" : "College #2 · Haverford, Pennsylvania"}
              </span>
            </div>
            <h2>{isEs ? "Haverford College" : "Haverford College"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Con sus edificios históricos de piedra, raíces cuáqueras y seminarios reducidos basados en la discusión abierta, Haverford es el arquetipo clásico de un colegio de artes liberales. Sin embargo, su propuesta académica se extiende mucho más allá de las humanidades y ciencias sociales tradicionales gracias a sus <strong>alianzas consolidadas con universidades de investigación de primer nivel</strong>.
                </>
              ) : (
                <>
                  With its historic buildings, Quaker origins, and small discussion-based seminars, Haverford is a quintessential LAC. However, its academic offerings extend far beyond traditional humanities and social sciences by offering <strong>established dual-degree partnerships with world-leading research universities</strong>.
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
                  borderTop: "3px solid #2563eb",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <AwardIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Programa 4+1 en Ingeniería (UPenn)" : "4+1 Engineering Program (UPenn)"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Mediante un convenio exclusivo con la <strong>Universidad de Pensilvania (UPenn)</strong>, los estudiantes elegibles obtienen <em>admisión automática</em> al programa de maestría en ingeniería de Penn, obteniendo su título de pregrado y posgrado en solo 5 años.
                    </>
                  ) : (
                    <>
                      Through a partnership with the <strong>University of Pennsylvania (UPenn)</strong>, eligible students gain <em>automatic admission</em> to its master's program in engineering, earning both a bachelor's and graduate degree in only 5 years.
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
                  borderTop: "3px solid var(--teal)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <MicroscopeIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Programa 4+1 en Bioética (Penn Medicine)" : "4+1 Bioethics Program (Penn Medicine)"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Los estudiantes orientados al sector salud pueden obtener una <strong>Maestría en Bioética (MBE)</strong> de la Facultad de Medicina Perelman de UPenn en 5 años, capacitándolos para carreras lucrativas en consultoría, administración hospitalaria e investigación clínica.
                    </>
                  ) : (
                    <>
                      Students pursuing healthcare careers can earn a <strong>Master of Bioethics (MBE)</strong> from the Perelman School of Medicine at Penn in 5 years, preparing them for lucrative careers in consulting, healthcare administration, and clinical research.
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
                  <CompassIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Maestría en Estudios de China (Zhejiang)" : "Master of China Studies (Zhejiang)"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Disponible exclusivamente para graduados del Consorcio Tri-Co (Haverford, Swarthmore y Bryn Mawr), ofrece una <strong>maestría de dos años totalmente financiada</strong> en la Universidad de Zhejiang para explorar asuntos contemporáneos chinos e ingresar a relaciones internacionales y comercio global.
                    </>
                  ) : (
                    <>
                      Exclusively available to Tri-Co Consortium graduates (Haverford, Swarthmore, and Bryn Mawr), this program offers a <strong>fully funded, two-year master's degree</strong> in China Studies at Zhejiang University, opening international diplomacy, global trade, and doctoral pathways.
                    </>
                  )}
                </p>
              </div>
            </div>

            <p style={{ fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
              {isEs ? (
                <>
                  Estas alianzas institucionales permiten a los estudiantes de Haverford disfrutar de la atención íntima y formativa de un colegio pequeño de artes liberales mientras aseguran credenciales de posgrado en algunas de las facultades más influyentes del planeta.
                </>
              ) : (
                <>
                  Haverford's partnerships let students enjoy the supportive, traditional LAC experience while simultaneously securing graduate-level credentials at premier international and Ivy League research powerhouses.
                </>
              )}
            </p>
          </section>

          {/* Section 3: St. John's College */}
          <section className="doc-section" id="stjohns" style={{ scrollMarginTop: "80px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "color-mix(in srgb, #7c3aed 12%, transparent)",
                  color: "#7c3aed",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {isEs ? "Colegio #3 · Annapolis, Maryland" : "College #3 · Annapolis, Maryland"}
              </span>
            </div>
            <h2>{isEs ? "St. John’s College" : "St. John’s College"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  St. John’s College en Annapolis ofrece una propuesta educativa singular que enfatiza una <strong>educación amplia e impulsada por el estudiante</strong> en lugar de la hiperespecialización temprana que predomina en las universidades actuales.
                </>
              ) : (
                <>
                  St. John’s College in Annapolis offers a unique educational model that emphasizes a <strong>broad, student-driven education</strong> rather than early hyper-specialization.
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
                  borderTop: "3px solid #7c3aed",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <BookOpenIcon />
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>
                    {isEs ? "Sin Especializaciones, Sin Profesores, Sin Conferencias" : "No Majors, No Professors, No Lectures"}
                  </h3>
                </div>
                <p style={{ margin: "0 0 12px 0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Los estudiantes no cursan carreras cerradas; obtienen un título general en artes liberales. Los docentes actúan como <strong>tutores</strong> en lugar de conferencistas, guiando seminarios basados en preguntas y discusiones socráticas.
                    </>
                  ) : (
                    <>
                      Students do not pursue a narrow major; they earn a general degree in liberal arts. Faculty serve as <strong>tutors rather than lecturers</strong>, guiding students through discussion-based seminars rather than passive lectures.
                    </>
                  )}
                </p>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.55", color: "var(--ink)", fontWeight: 500 }}>
                  {isEs
                    ? "Este enfoque refleja de manera directa el proceso de investigación autónoma de las maestrías y doctorados: los alumnos aprenden a desarrollar sus propias convicciones y defenderlas."
                    : "This approach directly mirrors the independent research process of master's and Ph.D. degrees: students develop their own beliefs and defend them with evidence rather than being told what to think."}
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
                  <AwardIcon />
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>
                    {isEs ? "El Seminario de Grandes Libros (Great Books)" : "The Great Books Seminar"}
                  </h3>
                </div>
                <p style={{ margin: "0 0 12px 0", fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      A lo largo de cuatro años completos, los alumnos participan en el <strong>Seminario de Grandes Libros</strong>, analizando y debatiendo textos fundamentales de autores e influyentes pensadores como Austen, Platón, Aristóteles, Shakespeare, Newton y Einstein.
                    </>
                  ) : (
                    <>
                      Over four comprehensive years, students participate in the <strong>Great Books Seminar</strong>, reading, analyzing, and debating seminal foundational works by influential thinkers such as Austen, Plato, Aristotle, Shakespeare, Newton, and Euclid.
                    </>
                  )}
                </p>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.55", color: "var(--ink)", fontWeight: 500 }}>
                  {isEs
                    ? "Proporciona una comprensión íntima de la literatura y el pensamiento fundacional que los graduados aprovechan tanto en pregrado como en estudios doctorales."
                    : "This program gives graduates an intimate understanding of foundational literature, logical argumentation, and philosophy that elevates their graduate-level analysis."}
                </p>
              </div>
            </div>

            {/* St. John's Proven Success Callout */}
            <div
              style={{
                padding: "22px 26px",
                background: "color-mix(in srgb, #7c3aed 7%, var(--card))",
                borderRadius: "14px",
                border: "1px solid color-mix(in srgb, #7c3aed 25%, transparent)",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ margin: "0 0 12px 0", fontSize: "17px", color: "#7c3aed", fontWeight: 700 }}>
                {isEs ? "Éxito Demostrado en Posgrados y Doctorados" : "Proven Graduate & Professional School Success"}
              </h4>
              <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14.5px", lineHeight: "1.65", color: "var(--ink)" }}>
                <li style={{ marginBottom: "8px" }}>
                  <strong>{isEs ? "70% continúa a posgrados:" : "70% pursue advanced degrees:"}</strong>{" "}
                  {isEs
                    ? "El 70% de los graduados de St. John's continúa hacia estudios de posgrado. La institución se ubica en el top 2% nacional produciendo doctorados en humanidades y en el top 4% nacional para doctorados en STEM."
                    : "70% of St. John’s graduates pursue advanced degrees. The college ranks in the top 2% nationally for producing humanities Ph.Ds. and the top 4% for STEM Ph.Ds."}
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <strong>{isEs ? "100% de admisión a derecho desde 2012:" : "100% law school admission rate since 2012:"}</strong>{" "}
                  {isEs
                    ? "Desde 2012, el 100% de los graduados de St. John's que solicitaron ingreso a facultades de derecho fueron admitidos en al menos una de las escuelas solicitadas."
                    : "Since 2012, 100% of students who applied to law school have been accepted to at least one law school they applied to."}
                </li>
                <li>
                  <strong>{isEs ? "Convenios con BU y Johns Hopkins:" : "BU & Johns Hopkins accelerated pathways:"}</strong>{" "}
                  {isEs
                    ? "Convenios de posgrado acelerado con la Universidad de Boston (BU) y Johns Hopkins ofrecen vías directas para medicina, ciencias de la salud y biomedicina."
                    : "Accelerated graduate pathway partnerships with Boston University (BU) and Johns Hopkins offer advanced study opportunities in medicine and healthcare."}
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Union College */}
          <section className="doc-section" id="union" style={{ scrollMarginTop: "80px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "color-mix(in srgb, #0284c7 12%, transparent)",
                  color: "#0284c7",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {isEs ? "Colegio #4 · Schenectady, Nueva York" : "College #4 · Schenectady, New York"}
              </span>
            </div>
            <h2>{isEs ? "Union College" : "Union College"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Union College es reconocido por su emblemática rotonda en el centro del campus, apodada con cariño <em>“The Nott”</em>. No obstante, más allá de su arquitectura histórica, Union alberga algunas de las <strong>instalaciones de investigación de pregrado más avanzadas de todo Estados Unidos</strong>.
                </>
              ) : (
                <>
                  Union College is best known for its picturesque rotunda at the center of campus, affectionately called <em>“The Nott.”</em> But beyond its historic architecture, Union boasts some of the country's <strong>most advanced undergraduate research facilities</strong>.
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
                  borderTop: "3px solid #0284c7",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <MicroscopeIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Instalaciones ISEC de $100M" : "Cutting-Edge $100M ISEC Complex"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Inaugurado en 2020 con una inversión de <strong>$100 millones</strong>, el Complejo Integrado de Ciencia e Ingeniería (ISEC) incluye un <strong>acelerador de partículas de 1.1 megavoltios</strong> para estudiar composición de materiales y un <strong>espectrómetro NMR de 400 MHz</strong> para analizar estructuras moleculares.
                    </>
                  ) : (
                    <>
                      Completed in 2020 for <strong>$100 million</strong>, the Integrated Science and Engineering Complex (ISEC) includes a <strong>1.1-megavolt particle accelerator</strong> used to investigate material composition and a <strong>400-MHz NMR spectrometer</strong> that enables molecular structure research.
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
                  borderTop: "3px solid var(--teal)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <AwardIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Enfoque Exclusivo en Pregrado" : "Zero Graduate Student Competition"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Union <strong>no tiene estudiantes de posgrado</strong>. Esto significa que los alumnos de pregrado disfrutan de acceso exclusivo e ininterrumpido a laboratorios y equipos que en otras universidades están estrictamente reservados para candidatos de maestría y doctorado.
                    </>
                  ) : (
                    <>
                      Union has <strong>no graduate students</strong>, meaning undergraduates have unique, unshared access to multimillion-dollar facilities that at larger research universities are strictly reserved for master's and Ph.D. candidates.
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <CompassIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Investigación Remunerada de Verano" : "Funded Summer Research"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Más de <strong>100 estudiantes de Union</strong> participan cada año en investigación de verano remunerada por hora, asistiendo a científicos en física, biomedicina y economía, presentando luego sus resultados en el Simposio Steinmetz anual.
                    </>
                  ) : (
                    <>
                      Over <strong>100 Union students</strong> take advantage of paid summer research opportunities every year, receiving hourly stipends to assist researchers from physics to economics, then presenting at the annual Steinmetz Symposium.
                    </>
                  )}
                </p>
              </div>
            </div>

            <p style={{ fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
              {isEs ? (
                <>
                  Union College permite a los alumnos de pregrado publicar y operar tecnología instrumental desde el primer año, brindándoles experiencia tangible y una base sólida e inigualable para competir por plazas doctorales.
                </>
              ) : (
                <>
                  Union College lets undergraduates conduct real research the day they step on campus, helping them gain hands-on instrumental mastery and an unassailable foundation for competitive graduate study.
                </>
              )}
            </p>
          </section>

          {/* Section 5: Colorado College */}
          <section className="doc-section" id="colorado-college" style={{ scrollMarginTop: "80px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "color-mix(in srgb, #e11d48 12%, transparent)",
                  color: "#e11d48",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {isEs ? "Colegio #5 · Colorado Springs, Colorado" : "College #5 · Colorado Springs, Colorado"}
              </span>
            </div>
            <h2>{isEs ? "Colorado College" : "Colorado College"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Colorado College (CC), enclavado en las Montañas Rocosas con vistas espectaculares, ofrece un formato educativo no convencional que prepara a sus alumnos de forma extraordinaria para el ritmo y la intensidad del posgrado.
                </>
              ) : (
                <>
                  Colorado College (CC), nestled in the Rockies with stunning mountain views, offers an unconventional educational experience that uniquely prepares students for the demands of higher education.
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
                  borderTop: "3px solid #e11d48",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <BookOpenIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "El Plan de Bloques (The Block Plan)" : "The Block Plan"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      En vez de dividir la atención entre 4 o 5 cursos simultáneos, los alumnos toman <strong>ocho bloques al año</strong>, sumergiéndose de lleno en <em>una sola materia durante tres semanas y media</em>. Esta intensidad refleja con precisión el enfoque singular y demandante de los seminarios de posgrado.
                    </>
                  ) : (
                    <>
                      Instead of semester-long courses across multiple disciplines, CC students take <strong>eight blocks throughout the year</strong>, immersing themselves in <em>one subject for three and a half weeks at a time</em>. This program reflects the focused, singular intensity of graduate seminars and thesis work.
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
                  borderTop: "3px solid var(--teal)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <CompassIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Investigación de Campo en 300+ Cursos" : "Field Research in 300+ Courses"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      Más de <strong>300 cursos incorporan trabajo de campo</strong>, y casi la mitad de los estudiantes de CC participa anualmente. Los alumnos trasladan el aprendizaje fuera del aula hacia la aplicación real en botánica, geología y estudios del suroeste.
                    </>
                  ) : (
                    <>
                      Over <strong>300 courses include field study</strong>, with nearly half of CC students participating each year. Students leave the classroom to experience real-world applications in disciplines such as botany, geology, and environmental science.
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
                  <AwardIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700 }}>
                    {isEs ? "Convenios con Johns Hopkins y Columbia" : "Graduate Pathways: Hopkins & Columbia"}
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs ? (
                    <>
                      CC reporta que más del <strong>60% de su generación 2010</strong> completó o cursa posgrados en los últimos 15 años. Cuenta con programas establecidos como la vía de negocios <strong>4+1 con Johns Hopkins</strong> y el programa de ingeniería <strong>3+2 con Columbia University</strong>.
                    </>
                  ) : (
                    <>
                      CC reports that over <strong>60% of its class of 2010</strong> pursued or completed graduate-level degrees over the past 15 years. Established dual-degree pipelines include a <strong>4+1 business pathway with Johns Hopkins</strong> and a <strong>3+2 engineering program with Columbia University</strong>.
                    </>
                  )}
                </p>
              </div>
            </div>

            <p style={{ fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
              {isEs ? (
                <>
                  Colorado College alienta a los estudiantes a comprometerse con profundidad a través del Plan de Bloques y expediciones de campo continuas, otorgándoles el rigor metodológico para sobresalir en escuelas de posgrado y más allá.
                </>
              ) : (
                <>
                  Colorado College encourages students to engage deeply through its block plan and extensive field study, equipping them with the resilience, focus, and analytical skills required in top graduate programs.
                </>
              )}
            </p>
          </section>

          {/* Section 6: Comparative Matrix */}
          <section className="doc-section" id="matrix" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 6 de 8" : "Part 6 of 8"}</span>
            <h2>{isEs ? "Matriz Comparativa: Las 5 Instituciones Frente a Frente" : "Comparative Matrix: 5 Value LACs Side-by-Side"}</h2>
            <p className="lead" style={{ fontSize: "16px", lineHeight: "1.6" }}>
              {isEs
                ? "Resumen de las fortalezas académicas, convenios de posgrado acelerado y métricas de colocación de cada colegio:"
                : "Summary of research structures, accelerated graduate dual-degree pipelines, and demonstrated placement records:"}
            </p>

            <div style={{ overflowX: "auto", margin: "24px 0", borderRadius: "12px", border: "1px solid var(--line)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "var(--card)", borderBottom: "2px solid var(--line)" }}>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Colegio" : "College"}</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Ubicación" : "Location"}</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Modelo de Estudio" : "Core Academic Model"}</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Vías Aceleradas de Posgrado" : "Accelerated Pipelines"}</th>
                    <th style={{ padding: "14px 16px", fontWeight: 700 }}>{isEs ? "Métrica Destacada" : "Standout Graduate Metric"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--teal)" }}>The College of Wooster</td>
                    <td style={{ padding: "14px 16px", color: "var(--ink-soft)" }}>Wooster, OH</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Estudio Independiente (I.S.) + Seminario de 1er Año" : "Independent Study (I.S.) + 1st Year Seminar"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Preparación individual para Ph.D." : "Individualized Ph.D. placement"}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>{isEs ? "94% admisión a posgrados prioritarios (Harvard, Yale)" : "94% top-choice grad admission (Harvard, Yale)"}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--line)", background: "color-mix(in srgb, var(--bg) 50%, var(--card))" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#2563eb" }}>Haverford College</td>
                    <td style={{ padding: "14px 16px", color: "var(--ink-soft)" }}>Haverford, PA</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Seminarios basados en discusión + Tri-Co" : "Discussion seminars + Tri-Co Consortium"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "4+1 UPenn (Ingeniería y Bioética MBE), Zhejiang China Studies" : "4+1 UPenn (Eng. & MBE Bioethics), Zhejiang China Studies"}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>{isEs ? "Admisión automática a maestría en UPenn" : "Automatic admission to UPenn engineering master's"}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#7c3aed" }}>St. John’s College</td>
                    <td style={{ padding: "14px 16px", color: "var(--ink-soft)" }}>Annapolis, MD</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Grandes Libros (Sin carreras, sin conferencias)" : "Great Books Seminar (No majors, tutors only)"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Vías aceleradas con Boston Univ. y Johns Hopkins" : "BU & Johns Hopkins accelerated health pathways"}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>{isEs ? "Top 2% en Ph.Ds de humanidades; 100% admisión a leyes" : "Top 2% humanities Ph.Ds; 100% law school admission"}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--line)", background: "color-mix(in srgb, var(--bg) 50%, var(--card))" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#0284c7" }}>Union College</td>
                    <td style={{ padding: "14px 16px", color: "var(--ink-soft)" }}>Schenectady, NY</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Pregrado exclusivo + Simposio Steinmetz" : "Undergrad-only focus + Steinmetz Symposium"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Investigación financiada de verano (100+ alumnos)" : "100+ paid summer research fellows"}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>{isEs ? "Acelerador de 1.1 MV y NMR de $100M sin posgraduados" : "$100M ISEC: 1.1-MV accelerator & NMR without grad queues"}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#e11d48" }}>Colorado College</td>
                    <td style={{ padding: "14px 16px", color: "var(--ink-soft)" }}>Colorado Springs, CO</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "Plan de Bloques (1 materia cada 3.5 semanas)" : "The Block Plan (1 subject per 3.5 weeks)"}</td>
                    <td style={{ padding: "14px 16px" }}>{isEs ? "4+1 Negocios Johns Hopkins, 3+2 Ingeniería Columbia" : "4+1 Johns Hopkins Business, 3+2 Columbia Engineering"}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>{isEs ? ">60% de clase 2010 con posgrados; 300+ cursos de campo" : ">60% of class of 2010 earned grad degrees; 300+ field courses"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7: Interactive Readiness Checklist */}
          <section className="doc-section" id="readiness" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 7 de 8" : "Part 7 of 8"}</span>
            <h2>{isEs ? "¿Es un Colegio de Artes Liberales Adecuado para tus Metas de Posgrado?" : "Is a Liberal Arts College the Right Pre-Grad Route for You?"}</h2>
            <p className="lead" style={{ fontSize: "16px", lineHeight: "1.6" }}>
              {isEs
                ? "Utiliza esta lista de verificación para evaluar si las características de un LAC se alinean con tu estrategia académica y profesional:"
                : "Use this interactive checklist to evaluate whether a liberal arts environment matches your graduate school ambitions:"}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "14px",
                margin: "24px 0",
              }}
            >
              {READINESS_CHECKLIST_ITEMS.map((item) => {
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

            <div
              style={{
                padding: "16px 20px",
                borderRadius: "10px",
                background: "var(--card)",
                border: "1px solid var(--line)",
                fontSize: "14px",
                color: "var(--ink)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <CheckCircleIcon />
              <span>
                {isEs
                  ? `Has seleccionado ${checkedIds.length} de 5 factores prioritarios para posgrado.`
                  : `You have selected ${checkedIds.length} of 5 key graduate preparation factors.`}
              </span>
            </div>
          </section>

          {/* Section 8: Related Articles & Sources */}
          <section className="doc-section" id="sources" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 8 de 8" : "Part 8 of 8"}</span>
            <h2>{isEs ? "Explora Artículos Relacionados" : "Explore Related Grad Navigator Articles"}</h2>
            <p className="lead" style={{ fontSize: "16px", lineHeight: "1.6" }}>
              {isEs
                ? "Profundiza en la economía de la educación superior y las implicaciones de los títulos de posgrado según la industria:"
                : "Explore our in-depth analyses on the economics of higher education and the industry-specific implications of advanced degrees:"}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "18px",
                margin: "24px 0",
              }}
            >
              <Link
                to="/blog/public-vs-private-grad-school"
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
                  {isEs ? "Economía de Posgrado" : "Economics of Grad School"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "Posgrado Público vs. Privado: Costo, ROI y Deuda"
                    : "Public vs. Private Graduate School: Cost, ROI & Debt"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Analiza las diferencias de matrícula, paquetes de financiamiento y retorno de inversión real entre universidades públicas y privadas."
                    : "Comprehensive breakdown of tuition structures, funding packages, and net ROI between public and private universities."}
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
                  borderTop: "3px solid #2563eb",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>
                  {isEs ? "Implicaciones por Industria" : "Industry Implications"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "¿Cuándo Deberías Obtener una Maestría?"
                    : "When Should You Get a Master’s Degree?"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Tiempos de amortización por edad y campo de estudio: cuándo la prima salarial supera los costos de matrícula y salarios no percibidos."
                    : "Payoff timelines across 10 fields of study: evaluating wage premiums versus tuition costs and forgone salary."}
                </p>
              </Link>

              <Link
                to="/blog/tuition-vs-inflation-which-has-grown-more"
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
                  {isEs ? "Tendencias de Costo" : "Cost Trends"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "Matrícula vs. Inflación: ¿Qué Ha Crecido Más?"
                    : "Tuition vs. Inflation: Which Has Grown More?"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "35 años de datos comparando las tasas de crecimiento de matrícula universitaria frente al Índice de Precios al Consumidor (IPC)."
                    : "35 years of data comparing university tuition spikes against consumer price inflation indices."}
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
                  borderTop: "3px solid #7c3aed",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase" }}>
                  {isEs ? "Retorno Doctoral" : "Doctoral ROI"}
                </span>
                <h4 style={{ margin: "8px 0 6px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "¿Qué Campos de Doctorado Valen la Pena?"
                    : "Which PhD Fields Are Worth It?"}
                </h4>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.5", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Análisis del retorno de inversión, tiempo de finalización y perspectivas laborales en programas de doctorado humanísticos y STEM."
                    : "Analysis of completion rates, stipend viability, and academic vs. industry career returns across doctoral fields."}
                </p>
              </Link>
            </div>

            {/* Official Sources Box */}
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
                  fontSize: "13.5px",
                  lineHeight: "1.65",
                  color: "var(--ink-soft)",
                }}
              >
                {isEs ? (
                  <>
                    <strong>Fuentes oficiales:</strong> The College of Wooster, Haverford College, University of Pennsylvania, Zhejiang University, St. John’s College, Boston University, Johns Hopkins University, Union College, Colorado College, Columbia University. Revisado al 8 de nov. de 2026. Autores: Peter Foulke y Jaylen Peng.
                  </>
                ) : (
                  <>
                    <strong>Official Sources:</strong> The College of Wooster, Haverford College, University of Pennsylvania, Zhejiang University, St. John’s College, Boston University, Johns Hopkins University, Union College, Colorado College, Columbia University. Reviewed as of Nov. 8, 2026. Authors: Peter Foulke &amp; Jaylen Peng.
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
                  Este artículo tiene fines exclusivamente educativos y orientativos. Los requisitos de admisión a posgrados, programas 4+1/3+2 y financiamientos están sujetos a cambios por parte de cada institución. Te recomendamos consultar directamente los portales oficiales de cada universidad.
                </>
              ) : (
                <>
                  This article is for educational purposes only. Graduate admissions criteria, 4+1 and 3+2 dual-degree agreements, and institutional funding packages are subject to change by respective institutions. Confirm current requirements directly with each university's admissions office.
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
                  ? "Planifica tu Trayectoria Universitaria y Financia tu Posgrado"
                  : "Plan Your Undergraduate Pathway & Fund Your Graduate Degree"}
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
                  ? "Utiliza nuestras herramientas interactivas gratuitas para simular trayectorias de financiamiento, comparar ofertas de ayuda y proyectar costos de posgrado."
                  : "Use our free interactive tools to model academic pathways, compare financial aid packages, and project graduate school costs and borrowing limits."}
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
export default LiberalArtsGraduateCollegesArticlePage;

