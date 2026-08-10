import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { EXPLAINERS } from "@/data/explainers";

export default defineTool({
  name: "get_explainer",
  title: "Read a Loans 101 explainer",
  description:
    "Return the full text of one Loans 101 explainer by id (grandfather, caps, cosigners, rates, repayment, gap).",
  inputSchema: {
    id: z
      .string()
      .min(1)
      .describe("Explainer id, e.g. 'caps'. Use list_explainers to see the options."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const explainer = EXPLAINERS.find((e) => e.id === id.trim().toLowerCase());
    if (!explainer) {
      throw new ToolError(
        `No explainer with id "${id}". Known ids: ${EXPLAINERS.map((e) => e.id).join(", ")}.`,
      );
    }
    const text = [
      `${explainer.tag} — ${explainer.title}`,
      explainer.summary,
      "",
      ...explainer.body,
      "",
      `Read on the site: /faq/${explainer.id}`,
    ].join("\n");
    return {
      content: [{ type: "text" as const, text }],
      structuredContent: {
        id: explainer.id,
        tag: explainer.tag,
        title: explainer.title,
        summary: explainer.summary,
        body: explainer.body,
        url: `/faq/${explainer.id}`,
      },
    };
  },
});
