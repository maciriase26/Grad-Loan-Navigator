import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, tool, stepCountIs, type UIMessage } from "ai";
import { z } from "zod";
import {
  createLovableAiGatewayProvider,
  getLovableAiGatewayRunId,
  getLovableAiGatewayResponseHeaders,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";

const HELP_EMAIL = "Applejason890@gmail.com";

const SYSTEM_PROMPT = `You are the Grad Loan Navigator assistant, a calm, plain-spoken guide on a single-page editorial site about graduate student borrowing after the end of Grad PLUS loans.

The page has three stations you can send visitors to:
- "understand" — what changed: Grad PLUS is gone for new borrowers; new federal caps apply.
- "learn" — the grandfather rules and timing (who is still eligible under the old rules).
- "apply" — practical next steps for borrowing.
There is also a "quiz" card that shows the annual/aggregate cap by program type.

What you help with:
1. Navigation — when a visitor asks where to find something, answer in one line AND call navigateToSection. The UI shows them a button; do not claim you already scrolled the page.
2. General student-loan knowledge — caps, grandfather rules, federal vs. private, repayment basics, forgiveness/IDR, cosigners, refinancing.
3. Rates — explain fixed vs. variable, how credit and cosigners affect pricing, and typical current ranges. Note that this is not financial advice and exact rates must be verified with the lender or studentaid.gov.

Comments and concerns:
If a visitor raises a complaint, a bug, a correction, or wants to send feedback to the team, offer to pass it along to the help inbox (${HELP_EMAIL}). If they agree, call draftHelpEmail with a clear subject and a body written in the visitor's voice summarizing their message. The UI shows them a button that opens their own email app — nothing is sent automatically, so tell them to press it to send.

LENGTH — this is a small chat panel on a phone:
- Lead with a direct one-sentence answer, then at most 2-4 short lines or bullets of detail.
- Stay under about 120 words unless the visitor explicitly asks for more; end longer topics with a short offer like "Want me to go deeper?"
- Never use markdown headings, numbered section titles, or tables. Plain sentences and short bullets only.

Style: warm, concise, concrete. Never invent exact rate numbers or policy dates you are unsure of — say what is uncertain and point to studentaid.gov.`;


export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const initialRunId = getLovableAiGatewayRunId(request);
        const gateway = createLovableAiGatewayProvider(key, initialRunId);

        const result = streamText({
          model: gateway("google/gemini-3.6-flash"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
          stopWhen: stepCountIs(6),
          abortSignal: request.signal,
          tools: {

            navigateToSection: tool({
              description:
                "Scroll the visitor's page to a section of the Grad Loan Navigator page.",
              inputSchema: z.object({
                section: z.enum(["understand", "learn", "apply", "quiz"]),
                reason: z.string().describe("Short reason shown to the visitor."),
              }),
              execute: async ({ section, reason }) => ({ section, reason }),
            }),
            draftHelpEmail: tool({
              description:
                "Draft an email to the help inbox with the visitor's comment or concern. The visitor presses a button to open their email app and send it.",
              inputSchema: z.object({
                subject: z.string().describe("Short subject line."),
                body: z.string().describe("The message body, in the visitor's voice."),
              }),
              execute: async ({ subject, body }) => ({ to: HELP_EMAIL, subject, body }),
            }),
          },
        });

        const response = result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          headers: getLovableAiGatewayResponseHeaders(undefined, {
            ...(initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : {}),
          }),
        });

        return withLovableAiGatewayRunIdHeader(response, gateway);
      },
    },
  },
});
