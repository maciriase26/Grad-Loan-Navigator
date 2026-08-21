import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  Compass,
  MessageCircle,
  X,
  Mail,
  ArrowDownCircle,
  RotateCcw,
  PenLine,
} from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { useI18n } from "@/i18n";
import type { TranslationKey } from "@/i18n/translations";

const STORAGE_KEY = "grad-navigator-chat";
const REQUEST_TIMEOUT_MS = 45_000;

const OPENING_SUGGESTIONS: TranslationKey[] = [
  "chat.suggestion.1",
  "chat.suggestion.2",
  "chat.suggestion.3",
];

const FOLLOW_UPS: TranslationKey[] = [
  "chat.followup.1",
  "chat.followup.2",
  "chat.followup.3",
  "chat.followup.4",
];

const SECTION_LABELS: Record<string, TranslationKey> = {
  understand: "chat.section.understand",
  learn: "chat.section.learn",
  apply: "chat.section.apply",
  quiz: "chat.section.quiz",
};

/**
 * Scroll to a homepage station. If the anchor isn't on the current page
 * (any route other than "/"), navigate to the homepage anchor instead.
 */
function goToSection(section: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.location.assign(`/#${section}`);
}

/** fetch with a hard timeout and one automatic retry on network/timeout failure. */
async function resilientFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const userSignal = init?.signal ?? null;
    const onUserAbort = () => controller.abort();
    userSignal?.addEventListener("abort", onUserAbort);
    try {
      const response = await fetch(input, { ...init, signal: controller.signal });
      return response;
    } catch (error) {
      lastError = error;
      // The visitor pressed Stop (or navigated away) — never retry that.
      if (userSignal?.aborted) throw error;
    } finally {
      clearTimeout(timer);
      userSignal?.removeEventListener("abort", onUserAbort);
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Network error");
}

export function ChatWidget() {
  return null;

  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [restored, setRestored] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState("");

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", fetch: resilientFetch }),
    [],
  );

  const { messages, sendMessage, status, error, stop, regenerate, setMessages } = useChat({
    transport,
  });

  useEffect(() => setHydrated(true), []);

  // Restore the session's conversation (survives moving between pages).
  useEffect(() => {
    if (restored) return;
    setRestored(true);
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as UIMessage[];
      if (Array.isArray(saved) && saved.length > 0) setMessages(saved);
    } catch {
      /* ignore corrupt storage */
    }
  }, [restored, setMessages]);

  // Persist after every settled turn.
  useEffect(() => {
    if (!restored) return;
    if (status === "submitted" || status === "streaming") return;
    try {
      if (messages.length === 0) window.sessionStorage.removeItem(STORAGE_KEY);
      else window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* storage full or unavailable */
    }
  }, [messages, status, restored]);

  useEffect(() => {
    if (open && status === "ready") textareaRef.current?.focus();
  }, [open, status]);

  const isBusy = status === "submitted" || status === "streaming";

  const submit = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isBusy || !hydrated) return;
      void sendMessage({ text: trimmed });
      setInput("");
    },
    [hydrated, isBusy, sendMessage],
  );

  const startNewConversation = () => {
    stop();
    setMessages([]);
    setInput("");
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    textareaRef.current?.focus();
  };

  const lastMessage = messages[messages.length - 1];
  const showFollowUps =
    !isBusy && !error && lastMessage?.role === "assistant" && messages.length > 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("chat.close") : t("chat.open")}
        style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
        className="fixed right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-foreground/10 bg-foreground text-background shadow-[0_12px_32px_-12px_rgba(0,0,0,0.55)] transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-card sm:inset-auto sm:right-5 sm:bottom-24 sm:h-[560px] sm:max-h-[calc(100dvh-9rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-foreground/12 sm:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.5)]"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <header className="flex items-center gap-3 border-b border-foreground/10 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Compass className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[15px] leading-tight text-foreground">
                {t("chat.title")}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {t("chat.disclaimer")}
              </p>
            </div>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={startNewConversation}
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-2.5 py-1 text-[11px] text-foreground/70 transition-colors hover:border-primary hover:text-primary"
              >
                <PenLine className="h-3 w-3" />
                {t("chat.new")}
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("chat.close")}
              className="-mr-1 rounded-full p-1.5 text-foreground/60 transition-colors hover:text-foreground sm:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <Conversation className="min-h-0 flex-1">
            <ConversationContent className="gap-3 px-3 py-4">
              {messages.length === 0 && (
                <div className="space-y-3 px-1">
                  <p className="text-sm text-muted-foreground">{t("chat.intro")}</p>
                  <div className="flex flex-wrap gap-2">
                    {OPENING_SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        disabled={!hydrated || isBusy}
                        onClick={() => submit(t(s))}
                        className="rounded-full border border-foreground/15 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
                      >
                        {t(s)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent className="text-sm">
                    {message.parts.map((part, i) => {
                      if (part.type === "text") {
                        return <MessageResponse key={i}>{part.text}</MessageResponse>;
                      }
                      if (
                        part.type === "tool-navigateToSection" &&
                        part.state === "output-available"
                      ) {
                        const out = part.output as { section: string };
                        const labelKey = SECTION_LABELS[out.section];
                        const label = labelKey ? t(labelKey) : out.section;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => goToSection(out.section)}
                            className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/10"
                          >
                            <ArrowDownCircle className="h-3.5 w-3.5" />
                            {t("chat.takeMeTo")} {label}
                          </button>
                        );
                      }
                      if (
                        part.type === "tool-draftHelpEmail" &&
                        part.state === "output-available"
                      ) {
                        const out = part.output as { to: string; subject: string; body: string };
                        const href = `mailto:${out.to}?subject=${encodeURIComponent(
                          out.subject,
                        )}&body=${encodeURIComponent(out.body)}`;
                        return (
                          <a
                            key={i}
                            href={href}
                            className="mt-2 inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1.5 text-xs text-background"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            {t("chat.sendHelp")}
                          </a>
                        );
                      }
                      return null;
                    })}
                  </MessageContent>
                </Message>
              ))}

              {status === "submitted" && <Shimmer className="px-1 text-sm">{t("chat.thinking")}</Shimmer>}

              {error && (
                <div className="space-y-2 px-1">
                  <p className="text-sm text-destructive">
                    {t("chat.error")}
                  </p>
                  <button
                    type="button"
                    onClick={() => void regenerate()}
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t("chat.retry")}
                  </button>
                </div>
              )}

              {showFollowUps && (
                <div className="flex flex-wrap gap-2 px-1 pt-1">
                  {FOLLOW_UPS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => submit(t(s))}
                      className="rounded-full border border-foreground/15 px-3 py-1 text-[11px] text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                    >
                      {t(s)}
                    </button>
                  ))}
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-foreground/10 p-3">
            <PromptInput
              onSubmit={(_, event) => {
                event.preventDefault();
                submit(input);
              }}
            >
              <PromptInputTextarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.placeholder")}
                className="max-h-28 min-h-[44px] text-base sm:text-sm"
              />

              <PromptInputFooter className="justify-end">
                <PromptInputSubmit
                  status={status}
                  onStop={stop}
                  disabled={!isBusy && !input.trim()}
                />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      )}
    </>
  );
}
