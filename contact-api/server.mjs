import http from "node:http";
import tls from "node:tls";

const PORT = Number(process.env.PORT || 8787);
const RECIPIENT = process.env.CONTACT_TO || "sumitchatterjee502@gmail.com";
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);

const ALLOWED_ORIGINS = new Set(
  (process.env.ALLOWED_ORIGINS ||
    "http://localhost:3000,https://sumitchatterjee502.github.io")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function setCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function validatePayload(body) {
  const errors = [];

  if (!body.name?.trim()) errors.push("Name is required.");
  if (!body.email?.trim()) errors.push("Email is required.");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    errors.push("Email is invalid.");
  }
  if (!body.phone?.trim()) errors.push("Phone is required.");
  if (!body.message?.trim()) errors.push("Message is required.");

  return errors;
}

function readSmtpResponse(socket) {
  return new Promise((resolve, reject) => {
    let buffer = "";

    function onData(chunk) {
      buffer += chunk.toString("utf8");
      const lines = buffer.split("\r\n").filter(Boolean);
      const lastLine = lines.at(-1) ?? "";

      if (/^\d{3} /.test(lastLine)) {
        socket.off("data", onData);
        const code = Number(lastLine.slice(0, 3));
        if (code >= 400) {
          reject(new Error(buffer.trim()));
          return;
        }
        resolve(buffer.trim());
      }
    }

    socket.on("data", onData);
    socket.on("error", reject);
  });
}

async function sendSmtpCommand(socket, command) {
  if (command) {
    socket.write(`${command}\r\n`);
  }
  return readSmtpResponse(socket);
}

async function sendMailViaSmtp({ to, replyTo, subject, text }) {
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "SMTP_USER and SMTP_PASS must be set. Use a Gmail App Password.",
    );
  }

  const socket = tls.connect({
    host: SMTP_HOST,
    port: SMTP_PORT,
    servername: SMTP_HOST,
  });

  await new Promise((resolve, reject) => {
    socket.once("secureConnect", resolve);
    socket.once("error", reject);
  });

  try {
    await readSmtpResponse(socket);
    await sendSmtpCommand(socket, `EHLO ${SMTP_HOST}`);
    await sendSmtpCommand(socket, "AUTH LOGIN");
    await sendSmtpCommand(socket, Buffer.from(SMTP_USER).toString("base64"));
    await sendSmtpCommand(socket, Buffer.from(SMTP_PASS).toString("base64"));
    await sendSmtpCommand(socket, `MAIL FROM:<${SMTP_USER}>`);
    await sendSmtpCommand(socket, `RCPT TO:<${to}>`);

    const message = [
      `From: Portfolio Contact <${SMTP_USER}>`,
      `To: ${to}`,
      `Reply-To: ${replyTo}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=utf-8",
      "",
      text,
    ].join("\r\n");

    await sendSmtpCommand(socket, "DATA");
    await sendSmtpCommand(socket, `${message}\r\n.`);
    await sendSmtpCommand(socket, "QUIT");
  } finally {
    socket.end();
  }
}

async function sendContactEmail(body) {
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

  await sendMailViaSmtp({
    to: RECIPIENT,
    replyTo: body.email.trim(),
    subject,
    text,
  });
}

const server = http.createServer(async (req, res) => {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    json(res, 200, { ok: true, service: "portfolio-contact-api" });
    return;
  }

  if (req.method !== "POST" || req.url !== "/api/contact") {
    json(res, 404, { ok: false, message: "Not found." });
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
        json(res, 400, { ok: false, message: errors.join(" ") });
        return;
      }

      await sendContactEmail(payload);
      json(res, 200, {
        ok: true,
        message:
          "Thank you! Your message was sent successfully. I will get back to you within 1–2 business days.",
      });
    } catch (error) {
      console.error("Contact API error:", error);
      json(res, 500, {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again later.",
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`);
});
