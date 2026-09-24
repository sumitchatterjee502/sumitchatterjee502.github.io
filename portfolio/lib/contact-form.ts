import { siteConfig } from "@/data/portfolio";

export interface ContactIntent {
  subject: string;
  source?: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactSubmitResult {
  ok: boolean;
  message: string;
}

function buildEmailBody(
  values: ContactFormValues,
  intent: ContactIntent,
): string {
  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.phone.trim() ? `Phone: ${values.phone.trim()}` : null,
    `Source: ${intent.source ?? "Portfolio"}`,
    "",
    values.message,
  ];

  return lines.filter((line) => line !== null).join("\n");
}

export async function submitContactForm(
  values: ContactFormValues,
  intent: ContactIntent,
): Promise<ContactSubmitResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: siteConfig.email,
        subject: intent.subject,
        message: buildEmailBody(values, intent),
        replyTo: values.email,
        senderName: values.name,
      }),
      signal: controller.signal,
    });

    const data = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (!response.ok || !data.success) {
      return {
        ok: false,
        message:
          data.message ??
          "Something went wrong while sending your message. Please try again.",
      };
    }

    return {
      ok: true,
      message:
        data.message ??
        "Thank you! Your message was sent successfully. I will get back to you within 1–2 business days.",
    };
  } catch (error) {
    const isAbort = error instanceof Error && error.name === "AbortError";

    if (isAbort) {
      return {
        ok: false,
        message:
          "The request timed out. Please try again or email " + siteConfig.email,
      };
    }

    return {
      ok: false,
      message:
        "Unable to send your message. Run the site with `npm run dev` (API routes need a Next.js server) or email directly at " +
        siteConfig.email,
    };
  } finally {
    clearTimeout(timeout);
  }
}
