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

function isLocalHost(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

/** GitHub Pages is static — production site always uses Render (see contactApiUrl). */
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
): Promise<{ ok?: boolean; success?: boolean; message?: string }> {
  const text = await response.text();

  try {
    return JSON.parse(text) as {
      ok?: boolean;
      success?: boolean;
      message?: string;
    };
  } catch {
    if (response.status === 404) {
      return {
        ok: false,
        message:
          "Contact API is not available at this URL (404). Deploy contact-api on Render and set GitHub secret CONTACT_API_URL.",
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

  return {
    ok: true,
    message:
      data.message ??
      "Thank you! Your message was sent successfully. I will get back to you within 1–2 business days.",
  };
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
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
  let lastNetworkError = false;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (attempt > 1) {
      await sleep(2000 * attempt);
    }

    try {
      response = await postToContactApi(apiBase, values, intent, signal);
      lastNetworkError = false;
      break;
    } catch {
      lastNetworkError = true;
      if (attempt === maxAttempts) {
        return {
          ok: false,
          message:
            `Contact API at ${apiBase} is not deployed or is still waking up. ` +
            `One-time setup: open https://render.com/deploy?repo=https://github.com/sumitchatterjee502/sumitchatterjee502.github.io ` +
            `→ set SMTP_USER / SMTP_PASS → confirm ${apiBase}/health returns OK → set GitHub secret CONTACT_API_URL to that URL. ` +
            `Or email ${siteConfig.email}.`,
        };
      }
    }
  }

  if (!response || lastNetworkError) {
    return {
      ok: false,
      message: `Contact API at ${apiBase} is not reachable. Or email ${siteConfig.email}.`,
    };
  }

  const data = await parseJsonResponse(response);

  if (!response.ok || !data.ok) {
    const fallback =
      response.status === 404
        ? " Check that the Render service is deployed (see render.yaml) and CONTACT_API_URL matches its URL."
        : "";

    return {
      ok: false,
      message:
        (data.message ??
          "Something went wrong while sending your message. Please try again.") +
        fallback,
    };
  }

  return {
    ok: true,
    message:
      data.message ??
      "Thank you! Your message was sent successfully. I will get back to you within 1–2 business days.",
  };
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

    const apiBase = getContactApiUrl();
    if (!apiBase) {
      return {
        ok: false,
        message:
          "Contact API is not configured. Set contactApiUrl in portfolio data or CONTACT_API_URL in GitHub Actions, or email " +
          siteConfig.email,
      };
    }

    return await submitViaContactApi(
      values,
      intent,
      apiBase,
      controller.signal,
    );
  } catch (error) {
    const isAbort = error instanceof Error && error.name === "AbortError";

    if (isAbort) {
      return {
        ok: false,
        message:
          "Contact server timed out (Render free tier may be waking up). Please try again in a minute or email " +
          siteConfig.email,
      };
    }

    if (shouldUseNextSendEmailRoute()) {
      return {
        ok: false,
        message:
          "Cannot reach /api/send-email. Run `npm run dev` in portfolio/ with GMAIL_USER and GMAIL_APP_PASSWORD in .env.local, or email " +
          siteConfig.email,
      };
    }

    return {
      ok: false,
      message:
        "Unable to reach the contact server. Confirm Render is running and SMTP is set, or email " +
        siteConfig.email,
    };
  } finally {
    clearTimeout(timeout);
  }
}
