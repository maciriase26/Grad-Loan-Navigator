import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "In-Depth Analysis — Grad Loan Navigator";
const DESCRIPTION =
  "Long-form explainers, PDF consumer guides, and syndicated Experian resources on credit, borrowing, and repayment.";
const URL = "https://graduationnavigator.com/in-depth-analysis";

export const Route = createFileRoute("/in-depth-analysis")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: InDepthAnalysis,
});

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function InDepthAnalysis() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />

      <main>
        {/* Banner Section */}
        <section className="wrap resources-banner">
          <div className="eyebrow">{t("depth.eyebrow")}</div>
          <h1>{t("depth.h1")}</h1>
          <p className="sub">{t("depth.sub")}</p>
        </section>

        {/* Consumer Education Resources (PDF Guides) */}
        <section className="wrap depth-section">
          <h2 className="depth-section-title">{t("depth.consumer.title")}</h2>
          <p className="depth-section-desc">{t("depth.consumer.desc")}</p>

          <div className="depth-grid">
            {/* Brochure 1 */}
            <div className="depth-card">
              <span className="depth-card-tag">{t("depth.pdf1.tag")}</span>
              <h3>{t("depth.pdf1.title")}</h3>
              <p>{t("depth.pdf1.desc")}</p>
              <a
                href="https://www.experian.com/assets/consumer-education-content/brochures/credit-score-basics.pdf"
                target="_blank"
                rel="noreferrer noopener"
                className="depth-card-link"
              >
                Download PDF <DownloadIcon />
              </a>
            </div>

            {/* Brochure 2 */}
            <div className="depth-card">
              <span className="depth-card-tag">{t("depth.pdf2.tag")}</span>
              <h3>{t("depth.pdf2.title")}</h3>
              <p>{t("depth.pdf2.desc")}</p>
              <a
                href="https://www.experian.com/content/dam/marketing/na/assets/corp/consumer-education-content/credit-essentials-for-everyone-arh.pdf"
                target="_blank"
                rel="noreferrer noopener"
                className="depth-card-link"
              >
                Download PDF <DownloadIcon />
              </a>
            </div>

            {/* Brochure 3 */}
            <div className="depth-card">
              <span className="depth-card-tag">{t("depth.pdf3.tag")}</span>
              <h3>{t("depth.pdf3.title")}</h3>
              <p>{t("depth.pdf3.desc")}</p>
              <a
                href="https://www.experian.com/content/dam/marketing/na/assets/corp/consumer-education-content/12-questions-english.pdf"
                target="_blank"
                rel="noreferrer noopener"
                className="depth-card-link"
              >
                Download PDF <DownloadIcon />
              </a>
            </div>

            {/* Brochure 4 */}
            <div className="depth-card">
              <span className="depth-card-tag">{t("depth.pdf4.tag")}</span>
              <h3>{t("depth.pdf4.title")}</h3>
              <p>{t("depth.pdf4.desc")}</p>
              <a
                href="https://www.experian.com/content/dam/marketing/na/assets/corp/consumer-education-content/new-credit.pdf"
                target="_blank"
                rel="noreferrer noopener"
                className="depth-card-link"
              >
                Download PDF <DownloadIcon />
              </a>
            </div>
          </div>
        </section>

        {/* Ask Experian Articles */}
        <section className="wrap depth-section">
          <h2 className="depth-section-title">{t("depth.ask.title")}</h2>
          <p className="depth-section-desc">{t("depth.ask.desc")}</p>

          <div className="depth-grid">
            {/* Article 1 */}
            <div className="depth-card">
              <span className="depth-card-tag">{t("depth.article1.tag")}</span>
              <h3>{t("depth.article1.title")}</h3>
              <p>{t("depth.article1.desc")}</p>
              <a
                href="https://www.experian.com/blogs/ask-experian/what-are-the-different-types-of-student-loans/"
                target="_blank"
                rel="noreferrer noopener"
                className="depth-card-link"
              >
                Read on Experian.com <ExternalIcon />
              </a>
            </div>

            {/* Article 2 */}
            <div className="depth-card">
              <span className="depth-card-tag">{t("depth.article2.tag")}</span>
              <h3>{t("depth.article2.title")}</h3>
              <p>{t("depth.article2.desc")}</p>
              <a
                href="https://www.experian.com/blogs/ask-experian/student-loan-repayment/"
                target="_blank"
                rel="noreferrer noopener"
                className="depth-card-link"
              >
                Read on Experian.com <ExternalIcon />
              </a>
            </div>

            {/* Article 3 */}
            <div className="depth-card">
              <span className="depth-card-tag">{t("depth.article3.tag")}</span>
              <h3>{t("depth.article3.title")}</h3>
              <p>{t("depth.article3.desc")}</p>
              <a
                href="https://www.experian.com/blogs/ask-experian/how-to-get-a-student-loan/"
                target="_blank"
                rel="noreferrer noopener"
                className="depth-card-link"
              >
                Read on Experian.com <ExternalIcon />
              </a>
            </div>

            {/* Article 4 */}
            <div className="depth-card">
              <span className="depth-card-tag">{t("depth.article4.tag")}</span>
              <h3>{t("depth.article4.title")}</h3>
              <p>{t("depth.article4.desc")}</p>
              <a
                href="https://www.experian.com/blogs/ask-experian/how-do-student-loans-work/"
                target="_blank"
                rel="noreferrer noopener"
                className="depth-card-link"
              >
                Read on Experian.com <ExternalIcon />
              </a>
            </div>
          </div>
        </section>

        {/* Syndicated Article Layout Mockup */}
        <section className="wrap depth-section">
          <div className="syndicated-mockup-wrap">
            <div className="wrap meta">
              <div className="tag">Borrowing Basics</div>
              <h1>The Different Types of Student Loans, Explained</h1>

              <div className="source-block">
                <div className="exp-badge">Exp</div>
                <div className="text">
                  <b>Sourced from Experian.</b> This article is syndicated with permission from Experian's Ask Experian blog.
                  <a
                    href="https://www.experian.com/blogs/ask-experian/what-are-the-different-types-of-student-loans/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Read the original on Experian.com →
                  </a>
                </div>
              </div>

              <div className="byline">
                <div className="avatar">Exp</div>
                <span>
                  <b>Ask Experian Editorial Team</b> · Experian
                </span>
                <span className="dot"></span>
                <span>Published 2026 · Republished on Grad Navigator</span>
              </div>
            </div>

            <article className="syndicated-body">
              <p className="placeholder-note">
                [This is where the licensed article content would appear, reproduced exactly as published by Experian, with their formatting, headers, and author attribution intact — pending an actual syndication agreement. Nothing below this line is real Experian content.]
              </p>

              <h2>Types of Federal Student Loans</h2>
              <p>
                Federal student loans are funded by the federal government and come with benefits like fixed interest rates, income-driven repayment plans, and loan forgiveness programs. The primary federal loan options include Direct Subsidized Loans for undergraduates with financial need, Direct Unsubsidized Loans for undergraduate and graduate students, and Direct PLUS Loans for parents and graduate borrowers.
              </p>

              <h2>Private Student Loans vs. Federal Loans</h2>
              <p>
                Private student loans are issued by banks, credit unions, and online lenders rather than the government. While private loans can offer competitive fixed or variable interest rates for creditworthy borrowers or those with a strong cosigner, they generally lack federal protections such as income-driven repayment caps and Public Service Loan Forgiveness (PSLF).
              </p>

              <div className="end-attribution">
                <span>This article originally appeared on Experian's Ask Experian blog.</span>
                <a
                  href="https://www.experian.com/blogs/ask-experian/what-are-the-different-types-of-student-loans/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  View the original article on Experian.com →
                </a>
              </div>
            </article>

            <div className="layout-review-footer">
              © 2026 Grad Loan Navigator · Layout mockup for internal review — pending syndication agreement
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
