import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export type FaqArticle = { id: string; title: string; slug: string };

export type FaqCategory = {
  id: string;
  name: string;
  slug: string;
  summary_text: string | null;
  summary_updated_at: string | null;
  articles: FaqArticle[];
};

export const listFaqCategories = createServerFn({ method: "GET" }).handler(
  async (): Promise<FaqCategory[]> => {
    const supabase = publicClient();
    const [{ data: categories }, { data: articles }] = await Promise.all([
      supabase
        .from("categories")
        .select("id, name, slug, summary_text, summary_updated_at, position")
        .order("position"),
      supabase.from("articles").select("id, title, slug, category_id, position").order("position"),
    ]);

    return (categories ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      summary_text: c.summary_text,
      summary_updated_at: c.summary_updated_at,
      articles: (articles ?? [])
        .filter((a) => a.category_id === c.id)
        .map((a) => ({ id: a.id, title: a.title, slug: a.slug })),
    }));
  },
);

export const getFaqArticle = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: article } = await supabase
      .from("articles")
      .select("id, title, slug, content, category_id")
      .eq("slug", data.slug)
      .maybeSingle();
    if (!article) return null;
    const { data: category } = await supabase
      .from("categories")
      .select("name, slug")
      .eq("id", article.category_id)
      .maybeSingle();
    return { ...article, category: category ?? null };
  });
