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

export function getWeb3FormsAccessKey(): string {
  return process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";
}

export async function submitContactForm(
  values: ContactFormValues,
  intent: ContactIntent,
): Promise<ContactSubmitResult> {
  const accessKey = getWeb3FormsAccessKey();

  if (!accessKey) {
    return {
      ok: false,
      message:
        "Contact form is not configured yet. Please email directly at " +
        siteConfig.email,
    };
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: intent.subject,
      from_name: values.name,
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
      source: intent.source ?? "Portfolio",
      botcheck: "",
    }),
  });

  const data = (await response.json()) as { success?: boolean; message?: string };

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
      "Thank you! Your message was sent successfully. I will get back to you within 1–2 business days.",
  };
}
