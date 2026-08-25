import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Grad Navigator Blog — Student Perspectives & Guides";
const DESCRIPTION =
  "Short, plain-language posts about graduate borrowing, refinancing, and repayment, written by students for students.";
const URL = "https://www.graduationnavigator.com/blog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: BlogPage,
});

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="15"
      height="15"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

function BlogPage() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />

      <main>
        <section className="wrap resources-banner">
          <div className="eyebrow">{t("blog.eyebrow")}</div>
          <h1>{t("blog.h1")}</h1>
          <p className="sub">{t("blog.sub")}</p>
        </section>

        <section className="wrap resources-section">
          <div
            className="path-grid"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}
          >
            {/* Featured Clickable Refinancing Article */}
            <Link
              className="path-card card-b"
              to="/blog/refinancing-student-loans"
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gridColumn: "1 / -1",
                background:
                  "linear-gradient(135deg, var(--card) 0%, color-mix(in srgb, var(--card) 92%, var(--gold)) 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span className="path-subheader">{t("blog.card1.tag")}</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--teal)",
                    background: "color-mix(in srgb, var(--teal) 12%, transparent)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Featured
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 28px)", marginBottom: "12px" }}>
                {t("blog.card1.title")}
              </h2>
              <p className="desc" style={{ fontSize: "15.5px", lineHeight: "1.65" }}>
                {t("blog.card1.excerpt")}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11.5px",
                    color: "var(--ink-soft)",
                  }}
                >
                  {t("blog.card1.author")}
                </span>
                <span className="path-cta">
                  {t("blog.card1.cta")}
                  <Arrow />
                </span>
              </div>
            </Link>

            {/* Live Student Loan Interest Article */}
            <Link
              className="path-card card-a"
              to="/blog/student-loan-interest-by-the-numbers"
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className="path-subheader">{t("blog.card2.tag")}</span>
              <h2>{t("blog.card2.title")}</h2>
              <p className="desc">{t("blog.card2.excerpt")}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11.5px",
                    color: "var(--ink-soft)",
                  }}
                >
                  {t("blog.card2.author")}
                </span>
                <span className="path-cta">
                  {t("blog.card2.cta")}
                  <Arrow />
                </span>
              </div>
            </Link>

            {/* Live Student Loan Types Article */}
            <Link
              className="path-card card-a"
              to="/blog/student-loan-types"
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className="path-subheader">{t("blog.card3.tag")}</span>
              <h2>{t("blog.card3.title")}</h2>
              <p className="desc">{t("blog.card3.excerpt")}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11.5px",
                    color: "var(--ink-soft)",
                  }}
                >
                  {t("blog.card3.author")}
                </span>
                <span className="path-cta">
                  {t("blog.card3.cta")}
                  <Arrow />
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
