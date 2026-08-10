import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useI18n } from "@/i18n";

const TITLE = "Blog — Grad Loan Navigator";
const DESCRIPTION =
  "Short, plain-language posts about graduate borrowing, written by students for students.";
const URL = "https://graduationnavigator.com/blog";

export const Route = createFileRoute("/blog")({
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
  component: Blog,
});

function Blog() {
  const { t } = useI18n();
  return (
    <>
      <SiteHeader />
      <main>
        <section className="wrap resources-banner">
          <h1>{t("blog.h1")}</h1>
          <p className="sub">{t("blog.sub")}</p>
        </section>
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}
