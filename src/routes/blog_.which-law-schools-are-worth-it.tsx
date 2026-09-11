import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Which Law Schools Are Worth It? — Grad Loan Navigator";
const DESCRIPTION =
  "A J.D. can lead to high future earnings but also comes at high cost. Here's where you can get the most out of your law degree.";
const URL = "https://www.graduationnavigator.com/blog/which-law-schools-are-worth-it";

export const Route = createFileRoute("/blog_/which-law-schools-are-worth-it")({
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
  component: LawSchoolsWorthItArticlePage,
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
      style={{ color: "var(--teal)" }}
      aria-hidden="true"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function LightbulbIcon() {
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
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
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

const HEAVY_HITTERS = [
  { rank: 1, name: "Columbia University", acceptance: "11.84%", tuition: "$256,104", earnings: "$515,627", roi: "$6,417,207" },
  { rank: 2, name: "University of Pennsylvania", acceptance: "8.05%", tuition: "$235,044", earnings: "$496,974", roi: "$6,345,375" },
  { rank: 3, name: "Northwestern University", acceptance: "12.30%", tuition: "$239,316", earnings: "$478,454", roi: "$6,078,881" },
  { rank: 4, name: "New York University", acceptance: "13.39%", tuition: "$251,856", earnings: "$487,693", roi: "$6,018,643" },
  { rank: 5, name: "University of Virginia", acceptance: "10.17%", tuition: "$229,188", earnings: "$460,924", roi: "$6,015,656" },
  { rank: 6, name: "University of Chicago", acceptance: "9.74%", tuition: "$249,948", earnings: "$475,259", roi: "$5,993,689" },
  { rank: 7, name: "Harvard University", acceptance: "9.20%", tuition: "$231,300", earnings: "$460,924", roi: "$5,763,003" },
  { rank: 8, name: "Stanford University", acceptance: "6.10%", tuition: "$232,362", earnings: "$454,333", roi: "$5,330,191" },
  { rank: 9, name: "University of California, Berkeley", acceptance: "14.84%", tuition: "$228,447", earnings: "$396,065", roi: "$4,568,943" },
  { rank: 10, name: "University of Michigan", acceptance: "8.57%", tuition: "$237,324", earnings: "$365,426", roi: "$4,530,900" },
];

const VALUE_SCHOOLS = [
  { rank: 1, name: "University of Nevada, Las Vegas", acceptance: "30.78%", tuition: "$138,120", earnings: "$145,557", roi: "$1,245,484" },
  { rank: 2, name: "Emory University", acceptance: "38.68%", tuition: "$208,530", earnings: "$151,825", roi: "$1,124,944" },
  { rank: 3, name: "University of Houston", acceptance: "22.99%", tuition: "$138,153", earnings: "$148,137", roi: "$1,002,155" },
  { rank: 4, name: "University of Iowa", acceptance: "44.43%", tuition: "$156,573", earnings: "$128,329", roi: "$962,950" },
  { rank: 5, name: "University of Georgia", acceptance: "12.72%", tuition: "$116,832", earnings: "$124,294", roi: "$959,022" },
  { rank: 6, name: "University of Florida", acceptance: "16.52%", tuition: "$108,444", earnings: "$120,608", roi: "$910,180" },
  { rank: 7, name: "Temple University", acceptance: "24.38%", tuition: "$146,988", earnings: "$134,053", roi: "$896,913" },
  { rank: 8, name: "Indiana University Bloomington", acceptance: "35.77%", tuition: "$174,000", earnings: "$120,137", roi: "$886,312" },
  { rank: 9, name: "University of Colorado Boulder", acceptance: "27.56%", tuition: "$132,006", earnings: "$120,279", roi: "$874,646" },
  { rank: 10, name: "Texas Tech University", acceptance: "25.61%", tuition: "$101,520", earnings: "$124,872", roi: "$863,823" },
];

function LawSchoolsWorthItArticlePage() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="wrap doc-hero">
          <div className="article-back" style={{ marginBottom: "16px" }}>
            <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              ← {t("blog.h1")}
            </Link>
          </div>
          <div className="eyebrow">{t("law.eyebrow")}</div>
          <h1>{t("law.h1")}</h1>
          <p className="sub">{t("law.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("law.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("law.why.title")}</h4>
              <p>{t("law.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#heavy-hitters">{t("law.nav.heavy")}</a>
          <a href="#value-schools">{t("law.nav.value")}</a>
          <a href="#keep-in-mind">{t("law.nav.mind")}</a>
          <a href="#bottom-line">{t("law.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* By the numbers stat banner */}
          <div className="rates-callout-zoom" style={{ marginBottom: "40px" }}>
            <div className="rates-callout-zoom-icon">
              <TrendingUpIcon />
            </div>
            <div className="rates-callout-zoom-content">
              <p style={{ fontSize: "16.5px", lineHeight: "1.5" }}>
                <strong>By the numbers:</strong> On average, a J.D. offers a <strong>41% lifetime earnings boost</strong>, even after adjusting for the cost of the degree.
              </p>
            </div>
          </div>

          {/* Section 1: Heavy Hitters */}
          <section className="doc-section" id="heavy-hitters">
            <span className="section-num">{t("law.part1")}</span>
            <h2>{t("law.heavy.h2")}</h2>
            <p className="lead">{t("law.heavy.lead")}</p>

            <div className="roi-table-wrap">
              <table className="roi-table">
                <thead>
                  <tr>
                    <th className="roi-rank-cell">ROI Rank</th>
                    <th>Institution Name</th>
                    <th>Acceptance Rate</th>
                    <th>All Years Tuition</th>
                    <th>Est. Earnings at Age 60</th>
                    <th>Lifetime ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {HEAVY_HITTERS.map((item) => (
                    <tr key={item.rank}>
                      <td className="roi-rank-cell">
                        <span className="roi-rank-badge">{item.rank}</span>
                      </td>
                      <td className="roi-school-name">{item.name}</td>
                      <td className="roi-mono">{item.acceptance}</td>
                      <td className="roi-mono">{item.tuition}</td>
                      <td className="roi-mono">{item.earnings}</td>
                      <td className="roi-highlight">{item.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Who this makes sense for box */}
            <div className="rates-action-box" style={{ marginTop: "24px" }}>
              <h4>
                <LightbulbIcon />
                {t("law.heavy.who.title")}
              </h4>
              <p>{t("law.heavy.who.text")}</p>
            </div>
          </section>

          {/* Section 2: Value Schools */}
          <section className="doc-section" id="value-schools">
            <span className="section-num">{t("law.part2")}</span>
            <h2>{t("law.value.h2")}</h2>
            <p className="lead">{t("law.value.lead")}</p>

            <div className="roi-table-wrap">
              <table className="roi-table">
                <thead>
                  <tr>
                    <th className="roi-rank-cell">ROI Rank</th>
                    <th>Institution Name</th>
                    <th>Acceptance Rate</th>
                    <th>All Years Tuition</th>
                    <th>Est. Earnings at Age 60</th>
                    <th>Lifetime ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {VALUE_SCHOOLS.map((item) => (
                    <tr key={item.rank}>
                      <td className="roi-rank-cell">
                        <span className="roi-rank-badge">{item.rank}</span>
                      </td>
                      <td className="roi-school-name">{item.name}</td>
                      <td className="roi-mono">{item.acceptance}</td>
                      <td className="roi-mono">{item.tuition}</td>
                      <td className="roi-mono">{item.earnings}</td>
                      <td className="roi-highlight">{item.roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Keep In Mind… */}
          <section className="doc-section" id="keep-in-mind">
            <span className="section-num">{t("law.part3")}</span>
            <h2>{t("law.mind.h2")}</h2>

            <div className="rates-diff-grid">
              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">01</span>
                  <h3>{t("law.mind.p1.title")}</h3>
                </div>
                <p>{t("law.mind.p1.text")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">02</span>
                  <h3>{t("law.mind.p2.title")}</h3>
                </div>
                <p>{t("law.mind.p2.text")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">03</span>
                  <h3>{t("law.mind.p3.title")}</h3>
                </div>
                <p>{t("law.mind.p3.text")}</p>
              </div>

              <div className="rates-diff-card">
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">04</span>
                  <h3>{t("law.mind.p4.title")}</h3>
                </div>
                <p>{t("law.mind.p4.text")}</p>
              </div>

              <div className="rates-diff-card" style={{ gridColumn: "1 / -1" }}>
                <div className="rates-diff-card-header">
                  <span className="rates-diff-tag">05</span>
                  <h3>{t("law.mind.p5.title")}</h3>
                </div>
                <p>{t("law.mind.p5.text")}</p>
              </div>
            </div>
          </section>

          {/* Section 4: The Bottom Line */}
          <section className="doc-section" id="bottom-line">
            <span className="section-num">{t("law.part4")}</span>
            <h2>{t("law.bottomline.h2")}</h2>

            <div className="refi-bottom-card">
              <blockquote className="refi-bottom-quote">“{t("law.bottomline.quote")}”</blockquote>
            </div>

            {/* CTA Strip */}
            <div className="cta-strip">
              <div>
                <h2>{t("law.cta.h2")}</h2>
                <p>{t("law.cta.p")}</p>
              </div>
              <Link
                to="/chart-your-path"
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <span>{t("law.cta.btn")}</span>
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Sources Footnote */}
            <div className="refi-sources">
              <p>
                <strong>{t("law.sources.label")}</strong>{" "}
                {t("law.sources.text")}
              </p>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
