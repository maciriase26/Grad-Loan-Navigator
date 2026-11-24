import { useEffect, useState } from "react";
import { Info, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useI18n } from "@/i18n";
import { track, usd } from "../client";
import { COA_KEYS, COA_LABELS, LOAN_TYPE_LABELS, LOAN_TYPES, type CoaKey, type LoanType } from "../config";
import type { Amount, LineItemValue, LoanItem, Offer } from "../schema";

const newId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()));

const COA_LABELS_ES: Record<CoaKey, string> = {
  tuition: "Matrícula",
  fees: "Cuotas y tarifas",
  housing_and_food: "Alojamiento y comida",
  books_and_supplies: "Libros y suministros",
  transportation: "Transporte",
  health_insurance: "Seguro médico",
  personal_misc: "Gastos personales y varios",
};

const LOAN_TYPE_LABELS_ES: Record<LoanType, string> = {
  direct_unsubsidized: "Federal Directo No Subsidiado",
  grad_plus: "Grad PLUS (Cerrado)",
  private: "Préstamo privado",
  institutional: "Préstamo institucional",
  other: "Otro préstamo",
};

/**
 * Review and edit one offer with Grad Navigator design system tokens.
 */
export function ReviewSheet({
  offer,
  open,
  onClose,
  onSave,
}: {
  offer: Offer | null;
  open: boolean;
  onClose: () => void;
  onSave: (offer: Offer) => void;
}) {
  const { t, lang } = useI18n();
  const [draft, setDraft] = useState<Offer | null>(offer);
  const [edits, setEdits] = useState(0);

  useEffect(() => {
    setDraft(offer);
    setEdits(0);
  }, [offer]);

  if (!draft) return null;

  const edited = (next: Offer) => {
    setDraft(next);
    setEdits((n) => n + 1);
  };

  const setCoa = (key: (typeof COA_KEYS)[number], amount: number | null) =>
    edited({ ...draft, coa: { ...draft.coa, [key]: { ...draft.coa[key], amount, checked: true } } });

  const updateItem = <T extends LineItemValue>(list: T[], id: string, patch: Partial<T>) =>
    list.map((x) => (x.id === id ? { ...x, ...patch, checked: true } : x));

  const save = () => {
    const markChecked = <T extends Amount>(x: T): T => ({ ...x, checked: true });
    const final: Offer = {
      ...draft,
      schoolName: draft.schoolName.trim() || (lang === "es" ? "Universidad sin título" : "Untitled school"),
      coa: Object.fromEntries(COA_KEYS.map((k) => [k, markChecked(draft.coa[k])])) as Offer["coa"],
      freeMoney: draft.freeMoney.map(markChecked),
      work: draft.work.map(markChecked),
      loans: draft.loans.map(markChecked),
    };
    if (edits) track("aid_fields_edited", { count: edits });
    onSave(final);
  };

  const coaLabels = lang === "es" ? COA_LABELS_ES : COA_LABELS;
  const loanLabels = lang === "es" ? LOAN_TYPE_LABELS_ES : LOAN_TYPE_LABELS;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
            <SheetContent
              side="right"
              className="w-full overflow-y-auto sm:max-w-lg bg-[#ffffff] border-l border-[var(--line)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <SheetHeader className="border-b border-[var(--line)] pb-4">
                <SheetTitle
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                >
                  {draft.source === "manual" ? t("aoc.ai.sheetTitleManual") : t("aoc.ai.sheetTitleReview")}
                </SheetTitle>
                  <SheetDescription className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed">
                    {draft.source === "manual"
                      ? t("aoc.ai.sheetDescManual")
                      : t("aoc.ai.sheetDescReview")}
                  </SheetDescription>
              </SheetHeader>

                <div className="space-y-6 px-4 py-4">
                  {[...draft.warnings, ...draft.notes].length > 0 && (
                    <ul className="space-y-2">
                      {[...draft.warnings, ...draft.notes].map((w, i) => (
                          <li
                            key={i}
                            className="flex gap-2 rounded-md p-2.5 text-xs text-[#7b341e]"
                            style={{
                              background: "#fffaf0",
                              border: "1px solid #feebc8",
                            }}
                          >
                            <Info className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden />
                            <span>{w}</span>
                          </li>
              ))}
                        </ul>
                      )}

                      {/* School Details */}
                      <fieldset className="space-y-3">
                        <legend
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}
                        >
                          {t("aoc.ai.sheetSchoolLegend")}
                        </legend>
                        <div className="space-y-1">
                          <label htmlFor="school" className="text-xs font-medium text-[var(--ink)] block">
                            {t("aoc.ai.sheetSchoolNameLabel")}
                          </label>
                          <input
                            id="school"
                            className="w-full rounded-md px-3 py-2 text-sm border focus:outline-none"
                            style={{
                              background: "var(--card-paper)",
                              borderColor: "var(--line)",
                              color: "var(--ink)",
                            }}
                            value={draft.schoolName}
                            onChange={(e) => edited({ ...draft, schoolName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="level" className="text-xs font-medium text-[var(--ink)] block">
                            {t("aoc.ai.sheetProgramTypeLabel")}
                          </label>
                          <select
                            id="level"
                            className="h-9 w-full rounded-md px-3 text-sm border bg-[var(--card-paper)] focus:outline-none"
                            style={{
                              borderColor: "var(--line)",
                              color: "var(--ink)",
                            }}
                            value={draft.programLevel}
                            onChange={(e) =>
                              edited({ ...draft, programLevel: e.target.value as Offer["programLevel"], programLevelGuessed: false })
                            }
                          >
                            <option value="graduate">{t("aoc.ai.sheetGraduateOption")}</option>
                            <option value="professional">{t("aoc.ai.sheetProfessionalOption")}</option>
                          </select>
                        </div>
                      </fieldset>

                        {/* Cost of Attendance */}
                        <fieldset className="space-y-3 border-t border-[var(--line)] pt-4">
                          <legend
                            className="text-xs font-bold uppercase tracking-wider"
                            style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}
                          >
                            {t("aoc.ai.sheetCostLegend")}
                          </legend>
                          {COA_KEYS.map((k) => (
                            <MoneyField
                              key={k}
                              id={`coa-${k}`}
                              label={coaLabels[k]}
                              value={draft.coa[k]}
                              onChange={(v) => setCoa(k, v)}
                              lang={lang}
                            />
                          ))}
                            <p
                              className="text-right text-sm font-bold pt-2 border-t border-[var(--line)]"
                              style={{ fontFamily: "var(--font-mono)", color: "var(--teal)" }}
                            >
                              {lang === "es" ? "Total COA: " : "Total COA: "}
                              {usd(COA_KEYS.reduce((s, k) => s + (draft.coa[k].amount ?? 0), 0))}
                            </p>
                        </fieldset>

                        {/* Free Money */}
                        <ItemList
                          title={t("aoc.ai.sheetFreeMoneyLegend")}
                          items={draft.freeMoney}
                          onChange={(id, patch) => edited({ ...draft, freeMoney: updateItem(draft.freeMoney, id, patch) })}
                          onRemove={(id) => edited({ ...draft, freeMoney: draft.freeMoney.filter((x) => x.id !== id) })}
                          onAdd={() =>
                            edited({
                              ...draft,
                              freeMoney: [...draft.freeMoney, { id: newId(), label: "", amount: null, printedLabel: null, confidence: "high", checked: true, renewable: "unknown" }],
                            })
                          }
                          lang={lang}
                        />

                        {/* Work / Assistantships */}
                        <ItemList
                          title={t("aoc.ai.sheetWorkLegend")}
                          items={draft.work}
                          onChange={(id, patch) => edited({ ...draft, work: updateItem(draft.work, id, patch) })}
                          onRemove={(id) => edited({ ...draft, work: draft.work.filter((x) => x.id !== id) })}
                          onAdd={() =>
                            edited({ ...draft, work: [...draft.work, { id: newId(), label: "", amount: null, printedLabel: null, confidence: "high", checked: true }] })
                          }
                          lang={lang}
                        />

                        {/* Loans */}
                        <ItemList
                          title={t("aoc.ai.sheetLoansLegend")}
                          note={t("aoc.ai.loansNotice")}
                          items={draft.loans}
                          onChange={(id, patch) => edited({ ...draft, loans: updateItem(draft.loans, id, patch as Partial<LoanItem>) })}
                          onRemove={(id) => edited({ ...draft, loans: draft.loans.filter((x) => x.id !== id) })}
                          onAdd={() =>
                            edited({
                              ...draft,
                              loans: [
                                ...draft.loans,
                                { id: newId(), label: "", amount: null, printedLabel: null, confidence: "high", checked: true, type: "other", reclassifiedReason: null },
                              ],
                            })
                          }
                          lang={lang}
                          renderExtra={(item) => {
                            const loan = item as LoanItem;
                            return (
                              <>
                                <select
                                  aria-label="Loan type"
                                  className="h-8 w-full rounded-md border text-xs px-2 bg-white"
                                  style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                                  value={loan.type}
                                  onChange={(e) =>
                                    edited({ ...draft, loans: updateItem(draft.loans, loan.id, { type: e.target.value as LoanType }) })
                                  }
                                >
                                  {LOAN_TYPES.map((tKey) => (
                                    <option key={tKey} value={tKey}>
                                      {loanLabels[tKey]}
                                    </option>
                                  ))}
                                </select>
                                {loan.reclassifiedReason && <p className="text-xs text-amber-800">{loan.reclassifiedReason}</p>}
                              </>
                            );
                          }}
                        />
                      </div>

                          <SheetFooter className="sticky bottom-0 border-t border-[var(--line)] bg-white p-4">
                            <button
                              type="button"
                              className="btn-primary w-full text-center"
                              style={{
                                background: "var(--teal)",
                                color: "#ffffff",
                                padding: "10px 18px",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: "pointer",
                                border: "none",
                              }}
                              onClick={save}
                            >
                              {t("aoc.ai.sheetSaveBtn")}
                          </button>
                      </SheetFooter>
                    </SheetContent>
    </Sheet>
                );
}

                /* ---------------- field helpers ---------------- */

                function parseMoney(raw: string): number | null {
  const n = Number(raw.replace(/[$,\s]/g, ""));
                return raw.trim() === "" || Number.isNaN(n) ? null : Math.max(0, Math.round(n));
}

                function MoneyField({
                  id,
                  label,
                  value,
                  onChange,
                  lang,
}: {
                  id: string;
                label: string;
                value: Amount;
  onChange: (v: number | null) => void;
                lang: string;
}) {
  const flagged = value.confidence === "low" && !value.checked;
                const missing = value.amount == null && !value.checked;
                return (
                  <div
                    className={`space-y-1 rounded-md p-2 transition-colors ${flagged || missing ? "bg-amber-50/60 border border-amber-200" : ""
                      }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                        <label htmlFor={id} className="text-xs sm:text-sm font-medium text-[var(--ink)]">
                        {label}
                      </label>
                      <input
                        id={id}
                        inputMode="numeric"
                        className="w-28 sm:w-32 rounded-md px-2.5 py-1.5 text-right tabular-nums text-sm border focus:outline-none"
                        style={{
                          fontFamily: "var(--font-mono)",
                          background: "var(--card-paper)",
                          borderColor: "var(--line)",
                          color: "var(--ink)",
                        }}
                        placeholder={lang === "es" ? "No indicado" : "Not listed"}
                        value={value.amount ?? ""}
                        onChange={(e) => onChange(parseMoney(e.target.value))}
                      />
                    </div>
                    {(value.printedLabel || value.convertedFromTerms || missing) && (
                        <p className="text-[11px] text-[var(--ink-soft)] leading-tight">
                          {value.printedLabel && (
                            <>{lang === "es" ? "En la carta: " : "On your letter: "}"{value.printedLabel}". </>
                          )}
                          {value.convertedFromTerms && (
                            <>{lang === "es" ? `Multiplicado por ${value.convertedFromTerms} períodos.` : `Multiplied by ${value.convertedFromTerms} terms.`} </>
                          )}
                          {missing && (
                            <>{lang === "es" ? "No está en la carta. Agrégalo si lo sabes." : "Not on the letter. Add it if you know it."}</>
                          )}
                        </p>
      )}
                      </div>
                    );
}

                    function ItemList<T extends LineItemValue>({
                      title,
                      note,
                      items,
                      onChange,
                      onRemove,
                      onAdd,
                      renderExtra,
                      lang,
}: {
                        title: string;
                      note?: string;
                      items: T[];
                      onChange: (id: string, patch: Partial<T>) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
  renderExtra?: (item: T) => React.ReactNode;
                        lang: string;
}) {
  return (
                          <fieldset className="space-y-3 border-t border-[var(--line)] pt-4">
                            <legend
                              className="text-xs font-bold uppercase tracking-wider"
                              style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}
                            >
                              {title}
                            </legend>
                            {note && <p className="text-xs text-[var(--ink-soft)] italic">{note}</p>}
                            {items.map((item) => {
                              const flagged = item.confidence === "low" && !item.checked;
                              return (
                                  <div
                                    key={item.id}
                                    className={`space-y-2 rounded-md p-2.5 border ${flagged ? "border-amber-300 bg-amber-50/50" : "border-[var(--line)] bg-[var(--card-paper)]"
                                      }`}
                                  >
                                    <div className="flex gap-2">
                                        <input
                aria-label={lang === "es" ? "Nombre" : "Name"}
                                        placeholder={lang === "es" ? "Nombre del concepto" : "Name"}
                                        className="flex-1 rounded-md px-2.5 py-1 text-sm border bg-white focus:outline-none"
                                        style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                                        value={item.label}
                                        onChange={(e) => onChange(item.id, { label: e.target.value } as Partial<T>)}
                                      />
                                        <input
                aria-label={lang === "es" ? "Monto anual" : "Amount per year"}
                                        inputMode="numeric"
                                        className="w-24 sm:w-28 rounded-md px-2.5 py-1 text-right tabular-nums text-sm border bg-white focus:outline-none"
                                        style={{
                                          fontFamily: "var(--font-mono)",
                                          borderColor: "var(--line)",
                                          color: "var(--ink)",
                                        }}
                                        placeholder="$0"
                                        value={item.amount ?? ""}
                                        onChange={(e) => onChange(item.id, { amount: parseMoney(e.target.value) } as Partial<T>)}
                                      />
                                        <button
                                          type="button"
                                          onClick={() => onRemove(item.id)}
                                          aria-label={lang === "es" ? "Eliminar" : "Remove"}
                                          className="text-[var(--ink-soft)] hover:text-red-700 p-1 cursor-pointer"
                                        >
                                          <Trash2 className="size-4" />
                                    </button>
                                  </div>
                                  {renderExtra?.(item)}
                                  {item.printedLabel && (
                                      <p className="text-[11px] text-[var(--ink-soft)]">
                                        {lang === "es" ? "En tu carta: " : "On your letter: "}"{item.printedLabel}"
                                      </p>
            )}
                                      {item.convertedFromTerms && (
                                          <p className="text-[11px] text-[var(--ink-soft)]">
                                            {lang === "es" ? `Multiplicado por ${item.convertedFromTerms} períodos.` : `Multiplied by ${item.convertedFromTerms} terms.`}
                                          </p>
            )}
                                        </div>
                                      );
      })}
                                      <button
                                        type="button"
                                        onClick={onAdd}
                                        className="btn-secondary flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-[5px] cursor-pointer"
                                        style={{
                                          background: "var(--card-paper)",
                                          border: "1px solid var(--line)",
                                          color: "var(--ink)",
                                        }}
                                      >
                                        <Plus className="size-3.5" style={{ color: "var(--teal)" }} aria-hidden />
                                        <span>{lang === "es" ? "Añadir concepto" : "Add item"}</span>
                                      </button>
                                    </fieldset>
                                  );
}
