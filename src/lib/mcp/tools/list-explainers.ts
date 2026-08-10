import { defineTool } from "@lovable.dev/mcp-js";
import { EXPLAINERS } from "@/data/explainers";

export default defineTool({
  name: "list_explainers",
  title: "List Loans 101 explainers",
  description:
    "List every Loans 101 explainer on Grad Loan Navigator with its id, topic tag, question and one-line summary.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = EXPLAINERS.map((e) => ({
      id: e.id,
      tag: e.tag,
      title: e.title,
      summary: e.summary,
      url: `/faq/${e.id}`,
    }));
    return {
      content: [{ type: "text" as const, text: JSON.stringify(items, null, 2) }],
      structuredContent: { explainers: items },
    };
  },
});
