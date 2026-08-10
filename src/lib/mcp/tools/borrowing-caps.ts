import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const CAPS = {
  standard: { annual: 20500, lifetime: 100000, label: "Standard graduate program" },
  professional: { annual: 50000, lifetime: 200000, label: "Professional degree (JD, MD, DDS, etc.)" },
} as const;

export default defineTool({
  name: "borrowing_caps",
  title: "Look up federal borrowing caps",
  description:
    "Return the post-Grad PLUS federal annual and lifetime graduate borrowing caps for a degree type, as published on Grad Loan Navigator. Educational information, not financial advice.",
  inputSchema: {
    degreeType: z
      .enum(["standard", "professional"])
      .describe("'standard' for most graduate programs, 'professional' for JD/MD/DDS and similar."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ degreeType }) => {
    const cap = CAPS[degreeType];
    const text =
      `${cap.label}: $${cap.annual.toLocaleString()} per year, ` +
      `$${cap.lifetime.toLocaleString()} lifetime across federal graduate borrowing. ` +
      `Borrowers already in a program before July 1, 2026 may be grandfathered for up to three academic years. ` +
      `Educational information only — confirm figures with your financial aid office.`;
    return {
      content: [{ type: "text" as const, text }],
      structuredContent: {
        degreeType,
        label: cap.label,
        annualCap: cap.annual,
        lifetimeCap: cap.lifetime,
        disclaimer: "Not financial advice. Verify with your school or lender.",
      },
    };
  },
});
