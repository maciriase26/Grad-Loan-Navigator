import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  reason: z.string().trim().min(1).max(100),
  message: z.string().trim().max(2000).optional(),
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = contactSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json(
              { error: "Invalid form fields", details: parsed.error.format() },
              { status: 400 }
            );
          }

          // Try insert via Supabase client
          const { data, error } = await supabase.from("contact_messages").insert({
            id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : undefined,
            name: parsed.data.name,
            email: parsed.data.email,
            reason: parsed.data.reason,
            message: parsed.data.message || null,
            created_at: new Date().toISOString(),
          }).select();

          if (error) {
            console.error("[API Contact Route Error]:", error);
            return Response.json({ error: error.message, code: error.code }, { status: 500 });
          }

          return Response.json({ success: true, data });
        } catch (err: any) {
          console.error("[API Contact Exception]:", err);
          return Response.json({ error: err?.message || "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
