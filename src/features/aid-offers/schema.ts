import { z } from "zod";
import { LOAN_TYPES, type CoaKey, type LoanType, type ProgramLevel } from "./config";

/* ------------------------------------------------------------------ *
 * 1. What the model returns for ONE letter (structured output).
 *    Amounts come back exactly as printed; code converts per-term to
 *    annual (see normalize.ts) so the math is never left to the model.
 * ------------------------------------------------------------------ */

const Confidence = z.enum(["high", "low"]);
const Basis = z.enum(["annual", "per_term"]);

const CoaField = z.object({
  amount: z.number().nullable().describe("Dollar amount as printed, or null if this cost is not on the letter."),
  basis: Basis,
  printed_label: z.string().nullable().describe("The line's wording exactly as printed."),
  confidence: Confidence,
});

const LineItem = z.object({
  label: z.string().describe("Short, plain name for the item."),
  amount: z.number().nullable(),
  basis: Basis,
  printed_label: z.string().describe("The line's wording exactly as printed, including footnotes that matter."),
  confidence: Confidence,
});

export const ExtractionSchema = z.object({
  readable: z.boolean().describe("False if the pages are not an aid offer or cannot be read."),
  unreadable_reason: z.string().nullable(),
  school_name: z.string().nullable(),
  program_name: z.string().nullable(),
  academic_year: z.string().nullable().describe('For example "2027-28".'),
  program_level: z.enum(["graduate", "professional"]).nullable(),
  number_of_terms: z.number().int().nullable().describe("Terms in the academic year, if the letter says. Needed when any amount is per term."),
  coa: z.object({
    tuition: CoaField,
    fees: CoaField,
    housing_and_food: CoaField,
    books_and_supplies: CoaField,
    transportation: CoaField,
    health_insurance: CoaField,
    personal_misc: CoaField,
  }),
  total_coa_as_printed: z.number().nullable(),
  total_coa_basis: Basis,
  free_money: z.array(LineItem.extend({ renewable: z.enum(["yes", "no", "unknown"]) })),
  work: z.array(LineItem).describe("Assistantships, work-study, stipends tied to work."),
  loans: z.array(
    LineItem.extend({
      type: z.enum(LOAN_TYPES),
      reclassified_reason: z
        .string()
        .nullable()
        .describe("If the letter calls this an award or grant but it must be repaid, say why it was counted as a loan."),
    }),
  ),
  notes: z.array(z.string()).describe("Anything that could not be classified, in plain words. No personal details."),
});

export type Extraction = z.infer<typeof ExtractionSchema>;

/* ------------------------------------------------------------------ *
 * 2. What the app works with after normalizing (annual amounts).
 * ------------------------------------------------------------------ */

export type Confidence = "high" | "low";

export interface Amount {
  amount: number | null;
  printedLabel: string | null;
  confidence: Confidence;
  /** Student has looked at this value in Review (clears the amber flag). */
  checked: boolean;
  /** Amount was multiplied from a per-term figure. */
  convertedFromTerms?: number;
}

export interface LineItemValue extends Amount {
  id: string;
  label: string;
}

export interface FreeMoneyItem extends LineItemValue {
  renewable: "yes" | "no" | "unknown";
}

export interface LoanItem extends LineItemValue {
  type: LoanType;
  /** Why this was counted as a loan even though the letter called it something else. */
  reclassifiedReason: string | null;
}

export type OfferSource = "upload" | "manual";

export interface Offer {
  id: string;
  source: OfferSource;
  schoolName: string;
  programName: string | null;
  academicYear: string | null;
  programLevel: ProgramLevel;
  /** True if the model was unsure of the level and we defaulted to "graduate". */
  programLevelGuessed: boolean;
  coa: Record<CoaKey, Amount>;
  totalCoaAsPrinted: number | null;
  freeMoney: FreeMoneyItem[];
  work: LineItemValue[];
  loans: LoanItem[];
  notes: string[];
  /** Plain-language warnings produced by our own checks (not the model). */
  warnings: string[];
}

/** One upload slot in the browser, before or while it is read. */
export interface LetterUpload {
  id: string;
  pages: File[];
  status: "queued" | "reading" | "done" | "failed";
  error?: string;
}

/* ------------------------------------------------------------------ *
 * 3. API contract for POST /api/aid-offers/extract
 * ------------------------------------------------------------------ */

export type ExtractResponse =
  | { ok: true; offer: Offer }
  | { ok: false; code: "unreadable" | "rate_limited" | "bad_file" | "too_many_pages" | "server_error"; message: string };
