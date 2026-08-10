import type { ReactNode } from "react";

export type Explainer = {
  id: string;
  tag: string;
  title: string;
  summary: string;
  body: string[];
  icon: ReactNode;
};

export const EXPLAINERS: Explainer[] = [
  {
    id: "grandfather",
    tag: "Grandfather rules",
    title: "Am I still covered under the old limits?",
    summary: "How the 3-year transition window works, and how to check where your program falls.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="3" x2="8" y2="7" />
        <line x1="16" y1="3" x2="16" y2="7" />
      </>
    ),
    body: [
      "If you had already taken out a Grad PLUS loan for your current program before July 1, 2026, you are not immediately dropped into the new caps. The transition window keeps the prior borrowing rules in place for up to three academic years, so students who were mid-degree when the change landed can finish under the terms they planned around.",
      "The window is tied to the program you were enrolled in, not to you personally. Switching schools, changing degree levels, or taking a long break can end your grandfathered status early — and starting a second degree almost always puts you under the new limits from day one.",
      "The practical move is to ask your financial aid office for your first disbursement date and the exact academic year your transition period closes. Write that date down. Most borrowers who get surprised by a funding gap are the ones who assumed the window ran longer than it did.",
    ],
  },
  {
    id: "caps",
    tag: "Borrowing caps",
    title: "How much can I actually borrow now?",
    summary: "The new annual and lifetime federal ceilings, and what they mean for your budget.",
    icon: (
      <>
        <path d="M3 20h18" />
        <rect x="5" y="11" width="4" height="9" />
        <rect x="10" y="7" width="4" height="13" />
        <rect x="15" y="14" width="4" height="6" />
      </>
    ),
    body: [
      "Standard graduate programs are capped at $20,500 a year and $100,000 over a lifetime of federal graduate borrowing. Professional degrees — JD, MD, DDS, and the rest of the recognized list — sit higher, at $50,000 a year and $200,000 lifetime.",
      "These ceilings count all federal graduate borrowing together, so unsubsidized loans you take now eat into the same lifetime total. If you expect a long program, front-loading large federal amounts in year one can leave you short in your final year, when tuition is often highest.",
      "Compare the cap to your school's published cost of attendance rather than to tuition alone. The gap between the two — housing, fees, insurance, exam costs — is where most borrowers end up needing outside funding, and it is easier to plan for before the semester starts than in the middle of it.",
    ],
  },
  {
    id: "cosigners",
    tag: "Credit & cosigners",
    title: "What if I can't qualify alone?",
    summary:
      "What private lenders actually check, and how cosigner release works once you can go it alone.",
    icon: (
      <>
        <circle cx="8.5" cy="8" r="2.6" />
        <path d="M3.5 18.5c0-2.8 2.2-5 5-5s5 2.2 5 5" />
        <circle cx="16" cy="8.5" r="2.2" />
        <path d="M13.6 13.7c.7-.3 1.5-.4 2.4-.4 2.5 0 4.5 2 4.5 4.5" />
      </>
    ),
    body: [
      "Private lenders underwrite you the way any other lender would: credit score, length of credit history, current income, and debt-to-income ratio. Graduate students often have a thin file rather than a bad one — a short history and little income reads as risk even when nothing is wrong.",
      "A cosigner with established credit usually solves this, and it often lowers your rate by more than a point. The cosigner is fully liable for the loan, and the balance shows up on their credit report, so it is a real commitment rather than a formality. Talk it through before you apply.",
      "Most lenders offer cosigner release after a run of consecutive on-time payments — commonly between 12 and 36 months — provided you can qualify on your own income by then. Ask for the release terms in writing before you sign, because they vary widely and are the single biggest difference between otherwise similar offers.",
    ],
  },
  {
    id: "rates",
    tag: "Rates",
    title: "Fixed vs. variable, and what drives your offer",
    summary: "Why two students see different rates from the same lender, and how to shop safely.",
    icon: (
      <>
        <polyline points="3 16 8 11 12 14 21 5" />
        <polyline points="15 5 21 5 21 11" />
      </>
    ),
    body: [
      "A fixed rate stays the same for the life of the loan. A variable rate starts lower but moves with an index, so your payment can rise. If your repayment horizon is long or your post-graduation income is uncertain, the predictability of a fixed rate is usually worth the higher starting number.",
      "Your quoted rate depends on your credit profile, whether you have a cosigner, the term length you pick, and sometimes your program and school. That is why advertised ranges are wide: the bottom of the range goes to strong-credit applicants with a cosigner on a short term.",
      "Rate shopping is safe when you keep it tight. Prequalification uses a soft pull and does not affect your score; multiple hard inquiries for the same loan type inside a short window are generally treated as one. Gather your offers over a couple of weeks rather than spread across months.",
    ],
  },
  {
    id: "repayment",
    tag: "Repayment",
    title: "Federal vs. private repayment, side by side",
    summary:
      "Forgiveness eligibility, forbearance options, and what you give up moving to a private loan.",
    icon: (
      <>
        <line x1="12" y1="3" x2="12" y2="19" />
        <line x1="4" y1="7" x2="20" y2="7" />
        <path d="M4 7 L1.5 13a2.7 2.7 0 0 0 5 0 Z" />
        <path d="M20 7 L17.5 13a2.7 2.7 0 0 0 5 0 Z" />
        <line x1="9" y1="21" x2="15" y2="21" />
      </>
    ),
    body: [
      "Federal loans carry protections private loans generally do not: income-driven repayment that scales with what you earn, extended forbearance and deferment, and eligibility for programs like Public Service Loan Forgiveness. Those protections are the real reason to borrow federal first, even when a private rate looks better on paper.",
      "Private loans are a contract. Hardship programs exist at many lenders, but they are discretionary, usually short, and not guaranteed in the way federal options are. If you are heading into public-interest work or a residency with modest pay, that difference matters far more than a fraction of a percent in rate.",
      "The sensible order is: exhaust federal eligibility up to your cap, then use private borrowing to close the remaining gap. Refinancing federal loans into a private loan later permanently gives up those protections — sometimes the right call for a high earner, rarely the right call right after graduation.",
    ],
  },
  {
    id: "gap",
    tag: "Filling the gap",
    title: "Scholarships, assistantships, and last-resort options",
    summary: "Ways to shrink the amount you need to borrow before you go looking for a lender.",
    icon: (
      <>
        <circle cx="12" cy="9" r="5" />
        <path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" />
      </>
    ),
    body: [
      "Before borrowing to cover a shortfall, work the sources that do not need repaying. Departmental scholarships, teaching and research assistantships, and tuition remission tied to campus employment are frequently awarded late and go unclaimed. Ask your program coordinator directly what remains unallocated for the coming term.",
      "Employer tuition assistance is the most overlooked option for part-time and professional students, and many employers reimburse a meaningful amount each year. Outside fellowships in your field are worth an afternoon of searching — the applicant pools are far smaller than for undergraduate scholarships.",
      "If a gap remains after all of that, a private loan is a reasonable tool rather than a failure. Borrow only the confirmed shortfall, not the maximum you are approved for, and re-run the numbers each year — your aid package, your caps, and your credit will all have changed.",
    ],
  },
];
