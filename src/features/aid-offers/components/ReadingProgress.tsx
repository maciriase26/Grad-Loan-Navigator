import { CheckCircle2, Loader2, Sparkles, XCircle } from "lucide-react";
import { useI18n } from "@/i18n";
import type { LetterUpload } from "../schema";

export function ReadingProgress({ letters }: { letters: LetterUpload[] }) {
  const { t, lang } = useI18n();

  const letterWord = lang === "es" ? (letters.length === 1 ? "carta" : "cartas") : letters.length === 1 ? "letter" : "letters";
  const titleText = t("aoc.ai.readingTitle")
    .replace("{count}", String(letters.length))
    .replace("{label}", letterWord);

  return (
      <section className="aoc-tool-wrapper mx-auto max-w-xl space-y-6 text-center" style={{ fontFamily: "var(--font-sans)" }} aria-live="polite">
        {/* Animated Compass Illustration */}
        <div className="mx-auto flex justify-center">
          <img
            src="/images/gn-animation-compare-offers.svg"
            width="800"
            height="600"
            alt={t("alt.anim.compareOffers")}
            loading="lazy"
            className="w-48 sm:w-56 h-auto aoc-tool-animation"
          />
        </div>

        <div className="space-y-2">
          <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Sparkles className="size-3.5 animate-pulse" aria-hidden />
            {t("aoc.ai.eyebrow")}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--ink)",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 700,
            }}
          >
            {titleText}
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "var(--ink-soft)" }}>
            {t("aoc.ai.readingSub")}
          </p>
        </div>

            <div
              className="rounded-[10px] p-0 overflow-hidden shadow-xs text-left"
              style={{
                background: "#ffffff",
                border: "1px solid var(--line)",
              }}
            >
              <div className="divide-y divide-[var(--line)]">
                {letters.map((l, i) => (
                    <div key={l.id} className="flex items-center gap-3.5 p-4">
                      {l.status === "done" ? (
                <CheckCircle2 className="size-5 shrink-0" style={{ color: "var(--teal)" }} aria-label="Done" />
                      ) : l.status === "failed" ? (
                <XCircle className="size-5 text-red-600 shrink-0" aria-label="Couldn't read" />
                      ) : (
                <Loader2 className="size-5 animate-spin shrink-0" style={{ color: "var(--teal)" }} aria-label="Reading" />
                      )}
                      <div className="min-w-0">
                          <p
                            className="text-xs font-bold uppercase tracking-wider"
                            style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}
                          >
                            {t("aoc.ai.letterIndex").replace("{n}", String(i + 1))}
                          </p>
                            <p className="truncate text-sm text-[var(--ink-soft)] font-medium">
                              {l.status === "failed" ? l.error : l.pages.map((p) => p.name).join(", ")}
                            </p>
                          </div>
                      </div>
          ))}
        </div>
            </div>
          </section>
          );
}
