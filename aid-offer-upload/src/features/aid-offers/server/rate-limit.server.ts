import { createClient } from "@supabase/supabase-js";
import { AID_OFFER_CONFIG } from "../config";

/**
 * Per-visitor limit on letters read. The visitor is a salted SHA-256 hash of
 * their IP address, so no raw IP is ever stored.
 *
 * Uses the aid_offer_rate_hit() function from the migration in
 * supabase/migrations. If Supabase isn't configured (local dev), it falls
 * back to an in-memory counter, which resets on every deploy and is not
 * shared across server instances.
 */

const memory = new Map<string, { windowStart: number; count: number }>();

export async function visitorKey(request: Request): Promise<string> {
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const salt = process.env.AID_OFFER_IP_SALT ?? "";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${ip}`));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Records one letter for this visitor. Returns false if they are over the limit. */
export async function takeLetterSlot(key: string): Promise<boolean> {
  const { lettersPerWindow, windowSeconds } = AID_OFFER_CONFIG.rateLimit;
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && serviceKey) {
    const supabase = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await supabase.rpc("aid_offer_rate_hit", {
      p_key: key,
      p_limit: lettersPerWindow,
      p_window_seconds: windowSeconds,
    });
    if (!error) return data === true;
    // Fail open on a database error so an outage doesn't block students, but log it.
    console.error("[aid-offers] rate limit check failed:", error.message);
    return true;
  }

  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || now - entry.windowStart > windowSeconds * 1000) {
    memory.set(key, { windowStart: now, count: 1 });
    return true;
  }
  if (entry.count >= lettersPerWindow) return false;
  entry.count += 1;
  return true;
}
