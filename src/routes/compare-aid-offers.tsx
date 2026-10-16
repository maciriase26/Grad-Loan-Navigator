import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/compare-aid-offers")({
  beforeLoad: () => {
    throw redirect({ to: "/aid-offer-comparison", replace: true });
  },
});
