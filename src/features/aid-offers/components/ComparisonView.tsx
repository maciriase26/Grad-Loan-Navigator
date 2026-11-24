import { AlertTriangle, Plus, Sparkles, Trophy } from "lucide-react";
import { useI18n } from "@/i18n";
import { usd } from "../client";
import type { OfferTotals } from "../calc";
import type { Offer } from "../schema";
import type { AidOffersApi } from "../useAidOffers";

export function ComparisonView({ api }: { api: AidOffersApi }) {
  const { t } = useI18n();
  const { comparison, state, slotsLeft } = api;
  const { rows, smallestGapId, biggestDifference } = comparison;
  const nameOf = (id: string) => rows.find((r) => r.offer.id === id)?.offer.schoolName ?? "";

  const title = biggestDifference
    ? t("aoc.ai.resultsCostsLess")
      .replace("{school1}", nameOf(biggestDifference.cheaperId))
      .replace("{amount}", usd(biggestDifference.amount))
      .replace("{school2}", nameOf(biggestDifference.pricierId))
    : t("aoc.ai.resultsDefaultTitle");

  return (
      <section className="aoc-tool-wrapper space-y-6" style={{ fontFamily: "var(--font-sans)" }}>
        {/* Header */}
        <header className="space-y-2">
            <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Sparkles className="size-3.5" aria-hidden />
              {t("aoc.ai.eyebrowResults")}
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink)",
                fontSize: "clamp(26px, 3.5vw, 36px)",
                fontWeight: 700,
                lineHeight: 1.15,
                margin: "0 0 10px",
              }}
            >
              {title}
            </h1>
            <p className="sub" style={{ color: "var(--ink-soft)", fontSize: "15px", maxWidth: "780px" }}>
              {t("aoc.ai.resultsNetCostExpl")}
            </p>
        </header>

          {/* Cards Grid: swipe on mobile, 2-4 columns on desktop */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-4">
            {rows.map(({ offer, totals }) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                totals={totals}
                smallest={offer.id === smallestGapId}
                onReview={() => api.openReview(offer.id)}
                onRemove={() => api.removeOffer(offer.id)}
              />
            ))}

            {state.failed.map((f) => (
          <div
            key={f.id}
            className="w-[85vw] shrink-0 snap-start rounded-[10px] p-5 shadow-xs md:w-auto space-y-3"
            style={{
              background: "#fff9f9",
              border: "1px solid #fed7d7",
            }}
          >
            <p className="flex items-center gap-2 font-bold text-red-800 text-sm">
              <AlertTriangle className="size-4 text-red-600" aria-hidden />
              {t("aoc.ai.couldNotReadFile").replace("{fileName}", f.fileName)}
            </p>
            <p className="text-xs text-[var(--ink-soft)] leading-relaxed">{f.message}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  api.dismissFailed(f.id);
                  api.goTo("upload");
                }}
                className="btn-secondary text-xs px-3 py-1.5 rounded-[5px] font-semibold cursor-pointer"
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--line)",
                  color: "var(--ink)",
                }}
              >
                {t("aoc.ai.btnTryAnother")}
              </button>
              <button
                type="button"
                onClick={() => {
                  api.dismissFailed(f.id);
                  api.addManual();
                }}
                className="btn-secondary text-xs px-3 py-1.5 rounded-[5px] font-semibold cursor-pointer"
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--line)",
                  color: "var(--ink)",
                }}
              >
                {t("aoc.ai.btnEnterByHand")}
              </button>
            </div>
          </div>
            ))}
          </div>

          {slotsLeft > 0 && (
        <button
          type="button"
          onClick={() => api.goTo("upload")}
          className="btn-secondary flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-[6px] cursor-pointer"
          style={{
            background: "var(--card-paper)",
            border: "1px solid var(--line)",
            color: "var(--ink)",
          }}
        >
          <Plus className="size-4" style={{ color: "var(--teal)" }} aria-hidden />
          <span>{t("aoc.ai.btnAddAnotherSchool")}</span>
        </button>
          )}

            <p className="text-xs leading-relaxed" style={{ color: "var(--ink-soft)", fontFamily: "var(--font-sans)" }}>
              {t("aoc.ai.disclaimer")}
            </p>
          </section>
          );
}

          function OfferCard({
            offer,
            totals: t,
          smallest,
          onReview,
          onRemove,
}: {
            offer: Offer;
          totals: OfferTotals;
          smallest: boolean;
  onReview: () => void;
  onRemove: () => void;
}) {
  const {t: translate } = useI18n();
          const needsLook = t.toReview + t.missingCostLines;
  const hasGradPlus = offer.loans.some((l) => l.type === "grad_plus");

          return (
                <div
                  className="aoc-school-card w-[85vw] shrink-0 snap-start md:w-auto relative"
                  style={{
                    borderColor: smallest ? "var(--teal)" : "var(--line)",
                    borderWidth: smallest ? "2px" : "1px",
                  }}
                >
                  {smallest && (
                    <div className="absolute -top-3 left-4">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs text-white"
                        style={{
                          fontFamily: "var(--font-mono)",
                          background: "var(--teal)",
                        }}
                      >
                        <Trophy className="size-3" aria-hidden /> {translate("aoc.ai.smallestGap")}
                      </span>
                    </div>
                  )}

                  {/* Card Header */}
                  <div className="aoc-card-header">
                    <div className="aoc-school-top-row">
                      <h2
                        className="text-lg font-bold leading-tight"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--ink)",
                        }}
                      >
                        {offer.schoolName || "Untitled school"}
                      </h2>
                      <button
                        type="button"
                        className="aoc-remove-btn"
                        onClick={onRemove}
                        aria-label={translate("aoc.ai.btnRemove")}
                      >
                        {translate("aoc.ai.btnRemove")}
                      </button>
                    </div>
                    <p className="text-xs text-[var(--ink-soft)]" style={{ fontFamily: "var(--font-mono)" }}>
                      {[offer.programName, offer.academicYear].filter(Boolean).join(" · ") || " "}
                    </p>
                  </div>

                  {/* Metrics List */}
                  <dl className="space-y-2 text-sm pt-1">
                    <MetricRow label={translate("aoc.ai.coa")} value={usd(t.coa)} />
                    <MetricRow label={translate("aoc.ai.scholarships")} value={t.freeMoney ? `−${usd(t.freeMoney).slice(1)}` : "$0"} />
                    {t.work > 0 && <MetricRow label={translate("aoc.ai.work")} value={`−${usd(t.work).slice(1)}`} />}
                    <MetricRow label={translate("aoc.ai.netCost")} value={usd(t.netCost)} strong />
                    <MetricRow
                      label={translate("aoc.ai.federalCoverage")}
                      value={usd(t.federalCoverage)}
                      hint={translate("aoc.ai.federalLimitHint").replace("{amount}", usd(t.federalLimit))}
                    />
                    <MetricRow label={translate("aoc.ai.gapToFill")} value={usd(t.gap)} strong accent />
                  </dl>

                  {/* Warning Flags */}
                  {t.livingCostsMissing && (
                    <FlagNotice>{translate("aoc.ai.livingCostsMissing")}</FlagNotice>
                  )}
                  {hasGradPlus && <FlagNotice>{translate("aoc.ai.gradPlusWarning")}</FlagNotice>}
                  {needsLook > 0 && (
                    <FlagNotice>
                      {needsLook === 1
                        ? translate("aoc.ai.numberNeedsCheck")
                        : translate("aoc.ai.numbersNeedCheck").replace("{count}", String(needsLook))}
                    </FlagNotice>
                  )}

                      {/* Loan Details Accordion */}
                      {offer.loans.length > 0 && (
                        <details className="text-xs border-t border-[var(--line)] pt-2.5">
                          <summary
                            className="cursor-pointer font-semibold"
                            style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}
                          >
                {translate("aoc.ai.loansOnLetter").replace("{amount}", usd(t.loansListed))}
              </summary>
              <ul className="mt-2 space-y-1.5 text-[var(--ink-soft)]">
                {offer.loans.map((l) => (
                  <li key={l.id} className="flex justify-between gap-2">
                    <span className="min-w-0">
                      {l.label}
                      {l.type === "grad_plus" && (
                        <span
                          className="ml-1 px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider"
                          style={{
                            background: "#fff0f0",
                            color: "#c53030",
                            border: "1px solid #feb2b2",
                          }}
                        >
                          {translate("aoc.ai.closed")}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 font-medium font-mono text-[var(--ink)]">{usd(l.amount)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-1.5 text-[11px] text-[var(--ink-soft)] italic">{translate("aoc.ai.loansNotice")}</p>
            </details>
      )}

            {/* Card Actions */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onReview}
                className="btn-primary w-full text-center"
                style={{
                  background: needsLook ? "var(--teal)" : "var(--ink)",
                  color: "#ffffff",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                }}
              >
                {needsLook ? translate("aoc.ai.btnReview") : translate("aoc.ai.btnDetails")}
              </button>
            </div>
        </div>
        );
}

          function MetricRow({
            label,
            value,
            strong,
            accent,
            hint,
          }: {
            label: string;
            value: string;
            strong?: boolean;
            accent?: boolean;
            hint?: string;
          }) {
            return (
                  <div
                    className={`flex items-baseline justify-between gap-3 ${strong ? "border-t border-[var(--line)] pt-1.5 font-bold" : ""
                      }`}
                  >
                    <dt className="text-xs sm:text-sm text-[var(--ink-soft)] font-normal">
                      {label}
                      {hint && <span className="block text-[11px] text-[var(--ink-soft)] opacity-80">{hint}</span>}
                    </dt>
                    <dd
                      className="tabular-nums"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: accent ? "var(--teal)" : "var(--ink)",
                        fontSize: accent ? "16px" : strong ? "14px" : "13.5px",
                        fontWeight: strong || accent ? 700 : 500,
                      }}
                    >
                      {value}
                    </dd>
                  </div>
                  );
}

                    function FlagNotice({ children }: { children: React.ReactNode }) {
                      return (
                          <p
                            className="flex items-start gap-2 rounded-md p-2 text-xs"
                            style={{
                              background: "#fffaf0",
                              border: "1px solid #feebc8",
                              color: "#7b341e",
                            }}
                          >
                            <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-600" aria-hidden />
                            <span>{children}</span>
                          </p>
                          );
}
