import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import {
  getCorsHeaders,
  getHealthJson,
  sendContactEmail,
  successMessage,
  validatePayload,
} from "./lib/contact-service.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envFile = resolve(__dirname, ".env");

if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

const PORT = Number(process.env.PORT || 8787);

function requestPath(url) {
  return (url ?? "/").split("?")[0] || "/";
}

function json(res, status, body, corsHeaders) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    ...corsHeaders,
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

const server = http.createServer(async (req, res) => {
  const corsHeaders = getCorsHeaders(req.headers.origin);
  const path = requestPath(req.url);

  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.method === "GET" && (path === "/" || path === "/health")) {
    json(res, 200, getHealthJson(), corsHeaders);
    return;
  }

  if (req.method !== "POST" || path !== "/api/contact") {
    json(res, 404, { ok: false, message: "Not found." }, corsHeaders);
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
    if (body.length > 100_000) {
      req.destroy();
    }
  });

  req.on("end", async () => {
    try {
      const payload = JSON.parse(body || "{}");
      const errors = validatePayload(payload);

      if (errors.length > 0) {
        json(res, 400, { ok: false, message: errors.join(" ") }, corsHeaders);
        return;
      }

      await sendContactEmail(payload);
      json(res, 200, { ok: true, message: successMessage }, corsHeaders);
    } catch (error) {
      console.error("Contact API error:", error);
      json(
        res,
        500,
        {
          ok: false,
          message:
            error instanceof Error
              ? error.message
              : "Failed to send message. Please try again later.",
        },
        corsHeaders,
      );
    }
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Contact API listening on http://0.0.0.0:${PORT}`);
});
