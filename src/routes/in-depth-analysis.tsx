import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "In-Depth Analysis | Grad Navigator";
const DESCRIPTION =
  "PDF consumer guides and curated resources on credit, borrowing, and repayment.";
const URL = "https://www.graduationnavigator.com/in-depth-analysis";

export const Route = createFileRoute("/in-depth-analysis")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, follow" },
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

      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
