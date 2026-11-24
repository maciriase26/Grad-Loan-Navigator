/**
 * Fictional sample letters in the exact shape the model returns.
 * Used by mock mode (AID_OFFER_MOCK=1) and by the tests.
 */
import type { Extraction } from "../schema";

type CoaInput = Partial<Record<keyof Extraction["coa"], [number | null, string | null, ("high" | "low")?]>>;

function coa(basis: "annual" | "per_term", lines: CoaInput): Extraction["coa"] {
  const keys = ["tuition", "fees", "housing_and_food", "books_and_supplies", "transportation", "health_insurance", "personal_misc"] as const;
  return Object.fromEntries(
    keys.map((k) => {
      const [amount, printed, conf] = lines[k] ?? [null, null, "low"];
      return [k, { amount, basis, printed_label: printed, confidence: conf ?? "high" }];
    }),
  ) as Extraction["coa"];
}

export const SAMPLE_A: Extraction = {
  readable: true,
  unreadable_reason: null,
  school_name: "Westbrook University School of Law",
  program_name: "J.D.",
  academic_year: "2027-28",
  program_level: "professional",
  number_of_terms: 2,
  coa: coa("annual", {
    tuition: [62400, "Tuition"],
    fees: [1850, "Mandatory Fees"],
    housing_and_food: [21600, "Housing & Food (est.)"],
    books_and_supplies: [1400, "Books & Supplies"],
    transportation: [2100, "Transportation"],
    health_insurance: [3900, "Student Health Insurance"],
    personal_misc: [3200, "Personal Expenses"],
  }),
  total_coa_as_printed: 96450,
  total_coa_basis: "annual",
  free_money: [
    { label: "Dean's Merit Scholarship", amount: 25000, basis: "annual", printed_label: "Dean's Merit Scholarship (renewable with good academic standing)", confidence: "high", renewable: "yes" },
    { label: "Public Interest Grant", amount: 3000, basis: "annual", printed_label: "PI Grant", confidence: "low", renewable: "unknown" },
  ],
  work: [],
  loans: [
    { label: "Federal Direct Unsubsidized Loan", amount: 50000, basis: "annual", printed_label: "Fed Direct Unsub Loan", confidence: "high", type: "direct_unsubsidized", reclassified_reason: null },
    { label: "Federal Grad PLUS Loan", amount: 18450, basis: "annual", printed_label: "Federal Grad PLUS Loan", confidence: "high", type: "grad_plus", reclassified_reason: null },
  ],
  notes: ['The letter\'s "Total Aid Awarded" line includes loans.'],
};

/** Per-term letter with only direct costs and a repayable "award". */
export const SAMPLE_B: Extraction = {
  readable: true,
  unreadable_reason: null,
  school_name: "Harbor City Law School",
  program_name: "J.D.",
  academic_year: "2027-28",
  program_level: "professional",
  number_of_terms: 2,
  coa: coa("per_term", {
    tuition: [24500, "Tuition: $24,500 per term"],
    fees: [650, "Fees: $650 per term (partly cut off)", "low"],
  }),
  total_coa_as_printed: 25150,
  total_coa_basis: "per_term",
  free_money: [
    { label: "Harbor Scholars Award", amount: 9000, basis: "per_term", printed_label: "Harbor Scholars Award: $9,000 per term. Renewable: see conditions", confidence: "low", renewable: "unknown" },
  ],
  work: [
    { label: "Research Assistantship", amount: 2000, basis: "per_term", printed_label: "Research Assistantship: $2,000 per term, 10 hrs/week", confidence: "high" },
  ],
  loans: [
    { label: "Federal Direct Unsubsidized Loan", amount: 25000, basis: "per_term", printed_label: "Direct Unsubsidized: $25,000 per term", confidence: "high", type: "direct_unsubsidized", reclassified_reason: null },
    {
      label: "Harbor Access Award",
      amount: 5000,
      basis: "per_term",
      printed_label: "Harbor Access Award*: $5,000 per term (*repayable beginning 6 months after graduation)",
      confidence: "low",
      type: "institutional",
      reclassified_reason: 'Called an "award" on the letter, but the footnote says it must be repaid.',
    },
  ],
  notes: ['Letter shows "Total Direct Costs" only. Living costs not listed.'],
};

export const SAMPLE_C: Extraction = {
  readable: true,
  unreadable_reason: null,
  school_name: "Lakemont University College of Law",
  program_name: "J.D.",
  academic_year: "2027-28",
  program_level: "professional",
  number_of_terms: 2,
  coa: coa("annual", {
    tuition: [54800, "Tuition"],
    fees: [1200, "Student Fees"],
    housing_and_food: [19800, "Room & Board"],
    books_and_supplies: [1300, "Books"],
    transportation: [1800, "Transportation"],
    health_insurance: [3400, "Health Insurance (waivable)"],
    personal_misc: [2900, "Miscellaneous"],
  }),
  total_coa_as_printed: 85200,
  total_coa_basis: "annual",
  free_money: [
    { label: "Lakemont Excellence Scholarship", amount: 30000, basis: "annual", printed_label: "Lakemont Excellence Scholarship (renewable for 3 years)", confidence: "high", renewable: "yes" },
  ],
  work: [],
  loans: [
    { label: "Federal Direct Unsubsidized Loan", amount: 50000, basis: "annual", printed_label: "Federal Direct Unsubsidized Loan", confidence: "high", type: "direct_unsubsidized", reclassified_reason: null },
  ],
  notes: [],
};

export const SAMPLE_UNREADABLE: Extraction = {
  ...SAMPLE_C,
  readable: false,
  unreadable_reason: "The photo is too blurry to read the amounts.",
};

export const MOCK_ROTATION = [SAMPLE_A, SAMPLE_B, SAMPLE_C, SAMPLE_UNREADABLE];
