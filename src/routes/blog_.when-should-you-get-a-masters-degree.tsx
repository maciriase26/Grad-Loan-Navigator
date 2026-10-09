import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/blog_/when-should-you-get-a-masters-degree"
)({
  beforeLoad: () => {
    throw redirect({ to: "/blog/when-to-get-masters-degree", replace: true });
  },
});
