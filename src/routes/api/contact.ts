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

function formatRichEmailHtml({
  name,
  reason,
  message,
}: {
  name: string;
  reason: string;
  message: string;
}): string {
  const isAppeal = reason === "appeal_letter_request";

  let letterPart = "";
  let summaryPart = "";

  if (isAppeal && message.includes("COMPARISON SUMMARY:")) {
    const parts = message.split(/====================[\r\n]+COMPARISON SUMMARY:[\r\n]+====================/i);
    letterPart = (parts[0] || "").trim();
    summaryPart = (parts[1] || "").trim();
  } else if (!isAppeal && (message.includes("FINANCIAL AID RECONSIDERATION REQUEST LETTER") || message.includes("SOLICITUD DE RECONSIDERACI"))) {
    const parts = message.split(/[-=]{30,}[\r\n]+(?:SOLICITUD DE RECONSIDERACI[ÓO]N DE AYUDA FINANCIERA|FINANCIAL AID RECONSIDERATION REQUEST LETTER)[\r\n]+[-=]{30,}/i);
    summaryPart = (parts[0] || "").trim();
    letterPart = (parts[1] || "").trim();
  } else if (isAppeal) {
    letterPart = message.trim();
  } else {
    summaryPart = message.trim();
  }

  const formattedLetter = letterPart
    ? letterPart
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\[(.*?)\]/g, '<span style="background-color: #fef08a; color: #854d0e; padding: 2px 6px; border-radius: 4px; font-weight: 600;">[$1]</span>')
        .split(/\n\n+/)
        .map((p) => `<p style="margin: 0 0 14px 0; line-height: 1.7; color: #1e293b; font-size: 15px;">${p.replace(/\n/g, "<br/>")}</p>`)
        .join("")
    : "";

  const formattedSummary = summaryPart
    ? `<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; ${isAppeal ? "margin-top: 24px;" : "margin-bottom: 24px;"}">
        <h3 style="margin: 0 0 14px 0; font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">
          Financial Aid Offer Comparison Breakdown
        </h3>
        <pre style="white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13.5px; color: #334155; line-height: 1.6; margin: 0;">${summaryPart.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
      </div>`
    : "";

  const title = isAppeal
    ? "Financial Aid Reconsideration Request Letter"
    : "Financial Aid Offer Comparison Report";

  const greetingName = name && name !== "Student" ? name : "there";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grad Navigator</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
          <tr>
            <td style="background-color: #0f172a; padding: 28px 32px; text-align: left;">
              <div style="display: inline-block; background: #0369a1; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 10px; border-radius: 9999px; margin-bottom: 8px;">
                Official Resource
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">Grad Navigator</h1>
              <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 14px;">
                ${title}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 32px 12px 32px;">
              <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #0f172a;">
                Hello ${greetingName},
              </p>
              <p style="margin: 0; font-size: 14.5px; color: #475569; line-height: 1.6;">
                ${isAppeal
                  ? "Here is your personalized Financial Aid Reconsideration Request Letter and comprehensive aid offer breakdown. You can forward or copy this letter directly to your university financial aid office. Customize the highlighted bracketed fields before sending."
                  : "Here is your complete Financial Aid Offer Comparison breakdown prepared with the Grad Navigator comparison tool."}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 32px 28px 32px;">
              ${isAppeal ? `
                <div style="background-color: #ffffff; border: 2px solid #e2e8f0; border-radius: 10px; padding: 26px 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                  <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px;">
                    <span style="font-size: 11px; font-weight: 700; color: #0369a1; text-transform: uppercase; letter-spacing: 0.08em;">
                      Your Personalized Reconsideration Letter
                    </span>
                  </div>
                  ${formattedLetter}
                </div>
                ${formattedSummary}
              ` : `
                ${formattedSummary}
                ${formattedLetter ? `
                <div style="background-color: #ffffff; border: 2px solid #e2e8f0; border-radius: 10px; padding: 26px 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin-top: 24px;">
                  <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px;">
                    <span style="font-size: 11px; font-weight: 700; color: #0369a1; text-transform: uppercase; letter-spacing: 0.08em;">
                      Sample Reconsideration Request Letter
                    </span>
                  </div>
                  ${formattedLetter}
                </div>` : ""}
              `}

              <div style="margin-top: 28px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px;">
                <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.04em;">
                  4 Pro-Tips for Your Reconsideration Request:
                </h4>
                <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 13.5px; line-height: 1.6;">
                  <li style="margin-bottom: 6px;"><strong>Target the Right Decision-Maker:</strong> Send this directly to the Graduate Financial Aid Director or your department admissions liaison.</li>
                  <li style="margin-bottom: 6px;"><strong>Attach Official Documentation:</strong> Attach the PDF of your competing offer letter so the committee has verifiable proof.</li>
                  <li style="margin-bottom: 6px;"><strong>Ask for a Specific, Reasonable Number:</strong> Asking for $3,000 to $6,000 per year yields far higher success than an open-ended request.</li>
                  <li><strong>Reiterate Commitment:</strong> Confirm you will immediately accept and submit your enrollment deposit if the gap is closed.</li>
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 32px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b;">
                Prepared for you with <a href="https://www.graduationnavigator.com" style="color: #0369a1; text-decoration: none; font-weight: 600;">Grad Navigator</a>.
              </p>
              <p style="margin: 6px 0 0 0; font-size: 11.5px; color: #94a3b8;">
                This email was requested from the interactive Aid Offer Comparison tool.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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

          const { error } = await supabase.from("contact_messages").insert({
            id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : undefined,
            name: parsed.data.name || "Student",
            email: parsed.data.email,
            reason: parsed.data.reason,
            message: dbMessage,
            created_at: new Date().toISOString(),
          });

          if (error) {
            console.error("[API Contact Route Error]:", error);
          }

          // 2. Dispatch email via Resend API if RESEND_API_KEY is configured
          let emailSent = false;
          let emailError: string | null = null;
          let resendKey =
            process.env.RESEND_API_KEY ||
            process.env.VITE_RESEND_API_KEY ||
            (typeof import.meta !== "undefined" && import.meta.env
              ? (import.meta.env.RESEND_API_KEY as string) || (import.meta.env.VITE_RESEND_API_KEY as string)
              : undefined);

          // Local dev fallback if process.env hasn't loaded .env.local
          if (!resendKey && typeof process !== "undefined" && process.cwd) {
            try {
              const fs = await import("fs");
              const path = await import("path");
              const envLocalPath = path.resolve(process.cwd(), ".env.local");
              if (fs.existsSync(envLocalPath)) {
                const content = fs.readFileSync(envLocalPath, "utf8");
                const match = content.match(/RESEND_API_KEY=["']?([^"'\r\n]+)/);
                if (match && match[1]) {
                  resendKey = match[1].trim();
                }
              }
            } catch {
              // ignore fallback error
            }
          }

          if (resendKey) {
            try {
              const resendSubject =
                parsed.data.subject ||
                (parsed.data.reason === "appeal_letter_request"
                  ? "Your Financial Aid Reconsideration Request Letter"
                  : "Your Financial Aid Offer Comparison Report");

              const resendHtml =
                parsed.data.html ||
                formatRichEmailHtml({
                  name: parsed.data.name || "Student",
                  reason: parsed.data.reason,
                  message: parsed.data.message || "",
                });

              const rawSender = process.env.EMAIL_FROM || "";
              const verifiedSender =
                rawSender && !rawSender.includes("onboarding@resend.dev") && rawSender.includes("@")
                  ? rawSender
                  : "Grad Navigator <noreply@graduationnavigator.com>";

              const resendRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${resendKey}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  from: verifiedSender,
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
            savedToDatabase: !error,
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
