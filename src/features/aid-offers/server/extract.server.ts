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

function uint8ArrayToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Reads ONE letter (all its pages) and returns an Offer using Google Gemini Flash.
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

  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      const sample = MOCK_ROTATION[mockIndex++ % MOCK_ROTATION.length];
      await new Promise((r) => setTimeout(r, 600));
      return sample.readable
        ? { ok: true, offer: toOffer(sample) }
        : { ok: false, code: "unreadable", message: sample.unreadable_reason ?? "We couldn't read this letter." };
    }
    return { ok: false, code: "server_error", message: "Gemini API key is not configured." };
  }

  const model = AID_OFFER_CONFIG.model;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;

  try {
    const payload = {
      systemInstruction: {
        parts: [{ text: EXTRACTION_INSTRUCTIONS }],
      },
      contents: [
        {
          role: "user",
          parts: [
            { text: EXTRACTION_USER_TEXT },
            ...pages.map((p) => ({
              inlineData: {
                mimeType: p.type,
                data: uint8ArrayToBase64(p.bytes),
              },
            })),
          ],
        },
      ],
      generationConfig: {
        temperature: 0,
        responseMimeType: "application/json",
      },
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(payload),
      signal,
    });

    if (!res.ok) {
      console.error("[aid-offers] Gemini API error status:", res.status);
      return {
        ok: false,
        code: "unreadable",
        message: "We couldn't read this letter. Try a clearer photo or the PDF from your school portal.",
      };
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return {
        ok: false,
        code: "unreadable",
        message: "We couldn't read this letter. Try a clearer photo or the PDF from your school portal.",
      };
    }

    const jsonParsed = JSON.parse(rawText);
    const output = ExtractionSchema.parse(jsonParsed);

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
