export const OPEN_SEARCH_EVENT = "open-site-search";

export function openSearchDialog(initialQuery?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT, { detail: { query: initialQuery } }));
}
