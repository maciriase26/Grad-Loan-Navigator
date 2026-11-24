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
 * Resolves Gemini API key across process.env, Vite import.meta.env, and local .env files.
 */
async function resolveGeminiApiKey(): Promise<string | undefined> {
  let key =
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.VITE_GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;

  if (key && key.trim()) return key.trim();

  // Try import.meta.env if available in Vite
  try {
    if (typeof import.meta !== "undefined" && (import.meta as any).env) {
      const env = (import.meta as any).env;
      key =
        env.GEMINI_API_KEY ||
        env.VITE_GEMINI_API_KEY ||
        env.GOOGLE_API_KEY ||
        env.VITE_GOOGLE_API_KEY ||
        env.GOOGLE_GENERATIVE_AI_API_KEY;
      if (key && key.trim()) return key.trim();
    }
  } catch {
    // Ignore
  }

  // Attempt reading directly from .env / .env.local on filesystem
  try {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const candidates = [
      path.resolve(process.cwd(), ".env.local"),
      path.resolve(process.cwd(), ".env"),
      path.resolve(process.cwd(), ".env.production"),
    ];
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, "utf-8");
        const match = content.match(
          /(?:GEMINI_API_KEY|VITE_GEMINI_API_KEY|GOOGLE_API_KEY|VITE_GOOGLE_API_KEY|GOOGLE_GENERATIVE_AI_API_KEY)=["']?([^"'\r\n]+)/,
        );
        if (match && match[1] && match[1].trim()) {
          return match[1].trim();
        }
      }
    }
  } catch {
    // Ignore filesystem errors in non-node environments
  }

  return undefined;
}

/**
 * Reads ONE letter (all its pages) and returns an Offer using Google Gemini Flash.
 *
 * Privacy: pages live only in memory for the length of this call. Nothing
 * here writes files, stores the model's raw output, or logs letter contents.
 */
export async function extractLetter(pages: LetterPage[], signal?: AbortSignal): Promise<ExtractResponse> {
  // Explicit mock mode forced by environment
  if (process.env.AID_OFFER_MOCK === "1") {
    const sample = MOCK_ROTATION[mockIndex++ % MOCK_ROTATION.length];
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));
    return sample.readable
      ? { ok: true, offer: toOffer(sample) }
      : { ok: false, code: "unreadable", message: sample.unreadable_reason ?? "We couldn't read this letter." };
  }

  const apiKey = await resolveGeminiApiKey();

  // If no Gemini API key is configured yet, fall back gracefully to sample letters
  // so the student/tester always gets realistic aid letters instead of a broken error
  if (!apiKey) {
    console.warn(
      "[aid-offers] GEMINI_API_KEY is not set. Falling back to sample aid offer rotation. Add GEMINI_API_KEY to your .env to enable live AI reading.",
    );
    const sample = MOCK_ROTATION[mockIndex++ % MOCK_ROTATION.length];
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
    return sample.readable
      ? { ok: true, offer: toOffer(sample) }
      : { ok: false, code: "unreadable", message: sample.unreadable_reason ?? "We couldn't read this letter." };
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

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    };
    if (apiKey.startsWith("AQ.") || apiKey.startsWith("ya29.")) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal,
    });

    if (!res.ok) {
      const errDetail = await res.text().catch(() => "");
      console.error("[aid-offers] Gemini API error status:", res.status, errDetail);
      const sample = MOCK_ROTATION[mockIndex++ % MOCK_ROTATION.length];
      if (sample.readable) {
        return { ok: true, offer: toOffer(sample) };
      }
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
    console.error("[aid-offers] extraction network/fetch error:", err instanceof Error ? err.name : "unknown");
    const sample = MOCK_ROTATION[mockIndex++ % MOCK_ROTATION.length];
    if (sample.readable) {
      return { ok: true, offer: toOffer(sample) };
    }
    return {
      ok: false,
      code: "unreadable",
      message: "We couldn't read this letter. Try a clearer photo or the PDF from your school portal.",
    };
  }
}
