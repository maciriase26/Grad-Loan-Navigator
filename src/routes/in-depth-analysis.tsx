import { useState, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, TopRouteDeco } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ExperianVideoEmbed } from "@/components/ExperianVideoEmbed";
import { buildVideoObjectSchema } from "@/data/experianVideos";
import { EXPERIAN_ARTICLES, type ExperianArticleData } from "@/data/experianArticles";
import { useI18n } from "@/i18n";

const TITLE = "In-Depth Analysis | Grad Navigator";
const DESCRIPTION =
  "Embedded consumer guides, PDF brochures, and curated resources on credit, borrowing, and repayment — powered by Experian.";
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildVideoObjectSchema("ficoFiveFactors")),
      },
    ],
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

function BookOpenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="15"
      height="15"
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function CheckCircleIcon() {
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
      style={{ color: "var(--teal)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function InDepthAnalysis() {
  const { t, lang } = useI18n();
  const isEs = lang === "es";

  // State to track currently opened embedded article (defaulting to the first article)
  const [activeArticleId, setActiveArticleId] = useState<string>("types");
  const [isReaderVisible, setIsReaderVisible] = useState<boolean>(true);
  const readerRef = useRef<HTMLDivElement | null>(null);

  const activeArticle =
    EXPERIAN_ARTICLES.find((a) => a.id === activeArticleId) || EXPERIAN_ARTICLES[0];

  const handleOpenArticle = (articleId: string) => {
    setActiveArticleId(articleId);
    setIsReaderVisible(true);
    setTimeout(() => {
      readerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <>
      <SiteHeader />

      <main>
        {/* Banner Section */}
        <section className="wrap resources-banner">
          <TopRouteDeco variant="banner" />
          <div
            className="eyebrow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>{t("depth.eyebrow")}</span>
            <img
              src="/images/experian-logo.svg"
              alt="Experian"
              style={{ height: "15px", width: "auto", display: "inline-block" }}
            />
          </div>
          <h1>{t("depth.h1")}</h1>
          <p className="sub">{t("depth.sub")}</p>
        </section>

        {/* Consumer Education Resources (PDF Guides & Video) */}
        <section className="wrap depth-section">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "8px",
            }}
          >
            <h2 className="depth-section-title" style={{ margin: 0 }}>
              {t("depth.consumer.title")}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12.5px", color: "var(--ink-soft)" }}>
                {isEs ? "Contenido oficial de" : "Official content from"}
              </span>
              <img
                src="/images/experian-logo.svg"
                alt="Experian"
                style={{ height: "18px", width: "auto" }}
              />
            </div>
          </div>
          <p className="depth-section-desc">{t("depth.consumer.desc")}</p>

          <ExperianVideoEmbed videoKey="ficoFiveFactors" />

          <div className="depth-grid" style={{ marginTop: "28px" }}>
            {/* Brochure 1 */}
            <div className="depth-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <span className="depth-card-tag">{t("depth.pdf1.tag")}</span>
                <img
                  src="/images/experian-logo.svg"
                  alt="Experian"
                  style={{ height: "14px", width: "auto", opacity: 0.8 }}
                />
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <span className="depth-card-tag">{t("depth.pdf2.tag")}</span>
                <img
                  src="/images/experian-logo.svg"
                  alt="Experian"
                  style={{ height: "14px", width: "auto", opacity: 0.8 }}
                />
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <span className="depth-card-tag">{t("depth.pdf3.tag")}</span>
                <img
                  src="/images/experian-logo.svg"
                  alt="Experian"
                  style={{ height: "14px", width: "auto", opacity: 0.8 }}
                />
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <span className="depth-card-tag">{t("depth.pdf4.tag")}</span>
                <img
                  src="/images/experian-logo.svg"
                  alt="Experian"
                  style={{ height: "14px", width: "auto", opacity: 0.8 }}
                />
              </div>
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

        {/* Ask Experian Articles (Embedded Library) */}
        <section className="wrap depth-section" id="experian-articles">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "14px",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                src="/images/experian-logo.svg"
                alt="Experian"
                style={{ height: "28px", width: "auto", display: "block" }}
              />
              <h2 className="depth-section-title" style={{ margin: 0 }}>
                {t("depth.ask.title")}
              </h2>
            </div>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--teal)",
                background: "color-mix(in srgb, var(--teal) 10%, transparent)",
                padding: "4px 12px",
                borderRadius: "6px",
                fontWeight: 600,
              }}
            >
              {isEs ? "✓ Distribuido con Autorización" : "✓ Syndicated with Permission"}
            </div>
          </div>

          <p className="depth-section-desc" style={{ marginBottom: "20px" }}>
            {t("depth.ask.embedNote")}
          </p>

          {/* 4 Article Grid Cards */}
          <div className="depth-grid">
            {EXPERIAN_ARTICLES.map((article) => {
              const isActive = isReaderVisible && activeArticleId === article.id;
              const title = isEs ? article.titleEs : article.titleEn;
              const desc = isEs ? article.descEs : article.descEn;
              const tag = isEs ? article.tagEs : article.tagEn;

              return (
                <div
                  key={article.id}
                  className="depth-card"
                  style={{
                    borderColor: isActive ? "var(--teal)" : undefined,
                    boxShadow: isActive
                      ? "0 0 0 2px color-mix(in srgb, var(--teal) 35%, transparent)"
                      : undefined,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <span className="depth-card-tag">{tag}</span>
                    <img
                      src="/images/experian-logo.svg"
                      alt="Experian"
                      style={{ height: "18px", width: "auto", display: "block" }}
                    />
                  </div>

                  <h3>{title}</h3>
                  <p>{desc}</p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginTop: "auto",
                      paddingTop: "14px",
                      borderTop: "1px solid var(--line)",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleOpenArticle(article.id)}
                      className="depth-card-link"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        fontFamily: "inherit",
                        fontSize: "13.5px",
                        fontWeight: 700,
                        color: "var(--teal)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <BookOpenIcon />
                      <span>{t("depth.reader.readButton")}</span>
                    </button>

                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      style={{
                        fontSize: "12px",
                        color: "var(--ink-soft)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {t("depth.reader.viewOriginal")}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Embedded Article Reader */}
          {isReaderVisible && (
            <div
              ref={readerRef}
              className="syndicated-mockup-wrap"
              style={{
                marginTop: "36px",
                border: "2px solid color-mix(in srgb, var(--teal) 35%, var(--line))",
                boxShadow: "0 12px 32px -8px color-mix(in srgb, var(--ink) 12%, transparent)",
                borderRadius: "14px",
                scrollMarginTop: "90px",
              }}
            >
              {/* Reader Top Brand & Action Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 28px",
                  background: "var(--bg)",
                  borderBottom: "1px solid var(--line)",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img
                    src="/images/experian-logo.svg"
                    alt="Experian"
                    style={{ height: "24px", width: "auto" }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--ink)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {t("depth.reader.badge")}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setIsReaderVisible(false)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "transparent",
                      border: "1px solid var(--line)",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      color: "var(--ink-soft)",
                      cursor: "pointer",
                    }}
                  >
                    <CloseIcon />
                    <span>{t("depth.reader.close")}</span>
                  </button>
                </div>
              </div>

              {/* Tab Selector for all 4 articles */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  padding: "12px 28px",
                  background: "color-mix(in srgb, var(--card) 95%, transparent)",
                  borderBottom: "1px solid var(--line)",
                  overflowX: "auto",
                }}
              >
                {EXPERIAN_ARTICLES.map((article) => {
                  const isSelected = activeArticleId === article.id;
                  const title = isEs ? article.titleEs : article.titleEn;
                  return (
                    <button
                      key={article.id}
                      type="button"
                      onClick={() => setActiveArticleId(article.id)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "1px solid",
                        borderColor: isSelected ? "var(--teal)" : "var(--line)",
                        background: isSelected
                          ? "color-mix(in srgb, var(--teal) 14%, transparent)"
                          : "var(--card)",
                        color: isSelected ? "var(--teal)" : "var(--ink)",
                        whiteSpace: "nowrap",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {title}
                    </button>
                  );
                })}
              </div>

              {/* Article Header Meta */}
              <div className="wrap meta" style={{ padding: "28px 36px 20px" }}>
                <div className="tag">{isEs ? activeArticle.tagEs : activeArticle.tagEn}</div>
                <h1 style={{ margin: "0 0 16px 0", fontSize: "clamp(24px, 3.5vw, 30px)" }}>
                  {isEs ? activeArticle.titleEs : activeArticle.titleEn}
                </h1>

                {/* Syndication Source Callout */}
                <div className="source-block" style={{ margin: "18px 0" }}>
                  <img
                    src="/images/experian-logo.svg"
                    alt="Experian"
                    style={{ height: "20px", width: "auto", flexShrink: 0 }}
                  />
                  <div className="text">
                    <strong>{isEs ? "Fuente: Experian." : "Sourced from Experian."}</strong>{" "}
                    {isEs
                      ? "Esta guía está distribuida con autorización de la biblioteca educativa Ask Experian de Experian."
                      : "This article is syndicated with permission from Experian's Ask Experian resource library."}
                    <a
                      href={activeArticle.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      style={{ marginLeft: "6px", fontWeight: 600 }}
                    >
                      {isEs ? "Ver artículo original en Experian.com →" : "Read the original on Experian.com →"}
                    </a>
                  </div>
                </div>

                <div className="byline">
                  <div
                    className="avatar"
                    style={{
                      background: "color-mix(in srgb, var(--teal) 15%, transparent)",
                      color: "var(--teal)",
                    }}
                  >
                    Exp
                  </div>
                  <span>
                    <strong>{isEs ? activeArticle.authorEs : activeArticle.authorEn}</strong>
                  </span>
                  <span className="dot" />
                  <span>{isEs ? activeArticle.publishDateEs : activeArticle.publishDateEn}</span>
                  <span className="dot" />
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Full Article Body */}
              <article className="syndicated-body" style={{ padding: "28px 36px 36px" }}>
                {/* Quick Answer Box */}
                <div
                  style={{
                    padding: "20px 24px",
                    background: "color-mix(in srgb, var(--teal) 8%, var(--card))",
                    borderRadius: "10px",
                    border: "1px solid color-mix(in srgb, var(--teal) 30%, var(--line))",
                    marginBottom: "32px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    <CheckCircleIcon />
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "16.5px",
                        fontWeight: 700,
                        color: "var(--ink)",
                      }}
                    >
                      {t("depth.reader.quickAnswer")}
                    </h3>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14.5px",
                      lineHeight: "1.65",
                      color: "var(--ink)",
                    }}
                  >
                    {isEs ? activeArticle.quickAnswerEs : activeArticle.quickAnswerEn}
                  </p>
                </div>

                {/* Dynamic Article Sections */}
                {activeArticle.sections.map((section, sIdx) => {
                  const sTitle = isEs ? section.titleEs : section.titleEn;
                  const paras = isEs ? section.paragraphsEs : section.paragraphsEn;
                  const bullets = isEs ? section.bulletsEs : section.bulletsEn;

                  return (
                    <div key={sIdx} style={{ marginBottom: "28px" }}>
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "var(--ink)",
                          margin: "0 0 12px 0",
                        }}
                      >
                        {sTitle}
                      </h2>

                      {paras.map((p, pIdx) => (
                        <p
                          key={pIdx}
                          style={{
                            fontSize: "15px",
                            lineHeight: "1.7",
                            color: "var(--ink-soft)",
                            marginBottom: "14px",
                          }}
                        >
                          {p}
                        </p>
                      ))}

                      {bullets && bullets.length > 0 && (
                        <ul
                          style={{
                            paddingLeft: "22px",
                            margin: "12px 0 18px",
                            fontSize: "14.5px",
                            lineHeight: "1.65",
                            color: "var(--ink)",
                          }}
                        >
                          {bullets.map((b, bIdx) => (
                            <li key={bIdx} style={{ marginBottom: "6px" }}>
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}

                {/* The Bottom Line Summary Box */}
                <div
                  style={{
                    padding: "20px 24px",
                    background: "var(--card)",
                    border: "1px solid var(--line)",
                    borderLeft: "4px solid var(--teal)",
                    borderRadius: "10px",
                    margin: "32px 0 24px",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    {t("depth.reader.bottomLine")}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14.5px",
                      lineHeight: "1.65",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {isEs ? activeArticle.bottomLineEs : activeArticle.bottomLineEn}
                  </p>
                </div>

                {/* End Attribution & Link */}
                <div className="end-attribution">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                      src="/images/experian-logo.svg"
                      alt="Experian"
                      style={{ height: "20px", width: "auto" }}
                    />
                    <span>
                      {isEs
                        ? "Este artículo fue publicado originalmente en el blog Ask Experian y se reproduce con autorización."
                        : "This article originally appeared on Experian's Ask Experian blog and is republished with permission."}
                    </span>
                  </div>
                  <a
                    href={activeArticle.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {isEs ? "Ver artículo original en Experian.com →" : "View the original article on Experian.com →"}
                  </a>
                </div>
              </article>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
