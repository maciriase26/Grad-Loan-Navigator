import { useRef, useState } from "react";
import { Camera, FileText, Lock, Plus, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AID_OFFER_CONFIG } from "../config";
import type { AidOffersApi } from "../useAidOffers";

export function UploadPanel({ api }: { api: AidOffersApi }) {
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

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Aid offer comparison</p>
        <h1 className="text-balance text-2xl font-bold md:text-3xl">
          {have ? "Add more aid offers" : "Upload your aid offers. See them side by side."}
        </h1>
        <p className="max-w-prose text-muted-foreground">
          Add a letter from each school, up to {AID_OFFER_CONFIG.maxLetters}. We'll read them all at once and show what each one really
          costs, how much federal loans cover, and the gap that's left.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <Card>
          <CardContent className="space-y-4 p-4 md:p-6">
            <p className="flex items-start gap-2 rounded-md bg-emerald-50 p-3 text-sm text-emerald-900">
              <Lock className="mt-0.5 size-4 shrink-0" aria-hidden />
              We only keep the dollar amounts. Your letters are deleted as soon as they're read.
            </p>

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
              className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                dragging ? "border-emerald-600 bg-emerald-50" : "border-border"
              }`}
            >
              <Upload className="mx-auto mb-2 size-6 text-emerald-700" aria-hidden />
              <p className="font-semibold">Drop your aid letters here</p>
              <p className="mt-1 text-sm text-muted-foreground">
                One file per school · photo, screenshot or PDF · {Math.max(slotsLeft, 0)} of {AID_OFFER_CONFIG.maxLetters} spots left
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button onClick={() => pick()} disabled={slotsLeft <= 0}>
                  Choose files
                </Button>
                <Button variant="outline" onClick={() => cameraInput.current?.click()} disabled={slotsLeft <= 0}>
                  <Camera className="size-4" aria-hidden /> Take a photo
                </Button>
              </div>
            </div>

            {n > 0 && (
              <ul className="space-y-2">
                {state.letters.map((letter, i) => (
                  <li key={letter.id} className="rounded-md border p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 space-y-1">
                        <p className="text-sm font-semibold">Letter {have + i + 1}</p>
                        {letter.pages.map((page, j) => (
                          <p key={j} className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="size-4 shrink-0" aria-hidden />
                            <span className="truncate">{page.name}</span>
                            <button
                              className="shrink-0 rounded p-1 hover:bg-muted"
                              onClick={() => api.removePage(letter.id, j)}
                              aria-label={`Remove ${page.name}`}
                            >
                              <X className="size-3" />
                            </button>
                          </p>
                        ))}
                      </div>
                      <button className="rounded p-1 hover:bg-muted" onClick={() => api.removeLetter(letter.id)} aria-label={`Remove letter ${have + i + 1}`}>
                        <X className="size-4" />
                      </button>
                    </div>
                    {letter.pages.length < AID_OFFER_CONFIG.maxPagesPerLetter && (
                      <button className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-700 hover:underline" onClick={() => pick(letter.id)}>
                        <Plus className="size-3" aria-hidden /> Add page to this letter
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {state.fileError && (
              <p role="alert" className="text-sm text-red-700">
                {state.fileError}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Button className="bg-emerald-700 hover:bg-emerald-800" disabled={!n} onClick={api.readAll}>
                {n ? `Compare ${n} ${n === 1 ? "offer" : "offers"}` : "Compare my offers"}
              </Button>
              <Button variant="link" onClick={api.addManual}>
                Enter numbers by hand instead
              </Button>
              {have > 0 && (
                <Button variant="link" onClick={() => api.goTo("results")}>
                  Back to comparison
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardContent className="space-y-2 p-4 text-sm">
            <p className="font-semibold">Tips for a clean read</p>
            <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
              <li>Use the PDF or a screenshot from your school portal if you can.</li>
              <li>Each file counts as a different school. For a multi-page letter, use "Add page".</li>
              <li>Include footnotes. That's where loans hide.</li>
              <li>Lay paper letters flat in good light.</li>
            </ol>
          </CardContent>
        </Card>
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
