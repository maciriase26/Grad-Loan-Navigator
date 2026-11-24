import { describe, expect, it } from "vitest";
import { compare, totals } from "../calc";
import { SAMPLE_A, SAMPLE_B, SAMPLE_C } from "../fixtures/sampleExtractions";
import { blankOffer, toOffer } from "../normalize";
import { redact } from "../redact";
import { ExtractionSchema, type Extraction } from "../schema";

let n = 0;
const makeId = () => `t${++n}`;

describe("fixtures match the model schema", () => {
  it.each([SAMPLE_A, SAMPLE_B, SAMPLE_C])("parses %#", (s) => {
    expect(() => ExtractionSchema.parse(s)).not.toThrow();
  });
});

describe("toOffer", () => {
  it("converts per-term amounts to a full year", () => {
    const o = toOffer(SAMPLE_B, { makeId });
    expect(o.coa.tuition.amount).toBe(49_000);
    expect(o.coa.tuition.convertedFromTerms).toBe(2);
    expect(o.freeMoney[0].amount).toBe(18_000);
    expect(o.work[0].amount).toBe(4_000);
    expect(o.warnings.some((w) => w.includes("per term"))).toBe(true);
  });

  it("assumes 2 terms and lowers confidence when the term count is missing", () => {
    const o = toOffer({ ...SAMPLE_B, number_of_terms: null }, { makeId });
    expect(o.coa.tuition.amount).toBe(49_000);
    expect(o.coa.tuition.confidence).toBe("low");
    expect(o.warnings.some((w) => w.includes("assumed 2"))).toBe(true);
  });

  it("moves a repayable 'award' out of free money", () => {
    const x: Extraction = {
      ...SAMPLE_C,
      free_money: [
        ...SAMPLE_C.free_money,
        { label: "Bridge Award", amount: 8000, basis: "annual", printed_label: "Bridge Award (repayable after graduation)", confidence: "high", renewable: "unknown" },
      ],
    };
    const o = toOffer(x, { makeId });
    expect(o.freeMoney.map((f) => f.label)).not.toContain("Bridge Award");
    const moved = o.loans.find((l) => l.label === "Bridge Award");
    expect(moved?.type).toBe("institutional");
    expect(moved?.confidence).toBe("low");
  });

  it("warns about Grad PLUS", () => {
    expect(toOffer(SAMPLE_A, { makeId }).warnings.some((w) => w.includes("Grad PLUS"))).toBe(true);
  });

  it("flags a mismatch between cost lines and the printed total", () => {
    const o = toOffer({ ...SAMPLE_C, total_coa_as_printed: 90_000 }, { makeId });
    expect(o.warnings.some((w) => w.includes("add up to"))).toBe(true);
  });

  it("defaults an unknown program level to graduate and says so", () => {
    const o = toOffer({ ...SAMPLE_C, program_level: null }, { makeId });
    expect(o.programLevel).toBe("graduate");
    expect(o.programLevelGuessed).toBe(true);
  });

  it("drops implausible amounts instead of using them", () => {
    const x = { ...SAMPLE_C, coa: { ...SAMPLE_C.coa, tuition: { ...SAMPLE_C.coa.tuition, amount: 5_400_000 } } };
    const o = toOffer(x, { makeId });
    expect(o.coa.tuition.amount).toBeNull();
    expect(o.coa.tuition.confidence).toBe("low");
  });
});

describe("totals", () => {
  it("computes net cost, federal coverage and gap (professional)", () => {
    const t = totals(toOffer(SAMPLE_A, { makeId }));
    expect(t.coa).toBe(96_450);
    expect(t.freeMoney).toBe(28_000);
    expect(t.netCost).toBe(68_450);
    expect(t.federalLimit).toBe(50_000);
    expect(t.federalCoverage).toBe(50_000);
    expect(t.gap).toBe(18_450);
    expect(t.loansListed).toBe(68_450); // listed loans never reduce the gap
  });

  it("uses the graduate limit for graduate programs", () => {
    const t = totals(toOffer({ ...SAMPLE_C, program_level: "graduate" }, { makeId }));
    expect(t.federalLimit).toBe(20_500);
    expect(t.gap).toBe(85_200 - 30_000 - 20_500);
  });

  it("caps federal coverage at net cost", () => {
    const x = { ...SAMPLE_C, free_money: [{ ...SAMPLE_C.free_money[0], amount: 80_000 }] };
    const t = totals(toOffer(x, { makeId }));
    expect(t.netCost).toBe(5_200);
    expect(t.federalCoverage).toBe(5_200);
    expect(t.gap).toBe(0);
  });

  it("respects the aggregate cap when prior borrowing is known", () => {
    const t = totals(toOffer(SAMPLE_C, { makeId }), { priorFederalBorrowing: 180_000 });
    expect(t.federalLimit).toBe(20_000);
  });

  it("counts low-confidence numbers to review and missing living costs", () => {
    const t = totals(toOffer(SAMPLE_B, { makeId }));
    expect(t.livingCostsMissing).toBe(true);
    expect(t.toReview).toBeGreaterThan(0);
  });
});

describe("compare", () => {
  it("never gives 'Smallest gap' to a letter missing living costs", () => {
    const offers = [toOffer(SAMPLE_A, { makeId }), toOffer(SAMPLE_B, { makeId }), toOffer(SAMPLE_C, { makeId })];
    const c = compare(offers);
    expect(c.smallestGapId).toBe(offers[2].id); // Lakemont: gap 5,200 vs Westbrook 18,450; Harbor excluded
    expect(c.biggestDifference).toEqual({ cheaperId: offers[2].id, pricierId: offers[0].id, amount: 68_450 - 55_200 });
  });

  it("gives no badge with fewer than two complete offers", () => {
    expect(compare([toOffer(SAMPLE_C, { makeId })]).smallestGapId).toBeNull();
  });

  it("handles a blank manual offer", () => {
    expect(() => compare([blankOffer(makeId)])).not.toThrow();
  });
});

describe("redact", () => {
  it("removes SSNs, emails, phones and IDs but keeps dollar amounts", () => {
    const s = redact("SSN 123-45-6789, xxx-xx-4321, jane@school.edu, (410) 555-1234, Student ID: A00123456, award $62,400 and 1234567");
    expect(s).not.toMatch(/6789|4321|jane@|555-1234|A00123456|1234567/);
    expect(s).toContain("$62,400");
  });
});
