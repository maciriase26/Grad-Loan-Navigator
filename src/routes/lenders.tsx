import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/lenders")({
  beforeLoad: () => {
    throw redirect({
      to: "/apply",
    });
  },
});
