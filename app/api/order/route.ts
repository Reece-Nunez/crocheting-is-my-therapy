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

/* ---------------- Spam / bot protection ---------------- */

// Max field lengths — anything longer is a bot dumping payload.
const MAX = { name: 100, email: 200, phone: 40, item: 120, message: 2000 };

// Minimum time a human takes to fill the form (client-measured, so no clock skew).
const MIN_FILL_MS = 3000;

// Links in the message. Customers may paste one inspiration link; spam dumps many.
const MAX_LINKS = 2;

// Best-effort in-memory rate limit. Serverless instances are ephemeral and there
// may be several, so this throttles bursts rather than guaranteeing a hard cap.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; first: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();

  // prune occasionally so the map can't grow without bound
  if (hits.size > 2000) {
    for (const [k, v] of hits) if (now - v.first > WINDOW_MS) hits.delete(k);
  }

  const hit = hits.get(ip);
  if (!hit || now - hit.first > WINDOW_MS) {
    hits.set(ip, { count: 1, first: now });
    return false;
  }
  hit.count += 1;
  return hit.count > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  // 1) Throttle bursts from one address.
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "You've sent a few requests already — please try again in a little while." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // 2) Honeypot: a hidden field no human ever sees. Pretend success so bots
  //    don't learn they were caught, but send nothing.
  if (String(body.website ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // 3) Time trap: humans don't complete a form in under a few seconds.
  const elapsed = Number(body.elapsedMs);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return NextResponse.json(
      { error: "That came through a little too fast — please try again." },
      { status: 400 }
    );
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const item = String(body.item ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please fill in your name, a valid email, and details." }, { status: 400 });
  }

  // 4) Length caps.
  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    phone.length > MAX.phone ||
    item.length > MAX.item ||
    message.length > MAX.message
  ) {
    return NextResponse.json({ error: "That's longer than we can accept — please shorten it." }, { status: 400 });
  }

  // 5) Link flood — the classic spam signature.
  const linkCount = (message.match(/https?:\/\/|www\./gi) ?? []).length;
  if (linkCount > MAX_LINKS) {
    return NextResponse.json(
      { error: "Please remove the links from your message and try again." },
      { status: 400 }
    );
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
