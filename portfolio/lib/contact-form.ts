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

function getContactApiUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim();
  const fromConfig = siteConfig.contactApiUrl?.trim();

  // Production builds use siteConfig unless env points to a real (non-local) API URL.
  const url =
    process.env.NODE_ENV === "production"
      ? fromEnv && !fromEnv.includes("localhost")
        ? fromEnv
        : fromConfig
      : fromEnv || fromConfig;

  return url ? url.replace(/\/$/, "") : "";
}

export async function submitContactForm(
  values: ContactFormValues,
  intent: ContactIntent,
): Promise<ContactSubmitResult> {
  const apiBase = getContactApiUrl();

  if (!apiBase) {
    return {
      ok: false,
      message:
        "Contact API is not configured. Please email directly at " +
        siteConfig.email,
    };
  }

  try {
    const response = await fetch(`${apiBase}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        subject: intent.subject,
        source: intent.source ?? "Portfolio",
      }),
    });

    const data = (await response.json()) as {
      ok?: boolean;
      message?: string;
    };

    if (!response.ok || !data.ok) {
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
  } catch {
    return {
      ok: false,
      message:
        "Unable to reach the contact server. Please email directly at " +
        siteConfig.email,
    };
  }
}
