import { COA_KEYS, FEDERAL_LIMITS, LIVING_COST_KEYS } from "./config";
import type { Offer } from "./schema";

export interface OfferTotals {
  /** Cost of attendance for one year. */
  coa: number;
  /** Scholarships, grants, waivers. */
  freeMoney: number;
  /** Assistantships and work-study. */
  work: number;
  /** What the student still has to cover: COA minus free money and work. */
  netCost: number;
  /** Federal Direct Unsubsidized limit that applies to this program. */
  federalLimit: number;
  /** How much of the net cost federal Direct Unsubsidized loans can cover. */
  federalCoverage: number;
  /** What's left after federal loans. Usually private loans, savings or family help. */
  gap: number;
  /** Loans printed on the letter. Shown for reference; never reduces the gap. */
  loansListed: number;
  livingCostsMissing: boolean;
  /** Numbers read with low confidence that the student hasn't checked yet. */
  toReview: number;
  /** Cost lines with no amount that the student hasn't confirmed. */
  missingCostLines: number;
}

export interface TotalsOptions {
  /**
   * Federal Direct loans the student has already borrowed toward the aggregate cap.
   * Optional; leave undefined until the tool asks for it.
   */
  priorFederalBorrowing?: number;
}

const sum = (xs: { amount: number | null }[]) => xs.reduce((s, x) => s + (x.amount ?? 0), 0);

export function totals(o: Offer, opts: TotalsOptions = {}): OfferTotals {
  const coa = COA_KEYS.reduce((s, k) => s + (o.coa[k].amount ?? 0), 0);
  const freeMoney = sum(o.freeMoney);
  const work = sum(o.work);
  const netCost = Math.max(coa - freeMoney - work, 0);

  const annual = FEDERAL_LIMITS.annualUnsubsidized[o.programLevel];
  const aggregateLeft =
    opts.priorFederalBorrowing != null
      ? Math.max(FEDERAL_LIMITS.aggregate[o.programLevel] - opts.priorFederalBorrowing, 0)
      : Infinity;
  const federalLimit = Math.min(annual, aggregateLeft);
  const federalCoverage = Math.min(federalLimit, netCost);
  const gap = Math.max(netCost - federalCoverage, 0);

  const toReview =
    COA_KEYS.filter((k) => o.coa[k].confidence === "low" && !o.coa[k].checked && o.coa[k].amount != null).length +
    [...o.freeMoney, ...o.work, ...o.loans].filter((x) => x.confidence === "low" && !x.checked).length;

  const missingCostLines = COA_KEYS.filter((k) => o.coa[k].amount == null && !o.coa[k].checked).length;
  const livingCostsMissing = LIVING_COST_KEYS.some((k) => o.coa[k].amount == null);

  return {
    coa,
    freeMoney,
    work,
    netCost,
    federalLimit,
    federalCoverage,
    gap,
    loansListed: sum(o.loans),
    livingCostsMissing,
    toReview,
    missingCostLines,
  };
}

export interface Comparison {
  rows: { offer: Offer; totals: OfferTotals }[];
  /** Offer with the smallest gap among complete offers, or null. */
  smallestGapId: string | null;
  /** Largest difference in net cost between two schools, for the headline. */
  biggestDifference: { cheaperId: string; pricierId: string; amount: number } | null;
}

/**
 * An offer can win "Smallest gap" only if its living costs are present.
 * Otherwise an incomplete letter would look like the best deal.
 */
export function compare(offers: Offer[], opts: TotalsOptions = {}): Comparison {
  const rows = offers.map((offer) => ({ offer, totals: totals(offer, opts) }));
  const eligible = rows.filter((r) => !r.totals.livingCostsMissing && r.totals.coa > 0);

  let smallestGapId: string | null = null;
  if (eligible.length >= 2) {
    const best = [...eligible].sort((a, b) => a.totals.gap - b.totals.gap || a.totals.netCost - b.totals.netCost)[0];
    const tied = eligible.filter((r) => r.totals.gap === best.totals.gap && r.totals.netCost === best.totals.netCost);
    smallestGapId = tied.length === 1 ? best.offer.id : null;
  }

  let biggestDifference: Comparison["biggestDifference"] = null;
  if (eligible.length >= 2) {
    const byNet = [...eligible].sort((a, b) => a.totals.netCost - b.totals.netCost);
    const cheaper = byNet[0];
    const pricier = byNet[byNet.length - 1];
    const amount = pricier.totals.netCost - cheaper.totals.netCost;
    if (amount > 0) biggestDifference = { cheaperId: cheaper.offer.id, pricierId: pricier.offer.id, amount };
  }

  return { rows, smallestGapId, biggestDifference };
}
