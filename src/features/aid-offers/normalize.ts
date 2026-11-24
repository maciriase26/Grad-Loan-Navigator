import {
  AID_OFFER_CONFIG,
  COA_KEYS,
  FEDERAL_LIMITS,
  type CoaKey,
} from "./config";
import { redact, redactNullable } from "./redact";
import type { Amount, Extraction, FreeMoneyItem, LineItemValue, LoanItem, Offer, OfferSource } from "./schema";

const DEFAULT_TERMS = 2;
const MAX_PLAUSIBLE_LINE = 500_000;
/** Words in a "free money" line that mean it is really a loan. */
const REPAYMENT_WORDS = /\b(repay|repayable|repayment|must be repaid|loan|forgivable)\b/i;

let counter = 0;
const defaultId = () =>
  typeof globalThis.crypto?.randomUUID === "function" ? globalThis.crypto.randomUUID() : `id-${Date.now()}-${++counter}`;

export interface NormalizeOptions {
  source?: OfferSource;
  makeId?: () => string;
}

/** Turn one model extraction into an Offer with annual amounts and our own checks applied. */
export function toOffer(x: Extraction, opts: NormalizeOptions = {}): Offer {
  const makeId = opts.makeId ?? defaultId;
  const warnings: string[] = [];

  const usesTerms =
    COA_KEYS.some((k) => x.coa[k].basis === "per_term" && x.coa[k].amount != null) ||
    [...x.free_money, ...x.work, ...x.loans].some((i) => i.basis === "per_term" && i.amount != null) ||
    x.total_coa_basis === "per_term";
  const terms = x.number_of_terms && x.number_of_terms > 0 ? x.number_of_terms : DEFAULT_TERMS;
  if (usesTerms) {
    warnings.push(
      x.number_of_terms
        ? `Some amounts were listed per term. We multiplied them by ${terms} terms to get a full year.`
        : `Some amounts were listed per term, and the letter doesn't say how many terms. We assumed ${DEFAULT_TERMS}. Check this in Review.`,
    );
  }

  const annual = (amount: number | null, basis: "annual" | "per_term") =>
    amount == null ? null : basis === "per_term" ? round(amount * terms) : round(amount);

  const amount = (
    raw: number | null,
    basis: "annual" | "per_term",
    printed: string | null,
    confidence: "high" | "low",
  ): Amount => {
    const value = annual(raw, basis);
    const implausible = value != null && (value < 0 || value > MAX_PLAUSIBLE_LINE);
    return {
      amount: implausible ? null : value,
      printedLabel: redactNullable(printed),
      // A guessed term count makes every converted number uncertain.
      confidence: implausible || (basis === "per_term" && !x.number_of_terms) ? "low" : confidence,
      checked: false,
      ...(basis === "per_term" && raw != null ? { convertedFromTerms: terms } : {}),
    };
  };

  const coa = Object.fromEntries(
    COA_KEYS.map((k) => {
      const f = x.coa[k];
      return [k, amount(f.amount, f.basis, f.printed_label, f.confidence)];
    }),
  ) as Record<CoaKey, Amount>;

  const freeMoney: FreeMoneyItem[] = [];
  const loans: LoanItem[] = [];

  for (const f of x.free_money) {
    const base = { id: makeId(), label: redact(f.label), ...amount(f.amount, f.basis, f.printed_label, f.confidence) };
    // Safety net: the model should have caught this, but never let a repayable "award" count as free money.
    if (REPAYMENT_WORDS.test(f.printed_label) || REPAYMENT_WORDS.test(f.label)) {
      loans.push({
        ...base,
        confidence: "low",
        type: "institutional",
        reclassifiedReason: "The letter's wording mentions repayment, so we counted this as a loan, not free money.",
      });
    } else {
      freeMoney.push({ ...base, renewable: f.renewable });
    }
  }

  const work: LineItemValue[] = x.work.map((w) => ({
    id: makeId(),
    label: redact(w.label),
    ...amount(w.amount, w.basis, w.printed_label, w.confidence),
  }));

  for (const l of x.loans) {
    loans.push({
      id: makeId(),
      label: redact(l.label),
      ...amount(l.amount, l.basis, l.printed_label, l.confidence),
      type: l.type,
      reclassifiedReason: redactNullable(l.reclassified_reason),
    });
  }

  const programLevel = x.program_level ?? "graduate";
  if (!x.program_level) {
    warnings.push("We couldn't tell if this is a professional program (like law or medicine). We used the standard graduate loan limit.");
  }

  if (loans.some((l) => l.type === "grad_plus")) {
    warnings.push(
      "This letter lists a Grad PLUS loan. Grad PLUS closed to new borrowers on July 1, 2026, so unless you qualify under the legacy rules, you'll likely need other funding for that amount.",
    );
  }

  const unsubListed = loans.filter((l) => l.type === "direct_unsubsidized").reduce((s, l) => s + (l.amount ?? 0), 0);
  const unsubLimit = FEDERAL_LIMITS.annualUnsubsidized[programLevel];
  if (unsubListed > unsubLimit) {
    warnings.push(
      `The letter lists $${unsubListed.toLocaleString("en-US")} in Direct Unsubsidized loans, above the $${unsubLimit.toLocaleString("en-US")} yearly limit for new borrowers. Ask the school to confirm.`,
    );
  }

  const totalPrinted = annual(x.total_coa_as_printed, x.total_coa_basis);
  const lineSum = COA_KEYS.reduce((s, k) => s + (coa[k].amount ?? 0), 0);
  if (totalPrinted != null && Math.abs(totalPrinted - lineSum) > AID_OFFER_CONFIG.coaMismatchToleranceUsd) {
    warnings.push(
      `The cost lines we read add up to $${lineSum.toLocaleString("en-US")}, but the letter's total says $${totalPrinted.toLocaleString("en-US")}. A line may be missing or misread.`,
    );
  }

  return {
    id: makeId(),
    source: opts.source ?? "upload",
    schoolName: redactNullable(x.school_name)?.trim() || "Unnamed school",
    programName: redactNullable(x.program_name),
    academicYear: x.academic_year,
    programLevel,
    programLevelGuessed: !x.program_level,
    coa,
    totalCoaAsPrinted: totalPrinted,
    freeMoney,
    work,
    loans,
    notes: x.notes.map(redact),
    warnings,
  };
}

/** Empty offer for "Enter numbers by hand". */
export function blankOffer(makeId: () => string = defaultId): Offer {
  const empty = (): Amount => ({ amount: null, printedLabel: null, confidence: "high", checked: true });
  return {
    id: makeId(),
    source: "manual",
    schoolName: "",
    programName: null,
    academicYear: null,
    programLevel: "graduate",
    programLevelGuessed: false,
    coa: Object.fromEntries(COA_KEYS.map((k) => [k, empty()])) as Record<CoaKey, Amount>,
    totalCoaAsPrinted: null,
    freeMoney: [],
    work: [],
    loans: [],
    notes: [],
    warnings: [],
  };
}

function round(n: number) {
  return Math.round(n);
}
