import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "University of Florida: A Top-Tier Value — Grad Loan Navigator";
const DESCRIPTION =
  "The University of Florida (UF) offers nationally ranked academic programs, competitive post-graduation placement and a robust alumni network all at a fraction of the price.";
const URL = "https://www.graduationnavigator.com/blog/university-of-florida-top-tier-value";

export const Route = createFileRoute(
  "/blog_/university-of-florida-top-tier-value"
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
  component: UniversityOfFloridaArticlePage,
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
      style={{ color: "#FA4616" }}
      aria-hidden="true"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
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
      width="20"
      height="20"
      style={{ color: "#0021A5" }}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
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

const UF_STACKS_UP = [
  { rank: 1, name: "University of Florida", acceptance: "19.8%", inState: "$6,440", outState: "$34,620", earnings: "$65,342", debt: "$15,000", isUF: true },
  { rank: 2, name: "UNC-Chapel Hill", acceptance: "17.5%", inState: "$9,003", outState: "$41,211", earnings: "$65,584", debt: "$14,000", isUF: false },
  { rank: 3, name: "University of Wisconsin–Madison", acceptance: "49.4%", inState: "$12,416", outState: "$45,903", earnings: "$69,868", debt: "$20,484", isUF: false },
  { rank: 4, name: "The Ohio State University", acceptance: "53.4%", inState: "$14,050", outState: "$44,271", earnings: "$56,186", debt: "$18,800", isUF: false },
  { rank: 5, name: "University of Georgia", acceptance: "43.7%", inState: "$11,628", outState: "$33,298", earnings: "$63,005", debt: "$18,500", isUF: false },
  { rank: 6, name: "University of Michigan", acceptance: "17.9%", inState: "$18,896", outState: "$67,096", earnings: "$78,273", debt: "$19,500", isUF: false },
  { rank: 7, name: "University of Virginia", acceptance: "17.2%", inState: "$20,706", outState: "$62,054", earnings: "$80,156", debt: "$17,500", isUF: false },
  { rank: 8, name: "University of Texas at Austin", acceptance: "29.7%", inState: "$11,698", outState: "$41,406", earnings: "$67,389", debt: "$16,500", isUF: false },
];

function UniversityOfFloridaArticlePage() {
  const { t } = useI18n();

  return (
    <div className="uf-article-theme">
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="wrap doc-hero">
          <div className="article-back" style={{ marginBottom: "16px" }}>
            <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              ← {t("blog.h1")}
            </Link>
          </div>
          <div className="eyebrow">{t("uf.eyebrow")}</div>
          <h1 style={{ color: "#0021A5" }}>{t("uf.h1")}</h1>
          <p className="sub">{t("uf.sub")}</p>
          <div className="updated">
            <span className="dot" style={{ background: "#FA4616" }} />
            {t("uf.updated")}
          </div>

          {/* Tuition Callout */}
          <div className="refi-hero-callout" style={{ borderLeftColor: "#FA4616", background: "color-mix(in srgb, #FA4616 6%, var(--card-paper))" }}>
            <div className="refi-hero-callout-icon" style={{ color: "#FA4616" }}>
              <AwardIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4 style={{ color: "#0021A5" }}>{t("uf.why.title")}</h4>
              <p>{t("uf.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#academics">{t("uf.nav.academics")}</a>
          <a href="#outcomes">{t("uf.nav.outcomes")}</a>
          <a href="#alumni">{t("uf.nav.alumni")}</a>
          <a href="#stacks-up">{t("uf.nav.stacksup")}</a>
          <a href="#bottom-line">{t("uf.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Stat Banner */}
          <div className="rates-callout-zoom" style={{ marginBottom: "40px", borderLeftColor: "#FA4616" }}>
            <div className="rates-callout-zoom-icon">
              <TrendingUpIcon />
            </div>
            <div className="rates-callout-zoom-content">
              <p style={{ fontSize: "16.5px", lineHeight: "1.5" }}>
                {t("uf.stat.banner")}
              </p>
            </div>
          </div>

          {/* Section 1: Nationally Ranked Academics */}
          <section className="doc-section" id="academics">
            <span className="section-num">{t("uf.part1")}</span>
            <h2 style={{ color: "#0021A5" }}>{t("uf.academics.h2")}</h2>
            <p className="lead">{t("uf.academics.lead")}</p>

            <div className="rates-trio-wrap" style={{ borderTop: "3px solid #FA4616" }}>
              <div className="rates-trio-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                <div className="rates-trio-col">
                  <span className="rates-trio-label">{t("uf.r1.sub")}</span>
                  <span className="rates-trio-number" style={{ color: "#0021A5" }}>#7</span>
                  <span className="rates-trio-sub">{t("uf.r1.title")}</span>
                </div>
                <div className="rates-trio-col">
                  <span className="rates-trio-label">{t("uf.r2.sub")}</span>
                  <span className="rates-trio-number" style={{ color: "#FA4616" }}>#2</span>
                  <span className="rates-trio-sub">{t("uf.r2.title")}</span>
                </div>
                <div className="rates-trio-col">
                  <span className="rates-trio-label">{t("uf.r3.sub")}</span>
                  <span className="rates-trio-number" style={{ color: "#0021A5" }}>#3</span>
                  <span className="rates-trio-sub">{t("uf.r3.title")}</span>
                </div>
                <div className="rates-trio-col">
                  <span className="rates-trio-label">{t("uf.r4.sub")}</span>
                  <span className="rates-trio-number" style={{ color: "#FA4616" }}>#4</span>
                  <span className="rates-trio-sub">{t("uf.r4.title")}</span>
                </div>
                <div className="rates-trio-col">
                  <span className="rates-trio-label">{t("uf.r5.sub")}</span>
                  <span className="rates-trio-number" style={{ color: "#0021A5" }}>#16</span>
                  <span className="rates-trio-sub">{t("uf.r5.title")}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Great Outcomes */}
          <section className="doc-section" id="outcomes">
            <span className="section-num">{t("uf.part2")}</span>
            <h2 style={{ color: "#0021A5" }}>{t("uf.outcomes.h2")}</h2>
            <p className="lead">{t("uf.outcomes.lead")}</p>

            <div className="refi-stat-card" style={{ borderLeft: "4px solid #FA4616" }}>
              <div className="refi-stat-left">
                <span className="refi-stat-badge" style={{ background: "color-mix(in srgb, #FA4616 14%, transparent)", color: "#FA4616" }}>
                  PLACEMENT RATE
                </span>
                <span className="refi-stat-rate" style={{ color: "#0021A5" }}>73%</span>
              </div>
              <div className="refi-stat-right">
                <h4 style={{ color: "#0021A5" }}>Job Secured by Graduation</h4>
                <p>{t("uf.outcomes.p1")}</p>
              </div>
            </div>
          </section>

          {/* Section 3: Gator Network */}
          <section className="doc-section" id="alumni">
            <span className="section-num">{t("uf.part3")}</span>
            <h2 style={{ color: "#0021A5" }}>{t("uf.alumni.h2")}</h2>
            <p className="lead">{t("uf.alumni.lead")}</p>

            <div className="rates-action-box" style={{ borderLeftColor: "#0021A5", background: "color-mix(in srgb, #0021A5 5%, var(--card-paper))" }}>
              <h4 style={{ color: "#0021A5" }}>500,000+ Living Alumni Worldwide</h4>
              <p>{t("uf.alumni.p1")}</p>
            </div>
          </section>

          {/* Section 4: How UF Stacks Up */}
          <section className="doc-section" id="stacks-up">
            <span className="section-num">{t("uf.part4")}</span>
            <h2 style={{ color: "#0021A5" }}>{t("uf.stacksup.h2")}</h2>
            <p className="lead">{t("uf.stacksup.lead")}</p>

            <div className="roi-table-wrap" style={{ borderTop: "3px solid #0021A5" }}>
              <table className="roi-table">
                <thead>
                  <tr>
                    <th className="roi-rank-cell">{t("table.rank")}</th>
                    <th>{t("table.institution")}</th>
                    <th>{t("table.acceptance")}</th>
                    <th>{t("table.inState")}</th>
                    <th>{t("table.outState")}</th>
                    <th>{t("table.earnings8yr")}</th>
                    <th>{t("table.studentDebt")}</th>
                  </tr>
                </thead>
                <tbody>
                  {UF_STACKS_UP.map((item) => (
                    <tr key={item.rank} className={item.isUF ? "uf-row-highlight" : ""}>
                      <td className="roi-rank-cell">
                        <span className="roi-rank-badge" style={item.isUF ? { background: "#FA4616", color: "#fff" } : {}}>
                          {item.rank}
                        </span>
                      </td>
                      <td className="roi-school-name" style={item.isUF ? { color: "#0021A5", fontWeight: 700 } : {}}>
                        {item.name} {item.isUF && "🐊"}
                      </td>
                      <td className="roi-mono">{item.acceptance}</td>
                      <td className="roi-mono" style={item.isUF ? { color: "#FA4616", fontWeight: 700 } : {}}>{item.inState}</td>
                      <td className="roi-mono">{item.outState}</td>
                      <td className="roi-mono">{item.earnings}</td>
                      <td className="roi-mono" style={item.isUF ? { color: "#0021A5", fontWeight: 700 } : {}}>{item.debt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "12px", color: "var(--ink-soft)", marginTop: "8px", fontStyle: "italic" }}>
              Notes: Tuition and fee figures are for 2026–27 and include required fees for full-time undergraduates at the main campus. Earnings are median earnings 8 years after entry for federally aided undergraduates, from U.S. Department of Education College Scorecard.
            </p>
          </section>

          {/* Section 5: Bottom Line */}
          <section className="doc-section" id="bottom-line">
            <span className="section-num">{t("uf.part5")}</span>
            <h2 style={{ color: "#0021A5" }}>{t("uf.bottomline.h2")}</h2>

            <div className="refi-bottom-card" style={{ borderLeftColor: "#FA4616", background: "color-mix(in srgb, #FA4616 6%, var(--card-paper))" }}>
              <blockquote className="refi-bottom-quote" style={{ color: "#0021A5" }}>
                “{t("uf.bottomline.quote")}”
              </blockquote>
            </div>

            {/* CTA Strip */}
            <div className="cta-strip" style={{ background: "linear-gradient(135deg, #0021A5 0%, #001256 100%)" }}>
              <div>
                <h2 style={{ color: "#ffffff" }}>{t("uf.cta.h2")}</h2>
                <p style={{ color: "rgba(255, 255, 255, 0.88)" }}>{t("uf.cta.p")}</p>
              </div>
              <Link
                to="/chart-your-path"
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#FA4616",
                  color: "#ffffff",
                }}
              >
                <span>{t("uf.cta.btn")}</span>
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Sources Footnote */}
            <div className="refi-sources">
              <p>
                <strong>{t("uf.sources.label")}</strong>{" "}
                {t("uf.sources.text")}
              </p>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
