import {
  getCorsHeaders,
  getHealthJson,
} from "../lib/contact-service.mjs";

export default function handler(req, res) {
  const cors = getCorsHeaders(req.headers.origin);
  for (const [key, value] of Object.entries(cors)) {
    res.setHeader(key, value);
  }

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  res.status(200).json(getHealthJson());
}
