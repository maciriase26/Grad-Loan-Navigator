import rawSchools from "./tuitionSchools.json";

export interface SchoolTuitionRecord {
  id: string;
  name: string;
  inState: number;
  outOfState: number;
  netPrice: number;
  isPublic: boolean;
  year: string;
}

export const TUITION_SCHOOLS: SchoolTuitionRecord[] = rawSchools as SchoolTuitionRecord[];

export interface HousingPreset {
  id: string;
  labelKey: string;
  amount: number;
  monthly: number;
  type: "on_campus_public" | "on_campus_private" | "off_campus" | "with_family" | "national_avg" | "custom";
}

/**
 * Authoritative 2025–2026 Room & Board / Living Expense Benchmarks
 * Sourced from College Board "Trends in College Pricing" and IPEDS national higher ed surveys.
 */
export const HOUSING_PRESETS: HousingPreset[] = [
  {
    id: "on_campus_public",
    labelKey: "cyp.housing.onCampusPublic",
    amount: 13900,
    monthly: 1158,
    type: "on_campus_public",
  },
  {
    id: "on_campus_private",
    labelKey: "cyp.housing.onCampusPrivate",
    amount: 15920,
    monthly: 1327,
    type: "on_campus_private",
  },
  {
    id: "off_campus",
    labelKey: "cyp.housing.offCampus",
    amount: 13100,
    monthly: 1092,
    type: "off_campus",
  },
  {
    id: "with_family",
    labelKey: "cyp.housing.withFamily",
    amount: 5800,
    monthly: 483,
    type: "with_family",
  },
  {
    id: "national_avg",
    labelKey: "cyp.housing.nationalAvg",
    amount: 13500,
    monthly: 1125,
    type: "national_avg",
  },
];

const ALIASES: Record<string, string> = {
  mit: "massachusetts institute of technology",
  nyu: "new york university",
  ucla: "university of california-los angeles",
  "uc berkeley": "university of california-berkeley",
  cal: "university of california-berkeley",
  ucsd: "university of california-san diego",
  "uc davis": "university of california-davis",
  uf: "university of florida",
  unc: "university of north carolina at chapel hill",
  uva: "university of virginia",
  "ut austin": "university of texas at austin",
  ut: "university of texas at austin",
  tamu: "texas a & m university-college station",
  "texas a&m": "texas a & m university-college station",
  penn: "university of pennsylvania",
  upenn: "university of pennsylvania",
  psu: "pennsylvania state university",
  "penn state": "pennsylvania state university",
  osu: "ohio state university-main campus",
  "ohio state": "ohio state university-main campus",
  umich: "university of michigan-ann arbor",
  usc: "university of southern california",
  cmu: "carnegie mellon university",
  "georgia tech": "georgia institute of technology-main campus",
  gatech: "georgia institute of technology-main campus",
  asu: "arizona state university",
  uw: "university of washington-seattle campus",
  washu: "washington university in st louis",
  bu: "boston university",
  bc: "boston college",
  uiuc: "university of illinois urbana-champaign",
  umd: "university of maryland-college park",
  fsu: "florida state university",
  ucf: "university of central florida",
  purdue: "purdue university-main campus",
  "notre dame": "university of notre dame",
};

export function searchSchools(query: string, limit = 8): SchoolTuitionRecord[] {
  const ql = query.trim().toLowerCase();
  if (!ql) return [];

  const aliasTarget = ALIASES[ql];
  const scored: { score: number; school: SchoolTuitionRecord }[] = [];

  for (let i = 0; i < TUITION_SCHOOLS.length; i++) {
    const s = TUITION_SCHOOLS[i];
    const nameL = s.name.toLowerCase();
    let score = 0;

    // 1. Alias match bonus
    if (aliasTarget) {
      if (nameL === aliasTarget) {
        score += 1000;
      } else if (nameL.startsWith(aliasTarget)) {
        score += 800;
      } else if (nameL.includes(aliasTarget)) {
        score += 600;
      }
    }

    // 2. Exact match
    if (nameL === ql) {
      score += 500;
    } else if (nameL.startsWith(ql)) {
      score += 400;
    } else if (` ${nameL} `.includes(` ${ql} `)) {
      score += 300;
    } else if (nameL.split(/[\s-]+/).some((w) => w.startsWith(ql))) {
      score += 200;
    } else if (nameL.includes(ql)) {
      score += 100;
    }

    if (score > 0) {
      // Slightly prioritize shorter official names when scores tie
      score -= nameL.length * 0.05;
      scored.push({ score, school: s });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((item) => item.school);
}

export function findSchoolByName(name: string): SchoolTuitionRecord | undefined {
  if (!name) return undefined;
  const nameL = name.trim().toLowerCase();
  return (
    TUITION_SCHOOLS.find((s) => s.name.toLowerCase() === nameL) ||
    TUITION_SCHOOLS.find((s) => s.name.toLowerCase().includes(nameL))
  );
}
