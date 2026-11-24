/**
 * Browser-side helpers: file checks, image downscaling, the API call,
 * analytics and number formatting.
 */
import { AID_OFFER_CONFIG } from "./config";
import type { ExtractResponse } from "./schema";

/* ---------------- files ---------------- */

const EXT_OK = /\.(jpe?g|png|heic|heif|pdf)$/i;

/** Quick check before upload. The server checks the real bytes again. */
export function checkFile(file: File): string | null {
  const typeOk = EXT_OK.test(file.name) || /^(image\/(jpeg|png|heic|heif)|application\/pdf)$/.test(file.type);
  if (!typeOk) return `${file.name}: use a JPG, PNG, HEIC or PDF.`;
  if (file.size > AID_OFFER_CONFIG.maxFileMb * 1024 * 1024) return `${file.name} is over ${AID_OFFER_CONFIG.maxFileMb} MB.`;
  return null;
}

/**
 * Shrinks large JPEG/PNG photos before upload: faster on phones, cheaper to
 * read, and the model doesn't need more than ~2400px. PDFs and HEIC pass
 * through untouched (most browsers can't draw HEIC to a canvas).
 */
export async function prepareForUpload(file: File): Promise<File> {
  if (!/^image\/(jpeg|png)$/.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const max = AID_OFFER_CONFIG.downscaleMaxPx;
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    if (scale === 1) {
      bitmap.close();
      return file;
    }
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.85));
    return blob ? new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" }) : file;
  } catch {
    return file;
  }
}

/* ---------------- API ---------------- */

export async function readLetter(pages: File[], signal?: AbortSignal): Promise<ExtractResponse> {
  const form = new FormData();
  for (const p of await Promise.all(pages.map(prepareForUpload))) form.append("page", p);

  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), AID_OFFER_CONFIG.requestTimeoutMs);
  const onAbort = () => timeout.abort();
  signal?.addEventListener("abort", onAbort);

  try {
    const res = await fetch("/api/aid-offers/extract", { method: "POST", body: form, signal: timeout.signal });
    return (await res.json()) as ExtractResponse;
  } catch {
    return { ok: false, code: "server_error", message: "That took too long or the connection dropped. Try again." };
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

/* ---------------- analytics ---------------- */

export type AidOfferEvent =
  | "aid_upload_started"
  | "aid_extraction_succeeded"
  | "aid_extraction_failed"
  | "aid_comparison_shown"
  | "aid_review_opened"
  | "aid_fields_edited"
  | "aid_manual_entry_started";

/**
 * Sends to GA4 through Tag Manager's dataLayer. Counts and codes only:
 * never send school names, amounts or anything from the letter.
 */
export function track(event: AidOfferEvent, props: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer ??= []).push({ event, ...props });
}

/* ---------------- formatting ---------------- */

export const usd = (n: number | null | undefined) =>
  n == null || Number.isNaN(n) ? "—" : `$${Math.round(n).toLocaleString("en-US")}`;
