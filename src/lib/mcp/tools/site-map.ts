import { defineTool } from "@lovable.dev/mcp-js";

const PAGES = [
  {
    path: "/",
    title: "Grad Loan Navigator — Life After Grad PLUS",
    description:
      "Home. Guided route with three stations: Understand, Learn, Apply. Includes a multi-step borrowing-position assessment (#quiz).",
    sections: ["understand", "learn", "apply", "quiz"],
  },
  {
    path: "/educational-resources",
    title: "Educational Resources",
    description:
      "Chooser page linking to In-Depth Analysis and the Grad Navigator Blog. Individual explainers live at /faq/<article-slug>.",
    sections: [],
  },

  {
    path: "/apply",
    title: "Apply",
    description: "Coming soon page for the application flow.",
    sections: [],
  },
];

export default defineTool({
  name: "site_map",
  title: "Map the site",
  description:
    "List the pages and in-page section anchors of Grad Loan Navigator so a caller can link visitors to the right place.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(PAGES, null, 2) }],
    structuredContent: { pages: PAGES },
  }),
});
