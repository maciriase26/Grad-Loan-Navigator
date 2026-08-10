import { defineMcp } from "@lovable.dev/mcp-js";
import listExplainersTool from "./tools/list-explainers";
import getExplainerTool from "./tools/get-explainer";
import borrowingCapsTool from "./tools/borrowing-caps";
import siteMapTool from "./tools/site-map";

export default defineMcp({
  name: "mockup-to-code",
  title: "Mockup to Code",
  version: "0.1.0",
  instructions:
    "Tools for Grad Loan Navigator, a public guide to graduate student borrowing after Grad PLUS ended. " +
    "Use `list_explainers` and `get_explainer` for the Loans 101 content, `borrowing_caps` for the federal annual/lifetime caps, " +
    "and `site_map` to point people at the right page or section. All content is educational, not financial advice.",
  tools: [listExplainersTool, getExplainerTool, borrowingCapsTool, siteMapTool],
});
