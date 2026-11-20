
import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, TopRouteDeco } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE =
  "Do Small Liberal Arts Colleges Feed into Top Careers? | Grad Navigator";
const DESCRIPTION =
  "A handful of small colleges send an outsized share of graduates into banking, consulting, tech, and top graduate programs. Data analysis by Carson Jung.";
const URL =
  "https://www.graduationnavigator.com/blog/do-small-liberal-arts-colleges-feed-into-top-careers";

export const Route = createFileRoute(
  "/blog_/do-small-liberal-arts-colleges-feed-into-top-careers"
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
              name: "Carson Jung",
            },
          ],
          publisher: {
            "@type": "Organization",
            name: "Grad Navigator",
            url: "https://www.graduationnavigator.com",
            logo: "https://www.graduationnavigator.com/regular-compass.png",
          },
          datePublished: "2026-11-09",
          dateModified: "2026-11-09",
        }),
      },
    ],
  }),
  component: SmallLiberalArtsTopCareersArticlePage,
});

/* ---------- Inline SVG Icons ---------- */
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

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "18px", height: "18px", color: "#2563eb", flexShrink: 0 }}
      aria-hidden="true"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="22.01" />
      <line x1="15" y1="22" x2="15" y2="22.01" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <line x1="9" y1="18" x2="9" y2="18.01" />
      <line x1="15" y1="18" x2="15" y2="18.01" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "18px", height: "18px", color: "var(--teal)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "18px", height: "18px", color: "#d97706", flexShrink: 0 }}
      aria-hidden="true"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "18px", height: "18px", color: "#7c3aed", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "18px", height: "18px", color: "#059669", flexShrink: 0 }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* ---------- Table Dataset Interface ---------- */
interface PlacementRow {
  college: string;
  location: string;
  bankingRank: string;
  topBank: string;
  techRank: string;
  consultingFeeder: boolean;
  mbaRate: string;
  phdRank: string;
  lawRank: string;
  publicServiceRank: string;
}

const PLACEMENT_DATA: PlacementRow[] = [
  {
    college: "Claremont McKenna College",
    location: "Claremont, CA",
    bankingRank: "8th (Top 10)",
    topBank: "Goldman Sachs",
    techRank: "—",
    consultingFeeder: true,
    mbaRate: "13th (Selective)",
    phdRank: "—",
    lawRank: "17th (T14 Feeder)",
    publicServiceRank: "—",
  },
  {
    college: "Amherst College",
    location: "Amherst, MA",
    bankingRank: "10th (Top 10)",
    topBank: "J.P. Morgan",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "11th (Selective)",
    phdRank: "—",
    lawRank: "2nd (T14 Feeder)",
    publicServiceRank: "—",
  },
  {
    college: "Williams College",
    location: "Williamstown, MA",
    bankingRank: "11th (Top 12)",
    topBank: "Goldman Sachs",
    techRank: "—",
    consultingFeeder: true,
    mbaRate: "5th (414.1 / 1,000)",
    phdRank: "9th in U.S.",
    lawRank: "7th (T14 Feeder)",
    publicServiceRank: "—",
  },
  {
    college: "Middlebury College",
    location: "Middlebury, VT",
    bankingRank: "12th (Top 12)",
    topBank: "Goldman Sachs",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "14th (Selective)",
    phdRank: "—",
    lawRank: "—",
    publicServiceRank: "7th (Peace Corps)",
  },
  {
    college: "Harvey Mudd College",
    location: "Claremont, CA",
    bankingRank: "—",
    topBank: "—",
    techRank: "#1 in U.S. (84 placed)",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "2nd in U.S.",
    lawRank: "—",
    publicServiceRank: "—",
  },
  {
    college: "Pomona College",
    location: "Claremont, CA",
    bankingRank: "—",
    topBank: "—",
    techRank: "22nd in U.S.",
    consultingFeeder: true,
    mbaRate: "20th (Selective)",
    phdRank: "10th in U.S.",
    lawRank: "14th (T14 Feeder)",
    publicServiceRank: "—",
  },
  {
    college: "Swarthmore College",
    location: "Swarthmore, PA",
    bankingRank: "—",
    topBank: "—",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "3rd in U.S.",
    lawRank: "11th (T14 Feeder)",
    publicServiceRank: "—",
  },
  {
    college: "Haverford College",
    location: "Haverford, PA",
    bankingRank: "—",
    topBank: "—",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "7th in U.S.",
    lawRank: "12th (T14 Feeder)",
    publicServiceRank: "—",
  },
  {
    college: "Carleton College",
    location: "Northfield, MN",
    bankingRank: "—",
    topBank: "—",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "6th in U.S.",
    lawRank: "24th (T14 Feeder)",
    publicServiceRank: "6th (Peace Corps)",
  },
  {
    college: "Reed College",
    location: "Portland, OR",
    bankingRank: "—",
    topBank: "—",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "8th in U.S.",
    lawRank: "—",
    publicServiceRank: "7th (Peace Corps)",
  },
  {
    college: "Grinnell College",
    location: "Grinnell, IA",
    bankingRank: "—",
    topBank: "—",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "11th in U.S.",
    lawRank: "—",
    publicServiceRank: "—",
  },
  {
    college: "Washington and Lee University",
    location: "Lexington, VA",
    bankingRank: "24th in U.S.",
    topBank: "Goldman Sachs",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "—",
    lawRank: "30th (T14 Feeder)",
    publicServiceRank: "—",
  },
  {
    college: "Hamilton College",
    location: "Clinton, NY",
    bankingRank: "27th in U.S.",
    topBank: "Morgan Stanley",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "—",
    lawRank: "—",
    publicServiceRank: "—",
  },
  {
    college: "University of Richmond",
    location: "Richmond, VA",
    bankingRank: "28th in U.S.",
    topBank: "UBS",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "—",
    lawRank: "—",
    publicServiceRank: "—",
  },
  {
    college: "Bowdoin College",
    location: "Brunswick, ME",
    bankingRank: "29th in U.S.",
    topBank: "Goldman Sachs",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "—",
    lawRank: "—",
    publicServiceRank: "—",
  },
  {
    college: "Morehouse College",
    location: "Atlanta, GA",
    bankingRank: "—",
    topBank: "—",
    techRank: "27th in U.S. (Only HBCU)",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "—",
    lawRank: "—",
    publicServiceRank: "—",
  },
  {
    college: "Wellesley College",
    location: "Wellesley, MA",
    bankingRank: "—",
    topBank: "—",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "12th (Selective)",
    phdRank: "—",
    lawRank: "19th (T14 Feeder)",
    publicServiceRank: "—",
  },
  {
    college: "St. John's College",
    location: "Annapolis, MD",
    bankingRank: "—",
    topBank: "—",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "Top 2% Hum / 4% STEM",
    lawRank: "15th (T14 Feeder)",
    publicServiceRank: "—",
  },
  {
    college: "Colorado College",
    location: "Colorado Springs, CO",
    bankingRank: "—",
    topBank: "—",
    techRank: "—",
    consultingFeeder: false,
    mbaRate: "—",
    phdRank: "—",
    lawRank: "—",
    publicServiceRank: "1st (Peace Corps)",
  },
];

function SmallLiberalArtsTopCareersArticlePage() {
  const { lang, t } = useI18n();
  const isEs = lang === "es";

  const [activeTab, setActiveTab] = useState<
    "all" | "banking" | "tech" | "consulting" | "grad" | "service"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return PLACEMENT_DATA.filter((row) => {
      const matchesSearch =
        row.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.topBank.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === "banking") return row.bankingRank !== "—";
      if (activeTab === "tech") return row.techRank !== "—";
      if (activeTab === "consulting") return row.consultingFeeder;
      if (activeTab === "grad")
        return row.mbaRate !== "—" || row.phdRank !== "—" || row.lawRank !== "—";
      if (activeTab === "service") return row.publicServiceRank !== "—";

      return true;
    });
  }, [searchTerm, activeTab]);

  return (
    <>
      <SiteHeader />

      <main className="doc-page">
        {/* Category Header Strip */}
        <div className="doc-hero">
          <TopRouteDeco />
          <div className="wrap">
            <div className="doc-hero-eyebrow">
              <span className="eyebrow-pill">{t("latc.eyebrow")}</span>
              <span className="eyebrow-updated">{t("latc.updated")}</span>
            </div>
            <h1>{t("latc.h1")}</h1>
            <p className="lead">{t("latc.sub")}</p>
          </div>
        </div>

        {/* Hero Banner Illustration & Stat Highlights */}
        <section
          className="wrap"
          style={{
            margin: "0 auto 36px",
            padding: "0 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
              maxWidth: "680px",
            }}
          >
            <img
              src="/animations/gn-animation-chart-your-path.svg"
              alt="Liberal arts career pathways and graduate placements illustration"
              style={{
                width: "100%",
                maxHeight: "260px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Top 4 Quantitative Takeaways */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "16px",
              marginTop: "8px",
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
                {isEs ? "#1 en Big Tech" : "#1 in Big Tech"}
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Harvey Mudd College" : "Harvey Mudd College"}
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
                  ? "Primer semillero de grandes tecnológicas por graduado en EE. UU., por delante de MIT y Stanford."
                  : "No. 1 feeder into large tech firms per graduate of any school, surpassing MIT and Stanford."}
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
                {isEs ? "4 en el Top 12" : "4 in Top 12"}
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Banca de Inversión (Wall Street)" : "Investment Banking Analysts"}
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
                  ? "Claremont McKenna (8º), Amherst (10º), Williams (11º) y Middlebury (12º) lideran a nivel nacional."
                  : "Claremont McKenna (8th), Amherst (10th), Williams (11th), and Middlebury (12th) crack top 12."}
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderTop: "3px solid #7c3aed",
                borderRadius: "12px",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#7c3aed",
                  lineHeight: 1.15,
                }}
              >
                414.1 / 1k
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Matrícula en MBA (Williams)" : "MBA Rate (Williams College)"}
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
                  ? "5º lugar entre 310 universidades selectas en alumnos que cursan un MBA, por encima de MIT, Duke y UPenn."
                  : "Ranks 5th among 310 selective colleges in MBA enrollments, outpacing MIT, Duke, and Penn."}
              </div>
            </div>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderTop: "3px solid #059669",
                borderRadius: "12px",
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#059669",
                  lineHeight: 1.15,
                }}
              >
                {isEs ? "#1 Servicio Público" : "#1 Public Service"}
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginTop: "6px",
                }}
              >
                {isEs ? "Colorado College (Peace Corps)" : "Colorado College (Peace Corps)"}
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
                  ? "Primer puesto nacional entre colegios de pregrado con menos de 5,000 alumnos en voluntarios del Peace Corps."
                  : "Ranked 1st nationwide among small colleges (<5,000 students) for volunteers serving in FY2025."}
              </div>
            </div>
          </div>
        </section>

        {/* Section Jump Navigation */}
        <div className="wrap pagenav">
          <a href="#finance">{t("latc.nav.finance")}</a>
          <a href="#consulting-tech">{t("latc.nav.tech")}</a>
          <a href="#graduate-path">{t("latc.nav.grad")}</a>
          <a href="#public-service">{t("latc.nav.service")}</a>
          <a href="#what-to-know">{t("latc.nav.context")}</a>
          <a href="#bottom-line">{t("latc.nav.sources")}</a>
        </div>

        {/* Content Body */}
        <div className="wrap doc-content">
          {/* Executive Summary Callout */}
          <section className="doc-section" style={{ paddingTop: "12px" }}>
            <div
              style={{
                padding: "24px",
                background: "var(--card)",
                borderRadius: "14px",
                border: "1px solid var(--line)",
                borderLeft: "4px solid var(--teal)",
                margin: "0 0 24px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                <TrendingUpIcon />
                <h3
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {t("latc.why.title")}
                </h3>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "15.5px",
                  lineHeight: "1.65",
                  color: "var(--ink-soft)",
                }}
              >
                {t("latc.why.p")}
              </p>
            </div>
          </section>

          {/* Section 1: Finance Is the Clearest Pipeline */}
          <section className="doc-section" id="finance" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 1 de 5" : "Part 1 of 5"}</span>
            <h2>{isEs ? "Finanzas: El Canal de Colocación Más Claro" : "Finance Is the Clearest Pipeline"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  La firma de consultoría educativa <strong>College Transitions</strong> llevó a cabo una exhaustiva investigación que analizó a <strong>10,500 analistas de banca de inversión de nivel inicial</strong> en <strong>16 de los principales bancos de Wall Street</strong> (incluyendo firmas líderes como Goldman Sachs, J.P. Morgan, Morgan Stanley y boutiques élite). Al ajustar los datos según el tamaño total de la matrícula estudiantil para comparar de manera equitativa a los colegios pequeños con las macro-universidades de investigación, varios colegios de artes liberales se posicionaron dentro del <strong>Top 30 nacional</strong>.
                </>
              ) : (
                <>
                  Educational consulting research by <strong>College Transitions</strong> analyzed <strong>10,500 entry-level investment banking analysts</strong> across <strong>16 major Wall Street banks</strong> (including Goldman Sachs, J.P. Morgan, Morgan Stanley, and leading boutiques). After adjusting for total undergraduate enrollment to fairly benchmark small institutions against massive research powerhouses, several liberal arts colleges placed squarely in the <strong>national top 30</strong>.
                </>
              )}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
                margin: "24px 0",
              }}
            >
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <BuildingIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs ? "Colegios LAC en el Top 12 Nacional" : "LACs in the National Top 12"}
                  </h4>
                </div>
                <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.5, margin: "0 0 12px" }}>
                  {isEs
                    ? "Cuatro universidades de artes liberales superaron a docenas de universidades de la Ivy League y grandes instituciones R1 en analistas per cápita:"
                    : "Four small liberal arts institutions outperformed dozens of Ivy League and large R1 universities in per-capita analyst placement:"}
                </p>
                <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", lineHeight: 1.7, color: "var(--ink)" }}>
                  <li><strong>Claremont McKenna College</strong> — {isEs ? "8º lugar nacional" : "8th in U.S."}</li>
                  <li><strong>Amherst College</strong> — {isEs ? "10º lugar nacional" : "10th in U.S."}</li>
                  <li><strong>Williams College</strong> — {isEs ? "11º lugar nacional" : "11th in U.S."}</li>
                  <li><strong>Middlebury College</strong> — {isEs ? "12º lugar nacional" : "12th in U.S."}</li>
                </ul>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <BuildingIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs ? "Presencia en el Top 30 y Empleadores" : "Additional Top 30 Finishers & Employers"}
                  </h4>
                </div>
                <p style={{ fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.5, margin: "0 0 12px" }}>
                  {isEs
                    ? "Otras instituciones destacadas en el ranking per cápita y sus principales empleadores bancarios:"
                    : "Other notable top performers adjusted for undergraduate size and their primary hiring banks:"}
                </p>
                <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", lineHeight: 1.7, color: "var(--ink)" }}>
                  <li><strong>Washington and Lee</strong> (24º) · <em>Goldman Sachs</em></li>
                  <li><strong>Hamilton College</strong> (27º) · <em>Morgan Stanley</em></li>
                  <li><strong>University of Richmond</strong> (28º) · <em>UBS</em></li>
                  <li><strong>Bowdoin College</strong> (29º) · <em>Goldman Sachs</em></li>
                  <li><strong>Amherst College</strong> · <em>J.P. Morgan</em></li>
                </ul>
              </div>
            </div>

            <div
              style={{
                padding: "16px 20px",
                background: "color-mix(in srgb, var(--teal) 6%, transparent)",
                borderRadius: "10px",
                border: "1px solid color-mix(in srgb, var(--teal) 24%, transparent)",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "var(--ink)",
              }}
            >
              <strong>{isEs ? "Dato clave de Wall Street: " : "Wall Street takeaway: "}</strong>
              {isEs
                ? "Goldman Sachs es el principal contratista bancario en cinco de estos colegios de artes liberales. Esto demuestra que los bancos de inversión más codiciados reclutan de manera recurrente en campus pequeños gracias a su rigor cuantitativo y fuertes redes de exalumnos."
                : "Goldman Sachs is the top employer in investment banking for five of these liberal arts colleges. The most prestigious investment banks maintain dedicated recruiting funnels on small campuses, prioritizing quantitative reasoning and loyal alumni pipelines."}
            </div>
          </section>

          {/* Section 2: Consulting and Tech */}
          <section className="doc-section" id="consulting-tech" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 2 de 5" : "Part 2 of 5"}</span>
            <h2>{isEs ? "Consultoría Estratégica y Tecnología" : "Consulting and Tech"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Las firmas de consultoría estratégica y las corporaciones tecnológicas de Silicon Valley también contratan fuertemente a graduados de universidades de artes liberales seleccionadas, valorando el pensamiento crítico multidisciplinario y la resolución de problemas no estructurados.
                </>
              ) : (
                <>
                  Elite management consulting firms and Silicon Valley technology giants also draw heavily from select small liberal arts colleges, prize-hunting candidates with interdisciplinary problem-solving skills and rigorous analytical training.
                </>
              )}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                gap: "20px",
                margin: "24px 0",
              }}
            >
              {/* Consulting Card */}
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "14px",
                  padding: "22px",
                  borderLeft: "4px solid #d97706",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <BriefcaseIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs ? "Consultoría de Gestión (MBB & Élite)" : "Management Consulting (MBB & Top Tier)"}
                  </h3>
                </div>
                <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 12px" }}>
                  {isEs ? (
                    <>
                      <strong>Claremont McKenna</strong>, <strong>Pomona College</strong> y <strong>Williams College</strong> figuran entre los principales semilleros en una lista de <strong>13 firmas consultoras líderes</strong>, incluyendo:
                    </>
                  ) : (
                    <>
                      <strong>Claremont McKenna</strong>, <strong>Pomona</strong>, and <strong>Williams</strong> are recognized among the top feeder colleges across a benchmark study of <strong>13 major consulting firms</strong>, including:
                    </>
                  )}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                  {["McKinsey & Company", "Boston Consulting Group (BCG)", "Bain & Company", "Analysis Group"].map(
                    (firm) => (
                      <span
                        key={firm}
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          padding: "3px 8px",
                          borderRadius: "4px",
                          background: "var(--bg)",
                          border: "1px solid var(--line)",
                          color: "var(--ink)",
                        }}
                      >
                        {firm}
                      </span>
                    )
                  )}
                </div>
                <p style={{ fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-soft)", margin: 0 }}>
                  {isEs
                    ? "Los egresados de artes liberales sobresalen en entrevistas de casos y consultoría estratégica debido a su destreza en síntesis verbal y modelado de datos."
                    : "LAC students excel in case interviews and strategy advisory because liberal arts curricula emphasize rapid synthesis, structured rhetoric, and multi-perspective inquiry."}
                </p>
              </div>

              {/* Tech Card */}
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "14px",
                  padding: "22px",
                  borderLeft: "4px solid var(--teal)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <TerminalIcon />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs ? "Grandes Tecnológicas y Silicon Valley" : "Big Tech & Silicon Valley Giants"}
                  </h3>
                </div>
                <div
                  style={{
                    background: "color-mix(in srgb, var(--teal) 10%, transparent)",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: "var(--teal)",
                  }}
                >
                  {isEs
                    ? "★ Harvey Mudd: #1 nacional per cápita, superando a MIT y Stanford"
                    : "★ Harvey Mudd: #1 in U.S. per capita, beating MIT & Stanford"}
                </div>
                <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 10px" }}>
                  {isEs ? (
                    <>
                      <strong>84 egresados recientes de Harvey Mudd</strong> ingresaron a puestos de ingeniería de software e informática en las 15 empresas tecnológicas evaluadas, concentrados en <strong>Microsoft, Google y Meta (Facebook)</strong>.
                    </>
                  ) : (
                    <>
                      <strong>84 Harvey Mudd alumni</strong> entered entry-level software engineering and IT positions across the 15 companies studied, concentrated primarily at <strong>Microsoft, Google, and Meta (Facebook)</strong>.
                    </>
                  )}
                </p>
                <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "13.5px", lineHeight: 1.6, color: "var(--ink)" }}>
                  <li><strong>Pomona College</strong> {isEs ? "ocupa el 22º puesto nacional en tecnología." : "ranks 22nd nationwide in tech placement."}</li>
                  <li><strong>Morehouse College</strong> {isEs ? "ocupa el 27º puesto: el único HBCU en el top 30 nacional." : "ranks 27th in tech—the only HBCU in the national top 30."}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: The Graduate School Path */}
          <section className="doc-section" id="graduate-path" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 3 de 5" : "Part 3 of 5"}</span>
            <h2>{isEs ? "El Camino Hacia Estudios de Posgrado" : "The Graduate School Path"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Los egresados de colegios de artes liberales también destacan de manera sobresaliente al buscar títulos avanzados. Cuando se mide la proporción de matriculación en programas de posgrado por cada 1,000 graduados, los LACs compiten al más alto nivel en escuelas de negocios (MBA), doctorados de investigación (Ph.D.) y facultades de derecho (T14).
                </>
              ) : (
                <>
                  Liberal arts college graduates stand out exceptionally in their pursuit of advanced master's and doctoral degrees. When evaluating graduate enrollment density adjusted for institution size, LACs punch far above their weight in elite business schools (MBA), research doctorates (Ph.D.), and premier law schools (T14).
                </>
              )}
            </p>

            {/* 3 Pillars of Graduate Outperformance */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
                margin: "24px 0",
              }}
            >
              {/* MBA Column */}
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px",
                  borderTop: "3px solid #7c3aed",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <GraduationCapIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs ? "Escuelas de Negocios (MBA)" : "MBA Enrollments"}
                  </h4>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#7c3aed",
                    margin: "6px 0",
                  }}
                >
                  Williams: 414.1 / 1,000
                </div>
                <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.55, margin: "0 0 10px" }}>
                  {isEs ? (
                    <>
                      Williams College ocupa el <strong>5º puesto entre 310 instituciones selectas</strong> en graduados que cursan un MBA, superando a <em>Northwestern, MIT, Duke y la Universidad de Pensilvania (Penn)</em>.
                    </>
                  ) : (
                    <>
                      Williams College ranks <strong>5th among 310 selective colleges</strong> in MBA enrollments per 1,000 graduates, ahead of <em>Northwestern, MIT, Duke, and Penn</em>.
                    </>
                  )}
                </p>
                <div style={{ fontSize: "13px", color: "var(--ink)", lineHeight: 1.5 }}>
                  <strong>{isEs ? "Otros LACs destacados:" : "Other top LACs:"}</strong> Amherst (11º), Wellesley (12º), Claremont McKenna (13º), Middlebury (14º), Pomona (20º).
                </div>
              </div>

              {/* PhD Column */}
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px",
                  borderTop: "3px solid var(--teal)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <AwardIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs ? "Doctorados de Investigación (Ph.D.)" : "Research Doctorates (Ph.D.)"}
                  </h4>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "var(--teal)",
                    margin: "6px 0",
                  }}
                >
                  {isEs ? "Ajustado por Matrícula" : "Size-Adjusted Density"}
                </div>
                <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.55, margin: "0 0 10px" }}>
                  {isEs ? (
                    <>
                      Según la encuesta nacional de la <strong>National Science Foundation (NSF)</strong>, los graduados de colegios de artes liberales se encuentran entre los mayores productores de futuros doctores per cápita en EE. UU.
                    </>
                  ) : (
                    <>
                      Citing the <strong>National Science Foundation (NSF)</strong> Survey of Earned Doctorates, LACs dominate per-capita doctoral completion rates across both STEM and humanities:
                    </>
                  )}
                </p>
                <div style={{ fontSize: "13px", color: "var(--ink)", lineHeight: 1.5 }}>
                  <strong>{isEs ? "Líderes nacionales:" : "Top national producers:"}</strong> Harvey Mudd (2º), Swarthmore (3º), Carleton (6º), Haverford (7º), Reed (8º), Williams (9º), Pomona (10º), Grinnell (11º).
                </div>
              </div>

              {/* Law School Column */}
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px",
                  borderTop: "3px solid #c6333b",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <ShieldCheckIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {isEs ? "Facultades de Derecho (T14 Law)" : "Top 14 Law Schools (T14)"}
                  </h4>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#c6333b",
                    margin: "6px 0",
                  }}
                >
                  Amherst: 2º Nacional
                </div>
                <p style={{ fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.55, margin: "0 0 10px" }}>
                  {isEs ? (
                    <>
                      Ajustado por el tamaño de la institución en el informe <em>The Legal Launchpad</em>, los colegios de artes liberales dominan el envío de estudiantes a las <strong>14 facultades de derecho más prestigiosas</strong> del país.
                    </>
                  ) : (
                    <>
                      Adjusted for undergraduate class size in <em>The Legal Launchpad</em>, LACs represent an outsized share of entrants into the nation's <strong>14 premier law schools</strong>.
                    </>
                  )}
                </p>
                <div style={{ fontSize: "13px", color: "var(--ink)", lineHeight: 1.5 }}>
                  <strong>{isEs ? "Semilleros clave T14:" : "Key T14 feeders:"}</strong> Amherst (2º), Williams (7º), Swarthmore (11º), Haverford (12º), Pomona (14º), St. John's (15º), Claremont McKenna (17º), Wesleyan (18º), Wellesley (19º), Carleton (24º), Vassar (26º), Colgate (28º), Washington & Lee (30º).
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Public Service */}
          <section className="doc-section" id="public-service" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 4 de 5" : "Part 4 of 5"}</span>
            <h2>{isEs ? "Servicio Público, Diplomacia y Gobierno" : "Public Service & Government Pathways"}</h2>
            <p className="lead" style={{ fontSize: "16.5px", lineHeight: "1.65" }}>
              {isEs ? (
                <>
                  Los colegios pequeños de artes liberales no solo nutren las altas finanzas y el sector privado de tecnología; también representan una de las principales vías hacia el <strong>servicio público, oficinas en el Congreso de EE. UU., agencias gubernamentales y organizaciones multilaterales</strong>.
                </>
              ) : (
                <>
                  Small liberal arts colleges do not only supply high-finance and Silicon Valley; they also build dedicated pipelines for <strong>public service, congressional staff roles, federal agencies, and international diplomacy</strong>.
                </>
              )}
            </p>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "14px",
                padding: "24px",
                margin: "20px 0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <GlobeIcon />
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs
                    ? "Ranking Oficial del Peace Corps 2026 (Colegios Pequeños)"
                    : "Peace Corps 2026 Small College Rankings"}
                </h3>
              </div>
              <p style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--ink-soft)", margin: "0 0 16px" }}>
                {isEs ? (
                  <>
                    La lista oficial del <strong>Peace Corps</strong> para colegios con menos de 5,000 estudiantes de pregrado con voluntarios en servicio durante el año fiscal 2025 estuvo completamente copada por universidades de artes liberales:
                  </>
                ) : (
                  <>
                    The official <strong>Peace Corps</strong> list of small colleges (fewer than 5,000 undergraduates) for volunteers serving in fiscal year 2025 was overwhelmingly dominated by LACs:
                  </>
                )}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "12px",
                }}
              >
                {[
                  { rank: "1st", name: "Colorado College", note: isEs ? "1º Nacional" : "No. 1 in U.S." },
                  { rank: "2nd", name: "Hobart College", note: isEs ? "2º Puesto" : "No. 2 in U.S." },
                  { rank: "3rd", name: "William Smith College", note: isEs ? "3º Puesto" : "No. 3 in U.S." },
                  { rank: "4th", name: "Kenyon College", note: isEs ? "4º Puesto" : "No. 4 in U.S." },
                  { rank: "5th", name: "Macalester College", note: isEs ? "5º Puesto" : "No. 5 in U.S." },
                  { rank: "6th", name: "Carleton College", note: isEs ? "6º Puesto" : "No. 6 in U.S." },
                  { rank: "7th (Tie)", name: "Reed College", note: isEs ? "7º Empate" : "Tied 7th" },
                  { rank: "7th (Tie)", name: "Middlebury College", note: isEs ? "7º Empate" : "Tied 7th" },
                ].map((item) => (
                  <div
                    key={item.name}
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--line)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--ink)" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: "11.5px", color: "var(--ink-soft)" }}>
                        {item.note}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#059669",
                        background: "color-mix(in srgb, #059669 10%, transparent)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {item.rank}
                    </span>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontSize: "13.5px",
                  lineHeight: "1.55",
                  color: "var(--ink-soft)",
                  marginTop: "16px",
                  marginBottom: 0,
                }}
              >
                {isEs
                  ? "Muchos graduados continúan carreras directas en oficinas del Congreso, agencias de política exterior, la Agencia de los Estados Unidos para el Desarrollo Internacional (USAID) y centros de estudios estratégicos."
                  : "Many graduates also translate this civic orientation directly into legislative aide positions in congressional offices, USAID missions, federal intelligence/policy agencies, and non-profit advocacy organizations."}
              </p>
            </div>
          </section>

          {/* Interactive Career Placement Data Table */}
          <section className="doc-section" style={{ margin: "36px 0" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs ? "Explorador Interactivo de Salidas Profesionales" : "Interactive Career Feeder Explorer"}
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: "14px", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Filtra por industria o busca por nombre de institución para examinar métricas de colocación laboral."
                    : "Filter by industry sector or search by institution to review placement metrics."}
                </p>
              </div>

              {/* Search Box */}
              <input
                type="text"
                placeholder={isEs ? "Buscar universidad o banco..." : "Search college or bank..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: "8px 14px",
                  fontSize: "13.5px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--card)",
                  color: "var(--ink)",
                  width: "240px",
                }}
              />
            </div>

            {/* Filter Tabs */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              {[
                { id: "all", labelEn: "All Sectors", labelEs: "Todos los Sectores" },
                { id: "banking", labelEn: "Investment Banking", labelEs: "Banca de Inversión" },
                { id: "tech", labelEn: "Big Tech", labelEs: "Grandes Tecnológicas" },
                { id: "consulting", labelEn: "Consulting", labelEs: "Consultoría" },
                { id: "grad", labelEn: "MBA / Law / PhD", labelEs: "MBA / Derecho / PhD" },
                { id: "service", labelEn: "Public Service", labelEs: "Servicio Público" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: activeTab === tab.id ? "var(--teal)" : "var(--line)",
                    background:
                      activeTab === tab.id
                        ? "color-mix(in srgb, var(--teal) 14%, transparent)"
                        : "var(--card)",
                    color: activeTab === tab.id ? "var(--teal)" : "var(--ink)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {isEs ? tab.labelEs : tab.labelEn}
                </button>
              ))}
            </div>

            {/* Responsive Table */}
            <div
              style={{
                overflowX: "auto",
                background: "var(--card)",
                borderRadius: "12px",
                border: "1px solid var(--line)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13.5px",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "var(--bg)",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink)",
                    }}
                  >
                    <th style={{ padding: "12px 16px", fontWeight: 700 }}>
                      {isEs ? "Institución" : "Institution"}
                    </th>
                    <th style={{ padding: "12px 16px", fontWeight: 700 }}>
                      {isEs ? "Banca (Wall St)" : "Banking (Wall St)"}
                    </th>
                    <th style={{ padding: "12px 16px", fontWeight: 700 }}>
                      {isEs ? "Banco Principal" : "Top Bank"}
                    </th>
                    <th style={{ padding: "12px 16px", fontWeight: 700 }}>
                      {isEs ? "Tecnología" : "Tech Ranking"}
                    </th>
                    <th style={{ padding: "12px 16px", fontWeight: 700 }}>
                      {isEs ? "MBA / PhD / Leyes" : "Grad School Highlights"}
                    </th>
                    <th style={{ padding: "12px 16px", fontWeight: 700 }}>
                      {isEs ? "Servicio" : "Public Service"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          padding: "24px",
                          textAlign: "center",
                          color: "var(--ink-soft)",
                        }}
                      >
                        {isEs ? "No se encontraron instituciones con ese criterio." : "No colleges found matching your filter."}
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((row, idx) => (
                      <tr
                        key={row.college}
                        style={{
                          borderBottom:
                            idx === filteredData.length - 1 ? "none" : "1px solid var(--line)",
                          background: idx % 2 === 0 ? "transparent" : "var(--bg)",
                        }}
                      >
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ fontWeight: 700, color: "var(--ink)" }}>{row.college}</div>
                          <div style={{ fontSize: "12px", color: "var(--ink-soft)" }}>{row.location}</div>
                        </td>
                        <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)" }}>
                          {row.bankingRank !== "—" ? (
                            <span style={{ color: "#2563eb", fontWeight: 700 }}>{row.bankingRank}</span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td style={{ padding: "12px 16px" }}>{row.topBank}</td>
                        <td style={{ padding: "12px 16px" }}>
                          {row.techRank.includes("#1") ? (
                            <span
                              style={{
                                color: "var(--teal)",
                                fontWeight: 700,
                                background: "color-mix(in srgb, var(--teal) 10%, transparent)",
                                padding: "2px 6px",
                                borderRadius: "4px",
                              }}
                            >
                              {row.techRank}
                            </span>
                          ) : (
                            row.techRank
                          )}
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: "12.5px" }}>
                          {row.mbaRate !== "—" && (
                            <div>
                              <strong style={{ color: "#7c3aed" }}>MBA:</strong> {row.mbaRate}
                            </div>
                          )}
                          {row.phdRank !== "—" && (
                            <div>
                              <strong style={{ color: "var(--teal)" }}>PhD:</strong> {row.phdRank}
                            </div>
                          )}
                          {row.lawRank !== "—" && (
                            <div>
                              <strong style={{ color: "#c6333b" }}>Law:</strong> {row.lawRank}
                            </div>
                          )}
                          {row.mbaRate === "—" && row.phdRank === "—" && row.lawRank === "—" && "—"}
                        </td>
                        <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: "12.5px" }}>
                          {row.publicServiceRank !== "—" ? (
                            <span style={{ color: "#059669", fontWeight: 700 }}>
                              {row.publicServiceRank}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: What Else You Need to Know */}
          <section className="doc-section" id="what-to-know" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Parte 5 de 5" : "Part 5 de 5"}</span>
            <h2>{isEs ? "Lo Que También Debes Saber: Contexto y Causalidad" : "What Else You Need to Know"}</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                gap: "18px",
                margin: "20px 0",
              }}
            >
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs ? "1. Los Datos son Descriptivos, No Causales" : "1. The Data is Descriptive, Not Causal"}
                </h4>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Estos estudios muestran empíricamente dónde terminan trabajando o estudiando los graduados, pero no demuestran que asistir a un colegio en particular garantice automáticamente dicho resultado. Factores como la selección previa de admisiones, el perfil socioeconómico familiar y la ambición individual influyen de manera decisiva."
                    : "This research demonstrates where graduates end up, but does not prove that attending a particular college guarantees career placement. High-achieving student selection, preexisting professional networks, and personal drive are significant confounding factors."}
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                  {isEs ? "2. Esta No es una Lista Exhaustiva" : "2. This is Not an Exhaustive List"}
                </h4>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  {isEs
                    ? "Existen decenas de excelentes universidades y colegios comunitarios o regionales con programas sobresalientes no incluidos en estos estudios basados en perfiles de LinkedIn. Cada estudiante debe sopesar cultura de campus, finanzas personales, ubicación y apoyo docente."
                    : "Dozens of exemplary colleges foster outstanding placement in specific regional industries or specialized fields not captured in LinkedIn-based cross-sectional samples. Every applicant must evaluate school culture, financial aid, and individual fit."}
                </p>
              </div>
            </div>

            {/* Strategic Internal Links Callout */}
            <div
              style={{
                padding: "22px 24px",
                background: "var(--card)",
                borderRadius: "14px",
                border: "1px solid var(--line)",
                borderLeft: "4px solid #2563eb",
                margin: "24px 0",
              }}
            >
              <h4 style={{ margin: "0 0 12px 0", fontSize: "16.5px", fontWeight: 700, color: "var(--ink)" }}>
                {isEs ? "Recursos y Guías Relacionadas de Grad Navigator" : "Explore Related Grad Navigator Analyses"}
              </h4>
              <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 14px" }}>
                {isEs
                  ? "Explora nuestras herramientas y artículos clave para evaluar los costos reales, la ayuda financiera y el retorno de inversión educativo:"
                  : "Explore our calculators and companion analyses to assess true net college costs, financial aid guarantees, and career payoff timelines:"}
              </p>
              <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", lineHeight: 1.7, color: "var(--teal)" }}>
                <li>
                  <Link to="/pay-for-school" style={{ color: "var(--teal)", fontWeight: 600 }}>
                    {isEs
                      ? "Opciones de Financiamiento para Posgrado y Pregrado (Pay for School) →"
                      : "Graduate & Undergraduate School Financing Options (Pay for School Hub) →"}
                  </Link>
                </li>
                <li>
                  <Link to="/chart-your-path" style={{ color: "var(--teal)", fontWeight: 600 }}>
                    {isEs
                      ? "Calculadora Traza tu Camino: Brecha de Financiamiento y Límites de Préstamos →"
                      : "Chart Your Path: College Need & Borrowing Gap Calculator →"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog/elite-liberal-arts-colleges-hidden-bargain"
                    style={{ color: "var(--teal)", fontWeight: 600 }}
                  >
                    {isEs
                      ? "Colegios de Artes Liberales de Élite: Una Ganga Oculta (Matrícula $0 bajo $200k) →"
                      : "Elite Liberal Arts Colleges: A Hidden Bargain (Free Tuition Under $200k) →"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog/5-liberal-arts-colleges-graduate-school"
                    style={{ color: "var(--teal)", fontWeight: 600 }}
                  >
                    {isEs
                      ? "5 Colegios de Artes Liberales que Destacan para la Escuela de Posgrado →"
                      : "5 Liberal Arts Colleges That Punch Above Their Weight for Graduate School →"}
                  </Link>
                </li>
                <li>
                  <Link to="/blog/what-makes-a-good-mba-program" style={{ color: "var(--teal)", fontWeight: 600 }}>
                    {isEs
                      ? "¿Qué Hace a un Buen Programa de MBA? Análisis de ROI y Acreditación →"
                      : "What Makes a Good MBA Program? ROI, Accreditation & Outcomes →"}
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6: The Bottom Line */}
          <section className="doc-section" id="bottom-line" style={{ scrollMarginTop: "80px" }}>
            <span className="section-num">{isEs ? "Conclusión y Fuentes" : "The Bottom Line"}</span>
            <h2>{isEs ? "El Veredicto Final" : "The Bottom Line"}</h2>

            <div className="refi-bottom-card" style={{ margin: "20px 0" }}>
              <blockquote className="refi-bottom-quote" style={{ fontSize: "17.5px", lineHeight: "1.65" }}>
                {isEs ? (
                  <>
                    “Ciertos colegios de artes liberales de élite envían a <strong>muchos más graduados a finanzas, consultoría, tecnología y programas de posgrado de primer nivel</strong> de lo que sugiere su reducido tamaño. Considera dónde terminan los exalumnos de cada institución, junto con tus preferencias personales, metas profesionales y finanzas, al decidir si un colegio de artes liberales es la opción adecuada para ti.”
                  </>
                ) : (
                  <>
                    “Certain elite liberal arts colleges send far more graduates into <strong>finance, consulting, tech, and top graduate programs</strong> than their size suggests. Consider where a school's alumni land, along with your preferences, goals, and finances, when deciding whether a LAC is right for you.”
                  </>
                )}
              </blockquote>
            </div>

            {/* Citations & Sources Box */}
            <div
              style={{
                marginTop: "28px",
                padding: "20px 24px",
                background: "var(--card)",
                borderRadius: "12px",
                border: "1px solid var(--line)",
                fontSize: "13px",
                lineHeight: "1.6",
                color: "var(--ink-soft)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {isEs ? "Fuentes y Metodología Verificada" : "Sources & Methodology"}
              </h4>
              <p style={{ margin: "0 0 8px 0" }}>
                <strong>{isEs ? "Fuentes: " : "Sources: "}</strong>
                College Transitions (<em>Top Feeders to Wall Street and Investment Banking; From College to Consulting; Top Feeders to Tech and Silicon Valley; Top Feeders to Ph.D. Programs, citing the National Science Foundation Survey of Earned Doctorates; Which Colleges Send the Most Graduates to Business School; The Legal Launchpad</em>); Peace Corps (2026 Small Colleges Report); InGenius Prep; Poets&amp;Quants (Wall Street Oasis analyses).
              </p>
              <p style={{ margin: "0 0 8px 0" }}>
                <strong>{isEs ? "Nota de Datos: " : "Data Note: "}</strong>
                {isEs
                  ? "Los rankings se basan en conteos de perfiles de LinkedIn, censos de personal y datos públicos institucionales, y pueden variar de un año a otro. Confirma siempre las cifras actuales con la oficina de desarrollo profesional de cada universidad."
                  : "Rankings rely on LinkedIn profile counts, personnel audits, and institutional public disclosures, which change over time. Confirm current career figures with each school's career services office."}
              </p>
              <p style={{ margin: 0, fontStyle: "italic" }}>
                {isEs
                  ? "Este artículo tiene fines exclusivamente educativos e informativos. Revisado al 9 de noviembre de 2026 por Carson Jung."
                  : "This article is for educational purposes only. Revised as of Nov. 9, 2026 by Carson Jung."}
              </p>
            </div>

            {/* Article Navigation Footer */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: "16px",
                marginTop: "36px",
                paddingTop: "24px",
                borderTop: "1px solid var(--line)",
              }}
            >
              <Link
                to="/blog/elite-liberal-arts-colleges-hidden-bargain"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--ink)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                ← {isEs ? "Artículo anterior: Colegios de Artes Liberales: Una Ganga Oculta" : "Previous: Elite Liberal Arts Colleges: A Hidden Bargain"}
              </Link>
              <Link
                to="/blog"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--teal)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {isEs ? "Volver al Blog de Grad Navigator →" : "Back to Grad Navigator Blog →"}
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

