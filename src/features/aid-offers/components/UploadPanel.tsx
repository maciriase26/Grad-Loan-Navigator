import { useRef, useState } from "react";
import { Camera, FileText, Lock, Plus, Sparkles, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/i18n";
import { AID_OFFER_CONFIG } from "../config";
import type { AidOffersApi } from "../useAidOffers";

export function UploadPanel({ api }: { api: AidOffersApi }) {
  const { t, lang } = useI18n();
  const { state, slotsLeft } = api;
  const fileInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);
  const [pageTarget, setPageTarget] = useState<string | undefined>();
  const [dragging, setDragging] = useState(false);
  const n = state.letters.length;
  const have = state.offers.length;

  const pick = (target?: string) => {
    setPageTarget(target);
    fileInput.current?.click();
  };
  const onFiles = (list: FileList | null) => {
    if (list?.length) api.addFiles(Array.from(list), pageTarget);
    setPageTarget(undefined);
    if (fileInput.current) fileInput.current.value = "";
    if (cameraInput.current) cameraInput.current.value = "";
  };

  const spotsLeftText = t("aoc.ai.dropZoneSubtitle")
    .replace("{left}", String(Math.max(slotsLeft, 0)))
    .replace("{max}", String(AID_OFFER_CONFIG.maxLetters));

  const compareBtnText = n
    ? t("aoc.ai.compareBtn")
      .replace("{n}", String(n))
      .replace("{label}", lang === "es" ? (n === 1 ? "oferta" : "ofertas") : n === 1 ? "offer" : "offers")
    : t("aoc.ai.compareBtnDefault");

  return (
      <section className="aoc-tool-wrapper space-y-6" style={{ fontFamily: "var(--font-sans)" }}>
        {/* Animated Hero Header matching Grad Navigator style */}
        <div className="tool-header">
          <div className="aoc-header-flex">
                <div className="aoc-header-text">
                  <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Sparkles className="size-3.5" aria-hidden />
                    {t("aoc.ai.eyebrow")}
                  </span>
                  <h1
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--ink)",
                      lineHeight: 1.15,
                      margin: "0 0 12px",
                    }}
                  >
                    {have ? t("aoc.ai.h1AddMore") : t("aoc.ai.h1")}
                  </h1>
                    <p className="sub" style={{ color: "var(--ink-soft)" }}>
                      {t("aoc.ai.subtitle")}
                    </p>
                </div>
                <div className="aoc-header-media">
                  <img
                    src="/images/gn-animation-compare-offers.svg"
                    width="800"
                    height="600"
                    alt={t("alt.anim.compareOffers")}
                    loading="lazy"
                    className="aoc-tool-animation"
                  />
                </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                  {/* Main Upload Card */}
                  <div
                    className="rounded-[10px] p-5 sm:p-6 shadow-xs space-y-4"
                    style={{
                      background: "#ffffff",
                      border: "1px solid var(--line)",
                    }}
                  >
                    {/* Privacy Banner */}
                    <p
                      className="flex items-start gap-2.5 rounded-md p-3 text-sm"
                      style={{
                        background: "color-mix(in oklch, var(--teal) 8%, transparent)",
                        border: "1px solid color-mix(in oklch, var(--teal) 22%, transparent)",
                        color: "var(--ink)",
                      }}
                    >
                      <Lock className="mt-0.5 size-4 shrink-0" style={{ color: "var(--teal)" }} aria-hidden />
                      <span>{t("aoc.ai.privacyNotice")}</span>
                    </p>

                    {/* Drag & Drop Area */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                      }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        onFiles(e.dataTransfer.files);
                      }}
                      className="rounded-lg border-2 border-dashed p-6 sm:p-8 text-center transition-colors cursor-pointer"
                      style={{
                        borderColor: dragging ? "var(--teal)" : "var(--line)",
                        background: dragging ? "color-mix(in oklch, var(--teal) 6%, transparent)" : "var(--card-paper)",
                      }}
                      onClick={() => pick()}
                    >
                      <Upload className="mx-auto mb-2.5 size-7" style={{ color: "var(--teal)" }} aria-hidden />
                      <p
                        className="font-semibold text-base sm:text-lg"
                        style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                      >
                        {t("aoc.ai.dropZoneTitle")}
                      </p>
                      <p className="mt-1 text-sm" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-soft)" }}>
                        {spotsLeftText}
                      </p>
                      <div
                        className="mt-5 flex flex-wrap justify-center gap-2.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => pick()}
                          disabled={slotsLeft <= 0}
                          className="btn-primary"
                          style={{
                            background: "var(--ink)",
                            color: "#ffffff",
                            padding: "8px 18px",
                            borderRadius: "6px",
                            fontSize: "13.5px",
                            fontWeight: 600,
                            cursor: slotsLeft <= 0 ? "not-allowed" : "pointer",
                          }}
                        >
                          {t("aoc.ai.chooseFiles")}
                        </button>
                        <button
                          type="button"
                          onClick={() => cameraInput.current?.click()}
                          disabled={slotsLeft <= 0}
                          className="btn-secondary flex items-center gap-1.5"
                          style={{
                            background: "#ffffff",
                            border: "1px solid var(--line)",
                            color: "var(--ink)",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            fontSize: "13.5px",
                            fontWeight: 600,
                            cursor: slotsLeft <= 0 ? "not-allowed" : "pointer",
                          }}
                        >
                          <Camera className="size-4" style={{ color: "var(--teal)" }} aria-hidden />
                          <span>{t("aoc.ai.takePhoto")}</span>
                        </button>
                      </div>
                    </div>

                                  {/* Letter Upload Queue List */}
                                  {n > 0 && (
                                    <ul className="space-y-2.5 pt-2">
                                      {state.letters.map((letter, i) => (
                                        <li
                                          key={letter.id}
                                          className="rounded-lg p-3.5 space-y-2"
                                          style={{
                                            background: "var(--card-paper)",
                                            border: "1px solid var(--line)",
                                          }}
                                        >
                                          <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0 space-y-1">
                                              <p
                                                className="text-sm font-bold uppercase tracking-wider"
                                                style={{ fontFamily: "var(--font-mono)", color: "var(--teal)" }}
                                              >
                                                {t("aoc.ai.letterIndex").replace("{n}", String(have + i + 1))}
                                              </p>
                                              {letter.pages.map((page, j) => (
                                                <p key={j} className="flex min-w-0 items-center gap-2 text-sm text-[var(--ink-soft)]">
                                                  <FileText className="size-4 shrink-0 text-[var(--ink-soft)]" aria-hidden />
                                                  <span className="truncate font-medium">{page.name}</span>
                                                  <button
                                                    type="button"
                                                    className="shrink-0 rounded p-1 hover:bg-slate-200 text-[var(--ink-soft)] hover:text-red-700 cursor-pointer"
                                                    onClick={() => api.removePage(letter.id, j)}
                                                    aria-label={t("aoc.ai.removePage")}
                                                  >
                                                    <X className="size-3" />
                                                  </button>
                                                </p>
                      ))}
                                          </div>
                                  <button
                                    type="button"
                                    className="rounded p-1 hover:bg-slate-200 text-[var(--ink-soft)] hover:text-red-700 cursor-pointer"
                                    onClick={() => api.removeLetter(letter.id)}
                                    aria-label={t("aoc.ai.removeLetter")}
                                  >
                                    <X className="size-4" />
                                  </button>
                              </div>
                              {letter.pages.length < AID_OFFER_CONFIG.maxPagesPerLetter && (
                                <button
                                  type="button"
                                  className="mt-1 flex items-center gap-1 text-xs font-semibold hover:underline cursor-pointer"
                                  style={{ color: "var(--teal)" }}
                                  onClick={() => pick(letter.id)}
                                >
                                  <Plus className="size-3" aria-hidden /> {t("aoc.ai.addPage")}
                                </button>
                              )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {state.fileError && (
                      <p role="alert" className="text-sm text-red-700 font-medium">
                        {state.fileError}
                      </p>
                    )}

                        {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
                        <button
                          type="button"
                          disabled={!n}
                          onClick={api.readAll}
                          className="btn-primary"
                          style={{
                            background: n ? "var(--teal)" : "var(--line)",
                            color: "#ffffff",
                            padding: "10px 20px",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: 600,
                            cursor: !n ? "not-allowed" : "pointer",
                            border: "none",
                          }}
                        >
                          {compareBtnText}
                        </button>
                        <button
                          type="button"
                          onClick={api.addManual}
                          className="cursor-pointer text-sm font-semibold underline underline-offset-4"
                          style={{ color: "var(--ink-soft)" }}
                        >
                          {t("aoc.ai.enterHandInstead")}
                        </button>
                        {have > 0 && (
              <button
                type="button"
                onClick={() => api.goTo("results")}
                className="cursor-pointer text-sm font-semibold"
                style={{ color: "var(--teal)" }}
              >
                  {t("aoc.ai.backToComparison")}
                </button>
            )}
              </div>
          </div>

          {/* Tips Sidebar Card */}
          <div
            className="rounded-[10px] p-5 shadow-xs h-fit space-y-3"
            style={{
              background: "var(--card-paper)",
              border: "1px solid var(--line)",
            }}
          >
            <p
              className="text-sm font-bold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}
            >
              {t("aoc.ai.tipsTitle")}
            </p>
            <ol className="list-decimal space-y-2.5 pl-4 text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
              <li>{t("aoc.ai.tip1")}</li>
              <li>{t("aoc.ai.tip2")}</li>
              <li>{t("aoc.ai.tip3")}</li>
              <li>{t("aoc.ai.tip4")}</li>
            </ol>
          </div>
        </div>

        <input
          ref={fileInput}
          type="file"
          hidden
          multiple={!pageTarget}
          accept=".jpg,.jpeg,.png,.heic,.heif,.pdf,image/jpeg,image/png,image/heic,image/heif,application/pdf"
          onChange={(e) => onFiles(e.target.files)}
        />
        <input ref={cameraInput} type="file" hidden accept="image/*" capture="environment" onChange={(e) => onFiles(e.target.files)} />
      </section>
      );
}
