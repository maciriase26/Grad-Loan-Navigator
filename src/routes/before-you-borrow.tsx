import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/before-you-borrow")({
  beforeLoad: () => {
    throw redirect({ to: "/free-money-first", replace: true });
  },
});
