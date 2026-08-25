import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";
import { openContactDialog } from "@/components/contact/ContactDialog";

const TITLE = "Editorial Standards & Disclosure Policy — Grad Loan Navigator";
const DESCRIPTION =
  "How we decide what to publish, how we choose which lenders to show you, and exactly how we get paid.";
const URL = "https://www.graduationnavigator.com/editorial-standards";

export const Route = createFileRoute("/editorial-standards")({
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
  component: EditorialStandards,
});

function EditorialStandards() {
  const { t } = useI18n();
  return (
    <>
      <SiteHeader />

      <main>
        <section className="wrap doc-hero">
          <div className="eyebrow">{t("ed.eyebrow")}</div>
          <h1>{t("ed.h1")}</h1>
          <p className="sub">{t("ed.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("ed.updated")}
          </div>
        </section>

        <div className="wrap pagenav">
          <a href="#editorial">{t("ed.nav.editorial")}</a>
          <a href="#disclosure">{t("ed.nav.disclosure")}</a>
        </div>

        <div className="wrap doc-content">
          <section className="doc-section" id="editorial">
            <span className="section-num">{t("ed.part1")}</span>
            <h2>{t("ed.p1.h2")}</h2>
            <p className="lead">{t("ed.p1.lead")}</p>

            <div className="subblock">
              <h3>{t("ed.review.h3")}</h3>
              <p>{t("ed.review.p")}</p>
              <div className="team-row">
                <div className="team-card">
                  <div className="role">{t("ed.team1.role")}</div>
                  <h4>{t("ed.team.name")}</h4>
                  <p>{t("ed.team1.p")}</p>
                </div>
                <div className="team-card">
                  <div className="role">{t("ed.team2.role")}</div>
                  <h4>{t("ed.team.name")}</h4>
                  <p>{t("ed.team2.p")}</p>
                </div>
              </div>
            </div>

            <div className="subblock">
              <h3>{t("ed.sourcing.h3")}</h3>
              <p>{t("ed.sourcing.p")}</p>
            </div>

            <div className="subblock">
              <h3>{t("ed.current.h3")}</h3>
              <p>{t("ed.current.p")}</p>
            </div>

            <div className="subblock">
              <h3>{t("ed.corrections.h3")}</h3>
              <p>{t("ed.corrections.p1")}</p>
              <p>
                {t("ed.corrections.p2.pre")}
                <button type="button" className="doc-link foot-link-btn" onClick={openContactDialog}>
                  {t("ed.corrections.link")}
                </button>
                {t("ed.corrections.p2.post")}
              </p>
            </div>

            <div className="subblock">
              <h3>{t("ed.independence.h3")}</h3>
              <p>{t("ed.independence.p")}</p>
            </div>
          </section>

          <section className="doc-section" id="disclosure">
            <span className="section-num">{t("ed.part2")}</span>
            <h2>{t("ed.p2.h2")}</h2>
            <p className="lead">{t("ed.p2.lead")}</p>

            <div className="callout">
              <p>
                <strong>{t("ed.callout.strong")}</strong>
                {t("ed.callout.p")}
              </p>
            </div>

            <div className="subblock">
              <h3>{t("ed.earn.h3")}</h3>
              <p>{t("ed.earn.p")}</p>
            </div>

            <div className="subblock">
              <h3>{t("ed.choose.h3")}</h3>
              <p>{t("ed.choose.p")}</p>
              <ul>
                <li>{t("ed.choose.li1")}</li>
                <li>{t("ed.choose.li2")}</li>
                <li>{t("ed.choose.li3")}</li>
              </ul>
            </div>

            <div className="subblock">
              <h3>{t("ed.nochange.h3")}</h3>
              <p>{t("ed.nochange.p")}</p>
            </div>

            <div className="subblock">
              <h3>{t("ed.ads.h3")}</h3>
              <p>{t("ed.ads.p")}</p>
            </div>
          </section>

          <div className="cta-strip">
            <div>
              <h2>{t("ed.cta.h2")}</h2>
              <p>{t("ed.cta.p")}</p>
            </div>
            <button type="button" className="btn-primary" onClick={openContactDialog}>
              {t("ed.cta.btn")}
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
