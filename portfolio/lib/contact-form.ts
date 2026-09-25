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

const defaultContactApiUrl = siteConfig.contactApiUrl.replace(/\/$/, "");
const successMessage =
  "Thank you! Your message was sent successfully. I will get back to you within 1–2 business days.";

function isLocalHost(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

function getContactApiUrl(): string {
  if (typeof window !== "undefined" && !isLocalHost()) {
    return defaultContactApiUrl;
  }

  const fromEnv = process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim();
  if (
    fromEnv &&
    !fromEnv.includes("localhost") &&
    !fromEnv.includes("127.0.0.1")
  ) {
    return fromEnv.replace(/\/$/, "");
  }

  return defaultContactApiUrl;
}

function shouldUseNextSendEmailRoute(): boolean {
  return process.env.NODE_ENV === "development" && isLocalHost();
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

async function parseJsonResponse(
  response: Response,
): Promise<{ ok?: boolean; success?: boolean | string; message?: string }> {
  const text = await response.text();

  try {
    return JSON.parse(text) as {
      ok?: boolean;
      success?: boolean | string;
      message?: string;
    };
  } catch {
    if (response.status === 404) {
      return {
        ok: false,
        message: "Contact API is not available at this URL (404).",
      };
    }

    return {
      ok: false,
      message:
        text.trim().slice(0, 200) ||
        `Unexpected response from contact server (HTTP ${response.status}).`,
    };
  }
}

async function submitViaNextApi(
  values: ContactFormValues,
  intent: ContactIntent,
  signal: AbortSignal,
): Promise<ContactSubmitResult> {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: siteConfig.email,
      subject: intent.subject,
      message: buildEmailBody(values, intent),
      replyTo: values.email,
      senderName: values.name,
    }),
    signal,
  });

  const data = await parseJsonResponse(response);
  const success = data.success === true;

  if (!response.ok || !success) {
    return {
      ok: false,
      message:
        data.message ??
        "Something went wrong while sending your message. Please try again.",
    };
  }

  return { ok: true, message: data.message ?? successMessage };
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function isContactApiHealthy(
  apiBase: string,
  signal: AbortSignal,
): Promise<boolean> {
  try {
    const response = await fetch(`${apiBase}/health`, {
      method: "GET",
      mode: "cors",
      headers: { Accept: "application/json" },
      signal,
    });
    if (!response.ok) return false;
    const data = (await response.json()) as { ok?: boolean };
    return data.ok === true;
  } catch {
    return false;
  }
}

async function submitViaFormSubmit(
  values: ContactFormValues,
  intent: ContactIntent,
  signal: AbortSignal,
): Promise<ContactSubmitResult> {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(siteConfig.email)}`;

  const response = await fetch(endpoint, {
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
      _subject: `[Portfolio] ${intent.subject}`,
      _replyto: values.email,
      _captcha: "false",
      _template: "table",
      source: intent.source ?? "Portfolio",
    }),
    mode: "cors",
    signal,
  });

  const data = await parseJsonResponse(response);
  const accepted =
    data.success === true ||
    data.success === "true" ||
    (response.ok && !data.message?.toLowerCase().includes("error"));

  if (!response.ok || !accepted) {
    return {
      ok: false,
      message:
        data.message ??
        "Could not send via FormSubmit. Check your inbox for a FormSubmit activation email, or email " +
          siteConfig.email,
    };
  }

  return { ok: true, message: successMessage };
}

async function postToContactApi(
  apiBase: string,
  values: ContactFormValues,
  intent: ContactIntent,
  signal: AbortSignal,
): Promise<Response> {
  return fetch(`${apiBase}/api/contact`, {
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
    mode: "cors",
    signal,
  });
}

async function submitViaContactApi(
  values: ContactFormValues,
  intent: ContactIntent,
  apiBase: string,
  signal: AbortSignal,
): Promise<ContactSubmitResult> {
  const maxAttempts = 3;
  let response: Response | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (attempt > 1) {
      await sleep(2000 * attempt);
    }

    try {
      response = await postToContactApi(apiBase, values, intent, signal);
      break;
    } catch {
      if (attempt === maxAttempts) {
        return {
          ok: false,
          message: `Contact API at ${apiBase} is not reachable.`,
        };
      }
    }
  }

  if (!response) {
    return {
      ok: false,
      message: `Contact API at ${apiBase} is not reachable.`,
    };
  }

  const data = await parseJsonResponse(response);

  if (!response.ok || !data.ok) {
    return {
      ok: false,
      message:
        data.message ??
        "Something went wrong while sending your message. Please try again.",
    };
  }

  return { ok: true, message: data.message ?? successMessage };
}

async function submitForProduction(
  values: ContactFormValues,
  intent: ContactIntent,
  signal: AbortSignal,
): Promise<ContactSubmitResult> {
  const mode = siteConfig.contactDelivery;
  const apiBase = getContactApiUrl();

  if (mode === "formsubmit") {
    return submitViaFormSubmit(values, intent, signal);
  }

  if (mode === "api") {
    if (!apiBase) {
      return {
        ok: false,
        message: "Contact API URL is not configured. Email " + siteConfig.email,
      };
    }
    return submitViaContactApi(values, intent, apiBase, signal);
  }

  // auto: prefer self-hosted API when deployed; otherwise FormSubmit (GitHub Pages)
  if (apiBase) {
    const healthy = await isContactApiHealthy(apiBase, signal);
    if (healthy) {
      return submitViaContactApi(values, intent, apiBase, signal);
    }
  }

  return submitViaFormSubmit(values, intent, signal);
}

export async function submitContactForm(
  values: ContactFormValues,
  intent: ContactIntent,
): Promise<ContactSubmitResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);

  try {
    if (shouldUseNextSendEmailRoute()) {
      return await submitViaNextApi(values, intent, controller.signal);
    }

    return await submitForProduction(values, intent, controller.signal);
  } catch (error) {
    const isAbort = error instanceof Error && error.name === "AbortError";

    if (isAbort) {
      return {
        ok: false,
        message:
          "The request timed out. Please try again or email " + siteConfig.email,
      };
    }

    if (shouldUseNextSendEmailRoute()) {
      return {
        ok: false,
        message:
          "Cannot reach /api/send-email. Use GMAIL_USER and GMAIL_APP_PASSWORD in .env.local, or email " +
          siteConfig.email,
      };
    }

    return {
      ok: false,
      message:
        "Unable to send your message right now. Please email " + siteConfig.email,
    };
  } finally {
    clearTimeout(timeout);
  }
}
