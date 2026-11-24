import { generateText, Output } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { AID_OFFER_CONFIG } from "../config";
import { MOCK_ROTATION } from "../fixtures/sampleExtractions";
import { toOffer } from "../normalize";
import { EXTRACTION_INSTRUCTIONS, EXTRACTION_USER_TEXT } from "../prompt";
import { ExtractionSchema, type ExtractResponse } from "../schema";
import type { SniffedType } from "./sniff.server";

export interface LetterPage {
  bytes: Uint8Array;
  type: SniffedType;
}

let mockIndex = 0;

/**
 * Reads ONE letter (all its pages) and returns an Offer.
 *
 * Privacy: pages live only in memory for the length of this call. Nothing
 * here writes files, stores the model's raw output, or logs letter contents.
 */
export async function extractLetter(pages: LetterPage[], signal?: AbortSignal): Promise<ExtractResponse> {
  if (process.env.AID_OFFER_MOCK === "1") {
    const sample = MOCK_ROTATION[mockIndex++ % MOCK_ROTATION.length];
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));
    return sample.readable
      ? { ok: true, offer: toOffer(sample) }
      : { ok: false, code: "unreadable", message: sample.unreadable_reason ?? "We couldn't read this letter." };
  }

  const key = process.env.LOVABLE_API_KEY;
  if (!key) return { ok: false, code: "server_error", message: "Letter reading isn't set up yet." };

  const gateway = createLovableAiGatewayProvider(key, undefined, { structuredOutputs: true });

  try {
    const { output } = await generateText({
      model: gateway(AID_OFFER_CONFIG.model),
      instructions: EXTRACTION_INSTRUCTIONS,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: EXTRACTION_USER_TEXT },
            ...pages.map((p) =>
              p.type === "application/pdf"
                ? ({ type: "file", data: p.bytes, mediaType: p.type } as const)
                : ({ type: "image", image: p.bytes, mediaType: p.type } as const),
            ),
          ],
        },
      ],
      output: Output.object({ schema: ExtractionSchema }),
      temperature: 0,
      maxRetries: 1,
      abortSignal: signal,
    });

    if (!output.readable) {
      return {
        ok: false,
        code: "unreadable",
        message: output.unreadable_reason ?? "We couldn't read this letter. Try a clearer photo or the PDF from your school portal.",
      };
    }
    return { ok: true, offer: toOffer(output) };
  } catch (err) {
    // Log the error type only. Never log the request, the pages or the model output.
    console.error("[aid-offers] extraction failed:", err instanceof Error ? err.name : "unknown");
    return {
      ok: false,
      code: "unreadable",
      message: "We couldn't read this letter. Try a clearer photo or the PDF from your school portal.",
    };
  }
}
