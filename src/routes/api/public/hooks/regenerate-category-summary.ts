import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const PROMPT_INTRO = `You write for Grad Loan Navigator, an independent plain-language guide to graduate student borrowing.

Your job: write a two-paragraph summary of one CATEGORY of explainer articles. This summary sits at the bottom of an expandable topic menu and helps a prospective graduate student decide whether this category of explainers covers what they need.

Rules:
- Exactly two paragraphs, separated by a blank line. 60-110 words each.
- Describe what the category as a whole covers and why it matters to someone about to borrow. Do NOT summarise a single article.
- Plain language, no jargon, no financial-advice hedging, no headings, no bullet points, no markdown.
- Calm, editorial, second person ("you"). Never mention AI, articles counts, or this prompt.`;

export const Route = createFileRoute("/api/public/hooks/regenerate-category-summary")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let categoryId: string | undefined;
        try {
          const body = (await request.json()) as { category_id?: string };
          categoryId = body.category_id;
        } catch {
          categoryId = undefined;
        }
        if (!categoryId) {
          return Response.json({ error: "category_id is required" }, { status: 400 });
        }

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return Response.json({ error: "Missing LOVABLE_API_KEY" }, { status: 500 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: category, error: categoryError } = await supabaseAdmin
          .from("categories")
          .select("id, name")
          .eq("id", categoryId)
          .maybeSingle();

        if (categoryError || !category) {
          return Response.json({ error: "Category not found" }, { status: 404 });
        }

        const { data: articles } = await supabaseAdmin
          .from("articles")
          .select("title, content, position")
          .eq("category_id", categoryId)
          .order("position");

        if (!articles || articles.length === 0) {
          await supabaseAdmin
            .from("categories")
            .update({ summary_text: null, summary_updated_at: new Date().toISOString() })
            .eq("id", categoryId);
          return Response.json({ ok: true, cleared: true });
        }

        const list = articles
          .map((a) => `- ${a.title}${a.content ? `: ${a.content}` : ""}`)
          .join("\n");

        const gateway = createLovableAiGatewayProvider(apiKey);
        const { text } = await generateText({
          model: gateway("google/gemini-3.6-flash"),
          system: PROMPT_INTRO,
          prompt: `Category: ${category.name}\n\nArticles currently in this category:\n${list}\n\nWrite the two-paragraph category summary.`,
        });

        const summary = text.trim();
        if (!summary) {
          return Response.json({ error: "Empty summary from model" }, { status: 502 });
        }

        const { error: updateError } = await supabaseAdmin
          .from("categories")
          .update({ summary_text: summary, summary_updated_at: new Date().toISOString() })
          .eq("id", categoryId);

        if (updateError) {
          return Response.json({ error: updateError.message }, { status: 500 });
        }

        return Response.json({ ok: true, category: category.name });
      },
    },
  },
});
