import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "AI Use in Higher Education — Grad Loan Navigator";
const DESCRIPTION =
  "The advent of AI is not only changing the value of higher education, but also what the experience within degree-granting programs looks like. A data analysis by Jaylen Peng.";
const URL = "https://www.graduationnavigator.com/blog/ai-use-in-higher-education";

export const Route = createFileRoute(
  "/blog_/ai-use-in-higher-education"
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
  component: AiUseInHigherEducationArticlePage,
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
      width="20"
      height="20"
      style={{ color: "var(--teal)" }}
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

const WHO_USES_AI = [
  { rank: 1, major: "Business", dailyWeekly: "70%", daily: "28%", weekly: "42%", monthly: "10%", infrequently: "13%", never: "8%" },
  { rank: 2, major: "Technology", dailyWeekly: "68%", daily: "34%", weekly: "34%", monthly: "8%", infrequently: "18%", never: "5%" },
  { rank: 3, major: "Engineering", dailyWeekly: "65%", daily: "28%", weekly: "37%", monthly: "13%", infrequently: "15%", never: "8%" },
  { rank: 4, major: "Vocational", dailyWeekly: "58%", daily: "20%", weekly: "38%", monthly: "13%", infrequently: "19%", never: "10%" },
  { rank: 5, major: "Healthcare", dailyWeekly: "56%", daily: "18%", weekly: "38%", monthly: "12%", infrequently: "21%", never: "11%" },
  { rank: 6, major: "Social sciences", dailyWeekly: "53%", daily: "19%", weekly: "34%", monthly: "15%", infrequently: "19%", never: "13%" },
  { rank: 7, major: "All other programs", dailyWeekly: "50%", daily: "13%", weekly: "37%", monthly: "15%", infrequently: "20%", never: "15%" },
  { rank: 8, major: "Natural sciences", dailyWeekly: "49%", daily: "16%", weekly: "33%", monthly: "10%", infrequently: "23%", never: "19%" },
  { rank: 9, major: "Humanities", dailyWeekly: "43%", daily: "16%", weekly: "27%", monthly: "11%", infrequently: "20%", never: "26%" },
];

function AiUseInHigherEducationArticlePage() {
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
          <div className="eyebrow">{t("ai.eyebrow")}</div>
          <h1>{t("ai.h1")}</h1>
          <p className="sub">{t("ai.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("ai.updated")}
          </div>

          {/* Why it matters callout */}
          <div className="refi-hero-callout">
            <div className="refi-hero-callout-icon">
              <AlertTriangleIcon />
            </div>
            <div className="refi-hero-callout-content">
              <h4>{t("ai.why.title")}</h4>
              <p>{t("ai.why.p")}</p>
            </div>
          </div>
        </section>

        {/* Section Jump Nav */}
        <div className="wrap pagenav">
          <a href="#how-students-use-ai">{t("ai.nav.how")}</a>
          <a href="#who-uses-it-most">{t("ai.nav.who")}</a>
          <a href="#how-schools-respond">{t("ai.nav.schools")}</a>
          <a href="#keep-in-mind">{t("ai.nav.mind")}</a>
          <a href="#bottom-line">{t("ai.nav.bottomline")}</a>
        </div>

        {/* Main Content Body */}
        <div className="wrap doc-content">
          {/* Stat Banner */}
          <div className="rates-callout-zoom" style={{ marginBottom: "40px" }}>
            <div className="rates-callout-zoom-icon">
              <TrendingUpIcon />
            </div>
            <div className="rates-callout-zoom-content">
              <h3 style={{ margin: "0 0 6px 0", fontSize: "19px", fontWeight: 700 }}>
                By the numbers: 57% of U.S. college students use AI in their coursework at least weekly.
              </h3>
              <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                Artificial intelligence is shifting from an experimental technology into a core productivity tool across higher education institutions nationwide.
              </p>
            </div>
          </div>

          {/* Section 1: How Students Use AI */}
          <section className="doc-section" id="how-students-use-ai">
            <span className="section-num">Part 1 of 4</span>
            <h2>How Students Use AI</h2>
            <p className="lead">
              Students use a variety of AI tools. Popular ones include <strong>ChatGPT</strong>, <strong>Claude</strong>, <strong>Grammarly</strong>, and <strong>Microsoft Copilot</strong>. Common applications include:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px", margin: "24px 0" }}>
              <div style={{ padding: "20px 22px", background: "var(--card-paper)", borderRadius: "10px", border: "1px solid var(--line)", borderLeft: "3px solid var(--teal)" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>Conducting Research</h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  Quickly searching for information and synthesizing data across multiple sources.
                </p>
              </div>

              <div style={{ padding: "20px 22px", background: "var(--card-paper)", borderRadius: "10px", border: "1px solid var(--line)", borderLeft: "3px solid var(--ink)" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>Suggesting Ideas</h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  Generating potential topics, angles, and project ideas based on criteria.
                </p>
              </div>

              <div style={{ padding: "20px 22px", background: "var(--card-paper)", borderRadius: "10px", border: "1px solid var(--line)", borderLeft: "3px solid var(--teal)" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>Explaining Complex Concepts</h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  Providing relevant examples, analogies, and step-by-step technical explanations.
                </p>
              </div>

              <div style={{ padding: "20px 22px", background: "var(--card-paper)", borderRadius: "10px", border: "1px solid var(--line)", borderLeft: "3px solid var(--ink)" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>Summarizing Documents</h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  Condensing long academic articles, studies, and texts while retaining core meaning.
                </p>
              </div>

              <div style={{ padding: "20px 22px", background: "var(--card-paper)", borderRadius: "10px", border: "1px solid var(--line)", borderLeft: "3px solid var(--teal)" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>Creating Drafts</h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  Generating an initial structural outline or starting point for further editing.
                </p>
              </div>

              <div style={{ padding: "20px 22px", background: "var(--card-paper)", borderRadius: "10px", border: "1px solid var(--line)", borderLeft: "3px solid var(--ink)" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>Improving Writing</h3>
                <p style={{ margin: 0, fontSize: "14.5px", lineHeight: "1.6", color: "var(--ink-soft)" }}>
                  Checking grammar, polishing syntax, and enhancing clarity across written work.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Who Uses It Most? */}
          <section className="doc-section" id="who-uses-it-most">
            <span className="section-num">Part 2 of 4</span>
            <h2>Who Uses It Most?</h2>
            <p className="lead">
              Male students report more frequent use than female students. Students in <strong>business</strong>, <strong>technology</strong>, and <strong>engineering</strong> programs report more frequent AI use when compared to students in other fields.
            </p>

            {/* AI Frequency Data Table */}
            <div className="roi-table-wrap">
              <table className="roi-table">
                <thead>
                  <tr>
                    <th className="roi-rank-cell">Rank</th>
                    <th>Major Field of Study</th>
                    <th style={{ textAlign: "center" }}>Daily or Weekly</th>
                    <th style={{ textAlign: "center" }}>Daily</th>
                    <th style={{ textAlign: "center" }}>Weekly</th>
                    <th style={{ textAlign: "center" }}>Monthly</th>
                    <th style={{ textAlign: "center" }}>Infrequently</th>
                    <th style={{ textAlign: "center" }}>Never</th>
                  </tr>
                </thead>
                <tbody>
                  {WHO_USES_AI.map((row) => (
                    <tr key={row.major}>
                      <td className="roi-rank-cell">
                        <span className="roi-rank-badge">{row.rank}</span>
                      </td>
                      <td className="roi-school-name">{row.major}</td>
                      <td style={{ textAlign: "center" }} className="roi-highlight">{row.dailyWeekly}</td>
                      <td style={{ textAlign: "center" }} className="roi-mono">{row.daily}</td>
                      <td style={{ textAlign: "center" }} className="roi-mono">{row.weekly}</td>
                      <td style={{ textAlign: "center" }} className="roi-mono">{row.monthly}</td>
                      <td style={{ textAlign: "center" }} className="roi-mono">{row.infrequently}</td>
                      <td style={{ textAlign: "center" }} className="roi-mono">{row.never}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: How Schools Are Responding */}
          <section className="doc-section" id="how-schools-respond">
            <span className="section-num">Part 3 of 4</span>
            <h2>How Schools Are Responding</h2>
            <p className="lead">
              <strong>The Short Answer:</strong> Not consistently or clearly enough.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", margin: "24px 0" }}>
              <div style={{ padding: "20px", background: "var(--card-paper)", borderRadius: "12px", border: "1px solid var(--line)", borderTop: "3px solid #e11d48" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#e11d48", fontWeight: 700 }}>Strict Prohibition</span>
                <div style={{ fontSize: "32px", fontWeight: 800, color: "var(--ink)", marginTop: "6px" }}>11%</div>
                <p style={{ margin: "6px 0 0 0", fontSize: "13.5px", color: "var(--ink-soft)" }}>say their school prohibits AI use.</p>
              </div>

              <div style={{ padding: "20px", background: "var(--card-paper)", borderRadius: "12px", border: "1px solid var(--line)", borderTop: "3px solid #D99B26" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#D99B26", fontWeight: 700 }}>Discouraged Use</span>
                <div style={{ fontSize: "32px", fontWeight: 800, color: "var(--ink)", marginTop: "6px" }}>42%</div>
                <p style={{ margin: "6px 0 0 0", fontSize: "13.5px", color: "var(--ink-soft)" }}>say their school discourages AI use.</p>
              </div>

              <div style={{ padding: "20px", background: "var(--card-paper)", borderRadius: "12px", border: "1px solid var(--line)", borderTop: "3px solid var(--teal)" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--teal)", fontWeight: 700 }}>Encouraged w/ Limits</span>
                <div style={{ fontSize: "32px", fontWeight: 800, color: "var(--teal)", marginTop: "6px" }}>35%</div>
                <p style={{ margin: "6px 0 0 0", fontSize: "13.5px", color: "var(--ink-soft)" }}>say school encourages AI use within limits.</p>
              </div>

              <div style={{ padding: "20px", background: "var(--card-paper)", borderRadius: "12px", border: "1px solid var(--line)", borderTop: "3px solid var(--ink)" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink)", fontWeight: 700 }}>Free Encouraged Use</span>
                <div style={{ fontSize: "32px", fontWeight: 800, color: "var(--ink)", marginTop: "6px" }}>7%</div>
                <p style={{ margin: "6px 0 0 0", fontSize: "13.5px", color: "var(--ink-soft)" }}>say school encourages free AI use.</p>
              </div>
            </div>

            <p style={{ fontSize: "16px", lineHeight: "1.65" }}>
              AI usage policies differ across institutions, departments, courses, and even individual assignments. Currently, <strong>there is no institutional consensus</strong>.
            </p>
          </section>

          {/* Section 4: What You Should Keep in Mind */}
          <section className="doc-section" id="keep-in-mind">
            <span className="section-num">Part 4 of 4</span>
            <h2>What You Should Keep in Mind</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "24px 0" }}>
              <div style={{ padding: "20px 24px", background: "var(--card-paper)", borderRadius: "12px", border: "1px solid var(--line)", borderLeft: "4px solid var(--teal)" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <CheckCircleIcon />
                  <div>
                    <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>Code of Conduct</h3>
                    <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                      If <strong>unsure</strong> about whether AI use is appropriate for an assignment or class, <strong>ask your professor</strong>. Academic integrity violations can lead to serious consequences.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ padding: "20px 24px", background: "var(--card-paper)", borderRadius: "12px", border: "1px solid var(--line)", borderLeft: "4px solid #D99B26" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <CheckCircleIcon />
                  <div>
                    <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>Verify Information</h3>
                    <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                      AI tools can generate <strong>inaccurate information</strong> or <strong>hallucinate events</strong>. Always check your facts with primary sources before submitting work.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ padding: "20px 24px", background: "var(--card-paper)", borderRadius: "12px", border: "1px solid var(--line)", borderLeft: "4px solid var(--teal)" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <CheckCircleIcon />
                  <div>
                    <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>Career Implications</h3>
                    <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                      <strong>AI skills</strong> are becoming increasingly relevant across the workforce. Not developing AI skills and experience in school could mean you fall behind.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ padding: "20px 24px", background: "var(--card-paper)", borderRadius: "12px", border: "1px solid var(--line)", borderLeft: "4px solid var(--ink)" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <CheckCircleIcon />
                  <div>
                    <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>Maintain Your Skills</h3>
                    <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.65", color: "var(--ink-soft)" }}>
                      AI should support, not replace your ability to research, write, and think critically. Be aware of overreliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: The Bottom Line */}
          <section className="doc-section" id="bottom-line">
            <span className="section-num">Conclusion</span>
            <h2>The Bottom Line</h2>
            <div className="refi-bottom-card">
              <p className="refi-bottom-quote">
                “AI is already a routine part of college work, but institutional guidance has not caught up. Use it to support your learning, but make sure you are clear on the rules.”
              </p>
            </div>

            {/* Sources Attribution */}
            <div className="refi-sources">
              <p>
                <strong>Sources:</strong> Lumina Foundation–Gallup 2026 State of Higher Education Study, Campbell Academic Technology Services. <em>Reviewed as of Sept. 16, 2026.</em>
              </p>
            </div>

            {/* CTA Box */}
            <div className="rates-action-box">
              <h4>Planning Your Education & Degree Funding?</h4>
              <p>
                Use our free interactive tool to estimate your annual borrowing gap, check federal cap compliance, and model total degree costs.
              </p>
              <Link to="/chart-your-path" className="path-cta">
                Chart Your Path Now
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
