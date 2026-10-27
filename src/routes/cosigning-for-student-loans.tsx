import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/cosigning-for-student-loans")({
  beforeLoad: () => {
    throw redirect({ to: "/cosigner-hub", replace: true });
  },
});
