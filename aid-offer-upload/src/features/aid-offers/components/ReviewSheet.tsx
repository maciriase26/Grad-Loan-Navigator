import { useEffect, useState } from "react";
import { Info, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { track, usd } from "../client";
import { COA_KEYS, COA_LABELS, LOAN_TYPE_LABELS, LOAN_TYPES, type LoanType } from "../config";
import type { Amount, LineItemValue, LoanItem, Offer } from "../schema";

const newId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()));

/**
 * Review and edit one offer. Every number shows the letter's wording next to
 * it. Saving marks every field as checked, which clears the amber flags.
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
      schoolName: draft.schoolName.trim() || "Untitled school",
      coa: Object.fromEntries(COA_KEYS.map((k) => [k, markChecked(draft.coa[k])])) as Offer["coa"],
      freeMoney: draft.freeMoney.map(markChecked),
      work: draft.work.map(markChecked),
      loans: draft.loans.map(markChecked),
    };
    if (edits) track("aid_fields_edited", { count: edits });
    onSave(final);
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{draft.source === "manual" ? "Enter an offer" : "Review numbers"}</SheetTitle>
          <SheetDescription>
            {draft.source === "manual"
              ? "Type the amounts from one school's letter."
              : "Amber fields were hard to read. Compare each one with your letter and fix anything that's off."}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-4">
          {[...draft.warnings, ...draft.notes].length > 0 && (
            <ul className="space-y-2">
              {[...draft.warnings, ...draft.notes].map((w, i) => (
                <li key={i} className="flex gap-2 rounded-md bg-muted p-2 text-sm">
                  <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {w}
                </li>
              ))}
            </ul>
          )}

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold">School</legend>
            <div className="space-y-1">
              <Label htmlFor="school">School name</Label>
              <Input id="school" value={draft.schoolName} onChange={(e) => edited({ ...draft, schoolName: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="level">Program type</Label>
              <select
                id="level"
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                value={draft.programLevel}
                onChange={(e) =>
                  edited({ ...draft, programLevel: e.target.value as Offer["programLevel"], programLevelGuessed: false })
                }
              >
                <option value="graduate">Master's or other graduate ($20,500/yr federal limit)</option>
                <option value="professional">Professional, like law or medicine ($50,000/yr federal limit)</option>
              </select>
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold">Cost of attendance (per year)</legend>
            {COA_KEYS.map((k) => (
              <MoneyField
                key={k}
                id={`coa-${k}`}
                label={COA_LABELS[k]}
                value={draft.coa[k]}
                onChange={(v) => setCoa(k, v)}
              />
            ))}
            <p className="text-right text-sm font-semibold">
              Total {usd(COA_KEYS.reduce((s, k) => s + (draft.coa[k].amount ?? 0), 0))}
            </p>
          </fieldset>

          <ItemList
            title="Scholarships and grants"
            items={draft.freeMoney}
            onChange={(id, patch) => edited({ ...draft, freeMoney: updateItem(draft.freeMoney, id, patch) })}
            onRemove={(id) => edited({ ...draft, freeMoney: draft.freeMoney.filter((x) => x.id !== id) })}
            onAdd={() =>
              edited({
                ...draft,
                freeMoney: [...draft.freeMoney, { id: newId(), label: "", amount: null, printedLabel: null, confidence: "high", checked: true, renewable: "unknown" }],
              })
            }
          />

          <ItemList
            title="Assistantships and work"
            items={draft.work}
            onChange={(id, patch) => edited({ ...draft, work: updateItem(draft.work, id, patch) })}
            onRemove={(id) => edited({ ...draft, work: draft.work.filter((x) => x.id !== id) })}
            onAdd={() =>
              edited({ ...draft, work: [...draft.work, { id: newId(), label: "", amount: null, printedLabel: null, confidence: "high", checked: true }] })
            }
          />

          <ItemList
            title="Loans on the letter"
            note="Loans don't lower your cost. They're listed so you can see what the school offered."
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
            renderExtra={(item) => {
              const loan = item as LoanItem;
              return (
                <>
                  <select
                    aria-label="Loan type"
                    className="h-9 w-full rounded-md border bg-background px-2 text-sm"
                    value={loan.type}
                    onChange={(e) =>
                      edited({ ...draft, loans: updateItem(draft.loans, loan.id, { type: e.target.value as LoanType }) })
                    }
                  >
                    {LOAN_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {LOAN_TYPE_LABELS[t]}
                      </option>
                    ))}
                  </select>
                  {loan.reclassifiedReason && <p className="text-xs text-amber-900">{loan.reclassifiedReason}</p>}
                </>
              );
            }}
          />
        </div>

        <SheetFooter className="sticky bottom-0 border-t bg-background">
          <Button className="w-full bg-emerald-700 hover:bg-emerald-800" onClick={save}>
            Save and update comparison
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

/* ---------------- fields ---------------- */

function parseMoney(raw: string): number | null {
  const n = Number(raw.replace(/[$,\s]/g, ""));
  return raw.trim() === "" || Number.isNaN(n) ? null : Math.max(0, Math.round(n));
}

function MoneyField({ id, label, value, onChange }: { id: string; label: string; value: Amount; onChange: (v: number | null) => void }) {
  const flagged = value.confidence === "low" && !value.checked;
  const missing = value.amount == null && !value.checked;
  return (
    <div className={`space-y-1 rounded-md ${flagged || missing ? "bg-amber-50 p-2" : ""}`}>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          inputMode="numeric"
          className="w-32 text-right tabular-nums"
          placeholder="Not listed"
          value={value.amount ?? ""}
          onChange={(e) => onChange(parseMoney(e.target.value))}
        />
      </div>
      {(value.printedLabel || value.convertedFromTerms || missing) && (
        <p className="text-xs text-muted-foreground">
          {value.printedLabel && <>On your letter: "{value.printedLabel}". </>}
          {value.convertedFromTerms && <>Multiplied by {value.convertedFromTerms} terms. </>}
          {missing && <>Not on the letter. Add it if you know it.</>}
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
}: {
  title: string;
  note?: string;
  items: T[];
  onChange: (id: string, patch: Partial<T>) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
  renderExtra?: (item: T) => React.ReactNode;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold">{title}</legend>
      {note && <p className="text-xs text-muted-foreground">{note}</p>}
      {items.map((item) => {
        const flagged = item.confidence === "low" && !item.checked;
        return (
          <div key={item.id} className={`space-y-2 rounded-md border p-2 ${flagged ? "border-amber-300 bg-amber-50" : ""}`}>
            <div className="flex gap-2">
              <Input
                aria-label="Name"
                placeholder="Name"
                value={item.label}
                onChange={(e) => onChange(item.id, { label: e.target.value } as Partial<T>)}
              />
              <Input
                aria-label="Amount per year"
                inputMode="numeric"
                className="w-32 text-right tabular-nums"
                placeholder="$0"
                value={item.amount ?? ""}
                onChange={(e) => onChange(item.id, { amount: parseMoney(e.target.value) } as Partial<T>)}
              />
              <Button size="icon" variant="ghost" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.label || "item"}`}>
                <Trash2 className="size-4" />
              </Button>
            </div>
            {renderExtra?.(item)}
            {item.printedLabel && <p className="text-xs text-muted-foreground">On your letter: "{item.printedLabel}"</p>}
            {item.convertedFromTerms && <p className="text-xs text-muted-foreground">Multiplied by {item.convertedFromTerms} terms.</p>}
          </div>
        );
      })}
      <Button size="sm" variant="outline" onClick={onAdd}>
        <Plus className="size-4" aria-hidden /> Add
      </Button>
    </fieldset>
  );
}
