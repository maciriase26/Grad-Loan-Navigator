import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { getFaqArticle } from "@/lib/faq.functions";

type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: { name: string; slug: string } | null;
};

export const Route = createFileRoute("/faq/$slug")({
  loader: async ({ params }) => {
    const article = await getFaqArticle({ data: { slug: params.slug } });
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => {
    const article = loaderData as Article | undefined;
    const title = article ? `${article.title} — Grad Loan Navigator` : "Grad Loan Navigator";
    const description = article?.content?.slice(0, 155) ?? "Plain-language graduate loan guidance.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArticlePage,
  errorComponent: () => (
    <>
      <SiteHeader />
      <main className="wrap guide-head">
        <h1>This explainer is unavailable</h1>
        <p className="sub">Please refresh in a moment.</p>
      </main>
      <SiteFooter />
    </>
  ),
  notFoundComponent: () => (
    <>
      <SiteHeader />
      <main className="wrap guide-head">
        <h1>Explainer not found</h1>
        <p className="sub">
          <Link to="/educational-resources">Back to all topics</Link>
        </p>
      </main>
      <SiteFooter />
    </>
  ),
});

function ArticlePage() {
  const article = Route.useLoaderData() as Article;

  return (
    <>
      <SiteHeader />

      <main>
        <section className="wrap guide-head">
          <div className="eyebrow">{article.category?.name ?? "FAQ"}</div>
          <h1>{article.title}</h1>
        </section>

        <section className="wrap article-page">
          {article.content
            .split(/\n{2,}/)
            .filter(Boolean)
            .map((p) => (
              <p key={p.slice(0, 24)}>{p.trim()}</p>
            ))}

          <p className="article-back">
            <Link to="/educational-resources">← Back to all topics</Link>
          </p>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  );
}
