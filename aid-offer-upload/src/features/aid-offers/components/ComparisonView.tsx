import { AlertTriangle, Plus, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usd } from "../client";
import type { OfferTotals } from "../calc";
import type { Offer } from "../schema";
import type { AidOffersApi } from "../useAidOffers";

export function ComparisonView({ api }: { api: AidOffersApi }) {
  const { comparison, state, slotsLeft } = api;
  const { rows, smallestGapId, biggestDifference } = comparison;
  const nameOf = (id: string) => rows.find((r) => r.offer.id === id)?.offer.schoolName ?? "";

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Your aid offers</p>
        <h1 className="text-balance text-2xl font-bold md:text-3xl">
          {biggestDifference
            ? `${nameOf(biggestDifference.cheaperId)} costs ${usd(biggestDifference.amount)} less a year than ${nameOf(biggestDifference.pricierId)}`
            : "Your offers, side by side"}
        </h1>
        <p className="max-w-prose text-muted-foreground">
          Net cost is what's left after scholarships, grants and assistantships. Federal Direct Unsubsidized loans can cover part of it.
          The gap is what you'd still need from private loans, savings or family.
        </p>
      </header>

      {/* Phones: swipe between schools. Desktop: columns. */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-4">
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
          <Card key={f.id} className="w-[85vw] shrink-0 snap-start border-red-200 md:w-auto">
            <CardContent className="space-y-3 p-4">
              <p className="flex items-center gap-2 font-semibold text-red-800">
                <AlertTriangle className="size-4" aria-hidden /> Couldn't read {f.fileName}
              </p>
              <p className="text-sm text-muted-foreground">{f.message}</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    api.dismissFailed(f.id);
                    api.goTo("upload");
                  }}
                >
                  Try another file
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    api.dismissFailed(f.id);
                    api.addManual();
                  }}
                >
                  Enter by hand
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {slotsLeft > 0 && (
        <Button variant="outline" onClick={() => api.goTo("upload")}>
          <Plus className="size-4" aria-hidden /> Add another school
        </Button>
      )}

      <p className="text-xs text-muted-foreground">
        Estimates for one school year, based on what your letters show and federal limits for new borrowers. Confirm every number with
        each school's financial aid office. This is not financial advice.
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
  const needsLook = t.toReview + t.missingCostLines;
  const hasGradPlus = offer.loans.some((l) => l.type === "grad_plus");

  return (
    <Card className={`w-[85vw] shrink-0 snap-start md:w-auto ${smallest ? "border-emerald-600 ring-1 ring-emerald-600" : ""}`}>
      <CardContent className="space-y-4 p-4">
        <div className="space-y-1">
          {smallest && (
            <Badge className="bg-emerald-700">
              <Trophy className="size-3" aria-hidden /> Smallest gap
            </Badge>
          )}
          <h2 className="text-lg font-bold leading-tight">{offer.schoolName || "Untitled school"}</h2>
          <p className="text-sm text-muted-foreground">
            {[offer.programName, offer.academicYear].filter(Boolean).join(" · ") || " "}
          </p>
        </div>

        <dl className="space-y-1 text-sm">
          <Row label="Cost of attendance" value={usd(t.coa)} />
          <Row label="Scholarships and grants" value={t.freeMoney ? `−${usd(t.freeMoney).slice(1)}` : "$0"} />
          {t.work > 0 && <Row label="Assistantships and work" value={`−${usd(t.work).slice(1)}`} />}
          <Row label="Net cost" value={usd(t.netCost)} strong />
          <Row label="Federal loans can cover" value={usd(t.federalCoverage)} hint={`Limit ${usd(t.federalLimit)}/yr`} />
          <Row label="Gap to fill" value={usd(t.gap)} strong accent />
        </dl>

        {t.livingCostsMissing && (
          <Flag>This letter doesn't list living costs, so its real cost is likely higher. Add them in Review.</Flag>
        )}
        {hasGradPlus && <Flag>Lists a Grad PLUS loan, which is closed to new borrowers.</Flag>}
        {needsLook > 0 && (
          <Flag>
            {needsLook} {needsLook === 1 ? "number needs" : "numbers need"} a quick check.
          </Flag>
        )}

        {offer.loans.length > 0 && (
          <details className="text-sm">
            <summary className="cursor-pointer font-medium">Loans on the letter ({usd(t.loansListed)})</summary>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              {offer.loans.map((l) => (
                <li key={l.id} className="flex justify-between gap-2">
                  <span className="min-w-0">
                    {l.label}
                    {l.type === "grad_plus" && <Badge variant="outline" className="ml-1">Closed</Badge>}
                  </span>
                  <span className="shrink-0">{usd(l.amount)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-1 text-xs text-muted-foreground">Shown for reference. Loans don't lower your cost.</p>
          </details>
        )}

        <div className="flex gap-2">
          <Button size="sm" variant={needsLook ? "default" : "outline"} onClick={onReview}>
            {needsLook ? "Review numbers" : "See details"}
          </Button>
          <Button size="sm" variant="ghost" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value, strong, accent, hint }: { label: string; value: string; strong?: boolean; accent?: boolean; hint?: string }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 ${strong ? "border-t pt-1 font-semibold" : ""}`}>
      <dt>
        {label}
        {hint && <span className="block text-xs font-normal text-muted-foreground">{hint}</span>}
      </dt>
      <dd className={`tabular-nums ${accent ? "text-lg text-emerald-800" : ""}`}>{value}</dd>
    </div>
  );
}

function Flag({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-md bg-amber-50 p-2 text-xs text-amber-900">
      <AlertTriangle className="mt-0.5 size-3 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
