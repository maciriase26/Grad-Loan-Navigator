import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Value Law Schools for Elite Outcomes — Grad Loan Navigator";
const DESCRIPTION =
  "Top value law schools delivering BigLaw placement and federal clerkships without six-figure debt. Analysis by Peter Foulke.";
const URL = "https://www.graduationnavigator.com/blog/value-law-schools";

export const Route = createFileRoute("/blog_/value-law-schools")({
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
  component: ValueLawSchoolsArticlePage,
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

function DollarSignIcon() {
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
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function AwardIcon() {
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
      <circle cx="12" cy="8" r="6" />
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

/* ---------- Top 5 Schools Comparison Dataset ---------- */
interface ValueSchoolItem {
  rank: number;
  id: string;
  name: string;
  nameEs: string;
  typeRankEn: string;
  typeRankEs: string;
  tuitionEn: string;
  tuitionEs: string;
  aidEn: string;
  aidEs: string;
  biglawEn: string;
  biglawEs: string;
  clerkshipsEn: string;
  clerkshipsEs: string;
}

const COMPARISON_SCHOOLS: ValueSchoolItem[] = [
  {
    rank: 1,
    id: "uga",
    name: "The University of Georgia",
    nameEs: "The University of Georgia (UGA)",
    typeRankEn: "Public · Top 30",
    typeRankEs: "Pública · Top 30",
    tuitionEn: "$18,240 (In) / $40,152 (Out)",
    tuitionEs: "$18,240 (Res) / $40,152 (No Res)",
    aidEn: "100% of 1st-Gen & Vets (≥25% award)",
    aidEs: "100% 1ª gen y veteranos (≥25% beca)",
    biglawEn: "~20% (501+ attorneys)",
    biglawEs: "~20% (501+ abogados)",
    clerkshipsEn: "9.4% (Federal Clerks)",
    clerkshipsEs: "9.4% (Secretarios Federales)",
  },
  {
    rank: 2,
    id: "ua",
    name: "The University of Alabama",
    nameEs: "The University of Alabama (UA)",
    typeRankEn: "Public · Regional Flagship",
    typeRankEs: "Pública · Insignia Regional",
    tuitionEn: "$25,320 (In) / $49,710 (Out)",
    tuitionEs: "$25,320 (Res) / $49,710 (No Res)",
    aidEn: ">95% receive aid (25% full tuition)",
    aidEs: ">95% recibe ayuda (25% beca 100%)",
    biglawEn: "Strong Regional Pipeline",
    biglawEs: "Sólido Canal Regional",
    clerkshipsEn: "12% (#7 Nationally)",
    clerkshipsEs: "12% (#7 Nacional)",
  },
  {
    rank: 3,
    id: "uf",
    name: "The University of Florida",
    nameEs: "University of Florida (Levin)",
    typeRankEn: "Public · #1 in Florida",
    typeRankEs: "Pública · #1 en Florida",
    tuitionEn: "$22,299 (In) / $38,000 (Out)",
    tuitionEs: "$22,299 (Res) / $38,000 (No Res)",
    aidEn: "89% receive aid ($19k med; 35% full)",
    aidEs: "89% recibe ayuda ($19k med; 35% 100%)",
    biglawEn: "34% BigLaw placement",
    biglawEs: "34% colocación en BigLaw",
    clerkshipsEn: "Strong Southeast & State",
    clerkshipsEs: "Sólido Sudeste y Estatal",
  },
  {
    rank: 4,
    id: "wl",
    name: "Washington and Lee University",
    nameEs: "Washington and Lee University (W&L)",
    typeRankEn: "Private · Top 35",
    typeRankEs: "Privada · Top 35",
    tuitionEn: "$60,325 (Sticker)",
    tuitionEs: "$60,325 (Catálogo)",
    aidEn: ">90% receive aid ($34,226 median)",
    aidEs: ">90% recibe ayuda ($34,226 media)",
    biglawEn: "35% BigLaw placement",
    biglawEs: "35% colocación en BigLaw",
    clerkshipsEn: "10 Federal Clerks",
    clerkshipsEs: "10 Secretarías Federales",
  },
  {
    rank: 5,
    id: "ut",
    name: "University of Texas at Austin",
    nameEs: "University of Texas at Austin (UT)",
    typeRankEn: "Public · T14 Prestigious",
    typeRankEs: "Pública · Prestigio T14",
    tuitionEn: "<$40,000 (In) / ~$56,000 (Out)",
    tuitionEs: "<$40,000 (Res) / ~$56,000 (No Res)",
    aidEn: "Extensive Merit Fellowships",
    aidEs: "Amplias Becas por Mérito",
    biglawEn: "~40% BigLaw placement",
    biglawEs: "~40% colocación en BigLaw",
    clerkshipsEn: "Top Federal & Texas Supreme",
    clerkshipsEs: "Tribunales Federales y TX",
  },
];

/* ---------- Main Component Page ---------- */
function ValueLawSchoolsArticlePage() {
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
          <div className="eyebrow">{t("vlaw.eyebrow")}</div>
          <h1>{t("vlaw.h1")}</h1>
          <p className="sub">{t("vlaw.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("vlaw.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("vlaw.why.title")}</h4>
              <p>{t("vlaw.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#overview-table">{t("vlaw.nav.table")}</a>
          <a href="#uga">{t("vlaw.nav.uga")}</a>
          <a href="#ua">{t("vlaw.nav.ua")}</a>
          <a href="#uf">{t("vlaw.nav.uf")}</a>
          <a href="#wl">{t("vlaw.nav.wl")}</a>
          <a href="#ut">{t("vlaw.nav.ut")}</a>
          <a href="#bottom-line">{t("vlaw.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Section 1: Overview Comparison Table */}
          <section className="doc-section" id="overview-table">
            <span className="section-num">{isEs ? "Parte 1 de 7" : "Part 1 of 7"}</span>
            <h2>{t("vlaw.table.title")}</h2>
            <p className="lead">{t("vlaw.table.sub")}</p>

            <div className="roi-table-wrap" style={{ marginTop: "24px" }}>
              <table className="roi-table">
                <thead>
                  <tr>
                    <th className="roi-rank-cell">#</th>
                    <th>{t("vlaw.table.school")}</th>
                    <th>{t("vlaw.table.type")}</th>
                    <th>{t("vlaw.table.tuition")}</th>
                    <th>{t("vlaw.table.aid")}</th>
                    <th>{t("vlaw.table.biglaw")}</th>
                    <th>{t("vlaw.table.clerkships")}</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_SCHOOLS.map((item) => (
                    <tr key={item.id}>
                      <td className="roi-rank-cell">
                        <span className="roi-rank-badge">{item.rank}</span>
                      </td>
                      <td>
                        <a
                          href={`#${item.id}`}
                          className="roi-school-name"
                          style={{ textDecoration: "none", color: "var(--teal)" }}
                        >
                          {isEs ? item.nameEs : item.name}
                        </a>
                      </td>
                      <td style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
                        {isEs ? item.typeRankEs : item.typeRankEn}
                      </td>
                      <td className="roi-mono">{isEs ? item.tuitionEs : item.tuitionEn}</td>
                      <td style={{ fontSize: "13px" }}>{isEs ? item.aidEs : item.aidEn}</td>
                      <td className="roi-highlight">
                        {isEs ? item.biglawEs : item.biglawEn}
                      </td>
                      <td className="roi-mono">
                        {isEs ? item.clerkshipsEs : item.clerkshipsEn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* School #1: University of Georgia */}
          <section className="doc-section" id="uga" style={{ marginTop: "48px" }}>
            <span className="section-num">{t("vlaw.school1.rank")}</span>
            <h2>{t("vlaw.school1.name")}</h2>
            <p className="lead">{t("vlaw.school1.lead")}</p>

            {/* Quick Stat Chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                margin: "20px 0 28px",
              }}
            >
              <span
                style={{
                  background: "color-mix(in srgb, var(--teal) 10%, transparent)",
                  color: "var(--teal)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isEs ? "Matrícula Residente: $18,240/año" : "In-State Tuition: $18,240/yr"}
              </span>
              <span
                style={{
                  background: "color-mix(in srgb, var(--gold) 15%, transparent)",
                  color: "var(--gold)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isEs ? "Secretarías Federales: 9.4%" : "Federal Clerkships: 9.4%"}
              </span>
              <span
                style={{
                  background: "color-mix(in srgb, var(--ink) 6%, transparent)",
                  color: "var(--ink)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {isEs ? "Firma Grande (501+): ~20%" : "BigLaw (501+ Attys): ~20%"}
              </span>
            </div>

            {/* Feature Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <TrendingUpIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school1.p1.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school1.p1.text")}
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <DollarSignIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school1.p2.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school1.p2.text")}
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <AwardIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school1.p3.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school1.p3.text")}
                </p>
              </div>
            </div>
          </section>

          {/* School #2: University of Alabama */}
          <section className="doc-section" id="ua" style={{ marginTop: "48px" }}>
            <span className="section-num">{t("vlaw.school2.rank")}</span>
            <h2>{t("vlaw.school2.name")}</h2>
            <p className="lead">{t("vlaw.school2.lead")}</p>

            {/* Quick Stat Chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                margin: "20px 0 28px",
              }}
            >
              <span
                style={{
                  background: "color-mix(in srgb, var(--gold) 15%, transparent)",
                  color: "var(--gold)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isEs ? "#7 Nacional en Secretarías (12%)" : "#7 Nationally in Clerkships (12%)"}
              </span>
              <span
                style={{
                  background: "color-mix(in srgb, var(--teal) 10%, transparent)",
                  color: "var(--teal)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isEs ? ">95% Becados (25% Matrícula Total)" : ">95% Aid Rate (25% Full Tuition)"}
              </span>
              <span
                style={{
                  background: "color-mix(in srgb, var(--ink) 6%, transparent)",
                  color: "var(--ink)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {isEs ? "Prácticas D.C.: DOJ, SEC, Dept. Estado" : "D.C. Externships: DOJ, SEC, State Dept"}
              </span>
            </div>

            {/* Feature Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <AwardIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school2.p1.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school2.p1.text")}
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <DollarSignIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school2.p2.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school2.p2.text")}
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <ScaleIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school2.p3.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school2.p3.text")}
                </p>
              </div>
            </div>
          </section>

          {/* School #3: University of Florida Levin College of Law */}
          <section className="doc-section" id="uf" style={{ marginTop: "48px" }}>
            <span className="section-num">{t("vlaw.school3.rank")}</span>
            <h2>{t("vlaw.school3.name")}</h2>
            <p className="lead">{t("vlaw.school3.lead")}</p>

            {/* Quick Stat Chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                margin: "20px 0 28px",
              }}
            >
              <span
                style={{
                  background: "color-mix(in srgb, var(--teal) 12%, transparent)",
                  color: "var(--teal)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isEs ? "34% BigLaw (Supera Ohio St & Minnesota)" : "34% BigLaw (Beats Ohio St & Minnesota)"}
              </span>
              <span
                style={{
                  background: "color-mix(in srgb, var(--gold) 15%, transparent)",
                  color: "var(--gold)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isEs ? "35% Becas Completas (Mediana $19,000)" : "35% Full Scholarships ($19,000 Median)"}
              </span>
              <span
                style={{
                  background: "color-mix(in srgb, var(--ink) 6%, transparent)",
                  color: "var(--ink)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {isEs ? "Red de 23,000 Exalumnos (65% en Florida)" : "23,000 Alumni Network (65% in FL)"}
              </span>
            </div>

            {/* Feature Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <TrendingUpIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school3.p1.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school3.p1.text")}
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <DollarSignIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school3.p2.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school3.p2.text")}
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <ScaleIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school3.p3.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school3.p3.text")}
                </p>
              </div>
            </div>
          </section>

          {/* School #4: Washington and Lee University */}
          <section className="doc-section" id="wl" style={{ marginTop: "48px" }}>
            <span className="section-num">{t("vlaw.school4.rank")}</span>
            <h2>{t("vlaw.school4.name")}</h2>
            <p className="lead">{t("vlaw.school4.lead")}</p>

            {/* Quick Stat Chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                margin: "20px 0 28px",
              }}
            >
              <span
                style={{
                  background: "color-mix(in srgb, var(--teal) 10%, transparent)",
                  color: "var(--teal)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isEs ? ">90% Becados (Mediana $34,226)" : ">90% Receive Aid ($34,226 Median)"}
              </span>
              <span
                style={{
                  background: "color-mix(in srgb, var(--gold) 15%, transparent)",
                  color: "var(--gold)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isEs ? "35% BigLaw & 10 Secretarías Federales" : "35% BigLaw & 10 Federal Clerks"}
              </span>
              <span
                style={{
                  background: "color-mix(in srgb, var(--ink) 6%, transparent)",
                  color: "var(--ink)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {isEs ? "370 Alumnos Totales · Ratio 7:1" : "370 Total Students · 7:1 Ratio"}
              </span>
            </div>

            {/* Feature Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <DollarSignIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school4.p1.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school4.p1.text")}
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <TrendingUpIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school4.p2.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school4.p2.text")}
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <AwardIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school4.p3.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school4.p3.text")}
                </p>
              </div>
            </div>
          </section>

          {/* School #5: University of Texas at Austin */}
          <section className="doc-section" id="ut" style={{ marginTop: "48px" }}>
            <span className="section-num">{t("vlaw.school5.rank")}</span>
            <h2>{t("vlaw.school5.name")}</h2>
            <p className="lead">{t("vlaw.school5.lead")}</p>

            {/* Quick Stat Chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                margin: "20px 0 28px",
              }}
            >
              <span
                style={{
                  background: "color-mix(in srgb, var(--teal) 10%, transparent)",
                  color: "var(--teal)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isEs ? "Prestigio T14 (<$40,000 Residente)" : "T14 Prestige (<$40,000 Resident)"}
              </span>
              <span
                style={{
                  background: "color-mix(in srgb, var(--gold) 15%, transparent)",
                  color: "var(--gold)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {isEs ? "~40% BigLaw (A la par de Stanford)" : "~40% BigLaw (On par with Stanford)"}
              </span>
              <span
                style={{
                  background: "color-mix(in srgb, var(--ink) 6%, transparent)",
                  color: "var(--ink)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {isEs ? "Epicentro Global de Derecho Energético" : "Global Epicenter of Energy Law"}
              </span>
            </div>

            {/* Feature Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <DollarSignIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school5.p1.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school5.p1.text")}
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <TrendingUpIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school5.p2.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school5.p2.text")}
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
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <ScaleIcon />
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
                    {t("vlaw.school5.p3.title")}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: "1.6" }}>
                  {t("vlaw.school5.p3.text")}
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: The Bottom Line */}
          <section className="doc-section" id="bottom-line" style={{ marginTop: "48px" }}>
            <span className="section-num">{isEs ? "Parte 7 de 7" : "Part 7 of 7"}</span>
            <h2>{t("vlaw.bottomline.h2")}</h2>

            <div className="refi-bottom-card">
              <blockquote className="refi-bottom-quote">
                “{t("vlaw.bottomline.quote")}”
              </blockquote>
            </div>

            {/* CTA Strip */}
            <div className="cta-strip" style={{ marginTop: "32px" }}>
              <div>
                <h2>
                  {isEs
                    ? "Evalúa tu financiamiento para la facultad de derecho"
                    : "Plan your law school borrowing strategy"}
                </h2>
                <p>
                  {isEs
                    ? "Calcula tu brecha de financiamiento, compara límites federales de endeudamiento y proyecta tu relación deuda-ingresos."
                    : "Estimate your tuition gap, check federal borrowing caps, and model salary-to-debt payoffs before signing your promissory note."}
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
                  <span>{isEs ? "Calculadora de Préstamos" : "Borrowing Calculator"}</span>
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
                PF
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
                  Peter Foulke
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
                    ? "Colaborador de educación de posgrado y ayuda financiera enfocado en el retorno de inversión en facultades de derecho, becas institucionales y colocación laboral."
                    : "Graduate Education & Financial Aid Contributor focusing on law school ROI, institutional scholarships, and post-graduate employment outcomes."}
                </p>
              </div>
            </div>

            {/* Sources & References */}
            <div
              style={{
                marginTop: "32px",
                fontSize: "12.5px",
                color: "var(--ink-soft)",
                lineHeight: "1.6",
              }}
            >
              <strong style={{ color: "var(--ink)" }}>{t("vlaw.sources.label")} </strong>
              <span>{t("vlaw.sources.text")}</span>
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
                to="/blog/which-law-schools-are-worth-it"
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
                  {isEs ? "Análisis Comparativo" : "Comparative Analysis"}
                </span>
                <span style={{ fontWeight: 600, color: "var(--ink)", fontSize: "15px" }}>
                  {isEs ? "¿Qué Facultades de Derecho Valen la Pena?" : "Which Law Schools Are Worth It?"}
                </span>
                <span style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "auto" }}>
                  {isEs ? "Desglose de ROI de las 10 mejores y opciones de valor →" : "Top 10 vs. Value Law School ROI breakdown →"}
                </span>
              </Link>

              <Link
                to="/blog/fafsa-deadlines"
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
                  {isEs ? "Guía de Fechas Límite" : "Deadlines Guide"}
                </span>
                <span style={{ fontWeight: 600, color: "var(--ink)", fontSize: "15px" }}>
                  {isEs ? "Fechas Límite de FAFSA 2027–2028" : "2027–2028 FAFSA Deadlines"}
                </span>
                <span style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "auto" }}>
                  {isEs ? "Plazos prioritarios y códigos institucionales de 10 universidades →" : "Priority deadlines & school codes for 10 top institutions →"}
                </span>
              </Link>

              <Link
                to="/chart-your-path"
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
                  {isEs ? "Herramienta Interactiva" : "Interactive Tool"}
                </span>
                <span style={{ fontWeight: 600, color: "var(--ink)", fontSize: "15px" }}>
                  {isEs ? "Calculadora Traza Tu Ruta" : "Chart Your Path Tool"}
                </span>
                <span style={{ fontSize: "13px", color: "var(--ink-soft)", marginTop: "auto" }}>
                  {isEs ? "Proyecta préstamos, brecha de costos y pagos futuros →" : "Project borrowing limits, funding gaps, and repayment plans →"}
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
