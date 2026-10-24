import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";
import { openContactDialog } from "@/components/contact/ContactDialog";

const TITLE = "Privacy Policy | Grad Navigator";
const DESCRIPTION =
  "Learn how Grad Navigator handles your data, respects your privacy, and safeguards your personal information.";
const URL = "https://www.graduationnavigator.com/privacy";

export const Route = createFileRoute("/privacy")({
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
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />

      <main>
        <section className="wrap doc-hero">
          <div className="eyebrow">{t("privacy.eyebrow")}</div>
          <h1>{t("privacy.h1")}</h1>
          <p className="sub">{t("privacy.sub")}</p>
          <div className="updated">
            <span className="dot" />
            {t("privacy.updated")}
          </div>
        </section>

        <div className="wrap doc-content">
          <section className="doc-section">
            <h2>{t("privacy.s1.title")}</h2>
            <p className="lead">{t("privacy.s1.text")}</p>
          </section>

          <section className="doc-section">
            <h2>{t("privacy.s2.title")}</h2>
            <div className="callout">
              <p>
                <strong>Client-Side Processing:</strong> {t("privacy.s2.text")}
              </p>
            </div>
          </section>

          <section className="doc-section">
            <h2>{t("privacy.s3.title")}</h2>
            <p>{t("privacy.s3.text")}</p>
            <p className="lead" style={{ marginTop: "12px", fontWeight: 600 }}>
              {t("privacy.s3.subtext")}
            </p>
          </section>

          <section className="doc-section">
            <h2>{t("privacy.s4.title")}</h2>
            <p>{t("privacy.s4.text")}</p>
          </section>

          <section className="doc-section">
            <h2>{t("privacy.s5.title")}</h2>
            <p>{t("privacy.s5.text")}</p>
          </section>

          <section className="doc-section">
            <h2>{t("privacy.s6.title")}</h2>
            <p>{t("privacy.s6.text")}</p>
          </section>

          <div className="cta-strip" style={{ marginTop: "40px" }}>
            <div>
              <h2>{t("privacy.cta.title")}</h2>
              <p>{t("privacy.cta.desc")}</p>
            </div>
            <button type="button" className="btn-primary" onClick={openContactDialog}>
              {t("privacy.cta.btn")}
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
