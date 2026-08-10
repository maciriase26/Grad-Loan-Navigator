import { useCallback, useEffect, useState } from "react";
import { Mail, X, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";

const OPEN_EVENT = "grad-navigator:open-contact";

/** Open the contact pop-up from anywhere on the site. */
export function openContactDialog() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

const REASONS = [
  { value: "question", key: "contact.reason.question" },
  { value: "correction", key: "contact.reason.correction" },
  { value: "partnership", key: "contact.reason.partnership" },
  { value: "other", key: "contact.reason.other" },
] as const;

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  reason: z.string().trim().min(1).max(100),
  message: z.string().trim().max(2000).optional(),
});

export function ContactDialog() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState<string>(REASONS[0].value);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const onOpen = () => {
      setStatus("idle");
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const parsed = schema.safeParse({ name, email, reason, message });
      if (!parsed.success) {
        setStatus("error");
        setErrorText(t("contact.invalid"));
        return;
      }
      setStatus("sending");
      const { error } = await supabase.from("contact_messages").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        reason: parsed.data.reason,
        message: parsed.data.message || null,
      });
      if (error) {
        setStatus("error");
        setErrorText(t("contact.failed"));
        return;
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setReason(REASONS[0].value);
    },
    [name, email, reason, message, t],
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("contact.title")}
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-card sm:inset-auto sm:right-5 sm:bottom-24 sm:max-h-[calc(100dvh-9rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-foreground/12 sm:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.5)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <header className="flex items-center gap-3 border-b border-foreground/10 px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
          <Mail className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] leading-tight text-foreground">
            {t("contact.title")}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t("contact.close")}
          className="-mr-1 rounded-full p-1.5 text-foreground/60 transition-colors hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </header>

      {status === "sent" ? (
        <div className="flex flex-1 flex-col items-start gap-3 px-4 py-6">
          <CheckCircle2 className="h-8 w-8 text-primary" />
          <p className="font-display text-[17px] text-foreground">{t("contact.sent.title")}</p>
          <p className="text-sm text-muted-foreground">{t("contact.sent.body")}</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-foreground px-4 py-2 text-xs text-background"
          >
            {t("contact.close")}
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-1 flex-col gap-3 px-4 py-4">
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {t("contact.name")}
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
              className="min-h-11 rounded-xl border border-foreground/15 bg-background px-3 text-[16px] text-foreground outline-none focus:border-primary"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {t("contact.email")}
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              required
              className="min-h-11 rounded-xl border border-foreground/15 bg-background px-3 text-[16px] text-foreground outline-none focus:border-primary"
            />
          </label>

          <fieldset className="flex flex-col gap-1.5">
            <legend className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {t("contact.reason")}
            </legend>
            <div className="flex flex-wrap gap-2 pt-1">
              {REASONS.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setReason(r.value)}
                  aria-pressed={reason === r.value}
                  className={
                    reason === r.value
                      ? "rounded-full border border-primary bg-primary/10 px-3 py-2 text-xs text-primary"
                      : "rounded-full border border-foreground/15 px-3 py-2 text-xs text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                  }
                >
                  {t(r.key)}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {t("contact.message")}
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={2000}
              rows={4}
              className="resize-none rounded-xl border border-foreground/15 bg-background p-3 text-[16px] text-foreground outline-none focus:border-primary"
            />
          </label>

          {status === "error" && <p className="text-sm text-destructive">{errorText}</p>}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 min-h-11 rounded-full bg-foreground px-4 text-sm text-background transition-opacity disabled:opacity-60"
          >
            {status === "sending" ? t("contact.sending") : t("contact.send")}
          </button>
          <p className="text-[11px] text-muted-foreground">{t("contact.privacy")}</p>
        </form>
      )}
    </div>
  );
}
