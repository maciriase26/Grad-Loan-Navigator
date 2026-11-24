import { useAidOffers } from "../useAidOffers";
import { ComparisonView } from "./ComparisonView";
import { ReadingProgress } from "./ReadingProgress";
import { ReviewSheet } from "./ReviewSheet";
import { UploadPanel } from "./UploadPanel";

/**
 * Drop-in feature: upload aid letters, read them, compare side by side.
 * Render it on the Aid Offer Comparison page (see README for wiring).
 */
export function AidOfferUpload() {
  const api = useAidOffers();
  const { state } = api;
  const reviewing = state.offers.find((o) => o.id === state.reviewingId) ?? null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {state.screen === "upload" && <UploadPanel api={api} />}
      {state.screen === "reading" && <ReadingProgress letters={state.letters} />}
      {state.screen === "results" &&
        (state.offers.length || state.failed.length ? <ComparisonView api={api} /> : <UploadPanel api={api} />)}

      <ReviewSheet
        offer={reviewing}
        open={!!reviewing}
        onClose={() => api.openReview(null)}
        onSave={(o) => {
          api.updateOffer(o);
          api.openReview(null);
        }}
      />
    </div>
  );
}
