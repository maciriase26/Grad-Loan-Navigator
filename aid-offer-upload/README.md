# Aid Offer Upload: feature code

Students upload photos, screenshots or PDFs of their aid offer letters (up to 4 schools). Each letter is read by an AI model on our server, and the site shows the offers side by side: cost of attendance, free money, net cost, how much federal Direct Unsubsidized loans can cover, and the gap that's left.

This package is written for the Grad Navigator stack as it appears in our Lovable project: **TanStack Start, React 19, Tailwind 4, shadcn/ui, Supabase, `ai` v7 with the Lovable AI gateway, zod v4.** If the live site has drifted from that, adapt the imports; the logic doesn't depend on the framework.

`docs/prototype.html` is the clickable model the team approved. Open it in a browser to see every screen and state.

---

## What's included

```
src/
  features/aid-offers/
    config.ts                 limits, model name, federal loan limits, labels
    schema.ts                 zod schema for the model's output + app types + API contract
    prompt.ts                 model instructions
    normalize.ts              model output → Offer (per-term → annual, safety checks, warnings)
    calc.ts                   totals, gap, "Smallest gap" and headline logic (pure, tested)
    redact.ts                 strips SSNs, emails, phones, IDs from any text the model returns
    client.ts                 file checks, image downscaling, API call, analytics, formatting
    useAidOffers.ts           state for the whole flow (reducer + sessionStorage)
    components/
      AidOfferUpload.tsx      the drop-in component
      UploadPanel.tsx         upload screen (drag/drop, camera, "Add page", manual entry)
      ReadingProgress.tsx     per-letter progress
      ComparisonView.tsx      side-by-side cards, badge, headline, failed-letter cards
      ReviewSheet.tsx         edit every number, see the letter's wording next to it
    server/
      extract.server.ts       the model call (or mock mode)
      rate-limit.server.ts    per-visitor limit (hashed IP)
      sniff.server.ts         real file type from the bytes; PDF page count
    fixtures/sampleExtractions.ts   3 fictional letters + 1 unreadable (mock mode and tests)
    __tests__/aid-offers.test.ts    19 unit tests
  routes/api/aid-offers/extract.ts  POST endpoint
supabase/migrations/…_aid_offer_rate_limit.sql
docs/prototype.html
.env.example
```

Already verified: type-checks under `strict`, all 19 unit tests pass, the endpoint was exercised end to end in mock mode (read, bad file, too many pages, rate limit), and every screen renders with the sample data.

---

## Setup (about half a day)

1. **Copy files** into the project at the same paths.
2. **shadcn components.** The UI uses `button`, `card`, `badge`, `input`, `label` and `sheet`, all already in the project.
3. **Environment variables** (see `.env.example`):
   - `LOVABLE_API_KEY`: already set for the chatbot.
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`: server only, for the rate limit. **Never expose the service key to the browser.**
   - `AID_OFFER_IP_SALT`: any long random string.
   - `AID_OFFER_MOCK=1`: in development, returns the sample letters instead of calling the model. No cost, no real letters needed.
4. **Run the migration** in `supabase/migrations`. It creates a single table that holds only hashed visitor keys and counts.
5. **Mount the component** on the Aid Offer Comparison page:

   ```tsx
   import { AidOfferUpload } from "@/features/aid-offers";

   // inside the page component, where the tool should appear
   <AidOfferUpload />
   ```

   "Enter numbers by hand" is built in, so this can replace the current manual form. You can also keep the manual form and add this above it.
6. **Point federal limits at the calculator config.** `config.ts → FEDERAL_LIMITS` duplicates the Chart Your Path numbers. Import them from there instead, so a rule change only happens in one place.
7. **Restyle.** The components use Tailwind and shadcn defaults (emerald accents). Swap in the site's tokens. Brand: navy `#16233F`, emerald `#0E9F6E`, highlight `#2BD297`, Poppins.
8. **Spanish.** All copy is English inline. Move strings into `src/i18n/translations.ts` and use `useI18n()` like the other pages.
9. **Tests.** `bun add -d vitest`, then `bunx vitest run src/features/aid-offers`.

---

## How it works

```
Browser                                   Server
───────                                   ──────
UploadPanel: files → letters (1 file = 1 school, "Add page" for more)
  │ shrink big JPG/PNG to 2400px
  ▼
readAll(): one POST per letter, in parallel ──►  /api/aid-offers/extract
                                                 1. check size, sniff real type from bytes
                                                 2. count pages (max 4)
                                                 3. rate limit (hashed IP, 10 letters/hour)
                                                 4. generateText + Output.object(ExtractionSchema)
                                                 5. toOffer(): annualize, checks, redact
  ◄──────────────── { ok, offer } or { ok:false, code, message }
ComparisonView (opens as soon as all letters return; failed ones get their own card)
ReviewSheet (optional): edit, then recalculate
```

**API contract** (`schema.ts → ExtractResponse`):

| Status | Body |
|---|---|
| 200 | `{ ok: true, offer }` |
| 400 / 413 / 415 | `{ ok: false, code: "bad_file" \| "too_many_pages", message }` |
| 422 | `{ ok: false, code: "unreadable", message }` |
| 429 | `{ ok: false, code: "rate_limited", message }` |

`message` is written for students and safe to show as-is.

---

## Calculation rules (`calc.ts`)

```
net cost         = cost of attendance − scholarships/grants − assistantships/work
federal coverage = min(annual Direct Unsubsidized limit, net cost)
gap              = max(net cost − federal coverage, 0)
```

- Limits for new borrowers (loans first disbursed on or after July 1, 2026): **$20,500/yr graduate, $50,000/yr professional.** Aggregate $100,000 / $200,000.
- `totals(offer, { priorFederalBorrowing })` also applies the aggregate cap if the tool ever asks how much the student has already borrowed. It's off by default.
- **Loans printed on the letter never reduce the gap.** They're listed for reference only.
- **"Smallest gap"** goes to the lowest gap among offers whose living costs are present, and only when at least 2 such offers exist and there's no tie. A letter without living costs can never look like the best deal.
- **Headline:** the biggest difference in net cost between two complete offers.

## Accuracy guardrails

| Problem | What the code does |
|---|---|
| Per-term amounts | Model returns amounts as printed plus `basis`; **code** multiplies by the number of terms (never the model). If the term count is missing, it assumes 2, marks those numbers low-confidence and says so. |
| Loans called "awards" | The prompt tells the model to reclassify, and `normalize.ts` double-checks free-money lines for repayment wording and moves them to loans. |
| Blurry or ambiguous numbers | `confidence: "low"` → amber in Review, counted as "needs a quick check" on the card until saved. |
| Missing living costs | Flag on the card; excluded from "Smallest gap". |
| Line items vs. printed total | Warning if they differ by more than $50. |
| Grad PLUS on the letter | "Closed" tag plus a plain-language warning. |
| Unsub above the federal limit | Warning to confirm with the school. |
| Absurd amounts (<0 or >$500K per line) | Dropped and flagged. |
| Unknown program level | Defaults to graduate limit and says so; student can change it in Review. |
| Unreadable letter | That card offers "Try another file" or "Enter by hand"; other letters still show. |

---

## Privacy (must be true at launch)

- [x] Files are processed **in memory only**. Nothing is written to storage or disk.
- [x] The model's raw output is never stored or logged. Errors log the error type only.
- [x] The schema has no fields for names, addresses or IDs; the prompt forbids them; `redact.ts` scrubs any that slip into labels or notes.
- [x] File type is checked from the bytes, not the name.
- [x] Comparisons live in `sessionStorage` (numbers and labels only) and disappear when the tab closes.
- [x] Analytics send counts and error codes only (`aid_upload_started`, `aid_extraction_succeeded`, `aid_extraction_failed`, `aid_comparison_shown`, `aid_review_opened`, `aid_fields_edited`, `aid_manual_entry_started`).
- [x] Rate limit stores a salted hash, never the raw IP.
- [ ] **Confirm the Lovable AI gateway / model provider does not retain or train on uploaded files** (check the data terms for the gateway and the chosen model).
- [ ] **Privacy policy and on-page copy reviewed by our terms lawyer** before launch.
- [ ] Any future use (saving to an account, lender matching, aggregate insights) needs **separate opt-in consent** and is not built here.

---

## Testing before launch

**Automated:** `bunx vitest run src/features/aid-offers` (19 tests: per-term conversion, reclassified awards, Grad PLUS, total mismatch, limits, aggregate cap, badge rules, redaction).

**Real letters:** collect 30 to 50 actual letters with personal details blacked out: law, medicine, MBA and other master's programs; PDFs, portal screenshots, phone photos (including a bad one); at least 5 per-term letters and 5 with loans called "awards." For each, record whether every number matched and how long it took.

**Acceptance criteria**

| Check | Target |
|---|---|
| Numbers read correctly (after the student fixes amber fields) | 100% |
| Numbers read correctly with no edits | 90%+ |
| Repayable "awards" counted as loans | 100% of test letters |
| Time from "Compare" to results, 3 letters | Under 15 seconds |
| Unreadable file | Never blocks the other letters |
| Phone (iPhone Safari, Android Chrome) | Camera capture, swipe between cards, Review sheet usable |
| Cost per letter | About 1 to 2 cents (check gateway usage after the test run) |

---

## Known limits and open items

- **Model:** set to `google/gemini-3.6-flash` (same family as the chatbot). Confirm it accepts image **and PDF** input through the gateway; if PDFs fail, convert PDF pages to images server-side or pick a model that takes PDFs.
- **HEIC** is sent to the model as-is (no browser preview). If the model rejects HEIC, convert on the server or ask iPhone users to share as JPG.
- **PDF page count** is a quick regex count, good enough to block huge files, not exact.
- **Rate limit fails open** on a database error (logged) so an outage never blocks students.
- **Saving comparisons** to an account: not built. Session only at launch.
- **Aggregate cap:** supported in `calc.ts`, but the UI doesn't ask for prior borrowing yet.
- **Legacy Grad PLUS borrowers** are not modeled; the warning tells them to check.
