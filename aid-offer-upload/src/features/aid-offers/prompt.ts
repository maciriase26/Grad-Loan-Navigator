/**
 * Instructions for the vision model. Server-only use.
 * Keep in sync with ExtractionSchema in schema.ts.
 */
export const EXTRACTION_INSTRUCTIONS = `You are reading ONE graduate or professional school financial aid offer letter. All attached pages belong to the same letter.

Return ONLY data matching the schema. Rules:

1. Never invent numbers. If a value is not on the letter, return null for it.
2. Return every amount exactly as printed. Do not add, convert or annualize. If a line is per term, semester or quarter, set basis="per_term"; otherwise basis="annual". Return number_of_terms if the letter states it or makes it clear (for example "fall and spring").
3. Anything that must be repaid is a loan, even if the letter calls it an "award", "grant" or "scholarship". Read every footnote. When you move such a line into loans, explain why in reclassified_reason.
4. Classify loans: direct_unsubsidized (Federal Direct Unsubsidized or "Stafford"), grad_plus (Graduate PLUS), private, institutional (lent by the school), other.
5. free_money = scholarships, grants, fellowships and tuition waivers that are not repaid. work = assistantships, work-study and stipends tied to work.
6. Map costs to the closest cost-of-attendance field. "Room and board" and "living expenses" go to housing_and_food. Anything else goes to personal_misc. If the letter lists only direct costs (tuition and fees), leave the living-cost fields null.
7. printed_label must be the wording on the letter, including "per term" or a footnote marker if shown.
8. confidence="low" when the text is blurry, cut off or ambiguous, or when you inferred the category rather than read it.
9. program_level="professional" for JD, MD, DO, DDS, DMD, PharmD, DVM, OD, DPT and similar professional doctorates; otherwise "graduate". Use null if you cannot tell.
10. If the pages are not a financial aid offer, or are too unclear to read, return readable=false with a short reason, and leave the other fields empty or null.
11. Never return names, addresses, emails, phone numbers, student IDs, Social Security numbers, dates of birth or account numbers, not even inside printed_label or notes.
12. Put anything you cannot classify in notes, in one short plain sentence each.`;

export const EXTRACTION_USER_TEXT = "Read this aid offer letter and return the structured data.";
