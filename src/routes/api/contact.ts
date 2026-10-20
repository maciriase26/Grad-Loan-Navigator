import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().max(100).optional().default("Student"),
  email: z.string().trim().email().max(255),
  reason: z.string().trim().min(1).max(100),
  message: z.string().trim().max(50000).optional(),
  subject: z.string().trim().max(255).optional(),
  html: z.string().trim().max(100000).optional(),
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

          // 1. Save to Supabase (limit message to 1990 chars to comply with RLS policy constraint)
          const dbMessage = parsed.data.message
            ? parsed.data.message.slice(0, 1990)
            : null;

          const { data, error } = await supabase.from("contact_messages").insert({
            id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : undefined,
            name: parsed.data.name || "Student",
            email: parsed.data.email,
            reason: parsed.data.reason,
            message: dbMessage,
            created_at: new Date().toISOString(),
          }).select();

          if (error) {
            console.error("[API Contact Route Error]:", error);
          }

          // 2. Dispatch email via Resend API if RESEND_API_KEY is configured
          let emailSent = false;
          let emailError: string | null = null;
          const resendKey =
            process.env.RESEND_API_KEY ||
            process.env.VITE_RESEND_API_KEY ||
            (typeof import.meta !== "undefined" && import.meta.env
              ? (import.meta.env.RESEND_API_KEY as string) || (import.meta.env.VITE_RESEND_API_KEY as string)
              : undefined);

          if (resendKey) {
            try {
              const resendSubject =
                parsed.data.subject ||
                (parsed.data.reason === "appeal_letter_request"
                  ? "Your Financial Aid Reconsideration Request Letter"
                  : "Your Financial Aid Offer Comparison Report");

              const resendHtml =
                parsed.data.html ||
                `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 640px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
                  <div style="background: #0f172a; color: #ffffff; padding: 16px 20px; border-radius: 6px; margin-bottom: 20px;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">Grad Loan Navigator</h2>
                    <p style="margin: 4px 0 0; font-size: 13px; color: #94a3b8;">Financial Aid Comparison and Appeal Resource</p>
                  </div>
                  <pre style="white-space: pre-wrap; font-family: monospace; font-size: 13px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; color: #0f172a; line-height: 1.5;">${parsed.data.message}</pre>
                  <p style="margin-top: 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 12px;">
                    Prepared for you at <a href="https://www.gradloannavigator.com" style="color: #0369a1; text-decoration: none;">Grad Loan Navigator</a>. This email was requested from our interactive Aid Offer Comparison tool.
                  </p>
                </div>`;

              const resendRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${resendKey}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  from: process.env.EMAIL_FROM || "Grad Loan Navigator <onboarding@resend.dev>",
                  to: [parsed.data.email],
                  subject: resendSubject,
                  text: parsed.data.message || "",
                  html: resendHtml,
                }),
              });

              const resendData = await resendRes.json();
              if (resendRes.ok) {
                emailSent = true;
              } else {
                emailError = resendData?.message || "Resend API error";
                console.warn("[Resend Error]:", resendData);
              }
            } catch (err: any) {
              emailError = err?.message || "Resend connection error";
              console.warn("[Resend Exception]:", err);
            }
          }

          return Response.json({
            success: true,
            data,
            emailSent,
            emailError,
            hasResendKey: Boolean(resendKey),
          });
        } catch (err: any) {
          console.error("[API Contact Exception]:", err);
          return Response.json({ error: err?.message || "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
