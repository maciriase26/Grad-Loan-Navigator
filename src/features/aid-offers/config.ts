/**
 * Aid offer upload: settings in one place.
 *
 * TODO(dev): FEDERAL_LIMITS duplicates numbers the Chart Your Path calculator
 * already uses. Import them from the calculator's config instead, so a rule
 * change only has to be made once.
 */

export const AID_OFFER_CONFIG = {
  /** Schools that can be compared at once. One uploaded file = one school. */
  maxLetters: 4,
  /** Pages a single letter can have ("+ Add page"). */
  maxPagesPerLetter: 4,
  /** Per file, before client-side downscaling. */
  maxFileMb: 10,
  /** What the server accepts, checked against the file's real bytes, not its name. */
  acceptedMimeTypes: ["image/jpeg", "image/png", "image/heic", "image/heif", "application/pdf"] as const,
  /** Images wider or taller than this are shrunk in the browser before upload. */
  downscaleMaxPx: 2400,
  /** Vision model for Google Gemini Flash. */
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  /** Per visitor (hashed IP). */
  rateLimit: { lettersPerWindow: 10, windowSeconds: 60 * 60 },
  /** Browser gives up on one letter after this long. */
  requestTimeoutMs: 45_000,
  /** If the line items and the letter's printed total differ by more than this, flag it. */
  coaMismatchToleranceUsd: 50,
  /** sessionStorage key. Only numbers and labels are saved, never images. */
  sessionKey: "gn.aidOffers.v1",
} as const;

export type ProgramLevel = "graduate" | "professional";

/** Federal Direct Unsubsidized limits for new borrowers, loans first disbursed on or after July 1, 2026. */
export const FEDERAL_LIMITS = {
  annualUnsubsidized: { graduate: 20_500, professional: 50_000 } satisfies Record<ProgramLevel, number>,
  aggregate: { graduate: 100_000, professional: 200_000 } satisfies Record<ProgramLevel, number>,
} as const;

export const COA_KEYS = [
  "tuition",
  "fees",
  "housing_and_food",
  "books_and_supplies",
  "transportation",
  "health_insurance",
  "personal_misc",
] as const;
export type CoaKey = (typeof COA_KEYS)[number];

export const COA_LABELS: Record<CoaKey, string> = {
  tuition: "Tuition",
  fees: "Fees",
  housing_and_food: "Housing and food",
  books_and_supplies: "Books and supplies",
  transportation: "Transportation",
  health_insurance: "Health insurance",
  personal_misc: "Personal and other",
};

/** Living-cost lines. A letter missing housing can't win "Smallest gap". */
export const LIVING_COST_KEYS: readonly CoaKey[] = ["housing_and_food"];

export const LOAN_TYPES = ["direct_unsubsidized", "grad_plus", "private", "institutional", "other"] as const;
export type LoanType = (typeof LOAN_TYPES)[number];

export const LOAN_TYPE_LABELS: Record<LoanType, string> = {
  direct_unsubsidized: "Federal Direct Unsubsidized",
  grad_plus: "Grad PLUS",
  private: "Private loan",
  institutional: "School (institutional) loan",
  other: "Other loan",
};
