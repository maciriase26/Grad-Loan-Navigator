import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LetterUpload } from "../schema";

export function ReadingProgress({ letters }: { letters: LetterUpload[] }) {
  return (
    <section className="mx-auto max-w-xl space-y-4" aria-live="polite">
      <h1 className="text-2xl font-bold">
        Reading {letters.length} {letters.length === 1 ? "letter" : "letters"}…
      </h1>
      <p className="text-muted-foreground">This usually takes about 10 seconds. You'll see your comparison as soon as they're done.</p>
      <Card>
        <CardContent className="divide-y p-0">
          {letters.map((l, i) => (
            <div key={l.id} className="flex items-center gap-3 p-4">
              {l.status === "done" ? (
                <CheckCircle2 className="size-5 text-emerald-700" aria-label="Done" />
              ) : l.status === "failed" ? (
                <XCircle className="size-5 text-red-700" aria-label="Couldn't read" />
              ) : (
                <Loader2 className="size-5 animate-spin text-muted-foreground" aria-label="Reading" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold">Letter {i + 1}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {l.status === "failed" ? l.error : l.pages.map((p) => p.name).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
