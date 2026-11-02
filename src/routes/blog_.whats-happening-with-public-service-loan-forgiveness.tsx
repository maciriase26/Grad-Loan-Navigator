import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/blog_/whats-happening-with-public-service-loan-forgiveness"
)({
  beforeLoad: () => {
    throw redirect({ to: "/blog/whats-happening-with-pslf", replace: true });
  },
});
