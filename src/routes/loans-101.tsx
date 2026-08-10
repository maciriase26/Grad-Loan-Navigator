import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/loans-101")({
  beforeLoad: () => {
    throw redirect({ to: "/educational-resources", replace: true });
  },
});
