import { useCallback, useEffect, useMemo, useReducer } from "react";
import { compare } from "./calc";
import { checkFile, readLetter, track } from "./client";
import { AID_OFFER_CONFIG } from "./config";
import { blankOffer } from "./normalize";
import type { LetterUpload, Offer } from "./schema";

/* ---------------- state ---------------- */

export interface FailedLetter {
  id: string;
  fileName: string;
  message: string;
}

export interface AidOffersState {
  screen: "upload" | "reading" | "results";
  letters: LetterUpload[];
  offers: Offer[];
  failed: FailedLetter[];
  fileError: string | null;
  /** Offer open in the Review sheet. */
  reviewingId: string | null;
}

type Action =
  | { type: "addFiles"; files: File[]; toLetterId?: string }
  | { type: "removeLetter"; id: string }
  | { type: "removePage"; letterId: string; index: number }
  | { type: "startReading" }
  | { type: "letterDone"; letterId: string; offer: Offer }
  | { type: "letterFailed"; letterId: string; message: string }
  | { type: "showResults" }
  | { type: "goTo"; screen: AidOffersState["screen"] }
  | { type: "updateOffer"; offer: Offer }
  | { type: "removeOffer"; id: string }
  | { type: "dismissFailed"; id: string }
  | { type: "addManual"; offer: Offer }
  | { type: "review"; id: string | null }
  | { type: "restore"; offers: Offer[] };

const uid = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()));

const slotsLeft = (s: AidOffersState) => AID_OFFER_CONFIG.maxLetters - s.offers.length - s.letters.length;

function reducer(s: AidOffersState, a: Action): AidOffersState {
  switch (a.type) {
    case "addFiles": {
      let letters = [...s.letters];
      let fileError: string | null = null;
      for (const file of a.files) {
        const err = checkFile(file);
        if (err) {
          fileError = err;
          continue;
        }
        if (a.toLetterId) {
          letters = letters.map((l) => {
            if (l.id !== a.toLetterId) return l;
            if (l.pages.length >= AID_OFFER_CONFIG.maxPagesPerLetter) {
              fileError = `Up to ${AID_OFFER_CONFIG.maxPagesPerLetter} pages per letter.`;
              return l;
            }
            return { ...l, pages: [...l.pages, file] };
          });
        } else {
          if (AID_OFFER_CONFIG.maxLetters - s.offers.length - letters.length <= 0) {
            fileError = `You can compare up to ${AID_OFFER_CONFIG.maxLetters} schools at once.`;
            break;
          }
          letters.push({ id: uid(), pages: [file], status: "queued" });
        }
      }
      return { ...s, letters, fileError };
    }
    case "removeLetter":
      return { ...s, letters: s.letters.filter((l) => l.id !== a.id), fileError: null };
    case "removePage":
      return {
        ...s,
        letters: s.letters
          .map((l) => (l.id === a.letterId ? { ...l, pages: l.pages.filter((_, i) => i !== a.index) } : l))
          .filter((l) => l.pages.length > 0),
      };
    case "startReading":
      return { ...s, screen: "reading", letters: s.letters.map((l) => ({ ...l, status: "reading" })) };
    case "letterDone":
      return {
        ...s,
        offers: [...s.offers, a.offer],
        letters: s.letters.map((l) => (l.id === a.letterId ? { ...l, status: "done" } : l)),
      };
    case "letterFailed": {
      const letter = s.letters.find((l) => l.id === a.letterId);
      return {
        ...s,
        failed: [...s.failed, { id: a.letterId, fileName: letter?.pages[0]?.name ?? "Letter", message: a.message }],
        letters: s.letters.map((l) => (l.id === a.letterId ? { ...l, status: "failed", error: a.message } : l)),
      };
    }
    case "showResults":
      return { ...s, screen: "results", letters: [] };
    case "goTo":
      return { ...s, screen: a.screen };
    case "updateOffer":
      return { ...s, offers: s.offers.map((o) => (o.id === a.offer.id ? a.offer : o)) };
    case "removeOffer":
      return { ...s, offers: s.offers.filter((o) => o.id !== a.id) };
    case "dismissFailed":
      return { ...s, failed: s.failed.filter((f) => f.id !== a.id) };
    case "addManual":
      return { ...s, offers: [...s.offers, a.offer], reviewingId: a.offer.id, screen: "results" };
    case "review":
      return { ...s, reviewingId: a.id };
    case "restore":
      return { ...s, offers: a.offers, screen: a.offers.length ? "results" : "upload" };
  }
}

const initial: AidOffersState = {
  screen: "upload",
  letters: [],
  offers: [],
  failed: [],
  fileError: null,
  reviewingId: null,
};

/* ---------------- hook ---------------- */

export function useAidOffers() {
  const [state, dispatch] = useReducer(reducer, initial);

  // Restore numbers from this tab's session (never images).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(AID_OFFER_CONFIG.sessionKey);
      if (raw) dispatch({ type: "restore", offers: JSON.parse(raw) as Offer[] });
    } catch {
      /* storage blocked: start fresh */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(AID_OFFER_CONFIG.sessionKey, JSON.stringify(state.offers));
    } catch {
      /* ignore */
    }
  }, [state.offers]);

  const readAll = useCallback(async () => {
    const letters = state.letters;
    if (!letters.length) return;
    dispatch({ type: "startReading" });
    track("aid_upload_started", { letters: letters.length });

    await Promise.all(
      letters.map(async (l) => {
        const res = await readLetter(l.pages);
        if (res.ok) {
          dispatch({ type: "letterDone", letterId: l.id, offer: res.offer });
          track("aid_extraction_succeeded", { pages: l.pages.length });
        } else {
          dispatch({ type: "letterFailed", letterId: l.id, message: res.message });
          track("aid_extraction_failed", { code: res.code });
        }
      }),
    );

    dispatch({ type: "showResults" });
  }, [state.letters]);

  const comparison = useMemo(() => compare(state.offers), [state.offers]);

  useEffect(() => {
    if (state.screen === "results" && state.offers.length) {
      track("aid_comparison_shown", { schools: state.offers.length, failed: state.failed.length });
    }
    // Fire once per arrival on the results screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.screen]);

  return {
    state,
    comparison,
    slotsLeft: slotsLeft(state),
    addFiles: (files: File[], toLetterId?: string) => dispatch({ type: "addFiles", files, toLetterId }),
    removeLetter: (id: string) => dispatch({ type: "removeLetter", id }),
    removePage: (letterId: string, index: number) => dispatch({ type: "removePage", letterId, index }),
    readAll,
    goTo: (screen: AidOffersState["screen"]) => dispatch({ type: "goTo", screen }),
    updateOffer: (offer: Offer) => dispatch({ type: "updateOffer", offer }),
    removeOffer: (id: string) => dispatch({ type: "removeOffer", id }),
    dismissFailed: (id: string) => dispatch({ type: "dismissFailed", id }),
    addManual: () => {
      track("aid_manual_entry_started");
      dispatch({ type: "addManual", offer: blankOffer() });
    },
    openReview: (id: string | null) => {
      if (id) track("aid_review_opened");
      dispatch({ type: "review", id });
    },
  };
}

export type AidOffersApi = ReturnType<typeof useAidOffers>;
