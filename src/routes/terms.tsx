import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";
import { openContactDialog } from "@/components/contact/ContactDialog";

const TITLE = "Terms of Use | Grad Navigator";
const DESCRIPTION =
  "Terms of Use and conditions for accessing and using Grad Navigator tools and resources.";
const URL = "https://www.graduationnavigator.com/terms";

export const Route = createFileRoute("/terms")({
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
  component: TermsPage,
});

function TermsPage() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />

      <main>
        <section className="wrap doc-hero">
          <div className="eyebrow">{t("terms.eyebrow")}</div>
          <h1>{t("terms.h1")}</h1>
          <p className="sub">{t("terms.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("terms.updated")}
          </div>
        </section>

        <div className="wrap doc-content">
          <section className="doc-section">
            <h2>{t("terms.s1.title")}</h2>
            <p className="lead">{t("terms.s1.text")}</p>
          </section>

          <section className="doc-section">
            <h2>{t("terms.s2.title")}</h2>
            <div className="callout">
              <p>
                <strong>Estimates & Projections:</strong> {t("terms.s2.text")}
              </p>
            </div>
          </section>

          <section className="doc-section">
            <h2>{t("terms.s3.title")}</h2>
            <p>{t("terms.s3.text")}</p>
          </section>

          <section className="doc-section">
            <h2>{t("terms.s4.title")}</h2>
            <p>{t("terms.s4.text")}</p>
          </section>

          <section className="doc-section">
            <h2>{t("terms.s5.title")}</h2>
            <p>{t("terms.s5.text")}</p>
          </section>

          <section className="doc-section">
            <h2>{t("terms.s6.title")}</h2>
            <p>{t("terms.s6.text")}</p>
          </section>

          <div className="cta-strip" style={{ marginTop: "40px" }}>
            <div>
              <h2>{t("terms.cta.title")}</h2>
              <p>{t("terms.cta.desc")}</p>
            </div>
            <button type="button" className="btn-primary" onClick={openContactDialog}>
              {t("terms.cta.btn")}
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
