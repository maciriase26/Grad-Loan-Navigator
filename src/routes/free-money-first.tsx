import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Free Money First: Before You Borrow Graduate Aid Guide — Grad Loan Navigator";
const DESCRIPTION =
  "A 'Before You Borrow' guide walking graduate students through funding they never repay: assistantships, fellowships, grants, scholarships, and employer aid.";
const URL = "https://www.graduationnavigator.com/free-money-first";

export const Route = createFileRoute("/free-money-first")({
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
  component: FreeMoneyFirstPage,
});

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function FreeMoneyFirstPage() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />

      <main className="fmf-page">
        {/* Hero Section */}
        <section className="wrap fmf-hero">
          <div className="fmf-hero-flex">
            <div className="fmf-hero-text">
              <div className="eyebrow">{t("fmf.hero.tag")}</div>
              <h1 className="fmf-title">{t("fmf.hero.title")}</h1>
              <p className="sub fmf-sub">{t("fmf.hero.subtitle")}</p>

              <div className="fmf-meta-bar">
                <span className="fmf-badge-review">
                  <span className="fmf-sym" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  {t("fmf.badge.reviewed")}
                </span>
                <span className="fmf-badge-source">
                  <span className="fmf-sym" aria-hidden="true">◆</span>
                  {t("fmf.badge.verified")}
                </span>
                <span className="fmf-badge-entities">
                  <span className="fmf-sym" aria-hidden="true">§</span>
                  CGS • NSF • StudentAid.gov • IRS § 127 • FTC
                </span>
              </div>
            </div>
            <div className="fmf-hero-media">
              <img
                src="/images/gn-animation-free-money-first.svg"
                width="800"
                height="600"
                alt={t("alt.anim.freeMoneyFirst")}
                loading="lazy"
                className="fmf-hero-animation"
              />
            </div>
          </div>
        </section>

        {/* The $1 : $1.85 Gap Calculator Rule Box */}
        <section className="wrap fmf-rule-section">
          <div className="fmf-rule-card">
            <div className="fmf-rule-header">
              <span className="fmf-rule-tag">{t("fmf.rule.tag")}</span>
              <span className="fmf-rule-calc-ref">Gap Calculator Formula</span>
            </div>
            <h2>{t("fmf.rule.title")}</h2>
            <p>{t("fmf.rule.desc")}</p>
            <div className="fmf-rule-cta-row">
              <a href="#order-of-operations" className="btn-secondary fmf-scroll-btn">
                <span>View Funding Hierarchy ↓</span>
              </a>
              <Link to="/chart-your-path" className="fmf-rule-link">
                <span>Test your numbers in Chart Your Path →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 5-Tier Hierarchy Section (Key Step 01 & 02) */}
        <section className="wrap fmf-tiers-section" id="order-of-operations">
          <div className="fmf-section-header">
            <div className="eyebrow">{t("fmf.order.eyebrow")}</div>
            <h2>{t("fmf.order.title")}</h2>
            <p className="sub">{t("fmf.order.subtitle")}</p>
          </div>

          <div className="fmf-tiers-stack">
            {/* Tier 1 */}
            <article className="fmf-tier-card fmf-tier-1">
              <div className="fmf-tier-sidebar">
                <div className="fmf-tier-num">01</div>
                <div className="fmf-tier-rank">TOP PRIORITY</div>
              </div>
              <div className="fmf-tier-body">
                <div className="fmf-tier-top">
                  <span className="fmf-tier-badge">{t("fmf.tier1.badge")}</span>
                  <span className="fmf-tier-amount">{t("fmf.tier1.amount")}</span>
                </div>
                <h3>{t("fmf.tier1.title")}</h3>
                <div className="fmf-tier-benefit">
                  <span className="fmf-bullet-sym" aria-hidden="true">◆</span>
                  <span>{t("fmf.tier1.benefit")}</span>
                </div>
                <p className="fmf-tier-text">{t("fmf.tier1.desc")}</p>
                <div className="fmf-tier-action">
                  <strong>Action:</strong> {t("fmf.tier1.how")}
                </div>
                <footer className="fmf-tier-footer">
                  <span className="fmf-source-note">
                    <span className="fmf-sym" aria-hidden="true">
                      <CheckIcon />
                    </span>
                    {t("fmf.tier1.source")}
                  </span>
                </footer>
              </div>
            </article>

            {/* Tier 2 */}
            <article className="fmf-tier-card fmf-tier-2">
              <div className="fmf-tier-sidebar">
                <div className="fmf-tier-num">02</div>
                <div className="fmf-tier-rank">MERIT ELITE</div>
              </div>
              <div className="fmf-tier-body">
                <div className="fmf-tier-top">
                  <span className="fmf-tier-badge">{t("fmf.tier2.badge")}</span>
                  <span className="fmf-tier-amount">{t("fmf.tier2.amount")}</span>
                </div>
                <h3>{t("fmf.tier2.title")}</h3>
                <div className="fmf-tier-benefit">
                  <span className="fmf-bullet-sym" aria-hidden="true">◆</span>
                  <span>{t("fmf.tier2.benefit")}</span>
                </div>
                <p className="fmf-tier-text">{t("fmf.tier2.desc")}</p>
                <div className="fmf-tier-programs">
                  <span className="fmf-bullet-sym" aria-hidden="true">•</span>
                  <span>{t("fmf.tier2.examples")}</span>
                </div>
                <div className="fmf-tier-action">
                  <strong>Action:</strong> {t("fmf.tier2.how")}
                </div>
                <footer className="fmf-tier-footer">
                  <span className="fmf-source-note">
                    <span className="fmf-sym" aria-hidden="true">
                      <CheckIcon />
                    </span>
                    {t("fmf.tier2.source")}
                  </span>
                  <a
                    href="https://www.nsfgrfp.org/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="fmf-ext-link"
                  >
                    Open NSF GRFP Portal →
                  </a>
                </footer>
              </div>
            </article>

            {/* Tier 3 */}
            <article className="fmf-tier-card fmf-tier-3">
              <div className="fmf-tier-sidebar">
                <div className="fmf-tier-num">03</div>
                <div className="fmf-tier-rank">NEED-BASED</div>
              </div>
              <div className="fmf-tier-body">
                <div className="fmf-tier-top">
                  <span className="fmf-tier-badge">{t("fmf.tier3.badge")}</span>
                  <span className="fmf-tier-amount">{t("fmf.tier3.amount")}</span>
                </div>
                <h3>{t("fmf.tier3.title")}</h3>
                <div className="fmf-tier-benefit">
                  <span className="fmf-bullet-sym" aria-hidden="true">◆</span>
                  <span>{t("fmf.tier3.benefit")}</span>
                </div>
                <p className="fmf-tier-text">{t("fmf.tier3.desc")}</p>
                <div className="fmf-tier-action">
                  <strong>Action:</strong> {t("fmf.tier3.how")}
                </div>
                <footer className="fmf-tier-footer">
                  <span className="fmf-source-note">
                    <span className="fmf-sym" aria-hidden="true">
                      <CheckIcon />
                    </span>
                    {t("fmf.tier3.source")}
                  </span>
                  <a
                    href="https://studentaid.gov/h/apply-for-aid/fafsa"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="fmf-ext-link"
                  >
                    StudentAid.gov FAFSA →
                  </a>
                </footer>
              </div>
            </article>

            {/* Tier 4 */}
            <article className="fmf-tier-card fmf-tier-4">
              <div className="fmf-tier-sidebar">
                <div className="fmf-tier-num">04</div>
                <div className="fmf-tier-rank">SCHOLARSHIPS</div>
              </div>
              <div className="fmf-tier-body">
                <div className="fmf-tier-top">
                  <span className="fmf-tier-badge">{t("fmf.tier4.badge")}</span>
                  <span className="fmf-tier-amount">{t("fmf.tier4.amount")}</span>
                </div>
                <h3>{t("fmf.tier4.title")}</h3>
                <div className="fmf-tier-benefit">
                  <span className="fmf-bullet-sym" aria-hidden="true">◆</span>
                  <span>{t("fmf.tier4.benefit")}</span>
                </div>
                <p className="fmf-tier-text">{t("fmf.tier4.desc")}</p>
                <div className="fmf-tier-programs">
                  <span className="fmf-bullet-sym" aria-hidden="true">•</span>
                  <span>{t("fmf.tier4.examples")}</span>
                </div>
                <div className="fmf-tier-action">
                  <strong>Action:</strong> {t("fmf.tier4.how")}
                </div>
                <footer className="fmf-tier-footer">
                  <span className="fmf-source-note">
                    <span className="fmf-sym" aria-hidden="true">
                      <CheckIcon />
                    </span>
                    {t("fmf.tier4.source")}
                  </span>
                  <a
                    href="https://www.careeronestop.org/toolkit/training/find-scholarships.aspx"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="fmf-ext-link"
                  >
                    CareerOneStop Finder →
                  </a>
                </footer>
              </div>
            </article>

            {/* Tier 5 */}
            <article className="fmf-tier-card fmf-tier-5">
              <div className="fmf-tier-sidebar">
                <div className="fmf-tier-num">05</div>
                <div className="fmf-tier-rank">WORKPLACE</div>
              </div>
              <div className="fmf-tier-body">
                <div className="fmf-tier-top">
                  <span className="fmf-tier-badge">{t("fmf.tier5.badge")}</span>
                  <span className="fmf-tier-amount">{t("fmf.tier5.amount")}</span>
                </div>
                <h3>{t("fmf.tier5.title")}</h3>
                <div className="fmf-tier-benefit">
                  <span className="fmf-bullet-sym" aria-hidden="true">◆</span>
                  <span>{t("fmf.tier5.benefit")}</span>
                </div>
                <p className="fmf-tier-text">{t("fmf.tier5.desc")}</p>
                <div className="fmf-tier-action">
                  <strong>Action:</strong> {t("fmf.tier5.how")}
                </div>
                <footer className="fmf-tier-footer">
                  <span className="fmf-source-note">
                    <span className="fmf-sym" aria-hidden="true">
                      <CheckIcon />
                    </span>
                    {t("fmf.tier5.source")}
                  </span>
                  <a
                    href="https://www.irs.gov/publications/p970"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="fmf-ext-link"
                  >
                    IRS Pub 970 § 127 Details →
                  </a>
                </footer>
              </div>
            </article>
          </div>
        </section>

        {/* FTC Scam Guidance Warning Box (Key Step 04) */}
        <section className="wrap fmf-scam-section">
          <div className="fmf-scam-card">
            <div className="fmf-scam-header">
              <div className="fmf-scam-badge">
                <span className="fmf-alert-sym" aria-hidden="true">!</span>
                <span>{t("fmf.scam.tag")}</span>
              </div>
              <h2>{t("fmf.scam.title")}</h2>
              <p className="fmf-scam-intro">{t("fmf.scam.desc")}</p>
            </div>

            <div className="fmf-scam-grid">
              <div className="fmf-scam-item">
                <div className="fmf-scam-item-top">
                  <span className="fmf-scam-sym" aria-hidden="true">
                    <CrossIcon />
                  </span>
                  <h4>{t("fmf.scam.flag1.title")}</h4>
                </div>
                <p>{t("fmf.scam.flag1.desc")}</p>
              </div>

              <div className="fmf-scam-item">
                <div className="fmf-scam-item-top">
                  <span className="fmf-scam-sym" aria-hidden="true">
                    <CrossIcon />
                  </span>
                  <h4>{t("fmf.scam.flag2.title")}</h4>
                </div>
                <p>{t("fmf.scam.flag2.desc")}</p>
              </div>

              <div className="fmf-scam-item">
                <div className="fmf-scam-item-top">
                  <span className="fmf-scam-sym" aria-hidden="true">
                    <CrossIcon />
                  </span>
                  <h4>{t("fmf.scam.flag3.title")}</h4>
                </div>
                <p>{t("fmf.scam.flag3.desc")}</p>
              </div>

              <div className="fmf-scam-item">
                <div className="fmf-scam-item-top">
                  <span className="fmf-scam-sym" aria-hidden="true">
                    <CrossIcon />
                  </span>
                  <h4>{t("fmf.scam.flag4.title")}</h4>
                </div>
                <p>{t("fmf.scam.flag4.desc")}</p>
              </div>
            </div>

            <div className="fmf-scam-footer">
              <a
                href="https://consumer.ftc.gov/articles/how-avoid-scholarship-and-financial-aid-scams"
                target="_blank"
                rel="noreferrer noopener"
                className="fmf-scam-link"
              >
                {t("fmf.scam.link")}
              </a>
            </div>
          </div>
        </section>

        {/* Free Tools Only Directory (Key Step 03) */}
        <section className="wrap fmf-tools-section">
          <div className="fmf-section-header">
            <div className="eyebrow">{t("fmf.tools.tag")}</div>
            <h2>{t("fmf.tools.title")}</h2>
            <p className="sub">{t("fmf.tools.desc")}</p>
          </div>

          <div className="fmf-tools-grid">
            {/* Tool 1 */}
            <div className="fmf-tool-card">
              <span className="fmf-tool-agency">{t("fmf.tool1.agency")}</span>
              <h3>{t("fmf.tool1.name")}</h3>
              <p>{t("fmf.tool1.desc")}</p>
              <a
                href="https://www.careeronestop.org/toolkit/training/find-scholarships.aspx"
                target="_blank"
                rel="noreferrer noopener"
                className="fmf-tool-btn"
              >
                {t("fmf.tool1.cta")}
              </a>
            </div>

            {/* Tool 2 */}
            <div className="fmf-tool-card">
              <span className="fmf-tool-agency">{t("fmf.tool2.agency")}</span>
              <h3>{t("fmf.tool2.name")}</h3>
              <p>{t("fmf.tool2.desc")}</p>
              <a
                href="https://www.nsfgrfp.org/"
                target="_blank"
                rel="noreferrer noopener"
                className="fmf-tool-btn"
              >
                {t("fmf.tool2.cta")}
              </a>
            </div>

            {/* Tool 3 */}
            <div className="fmf-tool-card">
              <span className="fmf-tool-agency">{t("fmf.tool3.agency")}</span>
              <h3>{t("fmf.tool3.name")}</h3>
              <p>{t("fmf.tool3.desc")}</p>
              <a
                href="https://studentaid.gov/h/apply-for-aid/fafsa"
                target="_blank"
                rel="noreferrer noopener"
                className="fmf-tool-btn"
              >
                {t("fmf.tool3.cta")}
              </a>
            </div>

            {/* Tool 4 */}
            <div className="fmf-tool-card">
              <span className="fmf-tool-agency">{t("fmf.tool4.agency")}</span>
              <h3>{t("fmf.tool4.name")}</h3>
              <p>{t("fmf.tool4.desc")}</p>
              <a
                href="https://www.irs.gov/publications/p970"
                target="_blank"
                rel="noreferrer noopener"
                className="fmf-tool-btn"
              >
                {t("fmf.tool4.cta")}
              </a>
            </div>
          </div>
        </section>

        {/* Feed the Blog Section (Key Step 06) */}
        <section className="wrap fmf-blog-section">
          <div className="fmf-section-header">
            <div className="eyebrow">{t("fmf.blog.tag")}</div>
            <h2>{t("fmf.blog.title")}</h2>
            <p className="sub">{t("fmf.blog.desc")}</p>
          </div>

          <div className="fmf-blog-grid">
            <Link to="/blog/fafsa-deadlines" className="fmf-blog-card">
              <span className="fmf-blog-card-tag">{t("fmf.blog.card1.tag")}</span>
              <h4>{t("fmf.blog.card1.title")}</h4>
              <p>{t("fmf.blog.card1.desc")}</p>
              <span className="fmf-blog-arrow">Read guide →</span>
            </Link>

            <Link to="/blog/fafsa-explained" className="fmf-blog-card">
              <span className="fmf-blog-card-tag">{t("fmf.blog.card2.tag")}</span>
              <h4>{t("fmf.blog.card2.title")}</h4>
              <p>{t("fmf.blog.card2.desc")}</p>
              <span className="fmf-blog-arrow">Read guide →</span>
            </Link>

            <Link to="/blog/public-vs-private-grad-school" className="fmf-blog-card">
              <span className="fmf-blog-card-tag">{t("fmf.blog.card3.tag")}</span>
              <h4>{t("fmf.blog.card3.title")}</h4>
              <p>{t("fmf.blog.card3.desc")}</p>
              <span className="fmf-blog-arrow">Read guide →</span>
            </Link>

            <Link to="/blog/ohio-state-national-leader-graduate-study" className="fmf-blog-card">
              <span className="fmf-blog-card-tag">{t("fmf.blog.card4.tag")}</span>
              <h4>{t("fmf.blog.card4.title")}</h4>
              <p>{t("fmf.blog.card4.desc")}</p>
              <span className="fmf-blog-arrow">Read spotlight →</span>
            </Link>

            <Link to="/blog/university-of-florida-top-tier-value" className="fmf-blog-card">
              <span className="fmf-blog-card-tag">{t("fmf.blog.card5.tag")}</span>
              <h4>{t("fmf.blog.card5.title")}</h4>
              <p>{t("fmf.blog.card5.desc")}</p>
              <span className="fmf-blog-arrow">Read spotlight →</span>
            </Link>

            <Link to="/blog/clemson-university-the-best-of-both-worlds" className="fmf-blog-card">
              <span className="fmf-blog-card-tag">{t("fmf.blog.card6.tag")}</span>
              <h4>{t("fmf.blog.card6.title")}</h4>
              <p>{t("fmf.blog.card6.desc")}</p>
              <span className="fmf-blog-arrow">Read spotlight →</span>
            </Link>
          </div>
        </section>

        {/* Bridge to Chart Your Path / Gap Calculator (Key Step 05) */}
        <section className="wrap fmf-bridge-section">
          <div className="fmf-bridge-card">
            <span className="fmf-bridge-tag">{t("fmf.bridge.tag")}</span>
            <h2>{t("fmf.bridge.title")}</h2>
            <p>{t("fmf.bridge.desc")}</p>
            <div className="fmf-bridge-actions">
              <Link to="/chart-your-path" className="btn-primary fmf-bridge-btn">
                <span>{t("fmf.bridge.cta")}</span>
              </Link>
              <Link to="/aid-offer-comparison" className="btn-secondary fmf-bridge-sub-btn">
                <span>{t("pfs.card4.tag")} →</span>
              </Link>
              <Link to="/pay-for-school" className="btn-secondary fmf-bridge-sub-btn">
                <span>Return to Pay for School Hub →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
