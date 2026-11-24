import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Calculator } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { AidOfferComparisonTool } from "@/components/calculator/AidOfferComparisonTool";
import { AidOfferUpload } from "@/features/aid-offers";
import { useI18n } from "@/i18n";

const TITLE = "Aid Offer Comparison: Compare Real Graduate School Costs | Grad Navigator";
const DESCRIPTION =
  "Compare financial aid offers from up to 4 graduate schools side-by-side. Separate loans masquerading as aid, compare real net prices and graduation debt, and export a free browser PDF.";
const URL = "https://www.graduationnavigator.com/aid-offer-comparison";

export const Route = createFileRoute("/aid-offer-comparison")({
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
  component: AidOfferComparisonPage,
});

function AidOfferComparisonPage() {
  const [activeTab, setActiveTab] = useState<"ai" | "manual">("ai");
  const { t } = useI18n();

  return (
    <>
      <SiteHeader />
      <main>
        <div className="wrap" style={{ paddingTop: "24px", paddingBottom: "56px" }}>
          {/* Mode Switcher Tabs styled to match Grad Navigator design system */}
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex rounded-lg p-1 border shadow-xs"
              style={{
                background: "var(--card-paper)",
                borderColor: "var(--line)",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("ai")}
                className={`flex items-center gap-2 rounded-md px-4 sm:px-6 py-2 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "ai"
                    ? "bg-white shadow-xs"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
                style={{
                  fontFamily: "var(--font-sans)",
                  color: activeTab === "ai" ? "var(--ink)" : "var(--ink-soft)",
                  border: activeTab === "ai" ? "1px solid var(--line)" : "1px solid transparent",
                }}
              >
                <Sparkles className="size-4" style={{ color: "var(--teal)" }} />
                <span>{t("aoc.tab.aiScanner")}</span>
                <span
                  className="hidden sm:inline-block rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "color-mix(in oklch, var(--teal) 14%, transparent)",
                    color: "var(--teal)",
                  }}
                >
                  {t("aoc.tab.aiBadge")}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("manual")}
                className={`flex items-center gap-2 rounded-md px-4 sm:px-6 py-2 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "manual"
                    ? "bg-white shadow-xs"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
                style={{
                  fontFamily: "var(--font-sans)",
                  color: activeTab === "manual" ? "var(--ink)" : "var(--ink-soft)",
                  border: activeTab === "manual" ? "1px solid var(--line)" : "1px solid transparent",
                }}
              >
                <Calculator className="size-4" style={{ color: "var(--ink-soft)" }} />
                <span>{t("aoc.tab.manualCalc")}</span>
              </button>
            </div>
          </div>

          {activeTab === "ai" ? <AidOfferUpload /> : <AidOfferComparisonTool />}
        </div>
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}
