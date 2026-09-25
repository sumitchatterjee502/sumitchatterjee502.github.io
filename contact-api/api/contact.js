import {
  getCorsHeaders,
  sendContactEmail,
  successMessage,
  validatePayload,
} from "../lib/contact-service.mjs";

export default async function handler(req, res) {
  const cors = getCorsHeaders(req.headers.origin);
  for (const [key, value] of Object.entries(cors)) {
    res.setHeader(key, value);
  }

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  try {
    const payload =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const errors = validatePayload(payload);

    if (errors.length > 0) {
      res.status(400).json({ ok: false, message: errors.join(" ") });
      return;
    }

    await sendContactEmail(payload);
    res.status(200).json({ ok: true, message: successMessage });
  } catch (error) {
    console.error("Contact API error:", error);
    res.status(500).json({
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again later.",
    });
  }
}
