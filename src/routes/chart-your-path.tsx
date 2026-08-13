import { createFileRoute } from "@tanstack/react-router";
import { Index } from "./index";

const TITLE = "Chart Your Path — Grad Loan Navigator";
const DESCRIPTION = "Check what your degree could mean and explore the next steps in your borrowing plan.";
const URL = "https://graduationnavigator.com/chart-your-path";

export const Route = createFileRoute("/chart-your-path")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ChartYourPathPage,
});

function ChartYourPathPage() {
  return <Index />;
}
