import { createFileRoute } from "@tanstack/react-router";
import { AID_OFFER_CONFIG } from "@/features/aid-offers/config";
import type { ExtractResponse } from "@/features/aid-offers/schema";
import { extractLetter, type LetterPage } from "@/features/aid-offers/server/extract.server";
import { takeLetterSlot, visitorKey } from "@/features/aid-offers/server/rate-limit.server";
import { approxPdfPages, sniffType } from "@/features/aid-offers/server/sniff.server";

/**
 * POST /api/aid-offers/extract
 * Body: multipart/form-data with one or more "page" fields, all from ONE letter.
 * The browser sends one request per letter, in parallel.
 * Returns ExtractResponse JSON.
 */
export const Route = createFileRoute("/api/aid-offers/extract")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const json = (body: ExtractResponse, status = 200) =>
          new Response(JSON.stringify(body), {
            status,
            headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
          });

        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return json({ ok: false, code: "bad_file", message: "Upload didn't come through. Try again." }, 400);
        }

        const files = form.getAll("page").filter((f): f is File => f instanceof File);
        if (files.length === 0) {
          return json({ ok: false, code: "bad_file", message: "No pages were attached." }, 400);
        }

        const pages: LetterPage[] = [];
        let pageCount = 0;
        for (const file of files) {
          if (file.size > AID_OFFER_CONFIG.maxFileMb * 1024 * 1024) {
            return json({ ok: false, code: "bad_file", message: `Each file must be under ${AID_OFFER_CONFIG.maxFileMb} MB.` }, 413);
          }
          const bytes = new Uint8Array(await file.arrayBuffer());
          const type = sniffType(bytes);
          if (!type) {
            return json({ ok: false, code: "bad_file", message: "Use a JPG, PNG, HEIC or PDF file." }, 415);
          }
          pageCount += type === "application/pdf" ? approxPdfPages(bytes) : 1;
          pages.push({ bytes, type });
        }
        if (pageCount > AID_OFFER_CONFIG.maxPagesPerLetter) {
          return json(
            { ok: false, code: "too_many_pages", message: `One letter can have up to ${AID_OFFER_CONFIG.maxPagesPerLetter} pages.` },
            413,
          );
        }

        const allowed = await takeLetterSlot(await visitorKey(request));
        if (!allowed) {
          return json(
            { ok: false, code: "rate_limited", message: "You've read a lot of letters in the last hour. Try again later, or enter the numbers by hand." },
            429,
          );
        }

        const result = await extractLetter(pages, request.signal);
        return json(result, result.ok ? 200 : 422);
      },
    },
  },
});
