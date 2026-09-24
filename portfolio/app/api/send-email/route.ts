import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { to, subject, message, replyTo, senderName } = await req.json();

    if (!to?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: to, subject, and message.",
        },
        { status: 400 },
      );
    }

    const user = process.env.GMAIL_USER?.trim();
    const pass = process.env.GMAIL_APP_PASSWORD?.trim();

    if (!user || !pass) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email is not configured on the server. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local.",
        },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const fromName =
      typeof senderName === "string" && senderName.trim()
        ? senderName.trim()
        : "Portfolio Contact";

    await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to: to.trim(),
      subject: subject.trim(),
      text: message.trim(),
      replyTo:
        typeof replyTo === "string" && replyTo.trim()
          ? replyTo.trim()
          : undefined,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
      },
      { status: 500 },
    );
  }
}
