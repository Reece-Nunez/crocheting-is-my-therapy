import { NextResponse } from "next/server";
import { Resend } from "resend";

// Where order emails come from / go to. Override via env if needed.
// NOTE: the "from" domain must be verified in Resend (Domains tab) or the
// send will fail. crochetingismytherapy.com should be verified there.
const FROM = process.env.ORDER_FROM_EMAIL ?? "Crocheting is my Therapy <orders@crochetingismytherapy.com>";
const TO = process.env.ORDER_TO_EMAIL ?? "jamiecannady4102@gmail.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const item = String(body.item ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please fill in your name, a valid email, and details." }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Looking for", item || "—"],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;margin:auto;color:#241428">
      <h2 style="font-size:18px;margin:0 0 12px">New crochet order request</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 10px 6px 0;color:#6b5570;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${esc(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="font-size:14px;margin:16px 0 4px;color:#6b5570">Details</p>
      <p style="font-size:14px;white-space:pre-wrap;margin:0;padding:12px;background:#f4eef7;border-radius:10px">${esc(message)}</p>
      <p style="font-size:12px;color:#8a7590;margin-top:16px">Reply to this email to reach ${esc(name)} directly.</p>
    </div>`;

  const text =
    `New crochet order request\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nDetails:\n${message}\n`;

  try {
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New order request — ${name}${item ? ` (${item})` : ""}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json({ error: "Could not send right now. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
