import { useState, type FormEvent } from "react";
import { projectTypes } from "../data/content";
import { normalizePhone, phoneForSheet } from "../lib/phone";

type Props = {
  heading?: string;
};

const webhook =
  import.meta.env.VITE_SHEETS_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbzp90ntKRZL4iW2UIUeefDFbZv20vgwbSBBVwvs0S9oIlHPWodd-11JlD5lOezvm0ov/exec";

export function EstimateForm({ heading = "Request a free estimate" }: Props) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSent(false);
    if (!webhook) {
      setError("Estimate webhook is not configured.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const phone = normalizePhone(String(data.get("phone") || ""));
    if (!phone.ok) {
      setError("Enter a full phone number with country code, like +1 512 202 0459 or +91 98765 43210.");
      return;
    }
    const payload = {
      name: String(data.get("name") || ""),
      phone: phoneForSheet(phone.display),
      type: String(data.get("type") || ""),
      message: String(data.get("message") || ""),
    };

    setPending(true);
    try {
      await fetch(webhook, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setSent(true);
      form.reset();
    } catch {
      setError("Could not send the estimate. Try again or call us.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-8">
      <h2 className="text-3xl text-navy">{heading}</h2>
      <p className="mt-2 text-stone">Name, phone, what you need. We call you back.</p>
      <label className="mt-6 block text-sm font-medium text-navy">
        Name
        <input name="name" required autoComplete="name" className="field" />
      </label>
      <label className="mt-4 block text-sm font-medium text-navy">
        Phone
        <input
          name="phone"
          type="text"
          inputMode="tel"
          autoComplete="tel"
          required
          className="field"
        />
      </label>
      <label className="mt-4 block text-sm font-medium text-navy">
        Project type
        <select name="type" required className="field" defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 block text-sm font-medium text-navy">
        Project details
        <textarea name="message" required rows={4} className="field" placeholder="Location, timeline, and what you want built." />
      </label>
      <button type="submit" className="btn btn-gold mt-6 w-full" disabled={pending}>
        {pending ? "Sending…" : "Get a free estimate"}
      </button>
      {sent && (
        <p className="mt-4 text-sm font-medium text-navy">
          Your data has been sent. We will reach out to you soon.
        </p>
      )}
      {error && <p className="mt-3 text-sm text-stone">{error}</p>}
    </form>
  );
}