"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { sendGAEvent } from "@next/third-parties/google";
import { EnvelopeIcon, PhoneIcon, BanknotesIcon } from "@heroicons/react/24/outline";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function OrderForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const clearError = (key: keyof Errors) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      item: String(data.get("item") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    // Analytics: every submit-button click (Google Analytics → Events).
    sendGAEvent("event", "order_submit_click");

    const next: Errors = {};
    if (!payload.name) next.name = "Please add your name.";
    if (!payload.email) next.email = "I'll need an email to reply.";
    else if (!EMAIL_RE.test(payload.email)) next.email = "That email looks off — mind checking it?";
    if (!payload.message) next.message = "Tell me a little about what you'd like.";

    if (Object.keys(next).length) {
      setErrors(next);
      toast.error("Just a couple of things to fix above.");
      const firstKey = (["name", "email", "message"] as const).find((k) => next[k]);
      if (firstKey) form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("send failed");

      // Analytics: a completed, delivered order request (the number that matters).
      sendGAEvent("event", "order_request", { item: payload.item });
      form.reset();
      toast.success("Thank you! Your request is on its way to Jamie. 💜", { duration: 6000 });
    } catch {
      toast.error(
        "Sorry — that didn't send. Please email jamiecannady4102@gmail.com or text (252) 571-0542.",
        { duration: 8000 }
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="order section" id="order">
      <div className="wrap order__grid">
        <div className="order__intro reveal" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="eyebrow">Start an order</p>
          <h2>Tell me what you&rsquo;d love.</h2>
          <p className="lede">
            Fill this out and I&rsquo;ll get back to you within a couple of days with pricing,
            colours and timing. No commitment — let&rsquo;s just chat about it first.
          </p>
          <p className="order__note">
            <EnvelopeIcon width={18} height={18} />
            <span className="order__note-text">
              Prefer email? Reach me any time at{" "}
              <a className="tlink" href="mailto:jamiecannady4102@gmail.com">jamiecannady4102@gmail.com</a>.
            </span>
          </p>
          <p className="order__note">
            <PhoneIcon width={18} height={18} />
            <span className="order__note-text">
              Or call &amp; text: <a className="tlink" href="tel:+12525710542">(252) 571-0542</a>.
            </span>
          </p>
          <p className="order__note">
            <BanknotesIcon width={18} height={18} />
            <span className="order__note-text">
              Payment is easy: <strong style={{ color: "var(--color-accent-deep)", fontWeight: 600 }}>cash</strong> or CashApp{" "}
              <strong style={{ color: "var(--color-accent-deep)", fontWeight: 600 }}>$PrayWifeJamieCannady</strong>.
            </span>
          </p>
        </div>

        <form className="form reveal" style={{ "--i": 1 } as React.CSSProperties} onSubmit={handleSubmit} noValidate>
          <div className="field" data-invalid={errors.name ? "true" : "false"}>
            <label htmlFor="f-name">
              Your name <span className="req">*</span>
            </label>
            <input className="input" id="f-name" name="name" type="text" autoComplete="name" onInput={() => clearError("name")} />
            <span className="field__error" aria-live="polite">{errors.name}</span>
          </div>

          <div className="field" data-invalid={errors.email ? "true" : "false"}>
            <label htmlFor="f-email">
              Email <span className="req">*</span>
            </label>
            <input className="input" id="f-email" name="email" type="email" autoComplete="email" onInput={() => clearError("email")} />
            <span className="field__error" aria-live="polite">{errors.email}</span>
          </div>

          <div className="field">
            <label htmlFor="f-phone">
              Phone <span style={{ fontWeight: 400, color: "var(--color-muted)" }}>(optional)</span>
            </label>
            <input className="input" id="f-phone" name="phone" type="tel" autoComplete="tel" />
          </div>

          <div className="field">
            <label htmlFor="f-item">What are you after?</label>
            <select className="select" id="f-item" name="item" defaultValue="Crochet Ruffle Hat">
              <option value="Crochet Ruffle Hat">Crochet Ruffle Hat</option>
              <option value="Hat & Scarf Set">Hat &amp; Scarf Set</option>
              <option value="Leg Warmers">Leg Warmers</option>
              <option value="Throw Blanket">Throw Blanket</option>
              <option value="Comfort for Beds">Comfort for Beds</option>
              <option value="Chair Blankets">Chair Blankets</option>
              <option value="Baby Blankets">Baby Blankets</option>
              <option value="Something custom">Something custom</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <div className="field" data-invalid={errors.message ? "true" : "false"}>
            <label htmlFor="f-msg">
              Tell me the details <span className="req">*</span>
            </label>
            <textarea
              className="textarea"
              id="f-msg"
              name="message"
              placeholder="Colours, size, who it's for, when you'd need it…"
              onInput={() => clearError("message")}
            />
            <span className="field__error" aria-live="polite">{errors.message}</span>
          </div>

          <div className="form__actions">
            <button className="btn" type="submit" data-state={loading ? "loading" : undefined} disabled={loading}>
              Send my request
            </button>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-muted)" }}>
              Sent straight to Jamie — she&rsquo;ll reply within a day or two.
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
