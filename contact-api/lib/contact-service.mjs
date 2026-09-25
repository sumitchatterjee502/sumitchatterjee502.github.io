import nodemailer from "nodemailer";

export function getSmtpCredentials() {
  const user = (
    process.env.SMTP_USER ||
    process.env.GMAIL_USER ||
    ""
  ).trim();
  const pass = (
    process.env.SMTP_PASS ||
    process.env.GMAIL_APP_PASSWORD ||
    ""
  ).trim();
  return { user, pass };
}

export function getRecipient() {
  return (process.env.CONTACT_TO || "sumitchatterjee502@gmail.com").trim();
}

export function getAllowedOrigins() {
  return new Set(
    (
      process.env.ALLOWED_ORIGINS ||
      "http://localhost:3000,http://127.0.0.1:3000,https://sumitchatterjee502.github.io"
    )
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

export function getCorsHeaders(requestOrigin) {
  const headers = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    Vary: "Origin",
  };

  if (requestOrigin && getAllowedOrigins().has(requestOrigin)) {
    headers["Access-Control-Allow-Origin"] = requestOrigin;
  }

  return headers;
}

export function validatePayload(body) {
  const errors = [];

  if (!body?.name?.trim()) errors.push("Name is required.");
  if (!body?.email?.trim()) errors.push("Email is required.");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    errors.push("Email is invalid.");
  }
  if (!body?.phone?.trim()) errors.push("Phone is required.");
  if (!body?.message?.trim()) errors.push("Message is required.");

  return errors;
}

export function getHealthJson() {
  const { user, pass } = getSmtpCredentials();
  return {
    ok: true,
    service: "portfolio-contact-api",
    smtpConfigured: Boolean(user && pass),
  };
}

export async function sendContactEmail(body) {
  const { user, pass } = getSmtpCredentials();

  if (!user || !pass) {
    throw new Error(
      "SMTP_USER and SMTP_PASS must be set on the server (Gmail App Password).",
    );
  }

  const subject = `[Portfolio] ${body.subject || "New Inquiry"}`;
  const text = [
    `Name: ${body.name.trim()}`,
    `Email: ${body.email.trim()}`,
    `Phone: ${body.phone.trim()}`,
    `Source: ${body.source || "Portfolio"}`,
    "",
    "Message:",
    body.message.trim(),
  ].join("\n");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to: getRecipient(),
    replyTo: body.email.trim(),
    subject,
    text,
  });
}

export const successMessage =
  "Thank you! Your message was sent successfully. I will get back to you within 1–2 business days.";
