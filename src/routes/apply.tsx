import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import gradbridgeLogo from "@/assets/GradBridge_logo.png"; 
import brighterFutures from "@/assets/brighter_futures.png";
import { useI18n } from "@/i18n";

const TITLE = "Apply — Grad Loan Navigator";
const DESCRIPTION =
  "Applications open soon. Grad Loan Navigator will guide you from your borrowing cap to a completed grad loan application.";
const URL = "https://graduationnavigator.com/apply";

export const Route = createFileRoute("/apply")({
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
    links: [
      { rel: "canonical", href: URL },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const { t } = useI18n();
  return (
    <>
      <SiteHeader />

      <main className="wrap apply-page">
        <div className="apply-gradbridge">
          <div className="gb-logo">
            <img
              src={gradbridgeLogo}
              alt="GradBridge"
              loading="eager"
            />
          </div>
          <h1>
            {t("apply.headline")}
            <img
              className="gb-script"
              src={brighterFutures}
              alt={t("apply.headline.alt")}
              loading="eager"
            />
          </h1>
          <p>{t("apply.body")}</p>
          <a
            className="gb-cta"
            href="https://www.campusdoor.com/gradbridge/qualify.aspx"
            target="_blank"
            rel="noopener"
          >
            {t("apply.cta")}
          </a>
        </div>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}