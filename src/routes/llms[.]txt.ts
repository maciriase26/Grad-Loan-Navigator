import { createFileRoute } from "@tanstack/react-router";

const LLMS_TXT = `# Graduation Navigator

> Graduation Navigator provides evidence-based financial aid calculators, student loan comparison tools, federal borrowing limit tracking, interest rate analysis, and educational resources for undergraduate and graduate students.

## Core Tools & Calculators
- [/chart-your-path](https://www.graduationnavigator.com/chart-your-path): Interactive college loan need calculator, degree aggregate borrowing limit tracker, and personalized financial planning.
- [/pay-for-school](https://www.graduationnavigator.com/pay-for-school): Step-by-step guide to funding higher education through FAFSA, federal loans, grants, and scholarships.
- [/lenders](https://www.graduationnavigator.com/lenders): Vetted index of federal and private student loan providers, rates, terms, and eligibility rules.
- [/manage-loans](https://www.graduationnavigator.com/manage-loans): Debt management guidance, repayment strategy analysis, income-driven repayment information, and loan consolidation resources.
- [/educational-resources](https://www.graduationnavigator.com/educational-resources): Explanations of borrowing terminology, loan types, and interest calculations.

## Articles & Data Analysis
- [/blog/student-loan-interest-by-the-numbers](https://www.graduationnavigator.com/blog/student-loan-interest-by-the-numbers): Quantitative analysis of federal vs. private loan interest accrual and long-term costs.
- [/blog/which-phd-fields-are-worth-it](https://www.graduationnavigator.com/blog/which-phd-fields-are-worth-it): Earnings and debt outcome analysis across Ph.D. fields of study.
- [/blog/which-law-schools-are-worth-it](https://www.graduationnavigator.com/blog/which-law-schools-are-worth-it): Law school debt-to-income ROI analysis.
- [/blog/refinancing-student-loans](https://www.graduationnavigator.com/blog/refinancing-student-loans): When and how to refinance student loans safely.
`;

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () => {
        return new Response(LLMS_TXT, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
            "Access-Control-Allow-Origin": "*",
            "X-Robots-Tag": "all",
          },
        });
      },
    },
  },
});
